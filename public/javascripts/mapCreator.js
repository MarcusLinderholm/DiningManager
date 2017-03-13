/*
*Adds a table to wherever the pointer is on the canvas. Overlaps checks to see
*if the new table would share pixels with an existing one.
*/
function tableCreator() {
    var scale = 5;
    var canvas = document.getElementById("canvas");
    dimension = document.getElementById("restaurantSize").value;
    canvas.width = dimension * scale;
    canvas.height = dimension * scale;
    currentMap = [];
    clearMap(dimension);
    tables = 0;
    tableArray = [];
    canvas.addEventListener('click', function(e) {
        var rect = canvas.getBoundingClientRect();
        var tableSize = document.getElementById("tableSize").value;
        var scale = 5;
        var pos = {
            x: Math.floor(((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width) / scale),
            y: Math.floor(((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height) / scale)
        };
        if (!overlaps(pos.x, pos.y, tableSize)) {
            tables++;
            addTable(pos.x, pos.y, tableSize, tables);
            tableArray.push(tables);
        }
    }, false);
}
