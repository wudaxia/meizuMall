﻿/**
 * Created by Administrator on 2017/2/16 0016.
 */
//var imgPath="http://hzht.helovehome.com";
//var baseUrl="http://qt.zgzbh.com//hzzx/html/";
//var basePath="http://106.14.41.189:8021/api/";//ajax访问路径
var basePath="http://mz.lanpai51.com/api/";//ajax访问路径
var addressBasePath="../base/address/address.txt";
//sessionStorage.setItem("token",JSON.stringify("KAI"));
//var basePath1="";
var imgPath="http://mzht.lanpai51.com";
var imgPath2="http://106.14.41.189:8096";
var appid="wxb84e0e57e03799f3";
function AjaxSubmit(_type, _data, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        data:  _data,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            //通用错误,提示客户
            if(msg.state=="300")
            {
                layer.closeAll();
                openmodal(msg.message);
            }
            else if(msg.state=="200"){
                _method(msg);
            }
            //未登录
            else if(msg.state=="400")
            {
                layer.closeAll();
                localStorage.removeItem("token");
                window.location.reload();
                //openmodal("您未登录");
            }
            //未绑定
            else if(msg.state=="500")
            {
                layer.closeAll();
                localStorage.setItem("token",JSON.stringify(msg.backData.token));
                if($("body").attr("data-url")!="0")
                {
                    var  redirect_url=window.location.href;
                    sessionStorage.setItem("loginUrl2",JSON.stringify(redirect_url));
                }
                openmodal("您未绑定手机，请去绑定");
                setTimeout(function () {
                    self.location.href="login.html";
                },1500)
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
//喜欢
function AjaxSubmitLove(_type, _data, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        data:  _data,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            //通用错误,提示客户
            if(msg.state=="300")
            {
                layer.closeAll();
                openmodal(msg.message);
            }
            else if(msg.state=="200"){
                _method(msg);
            }
            //未登录
            else if(msg.state=="400")
            {
                layer.closeAll();
                localStorage.removeItem("token");
                window.location.reload();
                //openmodal("您未登录");
            }
            //未绑定
            else if(msg.state=="500")
            {
                layer.closeAll();
                if(msg.backData.token!=null&&msg.backData.token!=undefined&&msg.backData.token!="")
                {
                    localStorage.setItem("token",JSON.stringify(msg.backData.token));
                    _method(msg);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
function AjaxSubmitIndex(_type, _data, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        data:  _data,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            //通用错误,提示客户
            if(msg.state=="300")
            {
                layer.closeAll();
                openmodal(msg.message);
            }
            else if(msg.state=="200"){
                _method(msg);
            }
            //未登录
            else if(msg.state=="400")
            {
                layer.closeAll();
                localStorage.removeItem("token");
                window.location.reload();
                //openmodal("您未登录");
            }
            //未绑定
            else if(msg.state=="500")
            {
                layer.closeAll();
                if(msg.backData.token!=null&&msg.backData.token!=undefined&&msg.backData.token!="")
                {
                    localStorage.setItem("token",JSON.stringify(msg.backData.token));
                    _method(msg);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX

//弹框数据
function AjaxSubmitAlert(_type, _data, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        data:  _data,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            //通用错误,提示客户
            if(msg.state=="300")
            {
                layer.closeAll();
                $(".am-btnb").attr("onclick","event.cancelBubble = true;refund(this)");
                layer.open({
                    content: msg.message
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
            else if(msg.state=="200"){
                _method(msg);
            }
            //未登录
            else if(msg.state=="400")
            {
                layer.closeAll();
                localStorage.removeItem("token");
                window.location.reload();
                $(".am-btnb").attr("onclick","event.cancelBubble = true;refund(this)");
                //openmodal("您未登录");
            }
            //未绑定
            else if(msg.state=="500")
            {
                layer.closeAll();
                localStorage.setItem("token",JSON.stringify(msg.backData.token));
                if($("body").attr("data-url")!="0")
                {
                    var  redirect_url=window.location.href;
                    sessionStorage.setItem("loginUrl2",JSON.stringify(redirect_url));
                }
                layer.open({
                    content: "您未绑定手机，请去绑定"
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                setTimeout(function () {
                    self.location.href="login.html";
                },1500)
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX

//无数据获取ajax
function AjaxSubmit2(_type, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            //失败
            if(msg.state=="300")
            {
                layer.closeAll();
                openmodal(msg.message);
            }
            //获取数据成功
            else  if(msg.state=="200")
            {
                _method(msg);
            }
            //未登录
            else if(msg.state=="400")
            {
                layer.closeAll();
                localStorage.removeItem("token");
                window.location.reload();
                //openmodal("您未登录");
            }
            //未绑定
            else if(msg.state=="500")
            {
                if($("body").attr("data-url")!="0")
                {
                    var  redirect_url=window.location.href;
                    sessionStorage.setItem("loginUrl2",JSON.stringify(redirect_url));
                }
                localStorage.setItem("token",JSON.stringify(msg.backData.token));
                //sessionStorage.setItem("loginUrl",JSON.stringify(redirect_url2));
                openmodal("您未绑定手机，请去绑定");
                setTimeout(function () {
                    self.location.href="login.html";
                },1500)
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
function AjaxSubmitAddress(_type, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            _method(msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
//获取头像图片
function AjaxSubmit3(_type, _data, _url, _method){
    $.ajax({
        url: _url ,
        type: _type,
        data: _data,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (msg) {
            //失败
            if(msg.state=="300")
            {
                layer.closeAll();
                openmodal(msg.message);
            }
            //获取数据成功
            else  if(msg.state=="200")
            {
                _method(msg);
            }
            //未登录
            else if(msg.state=="400")
            {
                layer.closeAll();
                localStorage.removeItem("token");
                window.location.reload();
                //openmodal("您未登录");
            }
            //未绑定
            else if(msg.state=="500")
            {
                if($("body").attr("data-url")!="0")
                {
                    var  redirect_url=window.location.href;
                    sessionStorage.setItem("loginUrl2",JSON.stringify(redirect_url));
                }
                localStorage.setItem("token",JSON.stringify(msg.backData.token));
                //sessionStorage.setItem("loginUrl",JSON.stringify(redirect_url2));
                openmodal("您未绑定手机，请去绑定");
                setTimeout(function () {
                    self.location.href="login.html";
                },1500)
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    })
}
function phoneMath(phone){//验证手机号码
    if(phone.match(/^(((1[0-9][0-9]{1})|159|153)+\d{8})$/))//判断手机号的格式
    {
        return true;
    }
    else return false;
}//手机号判断
function name(name){
    if(name.match(/^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/))
    {
        return true
    }
    else
    {
        return false;
    }
}//判断姓名
//function wrong(msg){
//    //登录按钮不可点
//    $("html,body").animate({scrollTop:0}, 500);
//    $("input").attr("disabled",true);
//    $("header").animate({opacity:0.5},500);
//    $("section").animate({opacity:0.5},500);
//    $("footer").animate({opacity:0.5},500);
//    var promptDiv=$('<div class="mA wd60 texC av-wrong" style="opacity:1 !important;"><div class="av-wrongT" style="opacity:1 !important;z-index:5000">温馨提示</div><div>'+msg+'</div><div class="av-close">关闭</div></div>');
//    $("body").append(promptDiv);
//    $(".av-close").click(function () {
//        $("header").animate({opacity:1},500);
//        $("section").animate({opacity:1},500);
//        $("footer").animate({opacity:1},500);
//        $(".av-wrong").remove();
//        $("input").removeAttr("disabled");
//    })
//}//提示框提醒
function i_close(){
    window.open("","_self").close()
}//关闭当前页
function i_back(){
    if(history.length==0){
        openmodal("没有上一页");
    }
    else{history.go(-1); console.log(1)}
}//返回上一页
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}//获取url参数
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}//判断是否用微信内置浏览器打开
function fixed(){
   $("input").on("click",function (){
       if($(this).attr("type")=='text'||$(this).attr("type")=="tel"||$(this).attr("type")=="number")
       {
           $(".footerNav").addClass("hide");
           $(".footerNav2").addClass("hide");
           $(".m-footer").addClass("hide");
           $(".o-footerNav").addClass("hide");
           $(".oc-footerNav").addClass("hide");
           $(".c-footerNav").addClass("hide");
       }
    });
    $("input").on("blur",function(){
        $(".footerNav").removeClass("hide");
        $(".footerNav2").removeClass("hide");
        $(".m-footer").removeClass("hide");
        $(".o-footerNav").removeClass("hide");
        $(".oc-footerNav").removeClass("hide");
        $(".c-footerNav").removeClass("hide");
    });
    //if($(input).attr("type")=='text'||$(input).attr("type")=="tel")
    //{
    //    $('.av-other').addClass("hide");
    //}
    //        //$('.av-other').css({'position':'static'})
    //if($(input).attr("type")=='text'||$(input).attr("type")=="tel")
    //{//$('.av-other').css({'position':'fixed'})
    //
    //}
}//手机端input的虚拟键盘和position：fixed冲突的解决方法
function fixedTextarea(){
    $("textarea").on("click",function (){
        $(".footerNav").addClass("hide");
        $(".footerNav2").addClass("hide");
        $(".m-footer").addClass("hide");
        $(".o-footerNav").addClass("hide");
        $(".oc-footerNav").addClass("hide");
        $(".c-footerNav").addClass("hide");
    })
    $("textarea").on("blur",function(){
        $(".footerNav").removeClass("hide");
        $(".footerNav2").removeClass("hide");
        $(".m-footer").removeClass("hide");
        $(".o-footerNav").removeClass("hide");
        $(".oc-footerNav").removeClass("hide");
        $(".c-footerNav").removeClass("hide");
    })}
function loginUser(){
    openmodal("请重新登录");
    localStorage.removeItem("token");
    setTimeout(function(){
        self.location.href="login.html";
    },1500)
}
function inputChecked(input){
    if($(input).attr("checked")==true)
    {
        $(input).attr("checked",false)
    }
    else{
        $(input).attr("checked",true);
    }
}
function img_click(imgClick){

    var imgSrc=$(imgClick).attr("src");
    var bodyHeight=$(document.body).outerHeight(true);
    var imgHeight=document.documentElement.clientHeight;
    var imgWidth=document.documentElement.clientWidth;
    console.log(imgHeight);
    var bigImg=$('<div onclick="img_clickOut(this)" class="bigImg" style="background-color: #000000"> <div class="page"> ' +
        '<div id="slider"><ul> <li style="display:block"> <div class="pinch-zoom"><img style="display: none"  src="'+imgSrc+'" class="bigImgs"/></div></li> </ul></div></div></div>');
    //$("body").css("background-color","#000000");
    //$("body").css("opacity",0.3);
    $("body").css("height",$(window).height());
    $(".section").addClass("disn");
    $(".footer").addClass("disn");
    $(".header").addClass("disn");
    $("body").append(bigImg);

    //长按扫二维码
    //$('.bigImg').longPress(function(){
    //
    //});

    $('div.pinch-zoom').each(function () {
        new RTP.PinchZoom($(this), {});
    });
    var img = new Image();
    img.src =$(".bigImgs").attr("src");
    var ImgWidth = img.width;
    var ImgHeight = img.height;
    //console.log(ImgWidth);
    //console.log(bodyHeight);
    //var minHeight=$("body").scrollTop();
    //console.log(ImgWidth)
    //if(imgHeight<bodyHeight)
    //{
    //    $(".bigImg").css("height",bodyHeight+'px');
    //}
    //else{
    //    $(".bigImg").css("height",imgHeight+'px');
    //}
    $(".bigImg").css("height",$(window).height()+'px');
    $(".bigImg").css("width",imgWidth+'px');
    //console.log($(".bigImg").css("width").slice(0,length-2));
    //console.log(ImgWidth>$(".bigImg").css("width").slice(0,length-2))
    //console.log(ImgHeight>$(".bigImg").css("height").slice(0,length-2))
    //console.log(window.screen.availHeight)
    //$(".bigImg").css("top",minHeight+'px');
    if(ImgHeight>$(".bigImg").css("height").slice(0,length-2))//判断图片高度是否高于手机屏
    {
        $(".bigImgs").css("height",$(".bigImg").css("height"));
    }
    if(ImgWidth>$(".bigImg").css("width").slice(0,length-2))//判断图片宽度是否宽于手机屏
    {
        $(".bigImgs").css("width",$(".bigImg").css("width"));
    }
    //console.log($(".bigImg").height());
    //console.log($(".bigImgs"));
    var pageHeight=($(".bigImg").height()-$(".bigImg").width())/2;
    //console.log($(".bigImg").height()-$(".bigImgs").height());
    //console.log($(".bigImg").height());
    //console.log(pageHeight);
    if(pageHeight>0)
    {
        $(".pinch-zoom-container").css("top",(pageHeight)+"px");
    }
    $(".bigImgs").css("width",$(".bigImg").width());
    $(".bigImgs").css("height",$(".bigImgs").width());
    $(".bigImgs").fadeIn(1000);
}//图片点击放大
function img_clickOut(imgClickOut){
    $(imgClickOut).remove();
    $("html").removeAttr("style");
    $("body").removeAttr("style");
    $("body").css("min-height",$(window).height());
    $(".section").removeClass("disn");
    $(".footer").removeClass("disn");
    $(".header").removeClass("disn");
    //$(imgClickOut).fadeOut(800);
    //setTimeout(function(){
    //    $(imgClickOut).remove();
    //    $("html").removeAttr("style");
    //    $("body").removeAttr("style");
    //    $("body").css("min-height",$(window).height());
    //    $(".section").removeClass("disn");
    //    $(".footer").removeClass("disn");
    //    $(".header").removeClass("disn");
    //},800)
}//图片点击还原
//计算底部td宽度
function tdCount(){
    var count=0;
    var length=$(".o-orderBtn").find("td").length;
    $(".o-orderBtn").find("td").each(function(i,td){
        if($(td).hasClass("disIB"))
        {
            count++
        }
    })
    var tdWidth=80/(count);
    $(".o-orderBtn").find("td").css("width",tdWidth+"%")
    console.log(count);
}
//判断是否安卓手机
function Android(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1)
    {
        return true;
    }
}
//轮播图
var timer;
function banner(){
    clearInterval(timer);
    $(".main_visual").hover(function(){
        $("#btn_prev,#btn_next").fadeIn();
    },function(){
        $("#btn_prev,#btn_next").fadeOut();
    });
    $dragBln = false;
    $(".main_image").touchSlider({
        flexible : true,
        speed : 800,
        btn_prev : $("#btn_prev"),
        btn_next : $("#btn_next"),
        paging : $(".flicking_con a"),
        counter : function (e){
            $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
        }
    });
    $(".main_image").bind("mousedown", function() {
        $dragBln = false;
    });
    $(".main_image").bind("dragstart", function() {
        $dragBln = true;
    });
    $(".main_image a").click(function(){
        if($dragBln) {
            return false;
        }
    });
    timer = setInterval(function(){
        $("#btn_next").click();
    }, 2000);
    $(".main_visual").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        },2000);
    });
    $(".main_image").bind("touchstart",function(){
        clearInterval(timer);
    }).bind("touchend", function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        }, 2000);
    });
}
//禁止点击
function noClick(res){
    $(res).attr("disabled",true);
    setTimeout(function () {   $(res).attr("disabled",false);},1500);
}
function changeTime(timeStr) {
    var date = new Date(timeStr*1000);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var hour = date.getHours();
    hour=hour>9?hour:"0"+hour;
    var min = date.getMinutes();
    min=min>9?min:"0"+min;
    var dateStr = dateYear + "." + dateMonth + "." + dateDay+"&nbsp;&nbsp;"+hour+":"+min;
    return dateStr;
}//转换时间

function changeTime2(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var dateStr = dateYear + "年" + dateMonth + "月" + dateDay+"日";
    return dateStr;
}//转换时间

function changeTime3(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var dateStr = dateYear + "-" + dateMonth + "-" + dateDay;
    return dateStr;
}//转换时间
function changeTime4(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var hour = date.getHours();
    hour=hour>9?hour:"0"+hour;
    var min = date.getMinutes();
    min=min>9?min:"0"+min;
    var dateStr = dateYear + "-" + dateMonth + "-" + dateDay+" "+hour+":"+min;
    return dateStr;
}//转换时间
function changeTime5(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var dateStr = dateYear + "/" + dateMonth + "/" + dateDay;
    return dateStr;
}//转换时间
function changeTime6(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var hour = date.getHours();
    hour=hour>9?hour:"0"+hour;
    var min = date.getMinutes();
    min=min>9?min:"0"+min;
    var dateStr = hour + ":" + min;
    return dateStr;
}//转换时间
$(function () {
    $("html").css("min-height",$(window).height());
    var ydCss=$("<style>" +
        "#tlbstoolbar{display:none!important}</style>");
    $("head").append(ydCss);
    var backTopDiv= '<img src="../img/goBack.png" class="goBack opacity8" onclick="goBaseBack(this)">';
    $("body").append(backTopDiv);
    fixed();
    fixedTextarea();
    wxLogins();
});
function wxBack(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var redirect_url2="";
    if($("body").attr("data-url")!="0")
    {
        redirect_url2+=window.location.href;
        sessionStorage.setItem("loginUrl",JSON.stringify(redirect_url2));
    }
    setTimeout(function () {
        self.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx40f6c58899e0f91a&redirect_uri=http://mz.lanpai51.com/web/html/wxUrl2.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    },1000);
}
function wxBack2(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var redirect_url2="";
    if($("body").attr("data-url")!="0")
    {
        redirect_url2+=window.location.href;
        sessionStorage.setItem("loginUrl",JSON.stringify(redirect_url2));
    }
    setTimeout(function () {
        self.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx40f6c58899e0f91a&redirect_uri=http://mz.lanpai51.com/web/html/wxUrl2.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    },1000);
}
//禁止浏览器拖动
function stopDefault(){
    window.ontouchmove = function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
}

//允许手机浏览器拖动
function startDefault(){
    window.ontouchmove = function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue = true;
        e.stopPropagation && e.stopPropagation();
        return true;
    }
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
}

//为你推荐

//返回顶部
$(window).scroll(function(){
    //console.log($(window).scrollTop());
    //console.log($(window).height());
    //console.log(parseInt($(window).scrollTop())>parseInt($(window).height()))
   if(parseInt($(window).scrollTop())>parseInt($(window).height()))
   {
       $(".goBack").fadeIn(500);
   }
    else{
       $(".goBack").fadeOut(500);
   }
});
function goBaseBack(){
    $("body").stop().animate({
        scrollTop:parseInt(0)
    },500)
}