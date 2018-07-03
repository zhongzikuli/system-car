$(document).ready(function () {
    
    var start = {
        elem: '#search-recharge-start-date',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false,
        issure: false,
        istime: true,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
        }
    };
    var end = {
        elem: '#search-recharge-end-date',
        format: 'YYYY-MM-DD hh:mm:ss ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false,
        issure: false,
        istime: true,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            start.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(start);
    laydate(end);
})

//下拉框初始化
var config = {
    disable_search_threshold: 10,
    no_results_text: '无数据',
    width: "245px"
};

//加载部门树
var setting = {
    check: {
        enable: true,
        chkboxType: {"Y": "", "N": ""}
    },
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onCheck: onCheck
    }
};

function beforeClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("departmentTree");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("departmentTree"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    ids = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
        ids += nodes[i].id + ",";
    }
    if (v.length > 0) {
        v = v.substring(0, v.length - 1);
        ids = ids.substring(0, ids.length - 1);
    }
    $("#user-department").val(v);
    $(".department_ids").val(ids);
}

var zTree
function showDepartmentMenu(width) {
    var organObj = $("#user-department");
    var organOffset = $("#user-department").offset();
    $("#menuContent").css({
        "background": "rgb(255,255,255)",
        "overflow": "auto",
        "z-index": 999,
        "top": "34px",
        "width": width + "px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    $.ajax({
        url: ctx + "/department/departmentTree.action",
        data: {ids: $(".department_ids").val()},
        dataType: "json",
        success: function (result) {
            if (result.error == 1) {
                var zNodes = result.rows;
                $.fn.zTree.init($("#departmentTree"), setting, zNodes);
                zTree = $.fn.zTree.getZTreeObj("departmentTree");
                zTree.expandAll(true);
            }
        }
    });
}

function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
    if (!(event.target.id == "user-department" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0 )) {
        hideMenu();
    }
}
