const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @ Route  GET api/auth
// Desc: Test Route
// Access: Public

// if we want to add middleware... we add it as a 2nd param
//by just doing this... this route is now a protected route !!!!
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// router.get('/', auth, (req, res) => res.send('Auth success'));
module.exports = router;
