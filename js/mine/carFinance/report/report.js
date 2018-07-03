$(function () {
    //更多
    $(".order-list").on("click", function () {
        var url = ctx + "/audit/queryForAuditing.action";
        var time = new Date();
        var index = time.getTime();
        openTabForParent(url, -index, "待审中心");
    });
    /*我的订单*/
    function getPersonnelOrders(userLevel) {
        $.ajax({
            url: ctx + "/cfBusinessOrderAccept/getMine.action",
            type: "post",
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    loadDataToList(data, userLevel);
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            },
            error: function () {
                $("#reportList .table-order tbody").html('<tr><td class="col-td" colspan="7">暂无数据</td></tr>');
            }
        });
    }

    function loadDataToList(data, userLevel) {
        var tbody = "";
        $("#reportList .table-order tbody").html('');
        if (data == null) {
            tbody += '<tr class="no-border"><td class="col-td" colspan="8">暂无数据</td></tr>';
        } else {
            var $list = data.recordList;
            if ($list == null || $list == '' || $list.length == 0) {
                tbody += '<tr class="no-border"><td class="col-td"  colspan="8">暂无数据</td></tr>';
            } else {
                $(".orderNum").text('(' + data.totalCount + ')');
                for (var j = 0; j < $list.length; j++) {
                    tbody += '<tr class="no-border"><td style="width:5%;">' + $list[j].realName + '</td>' +
                        '<td style="width:8%;">' + $list[j].departmentName + '</td>' +
                        '<td style="width:10%;">' + $list[j].bankName + '</td>' +
                        '<td style="width:4%;">' + NumberFormatUtil.fmoney($list[j].actualLoadMoney, 2) + '</td>' +
                        '<td style="width:5%;">' + $list[j].orderStatusName + '</td>';
                    if ($list[j].isWaitingFile == 0) {
                        tbody += '<td style="width:4%;">--</td>';
                    } else {
                        tbody += '<td style="width:4%;">' + $list[j].waitingFileStatusName + '</td>';
                    }
                    tbody += '<td style="width:6%;">' + $list[j].updateTime + '</td>';
                    if (userLevel == 5) {
                        tbody += '<td class="btn-cel" style="width:14%;">';
                        if ($list[j].orderStatus == 4 || $list[j].orderStatus == 7) {
                            tbody += '<a title="齐全视频提交" class="btn btn-primary btn-xs" onclick="videoSubmit(\'' + $list[j].orderNo + '\',\'' + $list[j].realName + '\')" >齐全视频提交</a>';
                        }
                        if ($list[j].orderStatus == 0 || $list[j].orderStatus == 1 || $list[j].orderStatus == -2) {
                            tbody += '<a title="初审单录入" class="btn btn-primary btn-xs" onclick="orderApply(' + $list[j].id + ',\'' + $list[j].realName + '\')" >初审单录入</a>';
                        }
                        if ($list[j].interviewFileStatus == 0 && ($list[j].orderStatus == 1 || $list[j].orderStatus == 3 || $list[j].orderStatus == -2)) {
                            tbody += '<a title="上传面签" class="btn btn-success btn-xs" onclick="uploadInterview(' + $list[j].id + ',\'' + $list[j].realName + '\')">上传面签资料</a>';
                        }
                        if ($list[j].orderStatus >= 13 && $list[j].orderStatus < 20) {
                            tbody += '<a title="垫付申请" class="btn btn-primary btn-xs" onclick="paymentApply(' + $list[j].id + ',\'' + $list[j].realName + '\')">垫款申请</a>';
                        }
                        if ($list[j].orderStatus >= 12 && $list[j].carInfoFileStatus < 1) {
                            tbody += '<a title="提车资料上传" class="btn btn-success btn-xs" onclick="uploadCarFile(' + $list[j].id + ',\'' + $list[j].realName + '\')">提车资料上传</a>';
                        }
                        if ($list[j].orderStatus >= 28 && $list[j].mortgageFileStatus < 1) {
                            tbody += '<a title="抵押资料上传" class="btn btn-primary btn-xs" onclick="uploadMortgage(' + $list[j].id + ',\'' + $list[j].realName + '\')">抵押资料上传</a>';
                        }
                        if ($list[j].isWaitingFile == 1 && $list[j].waitingFileStatus < 1) {
                            tbody += '<a title="候补资料" class="btn btn-primary btn-xs" onclick="waitringFile(' + $list[j].id + ',\'' + $list[j].realName + '\')">候补资料</a>';
                        }
                        /*if ($list[j].orderStatus >= 4 && $list[j].newOrOld == 0 && $list[j].carTransferFileStatus < 1) {
                         tbody += '<a title="车辆过户资料上传" class="btn btn-primary btn-xs" onclick="uploadOldCarFile(' + $list[j].id + ',\'' + $list[j].realName + '\')">过户资料上传</a>';
                         }*/
                    } else {
                        tbody += '<td style="width:6%;">';
                        tbody += '<a title="' + $list[j].nodeRemark + '" class="btn btn-primary btn-xs m-r-xs" onclick="preAudit(' + $list[j].id + ',\'' + $list[j].realName + '\')">' + $list[j].nodeRemark + '</a>';
                    }
                    tbody += '<a title="查看" class="btn btn-info btn-xs detail" onclick="detail(' + $list[j].id + ',\'' + $list[j].realName + '\')" ><i class="fa fa-search-plus"></i>查看</a></td></tr>';
                }
            }
        }
        $("#reportList .table-order tbody").append(tbody);
    }

    //获取非用户级别的代办事项
    function getDepartmentOrders() {
        $.ajax({
            url: ctx + "/audit/getMine.action",
            type: "post",
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    loadDataToList(data);
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            },
            error: function () {
                $("#reportList .table-order tbody").html('<tr class="no-border"><td class="col-td" colspan="8">暂无数据</td></tr>');
            }
        });
    }


    function getRecord(departId, parentId) {
        /*实时战报*/
        $.ajax({
            url: ctx + "/financeReport/getRecord.action",
            type: "post",
            data: {departmentId: departId},
            dataType: "json",
            success: function (result) {
                var html = "";
                $("#record").empty();
                if (result.error == 1) {
                    var data = result.rows;
                    var userLevel = data.userLevel;
                    var isComplex = data.complex;
                    var visRegular = data.isRegular;
                    var vdumpOut = data.dumpOut;
                    var personal = data.personalAndDepartReportVOS;
                    if (userLevel == 5 || userLevel == 4) {

                        var isRegular = "已转正";
                        var dumpOut = "即将淘汰";
                        $.each(personal, function (l, v) {
                            html += '<div class="ibox-items"><div class="ibox-item">';
                            html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(v.dayLoanMoney), 2) + '</h1>';
                            html += '<p>' + v.name + '今日贷款额(万元)</p></div></div>';
                            html += '<div class="ibox-items"><div class="ibox-item">';
                            html += '<h1>' + v.dayLoanNumber + '</h1>';
                            html += '<p>' + v.name + '今日业务量(笔)</p></div></div>';
                            html += '<div class="ibox-items"><div class="ibox-item">';
                            html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(v.monthLoanMoney), 2) + '</h1>';
                            html += '<p>' + v.name + '本月贷款额(万元)</p></div></div>';
                            html += '<div class="ibox-items"><div class="ibox-item">';
                            html += '<h1>' + v.monthLoanNumber + '</h1>';
                            html += '<p>' + v.name + '本月业务量(笔)</p></div></div>';
                            if ((userLevel == 5 && v.type == 0) || (userLevel == 4 && v.type == 1)) {
                                changeIboxContentClass(parentId);
                                if (departId == undefined || parentId != 0) {
                                    html += '<div class="ibox-items"><div class="ibox-item">';
                                    html += '<h1>' + v.companyRanking + '</h1>';
                                    html += '<p>公司(' + v.name + ')排名</p></div></div>';
                                }
                                if (visRegular == 1 && userLevel == 5) {
                                    html += '<div class="ibox-items"><div class="ibox-item">';
                                    html += '<h1><span style="color: green">' + isRegular + '</span></h1>'
                                    html += '</div></div>';
                                }
                                if (vdumpOut == 1) {
                                    html += '<div class="ibox-items"><div class="ibox-item">';
                                    html += '<h1><span style="color: red">' + dumpOut + '</span></h1>';
                                    html += '</div></div>';
                                }
                            } else if (userLevel == 5 && v.type == 1) {
                                html += '<div class="ibox-items"><div class="ibox-item">';
                                html += '<h1>' + v.departRank + '</h1>';
                                html += '<p>团队(' + v.name + ')排名</p></div></div>';
                            }
                        });
                    } else if (!isComplex) {
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.dayLoanMoney), 2) + '</h1>';
                        html += '<p>今日贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.dayLoanNumber + '</h1>';
                        html += '<p>今日业务量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.dayBankPaymentLoanMoney), 2) + '</h1>';
                        html += '<p>今日放款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.directLoanMoney), 2) + '</h1>';
                        html += '<p>直营月贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.directNumber + '</h1>';
                        html += '<p>直营月业务量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.monthLoanMoney), 2) + '</h1>';
                        html += '<p>本月贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.monthLoanNumber + '</h1>';
                        html += '<p>本月业务量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.monthBankPaymentLoanMoney), 2) + '</h1>';
                        html += '<p>本月放款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.channelLoanMoney), 2) + '</h1>';
                        html += '<p>渠道月贷款额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.channelNumber + '</h1>';
                        html += '<p>渠道月业务量(笔)</p></div></div>';
                    } else {
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.dayBankSubmitLoanMoney), 2) + '</h1>';
                        html += '<p>今日送行金额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.dayBankSubmitLoanNumber + '</h1>';
                        html += '<p>今日送行量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.dayBankPaymentLoanMoney), 2) + '</h1>';
                        html += '<p>今日放款金额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.dayBankPaymentLoanNumber + '</h1>';
                        html += '<p>今日放款量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.overtimeOfAdvanceMoney), 2) + '</h1>';
                        html += '<p>单证超时金额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.overtimeOfAdvanceNumber + '</h1>';
                        html += '<p>单证超时量(笔)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + NumberFormatUtil.fmoney(formetMoney(data.overtimeOfPaymentMoney), 2) + '</h1>';
                        html += '<p>抵押超时金额(万元)</p></div></div>';
                        html += '<div class="ibox-items"><div class="ibox-item">';
                        html += '<h1>' + data.overtimeOfPaymentNumber + '</h1>';
                        html += '<p>抵押超时量(笔)</p></div></div>';
                    }
                    html += '<div style="clear: both;"></div>'
                    $("#record").append(html);
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            }

        });
    }


