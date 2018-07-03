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
        <input type="hidden" name="month" value="${month}"/>
        <input type="hidden" name="parentId" value="${parentId}"/>
        <input type="hidden" name="grandId" value="${grandId}"/>
        <input type="hidden" name="departmentId" value="${departmentId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/deliverUnMortgage/list.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <input type="hidden" name="month" value="${month}"/>
        <input type="hidden" name="parentId" value="${parentId}"/>
        <input type="hidden" name="grandId" value="${grandId}"/>
        <input type="hidden" name="departmentId" value="${departmentId}"/>
        <div class="row">
            <div class="col-sm-11  text-left">
                <div class="form-inline">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                    <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportDeliverUnMortgageListExcel('/deliverUnMortgage/listExport.action')">导出</a>
                    <div class="form-group">
                        <label class="alert-warning">总已寄出未抵押(笔): </label>
                        <code class="alert-info">${entity.space}</code>
                    </div>
                    <div class="form-group">
                        <label class="alert-warning">总贷款金额(万元): </label>
                        <code class="alert-info"><sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                    </div>
                    <div class="form-group">
                        <label class="alert-warning">总垫付金额(万元): </label>
                        <code class="alert-info"><sl:format type="number" show="${entity.companyAdvanceMoney/10000}" pattern="#,##0.00"/></code>
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
                    <th style="width:8%;">已寄出未抵押(笔)</th>
                    <th style="width:5%;">贷款额(万元)</th>
                    <th style="width:5%;">垫付金额(万元)</th>
                    <th style="width:6%;">操作</th>
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
                        <td class="cel"><input type="checkbox" class="checkOne" name="businessOrderId" value="${item.businessOrderAcceptId}"></td>
                        <td class="cel">${item.parentDepartmentName}</td>
                        <td class="cel">${item.departName}</td>
                        <td class="cel">${item.space}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney/10000}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="number" show="${item.companyAdvanceMoney/10000}" pattern="#,##0.00"/></td>
                        <td class="btn-cel" style="text-align: center;">
                            <shiro:hasPermission name="order:view">
                                <a title="查看" class="btn btn-info btn-xs detail"
                                   onclick="departDeliverUnMortgage('${item.departmentId}','${item.departName}')"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/deliverUnMortgage.js"></script>
</html>
