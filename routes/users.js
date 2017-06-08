var express = require('express')
var router = express.Router()
var dbFunc = require('../models/userList.js')
var mapManager = require('../public/javascripts/mapManager.js')

router.get('/', function (req, res, next) {
  res.render('login')
})

// Register user
router.post('/signup', function (req, res, next) {
  dbFunc.addUser(req.body.email, req.body.password, req.body.map, function (err, row, fields) {
    if (err) {
      res.render('login', {
        status: 'Email already registered'
      })
    } else {
      console.log(req.body.map)
      console.log(req.body.tables)
      dbFunc.addTable(req.body.email, req.body.tables)
      res.render('login', {
        status: 'Registration successful, email: ' + req.body.email
      })
    }
  })
})

// Login existing user
router.post('/login', function (req, res, next) {
  var currentTime = new Date()
  dbFunc.deleteBookingsByTime(req.body.email, (currentTime.getHours() - 2) + ':00:00')
  dbFunc.userLookup(req.body.email, function (err, row, fields) {
    if (!err) {
      if (row.length == 0) {
        res.render('login', {
          status: 'User not registered'
        })
      } else {
        var map = row[0].map
        if (row[0].password == req.body.password) {
          var arr = []
          dbFunc.getBookings(req.body.email, function (err, row, fields) {
            if (!err) {
              for (var i = 0; i < row.length; i++) {
                arr[i] = {
                  tableID: row[i].tableID,
                  time: row[i].time,
                  name: row[i].name
                }
              }
              res.render('index', {
                user: req.session.user,
                map: map,
                booking: arr

              })
            } else {
              console.log(err)
            }
          })
          req.session.user = req.body.email
          req.session.map = row[0].map
        } else {
          res.render('login', {
            status: 'Wrong password'
          })
        }
      }
    } else throw err
  })
})

// Delete a booking
router.post('/deleteBooking', function (req, res, next) {
  dbFunc.deleteBooking(req.body.email, req.body.id, req.body.time.substring(0, 2), function (err, row, fields) {
    if (!err) {
      dbFunc.getBookings(req.session.user, function (err, row, fields) {
        if (!err) {
          var arr = []
          for (var i = 0; i < row.length; i++) {
            arr[i] = {
              tableID: row[i].tableID,
              time: row[i].time,
              name: row[i].name
            }
          }
          res.render('index', {
            status: 'Booking removed',
            map: req.session.map,
            user: req.session.user,
            booking: arr
          })
        } else {
          console.log(err)
        }
      })
    } else {
      console.log(err)
    }
  })
})

// Book a table
router.post('/booking', function (req, res, next) {
  var timeArr = []
  var check
  // Check if a table is selected
  if (req.body.tableID != 0) {
    // Retrieve bookings for this table
    dbFunc.getTableBookings(req.session.user, req.body.tableID, function (err, row, fields) {
      if (!err) {
        // Put the query results in a new array
        for (var i = 0; i < row.length; i++) {
          timeArr[i] = {
            time: row[i].time,
            name: row[i].name
          }
        }

        if (timeArr.length != 0) {
          if (true) {
            dbFunc.bookTable(req.session.user, req.body.tableID, req.body.time, req.body.name, function (err, row, fields) {
              if (!err) {
                var currentTime = new Date()
                dbFunc.deleteBookingsByTime(req.session.user, (currentTime.getHours() - 2) + ':00:00', function (err, row, fields) {
                  if (!err) {
                    dbFunc.getBookings(req.session.user, function (err, row, fields) {
                      if (!err) {
                        var arr = []
                        for (var i = 0; i < row.length; i++) {
                          arr[i] = {
                            tableID: row[i].tableID,
                            time: row[i].time,
                            name: row[i].name
                          }
                        }
                        res.render('index', {
                          status: 'Table ' + req.body.tableID + ' booked',
                          map: req.session.map,
                          user: req.session.user,
                          booking: arr
                        })
                      } else {
                        console.log(err)
                      }
                    })
                  }
                })
              } else {
                console.log(err)
              }
            })
          } else {
            dbFunc.getBookings(req.session.user, function (err, row, fields) {
              if (!err) {
                var arr = []
                for (var i = 0; i < row.length; i++) {
                  arr[i] = {
                    tableID: row[i].tableID,
                    time: row[i].time,
                    name: row[i].name
                  }
                }
                res.render('index', {
                  status: 'Table ' + req.body.tableID + ' is booked during this time. Please choose another time.',
                  map: req.session.map,
                  user: req.session.user,
                  booking: arr
                })
              } else {
                console.log(err)
              }
            })
          }
        } else {
          dbFunc.bookTable(req.session.user, req.body.tableID, req.body.time, req.body.name, function (err, row, fields) {
            if (!err) {
              var currentTime = new Date()
              dbFunc.deleteBookingsByTime(req.session.user, (currentTime.getHours() - 2) + ':00:00', function (err, row, fields) {
                if (!err) {
                  dbFunc.getBookings(req.session.user, function (err, row, fields) {
                    if (!err) {
                      var arr = []
                      for (var i = 0; i < row.length; i++) {
                        arr[i] = {
                          tableID: row[i].tableID,
                          time: row[i].time,
                          name: row[i].name
                        }
                      }
                      res.render('index', {
                        status: 'Table ' + req.body.tableID + ' booked',
                        map: req.session.map,
                        user: req.session.user,
                        booking: arr
                      })
                    } else {
                      console.log(err)
                    }
                  })
                }
              })
            } else {
              console.log(err)
            }
          })
        }
      }
    })
  } else {
    dbFunc.getBookings(req.session.user, function (err, row, fields) {
      if (!err) {
        var arr = []
        for (var i = 0; i < row.length; i++) {
          arr[i] = {
            tableID: row[i].tableID,
            time: row[i].time,
            name: row[i].name
          }
        }
        res.render('index', {
          status: 'Please select a table',
          map: req.session.map,
          user: req.session.user,
          booking: arr
        })
      } else {
        console.log(err)
      }
    })
  }
})

// Retrieve bookings
router.post('/getBookings', function (req, res, next) {
  var currentTime = new Date()
  dbFunc.deleteBookingsByTime(req.session.user, (currentTime.getHours() - 2) + ':00:00', function (err, row, fields) {
    if (!err) {
      console.log('Removed booking')
    }
  })
  dbFunc.getBookings(req.session.user, function (err, row, fields) {
    if (!err) {
      var arr = []
      for (var i = 0; i < row.length; i++) {
        arr[i] = {
          tableID: row[i].tableID,
          time: row[i].time,
          name: row[i].name
        }
      }
      res.render('index', {
        map: req.session.map,
        user: req.session.user,
        booking: arr
      })
    } else {
      console.log(err)
    }
  })
})


module.exports = router
