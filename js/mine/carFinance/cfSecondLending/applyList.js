$(function () {
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });

    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    //----------------------------------------时间空间初始化--------------------------------------------------------------
    //银行受理时间
    bankLendingInitLaydate("secondLending-bankPaymentDateStart", "secondLending-bankPaymentDateEnd");

    //搜索时间控件
    function bankLendingInitLaydate(start, end) {
        var sTime = {
            elem: '#' + start,
            format: 'YYYY-MM-DD',
            min: '1970-01-01 ', //设定最小日期为当前日期
            //max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now(),
            choose: function (datas) {
                eTime.min = datas; //开始日选好后，重置结束日的最小日期
            },
            clear: function () {
                eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            }
        };

        var eTime = {
            elem: '#' + end,
            format: 'YYYY-MM-DD',
            min: '1970-01-01', //设定最小日期为当前日期
            //max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now(0, 'YYYY年MM月DD日'),
            choose: function (datas) {
                sTime.max = datas;			//结束日选好后，重置开始日的最大日期
            },
            clear: function () {
                sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
                sTime.max = laydate.now();	//将开始日的最大值设定为今天
            }
        };
        laydate(sTime);
        laydate(eTime);
    }

    //重置按钮
    $(".reset-btn").on("click", function () {
        $("#secondLendingStatus").val('').trigger('chosen:updated');
        $("#bankId").val('').trigger('chosen:updated');
        $("#secondLending-bankPaymentDateStart").val('');
        $("#secondLending-bankPaymentDateEnd").val('');
        $("#fastSearch").val('');
    });

    //二次打款申请
    $("#secondLendingApply").on("click",function () {
        var ck = $("input[name='secondLendingInput']:checked");
        if (ck.length == 0) {
            alertDialog("请选择需要提交申请的数据");
            return false;
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认提交二次打款申请吗？", function () {
                var params = {
                    idArr: idArr.toString()
                };

                loadingShow();
                $.ajax({
                    url: ctx + "/cfSecondLending/apply.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                $(".search-btn").trigger("click");
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    },
                    error:function (response) {
                        loadingHide();
                        faildMsg(response.responseText);
                    }
                });
            });
        }
    });

})

//订单详情
function cfSecondLendingDetail(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-" + title);
}