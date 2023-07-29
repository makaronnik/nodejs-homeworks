const { User } = require('../models');

const addUser = async data => {
  const user = await User.create(data);

  return user;
};

const getUserByEmail = async email => {
  return await User.findOne({ email });
};

module.exports = {
  addUser,
  getUserByEmail,
};
