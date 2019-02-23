import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {HeaderStyles as Styles} from '../Services/Styles';
import {goBack} from '../Services/Navigation';

class NavigationHeader extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        headerTitle: PropTypes.string,
    }

    render() {
        return (
            <View style={Styles.container}>
                <TouchableOpacity style={Styles.back} onPress={goBack}>
                    <Icon name='chevron-left' size={40} color='#ffffff' />
                </TouchableOpacity>

                {this.props.headerTitle && <Text style={[Styles.text]}>{this.props.headerTitle}</Text>}

                <TouchableOpacity style={Styles.hamburger}>
                    <MaterialIcon name='menu' color='white' size={25} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default NavigationHeader;
