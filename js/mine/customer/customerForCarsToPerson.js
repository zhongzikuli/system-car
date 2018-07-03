$(function () {
    var sTime = {
        elem: '#startDate',
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
        elem: '#endDate',
        format	: 'YYYY-MM-DD',
        min		: "1970-01-01",
        max		: laydate.now(),
        istoday	: false,				//显示今天
        issure	: true,					//确认框
        istime	: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose	: function (datas) {
            sTime.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sTime.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(sTime);
    laydate(eTime);


    $(".reset-btn").on("click",function(){
        $("#keyword").val("");
        $("#startDate").val("");
        $("#endDate").val("");
    });
    $(".add-btn").on("click",function(){
    	addType();
    });

    $(".edit-btn").on("click", function () {
    	var id = $(this).attr("date-id");
        var remark = $(this).attr("data-remark")
    	edit(id,remark);
    });
    //删除广告
    function deleteAdvert() {
        var ck = $("input[name='customer_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的记录吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/customerForCarsPerson/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/customerForCarsPerson/query.action";
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

  //设置内容
    function edit(id,remark) {

        var options = {
            width: 350,
            top: 150,
            height: 240,
            overlay: true,
            dispose: true,
            move: true,
            title: '备注',
            onAfterShow: function () {
                $("#remark").val(remark);
            },
            callback: function () {
                var flag = false;
                if ($("#fileCreateForm").valid("fileCreateForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/customerForCarsPerson/updateRemark.action",
                        type: "post",
                        data: {
                            remark: $("#remark").val(),
                            id: id
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/customerForCarsPerson/query.action";
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
        creatDlg = new Dialog("#distribute-dialog", options);
        creatDlg.show();
    }
})

//校验
function validYearSet(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "departmentId") {
                $(lableId).attr('tip', '部门不能为空，请重新输入。').parent().addClass("input_validation-failed");
                return "faild";
            }if ($(lableId).attr("id") == "remark") {
                $(lableId).attr('tip', '备注不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
        }
        return "success";
    }
}



