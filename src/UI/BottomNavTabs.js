import React, {Component} from 'react';
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation';
import IconsMaterial from 'react-native-vector-icons/MaterialIcons';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsFoundation from 'react-native-vector-icons/Foundation';
import IconsOcticon from 'react-native-vector-icons/Octicons';
import IconsEntypo from 'react-native-vector-icons/Entypo';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import {navigateRootNavigator, getCurrentRouteName} from '../Services/Navigation';
import {BottomNavTabsStyles as Styles, BOTTOM_NAV_BACKGROUND_COLOR} from '../Services/Styles';

const DEFAULT_TAB_COLOR = '#333333';

export default class BottomNavTabs extends Component {
    bottomNavTabActions = [
        'Home',
        'Appointments',
        'Progress',
        'Resources',
    ]

    static propTypes = {
    };

    state = {
        activeTab: 0,
        activeTabColor: DEFAULT_TAB_COLOR,
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
                activeTab={this.state.activeTab}>
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Home'
                    icon={<IconsMaterial size={24} color={this.inactiveTabColor} name='home' />}
                    activeIcon={<IconsMaterial size={24} color={this.state.activeTabColor} name='home' />}
                />
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Appointments'
                    icon={<IconsMaterialCommunity size={24} color={this.inactiveTabColor} name='calendar-check' />}
                    activeIcon={<IconsMaterialCommunity size={24} color={this.state.activeTabColor} name='calendar-check' />}
                />
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Progress'
                    icon={<IconsEntypo size={24} color={this.inactiveTabColor} name='progress-two' />}
                    activeIcon={<IconsEntypo size={24} color={this.state.activeTabColor} name='progress-two' />}
                />
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Resources'
                    icon={<IconsFoundation size={24} color={this.inactiveTabColor} name='page-multiple' />}
                    activeIcon={<IconsFoundation size={24} color={this.state.activeTabColor} name='page-multiple' />}
                />
            </BottomNavigation>
        );
    }
}
