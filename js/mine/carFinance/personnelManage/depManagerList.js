jQuery(function ($) {

    $("#search-select1").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "180px"
    });

    $("#search-select2").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "150px"
    });

    $("#search-select3").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "150px"
    });

    $(".detail").on("click", function () {
        var id=$(this).attr("data-id");
        var depName=$(this).attr("data-dep");
        detail(id,depName);
    });

    $(".reset-btn").on("click",function(){
        $("#search-select1").val("").trigger('chosen:updated');
        $("#search-select2").val("").trigger('chosen:updated');
        $("#search-select3").val("").trigger('chosen:updated');
    })

    //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

    function detail(id,depName){
        window.location.href=ctx+"/departmentDumpOutCheck/detail.action?departmentManagerId="+id+"&depName="+depName;
    }

    $(".exportInfo").on("click",function(){
        exportInfo();
    });
    function exportInfo(){
        var ck = $("input[name='departmentDumpOutCheck']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的内容。");
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
            confirmDialog("确认导出选中的内容吗？", function () {
                window.location.href=ctx+"/departmentDumpOutCheck/exportInfo.action?idArr="+idArr.toString();
            })
        }
    }



})
