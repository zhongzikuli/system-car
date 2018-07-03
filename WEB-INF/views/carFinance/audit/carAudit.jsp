<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>车辆信息补录审核</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
</head>
<body>
	<div class="mod_header">
		<input type="hidden" name="acceptId" id="acceptId" value="${record.businessOrderAcceptId}">
		<input type="hidden" name="fPath" id="fPath" value="${fPath}">
		<div class="row">
			<div class="col-sm-12">
				<div class="form-inline">
					<div class="pull-left form-group" style="text-align:center;">
						<h5><strong>提车资料上传审核</strong></h5>
					</div>
					<div class="pull-left form-group">
						<h5>&nbsp;&nbsp;<code>&lt;订单编号:${record.orderNo}&gt;</code></h5>
					</div>
					<%--
					<div class="form-group">
						<a class="btn btn-sm btn-info" href="${ctx}/carInfo/queryForAudit.action">返回列表</a>
					</div>
					 --%>
				</div>
			</div>
		</div>
	</div>	<%-- end mod_header --%>
	<div class="mod_basic ibox-content car-finance form-horizontal padding-min animated">
		<div class="m-rl-tb m-t-xs row">
			<div class="col-md-1 no-padding text-right">
				<label class="control-label">车辆信息:</label>
			</div>
			<div class="col-md-11">
				<fieldset id="audit-car-info-wrap" class="ibox-content">
					<div class="clear m-rl-tb">
						<label class="col-xs-1 control-label">车辆类别:</label>
						<div class="col-xs-2"><input type="text" name="category" readonly="readonly" class="form-control"></div>
						<label class="col-xs-2 control-label">发票开具单位:</label>
						<div class="col-xs-2"><input type="text" name="billCompany" readonly="readonly" class="form-control"></div>
						<label class="col-xs-2 control-label">发票号:</label>
						<div class="col-xs-2"><input type="text" name="billNo" readonly="readonly" class="form-control"></div>
					</div>
					<div class="clear m-rl-tb">
						<label class="col-xs-1 control-label">具体车型:</label>
						<div class="col-xs-2"><input type="text" name="carDetail" readonly="readonly" class="form-control"></div>
						<label class="col-xs-2 control-label">车架号:</label>
						<div class="col-xs-2"><input type="text" name="vinNo" readonly="readonly" class="form-control"></div>
						<label class="col-xs-2 control-label">底盘号后六位:</label>
						<div class="col-xs-2"><input type="text" name="underpanLastSixNo" readonly="readonly" class="form-control"></div>
					</div>
					<div class="clear m-rl-tb">
						<label class="col-xs-1 control-label">发动机号:</label>
						<div class="col-xs-2"><input type="text" name="engineNo" readonly="readonly" class="form-control"></div>
						<label class="col-xs-2 control-label">车辆颜色:</label>
						<div class="col-xs-2"><input type="text" name="carColor" readonly="readonly" class="form-control"></div>
						<label class="col-xs-2 control-label">初始登记时间:</label>
						<div class="col-xs-2"><input type="text" name="initRegisterDate" readonly="readonly" class="form-control"></div>
					</div>
				</fieldset>
			</div>
		</div>
		<shiro:hasPermission name="carInfoFile:download">
			<div class="m-rl-tb m-t-xs row">
				<div class="col-md-1 no-padding text-right">
					<label class="control-label">附件数据:</label>
				</div>
				<div class="col-md-11">
					<button id="download-car-audit-file-btn" type="button" data-id="${record.id}" data-type="${record.businessOrderAcceptId}" class="btn btn-w-m btn-primary">
						<i class="fa fa-cloud-download"></i>打包下载</button>
				</div>
			</div>
		</shiro:hasPermission>
		<div class="m-rl-tb m-t-xs row">
			<div class="col-md-1 no-padding text-right">
				<label class="control-label">附件信息:</label>
			</div>
			<div class="col-md-11">
				<div class="file-list-wrap">
						<div id="car-audit-file-list" class="gallerys">
							<c:if test="${empty record.applyContent }">
								<div class="ibox-content b-n">
									<p class="text-center tip-message">暂无附件信息</p>
								</div>
							</c:if>
							<c:if test="${not empty record.applyContent }">
								<input type="hidden" id="carAuditContent" value='${record.applyContent}'/>
							</c:if>
						</div>
				</div>
			</div>
		</div>
		<div class="m-rl-tb m-t-xs row">
			<div class="col-md-1 no-padding text-right">
				<label class="control-label">审核记录:</label>
			</div>
			<div class="col-md-11">
				<div id="car-audit-detail-list" class="mod_basic no-bottom mr-none"></div>
			</div>
		</div>
		<c:if test="${record.auditStatus != 1 && record.auditStatus != 0}">
			<div class="m-rl-tb m-t-xs row">
				<div class="col-md-1 no-padding text-right">
					<label class="control-label">审核人:</label>
				</div>
				<div class="col-md-2"><input class="form-control" type="text" readonly="readonly" value="${auditUser}" id="auditUser" name="auditUser"/></div>
				<div class="col-md-1 no-padding  text-right">
					<label class="control-label">审核日期:</label>
				</div>
				<div class="col-md-2"><input class="form-control" type="text" readonly="readonly" value="${auditDate}" id="auditDate" name="auditDate"/></div>
			</div>
			<div class="m-rl-tb m-t-xs row">
				<label class="col-md-1 control-label no-padding text-right">审核意见:</label>
				<div class="col-md-11"  id="car-audit-desc-wrap">
					<textarea id="carAuditDescription"  readonly="readonly"  style="height:180px;width:100%" class="form-control">${record.auditBak}</textarea>
				</div>
			</div>
		</c:if>
		
		<c:if test="${record.auditStatus == 1}">
			<div class="m-rl-tb m-t-xs row">
				<div class="col-md-1 no-padding text-right">
					<label class="control-label">审核人:</label>
				</div>
				<div class="col-md-2"><input class="form-control" type="text" readonly="readonly" value="${auditUser}" id="auditUser" name="auditUser"/></div>
				<div class="col-md-1 no-padding  text-right">
					<label class="control-label">审核日期:</label>
				</div>
				<div class="col-md-2"><input class="form-control" type="text" readonly="readonly" value="${auditDate}" id="auditDate" name="auditDate"/></div>
			</div>
			<div class="m-rl-tb m-t-xs row">
				<label class="col-md-1 control-label no-padding text-right"><span class="red">*</span>审核意见:</label>
				<div class="col-md-11"  id="car-audit-desc-wrap">
					<form   id="car-audit-desc-form">
						<textarea id="carAuditDescription" obj="not_null" tip="审核信息不能为空" style="height:180px;width:100%"></textarea>
						<span class="help-block m-b-none"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
					</form>
				</div>
			</div>
			<div class="m-t-xs row text-right mr-none">
				<div class="control-label col-md-1 no-padding text-right"></div>
				<div class="col-md-11">
					<shiro:hasPermission name="carSupply:change">
						<button type="button" data-id="${record.id}" class="btn btn-w-m btn-primary m-r-xs car-audit-change-btn">换审核</button>
					</shiro:hasPermission>
					<shiro:hasPermission name="carSupply:audit">
						<%--
						<button type="button" data-id="${record.id}" data-type="-4" class="btn btn-w-m btn-warning m-r-xs car-audit-discard-btn">拒单</button>
						 --%>
						<button type="button" data-id="${record.id}" data-type="-2" class="btn btn-w-m btn-danger m-r-xs car-audit-back-btn">退回</button>
						<button type="button" data-id="${record.id}" data-type="2" class="btn btn-w-m btn-success car-audit-agree-btn">同意</button>
					</shiro:hasPermission>
				</div>
			</div>
		</c:if>
	</div>	<%-- end mod_basic --%>
</body>
<script type="text/template" title="查看审核详情" id="view-audit-dialog">
	<div class="ibox-content">
		<form id="backCreditForm" class="form-horizontal">
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-2 control-label">审核类型:</label>
					<div class="col-sm-4">
						<input class="form-control" readonly="readonly" type="text" id="auditType">
					</div>
					<label class="col-sm-2 control-label">审核结果:</label>
					<div class="col-sm-4">
						<input class="form-control" readonly="readonly" type="text" id="auditResult">
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-2 control-label">审核人:</label>
					<div class="col-sm-4">
						<input class="form-control" readonly="readonly" type="text" id="auditor">
					</div>
					<label class="col-sm-2 control-label">审核时间:</label>
					<div class="col-sm-4">
						<input class="form-control" readonly="readonly" type="text" id="auditTime">
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-2 control-label">审核意见:</label>
					<div class="col-sm-10">
							<textarea id="auditDescriptionView" readonly="readonly" class="form-control"></textarea>
					</div>
				</div>
			</div>
		</form>
		<div class="dialog-manage" id="CreateBtn">
			<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
		</div>
	</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/carAudit.js"></script>
</html>

