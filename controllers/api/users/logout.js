const { catchAsync } = require('../../../utils/decorators');

exports.logout = catchAsync(async (req, res) => {
  const { user } = req;

  user.token = null;

  await user.save();

  res.status(204).send();
});
