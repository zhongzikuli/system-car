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
		$("#search-style").val("18").trigger('chosen:updated');
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

    //总数计算
    $("#statistics").on('click', function () {
        numberSum();
    });
    //批量本金打款
    $("#payconfirm").on('click', function () {
        payConfirm();
    });
    //撤回二次放款
    $("#paymentComeback").on('click', function () {
        paymentComeback();
    });

	//财务打款按钮
	$(".playMoney-detail").on("click", function(){
		var _this = this;
		var acceptId = $(_this).attr("data-id");
		var url = $(_this).attr("data-url");
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
						openTabForParent(url, "-play-money-" + acceptId, "财务打款-" + dataTitle);
					}else{
						faildMsg("该订单已占位不能打款");
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	});
	//刷新
	function refresh(){
		window.location.href = ctx + "/financial/queryForAdvanced.action";
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

//总数计算
    function numberSum() {
        var params = new Array();
        var principalLendingSumMoney=0;
        var ck = $("input[name='auditCheckbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要到统计的用户。");
            return
        }  else {
            $(ck).each(function () {
                params.push($(this).val());
                principalLendingSumMoney+=Number($(this).attr("data-actualLoadMoney"));

            });
            $("#number").val(ck.length);
            $("#receivables").val(principalLendingSumMoney);

        }
    }
    //批量本金打款
    function payConfirm() {
        var params2 = new Array();
        var isSubmit = validater.mySubmit(validater);
        if (!isSubmit) {
            return;
        }
        var ck = $("input[name='auditCheckbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要本金打款的用户。");
            return
        }else {
            $(ck).each(function () {
                var params = {}
                params.id = $(this).val();
                params.moneyArriveTime = $("#get-principal-date").val();
                params2.push(params);
            });

            confirmDialog("您确认要本金打款吗?",function () {
                loadingShow();
                $.ajax({
                    url: ctx + "/newFinancial/principalPaymentConfirmation.action",
                    type: "post",
                    data: JSON.stringify(params2),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/newFinancial/queryForPrincipalPlayMoney.action";
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

    //批量撤回
    function paymentComeback() {
        var params2 = new Array();
        var ck = $("input[name='auditCheckbox']:checked");
        var flag = true;
        if (ck.length == 0) {
            alertDialog("请选择要撤销本金打款的用户。");
            return
        }  else {
            $(ck).each(function () {
                if ($(this).attr("data-orderStatus") == "38"||$(this).attr("data-orderStatus") ==50) {
                    flag = false;
                    return;
                }
                params2.push($(this).val());
            });
            debugger;
            if (!flag) {
                faildMsg("所选订单包含已二次打款订单。请先撤销二次打款，然后再撤销本金打款，谢谢！");
                return false;
            }
            confirmDialog("您确认撤销本金打款吗?", function () {
                $.ajax({
                    url: ctx + "/newFinancial/principalLendingComeBack.action",
                    type: "post",
                    data: JSON.stringify(params2),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/newFinancial/queryForPrincipalPlayMoney.action";
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
    var getDate ={
        elem: '#get-principal-date',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose	: function (datas) {
            if (datas == '') {
                change_error_style($("#get-principal-date"), "add");
            } else {
                change_error_style($("#get-principal-date"), "remove");
            }
        },
        clear: function () {
            start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            start.max = laydate.now();	//将开始日的最大值设定为今天
        }
    }
    laydate(getDate);

});
//表单校验
function validDate(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "get-principal-date") {
                $(lableId).attr('tip', '请输入本金打款日期。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}

