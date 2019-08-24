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
    $(".loadBox").html(addGetMoreInfo());
    personalFoot();
    if(token!=null&&token!=undefined&&token!="")
    {
        layer.closeAll();
        myFootList();
        getMoreover();
    }
    else{
        layer.closeAll();
    }
}
//获得我的足迹列表
function myFootList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getFootprintGoodsList",getFootprintGoodsList_fun);
}
//获得我的足迹列表结果
function getFootprintGoodsList_fun(res){
    console.log(res);
    var myFootLis="";
    var myFootLisImg="";
    var FootprintGoodsList=res.backData.FootprintGoodsList;
    if(FootprintGoodsList!=null&&FootprintGoodsList!=undefined&&FootprintGoodsList!=""&&FootprintGoodsList.length>0)
    {
        $.each(FootprintGoodsList,function(i,myFootLi){
            myFootLis+=' <div class="cl-productLi" onclick="mf_goProduct(this)" data-productId="'+myFootLi.goods_id+'"> ' +
                '<div class="cl-productLiImg"> ';
            if(myFootLi.img_url!=null&&myFootLi.img_url!=undefined&&myFootLi.img_url!="")
            {
                myFootLisImg=imgPath+myFootLi.img_url;
            }
            else{
                myFootLisImg="../img/p-styleProducts.jpg";
            }
                myFootLis+=  '<img src="'+myFootLisImg+'"/> ' +
                '</div> ' +
                '<div class="cl-productLiDetails"> ' +
                '<p class="cl-productLiName">'+myFootLi.title+'</p> ' +
                '<p class="cl-productLiStyle">'+myFootLi.tags+'</p> ' +
                '<p class="cl-productLiPrice"> ' +
                '<span class="cl-productLiPriceL">¥</span><span class="cl-productLiPriceR">'+myFootLi.sell_price+'</span><span class="cl-productLiPriceL">起</span> ' +
                '<span class="cl-productLiCollects" data-style="1" onclick="event.cancelBubble = true;mf_del(this)" data-id="'+myFootLi.id+'"><img src="../img/mf-del.png" class="cl-productLiCollect"/>删除</span> ' +
                '<!--<img src="../img/cl-joinCar.png" class="cl-productLiJoin"/>--> ' +
                '</p> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".my-productUl").append(myFootLis);
        $(".cl-productLiImg img").css("height",$(".cl-productLiImg").width()+"px");
        limited = document.body.scrollHeight -100;
        closeGetMore();
        if(pageCount>FootprintGoodsList.length)
        {
            over=0;
            GetMoreOver();
            if(pageIndex==1&&FootprintGoodsList.length ==0)
            {
                //console.log(334);
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                $(".recommend").remove();
                $(".sc-carEdit").remove();
                recommend();
                var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">您还未浏览过任何商品</div></div>')
                $(".my-productUl").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        GetMoreOver();
        if(pageIndex==1&&FootprintGoodsList.length ==0)
        {
            //console.log(334);
            closeGetMore();
            $("#over").addClass("hide");
            $(".o-blank").remove();
            $(".recommend").remove();
            $(".sc-carEdit").remove();
            recommend();
            var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">您还未浏览过任何商品</div></div>')
            $(".my-productUl").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}
//清空记录
function mf_del(btn){
    var style=$(btn).attr("data-style");
    var delInfo="";
    //删除全部
    if(style=="0")
    {
       $(".cl-productLi").each(function(){
           if(delInfo==""||delInfo==undefined||delInfo==null)
           {
               delInfo+= $(this).find(".cl-productLiCollects").attr("data-id");
           }
           else{
               delInfo+="_"+$(this).find(".cl-productLiCollects").attr("data-id");
           }
       })
    }
    //删除一个
    else if(style=="1")
    {
        var myfootId=$(btn).attr("data-id");
        delInfo=myfootId;
    }
    var data='{"token":"'+token+'","id":"'+delInfo+'"}';
    AjaxSubmit("get",JSON.parse(data),basePath+"User/cancelFootprintGoods",cancelFootprintGoods_fun);
}
//删除结果
function cancelFootprintGoods_fun(res){
    pageIndex=1;
    over = 1;
    limited = 999999999999999999;
    $(".cl-productLi").remove();
    myFootList();
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
            myFootList();
        }
    });
}
//前往详情页
function mf_goProduct(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-productId");
}