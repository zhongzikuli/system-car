<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
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
                <a class="btn btn-sm btn-info" href="${ctx}/sysVideo/query.action">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic height-auto">
    <div class="item-row" id="tab-sysVideoFrom">
        <form id="sysVideoForm" class="form-horizontal">
           <div id="askCreate-dialog">
         	<input id='temp' type='hidden' value='${video.content}'/>
         	<input id='fileId' type='hidden' value='${video.fileGroup}'/>
         	<input id='logoId' type='hidden' value='${video.logoPath}'/>
         	<input id='fileName' type='hidden' value='${video.fileName}'/>
         	<input id='fileGroup' type='hidden' value='${video.fileGroup}'/>
         	<input id='filePath' type='hidden' value='${video.filePath}'/>
         	<input id='logoName' type='hidden' value='${video.logoName}'/>
         	<input id='logoGroup' type='hidden' value='${video.logoGroup}'/>
         	<input id='logoPath' type='hidden' value='${video.logoPath}'/>
         	<input id='id' type='hidden' value='${video.id}'/>
         	<div class="form-group">
                    <label class="col-xs-2 control-label m-t-xs"><span class="red">*</span>视频标题:</label>
                    <div class="col-xs-9 m-t-xs">
                  		<input type="text" class="form-control" name="title"
                               id="title"  value="${video.title}"  check="validFrom(this)">
                    </div>
                </div>
         		<div class="form-group">
                    <label class="col-xs-2 control-label"><span class="red">*</span>视频类型:</label>
                    <div class="col-xs-9">
                      	<div obj="">
                        <sl:select name="type" classValue="form-control creditStatusCode status" classType="650000"
                            check="validFrom(this)" defaultValue="true" id="type" keyWorld="${video.type}"/>
                        </div>
                    </div>
                </div>
        		<div class="form-group">
                    <label class="col-xs-2 control-label"><span class="red">*</span>推荐:</label>
                    <div class="col-xs-9">
                    <div obj="">
                        <select id="isRecommand" name="isRecommand"
                         check="validFrom(this)"  class="form-control years-type status" data-placeholder="年限...">
                            <option value="">请选择</option>
                           	<option value="1"<c:if test="${video.isRecommand eq '1'}">selected</c:if>>是</option>
                           	<option value="0"<c:if test="${video.isRecommand eq '0'}">selected</c:if>>否</option>
                        </select>
                        </div>
                    </div>
                </div>
           </div>
           <div class="form-group">
	           <label class="col-xs-2 control-label"><span class="red">*</span>视频文件:</label>
	           <div class="col-xs-4">
	                 <div class="page-container">
	                      <div id="fileUploader" ></div>
	                </div>
	           </div>  
	            <label class="col-xs-1 control-label"><span class="red">*</span>视频封面:</label>
	                <div class="col-xs-4">
	                     <div class="page-container">
	                          <div id="fileUploader2" ></div>
                        </div>
                 </div>
           </div>
           <div class="form-group">
                 <label class="col-xs-2 control-label"><span class="red">*</span> 内容:</label>
                <div class="col-xs-9">
                    <div id="addEditor" style="width:100%;height:500px;"></div>
                </div>  
           </div>
        </form>
        <div class="dialog-manage" style="text-align: center;margin-bottom: 10px;">
            <input type="button" class="btn btn-primary submit-button" value="提交"/>
        	<a class="btn  btn-default" href="${ctx}/sysVideo/query.action">取消</a>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/ueditor.all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/sysVideo/edit.js"></script>
</html>
