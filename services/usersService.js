const { User } = require('../models');

const addUser = data => {
  return User.create(data);
};

const getUserById = id => {
  return User.findById(id);
};

const getUserByEmail = email => {
  return User.findOne({ email })
    .collation({ locale: 'en', strength: 2 })
    .exec();
};

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
};
