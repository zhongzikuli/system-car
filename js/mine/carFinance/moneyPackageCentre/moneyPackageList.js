jQuery(function ($) {
    $(".addInfo").on("click",function(){
        addInfo();
    });

    //查看
    $(".detail").on("click",function(){
        var id=$(this).attr("data-id");
        detail(id);
    });

    //编辑
    $(".editInfo").on("click",function(){
        var id=$(this).attr("data-id");
        editInfo(id);
    });

    //刷新按钮
    $(".refresh-btn").on("click", function(){
        window.location.href=ctx+'/moneyPackage/query.action';
    });

    $(".detailInfo").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataHref = ctx + "/cfMoneyPackageDetail/detailList.action?id=" + acceptId;
        openTabForParent(dataHref, "-money-package-detail-" + acceptId, "资产包明细");
    });

    function detail(id){
        window.location.href=ctx + "/moneyPackage/detail.action?id=" + id;
    }

    function editInfo(id){
        var options = {
            width: 500,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            url: "",
            onBeforeShow: function () {
                getOption("cfMoneyUnitId_edit");
            },
            onAfterShow: function () {
                var sTimeEdit = {
                    elem: '#sTime_edit',
                    format: 'YYYY-MM-DD', //日期格式
                    max: laydate.now(),
                    istoday: false, //显示今天
                    issure: false, //确定框
                    isclear: true, //是否显示清空
                    choose: function (datas) {
                        if ("" != datas) {
                            change_error_style($("#sTime_edit"), "remove");
                            creatDlg.isSubmit = true;
                            eTimeEdit.min = datas; //开始日选好后，重置结束日的最小日期
                            eTimeEdit.start = datas //将结束日的初始值设定为开始日
                        } else {
                            change_error_style($("#sTime_edit"), "add");
                            creatDlg.isSubmit = false;
                        }
                    },
                    clear: function () {
                        eTimeEdit.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
                        eTimeEdit.start = laydate.now(); //将结束日的初始值设定为开始日
                    }
                };
                var eTimeEdit = {
                    elem: '#eTime_edit',
                    format: 'YYYY-MM-DD', //日期格式
                    istoday: false, //显示今天
                    issure: false, //确定框
                    isclear: true, //是否显示清空
                    choose: function (datas) {
                        if ("" != datas) {
                            change_error_style($("#eTime_edit"), "remove");
                            editDlg.isSubmit = true;
                            sTimeEdit.max = datas; //结束日选好后，重置开始日的最大日期
                        } else {
                            change_error_style($("#eTime_edit"), "add");
                            editDlg.isSubmit = false;
                        }
                    },
                    clear: function () {
                        sTimeEdit.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
                        sTimeEdit.max = laydate.now(); //将开始日的最大值设定为今天
                    }
                };
                laydate(sTimeEdit);
                laydate(eTimeEdit);
                $("body").click(function(){
                    try {
                        laydate.getDefault().close();
                    } catch (e) {

                    }
                });
                $.ajax({
                    url: ctx + "/moneyPackage/toEdit.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var info = data.rows;
                            $("#moneyNo_edit").attr("param", "id=" + info.id);
                            $("#name_edit").attr("param", "id=" + info.id);
                            $("#moneyNo_edit").val(info.moneyNo);
                            $("#name_edit").val(info.name);
                            $("#initMoney_edit").val(info.initMoney);
                            $("#cfMoneyUnitId_edit").val(info.cfMoneyUnitId).trigger('chosen:updated');
                            $("#sTime_edit").val(info.beginDate);
                            $("#eTime_edit").val(info.endDate);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                        //下拉框初始化
                        var config = {
                            disable_search_threshold:10,
                            no_results_text: '无数据',
                            width:"100%"
                        };
                        //下拉框
                        $(" #cfMoneyUnitId_edit").chosen(config);
                        $(" #cfMoneyUnitId_edit").on('change', function(e, selected) {
                            if("" != selected){
                                change_error_style($("#cfMoneyUnitId_edit").parent(),"remove");
                            }else{
                                change_error_style($("#cfMoneyUnitId_edit").parent(), "add");
                            }
                        });
                    }
                });
                $("#name_edit").blur(function(){
                    $.ajax({
                        url: ctx + "/moneyPackage/isRepetition.action",
                        type: "post",
                        data: {name:$("#name_edit").val()},
                        dataType: "json",
                        success: function (data) {
                            if (data.error == -1) {
                                faildMsg(data.message);
                            }
                        }
                    });
                });
            },
            onAfterHide: function () {
                $("body").find("#laydate_box").hide();
            },
            callback: function () {
                var flag = false;
                var param = {};
                param.id=id;
                param.moneyNo = $("#moneyNo_edit").val();
                param.name = $("#name_edit").val();
                param.initMoney = $("#initMoney_edit").val();
                param.cfMoneyUnitId = $("#cfMoneyUnitId_edit").val();
                param.beginDate = $("#sTime_edit").val();
                param.endDate = $("#eTime_edit").val();
                if ($("#moneyPackage_edit").valid("moneyPackage_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/moneyPackage/update.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/moneyPackage/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        var editDlg = new Dialog("#moneyPackageEdit-dialog", options);
        editDlg.show();
    }

    function getOption(id) {
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        };
        $.ajax({
            url: ctx + "/moneyPackage/getcfMoneyUnit.action",
            type: "post",
            dataType: "json",
            success: function (data) {
                var option = "";
                option += "<option value=''>请选择</option>";
                for (var i = 0; i < data.rows.length; i++) {
                    option += "<option value='" + data.rows[i].id + "'>" + data.rows[i].name + "</option>";
                }
                $("#" + id).append(option);
                $("#" + id).trigger("chosen:updated");

                //下拉框
                $("#" + id).chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#" + id).parent(), "remove");
                    } else {
                        change_error_style($("#" + id).parent(), "add");
                    }
                });
            }
        });
    }

    function addInfo() {
        var options = {
            width: 500,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            title: '资产包管理',
            onBeforeShow: function () {
                getOption("cfMoneyUnitId");
            },
            onAfterShow: function () {
                var sTimeCreat = {
                    elem: '#sTime_create',
                    format: 'YYYY-MM-DD', //日期格式
                    max: laydate.now(),
                    istoday: false, //显示今天
                    issure: false, //确定框
                    isclear: true, //是否显示清空
                    choose: function (datas) {
                        if ("" != datas) {
                            change_error_style($("#sTime_create"), "remove");
                            creatDlg.isSubmit = true;
                            eTimeCreat.min = datas; //开始日选好后，重置结束日的最小日期
                            eTimeCreat.start = datas //将结束日的初始值设定为开始日
                        } else {
                            change_error_style($("#sTime_create"), "add");
                            creatDlg.isSubmit = false;
                        }
                    },
                    clear: function () {
                        eTimeCreat.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
                        eTimeCreat.start = laydate.now(); //将结束日的初始值设定为开始日
                    }
                };
                var eTimeCreat = {
                    elem: '#eTime_create',
                    format: 'YYYY-MM-DD', //日期格式
                    istoday: false, //显示今天
                    issure: false, //确定框
                    isclear: true, //是否显示清空
                    choose: function (datas) {
                        if ("" != datas) {
                            change_error_style($("#eTime_create"), "remove");
                            creatDlg.isSubmit = true;
                            sTimeCreat.max = datas; //结束日选好后，重置开始日的最大日期
                        } else {
                            change_error_style($("#eTime_create"), "add");
                            creatDlg.isSubmit = false;
                        }
                    },
                    clear: function () {
                        sTimeCreat.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
                        sTimeCreat.max = laydate.now(); //将开始日的最大值设定为今天
                    }
                };
                laydate(sTimeCreat);
                laydate(eTimeCreat);
                $("body").click(function(){
                    try {
                        laydate.getDefault().close();
                    } catch (e) {

                    }
                });
            },
            onAfterHide: function () {
                $("body").find("#laydate_box").hide();
            },
            callback: function () {
                var flag = false;
                var param = {};
                param.moneyNo = $("#moneyNo").val();
                param.name = $("#name").val();
                param.initMoney = $("#initMoney").val();
                param.cfMoneyUnitId = $("#cfMoneyUnitId").val();
                param.beginDate = $("#sTime_create").val();
                param.endDate = $("#eTime_create").val();
                if ($("#moneyPackageForm").valid("moneyPackageForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/moneyPackage/addInfo.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/moneyPackage/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                }else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#moneyPackageCreate-dialog", options);

        var config1 = {
            disable_search_threshold:10,
            no_results_text: '无数据',
            width:"100%"
        };
        $("#isAuto_create").chosen(config1);

        creatDlg.show();
    }



})

//表单校验
function moneyPackageValid(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "name" || $(lableId).attr("id") == "name_edit") {
                $(lableId).attr('tip', '资产包名称为空，请重新输入。');
                return "faild";
            }else if  ($(lableId).attr("id") == "initMoney" || $(lableId).attr("id") == "initMoney_edit") {
                $(lableId).attr('tip', '资产包金额为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "sTime_create" || $(lableId).attr("id") == "sTime_edit") {
                $(lableId).attr('tip', '开始时间为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "eTime_create" || $(lableId).attr("id") == "eTime_edit") {
                $(lableId).attr('tip', '结束时间为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "cfMoneyUnitId" ||
                $(lableId).attr("id") == "cfMoneyUnitId_edit") {
                $(lableId).parent().attr('tip', '资金方名称不能为空。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "initMoney" || $(lableId).attr("id") == "initMoney_edit") {
                if (!(/^[0-9]*$/).exec(_this.val())) {
                    $(lableId).attr('tip', '资产包名称只能输入数字');
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