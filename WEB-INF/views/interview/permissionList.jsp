<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
    <input type="hidden" name="AppKey" value="${paramMap.AppKey}"/>
    <input type="hidden" name="sTime" value="${paramMap.sTime}"/>
    <input type="hidden" name="eTime" value="${paramMap.eTime}"/>
    <input type="hidden" name="permissionStatus" value="${paramMap.permissionStatus}"/>
    </div>
    <form id="pagerForm" action="${ctx}/interviewPermission/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="interviewPermission:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="createInterviewPermission()">新增</a>
                </shiro:hasPermission>

                <shiro:hasPermission name="interviewPermission:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm"
                       onclick="deleteinterviewPermission('${paramMap.permissionStatus}','${paramMap.AppKey}','${paramMap.sTime}','${paramMap.eTime}')">删除</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">授权状态:</label>
                        <select class="form-control" id="search-select" name="permissionStatus"
                                data-placeholder="授权状态...">
                            <option value="">请选择</option>
                            <option value="1"
                                    <c:if test="${paramMap.permissionStatus eq  1  }">selected</c:if>
                            >是</option>
                            <option value="0"
                                    <c:if test="${paramMap.permissionStatus eq  0  }">selected</c:if>
                            >否</option>
                        </select>
                    </div>
                    <div id="date-time">
                        <div class="form-group" id="interviewPermission-start-date">
                            <label class="control-label label" >开始时间:</label>
                            <input type="text" class="form-control" name="sTime" id="sTime" value="${paramMap.sTime}">
                        </div>
                        <div class="form-group" id="interviewPermission-end-date">
                            <label class="control-label label">结束时间:</label>
                            <input type="text" class="form-control" name="eTime" id="eTime" value="${paramMap.eTime}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">videokey:</label>
                        <input type="text" name="AppKey" class="form-control" onkeyup="value=value.replace(/\s/g,'')"
                               id="search-AppKey" value="${paramMap.AppKey}"/>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" >
                        </th>
                        <th style="width:5%;">名称</th>
                        <th style="width:8%;">videoKey</th>
                        <th style="width:15%;">videoSecurity</th>
                        <th style="width:12%;">开始日期</th>
                        <th style="width:12%;">结束日期</th>
                        <th style="width:5%;">状态</th>
                        <th style="width:12%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="8">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="interviewPermission_input"
                                       value="${item.id}"></td>
                            <td class="cel">${item.name}</td>
                            <td class="cel">${item.videoKey}</td>
                            <td class="cel">${item.videoSecurity}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.beginTime}" pattern="yyyy-MM-dd "/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.endTime}" pattern="yyyy-MM-dd "/>
                            </td>
                            <c:if test="${item.permissionStatus ==1}">
                                <td class="cel" id="status_value">是</td>
                            </c:if>
                            <c:if test="${item.permissionStatus ==0}">
                                <td class="cel" id="status_value">否</td>
                            </c:if>
                             <td class="btn-cel">
                                <a href="#" onclick="detailInfo('${item.name}','${item.videoKey}','${item.videoSecurity}',
	                                          '<sl:format type="date" show="${item.beginTime}" pattern="yyyy-MM-dd hh:mm"/>',
                                '<sl:format type="date" show="${item.endTime}" pattern="yyyy-MM-dd hh:mm"/>')"
                                class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>

                                <a data-toggle="modal" class="btn btn-primary btn-xs"
                                   onclick="editinterviewPermission('${item.id}','${item.permissionStatus}','${item.videoKey}',
	                                     '<sl:format type="date" show="${item.beginTime}" pattern="yyyy-MM-dd hh:mm"/>',
                                '<sl:format type="date" show="${item.endTime}" pattern="yyyy-MM-dd hh:mm"/>',
                                '${paramMap.AppKey}','${paramMap.permissionStatus}','${paramMap.sTime}','${paramMap.eTime}')"><i class="fa fa-edit"></i>编辑</a>

                                <a href="#" onclick="stop('${item.id}','${paramMap.permissionStatus}','${paramMap.AppKey}',
	                                '${paramMap.sTime}','${paramMap.eTime}')" class="btn btn-primary btn-xs"
                                   id="start${item.id}"
                                <c:if test="${item.permissionStatus ==1}">
                                    style="display:none;"
                                </c:if>
                                ><i class="fa fa-edit"></i>启用</a>

                                <a href="#" onclick="start('${item.id}','${paramMap.permissionStatus}','${paramMap.AppKey}',
	                                '${paramMap.sTime}','${paramMap.eTime}')" class="btn btn-danger btn-xs"
                                   id="stop${item.id}"
                                <c:if test="${item.permissionStatus ==0}">
                                    style="display:none;"
                                </c:if>
                                ><i class="fa fa-edit"></i>停用</a>
                                <shiro:hasPermission name="interviewPermission:preUpdate">

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
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/interview/permission/interviewPermissionList.js"></script>
<script type="text/template" title="新增" id="interviewPermission-dialog">
    <div class="ibox-content">
        <form id="interviewPermissionForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="name_create" id="name_create"
                               check="interviewPermissionForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>videokey:</label>
                    <div class="col-xs-8">
                         <input type="text" class="form-control" name="remark" id="Appkey_create"
                                   readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>videoSecurity:</label>
                    <div class="col-xs-8">
                         <input type="text" class="form-control" name="remark" id="Security_create"
                                   readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="form-group" >
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>开始日期:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" check="interviewPermissionForm(this)"
                               name="sTime_create" id="sTime_create" value="">
                    </div>
                </div>
            </div>
            <div class="form-group" >
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>结束日期:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="eTime_create" check="interviewPermissionForm(this)"
                               id="eTime_create" value=""/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>状态:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select data-placeholder="状态..." id="permission_status_create" check="interviewPermissionForm(this)"
                                    class="form-control permission_status_create">
                                <option value="">请选择</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
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
<script type="text/template" title="编辑" id="interviewPermission-dialog_edit">
    <div class="ibox-content">
        <form id="interviewPermissionForm_edit" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>名称:</label>
                    <div class="col-xs-8" >
                        <input type="text" class="form-control" name="name_edit" id="name_edit"
                               readonly="readonly" >
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>videokey:</label>
                    <div class="col-xs-8" >
                        <input type="text" class="form-control" name="remark" id="Appkey_edit"
                               readonly>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>videoSecurity:</label>
                    <div class="col-xs-8" >
                        <div class="input-group">
                            <input type="text" class="form-control" name="remark" id="Security_edit"
                                   readonly="readonly">
                            <span class="input-group-btn">
                                 <button type="button" class="btn btn-primary" id="create_Security">刷新</button>
                        	</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group" id="interviewPermission-end-date">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>开始日期:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="sTime_edit"  check="interviewPermissionForm(this)"
                               value=""     id="sTime_edit" >
                    </div>
                </div>
            </div>
            <div class="form-group" id="interviewPermission-end-date">
                <div class="col-sm-12">
                    <label class="control-label col-xs-3"><span class="red">*</span>结束日期:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control"  name="eTime_edit"  check="interviewPermissionForm(this)"
                               value=""     id="eTime_edit" >
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>状态:</label>
                    <div class="col-xs-8">
                        <div obj="" >
                            <select data-placeholder="状态..." id="permission_status_edit" check="interviewPermissionForm(this)"
                                    class="form-control permission_status_edit">
                                <option value="">请选择</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
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
<script type="text/template" title="查看" id="interviewPermission-dialog_detail">
    <div class="ibox-content">
        <form id="interviewPermissionForm_detail" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="name_detail" id="name_detail" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">videokey:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="Appkey_detail" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">videoSecurity:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="Security_detail" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">开始日期:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="sTime_detail" id="sTime_detail" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="control-label col-xs-3">结束日期:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="eTime_detail" id="eTime_detail" readonly>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
