$(function () {
    //取消
    $(".dialog-close").on("click", function () {
        parent.$(".dialog-container").hide();
        parent.$(".dialog-overlay").hide();
        parent.parent.$(".dialog-overlay-left").hide();
        parent.parent.$(".dialog-nav-top").hide();
    });

    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    $(".btn-add").on("click",function () {
        addOne();
    });

    //删除
    $(".btn-delete").on("click",function () {
        deleted();
    });

    //编辑
    $(".edit-btn").on("click",function () {
        var id = $(this).data("id");
        edit(id);
    });
    
    $(".btn-submit").on("click",function () {
        var validate = new ValidateWin("#reportFieldEditForm", {});
        validate.mySubmit(validate);
        if (validate.isSubmit) {
            loadingShow();
            $.ajax({
                url: ctx + "/reportManager/update.action",
                type: "post",
                data: $("#reportFieldEditForm").serialize(),
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            parent.window.location.reload();
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
    
    function addOne() {
        var options = {
            width: 450,
            top: 200,
            height: 300,
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
                if ($("#reportForm").valid("reportForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/reportManager/save.action",
                        type: "post",
                        data: $("#reportForm").serialize(),
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
        var dialog = new Dialog("#save-dialog", options);

        $("#columnType").on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($("#columnType").parent(), "remove");
            } else {
                change_error_style($("#columnType").parent(), "add");
            }
        });
        dialog.show();
    }
});

//报表字段删除
function deleted() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要删除的报表字段。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    var param = {};
    param.ids = ids.toString();
    $.ajax({
        url: ctx + "/reportManager/delete.action",
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

function edit(id) {
    var options = {
        width: 440,
        top: 200,
        height: 340,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        url: ctx + "/reportManager/preEditField.action?id="+id,
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
    var dialog = new Dialog("#save-dialog", options);
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });
    dialog.show();
}

function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == "" || $(lableId).val() == null) {
            if ($(lableId).attr("name") == "columnName"){
                $(lableId).attr('tip', '请输入正确的字段名。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("name") == "nameZh"){
                $(lableId).attr('tip', '请输入正确的中文名。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("name") == "viewTableName"){
                $(lableId).attr('tip', '请输入正确的表名。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("name") == "columnType"){
                $(lableId).parent().attr('tip', '请输入正确的字段类型。').addClass("input_validation-failed");
                return "faild";
            }
        }
        /*if ($(lableId).val() != null && $(lableId).val() != "") {
            if ($(lableId).attr("name") == "nameZh") {
                if (!(/^[\u4E00-\u9FA5]+$/).exec($(lableId).val())) {
                    $(lableId).attr('tip', '只支持中文。');
                    return "faild";
                }
            }
        }*/
        return "success";
    }
}