import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import {getSelf} from '../Services/Auth';
import ApiService from '../Services/ApiService';
import {AppointmentsStyles as Styles, screenContainer} from '../Services/Styles';
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
            const appointments = (await ApiService.get(`/appointments/getAppointmentsForClient/${clientId}`))
                .filter(appointment => appointment.status !== 'appointmentStatus');
            this.setState({appointments});
        } catch (error) {
            Alert.alert('Problem Loading Appointments', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error getting appointments', error);
        }

        LoadingSpinner.hide();
    }

    goToAppointment = (appointment, date, time) => {
        navigateRootNavigator('Appointment', {appointmentId: appointment.appointmentID, date, time});
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={{textAlign: 'right', fontSize: 16}}>Sort by: upcoming</Text>

                <IconsMaterialCommunity name='dots-vertical' size={18} style={{marginTop: 2, marginBottom: 15}} />
            </View>
        );
    }

    renderAppointments() {
        return (
            <View>
                {this.renderDateHeader('Tomorrow')}
                {this.renderAppointment(this.state.appointments[0], 'Tomorrow', '12pm-1pm')}

                {this.renderDateHeader('30 February')}
                {this.renderAppointment(this.state.appointments[1], '30 February', '4pm-4:30pm')}
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

    renderAppointment = (appointment, date, time) => {
        if (!appointment) {
            return <Text>-</Text>;
        }

        return (
            <TouchableOpacity style={Styles.appointment} onPress={() => this.goToAppointment(appointment, date, time)}>
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
                        <Text style={[Styles.appointmentDescriptionText, {fontWeight: 'bold'}]}>{time}</Text>
                        <Text style={Styles.appointmentDescriptionText}>{appointment.notes}</Text>
                    </View>

                    <Image source={{uri: appointment.imageURL}} style={Styles.appointmentImage} />
                </View>
            </TouchableOpacity>
        );
    }
}
