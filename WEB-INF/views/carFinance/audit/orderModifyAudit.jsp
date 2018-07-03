<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>订单修改审核</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
</head>
<body>
	<div class="mod_header">
		<div class="row">
			<div class="col-sm-12">
				<div class="form-inline">
					<div class="pull-left form-group" style="text-align:center;">
						<input type="hidden" name="acceptId" value="${orderId}" id="acceptId">
						<button  data-type="2" class="btn btn-sm btn-success order-modify-audit-btn">同意</button>
						<button  data-type="-4" class="btn btn-sm btn-danger order-modify-audit-btn">拒绝</button>
						<button class="btn btn-sm btn-primary refresh-btn">刷新</button>
					</div>
					<%--
					<div class="form-group">
						<a class="btn btn-sm btn-info" href="${ctx}/cfOrderApplyModify/queryForAudit.action?orderId=${record.id}">返回列表</a>
					</div>
					 --%>
				</div>
			</div>
		</div>
	</div>	<%-- end mod_header --%>
	<div class="mod_basic">
		<div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height" id="audit-order">
                <table class="table table-hover table-height table-striped">
	                    <thead>
	                    <tr>
	                   		<th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
							<th style="width:2%;">序号</th>
							<th style="width:4%;">所属版块</th>
	                        <th style="width:4%;">所属项目</th>
	                        <th style="width:15%;">原值</th>
	                        <th style="width:15%;">新值</th>
	                        <th style="width:10%;">修改原因</th>
	                        <th style="width:5%;">审核时间</th>
	                        <th style="width:4%;">审核状态</th>
	                        <th style="width:4%">审核人</th>
	                        <th style="width:4%;">审核意见</th>
	                    </tr>
	                    </thead>
	                    <tbody>
	                    <c:if test="${applys == null || applys.size() == 0}">
	                        <tr>
	                            <td class="col-td" colspan="9">暂无数据</td>
	                        </tr>
	                    </c:if>
	                    <c:forEach var="item" items="${applys}" varStatus="st">
	                        <tr>
	                        	<td>
	                        		<c:if test='${item.auditStatusName.trim() eq "已提交" }'>
		                        		<input type="checkbox" name="auditCheckbox" class="checkOne" value="${item.id}">
	                        		</c:if>
	                        	</td>
								<td class="cel">${st.index+1}</td>
								<td class="cel">${item.moduleName}</td>
	                            <td class="cel data-item">${item.itemDesc}</td>
	                            <td class="desc">${item.oldValue}</td>
	                            <td class="desc">${item.newValue}</td>
	                            <td class="cel">${item.modifyReason}</td>
	                            <td class="cel">
	                            	<c:if test="${null != item.auditTime}">
	                            		<sl:format type="date" show="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/>
	                            	</c:if>
	                            	<c:if test="${null == item.auditTime}">
	                            		--
	                            	</c:if>
	                            </td>
	                            <td class="cel">
	                            	<c:if test='${item.auditStatusName.trim() eq "已提交" }'> <code class="alert-info">审核中</code></c:if>
	                            	<c:if test='${item.auditStatusName.trim() eq "拒绝" }'><code>${item.auditStatusName}</code> </c:if>
	                            	<c:if test='${item.auditStatusName.trim() eq "通过" }'><code class="alert-success">${item.auditStatusName}</code> </c:if>
	                            </td>
	                            <td class="cel">
	                            	<c:if test="${empty  item.auditUserName}">--</c:if>
	                            	<c:if test="${not empty  item.auditUserName}">${item.auditUserName }</c:if>
	                            </td>
	                            <td class="cel">${item.auditBak}</td>
	                        </tr>
	                    </c:forEach>
	                </table>
	            </div>
	            <%-- end table-responsive --%>
	        </div>	<%-- end col --%>
	        
	    </div>	<%-- end row --%>
</body>
<script type="text/template" title="订单修改审核" id="order-modify-audit-dialog">
	<div class="ibox-content">
		<form id="modifyAuditForm" class="form-horizontal">
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-2 control-label"><span class="red">*</span>审核意见:</label>
					<div class="col-sm-10">
						<textarea id="auditDescriptionTexarea" obj="not_null" tip="审核意见不能为空" class="form-control"></textarea>
						<span class="help-block mr-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">100</font></code>个</span>
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-2 control-label">审核人:</label>
					<div class="col-sm-4">
						<input class="form-control" readonly="readonly" type="text" value="${auditUser}">
					</div>
					<label class="col-sm-2 control-label">审核日期:</label>
					<div class="col-sm-4">
						<input class="form-control" readonly="readonly" type="text" value="${auditDate}">
					</div>
				</div>
			</div>
		</form>
		<div class="dialog-manage">
			<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
			<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
		</div>
	</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/orderModifyAudit.js"></script>
</html>