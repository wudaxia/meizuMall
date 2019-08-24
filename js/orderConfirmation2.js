var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    //为你推荐
    recommend();
    if(token!=null&&token!=undefined&&token!="")
    {
        //获得产品 or订单详情
        var productInfo=JSON.parse(sessionStorage.getItem("productInfo"));
        if(productInfo!=null&&productInfo!=undefined&&productInfo!="")
        {
            $(".oc-footerSumBuy").attr("productStyle",productInfo.produtStyle);
            //购物车
            if(productInfo.produtStyle=="1")
            {
                var productCarInfo=sessionStorage.getItem("productCarInfo");
                $(".oc-product").attr("data-productId",productInfo.productId);
                $(".oc-product").attr("data-productSum",productInfo.sumMoney);
                $(".oc-orderMoneySum2").text("¥"+productInfo.sumMoney);
                if(productCarInfo!=null&&productCarInfo!=undefined&&productCarInfo!="")
                {
                    var carPoructInfoDiv="";
                    console.log(productCarInfo.split("_"));
                    $.each(productCarInfo.split("_"),function(i,productCarInfos){
                        var newProductCarInfos=JSON.parse(productCarInfos);
                        if(i==productCarInfo.split("_").length-1)
                        {
                            carPoructInfoDiv+='<div class="oc-productLi oc-productLiLast"> ';
                        }
                        else{
                            carPoructInfoDiv+='<div class="oc-productLi"> ';
                        }
                        carPoructInfoDiv+= '<img src="'+imgPath+newProductCarInfos.productImg+'" class="oc-productImg"/> ' +
                            '<div class="oc-productInfo"> ' +
                            '<div class="oc-productName">'+newProductCarInfos.productName+'</div> ' +
                            '<div class="oc-productAbstract">'+newProductCarInfos.productStyle+'</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ' +
                            '<div class="oc-productMoney"> ' +
                            '<div class="oc-productMoneyT"> ' +
                            '<span class="oc-productMoneyTL">¥</span><span class="oc-productMoneyTR">'+newProductCarInfos.productPrice+'</span> ' +
                            '</div> ' +
                            '<div class="oc-productMoneyB"> ' +
                            '<span class="oc-productMoneyBL">×</span><span class="oc-productMoneyBR">'+newProductCarInfos.productNum+'</span> ' +
                            '</div> ' +
                            '</div> ' +
                            '<div class="clear"></div> ' +
                            '</div>';
                    });
                    $(".oc-product").append(carPoructInfoDiv);
                }
                else{
                    openmodal("请重新选购商品");
                    setTimeout(function(){
                        self.location=document.referrer;
                    },1000);
                }
            }
            //产品单品
            else if(productInfo.produtStyle=="0")
            {
                $(".oc-product").attr("data-productSum",parseFloat(parseFloat(productInfo.productNum)*parseFloat(productInfo.productPrice)).toFixed(2)).attr("data-productId",productInfo.productId).attr("data-productNum",productInfo.productNum).attr("data-specification",productInfo.priceStyle);
                var productInfoDiv='  <div class="oc-productLi"> ' +
                    '<img src="'+imgPath+productInfo.productImg+'" class="oc-productImg"/> ' +
                    '<div class="oc-productInfo"> ' +
                    '<div class="oc-productName">'+productInfo.productName+'</div> ' +
                    '<div class="oc-productAbstract">'+productInfo.productName+'</div> ' +
                    '<div class="clear"></div> ' +
                    '</div> ' +
                    '<div class="oc-productMoney"> ' +
                    '<div class="oc-productMoneyT"> ' +
                    '<span class="oc-productMoneyTL"></span><span class="oc-productMoneyTR">'+productInfo.productPrice+'</span>积分 ' +
                    '</div> ' +
                    '<div class="oc-productMoneyB"> ' +
                    '<span class="oc-productMoneyBL">×</span><span class="oc-productMoneyBR">'+productInfo.productNum+'</span> </div> ' +
                    '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div>';
                $(".oc-product").append(productInfoDiv);
                $(".oc-orderMoneySum2").text(parseFloat(parseFloat(productInfo.productNum)*parseFloat(productInfo.productPrice)).toFixed(2));
                $(".oc-orderMoneyBMoney").text(parseFloat(parseFloat(productInfo.productNum)*parseFloat(productInfo.productPrice)).toFixed(2));
                $(".oc-footerSumMoenyR").text(parseFloat(parseFloat(productInfo.productNum)*parseFloat(productInfo.productPrice)).toFixed(2));
            }
            //订单
            else if(productInfo.produtStyle=="2")
            {

            }
        }
        else{
            openmodal("请重新选购商品");
            setTimeout(function(){
                self.location=document.referrer;
            },1000);
        }
        //获得地址信息
        var addressId=JSON.parse(sessionStorage.getItem("addressId"));
        if(addressId!=null&&addressId!=undefined&&addressId!="")
        {
            var addressData='{"token":"'+token+'","id":'+addressId+'}';
            AjaxSubmit("get",JSON.parse(addressData),basePath+"User/getDeliveryAddress",getDeliveryAddress_fun);
        }
        //获得默认地址
        else{
            var addressData='{"token":"'+token+'"}';
            AjaxSubmit("get",JSON.parse(addressData),basePath+"User/getDefaultDeliveryAddress",getDefaultDeliveryAddress_fun);
        }
        //获得优惠券
        var welFareId=JSON.parse(sessionStorage.getItem("welFareId"));
        if(welFareId!=undefined&&welFareId!=""&&welFareId!="")
        {
            var welData='{"token":"'+token+'","id":'+welFareId+'}';
            AjaxSubmit("get",JSON.parse(welData),basePath+"User/getCouponsInfo",getCouponsInfo_fun);
        }
        //getBuyMoney();
    }
    layer.closeAll();
}
//function getCouponsInfo_fun(res){
//    console.log(res);
//    var coupons=res.backData.coupons;
//    if(coupons!=null&&coupons!=undefined&&coupons!="")
//    {
//        if(res.backData.is_have=="1")
//        {
//            $(".oc-orderMoneyDiscountSumR").text(coupons.title).addClass("oc-orderMoneyDiscountSum").attr("data-minNum",coupons.full).attr("data-maxNum",coupons.less).attr("data-couponId",coupons.id);
//        }
//    }
//}
////得到应付金额
//function getBuyMoney(){
//    var fullMoney=$(".oc-orderMoneyDiscountSumR").attr("data-minNum");
//    var lessMoney=$(".oc-orderMoneyDiscountSumR").attr("data-maxNum");
//    var firstMoney=$(".oc-product").attr("data-productSum");
//    if(parseFloat(firstMoney)>=parseFloat(fullMoney))
//    {
//        var lastMoney=parseFloat(firstMoney).toFixed(2)-parseFloat(lessMoney).toFixed(2);
//        if(lastMoney<=0)
//        {
//            $(".oc-orderMoneyBMoney").text("¥0.00");
//            $(".oc-footerSumMoenyR").text("0.00");
//        }
//        else{
//            $(".oc-orderMoneyBMoney").text("¥"+parseFloat(lastMoney).toFixed(2));
//            $(".oc-footerSumMoenyR").text(parseFloat(lastMoney).toFixed(2));
//        }
//    }
//}

