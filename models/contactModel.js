const { Schema, model } = require('mongoose');
const {
  nameRegexp,
  phoneRegexp,
  emailRegexp,
} = require('../utils/refexps/contactsRegexps');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: function (name) {
          return nameRegexp.test(name);
        },
        message: 'name is not a valid!',
      },
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      validate: {
        validator: function (email) {
          return emailRegexp.test(email);
        },
        message: 'email is not a valid!',
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (phone) {
          return phoneRegexp.test(phone);
        },
        message: 'phone is not a valid!',
      },
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const Contact = model('Contact', contactSchema);

module.exports = Contact;
