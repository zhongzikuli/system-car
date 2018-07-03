<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="advanceId" value="${paramMap.advanceId}"/>
        <input type="hidden" name="departmentNameId" value="${paramMap.departmentNameId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/depAdvanceMoney/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-7  text-left">

                <shiro:hasPermission name="depAdvanceMoney:exportDepAdvanceMoney">
                    <a data-toggle="modal" class="btn btn-success  btn-sm  exportDepAdvanceMoney" >导出</a>
                    </shiro:hasPermission>
                <label class="alert-warning">日总合同价(万元): </label>
                <code class="alert-info"><sl:format type="number" show="${entity.dayContractPriceSum/10000}" pattern="#,##0.00"/></code>
                <label class="alert-warning">日总贷款额(万元): </label>
                <code class="alert-info"><sl:format type="number" show="${entity.dayLoanMoneySum/10000}" pattern="#,##0.00"/></code>
                <label class="alert-warning">月总合同价(万元): </label>
                <code class="alert-info"><sl:format type="number" show="${entity.monthContractPriceSum/10000}" pattern="#,##0.00"/></code>
                <label class="alert-warning">月总贷款额(万元): </label>
                <code class="alert-info"><sl:format type="number" show="${entity.monthLoanMoneySum/10000}" pattern="#,##0.00"/></code>
                <label class="alert-warning">总数: </label>
                <code class="alert-info">${count}</code>
            </div>
            <div class="col-sm-5 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">银行放款:</label>
                        <select class="form-control" id="search-advanceId" name="advanceId">
                            <option value="">请选择银行放款</option>
                            <option <c:if test="${1 eq paramMap.advanceId}">selected</c:if> value="1">是</option>
                            <option <c:if test="${2 eq paramMap.advanceId}">selected</c:if> value="2">否</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">部门:</label>
                        <select class="form-control" id="search-deparment-name" name="departmentNameId" data-placeholder="部门...">
                            <option value="">请选择部门</option>
                            <c:forEach items="${departmentNames}" var="names">
                                <option value="${names.id}"
                                        <c:if test="${names.id eq paramMap.departmentNameId}">selected</c:if>>${names.name}</option>
                            </c:forEach>
                        </select>
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                        <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                    <th style="width:2%;"><input type="checkbox" class="checkAll" ></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:4%;">部门</th>
                    <th style="width:8%;">今日合同价(元)</th>
                    <th style="width:6%;">今日贷款额(元)</th>
                    <th style="width:6%;">本月合同价(元)</th>
                    <th style="width:6%;">本月贷款额(元)</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="7">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="exportDepAdvance" value="${item.departmentId}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.dayContractPrice}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.dayLoanMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.monthContractPrice}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.monthLoanMoney}" pattern="#,##0.00"/></td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/depAdvanceMoney.js"></script>
</html>
