/*
*Draws to "canvas"
*color is decided based on the map
*where every element == 0 is considered floor
*and != tables
*/
function draw(board) {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var scale = 5;
    var imgData = ctx.createImageData(scale,scale);
      for(i=0;i<board.length;i++){
        for(j=0;j<board.length;j++){
          switch(parseInt(board[i][j])){
            case 0:
              for (n=0;n<imgData.data.length;n+=4){
                imgData.data[n+0]=0;
                imgData.data[n+1]=255;
                imgData.data[n+2]=0;
                imgData.data[n+3]=255;
              }
              break;
            default:
              for (n=0;n<imgData.data.length;n+=4){
                imgData.data[n+0]=139;
                imgData.data[n+1]=69;
                imgData.data[n+2]=19;
                imgData.data[n+3]=255;
              }
        }
        ctx.putImageData(imgData,j*scale,i*scale);
      }
    }
  }
}

/*
*Draws to "canvas"
*tableIDs that exist in "bookedTables"
*(tables that are currently booked)
*are drawn in another color.
*/
function updateDraw(board, bookedTables) {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var scale = 5;
    var imgData = ctx.createImageData(scale,scale);
      for(i=0;i<board.length;i++){
        for(j=0;j<board.length;j++){
          switch(parseInt(board[i][j])){
            case 0:
              for (n=0;n<imgData.data.length;n+=4){
                imgData.data[n+0]=0;
                imgData.data[n+1]=255;
                imgData.data[n+2]=0;
                imgData.data[n+3]=255;
              }
              break;
            default:
              if(!bookedTables.includes(parseInt(board[i][j]))){
                for (n=0;n<imgData.data.length;n+=4){
                  imgData.data[n+0]=139;
                  imgData.data[n+1]=69;
                  imgData.data[n+2]=19;
                  imgData.data[n+3]=255;
                }
              }else{
                for (n=0;n<imgData.data.length;n+=4){
                  imgData.data[n+0]=255;
                  imgData.data[n+1]=0;
                  imgData.data[n+2]=0;
                  imgData.data[n+3]=255;
                }
              }
        }
        ctx.putImageData(imgData,j*scale,i*scale);
      }
    }
  }
}
