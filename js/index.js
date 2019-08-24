//初始化加载
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    //加载底部
    indexFoot();
    //$(".main_image").css("height",$(window).width()*0.51);
    //获取首页相关信息（轮播,早报等）
    AjaxSubmit2("get",basePath+"Goods/getIndexMessage",getIndexMessage_fun);
}
//搜索
//function search(){
//    var text=$(".i-searchInput").val();
//    sessionStorage.setItem("searchVal",JSON.stringify(text));
//    $(".i-searchInput").val("").attr("placeholder","搜索产品");
//    self.location.href="search.html";
//}
function getIndexMessage_fun(res){
    console.log(res);
    if(res.backData!=null&&res.backData!=undefined&&res.backData!="")
    {
        //底部官方服务
        var bottomArticleList=res.backData.bottomArticleList;
        if(bottomArticleList!=null&&bottomArticleList!=undefined&&bottomArticleList!="")
        {
            if(bottomArticleList.img_url!=null&&bottomArticleList.img_url!=undefined&&bottomArticleList.img_url!="")
            {
                $(".i-serviceTImg").attr("src",imgPath+bottomArticleList.img_url);
            }
            else{
                $(".i-serviceTImg").attr("src","i-serviceTImg");
            }
            if(bottomArticleList!=null&&bottomArticleList!=undefined&&bottomArticleList!="")
            {
                $(".i-serviceTWord").text(bottomArticleList.title);
            }
            else{
                $(".i-serviceTWord").text("官方品质服务");
            }
            //服务种类
            var bottimAl=bottomArticleList.articleList;
            var serviceBLis="";
            if(bottimAl!=null&&bottimAl!=undefined&&bottimAl!=""&&bottimAl.length>0)
            {
                $.each(bottimAl,function(bal,serviceBLi){
                    serviceBLis+=' <li> ';
                    var serviceBLiImg="";
                    if(serviceBLi.img_url!=null&&serviceBLi.img_url!=undefined&&serviceBLi.img_url!="")
                    {
                        serviceBLiImg=imgPath+serviceBLi.img_url;
                    }
                    else{
                        serviceBLiImg="../img/i-sf.png";
                    }
                    serviceBLis+= '<img src="'+serviceBLiImg+'" class="i-serviceBImg1"/> ' +
                        '<span class="i-serviceBName1">'+serviceBLi.title+'</span> ' +
                        '</li>'
                });
                serviceBLis+='<div class="clear"></div>';
                $(".i-serviceBUl").append(serviceBLis);
            }
        }

        //分享
        //微信分享
       // var redirect_urlLength=window.location.href.indexOf("?");
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
                    title: "宁波魅族数码", // 分享标题
                    desc: "魅族微商城", // 分享描述
                    link: "http://mz.lanpai51.com/web/html/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:"http://mz.lanpai51.com/web/img/logoss.png" , // 分享图标
                    success: function () {
                         openmodal("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }


                });
                wx.onMenuShareAppMessage({
                    title: "宁波魅族数码", // 分享标题
                    desc: "魅族微商城", // 分享描述
                    link: "http://mz.lanpai51.com/web/html/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:"http://mz.lanpai51.com/web/img/logoss.png" , // 分享图标
                    success: function () {
                        openmodal("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQQ({
                    title: "宁波魅族数码", // 分享标题
                    desc: "魅族微商城", // 分享描述
                    link: "http://mz.lanpai51.com/web/html/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:"http://mz.lanpai51.com/web/img/logoss.png" , // 分享图标
                    success: function () {
                         openmodal("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            });
        }
        //首页logo
        var indexLogo=res.backData.indexLogo;
        if(indexLogo!=null&&indexLogo!=undefined&&indexLogo!="")
        {
            if(indexLogo.img_url!=null&&indexLogo.img_url!=undefined&&indexLogo.img_url!="")
            {
                $(".i-logo").attr("src",imgPath+indexLogo.img_url)
            }
            else{
                $(".i-logo").attr("src","../img/logo.png");
            }
        }
        else{
            $(".i-logo").attr("src","../img/logo.png");
        }

        //类别商品
        var categoryGoods=res.backData.categoryGoods;
        if(categoryGoods!=null&&categoryGoods!=undefined&&categoryGoods!="")
        {
            var gl=categoryGoods.goodsList;
            var nowProductLis="";
            if(categoryGoods.img_url!=null&&categoryGoods.img_url!=undefined&&categoryGoods.img_url!="")
            {
                $(".i-nowProductImgT").find("img").eq(0).attr("src",imgPath+categoryGoods.img_url);
            }
            else {
                $(".i-nowProductImgT").find("img").eq(0).attr("src","../img/i-productBanner2.png");
            }
            if(gl!=null&&gl!=undefined&&gl!=""&&gl.length>0)
            {
                $.each(gl,function(k,nowProductLi){
                    var nowProductLiImg="";
                    //左边
                    if(k%2==0)
                    {
                       nowProductLis+='<div class="i-nowProductL"> ';

                    }
                    //右边
                    else{
                        nowProductLis+='<div class="i-nowProductL i-nowProductR"> ';
                    }
                    nowProductLis+=  '<div class="i-nowProductLB"> ';
                    if(nowProductLi.img_url!=null&&nowProductLi.img_url!=undefined&&nowProductLi.img_url!="")
                    {
                        nowProductLiImg=imgPath+nowProductLi.img_url;
                    }
                    else{
                        nowProductLiImg="../img/i-nowProduct1.png";
                    }
                    nowProductLis+=  '<img class="i-nowProductImg" src="'+nowProductLiImg+'"/> ' +
                        '<div class="i-nowTitle">'+nowProductLi.title+'</div> ' +
                        '<div class="i-nowAbstract">'+nowProductLi.tags+'</div> ' +
                        '<div class="i-nowProductLF"> ' +
                        '<span class="i-nowPriceTitle">¥</span><span class="i-nowPrice">'+nowProductLi.sell_price+'</span><span class="i-nowPriceTitle">起</span> ' +
                        '<span class="i-nowBuy" data-style="0" data-newId="'+nowProductLi.id+'" onclick="i_goOther(this)">立即购买</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' ;
                });
                nowProductLis+='<div class="clear"></div>';
                $(".i-nowProductImgB").append(nowProductLis);
            }
        }
        //商城早报
        var indexArticleList=res.backData.indexArticleList;
        var shopNewLis="";
        if(indexArticleList!=null&&indexArticleList!=undefined&&indexArticleList!="")
        {
            var shopArticleList=indexArticleList.articleList;
            if(shopArticleList!=null&shopArticleList!=undefined&&shopArticleList!=""&&shopArticleList.length>0)
            {
                $.each(shopArticleList, function (j,shopNewLi) {
                    shopNewLis+=' <li class="i-newsRightLi" onclick="i_goOther(this)" data-style="1" data-newId="'+shopNewLi.id+'">'+shopNewLi.title+'</li> ';
                });
                $(".i-newsRightUl").append(shopNewLis);
            }
            newGoTimer();
        }
        //轮播图
        var indexBannerList=res.backData.indexBannerList;
        //判断是否有轮播图
        var bannerLis="";
        var bannerA="";
        var bannerUrl="";
        if(indexBannerList!=null&&indexBannerList!=undefined&&indexBannerList!=""&&indexBannerList.length>0)
        {
            //判断图片是否为一张
            if(indexBannerList.length==1)
            {
                if(indexBannerList[0].img_url!=null&&indexBannerList[0].img_url!=undefined&&indexBannerList[0].img_url!="")
                {
                    bannerUrl=imgPath+indexBannerList[0].img_url;
                }
                else{
                    bannerUrl="../img/i-banner.png";
                }
                bannerLis+=' <li  onclick="i_goOther(this)" data-style="0" data-newId="'+indexBannerList[0].id+'"><img class="img_1" src="'+bannerUrl+'"/></li>';
                $(".i-banner1As").append(bannerA);
                $(".i-banner1Ul").append(bannerLis);
            }
            //多条
            else{
                $.each(indexBannerList,function(i,bannerLi){
                    if(bannerLi.img_url!=null&&bannerLi.img_url!=undefined&&bannerLi.img_url!="")
                    {
                        bannerUrl=imgPath+bannerLi.img_url;
                    }
                    else{
                        bannerUrl="../img/i-banner.png";
                    }
                    bannerLis+=' <li onclick="i_goOther(this)" data-style="0" data-newId="'+bannerLi.id+'"><img class="img_'+(i+1)+'" src="'+bannerUrl+'"/></li>';
                    bannerA+='<a href="#">'+(i+1)+'</a>';
                });
                $(".i-banner1As").append(bannerA);
                $(".i-banner1Ul").append(bannerLis);
                banner();
            }
        }
        else{
            bannerLis='<li><img class="img_1" src="../img/i-banner.png"/></li>';
            $(".i-banner1As").append(bannerA);
            $(".i-banner1Ul").append(bannerLis);
        }
        $(".i-banner1Ul").find("img")[0].onload =function() {
            $(".i-banner1Ul").css("height",$(".i-banner1Ul").find("li").height()+"px");
        };
        //热卖单品
        var indexHotGoods=res.backData.indexHotGoods;
        if(indexHotGoods!=null&&indexHotGoods!=undefined&&indexHotGoods!=""&&indexHotGoods.length>0)
        {
            var hotSaleBs="";
            $.each(indexHotGoods,function(hot,hotSaleB){
                var hotSaleBImg="";
                if(hot==0)
                {
                    hotSaleBs+='<div class="i-hotSaleB i-hotSaleB1" data-style="0" data-newId="'+hotSaleB.id+'" onclick="i_goOther(this)"> ';
                }
                else if(hot==1)
                {
                    hotSaleBs+='<div class="i-hotSaleB i-hotSaleB2"  data-style="0" data-newId="'+hotSaleB.id+'" onclick="i_goOther(this)"> ';
                }
                else if(hot==2)
                {
                    hotSaleBs+='<div class="i-hotSaleB i-hotSaleB3"  data-style="0" data-newId="'+hotSaleB.id+'" onclick="i_goOther(this)"> ';
                }
                else {
                    hotSaleBs+='<div class="i-hotSaleB"  data-style="0" data-newId="'+hotSaleB.id+'" onclick="i_goOther(this)"> ';
                }
                hotSaleBs+='<div class="i-hotSaleBL fl"> ';
                if(hotSaleB.img_url!=null&&hotSaleB.img_url!=undefined&&hotSaleB.img_url!="")
                {
                    hotSaleBImg=imgPath+hotSaleB.img_url;
                }
                else{
                    hotSaleBImg="../img/i-hotSale.png";
                }
                hotSaleBs+= '<img class="i-hotSaleImg" src="'+hotSaleBImg+'"> ' +
                    '</div> ' +
                    '<div class="i-hotSaleBR fr"> ' +
                    '<div class="i-hotSaleBRName">'+hotSaleB.title+' ' +
                    '</div> ' +
                    '<div class="i-hotSaleBRAbstract">'+hotSaleB.tags+' ' +
                    '</div> ' +
                    '<div class="i-hotSaleBRMoney"> ' +
                    '<span class="i-hotSaleBRMoneyStyle">¥</span> ' +
                    '<span class="i-hotSaleBRPrice">'+hotSaleB.sell_price+'</span> ' +
                    '<span class="i-hotSaleBRMoneyStyle2">起</span> ' +
                    '</div> ' +
                    '<div class="i-hotSaleBuyNows"> ' +
                    '<span class="i-hotSaleBuyNow">立即购买</span> ' +
                    '<!--<img src="../img/i-hotSaleBuy.png" class="i-hotSaleBuyNowsImg"/>--> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div>'
            });
            $(".i-hotSale").append(hotSaleBs);
        }
        //限时活动
        //下一场
        //var nextActivityStart=res.backData.nextActivityStart;
        ////当前场次
        //var isNowActivity=res.backData.isNowActivity;
        //if(nextActivityStart=="-1")
        //{
        //    if(isNowActivity=="1")
        //    {
        //        //当前场
        //        $(".i-limitedSpikeTRSpan").text("抢购中");
        //    }
        //    else{
        //        $(".i-limitedSpikeTRSpan").text("没有下一场");
        //    }
        //}
        //else if(nextActivityStart=="1"){
        //    //当前场
        //    if(isNowActivity=="1")
        //    {
        //        $(".i-limitedSpikeTRSpan").text("抢购中");
        //    }
        //    else{
        //        $(".i-limitedSpikeTRSpan").text("距下一场");
        //    }
        //}
        var nowOrNextActivity=res.backData.nowOrNextActivity;
        if(nowOrNextActivity!=null&&nowOrNextActivity!=undefined&&nowOrNextActivity!="")
        {
            $(".i-limitedSpikes").attr("data-startTime",nowOrNextActivity.activity_start).attr("data-endTime",nowOrNextActivity.activity_end);
        }
        else{
            $(".i-limitedSpikes").attr("data-startTime","0").attr("data-endTime","0");
        }
        //倒计时
        downTime();
        var nowOrNextActivitygGoodsList=res.backData.nowOrNextActivitygGoodsList;
        if(nowOrNextActivitygGoodsList!=null&&nowOrNextActivitygGoodsList!=undefined&&nowOrNextActivitygGoodsList!=""&&nowOrNextActivitygGoodsList.length>0)
        {
            var limitedSpikeBLis="";
            $.each(nowOrNextActivitygGoodsList,function(l,limitedSpikeBLi){
                var limitedSpikeBLiImg="";
                if(l<nowOrNextActivitygGoodsList.length-1)
                {
                    limitedSpikeBLis+='  <li class="i-limitedSpikeBLi fl"> ';
                }
                else{
                    limitedSpikeBLis+='  <li class="i-limitedSpikeBLi i-limitedSpikeBLiLast fl"> ';
                }
                if(limitedSpikeBLi.img_url!=null&&limitedSpikeBLi.img_url!=undefined&&limitedSpikeBLi.img_url!="")
                {
                    limitedSpikeBLiImg=imgPath+limitedSpikeBLi.img_url;
                }
                else{
                    limitedSpikeBLiImg="../img/i-limitedSpikeBLi1.png";
                }
                limitedSpikeBLis+=  '<img class="i-limitedSpikeBLiImg" src="'+limitedSpikeBLiImg+'"/> ';
                if(limitedSpikeBLi.specification_price!=null&&limitedSpikeBLi.specification_price!=undefined&&limitedSpikeBLi.specification_price!="")
                {
                    limitedSpikeBLis+= '<p class="i-limitedSpikeBLiName">'+limitedSpikeBLi.title+limitedSpikeBLi.specification_price.assembly_info+'</p> ';
                }
                else{
                    limitedSpikeBLis+='<p class="i-limitedSpikeBLiName">'+limitedSpikeBLi.title+'</p> ';
                }
                limitedSpikeBLis+=  '<!--<p class="i-limitedSpikeBLiAbstract">新品到货&nbsp;限量抢购</p>--> ' +
                    '<p class="i-limitedSpikeBLiBuy"> ';
                if(limitedSpikeBLi.is_top=="1")
                {
                    limitedSpikeBLis+= '<span class="i-limitedSpikeBLiStyle">新品</span> ';
                }
                if(limitedSpikeBLi.specification_price!=null&&limitedSpikeBLi.specification_price!=undefined&&limitedSpikeBLi.specification_price!="")
                {
                    limitedSpikeBLis+= '<span class="i-limitedSpikeBLiPrice">¥'+limitedSpikeBLi.specification_price.price+'</span> '
                }
                else{
                    limitedSpikeBLis+= '<span class="i-limitedSpikeBLiPrice">¥'+limitedSpikeBLi.kill_price+'</span> '
                }
                limitedSpikeBLis+='</p> ' +
                    '</li>';
            });
            limitedSpikeBLis+="<div class='clear'></div>";
            $(".i-limitedSpikeBUl").append(limitedSpikeBLis);
            //限时秒杀导航条长度
            var width2=0;
            $(".i-limitedSpikeBLi").css("width",$(".i-limitedSpikeB").width()*0.35+"px");
            $(".i-limitedSpikeBLi").each(function(j,li){
                width2+=parseFloat($(this).width())+3.5;
            });
            $(".i-limitedSpikeBUl").css("width",width2+"px");
            $(".i-limitedSpikeBLiImg").css("height", $(".i-limitedSpikeB").width()*0.339+"px");
        }
        else{
            $(".i-limitedSpike").remove();
        }
    }
    layer.closeAll();
}

//新闻滚动效果
var timers;
function newGoTimer(){
    timers=setInterval(newGo,2000);
}
function newGo(){
    var height=$(".i-newsRightLi").height();
    var li=$(".i-newsRightLi")[0];
    $(".i-newsRightLi").eq(0).stop().animate({"margin-top":(-height)+"px"},1000);
    setTimeout( function(){
        $(".i-newsRightLi").stop().removeAttr("style");
        $(".i-newsRightLi").stop().eq(0).remove();
        $(".i-newsRightUl").stop().append(li);
    },1500);
}

//倒计时代码
function downTime(){
    freshTime();
    var sh;
    sh=setInterval('freshTime()',1000);
}
function checktime(i){
    if(i<10){
        i="0"+i;
    }
    else{i=i;}
    return i;
}
function freshTime(){
    var startTime=parseInt($(".i-limitedSpikes").attr("data-startTime"))*1000;
    var endTimes=parseInt($(".i-limitedSpikes").attr("data-endTime"))*1000;
    //console.log(startTime);
    //console.log(endTimes);
    var endtime;
    var nowtime=new Date();
    //抢购中
    if(nowtime>=startTime&&nowtime<=endTimes)
    {
        endtime=endTimes;
        $(".i-limitedSpikeTRSpan").text("剩余时间");
    }
    //抢购前
    else if(nowtime<startTime)
    {
        endtime=startTime;
        $(".fs-productTimeRL").text("距离下一场");
    }
    else {
        //刷新页面
        endtime=0;
    }
    var lefttime=parseInt(endtime-nowtime.getTime());//这是毫秒，如果再/1000就是秒
    //console.log(lefttime);
    // 获取剩下的日、小时、分钟、秒钟
    // 一天有多少毫秒，一小时有多少毫秒，一分钟有多少毫秒，一秒钟有多少毫秒
    var dm=24*60*60*1000;
    //天数
    var d=parseInt(lefttime/dm);
    var hm=60*60*1000;
    //小时
    var h=parseInt((lefttime/hm)%24);
    //分钟
    var mm=60*1000;
    var m=parseInt((lefttime/mm)%60);
    //秒
    var s=parseInt((lefttime/1000)%60);
    m=checktime(m);
    s=checktime(s);
    h=checktime(h);
    //$(".i-downTime").text(h+"小时"+m+"分钟"+s+"秒");
    if (lefttime<0) {
        $(".i-limitedSpikeTRHour1").attr("src","../img/0.png");
        $(".i-limitedSpikeTRHour2").attr("src","../img/0.png");
        $(".i-limitedSpikeTRHour3").attr("src","../img/0_1.png");
        $(".i-limitedSpikeTRHour4").attr("src","../img/0_1.png");
        $(".i-limitedSpikeTRHour5").attr("src","../img/0_2.png");
        $(".i-limitedSpikeTRHour6").attr("src","../img/0_2.png");
    }
    else{
        //$(".i-limitedSpikeTRHour").text(h+":");
        //$(".i-limitedSpikeTRMin").text(m+":");
        //$(".i-limitedSpikeTRSe").text(s);
        var s=new String(s);
        var m=new String(m);
        var h=new String(h);
        $(".i-limitedSpikeTRHour1").attr("src","../img/"+ h.substr(0,1)+".png");
        $(".i-limitedSpikeTRHour2").attr("src","../img/"+ h.substr(1,2)+".png");
        $(".i-limitedSpikeTRHour3").attr("src","../img/"+ m.substr(0,1)+"_1.png");
        $(".i-limitedSpikeTRHour4").attr("src","../img/"+ m.substr(1,2)+"_1.png");
        $(".i-limitedSpikeTRHour5").attr("src","../img/"+ s.substr(0,1)+"_2.png");
        $(".i-limitedSpikeTRHour6").attr("src","../img/"+ s.substr(1,2)+"_2.png");
        //console.log("../img/"+ h.substr(0,1)+".png");
        //console.log( $(".i-limitedSpikeTRHour1").css("width"));
    }
}
//搜索
function i_search(btn){
    self.location.href="searchHot.html";
}
//前往限时秒杀
function goFlash(btn){
    self.location.href="flashSale.html";
}
//购买商品
function i_buyNow(btn){
    self.location.href="product.html";
}

//前往其他页面
function i_goOther(btn){
    var style=$(btn).attr("data-style");
    var id=$(btn).attr("data-newId");
    //跳转到商品详情页
    if(style=="0")
    {
        self.location.href="product.html?productId="+id;
    }
    //跳转到活动详情页
    else if(style=="1")
    {
        self.location.href="activeDetails.html?articleId="+id;
    }
}