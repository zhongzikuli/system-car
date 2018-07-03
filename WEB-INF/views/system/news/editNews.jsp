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
        <form id="newsEditForm" class="form-horizontal">
            <div class="row">
                <div class="col-sm-5">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>资讯标题:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="title_edit" id="title"
                                   value="${entity.title}"
                                   obj="not_null">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>资讯类型:</label>
                        <div class="col-xs-8">
                            <div obj="">
                                <sl:select name="type" classValue="form-control type" classType="640000"
                                       defaultValue="true" id="type" keyWorld="${entity.type}"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>是否推荐:</label>
                        <div class="col-xs-8">
                            <div obj="" >
                                <select class="form-control isRecommand_edit" id="isRecommand" name="isRecommand"
                                         data-placeholder="推荐状态..." check="validProduce(this)">
                                    <option value="">请选择推荐状态</option>
                                    <option value="1" <c:if test="${entity.isRecommand==1}">selected</c:if> >是</option>
                                    <option value="2" <c:if test="${entity.isRecommand==0}">selected</c:if> >否</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="form-group">
                    <div class="col-xs-9">
                        <input id="newsFile" data-id="${entity.id}" data-group="${entity.fileGroup}"
                               data-path="${entity.filePath}" data-name="${entity.fileName}" type="hidden">
                        <div class="file-tip"><span class="red">*</span>选择LOGO图片</div>
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
                            <input id='id' type='hidden' value='${entity.id}'/>
                            <div id="content" style="width:100%;height:500px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <input type="button" class="btn btn-primary submit-button" value="提交"/> &nbsp;
            <a class="btn  btn-default" href="${ctx}/news/query.action">取消</a>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/system/news/edit.js"></script>
</html>