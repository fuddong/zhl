/**
 * Created by lp on 2017/2/1.
 */

var imgs=[
  {index:0,img:'img/shiniu2.jpg',inx:'img/shiniu_xiao.png'},
  {index:1,img:'img/weishan2.jpg',inx:'img/weishan_xiao.png'},
  {index:2,img:'img/gufeng2.jpg',inx:'img/gufeng_xiao.png'},
  {index:3,img:'img/shiyan2.jpg',inx:'img/shiyan_xiao.png'}

  ];
var carousel={
  that:null,
  LIWIDTH:null,
  $imgs:null,
  $indexs:null,
  $bars:null,
  timer:null,
  WAIT:3000,
  DURATION:1000,
  init(){
    that=this;
    that.LIWIDTH=parseFloat($('#carousel').css('width'));
    this.$imgs=$('#carousel>ul:first-child');
    this.$indexs=$('#carousel>ul:last-child');
    this.$bars=$('#carousel>ul:first-child+ul');
    that.initIndx();
    that.updateView();
    that.startAuto();
    //02-2fu-wang-dong  黑色条栏绑定事件
    that.$bars.on("click","li",(e)=>{
      var i=parseInt($(e.target).attr('data-toggle'));
      that.$indexs.children(`:eq(${i})`).children("img").trigger('click');
    });
    that.$bars.on("mouseover","li",(e)=>{

      var i=parseInt($(e.target).attr('data-toggle'));
      that.$indexs.children(`:eq(${i})`).children("img").trigger('mouseover');
    });
    that.$bars.on("mouseleave","li",(e)=>{
      var i=parseInt($(e.target).attr('data-toggle'));
      that.$indexs.children(`:eq(${i})`).children("img").trigger('mouseleave');
    });
    that.$indexs.on("click","li",(e)=>{
      $(e.target).parent().removeClass("hover1").removeClass("nhover").siblings('.hover1').removeClass("hover1").siblings(".nhover").removeClass("nhover");
      if(!($(e.target).parent().hasClass("hover"))){
        if(that.timer!=null){
        clearTimeout(that.timer);
        that.timer=null;
        }
        var end=null;
        var start=null;
        for(var i=0;i<imgs.length;i++){
          if(imgs[i].inx==that.$indexs.children('.hover').children().attr('src')){
            end=imgs[i].index;
          }
          if(imgs[i].inx==$(e.target).attr('src')){
            start=imgs[i].index;
          }
        }
        $(e.target).parent().addClass("hover").siblings().removeClass("hover");
        that.$imgs.stop(true);
        that.move(start-end);
      }
    });
    that.$indexs.on("mouseover","li",
      function (e) {
        var i=parseInt($(e.target).parent("li").attr("data-toggle"));

        that.$bars.children(`:eq(${i})`).addClass("hover");
        if(that.timer!=null){
          clearTimeout(that.timer);
          that.timer=null;
          $(e.target).parent().addClass("hover1").siblings(".hover").addClass("nhover");
        }
      });
    that.$indexs.on("mouseleave","li", function(e){
        var i=parseInt($(e.target).parent("li").attr("data-toggle"));
        that.$bars.children(`:eq(${i})`).removeClass("hover");
        if(that.timer==null){
          that.$imgs.stop(true);
          that.updateView();
          that.startAuto();
          $(e.target).parent().removeClass("hover1").siblings(".nhover").removeClass("nhover");
        }
      }
    );
  },
  initIndx(){
    var inxHtml='';
    for(var i=0;i<imgs.length;i++){
      inxHtml+=`<li data-toggle="${imgs[i].index}"><img src="${imgs[i].inx}" /></li>`;
    }
    that.$indexs.html(inxHtml);
  },
  updateView(){
    var html="";
    for(var i=0;i<imgs.length;i++){
        html+=`<li><img src=${imgs[i].img}/></li>`;
    }
   that.$imgs.html(html);
    var i=imgs[0].index;
    that.$indexs.children(`:eq(${i})`).addClass("hover").siblings().removeClass('hover');
  },
  startAuto(){
    that.timer=setTimeout(()=>that.move(1),that.WAIT);

  },
  move(n){

    that.$indexs.children().removeClass("hover1").removeClass("nhover");
    if(n>0){
      that.$imgs.animate({left:-n*(that.LIWIDTH)},that.DURATION,()=>{
        imgs=imgs.concat(imgs.splice(0,n));
        that.$imgs.css("left",0);
        that.updateView();

      });
      that.startAuto();
    }else if(n<0){
      n*=-1;
      imgs=imgs.splice(-n,n).concat(imgs);
      that.updateView();
      var left=parseFloat(that.$imgs.css('left'));
      that.$imgs.css('left',left-n*that.LIWIDTH);
      that.$imgs.animate({left:0},that.DURATION,()=>{that.startAuto()});
    }
  }
};
carousel.init();

$('#scenic>div.scenic-bg>div.up>div:first-child>div:last-child>a').hover(
  function(){
    $('#scenic>div.scenic-bg>div.up>div:first-child>div:last-child>span').addClass("scenic-span");
  },
  function(){
    $('#scenic>div.scenic-bg>div.up>div:first-child>div:last-child>span').removeClass("scenic-span");

  }
);

$('#scenic>div.scenic-bg>div.up>div.right.more').hover(
  function (e) {
    $('#scenic>div.scenic-bg>div.up>div.more>section>span.img2:first-child').addClass('scenic-img2');
    $('#scenic>div.scenic-bg>div.up>div.more>section>span.img1+span.img2').addClass('scenic-img02');
  },
  function () {
    $('#scenic>div.scenic-bg>div.up>div.more>section>span.img2:first-child').removeClass('scenic-img2');
    $('#scenic>div.scenic-bg>div.up>div.more>section>span.img1+span.img2').removeClass('scenic-img02');

  }
);
//中惠旅景区
$('#scenic>div.scenic-bg>div.down>ul>li').hover(
  function (e) {
    if(e.target.nodeName=='IMG'){
      $(e.target).siblings("span").addClass("modBgRf");
    }else{
      $(e.target).addClass("modBgRf").siblings("span").addClass("modBgRf");
    }

  },
  function(e){
    $(e.target).removeClass("modBgRf").siblings("span").removeClass("modBgRf");
  }

);
//走进中惠旅
$('#stepInto > div.stepInto-bg > div.up > div:first-child > div:last-child').hover(
  function(){
    $(this).children("span").addClass('scenic-span');
  },
  function(){
    $(this).children("span").removeClass('scenic-span');
  }
);
//放大镜搜索 width:floor((1349px-145px)/4-4);
$('#stepInto > div.stepInto-bg > div.down > ul > li.rf').hover(
  function () {
    $(this).children('span').addClass('fa-sCome').siblings('div').css({background:'#cf2929'}).children('p').addClass('white');
  },
  function () {
    $(this).children('span').removeClass('fa-sCome').siblings('div').css({background:'#ededed'}).children('p').removeClass('white');
    ;
  }
);




