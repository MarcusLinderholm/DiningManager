function clearMap(dimension){
  currentMap = [];
  for(i=0;i<dimension;i++){
    currentMap[i] = [];
    for(j=0;j<dimension;j++){
      currentMap[i][j] = 0;
    }
  }
  draw(currentMap);
}

function overlaps(xCord, yCord, size){
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(!currentMap[yCord+i][xCord+j]==0){
        return true;
      }
    }
  }
  return false;
}

function addTable(xCord, yCord, size, id){
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(yCord+i<dimension&&xCord+j<dimension){
        currentMap[yCord+i][xCord+j] = id;
      }
    }
  }
  draw(currentMap);
}

function mapToString(map){
  var jsonString = "";
  map.forEach(function(row){
    jsonString += JSON.stringify(row) + "|";
  });
  return jsonString;
}



function stringToMap(mapString){
  var array = mapString.toString().split("|");
  var map = [];
  var i = 0;
  array.forEach(function(row){
    map[i] = (row.substring(1,row.length-1)).split(",");
    i++;
  });
  return map;
}
