<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>购车人列表</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" method="post">
        <div class="row">
            <div class="col-sm-6">
                <a data-toggle="modal" class="btn btn-primary btn-sm add-buyer" onclick="addShared('${acceptId}','${userType}','${ctx}/cfBusinessOrderAccept.action')">添加<c:if test="${userType eq 'SHARED'}">配偶</c:if><c:if test="${userType eq 'SPONSOR'}">担保人</c:if></a>
                <shiro:hasPermission name="shared:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm delete-buyer" onclick="deleteShared('${userType}','${acceptId}')">删除<c:if test="${userType eq 'SHARED'}">配偶</c:if><c:if test="${userType eq 'SPONSOR'}">担保人</c:if></a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-6 text-right">
                <div class="form-group">
                   	<a class="btn btn-sm btn-info" onclick="history.back(-1);">返回列表</a>
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
                        <th style="width: 2%"><input type="checkbox" class="checkAll"></th>
                        <%--<th>序号</th>--%>
                        <th style="width: 12%">姓名</th>
                        <th style="width: 20%">身份证</th>
                        <th style="width: 5%">性别</th>
                        <th style="width: 5%">年龄</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${buyer == null || buyer.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${buyer}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" value="${item.id}"></td>
                            <%--<td class="cel">${st.index+1}</td>--%>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel"><sl:idCard idCard="${item.cardNo}" type="sex"/></td>
                            <td class="cel"><sl:idCard idCard="${item.cardNo}" type="age"/></td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/buyer/list.js"></script>
</html>