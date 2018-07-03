<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>待审中心</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="startDate" value="${paramMap.startDate}">
		<input type="hidden" name="endDate" value="${paramMap.endDate}">
		<input type="hidden" name="depId" value="${paramMap.departmentId}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
	</div>
    <form id="pagerForm" action="${ctx}/audit/queryForAuditing.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="auditWaiting:change">
                    <a class="btn btn-primary btn-sm change-audit-btn">换审核</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="auditWaiting:discard">
                    <a class="btn btn-danger btn-sm discard-audit-btn">作废</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="auditWaiting:refresh">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
            	<a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
            	<div class="btn-box animated fadeInRight">
            		<div class="row">
            			<div class="col-sm-7">
            				<c:if test="${not empty paramMap.isDepart && paramMap.isDepart ==1 }">
		                        <div class="form-group">
			                        <label class="col-xs-3 control-label">初审提交时间:</label>
			                        <div class="col-xs-8">
			                        	<div class="input-group">
				                            <input type="text" class="form-control" name="subStartDate" id="search-submit-start-date" value="${paramMap.subStartDate}"/>
				                            <span class="input-group-addon">到</span>
				                            <input type="text" class="form-control" name="subEndDate" id="search-submit-end-date" value="${paramMap.subEndDate}"/>
			                        	</div>
			                        </div>
			                    </div>
	                        </c:if>
	                        <c:if test="${empty paramMap.isDepart }">
	            				<div class="form-group">
			                        <label class="col-xs-3 control-label">终审提交时间:</label>
			                        <div class="col-xs-8">
			                        	<div class="input-group">
				                            <input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}"/>
				                            <span class="input-group-addon">到</span>
				                            <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}"/>
			                        	</div>
			                        </div>
			                    </div>
	                        </c:if>
		                   
		                    <div class="form-group">
		                        <label class="col-xs-3 control-label">快捷搜索:</label>
		                        <div class="col-xs-8">
		                       		<input id="keyword" type="text" class="form-control" placeholder="支持客户姓名、身份证号、订单编号" name="keyword" value="${paramMap.keyword}">
		                        </div>
		                    </div>
            			</div>
            			<div class="col-sm-5">
            				<%--
            				<div class="form-group">
            					<label class="col-xs-3 control-label">订单编号:</label>
            					<div class="col-xs-8">
		                        	<input id="orderNo" type="text" class="form-control" placeholder="请输入订单编号" name="orderNo" value="${paramMap.orderNo}">
		                        </div>
            				</div>
            				 --%>
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
                        <th style="width:5%;">占位</th>
                        <th style="width:5%;">审核员</th>
                        <%-- <th style="width:9%;">订单编号</th> --%>
                        <th style="width:7%;">客户名称</th>
                        <th style="width:5%;">信贷专员</th>
                        <th style="width:8%;">部门</th>
                        <th style="width:12%;">贷款银行</th>
                        <%--
                        <th style="width:12%;">经销商</th>
                         --%>
                        <th style="width:5%;">订单状态</th>
                        <%-- <th style="width:4%;">候补资料</th>--%>
                        <th style="width:6%;">贷款金额(元)</th>
                        <th style="width:8%;">车型</th>
                        <c:if test="${not empty paramMap.isDepart && paramMap.isDepart ==1 }">
                        	<th style="width:7%;">初审单提交时间</th>
                        </c:if>
                        <c:if test="${empty paramMap.isDepart }">
                        	<th style="width:7%;">终审提交时间</th>
                        </c:if>
                        <th style="width:9%;">操作</th>
                        <th style="width:4%;">车辆年限</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="17">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" name="auditCheckbox" class="checkOne" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel used">
                                <c:if test="${not empty item.operationingLoginName}">
                                    <code>${item.operationingLoginName}</code>
                                </c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${empty item.auditUserName}">--</c:if> 
                            	<c:if test="${not empty item.auditUserName}">${item.auditUserName}</c:if>
                            </td>
                            <%-- <td class="cel">${item.orderNo}</td> --%>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <%--
                            <td class="cel">${item.dealerName}</td>
                             --%>
                            <td class="cel">${item.orderStatusName}</td>
                            <%-- <td class="cel">
                                <c:if test="${item.isWaitingFile == 1}">
                                    <c:choose>
										<c:when test="${ item.waitingFileStatus == -4}">
											<code class="alert-success">审核拒绝</code>
										</c:when>
										<c:when test="${ item.waitingFileStatus == -3}">
											<code class="alert-warning">审核作废</code>
										</c:when>
										<c:when test="${ item.waitingFileStatus == -2}">
											<code class="alert-error">审核退回</code>
										</c:when>
										<c:when test="${item.waitingFileStatus == 0}">
											<code>待提交</code>
										</c:when>
										<c:when test="${ item.waitingFileStatus == 1}">
											<code class="alert-info">已提交</code>
										</c:when>
										<c:when test="${ item.waitingFileStatus == 2}">
											<code class="alert-success">审核通过</code>
										</c:when>
										<c:when test="${ item.waitingFileStatus == 3}">
											<code class="alert-warning">审核保存</code>
										</c:when>
									</c:choose>
                                </c:if>
                                <c:if test="${item.isWaitingFile != 1}">
                                    --
                                </c:if>
                            </td> --%>
                            <td class="cel">
                                <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                            </td>
                            
                            <td class="cel">
                                <c:if test="${item.newOrOld == 1 }">
                                	<code class="alert-success">新车</code>
                                </c:if>
                                 <c:if test="${item.newOrOld == 0 }">
                                	<code class="alert-warning">二手车</code>
                                </c:if>
                            </td>
                            
                            <td class="cel">
                             	<c:if test="${not empty paramMap.isDepart && paramMap.isDepart ==1 }">
		                        	<sl:format type="date" show="${item.orderSubmitTime}" pattern="yyyy-MM-dd HH:mm"/>
		                        </c:if>
		                        <c:if test="${empty paramMap.isDepart }">
		                        	<sl:format type="date" show="${item.firstAuditTime}" pattern="yyyy-MM-dd HH:mm"/>
		                        </c:if>
                            </td>
                            <td>
                                <shiro:hasPermission name="auditWaiting:audit">
                                	<c:if test="${item.nodeRemark == '初审单审核' }">
	                                    <a data-id="${item.id}" type="button" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-success audit-btn" data-from="${ctx}/audit/queryForAuditing.action?id=${item.id}">${item.nodeRemark}</a>
                                	</c:if>
                                	<c:if test="${item.nodeRemark == '审核员审核' }">
	                                    <a data-id="${item.id}" type="button" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-primary audit-btn" data-from="${ctx}/audit/queryForAuditing.action?id=${item.id}">${item.nodeRemark}</a>
                                	</c:if>
                                	<c:if test="${item.nodeRemark == '审核经理审核' }">
	                                    <a data-id="${item.id}" type="button" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-warning audit-btn" data-from="${ctx}/audit/queryForAuditing.action?id=${item.id}">${item.nodeRemark}</a>
                                	</c:if>
                                	<c:if test="${item.nodeRemark != '审核员审核' && item.nodeRemark != '审核经理审核' && item.nodeRemark != '初审单审核'}">
                                		<a data-id="${item.id}" type="button" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-info audit-btn" data-from="${ctx}/audit/queryForAuditing.action?id=${item.id}">${item.nodeRemark}</a>
                                	</c:if>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="order:view">
                                    <a data-id="${item.id}" data-title="${item.realName}"  data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}" class="btn btn-info btn-xs detail"> <i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>
                            </td>
                            <td class="cel">
                                <sl:formatMortgageDate type="date" value="${item.initRegisterDate}" compare="${carYearLimit}"/>
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
<script type="text/template" title="作废订单" id="discard-order-dialog">
<div class="ibox-content">
	<form id="discardOrderForm" class="form-horizontal">
		<div class="form-group mr-none">
			<div class="col-sm-12">
				<label class="col-sm-2 control-label"><span class="red">*</span>备注:</label>
				<div class="col-sm-10">
					<textarea id="discardDescription" class="form-control" check="validateLength100Bak(this)"  tip="长度不能超过100个字符" obj="not_null" value=""></textarea>
					<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">100</font></code>个</span>
				</div>
			</div>
		</div>
		<div class="form-group mr-none">
			<div class="col-sm-12">
				<label class="col-sm-2 control-label">审核人:</label>
				<div class="col-sm-4">
					<p class="form-control-static text-left">${auditUser}</p>
				</div>
				<label class="col-sm-3 control-label">审核日期:</label>
				<div class="col-sm-3">
					<p class="form-control-static text-left">${auditDate}</p>
				</div>
			</div>
		</div>
	</form>
	<div class="dialog-manage" id="CreateBtn">
		<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
		<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
	</div>
</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/waitingList.js"></script>
</html>

