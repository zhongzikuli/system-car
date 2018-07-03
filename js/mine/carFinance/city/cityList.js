$(function () {

    //刷新
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#keyword").val("");
        $("#sysSaleTel").val("");
        $("#sysSaleCompanyName").val("");
    });


    //删除
    $(".delete").on("click", function () {
        var id = $(this).attr("data-id");
        deleteInfo(id);
    });

    //新增
    $(".insert").on("click", function () {
        insertInfo()
    });

    //修改
    $(".edit").on("click", function () {
        var id = $(this).attr("data-id");
        editCityInfo(id);
    });

    //查看
    $(".detail").on("click", function () {
        var id = $(this).attr("data-id");
        detailCityInfo(id);
    });
    //启用
    $(".start").on("click",function(){
        var id=$(this).attr("data-id");
        start(id);
    });

    $(".stop").on("click",function(){
        var id=$(this).attr("data-id");
        stop(id);
    });

    //城市管理
    $(".city_manager").on("click", function () {
        var id = $(this).attr("data-id");
        window.location.href = ctx + "/city/getCityList.action"+"?id="+id;
    });


    function start(id){
        $.ajax({
            url: ctx + "/city/updateValid.action",
            type: "post",
            data:{
                id:id,
                isvalid:0
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/city/query.action?";
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function stop(id){
        $.ajax({
            url: ctx + "/city/updateValid.action",
            type: "post",
            data:{
                id:id,
                isvalid:1
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/city/query.action?";
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    //新增
    function insertInfo() {
        var options = {
            width: 500,
            top: 200,
            height: 260,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            callback: function () {
                if ($("#sysSaleForm").valid("sysSaleForm")) {
                    var flag = false;
                    loadingShow();
                    $.ajax({
                        url: ctx + "/city/insert.action",
                        type: "post",
                        data: {
                            cityName : $("#cityName").val(),
                            orderNo : $("#orderNo").val(),
                            cityType : $("#cityType option:selected").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/city/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        },
                        error:function (e) {
                            loadingHide();
                            alertDialog(e.responseText)
                        }
                    });
                    if (flag){
                        return false;
                    }
                }else {
                    return false;
                }
            }
        }
        var createDlg = new Dialog("#sysSale-dialog", options);
        createDlg.show();
    }

    //修改
    function editCityInfo(_id) {
        var options = {
            width: 500,
            top: 200,
            height: 260,
            overlay: true,
            dispose: true,
            move: true,
            title: '修改',
            onBeforeShow:function(){
                loadingShow();
                $.ajax({
                    url: ctx + "/city/getOneById.action",
                    type: "post",
                    data: {
                        id:_id
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            $("#cityName_edit").val(data.rows.cityName);
                            $("#orderNo_edit").val(data.rows.orderNo);
                            $("#cityType_edit").val(data.rows.cityType);

                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#sysSaleForm_edit").valid("sysSaleForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/city/update.action",
                        type: "post",
                        data: {
                            id:_id,
                            cityName : $("#cityName_edit").val(),
                            orderNo : $("#orderNo_edit").val(),
                            cityType : $("#cityType_edit option:selected").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/city/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                                flag = true;
                            }
                        },
                        error:function (e) {
                            loadingHide();
                            alertDialog(e.responseText)
                        }
                    });
                    if (flag){
                        return false;
                    }
                }else {
                    return false;
                }
            }
        };
        var editDlg = new Dialog("#sysSale-dialog-edit", options);
        editDlg.show();
    }

    //查看
    function detailCityInfo(_id) {
        var options = {
            width: 500,
            top: 200,
            height: 260,
            overlay: true,
            dispose: true,
            move: true,
            title: '修改',
            onBeforeShow:function(){
                loadingShow();
                $.ajax({
                    url: ctx + "/city/getOneById.action",
                    type: "post",
                    data: {
                        id:_id
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            $("#cityName_detail").val(data.rows.cityName);
                            $("#orderNo_detail").val(data.rows.orderNo);
                            $("#cityType_detail").val(data.rows.cityType);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            callback: function () {
            }
        };
        var detailDlg = new Dialog("#sysSale-dialog-detail", options);
        detailDlg.show();
    }

    //删除
    function deleteInfo(id) {
        confirmDialog("确认删除选中的系统销售信息吗？", function () {
            loadingShow();
            $.ajax({
                url: ctx + "/city/delete.action",
                type: "post",
                data: {
                    id:id
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/city/query.action?";
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
});

//表单参数校验
function sysSaleForm(_this){
    if (undefined !== _this && null != _this && "" !== _this){
        if ($(_this).val() == null || $(_this).val() == "" || $.trim($(_this).val()) == "") {
            if ($(_this).attr("id") == "cityName" || $(_this).attr("id") == "name_edit") {
                $(_this).attr('tip', '城市名为空，请重新输入。');
                return "fail";
            }else if  ($(_this).attr("id") == "orderNo" || $(_this).attr("id") == "orderNo_edit") {
                $(_this).attr('tip', '排序为空，请重新输入。');
                return "fail";
            }else if  ($(_this).attr("id") == "cityType" || $(_this).attr("id") == "status_edit") {
                $(_this).attr('tip', '城市类别为空，请选择状态。');
                return "fail";
            }
            return "success";
        }else {
            if ($(_this).attr("id") == "cityName" || $(_this).attr("id") == "name_edit") {
                var reg = /^[\u4e00-\u9fa5]+$/;
                if (!reg.test($(_this).val())){
                    $(_this).attr('tip', '城市名称格式有误，请重新输入。');
                    return "fail";
                }
                if ($(_this).val().length > 10){
                    $(_this).attr('tip', '城市名长度超出10，请重新输入。');
                    return "fail";
                }
            }else if  ($(_this).attr("id") == "orderNo" || $(_this).attr("id") == "orderNo_edit") {
                var reg = /^[0-9]*$/;
                if (!reg.test($(_this).val())){
                    $(_this).attr('tip', '排序不正确，请重新输入。');
                    return "fail";
                }
            }
            return "success";
        }
        return "success";
    }
}