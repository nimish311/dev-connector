const express = require('express');
const router = express.Router();

// @ Route  api/posts
// Desc: Test Route
// Access: Public

router.get('/', (req, res) => res.send('Post Route'));

module.exports = router;
