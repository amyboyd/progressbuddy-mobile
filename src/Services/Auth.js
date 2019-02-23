import ApiService from './ApiService';
import {getAuthToken, removeAuthTokenAndUserId} from './AuthToken';
import {navigateAndResetRootNavigator} from './Navigation';

let cachedSelf;

export function removeCacheOfSelf() {
    cachedSelf = null;
    console.debug('Removed cache of self');
}

export async function signOut() {
    await removeAuthTokenAndUserId();
    removeCacheOfSelf();
    navigateAndResetRootNavigator('Login');
    console.info('Signing out');
}

export async function isLoggedIn() {
    return getAuthToken();
}

export async function getSelf() {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
        throw new Error('Called getSelf() when not logged in');
    }

    if (cachedSelf) {
        return cachedSelf;
    }

    const response = await ApiService.get('/authentication/self');
    cachedSelf = response.user;
    return cachedSelf;
}
