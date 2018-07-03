<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>候补资料审核</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
	<div class="mod_header">
		<input type="hidden" name="acceptId" id="acceptId" value="${record.businessOrderAcceptId}">
		<input type="hidden" name="fPath" id="fPath" value="${fPath}">
		<div class="row">
			<div class="col-sm-6">
				<h5><strong>候补资料审核</strong>
					&nbsp;&nbsp;<code>&lt;订单编号:${record.orderNo}&gt;</code>
				</h5>
			</div>
			<div class="col-sm-6 text-right">
				<div class="form-group">
					<a class="btn btn-sm btn-info" href="${ctx}/cfSupplyMaterial/queryForAudit.action?id=${record.id}">返回列表</a>
				</div>
			</div>
		</div>
	</div>	<%-- end mod_header --%>
	<div  id="audit-desc-wrap" class="mod_basic ibox-content car-finance form-horizontal padding-min animated">
		<div class="m-rl-tb m-t-xs row">
			<div class="col-md-1 no-padding text-right">
				<label class="control-label">审核记录:</label>
			</div>
			<div class="col-md-11">
				<table class="table table-bordered  table-hover table-striped">
					<thead>
						<tr>
							<th style="width:18%;">审核类型</th>
							<th style="width:19%;">候补状态</th>
							<th style="width:19%;">发起意见</th>
							<th style="width:19%;">候补发起人</th>
							<th style="width:19%;">审核人员</th>
							<th style="width:16%;">审核时间</th>
							<th style="width:16%;">候补审核意见</th>
						</tr>
					</thead>
					<tbody>
						<c:if test="${auditList == null || auditList.size() == 0}">
							<tr>
								<td class="col-td" colspan="7">暂无审核信息</td>
							</tr>
						</c:if>
						<c:forEach var="item" items="${auditList}" >
							<tr style="height: 42px;line-height: 42px;">
								<td class="cel">${item.nodeName}</td>
								<td class="cel">
									<c:if test="${item.waitingFileStatus==0}"><code class="alert-default">待提交</code></c:if>
									<c:if test="${item.waitingFileStatus==1}"><code class="alert-info">已提交</code></c:if>
									<c:if test="${item.waitingFileStatus==2}"><code class="alert-success">通过</code></c:if>
									<c:if test="${item.waitingFileStatus==-2}"><code class="alert-warning">退回</code></c:if>
								</td>
								<td class="cel" title="${item.waitingFileBak}">${item.waitingFileBak}</td>
								<td class="cel">${item.waitingFileInitiatorName}</td>
								<td class="cel">${item.auditUserName}</td>
								<td class="cel"><fmt:formatDate value="${item.mtime}" pattern="yyyy-MM-dd HH:mm"/></td>
								<td class="cel" title="${item.auditBak}">${item.auditBak}</td>
								</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
		<form id="audit-desc-form">
			<c:if test="${not empty newOrOldCar && newOrOldCar == 0}">
				<shiro:hasPermission name="waitingFile:download">
					<div class="m-rl-tb m-t-xs row">
						<div class="col-md-1 no-padding text-right">
							<label class="control-label">过户附件:</label>
						</div>
						<div class="col-md-11">
							<button  data-type="4"  type="button" data-id="${record.id}" file-type="7" data-type="${record.businessOrderAcceptId}" class="btn btn-w-m btn-primary download-file-btn">
								<i class="fa fa-cloud-download"></i>打包下载</button>
						</div>
					</div>
				</shiro:hasPermission>
				<div class="m-rl-tb m-t-xs row">
					<div class="col-md-1 no-padding text-right">
						<label class="control-label">过户数据:</label>
					</div>
					<div class="col-md-11">
						<div class="file-list-wrap">
							<div id="audit-transfer-file-list" class="gallerys"></div>
						</div>
					</div>
				</div>
			</c:if>
		
			<shiro:hasPermission name="waitingFile:download">
				<div class="m-rl-tb m-t-xs row">
					<div class="col-md-1 no-padding text-right">
						<label class="control-label">候补附件:</label>
					</div>
					<div class="col-md-11">
						<button  data-type="4"  type="button" data-id="${record.id}" file-type="4" data-type="${record.businessOrderAcceptId}" class="btn btn-w-m btn-primary download-file-btn">
							<i class="fa fa-cloud-download"></i>打包下载</button>
					</div>
				</div>
			</shiro:hasPermission>
			<div class="m-rl-tb m-t-xs row">
				<div class="col-md-1 no-padding text-right">
					<label class="control-label">候补数据:</label>
				</div>
				<div class="col-md-11">
					<div class="file-list-wrap">
						<div id="audit-supply-file-list" class="gallerys">
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
			
			<c:if test="${record.auditStatus != 1 && record.auditStatus != 0}">
				<c:if test="${not empty firstPrice && newOrOldCar == 0}">
					<div class="m-rl-tb m-t-xs row">
						<div class="col-md-1 no-padding text-right">
							<label class="control-label">出评估报告:</label>
						</div>
						<div class="col-md-2">
							<select class="form-control" disabled="disabled" id="select-report-price">
								<option value="1" <c:if test="${order.paperEvaluateReport eq 1 }"> selected="selected" </c:if> >是</option>
								<option value="0" <c:if test="${order.paperEvaluateReport eq 0 }"> selected="selected" </c:if> >否</option>
							</select>
						</div>
						<c:if test="${order.paperEvaluateReport eq 1 }">
							<div class="col-md-1 no-padding text-right report-price-wrap">
								<label class="control-label">评估报告价格(元):</label>
							</div>
							<div class="col-md-2 report-price-wrap">
								<input id="report-price" class="form-control" value="${order.evaluateReportPrice}" readonly="readonly" />
							</div>
						</c:if>
						<div class="col-md-1 no-padding text-right">
							<label class="control-label">初始评估价(元):</label>
						</div>
						<div class="col-md-2">
							<input class="form-control" readonly="readonly"  value='<sl:format type="number" show="${firstPrice}" pattern="#,##0.00"/>'/>
						</div>
						<div class="col-md-1 no-padding text-right">
							<label class="control-label">车300评估价(元):</label>
						</div>
						<div class="col-md-2">
							<input class="form-control" readonly="readonly" value='<sl:format type="number" show="${c300Price}" pattern="#,##0.00"/>' />
						</div>
					</div>
				</c:if>
				<div class="m-rl-tb m-t-xs row">
					<label class="col-md-1 control-label no-padding text-right">审核意见:</label>
					<div class="col-md-11">
						<textarea readonly="readonly" style="height:180px;width:100%" class="form-control" >${record.auditBak}</textarea>
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
			</c:if>
			<c:if test="${record.auditStatus == 1}">
				<%--只有二手车展示评估信息 --%>
				<c:if test="${not empty newOrOldCar && newOrOldCar == 0}">
					<div id="second-car-wrap" class="m-rl-tb m-t-xs row">
						<div class="col-md-1 no-padding text-right">
							<label class="control-label"><span class="red">*</span>出评估报告:</label>
						</div>
						<div class="col-md-2">
							<select class="form-control" id="select-report-price">
								<option value="1" <c:if test="${order.paperEvaluateReport eq 1 || empty order.paperEvaluateReport}"> selected="selected" </c:if> >是</option>
								<option value="0" <c:if test="${order.paperEvaluateReport eq 0 }"> selected="selected" </c:if> >否</option>
							</select>
						</div>
						<c:if test="${order.paperEvaluateReport eq 1 || empty order.paperEvaluateReport}">
							<div class="col-md-1 no-padding text-right report-price-wrap">
								<label class="control-label"><span class="red">*</span>评估报告价格(元):</label>
							</div>
						</c:if>
						<c:if test="${order.paperEvaluateReport eq 0}">
							<div class="col-md-1 no-padding text-right report-price-wrap" style="display:none;">
								<label class="control-label"><span class="red">*</span>评估报告价格(元):</label>
							</div>
						</c:if>
						
						<c:if test="${order.paperEvaluateReport eq 1 || empty order.paperEvaluateReport}">
							<div class="col-md-2 report-price-wrap">
								<input id="report-price" class="form-control" value="${order.evaluateReportPrice}"  reg="float" tip="请输入正确的评估报告价格" />
							</div>
						</c:if>
						<c:if test="${order.paperEvaluateReport eq 0}">
							<div class="col-md-2 report-price-wrap" style="display:none;">
								<input id="report-price" class="form-control" value="${order.evaluateReportPrice}"  reg="float" tip="请输入正确的评估报告价格" />
							</div>
						</c:if>
						<div class="col-md-1 no-padding text-right">
							<label class="control-label">初始评估价(元):</label>
						</div>
						<div class="col-md-2">
							<input class="form-control" readonly="readonly"  value='<sl:format type="number" show="${firstPrice}" pattern="#,##0.00"/>'/>
						</div>
						<div class="col-md-1 no-padding text-right">
							<label class="control-label">车300评估价(元):</label>
						</div>
						<div class="col-md-2">
							<input class="form-control" readonly="readonly" value='<sl:format type="number" show="${c300Price}" pattern="#,##0.00"/>' />
						</div>
					</div>
				</c:if>
				<div class="m-rl-tb m-t-xs row">
					<label class="col-md-1 control-label no-padding text-right"><span class="red">*</span>审核意见:</label>
					<div class="col-md-11">
						<textarea id="auditDescription" obj="not_null" tip="审核信息不能为空" class="form-control" style="height:180px;width:100%"></textarea>
						<span class="help-block m-b-none"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
					</div>
				</div>
				<div class="m-rl-tb m-t-xs row m-b">
					<div class="col-md-1 no-padding text-right">
						<label class="control-label">审核人:</label>
					</div>
					<div class="col-md-2"><input class="form-control" type="text" readonly="readonly" value="${auditUser}" id="auditUser" name="auditUser"/></div>
					<div class="col-md-1 no-padding  text-right">
						<label class="control-label">审核日期:</label>
					</div>
					<div class="col-md-2"><input class="form-control" type="text" readonly="readonly" value="${auditDate}" id="auditDate" name="auditDate"/></div>
					
					<div class="col-md-6  text-right">
						<shiro:hasPermission name="auditSupplyData:change">
							<button type="button" data-id="${record.id}" class="btn btn-w-m btn-primary m-r-xs change-btn">换审核</button>
						</shiro:hasPermission>
						<shiro:hasPermission name="supplyData:audit">
							<%--
							<button type="button" data-id="${record.id}" data-type="-4" class="btn btn-w-m btn-warning m-r-xs discard-btn">拒单</button>
							 --%>
							<button type="button" data-id="${record.id}" data-type="-2" class="btn btn-w-m btn-danger m-r-xs back-btn">退回</button>
							<button type="button" data-id="${record.id}" data-type="2" class="btn btn-w-m btn-success agree-btn">同意</button>
						</shiro:hasPermission>
					</div>
				</div>
			</c:if>
		</form>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/supplyAudit.js"></script>
</html>

