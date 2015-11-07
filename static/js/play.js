var num, i, count;
var drawOn, Btime;
var pos = [];
var Gpos = [];
var magic, ctx;
var lineWidth = 1;
var canvas = document.getElementById("canvas");

// var color = 'rgba(255,255,255,0.7)';
var color = 'white';
var windowW = $(window).width();

var width = windowW, height=windowW;
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

  ctx=canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.strokeStyle = color;
  // ctx.fillStyle = color;
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;  
  num=11;
  i=1;
  count=0;
  $("#play").bind('click', play);
}
var play = function(){
	angleRotate=2*Math.PI/num;
	magic = new Transform(num,width/2,height/2);
	pos = JSON.parse($("#pnts").val());
	count = pos.length-1;
    for(var i=0;i<count;i++){
     magic.trans(pos[i].x,pos[i].y);
     var tmp = [];
     for(var j=0;j<num-1;j++){
        var pt = new Point(magic.posX[j], magic.posY[j], pos[i].ctime);
        tmp.push(pt); 
     }
     Gpos[i] = tmp;
   }
   // console.log(Gpos);
   drawOn=true;
   Btime=(new Date()).getTime();
   drawTimer = setInterval(draw, 40);
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
        ctx.beginPath();
        ctx.moveTo(Gpos[i][k].x, Gpos[i][k].y);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth;
        ctx.lineTo(Gpos[i-1][k].x, Gpos[i-1][k].y);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
      }
      i+=1;
    }
  }else{
    clearInterval(drawTimer);
  }   
}
$('#canvas').bind('touchmove',function(event){
  event.preventDefault();
});
init();
