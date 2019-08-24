var productStyleId="";
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
    if(GetQueryString("productStyleId")!=null&&GetQueryString("productStyleId")!=undefined&&GetQueryString("productStyleId")!="")
    {
        productStyleId=GetQueryString("productStyleId");
    }
    else
    {
        if(JSON.parse(sessionStorage.getItem("productStyleId"))!=null&&JSON.parse(sessionStorage.getItem("productStyleId"))!=undefined&&JSON.parse(sessionStorage.getItem("productStyleId"))!="")
        {
            productStyleId=JSON.parse(sessionStorage.getItem("productStyleId"));
        }
    }
    if(productStyleId!=null&&productStyleId!=undefined&&productStyleId!="")
    {
        layer.closeAll();
        myFootList();
        getMoreover();
    }
    else{
        layer.closeAll();
        openmodal("请选择一项分类进行查看");
        setTimeout(function(){
            self.location.href="productList.html";
        },1000);
    }
}
//获得二级产品列表
function myFootList(){
    var data='{"id":"'+productStyleId+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    openGetMore();
    var productCount=GetQueryString("productCount");
    if(productCount=="1")
    {
        AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getIntegralCategoryGoodsList",getIntegralCategoryGoodsList_fun);
    }
    else{
        AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getCategoryGoodsList",getCategoryGoodsList_fun);
    }
}
function getIntegralCategoryGoodsList_fun(res){
    console.log(res);
    var myFootLis="";
    var myFootLisImg="";
    var FootprintGoodsList=res.backData.goodsList;
    var category=res.backData.category;
    if(category!=null&&category!=undefined&&category!="")
    {
        $("title").text(category.title);
    }
    else{
        $("title").text("积分商品");
    }
    if(FootprintGoodsList!=null&&FootprintGoodsList!=undefined&&FootprintGoodsList!=""&&FootprintGoodsList.length>0)
    {
        $.each(FootprintGoodsList,function(i,myFootLi){
            myFootLis+=' <div class="cl-productLi" data-style="1" onclick="mf_goProduct(this)" data-productId="'+myFootLi.id+'"> ' +
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
                '<span class="cl-productLiPriceL"></span><span class="cl-productLiPriceR">'+myFootLi.point+'</span><span class="cl-productLiPriceL">积分</span> ' +
                    //'<span class="cl-productLiCollects" data-style="1" onclick="event.cancelBubble = true;mf_del(this)" data-id="'+myFootLi.id+'"><img src="../img/mf-del.png" class="cl-productLiCollect"/>删除</span> ' +
                '<!--<img src="../img/cl-joinCar.png" class="cl-productLiJoin"/>--> ' +
                '</p> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".cl-productUl").append(myFootLis);
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
                var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">抱歉，还未添加商品</div></div>')
                $(".cl-productUl").append(blank);
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
            var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">抱歉，还未添加商品</div></div>')
            $(".cl-productUl").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
}
//获得二级产品列表结果
function getCategoryGoodsList_fun(res){
    console.log(res);
    var myFootLis="";
    var myFootLisImg="";
    var FootprintGoodsList=res.backData.goodsList;
    var category=res.backData.category;
    if(category!=null&&category!=undefined&&category!="")
    {
        $("title").text(category.title);
    }
   else{
        $("title").text("魅族商品");
    }
    if(FootprintGoodsList!=null&&FootprintGoodsList!=undefined&&FootprintGoodsList!=""&&FootprintGoodsList.length>0)
    {
        $.each(FootprintGoodsList,function(i,myFootLi){
            myFootLis+=' <div class="cl-productLi" onclick="mf_goProduct(this)" data-productId="'+myFootLi.id+'"> ' +
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
                //'<span class="cl-productLiCollects" data-style="1" onclick="event.cancelBubble = true;mf_del(this)" data-id="'+myFootLi.id+'"><img src="../img/mf-del.png" class="cl-productLiCollect"/>删除</span> ' +
                '<!--<img src="../img/cl-joinCar.png" class="cl-productLiJoin"/>--> ' +
                '</p> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".cl-productUl").append(myFootLis);
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
                var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">抱歉，还未添加商品</div></div>')
                $(".cl-productUl").append(blank);
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
            var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">抱歉，还未添加商品</div></div>')
            $(".cl-productUl").append(blank);
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
            myFootList();
        }
    });
}
//前往详情页
function mf_goProduct(btn){
    if($(btn).attr("data-style")=="1")
    {
        self.location.href="product2.html?productId="+$(btn).attr("data-productId");
    }
    else{
        self.location.href="product.html?productId="+$(btn).attr("data-productId");
    }
}