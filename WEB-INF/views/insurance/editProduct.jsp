<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <h5><strong>编辑</strong></h5>
            </div>
        </div>
        <div class="col-sm-6 text-right">
            <div class="form-group">
                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic height-auto">
    <div class="ibox-content" id="productEdit-Form">
        <form id="productEditForm" class="form-horizontal">
            <div class="row">
                <div class="col-sm-5">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>保险标题:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="title_edit" id="title_edit"
                                   value="${entity.title}"
                                   obj="not_null">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>保险类型:</label>
                        <div class="col-xs-8">
                            <div obj="">
                                <select class="form-control insuranceType_edit" id="insuranceType_edit"
                                        name="insuranceType_edit" data-placeholder="保险类型..." check="validProduce(this)">
                                    <option value="">请选择保险类型</option>
                                    <option value="1"
                                    <c:if test="${entity.insuranceType==1}">selected</c:if>
                                    >车险
                                    </option>
                                    <option value="2"
                                    <c:if test="${entity.insuranceType==2}">selected</c:if>
                                    >寿险</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>状态:</label>
                        <div class="col-xs-8">
                            <div obj="" >
                                <select class="form-control status_edit" id="status_edit" name="status_edit"
                                         data-placeholder="保险状态..." check="validProduce(this)">
                                    <option value="">请选择保险类型</option>
                                    <option value="1"
                                    <c:if test="${entity.status==1}">selected</c:if>
                                    >上架</option>
                                    <option value="2"
                                    <c:if test="${entity.status==2}">selected</c:if>
                                    >下架</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="form-group">
                    <div class="col-xs-9">
                        <input id="insuranceFile" data-id="${entity.id}" data-group="${entity.fileGroup}"
                               data-path="${entity.filePath}" data-name="${entity.fileName}" type="hidden">
                        <div class="file-tip"><span class="red">*</span>选择保险图片(600*300)</div>
                            <div class="page-container">
                                <div id="editUploader"></div>
                            </div>
                    </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="col-xs-1 control-label" style="margin-left: 34px;"><span class="red">*</span> 内容:</label>
                        <div class="col-xs-9">
                            <input id='temp' type='hidden' value='${entity.content}'/>
                            <input id='insuranceId' type='hidden' value='${entity.id}'/>
                            <div id="content" style="width:100%;height:500px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" style="padding-right: 50px;">
            <input type="button" class="btn btn-primary submit-button" value="提交"/> &nbsp;
        </div>
    </div>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/ueditor.all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/insurance/edit.js"></script>
</html>