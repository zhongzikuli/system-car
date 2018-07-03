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
                <h5><strong>新增</strong></h5>
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
    <div class="ibox-content" id="productCreate-Form">
        <form id="productCreateForm" class="form-horizontal">
            <div class="row">
                <div class="col-sm-5">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>保险标题:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="title" id="title" obj="not_null">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>保险类型:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="保险类型不能为空">
                                <select class="form-control insuranceType" id="insuranceType" name="insuranceType"
                                        data-placeholder="保险类型..." check="validProduce(this)">
                                    <option value="">请选择保险类型</option>
                                    <option value="1">车险</option>
                                    <option value="2">寿险</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>状态:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="保险状态不能为空">
                                <select class="form-control status" id="status" name="status"
                                        data-placeholder="保险状态..." check="validProduce(this)">
                                    <option value="">请选择保险状态</option>
                                    <option value="1">上架</option>
                                    <option value="2">下架</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="form-group">
                        <div class="col-xs-9">
                        	<div class="file-tip"><span class="red">*</span>选择保险图片(600*300)</div>
                            <div class="page-container">
                                <div id="addUploader"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                	<div class="form-group">
                    	<label class="col-xs-1 control-label" style="margin-left: 34px;"><span class="red">*</span> 内容:</label>
                    	<div class="col-xs-9">
                        	<div id="addEditor" style="width:100%;height:500px;"></div>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/insurance/add.js"></script>
</html>