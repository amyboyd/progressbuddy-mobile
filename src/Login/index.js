import React, {Component} from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Services/LoadingSpinner';
import ApiService from '../Services/ApiService';
import {setUserId, setAuthToken} from '../Services/AuthToken';
import {navigateRootNavigator} from '../Services/Navigation';
import NavigationHeader from '../UI/NavigationHeader';

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationHeader headerTitle={'Login'} navigation={navigation} />,
    });

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    state = {
    };

    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize = async () => {
        LoadingSpinner.show();

        try {
            const response = await ApiService.post('/authentication/login', {
                email: 'client-claire@example.com',
                password: 'pass1234',
            });
            await setUserId(response.user.id);
            await setAuthToken(response.authToken.token);
            navigateRootNavigator('Home');
        } catch (error) {
            Alert.alert('Problem Logging In', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error logging in', error);
        }

        LoadingSpinner.hide();
    }

    render() {
        return null;
    }
}
