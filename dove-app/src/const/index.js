//Edited by Xiao Lin
export const THE_APP_NAME = "Project Dove";
export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const apiUrlPrefix = "http://localhost:8080";
export const StoreApiUrl = apiUrlPrefix.concat("/api/store/all");
export const timeApiUrl = apiUrlPrefix.concat("/api/time");
export const appVersionApiUrl = apiUrlPrefix.concat("/api/version/");

export const delay = 3000; // in milliseconds
