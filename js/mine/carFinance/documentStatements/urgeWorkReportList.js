$(function(){

    //下拉框初始化
    $("#search-deparment-name").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });

    $("#search-bank").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "200px"
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#search-deparment-name").val("").trigger('chosen:updated');
        $("#search-bank").val("").trigger('chosen:updated');
        $("#urgeStartDate").val("");
        $("#urgeEndDate").val("");
        $("#nameOrId").val("");
    });

    //搜索时间控件
    var start = {
        elem:"#urgeStartDate",
        format: 'YYYY-MM-DD',
        min: '1970-01-01 ', //设定最小日期为当前日期
        //max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
        }
    }
    var end ={
        elem: '#urgeEndDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        //max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose	: function (datas) {
            start.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            start.max = laydate.now();	//将开始日的最大值设定为今天
        }
    }
    laydate(start);
    laydate(end);

    //送交银行明细表导出
    $(".exportUrgeWork").on("click",function(){
        exportUrgeWork();
    });
    function exportUrgeWork(){
        var ck = $("input[name='InputUrgeWork']:checked");
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
                window.location.href=ctx+"/urgeWorkReport/exportUrgeWork.action?idArr="+idArr.toString();
            })
        }
    }

});
