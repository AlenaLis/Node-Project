const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  inputForEmail: {
    type: String,
    required: true,
    unique: true
  },
  inputForPassword: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  admin: {
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('users', userSchema)
