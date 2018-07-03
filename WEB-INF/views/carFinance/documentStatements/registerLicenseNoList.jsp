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
        <input type="hidden" name="bankNameId" value="${paramMap.bankNameId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/registerLicenseNo/queryNew.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-4  text-left">
              <shiro:hasPermission name="registerLicenseNo:exportRegisterLicenseNo">
                <a data-toggle="modal" class="btn btn-success  btn-sm  exportRegisterLicenseNo" >导出</a>
              </shiro:hasPermission>
                <c:if test="${ not empty ReportEntity}">
                    <label class="alert-warning">贷款金额(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${ReportEntity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                </c:if>
                <label class="alert-warning">总数: </label>
                <code class="alert-info">${count}</code>
            </div>
            <div class="col-sm-8 text-right">
                <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label" >抵押资料交银行日期:</label>
                            <div class="input-group">
                            <input type="text" class="form-control" name="mortgageFileSubmitBankDateStart" id="search-start-date" value="${paramMap.mortgageFileSubmitBankDateStart}">
                                <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="mortgageFileSubmitBankDateEnd" id="search-end-date" value="${paramMap.mortgageFileSubmitBankDateEnd}">
                            </div>
                        </div>
                    <div class="form-group">
                        <label class="control-label label">银行</label>
                        <select class="form-control" id="search-bank" name="bankNameId">
                            <option value="">请选择贷款银行</option>
                            <c:forEach items="${bankList}" var="bank">
                                <option value="${bank.id}"
                                        <c:if test="${bank.id eq paramMap.bankNameId}">selected</c:if>
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
                    <th style="width:4%;">客户姓名</th>
                    <th style="width:8%;">客户身份证号</th>
                    <th style="width:6%;">机动车登记证书号</th>
                    <th style="width:6%;">抵押资料送交银行日期</th>
                    <th style="width:4%;">贷款金额(元)</th>
                    <th style="width:6%;">所属部门</th>
                    <th style="width:4%;">所属业务员</th>
                    <th style="width:6%;">放贷日期</th>
                    <th style="width:6%;">抵押车辆经办日期</th>
                    <th style="width:7%;">车牌号</th>
                    <th style="width:8%;">具体车型</th>
                    <th style="width:8%;">银行</th>
                    <th style="width:4%;">车型构成</th>
                    <th style="width:4%;">上牌地</th>
                    <th style="width:8%;">贷记卡号</th>
                    <th style="width:8%;">订单号</th>
                    <th style="width:8%;">操作人</th>
                    <th style="width:6%;">抵押登记日期</th>
                    <th style="width:6%;">车架号</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="20">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="registerLicenseNoInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">${item.registerLicenseNo}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageFileSubmitBankDate}" pattern="yyyy-MM-dd HH:mm"/></td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageCarDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">${item.plateNumber}</td>
                        <td class="cel">${item.carDetail}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <c:if test="${item.newOrOld==1}">
                                新车
                            </c:if>
                            <c:if test="${item.newOrOld==0}">
                                二手车
                            </c:if>
                        </td>
                        <td class="cel">${item.carLicenseProvince}</td>
                        <td class="cel">${item.bankCardNo}</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.mortgageCarPerson}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageProcessDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">${item.vinNo}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/registerLicenseNoList.js"></script>
</html>
