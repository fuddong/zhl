/**
 * Created by lp on 2017/2/8.
 */
var cav=document.getElementById("cway");
var ctx=cav.getContext('2d');
ctx.strokeStyle='#591f20';
ctx.fillStyle='#591f20';
ctx.lineCap='round';

function drawLine(ctx,p0,p1,linewidth){
  ctx.beginPath();
  ctx.lineWidth=linewidth;
  ctx.moveTo(p0.x,p0.y);
  ctx.lineTo(p1.x,p1.y);
  ctx.stroke();

}

obj={lineWidth0:3,lineWidth1:10,lineWidth:15,rate:.06,dir:-1};
//var rotateAndScale=[];
var rotate=120*Math.PI;


//测试定时器
var timer=null;
function drawRangLineTime(ctx,p0,p1,obj){

  var x=p0.x,y=p0.y;
  var tp={x:x,y:y};
  var tp1={x:x,y:y};
  timer=setInterval(function () {
    ctx.save();
    ctx.rotate(30*Math.PI);
    tp.x=tp1.x;
    tp.y=tp1.y;
    tp1.x+=1.7;

    tp1.y=calcL(tp1.x,p0,p1).y;
    controlWidth(obj);
    drawLine(ctx,tp,tp1,obj.lineWidth);
    if(tp1.x>=p1.x){
      clearInterval(timer);
      timer=null;
    }

    ctx.restore();

  },20) ;
}


//line width 范围变化
function drawRangLine2(ctx,p0,p1,obj){

  var x=p0.x,y=p0.y;
  var tp={x:x,y:y};
  var tp1={x:x,y:y};
  do{
    tp.x=tp1.x;
    tp.y=tp1.y;
    tp1.x+=1.7;

    tp1.y=calcL(tp1.x,p0,p1).y;
    controlWidth(obj);
    drawLine(ctx,tp,tp1,obj.lineWidth);



  }while(tp1.x<=p1.x);

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
//obj={lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir} 需要做一个控制改变线条宽度的函数 dir 1变大-1减小
function controlWidth(obj){
  if(obj.lineWidth<obj.lineWidth0){
    obj.dir=1;
  }
  if(obj.lineWidth>obj.lineWidth1){

    obj.dir=-1;
  }
  obj.lineWidth+=obj.dir*obj.rate;

}


//x:变化的x，p0起点 p1终点 返回直线上的坐标对象
function calcL(x,p0,p1){
  var k=(p1.y-p0.y)/(p1.x-p0.x);
  var y=k*(x-p0.x)+p0.y;
  return {x:x,y:y};
}

var p0={x:100,y:100};
var p1={x:400,y:100};
ctx.save();
ctx.rotate(20*Math.PI/180);
//drawRangLine(ctx,p0,p1,1,1,.5);
//drawRangLine2(ctx,p0,p1,obj);
drawRangLineTime(ctx,p0,p1,obj);
//动画transform属性
ctx.restore();

//绘制文本

//ctx.font="bold 16px SimHei";
//ctx.textBaseline='top';
// var txt="你好";
//var p0={x:100-10,y:300};
//var height=100;
//var p1={x:p0.x,y:p0.y+height};
//
//drawLine(ctx,p0,p1,2);
//ctx.fillText(txt,100,300);
//ctx.fillText(txt,100,300+20);

//translateP 偏移 txtG 文本数组
function drawText(ctx,translateP,txtArray){
  ctx.save();
  ctx.lineWidth=2;
  var lineHeight=txtArray.length*16+12;
  var p0={x:0,y:0};
  var p1={x:p0.x,y:p0.y+lineHeight};
  ctx.textBaseline='top';
  ctx.translate(translateP.x,translateP.y);
  drawLine(ctx,p0,p1,2);
  var y=0;
  var txt=null;
  for(var i=0;i<txtArray.length;i++){
    ctx.font="bold 14px SimHei";
    i==0&&( ctx.font="bold 12px SimHei");
    i==1&&( ctx.font="bold 26px SimHei");
    i==2&&(y+=16);
    txt=txtArray[i];
    ctx.fillText(txt,5,y);
    y+=16;
  }
  ctx.restore();
}


var array=['腾飞','2011','石牛寨景区获评\'国家地质公园\'','托管宁波石浦渔港古城','托管宁波檀头山海岛景区','托管宁波海洋休闲旅游公司'];
pf={x:300,y:100};

drawText(ctx,pf,array);
pf.y=400;
drawText(ctx,pf,array);

