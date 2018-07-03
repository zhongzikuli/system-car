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
        <input type="hidden" name="brandNameMain" value="${paramMap.brandNameMain}"/>
        <input type="hidden" name="firstLetter" value="${paramMap.firstLetter}"/>
    </div>
    <form id="pagerForm" action="${ctx}/cfCarBrand/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                 <shiro:hasPermission name="cfCarBrand:importExcel">
                <a data-toggle="modal" class="btn btn-success btn-sm importExcel">导入</a>
                 </shiro:hasPermission>
                  <a data-toggle="modal" class="btn btn-info btn-sm reset-btn" onclick="exportExcel()">模板下载</a>
                  <shiro:hasPermission name="cfCarBrand:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm insert">新增</a>
                  </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">主品牌名称:</label>
                        <input type="text" name="brandNameMain" class="form-control"
                               id="brandNameMain" value="${paramMap.brandNameMain}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">首字母:</label>
                        <input type="text" name="firstLetter" class="form-control"
                               id="firstLetter" value="${paramMap.firstLetter}"/>
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">主品牌名称</th>
                    <th style="width:8%;">首字母</th>
                    <th style="width:2%;">操作</th>
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
                        <td >${item.brandNameMain}</td>
                        <td >${item.firstLetter}</td>
                        <td class="btn-cel" style="padding-left: 98px;">
                            <shiro:hasPermission name="cfCarBrand:update">
                                <a href="#" class="btn btn-primary btn-xs edit" data-id="${item.brandNameMain}">
                                    <i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>

                            <a href="#"  class="btn btn-primary btn-xs start"  data-id="${item.brandNameMain}"
                                    <c:if test="${item.forbidden ==0}">
                                        style="display:none;"
                                    </c:if>>
                                <i class="fa fa-edit"></i>启用</a>
                            <a href="#"  class="btn btn-danger btn-xs stop"  data-id="${item.brandNameMain}"
                                    <c:if test="${item.forbidden ==1}">
                                        style="display:none;"
                                    </c:if>>
                                <i class="fa fa-edit"></i>禁用</a>

                            <a href="#"  class="btn btn-info btn-xs mainCar-Administration" data-id="${item.brandNameMain}">
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
<script type="text/javascript" src="${ctx}/js/mine/system/carBrand/carBrandList.js"></script>
<script type="text/template" title="新增" id="carBrand-dialog">
    <div class="ibox-content">
        <form id="carBrandForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>主品牌名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="brandNameMains" id="brandNameMains"
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
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>主品牌名称:</label>
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
<script type="text/template" title="查看" id="carBrandDetail-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="carBrandForm_detail" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">品牌名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankName_detail" id="bankName_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">品牌简称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankShortName_detail" id="bankShortName_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">品牌类型:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankCode_detail" id="bankCode_detail"
                           readonly>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>
<script type="text/template" title="导入车型" id="importCarBrand-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="importExcelUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>
</html>
