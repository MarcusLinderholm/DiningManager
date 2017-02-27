var express = require('express');
var router = express.Router();
var userList = require('../models/userList.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  userList.getUsers(function(err, rows, fields) {
      //console.log(JSON.stringify(rows));
      console.log("hej");
      console.log(rows);
      res.render('index');
  })
});

module.exports = router;
