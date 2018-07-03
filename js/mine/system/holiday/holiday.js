$(function () {
    //新增非工作日维护
    var config = {
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    }
    var stTime = {
        elem: "#stTime",
        format: 'YYYY-MM-DD', //日期格式
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            endTime.min = datas;
        },
        clear: function () {
        }
    }
    var endTime = {
        elem: "#endTime",
        format: 'YYYY-MM-DD', //日期格式
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            stTime.min = datas;
        },
        clear: function () {
        }
    }
    laydate(stTime);
    laydate(endTime);

    function addDate(num) {
        var html = '';
        html += '<div class="form-group ">' +
            '<div class="col-sm-12">' +
            '<label class="col-xs-3 control-label"><span class="red">*</span>非工作日:</label>' +
            '<div class="col-xs-8">' +
            '<input type="text" class="form-control" name="curDate" id="cuDate' + num + '">' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    }

    $(".init-btn").on("click", function () {
        var num = 0;
        var options = {
            width: 350,
            top: 200,
            height: 300,
            overlay: true,
            dispose: true,
            move: true,
            title: "工作日维护",
            onAfterShow: function () {
                var dialogHeight;
                var startDate = {
                    elem: "#startDate",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if (datas == '') {
                            initDlg.isSubmit = false;
                            change_error_style($("#startDate"), "add");
                        } else {
                            endDate.min = datas;
                            initDlg.isSubmit = true;
                            change_error_style($("#startDate"), "remove");
                        }
                    },
                    clear: function () {

                    }
                }
                var endDate = {
                    elem: "#endDate",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        startDate.min = datas;
                        if (datas == '') {
                            initDlg.isSubmit = false;
                            change_error_style($("#startDate"), "add");
                        } else {
                            initDlg.isSubmit = true;
                            change_error_style($("#startDate"), "remove");
                        }
                    },
                    clear: function () {
                    }
                };
                laydate(startDate);
                laydate(endDate);

                var holidayDate = {
                    elem: "#cuDate0",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if (datas == '') {
                            initDlg.isSubmit = false;
                            change_error_style($("#cuDate0"), "add");
                        } else {
                            initDlg.isSubmit = true;
                            change_error_style($("#cuDate0"), "remove");
                        }
                    },
                    clear: function () {

                    }
                };
                laydate(holidayDate);
                $("#add-date").on("click", function () {
                    num++;
                    var formHtml = addDate(num);
                    $("#holidayForm .holiday-area").append(formHtml);
                    dialogHeight = $(".dialog-container").height();
                    if ($(".holiday-area .form-group").length <= 5) {
                        $(".dialog-container").height(dialogHeight + 49);
                    } else {
                        $(".holiday-area").css({
                            "overflow-y": "scroll",
                            "overflow-x": "hidden",
                            "max-height": 245
                        })
                    }
                    $("#cuDate" + num).on("click", function () {
                        laydate({
                            format: 'YYYY-MM-DD', //日期格式
                            istime: false, //是否开启时间选择
                            isclear: true, //是否显示清空
                            istoday: false, //是否显示今天
                            issure: false, //是否显示确认
                            choose: function (datas) {
                            	if (datas == '') {
                                    initDlg.isSubmit = false;
                                    change_error_style($("#cuDate" + num), "add");
                                } else {
                                    initDlg.isSubmit = true;
                                    change_error_style($("#cuDate" + num), "remove");
                                }
                            },
                            clear: function () {

                            }
                        });
                    })
                })
                $("#delete-date").on("click", function () {
                    num--;
                    if (num >= 0) {
                        $(".holiday-area .form-group:last").remove();
                        dialogHeight = $(".dialog-container").height();
                        if ($(".holiday-area .form-group").length > 4) {

                        } else {
                            $(".dialog-container").height(dialogHeight - 49);
                            $(".holiday-area").css({
                                "overflow-y": "hidden",
                            })
                        }
                    } else {
                        num = 0;
                    }
                })

                $("body").click(function () {
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
                if ($("#holidayForm").valid("holidayForm")) {
                    loadingShow();
                    var startDate = $("#startDate").val();
                    var endDate = $("#endDate").val();
                    var curDate = "";
                    $("#holidayForm input[name='curDate']").each(function () {
                        curDate += $(this).val() + ",";
                    });
                    $.ajax({
                        url: ctx + "/holiday/handlerDate.action",
                        type: "post",
                        data: {startDate: startDate, endDate: endDate, curDate: curDate},
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
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
        var initDlg = new Dialog("#workingday-dialog", options);
        initDlg.show();
    });


    //编辑
    $(".edit-btn").on("click", function () {
        var id = $(this).data("id");
        var options = {
            width: 450,
            top: 200,
            height: 440,
            overlay: true,
            dispose: true,
            move: true,
            title: "工作日编辑",
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/holiday/preEdit.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var r = data.rows;
                            $("#holidayEdit input[name='id']").val(r.id);
                            $("#holidayEdit select[name='type']").val(r.type);
                            $("#holidayEdit input[name='curDate']").val(r.curDateStr);
                            $("#holidayEdit input[name='threeDay']").val(r.threeDayStr);
                            $("#holidayEdit input[name='fiveDay']").val(r.fiveDayStr);
                            $("#holidayEdit input[name='sevenDay']").val(r.sevenDayStr);
                            $("#holidayEdit input[name='tenDay']").val(r.tenDayStr);
                            $("#holidayEdit input[name='fifteenDay']").val(r.fifteenDayStr);
                            $("#holidayEdit input[name='twentyDay']").val(r.twentyDayStr);
                            $("#holidayEdit input[name='twentyFiveDay']").val(r.twentyFiveDayStr);
                            $("#holidayEdit input[name='thirtyDay']").val(r.thirtyDayStr);
                            $("#holidayEdit input[name='thirtyFiveDay']").val(r.thirtyFiveDayStr);
                            $("#holidayEdit input[name='fortyDay']").val(r.fortyDayStr);
                            $("#holidayEdit input[name='fortyFiveDay']").val(r.fortyFiveDayStr);
                            $("#holidayEdit input[name='sixtyDay']").val(r.sixtyDayStr);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            onAfterShow: function () {
                var curDate = {
                    elem: "#curDate",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if (datas == '') {
                            change_error_style($("#startDate"), "add");
                        } else {
                            change_error_style($("#startDate"), "remove");
                        }
                    },
                    clear: function () {
                    }
                }
                editDate("#threeDay",curDate);
                editDate("#fiveDay",curDate);
                editDate("#sevenDay",curDate);
                editDate("#tenDay",curDate);
                editDate("#fifteenDay",curDate);
                editDate("#twentyDay",curDate);
                editDate("#twentyFiveDay",curDate);
                editDate("#thirtyDay",curDate);
                editDate("#thirtyFiveDay",curDate);
                editDate("#fortyDay",curDate);
                editDate("#fortyFiveDay",curDate);
                editDate("#sixtyDay",curDate);

                $("body").click(function () {
                    try {
                        laydate.getDefault().close();
                    } catch (e) {

                    }
                });
            }, onAfterHide: function () {
                $("body").find("#laydate_box").hide();
            },
            callback: function () {
                if ($("#holidayEdit").valid("holidayEdit")) {
                    loadingShow();
                    var param = {};
                    $("#holidayEdit").find("select,input").each(function (i, n) {
                        var name = $(this).attr('name');
                        if (name == 'type' || name == 'id') {
                            param[name] = $.trim($(n).val());
                        } else if ($.trim($(n).val()) != '' && $.trim($(n).val()) != undefined){
                            param[name] = new Date($.trim($(n).val()));
                        }
                    });
                    $.ajax({
                        url: ctx + "/holiday/edit.action",
                        type: "post",
                        data: param,
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
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
        new Dialog("#holidayEdit-dialog", options).show();
    });

    function editDate(id,curDate){
    	var editDate = {
                elem: id,
                format: 'YYYY-MM-DD', //日期格式
                istime: false, //是否开启时间选择
                isclear: true, //是否显示清空
                istoday: false, //是否显示今天
                issure: false, //是否显示确认
                choose: function (datas) {
                    curDate.min = datas;
                }
            };
    	laydate(editDate);
     }
});

//导入excel
function importExcel() {
    var options = {
        width: 400,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '导入非工作日',
        onAfterShow: function () {
            new HYUpload({
                auto: true,
                containerId: '#addUploader',
                uploadImg: false,						//图片上传标记
                dropTip: '',
                buttonText: '选择文件',
                server: ctx + '/holiday/importDate.action'
            });
        },
        callback: function () {
            window.location.reload();
        }
    };

    new Dialog("#excel-dialog", options).show();
}


function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).attr("id") == "curDate") {
            if ($(lableId).val() === '') {
                $(lableId).attr('tip', '请输入正确的日期。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }else  if ($(lableId).attr("id") == "startDate") {
            if ($(lableId).val() === '') {
                $(lableId).attr('tip', '请输入正确的日期。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }else  if ($(lableId).attr("id") == "endDate") {
            if ($(lableId).val() === '') {
                $(lableId).attr('tip', '请输入正确的日期。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }else if($(lableId).attr("name") == "curDate"){
        	if ($(lableId).val() === '') {
                $(lableId).attr('tip', '请输入正确的日期。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}
