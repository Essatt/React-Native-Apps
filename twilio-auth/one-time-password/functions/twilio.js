const twilio = require('twilio');
import accountSid from './twilio_account_sid.json';
import authToken from './twilio_auth_token.json';

module.exports = new twilio.Twilio(accountSid, authToken);
