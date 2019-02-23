import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, Image, TextInput, Modal} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import ApiService from '../Services/ApiService';
import {
    ProgressStyles as Styles,
    button,
    buttonText,
    secondaryButton,
    secondaryButtonText,
    paragraphCenter,
    textInput,
    box,
    screenContainer,
} from '../Services/Styles';
import {getSelf} from '../Services/Auth';

const LABELS = {
    MOTIVATION_AND_RESPONSIBILITY: 'Motivitation & taking responsibility',
    MONEY_MANAGEMENT: 'Managing money',
    RELATIONSHIPS: 'Social networks & relationships',
    SELF_CARE_AND_LIVING_SKILLS: 'Self-care and living skills',
    DRUGS_AND_ALCOHOL: 'Drug and alcohol misuse',
    PHYSICAL_HEALTH: 'Physical health',
    MENTAL_HEALTH: 'Emotional & mental health',
    MEANINGFUL_USE_OF_TIME: 'Meaningful use of time',
    MANAGING_TENANCY_AND_ACCOMMODATION: 'Managing tenancy and accomodation',
    CRIMINAL_OFFENDING: 'Offending',
};

export default class Progress extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationHeader headerTitle={'Progress'} navigation={navigation} />,
    });

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    state = {
        items: null,
        isCommentModalOpen: false,
        updateComment: null,
        updateType: null,
        updateTypeLabel: null,
        oldScore: null,
    };

    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize = async () => {
        LoadingSpinner.show();

        const clientId = (await getSelf()).client.clientID;

        try {
            const byType = await ApiService.get(`/clients/${clientId}/latestProgressScoresByTypes`);
            const items = [];
            Object.keys(byType).forEach(type => {
                items.push({
                    type,
                    score: byType[type],
                    label: LABELS[type],
                });
            });
            this.setState({items});
        } catch (error) {
            Alert.alert('Problem Loading Progress', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error getting client progress', error);
        }

        LoadingSpinner.hide();
    }

    openCommentModal = (item) => {
        this.setState({
            isCommentModalOpen: true,
            updateType: item.type,
            updateTypeLabel: item.label,
            oldScore: item.score,
        });
    }

    closeCommentModal = () => {
        this.setState({
            isCommentModalOpen: false,
            updateComment: null,
        });
    }

    submitUpdate = async () => {
        const comment = this.state.updateComment;
        if (!comment) {
            Alert.alert(
                'Please enter the reason for the change.',
                '',
                [{text: 'OK'}]
            );
            console.warn('Not updating progress score because no comment has been provided.');
            return;
        }

        const clientId = (await getSelf()).client.clientID;
        const type = this.state.updateType;
        // Hard coded score during MVP stage.
        const score = 6;

        LoadingSpinner.show();

        const url = `/clients/${clientId}/recordProgressScoreByType?type=${type}&score=${score}&comment=${encodeURIComponent(comment)}`;

        try {
            await ApiService.post(url);
            const updatedItems = this.state.items;
            for (let i = 0; i < updatedItems.length; i++) {
                if (updatedItems[i].type === type) {
                    updatedItems[i].score = score;
                }
            }
            this.setState({items: updatedItems});
        } catch (error) {
            Alert.alert(
                'Problem Updating Progress',
                'An unexpected error occurred - please try again.',
                [{text: 'OK', onPress: this.closeCommentModal}]
            );
            LoadingSpinner.hide();
            console.error('Error updating progress', error);
            return;
        }

        LoadingSpinner.hide();
        this.closeCommentModal();
    }

    render() {
        if (!this.state.items) {
            // Not loaded.
            return null;
        }

        const items = this.state.items;

        return (
            <ScrollView style={screenContainer} keyboardShouldPersistTaps='handled'>
                <Text style={paragraphCenter}>
                    Draw the arrows to update how you feel.
                </Text>

                <View style={box}>
                    {items.map(item => {
                        return (
                            <View key={item.type} style={Styles.typeContainer}>
                                <Text style={Styles.label}>{item.label} - {item.score || '?'}</Text>

                                <TouchableOpacity onPress={() => this.openCommentModal(item)}>
                                    <Image source={require('../../assets/progress-bar.png')} style={Styles.image} />
                                </TouchableOpacity>

                                {item.score &&
                                    <View style={{marginLeft: ((item.score - 1) * 10) + '%'}}>
                                        <Ionicons name='ios-arrow-up' size={20} color='#000000' />
                                    </View>
                                }
                            </View>
                        );
                    })}
                </View>

                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={this.state.isCommentModalOpen}
                    onRequestClose={this.closeCommentModal}
                >
                    <View style={Styles.modalContainer}>
                        <View style={Styles.modal}>
                            <Text style={Styles.modalHeader}>Update</Text>

                            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={Styles.modalContent}>
                                <View behavior='padding' style={{flex: 1}}>
                                    <Text style={paragraphCenter}>
                                        {'You have changed "' + this.state.updateTypeLabel + '" from ' + this.state.oldScore + ' to 6. Why? Your response will be shared with your Depaul coach.'}
                                    </Text>

                                    <TextInput
                                        value={this.state.updateComment}
                                        onChangeText={text => this.setState({updateComment: text})}
                                        style={textInput}
                                        autoFocus={true}
                                        underlineColorAndroid={'transparent'}
                                        onSubmitEditing={this.submitUpdate}
                                    />
                                </View>
                            </ScrollView>

                            <View style={Styles.modalFooter}>
                                <TouchableOpacity
                                    onPress={this.submitUpdate}
                                    style={Styles.modalFooterButton}
                                >
                                    <Text style={Styles.modalFooterButtonText}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={this.closeCommentModal}
                                    style={Styles.modalFooterButton}
                                >
                                    <Text style={Styles.modalFooterButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}
