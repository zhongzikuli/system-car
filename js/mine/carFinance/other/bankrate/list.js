jQuery(function ($) {
	$(".bankStatus").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "280px"
    });
	$(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
	 $(".reset-btn").on("click", function(){
		 $(".bankStatus").val("");
	       $(".bankStatus").trigger("chosen:updated");
	        $(".status").val("");
	        $(".status").trigger("chosen:updated");
	    });
})
//删除信息
function deleteBankRate() {
    var ck = $("input[name='bankList_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要删除的信息。");
        return
    } else {
        var idArr = new Array();
        var userIsvalid = true;
        $(ck).each(function () {
            idArr.push($(this).val());
            if ($(this).attr("isvalid") == "0") {
                userIsvalid = false;
            }
        });
        if (!userIsvalid) {
            alertDialog("所选信息包含无效信息，不允许删除");
            return false;
        }
        confirmDialog("确认删除选中的银行利率信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            $.ajax({
                url: ctx + "/bankRate/toDelete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/bankRate/query.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        })
    }
}

//去修改页面
function editBankRate(id) {
	window.location.href = ctx + '/bankRate/toEdit.action?id='+id;
}
//去新增页面
function createBankRate() {
    window.location.href = ctx + '/bankRate/toAdd.action';
}
function downloadFile(id) {
		confirmDialog("确认下载订单相关文件吗？", function () {
	        window.location.href = ctx + "/bankRate/download.action?id="+id;
	    })
	
}
function editStop(id) {
    $("#start" + id).hide();
    $("#stop" + id).show();
    loadingShow();
    $.ajax({
        url: ctx + "/bankRate/updateStatus.action",
        type: "post",
        data: {
            "id": id,
            "forbidden":0
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bankRate/query.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function editStart(id) {
    $("#start" + id).show();
    $("#stop" + id).hide();
    loadingShow();
    $.ajax({
        url: ctx + "/bankRate/updateStatus.action",
        type: "post",
        data: {
            "id": id,
            "forbidden": 1
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bankRate/query.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

