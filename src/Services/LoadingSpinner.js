import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import {primaryColorHex} from './Styles';

const LoadingStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 100,
    },
    spinner: {
        position: 'absolute',
        zIndex: 5,
    },
    darkBackground: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000022',
        zIndex: 4,
    },
});

class LoadingSpinner extends Component {
    state = {
        isVisible: false,
    }

    intervalId = null;

    show() {
        if (this.state.isVisible) {
            return;
        }

        this.setState({
            isVisible: true,
        });
    }

    hide() {
        this.setState({isVisible: false});
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    render() {
        if (!this.state.isVisible) {
            return null;
        }

        return (
            <View style={LoadingStyles.container}>
                <Spinner style={LoadingStyles.spinner} isVisible={true} size={100} type={'Bounce'} color={primaryColorHex} />
                <View style={LoadingStyles.darkBackground} />
            </View>
        );
    }
}

let elRef;

export default {
    element: <LoadingSpinner ref={ref => elRef = ref} />,
    show() {
        if (elRef) {
            elRef.show();
        }
    },
    hide() {
        if (elRef) {
            elRef.hide();
        }
    },
};
