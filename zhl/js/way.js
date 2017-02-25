/**
 * Created by lp on 2017/1/31.
 */
var cav=document.getElementById("cway");
var ctx=cav.getContext('2d');

ctx.save();
ctx.moveTo(0,300);

ctx.beginPath();
ctx.lineTo(0,300);
ctx.lineTo(0+30,300+10);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0+30,300+10);
ctx.lineWidth=10;
ctx.lineTo(0+30+60,300+10);
ctx.stroke();
ctx.beginPath();
ctx.lineWidth=15;
ctx.lineCap='round';
ctx.moveTo(0+30+60,300+10)
var x=30,y=50;
ctx.bezierCurveTo(0+30+60+x,300+10+y,0+30+60+x+60,300+10+y,0+30+60+x+60+30,300+10+y-9);
//ctx.bezierCurveTo(0,300,50,30,100,50);
ctx.lineTo(0+30+60+x+60+30,300+10+y-9+20);

ctx.stroke();

