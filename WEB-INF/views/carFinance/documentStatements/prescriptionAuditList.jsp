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
        <input type="hidden" name="auditStartTime" value="${paramMap.auditStartTime}"/>
        <input type="hidden" name="auditEndTime" value="${paramMap.auditEndTime}"/>
        <input type="hidden" name="finalAuditStartTime" value="${paramMap.finalAuditStartTime}"/>
        <input type="hidden" name="finalAuditEndTime" value="${paramMap.finalAuditEndTime}"/>
        <input type="hidden" name="waitingFileSubmitStartTime" value="${paramMap.waitingFileSubmitStartTime}"/>
        <input type="hidden" name="waitingFileSubmitEndTime" value="${paramMap.waitingFileSubmitEndTime}"/>
        <input type="hidden" name="waitingFileAuditStartTime" value="${paramMap.waitingFileAuditStartTime}"/>
        <input type="hidden" name="waitingFileAudiEndTime" value="${paramMap.waitingFileAudiEndTime}"/>
        <input type="hidden" name="bankName" value="${paramMap.bankName}"/>
        <input type="hidden" name="departmentName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="nameOrId" value="${paramMap.nameOrId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/prescriptionAudit/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-4  text-left">
                <shiro:hasPermission name="prescriptionAudit:exportprescriptionAudit">
                    <a data-toggle="modal" class="btn btn-success  btn-sm  exportPrescriptionAudit" >导出</a>
                </shiro:hasPermission>
                <c:if test="${ not empty countEntity}">
                    <label class="alert-warning">贷款金额(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${countEntity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                </c:if>
                <c:if test="${ not empty countEntity}">
                    <label class="alert-warning">合同价(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${countEntity.contractPrice/10000}" pattern="#,##0.00"/></code>
                </c:if>
                <label class="alert-warning">总数: </label>
                <code class="alert-info">${count}</code>
            </div>

            <div class="col-sm-8 text-right" >
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >初审审核时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="auditStartTime" id="auditStartTime" value="${paramMap.auditStartTime}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="auditEndTime" id="auditEndTime" value="${paramMap.auditEndTime}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >终审通过时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="finalAuditStartTime" id="finalAuditStartTime" value="${paramMap.finalAuditStartTime}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="finalAuditEndTime" id="finalAuditEndTime" value="${paramMap.finalAuditEndTime}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >候补资料提交时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="waitingFileSubmitStartTime" id="waitingFileSubmitStartTime" value="${paramMap.waitingFileSubmitStartTime}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="waitingFileSubmitEndTime" id="waitingFileSubmitEndTime" value="${paramMap.waitingFileSubmitEndTime}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-xs-3 control-label" >候补资料审核时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="waitingFileAuditStartTime" id="waitingFileAuditStartTime" value="${paramMap.waitingFileAuditStartTime}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="waitingFileAudiEndTime" id="waitingFileAudiEndTime" value="${paramMap.waitingFileAudiEndTime}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
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
                                            <c:forEach items="${departments}" var="department">
                                                <option value="${department.id}"
                                                        <c:if test="${department.id eq paramMap.departmentName}">selected</c:if>
                                                >${department.name}</option>
                                            </c:forEach>
                                        </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="nameOrId" class="form-control w-200" style="width:160px;"
                                           onkeyup="value=value.replace(/\s/g,'')"    placeholder="请输入客户姓名或身份证号或订单号" id="nameOrId" value="${paramMap.nameOrId}">
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
                    <th style="width:8%;">订单号</th>
                    <th style="width:4%;">客户姓名</th>
                    <th style="width:8%;">身份证号</th>
                    <th style="width:6%;">部门</th>
                    <th style="width:6%;">信贷专员</th>
                    <th style="width:4%;">初审通过时间</th>
                    <th style="width:6%;">终审通过时间</th>
                    <th style="width:4%;">候补资料提交时间</th>
                    <th style="width:6%;">候补资料审核时间</th>
                    <th style="width:6%;">审核员</th>
                    <th style="width:7%;">候补资料审核员</th>
                    <th style="width:8%;">公司垫付日期</th>
                    <th style="width:4%;">贷款额(元)</th>
                    <th style="width:4%;">合同价(元)</th>
                    <th style="width:8%;">订单状态</th>
                    <th style="width:8%;">银行</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="18">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="prescriptionAuditInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.finalAuditTime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.waitingFileSubmitTime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>
                      <td class="cel">
                          <fmt:formatDate value="${item.waitingFileAuditTime}" pattern="yyyy-MM-dd HH:mm"/>
                      </td>
                      <td class="cel">${item.orderRealname}</td>
                      <td class="cel">${item.waitFilerealname}</td>
                      <td class="cel">
                          <fmt:formatDate value="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd "/>
                      </td>
                      <td class="cel">
                          <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                      </td>
                      <td class="cel">
                          <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/>
                      </td>
                      <td class="cel">
                          <sl:OrderStatus showValue="${item.orderStatus}"/>
                      </td>
                      <td class="cel">${item.bankName}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/prescriptionAuditList.js"></script>
</html>
