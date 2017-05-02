const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  //check if the phone number is valid
  if (!req.body.phone ){
    return res.status(422).send({ error: 'You must provide a phone number '});
  }

  //clean up the phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  //get the user from Firebase
  admin.auth().getUser(phone)
    .then(userRecord => {
      //create a random code between 1000 and 9999
      const code = Math.floor((Math.random() * 8999 + 1000));

      twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+12268871945'
      }, (err) => {
        if (err) {
          return res.status(422).send(err);
        }

        //create a collection named users and add the user ID (phone number)
        //Add a code property with our generated code, and a codeValid property
        //for us to restrict the use of a code to one time
        admin.database().ref('users/' + phone)
          .update({ code:code, codeValid: true }, () => {
            res.send({ success: true });
          })

      })
    })
    .catch((err) => {
      res.status(422).send({ error: err })
    });
}
