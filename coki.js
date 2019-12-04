
let express = require('express');
let cookieParser = require('cookie-parser');
let app = express()
app.use(cookieParser());

//Session
//var session = require('express-session');
//app.use(session({secret: "Shh, its a secret!"}));
//app.get('/', function(req, res){
   //if(req.session.page_views){
      //req.session.page_views++;
      //res.send("You visited this page " + req.session.page_views + " times");
   //} else {
    //  req.session.page_views = 1;
      //res.send("Welcome to this page for the first time!");
   //}
//});

//Cookies
//app.get('/', function(req, res){
//res.cookie('name', 'Anil', {maxAge: 10000}); //Sets name = express
//});
//app.get('/', function(req, res){
 //res.clearCookie('name', 'Anil').send('cookie foo cleared');
//});
app.listen(3000, (err)=>{
if(err)
throw err;
console.log('listening on port 3000');
});
