<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>恢复面签</title>
		<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	</head>
	<body>
		<div class="mod_header">
			<div id="hiddenForm">
				<input type="hidden" name="startDate" value="${paramMap.startDate}">
				<input type="hidden" name="endDate" value="${paramMap.endDate}">
				<input type="hidden" name="keyword" value="${paramMap.keyword}">
				<input type="hidden" name="status" value="${paramMap.status}">
			</div>
			<form id="pagerForm"  action="${ctx}/interview/listForRegain.action" method="post">
				<%@include file="/WEB-INF/views/include/pageForm.jsp" %>
				<div class="row">
					<div class="col-sm-2">
						<shiro:hasPermission name="interviewRegain:refresh">
							<a class="btn btn-success btn-sm refresh-btn">刷新</a>
						</shiro:hasPermission>
					</div>
					<div class="col-sm-10">
						<a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
						<div class="btn-box animated fadeInRight">
							<div class="row m-none">
								<div class="col-sm-7">
									<div class="form-group">
										<label class="col-xs-3  control-label label">申请日期:</label>
										<div class="col-xs-8 input-group">
											<input type="text" class="form-control" name="startDate" id="sTime" value="${paramMap.startDate}"/>
											<span class="input-group-addon">到</span>
											<input type="text" class="form-control" name="endDate" id="eTime" value="${paramMap.endDate}"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">面签状态:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-interview-status" name="status">
												<option value="">全部</option>
												<option value="1" <c:if test="${paramMap.status == 1}"> selected="selected"</c:if> >申请面签</option>
												<option value="2" <c:if test="${paramMap.status == 2}"> selected="selected"</c:if> >准备面签</option>
												<option value="3" <c:if test="${paramMap.status == 3}"> selected="selected"</c:if> >完成面签</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-sm-5">
									<div class="form-group">
										<label class="col-xs-3 control-label label">关键字:</label>
										<div class="col-xs-8">
											<input type="text" class="form-control w-200" name="keyword" id="search-keyword" placeholder="请输入客户姓名或身份证号" value="${paramMap.keyword}">
										</div>
									</div>
									<div class="form-group group-btn" style="margin-bottom: 10px;">
										<button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
										<button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
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
								<th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
								<th style="width:2%;">序号</th>
								<th style="width:12%;">贷款人姓名</th>
								<th style="width:16%;">身份证号</th>
								<th style="width:8%;">性别</th>
								<th style="width:10%;">手机号</th>
								<th style="width:10%;">客户经理</th>
								<th style="width:16%;">公司名</th>
								<th style="width:8%;">申请时间</th>
								<th style="width:6%;">面签状态</th>
								<th style="width:10%;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="11">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
								<tr>
									<td><input type="checkbox" name="checkbox" class="checkOne" value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
									<td class="cel used">
										${item.lender}
									</td>
									<td class="cel">
										${item.cardNo}
									</td>
									<td class="cel">${item.sex}</td>
									<td class="cel">${item.tel}</td>
									<td class="cel">${item.userName}</td>
									<td class="cel">${item.orgName}</td>
									<td class="cel">
										<sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.ctime}"/>
									</td>
									<td class="cel">
										<c:if test="${item.status eq 1}"> <code class="alert-info">申请面签</code> </c:if>
										<c:if test="${item.status eq 2}"> <code class="alert-primary">准备面签</code> </c:if>
										<c:if test="${item.status eq 3}"> <code class="alert-success">完成面签</code> </c:if>
									</td>
									<td>
										<shiro:hasPermission name="interviewRegain:recover">
											<a data-id="${item.id}" class="btn btn-info btn-xs recover-btn">恢复</a>
										</shiro:hasPermission>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
					<%-- 分页表单参数 --%>
					<%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
				</div>
				<%-- end table-responsive --%>
			</div>
		</div>
	</body>
	<%-- js库引入--%>
	<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
	<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
	<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
	<script type="text/javascript" src="${ctx}/js/mine/interview/listForRegain.js"></script>
</html>