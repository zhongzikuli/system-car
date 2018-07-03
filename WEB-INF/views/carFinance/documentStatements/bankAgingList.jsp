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
        <input type="hidden" name="mortgageFileSubmitBankDateStart" value="${paramMap.mortgageFileSubmitBankDateStart}"/>
        <input type="hidden" name="mortgageFileSubmitBankDateEnd" value="${paramMap.mortgageFileSubmitBankDateEnd}"/>
        <input type="hidden" name="ascompanyAdvanceMoneyDateStart" value="${paramMap.ascompanyAdvanceMoneyDateStart}"/>
        <input type="hidden" name="ascompanyAdvanceMoneyDateEnd" value="${paramMap.ascompanyAdvanceMoneyDateEnd}"/>
        <input type="hidden" name="bankNameId" value="${paramMap.bankNameId}"/>
        <input type="hidden" name="isBankPayment" value="${paramMap.isBankPayment}"/>
    </div>
    <form id="pagerForm" action="${ctx}/bankAging/queryNew.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-5  text-left">
                <shiro:hasPermission name="bankAging:exportBankAging">
                    <a data-toggle="modal" class="btn btn-success  btn-sm  exportBankAging" >导出</a>
                </shiro:hasPermission>
                <c:if test="${ not empty ReportEntity}">
                    <label class="alert-warning">车价(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${ReportEntity.auditCarPrice/10000}" pattern="#,##0.00"/></code>
                    <label class="alert-warning">贷款额(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${ReportEntity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                    <label class="alert-warning">合同价(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${ReportEntity.contractPrice/10000}" pattern="#,##0.00"/></code>
                </c:if>
                <label class="alert-warning">总数: </label>
                <code class="alert-info">${count}</code>
            </div>



            <div class="col-sm-7 text-right" >
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >垫款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                            <input type="text" class="form-control" style="width:120px;" name="ascompanyAdvanceMoneyDateStart" id="search-start-date" value="${paramMap.ascompanyAdvanceMoneyDateStart}">
                                            <span class="input-group-addon">到</span>
                                            <input type="text" class="form-control" style="width:120px;" name="ascompanyAdvanceMoneyDateEnd" id="search-end-date" value="${paramMap.ascompanyAdvanceMoneyDateEnd}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >抵押资料交银行日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                            <input type="text" class="form-control" style="width:120px;" name="mortgageFileSubmitBankDateStart" id="credit-start-date" value="${paramMap.mortgageFileSubmitBankDateStart}">
                                            <span class="input-group-addon">到</span>
                                            <input type="text" class="form-control" style="width:120px;" name="mortgageFileSubmitBankDateEnd" id="credit-end-date" value="${paramMap.mortgageFileSubmitBankDateEnd}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >银行放款:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <select class="form-control" id="isBankPayment" name="isBankPayment">
                                            <option value="">请选择</option>
                                            <option value="1" <c:if test="${paramMap.isBankPayment == '1'}">selected</c:if>>是</option>
                                            <option value="2" <c:if test="${paramMap.isBankPayment == '2'}">selected</c:if>>否</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-bank" name="bankNameId">
                                        <option value="">请选择贷款银行</option>
                                        <c:forEach items="${bankList}" var="bank">
                                            <option value="${bank.id}"
                                                    <c:if test="${bank.id eq paramMap.bankNameId}">selected</c:if>
                                            >${bank.bankName}</option>
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
                    <th style="width:4%;">车型构成</th>
                    <th style="width:8%;">上级部门</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:6%;">信贷专员</th>
                    <th style="width:6%;">客户名称</th>
                    <th style="width:4%;">身份证号</th>
                    <th style="width:6%;">车辆型号</th>
                    <th style="width:4%;">车价(元)</th>
                    <th style="width:6%;">贷款额(元)</th>
                    <th style="width:6%;">合同价(元)</th>
                    <th style="width:7%;">垫付日期</th>
                    <th style="width:8%;">补齐日期</th>
                    <th style="width:8%;">送银行日期</th>
                    <th style="width:4%;">银行放款日期</th>
                    <th style="width:8%;">银行</th>
                    <th style="width:8%;">按揭期限(月)</th>
                    <th style="width:4%;">资料对接人</th>
                    <th style="width:8%;">未送交原因</th>
                    <th style="width:8%;">合同收到日期</th>
                    <th style="width:4%;">合同号</th>
                    <th style="width:8%;">资料箱号</th>
                    <th style="width:8%;">订单号</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="24">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="bankAgingInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">
                            <c:if test="${item.newOrOld==1}">
                                新车
                            </c:if>
                            <c:if test="${item.newOrOld==0}">
                                二手车
                            </c:if>
                        </td>
                        <td class="cel">${item.parentDepName}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">${item.brandName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.auditCarPrice}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.loanContractAllDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.loanPeriodMonth}</td>
                        <td class="cel">${item.operationingLoginNameContractPrint}</td>
                        <td class="cel">${item.contractSubmitBankRemark}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.loanContractReceiveDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">${item.contractNo}</td>
                        <td class="cel">${item.contractBoxNo}</td>
                        <td class="cel">${item.orderNo}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/bankAgingList.js"></script>
</html>
