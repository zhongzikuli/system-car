$(document).ready(function () {
    $(".white-btn-all").on('click', function () {//批量拉白
        whiteAll()
    });

    $(".black-btn-all").on('click', function () {//批量拉黑
        blackAll()
    });

    $(".white-btn").on('click', function () {//拉白
        var id = $(this).attr("data-id");
        var state = $(this).attr("data-state");
        whiteList(id, state)
    });

    $(".black-btn").on('click', function () {//拉黑
        var id = $(this).attr("data-id2");
        var state = $(this).attr("data-state2");
        blackList(id, state)
    });
    

    // 批量拉白
    function whiteAll() {
        var params2 = new Array();
        var ck = $("input[name='blacklist_input']:checked");
        var state = 0;
        $(ck).each(function () {
            if ($(this).parent().parent().find($("td[name^='black2']")).text() == 2) {
                state = 1;
                return false
            }
        });

        if (ck.length == 0) {
            alertDialog("请选择要拉白的用户。");
            return
        }
        else if (state == 1) {
            alertDialog("所选用户中已存在拉白状态");
        }
        else {
            var options = {
                width: 420,
                top: 200,
                height: 240,
                overlay: true,
                dispose: true,
                move: true,
                title: '拉白',
                callback: function () {
                    var flag = false;
                    var userIsvalid = true;
                    $(ck).each(function () {
                        var params = {}
                        params.id = $(this).val();
                        params.blackStatus = 2;
                        params.remark = $("#remark-add-content").val();
                        params2.push(params);
                        if ($(this).attr("isvalid") == "0") {
                            userIsvalid = false;
                        }
                    });
                    if (!userIsvalid) {
                        alertDialog("所选信息包含无效信息，不允许拉白");
                        return false;
                    }
                    if ($("#addBlackRemarkForm").valid("addBlackRemarkForm")) {
                    	loadingShow();
                        $.ajax({
                            url: ctx + "/blackList/updateStatus.action",
                            type: "post",
                            data: JSON.stringify(params2),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (data) {
                            	loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        window.location.href = ctx + "/blackList/query.action";
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
            var editDlg = new Dialog("#addBlackRemark-dialog", options);
            editDlg.show();
        }
    }

    // 批量拉黑
    function blackAll() {
        var params2 = new Array();
        var ck = $("input[name='blacklist_input']:checked");
        var black = $("input[name='blcak black']:checked");
        var state = 0;
        $(ck).each(function () {
            if ($(this).parent().parent().find($("td[name^='black2']")).text() == 1) {
                state = 1;
                return false
            }
        });
        if (ck.length == 0) {
            alertDialog("请选择要拉黑的用户。");
            return
        }
        else if (state == 1) {
            alertDialog("所选用户中已存在拉黑状态");
        }
        else {
            var options = {
                width: 420,
                top: 200,
                height: 240,
                overlay: true,
                dispose: true,
                move: true,
                title: '拉黑',
                callback: function () {
                    var flag = false;
                    var userIsvalid = true;
                    $(ck).each(function () {
                        var params = {}
                        params.id = $(this).val();
                        params.blackStatus = 1;
                        params.remark = $("#remark-add-content").val();
                        params2.push(params);
                        if ($(this).attr("isvalid") == "0") {
                            userIsvalid = false;
                        }
                    });
                    if (!userIsvalid) {
                        alertDialog("所选信息包含无效信息，不允许拉白");
                        return false;
                    }
                    if ($("#addBlackRemarkForm").valid("addBlackRemarkForm")) {
                    	loadingShow();
                        $.ajax({
                            url: ctx + "/blackList/updateStatus.action",
                            type: "post",
                            data: JSON.stringify(params2),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (data) {
                            	loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        window.location.href = ctx + "/blackList/query.action";
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
            var editDlg = new Dialog("#addBlackRemark-dialog", options);
            editDlg.show();
        }
    }

    // 拉白
    function whiteList(id, state) {
        if (state == 2) {
            alertDialog("此用户已经拉白");
            return
        }
        var options = {
            width: 450,
            top: 200,
            height: 330,
            overlay: true,
            dispose: true,
            move: true,
            title: '拉白',
            callback: function () {
                var flag = false;
                var userIsvalid = true;
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
                if (!userIsvalid) {
                    alertDialog("所选信息包含无效信息，不允许拉白");
                    return false;
                }
                var params2 = new Array();

                var params = {}
                params.id = id;
                params.blackStatus = 2;
                params.remark = $("#remark-add-content").val();
                params2.push(params);
                if ($("#addBlackRemarkForm").valid("addBlackRemarkForm")) {
                	loadingShow();
                    $.ajax({
                        url: ctx + "/blackList/updateStatus.action",
                        type: "post",
                        data: JSON.stringify(params2),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                        	loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    $("#start" + id).hide();
                                    $("#stop" + id).show();
                                    window.location.href = ctx + "/blackList/query.action";
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
        var editDlg = new Dialog("#addBlackRemark-dialog", options);
        editDlg.show();
    }

    // 拉黑
    function blackList(id, state) {
        if (state == 1) {
            alertDialog("此用户已经拉黑");
            return
        }
        var options = {
            width: 450,
            top: 200,
            height: 330,
            overlay: true,
            dispose: true,
            move: true,
            title: '拉黑',
            url: "",
            callback: function () {
                var flag = false;
                var userIsvalid = true;
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
                if (!userIsvalid) {
                    alertDialog("所选信息包含无效信息，不允许拉黑");
                    return false;
                }
                var params2 = new Array();
                var params = {}
                params.id = id;
                params.blackStatus = 1;
                params.remark = $("#remark-add-content").val();
                params2.push(params);
                if ($("#addBlackRemarkForm").valid("addBlackRemarkForm")) {
                	loadingShow();
                    $.ajax({
                        url: ctx + "/blackList/updateStatus.action",
                        type: "post",
                        data: JSON.stringify(params2),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                        	loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    $("#start" + id).hide();
                                    $("#stop" + id).show();
                                    window.location.href = ctx + "/blackList/query.action";
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
        var editDlg = new Dialog("#addBlackRemark-dialog", options);
        editDlg.show();
    }
});
function validFileForm (lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "remark-add-content") {
            	 $(lableId).attr('tip', '备注为空，请重新输入。');
 	            return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
	        if ($(lableId).attr("id") == "remark-add-content") {
	            if ($(lableId).val().length>100) {
	                $(lableId).attr('tip', '标题字符超过100个字符');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
        }
        return "success";
    }
}

