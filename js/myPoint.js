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
    if(token!=null&&token!=undefined&&token!="")
    {
        layer.closeAll();
        $(".loadBox").html(addGetMoreInfo());
        getMyPointList();
        getMoreover();
    }
    else{
        layer.closeAll();
    }
}
//积分列表
function getMyPointList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getIntegralList",getIntegralList_fun)
}
//获得积分列表
function getIntegralList_fun(res){
    console.log(res);
    $(".mp-sumPointTR").text(res.backData.integral);
    var integralList=res.backData.integralList;
    var myPointDiv="";
    var myPointImg="";
    if(integralList!=null&&integralList!=undefined&&integralList!=""&&integralList.length>0)
    {
        $(".mp-pointLi").removeClass("mp-pointLiLast");
        $.each(integralList,function(i,integralLi){
            var num=0;
            if(i==integralList.length-1)
            {
                myPointDiv+=' <div class="mp-pointLi mp-pointLiLast"> ';
            }
            else{
                myPointDiv+=' <div class="mp-pointLi"> ';
            }
            myPointDiv+='<!--图片--> ';
            if(integralLi.img_url!=null&&integralLi.img_url!=undefined&&integralLi.img_url!="")
            {
                myPointImg=imgPath+integralLi.img_url;
            }
            else{
                myPointImg="../img/p-styleProducts.jpg";
            }
            myPointDiv+= '<img src="'+myPointImg+'" class="mp-pointLiImg fl"/> ' +
                '<!--明细信息--> ' +
                '<div class="mp-pointLiInfo fl"> ' +
                '<div class="mp-pointLiName">'+integralLi.name+'</div> ' +
                '<div class="mp-pointLiStyle"> ';
            //购物送积分
            if(integralLi.type=="1")
            {
                myPointDiv+= '<span class="mp-pointLiStyleSpan">购物送积分</span> ';
                num="+"+integralLi.num;
            }
            //换购商品减积分
            else if(integralLi.type=="2"){
                myPointDiv+= '<span class="mp-pointLiStyleSpan">购物抵现</span> ';
                num=integralLi.num;
            }
            //换卷减积分
            else if(integralLi.type=="3"){
                myPointDiv+= '<span class="mp-pointLiStyleSpan">换卷减积分</span> ';
                num=integralLi.num;
            }
            myPointDiv+='</div> ' +
                '</div> ' +
                '<!--时间及积分数量--> ' +
                '<div class="mp-pointLiR fl"> ' +
                '<div class="mp-pointLiDate">'+changeTime3(integralLi.add_time*1000)+'</div> ' +
                '<div class="mp-pointLiPoint">'+num+'</div> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".mp-pointDetail").append(myPointDiv);
        $(".mp-pointLiImg").css("height",$(".mp-pointLi").width()*0.2+"px");
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>integralList.length)
        {
            over=0;
            closeGetMore();
            if(pageIndex==1&&integralList.length ==0)
            {
                //console.log(334);
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/noArticle.png"/><div class="o-blankWord">您还未有积分记录</div></div>')
                $(".mp-pointDetail").after(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        closeGetMore();
        if(pageIndex==1&&integralList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/noArticle.png"/><div class="o-blankWord">您还未有积分记录</div></div>')
            $(".mp-pointDetail").after(blank);
            //$("#wrapper").css("height","auto")
        }
    }
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
            getMyPointList();
        }
    });
}