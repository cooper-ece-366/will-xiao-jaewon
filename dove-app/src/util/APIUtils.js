import { API_BASE_URL, ACCESS_TOKEN } from '../const';

//Reference: exempli-gratia
//Edited by Xiao Lin

// Create a fetch request, and get the response in json
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    /*
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    */

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

/*
// Unused login/logout requests
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function logout(logoutRequest) {
    return request({
        url: API_BASE_URL + "/auth/logout",
        method: 'POST',
        body: JSON.stringify(logoutRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
 */

// Get the current time from the backend server
export function getTime() {
    /*
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    */

    return request({
        url: API_BASE_URL + "/api/time",
        method: 'GET'
    });
}

/*
// Outdated getStore function
export function getStoreInfo() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/api/store",
        method: 'GET'
    });
}
*/
