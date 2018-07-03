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
        <input  type="hidden" name="id" value="${id}">
        <input  type="hidden" name="operatorType" value="${paramMap.operatorType}">
        <input  type="hidden" name="operatorTimeStart" value="${paramMap.operatorTimeStart}">
        <input  type="hidden" name="operatorTimeEnd" value="${paramMap.operatorTimeEnd}">
        <input  type="hidden" name="orderNo" value="${paramMap.orderNo}">
    </div>
    <form id="pagerForm" action="${ctx}/moneyPackage/detail.action" method="post" style="margin:0;">
        <input  type="hidden" name="id" value="${id}">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                <a class="btn btn-sm btn-info" onclick="history.back(-1);">返回列表</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">操作类型:</label>
                        <select class="form-control" id="search-select" name="operatorType" >
                            <option value="">请选择操作类型</option>
                            <option value="1" <c:if test="${paramMap.operatorType == '1'}">selected</c:if>>打款</option>
                            <option value="2" <c:if test="${paramMap.operatorType == '2'}">selected</c:if>>放款</option>
                            <option value="3" <c:if test="${paramMap.operatorType == '3'}">selected</c:if>>撤回打款</option>
                            <option value="4" <c:if test="${paramMap.operatorType == '4'}">selected</c:if>>撤回银行放款</option>
                            <option value="5" <c:if test="${paramMap.operatorType == '5'}">selected</c:if>>过期</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">操作时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="operatorTimeStart"
                                   id="operatorTimeStart" value="${paramMap.operatorTimeStart}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="operatorTimeEnd"
                                   id="operatorTimeEnd" value="${paramMap.operatorTimeEnd}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="orderNo" class="form-control w-200" onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="订单编号" id="orderNo" value="${paramMap.orderNo}">
                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">订单编号</th>
                    <th style="width:8%;">资产余额(元)</th>
                    <th style="width:8%;">操作类型</th>
                    <th style="width:8%;">金额(元)</th>
                    <th style="width:5%;">收入/支出</th>
                    <th style="width:5%;">操作人员</th>
                    <th style="width:5%;">操作时间</th>
                    <th style="width:2%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="9">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.orderNo}</td>
                        <td >
                            <sl:format type="number" show="${item.remainingMoney}" pattern="#,##0.00"/></td>
                        </td>
                        <td >
                            <c:if test="${item.operatorType == 1}">打款</c:if>
                            <c:if test="${item.operatorType == 2}">放款</c:if>
                            <c:if test="${item.operatorType == 3}">撤回打款</c:if>
                            <c:if test="${item.operatorType == 4}">撤回银行放款</c:if>
                            <c:if test="${item.operatorType == 5}">过期</c:if>
                        </td>
                        <td >
                            <sl:format type="number" show="${item.executeMoney}" pattern="#,##0.00"/></td>
                        </td>
                        <td >
                            <c:if test="${item.feeType == 1}">收入</c:if>
                            <c:if test="${item.feeType == 0}">支出</c:if>
                        </td>
                        <td >${item.operatorRealName}</td>
                        <td >
                            <fmt:formatDate value="${item.operatorTime}" pattern="yyyy-MM-dd HH:mm "/>
                        </td>
                        <td>
                            <a  data-id="${item.businessOrderAcceptId}" class="btn btn-info btn-xs jumpDetail"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/moneyPackageCentre/moneyPackageDetail.js"></script>
</html>
