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
        <input  type="hidden" name="year" value="${paramMap.year}">
        <input  type="hidden" name="month" value="${paramMap.month}">
    </div>
    <form id="pagerForm" action="${ctx}/userDumpOutCheck/detail.action" method="post" style="margin:0;">
        <input  type="hidden" name="userId" value="${userId}">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                <a class="btn btn-sm btn-info" onclick="history.back(-1);">返回列表</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group" >
                        <label class="control-label label">业绩月份:</label>
                        <select class="form-control" id="search-select1" name="year" >
                        </select>
                        </div>
                     -
                    <div class="form-group" >
                        <select class="form-control" id="search-select2" name="month" >
                            <option value="">请选择月</option>
                        </select>
                    </div>
                    <div class="form-group">
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
                    <th style="width:2%"><input type="checkbox" class="checkAll"></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:5%;">年份</th>
                    <th style="width:5%;">月份</th>
                    <th style="width:8%;">贷款额(元)</th>
                    <th style="width:8%;">订单(笔)</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="6">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="salaryCheck" value="${item.userId}"></td>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.year}</td>
                        <td >${item.month}</td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney}" pattern="#,##0.00"/></td>
                        <td >${item.orderNum}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/personnelManage/creditPersonDetail.js"></script>
</html>