//得到地址详情
function getDeliveryAddress_fun(res){
    console.log(res);
    var deliveryAddressList=res.backData.deliveryAddressList;
    if(deliveryAddressList!=null&&deliveryAddressList!=undefined&&deliveryAddressList!="")
    {
        $(".oc-address").attr("data-addressId",deliveryAddressList.id);
        $(".oc-userInfo").text(deliveryAddressList.delivery_user+" "+deliveryAddressList.delivery_phone);
        $(".oc-addressB").text(deliveryAddressList.province_name+deliveryAddressList.city_name+deliveryAddressList.zone_name+deliveryAddressList.address_details)
    }
}
//获得默认地址
function getDefaultDeliveryAddress_fun(res){
    console.log(res);
    var deliveryAddressList=res.backData.defaultDeliveryAddress;
    if(deliveryAddressList!=null&&deliveryAddressList!=undefined&&deliveryAddressList!=""&&deliveryAddressList.length>0)
    {
        $(".oc-address").attr("data-addressId",deliveryAddressList[0].id);
        $(".oc-userInfo").text(deliveryAddressList[0].delivery_user+" "+deliveryAddressList[0].delivery_phone);
        $(".oc-addressB").text(deliveryAddressList[0].province_name+deliveryAddressList[0].city_name+deliveryAddressList[0].zone_name+deliveryAddressList[0].address_details)
    }
    else{
        $(".oc-userInfo").text("请选择您的收货地址");
        $(".oc-addressB").remove();
    }
}
//前往其他页面
function oc_goOther(btn){
    var style=$(btn).attr("data-style");
    //前往我的优惠券
    if(style=="0")
    {
        sessionStorage.setItem("myPower",JSON.stringify("1"));
        self.location.href="myPower.html";
    }
    //前往地址选择
    else if(style=="1")
    {
        sessionStorage.setItem("orderAddress",JSON.stringify("1"));
        self.location.href="addressList2.html";
    }
}
function oc_buyNow(btn){
    $(".oc-footerSumBuy").attr("onclick","");
    var cart_id=$(".oc-product").attr("data-productId");
    var address_id=$(".oc-address").attr("data-addressId");
    var coupons_id=$(".oc-orderMoneyDiscountSumR").attr("data-couponId");
    var goods_id=$(".oc-product").attr("data-productId");
    var num=$(".oc-product").attr("data-productNum");
    var specification=$(".oc-product").attr("data-specification");
    //优惠券
    if(coupons_id==undefined||coupons_id==null||coupons_id=="")
    {
        coupons_id="-1";
    }
    //购物车
    if($(btn).attr("productStyle")=="1")
    {
        //if(cart_id!=null&&cart_id!=undefined&&cart_id!=""&&address_id!=undefined&&address_id!=""&&address_id!=null)
        //{
        //    var data='{"token":"'+token+'","cart_id":"'+cart_id+'","address_id":'+address_id+',"coupons_id":'+coupons_id+'}';
        //    AjaxSubmit("get",JSON.parse(data),basePath+"Order/payCartOrder",payCartOrder_fun);
        //}
        //else{
        //    openmodal("请重新选购商品");
        //    setTimeout(function(){
        //        self.location="productList.html";
        //    },1000);
        //}
    }
    //商品单品
    else if($(btn).attr("productStyle")=="0")
    {
        if(address_id!=null&&address_id!=undefined&&address_id!="")
        {
            var data='{"token":"'+token+'","goods_id":"'+goods_id+'","address_id":'+address_id+',"num":'+num+'}';
            console.log(data);
            AjaxSubmit("get",JSON.parse(data),basePath+"Order/placeOrder",placeOrder_fun);
        }
        else{
            $(".oc-footerSumBuy").attr("onclick","oc_buyNow(this)");
            openmodal("请选择您的地址");
        }
    }
    //订单
    else if($(btn).attr("productStyle")=="2")
    {

    }
}
//商品单品前往支付
function placeOrder_fun(res){
    console.log(res);
    $(".oc-footerSumBuy").attr("onclick","oc_buyNow(this)");
    var data='{"orderId":"'+res.backData.order_no+'","orderProduct":"1"}';
    sessionStorage.setItem("orderInfo",data);
    self.location.href="orderSuccess.html";
}
//购物车购买结果
//function payCartOrder_fun(res){
//    console.log(res);
//    var order_no=res.backData.order_no;
//    var data='{"token":"'+token+'","order_no":"'+order_no+'"}';
//    AjaxSubmit("get",JSON.parse(data),basePath+"Order/orderPayment",orderPayment_fun)
//}
//前往支付