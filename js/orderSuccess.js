function openUserInfo(){
    recommend();
    personalFoot();
    $(".os-result").css("height",$(window).width()*0.27+"px");
    var orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    if(orderInfo!=null&&orderInfo!=undefined&&orderInfo!="")
    {
        //积分商品
        if(orderInfo.orderProduct=="1")
        {
            $(".os-resultT").text("交易成功");
            $(".os-resultB").text("您已被扣除相应积分");
            $(".os-goOrderL>span").text("我的积分").attr("data-style","0");
            $(".os-goOrderR>span").text("订单详情").attr("data-style","1").attr("data-orderNo",orderInfo.orderId);
        }
        //普通商品 成功
        else if(orderInfo.orderProduct=="2")
        {
            $(".os-resultT").text("交易成功");
            $(".os-resultB").text("卖家将收到您的货款");
            $(".os-goOrderL>span").text("继续购物").attr("data-style","3");
            $(".os-goOrderR>span").text("订单详情").attr("data-style","1").attr("data-orderNo",orderInfo.orderId);
        }
        //交易失败
        else if(orderInfo.orderProduct=="3")
        {
            $(".os-resultT").text("交易失败");
            $(".os-resultB").text("您可以重新发起支付");
            $(".os-goOrderL>span").text("重新付款").attr("data-style","2");
            $(".os-goOrderR>span").text("订单详情").attr("data-style","1").attr("data-orderNo",orderInfo.orderId);
        }
    }
    else{
       self.location.href="personalCenter.html";
    }
}
//前往其他页面
function os_goOther(btn){
    var style=$(btn).attr("data-style");
    //我的积分
    if(style=="0")
    {
        self.location.href="myPoint.html";
    }
    //订单详情
    else if(style=="1")
    {
        sessionStorage.setItem("orderNo",JSON.stringify($(btn).attr("data-orderNo")));
        self.location.href="order.html"
    }
    //重新支付
    else if(style=="2")
    {
        sessionStorage.setItem("orderReturn",JSON.stringify($(btn).attr("data-orderNo")));
        self.location.href="orderConfirmation.html";
    }
    //继续购物
    else if(style=="3")
    {
        self.location.href="productList.html";
    }
}