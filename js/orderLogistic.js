var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(".ol-orderInfoImg").css("height",$(".ol-orderInfoImgs").width()+"px");
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
        personalFoot();
        var data='{"token":"'+token+'","order_no":"'+orderNo+'"}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Order/getGoodsLogisticsMessage",getGoodsLogisticsMessage_fun);
    }
    else{
        layer.closeAll();
        openmodal("获取订单信息失败，请重新获取");
        setTimeout(function(){
            self.location="personalCenter.html";
        },1000);
    }
}
//获得物流信息
function getGoodsLogisticsMessage_fun(res){
    layer.closeAll();
    console.log(res);
    var logisticsMessage=res.backData.logisticsMessage;
    $(".ol-orderInfoImg").attr("src",imgPath+res.backData.goodsImg);
    $(".ol-orderInfoNum").text("共"+res.backData.goodsNum+"件");
    $(".ol-orderAddress").text("[收货地址]"+res.backData.address);
    if(logisticsMessage!=null&&logisticsMessage!=undefined&&logisticsMessage!="")
    {
        $(".ol-orderInfoStyle").text(logisticsMessage.stateString);
        $(".ol-orderInfoNo").text(logisticsMessage.nu);
        $(".ol-orderInfoPhoneNo").text(logisticsMessage.comcontact);
        $(".ol-orderInfoCompanyL").text(logisticsMessage.company);
        var dataList=logisticsMessage.data;
        var dataDiv="";
        if(dataList!=null&&dataList!=undefined&&dataList!=""&&dataList.length>0)
        {
            $.each(dataList,function(i,dataLi){
                if(i==dataList.length-1)
                {
                    dataDiv+='<div class="ol-logisticLi ol-logisticLiLast"> ';
                }
                else{
                    dataDiv+='<div class="ol-logisticLi"> ';
                }
                if(i==0)
                {
                    dataDiv+= '<img class="ol-logisticLiImg fl" src="../img/ol-true.png" /> ';
                    dataDiv+= '<div class="ol-logisticLiB ol-logisticLiBChose fl"> ';
                }
                else{
                    dataDiv+= '<img class="ol-logisticLiImg fl" src="../img/ol-false.png" /> ';
                    dataDiv+= '<div class="ol-logisticLiB fl"> ';
                }
                dataDiv+='<div class="ol-logisticLiBDetail">'+dataLi.context+'</div> ' +
                    '<div class="ol-logisticLiBDate">'+dataLi.time+'</div> ' +
                    '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div>';
            })
            $(".ol-logisticInfo").append(dataDiv);
        }
        else{
            $(".ol-logisticInfo").append(' <div class="texC" style="font-size: 14px;">还未有收货信息,请耐心等待</div>');
        }
    }
    else{
        $(".ol-logisticInfo").append(' <div class="texC" style="font-size: 14px;">还未有收货信息,请耐心等待</div>');
    }
}