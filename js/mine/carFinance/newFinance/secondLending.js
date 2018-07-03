$(function(){
	//批量二次打款
	$("#payconfirm").on('click', function () {
        payConfirm();
    });
	 //总数计算
	 $("#statistics").on('click', function () {
		 numberSum();
	 });
    //撤回二次放款
    $("#paymentComeback").on('click', function () {
        paymentComeback();
    });

	 

	//批量撤回
	 function paymentComeback() {
		 var params2 = new Array();
	        var ck = $("input[name='payment_input']:checked");
	        if (ck.length == 0) {
	            alertDialog("请选择要撤销二次打款的用户。");
	            return
	        }  else {
	        	 $(ck).each(function () {
	        		 params2.push($(this).val());
                 });
	        	 confirmDialog("您确认撤销二次打款吗?", function () {
	        	 $.ajax({
                     url: ctx + "/newFinancial/secondLendingComeBack.action",
                     type: "post",
                     data: JSON.stringify(params2),
                     dataType: "json",
                     contentType: "application/json;charset=utf-8",
                     success: function (data) {
                         if (data.error == 1) {
                             successMsg("操作成功！", 1000, function () {
                                 window.location.href = ctx + "/newFinancial/secondLending.action";
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
	 }
	 
	//总数计算
	 function numberSum() {
		    var params = new Array();
		    var secondLendingSumMoney=0;
	        var ck = $("input[name='payment_input']:checked");
	        if (ck.length == 0) {
	            alertDialog("请选择要到统计的用户。");
	            return
	        }  else {
	        	 $(ck).each(function () {
	        		 params.push($(this).val());
                     secondLendingSumMoney+=Number($(this).attr("data-secondLendingMoney"));
	        		
                 });
				 $("#number").val(ck.length);
				 $("#receivables").val(secondLendingSumMoney);

	        }
	 }

	//批量二次打款
	 function payConfirm() {
		 
		 var params2 = new Array();
		 var isSubmit = validater.mySubmit(validater);
	        if (!isSubmit) {
	            return;
	        }
	        var ck = $("input[name='payment_input']:checked");
	        if (ck.length == 0) {
	            alertDialog("请选择要二次打款的用户。");
	            return
	        }else {
	        	 $(ck).each(function () {
	        		 var params = {}
	        		 params.id = $(this).val();
	        		 params.moneyArriveTime = $("#get-date").val();
	        		 params2.push(params);
                 });
	        	 
	        	 confirmDialog("您确认要二次打款吗?",function () {
	        	loadingShow();
	        	 $.ajax({
                     url: ctx + "/newFinancial/twoPaymentConfirmation.action",
                     type: "post",
                     data: JSON.stringify(params2),
                     dataType: "json",
                     contentType: "application/json;charset=utf-8",
                     success: function (data) {
                    	 loadingHide();
                         if (data.error == 1) {
                             successMsg("操作成功！", 1000, function () {
                                 window.location.href = ctx + "/newFinancial/secondLending.action";
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
		
	 }
	//校验对象
	    var validater = new ValidateWin("#arrivalTime", {
	        callback: function (content, event) {
	            
	        }
	    });
	//搜索时间控件
		var start = {
			elem:"#search-start-date",
			format: 'YYYY-MM-DD',
			min: '1970-01-01 ', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			start: laydate.now() + ' 00:00:00',
			choose: function (datas) {
				end.min = datas; //开始日选好后，重置结束日的最小日期
			},
			clear: function () {
				end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
			}
		}
		var end ={
			elem: '#search-end-date',
			format: 'YYYY-MM-DD',
			min: '1970-01-01', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
			choose	: function (datas) {
				start.max = datas;			//结束日选好后，重置开始日的最大日期
			},
			clear: function () {
				start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
				start.max = laydate.now();	//将开始日的最大值设定为今天
			}
		}
		var getDate ={
				elem: '#get-date',
				format: 'YYYY-MM-DD',
				min: '1970-01-01', //设定最小日期为当前日期
				max: laydate.now(), //最大日期
				istoday: false, //显示今天
				issure: true, //确定框
				istime: false,
				start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
				choose	: function (datas) {
					 if (datas == '') {
			                change_error_style($("#get-date"), "add");
			            } else {
			                change_error_style($("#get-date"), "remove");
			            }
			        },
				clear: function () {
					start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
					start.max = laydate.now();	//将开始日的最大值设定为今天
				}
			}
		laydate(start);
		laydate(end);
		laydate(getDate);
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
		$("#search-style").val("1").trigger('chosen:updated');
		$("#search-bank").val("").trigger('chosen:updated');
		$("#keyword").val("");
		$("#search-start-date").val("");
		$("#search-end-date").val("");
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
});
//表单校验
function validDate(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "get-date") {
                $(lableId).attr('tip', '请输入到账日期。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}

