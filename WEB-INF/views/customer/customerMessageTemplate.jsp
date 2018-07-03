<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
<div id="hiddenForm">
			<input type="hidden" name="type" value="${paramMap.type}" />
		</div>
    <form id="pagerForm" action="${ctx}/customerMessageTemplate/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
				<div class="col-sm-2">
					<shiro:hasPermission name="customerMessageTemplate:insert">
						<a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
					</shiro:hasPermission>
				</div>

				<div class="col-sm-10">
					<div class="form-inline">
                        <div class="form-group">
		                    <label class="control-label label">名称:</label>
			                        <sl:select name="type" classValue="form-control type" classType="690000"
                                     defaultValue="true" id="type" keyWorld="${paramMap.type}"/>
							<button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
								<th style="width: 2%;"><input type="checkbox"class="checkAll" name="checkedAll"></th>
								<th style="width:10%;">序号</th>
								<th style="width:10%;">名称</th>
			                    <th style="width:10%;">内容</th>
			                    <th style="width:5%;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:if
								test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
								<tr>
									<td class="col-td" colspan="5">暂无数据</td>
								</tr>
							</c:if>
							<c:forEach var="item" items="${pageBean.recordList}"
								varStatus="st">
								<tr>
									<td><input type="checkbox" class="checkOne"
										name="news_input" value="${item.id}"></td>
									<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
									<td class="cel"><sl:dict classType="690000" keyWorld="${item.type}"/></td>
									<td class="cel max-200" title="${item.content}">${item.content}</td>
									<td>
									<shiro:hasPermission name="customerMessageTemplate:set">
										<a href="#"  date-id=${item.id} class="btn btn-primary btn-xs edit-btn"><i class="fa fa-edit"></i>设置</a>
									</shiro:hasPermission>
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
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/customer/customerMessageTemplate.js"></script>
<script type="text/template" title="设置" id="config-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="weChat" class="form-horizontal">
            <div id="protocolCreateDialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>模板内容:</label>
                    <div class="col-xs-8">
		             	<textarea rows="5" cols="150" type="text" class="form-control" id="content"
                                  name="content" tip="模板内容" check="validYearSet(this)" value=""></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>

<script type="text/template" title="新增" id="set-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="setForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>类型:</label>
                <div class="col-xs-6">
			          <sl:select name="type" classValue="form-control type" classType="690000"
                          defaultValue="true" id="setType" keyWorld="${paramMap.type}"  check="validYearSet(this)" />
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

