$(function () {
    getReportInfo();

    $(".table tr th .fa-caret-left").on("click", function () {
        $(".report-left").removeClass('border-r-3').addClass('width-0');
        $(".report-right").addClass('full-width').find('.bg-b .col-sm-4').html('');
        caretRight();
    });

    function caretRight() {
        $(".report-right .bg-b .fa-caret-right").on("click", function () {
            $(".report-right").removeClass('full-width').find('.bg-b .col-sm-4').html('');
            $(".report-left").removeClass('width-0').addClass('border-r-3');
        });
    }

    function getReportInfo() {
        $.ajax({
            url: ctx + "/reportManager/listReportInfo.action",
            type: "post",
            data: {reportStatus: 1},
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
                $("#reportInfo .table tbody").html('<tr><td class="col-td" colspan="5">暂无数据</td></tr>');
            }
        });
    }

    function loadDataToList(data) {
        var tbody = "";
        $("#reportInfo .table tbody").html('');
        if (data == null) {
            tbody += '<tr><td class="col-td" colspan="1">暂无数据</td></tr>';
        } else {
            var $list = data.recordList;
            if ($list == null || $list == '' || $list.length == 0) {
                tbody += '<tr><td class="col-td"  colspan="1">暂无数据</td></tr>';
            } else {
                for (var j = 0; j < $list.length; j++) {
                    tbody += '<tr class="no-border" data-id="' + $list[j].id + '"><td>' + $list[j].reportName + '</td></tr>';
                }
            }
        }
        $("#reportInfo .table tbody").append(tbody);
        initReportField();
    }

    function initReportField() {
        $("#reportInfo .table tbody tr .no-border td").click(function () {
            initFlag = true;
            var id = $(this).parent().data("id");
            loadingShow();
            $.ajax({
                url: ctx + "/reportManager/listReportField.action",
                type: "post",
                data: {id: id},
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        loadReportFieldDataToList(id, data.rows);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
            getPersonalDataList(id, 0, null);
        });
    }

    function loadReportData(data) {
        var tbody = "";
        $("#reportFieldList .table tbody").html('');
        if (data.pageCount > 0) {
            $list = data.resultMap;
            for (var j = 0; j < $list.length; j++) {
                tbody += "<tr>";
                var map = $list[j];
                for (var key in map) {
                    if (map[key] === null || map[key] === 'null') {
                        tbody += '<td></td>';
                    } else {
                        tbody += '<td>' + map[key] + '</td>';
                    }
                }
                tbody += "</tr>";
            }
        }
        $("#reportFieldList .table tbody").append(tbody);
    }

    function initSelect(url, callback) {
        $.ajax({
            url: url,
            type: 'post',
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    if (typeof(callback) === 'function') {
                        callback(result['rows']);
                    }
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            }
        });
    }

    function loadReportFieldDataToList(id, data) {
        var thead = "<tr>";
        var search = '';
        $(".search-from").html('');
        $("#reportFieldList .table thead").html('');
        if (data != null && data.length > 0) {
            for (var j = 0; j < data.length; j++) {
                if (data[j].isShow == 1) {
                    thead += '<th>' + data[j].nameZh + '</th>';
                }
                if (data[j].searchCondition == 1) {
                    var columnName = data[j].columnName;
                    search += '<div class="form-group"><label class="control-label label">' + data[j].nameZh + ':</label>';
                    if ("department_name" === columnName && data[j].columnType == 'string'){
                        initSelect(ctx + "/department/list.action", function (res) {
                            search += '<select name="' + columnName + '" class="form-control chosen-select"><option value="">请选择</option>';
                            $.each(res, function (k, p) {
                                search += "<option value='" + p.name + "'>" + p.name + "</option>";
                            });
                            search += '</select></div>';
                        });
                    }else if ("dealer_name" === columnName && data[j].columnType == 'string') {
                        initSelect(ctx + "/dealerManage/list.action", function (res) {
                            search += '<select name="' + columnName + '" class="form-control chosen-select"><option value="">请选择</option>';
                            $.each(res, function (k, p) {
                                search += "<option value='" + p.dealerName + "'>" + p.dealerName + "</option>";
                            });
                            search += '</select></div>';
                        });
                    } else if ("bank_name" === columnName && data[j].columnType == 'string') {
                        initSelect(ctx + "/bank/list.action", function (res) {
                            search += '<select name="' + columnName + '" class="form-control chosen-select"><option value="">请选择</option>';
                            $.each(res, function (k, p) {
                                search += "<option value='" + p.bankName + "'>" + p.bankName + "</option>";
                            });
                            search += '</select></div>';
                        });
                    } else if ("order_status" == columnName && data[j].columnType == 'int') {
                        search += '<select name="' + columnName + '" class="form-control chosen-select">' +
                            '<option value="">请选择</option><option value="0">征信提交</option><option value="1">征信查询</option>' +
                            '<option value="3">初审单提交</option><option value="4">终审提交</option><option value="7">终审预通过</option>' +
                            '<option value="12">终审通过</option><option value="13">财务费用确认</option><option value="14">垫款申请退回</option>' +
                            '<option value="16">垫款申请递交</option><option value="18">垫款申请审核通过</option><option value="20">财务打款</option>' +
                            '<option value="28">已成交</option><option value="30">已结清</option><option value="-1">征信退回</option><option value="-2">退单</option>' +
                            '<option value="-3">作废</option><option value="-4">拒单</option></select></div>';
                    } else if (data[j].columnType == 'date') {
                        search += '<input type="text" id="' + columnName + 'Start"  name="' + columnName + '" class="form-control w-104 startTime"/>-';
                        search += '<input type="text" id="' + columnName + 'End" name="' + columnName + '" class="form-control w-104"/></div>';
                    } else {
                        search += '<input type="text" name="' + columnName + '" class="form-control"/></div>';
                    }
                }
            }
        }
        thead += "</tr>";
        search += '<div class="form-group">&nbsp;&nbsp;<button type="button" class="btn btn-primary  btn-sm search-btn">搜索</button>&nbsp;&nbsp;<a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>' +
            '&nbsp;&nbsp;<a type="button" class="btn btn-warning  btn-sm export-btn">导出</a></div>';
        $(".search-from").append(search);
        var dateClass = $(".startTime");
        for (var i = 0; i < dateClass.length; i++) {
            var dateName = $(dateClass[i]).attr("name");
            initInput('chosen-select', dateName);
        }

        //重置按钮
        $(".reset-btn").on("click", function () {
            $("#searchForm").find("input,select").each(function (i, n) {
                $(n).val('');
            });
            $(".chosen-select").trigger("chosen:updated");
        });

        $("#searchForm").find("input").keypress(function (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
            if (keyCode == 13) {
                searchSumbit(id);
            }
        });
        //搜索
        $(".search-btn").on("click", function () {
            searchSumbit(id);
        });

        //导出
        $(".export-btn").on('click', function () {
            confirmDialog("您确定要导出信息？", function () {
                var param = '';
                $('#searchForm').find("input").each(function (v, n) {
                    var name = $(n).attr("name");
                    if (name == "pageNum") {
                        param += "&" + name + "=" + $.trim($(n).val());
                    } else if (name != undefined){
                        param += "&" + name + "=" + $.trim($(n).val());
                    }
                });
                var frame = $('<iframe>');//定义一个iframe
                frame.attr("src", ctx + "/reportManager/export.action?" + param);
                frame.attr("style", "display:none");
                frame.append("</iframe>")
                $("body").append(frame);
            });
        });

        $("#reportFieldList .table thead").append(thead);
    }

    function searchSumbit(id) {
        initFlag = true;
        $("#pageNum").val(0);
        getPersonalDataList(id, 0, null);
    }

    function initInput(a, b) {
        $("." + a).chosen({
            disable_search_threshold: 8,
            no_results_text: "没有找到",
            allow_single_deselect: true,
            width: "150px"
        });

        if (b) {
            /*var date = new Date();
            var seperator = "-";
            var year = date.getFullYear();
            var month = date.getMonth();
            var month1 = date.getMonth() + 1;
            var strDate = date.getDate();

            $("#" + b + "Start").val(year + seperator + month + seperator + strDate);
            $("#" + b + "End").val(year + seperator + month1 + seperator + strDate);*/

            var sTime = {
                elem: "#" + b + "Start",
                format: 'YYYY-MM-DD',
                min: '1970-01-01', //设定最小日期为当前日期
                max: laydate.now(), //最大日期
                istoday: false, //显示今天
                issure: true, //确定框
                istime: false,
                start: laydate.now(),
                choose: function (datas) {
                    eTime.min = datas; //开始日选好后，重置结束日的最小日期
                },
                clear: function () {
                    eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
                }
            };

            var eTime = {
                elem: "#" + b + "End",
                format: 'YYYY-MM-DD',
                min: "1970-01-01",
                max: laydate.now(),
                istoday: false,				//显示今天
                issure: true,					//确认框
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
    }

    //****************************//
    //*							*//
    //*	AJAX分页全部变量定义		*//
    //*							*//
    //***************************//
    var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;	//是否为初始化第一页标记

    function getPersonalDataList(id, currPage, jg) {
        $("#searchForm .search-span").empty();
        $("<input type='hidden' name='id' value='" + id + "'/>").appendTo("#searchForm .search-span");
        $("<input type='hidden' name='pageNum' value='" + currPage + "'/>").appendTo("#searchForm .search-span");
        $("<input type='hidden' name='numPerPage' value='" + pageSize + "'/>").appendTo("#searchForm .search-span");
        $(".table-more tbody").html('');
        showLoading("#reportFieldList");
        $.ajax({
            url: ctx + "/reportManager/getReportData.action",
            type: "post",
            data: $("#searchForm").serialize(),
            dataType: "json",
            success: function (data) {
                hideLoading("#reportFieldList");
                if (data.error == 1) {
                    var pageResult = data.rows;
                    if (pageResult.pageCount > 0) {
                        if (initFlag) {
                            $("#pagination").pagination(pageResult.pageCount, {
                                items_per_page: pageSize,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getPersonalDataList(id, currPage, jg);
                                }//回调函数
                            });
                            initFlag = false;
                        }
                        loadReportData(pageResult);
                    } else {
                        $(".table-more tbody").html("");
                        $("#pagination").html("");
                    }
                } else {
                    $(".table-more tbody").html("");
                    $("#pagination").html("");
                }
            },
            error: function () {
                $(".table-more tbody").html("");
            }
        });
    }

    function loadPersonalDataTbody(data, currPage) {
        var tbody = "";
        var result = data.rows;
        $(".table-more tbody").html('');
        if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
            tbody += '<tr><td class="col-td" colspan="8" >暂无数据</td></tr>';
        } else {
            var list = result.recordList;
            for (var j = 0; j < list.length; j++) {
                var num = Number(currPage * pageSize) + parseInt(j) + 1;
                tbody += '<tr><td style="width:3%;">' + num + '</td>' +
                    '<td style="width:5%;">' + list[j].userName + '</td>';
                if (list[j].dayLoanMoney == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + NumberFormatUtil.fmoney(list[j].dayLoanMoney, 2) + '</td>';
                }
                if (list[j].dayLoanNumber == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].dayLoanNumber + '</td>';
                }
                if (list[j].monthLoanMoney == 0) {
                    tbody += '<td style="width:5%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + NumberFormatUtil.fmoney(list[j].monthLoanMoney, 2) + '</td>';
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
                tbody += '</tr>';
            }
        }
        $(".table-more tbody").append(tbody);
    }
});