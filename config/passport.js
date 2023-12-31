const passport = require('passport')
const { User } = require('../models')

//JWT 
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }

passport.use(
    new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
      User.findByPk(jwtPayload.id)
        .then((user) => cb(null, user))
        .catch((err) => cb(err))
    })
  )
module.exports = passport

