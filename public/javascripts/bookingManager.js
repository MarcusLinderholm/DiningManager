function getTable(map) {
    var scale = 5;
    var canvas = document.getElementById("canvas");
    canvas.width = 75 * scale;
    canvas.height = 75 * scale;
    tables = 0;
    tableArray = [];
    canvas.addEventListener('click', function(e) {
        var rect = canvas.getBoundingClientRect();
        var scale = 5;
        var pos = {
            x: Math.floor(((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width) / scale),
            y: Math.floor(((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height) / scale)
        };
        //if (document.getElementById("tableCheckBox").checked) {
        //console.log(map);
        console.log(map[pos.y][pos.x]);
        document.getElementById("tableID").value = map[pos.y][pos.x]; 
        //}
    }, false);
}
function getBookings(){
    var bookings = [];
    var tables = document.getElementsByClassName("getTableID");
    var arr = [].slice.call(tables);
    arr.forEach(function(val) {
        bookings.push({tableID:(val.innerHTML).substring(2,5), time:(val.innerHTML).substring(8,16)});
        //console.log((val.innerHTML).substring(8,25));
        //console.log((val.innerHTML).substring(2,5));
    });
    return bookings;
}
function getBookedTables(bookings){
    var currentTime = new Date();
    var bookedTables = []
    var currTime = currentTime.getHours()*60*60 + currentTime.getMinutes()*60;
    //console.log(currTime);
    //console.log(bookings);
    var bookingTime;
    bookings.forEach(function(booking){
        if(parseInt(booking.time.substring(0,3))<=currentTime.getHours() && parseInt(booking.time.substring(0,3))+1>=currentTime.getHours()){
        bookedTables.push(parseInt(booking.tableID));
        console.log("booked tables" + bookedTables);
        }
        
        
        
    });
    updateDraw(map,bookedTables);
    return bookedTables;
}