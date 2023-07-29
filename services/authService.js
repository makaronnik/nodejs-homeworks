const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = process.env;

exports.generateToken = payload => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });
};

exports.verifyToken = token => {
  return jwt.verify(token, JWT_SECRET_KEY);
};
