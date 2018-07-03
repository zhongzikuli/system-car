$(function () {
    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $("#pageNum").val(0);
        $('#pagerForm').submit();
    });
});
//订单详情
function detail(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-" + title);
}

//部门列表信息
function departList(title, departId) {
    var type = $("input[name='type']").val();
    var source = $("input[name='source']").val();
    var bankId = $("input[name='bankId']").val();
    var dateTime = $("input[name='dateTime']").val();
    var url = ctx + "/financialRate/departList.action?departId=" + departId + "&type=" + type + "&bankId=" + bankId + "&dateTime=" + dateTime + "&source=" + source;
    openTabForParent(url, "-depart-list-" + departId, title + "资金周转列表明细");
}

//导出excel
function exportExcel(url) {
    confirmDialog("您确定要导出信息吗？", function () {
        var param = "";
        $('#hiddenForm,#pageFormHidden').find("input").each(function (v, n) {
            var name = $(n).attr("name");
            if (name == "pageNum") {
                param += "&" + name + "=" + $.trim($(n).val() - 1);
            } else {
                param += "&" + name + "=" + $.trim($(n).val());
            }
        });
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + url + "?" + param);
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
    });
}

function exportExcelByIds(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var type = $('#hiddenForm').find("input[name='type']").val();
            var dateTime = $('#hiddenForm').find("input[name='dateTime']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&dateTime=" + dateTime + "&type=" + type;
        });
    }
}

function exportFinancialExcelByIds(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var type = $('#hiddenForm').find("input[name='type']").val();
            var dateTime = $('#hiddenForm').find("input[name='dateTime']").val();
            var bankId = $('#hiddenForm').find("input[name='bankId']").val();
            var source = $('#hiddenForm').find("input[name='source']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&dateTime=" + dateTime + "&type=" + type + "&bankId=" + bankId + "&source=" + source;
        });
    }
}

function exportFinancialExcelByDepartId(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var type = $('#hiddenForm').find("input[name='type']").val();
            var dateTime = $('#hiddenForm').find("input[name='dateTime']").val();
            var bankId = $('#hiddenForm').find("input[name='bankId']").val();
            var source = $('#hiddenForm').find("input[name='source']").val();
            var departId = $('#hiddenForm').find("input[name='departId']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&departId=" + departId + "&dateTime=" + dateTime + "&type=" + type + "&bankId=" + bankId + "&source=" + source;
        });
    }
}

//部门资金周转率统计
function exportFinancialExcelDepart(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var type = $('#hiddenForm').find("input[name='type']").val();
            var dateTime = $('#hiddenForm').find("input[name='dateTime']").val();
            var bankId = $('#hiddenForm').find("input[name='bankId']").val();
            var departName = $('#hiddenForm').find("input[name='departName']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&departName=" + departName + "&dateTime=" + dateTime + "&type=" + type + "&bankId=" + bankId;
        });
    }
}

//上牌未抵押
function exportDeliverUnMortgageExcel(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var month = $('#hiddenForm').find("input[name='month']").val();
            var departmentId = $('#hiddenForm').find("input[name='departmentId']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&departmentId=" + departmentId + "&month=" + month;
        });
    }
}

//
function departDeliverUnMortgage(departmentId, departName) {
    var month = $('#hiddenForm').find("input[name='month']").val();
    var url = ctx + "/deliverUnMortgage/departmentDetail.action?departmentId=" + departmentId + "&month=" + month;
    openTabForParent(url, "-department-deliverUnMortgage-" + departmentId, departName + "-已寄出未抵押列表明细");
}

function exportDeliverUnMortgageListExcel(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var month = $('#hiddenForm').find("input[name='month']").val();
            var parentId = $('#hiddenForm').find("input[name='parentId']").val();
            var grandId = $('#hiddenForm').find("input[name='grandId']").val();
            var departmentId = $('#hiddenForm').find("input[name='departmentId']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&month=" + month + "&parentId=" + parentId + "&grandId=" + grandId + "&departmentId=" + departmentId;
        });
    }
}

function exportFundsDistributionExcel(url) {
    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要导出的信息。");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出信息吗？", function () {
            var bankName = $('#hiddenForm').find("input[name='bankName']").val();
            var queryType = $('#hiddenForm').find("input[name='queryType']").val();
            var type = $('#hiddenForm').find("input[name='type']").val();
            var dateTime = $('#hiddenForm').find("input[name='dateTime']").val();
            var startDate = $('#hiddenForm').find("input[name='startDate']").val();
            var endDate = $('#hiddenForm').find("input[name='endDate']").val();
            window.location.href = ctx + url + "?ids=" + ids.toString() + "&bankName=" + bankName + "&queryType=" + queryType +
                "&type=" + type + "&dateTime=" + dateTime + "&startDate=" + startDate + "&endDate=" + endDate;
        });
    }
}