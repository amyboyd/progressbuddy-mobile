import cloneDeep from 'lodash/cloneDeep';
import config from '../../config.json';
import LoadingSpinner from './LoadingSpinner';
import {getAuthToken} from './AuthToken';
import {signOut} from './Auth';

function addBaseUrl(path) {
    return config.api.replace(/\/$/, '') + path;
}

async function getRequestHeaders() {
    const headers = {};
    headers.Accept = 'application/json';
    headers['Content-Type'] = 'application/json';

    const authToken = await getAuthToken();
    if (authToken) {
        headers.Authorization = `User ${authToken}`;
    }

    return headers;
}

/**
 * @param  {mixed} input
 * @return {mixed}
 */
function contextualize(input) {
    if (typeof input === 'number' || typeof input === 'boolean' || input === null || input === undefined) {
        return input;
    } else if (typeof input === 'string') {
        return input;
    } else if (input instanceof Array) {
        return input.map(contextualize);
    } else if (input instanceof Object && input.constructor === Object) {
        const copy = cloneDeep(input);
        const keys = Object.keys(copy);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            copy[key] = contextualize(copy[key]);
        }
        return copy;
    }
    console.warn(`Unexpected input given to contextualize: ${input} (${typeof input})`);
    return input;
}

function getResponseHeaderValue(response, header) {
    if (response.headers.map[header]) {
        if (response.headers.map[header] instanceof Array && response.headers.map[header].length > 0) {
            return response.headers.map[header][0];
        } else if (typeof response.headers.map[header] === 'string') {
            return response.headers.map[header];
        }
    }
    return null;
}

const MAX_RETRIES = 3;

/**
* Executes a HTTP request.
*
* If the server responds with status 502 (bad gateway) or -1 (no connection), the request will
* be retried.
*
* Options may have these properties:
* - offlineRetryLimit, a number
* - timeout, a number of milliseconds
*
* @return {Promise}
*/
async function execute(method, path, postData, options = {}) {
    const maxRetries = (options && typeof options.offlineRetryLimit === 'number' ? options.offlineRetryLimit : MAX_RETRIES);
    let retries = 0;

    const fetchConfig = {
        method,
        headers: await getRequestHeaders(),
    };

    if (postData !== undefined && postData !== null) {
        if (postData.constructor === FormData) {
            fetchConfig.body = postData;
            fetchConfig.headers['Content-Type'] = 'multipart/form-data';
        } else {
            fetchConfig.body = JSON.stringify(postData);
        }
    }

    if (typeof options.timeout === 'number' && options.timeout > 0) {
        fetchConfig.timeout = options.timeout;
    } else {
        fetchConfig.timeout = 60000;
    }

    const url = addBaseUrl(path);

    return new Promise((resolve, reject) => {
        async function makeCallAndRetry() {
            console.trace('Making API request', method, path);

            let response;
            try {
                response = await fetch(url, fetchConfig);
            } catch (e) {
                console.warn('Error performing HTTP request', {method, path, responseStatus: response && response.status ? response.status : null});
                reject(e);
                return;
            }

            const contentType = getResponseHeaderValue(response, 'content-type');
            const isJson = contentType.indexOf('application/json') === 0;

            if (response.status >= 400) {
                // Retry on -1/502.
                if (response.status && (response.status === -1 || response.status === 502) && (retries < maxRetries)) {
                    retries += 1;
                    console.warn(`Got status ${response.status} from API request; retrying in 3 seconds`, {method, path});
                    setTimeout(makeCallAndRetry, 3000);
                    return;
                }

                const hasLogoutHeader = getResponseHeaderValue(response, 'x-logout') === 'true';
                if (hasLogoutHeader) {
                    console.warn('Got header: X-Logout=true'); // eslint-disable-line no-console
                    await signOut();
                    LoadingSpinner.hide();
                    return;
                }

                const objectToThrow = {
                    status: response.status,
                };

                if (isJson) {
                    objectToThrow.data = await response.json();
                    objectToThrow.data = contextualize(objectToThrow.data);

                    if (objectToThrow.data
                            && objectToThrow.data.errors instanceof Array
                            && objectToThrow.data.errors.length > 0
                            && objectToThrow.data.errors[0].codes instanceof Array) {
                        const errorCodes = [];
                        for (let i = 0; i < objectToThrow.data.errors.length; i++) {
                            const error = objectToThrow.data.errors[i];
                            for (let ii = 0; ii < error.codes.length; ii++) {
                                errorCodes.push(error.codes[ii]);
                            }
                        }
                        objectToThrow.errorCodes = errorCodes;
                    }
                }

                if (!objectToThrow.errorCodes) {
                    objectToThrow.errorCodes = [];
                }

                objectToThrow.hasErrorCode = function hasErrorCode(...testCodes) {
                    for (let ii = 0; ii < testCodes.length; ii++) {
                        if (objectToThrow.errorCodes.indexOf(testCodes[ii]) !== -1) {
                            return true;
                        }
                    }
                    return false;
                };

                reject(objectToThrow);
                return;
            }

            if (isJson) {
                let json = await response.json();
                json = contextualize(json);
                resolve(json);
                return;
            }

            resolve(null);
        }

        makeCallAndRetry();
    });
}

export default {
    async get(path) {
        return execute('GET', path);
    },

    async post(path, data, options = {}) {
        return execute('POST', path, data, options);
    },

    async put(path, data) {
        return execute('PUT', path, data);
    },

    async doDelete(path) {
        return execute('DELETE', path);
    },
};