//部门树
    var zTree1
    var setting1 = {
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
            "top": "40px",
            "width": "179px"
        }).slideDown("fast");
        $("body").bind("mousedown", onBodyDown);
        var id = $("#departmentId").data("id");
        $.ajax({
            url: ctx + "/department/reportDeportmentTree.action",
            data: {id: id},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var zNodes = result.rows;
                    $.fn.zTree.init($("#departmentTree"), setting1, zNodes);
                    zTree1 = $.fn.zTree.getZTreeObj("departmentTree");
                    zTree1.expandAll(true);
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

    function changeIboxContentClass(parentId) {
        if (parentId == 0) {
            $("#record").removeClass("ibox-content-5");
            $("#record").addClass("ibox-content-4");
        } else {
            $("#record").removeClass("ibox-content-4");
            $("#record").addClass("ibox-content-5");
        }
    }

    function tjDeparment(event, treeId, treeNode) {
        var parentId = treeNode.parentId;
        var id = treeNode.id;
        $("#departmentId").val(treeNode.name);
        changeIboxContentClass(parentId);
        getRecord(id, parentId);
        hideMenu();
    }


    var rank_zTree
    var rank_setting = {
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: rankDepartment
        }
    };

    function selectRankDepartment(departmentType) {
        $("#rank-menuContent").css({
            "background": "#cff",
            "overflow": "auto",
            "z-index": 999,
            "top": "40px",
            "width": "179px"
        }).slideDown("fast");
        $("body").bind("mousedown", onRankBodyDown);
        var id = $("#rank-departmentId").data("id");
        $.ajax({
            url: ctx + "/department/reportDeportmentTree.action",
            data: {id: id, departmentType: departmentType},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var zNodes = result.rows;
                    $.fn.zTree.init($("#rank-departmentTree"), rank_setting, zNodes);
                    rank_zTree = $.fn.zTree.getZTreeObj("rank-departmentTree");
                    rank_zTree.expandAll(true);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function onRankBodyDown(event) {
        if (!(event.target.id == "rank-menuContent" || $(event.target).parents("#rank-menuContent").length > 0 )) {
            hideRankMenu();
        }
    }

    function hideRankMenu() {
        $("#rank-menuContent").fadeOut("fast");
    }

    function rankDepartment(event, treeId, treeNode) {
        $("#rank-departmentId").val(treeNode.name);
        $("#rank-departmentId").data("id", treeNode.id);
        hideRankMenu();
    }

    //
    $(".search").on("click", function () {
        searchSumbit();
    });

    //获取部门列表
    function init(userLevel) {
        if (userLevel == 4) {
            getPersonalDataList(0, null);
        }
        //
        getRecord($("#departmentId").data("id"), 0);
    }


    //****************************//
    //*							*//
    //*	AJAX分页全部变量定义		*//
    //*							*//
    //***************************//
    var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;	//是否为初始化第一页标记
    var userLevel = $(".wrapper").data("userlevel");
    if (userLevel == 4) {//部门级别
        init(userLevel);
        if ($(".order-list").length > 0) {
            getDepartmentOrders();
        }
    } else if (userLevel == 5) {//用户级别
        getRecord(null);
        getPersonnelOrders(userLevel);
    } else if (userLevel < 4) {
        var type = $('.nav-tabs li.active').find("a").data("type");
        init(userLevel);
        if ($(".order-list").length > 0) {
            getDepartmentOrders();
        }
        getDepartmentDataList(type, 0, null);
    }

    $("#pagerForm").find("input").keypress(function (event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            searchSumbit();
        }
    });

    function searchSumbit() {
        initFlag = true;
        $("#pageNum").val(0);
        if (userLevel < 4) {
            var type = $('.nav-tabs li.active').find("a").data("type");
            getDepartmentDataList(type, 0, null);
        } else {
            getPersonalDataList(0, null);
        }
    };

    //部门事件
    $("#departmentId").on("click", function () {
        selectDepartment();
    });

    $("#rank-departmentId").on("click", function () {
        if (userLevel == 4) {
            selectRankDepartment(null);
        } else if (userLevel < 4) {
            var type = $('.nav-tabs li.active').find("a").data("type");
            selectRankDepartment(type);
        }
    });

    $('.nav-tabs li').click(function () {
        $("#rank-departmentId").val('');
        $("#rank-departmentId").data("id", "");
        initFlag = true;
        var type = $(this).find("a").data("type");
        init(type, userLevel);
        getDepartmentDataList(type, 0, null);
    });

    function getDepartmentDataList(type, currPage, jg) {
        var departmentId = $("#rank-departmentId").data("id");
        $(".table-more tbody").html('');
        showLoading("#result");
        $.ajax({
            url: ctx + "/financeReport/companyDepartReportList.action",
            type: "post",
            data: {
                'pageNum': currPage,
                'departmentType': type,
                'departmentId': departmentId,
                'numPerPage': pageSize
            },
            dataType: "json",
            success: function (data) {
                hideLoading("#result");
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        if (initFlag) {
                            $("#pagination").pagination(data["rows"]["totalCount"], {
                                items_per_page: pageSize,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getDepartmentDataList(type, currPage, jg);
                                }//回调函数
                            });
                            initFlag = false;
                        }
                        loadDepartmentDataTbody(data, currPage);
                    } else {
                        $(".table-more tbody").html("<tr class='no-border'><td class='col-td' colspan='18'>暂无数据</td></tr>");
                        $("#pagination").html("");
                    }
                } else {
                    $(".table-more tbody").html("<tr class='no-border'><td class='col-td' colspan='18'>暂无数据</td></tr>");
                    $("#pagination").html("");
                }
            },
            error: function () {
                $(".table-more tbody").html("<tr class='no-border'><td class='col-td' colspan='18'>暂无数据</td></tr>");
            }
        });
    }

    function getPersonalDataList(currPage, jg) {
        var departmentId = $("#rank-departmentId").data("id");
        $(".table-more tbody").html('');
        showLoading("#result");
        $.ajax({
            url: ctx + "/financeReport/departReportList.action",
            type: "post",
            data: {
                'pageNum': currPage,
                'departmentId': departmentId,
                'numPerPage': pageSize
            },
            dataType: "json",
            success: function (data) {
                hideLoading("#result");
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        if (initFlag) {
                            $("#pagination").pagination(data["rows"]["totalCount"], {
                                items_per_page: pageSize,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getPersonalDataList(currPage, jg);
                                }//回调函数
                            });
                            initFlag = false;
                        }
                        loadPersonalDataTbody(data, currPage);
                    } else {
                        $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='10'>暂无数据</td></tr>");
                        $("#pagination").html("");
                    }
                } else {
                    $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='10'>暂无数据</td></tr>");
                    $("#pagination").html("");
                }
            },
            error: function () {
                $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='10'>暂无数据</td></tr>");
            }
        });
    }

    function loadPersonalDataTbody(data, currPage) {
        var tbody = "";
        var result = data.rows;
        $(".table-more tbody").html('');
        if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
            tbody += '<tr><td class="col-td" colspan="10" >暂无数据</td></tr>';
        } else {
            var list = result.recordList;
            for (var j = 0; j < list.length; j++) {
                var num = Number(currPage * pageSize) + parseInt(j) + 1;
                tbody += '<tr><td style="width:3%;">' + num + '</td>' +
                    '<td style="width:8%;">' + list[j].userName + '</td>';
                if (list[j].dayLoanMoney == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + NumberFormatUtil.fmoney(formetMoney(list[j].dayLoanMoney), 2) + '</td>';
                }
                if (list[j].dayLoanNumber == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].dayLoanNumber + '</td>';
                }
                if (list[j].monthLoanMoney == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + NumberFormatUtil.fmoney(formetMoney(list[j].monthLoanMoney), 2) + '</td>';
                }
                if (list[j].monthLoanNumber == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].monthLoanNumber + '</td>';
                }
                if (list[j].rate == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].rate + '</td>';
                }
                if (list[j].time == '' || list[j].time == undefined) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].time + '</td>';
                }
                if (list[j].isRegular == '' || list[j].isRegular == undefined) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    var isRegular = "未转正";
                    if (list[j].isRegular == 1) {
                        isRegular = "已转正"
                    }
                    tbody += '<td style="width:8%;">' + isRegular + '</td>';
                }
                if (list[j].dumpOut == '' || list[j].dumpOut == undefined) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    var dumpOut = "未提醒";
                    if (list[j].dumpOut == 1) {
                        dumpOut = "已提醒"
                    }
                    tbody += '<td style="width:8%;">' + dumpOut + '</td>';
                }
                tbody += '</tr>';
            }
        }
        $(".table-more tbody").append(tbody);
    }

    function loadDepartmentDataTbody(data, currPage) {
        var tbody = "";
        var result = data.rows;
        $(".table-more tbody").html('');
        if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
            tbody += '<tr><td class="col-td" colspan="14">暂无数据</td></tr>';
        } else {
            var list = result.recordList;
            for (var j = 0; j < list.length; j++) {
                var num = Number(currPage * pageSize) + parseInt(j) + 1;
                tbody += '<tr><td>' + num + '</td>' +
                    '<td>' + list[j].departmentName + '</td>' +
                    /*'<td>' + list[j].province + '</td>' +*/
                    '<td>' + list[j].departmentManager + '</td>';
                if (list[j].monthLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + NumberFormatUtil.fmoney(formetMoney(list[j].monthLoanMoney), 2) + '</td>';
                }
                if (list[j].monthLoanNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].monthLoanNumber + '</td>';
                }
                if (list[j].dayLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + NumberFormatUtil.fmoney(formetMoney(list[j].dayLoanMoney), 2) + '</td>';
                }
                if (list[j].dayLoanNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].dayLoanNumber + '</td>';
                }
                if (list[j].dayOrderSubmitNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].dayOrderSubmitNumber + '</td>';
                }
                if (list[j].dayOrderSubmitLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + NumberFormatUtil.fmoney(formetMoney(list[j].dayOrderSubmitLoanMoney), 2) + '</td>';
                }
                if (list[j].monthOrderSubmitNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].monthOrderSubmitNumber + '</td>';
                }
                if (list[j].monthOrderSubmitLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + NumberFormatUtil.fmoney(formetMoney(list[j].monthOrderSubmitLoanMoney), 2) + '</td>';
                }
                /*if (list[j].personnelMonthLoanNumber == 0) {
                 tbody += '<td>--</td>';
                 } else {
                 tbody += '<td>' + list[j].personnelMonthLoanNumber + '</td>';
                 }
                 if (list[j].personnelAverage == 0) {
                 tbody += '<td>--</td>';
                 } else {
                 tbody += '<td>' + NumberFormatUtil.fmoney(formetMoney(list[j].personnelAverage), 2) + '</td>';
                 }*/
                if (list[j].userCount == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].userCount + '</td>';
                }
                if (list[j].yearLoanNumber == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + list[j].yearLoanNumber + '</td>';
                }
                if (list[j].yearLoanMoney == 0) {
                    tbody += '<td>--</td>';
                } else {
                    tbody += '<td>' + NumberFormatUtil.fmoney(formetMoney(list[j].yearLoanMoney), 2) + '</td>';
                }
                /*if (list[j].rate == 0) {
                 tbody += '<td>--</td>';
                 } else {
                 tbody += '<td>' + list[j].rate + '</td>';
                 }*/
                tbody += '</tr>';
            }
        }
        $(".table-more tbody").append(tbody);
    }

    //横向滚动条
    $('.scroll-x').scroll(function () {
        var winWidth = $(window).width();
        var scrollWidth = this.scrollWidth;
        var scrollLeft = this.scrollLeft;
        $(".pagination").css('right', (-18 - scrollLeft) + 'px');
        if (scrollWidth - winWidth < scrollLeft) {
            $(".pagination").css('right', -(scrollWidth - winWidth + 68) + 'px');
        }
    });

    function formetMoney(num) {
        if (num == "0") return "0.00";
        return num / 10000
    }
    
});


