const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  firstName: {
    type: String,
    required: false,
    unique: false
  },
  lastName: {
    type: String,
    required: false,
    unique: false
  }
},
  {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;