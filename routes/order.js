const express = require('express')
const router = express.Router()
const controller = require('../controllers/order')

router.post('/', controller.getAll)
router.get('/', controller.create)

module.exports =  router
