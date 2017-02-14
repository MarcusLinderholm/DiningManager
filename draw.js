function draw(board) {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var imgData = ctx.createImageData(scale,scale);
      for(i=0;i<dimension;i++){
        for(j=0;j<dimension;j++){
          switch(board[i][j].type){
            case "floor":
              for (n=0;n<imgData.data.length;n+=4){
                imgData.data[n+0]=0;
                imgData.data[n+1]=255;
                imgData.data[n+2]=0;
                imgData.data[n+3]=255;
              }
              break;
            case "table":
              for (n=0;n<imgData.data.length;n+=4){
                imgData.data[n+0]=255;
                imgData.data[n+1]=0;
                imgData.data[n+2]=0;
                imgData.data[n+3]=255;
              }
          }
        ctx.putImageData(imgData,j*scale,i*scale);
      }
    }
  }
}
