const LocalStrategy =require('passport-local').Strategy
const bcrypt= require ('bcrypt')
function initialize(passport,getUserByEmail){

const authenticateUser = async (email,password,done ) =>{
const user = getUserByEmail(email)
if (user==null){
  return done(null, false, { message: 'no user with that email'})
}
try{
  if (await bcrypt.compare(password,user.password)){
    return done(null,user)
  }else{
    return done (null, false, { message:'password wrong' })
  }
  }
catch(e){
  return done(e)
}
  }
  passport.use(new LocalStrategy({usernameField:'email'},
  authenticateUser))
  passport.serializerUser((user,done) => { })
  passport.deserializerUser((id, done) =>{ })
}
module.exports =initialize
