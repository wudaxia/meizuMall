var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    personalFoot();
    if(token!=null&&token!=undefined&&token!="")
    {
        //获取用户信息
        var data='{"token":"'+token+'"}';
        AjaxSubmit("get",JSON.parse(data),basePath+"User/getUserInfo",getUserInfo_fun)
    }
    else{
        layer.closeAll();
    }
}
function getUserInfo_fun(res){
    console.log(res);
    var userInfo=res.backData.userInfo;
    if(userInfo!=null&&userInfo!=undefined&&userInfo!="")
    {
        //昵称
        if(userInfo.nickname!=null&&userInfo.nickname!=undefined&&userInfo.nickname!="")
        {
            $(".pi-nickName").text(userInfo.nickname);
        }
        else{
            $(".pi-nickName").text("匿名用户");
        }
        //姓名
        if(userInfo.real_name!=null&&userInfo.real_name!=undefined&&userInfo.real_name!="")
        {
            $(".pi-realName").text(userInfo.real_name);
        }
        else{
            $(".pi-realName").text("匿名用户");
        }
        //头像
        if(userInfo.headimgurl!=null&&userInfo.headimgurl!=undefined&&userInfo.headimgurl!="")
        {
            $(".pi-headImg").attr("src",userInfo.headimgurl);
        }
        else{
            $(".pi-headImg").attr("src","../img/head.png");
        }
        //性别
        if(userInfo.sex!=null&&userInfo.sex!=undefined&&userInfo.sex!="")
        {
            if(userInfo.sex=="1")
            {
                $(".pi-sex").text("男").attr("data-sex",userInfo.sex);
            }
            else if(userInfo.sex=="2")
            {
                $(".pi-sex").text("女").attr("data-sex",userInfo.sex);
            }
        }
        else{
            $(".pi-sex").text("未知").attr("data-sex","0");
        }
        //生日
        if(userInfo.birthday!=null&&userInfo.birthday!=undefined&&userInfo.birthday!="")
        {
            $(".pi-date").text(changeTime3(userInfo.birthday*1000)).attr("data-date",userInfo.birthday);
        }
        else{
            $(".pi-date").text("未设置").attr("data-date","0");
        }
        //手机
        if(userInfo.phone!=null&&userInfo.phone!=undefined&&userInfo.phone!="")
        {
            $(".pi-phone").text(userInfo.phone);
        }
        else{
            $(".pi-date").text("未知");
        }
    }
    layer.closeAll();
}

//修改个人信息
function goEdit(btn){
    var style=$(btn).attr("data-id");
    //头像
    if(style=="0")
    {
        sessionStorage.setItem("productEdit",JSON.stringify("0"));
        sessionStorage.setItem("productEditInfo",JSON.stringify($(".pi-headImg").attr("src")));
    }
    //昵称
    else if(style=="1")
    {
        sessionStorage.setItem("productEdit",JSON.stringify("1"));
        sessionStorage.setItem("productEditInfo",JSON.stringify($(".pi-nickName").text()));
    }
    //姓名
    else if(style=="2")
    {
        sessionStorage.setItem("productEdit",JSON.stringify("2"));
        sessionStorage.setItem("productEditInfo",JSON.stringify($(".pi-realName").text()));
    }
    //性别
    //else if(style=="3")
    //{
    //    sessionStorage.setItem("productEdit",JSON.stringify("3"));
    //    sessionStorage.setItem("productEditInfo",JSON.stringify($(".pi-sex").attr("data-sex")));
    //}
    //生日
    else if(style=="4")
    {
        sessionStorage.setItem("productEdit",JSON.stringify("4"));
        sessionStorage.setItem("productEditInfo",JSON.stringify($(".pi-date").attr("data-date")));
    }
    self.location.href="personalInfoEdit.html"
}
//修改性别
function openSex(btn){
    var sexData="";
     sexData+='<div class="pie-userInfoSexB"> ' +
        '<div class="pie-userInfoSexBL fl"> ';
    if($(btn).find(".pi-sex").attr("data-sex")=="1")
    {
        sexData +='<span class="sc-productListCheck sc-productListCheckChose" data-id="1" onclick="event.cancelBubble = true;choseSex(this)"></span> ';
    }
    else{
        sexData +='<span class="sc-productListCheck" data-id="1" onclick="event.cancelBubble = true;choseSex(this)"></span> ';
    }
    sexData+= '<span class="pie-userInfoSexSpan" onclick="event.cancelBubble = true;choseSex(this)">男</span> ' +
        '<div class="clear"> </div> ' +
        '</div> ' +
        '<div class="pie-userInfoSexBL fl"> ';
    if($(btn).find(".pi-sex").attr("data-sex")=="2")
    {
        sexData+='<span class="sc-productListCheck sc-productListCheckChose" data-id="2" onclick="event.cancelBubble = true;choseSex(this)"></span> ';
    }
    else{
        sexData+='<span class="sc-productListCheck" data-id="2" onclick="event.cancelBubble = true;choseSex(this)"></span> ';
    }

    sexData+='<span class="userInfoSexSpan2" onclick="event.cancelBubble = true;choseSex(this)">女</span> ' +
        '<div class="clear"> </div> ' +
        '</div> ' +
        '</div>';

    layer.open({
        title: [
            '请选择您的性别',
            'background-color:#32B8F1; color:#fff;'
        ]
        ,anim: 'up'
        ,content:sexData
        ,btn: ['确认', '取消']
    });
    $(".layui-m-layerbtn").find("span").each(function(){
        if($(this).attr("type")=="1")
        {
            $(this).attr("onclick","enterSex(this)");
        }
    })
}
//选择性别
function choseSex(btn){
    $(".sc-productListCheck").removeClass("sc-productListCheckChose");
    if($(btn).hasClass("sc-productListCheck"))
    {
        $(btn).addClass("sc-productListCheckChose");
    }
   else{
        $(btn).siblings(".sc-productListCheck").addClass("sc-productListCheckChose");
    }
}
//保存性别
function enterSex(btn){
    var sexId=0;
    $(btn).parent().siblings(".layui-m-layercont").find(".sc-productListCheck").each(function(){
        if($(this).hasClass("sc-productListCheckChose"))
        {
            sexId=$(this).attr("data-id");
        }
    });
    var data='{"token":"'+token+'","sex":'+sexId+'}';
    console.log(data);
    AjaxSubmit("post",JSON.parse(data),basePath+"User/amendUserInfo",amendUserInfo_fun)
}
//修改信息
function amendUserInfo_fun(res){
    layer.closeAll();
    openmodal("保存成功");
    setTimeout(function(){
        location.reload();
    },1000);
}