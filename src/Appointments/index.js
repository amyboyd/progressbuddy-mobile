import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, Image, TextInput} from 'react-native';
import IconsMaterial from 'react-native-vector-icons/MaterialIcons';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsOcticon from 'react-native-vector-icons/Octicons';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Moment from '../UI/Moment';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import {getSelf} from '../Services/Auth';
import ApiService from '../Services/ApiService';
import {AppointmentsStyles as Styles, button, buttonText, box, boxTitle, paragraph, paragraphCenter, textInput, screenContainer} from '../Services/Styles';
import {navigateRootNavigator} from '../Services/Navigation';

export default class Appointments extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationHeader headerTitle={'Appointments'} navigation={navigation} />,
    });

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    state = {
        appointments: null,
    };

    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize = async () => {
        LoadingSpinner.show();

        try {
            const self = await getSelf();
            const clientId = self.client.clientID;
            const appointments = await ApiService.get(`/appointments/getAppointments/${clientId}`);
            console.log('appointments', appointments);
            this.setState({appointments});
        } catch (error) {
            Alert.alert('Problem Loading Appointments', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error getting appointments', error);
        }

        LoadingSpinner.hide();
    }

    goToAppointment = (appointment) => {
        navigateRootNavigator('Appointment', {id: appointment});
    }

    render() {
        if (!this.state.appointments) {
            // Not loaded.
            return null;
        }

        return (
            <ScrollView style={screenContainer}>
                {this.renderSortOptions()}
                {this.renderAppointments()}
            </ScrollView>
        );
    }

    renderSortOptions() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{textAlign: 'right', fontSize: 16}}>Sort by: upcoming</Text>

                <IconsMaterialCommunity name='dots-vertical' size={18} style={{marginTop: 2, marginBottom: 15}} />
            </View>
        );
    }

    renderAppointments() {
        return (
            <View>
                {this.renderDateHeader('Tomorrow')}
                {this.renderAppointment(this.state.appointments[0], '12pm-1pm')}

                {this.renderDateHeader('30 February')}
                {this.renderAppointment(this.state.appointments[1], '4pm-4:30pm')}
            </View>
        );
    }

    renderDateHeader(date) {
        return (
            <View style={Styles.dateHeader}>
                <Text style={Styles.dateHeaderText}>
                    {date}
                </Text>
            </View>
        );
    }

    renderAppointment(appointment, time) {
        if (!appointment) {
            return <Text>-</Text>;
        }

        return (
            <TouchableOpacity style={Styles.appointment} onPress={() => goToAppointment(appointment)}>
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
                        <Text style={[Styles.appointmentDescriptionText, {fontWeight: 'bold'}]}>{appointment.time}</Text>
                        <Text style={Styles.appointmentDescriptionText}>{appointment.notes}</Text>
                    </View>

                    <Image source={{uri: appointment.imageURL}} style={Styles.appointmentImage} />
                </View>
            </TouchableOpacity>
        );
    }
}
