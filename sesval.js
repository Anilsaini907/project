//At Server side,
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

app.get("/", function(req,res){
res.sendFile(__dirname + "/inde.html");

});
app.post('/Login.html', notLoggedIn, function(req, res) {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    } if (user) {
            req.session.user = user;
            res.redirect('/Welcome.html');
        } else {
            res.redirect('/Registar.html');
        }
    });
});
