$(document).ready(function () {

    var start = {
        elem: '#sTime',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            end.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#eTime',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            start.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(start);
    laydate(end);

    //select用插件chosen.jquery
    var config = {
        disable_search_threshold: 10,
        no_results_text			: '无数据',
        allow_single_deselect	: true,
        width					:'100%'
    };
    $("#search-select").chosen(config);
});

//刪除面签权限信息
function deleteinterviewPermission(permissionStatus,videoKey,beginTime,endTime) {
    var ck = $("input[name='interviewPermission_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要删除的记录。");
        return
    } else {
        var idArr = new Array();
        var userIsvalid = true;
        $(ck).each(function () {
            idArr.push($(this).val());
            if ($(this).attr("isvalid") == "0") {
                userIsvalid = false;
            }
        });
        if (!userIsvalid) {
            alertDialog("所选信息包含无效账户，不允许删除");
            return false;
        }
        confirmDialog("确认删除选中的面签授权信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/interviewPermission/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        loadingHide();
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/interviewPermission/query.action?AppKey="+videoKey+"&permissionStatus="+permissionStatus+"&sTime="+beginTime+"&eTime="+endTime;
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        })
    }
}

//创建一条面签权限信息
function createInterviewPermission() {
    var options = {
        width: 500,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '创建',
        url: "",
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
                max: laydate.now(),
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
            $.ajax({
                url: ctx + "/interviewPermission/getVideoKey.action",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    $("#Appkey_create").val(data.rows)
                }
            });
            $.ajax({
                url: ctx + "/interviewPermission/getSecurity.action",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    $("#Security_create").val(data.rows)
                }
            });
        },
        onAfterHide: function () {
            $("body").find("#laydate_box").hide();
        },
        callback: function () {
            var flag = false;
            if ($("#interviewPermissionForm").valid("interviewPermissionForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/interviewPermission/create.action",
                    type: "post",
                    data: {
                        videoKey: $("#Appkey_create").val(),
                        videoSecurity: $.trim($("#Security_create").val()),
                        beginTime: $("#sTime_create").val(),
                        endTime: $("#eTime_create").val(),
                        permissionStatus: $("#permission_status_create").val(),
                        name: $.trim($("#name_create").val())
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            loadingHide();
                            flag = false;
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/interviewPermission/query.action";
                            });
                        } else if (data.error == -100) {
                            flag = true;
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            flag = true;
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
    creatDlg = new Dialog("#interviewPermission-dialog", options);

    //下拉框初始化
    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"100%"
    };
    //下拉框
    $(".permission_status_create").chosen(config);
    $(".permission_status_create").on('change', function(e, selected) {
        if("" != selected){
            change_error_style($(".permission_status_create").parent(),"remove");
        }else{
            change_error_style($(".permission_status_create").parent(), "add");
        }
    });

    creatDlg.show();
}

