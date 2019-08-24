var token=JSON.parse(localStorage.getItem("token"));
var pageIndex=1;
var pageCount=5;
var over = 1;
var limited = 999999999999999999;
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    personalFoot();
    if(token!=null&&token!=undefined&&token!="")
    {
        layer.closeAll();
        $(".loadBox").html(addGetMoreInfo());
        //获得优惠券列表
        getMyPowerList();
        getMoreover();
    }
    else{
        layer.closeAll();
    }
}
//获得我的优惠券列表
function getMyPowerList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getDrawCouponsList",getDrawCouponsList_fun);
}
//得到列表
function getDrawCouponsList_fun(res){
    console.log(res);
    var couponsList=res.backData.couponsList;
    var couponDiv="";
    var couponImg="";
    if(couponsList!=null&&couponsList!=undefined&&couponsList!=""&&couponsList.length>0)
    {
        $.each(couponsList,function(i,couponDivLi){
            var isOld=1;
            if(Date.parse(couponDivLi.c_end)<Date.parse(new Date()))
            {
                isOld=-1;
            }
            couponDiv+=' <div class="vc-welfareLi" data-welFareId="'+couponDivLi.id+'" onclick="vc_goWelfare(this)" data-isOld="'+isOld+'"> ' +
                '<div class="vc-welfareLiImg"> ';
            if(couponDivLi.img_url!=null&&couponDivLi.img_url!=undefined&&couponDivLi.img_url!="")
            {
                couponImg=imgPath+couponDivLi.img_url;
            }
            else{
                couponImg="../img/p-styleProducts.jpg";
            }
            //console.log(couponImg);
            couponDiv+= '<img src="'+couponImg+'"/> ' +
                '</div> ' +
                '<div class="vc-welfareLiDetails"> ' +
                '<p class="vc-welfareLiName">'+couponDivLi.title+'</p> ' +
                //'<p class="vc-welfareLiStyle">仅剩'+couponDivLi.stock_quantity+'张</p> ' +
                '<p class="vc-welfareLiStyle">'+changeTime5(couponDivLi.c_start)+'-'+changeTime5(couponDivLi.c_end)+'</p> ' +
                '<p class="vc-welfareLiGet"> ' +
                '<span class="vc-welfareLiGetNum">'+couponDivLi.point+'</span>积分 ' +
                '</p> ' +
                '</div> ';
            if(isOld==-1)
            {
                couponDiv+='<img  class="mp-expiredImg" src="../img/mp-expired.png"/>';
            }
            couponDiv+=  '<div class="clear"></div> ' +
                '</div>';
        });
        $(".vc-welfareB").append(couponDiv);
        var counts=0;
        $(".vc-welfareLi").each(function(){
            if($(this).attr("data-isOld")=="-1")
            {
                counts++;
            }
        });
        $(".mp-blankWord").remove();
        if(counts==$(".vc-welfareLi").length&&couponsList.length!=0)
        {
            var blank=$('<div class="mp-blankWord">您没有可用优惠券<p class="mp-blankWord2"><a href="vipCenter.html">可以看看有哪些可领优惠</a></p></div>');
            $(".vc-welfareB").append(blank);
        }
        $(".vc-welfareLiImg img").css("height",$(".vc-welfareLiImg").width());
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>couponsList.length)
        {
            over=0;
            closeGetMore();
            if(pageIndex==1&&couponsList.length ==0)
            {
                //console.log(334);
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/nofare.png"/><div class="o-blankWord">您没有任何优惠券<p class="o-blankWord2"><a href="vipCenter.html">可以看看有哪些可领优惠</a></p></div></div>')
                $(".vc-welfareB").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        closeGetMore();
        if(pageIndex==1&&couponsList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/nofare.png"/><div class="o-blankWord">您没有任何优惠券<p class="o-blankWord2"><a href="vipCenter.html">可以看看有哪些可领优惠</a></p></div></div>')
            $(".vc-welfareB").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}
//去优惠券详情页
function vc_goWelfare(btn){
    var myPower=JSON.parse(sessionStorage.getItem("myPower"));
    //会员中心过来
    if(myPower=="0")
    {
        self.location.href="coupon.html?welFareId="+$(btn).attr("data-welFareId");
    }
    //订单确认页过来
    else if(myPower=="1")
    {
        if($(btn).attr("data-isOld")=="-1")
        {

        }
        else{
            sessionStorage.setItem("welFareId",JSON.stringify($(btn).attr("data-welfareId")));
            self.location.href="orderConfirmation.html";
        }
    }
    else{
        self.location.href="coupon.html?welFareId="+$(btn).attr("data-welFareId");
    }
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
            getMyPowerList();
        }
    });
}