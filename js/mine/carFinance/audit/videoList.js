//视频齐全审核列表
$(function(){
	//下拉框初始化
	var config ={
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	}
	$("#search-select-department").chosen(config);
	$("#search-audit-status").chosen(config);
	
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-audit-status, #search-select-department, #keyword").val("");
		$("#search-audit-status, #search-select-department").trigger('chosen:updated');
	});
	
	var discardDlg = null;
	//审核按钮
	$(".audit-btn").on("click", function(){
		var _this = this;
		var applyId = $(_this).attr("data-id");
		var options = {
			width	: 580,
			top		: 200,
			height	: 320,
			overlay	: true,
			dispose	: true,
			move	: true,
			url		: '',
			onBeforeShow: function () {
				$('#auditDescription').keyup(function () {							//审核描述信息提示
					var curLength = $(this).val().trim().length;
					$(this).next("span").find(".input").html(curLength);
					$(this).next("span").find(".can-input").html(100 - curLength);
					if (curLength > 100) {
						var num = $(this).val().trim().substr(0, 140);
						$(this).val(num);
					}
				});
				
				$(".dialog-back").on("click", function(){
					var status = $(this).attr("data-index");
					var desc = $('#auditDescription').val();
					submitVideoAudit(applyId, desc, status);
				});
			},
			callback: function (e) {
				var status = $(e.target).attr("data-index");
				var desc = $('#auditDescription').val();
				submitVideoAudit(applyId, desc, status);
				return false;
			}
		};
		discardDlg = new Dialog("#video-audit-dialog", options);
		discardDlg.show();
	});
	
	function submitVideoAudit(applyId, desc, status){
		if ($("#videoAuditForm").valid("videoAuditForm")) {
			var desc = $.trim($("#auditDescription").val());
			loadingShow();
			$.ajax({
				url		: ctx + "/cfVideoSubmit/audit.action",
				type	: "post",
				data	: {
					"id"	: applyId,
					"desc"	: $.trim(desc),
					"status": status,
				},
				dataType: "json",
				success	: function (data) {
					discardDlg.hide(true);
					loadingHide();
					if (data.error == 1) {
						successMsg("操作成功！", 1000, function () {
							refresh();
						});
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		}
	}
	
	//订单详情查看
	$(".detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var dataHref = $(_this).attr("data-href");
		openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
	});
	
	function refresh(){
		$(".refresh-btn").trigger("click");
	}
});