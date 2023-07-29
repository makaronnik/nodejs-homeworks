const { catchAsync } = require('../../../utils/decorators');

module.exports = catchAsync(async (req, res) => {
  const contact = req.contact;

  contact.owner = undefined;

  res.status(200).json(req.contact);
});