//管理订单附件
function fileManage(id, title) {
    var url = ctx + "/cfFileCenter/preFileManage.action?id=" + id;
    openTabForParent(url, "-order-file-" + id, "管理订单附件-" + title);
}
//上传面签附件
function uploadInterview(id, title) {
    var url = ctx + "/cfFileCenter/preUploadInterview.action?id=" + id + "&viewSource=homepage";
    openTabForParent(url, "-order-upload-interview-" + id, "上传面签资料-" + title);
}
//抵押材料
function uploadMortgage(id, title) {
    var url = ctx + "/cfMortgageRegist/preMortgageFile.action?id=" + id;
    openTabForParent(url, "-order-upload-mortgage-" + id, "抵押资料上传-" + title);
}
//上传其他附件
function uploadOther(id, title) {
    var url = ctx + "/cfFileCenter/preUploadOther.action?id=" + id;
    openTabForParent(url, "-order-upload-other-" + id, "上传其他附件-" + title);
}
//候补资料
function waitringFile(id, title) {
    var url = ctx + "/cfSupplyMaterial/preWaitingFile.action?id=" + id;
    openTabForParent(url, "-order-waiting-file-" + id, "候补资料-" + title);
}
//过户资料
function uploadOldCarFile(id, title) {
    var url = ctx + "/cfSupplyMaterial/preOldCarFile.action?id=" + id;
    openTabForParent(url, "-order-upload-oldCar-file-" + id, "过户资料-" + title);
}
//订单轨迹
function toOrderTrack(id, title) {
    var url = ctx + "/cfOrderTrack.action?acceptId=" + id;
    openTabForParent(url, "-order-track-" + id, "订单轨迹-" + title);
}
//订单详情
function detail(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-" + title);
}
//初审单录入
function orderApply(id, title) {
    var url = ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + id
    openTabForParent(url, "-order-apply-" + id, "初审单录入-" + title);
}
//齐全视频提交
function videoSubmit(orderNo, title) {
    var url = ctx + "/cfVideoSubmit/query.action?nameOrId=" + orderNo;
    openTabForParent(url, "-video-submit-" + orderNo, "齐全视频提交-" + title);
}
//上传提车资料
function uploadCarFile(id, title) {
    var url = ctx + "/carInfo/carInformationBackEnter.action?id=" + id;
    var time = new Date();
    var index = time.getTime();
    openTabForParent(url, "-order-upload-car-file-" + id, "上传提车资料-" + title);
}
//预审核页面
function preAudit(id, title) {
    var url = ctx + "/audit/preAudit.action?orderId=" + id;
    var time = new Date();
    var index = time.getTime();
    openTabForParent(url, "-audit-" + id, "订单审核-" + title);
}

