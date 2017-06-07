/*
 *Creates a matrix size "dimension"
 *and fills it with all zero(floor)
 *then draws it onto the canvas
 *returns nothing
 */

function clearMap (dimension) {
  currentMap = []
  for (i = 0; i < dimension; i++) {
    currentMap[i] = []
    for (j = 0; j < dimension; j++) {
      currentMap[i][j] = 0
    }
  }
  draw(currentMap)
}
/*
 *If there is a table at any of the affected pixels
 *return false
 */
function overlaps (xCord, yCord, size) {
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (!currentMap[yCord + i][xCord + j] == 0) {
        return true
      }
    }
  }
  return false
}

/*
 *Adds a table of size "size" at "xCord","yCord" with id "id"
 *then redraws the map
 */
function addTable (xCord, yCord, size, id) {
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (yCord + i < dimension && xCord + j < dimension) {
        currentMap[yCord + i][xCord + j] = id
      }
    }
  }
  draw(currentMap)
}

/*
 *Converts 2D-array to String for
 *database storage
 */
function mapToString (map) {
  var jsonString = ''
  map.forEach(function (row) {
    jsonString += JSON.stringify(row) + '|'
  })
  return jsonString
}

/*
 *Reverses the conversion for
 *database retrieval
 */
function stringToMap (mapString) {
  var array = mapString.toString().split('|')
  var map = []
  var i = 0
  array.forEach(function (row) {
    map[i] = (row.substring(1, row.length - 1)).split(',')
    i++
  })
  return map
}
function redrawMap(map){
  var s = map
  map = stringToMap(s)
  draw(map)
  getTable(map)
  var bookings = getBookings()
  var bookedTables = getBookedTables(bookings)
  updateDraw(map, bookedTables)

  setInterval(function() {
    console.log("hehe");
    var bookings = getBookings()
    var bookedTables = getBookedTables(bookings)
    updateDraw(map, bookedTables)
  }, 5000);
}
