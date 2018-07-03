//管理订单附件
function fileManage(id, goBackUrl) {
    window.location.href = ctx + "/cfFileCenter/preFileManage.action?id=" + id + "&goBackUrl=" + goBackUrl;
}
//上传面签附件
function uploadInterview(id, goBackUrl) {
    window.location.href = ctx + "/cfFileCenter/preUploadInterview.action?id=" + id + "&goBackUrl=" + goBackUrl;
}
//抵押材料
function uploadMortgage(id) {
    window.location.href = ctx + "/cfMortgageRegist/preMortgageFile.action?id=" + id;
}
//上传其他附件
function uploadOther(id, goBackUrl) {
    window.location.href = ctx + "/cfFileCenter/preUploadOther.action?id=" + id + "&goBackUrl=" + goBackUrl;
}
//候补资料
function waitringFile(id) {
    window.location.href = ctx + "/cfSupplyMaterial/preWaitingFile.action?id=" + id;
}
//过户资料
function uploadOldCarFile(id) {
    window.location.href = ctx + "/cfSupplyMaterial/preOldCarFile.action?id=" + id;
}
//订单轨迹
function toOrderTrack(id) {
    window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id;
}
//订单详情
function detail(id) {
    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
}
//初审单录入
function orderApply(id) {
    window.location.href = ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + id;
}
//上传提车资料
function uploadCarFile(id) {
    window.location.href = ctx + "/carInfo/carInformationBackEnter.action?id=" + id;
}
//预审核页面
function preAudit(id) {
    window.location.href = ctx + "/audit/preAudit.action?orderId=" + id;
}
//银行征信查询
function bankCreditReport(id) {
    window.location.href = ctx + "/bankCreditReport/bankCreditReport.action?id=" + id;
}

//垫付申请
function paymentApply(id, realName) {
    editProtocol(id, realName, getData(id));
}

//垫款申请
function editProtocol(id, name, result) {
    var listLength = null;
    if (result != null && result != undefined && result != "") {
        listLength = result['list'].length;
    }
    var options = {
        width: 600,
        top: 200,
        height: listLength ? 490 : 320,
        overlay: true,
        dispose: true,
        move: true,
        title: '修改',
        onBeforeShow: function () {
            var itemHtml = '';
            var list = result['list'];
            if (list == null || list.length < 1) {
                //$("#audit-info").html("暂无审核信息");
            } else {
                for (var i = 0; i < list.length; i++) {
                    itemHtml += '<div class="infor-item">' +
                        ' <div class="box-item row">' +
                        '<div class="col-xs-3">' +
                        '<div class="item-text">' +
                        '<label for="">审核类型:</label>' +
                        '</div>' +
                        list[i]['bussinessTypeName'] +
                        '</div>' +
                        '<div class="col-xs-2">' +
                        '<div class="item-text">' +
                        '<label for="">审核状态:</label>' +
                        '</div>' +
                        list[i]['auditStatusName'] +
                        '</div>' +
                        '<div class="col-xs-3">' +
                        '<div class="item-text">' +
                        '<label for="">备注:</label>' +
                        '</div>' +
                        list[i]['auditBak'] +
                        '</div>' +
                        '<div class="col-xs-2">' +
                        '<div class="item-text">' +
                        '<label for="">审核人员:</label>' +
                        '</div>' +
                        list[i]['auditRealName'] +
                        '</div>' +
                        '<div class="col-xs-2">' +
                        '<div class="item-text">' +
                        '<label for="">审核时间:</label>' +
                        '</div>' +
                        /*'<fmt:formatDate value="' +*/ list[i]['auditTime'] + /*+ '" pattern="yyyy-MM-dd HH:mm:ss "/>' +*/
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="hr-line-dashed" style="margin:15px;"></div>';
                }
                $("#audit-info").append(itemHtml);
            }
            $("#applyPay-buyer-name").val(name)
            $("#applyPay-moneyAmount").val(result.moneyAmount)
            $("#applyPay-serviceFee").val(result.serviceFee)
            $("#applyPay-poundage").val(result.poundage)
            $("#applyPay-agreeEnsureMoney").val(result.agreeEnsureMoney)
            $("#applyPay-channelEnsureMoney").val(result.channelEnsureMoney)
            $("#applyPay-licensePlateEnsureMoney").val(result.licensePlateEnsureMoney)
            $("#applyPay-amountMoney").val(result.amountMoney)
            $("#applyPay-id").val(result.id)
        },
        callback: function () {
            var flag = false;
            if ($("#applyPayCreateForm").valid("applyPayCreateForm")) {
                $.ajax({
                    url: ctx + "/applyPay/applyPay.action",
                    type: "post",
                    data: {
                        "orderId": id,
                        "id": $("#applyPay-id").val(),
                        'moneyAmount': $("#applyPay-moneyAmount").val(),
                        'serviceFee': $("#applyPay-serviceFee").val(),
                        'poundage': $("#applyPay-poundage").val(),
                        'agreeEnsureMoney': $("#applyPay-agreeEnsureMoney").val(),
                        'channelEnsureMoney': $("#applyPay-channelEnsureMoney").val(),
                        'licensePlateEnsureMoney': $("#applyPay-licensePlateEnsureMoney").val(),
                        'amountMoney': $("#applyPay-amountMoney").val()
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/applyPay/applyPayList.action";
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
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
    var editDlg = new Dialog("#applyPayCreate-dialog", options);
    editDlg.show();
}

//获取审核信息
function getData(id) {
    var result = '';
    $.ajax({
        url: ctx + "/applyPay/findAuditInfo.action",
        type: "post",
        data: {
            'id': id
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                result = data.rows;
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    })
    return result;
}