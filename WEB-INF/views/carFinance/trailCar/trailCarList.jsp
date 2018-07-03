<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<%@include file="/WEB-INF/views/include/inner_css.jsp"%>
	<link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
	<div class="mod_header">
		<div id="hiddenForm">
			<input type="hidden" value="${acceptId}" id="acceptId" name="acceptId"/>
		</div>
		
		<form id="pagerForm" action="${ctx}/cfTrail/queryTrailCarList.action" method="post"style="margin-bottom: 0;">
			<%@include file="/WEB-INF/views/include/pageForm.jsp"%>

			<div class="row">
				<div class="col-sm-2">
					<shiro:hasPermission name="cfTrail:createExecute">
						<a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
					</shiro:hasPermission>
					<shiro:hasPermission name="cfTrail:updateExecute">
						<a data-toggle="modal" class="btn btn-primary btn-sm edit-btn">编辑</a>
					</shiro:hasPermission>
					<shiro:hasPermission name="cfTrail:deleteExecute">
						<a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
					</shiro:hasPermission>
				</div>
				<div class="col-sm-10 text-right">
	            <div class="form-group">
	            	<a class="btn btn-sm btn-info" href="${ctx}/cfTrail/query.action">返回列表</a>
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
								<th style="width: 2%;"><input type="checkbox"
									class="checkAll" name="checkedAll"></th>
								<th style="width: 2%;">序号</th>
								<th style="width: 12%;">派单日期</th>
								<th style="width: 12%;">拖车单位</th>
								<th style="width: 12%;">备注</th>
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="10">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<td><input type="checkbox" class="checkOne" id="trailCarExecute" executeId="${item.executeId}"
										name="trailCar_input"  value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									 <td >
		                                <fmt:formatDate value="${item.dispatchDate}" pattern="yyyy-MM-dd "/>
		                            </td>
									<td class="cel">${item.carName}</td>
									<td title="${item.trailCarDispatchBak}" style="max-width:100px">${item.trailCarDispatchBak}</td>  
									
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
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/trailCar/trailCarList.js"></script>
<script type="text/template" title="开拖车单" id="bank-dialog">
    <div class="ibox-content">
        <form id="bankForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>派单日期:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="validDate"
                           check="bankForm(this)" id="dispatchDate"  value="<sl:format type="date" show="${secondCar.validDate}"
                          pattern="yyyy-MM-dd HH:mm:ss"/>" tip="日期不能为空">
                 </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>拖车单位:</label>
                <div class="col-xs-8">
                	<div obj="" class="" is_tip_null="yes">
                    	<select class="form-control status" id="trailCarCompanyId" name="status" check="bankForm(this)">
                        	<option value="">请选择拖车单位</option>
                        	<c:forEach items="${banks}" var="bank">
                            	<option value="${bank.id}">${bank.name}</option>
                        	</c:forEach>
                    	</select>
               	 	</div>
            	</div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>拖车单备注:</label>
                <div class="col-xs-8">
                    <textarea  class="form-control" id="trailCarDispatchBak"   check="bankForm(this)" >

                    </textarea>
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