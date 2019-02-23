import React, {Component} from 'react';
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation';
import IconsMaterial from 'react-native-vector-icons/MaterialIcons';
import IconsOcticon from 'react-native-vector-icons/Octicons';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import {navigateRootNavigator, getCurrentRouteName} from '../Services/Navigation';
import {BottomNavTabsStyleSheetBuilder, BOTTOM_NAV_BACKGROUND_COLOR} from '../Services/Styles';

const DEFAULT_TAB_COLOR = '#333333';

export default class BottomNavTabs extends Component {
    bottomNavTabActions = [
        'Scan',
        'MyTickets',
        'MyLocations',
        'MyAlerts',
    ]

    static propTypes = {
    };

    state = {
        activeTab: 0,
        activeTabColor: DEFAULT_TAB_COLOR,
        styles: BottomNavTabsStyleSheetBuilder.forComponent(this, 'styles'),
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
                style={this.state.styles.nav}
                shifting={false}
                onTabChange={index => this.handleBottomNavTabPress(index)}
                activeTab={this.state.activeTab}>
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Home'
                    icon={<IconsMaterial size={24} color={this.inactiveTabColor} name='camera-alt' />}
                    activeIcon={<IconsMaterial size={24} color={this.state.activeTabColor} name='camera-alt' />}
                />
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Appointments'
                    icon={<IconsFontAwesome size={24} color={this.inactiveTabColor} name='ticket' />}
                    activeIcon={<IconsFontAwesome size={24} color={this.state.activeTabColor} name='ticket' />}
                />
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Progress'
                    icon={<IconsMaterial size={24} color={this.inactiveTabColor} name='home' />}
                    activeIcon={<IconsMaterial size={24} color={this.state.activeTabColor} name='home' />}
                />
                <Tab
                    barBackgroundColor={this.backgroundColor}
                    label='Resources'
                    icon={<IconsOcticon size={24} color={this.inactiveTabColor} name='broadcast' />}
                    activeIcon={<IconsOcticon size={24} color={this.state.activeTabColor} name='broadcast' />}
                />
            </BottomNavigation>
        );
    }
}
