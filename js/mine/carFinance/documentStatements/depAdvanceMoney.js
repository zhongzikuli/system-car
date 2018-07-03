
$(function(){

    //下拉框初始化
    $("#search-advanceId").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });

    $("#search-deparment-name").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "200px"
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#search-advanceId").val("").trigger('chosen:updated');
        $("#search-deparment-name").val("").trigger('chosen:updated');
    });

    //部门垫放款统计表导出
    $(".exportDepAdvanceMoney").on("click",function(){
        exportDepAdvanceMoney();
    });
    function exportDepAdvanceMoney(){
        var ck = $("input[name='exportDepAdvance']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的报表。");
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
                alertDialog("所选信息包含无效账户");
                return false;
            }
            confirmDialog("确认导出选中的报表吗？", function () {
                window.location.href=ctx+"/depAdvanceMoney/exportDepAdvanceMoney.action?idArr="+idArr.toString();
            })
        }
    }

});
