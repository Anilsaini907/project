var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(morgan('dev'));
app.use(passport.initialize());
require('./config/passport')(passport);

var routes = require('./routes/index');
var register = require('./routes/register');
var authenticate = require('./routes/authenticate');
var dashboard = require('./routes/dashboard');

app.use('/', routes);
app.use('/register', register);
app.use('/authenticate', authenticate);
app.use('/dashboard', dashboard);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Now let's have a look at the register.js, located in routes/register.js:

var express = require('express');
var router = express.Router();




router.post('/', function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        console.log(req.body);
        console.log(req.body.email);
        res.json({success: false, message: 'Please enter email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, message: 'That email address already exists.'});
            }
            res.json({success: true, message: 'Successfully created new user.'});
        });
    }
});

module.exports = router;
module.exports = app;
