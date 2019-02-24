/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Keyboard, View, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RootStackNavigator from './src/Services/RootStackNavigator';
import BottomNavTabs from './src/UI/BottomNavTabs';
import LoadingSpinner from './src/Services/LoadingSpinner';
import {isLoggedIn, getSelf} from './src/Services/Auth';
import {navigateAndResetRootNavigator, getCurrentRouteName, setRootNavigator} from './src/Services/Navigation';
import {primaryColorHex, BOTTOM_NAV_TAGS_HEIGHT} from './src/Services/Styles';

export default class App extends Component {
    state = {
        isKeyboardShowing: false,
        primaryColorHex,
    }

    componentDidMount() {
        this.initialize();
    }

    async initialize() {
        const authToken = await isLoggedIn();
        if (authToken !== null) {
            await this.doLoggedInActions();
        } else {
            this.doLoggedOutActions();
        }

        // The keyboard 'will' events are only available on iOS. The 'did' events are available on iOS and Android.
        // The 'will' events are used on iOS to cause the bottom nav tabs to hide/show immediately, instead of after a
        // 1-second delay which messes with <KeyboardAvoidingView>.
        Keyboard.addListener('keyboardWillShow', () => {
            this.setState({isKeyboardShowing: true});
        });
        Keyboard.addListener('keyboardDidShow', () => {
            this.setState({isKeyboardShowing: true});
        });
        Keyboard.addListener('keyboardWillHide', () => {
            this.setState({isKeyboardShowing: false});
        });
        Keyboard.addListener('keyboardDidHide', () => {
            this.setState({isKeyboardShowing: false});
        });

        SplashScreen.hide();
    }

    doLoggedOutActions() {
        navigateAndResetRootNavigator('Login');
    }

    async doLoggedInActions() {
        let initialRoute;
        let initialRouteParams;

        if (!initialRoute) {
            initialRoute = 'Home';
        }

        navigateAndResetRootNavigator(initialRoute, initialRouteParams);
        this.loadSelf();
    }

    async loadSelf() {
        // Ensure the user's authentication is still valid.
        // This also acts as a useful call-home to update the user's last API activity.
        try {
            const self = await getSelf();
            console.info('Self:', self);
        } catch (error) {
            console.error('Error getting self on startup', error);
        }

        // Force the bottom nav to show.
        setTimeout(() => {
            this.setState({
                x: Date.now(),
            });
        }, 100);
    }

    screensWithoutBottomNav = [
        null,
        'Login',
    ]

    shouldBottomNavBeDisplayed() {
        if (this.state.isKeyboardShowing) {
            return false;
        }
        return (this.screensWithoutBottomNav.indexOf(getCurrentRouteName()) === -1);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <RootStackNavigator
                    ref={rootNavigator => setRootNavigator(rootNavigator)}
                    onNavigationStateChange={this.onNavigationStateChange}
                />

                <StatusBar
                    barStyle='light-content'
                    backgroundColor={this.state.primaryColorHex}
                />

                {this.shouldBottomNavBeDisplayed() &&
                    <View style={{flex: 1, position: 'absolute', bottom: 0, left: 0, right: 0, height: BOTTOM_NAV_TAGS_HEIGHT}}>
                        <BottomNavTabs />
                    </View>
                }

                { LoadingSpinner.element }
            </View>
        );
    }
}
