var express = require('express');
var router = express.Router();
var userList = require('../models/userList.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login');
  /*
  regUser.getUsers(function(err, rows, fields) {
      //console.log(JSON.stringify(rows));
      console.log("hej");
      console.log(rows);
      res.render('index');
  })
  */
});

router.post('/signup', function(req, res, next) {
    //console.log("add mail");
    userList.addUser(req.body.email, req.body.password);
    res.redirect("/users");
});

router.post('/login', function(req, res, next) {
    //console.log("add mail");
    userList.userLookup(req.body.email, req.body.password);
    res.redirect("/users");
});


module.exports = router;
