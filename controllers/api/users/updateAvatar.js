const { catchAsync } = require('../../../utils/decorators');
const { updateUserAvatarById } = require('../../../services/usersService');

module.exports = catchAsync(async (req, res) => {
  const avatarUrl = await updateUserAvatarById(req.user._id, req.file);

  res.status(200).json({
    avatarURL: avatarUrl,
  });
});
