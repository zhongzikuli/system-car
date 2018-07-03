
jQuery(function ($) {

    showDate();
    function showDate(){
        year = new Date().getFullYear();
        var yearHtml = '<option value="">请选择年</option>';
        var monthHtml="<option value=''>请选择月</option>";
        for (var i = 0; i < 10; i++) {
            year--
            yearHtml += '<option value="' + (year + 1) + '">' + (year + 1) + '年</option>';
        }
        for(var i = 1; i <= 12; i++){
            monthHtml += '<option value="' + i + '">' + i + '月</option>';
        }
        $("#search-select1").empty().append(yearHtml);
        $("#search-select2").empty().append(monthHtml);
    }

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
        width: "180px"
    });


    $(".reset-btn").on("click",function(){
        $("#joinedStartDate").val("");
        $("#joinedEndDate").val("");
        $("#search-select1").val("").trigger('chosen:updated');
        $("#search-select2").val("").trigger('chosen:updated');
        $("#search-select3").val("").trigger('chosen:updated');
        $("#search-select4").val("").trigger('chosen:updated');
    })

    //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

})
