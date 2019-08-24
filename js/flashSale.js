var token=JSON.parse(localStorage.getItem("token"));
var pageIndex=1;
var pageCount=5;
var over = 1;
var limited = 999999999999999999;
var activeId="";
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(".loadBox").html(addGetMoreInfo());
    AjaxSubmit2("get",basePath+"Goods/getActivityTimeList",getActivityTimeList_fun);
}
//获得限时抢购数据
function getActivityTimeList_fun(res){
    console.log(res);
    var showActivity=res.backData.showActivity;
    if(showActivity!=null&&showActivity!=undefined&&showActivity!=""&&showActivity.length>0)
    {
        var saleTimeLiDiv="";
        $.each(showActivity,function(i,saleTimeLi){
            if(saleTimeLi.is_date=="0")
            {
                saleTimeLiDiv+=' <div class="fs-saleTimeLi fs-saleTimeLiChose" onclick="fs_saleTime(this)" data-id="'+saleTimeLi.id+'" data-startTime="'+saleTimeLi.activity_start+'" data-endTime="'+saleTimeLi.activity_end+'"> ';
            }
            else{
                saleTimeLiDiv+=' <div class="fs-saleTimeLi" onclick="fs_saleTime(this)" data-id="'+saleTimeLi.id+'" data-startTime="'+saleTimeLi.activity_start+'" data-endTime="'+saleTimeLi.activity_end+'"> ';
            }
            saleTimeLiDiv+='<div class="fs-saleTimeLidate">'+changeTime6(saleTimeLi.activity_start*1000)+'</div> ';
            if(saleTimeLi.is_date=="1"||(saleTimeLi=="0"&&saleTimeLi.is_now!="1"))
            {
                saleTimeLiDiv+='<div class="fs-saleTimeLiName">即将开始</div> ';
            }
            else if(saleTimeLi.is_date=="0"&&saleTimeLi.is_now=="1")
            {
                saleTimeLiDiv+='<div class="fs-saleTimeLiName">抢购中</div> ';
            }
            else{
                saleTimeLiDiv+='<div class="fs-saleTimeLiName">已过期</div> ';
            }
            saleTimeLiDiv+='</div>' ;
        });
        saleTimeLiDiv+='<div class="clear"></div>' ;
        $(".fs-saleTime").append(saleTimeLiDiv);
        fs_saleTimeWidth();
        $(".fs-saleTimeLiChose").trigger("click");
        layer.closeAll();
    }
    else{
        layer.closeAll();
        openmodal("抱歉，没有限时抢购活动");
        setTimeout(function(){
            self.location.href="index.html";
        },1000);
    }
}
//头部时间切换
function fs_saleTime(btn){
    $(btn).addClass("fs-saleTimeLiChose").siblings(".fs-saleTimeLi").removeClass("fs-saleTimeLiChose");
    activeId=$(btn).attr("data-id");
    downTime();
    pageIndex=1;
    over = 1;
    limited = 999999999999999999;
    $(".fs-productUl").find(".fs-productLi").stop().remove();
    $(".fs-saleTimeLi").attr("onclick","");
    getGoodsList();
}
function getGoodsList(){
    //限时抢购商品
    var data;
    if(token!=null&&token!=undefined&&token!="")
    {
         data='{"token":"'+token+'","activity_id":'+activeId+',"index":'+pageIndex+',"page_num":'+pageCount+'}';
    }
    else{
         data='{"activity_id":'+activeId+',"index":'+pageIndex+',"page_num":'+pageCount+'}';
    }
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getActivityListByTime",getActivityListByTime_fun)
}
//获得下面列表产品
function getActivityListByTime_fun(res){
    console.log(res);
    var goodsList=res.backData.goodsList;
    var goodListDiv="";
    var goodsTime=res.backData.isNowActivity;
    if(goodsList!=null&&goodsList!=undefined&&goodsList!=""&&goodsList.length>0)
    {
        $.each(goodsList,function(i,goodLi){
            goodListDiv+=' <div class="fs-productLi"> ' +
                '<img src="'+imgPath+goodLi.img_url+'" class="fs-productLiImg fl"/> ' +
                '<div class="fs-productInfo fl"> ' +
                '<!--名称--> ' +
                '<div class="fs-productInfoName">';
            if(goodLi.assembly_info!=null&&goodLi.assembly_info!=undefined&&goodLi.assembly_info!="")
            {
                goodListDiv+=  ''+goodLi.title+" "+goodLi.assembly_info+' ';
            }
            else{
                goodListDiv+=  ''+goodLi.title+' ';
            }
            goodListDiv+= '</div> ' +
                '<!--简介--> ' +
                '<div class="fs-productInfoAbstract">' +
                ''+goodLi.tags+' ' +
                '</div> <!--价格--> ' +
                '<div class="fs-productPrice"> ' +
                '<div class="fs-productPriceL fl"> ' +
                '<div class="fs-productPriceLL fl"> ' +
                '<span class="fs-priceTitle fl">¥</span> ' +
                '<span class="fs-relRrice fl">'+goodLi.kill_price+'</span> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="fs-productPriceLR fl"> ' +
                '<s class="fs-priceTitle2 fl">¥'+goodLi.market_price+'</s> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="clear"></div> ';
            //1：当前
            if(goodsTime=="1")
            {
                goodListDiv+='<div class="fs-productOther" data-num="'+goodLi.kill_stock+'"  data-remind="'+goodLi.warn_num+'">剩余库存'+goodLi.kill_stock+'件</div> ' +
                    '</div> ' +
                    '<div class="fs-productPriceR fl"> ';
                if(goodLi.kill_stock<=0)
                {
                    goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB2" data-productId="'+goodLi.id+'" data-style="2">已抢完</span> ';
                }
                else{
                    if(goodLi.assembly!=null&&goodLi.assembly!=undefined&&goodLi.assembly!="")
                    {
                        goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB1" data-assembly="'+goodLi.assembly+'" data-productId="'+goodLi.id+'" onclick="fs_active(this)" data-style="1">立即抢购</span> ';
                    }
                    else{
                        goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB1" data-assembly="-1" data-productId="'+goodLi.id+'" onclick="fs_active(this)" data-style="1">立即抢购</span> ';
                    }
                }
                goodListDiv+= '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div> ' +
                    '</div> <div class="clear"></div> </div>'
            }
            //2:即将开始
            else if(goodsTime=="2")
            {
                goodListDiv+='<div class="fs-productOther" data-num="'+goodLi.kill_stock+'"  data-remind="'+goodLi.warn_num+'">已有'+goodLi.warn_num+'人设置提醒</div> ' +
                    '</div> ' +
                    '<div class="fs-productPriceR fl"> ';
                if(goodLi.is_remind=="-1")
                {
                    if(goodLi.assembly!=null&&goodLi.assembly!=undefined&&goodLi.assembly!="")
                    {
                        goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB4"  data-assembly="'+goodLi.assembly+'" data-remind="'+goodLi.is_remind+'"  data-productId="'+goodLi.id+'" onclick="fs_active(this)" data-style="0">提醒我</span> ';
                    }
                    else{
                        goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB4"  data-assembly="-1" data-remind="'+goodLi.is_remind+'"  data-productId="'+goodLi.id+'" onclick="fs_active(this)" data-style="0">提醒我</span> ';
                    }
                }
                else if(goodLi.is_remind=="1"){
                    if(goodLi.assembly!=null&&goodLi.assembly!=undefined&&goodLi.assembly!="")
                    {
                        goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB3" data-assembly="'+goodLi.assembly+'" data-remind="'+goodLi.is_remind+'"  data-productId="'+goodLi.id+'" onclick="fs_active(this)" data-style="3">取消提醒</span> ';
                    }
                    else{
                        goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB3" data-assembly="-1" data-remind="'+goodLi.is_remind+'"  data-productId="'+goodLi.id+'" onclick="fs_active(this)" data-style="3">取消提醒</span> ';
                    }
                }
                goodListDiv+= '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div> ' +
                    '</div> <div class="clear"></div> </div>';
            }
            //0：已过时
            else if(goodsTime=="3")
            {
                goodListDiv+='<div class="fs-productOther" data-num="'+goodLi.kill_stock+'"  data-remind="'+goodLi.warn_num+'">已有'+goodLi.warn_num+'人设置提醒</div> ' +
                    '</div> ' +
                    '<div class="fs-productPriceR fl"> ';
                goodListDiv+= '<span class="fs-productPriceRB fs-productPriceRB2"  data-style="0">已过时</span> ';
                goodListDiv+= '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div> ' +
                    '</div> <div class="clear"></div> </div>';
            }
        });
        $(".fs-productUl").append(goodListDiv);
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>goodsList.length)
        {
            over=0;
            closeGetMore();
            if(pageIndex==1&&goodsList.length ==0)
            {
                //console.log(334);
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/noArticle.png"/><div class="o-blankWord">没有限时抢购商品</div></div>')
                $(".fs-productUl").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        closeGetMore();
        if(pageIndex==1&&goodsList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/noArticle.png"/><div class="o-blankWord">没有限时抢购商品</div></div>')
            $(".al-newUl").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
    $(".fs-saleTimeLi").attr("onclick","fs_saleTime(this)");
}
//头部时间长度
function fs_saleTimeWidth(){
    var saleLi=$(".fs-saleTimeLi");
    var saleSum=$(".fs-saleTime").width();
    saleLi.css("width",(saleSum/saleLi.length)+"px");
}

//倒计时代码
function downTime(){
    freshTime();
    var sh;
    sh=setInterval('freshTime()',1000);
}
function checktime(i){
    if(i<10){
        i="0"+i;
    }
    else{i=i;}
    return i;
}
function freshTime(){
    var startTime=parseInt($(".fs-saleTimeLiChose").attr("data-startTime"))*1000;
    var endTimes=parseInt($(".fs-saleTimeLiChose").attr("data-endTime"))*1000;
    //console.log(startTime);
    //console.log(endTimes);
    var endtime;
    var nowtime=new Date();
    //抢购中
    if(nowtime>=startTime&&nowtime<=endTimes)
    {
         endtime=endTimes;
        $(".fs-saleTimeLiChose").find(".fs-saleTimeLiName").text("抢购中");
        $(".fs-productTimeL").text("抢购中");
        $(".fs-productTimeRL").text("剩余时间");
        $(".fs-productOther").text("剩余库存"+$(".fs-productOther").attr("data-num")+"件");
    }
    //抢购前
    else if(nowtime<startTime)
    {
        endtime=startTime;
        $(".fs-saleTimeLiChose").find(".fs-saleTimeLiName").text("即将开始");
        $(".fs-productTimeL").text("即将开始");
        $(".fs-productTimeRL").text("距开始");
        if($(".fs-productOther").attr("data-remind")!=null&&$(".fs-productOther").attr("data-remind")!=undefined&&$(".fs-productOther").attr("data-remind")!="")
        {
            $(".fs-productOther").text("已有"+$(".fs-productOther").attr("data-remind")+"人设置提醒");
        }
        else{
            $(".fs-productOther").text("已有0人设置提醒");
        }
    }
    else {
        //刷新页面
        endtime=0;
        $(".fs-saleTimeLiChose").find(".fs-saleTimeLiName").text("已过期");
        $(".fs-productTimeL").text("已过期");
        $(".fs-productTimeRL").text("已过期");
        if($(".fs-productOther").attr("data-remind")!=null&&$(".fs-productOther").attr("data-remind")!=undefined&&$(".fs-productOther").attr("data-remind")!="")
        {
            $(".fs-productOther").text("已有"+$(".fs-productOther").attr("data-remind")+"人设置提醒");
        }
        else{
            $(".fs-productOther").text("已有0人设置提醒");
        }
    }
    var lefttime=parseInt(endtime-nowtime.getTime());//这是毫秒，如果再/1000就是秒
    //console.log(lefttime);
    // 获取剩下的日、小时、分钟、秒钟
    // 一天有多少毫秒，一小时有多少毫秒，一分钟有多少毫秒，一秒钟有多少毫秒
    var dm=24*60*60*1000;
    //天数
    var d=parseInt(lefttime/dm);
    var hm=60*60*1000;
    //小时
    var h=parseInt((lefttime/hm)%24);
    //分钟
    var mm=60*1000;
    var m=parseInt((lefttime/mm)%60);
    //秒
    var s=parseInt((lefttime/1000)%60);
    m=checktime(m);
    s=checktime(s);
    h=checktime(h);
    //$(".i-downTime").text(h+"小时"+m+"分钟"+s+"秒");
    if (lefttime<0) {
        $(".i-limitedSpikeTRHour1").attr("src","../img/0.png");
        $(".i-limitedSpikeTRHour2").attr("src","../img/0.png");
        $(".i-limitedSpikeTRHour3").attr("src","../img/0_1.png");
        $(".i-limitedSpikeTRHour4").attr("src","../img/0_1.png");
        $(".i-limitedSpikeTRHour5").attr("src","../img/0_2.png");
        $(".i-limitedSpikeTRHour6").attr("src","../img/0_2.png");
    }
    else{
        //$(".i-limitedSpikeTRHour").text(h+":");
        //$(".i-limitedSpikeTRMin").text(m+":");
        //$(".i-limitedSpikeTRSe").text(s);
        var s=new String(s);
        var m=new String(m);
        var h=new String(h);
        $(".i-limitedSpikeTRHour1").attr("src","../img/"+ h.substr(0,1)+".png");
        $(".i-limitedSpikeTRHour2").attr("src","../img/"+ h.substr(1,2)+".png");
        $(".i-limitedSpikeTRHour3").attr("src","../img/"+ m.substr(0,1)+"_1.png");
        $(".i-limitedSpikeTRHour4").attr("src","../img/"+ m.substr(1,2)+"_1.png");
        $(".i-limitedSpikeTRHour5").attr("src","../img/"+ s.substr(0,1)+"_2.png");
        $(".i-limitedSpikeTRHour6").attr("src","../img/"+ s.substr(1,2)+"_2.png");
        //console.log("../img/"+ h.substr(0,1)+".png");
        //console.log( $(".i-limitedSpikeTRHour1").css("width"));
    }
}

//前往产品详情页
function fs_goPrduct(btn){
    self.location.href="product.html";
}
//相关操作
function fs_active(btn){
    var style=$(btn).attr("data-style");
    //提醒我&&取消提醒
    if(style=="0"||style=="3")
    {
        var activity_id=$(".fs-saleTimeLiChose").attr("data-id");
        var goods_id=$(btn).attr("data-productId");
        if($(btn).attr("data-assembly")!=null&&$(btn).attr("data-assembly")!=undefined&&$(btn).attr("data-assembly")!="")
        {
            var assembly=$(btn).attr("data-assembly");
        }
        else{
            var assembly="-1";
        }
        if(token!=null&&token!=undefined&&token!="")
        {
            layer.open({
                type: 2
                ,content: '加载中',
                shadeClose: false
            });
            var data='{"token":"'+token+'","activity_id":'+activity_id+',"goods_id":'+goods_id+',"assembly":"'+assembly+'"}';
            console.log(data);
            AjaxSubmit("get",JSON.parse(data),basePath+"User/setRemindGoods",setRemindGoods_fun)
        }
      else{
            wxBack();
        }
    }
    //立即抢购
    else if(style=="1")
    {
        self.location.href="product.html?productId="+$(btn).attr("data-productId")+"&assembly="+$(btn).attr("data-assembly");
    }
    //已抢完
    else if(style=="2")
    {

    }
}
//设置提醒
function setRemindGoods_fun(res){
    console.log(res);
    //openmodal("设置成功");
    pageIndex=1;
    over = 1;
    limited = 999999999999999999;
    $(".fs-productUl").find(".fs-productLi").stop().remove();
    $(".fs-saleTimeLi").attr("onclick","");
    layer.closeAll();
    getGoodsList();

}
//加载更多
function getMoreover() {
    $(window).scroll(function() {
        var $thisMain = $("body");
        var screenScrollHeight = parseInt($thisMain.scrollTop()) + parseInt(window.screen.availHeight);
        //console.log("页面滑动的高度：" + screenScrollHeight + '-' + "屏幕可视区域高度：" + $(document).height());
        //console.log( limited);
        if(screenScrollHeight >= limited&&over==1) {
            limited = 999999999999999999;
            pageIndex++;
            getGoodsList();
        }
    });
}