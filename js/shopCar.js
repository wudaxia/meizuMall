var pageIndex=1;
var pageCount=99;
var over = 1;
var limited = 999999999999999999;
var token=JSON.parse(localStorage.getItem("token"));
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(".loadBox").html(addGetMoreInfo());
    getMoreover();
    recommend();
    shopFoot();
    if(token!=null&&token!=undefined&&token!="")
    {
        layer.closeAll();
        getShopCarList();
    }
    else{
        layer.closeAll();
    }
}
//获取购物车列表
function getShopCarList(){
    var data='{"token":"'+token+'","index":'+pageIndex+',"page_num":'+pageCount+'}';
    console.log(data);
    openGetMore();
    AjaxSubmit("get",JSON.parse(data),basePath+"User/getCartList",getCartList_fun);
}
//获取到购物车列表
function getCartList_fun(res){
    console.log(res);
    var cartList=res.backData.cartList;
    if(cartList!=null&&cartList!=undefined&&cartList!=""&&cartList.length>0)
    {
        var cartListDiv="";
        var cartListImg="";
        $(".sc-productLi").removeClass("sc-productLiLast");
        $.each(cartList,function(i,cartLi){
            var productName="";
            var market_price=0;
            if(i==cartList.length-1)
            {
                cartListDiv+='<div class="sc-productLi sc-productLiLast" data-carId="'+cartLi.id+'" data-productId="'+cartLi.goods_id+'" onclick="sc_goProduct(this)"> ';
            }
            else{
                cartListDiv+='<div class="sc-productLi" data-carId="'+cartLi.id+'" data-productId="'+cartLi.goods_id+'" onclick="sc_goProduct(this)"> ';
            }
            cartListDiv+= '<span class="sc-productListCheck sc-productListCheckChose" onclick="event.cancelBubble = true;choseProduct(this)"></span> ';
            //if(cartLi.specification_img_url!=null&&cartLi.specification_img_url!=undefined&&cartLi.specification_img_url!="")
            //{
            //    cartListImg=cartLi.specification_img_url;
            //}
           if(cartLi.goods!=null&&cartLi.goods!=undefined&&cartLi.goods!="")
            {
                productName=cartLi.goods.title;
                market_price=cartLi.goods.market_price;
                if(cartLi.goods.img_url!=null&&cartLi.goods.img_url!=undefined&&cartLi.goods.img_url!="")
                {
                    cartListImg=imgPath+cartLi.goods.img_url;
                }
                cartListDiv+='<img src="'+cartListImg+'" class="sc-productListImg" data-imgUrl="'+cartLi.goods.img_url+'"/> ' +
                    '<div class="sc-productBody"> ' +
                    '<div class="sc-productBodyName">'+productName+'</div> ' +
                    '<div class="sc-productBodyStyle" data-styleId="'+cartLi.specification+'">'+cartLi.specification_info+'</div> ' +
                    '<div class="sc-productBodySum"> ' +
                    '<div class="sc-productBodySum1"> ' +
                    '<span class="sc-productBodySumL">¥</span> ' +
                    '<span class="sc-productBodyPrice">'+cartLi.money+'</span> ' +
                    '<s class="sc-productBodyDel">¥'+market_price+'</s> ' +
                    '<div class="fr">×<span class="sc-productBodyNum">'+cartLi.num+'</span></div> ' +
                    '</div> ' +
                    '<div class="sc-choseStyleSumB disn"> ' +
                    '<span class="sc-choseStyleMinus" data-name="0" onclick="event.cancelBubble = true;sc_choseNum(this)"> ' +
                    '<img src="../img/minus.png"/> ' +
                    '</span> ' +
                    '<input  type="number" class="sc-choseStyleNum" onclick="event.cancelBubble = true;" min="1" max="20"  value="'+cartLi.num+'"/> ' +
                    '<span class="sc-choseStyleJoin" data-name="1" onclick="event.cancelBubble = true;sc_choseNum(this)"> ' +
                    '<img src="../img/join.png"/> ' +
                    '</span> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="clear"></div> ' +
                    '</div>';
                $(".sc-productDiv").append(cartListDiv);
            }
        });
        sc_Num();
        $(".sc-choseStyleNum").focus(function(){
            $(".sc-footer").addClass("hide");
            $(".footerNav").addClass("hide");
        }).blur(function(){
            $(".sc-footer").removeClass("hide");
            $(".footerNav").removeClass("hide");
        });
        limited = document.body.scrollHeight -440;
        //console.log(document.body.scrollHeight);
        if(pageCount>cartList.length)
        {
            over=0;
            $("#over").addClass("hide");
            closeGetMore();
            if(pageIndex==1&&cartList.length ==0)
            {
                //console.log(334);
                $("#over").addClass("hide");
                $(".o-blank").remove();
                //$(".recommend").remove();
                $(".sc-carEdit").remove();
                var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">购物车竟然是空的<p class="o-blankWord2">“再忙，也得记得买点什么犒赏自己~”</p></div></div>');
                $(".sc-productDiv").append(blank);
                //$("#wrapper").css("height","auto")
            }
        }
    }
    else{
        over=0;
        $("#over").addClass("hide");
        closeGetMore();
        if(pageIndex==1&&cartList.length ==0)
        {
            //console.log(334);
            $("#over").addClass("hide");
            $(".o-blank").remove();
            //$(".recommend").remove();
            $(".sc-carEdit").remove();
            var blank=$('<div class="o-blank"><img src="../img/noCar.png"/><div class="o-blankWord">购物车竟然是空的<p class="o-blankWord2">“再忙，也得记得买点什么犒赏自己~”</p></div></div>')
            $(".sc-productDiv").append(blank);
            //$("#wrapper").css("height","auto")
        }
    }
    closeGetMore();
}
//选择商品数量
function sc_choseNum(btn){
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

//计算产品数量
function sc_Num(){
    //计算数量
    var productNum=0;
    var productSum=0;
    $(".sc-productLi").each(function(i,li){
        if($(li).find(".sc-productListCheck").hasClass("sc-productListCheckChose"))
        {
            if($(li).find(".sc-productBodyNum").text()>=1)
            {
                productNum+=parseFloat($(li).find(".sc-productBodyNum").text());
                productSum+=parseFloat($(li).find(".sc-productBodyPrice").text()*$(li).find(".sc-productBodyNum").text());
            }
        }
    });
    productSum=productSum.toFixed(2);
    //console.log(productSum);
    //console.log(productNum);
    $(".sc-footerSumMoenyR").text(productSum);
    if(productNum>9999)
    {
        $(".sc-footerNum").text(9999+"+");
    }
    else{
        $(".sc-footerNum").text("（"+productNum+"）");
    }
}

//选择产品
function choseProduct(btn){
    if($(btn).hasClass("sc-productListCheckChose"))
    {
        $(btn).removeClass("sc-productListCheckChose");
        $(".sc-footerCheck").removeClass("sc-footerCheckChose");
    }
    else{
        $(btn).addClass("sc-productListCheckChose");
        if($(".sc-productListCheckChose").length==$(".sc-productLi").length)
        {
            $(".sc-footerCheck").addClass("sc-footerCheckChose");
        }
    }
    sc_Num();
}
//全选产品
function choseAllProduct(btn){
    if($(btn).hasClass("sc-footerCheckChose"))
    {
        $(btn).removeClass("sc-footerCheckChose");
        $(".sc-productListCheck").each(function(){
            $(this).removeClass("sc-productListCheckChose");
        })
    }
    else{
        $(btn).addClass("sc-footerCheckChose");
        $(".sc-productListCheck").each(function(){
            $(this).addClass("sc-productListCheckChose");
        })
    }
    sc_Num();
}
//编辑、删除
function sc_edit(btn){
    //编辑
    if($(btn).attr("data-style")=="0")
    {
        $(".sc-productLi").attr("onclick","");
        $(".sc-productBodySum1").each(function(){
            $(this).addClass("disn");
        });
        $(".sc-choseStyleSumB").each(function(){
            $(this).removeClass("disn");
        });
        $(".sc-carEditOver").removeClass("disn");
        $(".sc-carEditing").addClass("disn");
        $(btn).attr("data-style","1");
        $(".sc-footerSumBuy").addClass("disn");
        $(".sc-footerSumDel").removeClass("disn");
        $(".sc-footerSumMoenys").addClass("disn");
    }
    //完成
    else if($(btn).attr("data-style")=="1")
    {
        var liList="";
        $(".sc-productLi").attr("onclick","sc_goProduct(this)");
        $(".sc-productLi").each(function(i,li){
            if($(li).find(".sc-productListCheck").hasClass("sc-productListCheckChose"))
            {
                if(liList==null||liList==undefined||liList=="")
                {
                    liList+=$(li).attr("data-carId");
                    if($(li).find(".sc-choseStyleNum").val()=="0")
                    {
                        $(li).find(".sc-choseStyleNum").val(1);
                        liList+="-1";
                    }
                    else{
                        liList+="-"+$(li).find(".sc-choseStyleNum").val();
                    }
                }
                else{
                    liList+="_"+$(li).attr("data-carId");
                    if($(li).find(".sc-choseStyleNum").val()=="0")
                    {
                        liList+="-1";
                    }
                    else{
                        liList+="-"+$(li).find(".sc-choseStyleNum").val();
                    }
                }
            }
        });
        if(liList!=null&&liList!=undefined&&liList!="")
        {
            var editData='{"token":"'+token+'","info":"'+liList+'"}';
            AjaxSubmit("get",JSON.parse(editData),basePath+"User/amendCartInfo",amendCartInfo_fun)
        }
    }
    //删除
    else if($(btn).attr("data-style")=="2")
    {
        var liList="";
        $(".sc-productLi").each(function(i,li){
            if($(li).find(".sc-productListCheck").hasClass("sc-productListCheckChose"))
            {
                if(liList==null||liList==undefined||liList=="")
                {
                    liList+=$(li).attr("data-carId");
                }
                else{
                    liList+="_"+$(li).attr("data-carId");
                }
            }
        });
        var delData='{"token":"'+token+'","id":"'+liList+'"}';
        console.log(delData);
        AjaxSubmit("get",JSON.parse(delData),basePath+"User/removeCart",removeCart_fun)
    }
}

//删除结果
function removeCart_fun(res){
    console.log(res);
     pageIndex=1;
     pageCount=5;
     over = 1;
     limited = 999999999999999999;
    $(".sc-productLi").remove();
    getShopCarList();
}
//编辑
function amendCartInfo_fun(res){
    console.log(res);
    $(".sc-productBodySum1").each(function(){
        $(this).removeClass("disn");
    });
    $(".sc-choseStyleSumB").each(function(){
        $(this).addClass("disn");
    });
    $(".sc-carEditOver").addClass("disn");
    $(".sc-carEditing").removeClass("disn");
    $(".sc-productBodySum").each(function(){
        $(this).find(".sc-productBodyNum").text($(this).find(".sc-choseStyleNum").val());
    });
    $(".sc-carEdits").attr("data-style","0");
    sc_Num();
    $(".sc-footerSumBuy").removeClass("disn");
    $(".sc-footerSumDel").addClass("disn");
    $(".sc-footerSumMoenys").removeClass("disn");
}

//前往产品详情页
function sc_goProduct(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-productId");
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
            getShopCarList();
        }
    });
}

