import React, {Component} from 'react';
import {Alert, View, Text, TouchableOpacity, ScrollView, Image, TextInput, Modal} from 'react-native';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Services/LoadingSpinner';
import NavigationHeader from '../UI/NavigationHeader';
import ApiService from '../Services/ApiService';
import {
    AppointmentStyles as Styles,
    button,
    buttonText,
    secondaryButton,
    secondaryButtonText,
    paragraphCenter,
    textInput,
    screenContainer,
} from '../Services/Styles';

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

    confirmAttendance = async () => {
        LoadingSpinner.show();

        const appointmentId = this.props.navigation.state.params.appointmentId;

        try {
            await ApiService.post(`/appointments/confirmAttendance/${appointmentId}?appointmentStatus=CONFIRMED_TO_ATTEND`);
            const updatedAppointment = Object.assign({}, this.state.appointment, {appointmentStatus: 'CONFIRMED_TO_ATTEND'});
            this.setState({appointment: updatedAppointment});
        } catch (error) {
            Alert.alert('Problem Updating Appointment', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error updating appointment', error);
            LoadingSpinner.hide();
            return;
        }

        LoadingSpinner.hide();

        Alert.alert('Thank you for confirming!', '', [{text: 'OK'}]);
    }

    openNotAttendingModal = () => {
        this.setState({isNotAttendingModalOpen: true});
    }

    closeNotAttendingModal = () => {
        this.setState({isNotAttendingModalOpen: false});
    }

    submitNotAttending = async () => {
        const reason = this.state.notAttendingReason;

        if (!reason) {
            console.warn('Not submitting "not attending appointment" because no reason has been provided.');
            return;
        }

        LoadingSpinner.show();

        const appointmentId = this.props.navigation.state.params.appointmentId;
        const url = `/appointments/confirmAttendance/${appointmentId}?appointmentStatus=CANCELLED&reasonForNotAttending=${encodeURIComponent(reason)}`;

        try {
            await ApiService.post(url);
            const updatedAppointment = Object.assign({}, this.state.appointment, {appointmentStatus: 'CANCELLED'});
            this.setState({appointment: updatedAppointment});
        } catch (error) {
            Alert.alert('Problem Updating Appointment', 'An unexpected error occurred - please try again.', [{text: 'OK'}]);
            console.error('Error updating appointment', error);
            LoadingSpinner.hide();
            this.closeNotAttendingModal();
            return;
        }

        LoadingSpinner.hide();
        Alert.alert(
            'Thank you for letting us know.',
            '',
            [{text: 'OK', onPress: this.closeNotAttendingModal}]
        );
    }

    render() {
        if (!this.state.appointment) {
            // Not loaded.
            return null;
        }

        const appointment = this.state.appointment;

        let footerText;
        switch (appointment.appointmentStatus) {
        case 'NOT_SET':
            footerText = 'We will send you a reminder at 9am so you don\'t forget to attend.';
            break;
        case 'CONFIRMED_TO_ATTEND':
            footerText = 'You have confirmed you are attending.\n\nWe will send you a reminder at 9am so you don\'t forget to attend.';
            break;
        case 'CANCELLED':
            footerText = 'You have said that you are not attending.';
            break;
        default:
            console.warn('Unexpected appointment status', appointment.appointmentStatus);
        }

        return (
            <ScrollView style={screenContainer} keyboardShouldPersistTaps='handled'>
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

                    {appointment.appointmentStatus === 'NOT_SET' &&
                        <View style={Styles.buttons}>
                            <TouchableOpacity style={button} onPress={this.confirmAttendance}>
                                <Text style={buttonText}>Confirm Attending</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={secondaryButton} onPress={this.openNotAttendingModal}>
                                <Text style={secondaryButtonText}>Not Attending</Text>
                            </TouchableOpacity>
                        </View>
                    }

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
                                    <Text style={paragraphCenter}>
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
