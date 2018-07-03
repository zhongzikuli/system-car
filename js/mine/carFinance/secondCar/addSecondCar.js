$(document).ready(function () {
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

    //select用插件chosen.jquery
    var config = {
    		disable_search_threshold: 10,
    		no_results_text			: '无数据',
    		allow_single_deselect	: true,
    		width					:'100%'
    };
    $("#loanBankId, #status").chosen(config);

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#keyword").val("");
        $("#loanBankId").val("").trigger('chosen:updated');
        $("#status").val("").trigger('chosen:updated');
        $("#startTime").val("");
        $("#endTime").val("");
    });
    
    //新增
    $(".add-btn").on("click", function () {
        addSecondCar();
    });
    //删除
    $(".delete-btn").on("click", function () {
        deleteSecondCar();
    });
    
    //编辑
    $(".edit-btn").on("click", function () {
    	var itemId = $(this).parent("td").attr("data-itemId");
    	editSecondCar(itemId);
    })
    
     //查看
    $(".detail-btn").on("click", function () {
    	var itemId = $(this).parent("td").attr("data-itemId");
    	detailSecondCar(itemId);
    })
    //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });
    
    function addSecondCar() {
        window.location.href = ctx + "/addSecondCar/insert.action?";
    }

    function deleteSecondCar() {
        var ck = $("input[name='secondCar_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
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
            confirmDialog("确认删除选中的二手车信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/addSecondCar/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/addSecondCar/query.action?";
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
  //编辑
    function editSecondCar(id) {
        window.location.href = ctx + "/addSecondCar/toEdit.action?id=" + id;
    }

    //查看
    function detailSecondCar(id) {
        window.location.href = ctx + "/addSecondCar/toDetail.action?id=" + id;
    }
})


