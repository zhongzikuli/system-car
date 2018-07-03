<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>资金方管理</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp"%>
	<link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
		<form id="pagerForm" action="${ctx}/moneyUnit/query.action" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>
			<div class="row">
				<div class="col-sm-2">
					<shiro:hasPermission name="moneyUnit:add">
						<a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
					</shiro:hasPermission>
						<a data-toggle="modal" class="btn btn-success  btn-sm refresh-btn">刷新</a>
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
								<th style="width: 2%;">序号</th>
								<th style="width: 8%;">资金方名称</th>
								<th style="width: 8%;">联系人</th>
								<th style="width: 8%;">联系电话</th>
								<th style="width: 15%;">地址</th>
								<th style="width: 8%;">更新时间</th>
								<th style="width: 5%;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="7">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<%-- <td><input type="hidden" " value="${item.id}"></td> --%>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									<td class="cel">${item.name}</td>
									<td class="cel">${item.contactPerson}</td>
									<td class="cel">${item.tel}</td>
									<td class="cel">${item.address}</td>
									   <td class="cel">
                                <fmt:formatDate value="${item.mtime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
									<td><c:if
											test="${item.isvalid != 0}">
											<shiro:hasPermission name="moneyUnit:update">
												<a href="#" data-id="${item.id}" class="btn btn-primary btn-xs edit-btn"><i class="fa fa-edit"></i>编辑</a>
											</shiro:hasPermission>
										</c:if>
                                        <a href="#" onclick="editStop('${item.id}')" class="btn btn-primary btn-xs"id="start${item.id}"
                                                <c:if test="${item.forbidden ==0}">
                                                    style="display:none;"
                                                </c:if>
                                        >启用</a>

                                        <a href="#" onclick="editStart('${item.id}')" class="btn btn-danger btn-xs"id="stop${item.id}"
                                                <c:if test="${item.forbidden ==1}">
                                                    style="display:none;"
                                                </c:if>
                                        >停用</a>

                                    </td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				<!-- 分页条 -->
				<%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
				</div>
			</div>
	</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/moneyUnit/moneyUnitList.js"></script>
<script type="text/template" title="新增资金方" id="moneyUnit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
    	<form id="moneyUnitForm" class="form-horizontal">
        	<div class="form-group">
            	<label class="col-xs-3 control-label"><span class="red">*</span>资金方名称:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="name" id="name" check="moneyUnitForm(this)">
            	</div>
        	</div>
        	<div class="form-group">
            	<label class="col-xs-3 control-label">联系人:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="contactPerson" id="contactPerson">
            	</div>
        	</div>
        	<div class="form-group">
            	<label class="col-xs-3 control-label">联系电话:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="tel" id="tel">
            	</div>
        	</div>
        	<div class="form-group">
            	<label class="col-xs-3 control-label">地址:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="address" id="address">
            	</div>
        	</div>
    	</form>
    	<div class="dialog-manage">
        	<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        	<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
    	</div>
	</div>
</script>
<script type="text/template" title="编辑资金方" id="moneyUnitEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
    	<form id="editMoneyUnitForm" class="form-horizontal">
        	<div class="form-group">
            	<label class="col-xs-3 control-label"><span class="red">*</span>资金方名称:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="name" id="name" check="moneyUnitForm(this)">
            	</div>
        	</div>
        	<div class="form-group">
            	<label class="col-xs-3 control-label">联系人:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="contactPerson" id="contactPerson">
            	</div>
        	</div>
        	<div class="form-group">
            	<label class="col-xs-3 control-label">联系电话:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="tel" id="tel">
            	</div>
        	</div>
        	<div class="form-group">
            	<label class="col-xs-3 control-label">地址:</label>
            	<div class="col-xs-8">
                	<input type="text" class="form-control" name="address" id="address">
            	</div>
        	</div>
    	</form>
    	<div class="dialog-manage">
        	<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        	<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
    	</div>
	</div>
</script>
</html>