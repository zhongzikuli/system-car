<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="searchRechargeName" value="${paramMap.realName}"/>
        <input type="hidden" name="searchRechargeOrgName" value="${paramMap.orgName}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}"/>
        <input type="hidden" name="endDate" value="${paramMap.endDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/consume/listForRecharge.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>

        <div class="row">
            <div class="col-sm-12">
                <div class="form-inline">
                    <div class="form-group" id="date-time">
                        <label class="control-label label">充值时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate"
                                   id="search-recharge-start-date" value="${paramMap.startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate"
                                   id="search-recharge-end-date" value="${paramMap.endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">用户姓名:</label>
                        <input type="text" class="form-control" name="searchRechargeName" id="search-recharge-name"
                               value="${paramMap.realName}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label"><span class="red"></span>公司名称:</label>
                        <input type="text" class="form-control" name="searchRechargeOrgName"
                               id="search-recharge-OrgName" value="${paramMap.orgName}"/>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                        <th style="width:5%;">用户账号</th>
                        <th style="width:5%;">用户姓名</th>
                        <th style="width:5%;">充值金额（元）</th>
                        <th style="width:10%;">手机号码</th>
                        <th style="width:12%;">所属单位</th>
                        <th style="width:5%;">充值者</th>
                        <th style="width:12%;">充值时间</th>
                        <th style="width:15%;">备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr target="sid_user" rel="${item.id}">
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>${item.loginName}</td>
                            <td>${item.userName} </span></td>
                            <td>
                            <fmt:formatNumber value="${item.money}" pattern="0.00"/>
                            </td>
                            <td>${item.tel}</td>
                            <td>${item.orgName}</td>
                            <td>${item.rechargeMan}</td>
                            <td>
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </td>
                            <td class="cel max-200" title="${item.remark}">${item.remark}</td>
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

<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/recharge/list.js"></script>
</html>
