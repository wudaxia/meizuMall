function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var articleId="";
    if(GetQueryString("articleId")!=null&&GetQueryString("articleId")!=undefined&&GetQueryString("articleId")!="")
    {
        articleId=GetQueryString("articleId");
    }
    else
    {
        if(JSON.parse(sessionStorage.getItem("articleId"))!=null&&JSON.parse(sessionStorage.getItem("articleId"))!=undefined&&JSON.parse(sessionStorage.getItem("articleId"))!="")
        {
            articleId=JSON.parse(sessionStorage.getItem("articleId"));
        }
    }
    if(articleId!=null&&articleId!=""&&articleId!=undefined)
    {
        layer.closeAll();
        var data='{"id":'+articleId+'}';
        AjaxSubmit("get",JSON.parse(data),basePath+"Article/getArticleMessage",getArticleMessage_fun);
    }
    else{
        layer.closeAll();
        openmodal("未获取到相关信息");
        setTimeout(function(){
            self.location=document.referrer;
        },1000);
    }
}
//获得详情
function getArticleMessage_fun(res){
    console.log(res);
    var articleMessage=res.backData.articleMessage;
    if(articleMessage!=null&&articleMessage!=undefined&&articleMessage!="")
    {
        $("title").text(articleMessage.title);
        if(articleMessage.content!=null&&articleMessage.content!=undefined&&articleMessage.content!="")
        {
            $(".ad-body").append(articleMessage.content);
            var str=new RegExp("http");
            $(".ad-body").find("img").each(function(){
                if(str.test($(this).attr("src").toString()))
                {
                }
                else{
                    var imgUrl=imgPath+$(this).attr("src");
                    $(this).attr("src",imgUrl)
                }
            })
        }
        else{
            openmodal("未获取到相关信息");
            setTimeout(function(){
                self.location=document.referrer;
            },1000)
        }
    }
    else{
        openmodal("未获取到相关信息");
        setTimeout(function(){
            self.location=document.referrer;
        },1000)
    }
}