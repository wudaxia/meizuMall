var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $("#address").focus(function(){
        $("#address").blur();
    });
    AjaxSubmitAddress("get", addressBasePath, getAddress_fun);
    var editAddress=JSON.parse(sessionStorage.getItem("editAddress"));
    if(token!=null&&token!=undefined&&token!=""&&editAddress!=null&&editAddress!=undefined&&editAddress!="")
    {
        layer.closeAll();
        var data='{"token":"'+token+'","id":'+editAddress+'}';
        AjaxSubmit("get",JSON.parse(data),basePath+"User/getDeliveryAddress",getDeliveryAddress_fun);
    }
    else{
        layer.closeAll();
        self.location.href="addressList.html"
    }
}
function getDeliveryAddress_fun(res){
    console.log(res);
    var deliveryAddressList=res.backData.deliveryAddressList;
    var addressDel="";
    if(deliveryAddressList!=null&&deliveryAddressList!=undefined&&deliveryAddressList!="")
    {
        $(".o-footerNavLi1").attr("data-addressId",deliveryAddressList.id);
        $(".aa-userName").val(deliveryAddressList.delivery_user);
        $(".aa-iPhone").val(deliveryAddressList.delivery_phone);
        if(deliveryAddressList.province_name!=null&&deliveryAddressList.province_name!=undefined&&deliveryAddressList.province_name!="")
        {
            addressDel+=deliveryAddressList.province_name;
        }
        if(deliveryAddressList.city_name!=null&&deliveryAddressList.city_name!=undefined&&deliveryAddressList.city_name!="")
        {
            addressDel+=" "+deliveryAddressList.city_name;
        }
        if(deliveryAddressList.zone_name!=null&&deliveryAddressList.zone_name!=undefined&&deliveryAddressList.zone_name!="")
        {
            addressDel+=" "+deliveryAddressList.zone_name;
        }
        $(".aa-address").val(addressDel).attr("data-value",deliveryAddressList.province_id+","+deliveryAddressList.city_id+","+deliveryAddressList.city_id);
        $(".aa-addressBody").val(deliveryAddressList.address_details);
        if(deliveryAddressList.is_default==1)
        {
            $(".aa-defaultImg").attr("src","../img/sc-chose.png").attr("data-id","1");
        }
        else{
            $(".aa-defaultImg").attr("src","../img/sc-noChose.png").attr("data-id","0");
        }
    }
}
//获取本地三级地址信息
function getAddress_fun(res){
    var selectArea = new MobileSelectArea();
    selectArea.init({trigger:'#address',data:res.data,default:0,position:"bottom"});
}
//设为默认
function aa_default(btn){
    if($(btn).attr("data-id")=="0")
    {
        $(btn).attr("data-id","1");
        $(btn).attr("src","../img/sc-chose.png");
    }
    else{
        $(btn).attr("data-id","0");
        $(btn).attr("src","../img/sc-noChose.png");
    }
}
//保存修改
function enterAddress(btn){
    var id=$(btn).attr("data-addressId");
    var delivery_user=$(".aa-userName").val();
    var delivery_phone=$(".aa-iPhone").val();
    var address=$(".aa-address").attr("data-value");
    var address_details=$(".aa-addressBody").val();
    var is_default=$(".aa-defaultImg").attr("data-id");
    var lenth=address_details.length;
    if(delivery_user!=null&&delivery_user!=undefined&&delivery_user!="")
    {
        if(phoneMath(delivery_phone))
        {
            if(address!=null&&address!=undefined&&address!="")
            {
                if(address_details!=null&&address_details!=undefined&&address_details!=""&&lenth>=5)
                {
                    var address2=address.split(",");
                    var province_name=address2[0];
                    var city_name=address2[1];
                    var zone_name=address2[2];
                    var data='{"token":"'+token+'","id":'+id+',"delivery_user":"'+delivery_user+'","delivery_phone":"'+delivery_phone+'","province_id":'+province_name+',"city_id":'+city_name+',"zone_id":'+zone_name+',"is_default":'+is_default+',"address_details":"'+address_details+'"}';
                    console.log(data);
                    AjaxSubmit("post",JSON.parse(data),basePath+"User/amendDeliveryAddress",amendDeliveryAddress_fun)
                }
                else{
                    openmodal("请输入详细地址，且字数不少于5个字");
                }
            }
            else{
                openmodal("请输入收货地址");
            }
        }
        else{
            openmodal("请输入正确手机号码");
        }
    }
    else{
        openmodal("请输入正确的姓名");
    }
}
//保存成功
function amendDeliveryAddress_fun(res){
    console.log(res);
    openmodal("保存地址成功");
    setTimeout(function(){
        self.location.href="addressList.html";
    },1000)
}