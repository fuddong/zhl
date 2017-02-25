/**
 *
 * Created by lp on 2017/2/5.
 */
  //先画线，再勾勒
var cav=document.getElementById("cway");
var ctx=cav.getContext('2d');
ctx.strokeStyle='#591f20';
ctx.fillStyle='#591f20';
ctx.lineCap='round';
var topY=544-217;
p0={x:0,y:topY};
p1={x:30,y:topY+10};
p2={x:p1.x+60,y:p1.y};
p3={x:p2.x+14,y:p2.y+20};
p4={x:p3.x+17,y:p3.y+17};
p5={x:p4.x+50,y:p4.y};
p6={x:p5.x+20,y:p5.y-10};
p7={x:p6.x+350,y:p6.y-50};
p8={x:p7.x+50,y:p7.y-10};
p9={x:p8.x+10,y:p8.y+5};
p10={x:p9.x+80,y:p9.y-5};
p11={x:p10.x+50,y:p10.y-5};
p12={x:p11.x+220,y:p11.y-20};

//2016-02-06 22:00
//p9处画树枝
var p9z1={x:p9.x+8,y:p9.y-22};
drawLine(ctx,p9,p9z1,5);
var p9z2={x:p9z1.x-10,y:p9z1.y-15};
drawLine(ctx,p9z1,p9z2,3);
var p9z3={x:p9z1.x-5,y:p9z1.y-7};
var p9z4={x:p9z3.x+10,y:p9z3.y-15};
//drawLine(ctx,p9z3,p9z4,2);
drawRangLine(ctx,p9z3,p9z4,2,-1,.2);
//p9处向下长的树枝
var p9b1={x:p9.x-5,y:p9.y+10};
var p9b2={x:p9.x-10,y:p9.y+23};
var p9b3={x:p9.x-28,y:p9.y+18};
ctx.beginPath();
ctx.lineWidth=3;
drawB(ctx,p9,p9b1,p9b2,p9b3);
var p9z5={x:p9b3.x+10,y:p9b3.y-5};
drawRangLine(ctx,p9b3,p9z5,3,-1,.3);
//p11处画的树枝
var p11z1={x:p11.x+20,y:p11.y-15};
drawLine(ctx,p11,p11z1,10);
var p11z2={x:p11z1.x+50,y:p11z1.y-30};
drawRangLine(ctx,p11z1,p11z2,5,-1,.1);
//p7={x:};
console.log(p1.y);
//ctx.beginPath();
//ctx.moveTo(0,topY);
//ctx.lineTo(p1.x,p1.y);
//ctx.stroke();
//drawLine(ctx,p0,p1,1);
drawRangLine(ctx,p0,p1,28,-1,.15);
//p1-p2
//ctx.beginPath();
//ctx.lineWidth=2;
//ctx.moveTo(p1.x,p1.y);
//ctx.lineTo(p2.x,p2.y);
//ctx.stroke();
drawRangLine(ctx,p1,p2,23,1,0);
//p2处的树枝
bs00={x:p2.x-10,y:p2.y};
bs01={x:p2.x+10,y:p2.y+70};
bs02={x:bs01.x+10,y:bs01.y+10};
bs03={x:p2.x+90,y:p2.y+80};
ctx.lineWidth=10;
//drawB(ctx,bs00,bs01,bs02,bs03);
//obj={lineWidth0:5,lineWidth1:10,lineWidth:12,rate:0.5,dir:-1} controlwidth 的参数

var obj={lineWidth0:3,lineWidth1:10,lineWidth:20,rate:.2,dir:-1}
var tempc={};
var t1=bs00;
var t=0;
var lineWidth=24;
for(var t=0;true;t+=0.01){
  if(t>1) t=1;


  tempc.x=t1.x;
  tempc.y=t1.y;
  t1=calcB(t,bs00, bs01, bs02, bs03);
  controlWidth(obj)
  drawLine(ctx,tempc,t1,obj.lineWidth);

  if(tempc.x==bs03.x&&tempc.y==bs03.y){
    break;
  }
  startx=tempc.x;
  starty=tempc.y;


}


//var tempc={};
//var t1=bs00;
//var t=0;
//var lineWidth=24;
//for(var t=0;true;t+=0.01){
//      if(t>1) t=1;
//
//      tempc.x=t1.x;
//      tempc.y=t1.y;
//      t1=calcB(t,bs00, bs01, bs02, bs03);
//      drawLine(ctx,tempc,t1,lineWidth);
//      lineWidth-=.3;
//
//      if(lineWidth<1) {
//        lineWidth=1;
//
//      }
//
//      if(tempc.x==bs03.x&&tempc.y==bs03.y){
//        break;
//      }
//      startx=tempc.x;
//      starty=tempc.y;
//
//
//}



