<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="departmentId" value="${departmentId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/bankMatToPut/list.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm bank-excel">导出</button>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">部门:</label>
                        <select class="form-control chosen-select status" id="search-deparment-name" name="departmentId">
                            <option value="">请选择</option>
                            <c:forEach items="${departments}" var="department">
                                <option value="${department.id}"
                                        <c:if test="${department.id eq departmentId}">selected</c:if>
                                >${department.name} </option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn  btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width: 2%"><input type="checkbox" class="checkAll"></th>
                    <th style="width: 12%">银行</th>
                    <th style="width: 8%">今日放款(万/笔)</th>
                    <th style="width: 5%">本月累计放款(万/笔)</th>
                    <th style="width: 10%">今日垫款(万/笔)</th>
                    <th style="width: 12%">本月累计垫款(万/笔)</th>
                    <th style="width: 10%">转贷后(万/笔)</th>
                    <th style="width: 8%">未放款(万/笔)</th>
                    <th style="width: 5%">已申请尚未垫款(万/笔)</th>
                    <th style="width: 10%">已过件尚未申请垫款(万/笔)</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="14">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" value="${item.bankId}"></td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel ">${item.dayBankPaymentMoneyStr}</td>
                        <td class="cel">${item.monthBankPaymentMoneyStr}</td>
                        <td class="cel">${item.dayCompanyAdvanceMoneyStr}</td>
                        <td class="cel">${item.monthCompanyAdvanceStr}</td>
                        <td class="cel">${item.afterVerifyingMoneyStr}</td>
                        <td class="cel">${item.notLendingMoneyStr}</td>
                        <td class="cel">${item.appliedMoneyStr}</td>
                        <td class="cel">${item.inspectedMoneyStr}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newStatementStructure/bankMatToPut.js"></script>

</html>