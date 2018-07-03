<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>协议管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="type" value="${paramMap.type}"/>
    </div>
    <form id="pagerForm" action="${ctx}/protocol/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>

        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="protocol:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="protocol:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm"
                       onclick="deleteProtocol('${paramMap.type}')">删除</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">协议类型:</label>
                        <select class="form-control type" id="search-select" name="type" data-placeholder="协议类型...">
                            <option value="">请选择协议类型</option>
                            <c:forEach items="${Types }" var="type">
                                <option value="${type.keyWorld}"
                                <c:if test="${type.keyWorld eq paramMap.type}">selected</c:if>
                                >${type.valueDesc}</option>
                            </c:forEach>
                        </select>
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
                        <th style="width:2%;"><input type="checkbox" class="checkedAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:15%;">协议内容</th>
                        <th style="width:8%;">协议类型</th>
                        <th style="width:12%;">创建时间</th>
                        <th style="width:15%;">备注</th>
                        <th style="width:15%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr ondblclick="detailProtocol('${item.id}')">
                            <td>
                                <input type="checkbox" class="CheckOne" name="protocolList_input" value="${item.id}">
                            </td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel">${item.content}</td>
                            <td class="cel">
                                <c:forEach items="${Types }" var="type">
                                    <c:if test="${type.keyWorld eq item.type}">
                                        ${type.valueDesc}
                                    </c:if>
                                </c:forEach>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </td>
                            <td class="cel max-200" title="${item.remark}">${item.remark}</td>
                            <td class="btn-cel">
                                <c:if test="${item.isvalid != 0}">
                                    <shiro:hasPermission name="protocol:update">
                                        <a href="#"data-id="${item.id}" data-type="${paramMap.type}" class="btn btn-primary btn-xs edit-btn">
                                        	<i class="fa fa-edit"></i>编辑</a>
                                    </shiro:hasPermission>
                                    <a href="#" data-id="${item.id}" class="btn btn-info btn-xs detail">
                                        <i class="fa fa-search-plus"></i>查看</a>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
		    <!-- 分页条 -->
		    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/system/protocol/list.js"></script>
<script type="text/template" title="新增" id="protocolCreate-dialog">
    <div class="ibox-content">
        <form id="protocolCreateForm" class="form-horizontal">
            <div id="protocolCreateDialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>协议内容:</label>
                    <div class="col-xs-8">
		             	<textarea rows="5" cols="150" type="text" class="form-control" id="protocol-add-content"
                                  name="remark" tip="协议内容不能为空" check="validProtocolForm(this)" value=""></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>协议类型:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="协议类型不能为空">
                            <select data-placeholder="协议类型..." id="protocol-add-type" name="searchType"
                                    check="validProtocolForm(this)" class="form-control type-chosen-select">
                                <option value="">请选择协议类型</option>
                                <c:forEach items="${Types }" var="type">
                                    <option value="${type.keyWorld}"
                                    <c:if test="${type.keyWorld eq paramMap.type}">selected</c:if>
                                    >${type.valueDesc}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-xs-8">
                        <input type="text" style="display:none">
                        <input type="text" class="form-control" name="remark" id="protocol-add-remark" tip="协议备注不能为空"
                               check="validProtocolForm(this)">
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
<script type="text/template" title="查看" id="protocolView-dialog">
    <div class="ibox-content">
        <form id="protocolViewForm" class="form-horizontal">
            <div id="protocolViewDialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label">协议内容:</label>
                    <div class="col-xs-8">
                       <textarea rows="5" cols="150" type="text" class="form-control" id="protocol-view-content"
                                  name="remark" readonly value=""></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">协议类型:</label>
                    <div class="col-xs-8">
						<input type="text" class="form-control" readonly id="protocol-view-type">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" readonly id="protocol-view-remark">
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
<script type="text/template" title="编辑" id="protocolEdit-dialog">
    <div class="ibox-content">
        <form id="protocolEditForm" class="form-horizontal">
            <div id="protocolEditDialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>协议内容:</label>
                    <div class="col-xs-8">
						<textarea rows="5" cols="150" type="text" class="form-control" name="remark" 
                                  id="protocol-edit-content" check="validProtocolForm(this)" value=""></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>协议类型:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="协议类型不能为空">
                            <select class="form-control type-chosen-select" data-placeholder="协议类型..."
                                    id="protocol-edit-type" name="searchType" check="validProtocolForm(this)">
                                <option value="">请选择协议类型</option>
                                <c:forEach items="${Types}" var="type" varStatus="status">
                                    <option value="${type.keyWorld}"
                                    <c:if test="${type.keyWorld eq type}">selected</c:if>
                                    >${type.valueDesc}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>协议备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="protocol-edit-remark"
                               check="validProtocolForm(this)">
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
</html>