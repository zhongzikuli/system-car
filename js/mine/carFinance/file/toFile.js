jQuery(function ($) {
	
	 //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });
	$(".status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "160px"
	});
	var sTime = {
	        elem: '#sTime',
	        format: 'YYYY-MM-DD',
			min: '1970-01-01', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			start: laydate.now(),
			choose: function (datas) {
				eTime.min = datas; //开始日选好后，重置结束日的最小日期
			},
			clear: function () {
				eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
			}
	    };
	    var eTime = {
	        elem: '#eTime',
	        format	: 'YYYY-MM-DD',
			min		: "1970-01-01",
			max		: laydate.now(),
			istoday	: false,				//显示今天
			issure	: true,					//确认框
			istime	: false,
			start: laydate.now(0, 'YYYY年MM月DD日'),
			choose	: function (datas) {
				sTime.max = datas;			//结束日选好后，重置开始日的最大日期
			},
			clear: function () {
				sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
				sTime.max = laydate.now();	//将开始日的最大值设定为今天
			}
	    };
	    laydate(sTime);
	    laydate(eTime);

	    //征信退回
	    $(".reset-btn").on("click", function(){
	        $("#sTime").val('');
	        $("#eTime").val('');
			$("#orderNo").val('');
	        $("#search-keyword").val('');
			$(".status").val(1).trigger("chosen:updated");
	        $("#departmentId").val("").trigger("chosen:updated");
			$("#search-order-status").val(1).trigger("chosen:updated");
	    });


	$(".refuse-credit").on("click", function () {
		var id = $(this).attr("data-id");
		refuseCredit(id);
	});
})
//订单详情
function detail(id,title) {
	var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
	openTabForParent(url, "-order-detail-" + id, "订单详情-"+title);
}
//上传分期附件
function uploadInstallment(id,goBackUrl) {
	window.location.href = ctx + "/installmentFile/preUploadInstallment.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//管理订单附件
function fileManage(id,goBackUrl) {
    window.location.href = ctx + "/cfFileCenter/preFileManage.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//上传面签附件
function uploadInterview(id,goBackUrl) {
    window.location.href = ctx + "/cfFileCenter/preUploadInterview.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//抵押材料
function uploadMortgage(id,goBackUrl) {
    window.location.href = ctx + "/cfMortgageRegist/preMortgageFile.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//上传其他附件
function uploadOther(id,goBackUrl) {
    window.location.href = ctx + "/cfFileCenter/preUploadOther.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//候补资料
function waitringFile(id,goBackUrl) {
    window.location.href = ctx + "/cfSupplyMaterial/preWaitingFile.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//过户资料
function uploadOldCarFile(id,goBackUrl) {
    window.location.href = ctx + "/cfSupplyMaterial/preOldCarFile.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//订单轨迹
function toOrderTrack(id,goBackUrl) {
    window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id +"&goBackUrl="+goBackUrl;
}
//征信退回
function refuseCredit(id) {
	confirmDialog("您确定要通融申请？", function () {
		var options = {
			width: 450,
			top: 200,
			height: 260,
			overlay: true,
			dispose: true,
			move: true,
			title: '新增',
			callback: function () {
				var flag = false;
				if ($("#protocolCreateForm").valid("protocolCreateForm")) {
					var remark = $("#credit-content").val()
					var param = {};
					param.id = id;
					param.remark = remark;
					loadingShow();
					$.ajax({
						type: "post",
						url: ctx + "/accommodationApply/apply.action",
						data: param,
						dataType: "json",
						success: function (result) {
							loadingHide();
							successMsg(result.message, function () {
								window.location.href = ctx + "/accommodationApply/queryApplyList.action";
							});
						},
						error: function (result) {
							faildMsg("请求异常：" + result.status + "");
						}
					});
					if (flag) {
						return false;
					}
				} else {
					return false;
				}
			}
		};
		var addDlg = new Dialog("#protocolCreate-dialog", options);
		addDlg.show();
	});
}
//协议表单校验
function validProtocolForm(lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {
		if ($(lableId).val() == null || $(lableId).val() == "") {
			if ($(lableId).attr("id") == "credit-content") {
				$(lableId).attr('tip', '退回备注为空，请重新输入。');
				return "faild";
			}
			return "success";
		}
		if ($(lableId).val() != null && $(lableId).val() != "") {
			var _this = $(lableId);
			//新建
			if ($(lableId).attr("id") == "credit-content") {
				var name = $("#credit-content").val();
				if (name.length > 200) {
					$(lableId).attr('tip', '退回备注长度不能超过200个字符');
					return "faild";
				} else {
					return "success";
				}
			}
		}
		return "success";
	}
}