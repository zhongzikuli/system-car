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
	
	//电催异常
	$("#search-is-tel-exception").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//是否代偿
	$("#search-is-advanced-income").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//拖车状态
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
		width: "100%"
	});
	$("#search-is-first-overdue").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//导入
	$(".import-overdue-btn").on("click", function(){
		var options = {
			width: 420,
			top: 200,
			height: 260,
			overlay: true,
			dispose: true,
			move: true,
			onBeforeShow:function(){
				$("#select-bank-id").chosen({
					disable_search_threshold	: 8,
					no_results_text				: "没有找到",
					allow_single_deselect		: true,
					width: "100%"
				}).on("change", function (evt, params) {
					if("" != params["selected"]){
						$("#select-bank-id").next("div").removeClass("input_validation-failed");
					}
				});
				$("#select-month").append(yearOptions);
				$("#select-month").chosen({
					disable_search_threshold	: 8,
					no_results_text				: "没有找到",
					allow_single_deselect		: true,
					width: "100%"
				}).on("change", function (evt, params) {
					if("" != params["selected"]){
						$("#select-month").next("div").removeClass("input_validation-failed");
					}
				});
				$(".file-upload").change(function() {
					var arrs=$(this).val().split('\\');
					var filename=arrs[arrs.length-1];
					$(".show-name").html(filename);
					$("#fileName").val(filename);
				});
			},
			callback: function () {
				var fileName = $("#fileName").val();
				var extStart = fileName.lastIndexOf(".");
				var ext = fileName.substring(extStart,fileName.length).toUpperCase();
				if (!$("#upload-overdue-form").valid("upload-overdue-form")) {
					return false;
				} else if(ext!= ".XLS" && ext!= ".XLSX"){
					faildMsg("请选择excel文档进行上传！");
					return false;
				} else{
					$(".dialog-ok").attr("disabled", true);
					if ($("#upload-overdue-form").valid("upload-overdue-form")) {
						var formData = new FormData($( "#upload-overdue-form" )[0]);
						loadingShow();
						$.ajax({
							url		: ctx + "/overdue/upload.action",
							type	: "post",
							data	: formData,  
							async	: false,  
							cache	: false,  
							contentType: false,  
							processData: false,  
							success: function (data) {
								data = jQuery.parseJSON(data);
								loadingHide();
								$(".dialog-ok").attr("disabled", false);
								if (data.error == 1) {
									successMsg("操作成功！", 1000, function () {
										window.location.href = ctx + "/overdue/query.action";
									});
								} else if (data.error == -100) {
									flag = true;
									faildMsg("会话超时，请重新登陆！");
								} else {
									flag = true;
									faildMsg(data.message);
								}
							}
						});
					}
				}
			}
		};
		var viewDlg = new Dialog("#import-overdue-dialog", options);
		viewDlg.show();
	});
	
	//删除
	$(".delete-overdue-btn").on("click", function(){
		var ck = $("input[name='overdueCheckbox']:checked");
		if (ck.length == 0) {
			alertDialog("请选择要删除的逾期记录。");
			return
		} else {
			var idArr = new Array();
			$(ck).each(function () {
				idArr.push($(this).val());
			});
			confirmDialog("确认删除选中的逾期记录吗？", function () {
				loadingShow();
				var params = {}
				params.idArr = idArr.toString();
				$.ajax({
					url		: ctx + "/overdue/delete.action",
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
			});
		}
	});
	
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		refresh();
	});
	
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#bank-id").val("").trigger('chosen:updated');
		$("#search-month").val("").trigger('chosen:updated');
		$("#search-is-over").val("").trigger('chosen:updated');
		$("#search-is-tel-exception").val("").trigger('chosen:updated');
		$("#search-is-advanced-income").val("").trigger('chosen:updated');
		$("#search-trail-car-status").val("").trigger('chosen:updated');
		$("#search-is-first-overdue").val("").trigger('chosen:updated');
		$("#search-is-law").val("").trigger('chosen:updated');
		$("#keyword").val("");
	});
	
	//刷新
	function refresh() {
		var bankId = $("#hiddenForm").find("input[name='bankId']").val();
		var month = $("#hiddenForm").find("input[name='month']").val();
		var isOver =  $("#hiddenForm").find("input[name='isOver']").val();
		var keyword = $("#hiddenForm").find("input[name='keyword']").val();
		
		var isTelException = $("#hiddenForm").find("input[name='isTelException']").val();
		var trailCarStatus = $("#hiddenForm").find("input[name='trailCarStatus']").val();
		var isAdvancedIncome = $("#hiddenForm").find("input[name='isAdvancedIncome']").val();
		var isFirstOverdue = $("#hiddenForm").find("input[name='isFirstOverdue']").val();
		var isLaw = $("#hiddenForm").find("input[name='isLaw']").val();
		
		window.location.href = ctx + "/overdue/query.action?month=" + month + "&bankId=" + bankId + "&isOver=" + isOver + "&keyword=" + keyword+ "&isTelException=" + isTelException + "&trailCarStatus=" + trailCarStatus+ "&isAdvancedIncome=" + isAdvancedIncome+ "&isLaw=" + isLaw+ "&isFirstOverdue=" + isFirstOverdue;
	}
});

function validImportForm(lableId){
	if (undefined != lableId && null != lableId && lableId != "") {
		if ($(lableId).val() == null || $(lableId).val() == "") {
			if ($(lableId).attr("id") == "select-bank-id"
				|| $(lableId).attr("id") == "select-bank-id") {
				$(lableId).next("div").attr('tip', '逾期银行不能为空，请选择。').addClass("input_validation-failed");
				return "faild";
			} else if ($(lableId).attr("id") == "select-month"
				|| $(lableId).attr("id") == "select-month") {
				$(lableId).next("div").attr('tip', '逾期年月不能为空，请选择。').addClass("input_validation-failed");
				return "faild";
			}
		}
	}
	return "success";
}