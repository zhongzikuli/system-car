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
        <input type="hidden" name="carSerialSecond"  value="${paramMap.carSerialSecond}"/>
    </div>
    <form id="pagerForm" action="${ctx}/cfCarBrand/queryCarSerialSecondName.action" method="post" style="margin:0;">
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
                        <label class="control-label label">车系(二级):</label>
                         <input type="hidden" name="brandNameMain"  id="brandNameMain" value="${paramMap.brandNameMain}"/>
                         <input type="hidden" name="carSerialFirst"  id="carSerialFirst" value="${paramMap.carSerialFirst}"/>
                        <input type="text" name="carSerialSecond" class="form-control"
                               id="carSerialSecond" value="${paramMap.carSerialSecond}"/>
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                        <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                        <a class="btn btn-primary btn-sm back">返回列表</a>
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
                    <th style="width:8%;">车系(二级)</th>
                    <th style="width:8%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="6">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.carSerialSecond}</td>
                        <td class="btn-cel" style="padding-left: 250px;">
                            <shiro:hasPermission name="cfCarBrand:update">
                                <a href="#" class="btn btn-primary btn-xs edit" data-id="${item.carSerialSecond}">
                                    <i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>

                            <a href="#"  class="btn btn-primary btn-xs start"  data-id="${item.carSerialSecond}"
                                    <c:if test="${item.forbidden ==0}">
                                        style="display:none;"
                                    </c:if>>
                                <i class="fa fa-edit"></i>启用</a>
                            <a href="#"  class="btn btn-danger btn-xs stop"  data-id="${item.carSerialSecond}"
                                    <c:if test="${item.forbidden ==1}">
                                        style="display:none;"
                                    </c:if>>
                                <i class="fa fa-edit"></i>禁用</a>

                            <a href="#"  class="btn btn-info btn-xs mainCar-Administration" data-id="${item.carSerialSecond}">
                                <i class="fa fa-cloud-download"></i>车系管理</a>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/carBrand/carBrandSecondList.js"></script>
<script type="text/template" title="新增" id="carBrand-dialog">
    <div class="ibox-content">
        <form id="carBrandForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>车系(二级):</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="carSerialSecond_add" id="carSerialSecond_add"
                               check="cfCarBrandForm(this)">
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
<script type="text/template" title="编辑" id="carBrand-dialog-edit">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="carBrandForm_edit" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>车系(二级):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="carSerialSecond_edit" id="carSerialSecond_edit"
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
