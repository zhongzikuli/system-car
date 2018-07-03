//过户资料审核列表
$(function(){
	//搜索时间控件
	var start = {
		elem: '#audit-transfer-search-start-date',
		//format: 'YYYY-MM-DD hh:mm:ss',
		format: 'YYYY-MM-DD',
		min: '1970-01-01', //设定最小日期为当前日期
		max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: false,
		//start: laydate.now() + ' 00:00:00',
		choose: function (datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		},
		clear: function () {
			end.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
		}
	};
	var end = {
		elem	: '#audit-transfer-search-end-date',
		//format	: 'YYYY-MM-DD hh:mm:ss',
		format: 'YYYY-MM-DD',
		min		: "1970-01-01",
		max		: laydate.now(),
		istoday	: false,				//显示今天
		issure	: true,					//确认框
		istime	: false,
		//start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
		choose	: function (datas) {
			start.max = datas;			//结束日选好后，重置开始日的最大日期
		},
		clear: function () {
			start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
			start.max = laydate.now();	//将开始日的最大值设定为今天
		}
	};
	laydate(start);
	laydate(end);
	
	//下拉框初始化
	$("#search-select-car-department").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//下拉框初始化
	$("#search-audit-transfer-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//刷新按钮
	$(".audit-transfer-refresh-btn").on("click", function(){
		$(".audit-transfer-search-btn").trigger("click");
	});
	//重置按钮
	$(".audit-transfer-reset-btn").on("click", function(){
		$("#search-audit-transfer-status").val("").trigger('chosen:updated');
		$("#search-select-car-department").val("").trigger('chosen:updated');
		$("#keyword").val("");
		$("#audit-transfer-search-start-date").val("");
		$("#audit-transfer-search-end-date").val("");
	});
	
	//审核按钮
	$(".audit-transfer-btn").on("click", function(){
		var _this = this;
		var applyId = $(_this).attr("data-id");
		var orderId = $(_this).attr("data-order");
		var dataTitle = $(_this).attr("data-title");
		$.ajax({
			url: ctx + "/carInfo/getSeat.action",
			type: "post",
			data: {
				id:applyId
			},
			async	: false,
			dataType: "json",
			success: function (data) {
				if (data.error == 1) {
					if(data["rows"]){
						var url = ctx + "/carInfo/preAuditForTransfer.action?id="+ applyId;
						openTabForParent(url, "-transfer-audit-" + orderId, "过户资料审核-" + dataTitle);
					}else{
						faildMsg("该记录已占位不能审核");
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	});
	
	//换审核
	$(".change-audit-transfer-btn").on("click", function(){
		var ck = $("input[name='auditCheckbox']:checked");
		if (ck.length == 0) {
			alertDialog("请选择要换审核的记录。");
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
				$.ajax({
					url		: ctx + "/carInfo/transferChange.action",
					type	: "post",
					data	: params,
					dataType: "json",
					success	: function (data) {
						if (data.error == 1) {
							successMsg("操作成功！", 1000, function () {
								window.location.href = ctx + "/carInfo/queryForTransferAudit.action";
							});
						} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}
					}
				});
			});
		}
	});
	
	//订单详情查看
	$(".detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var dataHref = $(_this).attr("data-href");
		openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
	});
});