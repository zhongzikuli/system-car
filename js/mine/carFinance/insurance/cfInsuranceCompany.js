$(document).ready(function () {
	$(".add-btn").on("click",function(){
		createSysCfInsuranceCompany()
	})//新增
	
	$(".delete-btn").on("click",function(){
		deleteSysCfInsuranceCompany()
	})//删除
	
	$(".edit-btn").on("click",function(){
		var id = $(this).parent().siblings().find(".checkOne").val();
		editSysCfInsuranceCompany(id);
	})//编辑
	
    function createSysCfInsuranceCompany() {
        var options = {
            width: 550,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            callback: function () {
                loadingShow();
                var flag = false;
                if ($("#sysCfInsuranceCompanyForm").valid("sysCfInsuranceCompanyForm")) {
                    $.ajax({
                        url: ctx + "/cfInsuranceCompany/create.action",
                        type: "post",
                        data: {
                            serialNo: $("#serialNo_create").val(),
                            insuranceCompanyName: $.trim($("#insuranceCompanyName_create").val()),
                            shortName: $("#shortName_create").val(),
                            sortNo: $("#sortNo_create").val(),
                            remark: $("#remark_create").val(),
                        },
                        dataType: "json",

                        success: function (data) {
                            if (data.error == 1) {
                                loadingHide();
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfInsuranceCompany/query.action";
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
        creatDlg = new Dialog("#sysCfInsuranceCompany-dialog", options);
        creatDlg.show();
    }

    function deleteSysCfInsuranceCompany() {
        var ck = $("input[name='sysCfInsuranceCompany_input']:checked");
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
                    url: ctx + "/cfInsuranceCompany/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfInsuranceCompany/query.action";
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
    //编辑
    function editSysCfInsuranceCompany(id) {
        var options = {
            width: 550,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            url: "",
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/cfInsuranceCompany/preUpdate.action",
                    type: "post",
                    data: {id: id},
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var info = data.rows;
                            $("#serialNo_edit").val(info.serialNo);
                            $("#insuranceCompanyName_edit").val(info.insuranceCompanyName);
                            $("#shortName_edit").val(info.shortName);
                            $("#sortNo_edit").val(info.sortNo);
                            $("#remark_edit").val(info.remark);
                        }
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#sysCfInsuranceCompanyForm_edit").valid("sysCfInsuranceCompanyForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/cfInsuranceCompany/update.action",
                        type: "post",
                        data: {
                            "id": id,
                            "serialNo": $("#serialNo_edit").val(),
                            "insuranceCompanyName": $("#insuranceCompanyName_edit").val(),
                            "shortName": $.trim($("#shortName_edit").val()),
                            "sortNo": $("#sortNo_edit").val(),
                            "remark": $("#remark_edit").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfInsuranceCompany/query.action"
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
        }
        var editDlg = new Dialog("#sysCfInsuranceCompany-dialog_edit", options);
        editDlg.show();
    }
})

//查看
function detail(serialNo, insuranceCompanyName, shortName, remark, sortNo) {
	var options = {
			width: 550,
			top: 200,
			height: 400,
			overlay: true,
			dispose: true,
			move: true,
			title: '查看',
			callback: function () {
				
			}
	};
	var detailDlg = new Dialog("#sysCfInsuranceCompany-dialog_detail", options);
	detailDlg.show();
	$("#serialNo_detail").val(serialNo);
	$("#insuranceCompanyName_detail").val(insuranceCompanyName);
	$("#shortName_detail").val(shortName);
	$("#remark_detail").val(remark);
	$("#sortNo_detail").val(sortNo);
}

//表单校验
function sysCfInsuranceCompanyForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "insuranceCompanyName_create" ||
                $(lableId).attr("id") == "insuranceCompanyName_edit") {
                $(lableId).attr('tip', '名称不能为空。');
                return "faild";
            }
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "serialNo_create" ) {
                var name = $("#serialNo_create").val();
                if (!(/^[0-9]*$/).exec(name)) {
                    $(lableId).attr('tip', '保险公司编号只能输入数字。');
                    return "faild";
                }
            }
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "sortNo_create" ) {
                var name = $("#sortNo_create").val();
                if (!(/^[0-9]*$/).exec(name)) {
                    $(lableId).attr('tip', '排序只能输入数字。');
                    return "faild";
                }
            }
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "serialNo_edit" ) {
                var name = $("#serialNo_edit").val();
                if (!(/^[0-9]*$/).exec(name)) {
                    $(lableId).attr('tip', '保险公司编号只能输入数字。');
                    return "faild";
                }
            }
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "sortNo_edit" ) {
                var name = $("#sortNo_edit").val();
                if (!(/^[0-9]*$/).exec(name)) {
                    $(lableId).attr('tip', '排序只能输入数字。');
                    return "faild";
                }
            }
        }
        return "success";
    }
}
