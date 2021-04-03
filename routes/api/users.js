const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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

  (req, res) => {
    //   Link for express validator : https://express-validator.github.io/docs/
    //  console.log(req.body); //this is the object of data which will be send to route
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);
module.exports = router;
