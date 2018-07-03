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
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="brandNameMain"  id="brandNameMain" value="${paramMap.brandNameMain}"/>
        <input type="hidden" name="carSerialFirst"  id="carSerialFirst" value="${paramMap.carSerialFirst}"/>
        <input type="hidden" name="carSerialSecond"  id="carSerialSecond" value="${paramMap.carSerialSecond}"/>
        <input type="hidden" name="brandName"  value="${paramMap.brandName}"/>
    </div>
    <form id="pagerForm" action="${ctx}/cfCarBrand/queryCarSerialLastName.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                  <shiro:hasPermission name="cfCarBrand:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm insert">新增</a>
                  </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">品牌名称:</label>
                         <input type="hidden" name="brandNameMain"  id="brandNameMain" value="${paramMap.brandNameMain}"/>
                         <input type="hidden" name="carSerialFirst"  id="carSerialFirst" value="${paramMap.carSerialFirst}"/>
                         <input type="hidden" name="carSerialSecond"  id="carSerialSecond" value="${paramMap.carSerialSecond}"/>
                         
                        <input type="text" name="brandName" class="form-control"
                               id="brandName" value="${paramMap.brandName}"/>
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                        <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                        <a class="btn btn-primary btn-sm" onclick="history.back(-1);">返回列表</a>
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
                    <th style="width:2%;">序号</th>
                    <th style="width:5%;">品牌名称</th>
                    <th style="width:3%;">发动机</th>
                    <th style="width:3%;">变速箱</th>
                    <th style="width:3%;">年份</th>
                    <th style="width:5%;">品牌类型</th>
                    <th style="width:3%;">标准方式</th>
                    <th style="width:3%;">排序</th>
                    <th style="width:5%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="9">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.brandName}</td>
                        <td >${item.gear}</td>
                        <td >${item.brakeType}</td>
                        <td >${item.year}</td>
                        <td class="cel">
						<c:if test="${item.brandType == 1}"><code class="alert-success">国产车</code></c:if>
						<c:if test="${item.brandType == 2}"><code class="alert-success">进口车</code></c:if>
						<c:if test="${item.brandType == 3}"><code class="alert-success">合资车</code></c:if>
						</td>
                        <td >${item.standType}</td>
                        <td >${item.orderNo}</td>
                        <td class="btn-cel" style="padding-left: 100px;">
                            <shiro:hasPermission name="cfCarBrand:update">
                                <a href="#" class="btn btn-primary btn-xs edit" data-id="${item.id}">
                                    <i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>

                            <a href="#"  class="btn btn-primary btn-xs start"  data-id="${item.id}"
                                    <c:if test="${item.forbidden ==0}">
                                        style="display:none;"
                                    </c:if>>
                                <i class="fa fa-edit"></i>启用</a>
                            <a href="#"  class="btn btn-danger btn-xs stop"  data-id="${item.id}"
                                    <c:if test="${item.forbidden ==1}">
                                        style="display:none;"
                                    </c:if>>
                                <i class="fa fa-edit"></i>禁用</a>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/carBrand/carBrandLastList.js"></script>
<script type="text/template" title="新增" id="carBrand-dialog">
    <div class="ibox-content">
        <form id="carBrandForm" class="form-horizontal">
			<div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年份:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select name="year" class="form-control" id="year_add" check="cfCarBrandForm(this)" >
							<option value="">请选择</option>
							</select>
                        </div>
                    </div>
            </div>
			<!-- 
			<div class="form-group">
                    <label class="col-xs-3 control-label">发动机:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="请输入正确的发动机">
	                                <select data-placeholder="发动机选择..." id="user-areaId"
	                                        class="area-chosen-select form-control" name="gear_add">
	                                    <option value="">请选择</option>
	                                    <c:forEach var="area" items="${gear}" varStatus="st">
	                                        <c:if test="${area.parentId != 0}">
	                                            <option value="${area.keyWorld}">${area.valueDesc}</option>
	                                        </c:if>
	                                    </c:forEach>
	                                </select>
	                    </div>
	                </div>
            </div>
 			-->
			<div class="form-group">
                    <label class="col-xs-3 control-label">变速箱:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select  id="brakeType_add"  class="form-control ">
                                <option value="">请选择</option>
                                <option value="手动">手动</option>
                                <option value="自动">自动</option>
                                <option value="手自一体">手自一体</option>
                            </select>
                        </div>
                    </div>
            </div>
			<div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>品牌类型:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select  id="brandType_add" check="cfCarBrandForm(this)" class="form-control ">
                                <option value="">请选择</option>
                                <option value="1">国产车</option>
                                <option value="2">进口车</option>
                                <option value="3">合资车</option>
                            </select>
                        </div>
                    </div>
            </div>
		<div class="form-group">
                    <label class="col-xs-3 control-label">发动机:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="gear_add" id="gear_add">
                    </div>
            </div>
<!-- 
			<div class="form-group">
                    <label class="col-xs-3 control-label">标准方式:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="请输入正确的发动机">
	                                <select data-placeholder="发动机选择..." id="user-areaId"
	                                        class="area-chosen-select form-control" name="standType">
	                                    <option value="">请选择</option>
	                                    <c:forEach var="area" items="${standType}" varStatus="st">
	                                        <c:if test="${area.parentId != 0}">
	                                            <option value="${area.keyWorld}">${area.valueDesc}</option>
	                                        </c:if>
	                                    </c:forEach>
	                                </select>
	                    </div>
	                </div>
            </div>
-->
			<div class="form-group">
                    <label class="col-xs-3 control-label">标准方式:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="standType_add" id="standType_add">
                    </div>
            </div>
			
            <div class="form-group">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="orderNo_add" id="orderNo_add">
                    </div>
            </div>
			<div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>品牌名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="brandName_add" id="brandName_add"
                               check="cfCarBrandForm(this)">
                    </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="编辑" id="carBrand-dialog-edit">
    <div class="ibox-content" style="margin-bottom:0;">
       <form id="carBrandForm_edit" class="form-horizontal">
			<div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年份:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select name="year" class="form-control" id="year_edit">
							<option value="">请选择</option>
							</select>
                        </div>
                    </div>
            </div>
			<div class="form-group">
                    <label class="col-xs-3 control-label">变速箱:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select  id="brakeType_edit"  class="form-control ">
                                <option value="">请选择</option>
                                <option value="手动">手动</option>
                                <option value="自动">自动</option>
                                <option value="手自一体">手自一体</option>
                            </select>
                        </div>
                    </div>
            </div>
			<div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>品牌类型:</label>
                    <div class="col-xs-8" >
                        <div obj="" >
                            <select  id="brandType_edit" check="cfCarBrandForm(this)" class="form-control ">
                                <option value="">请选择</option>
                                <option value="1">国产车</option>
                                <option value="2">进口车</option>
                                <option value="3">合资车</option>
                            </select>
                        </div>
                    </div>
            </div>
		<div class="form-group">
                    <label class="col-xs-3 control-label">发动机:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="gear_edit" id="gear_edit">
                    </div>
            </div>
			<div class="form-group">
                    <label class="col-xs-3 control-label">标准方式:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="standType_edit" id="standType_edit">
                    </div>
            </div>
			
            <div class="form-group">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="orderNo_edit" id="orderNo_edit">
                    </div>
            </div>
			<div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>品牌名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="brandName_edit" id="brandName_edit"
                               check="cfCarBrandForm(this)">
                    </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</script>
</html>
