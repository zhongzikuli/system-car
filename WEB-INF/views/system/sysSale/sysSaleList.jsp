<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="sysSaleName" value="${paramMap.name}"/>
        <input type="hidden" name="sysSaleTel" value="${paramMap.tel}"/>
        <input type="hidden" name="sysSaleCompanyName" value="${paramMap.companyName}"/>
    </div>
    <form id="pagerForm" action="${ctx}/sale/listPage.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                <shiro:hasPermission name="sysSale:insert">
                    <a data-toggle="modal" class="btn btn-primary btn-sm insert">新增</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">名称:</label>
                        <input type="text" name="sysSaleName" class="form-control"
                               id="sysSaleName" value="${paramMap.name}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">手机号码:</label>
                        <input type="text" name="sysSaleTel" class="form-control"
                               id="sysSaleTel" value="${paramMap.tel}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">公司名称:</label>
                        <input type="text" name="sysSaleCompanyName" class="form-control"
                               id="sysSaleCompanyName" value="${paramMap.companyName}"/>
                        <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
                        <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                    <th style="width:5%;">序号</th>
                    <th style="width:10%;">名称</th>
                    <th style="width:10%;">手机号码</th>
                    <th style="width:20%;">公司名称</th>
                    <th style="width:10%;">状态</th>
                    <th style="width:30%;">备注</th>
                    <th style="width:15%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="7">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td title="${item.name}" class="max-200">
                            <%--<c:if test="${item.name.length() > 10}">--%>
                                <%--${item.name.substring(0,10)}...--%>
                            <%--</c:if>--%>
                            <%--<c:if test="${item.name.length() <= 10}">--%>
                                ${item.name}
                            <%--</c:if>--%>
                        </td>
                        <td title="${item.tel}">
                                ${item.tel}
                        </td>
                        <td title="${item.companyName}" style="max-width: 350px">
                            <%--<c:if test="${item.companyName.length() > 30}">--%>
                                <%--${item.companyName.substring(0,30)}...--%>
                            <%--</c:if>--%>
                            <%--<c:if test="${item.companyName.length() <= 30}">--%>
                                ${item.companyName}
                            <%--</c:if>--%>
                        </td>
                        <td >
                            <c:choose>
                                <c:when test="${item.status ==1}">
                                    未联系
                                </c:when>
                                <c:when test="${item.status == 2}">
                                    已联系（潜在客户）
                                </c:when>
                                <c:when test="${item.status ==3}">
                                    已联系（非潜在客户）
                                </c:when>
                                <c:otherwise>
                                    未知状态
                                </c:otherwise>
                            </c:choose>
                        </td>
                        <td title="${item.remark}" style="max-width: 500px">
                            <%--<c:if test="${item.remark.length() > 40}">--%>
                               <%--${item.remark.substring(0,40)}...--%>
                            <%--</c:if>--%>
                            <%--<c:if test="${item.remark.length() <= 40}">--%>
                                ${item.remark}
                            <%--</c:if>--%>
                        </td>
                        <td class="btn-cel" style="padding-left: 48px;">
                            <a href="#" class="btn btn-info btn-xs detail" data-id="${item.id}">
                                <i class="fa fa-search-plus"></i>查看</a>
                            <shiro:hasPermission name="sysSale:update">
                                <a href="#" class="btn btn-primary btn-xs edit" data-id="${item.id}">
                                    <i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="sysSale:delete">
                                <a href="#"  class="btn btn-danger btn-xs delete"  data-id="${item.id}">
                                    <i class="fa fa-edit"></i>删除</a>
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
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/sysSale/sysSaleList.js"></script>
<script type="text/template" title="新增" id="sysSale-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="sysSaleForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="name" id="name"
                           check="sysSaleForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>手机号码:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="tel" id="tel"
                           check="sysSaleForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>公司名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="companyName" id="companyName"
                           check="sysSaleForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>状态:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="status"
                                 check="sysSaleForm(this)"    class="form-control ">
                            <option value="" selected>请选择</option>
                            <option value="1">未联系</option>
                            <option value="2">已联系(潜在客户)</option>
                            <option value="3">已联系(非潜在客户)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                <div class="col-xs-8">
                    <textarea name="remark" id="remark" cols="20" rows="4" class="form-control"
                              check="sysSaleForm(this)"></textarea>
                </div>
            </div>

        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="编辑" id="sysSale-dialog-edit">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="sysSaleForm_edit" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="name_edit" id="name_edit"
                           check="sysSaleForm(this)" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>手机号码:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="tel_edit" id="tel_edit"
                           check="sysSaleForm(this)" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>公司名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="companyName_edit" id="companyName_edit"
                           check="sysSaleForm(this)" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>状态:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="status_edit"
                                 check="sysSaleForm(this)"    class="form-control ">
                            <option value="">请选择</option>
                            <option value="1">未联系</option>
                            <option value="2">已联系(潜在客户)</option>
                            <option value="3">已联系(非潜在客户)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                <div class="col-xs-8">
                    <textarea name="remark_edit" id="remark_edit" cols="20" rows="4" class="form-control"
                              check="sysSaleForm(this)"></textarea>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="查看" id="sysSale-dialog-detail">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="sysSaleForm_detail" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="name_edit" id="name_detail"
                           check="sysSaleForm(this)" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">手机号码:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="tel_edit" id="tel_detail"
                           check="sysSaleForm(this)" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">公司名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="companyName_edit" id="companyName_detail"
                           check="sysSaleForm(this)" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">状态:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="status_detail"
                                 check="sysSaleForm(this)"    class="form-control " disabled>
                            <option value="">请选择</option>
                            <option value="1">未联系</option>
                            <option value="2">已联系(潜在客户)</option>
                            <option value="3">已联系(非潜在客户)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">备注:</label>
                <div class="col-xs-8">
                    <textarea name="remark_edit" id="remark_detail" cols="20" rows="4" class="form-control"
                              check="sysSaleForm(this)" disabled></textarea>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
