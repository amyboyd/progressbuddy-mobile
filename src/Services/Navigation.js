import {NavigationActions, StackActions} from 'react-navigation';

const config = {};

export function setRootNavigator(nav) {
    if (nav) {
        config.rootNavigator = nav;
    }
}

export function navigateAndResetRootNavigator(routeName, params) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName, params}),
        ],
    });
    config.rootNavigator.dispatch(resetAction);
}

export function navigateRootNavigator(routeName, params) {
    if (config.rootNavigator && routeName) {
        const action = NavigationActions.navigate({routeName, params});
        config.rootNavigator.dispatch(action);
    }
}

export function getCurrentRouteName() {
    if (config.rootNavigator) {
        const currentNavIndex = config.rootNavigator.state.nav.index;
        return config.rootNavigator.state.nav.routes[currentNavIndex].routeName;
    }
    return null;
}

export function goBack() {
    if (config.rootNavigator) {
        const backAction = NavigationActions.back({key: null});
        config.rootNavigator.dispatch(backAction);
    }
}
