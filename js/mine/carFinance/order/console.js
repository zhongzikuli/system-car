$(function () {
    //下拉框初始化
    $("#orderStatus").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "180px"
    });
    $("#bankId").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "195px"
    });
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });

    var startTime = {
        elem: '#startTime',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            endTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            endTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
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
            startTime.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            startTime.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            startTime.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(startTime);
    laydate(endTime);

    /* //点击mod_header上的时间框，高级搜索框收起
     $('#sTime, #eTime').bind('click',function(event){
     $(".btn-box").hide();
     $(".btn-search").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
     });*/

    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });

    //重置按钮
    $(".reset-btn").on("click", function () {
        $(".simple_query").find("input,select").each(function (i, n) {
            $(n).val('');
        });
        $(".chosen-select, #orderStatus").trigger("chosen:updated");
    });

    //重置按钮
    $(".reset-btn2").on("click", function () {
        $(".gl_query").find("input,select").each(function (i, n) {
            $(n).val('');
        });
        $(".chosen-select").trigger("chosen:updated");
    });

    //取消
    $(".cancel").on("click", function () {
        $(".gl_query").find("input,select").each(function (i, n) {
            $(n).val('');
        });
        $(".chosen-select").trigger("chosen:updated");
        $(".gl_query").hide();
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
            "left":48,
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
    
    

});

function simpleQuery() {
    $(".gl_query").find("input,select").each(function (i, n) {
        $(n).val('');
    });
    $("#pageNum").val(0);
    $('#pagerForm').submit();
}

function query() {
    $(".simple_query").find("input,select").each(function (i, n) {
        $(n).val('');
    });
    $("#pageNum").val(0);
    $('#pagerForm').submit();
}

//订单详情
function detail(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-" + title);
}
//订单轨迹
function toOrderTrack(id, title) {
    // window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id + "&goBackUrl=" + goBackUrl;
    var url = ctx + "/cfOrderTrack.action?acceptId=" + id;
    openTabForParent(url, "-order-track-" + id, "订单轨迹-" + title);
}