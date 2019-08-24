var pageIndex=1;
var pageCount=5;
var over = 1;
var limited = 999999999999999999;
var articleIds="";
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    //加载底部
    activeFoot();
    $(".loadBox").html(addGetMoreInfo());
    if(GetQueryString("articleId")!=null&&GetQueryString("articleId")!=undefined&&GetQueryString("articleId")!="")
    {
        articleIds=GetQueryString("articleId");
    }
    else
    {
        if(JSON.parse(sessionStorage.getItem("articleId"))!=null&&JSON.parse(sessionStorage.getItem("articleId"))!=undefined&&JSON.parse(sessionStorage.getItem("articleId"))!="")
        {
            articleIds=JSON.parse(sessionStorage.getItem("articleId"));
        }
    }
    if(articleIds!=null&&articleIds!=""&&articleIds!=undefined)
    {
        layer.closeAll();
        getArticleList();
        getMoreover();

    }
    else{
        layer.closeAll();
        self.location.href="personalCenter.html";
    }
}
function getArticleList(){
    var data='{"id":'+articleIds+',"index":'+pageIndex+',"page_num":'+pageCount+'}';
    AjaxSubmit("get",JSON.parse(data),basePath+"Article/getIndividualArticleList",getIndividualArticleList_fun);
}
//得到魅族信息列表
function getIndividualArticleList_fun(res){
    console.log(res);
    var articleList=res.backData.articleList;
    var addressDiv="";
    var addressDivImg="";
    var categoryName=res.backData.categoryName;
    $("title").text(categoryName);
    $(".al-newT p").text(categoryName);
    if(articleList!=null&&articleList!=undefined&&articleList!="")
    {
        $.each(articleList,function(i,articleLi){
            addressDiv+=' <div class="al-newList1" data-articleId="'+articleLi.id+'" onclick="goArticle(this)"> ';
            if(articleLi.img_url!=null&&articleLi.img_url!=undefined&&articleLi.img_url!="")
            {
                addressDivImg=imgPath+articleLi.img_url;
            }
            else{
                addressDivImg="../img/listimg1.png";
            }
            addressDiv+= '<div class="al-listImg"><img src="'+addressDivImg+'"></div> ' +
                '<div class="al-intro"> ' +
                '<p class="al-introT">'+articleLi.title+'</p> ' +
                '<div class="al-introInfo">'+articleLi.tags+'</div> ' +
                '<div class="al-yuedu"><span class="fl">'+changeTime4(articleLi.add_time)+'</span><span class="fr"><span class="al-yueduNum">'+articleLi.click+'</span>阅读</span></div> ' +
                '</div> ' +
                '</div>';
        })
        $(".al-newUl").append(addressDiv);
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>articleList.length)
        {
            over=0;
            closeGetMore();
            if(pageIndex==1&&articleList.length ==0)
            {
                //console.log(334);
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/noArticle.png"/><div class="o-blankWord">您还未添加收货地址</div></div>')
                $(".al-newUl").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        closeGetMore();
        if(pageIndex==1&&articleList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/noArticle.png"/><div class="o-blankWord">没有相关魅族文章</div></div>')
            $(".al-newUl").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}

//前往文章详情页
function goArticle(btn){
    self.location.href="activeDetails.html?articleId="+$(btn).attr("data-articleId");
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
            getArticleList();
        }
    });
}