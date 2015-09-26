var color = 'black';
var width = 500, height=500;
var drawControl;
var startTime = 0;

var init = function(){
	// setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;	
	
	// setup to trigger drawing on mouse or touch
	// $("#canvas").drawTouch();
 //    $("#canvas").drawPointer();
	$("#canvas").drawMouse();
}
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickTime = new Array();

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  var now = new Date();
  now = now.getTime();
  clickTime.push(now);
}
$.fn.drawMouse = function() {
	var clicked = 0;
	var start = function(e) {
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY;
		addClick(x, y, 0);		
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY;
			addClick(x, y, 1);
			ctx.lineTo(x,y);
			ctx.stroke();
		}
	};
	var stop = function(e) {
		clicked = 0;
	};
	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
};
var rotateTime = 0;
var pCount = 0;
var drawRotate = function(degree){
	var w = width/2, h = height/2;
	if(rotateTime == 0){
		ctx.translate(w, h);
	}
	ctx.restore();

	ctx.rotate(degree*Math.PI/180);
	pCount=clickY.length;
	for(var i=0; i<pCount; i++){
	    ctx.beginPath();
	    if(clickDrag[i] && i){
	       ctx.moveTo(clickX[i-1]-w, clickY[i-1]-h);
	    }else{
	       ctx.moveTo(clickX[i]-1-w, clickY[i]-h);
	    }
	    ctx.lineTo(clickX[i]-w, clickY[i]-h);
	    ctx.closePath();
	    ctx.stroke();
	}
	ctx.save();
	rotateTime++;

}
init();
$("#generate").bind('click', function(){
	//这样写貌似有闭包
	// for(var i=0; i<10; i++){
	// 	setTimeout(function(){
	// 		drawRotate(36);
	// 	}, 500);
	// }
	startTime = (new Date()).getTime();
	var i=0, drawTimer;
	var draw = function(){
		if(i>20){
			return;
			clearTimeout(drawTimer);
		}
		drawRotate(18);
		i++;

	}
	drawTimer = setInterval(function(){
		draw();
	}, 300)	;	


});