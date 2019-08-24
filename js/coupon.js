var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var welfareId="";
    if(GetQueryString("welfareId")!=null&&GetQueryString("welfareId")!=undefined&&GetQueryString("welfareId")!="")
    {
        welfareId=GetQueryString("welfareId");
    }
    else
    {
        if(JSON.parse(sessionStorage.getItem("welfareId"))!=null&&JSON.parse(sessionStorage.getItem("welfareId"))!=undefined&&JSON.parse(sessionStorage.getItem("welfareId"))!="")
        {
            welfareId=JSON.parse(sessionStorage.getItem("welfareId"));
        }
    }
    if(welfareId!=null&&welfareId!=""&&welfareId!=undefined)
    {
        var data='{"token":"'+token+'","id":'+welfareId+'}';
        AjaxSubmit("get",JSON.parse(data),basePath+"User/getCouponsInfo",getCouponsInfo_fun);
    }
    else{
        layer.closeAll();
        openmodal("未获取到相关信息");
        setTimeout(function(){
            self.location=document.referrer;
        },1000);
    }
}
//获得详情
function getCouponsInfo_fun(res){
    console.log(res);
    var coupons=res.backData.coupons;
    if(coupons!=null&&coupons!=undefined&&coupons!="")
    {
        $("title").text(coupons.title);
        if(coupons.content!=null&&coupons.content!=undefined&&coupons.content!="")
        {
            $(".c-divBoxs").append(coupons.content);
        }
        else{
            $(".c-divBoxs").remove();
        }
        $(".c-pointNum").text(coupons.point);
        $(".c-stockNum").text(coupons.stock_quantity);
        $(".c-couponTName").text(coupons.title);
        $(".c-day").text(changeTime2(coupons.c_start)+'至'+changeTime2(coupons.c_end));
        if(coupons.search_image!=null&&coupons.search_image!=undefined&&coupons.search_image!="")
        {
            $(".c-bannerImg").attr("src",imgPath+coupons.search_image);
        }
        else{
            $(".c-bannerImg").attr("src","../img/vc-banner.png");
        }
        var date=Date.parse(new Date());
        var dateEnd=Date.parse(coupons.c_end);
        var is_have=res.backData.is_have;
        var integral=res.backData.integral;
        var footDiv="";
        //已过期
        if(dateEnd<date)
        {
            footDiv+='<span class="c-footerNavLi" data-id="4">已过期</span>';
        }
        //已领过
        else if(is_have=="1")
        {
            footDiv+='<span class="c-footerNavLi" data-id="1">您已兑换</span>';
        }
        //已领完
        else if(coupons.stock_quantity<=0)
        {
            footDiv+=' <span class="c-footerNavLi" data-id="3">已领完</span>';
        }
        //积分不足
        else if(integral<coupons.point)
        {
            footDiv+=' <span class="c-footerNavLi" data-id="2">积分不足</span>';
        }
        else{
            footDiv+='<span class="c-footerNavLi c-footerNavLi1" data-id="0" data-couponsId="'+coupons.id+'" onclick="getCoupon(this)">兑换</span>';
        }
        footDiv+='<div class="clear"></div>';
        $(".c-footerNav").append(footDiv);
    }
    layer.closeAll();
}
//领取卷
function getCoupon(btn){
    var couponsId=$(btn).attr("data-couponsId");
    var data='{"token":"'+token+'","id":'+couponsId+'}';
    AjaxSubmit("get",JSON.parse(data),basePath+"User/drawCoupons",drawCoupons_fun)
}
function drawCoupons_fun(res){
    console.log(res);
    openmodal("领取成功");
    setTimeout(function () {
        self.location=document.referrer;
    },1000)
}