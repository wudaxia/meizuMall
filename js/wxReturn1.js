function wxLogins(){
    fixed();
    fixedTextarea();
    token=JSON.parse(localStorage.getItem("token"));
    if(token==""||token==null||token==undefined)
    {
        var code=GetQueryString("code");
        //var code="15757831215";
        if(code!=null&&code!=""&&code!=undefined)
        {
            //console.log(GetQueryString("code"));
            var wxData='{"code":"'+code+'"}';
            AjaxSubmitIndex("get",JSON.parse(wxData),basePath + "WeChat/landfall",landfall_fun);
        }
        else{
            //wxBack2();
            openUserInfo();
        }
        //else{
        //    openmodal("未获取到相关信息");
        //    setTimeout(function () {
        //        sessionStorage.setItem("wxToken","0");
        //        wxBack();
        //    },1500);
        //}
    }
    else
    {
        openUserInfo();
    }
}
function landfall_fun(res){
    layer.closeAll();
    localStorage.setItem("token",JSON.stringify(res.backData.token));
    token=JSON.parse(localStorage.getItem("token"));
    openUserInfo();
    //else if(res.result.code=="3202")
    //{
    //    openmodal("微信code失效");
    //}
    //else if(res.result.code=="3203")
    //{
    //    self.location.href="wxGzh.html";
    //}
}
