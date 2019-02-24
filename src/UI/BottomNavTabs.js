import React, {Component} from 'react';
import {Image} from 'react-native';
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation';
import IconsMaterial from 'react-native-vector-icons/MaterialIcons';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsEntypo from 'react-native-vector-icons/Entypo';
import {navigateRootNavigator, getCurrentRouteName} from '../Services/Navigation';
import {BottomNavTabsStyles as Styles, BOTTOM_NAV_BACKGROUND_COLOR} from '../Services/Styles';

const DEFAULT_TAB_COLOR = '#333333';

export default class BottomNavTabs extends Component {
    bottomNavTabActions = [
        'Home',
        'Progress',
        'Appointments',
        'CheckIn',
    ]

    static propTypes = {
    };

    state = {
        activeTab: 0,
        activeTabColor: '#000000',
    }

    inactiveTabColor = DEFAULT_TAB_COLOR

    backgroundColor = BOTTOM_NAV_BACKGROUND_COLOR

    rippleColor = '#aaaaaa'

    handleBottomNavTabPress(newTabIndex) {
        const newRoute = this.bottomNavTabActions[newTabIndex];

        if (getCurrentRouteName() === newRoute) {
            return;
        }

        navigateRootNavigator(newRoute);

        this.setState({activeTab: newTabIndex});
    }

    render() {
        return (
            <BottomNavigation
                labelColor={this.inactiveTabColor}
                activeLabelColor={this.state.activeTabColor}
                rippleColor={this.rippleColor}
                style={Styles.nav}
                shifting={false}
                onTabChange={index => this.handleBottomNavTabPress(index)}
                activeTab={this.state.activeTab}
            >
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Home'
                    icon={<IconsMaterial size={24} color={this.inactiveTabColor} name='home' />}
                    activeIcon={<IconsMaterial size={24} color={this.state.activeTabColor} name='home' />}
                />

                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Progress'
                    icon={<IconsEntypo size={24} color={this.inactiveTabColor} name='progress-two' />}
                    activeIcon={<IconsEntypo size={24} color={this.state.activeTabColor} name='progress-two' />}
                />

                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Appointments'
                    icon={<IconsMaterialCommunity size={24} color={this.inactiveTabColor} name='calendar-check' />}
                    activeIcon={<IconsMaterialCommunity size={24} color={this.state.activeTabColor} name='calendar-check' />}
                />

                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='CheckIn'
                    icon={<Image source={require('../../assets/check-in.png')} style={{tintColor: this.inactiveTabColor, width: 20, height: 20}} />}
                    activeIcon={<Image source={require('../../assets/check-in.png')} style={{tintColor: this.state.activeTabColor, width: 20, height: 20}} />}
                />
            </BottomNavigation>
        );
    }
}
