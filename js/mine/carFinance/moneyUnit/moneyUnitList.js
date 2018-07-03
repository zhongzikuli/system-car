$(function(){
    //新增资金方
	
    $(".add-btn").on("click",function(){
    	createMoneyUnit();
    });
    
  //编辑资金方
    $(".edit-btn").on("click", function () {
        var id = $(this).data("id");
        editMoneyUnit(id);
    });


//新增资金方
function createMoneyUnit() {
    var options = {
        width: 500,
        top: 200,
        height: 300,
        overlay: true,
        dispose: true,
        move: true,
        title: '资金方新增',
        callback: function () {
            var flag = false;
                var param = {};
                param.name = $("#name").val();
                param.contactPerson = $("#contactPerson").val();
                param.tel = $("#tel").val();
                param.address = $("#address").val();
                if ($("#moneyUnitForm").valid("moneyUnitForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/moneyUnit/addMoneyUnit.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/moneyUnit/query.action";
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
    creatDlg = new Dialog("#moneyUnit-dialog", options);
    creatDlg.show();
}

//修改资金方
function editMoneyUnit(id) {
    var options = {
            width: 500,
            top: 200,
            height: 300,
            overlay: true,
            dispose: true,
            move: true,
            title: '资金方编辑',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/moneyUnit/toEdit.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var unit = data.rows;
                            $("#id").val(id);
                            $("#name").val(unit.name);
                            $("#contactPerson").val(unit.contactPerson);
                            $("#tel").val(unit.tel);
                            $("#address").val(unit.address);
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
                    param.name = $("#name").val();
                    param.contactPerson = $("#contactPerson").val();
                    param.tel = $("#tel").val();
                    param.address = $("#address").val();
                    if($("#editMoneyUnitForm").valid("editMoneyUnitForm")){
                        loadingShow();
                        $.ajax({
                            url: ctx + "/moneyUnit/update.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        window.location.href = ctx + "/moneyUnit/query.action";
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
        var editAdvDlg = new Dialog("#moneyUnitEdit-dialog", options);
        editAdvDlg.show();
}
//刷新按钮
$(".refresh-btn").on("click", function(){
	window.location.href = ctx + "/moneyUnit/query.action";
});

});
//表单校验
function moneyUnitForm(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "name") {
                $(lableId).attr('tip', '资金方名称不能为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}
function editStop(id) {
    $("#start" + id).hide();
    $("#stop" + id).show();
    loadingShow();
    $.ajax({
        url: ctx + "/moneyUnit/updateStatus.action",
        type: "post",
        data: {
            "id": id,
            "forbidden": 0
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/moneyUnit/query.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function editStart(id) {
    $("#start" + id).show();
    $("#stop" + id).hide();
    loadingShow();
    $.ajax({
        url: ctx + "/moneyUnit/updateStatus.action",
        type: "post",
        data: {
            "id": id,
            "forbidden": 1
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/moneyUnit/query.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}
