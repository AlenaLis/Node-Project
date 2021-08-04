const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  title: {
    type:String,
    required: true //обязательное поле
  },
  textArt: {
    type:String,
    required: true //обязательное поле
  },
  category: {
    type:String,
    required: true //обязательное поле
  },
  imageSrc: {
    type: String,
    default:''
  },
  user: {
    name: String,
    lastName: String,
    id: Schema.Types.ObjectId
  },
  userID: {
    id: Schema.Types.ObjectId
  },
  count: {
    type:Number,
    default: 0
  },
  data: {
    type:String,
    default: ''
  },
  // userName:{
  //   ref: 'users',
  //   type: Schema.name.
  // }
})

module.exports = mongoose.model('articles', categorySchema)
