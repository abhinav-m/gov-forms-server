const mongoose = require('mongoose');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email.',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

function generateAuthToken() {
  debugger; //eslint-disable-line
  const user = this;
  const access = 'auth';

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
    .toString();
  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => token);
}

function hashPassword(next) {
  const user = this;
  debugger; //eslint-disable-line
  if (user.isModified('password')) {
    bcrypt.genSalt(15, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) console.log('Error hashing password');
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}

function findByToken(token) {
  const User = this;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      'tokens.access': decoded.access,
    });
  } catch (e) {
    // If user not found.
    return Promise.reject();
  }
}

function findByCredentials(email, password) {
  const User = this;

  return User.findOne({ email }).then((user) => {
    // User not found.
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        // Either error occurred while comparing,or invalid pass.
        if (err || !res) reject();
        else {
          resolve(user);
        }
      });
    });
  });
}

function removeToken(token) {
  const user = this;

  // Pull the value containing this token from the tokens array.
  return user.update({
    $pull: {
      tokens: {
        token,
      },
    },
  });
}

function toJSON() {
  const user = this;
  const { _id, email } = user.toObject();
  return { _id, email };
}

UserSchema.statics.findByCredentials = findByCredentials;
UserSchema.statics.findByToken = findByToken;

UserSchema.methods.removeToken = removeToken;
UserSchema.methods.generateAuthToken = generateAuthToken;
UserSchema.methods.toJSON = toJSON;

UserSchema.pre('save', hashPassword);

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
};
