$(function(){

    //下拉框初始化
    $("#search-deparment-name").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });

    //下拉框初始化
    $("#search-bank").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });
    //下拉框初始化
    $("#search-style").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });

    $("#isRepmentDay").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });

    $(".table-daily").find("td").each(function(){
        $(this).hover(function (e) {
            var content =$(this).html();
            $(this).attr('title',content);
        })
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#search-deparment-name").val("").trigger('chosen:updated');
        $("#search-bank").val("").trigger('chosen:updated');
        $("#isRepmentDay").val("").trigger('chosen:updated');
        $("#nameOrId").val("");
        $("#firstRepaymentStartDate").val("");
        $("#firstRepaymentEndDate").val("");
        $("#bankPaymentStartDate").val("");
        $("#bankPaymentEndDate").val("");
    });
    //搜索时间控件
    var firstRepaymentStartDate = {
        elem:"#firstRepaymentStartDate",
        format: 'YYYY-MM-DD',
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
        },
        clear: function () {
        }
    }
    var firstRepaymentEndDate ={
        elem: '#firstRepaymentEndDate',
        format: 'YYYY-MM-DD',
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose	: function (datas) {
        },
        clear: function () {
        }
    }
    laydate(firstRepaymentStartDate);
    laydate(firstRepaymentEndDate);

    //搜索时间控件
    var bankPaymentStartDate = {
        elem:"#bankPaymentStartDate",
        format: 'YYYY-MM-DD',
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
        },
        clear: function () {
        }
    }
    var bankPaymentEndDate ={
        elem: '#bankPaymentEndDate',
        format: 'YYYY-MM-DD',
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose	: function (datas) {
        },
        clear: function () {
        }
    }
    laydate(bankPaymentStartDate);
    laydate(bankPaymentEndDate);

    //客户还款时间表导出
    $(".exportCustomerRepayment").on("click",function(){
        exportCustomerRepayment();
    });

    function exportCustomerRepayment(){
        var ck = $("input[name='customerRepaymentInput']:checked");
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
                window.location.href=ctx+"/customerRepayment/exportCustomerRepayment.action?idArr="+idArr.toString();
            })
        }
    }



});
