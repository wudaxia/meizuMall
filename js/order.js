var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var orderNo="";
    if(GetQueryString("orderNo")!=null&&GetQueryString("orderNo")!=undefined&&GetQueryString("orderNo")!="")
    {
        orderNo=GetQueryString("orderNo");
    }
    else
    {
        if(JSON.parse(sessionStorage.getItem("orderNo"))!=null&&JSON.parse(sessionStorage.getItem("orderNo"))!=undefined&&JSON.parse(sessionStorage.getItem("orderNo"))!="")
        {
            orderNo=JSON.parse(sessionStorage.getItem("orderNo"));
        }
    }
    if(orderNo!=null&&orderNo!=undefined&&orderNo!="")
    {
        console.log(orderNo);
        var data='{"token":"'+token+'","order_no":"'+orderNo+'"}';
        console.log(data);
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/getOrderDetails",getOrderDetails_fun);
    }
    else{
        layer.closeAll();
        openmodal("获取订单失败");
        setTimeout(function(){
            self.location="personalCenter.html";
        },1000);
    }
}
//获得订单详情
function getOrderDetails_fun(res){
    layer.closeAll();
    console.log(res);
    var orderDetails=res.backData.orderDetails;
    if(orderDetails!=null&&orderDetails!=undefined&&orderDetails!="")
    {
        //地址
        $(".oc-userInfo").text(orderDetails.user_name+" "+orderDetails.telphone);
        $(".oc-addressB").text(orderDetails.address);
        //时间
        $(".oc-orderDay").text(changeTime4(orderDetails.add_time));
        $(".oc-orderNo").text(orderDetails.order_no);
        //订单金额
        if(orderDetails.remark=="2")
        {
            $(".oc-orderMoneySumL").text("订单积分");
            $(".oc-orderMoneyBL").text("应扣积分");
            $(".oc-orderMoneySumR").text(orderDetails.payment_fee+"积分");
            $(".oc-orderMoneyBMoney").text(orderDetails.payable_amount+"积分");
        }
        else{
            $(".oc-orderMoneySumL").text("订单金额");
            $(".oc-orderMoneyBL").text("应付金额");
            $(".oc-orderMoneySumR").text("¥"+orderDetails.payment_fee);
            $(".oc-orderMoneyBMoney").text("¥"+orderDetails.payable_amount);
        }
        if(orderDetails.less!=null&&orderDetails.less!=undefined&&orderDetails.less!="")
        {
            $(".oc-orderMoneyDiscountR").text(orderDetails.less).css("color","red");
        }
        else{
            $(".oc-orderMoneyDiscountR").text("无");
        }
        //产品
        var productDiv="";
        if(orderDetails.goods!=null&&orderDetails.goods!=undefined&&orderDetails.goods!=""&&orderDetails.goods.length>0)
        {
            $.each(orderDetails.goods,function(i,productLi){
                if(i==orderDetails.goods.length-1)
                {
                    productDiv+='<div class="oc-productLi"> ';
                }
                else{
                    productDiv+='<div class="oc-productLi oc-productLiLast"> ';
                }
                productDiv+= '<img src="'+imgPath+productLi.img_url+'" class="oc-productImg"/> ' +
                    '<div class="oc-productInfo"> ' +
                    '<div class="oc-productName">'+productLi.goods_title+'</div> ';
                if(productLi.specification!=null&&productLi.specification!=undefined&&productLi.specification!="")
                {
                    productDiv+=   '<div class="oc-productAbstract">'+productLi.specification+'</div> ';
                }
                else{
                    productDiv+=   '<div class="oc-productAbstract"></div> ';
                }
                productDiv+= '<div class="clear"></div> ' +
                    '</div> ' +
                    '<div class="oc-productMoney"> ' +
                    '<div class="oc-productMoneyT"> ';
                if(orderDetails.remark=="2")
                {
                    productDiv+='<span class="oc-productMoneyTR">'+productLi.unit_price+'</span><span class="oc-productMoneyTL">积分</span>';
                }
                else{
                    productDiv+='<span class="oc-productMoneyTL">¥</span><span class="oc-productMoneyTR">'+productLi.unit_price+'</span>';
                }
                productDiv+= '</div> ' +
                    '<div class="oc-productMoneyB"> ' +
                    '<span class="oc-productMoneyBL">×</span><span class="oc-productMoneyBR">'+productLi.num+'</span> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div>';
            });
            $(".oc-product").append(productDiv);
        }
        var footerDiv="";
        //待支付
        if(orderDetails.status=="1")
        {
            footerDiv+=' <span class="o-footerNavLi o-footerNavLi1" onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="0">取消订单</span> ' +
                '<span class="o-footerNavLi o-footerNavLi2 " onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="1">立即付款</span> ' +
                //'<span class="o-footerNavLi o-footerNavLi3 disn" data-id="2">查看物流</span> ' +
                //'<span class="o-footerNavLi o-footerNavLi4 disn" data-id="3">确认收货</span> ' +
                //'<span class="o-footerNavLi o-footerNavLi6 disn" data-id="5">申请退款</span> ' +
                //'<span class="o-footerNavLi o-footerNavLi5 disn" data-id="4">售后服务</span> ' +
                '<div class="clear"></div>';
        }
        //待发货
        else if(orderDetails.status=="2"&&orderDetails.express_id=="0")
        {
            footerDiv+=  '<span class="o-footerNavLi o-footerNavLi3" onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="2">查看物流</span> '+
                '<div class="clear"></div>';
        }
        //待收货
        else if(orderDetails.status=="3"&&orderDetails.express_id=="0")
        {
            footerDiv+=    '<span class="o-footerNavLi o-footerNavLi3" onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="2">查看物流</span> ' +
                '<span class="o-footerNavLi o-footerNavLi4" onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="3">确认收货</span> ' +
                '<span class="o-footerNavLi o-footerNavLi6" onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="5">申请退款</span> '+
                '<div class="clear"></div>';
        }
        //已完成
        else if(orderDetails.status=="4"&&orderDetails.express_id=="0")
        {
            footerDiv+='<span class="o-footerNavLi o-footerNavLi3" onclick="ol_active(this)" data-orderStatus="'+orderDetails.status+'" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="2">查看物流</span> '+
                '<div class="clear"></div>';
        }
        //申请退款中订单
        else if(orderDetails.express_id=="1")
        {
            if(orderDetails.reason!=null&&orderDetails.reason!=undefined&&orderDetails.reason!="")
            {
                $(".o-apply").append("退货理由:"+orderDetails.reason);
            }
            else{
                $(".o-apply").append("退货理由:无");
            }
            footerDiv+='<span class="o-footerNavLi o-footerNavLi3" onclick="ol_active(this)" data-expressId="'+orderDetails.express_id+'" data-orderStatus="6" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="6">取消申请</span> '+
                '<div class="clear"></div>';
        }
        //退款完成
        else if(orderDetails.express_id=="2")
        {
            if(orderDetails.reason!=null&&orderDetails.reason!=undefined&&orderDetails.reason!="")
            {
                $(".o-apply").append("退货理由:"+orderDetails.reason);
            }
            else{
                $(".o-apply").append("退货理由:无");
            }
            personalFoot();
        }
        //退款失败
        else if(orderDetails.express_id=="3")
        {
            if(orderDetails.reason!=null&&orderDetails.reason!=undefined&&orderDetails.reason!="")
            {
                $(".o-apply").append("退货理由:"+orderDetails.reason);
            }
            else{
                $(".o-apply").append("退货理由:无");
            }
            footerDiv+='<span class="o-footerNavLi o-footerNavLi3" onclick="ol_active(this)" data-expressId="'+orderDetails.express_id+'" data-orderStatus="7" data-remark="'+orderDetails.remark+'" data-orderNo="'+orderDetails.order_no+'" data-id="5">重新申请</span> '+
                '<div class="clear"></div>';
        }
        $(".o-footerNav").append(footerDiv);
        o_activeWidth();
    }
    else{
        layer.closeAll();
        openmodal("没有该订单信息");
        setTimeout(function(){
            self.location=document.referrer;
        },1000);
    }
}
//订单底部按钮长度
function o_activeWidth(){
    var footerLi=$(".o-footerNavLi");
    var count=0;
    footerLi.each(function(i,li){
        count++;
    });
    footerLi.css("width",($(".o-footerNav").width()/count)+"px");
}
//确认删除?
function getConfirm2(btn,title,orderStatus) {
    var conHtml = "<div class=\"am-modal am-modal-confirm\" tabindex=\"-1\" id=\"my-confirm\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\">"+title+"</div><div class=\"am-modal-footer\"><span class=\"am-modal-btn cencel\" data-am-modal-cancel>取消</span><span class=\"am-modal-btn enter\" onclick=\"ol_reset(this)\" data-status=\""+orderStatus+"\" data-orderNo=\""+btn+"\" data-am-modal-confirm>确定</span></div> </div></div>"
    $("body").append(conHtml);
    var $modal = $('#my-confirm');
    $modal.modal('open');
}
//操作
function ol_active(btn){
    var ol_style=$(btn).attr("data-id");
    var orderNo=$(btn).attr("data-orderNo");
    var remark=$(btn).attr("data-remark");
    var orderStatus=$(btn).attr("data-orderStatus");
    console.log(orderStatus);
    var expressId=$(btn).attr("data-expressId");
    //取消订单
    if(ol_style=="0")
    {
        getConfirm2(orderNo,"取消订单吗？",orderStatus);
    }
    //立即付款
    else if(ol_style=="1")
    {
        //普通商品
        if(remark!="2")
        {
            var dataInfo='{"produtStyle":"2","orderNo":"'+orderNo+'"}';
            sessionStorage.setItem("productInfo",dataInfo);
            self.location.href="orderConfirmation.html";
        }
    }
    //查看物流
    else if(ol_style=="2")
    {
        sessionStorage.setItem("orderNo",JSON.stringify(orderNo));
        self.location.href="orderLogistic.html"
    }
    //确认收货
    else if(ol_style=="3")
    {
        getConfirm2(orderNo,"确认收货吗？",orderStatus);
    }
    //售后服务
    else if(ol_style=="4")
    {

    }
    //申请退款
    else if(ol_style=="5")
    {
        getPrompt(orderNo,remark);
    }
    //取消申请退款
    else if(ol_style=="6")
    {
        getConfirm2(orderNo,"取消退货申请吗？",orderStatus);
    }
    //退款失败
    else if(ol_style=="7")
    {

    }
    //退款成功
    else if(ol_style=="8")
    {

    }
}




