$(function () {
    initTree();

    $(".refresh-btn").on("click", function () {
        var departmentId = $(this).attr('data-departmentId');
        showDepartmentPlan(departmentId);
    });

    $(".add-btn").on("click", function () {
        var departmentId = $(this).attr('data-departmentId');
        addDepartmentPlan(departmentId);
    });

    function addDepartmentPlan(departmentId) {
        var options = {
            width: 700,
            top: 200,
            height: 450,
            overlay: true,
            dispose: true,
            move: true,
            title: '部门计划新增',
            url: "",
            onAfterShow: function () {

            },
            callback: function () {
                if ($("#department-plan-add-form").valid("department-plan-add-form")) {
                    $("input[name='departmentId']").val(departmentId);
                    $.ajax({
                        url: ctx + "/department/savePlan.action",
                        type: "post",
                        data: $("#department-plan-add-form").serialize(),
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                showDepartmentPlan(departmentId);
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var d = new Dialog("#department-plan-add", options);
        d.show();
    }

    $(".delete-btn").on("click", function () {
        var $has_checked = $(".checkOne:checked");
        if ($has_checked.length == undefined || $has_checked.length == 0) {
            alertDialog("请选择要删除的部门计划。");
            return;
        }
        var ids = new Array();
        var years = new Array();
        $has_checked.each(function () {
            ids.push($(this).val());
            years.push($(this).data("year"));
        });
        var param = {};
        param.ids = ids.toString();
        param.years = years.toString();
        $.ajax({
            url: ctx + "/department/deletePlan.action",
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    successMsg("操作成功！", 1000, function () {
                        showDepartmentPlan(departmentId);
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    });
});
function compareH() {
    var _height = $(".department-right").height();
    var height = $(".sub_content").height();
    var maxNum = Math.max(_height, height)
    $(".border-r-3").height(maxNum);
}
var zTreeObj;
var zTree;
var rMenu;
/*初始化部门树*/
function initTree() {
    $.ajax({
        url: ctx + "/department/departmentTree.action",
        dataType: "json",
        success: function (result) {
            if (result.error == 1) {
                var setting = {
                    callback: {
                        onRightClick: function (event, treeId, treeNode) {
                            if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                                zTree.cancelSelectedNode();
                                showRMenu("root", treeNode, event.pageX, event.pageY);
                            } else if (treeNode) {
                                zTree.selectNode(treeNode);
                                showRMenu("node", treeNode, event.pageX, event.pageY);
                            }
                        },
                        onClick: function (event, treeId, treeNode) {
                            if ($("#orgType").val() != 2){
                                showDepartmentPlan(treeNode.id);
                            }
                        }
                    }
                };
                var zNodes = result.rows;
                $(document).ready(function () {
                    zTreeObj = $.fn.zTree.init($("#organ-manage-tree"), setting, zNodes);
                });
                $("#organ-manage-tree").mousedown(function (e) {
                    if (e.which == 1) {
                        hideRMenu();
                    }
                });
                zTree = $.fn.zTree.getZTreeObj("organ-manage-tree");
                rMenu = $("#data_dic_rMenu");
                zTree.expandAll(true);
            } else {

            }

        }
    })
}

function showRMenu(type, treeNode, x, y) {
    $("#data_dic_rMenu ul").show();
    if (type == "node") {
        if (treeNode.grandId) {
            $("#data_dic_add").show();
            $("#data_dic_update").hide();
            $("#data_dic_delete").hide();
        } else {
            $("#data_dic_add").show();
            $("#data_dic_update").show();
            $("#data_dic_delete").show();
        }
    }
    rMenu.css({"top": (y) + "px", "left": (x) + "px", "display": "block"});
}

function hideRMenu() {
    if (rMenu) {
        rMenu.css({"display": "none"});
    }
}

function refreshTree() {
    hideRMenu();
    initTree();
}
/*添加部门*/
function insertDepartment() {
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    var id = nodes[0].id;
    var grandId = nodes[0].grandId;
    var options = {
        width: 700,
        top: 150,
        height: $("#orgType").val() == 2 ? 300 : 440,
        overlay: true,
        dispose: true,
        move: true,
        title: '添加',
        fade: false,
        onBeforeShow: function () {
            init_city_select($("#create-department-province"), 2);
            $("#establishDate").on("click",function () {
                laydate({
                    format: 'YYYY-MM-DD',
                    min: '1970-01-01', //设定最小日期为当前日期
                    max: laydate.now(), //最大日期
                    istoday: false, //显示今天
                    issure: true, //确定框
                    istime: false,
                    start: laydate.now()
                });
            });
        },
        callback: function () {
            if ($("#department-add-form").valid("department-add-form")) {
                var name = $("#department-add-name").val();
                var sortNo = $("#department-add-sortNo").val();
                var province = $("#create-department-province").val();
                var address = $("#create-department-address").val();
                var areaCode = $("#department-area-code").val();
                var departmentType = $("#department-add-form").find("select[name='departmentType']").val();
                var forbidden = $("#department-add-form").find("select[name='forbidden']").val();
                var establishDate = $("#establishDate").val();
                var bankName = $("#bank_name").val();
                var bankAccount = $("#bank_account").val();
                var bankAccountName = $("#bank_account_name").val();
                var contactPerson = $("#contact_person").val();
                var contactTel = $("#contact_tel").val();
                $.ajax({
                    url: ctx + "/department/create.action",
                    type: "post",
                    data: {
                        name: name,
                        sortNo: sortNo,
                        parentId: id,
                        grandId: grandId,
                        forbidden: forbidden,
                        departmentType: departmentType,
                        province: province,
                        address: address,
                        areaCode: areaCode,
                        establishDate: new Date(establishDate),
                        bankName: bankName,
                        bankAccount: bankAccount,
                        bankAccountName: bankAccountName,
                        contactPerson: contactPerson,
                        contactTel: contactTel
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            refreshTree();
                            successMsg("添加成功");
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            } else {
                return false;
            }

        }
    };
    var editDlg = new Dialog("#department-add", options);
    //下拉框初始化
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });
    editDlg.show();
    $(".dialog-overlay").show();
}

/*更新部门*/
function updateDepartment() {
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    var id = nodes[0].id;
    var parentId = nodes[0].parentId;
    var grandId = nodes[0].grandId;
    var province = nodes[0].province;
    var address = nodes[0].address;
    var areaCode = nodes[0].areaCode;
    var establishDate = nodes[0].establishDateStr;
    var options = {
        width: 700,
        top: 150,
        height: $("#orgType").val() == 2 ? 300 : 550,
        overlay: true,
        dispose: true,
        title: '更新',
        fade: false,
        onBeforeShow: function () {
            init_city_select($("#department-update-province"), 2);
            $.ajax({
                url: ctx + "/department/getDepartmentName.action",
                type: "post",
                data: {id: parentId},
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        $("#parent-department").val(data.rows.name);
                        $("#parent-department").data("id", data.rows.id);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
            $("#establishDate").on("click",function () {
                laydate({
                    format: 'YYYY-MM-DD',
                    min: '1970-01-01', //设定最小日期为当前日期
                    max: laydate.now(), //最大日期
                    istoday: false, //显示今天
                    issure: true, //确定框
                    istime: false,
                    start: laydate.now()
                });
            });
        },
        callback: function () {
            if ($("#department-update-form").valid("department-update-form")) {
                var name = $("#department-update-name").val();
                var parentId = $("#parent-department").data("id");
                var grandId = $("#parent-department").data("grandId");
                var sortNo = $("#department-update-sortNo").val();
                var province = $("#department-update-province").val();
                var address = $("#department-update-address").val();
                var areaCode = $("#department-update-area-code").val();
                var departmentType = $("#department-update-form").find("select[name='departmentType']").val();
                var forbidden = $("#department-update-form").find("select[name='forbidden']").val();
                var establishDate = $("#establishDate").val();
                var bankName = $("#bank_name").val();
                var bankAccount = $("#bank_account").val();
                var bankAccountName = $("#bank_account_name").val();
                var contactPerson = $("#contact_person").val();
                var contactTel = $("#contact_tel").val();
                $.ajax({
                    url: ctx + "/department/update.action",
                    type: "post",
                    data: {
                        name: name,
                        sortNo: sortNo,
                        id: id,
                        parentId: parentId,
                        grandId: grandId,
                        forbidden: forbidden,
                        departmentType: departmentType,
                        province: province,
                        address: address,
                        areaCode: areaCode,
                        establishDateStr: establishDate,
                        bankName: bankName,
                        bankAccount: bankAccount,
                        bankAccountName: bankAccountName,
                        contactPerson: contactPerson,
                        contactTel: contactTel,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            refreshTree();
                            successMsg("更新成功");
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            } else {
                return false;
            }
        },
        onInit: function () {
            $("#department-update-name").val(nodes[0].name);
            $("#department-update-name").data("id", nodes[0].id);
            $("#department-update-name").attr("param", "id=" + nodes[0].id);
            $("#department-update-sortNo").val(nodes[0].sortNo);
            $("#department-update-province").val(province);
            $("#department-update-address").val(address);
            $("#department-update-area-code").val(areaCode);
            $("#establishDate").val(establishDate);
            $("#department-update-area-code").trigger("chosen:updated");
            $("#department-update-form").find("select[name='departmentType']").val(nodes[0].departmentType);
            $("#department-update-form").find("select[name='forbidden']").val(nodes[0].forbidden);
            //
            $("#bank_name").val(nodes[0].bankName);
            $("#bank_account").val(nodes[0].bankAccount);
            $("#bank_account_name").val(nodes[0].bankAccountName);
            $("#contact_person").val(nodes[0].contactPerson);
            $("#contact_tel").val(nodes[0].contactTel);

        }
    };

    var editDlg = new Dialog("#department-update", options);
    //下拉框初始化
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });
    editDlg.show();
    $(".dialog-overlay").show();
}

var zTree2
function showDepartmentMenu(width) {
    $("#menuContent").css({
        "background": "rgb(255,255,255)",
        "overflow": "auto",
        "z-index": 999,
        "top": "39px",
        "width": width + "px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    var name = $("#department-update-name").val();
    $.ajax({
        url: ctx + "/department/departmentTreeNotId.action",
        data: {id: $("#department-update-name").data("id")},
        dataType: "json",
        success: function (result) {
            /*如果没有部门，添加提示去创建部门*/
            if (result.error == 1 && result.rows[0].children.length > 0) {
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
                        onClick: onClick
                    }
                };
                var zNodes = result.rows;
                $.fn.zTree.init($("#departmentTree"), setting, zNodes);
                zTree2 = $.fn.zTree.getZTreeObj("departmentTree");
                zTree2.expandAll(true);
            }
        }
    });
}
function onClick(event, treeId, treeNode) {
    $("#parent-department").data("id", treeNode.id);
    $("#parent-department").data("grandId", treeNode.grandId);
    $("#parent-department").val(treeNode.name);
}

function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
    if (!(event.target.id == "parent-department" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0 )) {
        hideMenu();
    }
}

/**
 * 删除
 */
function deleteDepartment() {
    hideRMenu();
    confirmDialog('确定删除？', function () {
        var nodes = zTree.getSelectedNodes();
        $.ajax({
            url: ctx + "/department/delete.action",
            type: "post",
            data: {id: nodes[0].id},
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    refreshTree();
                    successMsg("删除成功");
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    });
}

function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "department-add-name"
                || $(lableId).attr("id") == "department-add-name") {
                $(lableId).attr('tip', '部门名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "department-add-sortNo"
                || $(lableId).attr("id") == "department-add-sortNo") {
                $(lableId).attr('tip', '排序为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "department-add-name") {
                if (!(/^[\u4E00-\u9FA5A-Za-z]+$/).exec(_this.val())) {
                    $(lableId).attr('tip', '部门名称只支持中文或英文字母。');
                    return "faild";
                } else {
                    if (!(/^.{1,20}$/).exec(_this.val())) {
                        $(lableId).attr('tip', '长度不超过20个字符。');
                        return "faild";
                    } else {
                        return "success";
                    }
                }
            }
            if ($(lableId).attr("id") == "department-add-sortNo") {
                if (!(/^[1-9]\d*$/).exec(_this.val())) {
                    $(lableId).attr('tip', '序号必须为正整数。');
                    return "faild";
                }
            }
        }
        return "success";
    }
}

//
function showDepartmentPlan(departmentId) {
    $(".process-list, .ibox-content").removeClass("none");
    $(".add-btn, .refresh-btn").attr('data-departmentId', departmentId);
    $('.checkAll').prop("checked", false);
    initDepartmentPlan(departmentId, 0, null);
}
//****************************//
//*							*//
//*	AJAX分页全部变量定义		*//
//*							*//
//***************************//
var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
var initFlag = true;	//是否为初始化第一页标记
function initDepartmentPlan(departmentId, currPage, jg) {
    $.ajax({
        url: ctx + "/department/listPlan.action",
        type: "post",
        data: {
            'pageNum': currPage,
            'departmentId': departmentId,
            'numPerPage': pageSize
        },
        dataType: "json",
        success: function (data) {
            var tbody = '';
            if (data.error == 1) {
                if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                    if (initFlag) {
                        $("#pagination").pagination(data["rows"]["totalCount"], {
                            items_per_page: pageSize,
                            num_edge_entries: 1,
                            num_display_entries: 8,
                            callback: function (currPage, jg) {
                                initDepartmentPlan(departmentId, currPage, jg);
                            }//回调函数
                        });
                        initFlag = false;
                    }
                    loadDepartmentDataTbody(data);
                } else {
                    $(".table-more tbody").html("<tr><td class='col-td' colspan='17'>暂无数据</td></tr>");
                    $("#pagination").html("");
                }
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function loadDepartmentDataTbody(data) {
    var tbody = "";
    var result = data.rows;
    $(".table-more tbody").html('');
    if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
        tbody += '<tr><td class="col-td" colspan="17">暂无数据</td></tr>';
        $("#pagination").html("");
    } else {
        var list = result.recordList;
        for (var j = 0; j < list.length; j++) {
            tbody += '<tr><td><input type="checkbox" class="checkOne" value="' + list[j].departmentId + '" data-year="' + list[j].year + '"></td>' +
                '<td>' + list[j].year + '</td>' +
                '<td>' + NumberFormatUtil.fmoney(list[j].yearMoney, 2) + '</td>';
            if (list[j].oneMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].oneMonthMoney, 2) + '</td>';
            }
            if (list[j].twoMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].twoMonthMoney, 2) + '</td>';
            }
            if (list[j].threeMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].threeMonthMoney, 2) + '</td>';
            }
            if (list[j].fourMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].fourMonthMoney, 2) + '</td>';
            }
            if (list[j].fiveMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].fiveMonthMoney, 2) + '</td>';
            }
            if (list[j].sixMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].sixMonthMoney, 2) + '</td>';
            }
            if (list[j].sevenMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].sevenMonthMoney, 2) + '</td>';
            }
            if (list[j].eightMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].eightMonthMoney, 2) + '</td>';
            }
            if (list[j].nineMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].nineMonthMoney, 2) + '</td>';
            }
            if (list[j].tenMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].tenMonthMoney, 2) + '</td>';
            }
            if (list[j].elevenMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].elevenMonthMoney, 2) + '</td>';
            }
            if (list[j].twelveMonthMoney == 0) {
                tbody += '<td>--</td>';
            } else {
                tbody += '<td>' + NumberFormatUtil.fmoney(list[j].twelveMonthMoney, 2) + '</td>';
            }
            tbody += '<td>' + list[j].updateTime + '</td><td><a class="btn btn-xs btn-primary edit-btn" data-id="' + list[j].departmentId + '" data-year="' + list[j].year + '">编辑</a></td>'
            tbody += '</tr>';
        }
    }
    $(".table-more tbody").append(tbody);
    compareH()
    //编辑
    $('.edit-btn').on("click", function () {
        var departmentId = $(this).data("id");
        var year = $(this).data("year");
        editDepartmentPlan(departmentId, year)
    });
}

function editDepartmentPlan(departmentId, year) {
    var options = {
        width: 700,
        top: 200,
        height: 450,
        overlay: true,
        dispose: true,
        move: true,
        title: '部门计划编辑',
        url: "",
        onBeforeShow: function () {
            $.ajax({
                url: ctx + "/department/preEditPlan.action",
                type: "post",
                data: {departmentId: departmentId, year: year},
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        $("#department-plan-edit-form").find("input,select").each(function () {
                            var name = $(this).attr("id");
                            $(this).val(data.rows[name]);
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        },
        callback: function () {
            if ($("#department-plan-edit-form").valid("department-plan-edit-form")) {
                $.ajax({
                    url: ctx + "/department/editPlan.action",
                    type: "post",
                    data: $("#department-plan-edit-form").serialize(),
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            showDepartmentPlan(departmentId);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            } else {
                return false;
            }
        }
    };
    var dialog = new Dialog("#department-plan-edit", options);
    dialog.show();
}

function formetMoney(num) {
    if (num == "0") return "0.00";
    return num / 10000
}

