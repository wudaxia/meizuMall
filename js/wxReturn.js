function wxLogins(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    token=JSON.parse(localStorage.getItem("token"));
    if(token==""||token==null||token==undefined)
    {
        var code=GetQueryString("code");
        //var code="15757831215";
        if(code!=null&&code!=""&&code!=undefined)
        {
            //console.log(GetQueryString("code"));
            var wxData='{"code":"'+code+'"}';
            AjaxSubmit("get",JSON.parse(wxData),basePath + "WeChat/landfall",landfall_fun);
        }
        else{
            //sessionStorage.setItem("wxToken","0");
            layer.closeAll();
            wxBack();
        }
    }
    else
    {
        layer.closeAll();
        openUserInfo();
    }
}
function landfall_fun(res){
    layer.closeAll();
    localStorage.setItem("token",JSON.stringify(res.backData.token));
    token=JSON.parse(localStorage.getItem("token"));
    openUserInfo();
}