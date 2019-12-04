//npm modules
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser= require("body-parser");

var multer = require('multer');
var upload = multer();
// create the server
const app = express();

// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You got home page!\n`)
})

//create the login get and post routes

app.get('/Login.html', (req, res) => {
console.log('Inside GET /login callback function')
console.log(req.sessionID)
res.sendFile(__dirname +"/inde.html")
})
app.post('/inde.html', function(req,res){
var num1= Number(req.body.num1);
var num2= Number(req.body.num2);
var result= num1 + num2;
console.log(result);
console.log(req.body)
res.send("addition is" +result);
});

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
