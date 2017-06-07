
/*
 *Sets the tableID field to the id of the table you
 *click on the canvas
 */
function getTable (map) {
  var scale = 5
  var canvas = document.getElementById('canvas')
  canvas.width = 75 * scale
  canvas.height = 75 * scale
  tables = 0
  tableArray = []
  canvas.addEventListener('click', function (e) {
    var rect = canvas.getBoundingClientRect()
    var scale = 5
    var pos = {
      x: Math.floor(((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width) / scale),
      y: Math.floor(((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height) / scale)
    }
    document.getElementById('tableID').value = map[pos.y][pos.x]
  }, false)
}
/*
 *Returns a list of all bookings in objects with the format
 * {tableID,time}
 */
function getBookings () {
  var arr1 = []
  var arr2 = []
  var bookings = []
  var tableIDs = [].slice.call(document.getElementsByClassName('getTableIDs'))
  var times = [].slice.call(document.getElementsByClassName('getTimes'))

  tableIDs.forEach(function (id) {
    arr1.push({
      tableID: id.innerText
    })
  })

  times.forEach(function (val) {
    // console.log(val.innerText)
    arr2.push({
      time: (val.innerText)
    })
  })

  for (var i = 0; i < arr1.length; i += 1) {
    bookings.push({
      tableID: arr1[i].tableID,
      time: arr2[i].time
    })
  }

  return bookings
}
/*
 *Looks for tables that are currently booked
 *Redraws the map and returns the list of currently
 *booked tables
 */
function getBookedTables (bookings) {
  var currentTime = new Date()
  var bookedTables = []
  bookings.forEach(function (booking) {
    // console.log(booking.time.substring(0,2))
    if (parseInt(booking.time.substring(0, 2)) <= currentTime.getHours() && parseInt(booking.time.substring(0, 2)) + 1 >= currentTime.getHours()) {
      bookedTables.push(parseInt(booking.tableID))
    }
  })
  return bookedTables
}

function deleteTableBooking (email, id, time) {
  console.log('hej')
  dbFunc.deleteBooking(email, id, time)
}
