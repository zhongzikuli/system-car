//删除配偶
function deleteShared(userType,acceptId) {
    var tx;
    var confirm;
    var $has_checked = $(".checkOne:checked");
    if (userType != '' && userType != undefined && userType == 'SHARED') {
        tx = "请选择要删除的配偶";
        confirm = "您确定要删除配偶信息？";
    } else if (userType != '' && userType != undefined && userType == 'SPONSOR') {
        tx = "请选择要删除的担保人";
        confirm = "您确定要删除担保人信息？";
    }
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog(tx);
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog(confirm, function () {
        var param = {};
        param.acceptId = acceptId;
        param.ids = ids.toString();
        $.ajax({
            type: "post",
            url: ctx + "/cfBuyerInfo/delete.action",
            data: param,
            dataType: "json",
            success: function (result) {
                successMsg(result.message, function () {
                    window.location.reload();
                });
            }, error: function (result) {
                faildMsg("请求异常：" + result.status + "");
            }
        });
    });
}

//补录配偶、担保人
function addShared(acceptId, userType, goBackUrl) {
    if (userType != '' && userType != undefined && userType == 'SHARED') {
        $.ajax({
            type: "post",
            url: ctx + "/cfBuyerInfo/getBuyer.action",
            data: {acceptId: acceptId, userType: userType},
            dataType: "json",
            success: function (result) {
                if (result.error == 1 && result.rows != null) {
                    faildMsg("配偶信息已存在");
                    return;
                } else if (result.error == 1) {
                    window.location.href = ctx + "/cfBuyerInfo/preAddBuyer.action?acceptId=" + acceptId + "&userType=" + userType + "&goBackUrl=" + goBackUrl;
                }
            },
            error: function (result) {
                faildMsg("请求异常：" + result.status + "");
            }
        });
    } else {
        $.ajax({
            type: "post",
            url: ctx + "/cfBuyerInfo/getBuyer.action",
            data: {acceptId: acceptId, userType: userType},
            dataType: "json",
            success: function (result) {
                if (result.error == 1 && result.rows != null && result.rows.length > 3) {
                    faildMsg("担保人信息已存在4 个");
                    return;
                } else if (result.error == 1) {
                    window.location.href = ctx + "/cfBuyerInfo/preAddBuyer.action?acceptId=" + acceptId + "&userType=" + userType + "&userNum=" + result.rows.length + "&goBackUrl=" + goBackUrl;
                }
            }, error: function (result) {
                faildMsg("请求异常：" + result.status + "");
            }
        });
    }
}