<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="type" value="${type}"/>
        <input type="hidden" name="source" value="${source}"/>
        <input type="hidden" name="bankId" value="${bankId}"/>
        <input type="hidden" name="departId" value="${departId}"/>
        <input type="hidden" name="dateTime" value="${dateTime}"/>
    </div>
    <form id="pagerForm" action="${ctx}/financialRate/departList.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <input type="hidden" name="type" value="${type}"/>
        <input type="hidden" name="source" value="${source}"/>
        <input type="hidden" name="bankId" value="${bankId}"/>
        <input type="hidden" name="departId" value="${departId}"/>
        <input type="hidden" name="dateTime" value="${dateTime}"/>
        <div class="row">
            <div class="col-sm-11  text-left">
                <div class="form-inline">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                    <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportFinancialExcelByDepartId('/financialRate/departListExport.action')">导出</a>
                    <div class="form-group">
                        <label class="alert-warning">总贷款金额(万元): </label>
                        <code class="alert-info"><sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                    </div>
                    <div class="form-group">
                        <label class="alert-warning">总垫付金额(万元): </label>
                        <code class="alert-info"><sl:format type="number" show="${entity.companyAdvanceMoney/10000}" pattern="#,##0.00"/></code>
                    </div>
                    <div class="form-group">
                        <label class="alert-warning">总数(条): </label>
                        <code class="alert-info">${entity.space}</code>
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
                    <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                    <th style="width:8%;">上级部门</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:6%;">信贷专员</th>
                    <th style="width:6%;">客户名称</th>
                    <th style="width:6%;">客户身份证</th>
                    <th style="width:6%;">上牌地</th>
                    <th style="width:6%;">贷款额(元)</th>
                    <th style="width:6%;">垫付金额(元)</th>
                    <th style="width:6%;">公司垫付日期</th>
                    <th style="width:6%;">资金占用天数</th>
                    <th style="width:6%;">银行放款日期</th>
                    <th style="width:6%;">贷款合同齐全日期</th>
                    <th style="width:6%;">合同送行日期</th>
                    <th style="width:6%;">所属<c:if test="${type eq 'month' && source eq 'bar'}">日</c:if><c:if test="${(type eq 'month' && source ne 'bar') || (type eq 'year' && source eq 'bar')}">月</c:if><c:if test="${type eq 'year' && source ne 'bar'}">年</c:if></th>
                    <th style="width:6%;">贷款银行</th>
                    <th style="width:6%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="17">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td class="cel"><input type="checkbox" class="checkOne" name="businessOrderId" value="${item.businessOrderAcceptId}"></td>
                        <td class="cel">${item.parentDepartmentName}</td>
                        <td class="cel">${item.departName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.buyerName}</td>
                        <td class="cel">${item.cardNo}</td>
                        <td class="cel">${item.carLicenseProvince}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="number" show="${item.companyAdvanceMoney}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.companyAdvanceMoneyDate}"/></td>
                        <td class="cel">${item.space}</td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.bankPaymentDate}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.loanContractAllDate}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd" show="${item.contractSubmitBankDate}"/></td>
                        <td class="cel"><c:if test="${type eq 'month' && source eq 'bar'}">${day}</c:if><c:if test="${(type eq 'month' && source ne 'bar') || (type eq 'year' && source eq 'bar')}">${month}</c:if><c:if test="${type eq 'year' && source ne 'bar'}">${year}</c:if></td>
                        <td class="cel">${item.bankName}</td>
                        <td class="btn-cel" style="text-align: center;">
                            <shiro:hasPermission name="order:view">
                                <a title="查看" class="btn btn-info btn-xs detail"
                                   onclick="detail('${item.businessOrderAcceptId}','${item.buyerName}')"><i class="fa fa-search-plus"></i>查看</a>
                            </shiro:hasPermission>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/deliverUnMortgage.js?v=20180507011222"></script>
</html>
