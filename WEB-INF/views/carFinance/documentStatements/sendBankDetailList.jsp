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
        <input type="hidden" name="bankNameId" value="${paramMap.bankNameId}"/>
        <input type="hidden" name="realName" value="${paramMap.realName}"/>
    </div>
    <form id="pagerForm" action="${ctx}/sendBankDetail/queryNew.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-4  text-left">
               <shiro:hasPermission name="sendBankDetail:exportSendBankDetail">
                <a data-toggle="modal" class="btn btn-success  btn-sm exportSendBankDetail" >导出</a>
               </shiro:hasPermission>
                <c:if test="${ not empty ReportEntity}">
                    <label class="alert-warning">贷款额(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${ReportEntity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                    <label class="alert-warning">合同价(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${ReportEntity.contractPrice/10000}" pattern="#,##0.00"/></code>
                </c:if>
                <label class="alert-warning">总数: </label>
                <code class="alert-info">${count}</code>
            </div>
            <div class="col-sm-8 text-right">
                <div class="form-inline">
                    <div class="form-group" >
                        <label class="control-label label" >操作员:</label>
                        <div class="input-group">
                            <select class="form-control" id="realName" name="realName">
                                <option value="">请选择操作员</option>
                                <c:forEach items="${realNameList}" var="realName">
                                    <option value="${realName.id}"
                                            <c:if test="${realName.id eq paramMap.realName}">selected</c:if>
                                    >${realName.realname}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
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
                    <th style="width:4%;">信贷专员</th>
                    <th style="width:8%;">上级部门</th>
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
                    <th style="width:8%;">产品类型</th>
                    <th style="width:8%;">上牌地</th>
                    <th style="width:4%;">车型构成</th>
                    <th style="width:6%;">公司垫付日期</th>
                    <th style="width:6%;">财务复核日期</th>
                    <th style="width:6%;">贷款合同齐全日期</th>
                    <th style="width:6%;">送交银行日期</th>
                    <th style="width:4%;">审核员</th>
                    <th style="width:4%;">操作员</th>
                    <th style="width:4%;">贷款年限(月)</th>
                    <th style="width:4%;">合同价(元)</th>
                    <th style="width:6%;">银行放款日期</th>

                    <th style="width:6%;">配偶姓名</th>
                    <th style="width:6%;">配偶身份证号</th>
                    <th style="width:6%;">担保人一姓名</th>
                    <th style="width:6%;">担保人一共还人类别</th>
                    <th style="width:6%;">担保人一身份证号</th>
                    <th style="width:6%;">担保人二姓名</th>
                    <th style="width:6%;">担保人二共还人类别</th>
                    <th style="width:6%;">担保人二身份证号</th>
                    <th style="width:6%;">担保人三姓名</th>
                    <th style="width:6%;">担保人三共还人类别</th>
                    <th style="width:6%;">担保人三身份证号</th>
                    <th style="width:6%;">担保人四姓名</th>
                    <th style="width:6%;">担保人四共还人类别</th>
                    <th style="width:6%;">担保人四身份证号</th>

                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="41">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="sendBankDetailInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.parentDepName}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">${item.vinNo}</td>
                        <td class="cel">${item.buyerFamilyAddressProvince}
                        </td>
                        <td class="cel">${item.buyerCompanyName}</td>
                        <td class="cel">${item.carDetail}</td>
                        <td class="cel">${item.engineNo}</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.productName}</td>
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
                            <fmt:formatDate value="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.advanceTime}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.loanContractAllDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">${item.auditAuditer}</td>
                        <td class="cel">${item.operationingLoginNameContractPrint}</td>
                        <td class="cel">${item.loanPeriodMonth}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd "/>
                        </td>


                        <td class="cel">${item.wifeName}</td>
                        <td class="cel">${item.wifeCardNo}</td>

                        <td class="cel">${item.sponsor1RealName}</td>
                        <td class="cel">
                            <c:if test="${item.sponsor1sharedType==1}">
                                内部担保人
                            </c:if>
                            <c:if test="${item.sponsor1sharedType==2}">
                                送行共还人
                            </c:if>
                        </td>
                        <td class="cel">${item.sponsor1CardNo}</td>

                        <td class="cel">${item.sponsor2RealName}</td>
                        <td class="cel">
                            <c:if test=" ${item.sponsor2sharedType==1}">
                                内部担保人
                            </c:if>
                            <c:if test=" ${item.sponsor2sharedType==2}">
                                送行共还人
                            </c:if>
                        </td>
                        <td class="cel">${item.sponsor2CardNo}</td>

                        <td class="cel">${item.sponsor3RealName}</td>
                        <td class="cel">
                            <c:if test=" ${item.sponsor3sharedType==1}">
                                内部担保人
                            </c:if>
                            <c:if test=" ${item.sponsor3sharedType==2}">
                                送行共还人
                            </c:if>
                        </td>
                        <td class="cel">${item.sponsor3CardNo}</td>

                        <td class="cel">${item.sponsor4RealName}</td>
                        <td class="cel">
                            <c:if test=" ${item.sponsor4sharedType==1}">
                                内部担保人
                            </c:if>
                            <c:if test=" ${item.sponsor4sharedType==2}">
                                送行共还人
                            </c:if>
                        </td>
                        <td class="cel">${item.sponsor4CardNo}</td>

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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/sendBankDetailList.js"></script>
</html>
