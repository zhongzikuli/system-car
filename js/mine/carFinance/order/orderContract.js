$(function () {

    var advanceStartDate = {
        elem: '#advanceStartDate',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            advanceEndDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            advanceEndDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var advanceEndDate = {
        elem: '#advanceEndDate',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            advanceStartDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            advanceStartDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    laydate(advanceStartDate);
    laydate(advanceEndDate);

    var contractEndDate = {
        elem: '#contractEndDate',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            contractStartDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            contractStartDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var contractStartDate = {
        elem: '#contractStartDate',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            contractEndDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            contractEndDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    laydate(contractEndDate);
    laydate(contractStartDate);


    var finalAuditStartTime = {
        elem: '#finalAuditStartTime',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            finalAuditEndTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            finalAuditEndTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var finalAuditEndTime = {
        elem: '#finalAuditEndTime',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            finalAuditStartTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            finalAuditStartTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    laydate(finalAuditStartTime);
    laydate(finalAuditEndTime);

    //下拉框初始化
    var config = {
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    };
    $(".chosen-select").chosen(config);
    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    //重置按钮
    $(".reset-btn").on("click", function () {
        $(".simple_query").find("input,select").each(function (i, n) {
            var name = $(n).attr("name");
            $(n).val('');
        });
        $(".chosen-select").trigger("chosen:updated");
    });

    //excel合同生成
    $(".download-excel").on("click", function () {
        var id = $(this).data("id");
        var bankId = $(this).data("bankid");
        downloadExcel(id, bankId);
    });

    $(".contractDist").on("click", function () {
        contractDist();
    });


    function downloadExcel(id, bankId) {
        confirmDialog("您确定要生成合同？", function () {
            var frame = $('<iframe>');//定义一个iframe
            frame.attr("src", ctx + "/cfBusinessOrderAccept/downloadExcel.action?id=" + id + "&bankId=" + bankId);
            frame.attr("style", "display:none");
            frame.append("</iframe>")
            $("body").append(frame);
        });
    }

});

//批量合同分配
function importExcel() {
    var options = {
        width: 400,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '批量合同分配',
        onAfterShow: function () {
            new HYUpload({
                auto: true,
                containerId: '#addUploader',
                uploadImg: false,						//图片上传标记
                dropTip: '',
                buttonText: '选择文件',
                server: ctx + '/cfBusinessOrderAccept/importExcel.action'
            });
        },
        callback: function () {
            window.location.reload();
        }
    };

    new Dialog("#excel-dialog", options).show();
}

//合同分配
function contractDist() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要分配的合同。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    var options = {
        width: 350,
        top: 200,
        height: 145,
        overlay: true,
        dispose: true,
        move: true,
        title: "合同分配",
        onBeforeShow: function () {
            $(".chosen-select").chosen({
                disable_search_threshold: 8,
                no_results_text: "没有找到",
                allow_single_deselect: true,
                width: "100%"
            });
        },
        callback: function () {
            if ($("#contractForm").valid("contractForm")) {
                var param = {};
                param.ids = ids.toString();
                param.userId = $("select[name='userId']").val();
                $.ajax({
                    url: ctx + "/cfBusinessOrderAccept/contractDist.action",
                    type: "post",
                    data: param,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.reload();
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            } else {
                return false;
            }
        }
    };

    var contract = new Dialog("#contract-dialog", options);

    $("#userId").on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($("#userId").parent(), "remove");
        } else {
            change_error_style($("#userId").parent(), "add");
        }
    });
    contract.show();
}

function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == "" || $(lableId).val() == null) {
            $(lableId).parent().attr('tip', '请输入正确的套打人员。').addClass("input_validation-failed");
            return "faild";
        }
        return "success";
    }
}

//导出excel
function exportExcel() {
    confirmDialog("您确定要导出订单信息吗？", function () {
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
        frame.attr("src", ctx + "/cfBusinessOrderAccept/exportList.action?" + param);
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
    });
}

//订单详情
function detail(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-" + title);
}
