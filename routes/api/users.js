const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/User');

// @ Route POST  api/users
// Desc: Test Route
// Access: Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    //   Link for express validator : https://express-validator.github.io/docs/
    //  console.log(req.body); //this is the object of data which will be send to route
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // the data which we send in req is in req.body, here we are destructuring it to separate them
    const { name, email, password } = req.body; // we also need to get User model for that=> import it

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get user gravator
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      user = new User({ name, email, avatar, password });

      // encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return jwt

      res.send('User registered');
    } catch (err) {
      console.error(err.messageg);
      res.status(500).send('server error');
    }
  }
);
module.exports = router;
