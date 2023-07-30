const { catchAsync } = require('../../../utils/decorators');

module.exports = catchAsync(async (req, res) => {
  const { user } = req;

  user.token = null;

  await user.save();

  res.status(204).send();
});
