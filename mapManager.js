function clearMap(dimension){
  map = [];
  for(i=0;i<dimension;i++){
    map[i] = [];
    for(j=0;j<dimension;j++){
      map [i][j] = {type: "floor"};
    }
  }
  return map;
}

function addTable(xCord, yCord, size, map, id){
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(yCord+i<dimension&&xCord+j<dimension){
          map[yCord+i][xCord+j] = {type: "table"};
      }
    }
  }
  return map;
}
