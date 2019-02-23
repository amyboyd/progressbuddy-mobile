import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Moment from '../UI/Moment';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import {getSelf} from '../Services/Auth';
import ApiService from '../Services/ApiService';
import {button, buttonText, box, boxTitle, paragraphCenter, screenContainer} from '../Services/Styles';

export default class CheckIn extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationHeader headerTitle={'Check In'} navigation={navigation} />,
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
            Alert.alert('Problem Loading Check-In', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
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
                <View style={box}>
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

                    <Text style={paragraphCenter}>
                        Please check in at least once per day so that we know you are safe.
                    </Text>

                    <TouchableOpacity style={button} onPress={this.checkIn}>
                        <Text style={buttonText}>Check In Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
