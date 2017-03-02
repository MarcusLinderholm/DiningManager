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
    //console.log(userList.addUser(req.body.email, req.body.password));
    //res.redirect("/users");


    userList.addUser(req.body.email, req.body.password, req.body.createRestaurant, function(err, row, fields){
        if(err){
            res.render('login', {status: "user exists"});
            console.log(err);
        }
        else {
            res.render('login', {status: "registration successful"});
            console.log(req.body.createRestaurant);

        }
    });



});

router.post('/login', function(req, res, next) {
    //console.log("add mail");
    userList.userLookup(req.body.email, function(err, row, fields){
        if(err)
            console.log(err);
        else {

            if(row[0].password == req.body.password){
                res.render('index', {title: "Logged in as: " + req.body.email});
            }
            else {
                res.render('login', {status: "Wrong password"});
            }

        }
    });

});


module.exports = router;
