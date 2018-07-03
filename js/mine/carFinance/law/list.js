$(function(){
	var sub = 10;		//获取十年内时间段
	var years = new Array();
	var yearOptions = "";
	var currentYear = DateUtil.getYear(new Date());
	var month = DateUtil.getMonth(new Date()) + 1;
	//当年月
	for(var i=month; i > 0; i--){
		var value = "";
		var text = "";
		if(i < 10){
			value = currentYear + "0" + i;
			text = currentYear + "年0" + i + "月";
		}else{
			value = currentYear + "" + i;
			text = currentYear + "年" + i + "月";
		}
		yearOptions += "<option value='"+value+"' >" + text + "</option>";
	}
	for (var i = 0; i < sub; i++) {
		var year = currentYear - (i+1);
		for (var j = 12; j > 0; j--) {
			var value = "";
			var text = "";
			if(j >= 10){
				value = year + "" + j;
				text = year + "年" + j + "月";
			}else{
				value = year + "0" + j;
				text = year + "年0" + j + "月";
			}
			yearOptions += "<option value='"+value+"' >" + text + "</option>";
		}
	}
	$("#search-month").append(yearOptions);
	$("#search-month").val($("#year-month-hidden").val());
	$("#search-month").find("option[text='"+$("#year-month-hidden").val()+"']").attr("selected","selected");
	
	$("#search-month").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//搜索时间控件
	laydate({
		elem: '#search-month',
		format: 'YYYYMM',
		type:'month',
		issure: true, //确定框
		istime: false
	});
	
	//下拉框初始化
	$("#search-is-over").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//贷款银行
	$("#bank-id").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//部门
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//部门
	$("#search-deparment-names").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "150px"
	});
	
	//电催异常
	$("#search-is-tel-exception").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//首期逾期
	$("#search-is-frist-overdue").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//是否代偿
	$("#bank-id").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//是否结清
	$("#search-trail-car-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//诉讼
	$("#search-is-law").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "200px"
	});
	//下拉框初始化
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "160px"
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#bank-id").val("").trigger('chosen:updated');
		$("#search-month").val("").trigger('chosen:updated');
		$("#search-is-over").val("").trigger('chosen:updated');
		$("#search-is-tel-exception").val("").trigger('chosen:updated');
		$("#search-is-advanced-income").val("").trigger('chosen:updated');
		$("#search-trail-car-status").val("").trigger('chosen:updated');
		$("#search-is-law").val("").trigger('chosen:updated');
		$("#search-is-frist-overdue").val("").trigger('chosen:updated');
		$("#search-deparment-name").val("").trigger('chosen:updated');
		$("#keyword").val("");
	});
	$(".resets-btn").on("click",function(){
        $("#keywords").val('');
        $("#search-deparment-names").val("").trigger('chosen:updated');
    })
	//订单详情查看
	$(".detailForLaw").on("click", function(){
		var ck = $("input[name='lawInput']:checked");
		 if (ck.length == 0) {
	            alertDialog("请选择要查看的信息。");
	            return
		 }else if(ck.length >1){
			 alertDialog("对不起,只能查看一个详情");
	            return
		 }else{
			var _this = ck;
			var acceptId = $(_this).attr("data-id");
			var dataTitle = $(_this).attr("data-title");
			var dataHref = $(_this).attr("data-href");
			openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
		 }
	});
	//诉讼管理
	$(".lawList").on("click", function(){
		var ck = $("input[name='lawInput']:checked");
		if (ck.length == 0) {
			alertDialog("请选择诉讼管理用户。");
			return
		}else if(ck.length >1){
			alertDialog("对不起,只能查看一个诉讼管理");
			return
		}else{
			var _this = ck;
			var url = $(_this).attr("data-href-list");
			 window.location.href = url;
			
		}
	});
});


