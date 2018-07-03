(function ($) {
    var UI = function () {
        return this;
    }

    UI.fn = UI.prototype;

    //审核历史记录ui初始化
    UI.fn.createAuditHistoryHtml = createAuditHistoryHtml;
    //注册抵押按钮操作日志
    UI.fn.createButtonOperatorLogHtml = createButtonOperatorLogHtml;

    //征信列表初始化
    UI.fn.createCreditHtml = createCreditHtml;

    //设置初始值
    UI.fn.setDefaultValue = setDefaultValue;

    UI.fn.formatMoney = formatMoney;

    //数字大写转换
    UI.fn.getUpperNumber = getUpperNumber;

    //查询购车人相关历史订单
    UI.fn.createHistoryOrderHtml = createHistoryOrderHtml;

    //没有数据filedset提示信息
    UI.fn.createFiledSetNoDataTip = createFiledSetNoDataTip;

    //设置配置对象只读属性
    UI.fn.setConfigTagReadOnly = setConfigTagReadOnly;

    //隐藏配置对象按钮
    UI.fn.hideConfigTagButton = hideConfigTagButton;

    //创建文件预览组件
    UI.fn.createFileItemHtml = createFileItemHtml;

    //创建财务打款组件(收入)
    UI.fn.createFinancialContributionHtml = createFinancialContributionHtml;
    //创建财务打款组件(支出)
    UI.fn.createFinancialIncomHtml = createFinancialIncomHtml;
    //创建财务收支
    UI.fn.createFinancialPaymentsHtml = createFinancialPaymentsHtml;

    //创建营销费用
    UI.fn.createMarketingExpensesHtml = createMarketingExpensesHtml;
    //创建放贷信息按钮日志
    UI.fn.createOperationLogHtml = createOperationLogHtml;
    //创建费用确认按钮日志
    UI.fn.createFinanceOperationLogHtml = createFinanceOperationLogHtml;
    //创建放贷信息日志
    UI.fn.createOperationCtrlLogHtml = createOperationCtrlLogHtml;

    //创建订单流程图
    UI.fn.createOrderProcessPic = createOrderProcessPic;

    //获取订单业务状态图
    UI.fn.createOrderStatusGrid = createOrderStatusGrid;

    //获取出险情况
    UI.fn.createInsurcaceClaimHtml = createInsurcaceClaimHtml;

    //大数据征信查询表格
    UI.fn.createBigDataCreditHtml = createBigDataCreditHtml;
    
    //逾期概况表格
    //TODO
    UI.fn.createOverdueDescHtml = createOverdueDescHtml;
    
    //逾期列表详情
    UI.fn.createOverdueListHtml = createOverdueListHtml;
    
    //催缴列表
    UI.fn.createUrgeListHtml = createUrgeListHtml;
    
    //创建诉讼列表
    UI.fn.createLawListHtml = createLawListHtml;
    //创建代偿列表
    UI.fn.createAdvListHtml = createAdvListHtml;
    //获取保全
    UI.fn.createTrailCarListHtml = createTrailCarListHtml;
    //创建拖车单设置列表
    UI.fn.createTrailCarExecuteListHtml = createTrailCarExecuteListHtml;

    //自动化审批
    UI.fn.createAutoAuditCreditHtml = createAutoAuditCreditHtml;

    UI.fn.createVideoOrderHtml = createVideoOrderHtml;


    //给指定元素下input、select设置默认值
    function setDefaultValue(id, data) {
        if (data == null) {
            return;
        }
        $(id).find("input, select,textarea").each(function (i, n) {
            var name = $(n).attr("name");
            var dateName = $(n).attr("dateName");
            if (dateName != undefined && dateName != '') {
                $(n).val(data[dateName]);
            } else {
                $(n).val(data[name]);
            }
            if ($(this).is("textarea")) {
            	var len = data[name].length;
                $(n).text(data[name]).next(".textarea-tip").find(".count").text(len).end().find(".remainCount").text(1000-len);
                
            }
            if ($(this).is("select")) {
                try {
                    $(n).trigger("chosen:updated");
                } catch (e) {

                }
            }
        });
    }

    /**
     * 格式化指定表单下面的货币值
     * @param formId
     * @param names
     * @returns
     */
    function formatMoney(formId, names) {
        for (var i = 0; i < names.length; i++) {
            if ("" != $(formId).find("input[name='" + names[i] + "']").val()) {
                $(formId).find("input[name='" + names[i] + "']").val(NumberFormatUtil.fmoney($(formId).find("input[name='" + names[i] + "']").val(), 2));
            }
        }
    }

    function getUpperNumber(i) {
        if (i == 1) {
            return "一";
        } else if (i == 2) {
            return "二";
        } else if (i == 3) {
            return "三";
        } else if (i == 4) {
            return "四";
        } else if (i == 5) {
            return "五";
        } else if (i == 6) {
            return "六";
        } else if (i == 7) {
            return "七";
        } else if (i == 8) {
            return "八";
        } else if (i == 9) {
            return "九";
        } else if (i == 10) {
            return "十";
        } else {
            return "未知";
        }
    }

    //初始化审核历史记录组件
    function createAuditHistoryHtml(rows) {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr><th style="width:2%;">序号</th><th style="width:8%;">审核类型</th>' +
            '<th style="width:6%;">审核结果</th>' +
            '<th style="width:62%;">审核意见</th>' +
            '<th style="width:10%;">审核人员</th>' +
            '<th style="width:8%;">审核时间</th>' +
            '<th style="width:6%;">操作</th></tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td" colspan="7">暂无审核信息</td>';
        } else {
            for (var i = 0; i < rows.length; i++) {
                var auditStatusStr = "";
                if (rows[i]["auditStatus"] == 2) {			//通过
                    auditStatusStr = '<code class="btn-success">' + rows[i]["auditStatusStr"] + '</code>'
                } else if (rows[i]["auditStatus"] == -4) {		//拒绝
                    auditStatusStr = '<code class="btn-warning">' + rows[i]["auditStatusStr"] + '</code>'
                } else if (rows[i]["auditStatus"] == -2) {		//退回
                    auditStatusStr = '<code class="btn-danger">' + rows[i]["auditStatusStr"] + '</code>'
                } else if (rows[i]["auditStatus"] == -3) {		//作废
                    auditStatusStr = '<code class="btn-primary">' + rows[i]["auditStatusStr"] + '</code>'
                } else if (rows[i]["auditStatus"] == 3) {		//保存
                    auditStatusStr = '<code class="btn-info">' + rows[i]["auditStatusStr"] + '</code>'
                } else {
                    auditStatusStr = rows[i]["auditStatusStr"];
                }
                html += '<tr style="height: 42px;line-height: 42px;">' +
                    '<td class="cel">' + (i + 1) + '</td>' +
                    '<td class="cel">' + (null == rows[i]["auditTypeName"] || "" == rows[i]["auditTypeName"] || "初审单录入" == rows[i]["auditTypeName"] ? "订单审核" : rows[i]["auditTypeName"]) + '</td>' +
                    '<td class="cel">' + auditStatusStr + '</td>' +
                    '<td class="cel desc" title="' + rows[i]["auditBak"] + '">' + rows[i]["auditBak"] + '</td>' +
                    '<td class="cel">' + rows[i]["auditUser"] + '<code>（' + rows[i]["roleName"] + '）</code>' + '</td>' +
                    '<td class="cel">' + rows[i]["auditTime"] + '</td>' +
                    '<td><a value="' + rows[i]["id"] + '" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a></td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    //初始化按钮操作日志记录组件
    function createButtonOperatorLogHtml(rows) {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr><th style="width:3%;">序号</th>' +
            '<th style="width:18%;">操作事件</th>' +
            '<th style="width:19%;">操作人</th>' +
            '<th style="width:19%;">操作人所在部门</th>' +
            '<th style="width:16%;">操作时间</th></tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td" colspan="7">暂无日志信息</td>';
        } else {
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td class="cel">' + (i + 1) + '</td>' +
                    '<td class="cel">' + rows[i]["buttonTypeName"] + '</td>' +
                    '<td class="cel">' + rows[i]["userName"] + '</td>' +
                    '<td class="cel">' + rows[i]["departName"] + '</td>' +
                    '<td class="cel">' + rows[i]["operatorTime"] + '</td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }


    //创建购车人征信信息表格
    function createCreditHtml(rows) {
        var html = '';
        var bank = "", queryTime = "", stationaryManName="";
        for (var i = 0; i < rows.length; i++) {
        	bank = rows[i]["loanBank"];
        	queryTime = rows[i]["creditQueryTimeStr"];
        	stationaryManName =  rows[i]["stationaryManName"];
        	break;
        }
        html += '<div class="ibox-content"><form class="form-horizontal"><div class="form-group">';
        html += '<label class="col-md-1 control-label">贷款银行</label>';
        html += '<div class="col-md-3"><input type="text" value="'+bank+'" readonly="readonly" class="form-control"></div>';
        html += '<label class="col-md-1 control-label">征信查询时间</label>';
        html += '<div class="col-md-2"><input type="text" value="' + queryTime +'" readonly="readonly" class="form-control"></div>';
        html += '<label class="col-md-1 control-label">征信查询人</label>';
        html += '<div class="col-md-2"><input type="text" value="' + stationaryManName +'" readonly="readonly" class="form-control"></div>';
        html += '</div></form></div>';
        
        html += '<table class="table no-margin table-striped table-bordered">';
        html += '<thead><tr>';
        html += '<th style="width:6%;">姓名</th>';
        html += '<th style="width:6%;">类型</th>';
        /*
        html += '<th style="width:6%;">信用类型</th>';
        html += '<th style="width:6%;">信用状态</th>';
        html += '<th style="width:6%;">结清状态</th>';
        html += '<th style="width:6%;">累计逾期</th>';
        html += '<th style="width:6%;">最高逾期</th>';
        html += '<th style="width:8%;">当前逾期</th>';
        html += '<th style="width:10%;">起始日期</th>';
        html += '<th style="width:10%;">截止日期</th>';*/
        html += '<th style="width:88%;">征信备注</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        
        if (null == rows || rows.length <= 0) {
            html += '<tr><td class="col-td" colspan="3">暂无征信信息</td></tr>';
        } else {
            for (var i = 0; i < rows.length; i++) {
            	html += '<tr>';
            	html += '<td class="cel">' + rows[i]["realName"] + '</td>';
            	if (rows[i]['userType'] == "BUYER") {
                    html += '<td class="cel"><i class="fa fa-user"></i>&nbsp;购车人</td>';
                } else if (rows[i]['userType'] == "SHARED") {
                    html += '<td class="cel"><i class="fa fa-user-md"></i>&nbsp;配偶</td>';
                } else if (rows[i]['userType'] == "SPONSOR") {
                    html += '<td class="cel">担保人</td>';
                }
               /* html += '<td class="cel">' + ("" != $.trim(rows[i]["creditTypeCode"]) ? rows[i]["creditTypeCode"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["creditStatusCode"]) ? rows[i]["creditStatusCode"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["closeTypeCode"]) ? rows[i]["closeTypeCode"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["addOverdue"]) ? rows[i]["addOverdue"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["highestOverdue"]) ? rows[i]["highestOverdue"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["currentOverdue"]) ? rows[i]["currentOverdue"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["overdueBeginDateStr"]) ? rows[i]["overdueBeginDateStr"] : "--") + '</td>';
                html += '<td class="cel">' + ("" != $.trim(rows[i]["overdueEndDateStr"]) ? rows[i]["overdueEndDateStr"] : "--") + '</td>';*/
                html += '<td class="cel desc" title="' + rows[i]["creditRecord"] + '">' + rows[i]["creditRecord"] + '</td>';
                html += '</tr>';
            }
            html += '</tbody></table>';
        }
        return html;
    }

    //创建历史订单展示表格
    function createHistoryOrderHtml(rows) {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr><th style="width:10%;">客户类型</th>' +
            '<th style="width:15%;">姓名</th>' +
            '<th style="width:15%;">身份证号码</th>' +
            '<th style="width:10%;">订单状态</th>' +
            '<th style="width:10%;">录入日期</th>' +
            '<th style="width:25%;">原因</th>' +
            '<th style="width:15%;">操作</th></tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td" colspan="7">暂无历史订单信息</td>';
        } else {
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td class="cel">' + rows[i]["userType"] + '</td>' +
                    '<td class="cel">' + rows[i]["realName"] + '</td>' +
                    '<td class="cel" title="' + rows[i]["cardNo"] + '">' + rows[i]["cardNo"] + '</td>' +
                    '<td class="cel" title="' + rows[i]["orderStatusName"] + '">' + rows[i]["orderStatusName"] + '</td>' +
                    '<td class="cel">' + rows[i]["ctimeStr"] + '</td><td class="cel">' + rows[i]["skipCreditValidationReason"] + '</td>' +
                    '<td>' +
                    '<a value="' + rows[i]["businessOrderAcceptId"] + '" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>订单(' + rows[i]["orderNo"] + ')</a></td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }
    //创建视频面签展示表格
    function createVideoOrderHtml(rows) {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr><th style="width:10%;">业务类型</th>' +
            '<th style="width:10%;">贷款银行</th>' +
            '<th style="width:10%;">面签开始时间</th>' +
            '<th style="width:10%;">完成面签时间</th>' +
            '<th style="width:25%;">备注</th>' +
            '<th style="width:10%;">面签状态</th>' +
            '<th style="width:15%;">操作</th></tr></thead>';
        html += '<tbody>';
        if (null == rows) {
            html += '<td class="col-td" colspan="7">暂无历史订单信息</td>';
        } else {
            html += '<tr><td class="cel">' + rows["type"] +'<input type="hidden" value="'+rows['id']+'" id="view_id"> '+'</td>' +
                '<td class="cel">' + rows["loanBank"] + '</td>' +
                '<td class="cel" title="' + rows["videoStartTimeStr"] + '">' + rows["ctimeStr"] + '</td>' +
                '<td class="cel" title="' + rows["finishTimeStr"] + '">' + rows["finishTimeStr"] + '</td>' +

                '<td class="cel"title="' + rows["remark"] + '">' + rows["remark"] + '</td>' +
                '<td class="cel" title="' + rows["statusStr"] + '">' + rows["statusStr"] + '</td>' +
                '<td>' +
                    '<a class="btn btn-info btn-xs detail"><i class="fa fa-search-plus">查看视频</i></a>'+
                    '<button class="btn btn-primary btn-xs detail-view" style="margin-left:5px;" id="viewInterviewQuestion"><i class="fa fa-search-plus">查看问题</i></button></td></tr>';
            if(null != rows["videoDownLoadUrl"] && "" != rows["videoDownLoadUrl"]){
                $("#video_url").val(rows["videoDownLoadUrl"])
            }
        }

        html += '</tbody></table>';
        return html;
    }



    //无数据tip框
    function createFiledSetNoDataTip(title, tip) {
        var html = '<fieldset>' +
            '<legend>' + title + '</legend>' +
            '<div class="text-center">' + tip + '</div>' +
            '</fieldset>';
        return html;
    }

    /**
     * 创建上传附件预览组件
     * @param rows        记录
     * @param isCheck    是否展示复选框
     * @returns
     */
    function createFileItemHtml(item, isCheck) {
        var itemHtml = '';
        var staticUrl = $("#staticUrl").val();
        for (var i = 0; i < item.length; i++) {
            var fileName = item[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart, fileName.length).toUpperCase();

            itemHtml += '<div class="col-sm-2"><div class="file text-center mr-none">';

            //是否展示复选框
            if (isCheck) {
                itemHtml += '<input type="checkbox" class="checkOne" name="fileList_input" value="' + item[i]["id"] + '">';
            }
            if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
                itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
            } else {
                itemHtml += '<img class="pre-img" src="' + staticUrl + item[i]["fileGroup"] + '/' + item[i]["filePath"] + '" alt="">';
            }
            itemHtml += '<div class="file-name">' +  item[i]["fileChildTypeStr"]+item[i]["fileName"] + '</div>';
            itemHtml += '</div></div>';
        }
        return itemHtml;
    }

    //设置配置对象只读属性
    function setConfigTagReadOnly(item) {
        if (item["xtype"] == "text" || item["xtype"] == "textarea") {
            item['readonly'] = true;
            item['fTip'] = false;
            item['checked'] = false;
            item['required'] = false;
            item['checkObj'] = null;
        } else if (item["xtype"] == "select") {
            item['checked'] = false;
            item['required'] = false;
            item['checkObj'] = null;
            item['disabled'] = "disabled";
        } else if (item["xtype"] == "area") {
            item['xtype'] = 'text';
            item['dReadonly'] = true;
            item['readonly'] = true;
            item['required'] = false;
            item['checkObj'] = null;
            item['checked'] = null;
            item['disabled'] = "disabled";
        } else if (item["xtype"] == "date") {
            item['xtype'] = 'text';
            item['required'] = false;
            item['checkObj'] = null;
            item['checked'] = null;
            item['readonly'] = true;
        }
    }

    //隐藏配置对象隐藏按钮
    function hideConfigTagButton(item) {
        if (item["xtype"] == "button" || item["xtype"] == "buttons") {
            item['xtype'] = 'hidden';
        }
    }

    //费用明细(支出)
    function createFinancialIncomHtml() {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr>' +
            '<th style="width:8%;"></th>' +
            '<th class="type-2" style="width:10%;">上牌押金(元)</th>' +
            '<th class="type-1" style="width:10%;">履约保证金(元)</th>' +
            '<th class="type-4" style="width:10%;">渠道保证金(元)</th>' +
            '<th class="type-7" style="width:10%;">公证费(元)</th>' +
            '<th class="type-8" style="width:10%;">评估费(元)</th>' +
            '<th class="type-9" style="width:10%;">抵押费(元)</th>' +
            '<th class="type-10" style="width:10%;">GPS费用(元)</th>' +
            '<th  style="width:10%;">合计(元)</th>' +
            '</tr></thead>';
        html += '<tbody class="table-content">';
        html += '<tr time-id="1"><td>实付</td><td class="type-2" ><input class="form-control" id="licensePlateEnsureMoney" name="actualMoney" type="text"/></td>' +
            '<td class="type-1"><input class="form-control" id="agreeEnsureMoney" name="actualMoney" type="text"/></td>' +
            '<td class="type-4"><input class="form-control" id="channelEnsureMoney" name="actualMoney" type="text"/></td>' +
            '<td class="type-7"><input class="form-control" id="notarialFee" name="actualMoney" type="text"/></td>' +
            '<td class="type-8"><input class="form-control" id="valuationFee" name="actualMoney" type="text"/></td>' +
            '<td class="type-9"><input class="form-control" id="mortgageFee" name="actualMoney" type="text"/></td>' +
            '<td class="type-10"><input class="form-control" id="gpsFee" name="actualMoney" type="text"/></td>' +
            '<td><input class="form-control"  id="allMoney" readonly="true" type="text"/></td></tr>';
        html += '</tbody></table>';
        return html;
    }


    //费用明细(收入)
    function createFinancialContributionHtml() {
        var html = '<div style="margin-bottom: 5px;">';
        html += '<table class="table table-hover no-margin table-striped">';
        html += '<thead class="table-head"><tr>' +
            '<th style="width:8%;"></th>' +
            '<th style="width:10%;">应收</th>' +
            '<th style="width:10%;">实收</th>' +
            '<th style="width:10%;">收据编号</th>' +
            '<th style="width:10%;">收据日期</th>' +
            '</tr></thead>';
        html += '<tbody class="table-content-income">';
        html += '<tr time-id="1"><td>履约保证金(元)</td><td class="type" ><input class="form-control" id="agreeEnsureMoney" name="agreeEnsureMoney" type="text" /></td>' +
            '<td class="types-1"><input class="form-control" name="actualMoney" id="agreeEnsureMoney2" type="text" readonly="readonly" /></td>' +
            '<td class="type"><input class="form-control" name="agreeEnsureMoneyReceiptNo" type="text"/></td>' +
            '<td class="type"><input class="form-control" id="agreeEnsureMoneyReceiptDate" name="agreeEnsureMoneyReceiptDate" type="text"/></td></tr>';
        html += '<tr time-id="1"><td>渠道保证金(元)</td><td class="type" ><input class="form-control" id="channelEnsureMoney" name="channelEnsureMoney" type="text" /></td>' +
            '<td class="types-4"><input class="form-control" name="actualMoney" id="channelEnsureMoney2" type="text" readonly="readonly" /></td>' +
            '<td class="type"><input class="form-control" name="channelEnsureMoneyReceiptNo" type="text"/></td>' +
            '<td class="type"><input class="form-control" id="channelEnsureMoneyReceiptDate" name="channelEnsureMoneyReceiptDate" type="text"/></td></tr>';
        html += '<tr time-id="1"><td>按揭服务费(元)</td><td class="type" ><input class="form-control" id="serviceFee" name="serviceFee"   type="text"  /></td>' +
            '<td class="types-20" colspan="1"><input class="form-control input-slit"  name="actualMoney" id="serviceFee2" type="text" readonly="readonly" /></td></tr>';
        html += '<tr time-id="1"><td>按揭手续费(元)</td><td class="type" ><input class="form-control" id="poundage" name="poundage"  type="text"  /></td>' +
            '<td class="types-5" colspan="1"><input class="form-control input-slit"  name="actualMoney" id="poundage2" type="text" readonly="readonly" /></tr>';
        html += '<tr time-id="1"><td>上牌押金(元)</td><td class="type" ><input class="form-control" id="licensePlateEnsureMoney" name="licensePlateEnsureMoney"   type="text"  /></td>' +
            '<td class="types-2" colspan="1"><input class="form-control input-slit"  name="actualMoney" id="licensePlateEnsureMoney2" type="text" readonly="readonly" /></td>' +
            '</tr>';
        html += '<tr time-id="1"><td>合计</td><td class="type" ><input class="form-control" id="incomeAll" name="incomeAll"   type="text"  /></td>' +
            '<td class="types" colspan="1"><input class="form-control input-slit" name="allMoney2"  id="allMoney2" type="text" readonly="readonly" /></td></tr>';
        html += '<tr time-id="1"><td>到账确认日期</td><td class="type" ><input class="form-control" id="moneyArriveTime" name="moneyArriveTime"  type="text" readonly="readonly" /></td>' +
            '<td colspan="3"></td></tr>';
        html += '</tbody></table>';
        html += '</div>';
        html += '<div class="m-rl-tb row"><label class="col-sm-1 control-label">审核意见:</label>' +
            '<div class="col-sm-11"><textarea class="form-control" id="auditRemark" style="height:80px;"></textarea></div></div>'
        html += '<div class="m-rl-tb row"><label class="col-sm-1 control-label" style="margin-top: 8px;">审核人:</label>' +
            '<div class="col-sm-3"><input class="form-control" id="user" readonly="true" type="text"></div>' +
            '<label class="col-sm-1 control-label" style="margin-top: 8px;">审核日期:</label>' +
            '<div class="col-sm-3"><input class="form-control" id="date" readonly="true" type="text"></div></div>';
        return html;
    }

    //初始化营销费用界面
    function createMarketingExpensesHtml() {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr>' +
            '<th style="width:8%;"></th>' +
            '<th style="width:10%;">应收</th>' +
            '<th style="width:10%;">实收</th>' +
            '</tr></thead>';
        html += '<tbody>';
        html += '<tr data-id="1"><td>基础费用(元)</td><td><input class="form-control" name="shouldMoney" type="text"/></td>' +
            '<td sum-id="1"><input class="form-control" name="oneMoney" type="text"/></td>';
        html += '<tr data-id="1"><td>产品减少费用(元)</td>' +
            '<td><input class="form-control" name="shouldMoney" type="text"/></td>' +
            '<td sum-id="1"><input class="form-control" name="oneMoney" type="text"/></td>';
        html += '<tr data-id="1"><td>银行费用(元)</td>' +
            '<td><input class="form-control" name="shouldMoney" type="text"/></td>' +
            '<td sum-id="1"><input class="form-control" name="oneMoney" type="text"/></td>';
        html += '<tr data-id="1"><td>产品增加费用(元)</td>' +
            '<td><input class="form-control" name="shouldMoney" type="text"/></td>' +
            '<td sum-id="1"><input class="form-control" name="oneMoney" type="text"/></td>';
        html += '<tr data-id="1"><td>贷款额费用(元)</td>' +
            '<td><input class="form-control" name="shouldMoney" type="text"/></td>' +
            '<td sum-id="1"><input class="form-control" name="oneMoney" type="text"/></td>';
        html += '<tr data-id="1"><td>费用合计(元)</td>' +
            '<td><input class="form-control" name="shouldMoney" type="text"/></td>' +
            '<td sum-id="1"></td>';
        html += '</tbody></table>';
        return html;
    }

    //初始化财务收支
    function createFinancialPaymentsHtml(data) {
        var html = '';
        html += '<table class="table table-hover table-striped no-margin">';
        html += '<thead><tr>' +
            '<th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>' +
            '<th style="width:2%;">序号</th>' +
            '<th style="width:10%;">入账日期</th>' +
            '<th style="width:12%;">费用项目</th>' +
            '<th style="width:8%;">收入/支出</th>' +
            '<th style="width:8%;">金额(元)</th>' +
            '<th style="width:12%;">备注</th>' +
            '<th style="width:10%;">录入日期</th>' +
            '<th style="width:8%;">录入人</th>';
        if (null != data || data.rows.length > 0) {
            html += '<th style="width:10%;">操作</th>';
        } else {
            html += '</tr></thead>';
        }
        html += '<tbody>';
        if (null == data || data.rows.length <= 0) {
            html += '<td class="col-td" colspan=10"' + '">暂无财务收支信息</td>';
        } else {
            for (var i = 0; i < data.rows.length; i++) {
                var auditStatusStr = "";
                var incomeExpensesType = "";
                if (data["rows"][i]['payMoneyType'] == 1) {
                    auditStatusStr = "保证金"
                } else if (data["rows"][i]['payMoneyType'] == 2) {
                    auditStatusStr = "上牌押金"
                } else if (data["rows"][i]['payMoneyType'] == 3) {
                    auditStatusStr = "按揭服务费-高息部分"
                } else if (data["rows"][i]['payMoneyType'] == 4) {
                    auditStatusStr = "渠道保证金"
                } else if (data["rows"][i]['payMoneyType'] == 5) {
                    auditStatusStr = "按揭手续费"
                } else if (data["rows"][i]['payMoneyType'] == 6) {
                    auditStatusStr = "按揭服务费-现金部分"
                } else if (data["rows"][i]['payMoneyType'] == 7) {
                    auditStatusStr = "公证费"
                } else if (data["rows"][i]['payMoneyType'] == 8) {
                    auditStatusStr = "评估费"
                } else if (data["rows"][i]['payMoneyType'] == 9) {
                    auditStatusStr = "抵押费"
                } else if (data["rows"][i]['payMoneyType'] == 10) {
                    auditStatusStr = "GPS费用"
                } else if (data["rows"][i]['payMoneyType'] == 15) {
                    auditStatusStr = "营销费用-基础费用"
                } else if (data["rows"][i]['payMoneyType'] == 16) {
                    auditStatusStr = "营销费用-产品减少费用"
                } else if (data["rows"][i]['payMoneyType'] == 17) {
                    auditStatusStr = "营销费用-银行费用"
                } else if (data["rows"][i]['payMoneyType'] == 18) {
                    auditStatusStr = "营销费用-产品增加费用"
                } else if (data["rows"][i]['payMoneyType'] == 19) {
                    auditStatusStr = "营销费用-贷款额费用"
                } else if (data["rows"][i]['payMoneyType'] == 20) {
                    auditStatusStr = "按揭服务费"
                }
                if (data["rows"][i]['incomeExpensesType'] == 1) {
                    incomeExpensesType = "收入"
                } else if (data["rows"][i]['incomeExpensesType'] == 2) {
                    incomeExpensesType = "支出"
                }
                var time = "";
                if (data["rows"][i]['confirmAccountTime'] != null) {
                    time = data["rows"][i]['confirmAccountDate'];

                }

                html += '<tr><td class="cel"><input type="checkbox" class="checkOne" name="checkedOne" value="' + data["rows"][i]['id'] + '"></td>' +
                    '<td class="cel">' + (i + 1) + '</td>' +
                    '<td class="cel">' + time + '</td>' +
                    '<td class="cel">' + auditStatusStr + '</td>' +
                    '<td class="cel">' + incomeExpensesType + '</td>' +
                    '<td class="cel">' + data["rows"][i]['actualMoney'] + '</td>' +
                    '<td class="cel">' + data["rows"][i]['remark'] + '</td>' +
                    '<td class="cel">' + data["rows"][i]['updateTime'] + '</td>' +
                    '<td class="cel">' + data["rows"][i]['creater'] + '</td>';
                if (null != data || data.rows.length > 0) {
                    html += '<td class="cel"><a class="btn btn-primary btn-xs edit-btn" data-id="' + data["rows"][i]['id'] + '"><i class="fa fa-edit"></i>编辑</a>';
                    html += '<a class="btn btn-info btn-xs income-detail" data-id="' + data["rows"][i]['id'] + '"><i class="fa fa-search-plus"></i>查看</a></td>';
                    
                }
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    //放贷信息按钮操作日志
    function createFinanceOperationLogHtml(rows) {
        var html = '';
        html += '<table class="table table-hover table-striped no-margin">';
        html += '<thead><tr>' +
            '<th style="width:2%;">序号</th>' +
            '<th style="width:10%;">操作事件</th>' +
            '<th style="width:8%;">备注</th>' +
            '<th style="width:12%;">操作人</th>' +
            '<th style="width:8%;">更新时间</th>' +
            '</tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td" colspan="7">暂无日志信息</td>';
        } else {
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td class="cel">' + (i + 1) + '</td>' +
                    '<td class="cel">' + rows[i]["buttonTypeName"] + '</td>' +
                    '<td class="cel">' + rows[i]["businessValue"] + '</td>' +
                    '<td class="cel">' + rows[i]["userName"] + '</td>' +
                    '<td class="cel">' + rows[i]["operatorTime"] + '</td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    //放贷信息按钮操作日志
    function createOperationLogHtml(rows) {
        var html = '';
        html += '<table class="table table-hover table-striped no-margin">';
        html += '<thead><tr>' +
            '<th style="width:2%;">序号</th>' +
            '<th style="width:10%;">操作事件</th>' +
            '<th style="width:12%;">操作人</th>' +
            '<th style="width:8%;">操作人所在部门</th>' +
            '<th style="width:8%;">更新时间</th>' +
            '</tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td" colspan="5">暂无日志信息</td>';
        } else {
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td class="cel">' + (i + 1) + '</td>' +
                    '<td class="cel">' + rows[i]["buttonTypeName"] + '</td>' +
                    '<td class="cel">' + rows[i]["userName"] + '</td>' +
                    '<td class="cel">' + rows[i]["departName"] + '</td>' +
                    '<td class="cel">' + rows[i]["operatorTime"] + '</td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    //放贷信息操作日志
    function createOperationCtrlLogHtml(rows) {
        var html = '';
        html += '<div>';
        html += '<table class="table table-hover table-striped no-margin">';
        html += '<thead><tr>' +
            '<th style="width:2%;">序号</th>' +
            '<th style="width:8%;">金额(元)</th>' +
            '<th style="width:10%;">操作事件</th>' +
            '<th style="width:12%;">操作人</th>' +
            '<th style="width:8%;">更新时间</th>' +
            '</tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td" colspan="5">暂无日志信息</td>';
        } else {
            var a = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]["buttonType"] == 2 || rows[i]["buttonType"] == 12) {
                    a = a + 1;
                    var amount = rows[i]["businessValue"];
                    if ("" != amount) {
                        amount = NumberFormatUtil.fmoney(amount, 2);
                    }
                    html += '<tr><td class="cel">' + (a) + '</td><td class="cel">' + amount + '</td>' +
                        '<td class="cel">' + rows[i]["buttonTypeName"] + '</td>' +
                        '<td class="cel">' + rows[i]["userName"] + '</td>' +
                        '<td class="cel">' + rows[i]["operatorTime"] + '</td></tr>';
                }
            }
        }
        html += '</tbody></table>';
        html += '</div>';
        return html;
    }

    //创建订单流程图片
    function createOrderProcessPic(rows) {
        var html = "";
        var isDone = false;
        if (null != rows && rows.length > 0) {
            var nodeStyle = "done";
            for (var i = 0; i < rows.length; i++) {
                if (isDone) {
                    nodeStyle = "wait";
                } else {
                    nodeStyle = "done";
                }
                if (rows[i]["isCurrent"] == 1) {
                    isDone = true;
                    nodeStyle = "ready";
                }
                var time = "";
                if (typeof(rows[i]["time"]) != "undefined") {
                    time = rows[i]["time"];
                    time = time.replace(" ", "<br>");
                }
                var name = rows[i]["name"];
                html += '<div class="node ' + nodeStyle + '"><i class="node-icon icon-' + name + '"></i><ul>' +
                    '<li class="txt1"></li>' +
                    '<li class="txt2">' + rows[i]["desc"] + '</li>' +
                    '<li id="track_time_0" class="txt3"> ' + time + '</li></ul></div>';
                if ((i + 1) < rows.length) {
                    html += '<div class="proce ' + nodeStyle + '"><ul>' +
                        '<li class="txt1">' + (nodeStyle == "ready" ? "处理中" : "") + '</li></ul></div>';
                }
            }
        }
        return html;
    }

    //创建订单状态表格
    function createOrderStatusGrid(data, orderStatus) {
        var html = '';
        html += '<table class="table table-hover table-striped no-margin">';
        
        html += '<tr class="title">';
        html += '<td style="width:7.14%;">征信提交</td>';
        html += '<td style="width:7.14%;">征信查询</td>';
        html += '<td style="width:7.14%;">初审提交</td>';
        
        html += '<td style="width:7.14%;">自动审批</td>';
        html += '<td style="width:7.14%;">申请通融</td>';
        
		html += '<td style="width:7.14%;">终审提交</td>';
		html += '<td style="width:7.14%;">终审预通过</td>';
		html += '<td style="width:7.14%;">视频齐全</td>';
		html += '<td style="width:7.14%;">终审审核</td>';
		
		html += '<td style="width:7.14%;">垫付申请提交</td>';
		html += '<td style="width:7.14%;">垫付申请初审</td>';
		html += '<td style="width:7.14%;">垫付申请终审</td>';
		html += '<td style="width:7.14%;">本金打款</td>';
		html += '<td style="width:7.14%;">银行放贷</td>';
		
		html += '</tr>';

		html += '<tr>';
        html += '<td class="cel">' + (orderStatus != null ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 1 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 3 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        if(data["autoAudit"] == ""){
        	html += '<td class="cel">否</td>';
        }else if(data["autoAudit"] == 1){
        	html += '<td class="cel"><code class="alert-success">接受</code></td>';
        }else if(data["autoAudit"] == 2){
        	html += '<td class="cel"><code class="alert-warning">拒绝</code></td>';
        }else if(data["autoAudit"] == 3){
        	html += '<td class="cel"><code class="alert-info">复议</code></td>';
        }else if(data["autoAudit"] == 4){
        	html += '<td class="cel"><code class="alert-default">无结果</code></td>';
        }else {
        	html += '<td class="cel">否</td>';
        }
        if(data["isSpecial"] == 1){
        	html += '<td class="cel"><code class="alert-success">已做</code></td>';
        }else{
        	html += '<td class="cel">否</td>';
        }
        //html += '<td class="cel">' + (data["isSpecial"] == "" ? "否" : "<code class='alert-success'>是</code>") + '</td>';
        
        html += '<td class="cel">' + (orderStatus >= 4 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 7 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (data["videoFile"]== "通过" ? "<code class='alert-success'>是</code>" : (data["videoFile"]=="" ? "否" : data["videoFile"])) + '</td>';
        html += '<td class="cel">' + (orderStatus >= 12 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        
        html += '<td class="cel">' + (orderStatus >= 16 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 18 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 19 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 20 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 28 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '</tr>';
        
        html += '<tr class="title">';
		
		html += '<td style="width:7.14%;">二次打款垫付申请</td>';
		html += '<td style="width:7.14%;">二次打款</td>';
		
        html += '<td style="width:7.14%;">面签资料</td>';
        html += '<td style="width:7.14%;">候补资料</td>';
        
        html += '<td style="width:7.14%;">抵押登记</td>';
        html += '<td style="width:7.14%;">提车资料</td>';
        
        html += '<td style="width:7.14%;">公证送交</td>';
        html += '<td style="width:7.14%;">合同收到</td>';
        html += '<td style="width:7.14%;">合同齐全</td>';
        
        html += '<td style="width:7.14%;">送交银行</td>';
        html += '<td style="width:7.14%;">银行退单</td>';
        
        html += '<td style="width:7.14%;">作废</td>';
        html += '<td style="width:7.14%;">已结清</td>';
        html += '<td style="width:7.14%;"></td>';
        html += '</tr>';
        html += '<tr>';
        
        html += '<td class="cel">' + (orderStatus >= 35 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus >= 38 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        
        html += '<td class="cel">' + (data["isInterview"] == 0 ? "否" : "<code class='alert-success'>是</code>") + '</td>';
        html += '<td class="cel">' + (data["isWait"] == "否" ? data["isWait"] : "<code class='alert-success'>" + data["isWait"] + "</code>") + '</td>';
        
        html += '<td class="cel">' + (data["isMortgage"] == "默认" ? '否' : "<code class='alert-success'>" + data["isMortgage"]+ "</code>") + '</td>';
        html += '<td class="cel">' + (data["isSupplyCar"] == "默认" ? '否' : "<code class='alert-success'>" +  data["isSupplyCar"]+ "</code>") + '</td>';
        
        html += '<td class="cel">' + (data["isSendFair"] == 1 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (data["isGetContract"] == 1 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (data["isAllContract"] == 1 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        
        html += '<td class="cel">' + (data["isSendBank"] == 1 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (data["isBankBack"] == 1 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        
        html += '<td class="cel">' + (orderStatus == -3 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel">' + (orderStatus == 50 ? "<code class='alert-success'>是</code>" : "否") + '</td>';
        html += '<td class="cel"></td>';
        html += '</tr>';
        html += '</table>';
        return html;
    }

    //获取出险情况
    function createInsurcaceClaimHtml(data) {
        var html = '';
        html += '<table class="table table-hover table-striped no-margin">';
        html += '<thead><tr>' +
            '<th style="width:2%;"><input type="checkbox" class="checkAll"></th>' +
            '<th style="width:5%;">序号</th>' +
            '<th style="width:8%;">客户名称</th>' +
            '<th style="width:8%;">车牌号</th>' +
            '<th style="width:8%;">临牌号</th>' +
            '<th style="width:8%;">汇款账号</th>' +
            '<th style="width:12%;">保险公司</th>' +
            '<th style="width:10%;">出险日期</th>' +
            '<th style="width:8%;">备注</th>' +
            '<th style="width:8%;">录入人</th>' +
            '<th style="width:8%;">录入日期</th>' +
            '<th style="width:8%;">操作</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="' + ("12") + '">暂无理赔信息</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<tr><td><input type="checkbox" name="claimCheckbox" class="checkOne" value="' + data[i]['id'] + '"></td>' +
                    '<td class="cel">' + (i + 1) + '</td>' +
                    '<td class="cel">' + data[i]['realName'] + '</td>' +
                    '<td class="cel">' + data[i]['plateNumber'] + '</td>' +
                    '<td class="cel">' + data[i]['tempPlateNumber'] + '</td>' +
                    '<td class="cel">' + data[i]['accountNumber'] + '</td>' +
                    '<td class="cel">' + data[i]['cfInsuranceCompany'] + '</td>' +
                    '<td class="cel">' + data[i]['insuranceDateString'] + '</td>' +
                    '<td class="cel">' + data[i]['remark'] + '</td>' +
                    '<td class="cel">' + data[i]['inputer'] + '</td>' +
                    '<td class="cel">' + data[i]['ctimeString'] + '</td>' +
                    '<td class="btn-cel">'+
                    '<a class="btn btn-success btn-xs editInsuranceClaim m-r-xs" data-id="' + data[i]['id'] + '" id="editInsuranceClaim' + data[i]['id'] + '">' + '<i class="fa fa-edit"></i>编辑</a>' +
                    '<a class="btn btn-success btn-xs edit-btn detailInsuranceClaim" data-id="' + data[i]['id'] + '"><i class="fa fa-search-plus"></i>查看</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    /**
     * 创建大数据征信查询表格
     * @param rows
     * @returns
     */
    function createBigDataCreditHtml(rows) {
        var html = '<table class="table table-hover no-margin table-striped">';
        html += '<thead><tr><th style="width:13%;">人员类型</th>' +
            '<th style="width:13%;">姓名</th>' +
            '<th style="width:10%;">风险分</th>' +
            '<th style="width:10%;">风险结果</th>' +
            '<th style="width:10%;">手机在网时长</th>' +
            '<th style="width:10%;">手机实名</th>' +
            '<th style="width:8%;">黑名单</th>' +
            '<th style="width:13%;">查询时间</th></tr></thead>';
        html += '<tbody>';
        for (var i = 0; i < rows.length; i++) {
            var policyType = "--";
            if (null != rows[i]["decision"] && "" != rows[i]["decision"] && rows[i]["decision"].indexOf("通过") > 0) {
                policyType = '<code class="alert-success">' + rows[i]["decision"] + '</code>';
            } else if (null != rows[i]["decision"] && "" != rows[i]["decision"] && rows[i]["decision"].indexOf("拒绝") > 0) {
                policyType = '<code class="alert-danger">' + rows[i]["decision"] + '</code>';
            } else if (null != rows[i]["decision"] && "" != rows[i]["decision"] && rows[i]["decision"].indexOf("审核") > 0) {
                policyType = '<code class="alert-info">' + rows[i]["decision"] + '</code>';
            }
            var black = "--";
            if (null != rows[i]["isBlack"] && rows[i]["isBlack"] > 0) {
                black = '<code class="alert-danger">是</code>';
            } else if (null != rows[i]["isBlack"] && rows[i]["isBlack"] == 0) {
                black = '<code class="alert-success">否</code>';
            }
            html += '<tr><td class="cel">' + rows[i]["userType"] + '</td>' +
                '<td class="cel">' + rows[i]["realName"] + '</td>' +
                '<td class="cel">' + (null != rows[i]["score"] ? rows[i]["score"] : "--") + '</td>' +
                '<td class="cel">' + policyType + '</td>' +
                '<td class="cel">' + (null != rows[i]["mobileOnlineTime"] && "" != rows[i]["mobileOnlineTime"] ? rows[i]["mobileOnlineTime"] : "--") + '</td>' +
                '<td class="cel">校验' + (null != rows[i]["mobileCertification"] && "" != rows[i]["mobileCertification"] ? rows[i]["mobileCertification"] : "--") + '</td>' +
                '<td class="cel">' + black + '</td>' +
                '<td class="cel">' + (null != rows[i]["ctimeStr"] && "" != rows[i]["ctimeStr"] ? rows[i]["ctimeStr"] : "--") + '</td></tr>';
        }
        html += '</tbody></table>';
        return html;
    }
    
    
    function createAutoAuditCreditHtml(rows){
    	var html = '<table class="table table-hover no-margin table-striped">';
        html += '<tr><td style="width:13%;">人员类型</td>' +
            '<td style="width:13%;">姓名</td>' +
            '<td colspan="4" style="width:40%;">风险评估</td>' +
            '<td style="width:10%;">手机在网时长</td>' +
            '<td style="width:10%;">手机实名</td>' +
            '<td style="width:8%;">黑名单</td>' +
            '</tr>';
        html += '';
        for (var i = 0; i < rows.length; i++) {
        	var policyType = "--";
        	var scoreType = "--";
        	var ruleType = "--";
            if (null != rows[i]["finalDecision"] && "" != rows[i]["finalDecision"] && rows[i]["finalDecision"].indexOf("通过") > 0) {
                policyType = '<code class="alert-success">' + rows[i]["finalDecision"] + '</code>';
            } else if (null != rows[i]["finalDecision"] && "" != rows[i]["finalDecision"] && rows[i]["finalDecision"].indexOf("拒绝") > 0) {
                policyType = '<code class="alert-danger">' + rows[i]["finalDecision"] + '</code>';
            } else if (null != rows[i]["finalDecision"] && "" != rows[i]["finalDecision"] && rows[i]["finalDecision"].indexOf("审核") > 0) {
                policyType = '<code class="alert-info">' + rows[i]["finalDecision"] + '</code>';
            }
            
            
            if (null != rows[i]["ruleResult"] && "" != rows[i]["ruleResult"] && rows[i]["ruleResult"].indexOf("通过") > 0) {
            	ruleType = '<code class="alert-success">' + rows[i]["ruleResult"] + '</code>';
            } else if (null != rows[i]["ruleResult"] && "" != rows[i]["ruleResult"] && rows[i]["ruleResult"].indexOf("拒绝") > 0) {
            	ruleType = '<code class="alert-danger">' + rows[i]["ruleResult"] + '</code>';
            } else if (null != rows[i]["ruleResult"] && "" != rows[i]["ruleResult"] && rows[i]["ruleResult"].indexOf("审核") > 0) {
            	ruleType = '<code class="alert-info">' + rows[i]["ruleResult"] + '</code>';
            }
            
            if (null != rows[i]["riskDecision"] && "" != rows[i]["riskDecision"] && rows[i]["riskDecision"].indexOf("通过") > 0) {
            	scoreType = '<code class="alert-success">' + rows[i]["riskDecision"] + '</code>';
            } else if (null != rows[i]["riskDecision"] && "" != rows[i]["riskDecision"] && rows[i]["riskDecision"].indexOf("拒绝") > 0) {
            	scoreType = '<code class="alert-danger">' + rows[i]["riskDecision"] + '</code>';
            } else if (null != rows[i]["riskDecision"] && "" != rows[i]["riskDecision"] && rows[i]["riskDecision"].indexOf("审核") > 0) {
            	scoreType = '<code class="alert-info">' + rows[i]["riskDecision"] + '</code>';
            }
            
            var black = "--";
            if (null != rows[i]["isBlack"] && rows[i]["isBlack"] > 0) {
                black = '<code class="alert-danger">已命中</code>';
                if(rows[i]["breakLaw"] == "是"){
                	black += '<br/><code class="alert-info">违法</code>';
                }
                if(rows[i]["escapeing"] == "是"){
                	black += '&nbsp;&nbsp;&nbsp;&nbsp;<code class="alert-info">在逃</code>';
                }
                if(rows[i]["relateDrug"] == "是"){
                	black += '<br/><code class="alert-info">涉毒</code>';
                }
                if(rows[i]["takeDrug"] == "是"){
                	black += '&nbsp;&nbsp;&nbsp;&nbsp;<code class="alert-info">吸毒</code>';
                }
                if(null != rows[i]["caseCode"] && "" !== rows[i]["caseCode"]){
                	var title = '涉案(名称：'+rows[i]["caseName"]+',代码：'+rows[i]["caseCode"]+'';
              		black += '<br/><code class="alert-info" title="'+title+'">涉案（名称：'+rows[i]["caseName"]+',<br/>代码：'+rows[i]["caseCode"]+'）</code>';
              }
            } else if (null != rows[i]["isBlack"] && rows[i]["isBlack"] == 0) {
                black = '<code class="alert-success">否</code>';
            }
            
            html += '<tr>';
            html += '<td rowspan="3">' + rows[i]["userType"] + '</td>';
            html += '<td rowspan="3" class="cel">' + rows[i]["customerName"] + '</td>' ;
            html += '<td colspan="2">强拒规则</td>';
            html += '<td colspan="2">信用结果</td>';
            html += '<td rowspan="3">' + (null != rows[i]["phoneOnlineTime"] && "" != rows[i]["phoneOnlineTime"] ? rows[i]["phoneOnlineTime"] : "--") + '</td>';
            html += '<td rowspan="3">' + (null != rows[i]["phoneThreeElements"] && "" != rows[i]["phoneThreeElements"] ? "校验"+rows[i]["phoneThreeElements"] : "--") + '</td>';
            html += '<td rowspan="3">' + black + '</td>';
            html += '</tr>';
            
            html += '<tr>';
            html += '<td class="cel">评分</td>';
            html += '<td class="cel">审批结果</td>';
            
            html += '<td class="cel">评分</td>';
            html += '<td class="cel">审批结果</td>';
  
            html += '</tr>';
            
            html += '<tr>';
            html += '<td class="cel"><code class="alert-info">' + (null != rows[i]["ruleScore"] && "" != null != rows[i]["ruleScore"] ? rows[i]["ruleScore"] : "--") + '</code></td>'  ;
            html += '<td class="cel">' + ruleType + '</td>'  ;
            html += '<td class="cel"><code class="alert-info">' + (null != rows[i]["riskScore"] && "" != null != rows[i]["riskScore"] ? rows[i]["riskScore"] : "--") + '</code></td>'  ;
            html += '<td class="cel">' + scoreType + '</td>'  ;
            html += '</tr>';
        }
        html += '</table>';
        return html;
    }
    
    /**
     * 催缴概况表格
     * @param data
     * @returns
     */
    function createOverdueDescHtml(data) {
        var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>' ;

        html += '<th style="width:5%;">序号</th>' ;
        html += '<th style="width:8%;">累计违约次数</th>';
        html += '<th style="width:8%;">银行逾期额(元)</th>';
        
        html += '<th style="width:8%;">逾期总额(元)</th>';
        
        html += '<th style="width:8%;">催缴次数</th>';
        html += '<th style="width:8%;">催缴状态</th>';

        html += '<th style="width:8%;">代偿金额</th>';
        html += '<th style="width:8%;">应还金额</th>';
        html += '<th style="width:8%;">拖车时间</th>';
        html += '<th style="width:8%;">停放位置</th>';
        html += '<th style="width:8%;">拖车状态</th>';
        html += '<th style="width:8%;">拖车备注</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="13">暂无逾期记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td class="cel">' + (i + 1) + '</td>';
                html += '<td class="cel">' +(null !=  data[i]['totalNum'] ? data[i]['totalNum'] : "--")  + '</td>' ;
                html += '<td class="cel">' +( null !=  data[i]['currentOverdueMoney'] ?  NumberFormatUtil.fmoney(data[i]['currentOverdueMoney'], 2) : "--") + '</td>';
                html += '<td class="cel">' +( null !=  data[i]['totalOverdueMoney'] ?  NumberFormatUtil.fmoney(data[i]['totalOverdueMoney'], 2) : "--") + '</td>';
                html += '<td class="cel">' + (null !=  data[i]['countUrge'] ? data[i]['countUrge'] : "--") + '</td>';
                html += '<td class="cel">' + (null != data[i]['urgeStatusName'] && "" != data[i]['urgeStatusName'] ? data[i]['urgeStatusName'] : "--") + '</td>';
                html += '<td class="cel">' + (null != data[i]['lawMoney'] ? data[i]['lawMoney'] : "--") + '</td>';
                html += '<td class="cel">' + NumberFormatUtil.fmoney(data[i]['shouldRepay'], 2) + '</td>';
                html += '<td class="cel">' + (null != data[i]['trailSuccessDateStr'] ? data[i]['trailSuccessDateStr'] : "--") + '</td>';
                html += '<td class="cel">' + (null != data[i]['carStopPlace'] ? data[i]['carStopPlace'] : "--") + '</td>';
                html += '<td class="cel">' + (null != data[i]['trailCarStatusStr'] ? data[i]['trailCarStatusStr'] : "--") + '</td>';
                html += '<td class="cel">' + (null != data[i]['trailCarDispatchBak'] ? data[i]['trailCarDispatchBak'] : "--") + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }
    
    /**
     * 逾期记录
     * @param data
     * @returns
     */
    function createOverdueListHtml(data) {
        var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>';
        html += '<th style="width:2%;"><input type="checkbox" class="checkAll"></th>';
        html += '<th style="width:3%;">序号</th>' ;
        html += '<th style="width:10%;">逾期月份</th>';
        html += '<th style="width:20%;">银行逾期额(元)</th>';
        html += '<th style="width:60%;">备注</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="5">暂无逾期记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td><input type="checkbox" name="checkbox" class="checkOne" value="' + data[i]['id'] + '"></td>';
                html += '<td class="cel">' + (i + 1) + '</td>';
                html += '<td class="cel" id="' + data[i]['id'] + '_overdue_year_month" data="'+data[i]['overdueYear'] + (data[i]['overdueMonth'] >= 10 ? data[i]['overdueMonth'] : "0"+data[i]['overdueMonth'])+'">' + data[i]['overdueYear'] +"年"+ (data[i]['overdueMonth'] >= 10 ? data[i]['overdueMonth'] : "0"+data[i]['overdueMonth'])+"月" + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + '_overdue_amount" data="'+data[i]['overdueMoney']+'">' + NumberFormatUtil.fmoney(data[i]['overdueMoney'], 2) + '</td>';
                html += '<td class="cel desc" id="' + data[i]['id'] + '_overdue_content" data="'+data[i]['overdueBak']+'">' + data[i]['overdueBak'] + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }
    
    /**
     * 催缴记录
     * @param data
     * @returns
     */
    function createUrgeListHtml(data){
    	var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>';
        html += '<th style="width:2%;"><input type="checkbox" class="checkAll"></th>';
        html += '<th style="width:3%;">序号</th>' ;
        html += '<th style="width:6%;">催缴状态</th>';
        html += '<th style="width:10%;">催缴时间</th>';
        html += '<th style="width:66%;">催缴内容</th>';
        html += '<th style="width:6%;">操作人</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="6">暂无催缴记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                if(data[i]['isTelException'] == 1  || data[i]['isTelException'] == "1"  ){
                    $("#trail_view").val(1)
                }
                html += '<tr>';
                html += '<td><input type="checkbox" name="checkbox" class="checkOne" value="' + data[i]['id'] + '"></td>';
                html += '<td class="cel">' + (i + 1) + '<input type="hidden" data="'+data[i]['urgeMethod']+'" id="'+data[i]['id']+'_urge_method"></td>';
                html += '<td class="cel" id="' + data[i]['id'] + '_urge_status" data="'+data[i]['urgeStatus']+'">' + data[i]['urgeStatusName'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + '_urge_date" data="'+ data[i]['urgeDate'] +'">' + data[i]['urgeDate'] + '</td>' ;
                html += '<td class="cel desc" id="' + data[i]['id'] + '_urge_content" data="'+data[i]['urgeContent']+'">' + data[i]['urgeContent'] + '</td>';
                html += '<td class="cel">' + data[i]['realname'] + '<input type="hidden" data="'+data[i]['isTelException']+'" id="'+data[i]['id']+'_tel_exception"></td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }
    function createLawListHtml(data){

    	var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>';
        html += '<th style="width:2%;"><input type="checkbox" class="checkAll"></th>';
        html += '<th style="width:2%;">序号</th>' ;
        html += '<th style="width:6%;">拖车状态</th>';
        html += '<th style="width:6%;">立案号</th>';
        html += '<th style="width:6%;">诉讼金额(元)</th>';
        html += '<th style="width:71%;">备注</th>';
        html += '<th style="width:6%;">更新时间</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="10">暂无诉讼记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';

                html += '<td><input type="checkbox" name="checkbox" class="checkOne" value="' + data[i]['id'] + '"></td>';
                html += '<td class="cel">' + (i + 1) + '</td>';
                html += '<td class="cel">' + data[i]['trailCarStatusName'] + '</td>' ;
                html += '<td class="cel">' + data[i]['caseNo'] + '</td>' ;
                html += '<td class="cel">' + NumberFormatUtil.fmoney(data[i]['lawMoney'], 2) + '</td>';
                html += '<td class="cel desc">' + data[i]['caseBak'] + '</td>';
                html += '<td class="cel">' + data[i]['updateTime'] + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    function createTrailCarListHtml(data){
    	var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>';
        html += '<th style="width:10%;">拖车状态</th>';
        html += '<th style="width:90%;">拖车备注</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0 ) {
            html += '<td class="col-td" colspan="2">暂无保全记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td class="cel">' + data[i]['trailCarStatusName'] + '</td>' ;
                html += '<td class="cel desc">' + data[i]['remark'] + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }


    function createTrailCarExecuteListHtml(data){
        var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>';
        html += '<th style="width:2%;"><input type="checkbox" class="checkAll"></th>';
        html += '<th style="width:10%;">派单时间</th>';
        html += '<th style="width:30%;">拖车单位</th>';
        html += '<th style="width:60%;">派单备注</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="5">暂无派单记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';

                html += '<td">'+ '<input type="hidden" data="'+data[i]['trailCarCompanyId']+'" id="'+data[i]['executeId']+'trailCarCompanyId"></td>';
                html += '<td><input type="checkbox" name="checkbox" class="checkOne" value="' + data[i]['executeId'] + '"></td>';
                html += '<td class="cel" id="' + data[i]['executeId'] + 'dispatchDateStr" data="'+data[i]['dispatchDateStr']+'">' + data[i]['dispatchDateStr'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['executeId'] + 'carName" data="'+data[i]['carName']+'">' + data[i]['carName'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['executeId'] + 'trailCarDispatchBak" data="'+data[i]['trailCarDispatchBak']+'">' + data[i]['trailCarDispatchBak'] + '</td>' ;
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    function createAdvListHtml(data){
        var html = '';
        html += '<table class="table table-hover table-bordered table-striped">';
        html += '<thead><tr>';
        html += '<th style="width:2%;"><input type="checkbox" class="checkAll"></th>';
        html += '<th style="width:2%;">序号</th>' ;
        html += '<th style="width:6%;">交易日期</th>';
        html += '<th style="width:6%;">收支</th>';
        html += '<th style="width:6%;">来源</th>';
        html += '<th style="width:6%;">金额（元）</th>';
        html += '<th style="width:71%;">催缴备注</th>';
        html += '<th style="width:6%;">操作人</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="10">暂无代偿记录</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                if(data[i]['inOrOut'] == 2  || data[i]['inOrOut'] == "2"  ){
                    $("#adv_view").val(1)
                }
                html += '<tr>';
                html += '<input type="hidden" data="'+data[i]['urgeMethod']+'" id="'+data[i]['id']+'advancedDateStr">' +
                    ' <input type="hidden" data="'+data[i]['inOrOut']+'" id="'+data[i]['id']+'inOrOut">' +
                     ' <input type="hidden" data="'+data[i]['source']+'" id="'+data[i]['id']+'source">' +
                    '<input type="hidden" data="'+data[i]['money']+'" id="'+data[i]['id']+'money">' +
                    '<input type="hidden" data="'+data[i]['accountType']+'" id="'+data[i]['id']+'accountType">' +
                    '<input type="hidden" data="'+data[i]['bondMoney']+'" id="'+data[i]['id']+'bondMoney"></td>';
                html += '<td><input type="checkbox" name="checkbox" class="checkOne" value="' + data[i]['id'] + '"></td>';
                html += '<td class="cel">' + (i + 1) + '</td>';
                html += '<td class="cel" id="' + data[i]['id'] + 'advancedDate" data="'+data[i]['advancedDateStr']+'">' + data[i]['advancedDateStr'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + 'inOrOutStr" data="'+data[i]['inOrOutStr']+'">' + data[i]['inOrOutStr'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + 'accountTypeStr" data="'+data[i]['accountTypeStr']+'">' + data[i]['accountTypeStr'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + 'money" data="'+data[i]['money']+'">' + data[i]['money'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + 'advancedBak" data="'+data[i]['advancedBak']+'">' + data[i]['advancedBak'] + '</td>' ;
                html += '<td class="cel" id="' + data[i]['id'] + 'realname" data="'+data[i]['realname']+'">' + data[i]['realname'] + '</td>' ;
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }
    HYCarFinance.UI = UI;
})($);