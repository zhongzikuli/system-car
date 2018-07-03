<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>菜单管理</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	<link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" id="seach-hidden-menu-name" name="name" value="${paramMap.name}">
    </div>
    <form id="pagerForm" action="${ctx}/appMenu/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="appMenu:add">
                    <a class="btn btn-primary btn-sm add-menu">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="appMenu:delete">
                    <a class="btn btn-danger btn-sm delete-menu">删除</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">菜单名称:</label>
                        <input type="text" class="form-control" name="name" id="search-menu-name" value="${paramMap.name}">
                        <a class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</a>
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
	                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
	                        <th style="width:2%;">序号</th>
	                        <th style="width:12%;">菜单名称</th>
	                        <th style="width:14%;">菜单图标</th>
	                        <th style="width:14%;">菜单类型</th>
	                        <th style="width:12%;">跳转方式</th>
	                        <th style="width:6%;">登陆标识</th>
	                        <th style="width:6%;">展示顺序</th>
	                        <th style="width:6%;">组</th>
	                        <th style="width:12%;">添加时间</th>
	                        <th style="width:14%;">操作</th>
	                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="11">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="menuList_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}
                            </td>
                            <td class="cel">${item.name}</td>
                            <td class="cel gallerys">
                           		<img width="20px" class="pre-img" height="20px" src="${staticUrl}${item.fileGroup}/${item.filePath}" title="${item.fileName}">
                            </td>
                            <td class="cel">
                            	<c:if test="${item.menuType == 1}">
                            		我的
                            	</c:if>
                            	<c:if test="${item.menuType == 0}">
                            		首页
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.skipType == 1}">
                            		外部链接
                            	</c:if>
                            	<c:if test="${item.skipType == 0}">
                            		内部链接
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.isLogin == 1}">
                            		<code class="alert-success">是</code>
                            	</c:if>
                            	<c:if test="${item.isLogin == 0}">
                            		<code>否</code>
                            	</c:if>
                            </td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">
                            	<c:if test="${ not empty  item.groupName}">
	                            	${item.groupName}
                            	</c:if>
                            		<c:if test="${ empty  item.groupName}">
	                            	--
                            	</c:if>
                            </td>
                            <td class="cel">
                            	<sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.ctime}"/>
                            </td>
                            <td>
                                <shiro:hasPermission name="appMenu:update">
                                    <a class="btn btn-primary btn-xs update-menu" data-id="${item.id}"><i class="fa fa-edit"></i>编辑</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="appMenu:view">
                                    <a class="btn btn-info btn-xs view-menu" data-id="${item.id}"><i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
   				 <%-- 分页表单参数 --%>
    			<%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
</body>

<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/template" title="提示" id="deleteAppMenu-dialog">
    <div class="ibox-content" id="deleteRole-dialog">
        <div data-id="title" class="dialog-item">
            <div class="dialog-tips">
                <p class="tips">确定删除所选菜单？</p>
            </div>
        </div>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" id="app-menu-dialog">
	<div class="ibox-content">
		<form id="edit-menu-form" class="clear form-horizontal">
			<input  type="hidden" name="id" id="edit-menu-id"/>
			<div class="row m-rl-tb">
				<label class="col-xs-2 control-label"><span class="red">*</span>菜单名称:</label>
				<div class="col-xs-4">
					<input type="text" class="form-control" id="edit-menu-name" tip="请输入菜单名称" name="name" autocomplete="off" url="<%=request.getContextPath() %>/appMenu/checkName.action" value="">
				</div>
				<label class="col-xs-2 control-label"><span class="red">*</span>菜单类型:</label>
				<div class="col-xs-4">
					<select class="menu-select" id="edit-menu-type" name="menuType">
						<option value="0">首页</option>
						<option value="1">我的</option>
					</select>
				</div>
			</div>
				
			<div class="row m-rl-tb">
				<label class="col-xs-2 control-label"><span class="red">*</span>跳转url:</label>
				<div class="col-xs-4">
					<input type="text" class="form-control" id="edit-menu-skip-url" tip="请输跳转URL" name="skipUrl"  check="validateMenuBak(this)" autocomplete="off" value="">
				</div>
				<label class="col-xs-2 control-label"><span class="red">*</span>跳转类型:</label>
				<div class="col-xs-4">
					<select  class="menu-select" id="edit-menu-skip-type" name="skipType">
						<option value="0">内部链接</option>
						<option value="1">外部链接</option>
					</select>
				</div>
			</div>
			<div class="row m-rl-tb">
				<label class="col-xs-2 control-label">展示顺序:</label>
				<div class="col-xs-4">
					<input type="text" class="form-control" id="edit-order-no" name="orderNo" tip="只能输入数字" check="validateMenuBak(this)" autocomplete="off" value="">
				</div>
				<label class="col-xs-2 control-label"><span class="red">*</span>需要登录:</label>
				<div class="col-xs-4">
					<select  class="menu-select" id="edit-menu-is-login" name="isLogin">
						<option value="1">是</option>
						<option value="0">否</option>
					</select>
				</div>
			</div>
					
			<div class="row m-rl-tb">
				<label class="col-xs-2 control-label">所在组:</label>
				<div class="col-xs-4">
					<input type="text" class="form-control" id="edit-menu-group" name="groupName" autocomplete="off" value="">
				</div>
			</div>
			<div class="row m-rl-tb">
				<label class="col-xs-2 control-label">备注:</label>
				<div class="col-xs-10">
					<textarea class="form-control" id="edit-menu-bak" name="remark" tip="长度不能超过50个字符" check="validateMenuBak(this)" value=""></textarea>
				</div>
			</div>
			<div class="row m-rl-tb">
				<label class="col-xs-2 control-label"><span class="red">*</span>菜单图标:</label>
				<div class="col-xs-10">
					<div id="appMenuUpload"></div>
					<div id="appMenuUploadTip" class="pn-flabel pn-flabel-h">
						<span class="red">注:该图标大小必须为小于1M。</span>
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
<script type="text/javascript" src="${ctx}/js/mine/system/appMenu/list.js"></script>
</html>

