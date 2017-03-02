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


    userList.addUser(req.body.email, req.body.password, req.body.map, function(err, row, fields){
        if(err){

            console.log(err);
            console.log(req.body.map);
            res.render('login', {status: "A user with this email is already registered"});
        }
        else {
            res.render('login', {status: "Registration successful"});
            console.log(req.body.map);
            //console.log(req.body.createRestaurant.value);

        }
    });



});

router.post('/login', function(req, res, next) {
    //console.log("add mail");
    userList.userLookup(req.body.email, function(err, row, fields){
        if(!err){
            if(row.length == 0){
                res.render('login', {status: "Email doesn't exist"});
            }
            else{
                if(row[0].password == req.body.password){
                    res.render('index', {map: row[0].map});
                }
                else {
                    res.render('login', {status: "Wrong password"});
                }
            }
        }
        else throw err;

    });

});


module.exports = router;
