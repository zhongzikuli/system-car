<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
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
			<input type="hidden" name="title" id="title" value="${paramMap.title}"/>
		</div>
		
		<form id="pagerForm" action="${ctx}/news/query.action" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>

			<div class="row">
				<div class="col-sm-2">
					<shiro:hasPermission name="news:create">
						<a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
					</shiro:hasPermission>
					<shiro:hasPermission name="news:delete">
						<a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
					</shiro:hasPermission>
				</div>

				<div class="col-sm-10">
					<div class="form-inline">
						<div class="form-group">
	                        <label class="control-label label">类型:</label>
					                        <sl:select name="type" classValue="form-control type" classType="640000"
                                       defaultValue="true" id="type" keyWorld="${paramMap.type}"/>
                        </div>
                        <div class="form-group">
		                    <label class="control-label label">资讯标题:</label> 
							<input type="text" class="form-control" name="title" id="search-title" placeholder="" value="${paramMap.title}">
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
								<th style="width: 12%;">资讯标题</th>
								<th style="width: 12%;">阅读次数</th>
								<th style="width: 12%;">点赞数量</th>
								<th style="width: 12%;">收藏数量</th>
								<th style="width: 12%;">类型</th>
								<th style="width: 12%;">LOGO缩略图</th>
								<th style="width: 12%;">更新时间</th>
								<th style="width: 15%;">操作</th>
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
										name="news_input" value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									<td class="cel">${item.title}</td>
									<td class="cel">${item.readNumber}</td>
									<td class="cel">${item.upvoteNumber}</td>
									<td class="cel">${item.favoriteNumber}</td>
									<td class="cel"><sl:dict classType="640000" keyWorld="${item.type}"/></td>
								<td class="gallerys">
									<img width="60px" height="20px" alt="" src="${url}groupName=${item.fileGroup}&fileId=${item.filePath}" class="pre-img">
								</td>
								<td class="cel">${item.updateTime}</td>
									<td><c:if
											test="${item.isvalid != 0}">
											<shiro:hasPermission name="news:newsUpdate">
												<a href="#"  date-id=${item.id} class="btn btn-primary btn-xs edit-btn"  onclick="editNews('${item.id}')"><i class="fa fa-edit"></i>编辑</a>
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
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/system/news/list.js"></script>
</html>