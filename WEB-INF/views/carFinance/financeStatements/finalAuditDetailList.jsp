<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>终审明细报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="startDate" value="${startDate}">
        <input type="hidden" name="endDate" value="${endDate}">
    </div>
    <form id="pagerForm" action="${ctx}/finalAuditReport/listDetail.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-1">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-11">
                <div class="form-inline">
                    <div class="form-group" id="date-time">
                        <label class="control-label label">日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" id="sTime" value="${startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate" id="eTime" value="${endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:8%;">日期</th>
                    <th style="width:10%;">垫付笔数</th>
                    <th style="width:5%;">垫付贷款额(元)</th>
                    <th style="width:8%;">垫付合同价(元)</th>
                    <th style="width:8%;">审核员审核笔数</th>
                    <th style="width:8%;">审核员审核贷款额(元)</th>
                    <th style="width:10%;">审核员审核合同价(元)</th>
                    <th style="width:8%;">终审通过笔数</th>
                    <th style="width:8%;">终审通过贷款额(元)</th>
                    <th style="width:8%;">终审通过合同价(元)</th>
                    <th style="width:8%;">终审通过未垫款笔数</th>
                    <th style="width:8%;">终审通过未垫款贷款额(元)</th>
                    <th style="width:8%;">终审通过未垫款合同价(元)</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                <tr>
                    <td class="col-td" colspan="13">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                    <td class="cel">${item.date}</td>
                    <td class="cel"><c:if test="${item.companyAdvanceMoneyNum == null}">--</c:if><c:if test="${item.companyAdvanceMoneyNum != null}">${item.companyAdvanceMoneyNum}</c:if></td>
                    <td class="cel"><c:if test="${item.totalCompanyAdvanceMoney == null}">--</c:if><c:if test="${item.totalCompanyAdvanceMoney != null}"><sl:format type="number" show="${item.totalCompanyAdvanceMoney}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.totalCompanyAdvanceContractPrice == null}">--</c:if><c:if test="${item.totalCompanyAdvanceContractPrice != null}"><sl:format type="number" show="${item.totalCompanyAdvanceContractPrice}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.auditNum == null}">--</c:if><c:if test="${item.auditNum != null}">${item.auditNum}</c:if></td>
                    <td class="cel"><c:if test="${item.totalAuditMoney == null}">--</c:if><c:if test="${item.totalAuditMoney != null}"><sl:format type="number" show="${item.totalAuditMoney}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.totalAuditContractPrice == null}">--</c:if><c:if test="${item.totalAuditContractPrice != null}"><sl:format type="number" show="${item.totalAuditContractPrice}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.finalAuditNum == null}">--</c:if><c:if test="${item.finalAuditNum != null}">${item.finalAuditNum}</c:if></td>
                    <td class="cel"><c:if test="${item.totalFinalAuditMoney == null}">--</c:if><c:if test="${item.totalFinalAuditMoney != null}"><sl:format type="number" show="${item.totalFinalAuditMoney}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.totalFinalAuditContractPrice == null}">--</c:if><c:if test="${item.totalFinalAuditContractPrice != null}"><sl:format type="number" show="${item.totalFinalAuditContractPrice}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.unFinalCompanyAdvanceMoneyNum == null}">--</c:if><c:if test="${item.unFinalCompanyAdvanceMoneyNum != null}">${item.unFinalCompanyAdvanceMoneyNum}</c:if></td>
                    <td class="cel"><c:if test="${item.unFinalCompanyAdvanceMoney == null}">--</c:if><c:if test="${item.unFinalCompanyAdvanceMoney != null}"><sl:format type="number" show="${item.unFinalCompanyAdvanceMoney}" pattern="#,##0.00"/></c:if></td>
                    <td class="cel"><c:if test="${item.unFinalCompanyAdvanceContractPrice == null}">--</c:if><c:if test="${item.unFinalCompanyAdvanceContractPrice != null}"><sl:format type="number" show="${item.unFinalCompanyAdvanceContractPrice}" pattern="#,##0.00"/></c:if></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/finalAuditStatistical.js"></script>
</html>
