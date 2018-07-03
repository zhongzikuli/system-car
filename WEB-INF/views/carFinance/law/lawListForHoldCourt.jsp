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
			<input type="hidden" name="keyword" value="${paramMap.keyword}"/>
		</div>
		
		<form id="pagerForm" action="${ctx}/cfLaw/queryForLawHoldCourt.action" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>

			<div class="row">
				<div class="col-sm-3 ">
						<a data-toggle="modal" class="btn btn-warning btn-sm lawList">诉讼管理</a>
						<a data-toggle="modal"  class="btn btn-success btn-sm detailForLaw"><i class="fa fa-search-plus"></i>查看</a>
	        	</div>
				<div class="col-sm-9 text-right">
				<div class="form-inline">
					<div class="form-group">
		                       <label class=" control-label">快捷搜索:</label>
										<input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="keyword" value="${paramMap.keyword}">
		                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
		                         <a type="button" class="btn btn-warning btn-sm reset-btn">重置</a>
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
								<th style="width: 5%;">订单编号</th>
								<th style="width: 5%;">开庭日期</th>
								<th style="width: 8%;">客户姓名</th>
								<th style="width: 5%;">身份证号</th>
								<th style="width: 5%;">案号</th>
								<th style="width: 5%;">开庭法官姓名</th>
								<th style="width: 5%;">开庭法官电话</th>
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
									<td><input type="checkbox" name="lawInput"class="checkOne" data-id="${item.businessOrderAcceptId}" data-title="${item.customerName}"  data-href-list="${ctx}/cfLaw/queryLaw.action?businessOrderAcceptId=${item.businessOrderAcceptId}"  data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}&active=buyerInfo" name="law_input" value="${item.businessOrderAcceptId}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									<td class="cel">${item.orderNO}</td>
									<td class="cel">${item.courtDate}</td>
									<td class="cel">${item.customerName}</td>
									<td class="cel">${item.cardNo}</td>
									<td class="cel">${item.caseNo}</td>
									<td class="cel">${item.openJudgeName}</td>
									<td class="cel">${item.openJudgeTel}</td>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/law/lawListForHoldCourt.js"></script>
</html>