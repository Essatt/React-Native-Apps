const admin = require('firebase-admin');

module.exports = function (req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt((req.body.code));

  admin.auth().getUser(phone)
    .then(() => {
      //create a reference to a specific place in the database
      const ref = admin.database().ref('users/' + phone);
      ref.on('value', snapshot => {
        //sop listening to changes in the reference object
        ref.off();
        const user = snapshot.val()

        //is the code user submitted does not match the code saven on user in firebase-admin
        //or if the code is invalid than give error
        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }

        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phone)
          .then(token => res.send ({ token: token }))
      });
    })
    .catch(() => res.status(422).send({ error: err, res, reg }))
}
