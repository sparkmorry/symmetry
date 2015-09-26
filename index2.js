var num, i, count;
var drawOn, Btime;
var pos = [];
var Gpos = [];

var color = 'black';
var width = 500, height=500;

function Point(x, y){
  this.x = x;
  this.y = y;
  // this.drag = drag;
  var now = new Date();
  now = now.getTime();
  this.ctime = now;
}


var init = function(){
  ctx=document.getElementById("canvas").getContext("2d");
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  ctx.lineWidth = 1;  
  num=6;
  i=1;
  count=0;

  $("#canvas").drawMouse();
}

var setup = function(){
  smooth();
  size(400,400);
  background(#2a3935);
  stroke(#ffde00);
  strokeWeight(1.5);
  num=6;
  i=1;
  count=0;
  magic=new transform(num,width/2,height/2);
  pos=new int[4000][3];
  Gpos = new int[4000][num-1][3];
  
}

void draw(){
 
  if(drawOn){
    if(i>=count){
      drawOn=false;  
    }else if(drawOn&&(millis()-Btime>pos[i][2]-pos[i-1][2])&&((pos[i-1][0]==0&&pos[i-1][1]==0)||(pos[i][0]==0&&pos[i][1]==0))){
      i+=1;
    }else if(drawOn&&(millis()-Btime>pos[i][2]-pos[i-1][2])&&!((pos[i-1][0]==0&&pos[i-1][1]==0)||(pos[i][0]==0&&pos[i][1]==0))){
      for(int k=0;k<num-1;k++){
     //   c=color(hue+(k+1)*360/num,255,255,150);
       
        line(Gpos[i][k][0],Gpos[i][k][1],Gpos[i-1][k][0],Gpos[i-1][k][1]);
      }
      i+=1;
    }
  } 
 
}

void keyPressed(){
  if(keyCode=='A'){
   saveFrame("1.png");
 }else if(keyCode=='B'){
   for(int i=0;i<pos.length;i++){
     for(int j=0;j<4;j++){
      
     }
   }
 }else if(keyCode=='C'){
    
   for(int i=0;i<count;i++){
     magic.Trans(pos[i][0],pos[i][1]);
     for(int j=0;j<num-1;j++){
        Gpos[i][j][0]=magic.posX[j];
        Gpos[i][j][1]=magic.posY[j]; 
        Gpos[i][j][2]=pos[i][2];   
     }
   }
   drawOn=true;
   Btime=millis();
 }
}

void mouseDragged(){
   
   
   line(mouseX,mouseY,pmouseX,pmouseY);
   
   pos[count][0]=mouseX;
   pos[count][1]=mouseY;
   pos[count][2]=millis();
   count+=1;
}

void mouseReleased(){

   pos[count][0]=0;
   pos[count][1]=0;
   pos[count][2]=millis();
   count+=1;
   
}

class transform{
  int num,count;
  int []posX;
  int []posY;
  int tarX,tarY,dx,dy,l;
  float angleStart,angleEnd,angleRotate;
  
  transform(int num,int tarX,int tarY){
   this.num=num;
   this.tarX=tarX;
   this.tarY=tarY;
   posX=new int[num-1];
   posY=new int[num-1];
   angleRotate=2*PI/num;
  }
  
  void Trans(int x,int y){
    dx=x-tarX;
    dy=y-tarY;
    l=int(dist(x,y,tarX,tarY));
    angleStart=atan(dy/float(dx));
    //为了angle角能正常表示
    if(dx<0){
     angleStart=PI+atan(dy/float(dx));
    }
    
    for(int i=0;i<num-1;i++){
      
      angleEnd=angleStart-angleRotate*(i+1);
      posX[i]=int(tarX+l*cos(angleEnd));
      posY[i]=tarY+int(l*sin(angleEnd));
      
    }
  }
}