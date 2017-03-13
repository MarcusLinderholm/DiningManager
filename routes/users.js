var express = require('express');
var router = express.Router();
var userList = require('../models/userList.js')
var mapManager = require('../public/javascripts/mapManager.js')

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/signup', function(req, res, next) {
    userList.addUser(req.body.email, req.body.password, req.body.map, function(err, row, fields) {
        if (err) {
            res.render('login', {
                status: "Email already registered"
            });
        } else {
            userList.addTable(req.body.email, req.body.tables);
            res.render('login', {
                status: "Registration successful, email: " + req.body.email
            });
        }
    });
});

router.post('/login', function(req, res, next) {
    var currentTime = new Date();
    userList.removeBooking(req.body.email, (currentTime.getHours() - 2) + ":00:00");
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
                            for (var i = 0; i < row.length; i++) {
                                arr[i] = {
                                    tableID: row[i].tableID,
                                    time: row[i].time,
                                    name: row[i].name
                                };
                            }
                            res.render('index', {
                                user: req.session.user,
                                map: map,
                                booking: arr

                            });
                        } else {
                            console.log(err);
                        }
                    })
                    req.session.user = req.body.email;
                    req.session.map = row[0].map;
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
    userList.deleteBooking(req.session.user, req.body.id, req.body.time, function(err, row, fields) {
        if (!err) {
            console.log("booking removed");
            userList.getBookings(req.session.user, function(err, row, fields) {
                if (!err) {
                    var arr = [];
                    for (var i = 0; i < row.length; i++) {
                        arr[i] = {
                            tableID: row[i].tableID,
                            time: row[i].time,
                            name: row[i].name
                        };
                    }
                    res.render('index', {
                        status: "Booking removed",
                        map: req.session.map,
                        user: req.session.user,
                        booking: arr
                    })
                } else {
                    console.log(err);
                }
            })
        } else {
            console.log(err);
        }
    })
});

router.post('/booking', function(req, res, next) {
    if (req.body.tableID != 0) {
        userList.bookTable(req.session.user, req.body.tableID, req.body.time, req.body.name, function(err, row, fields) {
            if (!err) {
                var currentTime = new Date();
                userList.removeBooking(req.session.user, (currentTime.getHours() - 2) + ":00:00", function(err, row, fields) {
                    if (!err) {
                        userList.getBookings(req.session.user, function(err, row, fields) {
                            if (!err) {
                                var arr = [];
                                for (var i = 0; i < row.length; i++) {
                                    arr[i] = {
                                        tableID: row[i].tableID,
                                        time: row[i].time,
                                        name: row[i].name
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
                    }
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
            var arr = [];
            for (var i = 0; i < row.length; i++) {
                arr[i] = {
                    tableID: row[i].tableID,
                    time: row[i].time,
                    name: row[i].name
                };
            }
            res.render('index', {
                map: req.session.map,
                user: req.session.user,
                booking: arr
            })
        } else {
            console.log(err);
        }
    })
});

module.exports = router;
