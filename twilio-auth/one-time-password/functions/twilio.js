const twilio = require('twilio');

//gitignore (put them in another file, add to gitignore and require in this file)
const accountSid = 'AC699c6a1d1a0bd7d671263ddbb3fe6b0a';
const authToken = 'a409f65b992d837dac170aecbc7904c3';

module.exports = new twilio.Twilio(accountSid, authToken);
