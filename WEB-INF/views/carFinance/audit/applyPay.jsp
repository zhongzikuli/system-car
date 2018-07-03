<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>垫款申请审核</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="startDate" value="${paramMap.startDate}">
		<input type="hidden" name="endDate" value="${paramMap.endDate}">
		<input type="hidden" name="auditFlag" value="${paramMap.auditFlag}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
	</div>
    <form id="pagerForm" action="${ctx}/applyPay/queryForAudit.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
        	<div class="col-sm-2">
                <button class="btn btn-success btn-sm refresh-btn">刷新</button>
            </div>
            <div class="col-sm-10">
            	<a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row m-none">
                    	<div class="col-sm-6">
                    		<div class="form-group">
		                        <label class="col-xs-3 control-label">审核状态:</label>
		                        <div class="col-xs-8">
			                        <select class="form-control" id="search-audit-status" name="auditFlag">
			                            <option value="">全部</option>
			                            <option value="0"
			                            <c:if test="${paramMap.auditFlag == 0}"> selected="selected"</c:if>
			                            >未审核</option>
			                            <option value="1"
			                            <c:if test="${paramMap.auditFlag == 1}"> selected="selected"</c:if>
			                            >已审核</option>
			                        </select>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <label class="col-xs-3 control-label label">快捷搜索:</label>
		                        <div class="col-xs-8">
			                        <input id="keyword" type="text" class="form-control" placeholder="支持客户姓名、身份证号、订单编号" name="keyword" value="${paramMap.keyword}">
		                        </div>
		                    </div>
		                   
                    	</div>
                    	<div class="col-sm-6">
                    		<div class="form-group">
		                        <label class="col-xs-3 control-label">垫付申请时间:</label>
		                        <div class="col-xs-9">
			                        <div class="input-group">
			                            <input type="text" class="form-control" name="startDate"
			                                   id="search-start-date" value="${paramMap.startDate}"/>
			                            <span class="input-group-addon">到</span>
			                            <input type="text" class="form-control" name="endDate"
			                                   id="search-end-date" value="${paramMap.endDate}"/>
			                        </div>
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
		                    <div class="form-group">
		                    	<div class="col-xs-3"></div>
		                    	<div class="col-xs-9">
			                        <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
			                        <button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
		                        </div>
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
                        <th style="width:9%;">订单编号</th>
                        <th style="width:8%;">客户名称</th>
                        <th style="width:8%;">信贷专员</th>
                        <th style="width:10%;">部门</th>
                        <th style="width:9%;">贷款银行</th>
                        <th style="width:9%;">经销商</th>
                        <th style="width:6%;">贷款金额(元)</th>
                        <th style="width:7%;">订单状态</th>
                        <th style="width:8%;">垫付申请初审时间</th>
                        <th style="width:7%;">垫款申请状态</th>
                        <th style="width:8%;">垫付申请时间</th>
                        <th style="width:10%;">操作</th>
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
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel">
                                <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">${item.orderStatuName}</td>
                            <td class="cel">
                                <sl:format type="date" show="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                            	<c:if test='${item.auditStatusName.trim() eq "默认" }'>
                                	<code class="alert-info">审核中</code>
                                </c:if>
                                <c:if test='${item.auditStatusName.trim() eq "退回" }'>
                                    <code class="alert-warning">${item.auditStatusName}</code></c:if>
                                <c:if test='${item.auditStatusName.trim() eq "通过" }'>
                                	<code class="alert-success">${item.auditStatusName}</code>
                                </c:if>
                                <c:if test='${item.auditStatusName.trim() != "默认" && item.auditStatusName.trim() != "退回" && item.auditStatusName.trim() != "通过" }'>
                                	<code class="alert-default">${item.auditStatusName }</code>
                                </c:if>
                            </td>
                            <td class="cel">
                                <sl:format type="date" show="${item.applyTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="btn-cel">
                                <c:if test="${item.auditStatus == 1 }">
                                	<shiro:hasPermission name="applyPay:audit">
	                                    <a data-id="${item.id}" order-id="${item.businessOrderAcceptId}" data-name="${item.realName}" checkUser='${item.advancedApplyFinalAuditUsername}' checkDate='<sl:format type="date" show="${item.advancedApplyFinalAuditTime}" pattern="yyyy-MM-dd"/>' checkDesc='${item.advancedApplyFinalAuditBak}' type="button" class="btn btn-w-m btn-xs btn-success audit-btn">审核</a>
                                	</shiro:hasPermission>
                                </c:if>
                                <c:if test="${item.auditStatus != 0 && item.auditStatus != 1 && item.auditStatus != 3 }">
                                	<c:if test="${item.orderStatus lt 20 && item.orderStatus gt 14}">
	                                	<shiro:hasPermission name="applyPay:reAudit">
		                                    <a data-id="${item.id}" order-id="${item.businessOrderAcceptId}" data-name="${item.realName}"  checkUser='${item.advancedApplyFinalAuditUsername}' checkDate='<sl:format type="date" show="${item.advancedApplyFinalAuditTime}" pattern="yyyy-MM-dd"/>' checkDesc='${item.advancedApplyFinalAuditBak}'  type="button" class="btn btn-w-m btn-xs btn-success audit-btn">重复审核</a>
	                                	</shiro:hasPermission>
                                	</c:if>
                                </c:if>
                                <shiro:hasPermission name="order:view">
									<a data-id="${item.businessOrderAcceptId}"  data-title="${item.realName}" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/template" title="垫付申请审核" id="apply-pay-audit-dialog">
    <div class="ibox-content">
	        <form id="applyPayForm" class="clear form-horizontal">
	            <input type="hidden" value="" id="acceptId"/>
				<input type="hidden" value="" id="applyId"/>
				<fieldset id="applyPayCheckWrap">
					<legend>审核信息</legend>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label">备注:</label>
						<div class="col-xs-10">
							<textarea id="audit-desc" class="form-control"  readonly="readonly"></textarea>
						</div>
					</div>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label">审核人:</label>
						<div class="col-xs-4">
							<input id="auditor-name" class="form-control" readonly="readonly">
						</div>
						<label class="col-xs-2 control-label">审核日期:</label>
						<div class="col-xs-4">
							<input id="audit-date" class="form-control" readonly="readonly">
						</div>
					</div>
				</fieldset>

		    	<fieldset>
					<legend>垫付费用明细</legend>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label">客户姓名:</label>
						<div class="col-xs-4">
							<input id="real-name" class="form-control" readonly="readonly">
						</div>
						<label class="col-xs-2 control-label">按揭服务费(元):</label>
						<div class="col-xs-4">
							<input id="service-pay-fee" class="form-control" readonly="readonly">
						</div>
					</div>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label">按揭手续费(元):</label>
						<div class="col-xs-4">
							<input id="pay-brokerage" class="form-control" readonly="readonly">
						</div>
						<label class="col-xs-2 control-label">履约保证金(元):</label>
						<div class="col-xs-4">
							<input id="guarantee-pay-fee" class="form-control" readonly="readonly">
						</div>
					</div>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label">渠道保证金(元):</label>
						<div class="col-xs-4">
							<input id="channel-pay-fee" class="form-control" readonly="readonly">
						</div>
						<label class="col-xs-2 control-label">上牌押金(元):</label>
						<div class="col-xs-4">
							<input id="plate-pay-fee" class="form-control" readonly="readonly">
						</div>
					</div>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label">应收合计(元):</label>
						<div class="col-xs-4">
							<input id="pay-total" class="form-control" readonly="readonly">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>垫付费用审核</legend>
					<div class="clear m-rl-tb">
						<label class="col-xs-2 control-label"><span class="red">*</span>审核意见:</label>
						<div class="col-xs-10">
							<textarea id="auditDescription" obj="not_null" tip="审核意见不能为空" class="form-control"></textarea>
						</div>
					</div>
					<div class="dialog-manage text-right padding-15" id="CreateBtn">
						<a href="javascript:void(0);" type="button" data-status="2" class="btn btn-success dialog-ok">通过</a>
						<a href="javascript:void(0);" type="button" data-status="-2" class="btn btn-danger dialog-ok">退回</a>
						<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
					</div>
				</fieldset>
			</form>
	</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/applyPay.js"></script>
</html>

