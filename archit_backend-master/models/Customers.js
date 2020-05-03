const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  what: {
    type: String, 
    default: 'c'
  }
});

module.exports = User = mongoose.model('users', UserSchema);
