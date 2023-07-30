const bcrypt = require('bcrypt');

exports.hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(password, salt);
};

exports.comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};
