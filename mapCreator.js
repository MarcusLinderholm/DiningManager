function tableCreator() {
  var canvas = document.getElementById("canvas");
  dimension = document.getElementById("restaurantSize").value;
  canvas.width=dimension*scale;
  canvas.height=dimension*scale;
  currentMap = [];
  clearMap(dimension);
  tables = 0;
  tableArray = [];
  canvas.addEventListener('click', function(e) {
    var rect = canvas.getBoundingClientRect();
    var tableSize = document.getElementById("tableSize").value;
    var pos = {
      x: Math.floor((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
      y: Math.floor((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
    if(document.getElementById("tableCheckBox").checked){
      if(!overlaps(pos.x,pos.y,tableSize)){
        tables++;
        addTable(pos.x,pos.y,tableSize,tables);
        tableArray.push(tables);
      }
    }
  },false);
}

function restaurantCreator(){
    /*
    Map where Email is currentEmail <- mapToString(currentMap)
    createTable id, email <- tableArray.forEach
    */
    console.log(mapToString(currentMap));
    tableArray.forEach(function(table){
      console.log(table);
    });
}
