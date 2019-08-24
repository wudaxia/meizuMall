var countdown =60;
var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
}
//绑定手机
function enters(btn){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var user=$(".l-loginUser").val();//获取填入的手机号
    var pass=$(".l-Verifications").val();//获取验证码
    var token=JSON.parse(localStorage.getItem("token"));
    if(phoneText(user)==true)//判断手机号的格式
    {
        if(pass!=""&&pass!=null&&pass!=undefined)//判断是否填入验证码
        {
            var data='{"token":"'+token+'","phone":"'+user+'","code":"'+pass+'"}';
            console.log(data);
            AjaxSubmit("post", JSON.parse(data), basePath + "User/bindUserPhone ",boundUserPhone_fun);
        }
        else {
            layer.closeAll();
            openmodal("请输入验证码");
        }
    }
}
//得到绑定结果
function boundUserPhone_fun(res){
    console.log(res);
    layer.closeAll();
    openmodal("绑定成功");
    sessionStorage.removeItem("token");
    var location=JSON.parse(sessionStorage.getItem("loginUrl2"));
    if(location!=null&&location!=undefined&&location!="")
    {
        setTimeout(function(){
            self.location.href=location;
        },1000)
    }
    else{
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1000)
    }
}
//获取验证码
function getCode(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var user=$(".l-loginUser").val();//获取填入的手机号
    if(phoneText(user))
    {
        var data='{"token":"'+token+'","phone":"'+user+'"}'
        AjaxSubmit("post",JSON.parse(data),basePath+"Common/sendSms",sendSms_fun)
    }
}
//获得验证码
function sendSms_fun(res){
    setTime();
}
//验证码倒计时
function setTime() {
    layer.closeAll();
    if (countdown == 0) {
        countdown = 60;
        $(".l-getCode").attr("onclick","getCode()");
        $(".l-loginUser").removeAttr("disabled");
        $(".l-getCode").text("重新获取");
        clearInterval(setTime);
    } else {
        countdown--;
        $(".l-getCode").attr("onclick","");
        $(".l-loginUser").attr("disabled",true);
        $(".l-getCode").text(countdown+"s");
        setTimeout(setTime,1000);
    }
}
//验证手机号是否为空及格式
function phoneText(){
    var user=$(".l-loginUser").val();//获取填入的手机号
    if(user != ""&& user!=null && user!=undefined)//判断是否填入手机号
    {
        if(phoneMath(user)==true)//判断手机号的格式
        {
            return true;
        }
        else {
            layer.closeAll();
            openmodal("请输入正确的手机号码");
        }
    }
    else {
        layer.closeAll();
        openmodal("请输入手机号码");
    }
}