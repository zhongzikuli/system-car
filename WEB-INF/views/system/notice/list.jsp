<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<%@include file="/WEB-INF/views/include/inner_css.jsp"%>
	<link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
	<div class="mod_header">
		<div id="hiddenForm">
			<input type="hidden" name="type" value="${paramMap.type}" />
		</div>
		<form id="pagerForm" action="${ctx}/notice/query.action" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>

			<div class="row">
				<div class="col-sm-2">
					<shiro:hasPermission name="notice:create">
						<a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
					</shiro:hasPermission>
					<shiro:hasPermission name="notice:delete">
						<a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
					</shiro:hasPermission>
				</div>

				<div class="col-sm-10">
					<div class="form-inline">
						<div class="form-group">
							<label class="control-label label">公告标题:</label> 
							<input type="text" class="form-control" name="title" id="search-keyword" placeholder="" value="${paramMap.title}">
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
								<th style="width: 2%;"><input type="checkbox"
									class="checkAll" name="checkedAll"></th>
								<th style="width: 2%;">序号</th>
								<th style="width: 12%;">公告标题</th>
								<th style="width: 12%;">更新时间</th>
								<th style="width: 15%;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="5">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<td><input type="checkbox" class="checkOne"
										name="notice_input" value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									<td class="cel">${item.title}</td>
									<td class="cel">${item.updateTime}</td>
									<td><c:if
											test="${item.isvalid != 0}">
											<shiro:hasPermission name="notice:noticeUpdate">
												<a href="#" onclick="editNotice('${item.id}')"
													class="btn btn-primary btn-xs"><i class="fa fa-edit"></i>编辑</a>
											</shiro:hasPermission>
										</c:if></td>
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
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/system/notice/list.js"></script>
</html>