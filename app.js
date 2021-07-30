const expess = require('express');
const bodyParser  = require('body-parser')
const  authRoutes = require('./routes/auth')
const  categoryRoutes = require('./routes/category')
const  analyticsRoutes = require('./routes/analytics')
const  positionRoutes = require('./routes/position')
const  orderRoutes = require('./routes/order')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const app = expess()

mongoose.connect(keys.mongoURI)
  .then(() => console.log('mongoDB connect'))
  .catch(error => console.log(error))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', expess.static('uploads')) //images
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/order', orderRoutes)

module.exports = app
