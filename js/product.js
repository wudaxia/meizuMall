var goodsPrice="";
var sku_list="";
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    recommend();
    $(".p-choseStyleTImg").css("height",$(window).width()*0.36+"px");
    //判断路径地址是否携带ID
    var productId="";
    var assembly="";
    if(GetQueryString("assembly")!=null&&GetQueryString("assembly")!=undefined&&GetQueryString("assembly")!="")
    {
        assembly=GetQueryString("assembly");
    }
    else{
        assembly="-1";
    }
    if(GetQueryString("productId")!=null&&GetQueryString("productId")!=undefined&&GetQueryString("productId")!="")
    {
        productId=GetQueryString("productId");
    }
    else
    {
        if(JSON.parse(sessionStorage.getItem("productId"))!=null&&JSON.parse(sessionStorage.getItem("productId"))!=undefined&&JSON.parse(sessionStorage.getItem("productId"))!="")
        {
            productId=JSON.parse(sessionStorage.getItem("productId"));
        }
    }
    if(productId!=null&&productId!=undefined&&productId!="")
    {
        //是否被收藏
        var token=JSON.parse(localStorage.getItem("token"));
        if(token!=null&&token!=undefined&&token!="")
        {
            var loveData='{"token":"'+token+'","goods_id":'+productId+'}';
            AjaxSubmit("get",JSON.parse(loveData),basePath+"User/measurementCollectGoods",measurementCollectGoods_fun);
            //获取商品信息
            var data='{"token":"'+token+'","id":'+productId+',"assembly":"'+assembly+'"}';
            console.log(data);
            AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getGoodsMessage",getGoodsMessage_fun);
        }
        else{
            //获取商品信息
            var data='{"id":'+productId+',"assembly":"'+assembly+'"}';
            AjaxSubmit("get",JSON.parse(data),basePath+"Goods/getGoodsMessage",getGoodsMessage_fun);
        }
        //获取用户收藏列表页
        //var token=JSON.parse(sessionStorage.getItem("token"));
        //var userData='{"token":"'+token+'""}';
        //AjaxSubmit("get",JSON.parse(userData),basePath+"Goods/getGoodsMessage",getGoodsMessage_fun);
    }
    else{
        layer.closeAll();
        openmodal("请至少选择一项商品进行查看");
        setTimeout(function(){
            self.location.href="productList.html";
        },1500);
    }
}
//获取是否被收藏结果
function measurementCollectGoods_fun(res){
    console.log(res);
    var imgDive= $(".p-iLoveImg");
    if(res.backData.results!=null&&res.backData.results!=undefined&&res.backData.results!=""&&res.backData.results=="1")
    {
        imgDive.attr("data-chose","1");
        imgDive.attr("src","../img/p-love2.png");
        $(".p-iLoveWord").text("喜欢").addClass("p-choseWord");
    }
    else{
        imgDive.attr("data-chose","0");
        imgDive.attr("src","../img/p-love.png");
        $(".p-iLoveWord").text("喜欢").removeClass("p-choseWord");
    }
}
//获取商品详情
function getGoodsMessage_fun(res){
    console.log(res);
    //商品信息
    var goodsMessage=res.backData.goodsMessage;
    if(goodsMessage!=null&&goodsMessage!=undefined&&goodsMessage!="")
    {
        $(".p-choseStyleTImg").attr("src",imgPath+goodsMessage.img_url).attr("data-imgUrl",goodsMessage.img_url);
        //商品信息
        $(".p-infoName").text(goodsMessage.title);
        $("title").text(goodsMessage.title);
        $(".p-infoAbstractL").text(goodsMessage.seo_title);
        $(".p-infoAbstractR").text(goodsMessage.tags);
        //微信分享
      
        var url=window.location.href;
        var urlData='{"url":"'+url+'"}';
        AjaxSubmit("get",JSON.parse(urlData),basePath+"WeChat/getJsSdkConfig",getJsSdkConfig_fun);
        function getJsSdkConfig_fun(shares){
            var share=shares.backData.config;
            console.log(share);
            wx.config({
                debug: false,  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打。
                appId:share.appId, // 必填，公众号的唯一标识
                timestamp: share.timestamp, // 必填，生成签名的时间戳
                nonceStr: share.nonceStr, // 必填，生成签名的随机串
                signature: share.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: goodsMessage.title, // 分享标题
                    desc: "", // 分享描述
                    link: "http://mz.lanpai51.com/web/html/product.html?productId="+goodsMessage.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgPath+goodsMessage.img_url, // 分享图标
                    success: function () {
                       openmodal("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }


                });
                wx.onMenuShareAppMessage({
                    title: goodsMessage.title, // 分享标题
                    desc: "", // 分享描述
                    link: "http://mz.lanpai51.com/web/html/product.html?productId="+goodsMessage.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgPath+goodsMessage.img_url, // 分享图标

                    success: function () {
                         openmodal("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQQ({
                    title: goodsMessage.title, // 分享标题
                    desc: "", // 分享描述
                    link: "http://mz.lanpai51.com/web/html/product.html?productId="+goodsMessage.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgPath+goodsMessage.img_url, // 分享图标

                    success: function () {
                        openmodal("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            });
        }



        //轮播图
        var carousel=goodsMessage.carousel;
        var banner1Lis="";
        var banner1LiImg="";
        if(carousel!=null&&carousel!=undefined&&carousel!=""&&carousel.length>0)
        {
            //一张图片
            if(carousel.length==1)
            {
                if(carousel[0].original_path!=null&&carousel[0].original_path!=undefined&&carousel[0].original_path!="")
                {
                    banner1LiImg=imgPath+carousel[0].original_path;
                }
                else{
                    banner1LiImg="../img/product.png";
                }
                banner1Lis='<li> <img class="img_1" src="'+banner1LiImg+'" onclick="img_click(this)"/> </li>';
                $(".p-banner1Ul").append(banner1Lis);
            }
            //多张图片
            else{
                $.each(carousel,function(i,banner1Li){
                    if(banner1Li.original_path!=null&&banner1Li.original_path!=undefined&&banner1Li.original_path!="")
                    {
                        banner1LiImg=imgPath+banner1Li.original_path;
                    }
                    else{
                        banner1LiImg="../img/product.png";
                    }
                    banner1Lis+='<li> <img class="img_'+(i+1)+'" src="'+banner1LiImg+'" onclick="img_click(this)"/> </li>';
                });
                $(".p-banner1Ul").append(banner1Lis);
                banner();
            }
        }
        else{
            banner1Lis='<li> <img class="img_1" src="../img/product.png" onclick="img_click(this)"/> </li>';
            $(".p-banner1Ul").append(banner1Lis);
        }
        $(".p-banner1Ul").find("img")[0].onload =function() {
            $(".p-banner1Ul").css("height",$(".p-banner1Ul").find("li").height()+"px");
        };

        //商品详情
        var content=goodsMessage.content;
        if(content!=null&&content!=undefined&&content!="")
        {
            $(".p-infoSBody").append(content);
            var str=new RegExp("http");
            $(".p-infoSBody").find("img").each(function(){
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
            $(".p-infoS").remove();
        }
    }
    var isParameter=res.backData.isParameter;
    var priceDown=0;
    var marketPrice=0;
    var price=0;
    //市场价
    if(goodsMessage.market_price!=null&&goodsMessage.market_price!=undefined&&goodsMessage.market_price!="")
    {
        $(".p-infoPriceR2").text(goodsMessage.market_price);
        marketPrice=parseInt(goodsMessage.market_price);
    }
    //为1是有规格，-1是没有规格
    $(".p-choseStyleTPriceR").text(goodsMessage.sell_price).attr("data-isParameter",isParameter).attr("data-isActivity",res.backData.isActivity).attr("productId",goodsMessage.id).attr("productName",goodsMessage.title);
    $(".p-infoPriceR").text(goodsMessage.sell_price);
    price=goodsMessage.sell_price;
    //是否活动商品
    var isActivity=res.backData.isActivity;
    var assemblyData=res.backData.assemblyData;
    if(isActivity=="1")
    {
        //有规格
        sku_list=res.backData.goodsPrice;
        var goodsParameter=res.backData.goodsParameter;
        if(isParameter!=null&&isParameter!=undefined&&isParameter!=""&&isParameter=="1")
        {
            //是否限时抢购页面过来
            if(assemblyData!=null&&assemblyData!=undefined&&assemblyData!="")
            {
                if(res.backData.imgUrl!=null&&res.backData.imgUrl!=undefined&&res.backData.imgUrl!="")
                {
                    $(".p-choseStyleTImg").attr("src",imgPath+res.backData.imgUrl).attr("data-imgUrl",res.backData.imgUrl);
                }
                //抢购价
                if(assemblyData.kill_price!=null&&assemblyData.kill_price!=undefined&&assemblyData.kill_price!="")
                {
                    $(".p-infoPriceR").text(assemblyData.kill_price);
                    price=assemblyData.kill_price;
                    $(".p-choseStyleTPriceR").text(assemblyData.kill_price);
                }
                //标题
                if(assemblyData.assembly_info!=null&&assemblyData.assembly_info!=undefined&&assemblyData.assembly_info!="")
                {
                    $(".p-infoChoseStyle").text(assemblyData.assembly_info);
                    $(".p-infoName").text(goodsMessage.title+" "+assemblyData.assembly_info);
                    $(".p-choseStyleTName").text(goodsMessage.title+" "+assemblyData.assembly_info);
                    var noChoseStyle='<div class="p-choseStyleColor"> ' +
                        '<div class="p-choseStyleColorT">限时抢购</div> ' +
                        '<div class="p-choseStyleColorB"> ' +
                        '<span class="p-styleColor p-styleColorChose">'+assemblyData.assembly_info+'</span> ' +
                        '</div> ' +
                        '</div>';
                    $(".p-choseStyleColors").append(noChoseStyle);
                    $(".p-choseStyleTPriceR").attr("data-priceStyle",assemblyData.assembly);
                    $(".p-choseStyleTPriceR").attr("data-priceStyleName",assemblyData.assembly_info);
                }
                //市场价格
                if(assemblyData.market_price!=null&&assemblyData.market_price!=undefined&&assemblyData.market_price!="")
                {
                    marketPrice=parseInt(assemblyData.market_price);
                    $(".p-infoPriceR2").text(assemblyData.market_price);
                }
                $(".p-joinCar").remove();
                $(".p-choseJoinCar").remove();
                $(".p-infoNameL").removeClass("disn");
            }
            //不是
            else{
                var choseStyleLis="";
                $.each(goodsParameter,function(i,goodsParameterLi){
                    choseStyleLis+='<div class="p-choseStyleColor"  data-parentId="'+(i+1)+'"> ' +
                        '<div class="p-choseStyleColorT">'+goodsParameterLi.type+'</div> ' +
                        '<div class="p-choseStyleColorB"> ';
                    //判断第一种第二种
                    if(i==0)
                    {
                        $.each(goodsParameterLi.parameterList,function(j,styleColorSpan){
                            if(j==0)
                            {
                                if(styleColorSpan.img_url!=null&&styleColorSpan.img_url!=undefined&&styleColorSpan.img_url!="")
                                {
                                    choseStyleLis+= '<span data-first="1" data-imgUrl="'+styleColorSpan.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"   val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                                }
                                else{
                                    console.log(goodsMessage.img_url);
                                    choseStyleLis+= '<span data-first="1" data-imgUrl="'+goodsMessage.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"   val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                                }
                            }
                            else{
                                if(styleColorSpan.img_url!=null&&styleColorSpan.img_url!=undefined&&styleColorSpan.img_url!="")
                                {
                                    choseStyleLis+= '<span data-first="1" data-imgUrl="'+styleColorSpan.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                                }
                                else{
                                    choseStyleLis+= '<span data-first="1" data-imgUrl="'+goodsMessage.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                                }
                            }
                        });
                    }
                    else{
                        $.each(goodsParameterLi.parameterList,function(j,styleColorSpan){
                            if(j==0)
                            {
                                choseStyleLis+= '<span class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                            }
                            else{
                                choseStyleLis+= '<span class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                            }
                        });
                    }
                    choseStyleLis+= '</div> ' +
                        '</div>';
                });
                $(".p-choseStyleColors").append(choseStyleLis);
                //选择的分类
                $('.p-choseStyleColors .p-styleColor').click(function(){
                    if($(this).hasClass('p-styleColorNoChose')){
                        return ;//被锁定了
                    }
                    if($(this).hasClass('p-styleColorChose')){
                        $(this).stop().removeClass('p-styleColorChose');
                        $(".p-choseStyleTPriceR").stop().removeAttr("data-priceStyle");
                        $(".p-choseStyleTImg").stop().attr("src",imgPath+goodsMessage.img_url).attr("data-imgUrl",goodsMessage.img_url);
                        $(".p-joinCar").stop().removeClass("disn");
                        $(".p-choseJoinCar").stop().removeClass("disn");
                        $(".p-infoNameL").stop().addClass("disn");
                        $(".p-choseStyleTName").stop().text(goodsMessage.title);
                        $(".p-infoPriceR").stop().text(goodsMessage.sell_price);
                        $(".p-infoAbstractL").text(goodsMessage.seo_title);
                        $(".p-infoAbstractR").text(goodsMessage.tags);
                    }else{
                        $(this).siblings().removeClass('p-styleColorChose');
                        $(this).stop().addClass('p-styleColorChose');
                        if($(this).attr("data-first")=="1")
                        {
                            if($(this).attr("data-imgUrl")!=null&&$(this).attr("data-imgUrl")!=undefined&&$(this).attr("data-imgUrl")!="")
                            {
                                $(".p-choseStyleTImg").attr("src",imgPath+$(this).attr("data-imgUrl")).attr("data-imgUrl",$(this).attr("data-imgUrl"));
                            }
                        }
                    }
                    var select_ids=_getSelAttrId();
                    chosePrice(select_ids);
                    //已经选择了的规格
                    var $_sel_goods_attr=$('.p-styleColorChose').parents('.p-choseStyleColor');
                    // step 1
                    var all_ids=filterAttrs(select_ids);
                    //获取未选择的
                    var $other_notsel_attr=$('.p-choseStyleColor').not($_sel_goods_attr);

                    //设置为选择属性中的不可选节点
                    $other_notsel_attr.each(function(){
                        set_block($(this),all_ids);

                    });
                    //step 2
                    //设置已选节点的同级节点是否可选
                    $_sel_goods_attr.each(function(){
                        update_2($(this));
                    });
                });
            }
        }
        //没有规格
        else{
            $(".p-infoPriceR").text(goodsMessage.activity_price);
            $(".p-choseStyleTPriceR").text(goodsMessage.activity_price);
            price=goodsMessage.activity_price;
            $(".p-infoChoseStyle").text(goodsMessage.title);
            $(".p-choseStyleTName").text(goodsMessage.title);
            var noChoseStyle='<div class="p-choseStyleColor"> ' +
                '<div class="p-choseStyleColorT">限时抢购</div> ' +
                '<div class="p-choseStyleColorB"> ' +
                '<span class="p-styleColor p-styleColorChose">'+goodsMessage.title+'</span> ' +
                '</div> ' +
                '</div>';
            $(".p-choseStyleColors").append(noChoseStyle);
            $(".p-choseStyleTPriceR").attr("data-priceStyle","-1");
            $(".p-choseStyleTPriceR").attr("data-priceStyleName",goodsMessage.title);
            $(".p-joinCar").remove();
            $(".p-infoNameL").removeClass("disn");
            $(".p-choseJoinCar").remove();
        }
    }
    else{
        //有无规格
        if(res.backData.goodsPrice!=null&&res.backData.goodsPrice!=undefined&&res.backData.goodsPrice!=""&&res.backData.goodsPrice.length>0)
        {
            //有规格
            var goodsParameter=res.backData.goodsParameter;
            //价格
            sku_list=res.backData.goodsPrice;
            price=parseInt(goodsMessage.sell_price);
            var choseStyleLis="";
            //sku_list=goodsParameter;
            $.each(goodsParameter,function(i,goodsParameterLi){
                choseStyleLis+='<div class="p-choseStyleColor"  data-parentId="'+(i+1)+'"> ' +
                    '<div class="p-choseStyleColorT">'+goodsParameterLi.type+'</div> ' +
                    '<div class="p-choseStyleColorB"> ';
                //判断第一种第二种
                if(i==0)
                {
                    $.each(goodsParameterLi.parameterList,function(j,styleColorSpan){
                        if(j==0)
                        {
                            if(styleColorSpan.img_url!=null&&styleColorSpan.img_url!=undefined&&styleColorSpan.img_url!="")
                            {
                                choseStyleLis+= '<span data-first="1" data-imgUrl="'+styleColorSpan.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"   val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                            }
                            else{
                                console.log(goodsMessage.img_url);
                                choseStyleLis+= '<span data-first="1" data-imgUrl="'+goodsMessage.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"   val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                            }
                        }
                        else{
                            if(styleColorSpan.img_url!=null&&styleColorSpan.img_url!=undefined&&styleColorSpan.img_url!="")
                            {
                                choseStyleLis+= '<span data-first="1" data-imgUrl="'+styleColorSpan.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                            }
                            else{
                                choseStyleLis+= '<span data-first="1" data-imgUrl="'+goodsMessage.img_url+'" class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                            }
                        }
                    });
                }
                else{
                    $.each(goodsParameterLi.parameterList,function(j,styleColorSpan){
                        if(j==0)
                        {
                            choseStyleLis+= '<span class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                        }
                        else{
                            choseStyleLis+= '<span class="p-styleColor" data-parentId="'+(i+1)+'"  val="'+styleColorSpan.id+'">'+styleColorSpan.name+'</span> ';
                        }
                    });
                }
                choseStyleLis+= '</div> ' +
                    '</div>';
            });
            $(".p-choseStyleColors").append(choseStyleLis);
            //选择的分类
            $('.p-choseStyleColors .p-styleColor').click(function(){
                if($(this).hasClass('p-styleColorNoChose')){
                    return ;//被锁定了
                }
                if($(this).hasClass('p-styleColorChose')){
                    $(this).stop().removeClass('p-styleColorChose');
                    $(".p-choseStyleTPriceR").stop().removeAttr("data-priceStyle");
                    $(".p-choseStyleTImg").stop().attr("src",imgPath+goodsMessage.img_url).attr("data-imgUrl",goodsMessage.img_url);
                }else{
                    $(this).siblings().stop().removeClass('p-styleColorChose');
                    $(this).stop().addClass('p-styleColorChose');
                    if($(this).attr("data-first")=="1")
                    {
                        if($(this).attr("data-imgUrl")!=null&&$(this).attr("data-imgUrl")!=undefined&&$(this).attr("data-imgUrl")!="")
                        {
                            $(".p-choseStyleTImg").attr("src",imgPath+$(this).attr("data-imgUrl")).attr("data-imgUrl",$(this).attr("data-imgUrl"));
                        }
                    }
                }
                var select_ids=_getSelAttrId();
                chosePrice(select_ids);
                //已经选择了的规格
                var $_sel_goods_attr=$('.p-styleColorChose').parents('.p-choseStyleColor');
                // step 1
                var all_ids=filterAttrs(select_ids);
                //获取未选择的
                var $other_notsel_attr=$('.p-choseStyleColor').not($_sel_goods_attr);

                //设置为选择属性中的不可选节点
                $other_notsel_attr.each(function(){
                    set_block($(this),all_ids);

                });
                //step 2
                //设置已选节点的同级节点是否可选
                $_sel_goods_attr.each(function(){
                    update_2($(this));
                });
            });
        }
        else{
            //没有规格
            $(".p-infoChoseStyle").text(goodsMessage.title);
            $(".p-infoPriceR").text(goodsMessage.sell_price);
            var noChoseStyle='<div class="p-choseStyleColor"> ' +
                '<div class="p-choseStyleColorT">单一规格</div> ' +
                '<div class="p-choseStyleColorB"> ' +
                '<span class="p-styleColor p-styleColorChose">'+goodsMessage.title+'</span> ' +
                '</div> ' +
                '</div>';
            $(".p-choseStyleColors").append(noChoseStyle);
            $(".p-choseStyleTPriceR").attr("data-priceStyle","-1").text(goodsMessage.sell_price);
            $(".p-choseStyleTPriceR").attr("data-priceStyleName",goodsMessage.title);
            $(".p-choseStyleTName").text(goodsMessage.title);
            price=parseInt(goodsMessage.sell_price);
        }
    }
    //判断减了多少钱
    priceDown=marketPrice-price;
    if(priceDown>0)
    {
        $(".p-infoPriceDown").text("直降"+priceDown+"元");
    }
    else{
        $(".p-infoPriceDown").remove();
        //$(".p-infoPriceDel").remove();
    }
    layer.closeAll();
}
function p_joinCar(btn){
    var imgDive= $(".p-shopImg");
    if(imgDive.attr("data-chose")=="0")
    {
        imgDive.attr("data-chose","1");
        imgDive.attr("src","../img/p-shop2.png");
    }
    else{
        imgDive.attr("data-chose","0");
        imgDive.attr("src","../img/p-shop.png");
    }
}
//打开选择商品分类
function p_chose(btn){
    $(".p-choseStyle").fadeIn(500);
    $(".p-choseStyle").removeClass("disn");
    $(".p-choseStyles").removeClass("disn");
    $(".footer").addClass("disn");
    $(".body").height($(window).height());
    $(".body").addClass("bodyClose");
    $(".p-choseStyles").height($(window).height());
    $(".p-choseStyles").addClass("p-choseStyleOpen");
}
//关闭选择商品类别
function p_choseClose(btn){
    $(".p-choseStyle").addClass("disn");
    $(".footer").removeClass("disn");
    $(".body").removeClass("bodyClose");
    $(".body").removeAttr("style");
    $(".p-choseStyles").addClass("disn");
    $(".p-choseStyles").removeAttr("style");
    $(".p-choseStyles").removeClass("p-choseStyleOpen");
}
//选择商品数量
function p_choseNum(btn){
    var productNum=$(btn).siblings("input").val();
    //减法
    if($(btn).attr("data-name")=="0")
    {
        if(parseInt(productNum)>1)
        {
            $(btn).siblings("input").val(parseInt($(btn).siblings("input").val())-1);
        }
        else{
            $(btn).siblings("input").val(1);
        }
    }
    //加法
    else if($(btn).attr("data-name")=="1")
    {
        if(parseInt(productNum)>=1)
        {
            $(btn).siblings("input").val(parseInt($(btn).siblings("input").val())+1);
        }
        else{
            $(btn).siblings("input").val(1);
        }
    }

}
//选择商品属性规格:从这开始
function filterProduct(ids){
    var result=[];
    $(sku_list).each(function(k,v){
        var _attr='_'+v['assembly']+'_';
        //console.log(_attr+"this");
        var _all_ids_in=true;
        for( k in ids){
            if(_attr.indexOf('_'+ids[k]+'_')==-1){
                _all_ids_in=false;
                break;
            }
        }
        if(_all_ids_in){
            result.push(v);
        }

    });
    return result;
}
//获取 经过已选节点 所有线路上的全部节点
// 根据已经选择得属性值，得到余下还能选择的属性值
function filterAttrs(ids){
    var products=filterProduct(ids);
    //console.log(products);
    var result=[];
    var lastPrice="";
    $(products).each(function(k,v){
        result=result.concat(v['assembly'].split('_'));
        lastPrice=v['assembly'];
    });
    return result;
}
//已选择的节点数组
function _getSelAttrId(){

    var list=[];
    $('.p-choseStyleColor .p-styleColorChose').each(function(){
        list.push($(this).attr('val'));
    });
    return list;
}
function update_2($goods_attr){
    // 若该属性值 $li 是未选中状态的话，设置同级的其他属性是否可选
    var select_ids=_getSelAttrId();
    var $li=$goods_attr.find('span.p-styleColorChose');

    var select_ids2=del_array_val(select_ids,$li.attr('val'));
    //console.log(select_ids2);
    var all_ids=filterAttrs(select_ids2);

    set_block($goods_attr,all_ids);
}
function set_block($goods_attr,all_ids){

//根据 $goods_attr下的所有节点是否在可选节点中（all_ids） 来设置可选状态
    $goods_attr.find('.p-styleColor').each(function(k2,li2){

        if($.inArray($(li2).attr('val'),all_ids)==-1){
            $(li2).addClass('p-styleColorNoChose');
        }else{
            $(li2).removeClass('p-styleColorNoChose');
        }

    });

}
function del_array_val(arr,val){
//去除 数组 arr中的 val ，返回一个新数组
    var a=[];
    for(var k in arr){
        if(arr[k]!=val){
            a.push(arr[k]);
        }
    }
    return a;
}
//选择后的价格
function sortNumber(a,b){
    return a - b
}
function chosePrice(price){
    var price2=price.sort(sortNumber);
    var prices=price2.join("_");
    console.log(prices);
    $.each(sku_list,function(j,chosePriceF){
        //console.log(chosePriceF.assembly)
        //console.log(chosePriceF.assembly==prices);
        var sortNum=chosePriceF.assembly.split("_").sort(sortNumber);
        var sortNum1=sortNum.join("_");
        if(sortNum1==prices)
        {
            //限时秒杀
            if(chosePriceF.is_kill=="1")
            {
                $(".p-infoNameL").removeClass("disn");
                $(".p-choseStyleTPriceR").text(chosePriceF.kill_price).attr("data-priceStyle",chosePriceF.assembly).attr("data-priceStyleName",chosePriceF.assembly_info);
                $(".p-infoPriceR").text(chosePriceF.kill_price);
                $(".p-joinCar").addClass("disn");
                $(".p-choseJoinCar").addClass("disn");
                $(".p-choseStyleTName").text("[限时抢购]"+chosePriceF.assembly_info+"×1");
                $(".p-infoAbstractL").text(chosePriceF.assembly_info);
                $(".p-infoAbstractR").text("");
            }
            else{
                $(".p-choseStyleTPriceR").text(chosePriceF.price).attr("data-priceStyle",chosePriceF.assembly).attr("data-priceStyleName",chosePriceF.assembly_info);
                $(".p-infoPriceR").text(chosePriceF.price);
                $(".p-joinCar").removeClass("disn");
                $(".p-choseJoinCar").removeClass("disn");
                $(".p-infoNameL").addClass("disn");
                $(".p-choseStyleTName").text(chosePriceF.assembly_info+"×1");
                $(".p-infoAbstractL").text(chosePriceF.assembly_info);
                $(".p-infoAbstractR").text("");
            }
            $(".p-infoChoseStyle").text(chosePriceF.assembly_info);
           var  priceDown=$(".p-infoPriceR2").text()-$(".p-infoPriceR").text();
            if(priceDown>0)
            {
                $(".p-infoPriceDown").text("直降"+priceDown+"元");
            }
            else{
                $(".p-infoPriceDown").remove();
                $(".p-infoPriceDel").remove();
            }
        }
    })
}
//到这结束


//立即购买，跳转到订单确认页
function clickNow(btn){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var priceDiv=$(".p-choseStyleTPriceR");
    var priceStyle=priceDiv.attr("data-priceStyle");
    var productId=priceDiv.attr("productId");
    var productNum=$(".p-choseStyleNum").val();
    var priceStyleName=priceDiv.attr("data-priceStyleName");
    var productName=priceDiv.attr("productName");
    var token=JSON.parse(localStorage.getItem("token"));
    var productImg=$(".p-choseStyleTImg").attr("data-imgUrl");
    var productPrice=priceDiv.text();
    var dataInfo='{"productPrice":"'+productPrice+'","produtStyle":"0","productImg":"'+productImg+'","priceStyle":"'+priceStyle+'","productId":'+productId+',"productNum":'+productNum+',"priceStyleName":"'+priceStyleName+'","productName":"'+productName+'"}';
    console.log(dataInfo);
   if(token!=null&&token!=undefined&&token!="")
    {
        //加入购物车
        if($(btn).attr("data-style")=="2")
        {
            if(priceDiv.attr("data-priceStyle")!=""&&priceDiv.attr("data-priceStyle")!=undefined&&priceDiv.attr("data-priceStyle")!=null)
            {
                var carData='{"token":"'+token+'","goods_id":'+productId+',"num":'+productNum+',"specification":"'+priceStyle+'","img_url":"'+productImg+'"}';

                AjaxSubmit("get",JSON.parse(carData),basePath+"User/addCartInfo",addCartInfo_fun)
            }
            else{
                layer.closeAll();
                $(".p-infoChose").trigger("click");
            }
        }
        //喜欢&收藏
        else if($(btn).attr("data-style")=="0")
        {
            var imgDive= $(".p-iLoveImg");
            var loveData='{"token":"'+token+'","goods_id":'+productId+'}';
            if(imgDive.attr("data-chose")=="0")
            {
                AjaxSubmit("get",JSON.parse(loveData),basePath+"User/addCollectGoods",addCollectGoods_fun);
            }
            else{
                AjaxSubmit("get",JSON.parse(loveData),basePath+"User/cancelCollectGoods",cancelCollectGoods_fun);
            }
        }
        //立即购买
        else if($(btn).attr("data-style")=="1")
        {
            if(priceDiv.attr("data-priceStyle")!=""&&priceDiv.attr("data-priceStyle")!=undefined&&priceDiv.attr("data-priceStyle")!=null)
            {
                layer.closeAll();
                sessionStorage.setItem("productInfo",dataInfo);
                self.location.href="orderConfirmation.html";
            }
            else{
                layer.closeAll();
                $(".p-infoChose").trigger("click");
            }
        }
    }
    else{
        wxBack();
}
}

//加入购物车
function addCartInfo_fun(res){
    console.log(res);
    openmodal("亲,加入购物车成功！~~");
    layer.closeAll();
}
//加入收藏
function addCollectGoods_fun(res){
    console.log(res);
    var imgDive= $(".p-iLoveImg");
    imgDive.attr("data-chose","1");
    imgDive.attr("src","../img/p-love2.png");
    $(".p-iLoveWord").text("喜欢").addClass("p-choseWord");
    imgDive.attr("collectId",res.backData.collect_id);
    layer.closeAll();
}
//取消收藏
function cancelCollectGoods_fun(res){
    var imgDive= $(".p-iLoveImg");
    imgDive.attr("data-chose","0");
    imgDive.attr("src","../img/p-love.png");
    $(".p-iLoveWord").text("喜欢").removeClass("p-choseWord");
    layer.closeAll();
}