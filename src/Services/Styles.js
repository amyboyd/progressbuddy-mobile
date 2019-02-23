import {StyleSheet} from 'react-native';

export const primaryColorHex = '#F5A623';

export const BOTTOM_NAV_TAGS_HEIGHT = 56;

export const BOTTOM_NAV_BACKGROUND_COLOR = '#dddddd';

export const BottomNavTabsStyleSheetBuilder = StyleSheet.create({
    nav: {
        height: BOTTOM_NAV_TAGS_HEIGHT,
    },
});

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
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
