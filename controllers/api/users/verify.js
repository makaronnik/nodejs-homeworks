const { catchAsync } = require('../../../utils/decorators');
const {
  getUserByVerificationToken,
} = require('../../../services/usersService');

module.exports = catchAsync(async (req, res) => {
  const token = req.params.verificationToken;

  const user = await getUserByVerificationToken(token);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  user.verify = true;
  user.verificationToken = null;

  await user.save();

  res.status(200).json({
    message: 'Verification successful',
  });
});
