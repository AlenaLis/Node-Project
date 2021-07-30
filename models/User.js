const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true, //обязательное поле
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('users', userSchema)
