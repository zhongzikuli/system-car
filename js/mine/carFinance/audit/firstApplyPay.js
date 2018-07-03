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
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-audit-status, #keyword, #search-start-date, #search-end-date").val("");
		$("#search-audit-status").trigger('chosen:updated');
	});
	
	//审核按钮
	$(".audit-btn").on("click", function(){
		var applyId = $(this).attr("data-id");
		var orderId = $(this).attr("order-id");
		var name = $(this).attr("data-name");
		
		var salerId = $(this).attr("data-saler-id");
		
		var checkUser = $(this).attr("checkUser");
		var checkDate = $(this).attr("checkDate");
		var checkDesc = $(this).attr("checkDesc");
		
		var options = {
			width	: 800,
			top		: 120,
			height	: (null != checkUser && "" != checkUser) ? 590 : 470,
			overlay	: true,
			dispose	: true,
			move	: true,
			url		: '',
			onBeforeShow:function(){
				// 数据处理对象
				var dataProxy = new HYCarFinance.carProxy();
				
				$("#acceptId").val(orderId);
				$("#applyId").val(applyId);
				$("#real-name").val(name);
				if(null != checkUser && "" != checkUser){
					$("#audit-desc").val(checkDesc);
					$("#auditor-name").val(checkUser);
					$("#audit-date").val(checkDate);
					$("#applyPayCheckWrap").show();
				}else{
					$("#applyPayCheckWrap").hide();
				}
				
				$("#is-advanced-pay").chosen({
					disable_search_threshold: 10,
					no_results_text: '无数据',
					width: "100%"
				}).on('change', function (e, data) {
					console.log(data['selected']);
					if (data['selected'] == 1) {
						$(".depart-collect-money").removeClass("hide");
						if(null != checkUser && "" != checkUser){
							$("#is-advanced-pay").parents(".dialog-container").css({"height":"950px","width":"900px"});
						}else{
							$("#is-advanced-pay").parents(".dialog-container").css({"height":"800px"});
						}
						//部门信息
						dataProxy.getCurrentDepartInfo(salerId, function(data){
							if(null != data){
								$("#department-money-company").val(data["bankAccountName"]);
								$("#department-money-account").val(data["bankAccount"]);
								$("#department-money-bank").val(data["bankName"]);
								
								new HYUpload({
									auto: true,
									containerId: '#department-money-file',
									uploadImg: true,						//图片上传标记
									dropTip: '或将回单拖到这里',
									buttonText: '垫款回单附件',
									server: ctx + '/fdfs/uploadFile.action'
								});
							}
						});
						
					} else {
						$(".depart-collect-money").addClass("hide");
						if(null != checkUser && "" != checkUser){
							$("#is-advanced-pay").parents(".dialog-container").css({"height":"590px"});
						}else{
							$("#is-advanced-pay").parents(".dialog-container").css({"height":"470px"});
						}
					}
				});
				
				//审核费用
				dataProxy.getAuditFee($("#acceptId").val(), function(rows){
					if(null != rows){
						if(null != rows["actualLoadMoney"]){
							$("#actual-load-money").val(NumberFormatUtil.fmoney(rows["actualLoadMoney"], 2));
						}
						if(null != rows["collectMoneyCompany"]){
							$("#collect-money-company").val(rows["collectMoneyCompany"]);
						}
						if(null !=  rows["bank"]){
							$("#bank").val(rows["bank"]);
						}
						if(null != rows["account"]){
							$("#account").val(rows["account"]);
						}
					}
				});
				
			},
			callback:function(event){
				var status = $(event.target).attr("data-status");
				if($("#applyPayForm").valid("applyPayForm")){
					//校验附件
					if( $("#is-advanced-pay").val() == 1 && $(".filelist li").length == 0){
						$("#department-money-file").find(".queueList").addClass("wrong");
						return false;
					}
					
					//提交审核
					loadingShow();
					$.ajax({
						url: ctx + "/applyPay/firstAudit.action",
						type: "post",
						data: {
							id		: $("#applyId").val(),
							status	: status,
							desc	: $.trim($("#auditDescription").val()),
							isAdvancedPay	: $("#is-advanced-pay").val(),
							payFileId		: null !=  $(".filelist").find("li:first-child") ? $($(".filelist").find("li:first-child")).attr("data-filepath") : "",
							payGroupId		: null !=  $(".filelist").find("li:first-child") ? $($(".filelist").find("li:first-child")).attr("data-group") : "",
							payFileName		: null !=  $(".filelist").find("li:first-child") ? $($(".filelist").find("li:first-child")).attr("data-filename") : ""
						},
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