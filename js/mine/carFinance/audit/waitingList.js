$(function(){
	//数据处理对象
	var dataProxy = new HYCarFinance.carProxy();
	
	//搜索时间控件
	var start = {
		elem: '#search-start-date',
		//format: 'YYYY-MM-DD hh:mm:ss',
		format: 'YYYY-MM-DD',
		min: '1970-01-01 ', //设定最小日期为当前日期
		max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: false,
		//start: laydate.now() + ' 00:00:00',
		choose: function (datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		},
		clear: function () {
			end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
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
			start.min = '1970-01-01 ';	//结束日清空后，重置开始日的最小日期
			start.max = laydate.now();	//将开始日的最大值设定为今天
		}
	};
	
	var subStart = {
		elem: '#search-submit-start-date',
		//format: 'YYYY-MM-DD hh:mm:ss',
		format: 'YYYY-MM-DD',
		min: '1970-01-01 ', //设定最小日期为当前日期
		max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: false,
		//start: laydate.now() + ' 00:00:00',
		choose: function (datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		},
		clear: function () {
			end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
		}
	};
	var subEnd = {
		elem	: '#search-submit-end-date',
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
			start.min = '1970-01-01 ';	//结束日清空后，重置开始日的最小日期
			start.max = laydate.now();	//将开始日的最大值设定为今天
		}
	};
	if($("#search-start-date").length > 0){
		laydate(start);
		laydate(end);
	}
	if($("#search-submit-start-date").length > 0){
		laydate(subStart);
		laydate(subEnd);
	}
	
	//下拉框初始化
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "200px"
	});
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-deparment-name").val("").trigger('chosen:updated')
		$("#keyword").val("");
		$("#search-start-date").val("");
		$("#search-end-date").val("");
		$("#search-submit-start-date").val("");
		$("#search-submit-end-date").val("");
	});
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
	//作废
	$(".discard-audit-btn").on("click", function(){
		var ck = $("input[name='auditCheckbox']:checked");
		if (ck.length == 0) {
			alertDialog("请选择要作废的订单。");
			return
		} else {
			var idArr = new Array();
			$(ck).each(function (i, n) {
				idArr.push($(n).val());
			});
			var options = {
				width	: 520,
				top		: 200,
				height	: 240,
				overlay	: true,
				dispose	: true,
				move	: true,
				url		: '',
				onBeforeShow: function () {
					$('#discardDescription').keyup(function () {							//审核描述信息提示
						var curLength = $(this).val().trim().length;
						$(this).next("span").find(".input").html(curLength);
						$(this).next("span").find(".can-input").html(100 - curLength);
						if (curLength > 100) {
							var num = $(this).val().trim().substr(0, 140);
							$(this).val(num);
						}
					});
				},
				callback: function () {
					if ($("#discardOrderForm").valid("discardOrderForm")) {
						var desc = $.trim($("#discardDescription").val());
						loadingShow();
						var params = {
							idArr	: idArr.toString(),
							remark	: $.trim(desc)
						};
						$.ajax({
							url		: ctx + "/audit/discard.action",
							type	: "post",
							data	: params,
							dataType: "json",
							success	: function (data) {
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
					} else {
						return false;
					}
				}
			};
			var discardDlg = new Dialog("#discard-order-dialog", options);
			discardDlg.show();
		}
	});
	//审核按钮
	$(".audit-btn").on("click", function(){
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
						var url = ctx + "/audit/preAudit.action?orderId="+ acceptId;
						openTabForParent(url, "-audit-" + acceptId, "订单审核-" + dataTitle);
					}else{
						faildMsg("该订单已占位不能审核");
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	});
	
	//订单详情查看
	$(".detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var dataTitle = $(_this).attr("data-title");
		var dataHref = $(_this).attr("data-href");
		openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
	});
	
	function refresh(){
		window.location.href = ctx + "/audit/queryForAuditing.action";
	}
});

