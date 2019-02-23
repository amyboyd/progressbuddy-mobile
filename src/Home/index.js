import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Moment from '../UI/Moment';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import {getSelf} from '../Services/Auth';
import ApiService from '../Services/ApiService';
import {button, buttonText, box, boxTitle, paragraph, paragraphCenter, textInput, screenContainer} from '../Services/Styles';

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

    checkIn = async () => {
        LoadingSpinner.show();

        const clientId = this.state.self.client.clientID;

        let updatedClient;
        try {
            updatedClient = await ApiService.post(`/clients/${clientId}/check-in?latitude=${Math.random() * 50}&longitude=${Math.random() * 50}`);
            const updatedSelf = Object.assign({}, this.state.self, {client: updatedClient});
            this.setState({self: updatedSelf});
        } catch (error) {
            Alert.alert('Problem Checking In', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error checking in', error);
            LoadingSpinner.hide();
            return;
        }

        Alert.alert(
            'Checked In!',
            'Your coach now knows you are at ' + updatedClient.lastCheckedInDescription + '. Thanks for keeping us updated.',
            [{text: 'OK'}]
        );
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
                {this.renderCheckIn()}
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

    renderCheckIn() {
        return (
            <View style={box}>
                <Text style={boxTitle}>Check In</Text>

                {this.state.self.client.lastCheckedInAt &&
                    <Text style={paragraphCenter}>
                        {'You last checked in '}
                        <Moment
                            date={new Date(this.state.self.client.lastCheckedInAt)}
                            fromNow={true}
                            maxNow={true}
                        />
                        {', at '}
                        {this.state.self.client.lastCheckedInDescription}
                        {'.'}
                    </Text>
                }

                {!this.state.self.client.lastCheckedInAt &&
                    <Text style={paragraphCenter}>
                        {'You haven\'t checked in via ProgressBuddy.'}
                    </Text>
                }

                <TouchableOpacity style={button} onPress={this.checkIn}>
                    <Text style={buttonText}>Check In Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
