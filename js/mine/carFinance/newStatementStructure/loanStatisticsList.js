$(function(){
	
	//下拉框初始化
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "160px"
	});
	//公司垫款明细导出
	$(".detail").on("click", function () {
		var url =$(this).attr("data-type");
		var id= $(this).attr("data-id");
		window.location.href = ctx+"/cfBusinessOrderAccept/detail.action?id="+id+"&goBackUrl="+url;
	});
	//下拉框初始化
	$("#search-bank").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "250px"
	});
	//下拉框初始化
	$("#search-style").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",	
		allow_single_deselect		: true,
		width: "160px"
	});
	//公司垫款明细导出
	$(".panyment-excel").on("click", function () {
		panyMentDownExcel();
	});
	//公司垫款明细导出
	$(".creditNot-all-excel").on("click", function () {
		creditAllDownExcel();
	});
	//征信时效导出
	$(".credit-excel").on("click", function () {
		creditDownExcel();
	});
	//征信时效导出
	$(".certificate-excel").on("click", function () {
		certificateDownExcel();
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-deparment-name").val("").trigger('chosen:updated');
		$("#search-bank").val("").trigger('chosen:updated');
		$("#search-start-date").val("");
		$("#search-end-date").val("");
        $("#search-date").val("");
		$("#search-keyword").val("")
	});
	$(".creditNot-excel").on("click", function () {
		creditNotDownExcel();
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
            confirmDialog("确认导出选中的报表吗？", function () {
                window.location.href=ctx+"/mortgageCondition/exportMortgageCondition.action?idArr="+idArr.toString();
            })
        }
    }

    //机动车证书登记号统计明细表导出
    $(".exportRegisterLicenseNo").on("click",function(){
        exportRegisterLicenseNo();
    });

    function exportRegisterLicenseNo(){
        var ck = $("input[name='registerLicenseNoInput']:checked");
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
                window.location.href=ctx+"/registerLicenseNo/exportRegisterLicenseNo.action?idArr="+idArr.toString();
            })
        }
    }

    //送交银行明细表导出
    $(".exportSendBankDetail").on("click",function(){
        exportSendBankDetail();
    });

    function exportSendBankDetail(){
        var ck = $("input[name='sendBankDetailInput']:checked");
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
                window.location.href=ctx+"/sendBankDetail/exportSendBankDetail.action?idArr="+idArr.toString();
            })
        }
    }

});

//公司垫款明细
function panyMentDownExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var ids = new Array();
	$has_checked.each(function () {
		ids.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/paymentDetail/exportList.action?ids=" + ids.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);
	});
}
//征信时效
function creditAllDownExcel() {
	var startDate=   $("#search-start-date").val();
	var endDate=   $("#search-end-date").val();
	if(startDate==null || startDate=='' ||endDate==null || endDate=='') {
		alertDialog("请选择时间区间进行导出");
		return
	}
	if(startDate!=null && startDate!='' && endDate!=null &&  endDate!='') {
		var date1 = new Date(startDate)
		var date2 = new Date(endDate)
		var s1 = date1.getTime(),s2 = date2.getTime();
		var total = (s2 - s1)/1000;
		var day = parseInt(total / (24*60*60));//计算整数天数
		if(day>30){
			alertDialog("合同送行日期在31天内进行导出");
			return
		}
	}
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/creditNotGiveBank/newAllExportList.action?startDate="+startDate+"&endDate="+endDate+
			"&bankId="+$("#search-bank").val()+"&keyword="+$("#search-keyword").val())
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);

	});
}
//登记证书送行
function certificateDownExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var ids = new Array();
	$has_checked.each(function () {
		ids.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/certificateOff/newExportList.action?ids=" + ids.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);

	});
}
//征信时效
function creditDownExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var ids = new Array();
	$has_checked.each(function () {
		ids.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/creditLimitation/exportList.action?ids=" + ids.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);

	});
}
//征信未送行
function creditNotDownExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var ids = new Array();
	$has_checked.each(function () {
		ids.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/creditNotGiveBank/newExportList.action?ids=" + ids.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);

	});
}
//财务收入统计表
function exporIncomeExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var idArr = new Array();
	$has_checked.each(function () {
		idArr.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/cfFinancialStatements/exportIncomeStatisticsList.action?idArr=" + idArr.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);
		
	});
}
//费用明细收入统计表
function exporChargesDetailsExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var idArr = new Array();
	$has_checked.each(function () {
		idArr.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/cfFinancialStatements/exportChargesDetailsStatisticsList.action?idArr=" + idArr.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);
		
	});
}
//财务数据统计表
function exporDateDetailsExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var idArr = new Array();
	$has_checked.each(function () {
		idArr.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/cfFinancialStatements/exportDateStatisticsList.action?idArr=" + idArr.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);
		
	});
}
