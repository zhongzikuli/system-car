<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>已放贷未抵押银行统计表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/bankReportLoanUnsecured/getBankReportList.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="financeStatements:exportBankLoanUnsecuredList">
                    <button type="button" data-toggle="modal" class="btn btn-success btn-sm bankReportLoanUnsecured-excel">导出
                    </button>
                </shiro:hasPermission>

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
                    <th style="width:2%;" rowspan="3">序号</th>
                    <th style="width:5%;" rowspan="3">银行</th>
                    <th style="width:5%;" colspan="8">未抵押</th>
                    <th style="width:5%;" colspan="2">合计</th>
                </tr>
                <tr>
                    <th style="width:5%;" colspan="2">超期≧60天</th>
                    <th style="width:5%;" colspan="2">45≦超期<60</th>
                    <th style="width:5%;" colspan="2">30≦超期<45</th>
                    <th style="width:5%;" colspan="2">超期<30</th>
                    <th style="width:5%;" rowspan="2">笔数</th>
                    <th style="width:5%;" rowspan="2">贷款本金(万元)</th>
                </tr>
                <tr>
                    <th style="width:5%;">笔数</th>
                    <th style="width:5%;">贷款本金(万元)</th>
                    <th style="width:5%;">笔数</th>
                    <th style="width:5%;">贷款本金(万元)</th>
                    <th style="width:5%;">笔数</th>
                    <th style="width:5%;">贷款本金(万元)</th>
                    <th style="width:5%;">笔数</th>
                    <th style="width:5%;">贷款本金(万元)</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${list == null || list.size() == 0}">
                <tr>
                    <td class="col-td" colspan="12">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${list}" varStatus="st">
                <c:choose>
                <c:when test="${st.last}">
                <%--尾行合计展示--%>
                <tr>
                    <td class="col-td" colspan="2">合计</td>
                    <td class="cel">${item.over60dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over60dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.over45dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over45dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.over30dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over30dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.over15dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over15dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.totalNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.totalMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                </tr>
                </c:when>
                <c:otherwise>
                <tr>
                    <td class="cel">${st.index+1}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel">${item.over60dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over60dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.over45dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over45dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.over30dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over30dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.over15dNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.over15dMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                    <td class="cel">${item.totalNum}</td>
                    <td class="cel"><fmt:formatNumber type="number" value="${item.totalMoney/10000}"
                                                      pattern="#,##0.00"/></td>
                </tr>
                </c:otherwise>
                </c:choose>
                </c:forEach>
            </table>
            <%-- 分页表单参数 --%>
            <%--<%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>--%>
        </div>
        <%-- end table-responsive --%>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript"
        src="${ctx}/js/mine/carFinance/newStatementStructure/BankReportLoanUnsecured.js"></script>
</html>
