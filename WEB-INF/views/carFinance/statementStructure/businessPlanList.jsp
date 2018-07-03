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
        <input type="hidden" name="dateTime" value="${dateTime}"/>
    </div>
    <form id="pagerForm" action="${ctx}/businessPlan/list.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <input type="hidden" name="type" value="${type}"/>
        <input type="hidden" name="dateTime" value="${dateTime}"/>
        <div class="row">
            <div class="col-sm-11  text-left">
                <div class="form-inline">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                    <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportExcelByIds('/businessPlan/export.action')">导出</a>
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
                    <th style="width:5%;">今日贷款额(元)</th>
                    <th style="width:5%;">今日垫付金额(元)</th>
                    <th style="width:6%;">本<c:if test="${type eq 'month'}">月</c:if><c:if test="${type eq 'year'}">年</c:if>总贷款额(元)</th>
                    <th style="width:6%;">本<c:if test="${type eq 'month'}">月</c:if><c:if test="${type eq 'year'}">年</c:if>总垫付金额(元)</th>
                    <th style="width:6%;">所属<c:if test="${type eq 'month'}">月</c:if><c:if test="${type eq 'year'}">年</c:if>份</th>
                    <th style="width:6%;">本<c:if test="${type eq 'month'}">月</c:if><c:if test="${type eq 'year'}">年</c:if>计划额</th>
                    <th style="width:6%;">本<c:if test="${type eq 'month'}">月</c:if><c:if test="${type eq 'year'}">年</c:if>计划达成率</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="10">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td class="cel"><input type="checkbox" class="checkOne" name="businessOrderId" value="${item.businessOrderAcceptId}"></td>
                        <td class="cel">${item.parentDepartmentName}</td>
                        <td class="cel">${item.departName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.dayActualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="number" show="${item.dayCompanyAdvanceMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="number" show="${item.companyAdvanceMoney}" pattern="#,##0.00"/></td>
                        <td class="cel"><c:if test="${type eq 'month'}">${month}</c:if><c:if test="${type eq 'year'}">${year}</c:if></td>
                        <td class="cel"><sl:format type="number" show="${item.money}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="number" show="${item.rate}" pattern="#,##0.00"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/deliverUnMortgage.js"></script>
</html>
