var token=JSON.parse(localStorage.getItem("token"));
function  openUserInfo(){
    $("#address").focus(function(){
        $("#address").blur();
    });
    AjaxSubmitAddress("get", addressBasePath, getAddress_fun)
}
//获取本地三级地址信息
function getAddress_fun(res){
    console.log(33);
    console.log(res);
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
//保存地址
function enterAddress(btn){
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
                    var data='{"token":"'+token+'","delivery_user":"'+delivery_user+'","delivery_phone":"'+delivery_phone+'","province_id":'+province_name+',"city_id":'+city_name+',"zone_id":'+zone_name+',"is_default":'+is_default+',"address_details":"'+address_details+'"}';
                    //console.log(data);
                    AjaxSubmit("post",JSON.parse(data),basePath+"User/addDeliveryAddress",addDeliveryAddress_fun)
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
function addDeliveryAddress_fun(res){
    console.log(res);
    openmodal("新增地址成功");
    setTimeout(function(){
        self.location.href="addressList.html";
    },1000)
}