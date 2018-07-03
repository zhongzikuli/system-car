$(function () {
    var sTime = {
        elem: '#startTime',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
            eTime.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            eTime.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var eTime = {
        elem: '#endTime',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            sTime.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            sTime.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    laydate(sTime);
    laydate(eTime);
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
    $("#loanBank").chosen(config);
    $("#status").chosen(config);
    $("#evaluateUserId").chosen(config);
    
  //重置按钮
    $(".reset-btn").on("click", function(){
    	$("#keyword").val("");
    	$("#carBrand").val("")
        $("#loanBank").val("").trigger('chosen:updated');
        $("#status").val("").trigger('chosen:updated');
        $("#evaluateUserId").val("").trigger('chosen:updated');
        $("#startTime").val("");
        $("#endTime").val("");
    });
    
    //删除
    $(".deleteSecondCar").on("click", function () {
        deleteSecondCar();
    });
  //新增
    $(".addSecondCar").on("click", function () {
        addSecondCar();
    });
   
    function addSecondCar() {
        var ck = $("input[name='secondCar_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要更换占位的记录。");
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
                alertDialog("所选信息包含无效账户，不允许更改");
                return false;
            }
            confirmDialog("确认更换选中的占位人信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/secondCarEvaluate/inAssessing.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/secondCarEvaluate/list.action?=";
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
    function deleteSecondCar() {
        var ck = $("input[name='secondCar_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要下载的记录。");
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
                alertDialog("所选信息包含无效账户，不允许下载");
                return false;
            }
            confirmDialog("确认下载选中的二手车相关附件吗？", function () {
                window.location.href = ctx + "/secondCarEvaluate/downLoad.action?idArr=" + idArr.toString();
            })
        }
    }

})
//编辑
function preSecondCarEvaluate(id,operationingLoginName) {
    window.location.href = ctx + "/secondCarEvaluate/preSecondCarEvaluate.action?id=" + id+"&operationingLoginName="+operationingLoginName;
}
//查看
function viewSecondCarEvaluate(id,operationingLoginName) {
    window.location.href = ctx + "/secondCarEvaluate/viewSecondCarEvaluate.action?id=" + id;
}
function overdueSecondCar(id) {
    loadingShow();
    $.ajax({
        url: ctx + "/secondCarEvaluate/overdueSecondCar.action",
        type: "post",
        data: {
            "id": id,
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/secondCarEvaluate/list.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}