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
  timerCnt:null,//定时器返回的timer有延迟 用于判断是否应该在$index mouseleave时清除动画叠加
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
          that.timerCnt=false;
          that.timer=null;
          //$(e.target).parent().addClass("hover1").siblings(".hover").addClass("nhover");
          $(this).addClass("hover1").siblings(".hover").addClass("nhover");
        }
      });
    that.$indexs.on("mouseleave","li", function(e){
        var i=parseInt($(e.target).parent("li").attr("data-toggle"));
        that.$bars.children(`:eq(${i})`).removeClass("hover");
        //that.timer==null  if条件
        if(that.timerCnt==false){
          console.log('ff');
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
    that.timerCnt=true;
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
    console.log($(this).html());
    $(this).children('i').addClass('detail-cir').siblings('div').addClass('modTitBg').siblings('span').addClass("modBgRf").children('span').addClass('modIcon1');
    //if(e.target.nodeName=='IMG'){
    //  $(e.target).siblings("span").addClass("modBgRf").children('span').addClass('modIcon1');
    //}else{
    //  $(e.target).addClass("modBgRf").siblings("span").addClass("modBgRf").children('span').addClass('modIcon1');
    //}

  },
  function(e){
    $(this).children('i').removeClass('detail-cir').siblings('div').removeClass('modTitBg').siblings('span').removeClass("modBgRf").children('span').removeClass('modIcon1');
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
//行业动态
$('#indusAc  > section> ul').on('mouseover',"li", function () {
  $(this).children('p').addClass('font-rif');
});
$('#indusAc > section > ul').on('mouseleave',"li", function () {
  $(this).children('p').removeClass('font-rif');
});
//智慧景区
$('#indusAc > section.mid > div:last-child > dl').on('mouseover',"dd", function () {
  $(this).children('p:first-child').addClass('font-9c');
});
$('#indusAc > section.mid > div:last-child > dl').on('mouseleave',"dd", function () {
  $(this).children('p:first-child').removeClass('font-9c');
});

//黑色更多按钮
$('#indusAc section > div > p:last-child ').hover(function () {
  $(this).find("a>span").addClass('more4');
},
  function () {
    $(this).find("a>span").removeClass('more4');
  }
);

//表单radio 方便点击
$('#online > div > form > .up.radio').on('click',"span", function () {
  $(this).children('input').prop('checked','checked');
})

//表单验证
$.validator.addMethod("cellPhone",function(val){
  return /^(\+86|0086)?\s*1[34578]\d{9}$/
    .test(val);
},"手机号格式不符");
var valArs={
  rules:{
    uname:'required',
    email:{required:true,email:true},
    address:'required',
    content:'required',
    cellPhone:{cellP:true}
  },
  messages:{
    uname:"请输入用户名",
    email:{
      required:'请输入邮箱',
      email:'请输入正确邮箱地址'
    },
    address:'请填写联系地址',
    content:'请输入需求'
  },
  showErrors: function(errorMap, errorList) {
    console.dir(errorList);
    if(errorList.length>0){
      alert(errorList[0].message);
    }
  },

  onfocusout: false,
  onkeyup:false

};
$.validator.addMethod("cellPhone",function(val){
  return /^(\+86|0086)?\s*1[34578]\d{9}$/
    .test(val);
},"手机号格式不符");

$.validator.addMethod('cellP', function (val) {
  var phoneV=$("input[name='phone']").val();
  return phoneV.trim()!=""||val.trim()!="";

},'电话号码、手机号码至少填写一项');

//手机没内容就不验证，有内容则验证
$("[name='cellPhone']").blur(function () {
  $(this).val().trim()!=""&&$(this).rules('add','cellPhone');
  if($(this).val().trim()==""&&$(this).rules().cellPhone){
    $(this).rules('remove','cellPhone');
  }
});

$.validator.setDefaults({
  debug: true
})
$('#message-form').validate(valArs);




