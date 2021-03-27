const express = require('express');
const router = express.Router();

// @ Route api/users
// Desc: Test Route
// Access: Public

router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
