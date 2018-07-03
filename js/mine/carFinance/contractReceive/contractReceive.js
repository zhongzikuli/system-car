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
        $("#departmentId").val("").trigger('chosen:updated');
        $("#nameOrId").val("");
    });

    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"150px"
    };
    $("#search-select").chosen(config);
    $("#departmentId").chosen(config);

//刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

    $(".concartReceive").on("click",function(){
        var orderId=$(this).attr("data-id");
        concartReceive(orderId);
    });
    //导入
    $(".exportIn").on("click",function(){
        exportIn();
    });

    function exportIn() {
        var options = {
            width: 400,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            title: '导入',
            onAfterShow: function () {
                new HYUpload({
                    auto: true,
                    containerId: '#importUploader',
                    uploadImg: false,						//图片上传标记
                    dropTip: '',
                    buttonText: '选择文件',
                    server: ctx + '/contractReceive/exportIn.action'
                });
            },
            callback: function () {
                if($(".filelist li").length==1){
                    successMsg("导入成功！", 1000, function () {
                        window.location.reload();
                    });
                }else{
                    faildMsg("文件不能为空,请重新上传");
                    return false;
                }


            }
        };

        new Dialog("#import-dialog", options).show();
    }


    //导出
    $(".exportOut").on("click",function(){
        var isreceive=$("#search-select").val();
        exportOut(isreceive);
    });
    function exportOut(isreceive){
        var ck = $("input[name='contractReceive']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的内容。");
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
                alertDialog("所选信息包含无效账户");
                return false;
            }
            confirmDialog("确认导出选中的内容吗？", function () {
                window.location.href=ctx+"/contractReceive/exportOut.action?idArr="+idArr.toString()+"&isreceive="+isreceive;
            })
        }
    }

    function concartReceive(orderId) {
        var options = {
            width: 500,
            top: 200,
            height: 230,
            overlay: true,
            dispose: true,
            move: true,
            title: '合同收到',
            url: "",
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/contractSendOff/getContractReceiveInfo.action",
                    type: "post",
                    data: {
                        businessOrderAcceptId:orderId
                    },
                    dataType: "json",
                    success: function (data) {
                        $("#bankReceiveContractDate").val(data.rows.bankReceiveContractDate);
                        $("#bankReceiveContractRemark").val(data.rows.bankReceiveContractRemark);
                    }
                });

                var eTime = {
                    elem: '#bankReceiveContractDate',
                    format: 'YYYY-MM-DD ',
                    min: "1970-01-01",
                    istoday: true, //显示今天
                    issure: true,  //确认框
                    choose: function (datas) {
                        if ("" != datas) {
                            change_error_style($("#bankReceiveContractDate"), "remove");
                            creatDlg.isSubmit = true;
                        } else {
                            change_error_style($("#bankReceiveContractDate"), "add");
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
                if ($("#concartReceiveForm").valid("concartReceiveForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/contractReceive/receiveInfo.action",
                        type: "post",
                        data: {
                            bankReceiveContractDate: $("#bankReceiveContractDate").val(),
                            bankReceiveContractRemark:$("#bankReceiveContractRemark").val(),
                            businessOrderAcceptId:orderId
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    var isreceive=$("#search-select").val();
                                    var departmentId=$("#departmentId").val();
                                    var receiveStartTime=$("#sTime").val();
                                    var receiveEndTime=$("#eTime").val();
                                    var nameOrId=$("#nameOrId").val();
                                    window.location.href = ctx + "/contractReceive/query.action?isreceive="+isreceive+"&departmentId="+departmentId+"&receiveStartTime="+receiveStartTime
                                        +"&receiveEndTime="+receiveEndTime+"&nameOrId="+nameOrId;
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
        creatDlg = new Dialog("#concartReceive-dialog", options);
        creatDlg.show();
    }

});

//表单校验
function validconcartReceive(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "bankReceiveContractDate" ) {
                $(lableId).attr('tip', '收到日期为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "bankReceiveContractRemark" ) {
                $(lableId).attr('tip', '备注信息为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}





