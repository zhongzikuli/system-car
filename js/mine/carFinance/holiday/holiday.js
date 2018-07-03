$(function () {
    //新增非工作日维护
	var config ={
			 disable_search_threshold: 8,
             no_results_text: "没有找到",
             allow_single_deselect: true,
             width: "100%"
	}
	
    $(".add-btn").on("click", function () {
        var options = {
            width: 350,
            top: 200,
            height: 200,
            overlay: true,
            dispose: true,
            move: true,
            title: "非工作日维护",
            onAfterShow: function () {
                $(".chosen-select").chosen(config);
                var sTimeCreat = {
                        elem: '#curDate',
                        format: 'YYYY-MM-DD', //日期格式
                        isclear: true, //是否显示清空
                        istoday: false, //是否显示今天
                        issure: false, //是否显示确认
                        choose: function (datas) {
                        	 if (datas == '') {
                        		 creatDlg.isSubmit = false;
                                 change_error_style($("#curDate"), "add");
                             } else {
                            	 creatDlg.isSubmit = true;
                                 change_error_style($("#curDate"), "remove");
                             }
                        }
                 };
                laydate(sTimeCreat);
                
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
                if ($("#unholidayForm").valid("unholidayForm")) {
                    var type = $("#unholidayForm select[name='type']").val();
                    var curDate = $("#unholidayForm input[name='curDate']").val();
                    $.ajax({
                        url: ctx + "/holiday/add.action",
                        type: "post",
                        data: {type: type, curDate: new Date(curDate)},
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
        creatDlg = new Dialog("#unworkingday-dialog", options);
        creatDlg.show();
    });

    $(".init-btn").on("click", function () {
        var options = {
            width: 350,
            top: 200,
            height: 200,
            overlay: true,
            dispose: true,
            move: true,
            title: "工作日维护",
            onAfterShow: function () {
                var startDate = {
                    elem: "#startDate",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if (datas == '') {
                        	inittDlg.isSubmit = false;
                            change_error_style($("#startDate"), "add");
                        } else {
                        	endDate.min = datas;
                        	inittDlg.isSubmit = true;
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
                        	inittDlg.isSubmit = false;
                            change_error_style($("#startDate"), "add");
                        } else {
                        	inittDlg.isSubmit = true;
                            change_error_style($("#startDate"), "remove");
                        }
                    },
                    clear: function () {
                    }
                };
                laydate(startDate);
                laydate(endDate);

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
                    $.ajax({
                        url: ctx + "/holiday/handlerDate.action",
                        type: "post",
                        data: {startDate: startDate, endDate: endDate},
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
        initDlg = new Dialog("#workingday-dialog", options);
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
            onBeforeShow:function () {
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
                            $("#holidayEdit input[name='curDate']").val(r.curDate);
                            $("#holidayEdit").find("id").val(r.id);
                            $("#holidayEdit").find("id").val(r.id);
                            $("#holidayEdit").find("id").val(r.id);

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
                var threeDay = {
                    elem: "#threeDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };

                var fiveDay = {
                    elem: "#fiveDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var sevenDay = {
                    elem: "#sevenDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var tenDay = {
                    elem: "#tenDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var fifteenDay = {
                    elem: "#fifteenDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var twentyDay = {
                    elem: "#twentyDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var twentyFiveDay = {
                    elem: "#twentyFiveDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var thirtyDay = {
                    elem: "#thirtyDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var thirtyFiveDay = {
                    elem: "#thirtyFiveDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var fortyDay = {
                    elem: "#fortyDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var fortyFiveDay = {
                    elem: "#fortyFiveDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };
                var sixtyDay = {
                    elem: "#fortyFiveDay",
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        curDate.min = datas;
                    },
                    clear: function () {
                    }
                };

                laydate(curDate);
                laydate(threeDay);
                laydate(fiveDay);
                laydate(sevenDay);
                laydate(tenDay);
                laydate(fifteenDay);
                laydate(twentyDay);
                laydate(twentyFiveDay);
                laydate(thirtyDay);
                laydate(thirtyFiveDay);
                laydate(fortyDay);
                laydate(fortyFiveDay);
                laydate(sixtyDay);

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
                    $.ajax({
                        url: ctx + "/holiday/edit.action",
                        type: "post",
                        data: $("#holidayEdit").serialize(),
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
        if($(lableId).attr("id") == "curDate"){
        	if ($(lableId).val() === '') {
                $(lableId).attr('tip', '请输入正确的日期。').addClass("input_validation-failed");
                return "faild";
            }
        	return "success";
        }
        return "success";
    }
}
