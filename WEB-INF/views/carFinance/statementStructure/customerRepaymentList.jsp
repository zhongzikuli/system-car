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
        <input  type="hidden" name="firstRepaymentStartDate" value="${paramMap.firstRepaymentStartDate}">
        <input  type="hidden" name="firstRepaymentEndDate" value="${paramMap.firstRepaymentEndDate}">
        <input  type="hidden" name="bankPaymentStartDate" value="${paramMap.bankPaymentStartDate}">
        <input  type="hidden" name="bankPaymentEndDate" value="${paramMap.bankPaymentEndDate}">
        <input  type="hidden" name="departmentName" value="${paramMap.departmentName}">
        <input  type="hidden" name="bankName" value="${paramMap.bankName}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
    </div>
    <form id="pagerForm" action="${ctx}/customerRepayment/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                   <shiro:hasPermission name="customerRepayment:exportCustomerRepayment">
                    <a data-toggle="modal" class="btn btn-success  btn-sm exportCustomerRepayment" >导出</a>
                   </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >首期还款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="firstRepaymentStartDate" id="firstRepaymentStartDate" value="${paramMap.firstRepaymentStartDate}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="firstRepaymentEndDate" id="firstRepaymentEndDate" value="${paramMap.firstRepaymentEndDate}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >银行放款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="bankPaymentStartDate" id="bankPaymentStartDate" value="${paramMap.bankPaymentStartDate}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="bankPaymentEndDate" id="bankPaymentEndDate" value="${paramMap.bankPaymentEndDate}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="nameOrId" class="form-control w-200"
                                           onkeyup="value=value.replace(/\s/g,'')"    placeholder="请输入客户姓名或身份证号" id="nameOrId" value="${paramMap.nameOrId}">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行</label>
                                <div class="col-xs-8">
                                <select class="form-control" id="search-bank" name="bankName">
                                    <option value="">请选择贷款银行</option>
                                    <c:forEach items="${bankList}" var="bank">
                                        <option value="${bank.bankName}"
                                                <c:if test="${bank.bankName eq paramMap.bankName}">selected</c:if>
                                        >${bank.bankName}</option>
                                    </c:forEach>
                                </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-3">部门</label>
                                <div class="col-xs-8">
                                <select class="form-control" id="search-deparment-name" name="departmentName">
                                    <option value="">请选择部门</option>
                                    <c:forEach items="${departmentNames}" var="department">
                                        <option value="${department.name}"
                                                <c:if test="${department.name eq paramMap.departmentName}">selected</c:if>
                                        >${department.name}</option>
                                    </c:forEach>
                                </select>
                                </div>
                            </div>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                                <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                            </div>
                        </div>
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
                    <th style="width:4%;">订单号</th>
                    <th style="width:4%;">信贷专员</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:4%;">客户姓名</th>
                    <th style="width:8%;">客户身份证号</th>
                    <th style="width:5%;">手机号</th>
                    <th style="width:6%;">卡号</th>
                    <th style="width:8%;">首次还款日期</th>
                    <th style="width:8%;">月还款额(元)</th>
                    <th style="width:6%;">银行</th>
                    <th style="width:5%;">银行放款时间</th>
                    <th style="width:8%;">家庭住址</th>
                    <th style="width:8%;">公司</th>
                    <th style="width:8%;">车型</th>
                    <th style="width:4%;">合同价(元)</th>
                    <th style="width:6%;">贷款额(元)</th>
                    <th style="width:4%;">审核员(备注)</th>
                    <th style="width:4%;">审核经理(备注)</th>
                    <th style="width:4%;">风控总监(备注)</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="21">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="customerRepaymentInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.realName}</td>
                        <td class="cel">${item.cardNo}</td>
                        <td class="cel">${item.tel}</td>
                        <td class="cel">${item.bankCardNo}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.firstRepaymentDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.repayMonth}" pattern="#,##0.00"/></td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">${item.familyAddressProvince}</td>
                        <td class="cel">${item.companyName}</td>
                        <td class="cel">${item.brandName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td title="${item.auditAuditerBak}" style="max-width:100px">${item.auditAuditerBak}</td>
                        <td title="${item.auditManageBak}"  style="max-width:100px">${item.auditManageBak}</td>
                        <td title="${item.auditDirectorBak}"style="max-width:100px">${item.auditDirectorBak}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/statementStructure/customerRepaymentList.js"></script>
</html>
