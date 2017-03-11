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
        bookings.push({tableID:(val.innerHTML).substring(2,3), time:(val.innerHTML).substring(8,16)});
    });
    return bookings;
}
function getBookedTables(bookings){
    var currentTime = new Date();
    var bookedTables = []
    bookings.forEach(function(booking){
        if(parseInt(booking.time.substring(0,2))<=currentTime.getHours() && parseInt(booking.time.substring(0,2))+2>=currentTime.getHours() 
        && parseInt(booking.time.substring(3,5))<=currentTime.getMinutes()){
            bookedTables.push(parseInt(booking.tableID));
            console.log("booked tables" + bookedTables);
        }
    //    if(!parseInt(booking.time.substring(0,2))<=currentTime.getHours() && !parseInt(booking.time.substring(0,2))+2>=currentTime.getHours() 
    //    && !parseInt(booking.time.substring(3,5))<=currentTime.getMinutes()){
        else{
            
            bookedTables.pop();
            console.log("removed table " + booking.tableID);
        }
        
        
    });
    updateDraw(map,bookedTables);
    return bookedTables;
}