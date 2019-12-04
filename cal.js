
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser= require("body-parser");
const app= express();
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh'}));

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  name: '_es_demo', // The name of the cookie
  secret: '1234',
  store: new FileStore(),
  resave: false,
  proxy: true,
  saveUninitialized: false
}));
var ses;
app.get('/inde.html/:email',function(req,res){
  req.session.name=req.params.email;
  res.send(<h1> <a sessionset:href ="/email">view here</a></h1>);
});
app.get('/inde.html',function(req, res){
  res.send(req.session.name);
});
  //ses.setItem(req.session.email);
  //console.log('req.session.passport.user: ${JSON.stringify(req.session.passport)}');

   // equivalent to $_SESSION['email'] in PHP.
    //sess.username; // equivalent to $_SESSION['username'] in PHP.
    //console.log(sess);
//app.get("/", function(req,res){
  //res.sendFile(__dirname + "/Login.html");
//});

//app.get("/", function(req,res){
//res.sendFile(__dirname + "/Reg.html");
//});

//app.post('/inde/email',function(req,res){
//var Email= (req.body.email);
//console.log("Post");
//console.log(req.sessionID)
//console.log('email id-'+ Email);
//});
//if (sess.email !== req.body.email) {
    //res.sendFile(__dirname + "/Reg.html");

module.exports = app;

app.listen(3000 ,function(){
  console.log("server is running");
});
