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
