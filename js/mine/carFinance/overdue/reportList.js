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
	
	//拖车状态
	$("#search-trail-car-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//导出excel
	$(".export-excel").on("click", function(){
		confirmDialog("您确定要导出逾期信息吗？", function () {
			var param = "";
			$('#hiddenForm,#pageFormHidden').find("input").each(function (v, n) {
				var name = $(n).attr("name");
				if (name == "pageNum") {
					param += "&" + name + "=" + $.trim($(n).val() - 1);
				} else {
					param += "&" + name + "=" + $.trim($(n).val());
				}
			});
			var frame = $('<iframe>');//定义一个iframe
			frame.attr("src", ctx + "/overdueReport/exportList.action?" + param);
			frame.attr("style", "display:none");
			frame.append("</iframe>")
			$("body").append(frame);
		});
	});
	
	
	//搜索时间控件
	var start = {
		elem:"#startTime",
		format: 'YYYY-MM-DD hh:mm:ss',
		min: '1970-01-01 ', //设定最小日期为当前日期
		//max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: true,
		start: laydate.now() + ' 00:00:00',
		choose: function (datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		},
		clear: function () {
			end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
		}
	}
	var end ={
		elem: '#endTime',
		format: 'YYYY-MM-DD hh:mm:ss',
		min: '1970-01-01', //设定最小日期为当前日期
		//max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: true,
		start: laydate.now(0, 'YYYY-MM-DD hh:mm:ss'),
		choose	: function (datas) {
			start.max = datas;			//结束日选好后，重置开始日的最大日期
		},
		clear: function () {
			start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
			start.max = laydate.now();	//将开始日的最大值设定为今天
		}
	}
	laydate(start);
	laydate(end);
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#bank-id").val("").trigger('chosen:updated');
		$("#search-month").val("").trigger('chosen:updated');
		$("#search-is-over").val("").trigger('chosen:updated');
		$("#search-trail-car-status").val("").trigger('chosen:updated');
		$("#search-is-valid").val("").trigger('chosen:updated');
		$("#keyword").val("");
		$("#startTime").val("");
		$("#endTime").val("");
	});
});