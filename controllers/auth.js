const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utilits/errorHandler')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    //password  check, user exists
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      //token,if user is found and passwords are the same, give user some token
      const token = jwt.sign({ //method of registration in library 'jsonwebtoken'
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})//<--key for token, (expiresIn:60 * 60) <--save token for 1 hour
      res.status(200).json({
        token: `Bearer ${token}`//correct token with bearer
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
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    //user  exists, show error
    res.status(409).json({
      message: 'This email is already used, try other'
    })
  } else {
    //should create user
    //shifr password
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }

  }
}
