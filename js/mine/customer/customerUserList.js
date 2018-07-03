$(function () {

    //搜索时间控件
    var start = {
        elem: '#customer-user-search-start-date',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            end.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var end = {
        elem	: '#customer-user-search-end-date',
        format: 'YYYY-MM-DD',
        min		: "1970-01-01",
        max		: laydate.now(),
        istoday	: false,				//显示今天
        issure	: true,					//确认框
        istime	: false,
        choose	: function (datas) {
            start.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            start.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(start);
    laydate(end);

    //刷新
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    //重置按钮
    $(".reset-btn").on("click", function () {
        $("#tel").val("");
        $("#name").val("");
        $("#customer-user-search-start-date").val("");
        $("#customer-user-search-end-date").val("");
    });

    $("#tel").keyup(function () {
        $(this).val($(this).val().replace(/[^\d]/g,''));
    });
    //查看
    $(".detail").on("click", function () {
        var tel = $(this).attr("data-id");
        detailCustomerUserInfo(tel);
    });

    //查看单位
    function detailCustomerUserInfo(tel) {
        var options = {
            width: 700,
            top: 200,
            height: 550,
            overlay: true,
            dispose: true,
            move: true,
            title: '查看',
            url: '',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/customer/detail.action",
                    type: "post",
                    data: {tel: tel},
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var customer = data.rows;

                            $("#view-customerUser-name").val(customer.name);
                            $("#view-customerUser-tel").val(customer.tel);
                            $("#view-customerUser-lastLoginTime").val(customer.lastLoginTime);
                            $("#view-customerUser-cardNo").val(customer.cardNo);
                            $("#view-customerUser-devInfo").val(customer.devInfo);
                            $("#view-customerUser-lastLoginLon").val(customer.lastLoginLon);
                            $("#view-customerUser-wexinPublicOpenid").val(customer.wexinPublicOpenid);
                            $("#view-customerUser-weixinAccount").val(customer.weixinAccount);
                            $("#view-customerUser-weixinName").val(customer.weixinName);
                            $("#view-customerUser-lastLoginProvince").val(customer.lastLoginProvince);
                            $("#view-customerUser-lastLoginCity").val(customer.lastLoginCity);
                            $("#view-customerUser-lastLoginPosition").val(customer.lastLoginPosition);
                            $("#view-customerUser-lastLoginLat").val(customer.lastLoginLat);
                            $("#view-customerUser-miniProgramOpenid").val(customer.miniProgramOpenid);
                            $("#view-customerUser-unionId").val(customer.unionId);

                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            }
        };
        var viewDlg = new Dialog("#customerUser-dialog-edit", options);
        viewDlg.show();
    }

    //删除
    $(".delete").on("click", function () {
        var tel = $(this).attr("data-id");
        deleteInfo(tel);
    });

    //删除
    function deleteInfo(tel) {
        confirmDialog("确认删除选中的客户信息吗？", function () {
            loadingShow();
            $.ajax({
                url: ctx + "/customer/delete.action",
                type: "post",
                data: {
                    tel: tel
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/customer/listPage.action?";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                },
                error: function (e) {
                    loadingHide();
                    alertDialog(e.responseText)
                }
            });
        })
    }
});