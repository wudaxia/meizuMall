var token=JSON.parse(localStorage.getItem("token"));
var pageIndex=1;
var pageCount=5;
var over = 1;
var limited = 999999999999999999;
var orderStyle=0;
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    if(token!=null&&token!=undefined&&token!="")
    {
        $(".loadBox").html(addGetMoreInfo());
        getMoreover();
        var pc_orderStyle=JSON.parse(sessionStorage.getItem("orderStyle"));
        if(pc_orderStyle!=null&&pc_orderStyle!=undefined&&pc_orderStyle!="")
        {
            $(".ol-styleLi").each(function(i,li){
                if($(li).attr("data-id")==pc_orderStyle)
                {
                    $(li).trigger("click");
                }
            });
        }
        else{
            $(".ol-styleLi").eq(0).trigger("click");
            //头部切换底部的border长度
            ol_styleFoot();
        }
        personalFoot();
        layer.closeAll();
    }
}
//头部切换订单属性
function ol_styleChose(btn){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(btn).addClass("ol-styleLiChose").siblings(".ol-styleLi").removeClass("ol-styleLiChose");
    orderStyle=$(btn).attr("data-id");
    $(".ol-styleLi").attr("onclick","");
    ol_styleFoot();
    $(".o-blank").remove();
    $(".ol-li").remove();
    $(".recommend").remove();
    pageIndex=1;
    pageCount=5;
    over = 1;
    limited = 999999999999999999;
    sessionStorage.setItem("orderStyle",JSON.stringify(orderStyle));
    getOrderList();
    layer.closeAll();

}
//获得订单列表
function getOrderList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+',"status":"'+orderStyle+'"}';
    console.log(data);
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"Order/getOrderList",getOrderList_fun)
}
//得到订单列表数据
function getOrderList_fun(res){
    console.log(res);
    var orderList=res.backData.orderList;
    if(orderList!=null&&orderList!=undefined&&orderList!=""&&orderList.length>0)
    {
        var orderLiDiv="";
        $.each(orderList,function(i,orderLi){
            var status=orderLi.status;
            var statusWord="";
            var productCount=0;
            var productSum=0;
            var spanDiv="";
            if(status=="1")
            {
                statusWord="等待付款";
                spanDiv+='<span class="ol-liActiveSpan ol-liActiveSpan1" data-remark="'+orderLi.remark+'"  data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="0" onclick="event.cancelBubble = true;ol_active(this)">取消订单</span> ' +
                    '<span class="ol-liActiveSpan ol-liActiveSpan2"  data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="1" onclick="event.cancelBubble = true;ol_active(this)">立即付款</span> ';
            }
            else if(status=="2")
            {
                statusWord="等待发货";
                spanDiv+='<span class="ol-liActiveSpan ol-liActiveSpan6" data-remark="'+orderLi.remark+'" data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="5" onclick="event.cancelBubble = true;ol_active(this)">申请退货</span> ';
            }
            else if(status=="3")
            {
                statusWord="等待收货";
                spanDiv+= '<span class="ol-liActiveSpan ol-liActiveSpan3" data-remark="'+orderLi.remark+'" data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="2" onclick="event.cancelBubble = true;ol_active(this)">查看物流</span> ' +
                    '<span class="ol-liActiveSpan ol-liActiveSpan4"  data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="3" onclick="event.cancelBubble = true;ol_active(this)">确认收货</span> ' +
                    '<span class="ol-liActiveSpan ol-liActiveSpan6"  data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="5" onclick="event.cancelBubble = true;ol_active(this)">申请退款</span> ';
            }
            else if(status=="4")
            {
                status="已经完成";
                spanDiv+=  '<span class="ol-liActiveSpan ol-liActiveSpan3" data-remark="'+orderLi.remark+'" data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" data-id="2" onclick="event.cancelBubble = true;ol_active(this)">查看物流</span> ';
            }
            orderLiDiv+='<div class="ol-li" data-orderStatus="'+status+'" data-orderNo="'+orderLi.order_no+'" onclick="goOrder(this)"> ' +
                '<div class="ol-liT"> ' +
                '<div class="ol-liTime">'+changeTime4(orderLi.add_time)+'</div> ' +
                '<div class="ol-liStyle">'+statusWord+'</div> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="ol-liB"> ';
            if(orderLi.goods!=""&&orderLi.goods!=undefined&&orderLi.goods!=null&&orderLi.goods.length>0)
            {
                $.each(orderLi.goods,function(j,productLi)
                {
                    var specification="";
                    if(productLi.specification!=null&&productLi.specification!=undefined&&productLi.specification!="")
                    {
                        specification=productLi.specification;
                    }
                    else{
                        specification="";
                    }
                    if(productLi.goods_no=="2")
                    {
                        productCount=parseInt(productCount)+parseInt(productLi.num);
                        productSum=parseFloat(parseFloat(productSum)+parseFloat(productLi.num*productLi.unit_price)).toFixed(2);
                        orderLiDiv+= '<div class="ol-liProduct"> ' +
                            '<img src="'+imgPath+productLi.img_url+'" class="ol-liProductImg"/> ' +
                            '<div class="ol-liProductInfo"> ' +
                            '<div class="ol-productName">'+productLi.goods_title+'</div> ' +
                            '<div class="ol-productAbstract">'+specification+'</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ' +
                            '<div class="ol-liMoney"> ' +
                            '<div class="ol-liPrice">'+productLi.unit_price+'积分</div> ' +
                            '<div class="ol-liNum">×'+productLi.num+'</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ';
                    }
                    else{
                        productCount=parseInt(productCount)+parseInt(productLi.num);
                        productSum=parseFloat(parseFloat(productSum)+parseFloat(productLi.num*productLi.unit_price)).toFixed(2);
                        orderLiDiv+= '<div class="ol-liProduct"> ' +
                            '<img src="'+imgPath+productLi.img_url+'" class="ol-liProductImg"/> ' +
                            '<div class="ol-liProductInfo"> ' +
                            '<div class="ol-productName">'+productLi.goods_title+'</div> ' +
                            '<div class="ol-productAbstract">'+specification+'</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ' +
                            '<div class="ol-liMoney"> ' +
                            '<div class="ol-liPrice">¥'+productLi.unit_price+'</div> ' +
                            '<div class="ol-liNum">×'+productLi.num+'</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ' +
                            '<div class="clear"></div> ' +
                            '</div> ';
                    }
                })
            }
            orderLiDiv+='<div class="ol-liSum"> ';
            if(orderLi.remark=="2")
            {
                orderLiDiv+=  '<span class="fr">共'+productCount+'件商品&nbsp;应扣积分：<span class="ol-liSumMoney">'+parseInt(orderLi.payable_amount)+'</span>分</span> ';
            }
            else{
                orderLiDiv+=  '<span class="fr">共'+productCount+'件商品&nbsp;应付金额：¥<span class="ol-liSumMoney">'+orderLi.payable_amount+'</span></span> ';
            }
            orderLiDiv+= '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="ol-liActive"> ';
                orderLiDiv+=spanDiv;
            orderLiDiv+= '<div class="clear"></div> ' +
                '</div> ' +
                '</div> ' +
                '</div>';
        });
        $(".ol-Ul").append(orderLiDiv);
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>orderList.length)
        {
            over=0;
            if(pageIndex==1&&orderList.length ==0)
            {
                //console.log(334);
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                recommend();
                var blank=$('<div class="o-blank"><img src="../img/blank_03.png"/><div class="o-blankWord">您还未有相关订单<a href="productList.html" class="o-blankWord2">可以去看看有哪些想买的</a></div></div>')
                $(".ol-Ul").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        closeGetMore();
        if(pageIndex==1&&orderList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            recommend();
            var blank=$('<div class="o-blank"><img src="../img/blank_03.png"/><div class="o-blankWord">您还未有相关订单<a href="productList.html" class="o-blankWord2">可以去看看有哪些想买的</a></div></div>')
            $(".ol-Ul").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
    $(".ol-styleLi").attr("onclick","ol_styleChose(this)");
}
//头部切换底部的border长度
function ol_styleFoot(){
    var liChoseSpan= $(".ol-styleLiChoseSpan");
    var liChoseStyle=$(".ol-styleLiChose>span");
    liChoseSpan.css("width",liChoseStyle.width()+"px").stop().animate({
        left:liChoseStyle.offset().left
    },500);
}

//前往订单详情
function goOrder(btn){
    sessionStorage.setItem("orderNo",JSON.stringify($(btn).attr("data-orderNo")));
    self.location.href="order.html";
}
//操作
function ol_active(btn){
    var ol_style=$(btn).attr("data-id");
    var orderNo=$(btn).attr("data-orderNo");
    var remark=$(btn).attr("data-remark");
    var orderStatus=$(btn).attr("data-orderStatus");
    //取消订单
    if(ol_style=="0")
    {
        getConfirm2(orderNo,"确认取消订单吗？",orderStatus);
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
        self.location.href="orderList.html";
    },1000);
}
//确认删除?
function getConfirm2(btn,title,orderStatus) {
    var conHtml = "<div class=\"am-modal am-modal-confirm\" tabindex=\"-1\" id=\"my-confirm\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\">"+title+"</div><div class=\"am-modal-footer\"><span class=\"am-modal-btn cencel\" data-am-modal-cancel>取消</span><span class=\"am-modal-btn enter\" onclick=\"ol_reset(this)\" data-status=\""+orderStatus+"\" data-orderNo=\""+btn+"\" data-am-modal-confirm>确定</span></div> </div></div>"
    $("body").append(conHtml);
    var $modal = $('#my-confirm');
    $modal.modal('open');
}
function ol_reset(btn){
    var status=$(btn).attr("data-status");
    //待付款订单
    if(status=="1")
    {
        var data='{"token":"'+token+'","order_no":"'+$(btn).attr("data-orderNo")+'","status":0}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/changeOrderStatus",changeOrderStatus_fun1);
    }
    else if(status=="3")
    {
        var data='{"token":"'+token+'","order_no":"'+$(btn).attr("data-orderNo")+'","status":"4"}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/changeOrderStatus",changeOrderStatus_fun2);
    }
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
            getOrderList();
        }
    });
}