const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log(token);
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Aauthorization denied' });
  }

  //   Verify token
  try {
    //   Verify the token
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    // will get the decoded user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
