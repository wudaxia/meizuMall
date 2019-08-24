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
    personalFoot();
    $(".loadBox").html(addGetMoreInfo());
    if(token!=null&&token!=undefined&&token!="")
    {
        layer.closeAll();
        getCollectList();
        getMoreover();
    }
    else{
        layer.closeAll();
    }
}
//获取收藏列表
function getCollectList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getCollectGoodsList",getCollectGoodsList_fun);
}
//获取列表
function getCollectGoodsList_fun(res){
    console.log(res);
    var collectGoodsList=res.backData.collectGoodsList;
    var collectDiv="";
    var collectDivImg="";
    if(collectGoodsList!=null&&collectGoodsList!=undefined&&collectGoodsList!=""&&collectGoodsList.length>0)
    {
        $(".cl-productLi").removeClass("cl-productLiLast");
        $.each(collectGoodsList,function(i,li){
            if(i==collectGoodsList.length-1)
            {
                collectDiv+=' <div class="cl-productLi cl-productLiLast"  data-productId="'+li.id+'" onclick="cl_goProudct(this)"> ';
            }
            else{
                collectDiv+=' <div class="cl-productLi" data-productId="'+li.id+'" onclick="cl_goProudct(this)"> ';
            }
            if(li.img_url!=null&&li.img_url!=undefined&&li.img_url!="")
            {
                collectDivImg=imgPath+li.img_url;
            }
            else{
                collectDivImg="../img/p-styleProducts.jpg";
            }
            collectDiv+='<div class="cl-productLiImg"> ' +
                '<img src="'+collectDivImg+'"/> ' +
                '</div> ' +
                '<div class="cl-productLiDetails"> ' +
                '<p class="cl-productLiName">'+li.title+'</p> ' +
                '<p class="cl-productLiStyle">'+li.tags+'</p> ' +
                '<p class="cl-productLiPrice"> ' +
                '<span class="cl-productLiPriceL">¥</span><span class="cl-productLiPriceR">'+li.sell_price+'</span><span class="cl-productLiPriceL2">起</span> ' +
                '<span class="cl-productLiCollect" data-productId="'+li.id+'" onclick="event.cancelBubble = true;cl_active(this)" data-style="0">' +
                '<img src="../img/cl-del.png"  class="cl-productLiCollectImg"/><span class="cl-productLiDelWord">删除</span>' +
                '</span> ' +
                //'<img src="../img/cl-joinCar.png" onclick="event.cancelBubble = true;cl_active(this)" data-style="1" class="cl-productLiJoin"/> ' +
                '</p> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".cl-productUl").append(collectDiv);
        $(".cl-productLiImg img").css("height",$(".cl-productLiImg").width()+"px");
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>collectGoodsList.length)
        {
            over=0;
            GetMoreOver();
            if(pageIndex==1&&collectGoodsList.length ==0)
            {
                //console.log(334);
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                $(".recommend").remove();
                $(".sc-carEdit").remove();
                recommend();
                var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">您还没有收藏过宝贝</div></div>')
                $(".cl-productUl").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        GetMoreOver();
        if(pageIndex==1&&collectGoodsList.length ==0)
        {
            //console.log(334);
            closeGetMore();
            $("#over").addClass("hide");
            $(".o-blank").remove();
            $(".recommend").remove();
            $(".sc-carEdit").remove();
            recommend();
            var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">您还没有收藏过宝贝</div></div>')
            $(".cl-productUl").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}
//前往详情页
function cl_goProudct(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-productId");
}
//操作
function cl_active(btn){
    var style=$(btn).attr("data-style");
    //删除
    var loveData2='{"token":"'+token+'","goods_id":'+$(btn).attr("data-productId")+'}';
    AjaxSubmit("get",JSON.parse(loveData2),basePath+"User/cancelCollectGoods",cancelCollectGoods_fun);
}
function cancelCollectGoods_fun(res){
    pageIndex=1;
    over = 1;
    limited = 999999999999999999;
    $(".cl-productLi").remove();
    getCollectList();
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
            getCollectList();
        }
    });
}