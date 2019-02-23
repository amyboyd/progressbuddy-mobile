import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, Image, TextInput, Modal} from 'react-native';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import ApiService from '../Services/ApiService';
import {AppointmentStyles as Styles, button, buttonText, secondaryButton, secondaryButtonText, textInput, screenContainer} from '../Services/Styles';

export default class Appointment extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationHeader headerTitle={'Appointment'} navigation={navigation} />,
    });

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    state = {
        appointment: null,
        isNotAttendingModalOpen: false,
        notAttendingReason: null,
    };

    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize = async () => {
        LoadingSpinner.show();

        const appointmentId = this.props.navigation.state.params.appointmentId;

        try {
            const appointment = await ApiService.get(`/appointments/getAppointment/${appointmentId}`);
            this.setState({appointment});
        } catch (error) {
            Alert.alert('Problem Loading Appointment', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error getting appointment', error);
        }

        LoadingSpinner.hide();
    }

    openNotAttendingModal = () => {
        this.setState({isNotAttendingModalOpen: true});
        // @todo
    }

    closeNotAttendingModal = () => {
        this.setState({isNotAttendingModalOpen: false});
    }

    confirmAttendance = () => {
        // @todo
    }

    render() {
        if (!this.state.appointment) {
            // Not loaded.
            return null;
        }

        const appointment = this.state.appointment;

        let footerText;
        if (appointment.status !== 'NOT_ATTENDING') {
            footerText = 'We will send you a reminder at 9am so you don\'t forget to attend.';
        }

        return (
            <ScrollView style={screenContainer}>
                <View style={Styles.appointment}>
                    <View style={Styles.appointmentTopRow}>
                        <Text style={Styles.appointmentTitle}>
                            {appointment.title}
                        </Text>

                        <View style={Styles.appointmentPriority}>
                            <Text style={Styles.appointmentPriorityText}>
                                {appointment.appointmentPriority}
                            </Text>
                        </View>
                    </View>

                    <View style={Styles.appointmentBottomRow}>
                        <View style={Styles.appointmentDescription}>
                            <Text style={[Styles.appointmentDescriptionText, {fontWeight: 'bold'}]}>
                                {this.props.navigation.state.params.date}
                                {', '}
                                {this.props.navigation.state.params.time}
                            </Text>

                            <Text style={Styles.appointmentDescriptionText}>
                                {appointment.notes}
                            </Text>
                        </View>

                        <Image source={{uri: appointment.imageURL}} style={Styles.appointmentImage} />
                    </View>

                    <View style={Styles.buttons}>
                        <TouchableOpacity style={button} onPress={this.confirmAttendance}>
                            <Text style={buttonText}>Confirm Attending</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={secondaryButton} onPress={this.openNotAttendingModal}>
                            <Text style={secondaryButtonText}>Not Attending</Text>
                        </TouchableOpacity>
                    </View>

                    {footerText &&
                        <Text style={Styles.footerText}>{footerText}</Text>
                    }
                </View>

                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={this.state.isNotAttendingModalOpen}
                    onRequestClose={this.closeNotAttendingModal}
                >
                    <View style={Styles.modalContainer}>
                        <View style={Styles.modal}>
                            <Text style={Styles.modalHeader}>Not Attending</Text>

                            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={Styles.modalContent}>
                                <View behavior='padding' style={{flex: 1}}>
                                    <Text style={Styles.notAttendingReasonModalParagraph}>
                                        {'Why are you not attending the appointment?'}
                                    </Text>

                                    <TextInput
                                        value={this.state.notAttendingReason}
                                        onChangeText={text => this.setState({notAttendingReason: text})}
                                        style={textInput}
                                        autoFocus={true}
                                        underlineColorAndroid={'transparent'}
                                        onSubmitEditing={this.submitNotAttending}
                                    />
                                </View>
                            </ScrollView>

                            <View style={Styles.modalFooter}>
                                <TouchableOpacity
                                    onPress={this.submitNotAttending}
                                    style={Styles.modalFooterButton}
                                >
                                    <Text style={Styles.modalFooterButtonText}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={this.closeNotAttendingModal}
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
