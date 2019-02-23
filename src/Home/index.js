import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import {getSelf} from '../Services/Auth';
import {button, buttonText, box, boxTitle, paragraph, textInput, screenContainer} from '../Services/Styles';

export default class Home extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationHeader headerTitle={'Dashboard'} navigation={navigation} />,
    });

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    state = {
        self: null,
    };

    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize = async () => {
        LoadingSpinner.show();

        try {
            const self = await getSelf();
            this.setState({self});
        } catch (error) {
            Alert.alert('Problem Loading Dashboard', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error getting self', error);
        }

        LoadingSpinner.hide();
    }

    render() {
        if (!this.state.self) {
            // Not loaded.
            return null;
        }

        return (
            <ScrollView style={screenContainer}>
                {this.renderOverview()}
            </ScrollView>
        );
    }

    renderOverview() {
        const coach = this.state.self.client.coach;

        return (
            <View style={box}>
                <Text style={boxTitle}>Your Details</Text>

                <Text style={paragraph}>
                    <Text style={{fontWeight: 'bold'}}>{'Logged in as: '}</Text>
                    {this.state.self.client.name}
                </Text>

                <Text style={paragraph}>
                    <Text style={{fontWeight: 'bold'}}>{'Your Depaul coach: '}</Text>
                    {coach.name}
                </Text>

                <Text style={paragraph}>
                    <Text style={{fontWeight: 'bold'}}>{'Where are you staying?'}</Text>
                </Text>

                <TextInput
                    value={this.state.self.client.address}
                    style={textInput}
                    underlineColorAndroid='transparent'
                />

                <Text style={paragraph}>
                    <Text style={{fontWeight: 'bold'}}>{'What is your phone number?'}</Text>
                </Text>

                <TextInput
                    value={this.state.self.client.phone}
                    style={textInput}
                    underlineColorAndroid='transparent'
                />

                <TouchableOpacity style={button}>
                    <Text style={buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
