var token=JSON.parse(localStorage.getItem("token"));
$(function(){
    dateTimer();
    $("#appDate").focus(function(){
        $("#appDate").blur();
    });
});
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var style=JSON.parse(sessionStorage.getItem("productEdit"));
    $(".pie-editInput").focus(function(){
        $(".pie-write").addClass("disn");
    })
    if(style!=null&&style!=undefined&&style!="")
    {
        $(".o-footerNavLi1").attr("data-id",style);
        var userInfo=JSON.parse(sessionStorage.getItem("productEditInfo"));
        //头像
        if(style=="0")
        {
            $(".pie-headImgs").removeClass("disn");
            $(".pie-headImg").attr("src",userInfo);
        }
        //生日
        else if(style=="4")
        {
            $(".pie-userInfoTime").removeClass("disn");
            $("#appDate").val(changeTime3(userInfo*1000));
        }
        //性别
        else if(style=="3")
        {
            //$(".pie-userInfoTime").removeClass("disn");
            //$("#appDate").val(changeTime3(userInfo));
        }
        //文本
        else{
            $(".pie-userInfoText").removeClass("disn");
            $(".pie-editInput").val(userInfo);
        }
        layer.closeAll();
    }
    else{
        layer.closeAll();
        openmodal("请重新选择修改信息");
        setTimeout(function(){
            sessionStorage.removeItem("productEditInfo");
            sessionStorage.removeItem("productEdit");
            self.location.href="personalInfo.html";
        },1000);
    }
}
function dateTimer(){
    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear-100, //开始年份
        endYear: currYear + 10 //结束年份
    };

    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    $("#appTime").mobiscroll(optTime).time(optTime);
}
//删除input内容
function sr_searchDel(btn){
    $(btn).siblings("input").val("").focus();
}
//更换头像
function changeImg(btn){
    $("#filetest").click();
}
var photos=[];
function PreviewImage(btn)//上传预览图片
{
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    photos=[];
    files = btn.files;
    var path= window.URL.createObjectURL(btn.files[0]);
    $("#img1").attr("src",path);
    $.each(files,function(i,e){
        //if(photos.length>3){
        //    openmodal("添加的图片已满")
        //    return false;
        //}
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        photos.push(e);
    });
    $(".pie-headImg").attr("data-id","1");
    layer.closeAll();
}
//保存修改
function  pie_enter(btn){
    var style=$(btn).attr("data-id");
    var nuls=/^[\s]*$/;
    //头像
    if(style=="0")
    {
        layer.open({
            type: 2
            ,content: '加载中',
            shadeClose: false
        });
        if($(".pie-headImg").attr("data-id")=="1")
        {
            var formData = new FormData();
            formData.append('token', token);
            $.each(photos,function(i,e){
                console.log(e);
                formData.append('photos',e);
            });
            AjaxSubmit3("post",formData,basePath+"User/amendUserHeadImg",amendUserHeadImg_fun)
        }
        else{
            layer.closeAll();
            openmodal("保存成功");
            setTimeout(function(){
                self.location.href="personalCenter.html";
            },1500);
        }
        //$.ajax({
        //    url: basePath+ "User/amendUserHeadImg" ,
        //    type: 'POST',
        //    data: formData,
        //    async: false,
        //    cache: false,
        //    contentType: false,
        //    processData: false,
        //    success: function (msg) {
        //        amendUserHeadImg_fun(msg);
        //    }
        //})
    }
    //昵称
    else if(style=="1")
    {
        //不为空
        if($(".pie-editInputInfo").val()==null||$(".pie-editInputInfo").val()==""||$(".pie-editInputInfo").val()==undefined||nuls.test($(".pie-editInputInfo").val()))
        {
            $(".pie-write").removeClass("disn");
        }
        else{
            var data='{"token":"'+token+'","nickname":"'+$.trim($(".pie-editInputInfo").val())+'"}';
            AjaxSubmit("post",JSON.parse(data),basePath+"User/amendUserInfo",amendUserInfo_fun)
        }
    }
    //姓名
    else if(style=="2")
    {
        if($(".pie-editInputInfo").val()==null||$(".pie-editInputInfo").val()==""||$(".pie-editInputInfo").val()==undefined||nuls.test($(".pie-editInputInfo").val()))
        {
            $(".pie-write").removeClass("disn");
        }
        else{
            var data='{"token":"'+token+'","real_name":"'+$.trim($(".pie-editInputInfo").val())+'"}';
            AjaxSubmit("post",JSON.parse(data),basePath+"User/amendUserInfo",amendUserInfo_fun)
        }

    }
    //性别
    else if(style=="3")
    {

    }
    //生日
    else if(style=="4")
    {
        if($("#appDate").val()==null||$("#appDate").val()==""||$("#appDate").val()==undefined||nuls.test($("#appDate").val()))
        {
            $(".pie-write").removeClass("disn");
        }
        else{
            var birthday = Date.parse(new Date($("#appDate").val()));
            var today=Date.parse(new Date());
            if(birthday>today)
            {
                openmodal("抱歉，您的生日不得大于今日");
            }
            else{
                var data='{"token":"'+token+'","birthday":'+birthday/1000+'}';
                //console.log(data);
                AjaxSubmit("post",JSON.parse(data),basePath+"User/amendUserInfo",amendUserInfo_fun)
            }
        }
    }
}
//修改头像
function amendUserHeadImg_fun(res){
    console.log(res);
    layer.closeAll();
    openmodal("保存成功");
    setTimeout(function(){
        self.location.href="personalInfo.html";
    },1500);
}
//修改信息
function amendUserInfo_fun(res){
    console.log(res);
    layer.closeAll();
    openmodal("保存成功");
    setTimeout(function(){
        self.location.href="personalInfo.html";
    },1500);
}