const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.SERVER_PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const showMongoErrorMessage = message =>
  console.error('\x1b[31m%s\x1b[0m', `Database connection error: ${message}`);

if (!mongoUri) {
  showMongoErrorMessage('MongoDB URI not defined');

  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Database connection successful');

    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch(error => {
    showMongoErrorMessage(error.message);

    process.exit(1);
  });
