const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const update = require('./update');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resendVerificationEmail = require('./resendVerificationEmail');

module.exports = {
  register,
  login,
  logout,
  current,
  update,
  updateAvatar,
  verify,
  resendVerificationEmail,
};
