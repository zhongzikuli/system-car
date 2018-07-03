$(function(){
	$("#search-open-card-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	$("#search-open-card-apply").chosen({
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
	
	//开卡申请按钮
	$(".apply-btn").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var url = ctx + "/bankCard/preOpen.action?orderId="+ acceptId;
		openTabForParent(url, "-open-bank-card-" + acceptId, "银行开卡-" + dataTitle);
	});
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-open-card-status").val("").trigger('chosen:updated');
		$("#search-open-card-apply").val("").trigger('chosen:updated');
		if($("#search-deparment-name").length > 0){
			$("#search-deparment-name").val("").trigger('chosen:updated');
		}
		$("#keyword").val("");
	});
	
	//进度查询按钮
	$(".query-process-btn").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		loadingShow(300);
		$.ajax({
			url		: ctx + "/bankCard/queryProgress.action?orderId="+acceptId,
			type	: "post",
			contentType	: "application/json",
			dataType	: "json",
			success		: function (data) {
				loadingHide(300);
				if (data.error == 1) {
					var updatetime = data["rows"]["updatetime"];
					var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
					
					var desc = "开卡进度：" + getStatusDesc(data["rows"]["status"]);
					desc += "</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：" +data["rows"]["notes"];
					desc += "</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新时间：" + updatetime.replace(pattern, '$1-$2-$3 $4:$5:$6');
					var tipDlg = new Dialog("#query-progress-dialog", {
						width	: 320,
						top		: 200,
						height	: 200,
						overlay	: true,
						dispose	: true,
						move	: true,
						onBeforeShow: function () {
							$(".wrapper-content").html(desc);
						}
					});
					tipDlg.show();
				} else {
					faildMsg(data.message);
				}
			}
		});
	});

	//获取状态查询描述信息
	function getStatusDesc(status){
		if(status == "00"){
			return "初始状态";
		}else if(status == "10"){
			return "预处理阶段";
		}else if(status == "11"){
			return "调用联机开卡协议";
		}else if(status == "12"){
			return "后台页面受理退回";
		}else if(status == "13"){
			return "公司方受理退回成功";
		}else if(status == "14"){
			return "系统预判拒绝";
		}else if(status == "20"){
			return "联机开卡受理成功";
		}else if(status == "21"){
			return "联机开卡受理失败";
		}else if(status == "30"){
			return "主机返回开卡成功";
		}else if(status == "31"){
			return "主机返回开卡失败";
		}else if(status == "44"){
			return "银行内部处理中";
		}else{
			return "";
		}
	}
});