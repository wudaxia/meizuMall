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
    var addressListBack=JSON.parse(sessionStorage.getItem("addressList"));
    if (window.history && window.history.pushState) {
        if(addressListBack=="1")
        {
            window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
            window.history.forward(1);
            $(window).on('popstate', function () {
                self.location.href="addressList2.html";
            });
        }

    }
    $(".loadBox").html(addGetMoreInfo());
    if(token!=null&&token!=undefined&&token!="")
    {
        layer.closeAll();
        getAddressList();
        getMoreover();
    }
    else{
        layer.closeAll();
    }
}
//获取地址列表
function getAddressList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    console.log(data);
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getDeliveryAddressList",getDeliveryAddressList_fun);
}
function getDeliveryAddressList_fun(res){
    console.log(res);
    var deliveryAddressList=res.backData.deliveryAddressList;
    var addressDiv="";
    if(deliveryAddressList!=null&&deliveryAddressList!=undefined&&deliveryAddressList!=""&&deliveryAddressList.length>0)
    {
        $.each(deliveryAddressList,function(i,addressLi){
            addressDiv+=' <div class="al-li" data-id="'+addressLi.id+'"> ' +
                '<!--我的信息--> ' +
                '<div class="al-liT"> ' +
                '<div class="al-liUserInfo"> ' +
                '<div class="al-liName fl">'+addressLi.delivery_user+'</div> ' +
                '<div class="al-liPhone fr">'+addressLi.delivery_phone+'</div> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="al-liAddress">'+addressLi.province_name+addressLi.city_name+addressLi.zone_name+addressLi.address_details+'</div> ' +
                '</div> <!--操作--> ' +
                '<div class="al-liB"> ' +
                '<!--设为默认--> '+
                '<div class="al-liDefault fl" data-addressId="'+addressLi.id+'" onclick="al_active(this)" data-style="0"> '
            if(addressLi.is_default=="1")
            {
                addressDiv+= '<img src="../img/sc-chose.png" class="al-liDefaultImg fl"/>' +
                    '<span class="al-liDefaultWord al-liDefaultWordChose fl">默认地址</span> ';
            }
            else{
                addressDiv+= '<img src="../img/sc-noChose.png" class="al-liDefaultImg fl"/> ' +
                    '<span class="al-liDefaultWord fl">设为默认</span>';
            }
            addressDiv+= '<div class="clear"></div> ' +
                '</div> ' +
                '<!--操作--> ' +
                '<div class="al-liActive fr"> ' +
                '<div class="al-liEdit fl" onclick="al_active(this)" data-addressId="'+addressLi.id+'" data-style="1"> ' +
                '<img src="../img/al-edit.png" class="al-liEditImg fl"/> ' +
                '<span class="al-liEditWord fl">编辑</span> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="al-liDel fl" data-addressId="'+addressLi.id+'" onclick="al_active(this)" data-style="2"> ' +
                '<img src="../img/al-del.png" class="al-liDelImg fl"/> ' +
                '<span class="al-liDelWord fl">删除</span> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '</div>';
        });
        $(".al-ul").append(addressDiv);
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>deliveryAddressList.length)
        {
            over=0;
            closeGetMore();
            if(pageIndex==1&&deliveryAddressList.length ==0)
            {
                //console.log(334);
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">您还未添加收货地址</div></div>')
                $(".al-ul").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        closeGetMore();
        if(pageIndex==1&&deliveryAddressList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">您还未添加收货地址</div></div>')
            $(".al-ul").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}
//操作
function al_active(btn){
    var style=$(btn).attr("data-style");
    var addressId=$(btn).attr("data-addressId");
    var data='{"token":"'+token+'","id":'+addressId+'}';
    console.log(data);
    //设置默认地址
    if(style=="0")
    {
        layer.open({
            type: 2
            ,content: '加载中',
            shadeClose: false
        });
        AjaxSubmit("get",JSON.parse(data),basePath+"User/amendDefaultDeliveryAddress",amendDefaultDeliveryAddress_fun);
        function amendDefaultDeliveryAddress_fun(res){
            console.log(res);
            layer.closeAll();
            $(".al-liDefault").each(function(i,defaultLi){
                $(defaultLi).find(".al-liDefaultWord").removeClass("al-liDefaultWordChose").text("设为默认");
                $(defaultLi).find(".al-liDefaultImg").attr("src","../img/sc-noChose.png");
            })
            $(btn).find(".al-liDefaultWord").addClass("al-liDefaultWordChose").text("默认地址");
            $(btn).find(".al-liDefaultImg").attr("src","../img/sc-chose.png");
        }
    }
    //修改地址
    else if(style=="1")
    {
        sessionStorage.setItem("editAddress",JSON.stringify(addressId));
        self.location.href="editAddress.html";
    }
    //删除地址
    else if(style=="2")
    {
        layer.open({
            type: 2
            ,content: '加载中',
            shadeClose: false
        });
        getConfirm2(addressId);
    }
    //新增地址
    else if(style=="3")
    {
        self.location.href="addAddress.html";
    }
}
//删除地址
function getConfirm2(btn) {
    layer.closeAll();
    var conHtml = "<div class=\"am-modal am-modal-confirm\" tabindex=\"-1\" id=\"my-confirm\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\">确认删除吗？</div><div class=\"am-modal-footer ol-footer\"><span class=\"am-modal-btn cencel\" data-am-modal-cancel>取消</span><span class=\"am-modal-btn enter\" onclick=\"al_del(this)\" data-addressId=\""+btn+"\" data-am-modal-confirm>确定</span></div> </div></div>"
    $("body").append(conHtml);
    var $modal = $('#my-confirm');
    $modal.modal('open');
}
function al_del(btn){
    var addressId=$(btn).attr("data-addressId");
    var data='{"token":"'+token+'","id":'+addressId+'}';
    AjaxSubmit("get",JSON.parse(data),basePath+"User/deleteDeliveryAddress",deleteDeliveryAddress_fun);
}
function deleteDeliveryAddress_fun(res){
    console.log(res);
    openmodal("删除地址成功！");
    setTimeout(function(){
        location.reload();
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
            getAddressList();
        }
    });
}