//p2-p3
//ctx.beginPath();
//ctx.lineWidth=3;
//ctx.moveTo(p2.x,p2.y);
//ctx.lineTo(p3.x,p3.y);
//ctx.stroke();
drawRangLine(ctx,p2,p3,23,-1,.5);
//p3-p4
//ctx.beginPath();
//ctx.lineWidth=3;
//ctx.moveTo(p3.x,p3.y);
//ctx.lineTo(p4.x,p4.y);
//ctx.stroke();
drawRangLine(ctx,p3,p4,14,1,.5);
//p4-p5
//ctx.beginPath();
//ctx.lineWidth=3;
//ctx.moveTo(p4.x,p4.y);
//ctx.lineTo(p5.x,p5.y);
//ctx.stroke();
drawRangLine(ctx,p4,p5,23,1,0);
//p5-p6
//drawLine(ctx,p5,p6,3);
drawRangLine(ctx,p5,p6,25,1,0);
//p7-p8
drawRangLine(ctx,p7,p8,20,-1,.1);
//p8-p9
drawRangLine(ctx,p8,p9,13,1,.3);
//p9-p10
drawRangLine(ctx,p9,p10,17,-1,.1);
//p10-p11
drawLine(ctx,p10,p11,13);
////贝塞尔到头

//drawLine(ctx,p11,p12,15);

var bse1=p11;
var bse2={x:bse1.x+70,y:bse1.y-50};
var bse3={x:bse2.x+50,y:bse2.y+70};
var bse4=p12;
ctx.lineWidth=12;
ctx.beginPath();
ctx.moveTo(bse1.x,bse1.y);
//drawB(ctx,bse1,bse2,bse3,bse4);
//ctx.bezierCurveTo(bse2.x,bse2.y,bse3.x,bse3.y,bse4.x,bse4.y);
console.log(bse4);
ctx.lineWidth=1;
//贝塞尔p12-头修饰
obj={lineWidth0:5,lineWidth1:13,lineWidth:12,rate:.5,dir:-1};
t1=p11;
var flag=1;
for(var t=0;true;t+=0.05){
  if(t>0.6&&flag){
    flag=0;
    obj={lineWidth0:1,lineWidth1:5,lineWidth:5,rate:.7,dir:-1};
  }
  if(t>1) t=1;
  tempc.x=t1.x;
  tempc.y=t1.y;
  t1=calcB(t,p11, bse2, bse3, bse4);
  controlWidth(obj);
  drawLine(ctx,tempc,t1,obj.lineWidth);

  if(tempc.x==bse4.x&&tempc.y==bse4.y){
    console.log(lineWidth);
    break;
  }
  startx=tempc.x;
  starty=tempc.y;
}



//lineWidth=13;
//t1=p11;
//dir=-1;
//for(var t=0;true;t+=0.05){
//  if(t>1) t=1;
//
//  tempc.x=t1.x;
//  tempc.y=t1.y;
//  t1=calcB(t,p11, bse2, bse3, bse4);
//  drawLine(ctx,tempc,t1,lineWidth);
//  lineWidth+=.6*dir;
//  if(tempc.x==bse4.x&&tempc.y==bse4.y){
//    console.log(lineWidth);
//    break;
//  }
//  startx=tempc.x;
//  starty=tempc.y;
//}



//画根长贝塞尔线
//drawB(ctx,p6,bs1,bs2,bs3);

//修饰长线 大犁弯
var bs1={x:p6.x+50,y:p6.y-100};
var bs2={x:bs1.x+150,y:bs1.y-25};
var bs3={x:p6.x+350,y:p6.y-50};


var p61=p6.x+30;  //改变线条宽度的位置
var p62=p6.x+50;
var p63=p6.x+80;
lineWidth=23;
t1=p6;
dir=0;
for(var t=0;true;t+=0.01){
  if(t>1) t=1;

  tempc.x=t1.x;
  tempc.y=t1.y;
  t1=calcB(t,p6, bs1, bs2, bs3);
  drawLine(ctx,tempc,t1,lineWidth);
  lineWidth+=1*dir;

  if(tempc.x>=p61&&tempc.x<=p62){
    dir=-1;
    console.log('<<');
  }
  if(tempc.x>p62&&tempc.x<=p63){
    dir=1;
  }
  if(tempc.x>p63){
    dir=-1;
  }
  if(lineWidth<23) lineWidth=23;



  if(tempc.x==bs3.x&&tempc.y==bs3.y){
    break;
  }
  startx=tempc.x;
  starty=tempc.y;
}



