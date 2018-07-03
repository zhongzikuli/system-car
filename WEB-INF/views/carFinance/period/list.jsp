<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>分期管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="depId" value="${paramMap.departmentId}">
		<input type="hidden" name="applyFlag" value="${paramMap.periodApplyFlag}">
		<input type="hidden" name="periodStatus" value="${paramMap.periodApplyStatus}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
	</div>
    <form id="pagerForm" action="${ctx}/applyPeriod/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="applyPeriod:refresh">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
            	<a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
            	<div class="btn-box animated fadeInRight">
            		<div class="row">
            			<div class="col-sm-7">
		                    <div class="form-group">
		                        <label class="col-xs-3 control-label">快捷搜索:</label>
		                        <div class="col-xs-8">
		                       		<input id="keyword" type="text" class="form-control" placeholder="客户姓名、身份证号、订单编号" name="keyword" value="${paramMap.keyword}">
		                        </div>
		                    </div>
            				<div class="form-group">
            					<label class="col-xs-3 control-label">申请分期:</label>
            					<div class="col-xs-8">
		                        	<select class="form-control" id="search-apply-period-flag" name="applyFlag">
		                                <option value="">请选择</option>
		                                <option value="1" <c:if test="${paramMap.periodApplyFlag == 1}"> selected="selected"</c:if> >已申请</option>
		                                <option value="0" <c:if test="${paramMap.periodApplyFlag == 0}"> selected="selected"</c:if> >未申请</option>
			                        </select>
		                        </div>
            				</div>
            			</div>
            			<div class="col-sm-5">
            				<div class="form-group">
            					<label class="col-xs-3 control-label">分期状态:</label>
            					<div class="col-xs-8">
		                        	<select class="form-control" id="search-apply-period-status" name="periodStatus">
		                                <option value="">请选择</option>
		                                <option value="1" <c:if test="${paramMap.periodApplyStatus == 1}"> selected="selected"</c:if> >申请成功</option>
		                                <option value="-1" <c:if test="${paramMap.periodApplyStatus == -1}"> selected="selected"</c:if> >申请失败</option>
		                                 <option value="2" <c:if test="${paramMap.periodApplyStatus == 2}"> selected="selected"</c:if> >申请中</option>
			                        </select>
		                        </div>
            				</div>
            				<%-- 只有公司级与单位管理员可以进行部门搜索 --%>
		                    <c:if test="${userLevel == 2 || userLevel == 3}">
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
			                                            <option selected="selected" value="${department.id}">${department.name}
			                                            </option>
			                                        </c:when>
			                                        <c:otherwise>
			                                            <option value="${department.id}">${department.name}</option>
			                                        </c:otherwise>
			                                    </c:choose>
			                                </c:forEach>
			                            </select>
		                            </div>
		                        </div>
		                    </c:if>
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
                        <th style="width:9%;">订单编号</th>
                        <th style="width:5%;">客户名称</th>
                        <th style="width:5%;">信贷专员</th>
                        <th style="width:8%;">部门</th>
                        <th style="width:11%;">贷款银行</th>
                        <th style="width:5%;">车型构成</th>
                        <th style="width:4%;">申请分期</th>
                        <th style="width:4%;">申请状态</th>
                        <th style="width:6%;">公司垫付日期</th>
                        <th style="width:4%;">申请分期时间</th>
                        <th style="width:3%;">申请分期成功时间</th>
                        <th style="width:3%;">申请分期退回时间</th>
                        <th style="width:6%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="15">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" name="auditCheckbox" class="checkOne" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">
                            	<c:if test="${item.newOrOld == 1}">
                            		<code class="alert-success">新车</code>
                            	</c:if>
                            	<c:if test="${item.newOrOld == 0}">
                            		<code class="alert-warning">二手车</code>
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${empty item.periodApplyFlag || item.periodApplyFlag == 0}">
                            		<code class="alert-warning">未申请</code>
                            	</c:if>
                            	<c:if test="${item.periodApplyFlag == 1}">
                            		<code class="alert-success">已申请</code>
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.periodApplyStatus == 0}">
                            		--
                            	</c:if>
                            	<c:if test="${item.periodApplyStatus == 1}">
                            		<code class="alert-success">分期申请成功</code>
                            	</c:if>
                            	<c:if test="${item.periodApplyStatus == -1}">
                            		<code class="alert-danger">分期申请失败</code>
                            	</c:if>
                            	<c:if test="${item.periodApplyStatus == 2}">
                            		<code class="alert-info">分期申请中</code>
                            	</c:if>
                            	<c:if test="${item.periodApplyStatus == 3}">
                            		<code class="alert-warning">分期申请退回</code>
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<sl:format type="date" show="${item.companyAdvanceDate}" pattern="yyyy-MM-dd"/>
                            </td>
                            <td class="cel">
                            	<sl:format type="date" show="${item.periodApplyTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                            	<c:if test="${empty item.periodApplySuccessTime}">
									--
                            	</c:if>
                            	<sl:format type="date" show="${item.periodApplySuccessTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.periodApplyStatus == 3}">
	                            	<sl:format type="date" show="${item.periodApplyBackTime}" pattern="yyyy-MM-dd HH:mm"/>
                            	</c:if>
                            </td>
                            <td>
                            	<c:if test="${empty item.periodApplyFlag || item.periodApplyFlag == 0}">
                            		<shiro:hasPermission name="applyPeriod:apply">
                            			<button data-id="${item.id}" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-success apply-btn">申请分期</button>
                            		</shiro:hasPermission>
                            	</c:if>
                            	<c:if test="${item.periodApplyFlag == 1 && item.periodApplyStatus == 3}">
                            		<shiro:hasPermission name="applyPeriod:apply">
                            			<button data-id="${item.id}" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-primary apply-btn">重新申请</button>
                            		</shiro:hasPermission>
                            	</c:if>
                            	<c:if test="${item.periodApplyFlag == 1 && item.periodApplyStatus == 2}">
	                            	<shiro:hasPermission name="applyPeriod:queryProcess">
	                            		<button data-id="${item.id}" class="btn btn-w-m btn-xs btn-warning query-process-btn">进度查询</button>
	                            	</shiro:hasPermission>
                            	</c:if>
                                <shiro:hasPermission name="applyPeriod:orderDetail">
                                    <a data-id="${item.id}" data-title="${item.realName}"  data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}" class="btn btn-info btn-xs detail"> <i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                </table>
                <%-- 分页表单参数 --%>
                <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
            <%-- end table-responsive --%>
        </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/period/list.js"></script>
</html>

