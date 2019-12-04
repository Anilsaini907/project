// file:app/index.js
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
// file:app/authenticate/init.js
//const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const app = express()
// file:app/user/init.js
const passport = require('passport')

app.use(session({
  store: new RedisStore({
    //url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.get('/profile', passport.authenticationMiddleware(), renderProfile)

//
const user = {
  username: 'test-user',
  passwordHash: 'bcrypt-hashed-password',
  id: 1
}

passport.use(new LocalStrategy(
 (username, password, done) => {
    findUser(username, (err, user) => {
      if (err) {
        return done(err)}

      // User not found
      if (!user) {
        return done(null, false)
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.passwordHash, (err, isValid) => {
        if (err) {
          return done(err)
        }
        if (!isValid) {
          return done(null, false)
        }
        return done(null, user)
      })
})
}
))
// file:app/authentication/middleware.js
function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}
