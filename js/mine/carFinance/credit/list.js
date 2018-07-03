jQuery(function ($) {
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
        format: 'YYYY-MM-DD',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false,				//显示今天
        issure: true,					//确认框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose: function (datas) {
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
    $(".refuse-credit").on("click", function () {
        refuseCredit();
    });
    //征信购车人资料下载
    $(".download-file").on("click", function () {
        downloadFile();
    });
    //征信购车人资料下载
    $(".download-pic").on("click", function () {
        downloadPic();
    });
    //征信购车人资料下载
    $(".download-excel").on("click", function () {
        downExcel();
    });
    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });
    $(".reset-btn").on("click", function () {
        $("#sTime").val('');
        $("#eTime").val('');
        $("#search-keyword").val('');
        $("#orderNo").val('');
        $("#search-select").val(1);
        $("#search-select").trigger("chosen:updated");
    });
    $(".status").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });
    //自动查询
    $(".auto-query-credit-btn").on("click", function(){
		var id = $(this).attr("data-id");
		loadingShow();
		$.ajax({
			type	: "post",
			url		: ctx + "/bankCreditReport/autoQuery.action",
			data	: {
				"id"	: id
			},
			dataType: "json",
			success	: function (result) {
				loadingHide();
				successMsg(result.message, function () {
					$(".refresh-btn").trigger("click");
				});
			},
			error: function (result) {
				faildMsg("请求异常：" + result.status + "");
			}
		});
	});
});
//订单详情
function detail(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-" + title);
}
//银行征信查询
function bankCreditReport(id) {
    window.location.href = ctx + "/bankCreditReport/bankCreditReport.action?id=" + id;
}
//征信退回
function refuseCredit() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要退回征信。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要退回征信？", function () {
        var param = {};
        param.ids = ids.toString();
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
                    param.ids = ids.toString();
                    param.remark = remark;
                    loadingShow();
                    $.ajax({
                        type: "post",
                        url: ctx + "/cfBusinessOrderAccept/refuse.action",
                        data: param,
                        dataType: "json",
                        success: function (result) {
                            loadingHide();
                            successMsg(result.message, function () {
                                window.location.href = ctx + "/bankCreditReport.action";
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
function downloadFile() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要下载的征信记录。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要下载征信记录？", function () {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/cfBusinessOrderAccept/download.action?ids=" + ids.toString());
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
    });
}
function downloadPic() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要下载的征信记录。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要下载征信记录？", function () {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/bankCreditReport/downloadPics.action?ids=" + ids.toString());
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
    });
}
function downExcel() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要导出的征信记录。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要导出征信记录？", function () {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/bankCreditReport/downExcel.action?ids=" + ids.toString());
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
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