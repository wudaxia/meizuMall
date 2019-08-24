$(function(){
    $(".sh-searchInput").on('keydown  input paste', function(event){//IOS选择中文兼容
        if (event.which === 13 || event.which === 40 || event.which == 38){
            event.preventDefault();
            $(".sh-searchGo").trigger("click");
            $(".i-hSearchInput").blur();
        }
    })
});
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(".sh-searchInput").focus();
    //获取热门搜索字符
    AjaxSubmit2("get",basePath+"Goods/getHotSearch",getHotSearch_fun);
    layer.closeAll();
}
//返回
function sh_goback(btn){
    self.location.href="index.html";
}
//删除搜索内容
function sr_searchDel(btn){
    $(btn).siblings("input").val(" ");
    $(".sh-searchInput").focus();
}
//获取热门搜索内容
function getHotSearch_fun(res){
    console.log(res);
    var hotSearch=res.backData.hotSearch;
    var hotSearchLis="";
    if(hotSearch!=null&&hotSearch!=""&&hotSearch!=undefined&&hotSearch.length>0)
    {
        $.each(hotSearch,function(i,hotSearchLi){
            if(i%4==0)
            {
                hotSearchLis+=' <span class="sh-greenLabel" data-type="0" onclick="goSerach(this)">'+hotSearchLi.search+'</span> ';
            }
            else if(i%4==1)
            {   hotSearchLis+=' <span class="sh-blueLabel" data-type="0" onclick="goSerach(this)">'+hotSearchLi.search+'</span> ';

            }
            else if(i%4==2)
            {   hotSearchLis+=' <span class="sh-orangeLabel" data-type="0" onclick="goSerach(this)">'+hotSearchLi.search+'</span> ';

            }
            else if(i%4==3)
            {
                hotSearchLis+=' <span class="sh-redLabel" data-type="0" onclick="goSerach(this)">'+hotSearchLi.search+'</span> ';
            }
        })
    }
    $(".sh-labelBox").append(hotSearchLis);
    var hotSearchGoods=res.backData.hotSearchGoods;
    if(hotSearchGoods!=null&&hotSearchGoods!=undefined&&hotSearchGoods!=undefined)
    {
        var hotSearchGoodImg="";
        if(hotSearchGoods.img_url!=null&&hotSearchGoods.img_url!=undefined&&hotSearchGoods.img_url!="")
        {
            hotSearchGoodImg=imgPath+hotSearchGoods.img_url;
        }
        else{
            hotSearchGoodImg="../img/hotsearch.png";
        }
        $(".sh-hotImgs").attr("src",hotSearchGoodImg);
        $(".sh-hotImg").attr("data-productId",hotSearchGoods.id)
    }
    else{
        $(".sh-hotImg").remove();
    }
}
//前往搜索结果页面

function goSerach(btn){
    var style=$(btn).attr("data-type");
    //热门关键字链接
    if(style=="0")
    {
        sessionStorage.setItem("search",JSON.stringify($(btn).text()));
        self.location.href="searchResult.html";
    }
    //搜索框链接
    else if(style=="1"){
        sessionStorage.setItem("search",JSON.stringify($(".sh-searchInput").val()));
        self.location.href="searchResult.html";
    }
}
//前往商品详情页
function sh_goProduct(btn){
    self.location.href="product.html?productId="+$(btn).attr("data-ProductId");
}