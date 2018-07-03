//垫款申请审核列表
$(function(){
	//搜索时间控件
	var start = {
		elem: '#search-start-date',
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
		elem	: '#search-end-date',
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
	$("#search-audit-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
    $("#departmentId").chosen({
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
		$(" #keyword, #search-start-date, #search-end-date,#search-end-date").val("");
		$("#search-audit-status").val(2).trigger('chosen:updated');
	});
	
	//审核按钮
	$(".audit-btn").on("click", function(){
		var applyId = $(this).attr("data-id");
		var orderId = $(this).attr("order-id");
		var name = $(this).attr("data-name");
		var options = {
			width	: 800,
			top		: 120,
			height	: 420,
			overlay	: true,
			dispose	: true,
			move	: true,
			url		: '',
			onBeforeShow:function(){
				$("#acceptId").val(orderId);
				$("#applyId").val(applyId);
				$("#real-name").val(name);
				$.ajax({
					url: ctx + "/applyPay/getAuditFeeAndAudit.action",
					type: "post",
					data: {
						acceptId		: $("#acceptId").val()
					},
					async: false,
					dataType: 'json',
					success: function (data) {
						if (data.error == 1) {
							if(null != data["rows"]){
								var totalAmount = 0;
								debugger;
                                if(null != data["rows"]["auditBak"]){
                                    $("#audit-bak").val(data["rows"]["auditBak"]);
                                }
                                if(null != data["rows"]["auditTimeStr"]){
                                    $("#audit-time").val(data["rows"]["auditTimeStr"]);
                                }
                                if(null != data["rows"]["auditName"]){
                                    $("#audit-name").val(data["rows"]["auditName"]);
                                }
								if(null != data["rows"]["agreeEnsureMoney"]){
									totalAmount += data["rows"]["agreeEnsureMoney"];
									$("#guarantee-pay-fee").val(NumberFormatUtil.fmoney(data["rows"]["agreeEnsureMoney"], 2));
								}
								if(null != data["rows"]["licensePlateEnsureMoney"]){
									totalAmount += data["rows"]["licensePlateEnsureMoney"];
									$("#plate-pay-fee").val(NumberFormatUtil.fmoney(data["rows"]["licensePlateEnsureMoney"], 2));
								}
								if(null !=  data["rows"]["channelEnsureMoney"]){
									totalAmount += data["rows"]["channelEnsureMoney"];
									$("#channel-pay-fee").val(NumberFormatUtil.fmoney(data["rows"]["channelEnsureMoney"], 2));
								}
								if(null != data["rows"]["poundage"]){
									totalAmount += data["rows"]["poundage"];
									$("#pay-brokerage").val(NumberFormatUtil.fmoney(data["rows"]["poundage"], 2));
								}
								if(null != data["rows"]["serviceFee"]){
									totalAmount += data["rows"]["serviceFee"];
									$("#service-pay-fee").val(NumberFormatUtil.fmoney(data["rows"]["serviceFee"], 2));
								}
								$("#pay-total").val(NumberFormatUtil.fmoney(totalAmount, 2));
							}
						} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}
					}
				});
			},
			callback:function(event){
				var status = $(event.target).attr("data-status");
				if($("#applyPayForm").valid("applyPayForm")){
					loadingShow();
					$.ajax({
						url: ctx + "/applyPay/finalAudit.action",
						type: "post",
						data: {
							id		: $("#applyId").val(),
							status	: status,
							desc	: $.trim($("#audit-final-desc").val()),
                            acceptId	: $("#acceptId").val()
						},
						async: false,
						dataType: 'json',
						success: function (data) {
							loadingHide();
							if (data.error == 1) {
								successMsg("审核成功！",1000, function(){
									searchSubmit();
								});
							} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
							} else {
								faildMsg(data.message);
							}
						}
					});
				} else{
					return false;
				}
			}
		};
		var auditDlg = new Dialog("#apply-pay-audit-dialog",options);
		auditDlg.show();
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