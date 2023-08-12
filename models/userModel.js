var gravatar = require('gravatar');
const { v4: uuid } = require('uuid');
const { Schema, model } = require('mongoose');
const {
  hashPassword,
  comparePassword,
} = require('../services/passwordsService');
const { generateToken } = require('../services/authService');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarUrl: {
      type: String,
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.verificationToken = uuid();
  }

  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }

  if (!this.avatarUrl) {
    this.avatarUrl = gravatar.url(this.email, {
      size: 250,
      rating: 'x',
      default: 'retro',
    });
  }

  next();
});

userSchema.methods.validPassword = function (password) {
  return comparePassword(password, this.password);
};

userSchema.methods.assignToken = function () {
  const token = generateToken({ id: this._id });

  this.token = token;

  this.save();

  return token;
};

module.exports = model('User', userSchema);
