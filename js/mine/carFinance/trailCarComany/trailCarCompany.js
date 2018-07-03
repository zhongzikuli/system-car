//刪除
function deleteBank() {
    var ck = $("input[name='bank_input']:checked");
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
        confirmDialog("确认删除选中的信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/trailCarCompany/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/trailCarCompany/query.action?";
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

//新增
function createBank() {
    var options = {
        width: 500,
        top: 200,
        height: 250,
        overlay: true,
        dispose: true,
        move: true,
        title: '银行管理',
        callback: function () {
            var flag = false;
                var param = {};
                param.name = $("#name").val();
                param.address = $("#address").val();
                param.tel = $("#tel").val();
                if ($("#bankForm").valid("bankForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/trailCarCompany/create.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/trailCarCompany/query.action";
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
    creatDlg = new Dialog("#bank-dialog", options);
    creatDlg.show();
}

//编辑
function editInfo(id) {
    var options = {
        width: 500,
        top: 200,
        height: 250,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        onBeforeShow: function () {
            $.ajax({
                url: ctx + "/trailCarCompany/getById.action",
                type: "post",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        var bank = data.rows;
                        $("#name_edit").val(bank.name);
                        $("#address_edit").val(bank.address);
                        $("#tel_edit").val(bank.tel);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        },
        callback: function () {
                var param = {};
                param.id = id;
                 param.name = $("#name_edit").val();
                 param.address = $("#address_edit").val();
                 param.tel = $("#tel_edit").val();
                if ($("#bankForm_edit").valid("bankForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/trailCarCompany/update.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/trailCarCompany/query.action";
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
    var editAdvDlg = new Dialog("#bankEdit-dialog", options);
    editAdvDlg.show();
}




//表单校验
function bankForm(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "name") {
                $(lableId).attr('tip', '拖车单位为空请重新输入。');
                return "faild";
            }else if  ($(lableId).attr("id") == "address") {
                $(lableId).attr('tip', '拖车单位地址为空请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "tel") {
                $(lableId).attr('tip', '单位电话为空请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "name_edit") {
                $(lableId).attr('tip', '拖车单位为空请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "address_edit") {
                $(lableId).attr('tip', '拖车单位地址为空请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "tel_edit") {
                $(lableId).attr('tip', '单位电话为空请重新输入。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}