//购买商品
function sc_buyProduct(btn){
    var productId="";
    var productName="";
    $(".sc-productLi").each(function(i,li){
        if($(li).find(".sc-productListCheck").hasClass("sc-productListCheckChose"))
        {;
            if(productId!=null&&productId!=undefined&&productId!="")
            {
                productId+="_"+$(li).attr("data-carId");
                //productName+=',{';
                //productName+='"productName:"'+$(li).find(".sc-productBodyName").text()+'",';
                //productName+='productStyle:"'+$(li).find(".sc-productBodyStyle").text()+'",';
                //productName+='productPrice:"'+$(li).find(".sc-productBodyPrice").text()+'",';
                //productName+='productNum:"'+$(li).find(".sc-productBodyNum").text()+'",';
                //productName+='productImg:"'+$(li).find(".sc-productListImg").attr("src")+'"';
                //productName+="}";
                productName+='_{"productName":"'+$(li).find(".sc-productBodyName").text()+'","productStyle":"'+$(li).find(".sc-productBodyStyle").text()+'","productPrice":"'+$(li).find(".sc-productBodyPrice").text()+'","productNum":"'+$(li).find(".sc-productBodyNum").text()+'","productImg":"'+$(li).find(".sc-productListImg").attr("data-imgUrl")+'"}';
            }
            else{
                productId+=$(li).attr("data-carId");
                productName+='{"productName":"'+$(li).find(".sc-productBodyName").text()+'","productStyle":"'+$(li).find(".sc-productBodyStyle").text()+'","productPrice":"'+$(li).find(".sc-productBodyPrice").text()+'","productNum":"'+$(li).find(".sc-productBodyNum").text()+'","productImg":"'+$(li).find(".sc-productListImg").attr("data-imgUrl")+'"}';
            }
        }
    });
    if(productId!=null&&productId!=undefined&&productId!=""&&productName!=null&&productName!=undefined&&productName!=""){
        var productInfo='{"productId":"'+productId+'","produtStyle":"1","sumMoney":"'+$(".sc-footerSumMoenyR").text()+'"}';
        sessionStorage.setItem("productCarInfo",productName);
        sessionStorage.setItem("productInfo",productInfo);
        self.location.href="orderConfirmation.html";
    }
    else{
        openmodal("请至少选择一件商品进行结算");
    }
}