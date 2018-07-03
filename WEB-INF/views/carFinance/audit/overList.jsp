<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>已审中心</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
		<input type="hidden" name="startDate" value="${paramMap.startDate}">
		<input type="hidden" name="endDate" value="${paramMap.endDate}">
		<input type="hidden" name="status" value="${paramMap.orderStatus}">
		<input type="hidden" name="depId" value="${paramMap.departmentId}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
	</div>
    <form id="pagerForm" action="${ctx}/audit/queryForAudited.action" method="post" style="margin-bottom:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-7">
                <a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">终审提交时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="startDate"
                                               id="search-start-date" value="${paramMap.startDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="endDate"
                                               id="search-end-date" value="${paramMap.endDate}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input id="keyword" type="text" class="form-control" placeholder="支持客户姓名、身份证号、订单号" name="keyword" value="${paramMap.keyword}">
                                </div>
                            </div>
                            <%--
                            <div class="form-group">
            					<label class="col-xs-3 control-label">订单编号:</label>
            					<div class="col-xs-8">
		                        	<input id="orderNo" type="text" class="form-control" placeholder="请输入订单编号" name="orderNo" value="${paramMap.orderNo}">
		                        </div>
            				</div>
                             --%>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">订单状态:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-order-status" name="status">
                                        <option value="">请选择</option>
                                        <option value="3" <c:if test="${paramMap.orderStatus == 3}"> selected="selected"</c:if> >初审提交</option>
                                        <option value="4" <c:if test="${paramMap.orderStatus == 4}"> selected="selected"</c:if> >终审提交</option>
                                        <option value="7" <c:if test="${paramMap.orderStatus == 7}"> selected="selected"</c:if> >终审预通过</option>
                                        <option value="12" <c:if test="${paramMap.orderStatus == 12}"> selected="selected"</c:if> >终审通过</option>
                                        <option value="-4" <c:if test="${paramMap.orderStatus == -4}"> selected="selected"</c:if> >拒单</option>
                                        <option value="-3" <c:if test="${paramMap.orderStatus == -3}"> selected="selected"</c:if> >作废</option>
                                        <option value="-2" <c:if test="${paramMap.orderStatus == -2}"> selected="selected"</c:if> >退单</option>
                                        <option value="28" <c:if test="${paramMap.orderStatus == 28}"> selected="selected"</c:if> >已成交</option>
                                        <option value="30" <c:if test="${paramMap.orderStatus == 30}"> selected="selected"</c:if> >已结清</option>
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
                                                        <option selected="selected" value="${department.id}">
                                                            ${department.name}
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
                                <button type="button" class="btn btn-primary btn-sm search-btn"
                                        onclick="searchSubmit()">搜索
                                </button>
                                 <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                        <th style="width:2%;">序号</th>
                        <th style="width:12%;">订单编号</th>
                        <th style="width:7%;">客户名称</th>
                        <th style="width:7%;">信贷专员</th>
                        <th style="width:10%;">部门</th>
                        <th style="width:13%;">贷款银行</th>
                        <th style="width:13%;">经销商</th>
                        <th style="width:7%;">订单状态</th>
                        <th style="width:5%;">候补资料</th>
                        <th style="width:8%;">贷款金额(元)</th>
                        <th style="width:7%;">终审提交时间</th>
                        <th style="width:8%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="12">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel">${item.orderStatusName}</td>
                            <td class="cel">
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
                            </td>
                            <td class="cel">
                                <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                                <sl:format type="date" show="${item.firstAuditTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                             <td>
                                <shiro:hasPermission name="order:view">
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
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/overList.js"></script>
</html>
