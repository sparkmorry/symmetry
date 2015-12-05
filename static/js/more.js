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
    if(dx<0){
     angleStart=Math.PI+Math.atan(dy/dx);
    }
    for(var i=0;i<num-1;i++){
      
      var angleEnd=angleStart-angleRotate*(i+1);
      this.posX[i]=parseInt(this.tarX+l*Math.cos(angleEnd));
      this.posY[i]=this.tarY+parseInt(l*Math.sin(angleEnd));
      
    }
};

var windowW = $(window).width();
var color = 'white';
var drawTimer;
var drawOn, Btime;

var num, i, count;
var drawOn, Btime;
var pos = [];
var Gpos = [];
var magic, ctx;
var lineWidth = 1;
var angleRotate;

var canvas = document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var width = windowW, height=windowW;
canvas.width = width;
canvas.height = height;
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
var initPos = function(){
  for(var i=1;i<count;i++){  
    if( (pos[i-1].x==0&&pos[i-1].y==0) || (pos[i].x==0&&pos[i].y==0)){
      i++;
    }else if( !( (pos[i-1].x==0 && pos[i-1].y==0) || (pos[i].x==0 && pos[i].y==0) ) ){
      ctx.beginPath();
      ctx.moveTo(pos[i-1].x, pos[i-1].y);
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;
      ctx.lineTo(pos[i].x, pos[i].y);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

    } 
  }
}

var play = function(pnts, tnum, canvas){
	num = tnum;
	pos = pnts;
	Gpos = [];
	var magic;
	angleRotate=2*Math.PI/num;

	i=1;
	count = pos.length;
  ctx.clearRect(0,0,width,height);

  initPos();

	magic = new Transform(num,width/2,height/2);
    for(var k=0;k<count;k++){
     magic.trans(pos[k].x,pos[k].y);
     var tmp = [];
     for(var j=0;j<num;j++){
        var pt = new Point(magic.posX[j], magic.posY[j], pos[i].ctime);
        tmp.push(pt); 
     }
     Gpos[k] = tmp;
   }

   drawOn=true;
   Btime=(new Date()).getTime();
   setTimeout(function(){
    drawTimer = setInterval(draw, 40);
   }, 1000)
}

$("li").bind('click', function(){
	var num = parseInt($(this).data('num'));
	var pnts = $(this).data('pnts');
	if(pnts && num){
		play(pnts, num, canvas);
	}

})