const { User } = require('../models');

const addUser = data => {
  return User.create(data);
};

const getUserById = id => {
  return User.findById(id);
};

const getUserByEmail = email => {
  return User.findOne({ email });
};

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
};
