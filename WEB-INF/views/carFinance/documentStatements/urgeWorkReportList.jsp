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
        <input type="hidden" name="urgeStartDate" value="${paramMap.urgeStartDate}"/>
        <input type="hidden" name="urgeEndDate" value="${paramMap.urgeEndDate}"/>
        <input type="hidden" name="bankNameId" value="${paramMap.bankNameId}"/>
        <input type="hidden" name="departmentNameId" value="${paramMap.departmentNameId}"/>
        <input type="hidden" name="nameOrId" value="${paramMap.nameOrId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/urgeWorkReport/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-3  text-left">
                 <shiro:hasPermission name="urgeWorkReport:exportUrgeWork">
                    <a data-toggle="modal" class="btn btn-success  btn-sm  exportUrgeWork" >导出</a>
                  </shiro:hasPermission>
               <c:if test="${ not empty reportEntity}">
                    <label class="alert-warning">月还款额(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${reportEntity.repayMonth/10000}" pattern="#,##0.00"/></code>
                    <label class="alert-warning">逾期金额(万元): </label>
                    <code class="alert-info"><sl:format type="number" show="${reportEntity.overdueMoney/10000}" pattern="#,##0.00"/></code>
                </c:if>
                <label class="alert-warning">总数: </label>
                <code class="alert-info">${count}</code>
            </div>
            <div class="col-sm-9 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label" >催缴时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" style="width:120px;" name="urgeStartDate" id="urgeStartDate" value="${paramMap.urgeStartDate}">
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" style="width:120px;" name="urgeEndDate" id="urgeEndDate" value="${paramMap.urgeEndDate}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">银行:</label>
                        <select class="form-control" id="search-bank" name="bankNameId">
                            <option value="">请选择贷款银行</option>
                            <c:forEach items="${bankList}" var="bank">
                                <option value="${bank.id}"
                                        <c:if test="${bank.id eq paramMap.bankNameId}">selected</c:if>
                                >${bank.bankName}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">部门:</label>
                        <select class="form-control" id="search-deparment-name" name="departmentNameId">
                            <option value="">请选择部门</option>
                            <c:forEach items="${departments}" var="department">
                                <option value="${department.id}"
                                        <c:if test="${department.id eq paramMap.departmentNameId}">selected</c:if>
                                >${department.name}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="nameOrId" class="form-control w-200" onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="请输入客户姓名或身份证号或订单编号" id="nameOrId" value="${paramMap.nameOrId}">
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
                    <th style="width:4%;">订单编号</th>
                    <th style="width:8%;">姓名</th>
                    <th style="width:6%;">部门</th>
                    <th style="width:6%;">卡号</th>
                    <th style="width:4%;">身份证号</th>
                    <th style="width:6%;">放款日期</th>
                    <th style="width:4%;">月还款额(元)</th>
                    <th style="width:6%;">逾期金额(元)</th>
                    <th style="width:7%;">银行</th>
                    <th style="width:8%;">催缴内容</th>
                    <th style="width:8%;">催缴日期</th>
                    <th style="width:8%;">催缴人</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="14">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="InputUrgeWork" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.customerName}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankCardNo}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd  "/>
                        </td>
                        <td class="cel">
                            <sl:format type="number" show="${item.repayMonth}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <sl:format type="number" show="${item.overdueMoney}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">${item.bankName}</td>
                        <td title="${item.urgeContent}" class="cel">${item.urgeContent}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.urgeDate}" pattern="yyyy-MM-dd  "/>
                        </td>
                        <td class="cel">${item.urgeWorkMan}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/urgeWorkReportList.js"></script>
</html>
