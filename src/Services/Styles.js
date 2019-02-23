import {StyleSheet} from 'react-native';

export const primaryColorHex = '#F5A623';
export const buttonBackgroundColorHex = '#F5A623';
export const buttonTextColorHex = '#FFFFFF';
export const standardBorderRadius = 4;

export const BOTTOM_NAV_TAGS_HEIGHT = 56;

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

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: BOTTOM_NAV_TAGS_HEIGHT,
        paddingTop: 15,
        paddingBottom: BOTTOM_NAV_TAGS_HEIGHT + 30,
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
    paddingHorizontal: 20,
    borderRadius: standardBorderRadius,
};

export const buttonText = {
    fontSize: 16,
    color: buttonTextColorHex,
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
