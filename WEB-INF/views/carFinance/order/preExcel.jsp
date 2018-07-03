<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>excel合同生成</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="orderNo" value="${orderNo}"/>
        <input type="hidden" name="keyword" value="${keyword}"/>
        <input type="hidden" name="advanceStartDate" value="${advanceStartDate}"/>
        <input type="hidden" name="advanceEndDate" value="${advanceEndDate}"/>
        <input type="hidden" name="bankId" value="${bankId}"/>
        <input type="hidden" name="contractStartDate" value="${contractStartDate}"/>
        <input type="hidden" name="contractEndDate" value="${contractEndDate}"/>
        <input type="hidden" name="finalAuditStartTime" value="${finalAuditStartTime}"/>
        <input type="hidden" name="finalAuditEndTime" value="${finalAuditEndTime}"/>
        <input type="hidden" name="contractUserId" value="${contractUserId}"/>
    </div>

    <form id="pagerForm" action="${ctx}/cfBusinessOrderAccept/preDownloadExcel.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <shiro:hasPermission name="credit:importExcel">
                    <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="importExcel()">批量合同分配</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="credit:exportExcel">
                    <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportExcel()">导出</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="credit:contractDist">
                    <a data-toggle="modal" class="btn btn-success btn-sm contractDist">合同分配</a>
                </shiro:hasPermission>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-7">
                <a class="btn btn-sm btn-primary btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight simple_query">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">垫款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="advanceStartDate"
                                               id="advanceStartDate" value="${advanceStartDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="advanceEndDate"
                                               id="advanceEndDate" value="${advanceEndDate}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">合同收到日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="contractStartDate" style=""
                                               id="contractStartDate" value="${contractStartDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="contractEndDate" style=""
                                               id="contractEndDate" value="${contractEndDate}"/>
                                    </div>
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="col-xs-3 control-label">终审通过时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="finalAuditStartTime"
                                               id="finalAuditStartTime" value="${finalAuditStartTime}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="finalAuditEndTime"
                                               id="finalAuditEndTime" value="${finalAuditEndTime}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" class="form-control" name="keyword" id="search-keyword"
                                           placeholder="请输入客户姓名、订单编号" value="${keyword}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control chosen-select" id="search-select" name="bankId">
                                        <option value="">请选择银行</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <option value="${bank.id}"
                                                    <c:if test="${bank.id eq bankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">送交银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control chosen-select" name="bankQuery">
                                        <option value="">请选择</option>
                                        <option value="0"
                                                <c:if test="${bankQuery eq '0'}">selected</c:if>
                                        >否</option>
                                        <option value="1"
                                                <c:if test="${bankQuery eq '1'}">selected</c:if>
                                        >是</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">套打人员:</label>
                                <div class="col-xs-8">
                                    <select class="form-control chosen-select" name="contractUserId">
                                        <option value="">请选择</option>
                                        <c:forEach items="${users}" var="user">
                                            <option value="${user.id}" <c:if test="${userId eq user.id}">selected</c:if>>${user.userName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group group-btn" style="margin-bottom:15px;">
                                <button type="button" class="btn btn-primary btn-sm search-btn"
                                        onclick="searchSubmit()">搜索</button>
                                <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
        <div class="table-responsive full-height">
            <table class="table table-hover table-height table-striped">
                <thead>
                <tr>
                    <th style="width:2%;"><input type="checkbox" class="checkAll"></th>
                    <th style="width: 10%">订单编号</th>
                    <th style="width: 5%">套打人员</th>
                    <th style="width: 5%">客户名称</th>
                    <th style="width: 5%">信贷专员</th>
                    <th style="width: 10%">上级部门</th>
                    <th style="width: 10%">部门</th>
                    <th style="width: 12%">贷款银行</th>
                    <th style="width: 12%">经销商</th>
                    <th style="width: 12%">贷款金额(元)</th>
                    <th style="width: 8%">订单状态</th>
                    <th style="width: 12%">公司垫付日期</th>
                    <th style="width: 12%">终审通过日期</th>
                    <th style="width: 12%">合同收到日期</th>
                    <th style="width: 12%">合同送行日期</th>
                    <th style="width: 15%">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="16">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr target="sid_user" rel="${item.id}">
                        <td><input type="checkbox" class="checkOne" value="${item.id}"></td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel"><c:if test="${item.operationingLoginNameContractPrint != null}"><code
                                class="alert-warning">${item.operationingLoginNameContractPrint}</code></c:if></td>
                        <td class="cel">${item.buyerName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel max-120">${item.parentDepartmentName}</td>
                        <td class="cel max-120">${item.departName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.dealerName}</td>
                        <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}"
                                                   pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:OrderStatus showValue="${item.orderStatus}"/>
                        </td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.advanceMoneyDate}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.finalAuditTime}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.loanContractReceiveDate}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.contractSubmitBankDate}"/></td>
                        <td class="btn-cel">
                            <shiro:hasPermission
                                    name="credit:excel">
                                <button title="excel合同生成" class="btn btn-success btn-xs download-btn download-excel"
                                        <c:if test="${(item.operationingLoginNameContractPrint != null && userName ne item.operationingLoginNameContractPrint) || (item.contractSubmitBankDate != null)}">
                                            disabled="disabled" </c:if>
                                        <c:if test="${item.operationingLoginNameContractPrint == null || userName eq item.operationingLoginNameContractPrint}">
                                            data-id="${item.id}" data-bankid="${item.bankId}"
                                        </c:if>
                                >
                                    <i class="fa fa-cloud-download"></i>excel合同生成
                                </button>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="order:view">
                                <a title="查看" class="btn btn-info btn-xs detail"
                                   onclick="detail('${item.id}','${item.buyerName}')"><i
                                        class="fa fa-search-plus"></i>查看</a>
                            </shiro:hasPermission>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/orderContract.js"></script>

<script type="text/template" title="批量合同分配" id="excel-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="addUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>

<script type="text/template" title="合同分配" id="contract-dialog">
    <div class="ibox-content">
        <form id="contractForm" class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>套打人员:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的套打人员">
                                <select id="userId" name="userId" class="form-control chosen-select" tip="请输入正确的套打人员。"
                                        check="validForm(this)">
                                    <option value="">请选择</option>
                                    <c:forEach items="${users}" var="user">
                                        <option value="${user.id}">${user.userName}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>