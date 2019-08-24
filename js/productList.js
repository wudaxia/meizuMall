function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    styleFoot();
    //获取一级分类商品
    AjaxSubmit2("get",basePath+"Goods/getFirstCategoryList",getFirstCategoryList_fun);
    $(".pl-productStyle").css("height",($(window).height()-52)+"px");
    $(".pl-productShow").css("height",($(window).height()-52)+"px");
    //$(".pl-productShowSort").each(function(){
    //    $(this).attr("data-scrollTop",$(this).position().top);
    //});
    layer.closeAll();
}
//获取一级商品分类
function getFirstCategoryList_fun(res){
    console.log(res);
    var classifyList=res.backData.classifyList;
    if(classifyList!=null&&classifyList!=undefined&&classifyList!=""&&classifyList.length>0)
    {
        var productStyleLis="";
        $.each(classifyList, function (i,productStyleLi){
            if(i==0)
            {
                productStyleLis+=' <li class="pl-productStyleLi pl-productStyleLiChose" onclick="productStyleLi(this)" data-id="'+productStyleLi.id+'">'+productStyleLi.title+'</li>';
            }
            else if(i==classifyList.length-1)
            {
                productStyleLis+=' <li class="pl-productStyleLi" onclick="productStyleLi(this)" data-id="'+productStyleLi.id+'">'+productStyleLi.title+'</li>';
            }
            else{
                productStyleLis+=' <li class="pl-productStyleLi pl-productStyleLiLast" onclick="productStyleLi(this)" data-id="'+productStyleLi.id+'">'+productStyleLi.title+'</li>';
            }
        });
        $(".pl-productStyleUl").append(productStyleLis);
        $(".pl-productStyleLiChose").trigger("click");
    }

}
//点击类别切换事件
function productStyleLi(li){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(li).addClass("pl-productStyleLiChose").siblings(".pl-productStyleLi").removeClass("pl-productStyleLiChose");
    var  scroll=$(".pl-productStyle").scrollTop();
    var hieght=$(".pl-productStyle>ul").height();
    if($(li).offset().top>($(window).height()/2))
    {
        $(".pl-productStyle").stop().animate({
            scrollTop:parseInt(scroll+$(li).offset().top-($(window).height()/2)+($(li).height()))
        },500)
    }
    else{
        $(".pl-productStyle").stop().animate({
            scrollTop:parseInt($(li).height()*parseInt($(li).index())-($(window).height()/2))+($(li).height())
        },500)
    }
    //右边变
    //移除右侧商品
    $(".pl-productShowLi").remove();
    $(".i-banner1Li").remove();
    $("#btn_prev").unbind("click");
    $("#btn_next").unbind("click");
    $(".main_image").unbind("touchend");
    //获取右侧二级及以下分类
    var data='{"id":'+$(li).attr("data-id")+'}';
    AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getCategoryList",getCategoryList_fun);
    //$(".pl-productShowSort").each(function (i,div) {
    //
    //    //if($(div).attr("data-id")==$(li).attr("data-id"))
    //    //{
    //    //    layer.open({
    //    //        type: 2
    //    //        ,content: '加载中',
    //    //        shadeClose: false,
    //    //    });
    //    //    setTimeout(function(){
    //    //        $(div).removeClass("disn").siblings(".pl-productShowSort").addClass("disn");
    //    //        layer.closeAll();
    //    //    },500);
    //    //
    //    //    //$(".pl-productShow").stop().animate({
    //    //    //    scrollTop:parseInt(scroll+$(li).offset().top-($(window).height()/2)+($(li).height()))
    //    //    //},500)
    //    //    //$(".pl-productShow").scrollTop(parseFloat($(div).attr("data-scrollTop"))-15);
    //    //
    //    //    //console.log(parseFloat($(div).attr("data-scrollTop"))-15);
    //    //}
    //})
}
//获得二级及以下分类
function getCategoryList_fun(res){
    console.log(res);
    //轮播图
    var bannerList=res.backData.bannerList;
    var bannerLis="";
    var bannerUrl="";
    if(bannerList!=null&&bannerList!=undefined&&bannerList!=""&&bannerList.length>0)
    {
        //判断图片是否为一张
        if(bannerList.length==1)
        {
            if(bannerList[0].img_url!=null&&bannerList[0].img_url!=undefined&&bannerList[0].img_url!="")
            {
                bannerUrl=imgPath+bannerList[0].img_url;
            }
            else{
                bannerUrl="../img/i-banner.jpg";
            }
            bannerLis+='<li class="i-banner1Li" onclick="pl_goOther(this)" data-style="0" data-newId="'+bannerList[0].id+'"><img class="img_1" src="'+bannerUrl+'"/></li>';
        }
        //多条
        else{
            $.each(bannerList,function(i,bannerLi){
                if(bannerLi.img_url!=null&&bannerLi.img_url!=undefined&&bannerLi.img_url!="")
                {
                    bannerUrl=imgPath+bannerLi.img_url;
                }
                else{
                    bannerUrl="../img/i-banner.png";
                }
                bannerLis+=' <li class="i-banner1Li" onclick="i_goOther(this)" data-style="0" data-newId="'+bannerLi.id+'"><img class="img_'+(i+1)+'" src="'+bannerUrl+'"/></li>';
            });
        }
        $(".i-banner1Ul").append(bannerLis);
        banner();
    }
    else{
        bannerLis='<li class="i-banner1Li"><img class="img_1" src="../img/i-banner.jpg"/></li>';
        $(".i-banner1Ul").append(bannerLis);
    }
    $(".i-banner1Ul").find("img")[0].onload =function() {
        $(".i-banner1Ul").css("height",$(".i-banner1Ul").find("li").height()+"px");
    };
    //产品列表
    var secondClassifyList=res.backData.secondClassifyList;
    var productShowLis="";
    var productShow1LiImg="";
    if(secondClassifyList!=null&&secondClassifyList!=undefined&&secondClassifyList!=""&&secondClassifyList.length>0)
    {
        $.each(secondClassifyList,function(i,productShowLi){
            productShowLis+='<div class="pl-productShowLi"> ' +
                '<div class="pl-productShow1Title"> ' +
                '<span class="pl-productShow1TitleSpan1"></span> ' +
                '<span class="pl-productShow1TitleSpan3">'+productShowLi.title+'</span> ' +
                '<span class="pl-productShow1TitleSpan2"></span> ' +
                '</div> ' +
                '<div> ' +
                '<ul class="pl-productShow1Ul2">';
            //二级分类下的 产品
            var thirdClassify=productShowLi.goodsList;
            var productCount=0;
            if(thirdClassify!=null&&thirdClassify!=undefined&&thirdClassify!=""&&thirdClassify.length>0)
            {
                $.each(thirdClassify,function(j,productShow1Li){
                    if(j%3==2)
                    {
                        if(productShow1Li.is_integral=="1")
                        {
                            productCount++;
                            productShowLis+='<li class="pl-productShow1Li pl-productShow1LiLast" data-productStyle="'+productShow1Li.is_integral+'" data-style="1" data-productId="'+productShow1Li.id+'" onclick="pl_goOther(this)">';
                        }
                        else{
                            productShowLis+='<li class="pl-productShow1Li pl-productShow1LiLast" data-productStyle="0" data-style="1" data-productId="'+productShow1Li.id+'" onclick="pl_goOther(this)">';
                        }
                    }
                    else{
                        if(productShow1Li.is_integral=="1")
                        {
                            productCount++;
                            productShowLis+='<li class="pl-productShow1Li" data-productStyle="'+productShow1Li.is_integral+'" data-style="1" data-productId="'+productShow1Li.id+'" onclick="pl_goOther(this)">';
                        }
                        else{
                            productShowLis+='<li class="pl-productShow1Li" data-productStyle="0" data-style="1" data-productId="'+productShow1Li.id+'" onclick="pl_goOther(this)">';
                        }
                    }
                    //productShowLis+=' <li class="pl-productShow1Li" data-style="1" data-productId="'+productShow1Li.id+'" onclick="pl_goOther(this)"> ';
                    if(productShow1Li.img_url!=null&&productShow1Li.img_url!=undefined&&productShow1Li.img_url!="")
                    {
                        productShow1LiImg=imgPath+productShow1Li.img_url;
                    }
                    else{
                        productShow1LiImg="../img/product.jpg";
                    }
                    productShowLis+='<p><img src="'+productShow1LiImg+'"/></p> ' +
                        '<p class="pl-productShow1LiWord">'+productShow1Li.title+'</p> ' +
                        '</li>';
                });
            }
            productShowLis+='<div class="clear"></div> ' +
                '</ul> ' +
                '</div>';
            if(productShowLi.isMore=="-1")
            {
                productShowLis+='</div>';
            }
            else{
                if(productCount==0)
                {
                    productShowLis+='<div class="pl-more" onclick="pl_goOther(this)" data-productCount="0" data-style="2" data-id="'+productShowLi.id+'">查看更多<img src="../img/right3.png" class="pl-moreImg"/></div> ' +
                        '</div>';
                }
                else{
                    productShowLis+='<div class="pl-more" onclick="pl_goOther(this)" data-productCount="1" data-style="2" data-id="'+productShowLi.id+'">查看更多<img src="../img/right3.png" class="pl-moreImg"/></div> ' +
                        '</div>';
                }
            }
        })
    }
    $(".pl-productShowSort").append(productShowLis);
    layer.closeAll();
}
//前往商品详情页
function pl_goOther(btn){
    var style=$(btn).attr("data-style");
    //轮播图链接
    if(style=="0")
    {

    }
    //三级产品跳转到详情页
    else if(style=="1"){
        if($(btn).attr("data-productStyle")=="1")
        {
            self.location.href="product2.html?productId="+$(btn).attr("data-productId");
        }
        else{
            self.location.href="product.html?productId="+$(btn).attr("data-productId");
        }
    }
    //二级分类查看更多，跳转到列表页
    else if(style=="2"){
        if($(btn).attr("data-productCount")=="0")
        {
            self.location.href="productList2.html?productStyleId="+$(btn).attr("data-id")+"&productCount=0";
        }
        else{
            self.location.href="productList2.html?productStyleId="+$(btn).attr("data-id")+"&productCount=1";
        }
    }
}
function i_goOther(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-newId");
}