$(document).ready(function(){

    //订单详情查看
    $(".detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });

    var sTime = {
        elem: '#sTime',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var eTime = {
        elem: '#eTime',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            sTime.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            sTime.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(sTime);
    laydate(eTime);


//重置按钮
    $(".reset-btn").on("click", function(){
        $("#sTime").val("");
        $("#eTime").val("");
        $("#search-select").val("").trigger('chosen:updated');
        $("#loanBankId").val("").trigger('chosen:updated');
        $("#nameOrId").val("");
    });

    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"150px"
    };
    $("#search-select").chosen(config);
    $("#loanBankId").chosen(config);

//刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

    $(".sendOff").on("click",function(){
        var orderId=$(this).attr("data-id");
        sendOff(orderId);
    });

    function sendOff(orderId) {
        var options = {
            width: 500,
            top: 200,
            height: 230,
            overlay: true,
            dispose: true,
            move: true,
            title: '合同寄出',
            url: "",
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/contractReceive/getContractReceiveInfo.action",
                    type: "post",
                    data: {
                        businessOrderAcceptId:orderId
                    },
                    dataType: "json",
                    success: function (data) {
                        $("#teamDeliverContractDate").val(data.rows.teamDeliverContractDate);
                        $("#teamDeliverContractRemark").val(data.rows.teamDeliverContractRemark);
                    }
                });

                var eTime = {
                    elem: '#teamDeliverContractDate',
                    format: 'YYYY-MM-DD ',
                    min: "1970-01-01",
                    istoday: true, //显示今天
                    issure: true,  //确认框
                    choose: function (datas) {
                        if ("" != datas) {
                            change_error_style($("#teamDeliverContractDate"), "remove");
                            creatDlg.isSubmit = true;
                        } else {
                            change_error_style($("#teamDeliverContractDate"), "add");
                            creatDlg.isSubmit = false;
                        }
                    },
                    clear: function () {
                    }
                };
                laydate(eTime);
                $("body").click(function(){
                    try {
                        laydate.getDefault().close();
                    } catch (e) {
                    }
                });
            },
            onAfterHide: function () {
                $("body").find("#laydate_box").hide();
            },
            callback: function () {
                var flag = false;
                if ($("#concartSendForm").valid("concartSendForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/contractSendOff/sendOff.action",
                        type: "post",
                        data: {
                            teamDeliverContractDate: $("#teamDeliverContractDate").val(),
                            teamDeliverContractRemark:$("#teamDeliverContractRemark").val(),
                            businessOrderAcceptId:orderId
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    var isSendOff=$("#search-select").val();
                                    var loanBankId=$("#loanBankId").val();
                                    var sTime=$("#sTime").val();
                                    var eTime=$("#eTime").val();
                                    var nameOrId=$("#nameOrId").val();
                                    window.location.href = ctx + "/contractSendOff/query.action?isSendOff="+isSendOff+"&loanBankId="+loanBankId+"&sendStartTime="+sTime
                                    +"&sendEndTime="+eTime+"&nameOrId="+nameOrId;
                                });
                            }else {
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
        creatDlg = new Dialog("#concartSend-dialog", options);
        creatDlg.show();
    }

});

//表单校验
function validconcartSendOff(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "teamDeliverContractDate" ) {
                $(lableId).attr('tip', '寄出日期为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "teamDeliverContractRemark" ) {
                $(lableId).attr('tip', '备注信息为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}





