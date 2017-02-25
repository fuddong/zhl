/**
 * Created by lp on 2017/2/8.
 */
var array=['腾飞','2011','石牛寨景区获评\'国家地质公园\'','托管宁波石浦渔港古城','托管宁波檀头山海岛景区','托管宁波海洋休闲旅游公司'];



var about={
  that:null,
  timer:null,
  ctx:null,
  lineWidth:null,
  pointer0:null,//临时动点
  pointer:null,//临时动点
  ctlT:0,//临时t 0-1
  ctlTs:[],//t数组
  process:0,
  points:[],//控制点数组


  init(){
    that=this;
    var cav=document.getElementById("cway");
    that.ctx=cav.getContext('2d');
    that.ctx.strokeStyle='#591f20';
    that.ctx.fillStyle='#591f20';
    that.ctx.lineCap='round';




    var p30={x:30,y:427};
    var b31={x:p30.x+30,y:p30.y+50};
    var b32={x:b31.x+30,y:b31.y-20};
    var p31={x:p30.x+84,y:p30.y+33};

    obj={lineWidth0:1,lineWidth1:15,lineWidth:5,rate:.2,dir:1};
    that.drawActiveB(that.ctx,.6,obj,p30,b31,b32,p31);




  },

  //画笔 控制t 线宽对象 贝塞尔四个点
  drawActiveB(ctx,ctlT,obj,bse0, bse2, bse3, bse4){
    var flag=true;
    var t1=that.cloneP(bse0);
    var tempc={};
    for(var t=0;true;t+=0.05){
      if(t>0.6&&flag){
        flag=0;
        obj={lineWidth0:1,lineWidth1:5,lineWidth:5,rate:0,dir:-1};
      }
      if(t>ctlT) t=ctlT;
      tempc.x=t1.x;
      tempc.y=t1.y;
      t1=that.calcB(t,bse0, bse2, bse3, bse4);
      that.controlWidth(obj);
      that.drawLine(ctx,tempc,t1,obj.lineWidth);

      if(t==ctlT){
        break;
      }
    }
  },


  updateView(){
    that.ctx.clearRect(0,0,544,1005);
    that.ctx.save();
    var obj={lineWidth0:3,lineWidth1:10,lineWidth:20,rate:.3,dir:-1};
    //进程为0时,没画满时画动态线
    that.process==0&&(that.drawRangLine2(that.ctx,that.pointer0,that.pointer,obj));
    //进程为1时画全线
    that.process>=1&&(that.drawRangLine2(that.ctx,that.points[0].a,that.points[0].b,obj))
    that.ctx.restore();
    that.ctx.save();
    //线段2
    var obj1={lineWidth0:3,lineWidth1:10,lineWidth:15,rate:0,dir:1};
    that.process==1&&that.drawRangLine2(that.ctx,that.pointer0,that.pointer,obj);
    if(that.process>=2){
      that.drawRangLine2(that.ctx,that.points[1].a,that.points[1].b,obj1);
      that.ctx.translate(0,0);
      var translateP0={x:5,y:190};
      that.drawText(that.ctx,translateP0,array);

    }
    that.ctx.restore();
    //线段3
    var obj2={lineWidth0:3,lineWidth1:10,lineWidth:15,rate:0,dir:1};
    that.process==2&&that.drawRangLine2(that.ctx,that.pointer0,that.pointer,obj);



  },


  calcB(t,p0,p1,p2,p3){
    var b03=[];
    b03.x=p0.x+3*(-p0.x+p1.x)*t+3*(p0.x-2*p1.x+p2.x)*t*t+(-p0.x+3*p1.x-3*p2.x+p3.x)*t*t*t;
    b03.y=p0.y+3*(-p0.y+p1.y)*t+3*(p0.y-2*p1.y+p2.y)*t*t+(-p0.y+3*p1.y-3*p2.y+p3.y)*t*t*t;

    return b03;

  },

  //绘制白塞尔的 参数：画笔，四个点
  drawB(ctx,p0,p1,p2,p3){
    ctx.save();
    ctx.moveTo(p0.x,p0.y);
    ctx.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
    ctx.stroke();
    ctx.restore();
  },

  //克隆方法
  cloneP(point){
    var p={x:point.x,y:point.y};
    return p;
  },


  //会直线
  drawLine(ctx,p0,p1,linewidth){
  ctx.beginPath();
  ctx.lineWidth=linewidth;
  ctx.moveTo(p0.x,p0.y);
  ctx.lineTo(p1.x,p1.y);
  ctx.stroke();

  },

  //line width 范围变化
  drawRangLine2(ctx,p0,p1,obj){
  var x=p0.x,y=p0.y;
  var tp={x:x,y:y};
  var tp1={x:x,y:y};
  do{
    tp.x=tp1.x;
    tp.y=tp1.y;
    tp1.x+=1.7;

    tp1.y=that.calcL(tp1.x,p0,p1).y;
    that.controlWidth(obj);
    that.drawLine(ctx,tp,tp1,obj.lineWidth);
    }while(tp1.x<=p1.x);

  },

  //obj={lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir} 需要做一个控制改变线条宽度的函数 dir 1变大-1减小
  controlWidth(obj){
    if(obj.lineWidth<obj.lineWidth0){
      obj.dir=1;
    }
    if(obj.lineWidth>obj.lineWidth1){

      obj.dir=-1;
    }
    obj.lineWidth+=obj.dir*obj.rate;

  },

  //x:变化的x，p0起点 p1终点 返回直线上的坐标对象
  calcL(x,p0,p1){
    var k=(p1.y-p0.y)/(p1.x-p0.x);
    var y=k*(x-p0.x)+p0.y;
    return {x:x,y:y};
  },
  //translateP 偏移 txtG 文本数组
  drawText(ctx,translateP,txtArray){
  ctx.save();
  ctx.lineWidth=2;
  var lineHeight=txtArray.length*16+12;
  var p0={x:0,y:0};
  var p1={x:p0.x,y:p0.y+lineHeight};
  ctx.textBaseline='top';
  ctx.translate(translateP.x,translateP.y);
  that.drawLine(ctx,p0,p1,2);
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


};
about.init();