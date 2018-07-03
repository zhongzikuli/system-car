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
			<input type="hidden" value="${acceptId}" id="acceptId" name="acceptId"/>
			<input type="hidden" name="type" value="${paramMap.type}" />
			<input type="hidden" name="title" id="title" value="${paramMap.title}"/>
			<input type="hidden" name="lawerFee" id="lawerFee" value="${paramMap.lawerFee}"/>
		</div>
		
		<form id="pagerForm" action="${ctx}/cfLaw/queryLaw.action?businessOrderAcceptId=${acceptId}" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>

			<div class="row">
				<div class="col-sm-3">
					<shiro:hasPermission name="CfLaw:create">
						<a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
					</shiro:hasPermission>
					<shiro:hasPermission name="CfLaw:delete">
						<a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
					</shiro:hasPermission>
				</div>
				<div class="col-sm-9 text-right">
				<div class="form-inline">
					<div class="form-group">
		                        <label class="control-label label">律师费:</label>
			                        <select class="form-control" id="search-is-lawerFee" name="lawerFee">
										<option value="">请选择</option>
										<option value="2" <c:if test="${paramMap.lawerFee == 2}"> selected</c:if> >全部</option>
										<option value="1" <c:if test="${paramMap.lawerFee == 1}"> selected</c:if> >有</option>
										<option value="0" <c:if test="${paramMap.lawerFee == 0}"> selected</c:if> >无</option>
									</select>
		                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
		                         <a type="button" class="btn btn-warning btn-sm resets-btn">重置</a>
		            	<a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
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
								<th style="width: 5%;">客户姓名</th>
								<th style="width: 8%;">立案号</th>
								<th style="width: 5%;">诉讼本金</th>
								<th style="width: 5%;">案件状态</th>
								<th style="width: 5%;">开庭法官姓名</th>
								<th style="width: 5%;">开庭法官电话</th>
								<th style="width: 5%;">执行法官姓名</th>
								<th style="width: 5%;">执行法官电话</th>
								<th style="width: 5%;">备注</th>
								<th style="width: 5%;">更新时间</th>
								<th style="width: 15%;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="13">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<td><input type="checkbox" class="checkOne"
										name="law_input" value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									<td class="cel">${item.customerName}</td>
									<td class="cel">${item.caseNo}</td>
									<td class="cel">
                              		<fmt:formatNumber value="${item.lawMoney}" pattern="#,#00.00#"/>
                            		</td>
                            		<td class="cel">
										<c:if test="${item.caseStatus==1}"><code class="alert-warning">等待开庭</code></c:if> 
										<c:if test="${item.caseStatus==2}"><code class="alert-warning">已开庭待判决</code></c:if>
										<c:if test="${item.caseStatus==3}"><code class="alert-warning">已判决待执行</code></c:if>
										<c:if test="${item.caseStatus==4}"><code class="alert-warning">执行中，终结/终本</code></c:if>
									</td>
									<td class="cel">${item.openJudgeName}</td>
									<td class="cel">${item.openJudgeTel}</td>
									<td class="cel">${item.executeJudgeName}</td>
									<td class="cel">${item.executeJudgeTel}</td>
									<td title="${item.caseBak}" style="max-width:100px">${item.caseBak}</td>  
									<td class="cel">${item.updateTime}</td>
									<td><c:if
											test="${item.isvalid != 0}">
											<shiro:hasPermission name="CfLaw:edit">
												<a href="#"  date-id=${item.id} class="btn btn-primary btn-xs edit-btn"  onclick="editLaw('${item.id}')"><i class="fa fa-edit"></i>编辑</a>
											</shiro:hasPermission>
										</c:if>
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
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/law/lawList.js"></script>
</html>