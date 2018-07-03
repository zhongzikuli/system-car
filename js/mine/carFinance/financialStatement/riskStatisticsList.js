$(function () {
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });

    var startCompanyAdvanceDate = {
        elem: '#startCompanyAdvanceDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            endCompanyAdvanceDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            endCompanyAdvanceDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var endCompanyAdvanceDate = {
        elem: '#endCompanyAdvanceDate',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            startCompanyAdvanceDate.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            startCompanyAdvanceDate.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            startCompanyAdvanceDate.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(startCompanyAdvanceDate);
    laydate(endCompanyAdvanceDate);

    var startContractSubmitDate = {
        elem: '#startContractSubmitDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            endContractSubmitDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            endContractSubmitDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var endContractSubmitDate = {
        elem: '#endContractSubmitDate',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            startContractSubmitDate.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            startContractSubmitDate.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            startContractSubmitDate.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(startContractSubmitDate);
    laydate(endContractSubmitDate);

    var startBankPaymentDate = {
        elem: '#startBankPaymentDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            endBankPaymentDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            endBankPaymentDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var endBankPaymentDate = {
        elem: '#endBankPaymentDate',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            startBankPaymentDate.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            startBankPaymentDate.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            startBankPaymentDate.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(startBankPaymentDate);
    laydate(endBankPaymentDate);


    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    var zTree
    var setting = {
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: tjDeparment
        }
    };

    function selectDepartment() {
        $("#menuContent").css({
            "background": "#cff",
            "overflow": "auto",
            "z-index": 999,
            "top": 30,
            "width": "179px"
        }).slideDown("fast");
        $("body").bind("mousedown", onBodyDown);
        var id = $("#departmentTreeId").data("id");
        $.ajax({
            url: ctx + "/department/reportDeportmentTree.action",
            data: {id: id},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var zNodes = result.rows;
                    $.fn.zTree.init($("#departmentTree"), setting, zNodes);
                    zTree = $.fn.zTree.getZTreeObj("departmentTree");
                    zTree.expandAll(true);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function onBodyDown(event) {
        if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0 )) {
            hideMenu();
        }
    }

    function hideMenu() {
        $("#menuContent").fadeOut("fast");
    }

    function tjDeparment(event, treeId, treeNode) {
        $("#departmentTreeId").val(treeNode.name);
        $("#pagerForm input[name='departmentId']").val(treeNode.id);
        $("#pagerForm input[name='departmentParentId']").val(treeNode.parentId);
        hideMenu();
    }


    //部门事件
    $("#departmentTreeId").on("click", function () {
        selectDepartment();
    });

    //重置按钮
    $(".reset-btn").on("click", function () {
        $(".simple_query").find("input,select").each(function (i, n) {
            $(n).val('');
        });
        $(".chosen-select").trigger("chosen:updated");
    });

});

function query() {
    $("#pageNum").val(0);
    $('#pagerForm').submit();
}

function exportExcel() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要导出的记录。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要导出记录？", function () {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/riskReport/export.action?ids=" + ids.toString());
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);

    });

}