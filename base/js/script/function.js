var basepath = "../api";
var imgpath = "http://www.ningbohaida.com/upload/";
var imginfopath = "http://www.ningbohaida.com/";
var appid = "wx41ae08fc1ad2197e";
//判断当前登陆情况
$(function() {
    //code获取 
    
    
})

function login_fun(res) {
    if (res.result.code == "300")
    {
        alert(res.result.detail);
        return;
    }
    if (res.result.code == "3010") {
        var openid = res.dataPacket.openid;
	 window.sessionStorage.setItem("wxopenid",openid);
        window.location.href = "reg_new.html?openid=" + openid;
    } else {
        window.sessionStorage.setItem("token", res.dataPacket.token);
	if( window.sessionStorage.getItem("locationhref")!=null)
	  window.location.href=window.sessionStorage.getItem("locationhref")
        getToken_fun()
    }
}


//验证手机号码
function VerificationPhone(phone) {

    var reg = /^0?1[3|4|5|6|7|8|9|0][0-9]\d{8}$/;
    if (reg.test(phone)) {

        return true;
    } else {
        return false;
    };
}

//字符串省略
function strEllipsis(str, leng) {
    if (str.length > parseInt(leng)) {
        str = str.substring(0, parseInt(leng));
        str += "...";
    }
    return str;
}




//Js 获取URL参数
function GetQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}
//弹窗
//function openmodal(msg) {
//    var modalhtml = "<div class=\"modal fade\" id=\"myModal\"><div class=\"modal-dialog\"><div class=\"modal-content\">\
//      <div class=\"modal-header\">\
//        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;\
//        </span><span class=\"sr-only\">Close</span></button>\
//        <h4 class=\"modal-title\">提醒</h4>\
//      </div>\
//      <div class=\"modal-body\">\
//        <p id=\"errormsg\"></p>\
//      </div>\
//      <div class=\"modal-footer\">\
//        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\
//      </div>\
//    </div><!-- /.modal-content -->\
//  </div><!-- /.modal-dialog -->\
//</div><!-- /.modal -->";
//    $("body").append(modalhtml);
//    $("#myModal").css("margin-top", "50%");
//    $("#errormsg").html(msg);
//    jQuery('#myModal').modal('show');
//}
//弹窗2
function openmodal_2(msg) {
    var modalhtml = "<div class=\"modal fade\" id=\"myModal\"><div class=\"modal-dialog\"><div class=\"modal-content\">\
      <div class=\"modal-header\">\
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;\
        </span><span class=\"sr-only\">Close</span></button>\
        <h4 class=\"modal-title\">提醒</h4>\
      </div>\
      <div class=\"modal-body\">\
        <p id=\"errormsg\"></p>\
      </div>\
      <div class=\"modal-footer\">\
        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\
      </div>\
    </div><!-- /.modal-content -->\
  </div><!-- /.modal-dialog -->\
</div><!-- /.modal -->";
    $("body").append(modalhtml);
    $("#myModal").css("margin-top", "50%");
    $("#errormsg").html(msg);
    jQuery.noConflict();
    $('#myModal').modal('show');
}
//通用加载数据模型  类型，数据,路径，回调函数
function AjaxSubmitJsonp(_type, _data, _url, _method) {
    console.log(_data)
   
    if (_type == "get")
        $.get(_url, _data, function (data, state) {
            if (data.result.code == "301" &&_method!=" login_fun")
            {
                openmodal("登陆超时，请重新登陆~");
                sessionStorage.clear();
                yanshiopen("login");
                NProgress.done();
            }
            else
                _method(data)
        })
    else {
        $.post(_url, _data, function(data, state) {

            if (data.result.code == "301" && _method != " login_fun") {
                openmodal("登陆超时，请重新登陆~");
                sessionStorage.clear();
                yanshiopen("login");
                NProgress.done();
            }
            else
                _method(data)
        })
    }
}

//延时跳转页面
function yanshiopen(link) {

    t = setTimeout(" window.location.href ='" + link + ".html'", 2000);
}


function SubmitAjax(_url, _method) {
    $.ajax({
        type: "post",
        url: _url,
        data: "{}",
        contentType: "application/json;utf-8",
        success: function(msg) {
            _method(msg.d);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
        }
    });
}

