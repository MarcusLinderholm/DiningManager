var express = require('express');
var router = express.Router();
var userList = require('../models/userList.js')



var mapManager = require('../public/javascripts/mapManager.js')

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


    userList.addUser(req.body.email, req.body.password, req.body.map, function(err, row, fields) {
        if (err) {

            console.log(err);
            //console.log(req.body.map);
            res.render('login', {
                status: "Email already registered"
            });
        } else {

            userList.addTable(req.body.email, req.body.tables);

            //console.log(req.body.tables);
            res.render('login', {
                status: "Registration successful, email: " + req.body.email
            });


            //console.log(req.body.map);
            //console.log(req.body.createRestaurant.value);

        }
    });







});

router.post('/login', function(req, res, next) {
    //console.log("add mail");
    userList.userLookup(req.body.email, function(err, row, fields) {
        if (!err) {
            if (row.length == 0) {
                res.render('login', {
                    status: "User not registered"
                });
            } else {
                if (row[0].password == req.body.password) {
                    req.session.user = req.body.email;
                    console.log(req.body.email);
                    res.render('index', {
                        user: req.session.user,
                        map: row[0].map

                    });
                } else {
                    res.render('login', {
                        status: "Wrong password"
                    });
                }
            }
        } else throw err;

    });

});


router.post('/booking', function(req, res, next) {
    userList.bookTable(req.session.user, req.body.tableID, req.body.hour, function(err, row, fields){
        console.log(req.body.tableID);
        if(!err){
            console.log("booking of table " + req.body.tableID + " successful");

        }
        else {
            console.log(req.body.tableID);
            console.log(err);
        }
    })
});

module.exports = router;
