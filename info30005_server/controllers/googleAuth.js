// TODO MOVE CLIENT_ID TO ENV
const GoogleAuth = require('google-auth-library')
const CLIENT_ID = "322407653477-6ntij30l1ttq9jgt82cmmljc5d515tmg.apps.googleusercontent.com";

const auth = new GoogleAuth;
const client = new auth.OAuth2(CLIENT_ID, '', '');

module.exports = client;
