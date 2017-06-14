const router = require('express').Router();
const User = require('../user/userModel');
const jwt = require('jsonwebtoken');
const secret = require('../../config').secret;

router.post('/authenticate', (req, res) => {
  // find the user
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign(user, secret, {
          expiresIn: 60 * 60 * 24 * 30,
          // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
        });
      }
    }
  });
});
module.exports = router;
