/**
 * Created by lp on 2017/2/8.
 */
var array1=['起航','1998','投资建设石燕湖生态旅游','公园(AAAA级)'];
var array2=['成长','2006','投资建设浏阳古风洞景区','投资建设岳阳石牛寨国家地质公园','(AAAA级)'];
var array3=['精进','2007','投资建设石牛寨莽洞峡谷漂流'];
var array4=['亮剑','2008','石燕湖商标获评为"湖南省著名商标"','投资建设石燕湖龙潭地下峡谷漂流'];
var array5=['腾飞','2011','石牛寨景区获评\'国家地质公园\'','托管宁波石浦渔港古城','托管宁波檀头山海岛景区','托管宁波海洋休闲旅游公司'];
var array6=['创新','2012','成功托管怀化市通道全县旅游资源,国家地质','公园、国家风景名胜区万佛山(国家AAAA级)','成功托管怀化市全县旅游资源,皇都侗文化村','成功托管怀化市全县旅游资源,芋头古侗寨','成功托管怀化市全县旅游资源,龙底生态漂流'];
var array7=['蜕变','2013','成功托管苏州相城区月季花主题公园，苏州阳澄万丽大酒店','成立建设苏州盛泽国际拓展中心基地','接管岳阳平江杜甫祠堂等景区'];
var array8=['谋势','2014','石牛寨景区获评为“国家AAAA旅游景区”','托管宁乡温泉山庄，密印寺禅院','成功连锁托管全国首批五星级农庄：浏阳浩博农庄'];


