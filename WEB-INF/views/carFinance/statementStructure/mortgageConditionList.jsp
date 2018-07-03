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
        <input type="hidden" name="mortgageFileSubmitBankDate" value="${paramMap.mortgageFileSubmitBankDate}"/>
        <input type="hidden" name="bankPaymentDateStart" value="${paramMap.bankPaymentDateStart}"/>
        <input type="hidden" name="bankPaymentDateEnd" value="${paramMap.bankPaymentDateEnd}"/>
        <input type="hidden" name="departmentName" value="${paramMap.departmentName}"/>
    </div>
    <form id="pagerForm" action="${ctx}/mortgageCondition/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-1">
                  <shiro:hasPermission name="mortgageCondition:exportMortgageCondition">
                    <a data-toggle="modal" class="btn btn-success  btn-sm exportMortgageCondition" >导出</a>
                  </shiro:hasPermission>
            </div>
            <div class="col-sm-11">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">抵押资料交银行日期:</label>
                        <input type="text" name="mortgageFileSubmitBankDate" class="form-control"
                               id="search-date" value="${paramMap.mortgageFileSubmitBankDate}"/>
                    </div>
                 <div class="form-group" >
                            <label class="control-label label" >银行放款日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="bankPaymentDateStart" id="search-start-date" value="${paramMap.bankPaymentDateStart}">
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="bankPaymentDateEnd" id="search-end-date" value="${paramMap.bankPaymentDateEnd}">
                        </div>
                 </div>
                    <div class="form-group">
                        <label class="control-label label">部门</label>
                        <select class="form-control" id="search-deparment-name" name="departmentName">
                            <option value="">请选择部门</option>
                            <c:forEach items="${departmentNames}" var="department">
                                <option value="${department.name}"
                                        <c:if test="${department.name eq paramMap.departmentName}">selected</c:if>
                                >${department.name}</option>
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
                    <th style="width:8%;">订单号</th>
                    <th style="width:4%;">客户姓名</th>
                    <th style="width:8%;">身份证号</th>
                    <th style="width:6%;">产品类型</th>
                    <th style="width:4%;">业务员</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:8%;">贷款银行</th>
                    <th style="width:4%;">贷款额(元)</th>
                    <th style="width:4%;">车型</th>
                    <th style="width:8%;">上牌地</th>
                    <th style="width:8%;">车牌号</th>
                    <th style="width:4%;">车型构成</th>
                    <th style="width:6%;">抵押资料交银行日期</th>
                    <th style="width:6%;">抵押寄网点日期</th>
                    <th style="width:6%;">公司垫付日期</th>
                    <th style="width:6%;">银行放款日期</th>
                    <th style="width:5%;">订单状态</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="19">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="mortgageConditionInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">${item.productName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">${item.brandName}</td>
                        <td class="cel">${item.carLicenseProvince}</td>
                        <td class="cel">${item.plateNumber}</td>
                        <td class="cel">
                                <c:if test="${item.newOrOld==1}">
                                    新车
                                </c:if>
                                <c:if test="${item.newOrOld==0}">
                                    二手车
                                </c:if>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageFileSubmitBankDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageFileDeliverDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">
                            <sl:OrderStatus showValue="${item.orderStatus}"/>
                        </td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/loanStatisticsList.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/statementDate.js"></script>
</html>
