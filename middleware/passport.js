//check: can we give token to user or not
const JwtStrategy = require('passport-jwt').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('users')
const ExtractJwt = require('passport-jwt').ExtractJwt

const keys = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')  //userId-we take it from token from auth.js
        if (user) { //in node.js first param - error!
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) { //if error - > ccc error
        console.log(e);
      }
    })
  )
}
