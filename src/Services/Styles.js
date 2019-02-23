import {StyleSheet} from 'react-native';

export const primaryColorHex = '#F5A623';
export const buttonBackgroundColorHex = '#F5A623';
export const buttonTextColorHex = '#FFFFFF';
export const standardBorderRadius = 4;

export const BOTTOM_NAV_TAGS_HEIGHT = 63;

export const BOTTOM_NAV_BACKGROUND_COLOR = '#dddddd';

export const BottomNavTabsStyles = StyleSheet.create({
    nav: {
        height: BOTTOM_NAV_TAGS_HEIGHT,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        marginTop: 10,
        paddingTop: 10,
    },
});

export const screenContainer = {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: BOTTOM_NAV_TAGS_HEIGHT,
    paddingTop: 15,
    paddingBottom: BOTTOM_NAV_TAGS_HEIGHT + 30,
};

const standardModal = {
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: standardBorderRadius,
        width: '85%',
        height: '75%',
    },
    modalHeader: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#efefef',
        borderTopLeftRadius: standardBorderRadius,
        borderTopRightRadius: standardBorderRadius,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    modalContent: {
        padding: 15,
    },
    modalEmpty: {
        paddingHorizontal: 20,
        paddingTop: 20,
        fontSize: 14,
        lineHeight: 20,
        color: 'black',
        textAlign: 'center',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: standardBorderRadius,
        borderBottomRightRadius: standardBorderRadius,
    },
    modalFooterButton: {
        ...button,
        height: 37,
        marginBottom: 15,
        marginTop: 5,
        marginHorizontal: 15,
        minWidth: 90,
        flex: 1,
    },
    modalFooterButtonText: {
        ...buttonText,
        fontSize: 16,
    },
};

export const HomeStyles = StyleSheet.create({
});

const sharedAppointmentStyles = {
    appointment: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: standardBorderRadius,
        marginBottom: 15,
    },

    appointmentTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    appointmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 6,
        marginLeft: 8,
    },
    appointmentPriority: {
        backgroundColor: '#1E479C',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopRightRadius: standardBorderRadius,
        borderBottomLeftRadius: standardBorderRadius,
    },
    appointmentPriorityText: {
        color: 'white',
    },

    appointmentBottomRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    appointmentDescription: {
        marginLeft: 8,
        flexShrink: 2,
        flexGrow: 0,
    },
    appointmentDescriptionText: {
        fontSize: 16,
        marginBottom: 15,
    },
    appointmentImage: {
        width: 94,
        height: 94,
        resizeMode: 'contain',
        flexShrink: 0,
        flexGrow: 0,
        marginRight: 8,
        marginLeft: 8,
    },
};

export const AppointmentsStyles = StyleSheet.create({
    dateHeader: {
        backgroundColor: primaryColorHex,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: standardBorderRadius,
        height: 37,
        marginBottom: 15,
    },
    dateHeaderText: {
        color: 'white',
        fontSize: 18,
    },
    ...sharedAppointmentStyles,
});

export const AppointmentStyles = StyleSheet.create({
    ...sharedAppointmentStyles,
    ...standardModal,

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    footerText: {
        marginTop: 20,
        fontSize: 15,
        color: '#999999',
        paddingHorizontal: 15,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export const HeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: primaryColorHex,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    back: {
    },
    hamburger: {
        paddingRight: 18,
        paddingLeft: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});

export const button = {
    backgroundColor: buttonBackgroundColorHex,
    height: 37,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: standardBorderRadius,
};

export const buttonText = {
    fontSize: 16,
    color: buttonTextColorHex,
};

export const secondaryButton = {
    ...button,
    backgroundColor: 'white',
    borderColor: '#4E4E4E',
    borderWidth: 1,
};

export const secondaryButtonText = {
    ...buttonText,
    color: '#4E4E4E',
};

export const box = {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopLeftRadius: standardBorderRadius,
    borderTopRightRadius: standardBorderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 4,
    borderBottomColor: '#A86B05',
    padding: 15,
    marginBottom: 15,
};

export const boxTitle = {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
};

export const paragraph = {
    fontSize: 16,
    marginBottom: 15,
};

export const paragraphCenter = {
    ...paragraph,
    textAlign: 'center',
};

export const textInput = {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 15,
    borderRadius: standardBorderRadius,
};
