$(function(){
	var dataProxy = new HYCarFinance.carProxy();
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
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-deparment-name").val("").trigger('chosen:updated');
		$("#search-style").val("0").trigger('chosen:updated');
		$("#search-bank").val("").trigger('chosen:updated');
		$("#keyword").val("");
		$("#search-orderNumber").val("");
	});
	//订单详情查看
	$(".detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var dataHref = $(_this).attr("data-href");
		openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
	});
	$(".casCheck-detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataFrom = $(_this).attr("data-from");
		var dataTitle = $(_this).attr("data-title");
		openTabForParent(dataFrom, "-casCheck-detail-" + acceptId, "打款复核-" + dataTitle);
	});
	
	//财务复核按钮
	/*$(".casCheck-detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataFrom = $(_this).attr("data-from");
		var dataTitle = $(_this).attr("data-title");
		$.ajax({
			url: ctx + "/audit/getSeat.action",
			type: "post",
			data: {
				acceptId:acceptId
			},
			async	: false,
			dataType: "json",
			success: function (data) {
				if (data.error == 1) {
					if(data["rows"]){
						addSeat(acceptId);
						var url = dataFrom;
						openTabForParent(url, "-casCheck-detail-" + acceptId, "财务打款-" + dataTitle);
					}else{
						faildMsg("该订单已占位不能复核");
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	});*/
	//刷新
	function refresh(){
		window.location.href = ctx + "/financial/queryForCasCheck.action";
	}
	//添加占位
	function addSeat(acceptId){
		$.ajax({
			url: ctx + "/financial/addSeat.action",
			type: "post",
			data: {
				acceptId:acceptId
			},
			async	: false,
			dataType: "json",
			success: function (data) {
				if (data.error == 1) {
					
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	//换审核
	$(".change-audit-btn").on("click", function(){
		var ck = $("input[name='auditCheckbox']:checked");
		if (ck.length == 0) {
			alertDialog("请选择要换审核的订单。");
			return
		} else {
			
			
			confirmDialog("确认换审核该订单？", function () {
				var idArr = new Array();
				$(ck).each(function (i, n) {
					idArr.push($(n).val());
				});
				var params = {
					idArr : idArr.toString()
				};
				dataProxy.changeAuditUser(params, function(data){
					successMsg("操作成功！", 1000, refresh);
				});
			});
		}
	});
});

