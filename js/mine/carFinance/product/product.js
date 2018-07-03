//新增
function insertProduct() {
    var options = {
        width: 500,
        top: 200,
        height: 250,
        overlay: true,
        dispose: true,
        move: true,
        title: '创建',
        url: "",
        callback: function () {
            var flag = false;
            if ($("#productForm").valid("productForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/product/create.action",
                    type: "post",
                    data: {
                        orderNo: $("#order_No").val(),
                        productName:$("#product_Name").val(),
                        remark:$("#remark").val(),
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            flag = false;
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/product/query.action";
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
    creatDlg = new Dialog("#product-dialog", options);
    creatDlg.show();
}


//刪除
function deleteProduct() {
    var ck = $("input[name='product_input']:checked");
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
        confirmDialog("确认删除选中的产品信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/product/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/product/query.action?";
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


//修改
function editProduct(id) {
    var options = {
        width: 500,
        top: 200,
        height: 250,
        overlay: true,
        dispose: true,
        move: true,
        url: "",
        onBeforeShow: function () {
            $.ajax({
                url: ctx + "/product/toEdit.action",
                type: "post",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        var product = data.rows;
                        $("#orderNoEdit").val(product.orderNo);
                        $("#productNameEdlit").val(product.productName);
                        $("#remarkEdit").val(product.remark);
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
            if ($("#productEditForm").valid("productEditForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/product/update.action",
                    type: "post",
                    data: {
                        "id": id,
                        orderNo: $("#orderNoEdit").val(),
                        productName: $("#productNameEdlit").val(),
                        remark: $("#remarkEdit").val(),
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/product/query.action?";
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
    var editDlg = new Dialog("#productEdit-dialog", options);
    editDlg.show();
}
//查看
function detailProduct(orderNo,productName,remark) {
    var options = {
        width: 500,
        top: 200,
        height: 250,
        overlay: true,
        dispose: true,
        move: true,
        url: "",
        onBeforeShow: function () {
            $("#orderNoDetail").val(orderNo);
            $("#productNameDetail").val(productName);
            $("#Detailremark").val(remark);
        }
    }
    var editDlg = new Dialog("#productDetail-dialog", options);
    editDlg.show();
}

//表单校验
function ProductForm(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "order_No" || $(lableId).attr("id") == "orderNoEdit") {
                $(lableId).attr('tip', '排序号不能为空。');
                return "faild";
            }
            if ($(lableId).attr("id") == "productNameEdlit" || $(lableId).attr("id") == "product_Name" ) {
                $(lableId).attr('tip', '产品名称不能为空。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}
