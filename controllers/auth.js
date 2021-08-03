const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utilits/errorHandler')

module.exports.login = async function (req, res) {
  console.log('===>req.body.inputForEmail', req.body.inputForEmail);
  const candidate = await User.findOne({inputForEmail: req.body.inputForEmail})
  if (candidate) {
    //password  check, user exists
    const passwordResult = bcrypt.compareSync(req.body.inputForPassword, candidate.inputForPassword)
    if (passwordResult) {
      //token,if user is found and passwords are the same, give user some token
      const token = jwt.sign({ //method of registration in library 'jsonwebtoken'
        inputForEmail: candidate.inputForEmail,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})//<--key for token, (expiresIn:60 * 60) <--save token for 1 hour
      res.status(200).json({
        token: `Bearer ${token}`, //correct token with bearer
        userId: candidate._id,
      })
    } else {
      //Passwords are different
      res.status(401).json({
        message: 'Passwords are not the same'
      })
    }
  } else {
    //user not found, error
    res.status(404).json({
      message: 'User with this email is not found'
    })
  }
}


module.exports.register = async function (req, res) {
  //email password
  const candidate = await User.findOne({inputForPassword: req.body.inputForPassword})
  if (candidate) {
    //user  exists, show error
    res.status(409).json({
      message: 'This email is already used, try other'
    })
  } else {
    //should create user
    //shifr password
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.inputForPassword
    const user = new User({
      inputForEmail: req.body.inputForEmail,
      inputForPassword: bcrypt.hashSync(password, salt),
      name: req.body.name,
      lastName: req.body.lastName
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    name: req.body.name,
    lastName: req.body.lastName,
    description: req.body.description
  }
  try {
    const user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getInfo = async function (req, res) {
  try {
    const articles = await User.find({_id: req.params.id})
    res.status(200).json(articles)
  } catch (e) {
    errorHandler(res, e)
  }
}

