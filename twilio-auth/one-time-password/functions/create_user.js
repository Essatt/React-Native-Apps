const admin = require('firebase-admin');

module.exports = function(req, res) {
  //verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  //format the phone to remove dashes, parenthesis and spaces
  //the regex code matches any character that is not a digit
  //and replaces it with empty strign
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  //create a new user account using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  // respond to the user request, saying th account was made
}
