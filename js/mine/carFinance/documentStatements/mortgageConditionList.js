$(function(){
    //下拉框初始化
    $("#search-deparment-name").chosen({
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

    $("#isMortgageFileSubmitBank").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });

    $("#isMortgageFileDeliver").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });

    laydate( {
        elem: '#search-date',
        format: 'YYYY-MM-DD', //日期格式
        istime: false, //是否开启时间选择
        max:laydate.now(),
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            if  (datas =='') {
                change_error_style($("#initRegisterDate"), "add");
            } else {
                change_error_style($("#initRegisterDate"), "remove");
            }
        },
        clear: function () {

        }
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#search-deparment-name").val("").trigger('chosen:updated');
        $("#search-bank").val("").trigger('chosen:updated');
        $("#isMortgageFileSubmitBank").val("").trigger('chosen:updated');
        $("#isMortgageFileDeliver").val("").trigger('chosen:updated');
        $("#search-start-date").val("");
        $("#search-end-date").val("");
        $("#search-date").val("");
        $("#search-keyword").val("");
        $("#nameOrId").val("");
    });

    //搜索时间控件
    var start = {
        elem:"#search-start-date",
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
        elem: '#search-end-date',
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

    //抵押情况导出
    $(".exportMortgageCondition").on("click",function(){
        exportMortgageCondition();
    });

    function exportMortgageCondition(){
        var ck = $("input[name='mortgageConditionInput']:checked");
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
            confirmDialog("确认导出选中的报表？", function () {
                window.location.href=ctx+"/mortgageCondition/exportMortgageCondition.action?idArr="+idArr.toString();
            })
        }
    }
    
    //抵押情况导出全部
    $(".exportAllMortgageCondition").on("click",function(){
    	isHandleForExportAll();
    });
    
    //判断导出全部的处理线程
    function isHandleForExportAll(){
    	$.ajax({
			url		: ctx + '/mortgageCondition/isExportingAll.action',
			type	: "post",
			dataType: "json",
			async	: false,
			success	: function (data) {
				loadingHide();
				if (data.error == 1) {
					exportAllMortgageCondition();
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
    }

    function exportAllMortgageCondition(){
    	confirmDialog("确认导出所有抵押明细？", function () {
    		$.ajax({
    			url		: ctx + '/mortgageCondition/exportAllMortgageCondition.action',
    			type	: "post",
    			dataType: "json",
    			async	: false,
    			success	: function (data) {
    				if (data.error == 1) {
    					successMsg("正在执行导出，请稍后");
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
