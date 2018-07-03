jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });

    var establishTime = {
        elem: '#establishTime',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        choose: function (datas) {

        },
        clear: function () {

        }
    };
    laydate(establishTime);

    var protocolTime = {
        elem: '#protocolTime',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        choose: function (datas) {

        },
        clear: function () {

        }
    };
    laydate(protocolTime);

    new ValidateWin("#dealerManage-Form", {
        callback: function (content, event) {
            loadingShow();
            $.ajax({
                url: ctx + "/dealerManage/add.action",
                type: "post",
                data: $("#dealerManageForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        loadingHide();
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/dealerManage/query.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    });

    var dealername_back = $("#dealername_back").val;
    var departmentId_back = $("#departmentId_back").val;
    new ValidateWin("#Edit_DealerManageForm", {
        callback: function (content, event) {
            loadingShow();
            $.ajax({
                url: ctx + "/dealerManage/update.action",
                type: "post",
                data: $("#EditDealerManageForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        loadingHide();
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/dealerManage/query.action?";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    });

    //select用插件chosen.jquery
    var config = {
        disable_search_threshold: 10,
        no_results_text			: '无数据',
        allow_single_deselect	: true,
        width					:'100%'
    };
    $("#companyNature").chosen(config);
    $("#placeNature").chosen(config);
    $("#placeNatureEdit").chosen(config);
    $("#business_type").chosen(config);
    $("#business_type_edit").chosen(config);
    $("#proxy_method").chosen(config);
    $("#proxy_method_edit").chosen(config);
    $("#maintenance_factory").chosen(config);
    $("#maintenance_factory_edit").chosen(config);
    $("#teamworkTime").chosen(config);
    $("#teamworkTime_edit").chosen(config);
    $("#protocolSign").chosen(config);
    $("#protocolSign_edit").chosen(config);
    $("#full_time").chosen(config);
    $("#full_time_edit").chosen(config);
    $("#dealer_type").chosen(config);
    $("#dealer_type_edit").chosen(config);

    $(".departmentId").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($(".departmentId").parent(), "remove");
            $("#vtip").hide();
        } else {
            change_error_style($(".departmentId").parent(), "add");
        }
    });
    $(".dealerLevel").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($(".dealerLevel").parent(), "remove");
            $("#vtip").hide();
        } else {
            change_error_style($(".dealerLevel").parent(), "add");
        }
    });

    $("#newCarMarginRate").on('change',function () {
        if(!(/^\d+(\.\d+)?$/).exec($(this).val())){
            change_error_style($(this), "add");
            $(this).attr("tip"," 新车保证金比例格式不对")
        }else {
            change_error_style($(this), "remove");
			$(this).removeAttr("tip")
        }
    });

    $("#oldCarMarginRate").on('change',function () {
        if(!(/^\d+(\.\d+)?$/).exec($(this).val())){
            change_error_style($(this), "add");
            $(this).attr("tip"," 二手车保证金比例格式不对")
        }else {
            change_error_style($(this), "remove");
			$(this).removeAttr("tip")
        }
    });
})


//表单校验
function validDealerManage(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $.trim($(lableId).val()) == "") {
            if ($(lableId).attr("id") == "dealer_name" ||
                $(lableId).attr("id") == "dealer_name_edit") {
                $(lableId).attr('tip', '经销商名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "tel" ||
                $(lableId).attr("id") == "tel_edit") {
                $(lableId).attr('tip', '单位电话为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bankAccount" ||
                $(lableId).attr("id") == "bank_account_edit") {
                $(lableId).attr('tip', '银行账号为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bank" ||
                $(lableId).attr("id") == "bank_edit") {
                $(lableId).attr('tip', '银行为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("class") == "form-control departmentId" ) {
                $(lableId).parent().attr('tip', '部门不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("class") == "form-control dealerLevel") {
                $(lableId).parent().attr('tip', '合作等级不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("id") == "bankAccountName" ||
                $(lableId).attr("id") == "bank_account_name_edit") {
                $(lableId).attr('tip', '银行账号为空，请重新输入。');
                return "faild";
                return "success";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "dealer_name" ||
                $(lableId).attr("id") == "dealer_name_edit") {
                if (!(/^.{1,50}$/).exec(_this.val())) {
                    $(lableId).attr('tip', '姓名长度不超过50个字符。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "tel" ||
                $(lableId).attr("id") == "tel_edit") {
                if (!(/^0\d{2,3}-\d{7,8}$/).exec(_this.val())) {
                    $(lableId).attr('tip', '单位电话格式错误（区号+座机电话号码）。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "bankAccount" ||
                $(lableId).attr("id") == "bank_account_edit") {
                if (!(/^([1-9]{1})(\d{14}|\d{18})$/).exec(_this.val())) {
                    $(lableId).attr('tip', '银行账号格式错误。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "bank" ||
                $(lableId).attr("id") == "bank_edit") {
                if ((/^[A-Za-z0-9]+$/).exec(_this.val())) {
                    $(lableId).attr('tip', '银行名称不能有数字或英文。');
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }
        return "success";
    }
}
