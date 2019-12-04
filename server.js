const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser= require("body-parser");
const app = express();
const LocalStrategy = require('passport-local').Strategy
//const bcrypt= require ('bcrypt')
//const bcrypt = require('bcrypt');
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const flash = require ('express-flash')
//const initializePassport= require('./passport-config');
function initialize (passport,getUserByEmail){

const authenticateUser = async (email,password,done ) =>{
const user = getUserByEmail(email)
if (user==null){
  return done(null, false, { message: 'no user with that email'})
}
//try{
  //if (await bcrypt.compare(password,user.password)){
    //return done(null,user)
  //}
  else{
    return done (null, false, { message:'password wrong' })
  }
  //}
//catch(e){
  //return done(e)
//}
  }
  passport.use(new LocalStrategy({usernameField:'email'},
  authenticateUser))
  passport.serializerUser((user,done) => { })
  passport.deserializerUser((id, done) =>{ })
}
//initializePassport (passport, email => users.find (user => user.email === email)
//);
require("dotenv").config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh'}));
app.use(flash())
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
  genid: (req) => {
    //console.log('Inside the session middleware')
    console.log(req.sessionID)
    //return uuid() // use UUIDs for session IDs
  },
  name: '_es_demo', // The name of the cookie
  secret: '1234',
  store: new FileStore(),
  resave: false,
  saveUninitialized: false
}));
const users=[]

  app.get("/loginpage.html",function(req, res){
    res.sendFile(__dirname +"/loginpage.html");});

    app.get("/Regi.html",function(req, res){
      res.sendFile(__dirname +"/Regi.html")});

      app.post("/Regi.html",async function(req, res){
        try{
          //const hashedPassword= await bcrypt.hash(req.body.password, 10)
          users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
          })
          res.sendFile(__dirname +"/loginpage.html")
        }
        catch{res.redirect('/Regi.html')} console.log(users)
      });
    app.post("/loginpage.html",passport.authenticate('local',{
      successRedirect:'/',
      failureRedirect: '/loginpage'

    }));

app.listen(3000, function(){
  console.log("server strated");
});
module.exports =initialize
