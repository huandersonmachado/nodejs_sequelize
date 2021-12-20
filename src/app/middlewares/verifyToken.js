/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: 'Failed to authenticate token.' });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
