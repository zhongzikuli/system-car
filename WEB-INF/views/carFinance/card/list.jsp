<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>工行开卡管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="depId" value="${paramMap.departmentId}">
		<input type="hidden" name="applyFlag" value="${paramMap.openCardApplyFlag}">
		<input type="hidden" name="openCardStatus" value="${paramMap.openCardStatus}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
	</div>
    <form id="pagerForm" action="${ctx}/bankCard/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="bankCard:refresh">
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
            					<label class="col-xs-3 control-label">开卡申请:</label>
            					<div class="col-xs-8">
		                        	<select class="form-control" id="search-open-card-apply" name="applyFlag">
		                                <option value="">请选择</option>
		                                <option value="1" <c:if test="${paramMap.openCardApplyFlag == 1}"> selected="selected"</c:if> >已申请</option>
		                                <option value="0" <c:if test="${paramMap.openCardApplyFlag == 0}"> selected="selected"</c:if> >未申请</option>
			                        </select>
		                        </div>
            				</div>
            			</div>
            			<div class="col-sm-5">
            				<div class="form-group">
            					<label class="col-xs-3 control-label">开卡状态:</label>
            					<div class="col-xs-8">
		                        	<select class="form-control" id="search-open-card-status" name="openCardStatus">
		                                <option value="">请选择</option>
		                                <option value="1" <c:if test="${paramMap.openCardStatus == 1}"> selected="selected"</c:if> >开卡成功</option>
		                                <option value="-1" <c:if test="${paramMap.openCardStatus == -1}"> selected="selected"</c:if> >开卡失败</option>
		                                 <option value="2" <c:if test="${paramMap.openCardStatus == 2}"> selected="selected"</c:if> >申请中</option>
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
                        <th style="width:10%;">开卡申请人</th>
                        <th style="width:5%;">开卡申请</th>
                        <th style="width:4%;">开卡状态</th>
                        <th style="width:8%;">公司垫付日期</th>
                        <th style="width:5%;">开卡申请时间</th>
                        <th style="width:9%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="13">暂无数据</td>
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
                            <td class="cel">${item.openCardApplyUserName}</td>
                            <td class="cel">
                            	<c:if test="${item.openCardApplyFlag == 0}">
                            		<code class="alert-warning">未申请</code>
                            	</c:if>
                            	<c:if test="${item.openCardApplyFlag == 1}">
                            		<code class="alert-success">已申请</code>
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.openCardStatus == 0}">
                            		--
                            	</c:if>
                            	<c:if test="${item.openCardStatus == 1}">
                            		<code class="alert-success">开卡成功</code>
                            	</c:if>
                            	<c:if test="${item.openCardStatus == -1}">
                            		<code class="alert-danger">开卡失败</code>
                            	</c:if>
                            	<c:if test="${item.openCardStatus == 2}">
                            		<code class="alert-info">申请中</code>
                            	</c:if>
                            	<c:if test="${item.openCardStatus == 3}">
                            		<code class="alert-warning">申请退回</code>
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<sl:format type="date" show="${item.companyAdvanceDate}" pattern="yyyy-MM-dd"/>
                            </td>
                            <td class="cel">
                                 <sl:format type="date" show="${item.openCardApplyTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td>
                            	<c:if test="${item.openCardApplyFlag == 0}">
                            		<shiro:hasPermission name="bankCard:apply">
                            			<button data-id="${item.id}" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-success apply-btn">开卡申请</button>
                            		</shiro:hasPermission>
                            	</c:if>
                            	<c:if test="${item.openCardApplyFlag == 1}">
                            		<c:if test="${item.openCardStatus == 3}">
		                            	<shiro:hasPermission name="bankCard:apply">
	                            			<button data-id="${item.id}" data-title="${item.realName}" class="btn btn-w-m btn-xs btn-primary apply-btn">重新申请</button>
	                            		</shiro:hasPermission>
                            		</c:if>
                            		<c:if test="${item.openCardStatus == 2}">
		                            	<shiro:hasPermission name="bankCard:queryProgress">
		                            		<button data-id="${item.id}" class="btn btn-w-m btn-xs btn-warning query-process-btn">进度查询</button>
		                            	</shiro:hasPermission>
                            		</c:if>
                            	</c:if>
                                <shiro:hasPermission name="bankCard:orderDetail">
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/card/list.js"></script>
<script type="text/template" title="进度查询" id="query-progress-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row mr-none">
                <div class="wrapper-content"> </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>
</html>

