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
			<input type="hidden" name="depId" value="${paramMap.departmentId}"/>
			<input type="hidden" name="depIds" value="${paramMap.departmentIds}"/>
			<input type="hidden" name="month" value="${paramMap.yearMonth}">
			<input type="hidden" name="isOver" value="${paramMap.isOver}">
			<input type="hidden" name="bankId" value="${paramMap.bankId}">
			<input type="hidden" name="isTelException" value="${paramMap.isTelException}">
			<input type="hidden" name="trailCarStatus" value="${paramMap.trailCarStatus}">
			<input type="hidden" name="isLaw" value="${paramMap.isLaw}">
			<input type="hidden" name="keyword" value="${paramMap.keyword}">
			<input type="hidden" name="keywords" value="${paramMap.keywords}">
		</div>
		
		<form id="pagerForm" action="${ctx}/cfLaw/queryForLaw.action" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>

			<div class="row">
				<div class="col-sm-3 ">
						<a data-toggle="modal" class="btn btn-warning btn-sm lawList">诉讼管理</a>
						<a data-toggle="modal"  class="btn btn-success btn-sm detailForLaw"><i class="fa fa-search-plus"></i>查看</a>
	        	</div>
				<div class="col-sm-9">
					<div class="form-inline">
						<div class="form-group">
	                        <label class="control-label label">部门:</label> 
	                        <select class="form-control" id="search-deparment-names" name="depIds">
								<option value="">请选择</option>
									<c:forEach var="department" items="${departments}" varStatus="dp">
										<c:choose>
											<c:when test="${null == paramMap.departmentIds}">
												<option value="${department.id}">${department.name}</option>
											</c:when>
											<c:when test="${paramMap.departmentIds == department.id}">
												<option selected="selected" value="${department.id}">${department.name}</option>
											</c:when>
											<c:otherwise>
												<option value="${department.id}">${department.name}</option>
											</c:otherwise>
										</c:choose>
									</c:forEach>
							</select>
						</div>
                        <div class="form-group">
	                        <label class="control-label label">快捷搜索:</label>
	                        <input id="keywords" type="text" class="form-control w-200" placeholder="请输入客户姓名或身份证号"
	                        		 name="keywords" value="${paramMap.keywords}">
	                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
	                         <a type="button" class="btn btn-info  btn-sm resets-btn">重置</a>
	                          <a class="btn btn-primary btn-sm btn-search">高级查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                    </div>
					</div>
					
						<div class="btn-box animated fadeInRight">
							<div class="row">
								<div class="col-sm-7">
									<div class="form-group">
										<label class="col-xs-3 control-label">逾期银行:</label>
										<div class="col-xs-8">
											<select name="bankId" class="form-control" id="bank-id">
												<option value="">请选择</option>
												<c:forEach items="${banks}" var="bank">
													<option <c:if test="${paramMap.bankId == bank.id}"> selected="selected"</c:if> value="${bank.id}">${bank.bankName}</option>
												</c:forEach>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">逾期月份:</label>
										<div class="col-xs-8">
											<input type="hidden" id="year-month-hidden" value="${paramMap.yearMonth}">
											<select name="month" class="form-control" id="search-month">
												<option value="">请选择</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">电催异常:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-tel-exception" name="isTelException">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isTelException == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isTelException == 1}"> selected="selected"</c:if> >是</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">部门:</label>
											<div class="col-xs-8">
						                        <select class="form-control" id="search-deparment-name" name="depId">
													<option value="">请选择</option>
														<c:forEach var="department" items="${departments}" varStatus="dp">
															<c:choose>
																<c:when test="${null == paramMap.departmentId}">
																	<option value="${department.id}">${department.name}</option>
																</c:when>
																<c:when test="${paramMap.departmentId == department.id}">
																	<option selected="selected" value="${department.id}">${department.name}</option>
																</c:when>
																<c:otherwise>
																	<option value="${department.id}">${department.name}</option>
																</c:otherwise>
															</c:choose>
														</c:forEach>
												</select>
											</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">首期逾期:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-frist-overdue" name="isFirstOverdue">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isFirstOverdue == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isFirstOverdue == 1}"> selected="selected"</c:if> >是</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-sm-5">
									<div class="form-group">
										<label class="col-xs-3 control-label">拖车状态:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-trail-car-status" name="trailCarStatus">
												<option value="">请选择</option>
												<option value="1" <c:if test="${paramMap.trailCarStatus == 1}">selected</c:if>>已拖车</option>
					                            <option value="2" <c:if test="${paramMap.trailCarStatus == 2}">selected</c:if>>已结清</option>
					                            <option value="3" <c:if test="${paramMap.trailCarStatus == 3}">selected</c:if>>其他</option>
					                            <option value="4" <c:if test="${paramMap.trailCarStatus == 4}">selected</c:if>>提交报备</option>
					                            <option value="5" <c:if test="${paramMap.trailCarStatus == 5}">selected</c:if>>移交拖车</option>
					                            <option value="6" <c:if test="${paramMap.trailCarStatus == 6}">selected</c:if>>关注还款</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">诉讼:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-law" name="isLaw">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isLaw == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isLaw == 1}"> selected="selected"</c:if> >是</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">是否销账:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-over" name="isOver">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isOver == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isOver == 1}"> selected="selected"</c:if> >是</option>
											</select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-3 control-label">快捷搜索:</label>
									<div class="col-xs-8">
										<input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="keyword" value="${paramMap.keyword}">
									</div>
								</div>
								<div class="form-group group-btn">
									<button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
								<th style="width: 2%;"><input type="checkbox"
									class="checkAll" name="checkedAll"></th>
								<th style="width: 2%;">序号</th>
								<th style="width: 5%;">首期逾期</th>
								<th style="width: 5%;">电催异常</th>
								<th style="width: 5%;">拖车状态</th>
								<th style="width: 5%;">诉讼</th>
								<th style="width: 5%;">销账</th>
								<th style="width: 12%;">订单编号</th>
								<th style="width: 12%;">客户姓名</th>
								<th style="width: 12%;">身份证号</th>
								<th style="width: 8%;">贷款金额</th>
								<th style="width: 10%;">车型</th>
								<th style="width: 12%;">更新时间</th>
								<!-- <th style="width: 15%;">操作</th> -->
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="14">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<td><input type="checkbox"  name="lawInput"class="checkOne" data-id="${item.businessOrderAcceptId}" data-title="${item.customerName}"  data-href-list="${ctx}/cfLaw/queryLaw.action?businessOrderAcceptId=${item.businessOrderAcceptId}"  data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}&active=buyerInfo" name="law_input" value="${item.businessOrderAcceptId}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
							<td class="cel">
								<c:if test="${item.isFirstOverdue == 1}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isFirstOverdue == 0}">
									<code class="alert-success">否</code>
								</c:if>
								<c:if test="${empty item.isFirstOverdue}">--</c:if>
							</td>
							
							<td class="cel">
								<c:if test="${item.isTelException gt 0}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isTelException == 0}">
									<code class="alert-success">否</code>
								</c:if>
								<c:if test="${empty item.isTelException}">
									--
								</c:if>
							</td>
							
							
							<td class="cel">
										<c:if test="${'1' eq item.trailCarStatus}"><code class="alert-success">已拖车</code></c:if> 
										<c:if test="${'2' eq item.trailCarStatus}"><code class="alert-warning">已结清</code></c:if>
										<c:if test="${'3' eq item.trailCarStatus}"><code class="alert-warning">其他</code></c:if>
										<c:if test="${'4' eq item.trailCarStatus}"><code class="alert-warning">提交报备</code></c:if>
		                                <c:if test="${'5' eq item.trailCarStatus}"><code class="alert-warning">移交拖车</code></c:if>
		                                <c:if test="${'6' eq item.trailCarStatus}"><code class="alert-warning">关注还款</code></c:if>
		                                <c:if test="${empty item.trailCarStatus}">--</c:if>
							</td>
							
							<td class="cel">
								<c:if test="${item.isLaw gt 0}">
									<code >是</code>
								</c:if>
								<c:if test="${item.isLaw == 0}">
									<code class="alert-success">否</code>
								</c:if>
							</td>
							
							<td class="cel">
								<c:if test="${item.isOver == 0 }">
									<code>未销账</code>
								</c:if>
								<c:if test="${item.isOver == 1 }">
									<code class="alert-success">已销账</code>
								</c:if>
								<c:if test="${item.isOver == 2 }">
									<code class="alert-warning">已垫款</code>
								</c:if>
								<c:if test="${empty item.isOver}">
									--
								</c:if>
							</td>
									<td class="cel">${item.orderNO}</td>
									<td class="cel">${item.customerName}</td>
									<td class="cel">${item.cardNo}</td>
									<td class="cel">${item.loanMoney}</td>
									<td class="cel">${item.carBrandName}</td>
									
									
									<td class="cel">
								<sl:format type="date" show="${item.mtime}" pattern="yyyy-MM-dd HH:mm"/>
							</td>
									
										<%-- <td>
											<c:if
												test="${item.isvalid != 0}">
												<shiro:hasPermission name="CfLaw:view">
													<a    class="btn btn-w-m btn-xs btn-danger" href="${ctx}/cfLaw/queryLaw.action?businessOrderAcceptId=${item.businessOrderAcceptId}"><i></i>诉讼</a>
												</shiro:hasPermission>
												<shiro:hasPermission name="order:view">
				                                    <a  href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}&active=buyerInfo&goBackUrl=${ctx}/financial/queryForLaw.action"
				                                       class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
	                                			</shiro:hasPermission>
											</c:if>
										</td> --%>
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
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/law/list.js"></script>
</html>