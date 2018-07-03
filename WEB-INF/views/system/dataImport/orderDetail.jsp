<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>数据导入</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="${ctx}/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
</div>
<div class="mod_basic">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-6">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-6">
                            <div id="addOrderUploader"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-6">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-6">
                            <div id="addOrderDetailUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</div>
</body>

<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/dataImport/orderDetailImport.js"></script>
</html>