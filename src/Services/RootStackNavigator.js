import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Appointment from '../Appointment';
import Appointments from '../Appointments';
import CheckIn from '../CheckIn';
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
    Appointment: {
        screen: Appointment,
    },
    Appointments: {
        screen: Appointments,
    },
    CheckIn: {
        screen: CheckIn,
    },
    Home: {
        screen: Home,
    },
    Login: {
        screen: Login,
    },
};

const stackNavigatorConfig = {
    initialRouteName: 'Empty',
};

const RootStackNavigator = createStackNavigator(routeConfig, stackNavigatorConfig);

export default RootStackNavigator;
