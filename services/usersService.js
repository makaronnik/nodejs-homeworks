const { User } = require('../models');
const {
  ImagesServiceFactory,
} = require('../factories/services/imageServiceFactory');

const addUser = data => {
  return User.create(data);
};

const getUserById = id => {
  return User.findById(id);
};

const getUserByEmail = email => {
  return User.findOne({ email }).collation({ locale: 'en', strength: 2 });
};

const getUserByVerificationToken = verificationToken => {
  return User.findOne({ verificationToken }).collation({
    locale: 'en',
    strength: 2,
  });
};

const updateUserById = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const updateUserAvatarById = async (id, avatarFileData) => {
  const ImageService = ImagesServiceFactory.withRootStaticDir('public')
    .withStorageDir('avatars')
    .getImageService();

  const avatarUrl = ImageService.handleImage(avatarFileData);

  await User.findByIdAndUpdate(id, { avatarUrl }, { new: true });

  return avatarUrl;
};

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
  getUserByVerificationToken,
  updateUserById,
  updateUserAvatarById,
};
