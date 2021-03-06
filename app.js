var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mustacheExpress = require('mustache-express')
var session = require('express-session')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'shhhhhhhhhh', name: 'todolistcookie',
    // store: sessionStore,
    // proxy: true,
  resave: true,
  saveUninitialized: true
}))

// view engine setup
app.engine('html', mustacheExpress())
app.set('view engine', 'html')
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'))

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
if (app.get('env') === 'development') {
  console.log('In development mode')
  app.use(function (err, req, res, next) {
    console.log('Error:' + err.stack)
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
} else {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
  })
}

module.exports = app
