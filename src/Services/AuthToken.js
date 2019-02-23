import Storage from './Storage';

export async function getAuthToken() {
    return Storage.getItem('authToken');
}

export async function setAuthToken(token) {
    return Storage.setItem('authToken', token);
}

export async function getUserId() {
    return Storage.getItem('userId');
}

export async function setUserId(id) {
    return Storage.setItem('userId', id);
}

export async function removeAuthTokenAndUserId() {
    Storage.removeItem('authToken');
    Storage.removeItem('userId');
}
