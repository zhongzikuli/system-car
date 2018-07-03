$(function () {
    getReportInfo();
    //添加报表名
    $(".add-btn").on("click", function () {
        reportInfoFormSave();
    });
    //删除报表名
    $(".delete-btn").on("click", function () {
        deleteReportInfo();
    });

    //添加报表关联字段
    $(".report-field-add-btn").on("click", function () {
        var reportInfoId = $(this).data("id");
        if (reportInfoId == '' || reportInfoId == undefined){
            alertDialog("请选择需要设计的报表");
            return;
        }
        reportFieldAdd(reportInfoId);
    });

    //删除报表关联字段
    $(".report-field-delete-btn").on('click',function () {
        var $has_checked = $("#reportFieldList .checkOne:checked");
        if ($has_checked.length == undefined || $has_checked.length == 0) {
            alertDialog("请选择要删除的报表关联行。");
            return;
        }
        var ids = new Array();
        $has_checked.each(function () {
            ids.push($(this).val());
        });
        var param = {};
        param.ids = ids.toString();
        $.ajax({
            url: ctx + "/reportManager/deleteReportField.action",
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    successMsg("操作成功！", 1000, function () {
                        window.location.reload();
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });


    });

    $(".table tr th .fa-caret-left").on("click", function () {
        $(".report-left").removeClass('border-r-3').addClass('width-0');
        $(".report-right").addClass('full-width').find('.bg-b .col-sm-4').html('<span class="fa fa-caret-right m-r-xs"></span><strong>报表基本结构</strong>');
        caretRight();
    });

    function caretRight() {
        $(".report-right .bg-b .fa-caret-right").on("click", function () {
            $(".report-right").removeClass('full-width').find('.bg-b .col-sm-4').html('<strong>报表基本结构</strong>');
            $(".report-left").removeClass('width-0').addClass('border-r-3');
        })
    }

    //添加报表关联字段
    function reportFieldAdd(reportInfoId) {
        var options = {
            width: 540,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '添加字段',
            url: "",
            onBeforeShow: function () {
                $(".chosen-select").chosen({
                    disable_search_threshold: 8,
                    no_results_text: "没有找到",
                    allow_single_deselect: true,
                    width: "100%"
                });
                $.ajax({
                    url: ctx + "/reportManager/reportField.action",
                    type: "post",
                    dataType: "json",
                    success: function (result) {
                        if (result.error == 1) {
                            var data = result.rows;
                            $.each(data, function (k, p) {
                                var option = "<option value='" + p.id + "'>" + p.nameZh + "</option>";
                                $("select[name='reportFieldId']").append(option);
                            });
                            $("select[name='reportFieldId']").trigger("chosen:updated");
                        } else if (result.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(result.message);
                        }
                    }
                });
            },
            callback: function () {
                if ($("#reportFieldAddForm").valid("reportFieldAddForm")) {
                    $("input[name='reportInfoId']").val(reportInfoId);
                    loadingShow();
                    $.ajax({
                        url: ctx + "/reportManager/addReportField.action",
                        type: "post",
                        data: $("#reportFieldAddForm").serialize(),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.reload();
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var dialog = new Dialog("#reportFieldAddForm-dialog", options);
        dialog.show();
    }

    //删除报表名
    function deleteReportInfo() {
        var $has_checked = $("#reportInfo .checkOne:checked");
        if ($has_checked.length == undefined || $has_checked.length == 0) {
            alertDialog("请选择要删除的报表。");
            return;
        }
        var ids = new Array();
        $has_checked.each(function () {
            ids.push($(this).val());
        });
        var param = {};
        param.ids = ids.toString();
        $.ajax({
            url: ctx + "/reportManager/deleteReportInfo.action",
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    successMsg("操作成功！", 1000, function () {
                        window.location.reload();
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getReportInfo() {
        $.ajax({
            url: ctx + "/reportManager/listReportInfo.action",
            type: "post",
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    loadDataToList(data);
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            },
            error: function () {
                $("#reportInfo .table tbody").html('<tr><td class="col-td" colspan="5" style="text-align: center">暂无数据</td></tr>');
            }
        });
    }

    function loadDataToList(data) {
        var tbody = "";
        $("#reportInfo .table tbody").html('');
        if (data == null) {
            tbody += '<tr><td class="col-td" colspan="5">暂无数据</td></tr>';
        } else {
            var $list = data.recordList;
            if ($list == null || $list == '' || $list.length == 0) {
                tbody += '<tr><td class="col-td"  colspan="5">暂无数据</td></tr>';
            } else {
                for (var j = 0; j < $list.length; j++) {
                    tbody += '<tr data-id="' + $list[j].id + '"><td><input type="checkbox" class="checkOne" value="' + $list[j].id + '"></td><td>' + $list[j].reportName + '</td>';
                    if ($list[j].reportStatus == 1) {
                        tbody += '<td>已发布</td>';
                    } else {
                        tbody += '<td>未发布</td>';
                    }
                    tbody += '<td>' + $list[j].userName + '</td>';
                    tbody += '<td>' + $list[j].ctimeStr + '</td></tr>';
                }
            }
        }
        $("#reportInfo .table tbody").append(tbody);
        initReportField();
    }

    function loadReportFieldDataToList(data) {
        var tbody = "";
        $("#reportFieldList .table tbody").html('');
        if (data == null || data.length == 0) {
            tbody += '<tr><td class="col-td" colspan="8">暂无数据</td></tr>';
        } else {
            $list = data;
            $("input[name='reportName']").val($list[0].reportName);
            for (var j = 0; j < $list.length; j++) {
                if ($list[j].columnName === '') {
                    continue;
                }
                tbody += '<tr class="no-border" data-id="' + $list[j].reportFieldId + '">' +
                    '<td><input type="checkbox" class="checkOne" value="' + $list[j].reportFieldRelationId + '">' +
                    '</td><td style="width:5%;">' + $list[j].orderNo + '</td>' +
                    '</td><td style="width:5%;">' + $list[j].nameZh + '</td>';
                if ($list[j].isShow == 1) {
                    tbody += '<td>显示</td>';
                } else {
                    tbody += '<td>不显示</td>';
                }
                tbody += '<td>' + $list[j].searchConditionKeyword + '</td>';
                if ($list[j].searchCondition == 1) {
                    tbody += '<td>是</td>';
                } else {
                    tbody += '<td>否</td>';
                }
                tbody += '<td>' + $list[j].columnTypeName + '</td>' +
                    '<td><a title="编辑" class="btn btn-primary btn-xs" onclick="reportFieldEdit(' + $list[j].reportFieldId + ',' + $list[j].reportInfoId + ')">编辑</a></td></tr>';
            }
        }
        $("#reportFieldList .table tbody").append(tbody);
    }

    function initReportField() {
        $("#reportInfo .table tbody tr td:gt(0)").dblclick(function () {
            var id = $(this).parent().data("id");
            $("#reportField .save-btn").attr("data-id", id);
            $("#reportField .submit-btn").attr("data-id", id);
            $("#reportField .report-field-add-btn").attr("data-id", id);
            $("#reportField .report-field-delete-btn").attr("data-id", id);
            $("#reportField .report-info-role-btn").attr("data-id", id);
            loadingShow();
            $.ajax({
                url: ctx + "/reportManager/listReportField.action",
                type: "get",
                data: {id: id},
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        loadReportFieldDataToList(data.rows);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        });
    }

    function reportInfoFormSave() {
        var options = {
            width: 400,
            top: 250,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            url: "",
            onBeforeShow: function () {
            	 $(".chosen-select").chosen({
                     disable_search_threshold: 8,
                     no_results_text: "没有找到",
                     allow_single_deselect: true,
                     width: "100%"
                 });
            },
            callback: function () {
                if ($("#reportInfoForm").valid("reportInfoForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/reportManager/saveReportInfo.action",
                        type: "post",
                        data: $("#reportInfoForm").serialize(),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.reload();
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var dialog = new Dialog("#reportInfoForm-dialog", options);
        dialog.show();
    }

    //编辑报表字段
    $(".btn-submit").on("click", function () {
        var validate = new ValidateWin("#reportFieldEditForm", {});
        validate.mySubmit(validate);
        if (validate.isSubmit) {
            loadingShow();
            $.ajax({
                url: ctx + "/reportManager/editReportField.action",
                type: "post",
                data: $("#reportFieldEditForm").serialize(),
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            parent.window.location.href = ctx + "/reportManager.action";
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

    $(".dialog-close").on("click", function () {
        parent.$(".dialog-container").hide();
        parent.$(".dialog-overlay").hide();
        parent.parent.$(".dialog-overlay-left").hide();
        parent.parent.$(".dialog-nav-top").hide();
    });

    //保存报表
    $(".save-btn").on("click", function () {
        var validate = new ValidateWin("#reportNameForm", {});
        validate.mySubmit(validate);
        if (validate.isSubmit) {
            var reportName = $("input[name='reportName']").val();
            var id = $(this).data("id");
            if (id === '' || reportName === '') {
                return;
            }
            $.ajax({
                url: ctx + "/reportManager/updateReportInfo.action",
                type: "post",
                data: {reportName: reportName, id: id},
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.reload();
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

    //确定发布
    $(".submit-btn").on("click", function () {
        var validate = new ValidateWin("#reportNameForm", {});
        validate.mySubmit(validate);
        if (validate.isSubmit) {
            var reportName = $("input[name='reportName']").val();
            var id = $(this).data("id");
            if (id === '' || reportName === '') {
                return;
            }
            $.ajax({
                url: ctx + "/reportManager/updateReportInfo.action",
                type: "post",
                data: {reportName: reportName, id: id, isSubmit: "submit"},
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.reload();
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

    $(".report-info-role-btn").on("click", function () {
        var id = $(this).data("id");
        reportRole(id);
    });

    $('body').on('click', '.add-all', function () {
        $('#rightValue').append($('#leftValue').html());
        $('#leftValue').html('');
    });
    $('body').on('click', '.remove-all', function () {
        $('#leftValue').append($('#rightValue').html());
        $('#rightValue').html('');
    });
    $('body').on('click', '.add-one', function () {
        var lvSelected = $('#leftValue option:selected');
        if (lvSelected.length > 0) {
            lvSelected.each(function () {
                $('#rightValue').append($(this).prop('outerHTML'));
                $(this).remove();
            });
        }
    });
    $('body').on('click', '.remove-one', function () {
        var lvSelected = $('#rightValue option:selected');
        if (lvSelected.length > 0) {
            lvSelected.each(function () {
                $('#leftValue').append($(this).prop('outerHTML'));
                $(this).remove();
            });
        }
    });


    //报表角色分配
    function reportRole(reportInfoId) {
        if (reportInfoId == '') {
            return false;
        }
        $.ajax({
            url: ctx + "/reportManager/queryRole.action",
            type: "post",
            data: {reportInfoId: reportInfoId},
            dataType: "json",
            success: function (data1) {
                if (data1.error == 1) {
                    var options = {
                        width: 600,
                        top: 200,
                        height: 340,
                        overlay: true,
                        dispose: true,
                        move: true,
                        title: '报表权限分配',
                        url: "",
                        callback: function () {
                            var roleIds = [];
                            var options = $('#rightValue option');

                            if (options.length > 0) {
                                options.each(function () {
                                    roleIds.push(this.value);
                                });
                            }
                            var param = {};
                            param.reportInfoId = reportInfoId;
                            param.roleIds = roleIds.join(",");
                            $.ajax({
                                url: ctx + "/reportManager/saveReportInfoRole.action",
                                type: "post",
                                data: param,
                                dataType: "json",
                                success: function (data2) {
                                    if (data2.error == 1) {
                                        successMsg("操作成功！", 1000, function () {
                                            refresh();
                                        });
                                    } else if (data2.error == -100) {
                                        faildMsg("会话超时，请重新登陆！");
                                    } else {
                                        faildMsg(data2.message);
                                    }
                                }
                            });
                        }
                    };
                    var editDlg = new Dialog("#fp-dialog", options);
                    editDlg.show();
                    var assigneds = data1.rows.assigned;
                    var unAssigneds = data1.rows.unAssigned;
                    var html1 = '';
                    $.each(assigneds, function (i, v) {
                        html1 += "<option  value='" + v.roleId + "'>" + v.roleName + "</option>";
                    });
                    $("#rightValue").html(html1);
                    html2 = '';
                    $.each(unAssigneds, function (i, v) {
                        html2 += "<option  value='" + v.roleId + "'>" + v.roleName + "</option>";
                    });
                    $("#leftValue").html(html2);
                } else if (data1.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data1.message);
                }
            }
        });
    }


});

function reportFieldEdit(fieldId, reportInfoId) {
    var options = {
        width: 430,
        top: 200,
        height: 460,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        url: ctx + "/reportManager/preEditReportField.action?fieldId=" + fieldId + "&reportInfoId=" + reportInfoId,
        onBeforeShow: function () {
            $(".chosen-select").chosen({
                disable_search_threshold: 8,
                no_results_text: "没有找到",
                allow_single_deselect: true,
                width: "100%"
            });
        },
        callback: function () {

        }
    };
    var dialog = new Dialog("#reportInfoForm-dialog", options);
    dialog.show();
}


function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == "" || $(lableId).val() == null) {
            if ($(lableId).attr("name") == "reportFieldId") {
                $(lableId).parent().attr('tip', '请输入正确的字段名。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("name") == "orderNo") {
                $(lableId).attr('tip', '请输入正确的排序。').addClass("input_validation-failed");
                return "faild";
            }
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            if ($(lableId).attr("name") == "orderNo") {
                if (!new RegExp("^\\d+$").test($(lableId).val())) {
                    $(lableId).attr('tip', '请输入整数。');
                    return "faild";
                }
            }
        }
        return "success";
    }
}