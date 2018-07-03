$(function(){
	$("#search-apply-period-flag").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	$("#search-apply-period-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//订单详情查看
	$(".detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var dataHref = $(_this).attr("data-href");
		openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
	});
	
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-apply-period-flag").val("").trigger('chosen:updated');
		$("#search-apply-period-status").val("").trigger('chosen:updated');
		if($("#search-deparment-name").length > 0){
			$("#search-deparment-name").val("").trigger('chosen:updated');
		}
		$("#keyword").val("");
	});
	
	//分期按钮
	$(".apply-btn").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var url = ctx + "/applyPeriod/preApply.action?orderId="+ acceptId;
		openTabForParent(url, "-loan-period-" + acceptId, "申请分期-" + dataTitle);
	});
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	
	//进度查询按钮
	$(".query-process-btn").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		loadingShow(300);
		$.ajax({
			url		: ctx + "/applyPeriod/queryProgress.action?orderId="+acceptId,
			type	: "post",
			contentType	: "application/json",
			dataType	: "json",
			success		: function (data) {
				loadingHide(300);
				if (data.error == 1) {
					var desc = "分期进度：<code>" + getStatusDesc(data["rows"]["status"]) + "</code>";
					alertDialog(desc);
				} else {
					faildMsg(data.message);
				}
			}
		});
	});

	//获取状态查询描述信息
	function getStatusDesc(status){
		if(status == "0"){
			return "待受理";
		}else if(status == "1"){
			return "受理失败";
		}else if(status == "2"){
			return "审批中";
		}else if(status == "3"){
			return "审批通过";
		}else if(status == "4"){
			return "审批未通过";
		}else if(status == "5"){
			return "放款成功";
		}else if(status == "6"){
			return "放款失败";
		}else{
			return "";
		}
	}
});