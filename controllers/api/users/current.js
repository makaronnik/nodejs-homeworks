const { catchAsync } = require('../../../utils/decorators');

exports.current = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
});