//获取更多
function getMore(flag) {
    if (pageNo == 1)
    {
        $("#moreInfo").html(addInfo());
    } 
    else {
     
        $("#loadmore").css("display", "block");
    }
    var token = window.sessionStorage.getItem("token");
    $(window).scroll(function() {
        var $thisMain = $("body");
        var top = parseInt($thisMain.scrollTop()) + parseInt(window.screen.availHeight);
 
        if (top > limited && over == 1) {
            switch (flag) {
                case "quote":
                    $("#loadmore").css("display", "block");
                    limited = 99999; 
                    pageNo++;
                    AjaxSubmitJsonp("post", "{}", basepath + "/Quotation/Get?token=" + token + "&name=" + keyword + "&brandid=" + brand_id + "&is_act=0&index=" + pageNo + "&pagecount=" + pageSize + "&class_id=" + classid + "&l_price=" + l_price + "&h_price=" + l_price + "&configure=" + configure + "&xlID=" + xlID + "", get);

                    break;
                case "moreOrder":
                    $("#loadmore").css("display", "block");
                    limited = 99999;
                    pageNo++;
                    AjaxSubmitJsonp("post", "{}", basepath + "/Order/GetList?token=" + token + "&state=" + state + "&index=" + pageNo + "&pagecount=" + pagecount + "", GetList);


                    break;
                 
            }
        }
    });
}

//插入加载更多提示
function addInfo() {
    var html = "<div style=\"margin:20px auto; display:block\" id=\"loadmore\">\
                    <div style=\"text-align:center; margin-top:20px\">\
                        <img style=\"height:30px\" src=\"images/loader.gif\"></img>\
                        <span style=\"display:block;margin-top:20px\">正在加载更多</span>\
                    </div>\
                </div>\
                <div style=\"margin:20px auto; display:none \" id=\"over\">\
                    <div style=\"text-align:center; margin-top:20px\">\
                        <span style=\"display:block;margin-top:20px\">已经没有更多了</span>\
                 </div>";

    return html;

}


//jquery 时间戳与日期转换
(function ($) {

    $.extend({

        myTime: {

            /**

             * 当前时间戳

             * @return <int>        unix时间戳(秒)   

             */

            CurTime: function () {

                return Date.parse(new Date()) /1000;

            },

            /**               

             * 日期 转换为 Unix时间戳 

             * @param <string> 2014-01-01 20:20:20  日期格式               

             * @return <int>        unix时间戳(秒)               

             */

            DateToUnix: function (string) {

                var f = string.split(' ', 2);

                var d = (f[0] ? f[0] : '').split('-', 3);

                var t = (f[1] ? f[1] : '').split(':', 3);

                return (new Date(

                        parseInt(d[0], 10) || null,

                        (parseInt(d[1], 10) || 1) - 1,

                        parseInt(d[2], 10) || null,

                        parseInt(t[0], 10) || null,

                        parseInt(t[1], 10) || null,

                        parseInt(t[2], 10) || null

                        )).getTime() / 1000;

            },

            /**               

             * 时间戳转换日期               

             * @param <int> unixTime    待时间戳(秒)               

             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)               

             * @param <int>  timeZone   时区               

             */

            UnixToDate: function (unixTime, isFull, timeZone) {

                if (typeof (timeZone) == 'number') {

                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;

                }

                var time = new Date(unixTime * 1000);

                var ymdhis = "";

                ymdhis += time.getUTCFullYear() + "-";

                ymdhis += "" + whereone(time.getUTCMonth() + 1) + "" + "-";

                ymdhis += "" + whereone(time.getUTCDate()) + "";

                if (isFull === true) {
                    

                    
                    ymdhis += " " + whereone(time.getUTCHours() + 8) + ":";

                    ymdhis += whereone(time.getUTCMinutes()) + ":";

                    ymdhis += whereone(time.getUTCSeconds());

                }

                return ymdhis;

            }

        }

    });

})(jQuery);



//时间填充位数
function whereone(time)
{
    time = JSON.stringify(time)
    if (time.length == 1)
        time = "0" + time;
  
    return  time;
}

//底部二级菜单栏
function footerNav2(btn) {
    $(btn).find(".footerNavUl2").fadeToggle(500);
    //if($(btn).find(".footerNavUl2").hasClass("disn"))
    //{
    //    $(btn).find(".footerNavUl2").stop().removeClass("disn");
    //    $(btn).find(".footerNavUl2").stop().animate({"top":"-95px"},200);
    //}
    //else{
    //    $(btn).find(".footerNavUl2").stop().animate({"top":"-50px"},200);
    //    setTimeout(function(){
    //        $(btn).find(".footerNavUl2").stop().addClass("disn");
    //    },200);
    //}
}