//垫付申请
function paymentApply(id, realName) {
    editProtocol(id, realName, getData(id));
}

//垫款申请
function editProtocol(id, name, result) {
    var listLength = null;
    if (result != null && result != undefined && result != "") {
        listLength = result['list'].length;
    }
    var options = {
        width: 750,
        top: 200,
        height: listLength ? 480 : 360,
        overlay: true,
        dispose: true,
        move: true,
        title: '修改',
        onAfterShow: function () {
            var itemHtml = '';
            var list = result['list'];
            if (list == null || list.length < 1) {
                itemHtml = '<p>暂无审核信息</p>';
                $("#audit-info").append(itemHtml);
            } else {
                itemHtml = '<h5>审核信息</h5>';
                for (var i = 0; i < list.length; i++) {
                    itemHtml += '<div class="infor-item">' +
                        ' <div class="box-item row">' +
                        '<div class="col-xs-2">' +
                        '<div class="item-text">' +
                        '<label for="">审核类型:</label>' +
                        '</div>' +
                        list[i]['bussinessTypeName'] +
                        '</div>' +
                        '<div class="col-xs-2">' +
                        '<div class="item-text">' +
                        '<label for="">审核状态:</label>' +
                        '</div>' +
                        list[i]['auditStatusName'] +
                        '</div>' +
                        '<div class="col-xs-3">' +
                        '<div class="item-text">' +
                        '<label for="">备注:</label>' +
                        '</div>' +
                        list[i]['auditBak'] +
                        '</div>' +
                        '<div class="col-xs-2">' +
                        '<div class="item-text">' +
                        '<label for="">审核人员:</label>' +
                        '</div>' +
                        list[i]['auditRealName'] +
                        '</div>' +
                        '<div class="col-xs-3">' +
                        '<div class="item-text">' +
                        '<label for="">审核时间:</label>' +
                        '</div>' + list[i]['auditTimeStr'] + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="hr-line-dashed" style="margin:15px;"></div>';
                }
                $("#audit-info").append(itemHtml);
            }
            $("#buyerName").val(name);
            $("#poundage").val(result.poundage);
            $("#agreeEnsureMoney").val(result.agreeEnsureMoney);
            $("#channelEnsureMoney").val(result.channelEnsureMoney);
            $("#licensePlateEnsureMoney").val(result.licensePlateEnsureMoney);
        },
        callback: function () {
            var flag = false;
            if ($("#applyPayCreateForm").valid("applyPayCreateForm")) {
                $.ajax({
                    url: ctx + "/applyPay/applyPay.action",
                    type: "post",
                    data: {
                        "orderId": id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.reload();
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
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
    var editDlg = new Dialog("#applyPayCreate-dialog", options);
    editDlg.show();

}

//获取审核信息
function getData(id) {
    var result = '';
    $.ajax({
        url: ctx + "/applyPay/findAuditInfo.action",
        type: "post",
        data: {
            'id': id
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                result = data.rows;
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    })
    return result;
}