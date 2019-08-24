//首页底部
function indexFoot(){
    var footer=' <div class="footerNav"> ' +
        '<ul class="footerNavUl"> ' +
        '<li class="footerNavLi" onclick="footerUrl(this)" data-id="0"> ' +
        '<img class="footerNavLiImg" src="../img/f_index2.png"/> ' +
        '<div class="footerNavLiName footerNavLiChose">首页</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="1"> ' +
        '<img class="footerNavLiImg" src="../img/f_style.png"/> ' +
        '<div class="footerNavLiName">分类</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="2"> ' +
        '<img class="footerNavLiImg" src="../img/f_search.png"/> ' +
        '<div class="footerNavLiName">发现</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="3"> ' +
        '<img class="footerNavLiImg" src="../img/f_shop.png"/> ' +
        '<div class="footerNavLiName">购物车</div> ' +
        //'<span class="f-shopNum ">99</span> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="4"> ' +
        '<img class="footerNavLiImg" src="../img/f_my.png"/> ' +
        '<div class="footerNavLiName">我的</div> ' +
        '</li> ' +
        '<div class="clear"></div> ' +
        '</ul> ' +
        '</div>';
    $(".footer").append(footer);
}
//发现底部
function activeFoot(){
    var footer=' <div class="footerNav"> ' +
        '<ul class="footerNavUl"> ' +
        '<li class="footerNavLi" onclick="footerUrl(this)" data-id="0"> ' +
        '<img class="footerNavLiImg" src="../img/f_index.png"/> ' +
        '<div class="footerNavLiName ">首页</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="1"> ' +
        '<img class="footerNavLiImg" src="../img/f_style.png"/> ' +
        '<div class="footerNavLiName">分类</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="2"> ' +
        '<img class="footerNavLiImg" src="../img/f_search2.png"/> ' +
        '<div class="footerNavLiName footerNavLiChose">发现</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="3"> ' +
        '<img class="footerNavLiImg" src="../img/f_shop.png"/> ' +
        '<div class="footerNavLiName">购物车</div> ' +
        //'<span class="f-shopNum">99</span> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="4"> ' +
        '<img class="footerNavLiImg" src="../img/f_my.png"/> ' +
        '<div class="footerNavLiName">我的</div> ' +
        '</li> ' +
        '<div class="clear"></div> ' +
        '</ul> ' +
        '</div>';
    $(".footer").append(footer);
}
//商品分类底部
function styleFoot(){
    var footer=' <div class="footerNav"> ' +
        '<ul class="footerNavUl"> ' +
        '<li class="footerNavLi" onclick="footerUrl(this)" data-id="0"> ' +
        '<img class="footerNavLiImg" src="../img/f_index.png"/> ' +
        '<div class="footerNavLiName ">首页</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="1"> ' +
        '<img class="footerNavLiImg" src="../img/f_style2.png"/> ' +
        '<div class="footerNavLiName footerNavLiChose">分类</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="2"> ' +
        '<img class="footerNavLiImg" src="../img/f_search.png"/> ' +
        '<div class="footerNavLiName ">发现</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="3"> ' +
        '<img class="footerNavLiImg" src="../img/f_shop.png"/> ' +
        '<div class="footerNavLiName">购物车</div> ' +
        //'<span class="f-shopNum">99</span> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="4"> ' +
        '<img class="footerNavLiImg" src="../img/f_my.png"/> ' +
        '<div class="footerNavLiName">我的</div> ' +
        '</li> ' +
        '<div class="clear"></div> ' +
        '</ul> ' +
        '</div>';
    $(".footer").append(footer);
}
//购物车底部
function shopFoot(){
    var footer=' <div class="footerNav"> ' +
        '<ul class="footerNavUl"> ' +
        '<li class="footerNavLi" onclick="footerUrl(this)" data-id="0"> ' +
        '<img class="footerNavLiImg" src="../img/f_index.png"/> ' +
        '<div class="footerNavLiName ">首页</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="1"> ' +
        '<img class="footerNavLiImg" src="../img/f_style.png"/> ' +
        '<div class="footerNavLiName">分类</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="2"> ' +
        '<img class="footerNavLiImg" src="../img/f_search.png"/> ' +
        '<div class="footerNavLiName ">发现</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="3"> ' +
        '<img class="footerNavLiImg" src="../img/f_shop2.png"/> ' +
        '<div class="footerNavLiName footerNavLiChose">购物车</div> ' +
        //'<span class="f-shopNum">99</span> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="4"> ' +
        '<img class="footerNavLiImg" src="../img/f_my.png"/> ' +
        '<div class="footerNavLiName">我的</div> ' +
        '</li> ' +
        '<div class="clear"></div> ' +
        '</ul> ' +
        '</div>';
    $(".footer").append(footer);
}
//个人中心底部
function personalFoot(){
    var footer=' <div class="footerNav"> ' +
        '<ul class="footerNavUl"> ' +
        '<li class="footerNavLi" onclick="footerUrl(this)" data-id="0"> ' +
        '<img class="footerNavLiImg" src="../img/f_index.png"/> ' +
        '<div class="footerNavLiName ">首页</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="1"> ' +
        '<img class="footerNavLiImg" src="../img/f_style.png"/> ' +
        '<div class="footerNavLiName">分类</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="2"> ' +
        '<img class="footerNavLiImg" src="../img/f_search.png"/> ' +
        '<div class="footerNavLiName">发现</div> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="3"> ' +
        '<img class="footerNavLiImg" src="../img/f_shop.png"/> ' +
        '<div class="footerNavLiName">购物车</div> ' +
        //'<span class="f-shopNum ">99</span> ' +
        '</li> ' +
        '<li class="footerNavLi"  onclick="footerUrl(this)" data-id="4"> ' +
        '<img class="footerNavLiImg" src="../img/f_my2.png"/> ' +
        '<div class="footerNavLiName footerNavLiChose">我的</div> ' +
        '</li> ' +
        '<div class="clear"></div> ' +
        '</ul> ' +
        '</div>';
    $(".footer").append(footer);
}
//为你推荐

