<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
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
    <div class="ibox-content" id="noticeCreate-Form">
        <form id="noticeCreateForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-2 control-label"><span class="red">*</span>公告标题:</label>
                <div class="col-xs-3">
                    <input type="text" class="form-control" name="remark" id="notice-title" 
                    	tip="公告标题不能为空" check="validFileForm (this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label"><span class="red">*</span> 内容:</label>
                <div class="col-xs-9">
                    <div id="addEditor" style="width:100%;height:500px;"></div>
                </div>
            </div>
	        <div class="dialog-manage">
	            <input type="button" class="btn btn-primary submit-button" value="提交"/> &nbsp; 
	            <input type="button" class="btn btn-default btn-reset"value="重置">
	        </div>
        </form>
    </div>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/ueditor.all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/system/notice/add.js"></script>
</html>