import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Appointment from '../Appointment';
import Appointments from '../Appointments';
import Home from '../Home';
import Login from '../Login';

class Empty extends React.Component {
    static navigationOptions = () => ({
        header: null,
    });

    render() {
        return null;
    }
}

const routeConfig = {
    Empty: {
        screen: Empty,
    },
    Login: {
        screen: Login,
    },
    // Help: {
    //     screen: Help,
    // },
    Home: {
        screen: Home,
    },
    Appointment: {
        screen: Appointment,
    },
    Appointments: {
        screen: Appointments,
    },
};

const stackNavigatorConfig = {
    initialRouteName: 'Empty',
};

const RootStackNavigator = createStackNavigator(routeConfig, stackNavigatorConfig);

export default RootStackNavigator;
