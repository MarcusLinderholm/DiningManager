function main(){
  var canvas = document.getElementById("canvas");
  dimension = document.getElementById("restaurantSize").value;
  canvas.width=dimension*scale;
  canvas.height=dimension*scale;
  map = clearMap(dimension);
  draw(map);
  console.log("testXD");

  var tables = 0;
  canvas.addEventListener('click', function(e) {
    var rect = canvas.getBoundingClientRect();
    var tableSize = document.getElementById("tableSize").value;
    var pos = {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
    if(document.getElementById("tableCheckBox").checked){
      map = addTable(Math.floor(pos.x/scale),Math.floor(pos.y/scale),tableSize, map, tables);
      tables++;
      draw(map);
    }else{
      console.log(map[Math.floor(pos.x/scale)][Math.floor(pos.y/scale)].type);

    }
  },false);
}
