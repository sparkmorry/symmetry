var num, i, count;
var drawOn, Btime;
var pos = [];
var Gpos = [];
var magic, ctx;

var color = 'rgba(255,255,255,0.7)';
var width = 300, height=300;
var angleRotate, drawTimer;

function Point(x, y, ctime){
  this.x = x;
  this.y = y;
  // this.drag = drag;
  if(ctime){
    this.ctime = ctime;
  }else{
    var now = new Date();
    now = now.getTime();
    this.ctime = now; 
  }
}

function Transform(num, tarX, tarY){
  this.num=num;
  this.tarX=tarX;
  this.tarY=tarY;
  this.posX=[];
  this.posY=[];
}
var dist = function(x1, y1, x2, y2){
  var tmp = Math.pow((x1-x2), 2)+Math.pow((y1-y2), 2);
  return Math.sqrt(tmp)
}
Transform.prototype.trans = function(x, y) {
    var dx=x-this.tarX;
    var dy=y-this.tarY;
    var l=parseInt(dist(x, y, this.tarX, this.tarY));
    var angleStart=Math.atan(dy/dx);
    //为了angle角能正常表示
    if(dx<0){
     angleStart=Math.PI+Math.atan(dy/dx);
    }
    
    for(var i=0;i<num-1;i++){
      
      var angleEnd=angleStart-angleRotate*(i+1);
      this.posX[i]=parseInt(this.tarX+l*Math.cos(angleEnd));
      this.posY[i]=this.tarY+parseInt(l*Math.sin(angleEnd));
      
    }
};

var init = function(){
  ctx=document.getElementById("canvas").getContext("2d");
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  ctx.lineWidth = 1;  
  num=10;
  i=1;
  count=0;
  angleRotate=2*Math.PI/num;
  magic = new Transform(num,width/2,height/2);

  $("#canvas").drawMouse();
  $("#canvas").drawTouch();
}
$("#generate").bind('click', function(){
   for(var i=0;i<count;i++){
     magic.trans(pos[i].x,pos[i].y);
     var tmp = [];
     for(var j=0;j<num-1;j++){
        var pt = new Point(magic.posX[j], magic.posY[j], pos[i].ctime);
        tmp.push(pt); 
     }
     Gpos[i] = tmp;
   }
   console.log(Gpos);
   drawOn=true;
   Btime=(new Date()).getTime();
   drawTimer = setInterval(draw, 40);
});

$.fn.drawTouch = function() {
  var clicked = 0;
  var start = function(e) {
    clicked = 1;
    // ctx.beginPath();
    x = e.pageX - canvasX;
    y = e.pageY - canvasY;
    // ctx.moveTo(x,y);
  };
  var move = function(e) {
    if(clicked){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineCap = 'round';
      ctx.lineWidth = 2;
      ctx.lineTo(e.pageX - canvasX , e.pageY - canvasY);
      ctx.strokeStyle = 'white';
      ctx.stroke();
      x = e.pageX - canvasX;
      y = e.pageY - canvasY;
      pos.push(new Point(x,y));
      count+=1;

    }
  };
  var stop = function(e) {
    clicked=0;
    ctx.closePath();

    pos.push(new Point(0,0));
    count+=1;
  };
  var canvas = document.getElementById("canvas");
  canvas.addEventListener('touchstart', start, false);
  canvas.addEventListener('touchmove', move, false);
  document.addEventListener('touchend', stop, false);
};

$.fn.drawMouse = function() {
  var clicked = 0;
  var canvasX = document.getElementById("canvas").offsetLeft;
  var canvasY = document.getElementById("canvas").offsetTop;

  var start = function(e) {
    clicked = 1;
    // ctx.beginPath();
    x = e.pageX - canvasX;
    y = e.pageY - canvasY;
    // ctx.moveTo(x,y);
  };
  var move = function(e) {
    if(clicked){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineCap = 'round';
      ctx.lineWidth = 2;
      ctx.lineTo(e.pageX - canvasX , e.pageY - canvasY);
      ctx.strokeStyle = 'white';
      ctx.stroke();
      x = e.pageX - canvasX;
      y = e.pageY - canvasY;
      pos.push(new Point(x,y));
      count+=1;

    }
  };
  var stop = function(e) {
    clicked=0;
    ctx.closePath();

    pos.push(new Point(0,0));
    count+=1;
  };
  $(this).on("mousedown", start);
  $(this).on("mousemove", move);
  $(window).on("mouseup", stop);
};

var draw = function(){
  if(drawOn){
    var now = (new Date()).getTime();
    if(i>=count){
      drawOn=false;  
    }else if(drawOn&&(now-Btime>pos[i].ctime-pos[i-1].ctime)&&((pos[i-1].x==0&&pos[i-1].y==0)||(pos[i].x==0&&pos[i].y==0))){
      i+=1;
    }else if(drawOn&&(now-Btime>pos[i].ctime-pos[i-1].ctime)&&!((pos[i-1].x==0&&pos[i-1].y==0)||(pos[i].x==0&&pos[i].y==0))){
      for(var k=0;k<num-1;k++){
     //   c=color(hue+(k+1)*360/num,255,255,150);
        ctx.beginPath();
        ctx.moveTo(Gpos[i][k].x, Gpos[i][k].y);
        ctx.lineTo(Gpos[i-1][k].x, Gpos[i-1][k].y);
        ctx.closePath();
        ctx.stroke();


        // line(Gpos[i][k][0],Gpos[i][k][1],Gpos[i-1][k][0],Gpos[i-1][k][1]);
      }
      i+=1;
    }
  }else{
    clearInterval(drawTimer);
  }   
}
// void draw(){
 
//   if(drawOn){
//     if(i>=count){
//       drawOn=false;  
//     }else if(drawOn&&(millis()-Btime>pos[i][2]-pos[i-1][2])&&((pos[i-1][0]==0&&pos[i-1][1]==0)||(pos[i][0]==0&&pos[i][1]==0))){
//       i+=1;
//     }else if(drawOn&&(millis()-Btime>pos[i][2]-pos[i-1][2])&&!((pos[i-1][0]==0&&pos[i-1][1]==0)||(pos[i][0]==0&&pos[i][1]==0))){
//       for(int k=0;k<num-1;k++){
//      //   c=color(hue+(k+1)*360/num,255,255,150);
       
//         line(Gpos[i][k][0],Gpos[i][k][1],Gpos[i-1][k][0],Gpos[i-1][k][1]);
//       }
//       i+=1;
//     }
//   } 
 
// }
$('body').bind('touchmove',function(event){
  event.preventDefault();
});
init();