//画线条
function drawLine(ctx,p0,p1,linewidth){
  ctx.beginPath();
  ctx.lineWidth=linewidth;
  ctx.moveTo(p0.x,p0.y);
  ctx.lineTo(p1.x,p1.y);
  ctx.stroke();

}




//lineWidth0 原始线条大小 dir:1 增大，-1减小 lRate变化几像素
function drawRangLine(ctx,p0,p1,lineWidth0,dir,lRate){

  var x=p0.x,y=p0.y;
  var tp={x:x,y:y};
  var tp1={x:x,y:y};
  do{
    tp.x=tp1.x;
    tp.y=tp1.y;
    tp1.x+=1.7;

    tp1.y=calcL(tp1.x,p0,p1).y;
    drawLine(ctx,tp,tp1,lineWidth0);
    lineWidth0+=lRate*dir;

  }while(tp1.x<=p1.x);


}
//x:变化的x，p0起点 p1终点 返回直线上的坐标对象
function calcL(x,p0,p1){
  var k=(p1.y-p0.y)/(p1.x-p0.x);
  var y=k*(x-p0.x)+p0.y;
  return {x:x,y:y};
}

//绘制贝塞尔



//绘制白塞尔的 参数：画笔，四个点
function drawB(ctx,p0,p1,p2,p3){
  ctx.save();
  ctx.moveTo(p0.x,p0.y);
  ctx.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
  ctx.stroke();
  ctx.restore();
};
//有根据t的取值计算贝塞尔线上的坐标
function calcB(t,p0,p1,p2,p3){
  var b03=[];
  b03.x=p0.x+3*(-p0.x+p1.x)*t+3*(p0.x-2*p1.x+p2.x)*t*t+(-p0.x+3*p1.x-3*p2.x+p3.x)*t*t*t;
  b03.y=p0.y+3*(-p0.y+p1.y)*t+3*(p0.y-2*p1.y+p2.y)*t*t+(-p0.y+3*p1.y-3*p2.y+p3.y)*t*t*t;

  return b03;

}
//obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir} 需要做一个控制改变线条宽度的函数 dir 1变大-1减小
function controlWidth(obj){
  if(obj.lineWidth<obj.lineWidth0){
    obj.dir=1;
  }
  if(obj.lineWidth>obj.lineWidth1){

    obj.dir=-1;
  }
  obj.lineWidth+=obj.dir*obj.rate;

}

//var obj={lineWidth0:5,lineWidth1:10,lineWidth:12,rate:0.5,dir:-1};
//
//for(var i=0;i<130;i++){
//  controlWidth(obj);
//}

//画树叶


//
//var p0={x:0,y:0};
//var p1={x:p0.x,y:p0.y+13};
//var p2={x:p1.x+10,y:p1.y+3};
//var p3={x:p0.x+20,y:p0.y+20};
//ctx.translate(300,300);
//ctx.scale(.5,.5);
//ctx.rotate(35*Math.PI/180);
//
//drawB(ctx,p0,p1,p2,p3);
//p1={x:p0.x+13,y:p0.y};
//p2={x:p1.x+3,y:p1.y+10};

drawB(ctx,p0,p1,p2,p3);
ctx.fill();
var scale={x:1,y:.5};
drawLeaf(ctx,p12,scale,-20);
//p9z4处的树叶
scale={x:1.5,y:.5};
drawLeaf(ctx,p9z4,scale,270);
//画树叶. translate 转移值，scale缩放值 旋转值
function drawLeaf(ctx,translate,scale,rotate){
  ctx.save();
  ctx.lineWidth=1;
  ctx.translate(translate.x,translate.y);
  ctx.scale(scale.x,scale.y);
  ctx.rotate(rotate*Math.PI/180);
  var p0={x:0,y:0};
  var p1={x:p0.x,y:p0.y+13};
  var p2={x:p1.x+10,y:p1.y+3};
  var p3={x:p0.x+20,y:p0.y+20};
  drawB(ctx,p0,p1,p2,p3);
  p1={x:p0.x+13,y:p0.y};
  p2={x:p1.x+3,y:p1.y+10};
  drawB(ctx,p0,p1,p2,p3);
  ctx.fill();
  ctx.restore();
}


