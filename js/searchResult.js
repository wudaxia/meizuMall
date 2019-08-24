/**
 * Created by kangli on 2017/9/29.
 */
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
    getMoreover();
    $(".sh-searchInput").on('keydown  input paste', function(event){//IOS选择中文兼容
        if (event.which === 13 || event.which === 40 || event.which == 38){
            event.preventDefault();
            $(".sr-searchResultLi").remove();
            pageIndex=1;
            over = 1;
            limited = 999999999999999999;
            $(".o-blank").remove();
            $(".recommend").remove();
            $(".sh-searchGo").trigger("click");
            $(".i-hSearchInput").blur();
        }
    });
    var searchs=JSON.parse(sessionStorage.getItem("search"));
    if(searchs!=null&&searchs!=undefined&&searchs!="")
    {
        $(".sh-searchInput").val(searchs);
    }
    $(".sh-searchGo").trigger("click");
    sessionStorage.removeItem("search");
    layer.closeAll();
}
//删除搜索内容
function sr_searchDel(btn){
    $(btn).siblings("input").val("");
    $(".sh-searchInput").focus();
}
/*点击筛选按钮*/
function shaiToggle(btn){
    var dataId = $(btn).attr("data-id");

    if( $(".sr-shaiToggleBox").css("display")=="block")
    {
        $(".sr-shaiToggleBox").css("display","none");
        $(".sr-shaiToggleLi").each(function(){
            if($(this).attr("data-style")=="0")
            {
                $(this).removeClass("sr-shaiToggleLiChose");
            }
        });
        if($(".sr-shaiToggle").find(".sr-shaiToggleLiChose").length<=0)
        {
            $(".sr-shaixuan").removeClass("g-blue").removeClass("active").find("img").attr("src","../img/filter.png");
        }
    }
    else{
        //价格
        if(dataId=="2")
        {
            $(btn).addClass("g-blue").addClass("active").siblings(".sr-zonghe").removeClass("active").removeClass("g-blue");
            if($(btn).find(".sr-priceUp").hasClass("sr-priceChose2"))
            {
                $(btn).find(".sr-priceUp").removeClass("sr-priceChose2");
                $(btn).find(".sr-priceDown").addClass("sr-priceChose");
            }
            else if($(btn).find(".sr-priceDown").hasClass("sr-priceChose"))
            {
                $(btn).find(".sr-priceDown").removeClass("sr-priceChose");
                $(btn).find(".sr-priceUp").addClass("sr-priceChose2");
            }
            else{
                $(btn).find(".sr-priceUp").removeClass("sr-priceChose2");
                $(btn).find(".sr-priceDown").addClass("sr-priceChose");
            }
            $(".sr-searchResultLi").remove();
            pageIndex=1;
            over = 1;
            $(".o-blank").remove();
            $(".recommend").remove();
            limited = 999999999999999999;
            $(".sh-searchGo").trigger("click");
        }
        //筛选
        else if(dataId==3)
        {
            $(btn).addClass("g-blue").addClass("active");
            $(btn).find("img").attr("src","../img/filter2.png");
            $(".sr-shaiToggleBox").slideToggle(500);
        }
        //综合
        else if(dataId==1)
        {
            $(btn).addClass("g-blue").addClass("active").siblings(".sr-price").removeClass("active").removeClass("g-blue");
            $(".sr-priceDown").removeClass("sr-priceChose");
            $(".sr-priceUp").removeClass("sr-priceChose2");
            $(".sr-searchResultLi").remove();
            pageIndex=1;
            over = 1;
            $(".o-blank").remove();
            $(".recommend").remove();
            limited = 999999999999999999;
            $(".sh-searchGo").trigger("click");
        }
    }

}
//返回
function sh_goBack(btn){
    self.location.href="index.html";
}
//确定
function sr_result(btn){
    $(".sr-shaiToggle").find(".sr-shaiToggleLi").attr("data-style","0");
    if($(".sr-shaiToggle").find(".sr-shaiToggleLiChose").length>0)
    {
        $(".sr-shaixuan").addClass("g-blue").addClass("active").find("img").attr("src","../img/filter2.png");
        $(".sr-shaiToggle").find(".sr-shaiToggleLiChose").attr("data-style","1");
    }
    else{
        $(".sr-shaixuan").removeClass("g-blue").removeClass("active").find("img").attr("src","../img/filter.png");
    }
    $(".sr-shaiToggleBox ").slideToggle(500);
    $(".sr-searchResultLi").remove();
    pageIndex=1;
    over = 1;
    $(".o-blank").remove();
    $(".recommend").remove();
    limited = 999999999999999999;
    $(".sh-searchGo").trigger("click");
}
//筛选子类别
function sr_shaiToggleLi(btn){
    if($(btn).hasClass("sr-shaiToggleLiChose"))
    {
        $(btn).removeClass("sr-shaiToggleLiChose");
    }
    else{
        $(btn).addClass("sr-shaiToggleLiChose");
    }

}
//搜索结果
function searchProduct(){
    var search=$(".sh-searchInput").val();
    if(search==null||search==undefined||search=="")
    {
        search="手机";
        $(".sh-searchInput").val("手机");
    }
    console.log(search);
    var price=0;
    var style="";
    //查找
    $(".sr-shaixuanBox>ul>li").each(function(i,li){
        if($(li).attr("data-id")!="3"&&$(li).hasClass("active"))
        {
            //综合
            if($(li).attr("data-id")=="1")
            {

            }
            //价格
            else if($(li).attr("data-id")=="2")
            {
                if($(".sr-priceUp").hasClass("sr-priceChose2"))
                {
                    price=2;
                }
                else{
                    price=1;
                }
            }
        }
    })
    $(".sr-shaiToggleLiChose").each(function(i,li){
        if(style==null||style==undefined||style=="")
        {
            style+=$(li).attr("data-id");
        }
        else{
            style+="_"+$(li).attr("data-id");
        }
    })
    var data='{"search":"'+search+'","price":"'+price+'","state":"'+style+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    console.log(data);
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getSearchGoods",getSearchGoods_fun)
}
//获得搜索结果列表
function getSearchGoods_fun(res){
    console.log(res);
    var searchGoods=res.backData.searchGoods;
    var searchDiv="";
    if(searchGoods!=null&&searchGoods!=undefined&&searchGoods!=""&&searchGoods.length>0)
    {
        var searchDivImg="";
        $.each(searchGoods,function(i,searchLi){
            searchDiv+='<li class="sr-searchResultLi" data-productId="'+searchLi.id+'" onclick="sr_goProductDetail(this)"> ' +
            '<div class="sr-searchImg"> ';
            if(searchLi.img_url!=null&&searchLi.img_url!=undefined&&searchLi.img_url!="")
            {
                searchDivImg=imgPath+searchLi.img_url;
            }
            else{
                searchDivImg="../img/p-styleProducts.jpg";
            }
            searchDiv+= '<img src="'+searchDivImg+'"> ' +
            '</div> ' +
            '<div class="sr-searchIntro"> ' +
            '<div class="sr-searchMar"> ' +
            '<div class="sr-searchliT">'+searchLi.title+'</div> ' +
            '<div class="sr-searchInfo"><span class="sr-cuxiao disn"></span>'+searchLi.tags+'</div> ' +
            '<!--<div class="sr-saleLable"><span class="sr-zengLable sr-searchLable">赠</span></div>--> ' +
            '<div class="g-blue"><span class="sr-priceL">¥</span><span class="sr-prices">'+searchLi.price+'</span><span class="sr-priceL">起</span></div></div> ' +
            '</div> ' +
            '<div class="clear"></div> ' +
            '</li>'
        });
        $(".sr-searchResultUl").append(searchDiv);
        limited = document.body.scrollHeight - 105;
        closeGetMore();
        if(pageCount>searchGoods.length)
        {
            over=0;
            GetMoreOver();
            if(pageIndex==1&&searchGoods.length ==0)
            {
                //console.log(334);
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                $(".recommend").remove();
                recommend();
                var blank=$('<div class="o-blank"><img src="../img/blank_03.png"/><div class="o-blankWord">未搜到相关商品</div></div>')
                $(".sr-searchResult").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
        //else{
        //    againList();
        //}
    }
    else{
        if(pageCount>searchGoods.length)
        {
            over=0;
            GetMoreOver();
            if(pageIndex==1&&searchGoods.length ==0)
            {
                //console.log(334);
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                $(".recommend").remove();
                recommend();
                var blank=$('<div class="o-blank"><img src="../img/blank_03.png"/><div class="o-blankWord">未搜到相关商品</div></div>')
                $(".sr-searchResult").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
}

//高度小于页面
//function againList(){
//    var sectionHeight=$(".section").height()+$(".header").height();
//    if (sectionHeight< $(window).height() && over == 1) {
//        limited = 999999999999999999;//无穷大，限制重复滚动
//        pageIndex++;
//        console.log(pageIndex);
//        searchProduct();
//    }
//}
//加载更多
function getMoreover() {
    $(window).scroll(function() {
        var $thisMain = $("body");
        var screenScrollHeight = parseInt($thisMain.scrollTop()) + parseInt(window.screen.availHeight);
        console.log("页面滑动的高度：" + screenScrollHeight + '-' + "屏幕可视区域高度：" + $(document).height());
        console.log( limited);
        if(screenScrollHeight >= limited&&over==1) {
            limited = 999999999999999999;
            pageIndex++;
            searchProduct();
        }
    });
}
//前往详情页
function sr_goProductDetail(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-productId");
}