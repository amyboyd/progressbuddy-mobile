import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import IconsMaterial from 'react-native-vector-icons/MaterialIcons';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsOcticon from 'react-native-vector-icons/Octicons';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import {getSelf} from '../Services/Auth';
import {HomeStyles as Styles} from '../Services/Styles';
import {navigateRootNavigator} from '../Services/Navigation';

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

    goToAppointments() {
        navigateRootNavigator('Appointments');
    }

    render() {
        if (!this.state.self) {
            // Not loaded.
            return null;
        }

        return (
            <View style={Styles.container}>
                <ScrollView style={{flex: 1}} contentContainerStyle={Styles.boxes}>
                    {'@todo - home'}
                </ScrollView>
            </View>
        );
    }
}