//填写退款申请
function getPrompt(msg,remark) {
    var modalhtml = "<div class=\"am-modal am-modal-prompt\" tabindex=\"-1\" id=\"mymodal\">" +
        "<div class=\"am-modal-dialog\">" +
        "<div class=\"am-modal-hd ol-reTitle\">退货申请<a href=\"javascript: void(0)\" class=\"am-clos am-close1\" data-am-modal-close><img src='../img/p-choseStyleDel.png'></a></div>" +
        "<div class=\"am-modal-bd\" id=\"msg\">" +
        "<div class='ol-reTextTreas'><textarea maxlength='45' class='ol-reTextTrea' oninput='e_word(this)' placeholder='请输入申请理由'></textarea>" +
        "<div class=\"e-wordNum\"> " +
        "<span class=\"e-word\">0</span> " +
        "<span>/ 45</span> " +
        "</div></div>" +
        "</div>" +
        "<div class=\"am-modal-footer\">" +
        "<span class=\"am-btnb\" data-orderNo="+msg+" data-remark="+remark+"  onclick=\"event.cancelBubble = true;refund(this)\">确定</span></div></div></div>";
    $("body").append(modalhtml);
    $('#mymodal').modal('open');
    fixedTextarea();
    $("input").on("keydown  input paste",function(){
        $(".container").removeAttr("style");
    })
}
//字数计算
function e_word(btn){
    if($(btn).val().length<=45)
    {
        $(".e-word").text($(btn).val().length);
    }
    else{
        layer.open({
            content: '不得超过45个字'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    }
}//计算字数
//提交退货申请
function refund(btn){
    $(btn).attr("onclick","");
    var order_no=$(btn).attr("data-orderNo");
    var remark=$(".ol-reTextTrea").val();
    var data='{"token":"'+token+'","order_no":"'+order_no+'","remark":"'+remark+'"}';
    AjaxSubmitAlert("get",JSON.parse(data),basePath+"Order/orderRefund",orderRefund_fun);
}
function orderRefund_fun(res){
    console.log(res);
    layer.open({
        content: '提交成功'
        ,skin: 'msg'
        ,time: 1 //2秒后自动关闭
    });
    setTimeout(function(){
        $(".am-close1").trigger("click");
        self.location.href="order.html";
    },1000);
}
//操作
function ol_reset(btn){
    var status=$(btn).attr("data-status");
    //待付款订单
    if(status=="1")
    {
        var data='{"token":"'+token+'","order_no":"'+$(btn).attr("data-orderNo")+'","status":0}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/changeOrderStatus",changeOrderStatus_fun1);
    }
    //待收货
    else if(status=="3")
    {
        var data='{"token":"'+token+'","order_no":"'+$(btn).attr("data-orderNo")+'","status":"4"}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/changeOrderStatus",changeOrderStatus_fun2);
    }
    //取消退款申请
    else if(status=="6")
    {
        var data='{"token":"'+token+'","order_no":"'+$(btn).attr("data-orderNo")+'"}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/cancelOrderRefund",cancelOrderRefund_fun);
    }
}

//取消退货申请
function cancelOrderRefund_fun(res){
    console.log(res);
    openmodal("取消申请成功");
    setTimeout(function(){
        self.location.href="orderList2.html";
    },1000);
}
//操作结果
function changeOrderStatus_fun1(res){
    console.log(res);
    openmodal("取消订单成功");
    setTimeout(function(){
        self.location.href="orderList.html";
    },1000);
}
function changeOrderStatus_fun2(res){
    console.log(res);
    openmodal("确认收货成功");
    setTimeout(function(){
        self.location.href="orderList.html";
    },1000);
}