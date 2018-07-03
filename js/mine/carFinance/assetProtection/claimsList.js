$(function () {

    //订单详情查看
    $(".detail").on("click", function () {
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });

//重置按钮
    $(".reset-btn").on("click", function () {
        $("#nameOrId").val("");
        $("#orderNo").val("");
        $("#audit_time_start").val("");
        $("#audit_time_end").val("");
        $("#departmentId").val("").trigger('chosen:updated');
        $("#orderStatus").val("").trigger('chosen:updated');
    });

    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "150px"
    };
    $("#departmentId").chosen(config);
    $("#orderStatus").chosen(config);

//刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    $(".btn-claim").on("click", function () {
        var $has_checked = $(".checkOne:checked");
        if ($has_checked.length == undefined || $has_checked.length == 0) {
            alertDialog("请选择要理赔的信息。");
            return;
        }
        var title = $has_checked.data("realname");
        var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + $has_checked.val() + "&active=insuranceClaim&goBackUrl=" + ctx + "/claim/query.action";
        openTabForParent(url, "-order-detail-" + $has_checked.val(), "订单详情-" + title);
    });


});
//添加理赔信息
function detail(id) {
    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
}

//添加理赔信息
function detail(id) {
    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
}