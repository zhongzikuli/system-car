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
        <input type="hidden" name="searchName" value="${paramMap.searchName}"/>
        <input type="hidden" name="searchType" value="${paramMap.searchType}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}"/>
        <input type="hidden" name="endDate" value="${paramMap.endDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/consume/listForConsume.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">类别:</label>
                        <select class="form-control type" id="search-select" name="searchType" data-placeholder="消费类型...">
                            <option value="">请选择消费类型</option>
                            <c:forEach items="${ConsumeTypes }" var="type">
                                <option value="${type.keyWorld}"
                                <c:if test="${type.keyWorld eq paramMap.searchType}">selected</c:if>
                                >${type.valueDesc}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">消费时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate"
                                   id="search-conume-start-date" value="${paramMap.startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate"
                                   id="search-conume-end-date" value="${paramMap.endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">消费者:</label>
                        <input type="text" class="form-control" name="searchName" id="search-consume-name"
                               value="${paramMap.searchName}"/>
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
                        <th style="width:5%;">消费者</th>
                        <th style="width:5%;">类别</th>
                        <th style="width:10%;">消费金额（元）</th>
                        <th style="width:12%;">消费时间</th>
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
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>${item.userName}</td>
                            <c:if test="${item.systemType =='CJD'}">
                                <td>车鉴定</td>
                            </c:if>
                            <c:if test="${item.systemType =='PYZX'}">
                                <td>鹏元征信</td>
                            </c:if>
                            <td>
                                <fmt:formatNumber value="${item.money}" pattern="0.00"/>
                            </td>
                            <td>
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/>
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
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/consume/list.js"></script>
</html>