//修改面签权限信息
function editinterviewPermission(id,permissionStatus,videoKey,beginTime,endTime,videoKey1,permissionStatus1,beginTime1,endTime1) {
    var options = {
        width: 500,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        url: "",
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
                max: laydate.now(),
                istoday: false, //显示今天
                issure: false, //确定框
                isclear: true, //是否显示清空
                choose: function (datas) {
                    if ("" != datas) {
                        change_error_style($("#eTime_edit"), "remove");
                        creatDlg.isSubmit = true;
                        sTimeEdit.max = datas; //结束日选好后，重置开始日的最大日期
                    } else {
                        change_error_style($("#eTime_edit"), "add");
                        creatDlg.isSubmit = false;
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

            $("#create_Security").click(function () {
                $.ajax({
                    url: ctx + "/interviewPermission/getSecurity.action",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        $("#Security_edit").val(data.rows);
                    }
                });
            });
            $.ajax({
                url: ctx + "/interviewPermission/preUpdate.action",
                type: "post",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        var info = data.rows;
                        $("#Appkey_edit").val(info.videoKey);
                        $("#Security_edit").val(info.videoSecurity);
                        $("#permission_status_edit").val(info.permissionStatus);
                        $("#sTime_edit").val(info.beginTime);
                        $("#eTime_edit").val(info.endTime);
                        $("#name_edit").val(info.name);
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
                    $(".permission_status_edit").chosen(config);
                    $(".permission_status_edit").on('change', function(e, selected) {
                        if("" != selected){
                            change_error_style($(".permission_status_edit").parent(),"remove");
                        }else{
                            change_error_style($(".permission_status_edit").parent(), "add");
                        }
                    });
                }
            });
        },
        onAfterHide: function () {
            $("body").find("#laydate_box").hide();
        },
        callback: function () {
            var flag = false;
            if ($("#interviewPermissionForm_edit").valid("interviewPermissionForm_edit")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/interviewPermission/update.action",
                    type: "post",
                    data: {
                        "id": id,
                        "name": $.trim($("#name_edit").val()),
                        "videoKey": $.trim($("#Appkey_edit").val()),
                        "videoSecurity": $.trim($("#Security_edit").val()),
                        "beginTime": $("#sTime_edit").val(),
                        "endTime": $("#eTime_edit").val(),
                        "permissionStatus": $.trim($("#permission_status_edit").val())
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            loadingHide();
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/interviewPermission/query.action?AppKey="+videoKey1+"&permissionStatus="+permissionStatus1+"&sTime="+beginTime1+"&eTime="+endTime1;
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
    var editDlg = new Dialog("#interviewPermission-dialog_edit", options);
    editDlg.show();
}

//点击时间状态从停止变成开始
function stop(id,permissionStatus,videoKey,beginTime,endTime) {
    $("#start" + id).hide();
    $("#stop" + id).show();
    loadingShow();
    $.ajax({
        url: ctx + "/interviewPermission/updatePermissionStatus.action?",
        type: "post",
        data: {
            "id": id,
            "permissionStatus": 1
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/interviewPermission/query.action?AppKey="+videoKey+"&permissionStatus="+permissionStatus+"&sTime="+beginTime+"&eTime="+endTime;
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//点击事件状态从开始变成停止
function start(id,permissionStatus,videoKey,beginTime,endTime) {
    $("#start" + id).show();
    $("#stop" + id).hide();
    loadingShow();
    $.ajax({
        url: ctx + "/interviewPermission/updatePermissionStatus.action?",
        type: "post",
        data: {
            "id": id,
            "permissionStatus": 0
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/interviewPermission/query.action?AppKey="+videoKey+"&permissionStatus="+permissionStatus+"&sTime="+beginTime+"&eTime="+endTime;
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//查看详细面签权限信息
function detailInfo(name, videoKey, videoSecurity, beginTime, endTime) {
    var options = {
        width: 500,
        top: 200,
        height: 350,
        overlay: true,
        dispose: true,
        move: true,
        title: '查看详细信息',
        onBeforeShow: function () {
            $("#name_detail").val(name);
            $("#Appkey_detail").val(videoKey);
            $("#Security_detail").val(videoSecurity);
            $("#sTime_detail").val(beginTime);
            $("#eTime_detail").val(endTime);
        },
        callback: function () {

        }
    };
    var detailDlg = new Dialog("#interviewPermission-dialog_detail", options);
    detailDlg.show();
}

//表单校验
function interviewPermissionForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "name_create") {
                $(lableId).attr('tip', '名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "permission_status_create" ||
                $(lableId).attr("id") == "permission_status_edit") {
                $(lableId).parent().attr('tip', '状态不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "sTime_edit" ||
                $(lableId).attr("id") == "sTime_create") {
                $(lableId).attr('tip', '开始日期不能为空。');
                return "faild";
            }
            else if ($(lableId).attr("id") == "eTime_create" ||
                $(lableId).attr("id") == "eTime_edit") {
                $(lableId).attr('tip', '结束日期不能为空。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}
