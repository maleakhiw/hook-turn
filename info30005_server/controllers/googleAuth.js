// TODO MOVE CLIENT_ID TO ENV
const GoogleAuth = require('google-auth-library')
const CLIENT_ID = "90710147687-8fbuvdh5836egvpujoud8dbtmojqj9d9.apps.googleusercontent.com";

const auth = new GoogleAuth;
const client = new auth.OAuth2(CLIENT_ID, '', '');

module.exports = client;
