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
    type:String,
    default:''
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  count: {
    type:Number,
    default: 0
  }
})

module.exports = mongoose.model('articles', categorySchema)