var about={
  that:null,
  timer:null,
  ctx:null,
  lineWidth:null,
  pointer0:null,//临时动点 相对临时控制点
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
    //树段3号
    var p40=that.cloneP(p31);
    var p41={x:p40.x+30,y:p40.y-15};
    that.points.push({a:p40,b:p41});//3段控制点
    //树段4号
    var p50=that.cloneP(p41);
    var b51={x:p50.x+140,y:p50.y-120};
    var b52={x:b51.x+100,y:b51.y+120};
    var p51={x:p50.x+350,y:p50.y+10};
    that.points.push({a:p50,b:b51,c:b52,d:p51});//树枝4控制点
    //树段5号
    var p60=that.cloneP(p51);
    var b61={x:p60.x+30,y:p60.y-5};
    var b62={x:b61.x+20,y:b61.y-15};
    var p61={x:p60.x+65,y:p60.y-3};
    that.points.push({a:p60,b:b61,c:b62,d:p61});//5段控制点
    //树段6号
    var p70=that.cloneP(p61);
    var b71={x:p70.x+20,y:p70.y+10};
    var b72={x:b71.x+30,y:b71.y-1};
    var p71={x:p70.x+60,y:p70.y-2};
    that.points.push({a:p70,b:b71,c:b72,d:p71});//6段控制点
    //树段7号
    var p80=that.cloneP(p71);
    var p81={x:p80.x+50,y:p80.y-10};
    that.points.push({a:p80,b:p81}); //7段控制点
    //树段8号
    var p90=that.cloneP(p81);
    var p91={x:p90.x+40,y:p90.y};
    that.points.push({a:p90,b:p91});//8段控制点
    //树段9号
    var pa0=that.cloneP(p91);
    var ba1={x:pa0.x+19,y:pa0.y+16};
    var ba2={x:ba1.x-10,y:ba1.y-6};
    var pa1={x:pa0.x+30,y:pa0.y+20};
    that.points.push({a:pa0,b:ba1,c:ba2,d:pa1});//9段控制点
    //树段10号
    //var pb0=that.cloneP(pa1);
    //var bb1={x:pb0.x+100,y:pb0.y-50};
    //var bb2={x:bb1.x-50,y:bb1.y+5};
    //var pb1={x:pb0.x+180,y:pb0.y-20};
    var pb0=that.cloneP(pa1);
    var bb1={x:pb0.x+100,y:pb0.y-30};
    var bb2={x:bb1.x-50,y:bb1.y+60};
    var pb1={x:pb0.x+280,y:pb0.y-60};
    that.points.push({a:pb0,b:bb1,c:bb2,d:pb1});//10段控制点
    //树枝3号
    var z40={x:0,y:0};
    var zb41={x:50,y:-40};
    var zb42={x:55,y:-55};
    var z41={x:25,y:-65};
    that.zPoints.z3={a:z40,b:zb41,c:zb42,d:z41};//树枝3控制点
    //树枝4
    var z50={x:0,y:0};
    var zb51={x:50,y:-40};
    var zb52={x:55,y:-55};
    var z51={x:25,y:-65};
    that.zPoints.z4={a:z50,b:zb51,c:zb52,d:z51};//树枝4控制点
    //树枝5
    var z60={x:0,y:0};
    var zb61={x:50,y:-40};
    var zb62={x:55,y:-55};
    var z61={x:25,y:-65};
    that.zPoints.z5={a:z60,b:zb61,c:zb62,d:z61};//树枝5控制点
    //树枝6
    var z70={x:0,y:0};
    var zb71={x:50,y:-10};
    var zb72={x:55,y:10};
    var z71={x:110,y:0};
    that.zPoints.z6={a:z70,b:zb71,c:zb72,d:z71};//树枝6控制点
    //树枝7
    var z80={x:0,y:0};
    var zb81={x:50,y:-10};
    var zb82={x:55,y:10};
    var z81={x:110,y:0};
    that.zPoints.z7={a:z80,b:zb81,c:zb82,d:z81};//树枝7控制点

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
      //process完成权值,p0,起点 p1终点，
      that.comCtrlLineTo(0,p0,p1);
      //为1号段准备
      that.readyforNext(0,p1,p20);
      //控制1号段
      that.comCtrlLineTo(1,p20,p21);
      //为2号段准备
      that.readyforNextBes(1,p21,p30,b31,b32,p31);
      //控制2号段
       that.comCtrlBesTo(2,p30,b31,b32,p31);
      //为2段树枝准备
      that.readyforBesToBes(2,z30,zb31,zb32,z31);
      //
      that.comCtrlBesTo(3,z30,zb31,zb32,z31);
      //3段树准备
      that.readyforBesToLine(3,p31);
      that.comCtrlLineTo(4,p40,p41);
      //4段树准备
      that.readyforNextBes(4,p41,p50,b51,b52,p51);
      that.comCtrlBesTo(5,p50,b51,b52,p51);
      //5段树准备
      that.readyforBesToBes(5,p60,b61,b62,p61);
      that.comCtrlBesTo(6,p60,b61,b62,p61);
      //6段树准备
      that.readyforBesToBes(6,p70,b71,b72,p71);
      that.comCtrlBesTo(7,p70,b71,b72,p71);
      //7段树准备
      that.readyforBesToLine(7,p80);
      that.comCtrlLineTo(8,p80,p81);
      //8段树准备
      that.readyforNext(8,p81,p90);
      that.comCtrlLineTo(9,p90,p91);
      //9段树准备
      that.readyforNextBes(9,p91,pa0,ba1,ba2,pa1);
      that.comCtrlBesTo(10,pa0,ba1,ba2,pa1);
      //10段树准备
      that.readyforBesToBes(10,pb0,bb1,bb2,pb1);
      that.comCtrlBesTo(11,pb0,bb1,bb2,pb1);
      //3段树枝准备
      that.readyforBesToBes(11,z40,zb41,zb42,z41);
      that.comCtrlBesTo(12,z40,zb41,zb42,z41);
      //4段树枝准备
      that.readyforBesToBes(12,z50,zb51,zb52,z51);
      that.comCtrlBesTo(13,z50,zb51,zb52,z51);
      //5段树枝
      that.readyforBesToBes(13,z60,zb61,zb62,z61);
      that.comCtrlBesTo(14,z60,zb61,zb62,z61);
      //6段树枝准备
      that.readyforBesToBes(14,z70,zb71,zb72,z71);
      that.comCtrlBesTo(15,z70,zb71,zb72,z71);
      //7段树值准备
      that.readyforBesToBes(15,z80,zb81,zb82,z81);
      that.comCtrlBesTo(16,z80,zb81,zb82,z81);

      that.readyforBesToLine(16,z81);


      // /*定时画2段处树枝*/
      //if(that.process==3){
      //  that.ctlT+=0.01;
      //  that.tempPointer=that.calcB(that.ctlT,z30,zb31,zb32,z31);
      //  if(that.ctlT>=1){
      //    that.ctlT=0;
      //    that.process++;
      //    //为3段树准备
      //    //that.pointer=that.cloneP(z30);
      //    //that.pointer0=that.cloneP(zb31);
      //    //that.pointer1=that.cloneP(zb32);
      //    //that.pointer2=that.cloneP(z31);
      //  }
      //}


        console.log(that.process);
      that.updateView();
    },2);
  },

  //重绘一切
  updateView(){
    that.ctx.clearRect(0,0,1005,544);
    var obj0={lineWidth0:3,lineWidth1:10,lineWidth:20,rate:.3,dir:-1};
    //权值，控制线宽的对象，points数组中盛放控制点的索引值
    that.updateDrawLine(0,obj0,0);
    //线段1 画文本
    var obj1={lineWidth0:3,lineWidth1:10,lineWidth:15,rate:0,dir:1};
    that.updateDrawLine(1,obj1,1);
    //画文本
    var translateP0={x:5,y:190};
    //绘制文本 process权值 转移值
    that.updateText(2,translateP0,array1);
    //线段2
    var obj2=[{t0:0,t1:.3,obj:{lineWidth0:3,lineWidth1:10,lineWidth:17,rate:1.5,dir:1}}];
    obj2.push({t0:.3,t1:1,obj:{lineWidth0:3,lineWidth1:13,lineWidth:8,rate:.3,dir:1}});
    //权值process 线宽控制器，points中盛放的索引值
    that.updateDrawBeZ(2,obj2,2);

    //2段处树枝
    ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var objZ2=[{t0:0,t1:.3,obj:{lineWidth0:5,lineWidth1:10,lineWidth:17,rate:1,dir:1}}];
    objZ2.push({t0:.3,t1:1,obj:{lineWidth0:2,lineWidth1:8,lineWidth:10,rate:.5,dir:-1}});
    //权值process obj2,线宽控制器，zpoints中盛放的值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
    var objTR={transL:{x:that.points[2].a.x,y:that.points[2].a.y},rotate:40*Math.PI/180};
    that.updateDrawBezRotateScale(3,objZ2,objTR,that.zPoints.z2);
    //画树叶 2段树枝处
    if(that.process>=4){
      var scale={x:1.5,y:.5};
      that.drawLeaf(that.ctx,{x:100,y:500},scale,290);
      scale={x:1.5,y:.5};
      that.drawLeaf(that.ctx,{x:100,y:500},scale,80);
    }
    //画3段树  process=4
    var obj3={lineWidth0:13,lineWidth1:14,lineWidth:13,rate:.1,dir:1};
    that.updateDrawLine(4,obj3,3);
    //树段4
    var obj4=[{t0:0,t1:.3,obj:{lineWidth0:8,lineWidth1:13,lineWidth:17,rate:.5,dir:1}}];
    obj2.push({t0:.3,t1:1,obj:{lineWidth0:5,lineWidth1:13,lineWidth:8,rate:.3,dir:1}});
    //权值process 线宽控制器，points中盛放的索引值
    that.updateDrawBeZ(5,obj4,4);
    //树5段
    var obj5=[{t0:0,t1:1,obj:{lineWidth0:7,lineWidth1:10,lineWidth:10,rate:.5,dir:-1}}];
    //obj5.push({t0:.3,t1:1,obj:{lineWidth0:5,lineWidth1:13,lineWidth:8,rate:.3,dir:1}});
    that.updateDrawBeZ(6,obj5,5);
    //树6段
    var obj6=[{t0:0,t1:1,obj:{lineWidth0:7,lineWidth1:10,lineWidth:13,rate:.5,dir:-1}}];
    //obj5.push({t0:.3,t1:1,obj:{lineWidth0:5,lineWidth1:13,lineWidth:8,rate:.3,dir:1}});
    that.updateDrawBeZ(7,obj6,6);
    //7段树
    var obj7={lineWidth0:8,lineWidth1:13,lineWidth:10,rate:.2,dir:1};
    that.updateDrawLine(8,obj7,7);
    //8段树
    var obj8={lineWidth0:5,lineWidth1:13,lineWidth:7,rate:0,dir:1};
    that.updateDrawLine(9,obj8,8);
    //9段树
    var obj9=[{t0:0,t1:1,obj:{lineWidth0:6,lineWidth1:10,lineWidth:7,rate:.4,dir:1}}];
    that.updateDrawBeZ(10,obj9,9);
    //10段树
    var obj10=[{t0:0,t1:.3,obj:{lineWidth0:4,lineWidth1:8,lineWidth:8,rate:.5,dir:-1}}];
    obj10.push({t0:.3,t1:.6,obj:{lineWidth0:2,lineWidth1:5,lineWidth:6,rate:.3,dir:-1}});
    obj10.push({t0:.6,t1:1,obj:{lineWidth0:1,lineWidth1:3,lineWidth:3,rate:.3,dir:-1}});
    that.updateDrawBeZ(11,obj10,10);
    //3段树枝
    ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var objZ3=[{t0:0,t1:.8,obj:{lineWidth0:5,lineWidth1:7,lineWidth:7,rate:.2,dir:-1}}];
    objZ3.push({t0:.8,t1:1,obj:{lineWidth0:1,lineWidth1:5,lineWidth:5,rate:.5,dir:-1}});
    //权值process obj2,线宽控制器，zpoints中盛放的值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
    var objTR={transL:{x:467,y:438},rotate:30*Math.PI/180,scale:{x:0.7,y:1.1}};
    that.updateDrawBezRotateScale(12,objZ3,objTR,that.zPoints.z3);
    //3段处树枝
    if(that.process>=13){
      var scale={x:1.5,y:.5};
      that.drawLeaf(that.ctx,{x:525,y:397},scale,270);
      scale={x:1.5,y:.9};
      that.drawLeaf(that.ctx,{x:525,y:397},scale,120);
    }
    //4段树枝
    ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var objZ4=[{t0:0,t1:.8,obj:{lineWidth0:5,lineWidth1:7,lineWidth:7,rate:.2,dir:-1}}];
    objZ4.push({t0:.8,t1:1,obj:{lineWidth0:1,lineWidth1:5,lineWidth:5,rate:.5,dir:-1}});
    //权值process obj2,线宽控制器，zpoints中盛放的值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
    var objTR={transL:{x:600,y:448},rotate:30*Math.PI/180,scale:{x:0.7,y:0.5}};
    that.updateDrawBezRotateScale(13,objZ4,objTR,that.zPoints.z4);
    //4段处树枝
    if(that.process>=14){
      var scale={x:0.7,y:.8};
      that.drawLeaf(that.ctx,{x:635,y:437},scale,300);
      scale={x:0.8,y:.7};
      that.drawLeaf(that.ctx,{x:635,y:437},scale,140);
    }
    //5段树枝
    ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var objZ5=[{t0:0,t1:.8,obj:{lineWidth0:5,lineWidth1:7,lineWidth:7,rate:.2,dir:-1}}];
    objZ5.push({t0:.8,t1:1,obj:{lineWidth0:1,lineWidth1:5,lineWidth:5,rate:.5,dir:-1}});
    //权值process obj2,线宽控制器，zpoints中盛放的值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
    var objTR={transL:{x:634,y:460},rotate:100*Math.PI/180,scale:{x:0.9,y:0.9}};
    that.updateDrawBezRotateScale(14,objZ5,objTR,that.zPoints.z5);
    //5段处树枝
    if(that.process>=15){
      var scale={x:0.4,y:1};
      that.drawLeaf(that.ctx,{x:675,y:507},scale,-10);
      scale={x:0.5,y:1};
      that.drawLeaf(that.ctx,{x:675,y:507},scale,-110);
    }
    //5段树枝
    ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var objZ6=[{t0:0,t1:.5,obj:{lineWidth0:2,lineWidth1:4,lineWidth:3,rate:.2,dir:-1}}];
    objZ6.push({t0:.5,t1:1,obj:{lineWidth0:1,lineWidth1:3,lineWidth:3,rate:.1,dir:-1}});
    //权值process obj2,线宽控制器，zpoints中盛放的值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
    var objTR={transL:{x:747,y:440},rotate:330*Math.PI/180,scale:{x:1,y:1}};
    that.updateDrawBezRotateScale(15,objZ6,objTR,that.zPoints.z6);
    //5段处树枝
    if(that.process>=16){
      var scale={x:0.4,y:0.5};
      that.drawLeaf(that.ctx,{x:833,y:393},scale,150);
      scale={x:0.5,y:0.5};
      that.drawLeaf(that.ctx,{x:833,y:393},scale,10);
    }
    //6段树枝
    ////参数形如 obj=[{t0:0,t1:1,obj:{lineWidth0:w0,lineWidth1:w1,lineWidth,rate:r,dir:dir}},{}];
    var objZ7=[{t0:0,t1:.5,obj:{lineWidth0:1,lineWidth1:3,lineWidth:3,rate:.1,dir:-1}}];
    objZ7.push({t0:.5,t1:1,obj:{lineWidth0:.5,lineWidth1:2,lineWidth:1,rate:.1,dir:-1}});
    //权值process obj2,线宽控制器，zpoints中盛放的值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
    var objTR={transL:{x:967,y:431},rotate:300*Math.PI/180,scale:{x:1,y:1}};
    that.updateDrawBezRotateScale(16,objZ7,objTR,that.zPoints.z7);
    //5段处树枝
    if(that.process>=17){
      var scale={x:0.4,y:0.5};
      that.drawLeaf(that.ctx,{x:833,y:393},scale,150);
      scale={x:0.5,y:0.5};
      that.drawLeaf(that.ctx,{x:833,y:393},scale,10);
    }
    //绘制文本
    //画文本
    var translateP1={x:122,y:100};
    //绘制文本 process权值 转移值
    that.updateText(3,translateP1,array2);
    var translateP3={x:90,y:305};
    //绘制文本 process权值 转移值
    that.updateText(5,translateP3,array3);
    var translateP4={x:190,y:183};
    //绘制文本 process权值 转移值
    that.updateText(6,translateP4,array4);
    var translateP5={x:312,y:50};
    //绘制文本 process权值 转移值
    that.updateText(7,translateP5,array5);
    var translateP6={x:430,y:206};
    //绘制文本 process权值 转移值
    that.updateText(8,translateP6,array6);
    var translateP7={x:300,y:414};
    //绘制文本 process权值 转移值
    that.updateText(9,translateP7,array7);

  },




  //
  comCtrlBesTo(process,p30,b31,b32,p31){
    if(that.process==process){
      that.ctlT+=0.01;
      that.tempPointer=that.calcB(that.ctlT,p30,b31,b32,p31);
    }

  },
  readyforBesToBes(process,z30,zb31,zb32,z31){
    if(that.process==process){
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
  },
  //p1贝斯的终点，p20直线的起点
  readyforBesToLine(process,p20){

    if(that.process==process){

      if(that.ctlT>=1){
        that.ctlT=0;
        that.process++;
        //为2段处树枝准备
        that.pointer=that.cloneP(p20);
        that.pointer0=that.cloneP(p20);
        that.pointer1=null;
        that.pointer2=null;
      }
    }
  },


  //p0,起点 p1终点，process完成权值
  comCtrlLineTo(process,p0,p1){
    if(that.process==process){
      that.pointer.x++;
      that.pointer=that.calcL(that.pointer.x,p0,p1);
    }

  },
  readyforNext(process,p1,p20){
    //为下段线准备
    if((that.process)==process&&that.pointer.x>p1.x){
      that.process++;
      that.pointer=that.cloneP(p20);//不断变化的临时点
      that.pointer0=that.cloneP(p20);//相对临时控制点
    }
  },
  //从画左右方向的直线过度到贝斯线的准备
  readyforNextBes(process,p21,p30,b31,b32,p31){
    if((that.process)==process&&(that.pointer.x>p21.x)){

      that.process++;
      that.pointer=that.cloneP(p30);
      that.pointer0=that.cloneP(b31);
      that.pointer1=that.cloneP(b32);
      that.pointer2=that.cloneP(p31);
    }
  },


  //绘制文本 process权值 转移值
  updateText(process,translate,array){
    if(that.process>=process){
      that.ctx.save();
      var translateP0=that.cloneP(translate);
      that.drawText(that.ctx,translateP0,array);
      that.ctx.restore();
    }
  },


  //权值process obj2,线宽控制器，points中盛放的索引值,objTR={transL:{x:x,y:y},rota:rotaDeg translate 和rotate
  updateDrawBezRotateScale(process,obj2,objTR,zpObj){
    that.ctx.save();
    if(that.process>=process){
      if(objTR.transL!=undefined){
        that.ctx.translate(objTR.transL.x,objTR.transL.y);
      }
      objTR.rotate!=undefined&&that.ctx.rotate(objTR.rotate);
      objTR.scale!=undefined&&that.ctx.scale(objTR.scale.x,objTR.scale.y);
    }
    that.process==process&&that.drawActiveB(that.ctx,that.ctlT,obj2,that.pointer,that.pointer0,that.pointer1,that.pointer2);

    if(that.process>=process+1){

      that.drawActiveB(that.ctx,1,obj2,zpObj.a,zpObj.b,zpObj.c,zpObj.d);
    }
    that.ctx.restore();
  },

  //权值process obj2,线宽控制器，points中盛放的索引值
  updateDrawBeZ(process,obj2,index){
    that.ctx.save();
    that.process==process&&that.drawActiveB(that.ctx,that.ctlT,obj2,that.pointer,that.pointer0,that.pointer1,that.pointer2);

    if(that.process>=process+1){
      that.drawActiveB(that.ctx,1,obj2,that.points[index].a,that.points[index].b,that.points[index].c,that.points[index].d);
    }
    that.ctx.restore();
  },

  //权值，控制线宽的对象，points数组中盛放控制点的索引值
  updateDrawLine(process,obj,index){
    that.ctx.save();

    //进程为0时,没画满时画动态线
    that.process==process&&(that.drawRangLine2(that.ctx,that.pointer0,that.pointer,obj));
    //进程为1时画全线
    (that.process>=process+1)&&(that.drawRangLine2(that.ctx,that.points[index].a,that.points[index].b,obj));
    that.ctx.restore();
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
    ctx.moveTo(p0.x,p0.y);
    ctx.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
    ctx.stroke();
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

  },
    //画树叶. translate 转移值，scale缩放值 旋转值
    drawLeaf(ctx,translate,scale,rotate){
      ctx.save();
    ctx.lineWidth=1;
    ctx.translate(translate.x,translate.y);
    ctx.scale(scale.x,scale.y);
    ctx.rotate(rotate*Math.PI/180);
    var p0={x:0,y:0};
    var p1={x:p0.x,y:p0.y+13};
    var p2={x:p1.x+10,y:p1.y+3};
    var p3={x:p0.x+20,y:p0.y+20};
    that.drawB(ctx,p0,p1,p2,p3);
    p1={x:p0.x+13,y:p0.y};
    p2={x:p1.x+3,y:p1.y+10};
    that.drawB(ctx,p0,p1,p2,p3);
    ctx.fill();
     ctx.restore();
  }




};
//about.init();
var flag=true;
var top=0;
window.onscroll= function () {
  var top=document.body.scrollTop;
  if(top>=1372&&flag){
    flag=false;
    about.init();
  }
}