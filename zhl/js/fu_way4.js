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
  pointer1:null,
  pointer2:null,
  tempPointer:null,
  ctlT:0,//临时t 0-1
  ctlTs:[],//t数组
  process:0,
  points:[],//控制点数组
  zPoints:{},


  init(){
    that=this;
    var cav=document.getElementById("cway");
    that.ctx=cav.getContext('2d');
    that.ctx.strokeStyle='#591f20';
    that.ctx.fillStyle='#591f20';
    that.ctx.lineCap='round';




    //线段0号
    var p0={x:0,y:414};
    var p1={x:30,y:427};
    that.points.push({a:p0,b:p1});//0段控制位置增加一对象
    that.pointer=that.cloneP(p0);
    that.pointer0=that.cloneP(p0);

    //线段1号
    var p20=that.cloneP(p1);
    var p21={x:p1.x+38,y:p1.y};
    that.points.push({a:p20,b:p21});//1段控制位置
    //树段2号
    that.ctx.lineWidth=15;
    var p30=that.cloneP(p21);
    var b31={x:p30.x+30,y:p30.y+50};
    var b32={x:b31.x+30,y:b31.y-20};
    var p31={x:p30.x+84,y:p30.y+33};
    that.points.push({a:p30,b:b31,c:b32,d:p31});//2段控制点
    //2号段树枝
    var z30={x:0,y:0};
    var zb31={x:z30.x+30,y:z30.y+50};
    var zb32={x:zb31.x+30,y:zb31.y-20};
    var z31={x:z30.x+84,y:z30.y+33};

    that.zPoints.z2={a:z30,b:zb31,c:zb32,d:z31};//树枝2控制点

    console.log(zb32);
    ////// 树枝




    /*定时器跟新页面*/
    that.timer=setInterval(function () {
      //if(that.process==0){
      //  that.pointer.x++;
      //  that.pointer=that.calcL(that.pointer.x,p0,p1);
      //}
      //
      // //画完时进程加1
      //if(that.process==0&&that.pointer.x>p1.x){
      //    that.process++;
      //  //为1段线准备
      //  that.pointer=that.cloneP(p20);
      //  that.pointer0=that.cloneP(p20);
      //}
      //控制0号段
      that.comCtrlLineTo(0,p0,p1);
      //为1号段准备
      that.readyforNext(0,p1,p20);
      //控制1号段
      that.comCtrlLineTo(1,p20,p21);
      //为2号段准备
      that.readyforNextBes(1,p21,p30,b31,b31,p31);
       /*定时画2段线*/
       if(that.process==2){
          that.ctlT+=0.01;
          that.tempPointer=that.calcB(that.ctlT,p30,b31,b32,p31);
          if(that.ctlT>=1){
            that.ctlT=0;
            that.process++;
            //为2段处树枝准备
            that.pointer=that.cloneP(z30);
            that.pointer0=that.cloneP(zb31);
            that.pointer1=that.cloneP(zb32);
            that.pointer2=that.cloneP(z31);
          }
       }

       /*定时画2段处树枝*/
      if(that.process==3){
        that.ctlT+=0.01;
        that.tempPointer=that.calcB(that.ctlT,z30,zb31,zb32,z31);
        if(that.ctlT>=1){
          that.ctlT=1;
          that.process++;
          //为3段树准备
          //that.pointer=that.cloneP(z30);
          //that.pointer0=that.cloneP(zb31);
          //that.pointer1=that.cloneP(zb32);
          //that.pointer2=that.cloneP(z31);
        }
      }


        console.log(that.process);
      that.updateView();
    },30);
  },
  //p0,起点 p1终点，process完成权值
  comCtrlLineTo(process,p0,p1){
    if(that.process==process){
      that.pointer.x++;
      that.pointer=that.calcL(that.pointer.x,p0,p1);
    }
    if(that.process==process&&that.pointer.x>p1.x){
      that.process++;

    }
  },
  readyforNext(process,p1,p20){
    //为下段线准备
    if((that.process-1)==process&&that.pointer.x>p1.x){
      that.pointer=that.cloneP(p20);//不断变化的临时点
      that.pointer0=that.cloneP(p20);//相对临时控制点
    }

  },
  //从画左右方向的直线过度到贝斯线的准备
  readyforNextBes(process,p21,p30,b31,b32,p31){

    if((that.process-1)==process&&that.pointer.x>p21.x){
      that.pointer=that.cloneP(p30);
      that.pointer0=that.cloneP(b31);
      that.pointer1=that.cloneP(b32);
      that.pointer2=that.cloneP(p31);
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
    //线段1 画文本
    var obj1={lineWidth0:3,lineWidth1:10,lineWidth:15,rate:0,dir:1};
    that.process==1&&that.drawRangLine2(that.ctx,that.pointer0,that.pointer,obj);
    if(that.process>=2){
      that.drawRangLine2(that.ctx,that.points[1].a,that.points[1].b,obj1);
      that.ctx.translate(0,0);
      var translateP0={x:5,y:190};
      that.drawText(that.ctx,translateP0,array);
    }
    that.ctx.restore();
    //线段2
    that.ctx.save();
    //obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var obj2=[{t0:0,t1:.3,obj:{lineWidth0:3,lineWidth1:10,lineWidth:17,rate:1.5,dir:1}}];
    obj2.push({t0:.3,t1:1,obj:{lineWidth0:3,lineWidth1:13,lineWidth:8,rate:.3,dir:1}});
    that.process==2&&that.drawActiveB(that.ctx,that.ctlT,obj2,that.pointer,that.pointer0,that.pointer1,that.pointer2);
    that.ctx.restore();
    if(that.process>=3){
      that.drawActiveB(that.ctx,1,obj2,that.points[2].a,that.points[2].b,that.points[2].c,that.points[2].d);
    }

    //2段处树枝
    if(that.process>=3){

      that.ctx.save();
      that.ctx.translate(that.points[2].a.x,that.points[2].a.y);
      that.ctx.rotate(40*Math.PI/180);
      that.ctx.scale(.5,1);
      ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
      var objZ2=[{t0:0,t1:.3,obj:{lineWidth0:5,lineWidth1:10,lineWidth:17,rate:1,dir:1}}];
      objZ2.push({t0:.3,t1:1,obj:{lineWidth0:2,lineWidth1:8,lineWidth:10,rate:.5,dir:-1}});
      that.drawActiveB(that.ctx,that.ctlT,objZ2,that.pointer,that.pointer0,that.pointer1,that.pointer2);
      //if(that.process>=4){
      //  that.drawActiveB(that.ctx,1,obj2,that.zPoints.z2.a,that.zPoints.z2.b,that.zPoints.z2.c,that.zPoints.z2.d);
      //}
      that.ctx.restore();
    }




  },

  //画笔 控制t 线宽对象 贝塞尔四个点 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
  drawActiveB(ctx,ctlT,obj,bse0, bse2, bse3, bse4){
    var t1=that.cloneP(bse0);
    var tempObj=null;
    var tempc={};
    for(var t=0;true;t+=0.05){

        for(var i=0;i<obj.length;i++){
          if(t>=obj[i].t0&&t<obj[i].t1){
            tempObj=obj[i].obj;
          }
        }

      if(t>ctlT) t=ctlT;
      tempc.x=t1.x;
      tempc.y=t1.y;
      t1=that.calcB(t,bse0, bse2, bse3, bse4);
      that.controlWidth(tempObj);
      that.drawLine(ctx,tempc,t1,tempObj.lineWidth);

      if(t==ctlT){
        break;
      }
    }
  },
  //依据四个点计算贝斯点
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