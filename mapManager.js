function clearMap(dimension) {
  map = [];
  for(i=0;i<dimension;i++) {
    map[i] = [];
    for(j=0;j<dimension;j++){
      map [i][j] = 0;
    }
  }
  draw(map);
  return map;
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
  tables++;
  draw(currentMap);
}
