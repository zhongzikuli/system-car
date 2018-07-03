<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>风控报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="startCompanyAdvanceDate" value="${paramMap.startCompanyAdvanceDate}"/>
        <input type="hidden" name="endCompanyAdvanceDate" value="${paramMap.endCompanyAdvanceDate}"/>
        <input type="hidden" name="startContractSubmitDate" value="${paramMap.startContractSubmitDate}"/>
        <input type="hidden" name="endContractSubmitDate" value="${paramMap.endContractSubmitDate}"/>
        <input type="hidden" name="startBankPaymentDate" value="${paramMap.startBankPaymentDate}"/>
        <input type="hidden" name="endBankPaymentDate" value="${paramMap.endBankPaymentDate}"/>
        <input type="hidden" name="departmentId" value="${departmentId}"/>
        <input type="hidden" name="departmentParentId" value="${departmentParentId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/riskReport/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                <shiro:hasPermission name="risk:export">
                    <a type="button" class="btn btn-info btn-sm" onclick="exportExcel()">导出</a>
                </shiro:hasPermission>
                <c:if test="${ not empty entity}">
                    <label class="alert-warning">总贷款本金(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${entity.actualLoadMoney/10000}"
                                                        pattern="#,##0.00"/></code>
                    <label class="alert-warning">总合同价(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${entity.contractPrice/10000}"
                                                        pattern="#,##0.00"/></code>
                </c:if>
            </div>
            <div class="col-sm-7">
                <a class="btn btn-sm btn-primary btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight simple_query">
                    <input type="hidden" name="departmentId" value="${departmentId}"/>
                    <input type="hidden" name="departmentParentId" value="${departmentParentId}"/>
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">垫款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="startCompanyAdvanceDate"
                                               id="startCompanyAdvanceDate"
                                               value="${paramMap.startCompanyAdvanceDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="endCompanyAdvanceDate"
                                               id="endCompanyAdvanceDate" value="${paramMap.endCompanyAdvanceDate}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">送行日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="startContractSubmitDate" style=""
                                               id="startContractSubmitDate"
                                               value="${paramMap.startContractSubmitDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="endContractSubmitDate" style=""
                                               id="endContractSubmitDate" value="${paramMap.endContractSubmitDate}"/>
                                    </div>
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
                                                    <c:if test="${bank.id eq paramMap.bankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" class="form-control" name="keyword" id="search-keyword"
                                           placeholder="请输入客户姓名、身份证号和订单编号" value="${paramMap.keyword}"
                                           onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">银行放款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="startBankPaymentDate"
                                               id="startBankPaymentDate" value="${paramMap.startBankPaymentDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="endBankPaymentDate"
                                               id="endBankPaymentDate" value="${paramMap.endBankPaymentDate}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <input type="text" class="form-control" id="departmentTreeId" readonly="readonly"
                                           data-id="${departmentId}" data-parnetid="${departmentParentId}"
                                           value="${departName}"/>
                                    <div id="menuContent" class="menuContent"
                                         style="border:1px solid #08e6f5; display: none;position: absolute;padding: 10px;height:300px;">
                                        <ul id="departmentTree" class="ztree"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group group-btn" style="margin-bottom:15px;">
                                <button type="button" class="btn btn-primary btn-sm search-btn"
                                        onclick="query()">搜索
                                </button>
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
                    <th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                    <th style="width:2%;">订单编号</th>
                    <th style="width:8%;">客户名</th>
                    <th style="width:8%;">身份证号</th>
                    <th style="width:5%;">所属部门</th>
                    <th style="width:5%;">客户经理</th>
                    <th style="width:5%;">经销商</th>
                    <th style="width:8%;">贷款金额(元)</th>
                    <th style="width:8%;">合同价(元)</th>
                    <th style="width:8%;">贷款银行</th>
                    <th style="width:8%;">终审通过日期</th>
                    <th style="width:8%;">垫款日期</th>
                    <th style="width:8%;">送行日期</th>
                    <th style="width:8%;">银行放款日期</th>
                    <th style="width:8%;">抵押日期</th>
                    <th style="width:8%;">车辆类型</th>
                    <th style="width:8%;">上牌地</th>
                    <th style="width:8%;">车牌号</th>
                    <th style="width:8%;">贷款年限(月)</th>
                    <th style="width:8%;">银行利率</th>
                    <th style="width:8%;">客户利率</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                <tr>
                    <td class="col-td" colspan="21">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                    <td><input type="checkbox" class="checkOne" value="${item.businessOrderAcceptId}"></td>
                    <td class="cel">${item.orderNo}</td>
                    <td class="cel">${item.buyerName}</td>
                    <td class="cel">${item.cardNo}</td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel">${item.creditPerson}</td>
                    <td class="cel max-200" title="${item.dealerName}">${item.dealerName}</td>
                    <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                    <td class="cel">
                        <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel"><fmt:formatDate value="${item.finalAuditTime}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel"><fmt:formatDate value="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel"><fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel"><fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel"><fmt:formatDate value="${item.mortgageProcessDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel max-200" title="${item.brandName}">${item.brandName}</td>
                    <td class="cel">${item.carLicenseProvince}</td>
                    <td class="cel">${item.plateNumber}</td>
                    <td class="cel"><sl:dict classType="290000" keyWorld="${item.loanPeriodMonthCode}"/></td>
                    <td class="cel"><sl:format type="number" show="${item.bankRate}" pattern="#,##0.000"/></td>
                    <td class="cel"><sl:format type="number" show="${item.customerRate}" pattern="#,##0.000"/></td>
                </tr>
                </c:forEach>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
        <%-- end table-responsive --%>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript"
        src="${ctx}/js/mine/carFinance/financialStatement/riskStatisticsList.js?version=201802110441132454"></script>
</html>
