<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
<div id="hiddenForm">
			<input type="hidden" name="keyword" value="${keyword}" />
			<input type="hidden" name="startDate" value="${startDate}" />
			<input type="hidden" name="endDate" value="${endDate}" />
		</div>
    <form id="pagerForm" action="${ctx}/customerForCarsPerson/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">

				<div class="col-sm-12">
					<div class="form-inline">
						<div class="form-group">
							<label class="control-label label">搜索:</label>
							<input type="text" name="keyword" class="form-control"  placeholder="请输入客户姓名或手机号"  onkeyup="value=value.replace(/\s/g,'')"  id="keyword" value="${keyword}"/>
						</div>
						<div class="form-group">
							<label class="control-label label">申请日期:</label>
							<div class="input-group">
								<input type="text" class="form-control" name="startDate"
									   id="startDate" value="${startDate}"/>
								<span class="input-group-addon">-</span>
								<input type="text" class="form-control" name="endDate"
									   id="endDate" value="${endDate}"/>
							</div>
							<button type="button" class="btn  btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索</button>
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
								<th style="width: 2%;"><input type="checkbox"class="checkAll" name="checkedAll"></th>
								<th style="width:2%;">序号</th>
								<th style="width:5%;">客户姓名</th>
			                    <th style="width:10%;">手机号</th>
								<th style="width:10%;">购车城市</th>
								<th style="width:10%;">车型</th>
								<th style="width:19%;">申请备注</th>
								<th style="width:5%;">申请时间</th>
								<th style="width:19%;">备注</th>
			                    <th style="width:5%;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="10">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<td><input type="checkbox" class="checkOne"
										name="customer_input" value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>

									<td class="cel " title="${item.name}">${item.name}</td>
									<td class="cel ">${item.tel}</td>
									<td class="cel ">${item.city}</td>
									<td class="cel "style="max-width: 60px"  title="${item.carType}">${item.carType}</td>
									<td class="cel"  title="${item.customerBak}" style="max-width: 200px">${item.customerBak}</td>
									<td class="cel "><fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
									<td class="cel" title="${item.remark}" style="max-width: 200px">${item.remark}</td>
									<td>
										<shiro:hasPermission name="customerForCars:updateRemark">
										<a href="#"  date-id="${item.id}"  data-remark="${item.remark}" class="btn btn-primary btn-xs edit-btn"><i class="fa fa-edit"></i>编辑</a>
										</shiro:hasPermission>
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
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/customer/customerForCarsToPerson.js"></script>
<script type="text/template" title="备注" id="distribute-dialog">
	<div class="ibox-content">
		<form id="fileCreateForm" class="form-horizontal">
			<div class="form-group">
				<label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
				<div class="col-xs-8">
		             	<textarea rows="5" cols="150" type="text" class="form-control" id="remark"
								  name="remark" tip="备注" check="validYearSet(this)" value=""></textarea>
				</div>
			</div>
		</form>
		<div class="dialog-manage">
			<a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
			<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
		</div>
	</div>
</script>




