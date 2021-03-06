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
  ctx.fillStyle = color;
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;  
  num=10;
  i=1;
  count=0;

  $("#canvas").drawMouse();
  $("#canvas").drawTouch();
}
$("#generate").bind('click', function(){
  angleRotate=2*Math.PI/num;
  magic = new Transform(num,width/2,height/2);
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
});

$.fn.drawTouch = function() {
  var clicked = 0;
  var canvasX = document.getElementById("canvas").offsetLeft;
  var canvasY = document.getElementById("canvas").offsetTop;

  var start = function(e) {
    clicked = 1;
    x = e.pageX - canvasX;
    y = e.pageY - canvasY;
  };
  var move = function(e) {
    if(clicked){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;

      // ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;
      ctx.lineTo(e.pageX - canvasX , e.pageY - canvasY);
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      // ctx.globalAlpha = 0.2;
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
    x = e.pageX - canvasX;
    y = e.pageY - canvasY;
  };
  var move = function(e) {
    if(clicked){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;

      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;
      ctx.lineTo(e.pageX - canvasX , e.pageY - canvasY);
      ctx.strokeStyle = color;
      // ctx.globalAlpha = 0.2;
      ctx.stroke();
      ctx.closePath();
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

var jQline = $("#j-line"), jQnum = $("#j-num")
$("#j-line-input").bind('change', function(){
  lineWidth = parseInt($(this).val());
  jQline.text(lineWidth);
});

$("#j-num-input").bind('change', function(){
  num = parseInt($(this).val());
  jQnum.text(num);
});

$("#redraw").bind('click', function(){
  window.location.reload();
});

var replay = function(pnts, num){

}

$("#share").bind('click', function(){
  var jsonPtns=JSON.stringify(pos); 
  console.log(num);
  if(pos.length>1){
    $.post('/api/share/', {
      pnts: jsonPtns,
      author: 'morry',
      num: num
    }, function(ret){
      if(ret.code==0){
        // alert("保存成功！"); 
        window.location.href="/name/"+ret.data+'/'
      }
    })    
  }else{
    alert("请在画板上绘制后保存！");
  }

})
