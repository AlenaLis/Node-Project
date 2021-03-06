const expess = require('express');
const app = expess()
const  authRoutes = require('./routes/auth')
const  categoryRoutes = require('./routes/category')
const  analyticsRoutes = require('./routes/analytics')
const  positionRoutes = require('./routes/position')
const  orderRoutes = require('./routes/order')

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/order', orderRoutes)

module.exports = app
