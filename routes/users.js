var express = require('express');
var router = express.Router();
var userList = require('../models/userList.js')
<<<<<<< 56f32c5c41bea85082bd833e48ad7cc1bcb804ca
var draw = require('../public/javascripts/draw.js')
=======
>>>>>>> Removed dependency on dimensions
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
            console.log(req.body.map);
            res.render('login', {
                status: "Email already registered"
            });
        } else {
            res.render('login', {
                status: "Registration successful, email: " + req.body.email
            });
            console.log(req.body.map);
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
                    res.render('index', {
<<<<<<< 56f32c5c41bea85082bd833e48ad7cc1bcb804ca
                        map: mapManager.stringToMap(row[0].map)
=======
                        map: row[0].map
>>>>>>> Removed dependency on dimensions
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


module.exports = router;
