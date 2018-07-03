<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>抵押登记审核</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
</head>
<body>
	<div class="mod_header">
		<input type="hidden" name="acceptId" id="acceptId" value="${record.businessOrderAcceptId}">
		<input type="hidden" name="fPath" id="fPath" value="${fPath}">
		<div class="row">
			<div class="col-sm-6">
	            <h5><strong>抵押登记审核</strong>
	            &nbsp;&nbsp;<code>&lt;订单编号:${record.orderNo}&gt;</code>
	            </h5>
	        </div>
	        <div class="col-sm-6 text-right">
	        	<%--
	            <div class="form-group">
	                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
	            </div>
	        	 --%>
	        </div>
		</div>
	</div>	<%-- end mod_header --%>
	<div class="mod_basic ibox-content car-finance form-horizontal padding-min animated">
		<shiro:hasPermission name="waitingFile:download">
			<div class="m-rl-tb m-t-xs row">
				<div class="col-md-1 no-padding text-right">
					<label class="control-label">附件数据:</label>
				</div>
					<div class="col-md-11">
						<button id="download-file-btn" type="button" data-id="${record.id}" data-type="${record.businessOrderAcceptId}" class="btn btn-w-m btn-primary">
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
						<div id="audit-file-list" class="gallerys">
							<c:if test="${empty record.applyContent }">
								<div class="ibox-content b-n">
									<p class="text-center tip-message">暂无附件信息</p>
								</div>
							</c:if>
							<c:if test="${not empty record.applyContent }">
								<input type="hidden" id="auditContent" value='${record.applyContent}'/>
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
				<div id="audit-detail-list" class="mod_basic no-bottom mr-none"></div>
			</div>
		</div>
		
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
		
		<c:if test="${record.auditStatus != 1 && record.auditStatus != 0}">
			<div class="m-rl-tb m-t-xs row">
				<label class="col-md-1 control-label no-padding text-right">审核意见:</label>
				<div class="col-md-11"  id="audit-desc-wrap">
					<textarea readonly="readonly" id="auditDescription" class="form-control" style="height:180px;width:100%">${record.auditBak}</textarea>
				</div>
			</div>
		</c:if>
		
		<c:if test="${record.auditStatus == 1}">
			<div class="m-rl-tb m-t-xs row">
				<label class="col-md-1 control-label no-padding text-right"><span class="red">*</span>审核意见:</label>
				<div class="col-md-11"  id="audit-desc-wrap">
					<form   id="audit-desc-form">
						<textarea id="auditDescription" obj="not_null" tip="审核信息不能为空" style="height:180px;width:100%"></textarea>
						<span class="help-block m-b-none"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
					</form>
				</div>
			</div>
			<div class="m-t-xs row text-right mr-none">
				<div class="control-label col-md-1 no-padding text-right"></div>
				<div class="col-md-11">
					<shiro:hasPermission name="mortgageRegist:change">
						<button type="button" data-id="${record.id}" class="btn btn-w-m btn-primary m-r-xs change-btn">换审核</button>
					</shiro:hasPermission>
					<shiro:hasPermission name="mortgageRegist:audit">
						<%--
						<button type="button" data-id="${record.id}" data-type="-4" class="btn btn-w-m btn-warning m-r-xs discard-btn">拒单</button>
						 --%>
						<button type="button" data-id="${record.id}" data-type="-2" class="btn btn-w-m btn-danger m-r-xs back-btn">退回</button>
						<button type="button" data-id="${record.id}" data-type="2" class="btn btn-w-m btn-success agree-btn">同意</button>
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
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/mortgageAudit.js"></script>
</html>

