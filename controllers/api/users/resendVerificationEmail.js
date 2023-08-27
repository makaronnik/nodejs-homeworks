const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaResendVerificationEmail } = require('./validators');
const { addUser, getUserByEmail } = require('../../../services/usersService');
const { sendVerificationEmail } = require('../../../services/emailService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaResendVerificationEmail.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const user = await getUserByEmail(value.email);

  if (!user) {
    throw new HttpError(401, 'Email is wrong');
  }

  if (user.verify) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  await sendVerificationEmail(user.email, user.verificationToken);

  res.status(200).json({
    message: 'Verification email sent',
  });
});
