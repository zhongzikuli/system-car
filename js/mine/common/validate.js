var vtip_arrow_path = ctx + "/styles/images/vtip_arrow.png";
//提示框显示时间
var SHOW_TIME = 0;
//隐藏所用的时间
var HIDE_TIME = 0;
//常用form验证正则
var email = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
var int = "^-?\\d+$";
var float = "^(-?\\d+)(\\.\\d+)?$";
var string = "^[a-zA-Z0-9_]+$";
var url = "^(http|https|ftp)\\://[a-zA-Z0-9\\-\\.]+\\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\\-\\._\\?\\,\\'/\\\\+&%\$#\\=~])*$";
var not_null = "\.+";
var _null = "\\n[\\s| ]*\\r";
var letter = "^\\w+$";
var letter_or_int = "^[A-Za-z0-9]+$";
var china = "[\\u4e00-\\u9fa5]+";
var china_english = "^[a-zA-Z\\u4e00-\\u9fa5]+$";
var html = "<(.*)>.*<\/.+>|<(.*) \/>";
var trim = "(^\\s*)|(\\s*$)";
var phone11 = "^[1]{1}[3,4,5,6,7,8,9]{1}[0-9]{9}$";//十一位手机号码
var idCard = "^[0-9]{15}$|^[0-9]{17}([0-9]{1}|X|x)$";	//15到18位身份证
var vin_reg = "^(?=.*[0-9].*)(?=.*[A-Z].*).{17}$";

$('body').append('<p id="vtip" style="display:none;"><img id="vtipArrow" src="' + vtip_arrow_path + '"/><a></a></p>');

function validate(obj) {
    var validata = obj.attr("obj");
    if (validata == null || validata == "undefined") {
        validata = obj.attr("reg");
    }
    var tipMsg = "";
    switch (validata) {
        case 'email':
            validata = email;
            tipMsg = "请输入正确的Email";
            break;
        case 'string':
            validata = string;
            break;
        case 'int':
            validata = int;
            tipMsg = "请输入整型数据";
            break;
        case 'float':
            tipMsg = "请输入有效数据";
            validata = float;
            break;
        case 'url':
            tipMsg = "请输入正确的url";
            validata = url;
            break;
        case 'not_null':
            tipMsg = "不能为空，请重新输入";
            validata = not_null;
            break;
        case 'null':
            validata = _null;
            break;
        case 'letter':
            validata = letter;
            break;
        case 'letter+int':
            validata = letter_or_int;
            break;
        case 'china':
            validata = china;
            break;
        case 'china_english':
            validata = china_english;
            break;
        case 'html':
            validata = html;
            break;
        case 'phone11':
            tipMsg = "请输入正确的手机号码";
            validata = phone11;
            break;
        case 'idCard':
            tipMsg = "请输入正确的身份证号码";
            validata = idCard;
            break;
        default:
            break;
    }
    //第七页添加结束
    var reg = new RegExp(validata);
    var objValue = $.trim(obj.val());
    if (!reg.test(objValue)) {
        change_error_style(obj, "add");
        change_tip(obj, ("" != tipMsg ? tipMsg : null), "add");
        return false;
    } else {
        if (obj.attr("url") == undefined) {
            change_error_style(obj, "remove");
            change_tip(obj, null, "remove");
            return true;
        } else {
            return ajax_validate(obj);
        }
    }
}

function ajax_validate(obj) {
    var url_str = obj.attr("url");

    if (!url_str) {
        return false;
    }

    var param = "";
    if (typeof(obj.attr("param")) != "undefined" && "" != obj.attr("param") && null != obj.attr("param")) {
        param = obj.attr("param");
    }
    if (url_str.indexOf("?") != -1) {
        url_str = url_str + "&" + ("" != param ? param + "&" : "") + obj.attr("name") + "=" + obj.val();
    } else {
        url_str = url_str + "?" + ("" != param ? param + "&" : "") + obj.attr("name") + "=" + obj.val();
    }
    var feed_back = $.ajax({url: url_str, cache: false, async: false}).responseText;
    feed_back = feed_back.replace(/(^\s*)|(\s*$)/g, "");
    if (feed_back == 'success') {
        change_error_style(obj, "remove");
        change_tip(obj, null, "remove");
        return true;
    } else {
        change_error_style(obj, "add");
        change_tip(obj, feed_back, "add");
        return false;
    }
}

function change_tip(obj, msg, action_type) {

    if (obj.attr("tip") == undefined) {//初始化判断TIP是否为空
        obj.attr("is_tip_null", "yes");
    }
    if (action_type == "add") {
        if (obj.attr("is_tip_null") == "yes") {
            obj.attr("tip", msg);
        } else {
            if (msg != null) {
                if (obj.attr("tip_bak") == undefined) {
                    obj.attr("tip_bak", obj.attr("tip"));
                }
                obj.attr("tip", msg);
            }
        }
    } else {
        if (obj.attr("is_tip_null") == "yes") {
            obj.removeAttr("tip");
            obj.removeAttr("tip_bak");
        } else {
            obj.attr("tip", obj.attr("tip_bak"));
            obj.removeAttr("tip_bak");
        }
    }
}

function change_error_style(obj, action_type) {
    if (action_type == "add") {
        obj.addClass("input_validation-failed");
    } else {
        obj.removeClass("input_validation-failed");
    }
}

$.fn.validate_callback = function (msg, action_type, options) {
    this.each(function () {
        if (action_type == "failed") {
            change_error_style($(this), "add");
            change_tip($(this), msg, "add");
        } else {
            change_error_style($(this), "remove");
            change_tip($(this), null, "remove");
        }
    });
};


function validateLength100Bak(_this) {
    var bak = $(_this).val();
    if (!bakLimitLength100(bak)) {
        $(_this).attr("tip", "长度不能超过100个字符 ");
        return "faild";
    } else {
        return "success";
    }
}
function bakLimitLength100(value) {
    return value.length <= 100;
}
