var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    personalFoot();
    $(".pc-userImg").css("height",$(".pc-userImg").width()+"px");
    if(token!=null&&token!=undefined&&token!="")
    {
        //获取用户信息
        var data='{"token":"'+token+'"}';
        AjaxSubmit("get",JSON.parse(data),basePath+"User/getUserInfo",getUserInfo_fun);
    }
    //得到公司新闻等
    AjaxSubmit2("get",basePath+"Article/getIndividualArticleMessage",getIndividualArticleMessage_fun);
    //得到商品
    AjaxSubmit2("get",basePath+"Goods/getOneHotSearchGoods",getOneHotSearchGoods_fun);
}
//得到商品
function getOneHotSearchGoods_fun(res){
    console.log(res);
    if(res.backData.hotSearchGoods!=null&&res.backData.hotSearchGoods!=null!=""&&res.backData.hotSearchGoods!=null!=undefined)
    {
        $(".pc-middleImg").attr("src",imgPath+res.backData.hotSearchGoods.img_url).attr("data-productId",res.backData.hotSearchGoods.id);
    }
    else{
        $(".pc-middleImg").remove();
    }
}
//获得文章信息
function getIndividualArticleMessage_fun(res){
    console.log(res);
    var categoryList=res.backData.categoryList;
    var categoryDiv="";
    if(categoryList!=null&&categoryList!=undefined&&categoryList!=""&&categoryList.length>0)
    {
        $.each(categoryList,function(i,categoryLi) {
            categoryDiv+=' <div class="pc-vipGo" onclick="goOther(this)" data-articleChildId="'+categoryLi.article_id+'" data-isArticle="'+categoryLi.is_article+'" data-id="4" data-articleId="'+categoryLi.id+'"> ' +
                '<img src="'+imgPath+categoryLi.img_url+'" class="pc-vipGoImg"/> ' +
                '<div class="pc-vipGoName"> ' +
                '<span class="">'+categoryLi.title+'</span> ' +
                '<img src="../img/right.png" class="pc-right2 fr"/> ' +
                '<div class="clear"></div> ' +
                '</div> ' +
                '<div class="clear"></div> ' +
                '</div>';
        });
        $(".pc-active2").append(categoryDiv);
    }
}
//获得用户信息
function getUserInfo_fun(res){
    console.log(res);
    var userInfo=res.backData.userInfo;
    if(userInfo!=null&&userInfo!=undefined&&userInfo!="")
    {
        $(".pc-vipGoImg").attr("data-phone",userInfo.phone);
        //昵称
        if(userInfo.nickname!=null&&userInfo.nickname!=undefined&&userInfo.nickname!="")
        {
            $(".pc-userName").text(userInfo.nickname);
        }
        else if(userInfo.real_name!=null&&userInfo.real_name!=undefined&&userInfo.real_name!="")
        {
            $(".pc-userName").text(userInfo.real_name);
        }
        else{
            $(".pc-userName").text("匿名用户");
        }
        //头像
        if(userInfo.headimgurl!=null&&userInfo.headimgurl!=undefined&&userInfo.headimgurl!="")
        {
            $(".pc-userImg").attr("src",userInfo.headimgurl);
        }
        else{
            $(".pc-userImg").attr("src","../img/head.png");
        }
        //订单信息
        //待支付
        if(res.backData.awaitingDelivery>0)
        {
            $(".pc-orderBLiNum2").removeClass("disn");
            if(res.backData.awaitingDelivery>=99)
            {
                $(".pc-orderBLiNum2").text(99);
            }
            else{
                $(".pc-orderBLiNum2").text(res.backData.awaitingDelivery)
            }
        }
        //待发货
        if(res.backData.obligationOrderNum>0)
        {
            $(".pc-orderBLiNum1").removeClass("disn");
            if(res.backData.obligationOrderNum>=99)
            {
                $(".pc-orderBLiNum1").text(99);
            }
            else{
                $(".pc-orderBLiNum1").text(res.backData.obligationOrderNum)
            }
        }
        //待收货
        if(res.backData.waitForReceiving>0)
        {
            $(".pc-orderBLiNum3").removeClass("disn");
            if(res.backData.waitForReceiving>=99)
            {
                $(".pc-orderBLiNum3").text(99);
            }
            else{
                $(".pc-orderBLiNum3").text(res.backData.waitForReceiving)
            }
        }
        //退款中
        if(res.backData.refunds>0)
        {
            $(".pc-orderBLiNum4").removeClass("disn");
            if(res.backData.refunds>=99)
            {
                $(".pc-orderBLiNum4").text(99);
            }
            else{
                $(".pc-orderBLiNum4").text(res.backData.refunds)
            }
        }
    }
}

//查看个人信息
function goUserInfo(btn){
    self.location.href="personalInfo.html";
}
function goOther(btn){
    //会员中心
    var style=$(btn).attr("data-id");
    if(style=="0")
    {
        self.location.href="vipCenter.html";
    }
    //我的收藏
    else if(style=="1")
    {
        self.location.href="collectList.html";
    }
    //我的足迹
    else if(style=="2")
    {
        self.location.href="myFoot.html";
    }
    //解除绑定
    else if(style=="3")
    {
        sessionStorage.setItem("oldPhone",JSON.stringify($(btn).find(".pc-vipGoImg").attr("data-phone")));
        self.location.href="login2.html";
    }
    //线下门店 公司简介 售后服务
    else if(style=="4")
    {
        var isArticle=$(btn).attr("data-isArticle");
        var articleId=$(btn).attr("data-articleId");
        var articleChildId=$(btn).attr("data-articleChildId");
        if(isArticle=="1")
        {
            self.location.href="activeDetails.html?articleId="+articleChildId;
        }
        else {
            self.location.href="meizuInfoList.html?articleId="+articleId;
        }
    }
    //收货地址
    else if(style=="7")
    {
        sessionStorage.removeItem("addressList");
        self.location.href="addressList.html";
    }
}
//前往订单列表
function goOrder(btn){
    var style=$(btn).attr("data-id");
    //全部
    if(style=="0")
    {
        sessionStorage.setItem("orderStyle",JSON.stringify("0"));
        self.location.href="orderList.html";
    }
    //待付款
   else if(style=="1")
    {
        sessionStorage.setItem("orderStyle",JSON.stringify("1"));
        self.location.href="orderList.html";
    }
    //待发货
    else if(style=="2")
    {
        sessionStorage.setItem("orderStyle",JSON.stringify("2"));
        self.location.href="orderList.html";
    }
    //待收货
    else if(style=="3")
    {
        sessionStorage.setItem("orderStyle",JSON.stringify("3"));
        self.location.href="orderList.html";
    }
    //退款中
    else if(style=="4")
    {
        sessionStorage.setItem("orderStyle2",JSON.stringify("6"));
        self.location.href="orderList2.html";
    }
}

//前往商品详情
function pc_goProductDetail(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-productId")
}