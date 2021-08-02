const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  inputForEmail: {
    type: String,
    required: true, //обязательное поле
    unique: true
  },
  inputForPassword: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true, //обязательное поле
  },
  lastName: {
    type: String,
    required: true, //обязательное поле
  },
  description: {
    type: String,
    //обязательное поле
  },
})

module.exports = mongoose.model('users', userSchema)
