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
        <input type="hidden" name="contractSubmitBankStartDate" value="${paramMap.contractSubmitBankStartDate}"/>
        <input type="hidden" name="contractSubmitBankEndDate" value="${paramMap.contractSubmitBankEndDate}"/>
        <input type="hidden" name="bankName" value="${paramMap.bankName}"/>
    </div>
    <form id="pagerForm" action="${ctx}/sendBankDetail/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-1">
               <shiro:hasPermission name="sendBankDetail:exportSendBankDetail">
                <a data-toggle="modal" class="btn btn-success  btn-sm exportSendBankDetail" >导出</a>
               </shiro:hasPermission>
            </div>
            <div class="col-sm-11">
                <div class="form-inline">
                        <div class="form-group" >
                            <label class="control-label label" >送交银行日期:</label>
                            <div class="input-group">
                            <input type="text" class="form-control" name="contractSubmitBankStartDate" id="search-start-date" value="${paramMap.contractSubmitBankStartDate}">
                                <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="contractSubmitBankEndDate" id="search-end-date" value="${paramMap.contractSubmitBankEndDate}">
                        </div>
                        </div>
                    <div class="form-group">
                        <label class="control-label label">银行</label>
                        <select class="form-control" id="search-bank" name="bankName">
                            <option value="">请选择贷款银行</option>
                            <c:forEach items="${bankList}" var="bank">
                                <option value="${bank.bankName}"
                                        <c:if test="${bank.bankName eq paramMap.bankName}">selected</c:if>
                                >${bank.bankName}</option>
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
                    <th style="width:4%;">信贷专员</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:4%;">客户名称</th>
                    <th style="width:8%;">身份证号</th>
                    <th style="width:5%;">贷款额(元)</th>
                    <th style="width:6%;">车架号</th>
                    <th style="width:8%;">家庭住址</th>
                    <th style="width:8%;">单位名称</th>
                    <th style="width:6%;">具体车型</th>
                    <th style="width:5%;">发动机号</th>
                    <th style="width:8%;">订单号</th>
                    <th style="width:8%;">贷款银行</th>
                    <th style="width:8%;">上牌地</th>
                    <th style="width:4%;">车型构成</th>
                    <th style="width:6%;">公司垫付日期</th>
                    <th style="width:6%;">送交银行日期</th>
                    <th style="width:4%;">操作员</th>
                    <th style="width:4%;">贷款年限(月)</th>
                    <th style="width:4%;">合同价(元)</th>
                    <th style="width:6%;">银行放款日期</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="22">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="sendBankDetailInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">${item.vinNo}</td>
                        <td class="cel">${item.buyerFamilyAddressProvince}</td>
                        <td class="cel">${item.buyerCompanyName}</td>
                        <td class="cel">${item.carDetail}</td>
                        <td class="cel">${item.engineNo}</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.carLicenseProvince}</td>
                        <td class="cel">
                            <c:if test="${item.newOrOld==1}">
                                新车
                            </c:if>
                            <c:if test="${item.newOrOld==0}">
                                二手车
                            </c:if>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">${item.realName}</td>
                        <td class="cel">${item.loanPeriodMonth}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd "/></td>
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
</html>
