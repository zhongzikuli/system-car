$(function(){
	
    var startTime = {
        elem: '#startTime',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            end.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var endTime = {
        elem: '#endTime',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            start.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(startTime);
    laydate(endTime);

    //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

    //select用插件chosen.jquery
    var config = {
    		disable_search_threshold: 10,
    		no_results_text			: '无数据',
    		allow_single_deselect	: true,
    		width					:'100%'
    };
    $("#departmentId").chosen(config);
    $("#loanBankId").chosen(config);
    $("#repstatus").chosen(config);
    $("#evaluateUserId").chosen(config);

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#departmentId").val("").trigger('chosen:updated');
        $("#loanBankId").val("").trigger('chosen:updated');
        $("#startTime").val("");
        $("#endTime").val("");
        $("#assessReportkeyWord").val("");
        $("#orderNo").val("");
    	$("#repstatus").val("").trigger('chosen:updated');
        $("#carBrand").val("");
        $("#evaluateUserId").val("").trigger('chosen:updated');


    });

    
    //查看
    $(".detail").on("click", function(){
    	var id = $(this).attr("data-id");
    	window.location.href = ctx + "/assessReportManage/toLookFor.action?id="+id;
    });
})
//上传面签附件
function uploadReport(id,goBackUrl) {
    window.location.href = ctx + "/evaluationReportFile/preUploadReport.action?id=" + id+"&goBackUrl="+goBackUrl;
}
//下载附件
function downloadFiles() {
    var ck = $("input[name='assessReportManage_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要下载的单号。");
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
            alertDialog("所选信息包含无效账户，不允许删除");
            return false;
        }
        confirmDialog("确认下载选中的单号的附件吗？", function () {
            window.location.href=ctx + "/assessReportManage/downloadFiles.action?idArr="+idArr.toString();
        })
    }
}

//点击事件状态变成已完成
function unFinishInfo(id){
    var departmentId=$("#departmentId").val();
    var loanBankId=$("#loanBankId").val();
    var startTime=$("#startTime").val();
    var endTime=$("#endTime").val();
    var assessReportkeyWord=$("#assessReportkeyWord").val();
    var orderNo=$("#orderNo").val();
    var repstatus=$("#repstatus").val();
    var evaluateUserId=$("#evaluateUserId").val();
    loadingShow();
    $.ajax({
        url: ctx + "/assessReportManage/finishStatus.action",
        type: "post",
        data: { status : 1 ,
                id     : id
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx +"/assessReportManage/query.action?departmentId="+departmentId+"&loanBankId="
                        +loanBankId+"&evaluateStartTime="+startTime+"&evaluateEndTime="+endTime+"&assessReportkeyWord="+assessReportkeyWord+
                        "&repstatus="+repstatus+"&evaluateUserId="+evaluateUserId;
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//点击事件状态变成未完成
function finishInfo(id){
    var departmentId=$("#departmentId").val();
    var loanBankId=$("#loanBankId").val();
    var startTime=$("#startTime").val();
    var endTime=$("#endTime").val();
    var assessReportkeyWord=$("#assessReportkeyWord").val();
    var orderNo=$("#orderNo").val();
    var repstatus=$("#repstatus").val();
    var evaluateUserId=$("#evaluateUserId").val();
    loadingShow();
    $.ajax({
        url: ctx + "/assessReportManage/finishStatus.action",
        type: "post",
        data: { status : 0,
                id     : id
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx +"/assessReportManage/query.action?departmentId="+departmentId+"&loanBankId="
                        +loanBankId+"&evaluateStartTime="+startTime+"&evaluateEndTime="+endTime+"&assessReportkeyWord="+assessReportkeyWord
                           +"&repstatus="+repstatus+"&evaluateUserId="+evaluateUserId;
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}



























