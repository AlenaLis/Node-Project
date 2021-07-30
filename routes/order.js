const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()


router.post('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/',passport.authenticate('jwt', {session: false}), controller.create)

module.exports =  router
