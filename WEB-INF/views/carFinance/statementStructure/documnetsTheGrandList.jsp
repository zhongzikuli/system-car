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
        <input type="hidden" name="name" value="${name}"/>
        <input type="hidden" name="type" value="${type}"/>
        <input type="hidden" name="queryType" value="${queryType}"/>
        <input type="hidden" name="departmentName" value="${departmentName}"/>
    </div>
    <form id="pagerForm" action="${ctx}/graphicReport/getDocumentsTheGrandList.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <input type="hidden" name="name" value="${name}"/>
        <input type="hidden" name="type" value="${type}"/>
        <input type="hidden" name="queryType" value="${queryType}"/>
        <input type="hidden" name="departmentName" value="${departmentName}"/>
        <div class="row">
            <div class="col-sm-5">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportExcel('/graphicReport/export/documentsTheGrand.action')">导出</a>
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
                    <th style="width:4%;">信贷专员</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:4%;">客户名称</th>
                    <th style="width:4%;">客户身份证</th>
                    <th style="width:6%;">贷款银行</th>
                    <th style="width:5%;">贷款额(元)</th>
                    <th style="width:5%;">公司垫付金额(元)</th>
                    <c:if test="${queryType =='资料不齐全且单证超时' || queryType =='资料不齐全单证未超时' }">
                    <th style="width:6%;">间隔天数(天)</th>
                    </c:if>
                    <th style="width:6%;">公司垫付日期</th>
                    <c:if test="${queryType =='资料齐全未送行' || queryType =='资料齐全且送行未放款' }">
                    <th style="width:6%;">贷款合同齐全日期</th>
                    </c:if>
                    <c:if test="${queryType =='资料齐全且送行未放款' }">
                    <th style="width:6%;">合同送交银行日期</th>
                    </c:if>
                    <th style="width:6%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="11">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach   var="item" items="${pageBean.recordList}" varStatus="st">
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.buyerName}</td>
                        <td class="cel">${item.cardNo}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel"><sl:format type="number" show="${item.companyAdvanceMoney}" pattern="#,##0.00"/></td>
                        <c:if test="${queryType =='资料不齐全且单证超时' || queryType =='资料不齐全单证未超时' }">
                        <td class="cel">
                                ${item.dateNum}
                        </td>
                        </c:if>
                        <td class="cel">
                            <fmt:formatDate value="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <c:if test="${queryType =='资料齐全未送行' || queryType =='资料齐全且送行未放款' }">
                        <td class="cel">
                            <fmt:formatDate value="${item.loanContractAllDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        </c:if>
                    <c:if test="${ queryType =='资料齐全且送行未放款' }">
                        <td class="cel">
                            <fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd "/>
                        </td>
                    </c:if>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/deliverUnMortgage.js"></script>
</html>
