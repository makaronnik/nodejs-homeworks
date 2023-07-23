const app = require('./app');
const mongoose = require('mongoose');
const {
  showSuccessMessage,
  showMongoErrorMessage,
} = require('./utils/log/consoleMessages');

const port = process.env.SERVER_PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  showMongoErrorMessage('MongoDB URI not defined');

  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    showSuccessMessage('Database connection successful');

    app.listen(port, () => {
      showSuccessMessage(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch(error => {
    showMongoErrorMessage(error.message);

    process.exit(1);
  });