function recommend(){
    //获取推荐商品
    AjaxSubmit2("get",basePath+"Goods/recommendGoodsList",recommendGoodsList_fun);
}
//获得推荐商品结果
function recommendGoodsList_fun(res){
    console.log(res);
    var goodsList=res.backData.goodsList;
    var recommendDiv="";
    if(goodsList!=null&&goodsList!=undefined&&goodsList!=""&&goodsList.length>0)
    {
        recommendDiv+='<div class="recommend"> ' +
            '<div class="recommendT"> ' +
            '<div class="recommendTH"> ' +
            '<img src="../img/recommend.png" class="recommendTL"/> ' +
            '<span class="recommendTWord">为你推荐</span> ' +
            '<img src="../img/recommend.png" class="recommendTR"/> ' +
            '</div> ' +
            '<div class="recommendTB"> ' +
            '<span class="recommendTBL fl"></span> ' +
            '<span class="recommendTBM fl">实时推荐您的心心念念</span> ' +
            '<span class="recommendTBR fl"></span> ' +
            '<div class="clear"></div> ' +
            '</div> ' +
            '</div> ' +
            '<div class="recommendB"> ';
        $.each(goodsList,function(i,goodsListLi){
            var goodsListLiImg="";
            if(i%2==0)
            {
                recommendDiv+='<div class="recommendLi fl" onclick="goProductDetail(this)" data-productId="'+goodsListLi.id+'">';
            }
            else{
                recommendDiv+='<div class="recommendLi fr" onclick="goProductDetail(this)" data-productId="'+goodsListLi.id+'">';
            }
            if(goodsListLi.img_url!=null&&goodsListLi.img_url!=undefined&&goodsListLi.img_url!="")
            {
                goodsListLiImg=imgPath+goodsListLi.img_url;
            }
            else{
                goodsListLiImg="../img/recommendImg.jpg";
            }
            recommendDiv+=  '<img src="'+goodsListLiImg+'"/> ' +
                '<div class="recommendLis"> ' +
                '<div class="recommendLiName">'+goodsListLi.title+'</div> ' +
                '<div class="recommendLiPrice"> ' +
                '<span class="recommendLiPriceL">¥</span>'+goodsListLi.sell_price+'<span class="recommendLiPriceL2">起</span>' +
                '</div> ' +
                '</div> ' +
                '</div> ';
        });
        recommendDiv+= '<div class="clear"></div> ' +
            '</div> ' +
            '</div>';
    }
    $(".recommends").append(recommendDiv);
    $(".recommendLi img").css("height",$(".recommendLi").width()+"px");
}
//底部链接
function footerUrl(btn){
    //首页
    if($(btn).attr("data-id")=="0")
    {
        self.location.href="index.html";
    }
    //分类
    if($(btn).attr("data-id")=="1")
    {
        self.location.href="productList.html";
    }
    //发现
    if($(btn).attr("data-id")=="2")
    {
        self.location.href="activityList.html";
    }
    //购物车
    if($(btn).attr("data-id")=="3")
    {
        self.location.href="shopCar.html";
    }
    //个人中心
    if($(btn).attr("data-id")=="4")
    {
        self.location.href="personalCenter.html";
    }
}
function goProductDetail(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-productId");
}