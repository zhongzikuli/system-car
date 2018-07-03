<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="title" id="advertTitle" value="${paramMap.title}"/>
        <input type="hidden" name="type" id="advertType" value="${paramMap.type}"/>
    </div>
    <form id="pagerForm" action="${ctx}/advert/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>

        <div class="row">
            <div class="col-sm-6">
                    <shiro:hasPermission name="uploadReport:uploadReport">
                    <button type="button" data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</button>
                    </shiro:hasPermission>
                <shiro:hasPermission name="uploadReport:delete">
                    <button type="button" data-toggle="modal" class="btn btn-danger btn-sm delete-btn"
                            onclick="deleteFile('${paramMap.title}','${paramMap.type}')">删除</button>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="uploadReport:download">
                    <button type="button" data-toggle="modal" class="btn btn-success btn-sm download-file"
                            onclick="downloadFile('${paramMap.title}','${paramMap.type}')">打包下载</button>
                 </shiro:hasPermission>
                    <shiro:hasPermission name="uploadReport:submit">
                    <button type="button" class="btn btn-sm btn-info" onclick="commit(${acceptId})" data>确定提交</button>
                    </shiro:hasPermission>
                <button type="button" class="btn btn-sm btn-danger check-btn" >全选</button>
            </div>
            <input type="hidden" name="type" id="type" value="${type}"/>
            <input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
            <input type="hidden" name="viewSource" id="viewSource" value="${viewSource}"/>
            <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
                <div class="col-sm-6 text-right">
                    <div class="form-group">
                        <a type="button" class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
                    </div>
                </div>
            </c:if>
        </div>
    </form>
</div>

<div class="mod_basic height-auto">
    <div class="row" style="margin: 30px auto;">
        <input type="hidden" id="OrderAcceptId" value="${acceptId}">
        <input type="hidden" id="oneType" value="${oneType}">
        <input type="hidden" id="oneAuditId" value="">
        <input type="hidden" id="data" value="">
        <div id="files" class="files gallerys"></div>
        <div id="pagination" class="pagination pagination-right"></div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/secondCar/uploadReport.js"></script>
<script type="text/template" title="新增" id="fileCreate-dialog">
    <div class="ibox-content">
        <form id="fileCreateForm" class="form-horizontal" method="post" enctype="multipart/form-data">
            <div class="form-group" style="margin:0;">
                <div class="page-container two-line">
                    <div id="uploader"></div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
