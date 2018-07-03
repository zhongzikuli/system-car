$(function () {

    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "170px"
    };
    $(".type").chosen(config);


    $(".add-btn").on("click",function(){
        addType();
    });

    $(".edit-btn").on("click", function () {
        var id = $(this).attr("date-id");
        edit(id);
    });

    function addType() {
        var options = {
            width: 350,
            top: 150,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onAfterShow:function(){
                $("#setType").chosen({
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "230px"
                });
            },
            callback: function () {
                var flag = false;
                if ($("#setForm").valid("setForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/customerMessageTemplate/insert.action",
                        type: "post",
                        data: {
                            type: $("#setType").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置模板成功！", 1000, function () {
                                    window.location.href = ctx + "/customerMessageTemplate/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
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
        creatDlg = new Dialog("#set-dialog", options);
        creatDlg.show();
    }
    //设置内容
    function edit(id) {
        var options = {
            width: 350,
            top: 150,
            height: 240,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/customerMessageTemplate/getContent.action?id="+id,
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (data) {
                        $("#content").val(data.rows)
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#weChat").valid("weChat")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/customerMessageTemplate/update.action",
                        type: "post",
                        data: {
                            content: $("#content").val(),
                            id: id
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置模板成功！", 1000, function () {
                                    window.location.href = ctx + "/customerMessageTemplate/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
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
        creatDlg = new Dialog("#config-dialog", options);
        creatDlg.show();
    }
})

//校验
function validYearSet(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "content") {
                $(lableId).attr('tip', '模板内容不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "setType") {
                $(lableId).attr('tip', '类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
        }
        return "success";
    }
}



