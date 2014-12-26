/*标签系统JS 首页厂房图切换*/
var plantMove;
var plantMaxLength = $("#plantPageNum").find("a").length;
var thisPlantPicNum = 0;
function seePlantPic() {
    var numId = arguments[1];
    var thispic = arguments[0];
    var fileState = $(thispic).attr("fileState").split('|');
    if (fileState.length == 2) {
        var objPlantPic = $("#PlantImageShow");
        objPlantPic.animate({ opacity: "0.2" }, 500, function () {
            var plantImage = new Image();
            plantImage.onload = function () {
                $("#PlantImageShow").attr("src", plantImage.src);
                $("#plantPageNum").find("a").removeClass("on");
                $(thispic).addClass("on");
                thisPlantPicNum = parseInt($(thispic).text()) - 1;
                objPlantPic.animate({ opacity: "1.0" }, 500);
            }
            plantImage.src = $("#PlantImageShow").attr("src").replace(/[\'|\"]+/g, "").replace(/[T](\d+)[G](\d+)[\/]/g, "T" + fileState[0] + "G" + fileState[1] + "/");
        });
    }
}
function relPlantPlay() {
    plantMaxLength = $("#plantPageNum").find("a").length;
    if (plantMaxLength <= 1) { return false; }
    plantMove = setInterval(function () {
        var charNum = 'a';
        if (++thisPlantPicNum == plantMaxLength) { thisPlantPicNum = 0; }
        switch (thisPlantPicNum) {
            case 0: charNum = "a"; break;
            case 1: charNum = "b"; break;
            case 2: charNum = "c"; break;
            case 3: charNum = "d"; break;
        }
        seePlantPic($("#plantImage_" + charNum)[0], charNum);
    }, 5000)
}
function stopRelPlantPlay() { try { window.clearInterval(plantMove); } catch (ex) { } }
/*标签系统JS 首页厂房图切换*/
/*询盘邮箱发送*/
var cdnCss = "http://css1.cdn.tradevv.com";

sendinquiry_dialogFirst = true;
function sendinquiry_ajax() {
    var operate = "";
    var sendEmail;
    operate = arguments[0];
    var urlData;
    var state = true;
    if (operate == "Send") {
        sendEmail = "orderEmail";
        var thisContrlId = $("#thisContrlId").val();
        var email = $.trim($("#" + thisContrlId + "_email").val());
        var senddesc = $.trim($("#senddesc").val());
        if ($.trim($("#" + thisContrlId + "_email").attr("defaulttext")) == email) { alert('Wrong E-mail Address Format'); state = false; return; }
        if (!v_emailtest(email)) { alert("Wrong E-mail Address Format"); state = false; return; }
        if (senddesc == $.trim("Input your info here")) { alert('Content confined to 20-3,000 characters'); state = false; return; }
        urlData = "Rnd=" + Math.random() + "&sendEmail=" + escape(sendEmail) + "&email=" + escape(email) + "&senddesc=" + escape(senddesc);
    }
    else if(operate=="Pro"){
        sendEmail = "ProOrderEmail";
        var ProductsGuid = $("#Products_GUID").val();
        var ProductsGuidList = $("#Products_GUID_list").val();
        var email = $.trim($("#txtSendEmail").val());
        if (email == "" || !v_emailtest(email)) { alert('Wrong E-mail Address Format'); state = false; return; }
        var title = $.trim($("#txtSendTitle").val());
        if (title == "") { alert('Please Input Subject'); state = false; return; }
        var senddesc = $.trim($("#txtSendDesc").val());
        if (senddesc == "") { alert('Content confined to 20-3,000 characters'); state = false; return; }
        var userName = $.trim($("#txtContactName").val());
        var tel = $.trim($("#txtPhone").val());
        if (tel.length < 2) { alert('Either telephone or mobile phone No. with a length of 6-50 characters'); state = false; return; }
        var Mobile = $.trim($("#txtMobile").val());
        var fax = $.trim($("#txtFax").val());
        var homepage = $("#txtWebSite").val();
        var address = $("#txtAddress").val();
        var CerCode = $("#txtCerCode").val();
        urlData = "Rnd=" + Math.random() + "&ProductsGuid=" + ProductsGuid + "&ProductsGuidList=" + ProductsGuidList + "&sendEmail=" + escape(sendEmail) + "&title=" + escape(title) + "&senddesc=" + escape(senddesc) + "&userName=" + escape(userName) + "&email=" + escape(email) + "&tel=" + tel + "&fax=" + escape(fax) + "&mobile=" + escape(Mobile) + "&homepage=" + escape(homepage) + "&address=" + escape(address) + "&cerCode=" + escape(CerCode);
    }
    if (state) {
        if (sendinquiry_dialogFirst == true) {
            var temp_float;
            temp_float = "<div id=\"floatBoxBg\" style=\"height:" + ($(document).height() - 4) + "px;filter:alpha(opacity=0);opacity:0;width:100%;background:#000;position:absolute; z-index:99998; top:0;left:0;\"></div>";
            temp_float += "<div id=\"floatBox\" style=\"position:absolute;top:" + ($(document).scrollTop() + 200) + "px; left:50%; z-index:99999;display:none;\"><img src=\"" + cdnCss + "/showroom/css/comm/sendloading.gif\"/></div>";
            $("body").append(temp_float);
            sendinquiry_dialogFirst = false;
        }
        $("#floatBoxBg").show();
        $("#floatBoxBg").animate({ opacity: "0.5" }, 300, function () {
            $("#floatBox").show();
            $.ajax({
                type: "post",
                url: "/js/ajax/sendInquiry.aspx",
                data:urlData,
                success: function (html) {
                    if (html.split('|').length == 2 && html.split('|')[0] == "true") {
                        $("#floatBox").hide(200, function () {
                            $("#floatBoxBg").animate({ opacity: "0" }, 200, function () {
                                alert(html.split('|')[1]);
                                $("#floatBoxBg").hide();
                            });
                        });
                    }
                    else if (html.split('|').length == 2 && html.split('|')[0] != "true") {
                        $("#floatBox").hide(200, function () { $("#floatBoxBg").animate({ opacity: "0" }, 200, function () { alert(html.split('|')[1]); $("#floatBoxBg").hide(); }); });
                    } else {
                        $("#floatBox").hide(200, function () { $("#floatBoxBg").animate({ opacity: "0" }, 200, function () { $("#floatBoxBg").hide(); }); });
                    }
                },
                error: function () { $("#floatBox").hide(200, function () { $("#floatBoxBg").animate({ opacity: "0" }, 200, function () { $("#floatBoxBg").hide(); }); }) }
            })
        });
    }
}
/*邮箱询盘发送*/
/*发送询盘*/
function getCheckedIdlist() {
    var idList = $("input[name='" + arguments[0] + "']:checked").map(function () {
        return $(this).val();
    }).get().join(",");
    return idList;
}
function contactNow() {
    var idlist = getCheckedIdlist("selProductsGuid");
    if (idlist != "") {
        document.getElementById("Products_GUID_list").value = idlist;
        document.getElementById("allcontacus").submit();
    }
    else { alert('Please select the product to send inquiry'); return; }
} /// <reference path="http://localhost:2738/VVShowRoom/js/" />
/*发送询盘*/
/*产品全选or反选*/
function selectALLOrClearALL() {
    $("input[name='" + arguments[0] + "']").attr("checked", arguments[1]);
}
/*产品or反选*/
/*search*/
function gosearch() {
    var searchterm = arguments[0].replace(/[\,]+/g, " ").replace(/(^\s*)|(\s*$)/g, "");
    if (searchterm.length < 2 || searchterm == arguments[1]) {
        alert(arguments[1]);
    } else {
        //alert(arguments[2].replace("$searchterm$", searchterm));
        window.location.href = arguments[2].replace("$searchterm$", encodeURIComponent(searchterm)).replace("%24searchterm%24", encodeURIComponent(searchterm));
    } 
}
/*search*/
/*翻译*/
function translateGOOGLE() { window.open(arguments[0].replace("$url$", this.location)); }
/*翻译*/
function loadHead() {
    $("#tophead ul li.list").hover(function () {
        $(this).removeClass("list");
        $(this).addClass("on");
        $(this).find(".list_box").show();
    }, function () {
        $(this).removeClass("on");
        $(this).addClass("list");
        $(this).find(".list_box").hide();

    });
    $(".list_box dl dd").hover(function () {
        $(this).addClass("list_on");
    }, function () {
        $(this).removeClass("list_on");

    });
    $('.left_product .secondlist li').hover(function () {
        $(this).addClass("pro_on");
    }, function () {
        $(this).removeClass("pro_on");
    });
}
$(function () {
    var ThisPageUrl = window.encodeURIComponent(location.href);
    $("#tophead").load("/js/ajax/TopHead.aspx?url=" + ThisPageUrl + "&m=" + Math.random(), function () { loadHead(); });
});
/*搜索产品*/
function SearchProduct() {
    if ($("#SearchPro").val() == $("#SearchPro").attr("defaulttext") || $("#SearchPro").val() == "") {
        alert('Please input keyword'); return;
    } else {
        var KeyProduct = $("#SearchPro").val().replace(/[^0-9|a-z|A-Z|-]+/g, "+").replace(/(^\+*)|(\+*$)/g, "");
        window.open("http://www.tradevv.com/product-s/" + KeyProduct + ".html");
    }
}
/*搜索产品*/
/*收藏文件夹*/
function MYAddFavorite() {
    try { window.external.addFavorite(window.location, document.title); }
    catch (e) {
        try { window.sidebar.addPanel(document.title, window.location, ""); } catch (e) {
            alert("The failure, please use Ctrl+D to add");
        }
    }
}
/*收藏文件夹*/
$(document).ready(function () {
    if ($("#thisSeoMemberGuid")[0] != undefined && $("#thisSeoUseLanguage")[0] != undefined) {
        var ImportUrl = window.encodeURIComponent(document.referrer);
        var ThisPageUrl = window.encodeURIComponent(location.href);
        var MemberGuid = $("#thisSeoMemberGuid").val();
        var UseLanguage = $("#thisSeoUseLanguage").val();
        if (ImportUrl != ThisPageUrl) {
            var html = "<iframe width=\"0\"\
              height=\"0\" frameborder=\"0\" scrolling=\"no\"\
              src=\"http://log.tradevv.com/WriteAccess.aspx?ImportUrl=" + ImportUrl + "&ThisPageUrl=" + ThisPageUrl + "&MemberGuid=" + MemberGuid + "&UseLanguage=" + UseLanguage + "&ScreenWidth=" + screen.width + "&ScreenHeight=" + screen.height + "&math=" + Math.random() + "\"\
              vspace=\"0\" hspace=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>";
            $("body").append(html); //http://log.tradevv.com
        }
    }
});