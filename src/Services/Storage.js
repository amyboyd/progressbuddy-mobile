import {AsyncStorage} from 'react-native';

const prefix = '@FaultFixersStorage:';

export default class Storage {
    static async setItem(key, value) {
        try {
            await AsyncStorage.setItem(prefix + key, value);
        } catch (error) {
            console.error('Error storing data in storage');
            throw error;
        }
    }

    static async getItem(key) {
        try {
            return await AsyncStorage.getItem(prefix + key);
        } catch (error) {
            console.error('Error getting data from storage');
            throw error;
        }
    }

    static async removeItem(key) {
        try {
            await AsyncStorage.removeItem(prefix + key);
        } catch (error) {
            console.error('Error removing data from storage', error);
            throw error;
        }
    }
}
