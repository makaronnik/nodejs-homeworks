const showSuccessMessage = message => console.log('\x1b[32m%s\x1b[0m', message);

const showMongoErrorMessage = message =>
  console.error('\x1b[31m%s\x1b[0m', `Database connection error: ${message}`);

module.exports = {
  showSuccessMessage,
  showMongoErrorMessage,
};
