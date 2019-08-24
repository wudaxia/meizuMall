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
        //获得轮播图
        var dataBanner='{"token":"'+token+'"}';
        AjaxSubmit("get",JSON.parse(dataBanner),basePath+"User/getCouponsCarousel",getCouponsCarousel_fun);
        //获得优惠券列表
        getCounsList();
        getMoreover();
    }
    else{
        layer.closeAll();
    }
}
//获得轮播图以及积分和优惠券数量
function getCouponsCarousel_fun(res){
    console.log(res);
    var couponsCarousel=res.backData.couponsCarousel;
    var bannerLi="";
    var bannerImg="";
    var bannerCount=0;
    //优惠券数量
    if(res.backData.couponsNum!=null&&res.backData.couponsNum!=undefined&&res.backData.couponsNum!="")
    {
        $(".vc-myPointNum2").text(res.backData.couponsNum+"张");
    }
    else{
        $(".vc-myPointNum2").text("0张");
    }
    //积分数量
    if(res.backData.integral!=null&&res.backData.integral!=undefined&&res.backData.integral!="")
    {
        $(".vc-myPointNum1").text(res.backData.integral+"分");
    }
    else{
        $(".vc-myPointNum1").text("0分");
    }
    if(couponsCarousel!=null&&couponsCarousel!=undefined&&couponsCarousel!=""&&couponsCarousel.length>0)
    {
        if(couponsCarousel.length==1)
        {
            if(couponsCarousel[0].search_image!=null&&couponsCarousel[0].search_image!=undefined&&couponsCarousel[0].search_image!="")
            {
                bannerImg=imgPath+couponsCarousel[0].search_image;
            }
            else{
                bannerImg="../img/vc-banner.png"
            }
            bannerLi+='<li onclick="vc_goWelfare(this)" data-welFareId="'+couponsCarousel[0].id+'"><img class="img_1" src="'+bannerImg+'"/></li>';
        }
        else{
            bannerCount=1;
            $.each(couponsCarousel, function (i,bannerLis) {
                if(bannerLis.search_image!=null&&bannerLis.search_image!=undefined&&bannerLis.search_image!="")
                {
                    bannerImg=imgPath+bannerLis.search_image;
                }
                else{
                    bannerImg="../img/vc-banner.png"
                }
                bannerLi+='<li onclick="vc_goWelfare(this)" data-welFareId="'+bannerLis.id+'"><img class="img_'+(i+1)+'" src="'+bannerImg+'"/></li>';
            })
        }
        $(".i-banner1Ul").append(bannerLi);
        if(bannerCount==1)
        {
            banner();
        }
        $(".i-banner1Ul").find("img")[0].onload =function() {
            $(".i-banner1Ul").css("height",$(".i-banner1Ul").find("li").height()+"px");
        };
    }
    else{
       $(".vc-banner").remove();
    }
}
//获得优惠券列表
function getCounsList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getCouponsList",getCouponsList_fun);
}
//得到列表
function getCouponsList_fun(res){
    console.log(res);
    var couponsList=res.backData.couponsList;
    var couponDiv="";
    var couponImg="";
    if(couponsList!=null&&couponsList!=undefined&&couponsList!=""&&couponsList.length>0)
    {
        $.each(couponsList,function(i,couponDivLi){
            couponDiv+=' <div class="vc-welfareLi" data-welFareId="'+couponDivLi.id+'" onclick="vc_goWelfare(this)"> ' +
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
                '<p class="vc-welfareLiStyle">仅剩'+couponDivLi.stock_quantity+'张</p> ' +
                '<p class="vc-welfareLiStyle">'+changeTime5(couponDivLi.c_start)+'-'+changeTime5(couponDivLi.c_end)+'</p> ' +
                '<p class="vc-welfareLiGet"> ' +
                '<span class="vc-welfareLiGetNum">'+couponDivLi.point+'</span>积分 ' +
                '</p> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".vc-welfareB").append(couponDiv);
        $(".vc-welfareLiImg img").css("height",$(".vc-welfareLiImg").width());
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>couponsList.length)
        {
            over=0;
            if(pageIndex==1&&couponsList.length ==0)
            {
                //console.log(334);
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/nofare.png"/><div class="o-blankWord">没有相关福利</div></div>')
                $(".vc-welfareB").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        if(pageIndex==1&&couponsList.length ==0)
        {
            //console.log(334);
            closeGetMore();
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/nofare.png"/><div class="o-blankWord">没有相关福利</div></div>')
            $(".vc-welfareB").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}

//去优惠券详情页
function vc_goWelfare(btn){
    self.location.href="coupon.html?welfareId="+$(btn).attr("data-welfareId");
}
//前往其他页面
function vc_goOther(btn){
    var style=$(btn).attr("data-style");
    //前往我的积分页面
    if(style=="0")
    {
        self.location.href="myPoint.html";
    }
    //前往我的优惠券
    else if(style=="1")
    {
        sessionStorage.setItem("myPower",JSON.stringify("0"));
        self.location.href="myPower.html";
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
            getCounsList();
        }
    });
}