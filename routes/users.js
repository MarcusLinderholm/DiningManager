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
    var currentTime = new Date();
    userList.removeBooking(req.body.email, (currentTime.getHours() - 2) + ":00:00", function(err, row, fields) {
        console.log(currentTime.getHours());
        if (!err) {
            console.log("Removed booking");
        }
    })
    userList.userLookup(req.body.email, function(err, row, fields) {
        if (!err) {
            if (row.length == 0) {
                res.render('login', {
                    status: "User not registered"
                });
            } else {
                var map = row[0].map;
                if (row[0].password == req.body.password) {
                    var arr = [];
                    userList.getBookings(req.body.email, function(err, row, fields) {
                        if (!err) {
                            //console.log(row);
                            for (var i = 0; i < row.length; i++) {
                                arr[i] = {
                                    tableID: row[i].tableID,
                                    time: row[i].time
                                };
                            }

                            res.render('index', {
                                user: req.session.user,
                                map: map,
                                booking: arr

                            });
                            //console.log(arr);
                        } else {
                            console.log(err);
                        }
                    })
                    req.session.user = req.body.email;
                    req.session.map = row[0].map;
                    console.log(req.body.email);

                } else {
                    res.render('login', {
                        status: "Wrong password"
                    });
                }
            }
        } else throw err;

    });

});

router.post('/deleteBooking', function(req, res, next) {
    userList.deleteBooking(req.session.user, req.body.tableID, req.body.time, function(err, row, fields){
        if(!err){
            console.log("booking removed");
            userList.getBookings(req.session.user, function(err, row, fields) {
                if (!err) {
                    for (var i = 0; i < row.length; i++) {
                        console.log(row[i].email);
                    }
                    //console.log(row);
                    var arr = [];
                    for (var i = 0; i < row.length; i++) {
                        arr[i] = {
                            tableID: row[i].tableID,
                            time: row[i].time
                        };
                    }
                    console.log(arr);
                    res.render('index', {
                        status: "Booking removed",
                        map: req.session.map,
                        user: req.session.user,
                        booking: arr


                        //bookings: row
                    })
                } else {
                    console.log(err);
                }
            })
        }
        else {
            console.log(err);
        }
    })
});

router.post('/booking', function(req, res, next) {
            var currentTime = new Date();
            userList.removeBooking(req.session.user, (currentTime.getHours() - 2) + ":00:00", function(err, row, fields) {
                console.log(currentTime.getHours());
                if (!err) {
                    console.log("Removed booking");
                }
            })
            userList.getBookings(req.session.user, function(err, row, fields) {
                    if (!err) {
                        //console.log(row);
                        var currentTime = new Date();
                        var arr = [];

                        for (var i = 0; i < row.length; i++) {
                            arr[i] = {
                                tableID: row[i].tableID,
                                time: row[i].time
                            };
                        }
                        var check;
                        arr.forEach(function(booking) {
                            if (!(parseInt(booking.time.substring(0, 3)) <= parseInt(req.body.time.substring(0, 2))) &&
                                !(parseInt(booking.time.substring(0, 3)) + 1 >= parseInt(req.body.time.substring(0, 2))) &&
                                booking.tableID == req.body.tableID) {
                                console.log(booking);
                                console.log(parseInt(booking.time.substring(0, 3)) + 1);
                                check = true;

                            } else {
                                check = false;
                            }
                        })

                        console.log(check);
                        if (check) {

                            res.render('index', {

                                status: "Table already booked",
                                map: req.session.map,
                                user: req.session.user,
                                booking: arr
                            })
                        } else {

                            if (req.body.tableID != 0) {
                                userList.bookTable(req.session.user, req.body.tableID, req.body.time, function(err, row, fields) {
                                    if (!err) {
                                        var currentTime = new Date();
                                        userList.removeBooking(req.session.user, (currentTime.getHours() - 2) + ":00:00", function(err, row, fields) {

                                            userList.getBookings(req.session.user, function(err, row, fields) {
                                                if (!err) {
                                                    for (var i = 0; i < row.length; i++) {
                                                        console.log(row[i].email);
                                                    }
                                                    var arr = [];
                                                    for (var i = 0; i < row.length; i++) {
                                                        arr[i] = {
                                                            tableID: row[i].tableID,
                                                            time: row[i].time
                                                        };
                                                    }
                                                    res.render('index', {
                                                        status: "Table " + req.body.tableID + " booked",
                                                        map: req.session.map,
                                                        user: req.session.user,
                                                        booking: arr
                                                    })

                                                } else {
                                                    console.log(err);
                                                }

                                            })
                                            console.log("inactive tables removed");
                                        })
                                    } else {
                                        console.log(err);
                                    }
                                })
                            } else {
                                    res.render('index', {
                                        status: "Please select a table",
                                        map: req.session.map,
                                        user: req.session.user,
                                        booking: arr
                                    })
                                }

                            }









                        } else {
                            console.log(err);
                        }


                    })

            });




        router.post('/getBookings', function(req, res, next) {
            var currentTime = new Date();
            userList.removeBooking(req.session.user, (currentTime.getHours() - 2) + ":00:00", function(err, row, fields) {
                console.log(currentTime.getHours());
                if (!err) {
                    console.log("Removed booking");
                }
            })
            userList.getBookings(req.session.user, function(err, row, fields) {
                if (!err) {
                    for (var i = 0; i < row.length; i++) {
                        console.log(row[i].email);
                    }
                    //console.log(row);
                    var arr = [];
                    for (var i = 0; i < row.length; i++) {
                        arr[i] = {
                            tableID: row[i].tableID,
                            time: row[i].time
                        };
                    }
                    console.log(arr);
                    res.render('index', {
                        map: req.session.map,
                        user: req.session.user,
                        booking: arr


                        //bookings: row
                    })
                } else {
                    console.log(err);
                }
            })
        });


        module.exports = router;
