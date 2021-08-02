const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utilits/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const articles = await Category.find()
    res.status(200).json(articles)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.find({user: req.params.id})
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Category.remove({_id: req.params.id})
    await Position.remove({category: req.params.id})
    res.status(200).json({
      message: 'Category was deleted'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const category = new Category({
    title: req.body.title,
    textArt: req.body.textArt,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : '',
    category: '#' + req.body.category,
    count: req.body.count
  })
  try {
    await category.save()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    title: req.body.title,
    textArt: req.body.textArt,
    category: req.body.category
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }

  try {
    const category = await Category.findOneAndUpdate(
      {_id: req.body.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.countWatch = async function (req, res) {
const myArticle = await Category.find({_id: req.params.id})
const myCount = 1;


  let updated = {
    count : myArticle[0].count + 1
  }
  try {
    const category = await Category.findOneAndUpdate(
      {_id: req.params.id},
      {$set:updated},
      {new: true}
    )
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}
