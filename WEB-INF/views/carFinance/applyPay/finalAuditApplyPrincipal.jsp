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
		<input type="hidden" name="startDate" value="${startDate}">
		<input type="hidden" name="endDate" value="${endDate}">
		<input type="hidden" name="auditFlag" value="${auditFlag}">
		<input type="hidden" name="keyword" value="${keyword}">
        <input type="hidden" name="departmentId" value="${departmentId}">
	</div>
	<form id="pagerForm" action="${ctx}/applyPay/finalAuditApply.action" method="post">
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
										<option value="2" <c:if test="${auditFlag == 2}"> selected="selected"</c:if>> 全部</option>
										<option value="0"
												<c:if test="${auditFlag == 0}"> selected="selected"</c:if>
										>未审核</option>
										<option value="1"
												<c:if test="${auditFlag == 1}"> selected="selected"</c:if>
										>已审核</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-3 control-label label">快捷搜索:</label>
								<div class="col-xs-8">
									<input id="keyword" type="text" class="form-control" placeholder="支持客户姓名、身份证号、订单编号" name="keyword" value="${keyword}">
								</div>
							</div>

						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label class="col-xs-3 control-label">垫付初审时间:</label>
								<div class="col-xs-9">
									<div class="input-group">
										<input type="text" class="form-control" name="startDate"
											   id="search-start-date" value="${startDate}"/>
										<span class="input-group-addon">到</span>
										<input type="text" class="form-control" name="endDate"
											   id="search-end-date" value="${endDate}"/>
									</div>
								</div>
							</div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <select class="form-control chosen-select status" id="departmentId" name="departmentId">
                                        <option value="">请选择</option>
                                        <c:forEach items="${departments}" var="department">
                                            <option value="${department.id}"
                                                    <c:if test="${department.id eq departmentId}">selected</c:if>
                                            > ${department.name}
                                            </option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
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
                    <th style="width:8%;">审核员</th>
					<th style="width:8%;">信贷专员</th>
					<th style="width:10%;">部门</th>
					<th style="width:9%;">贷款银行</th>
					<th style="width:9%;">经销商</th>
					<th style="width:6%;">贷款金额(元)</th>
					<th style="width:7%;">订单状态</th>
					<th style="width:8%;">垫付申请初审时间</th>
					<th style="width:8%;">垫付申请终审时间</th>
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
                    <td class="cel">${item.auditRealName}</td>
					<td class="cel">${item.creditPerson}</td>
					<td class="cel">${item.departmentName}</td>
					<td class="cel">${item.bankName}</td>
					<td class="cel">${item.dealerName}</td>
					<td class="cel">
						<sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
					</td>
					<td class="cel"> <sl:OrderStatus showValue="${item.orderStatus}"/></td>
					<td class="cel">
						<sl:format type="date" show="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/>
					</td>
					<td class="cel">
						<sl:format type="date" show="${item.advancedApplyFinalAuditTime}" pattern="yyyy-MM-dd HH:mm"/>
					</td>
					<td class="btn-cel">
						<c:if test="${item.advancedApplyFinalAuditStatus == 1  && item.orderStatus==18}">
							<shiro:hasPermission name="applyPay:finalAudit">
								<a data-id="${item.id}" order-id="${item.businessOrderAcceptId}" data-name="${item.realName}" type="button" class="btn btn-w-m btn-xs btn-success audit-btn">审核</a>
							</shiro:hasPermission>
						</c:if>
							<%-- <c:if test="${item.auditStatus != 0 && item.auditStatus != 1 && item.auditStatus != 3 }">
                            <c:if test="${item.orderStatus lt 20 && item.orderStatus gt 14}">
                                <shiro:hasPermission name="applyPay:reAudit">
                                    <a data-id="${item.id}" order-id="${item.businessOrderAcceptId}" data-name="${item.realName}" type="button" class="btn btn-w-m btn-xs btn-success audit-btn">重复审核</a>
                                </shiro:hasPermission>
                            </c:if>
                        </c:if>--%>
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
<script type="text/template" title="垫付申请终审" id="apply-pay-audit-dialog">
	<div class="ibox-content">
		<form id="applyPayForm" class="clear form-horizontal">
			<input type="hidden" value="" id="acceptId"/>
			<input type="hidden" value="" id="applyId"/>
			<fieldset>
				<legend>垫付本金费用信息</legend>
			<div class="clear m-rl-tb">
				<label class="col-xs-2 control-label">客户姓名:</label>
				<div class="col-xs-4">
					<input id="real-name" class="form-control" readonly="readonly">
				</div>
				<label class="col-xs-2 control-label">贷款本金(元):</label>
				<div class="col-xs-4">
					<input id="actualLoadMoney" class="form-control" readonly="readonly">
				</div>
			</div>
			<div class="clear m-rl-tb">
				<label class="col-xs-2 control-label">收款单位:</label>
				<div class="col-xs-4">
					<input id="bankAccountName" class="form-control" readonly="readonly">
				</div>
				<label class="col-xs-2 control-label">账户:</label>
				<div class="col-xs-4">
					<input id="bankAccount" class="form-control" readonly="readonly">
				</div>
			</div>
			<div class="clear m-rl-tb">
				<label class="col-xs-2 control-label">开户银行:</label>
				<div class="col-xs-4">
					<input id="bankName" class="form-control" readonly="readonly">
				</div>
			</div>
				</fieldset>

			<fieldset>
				<legend>垫付本金初审信息</legend>
			<div class="clear m-rl-tb">
				<label class="col-xs-2 control-label">初审审核意见:</label>
				<div class="col-xs-10">
					<textarea id="audit-bak"    readonly="readonly" class="form-control"></textarea>
				</div>
			</div>
				<div class="clear m-rl-tb">
					<label class="col-xs-2 control-label">业务部门是否垫款:</label>
					<div class="col-xs-4">
						<input id="businessTeamAdvanced"    readonly="readonly" class="form-control"></input>
					</div>
				</div>
				<div class="clear uploaderErea m-rl-tb depart-collect-money m-t-xs hide">
					<label class="col-xs-2 control-label">回单附件:</label>
					<div class="col-xs-10 row">
						<div id="department-money-file" class=" page-container">

						</div>
					</div>
				</div>
			<div class="clear m-rl-tb">
				<label class="col-xs-2 control-label">初审审核人:</label>
				<div class="col-xs-4">
					<input id="audit-name" class="form-control" readonly="readonly">
				</div>
				<label class="col-xs-2 control-label">初审审核时间:</label>
				<div class="col-xs-4">
					<input id="audit-time" class="form-control" readonly="readonly">
				</div>
			</div>
				</fieldset>
			<fieldset>
				<legend>垫付本金终审意见</legend>
			<div class="clear m-rl-tb">
				<label class="col-xs-2 control-label"><span class="red">*</span>终审审核意见:</label>
				<div class="col-xs-10">
					<textarea id="audit-final-desc" obj="not_null" tip="审核意见不能为空"   class="form-control"></textarea>
				</div>
			</div>
			</fieldset>
		</form>
		<div class="dialog-manage" id="CreateBtn">
			<a href="javascript:void(0);" type="button" data-status="2" class="btn btn-success dialog-ok">通过</a>
			<a href="javascript:void(0);" type="button" data-status="-2" class="btn btn-danger dialog-ok">退回</a>
			<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
		</div>
	</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/applyPay/finalApplyPay.js"></script>
</html>

