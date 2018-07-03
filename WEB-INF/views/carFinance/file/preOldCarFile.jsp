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
            <div class="col-sm-6" style="margin-top: 2px;">
                <shiro:hasPermission name="carTransferFile:save">
                <button type="button" data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</button>
                </shiro:hasPermission>
                 <shiro:hasPermission name="carTransferFile:delete">
                <button type="button" data-toggle="modal" class="btn btn-danger btn-sm delete-btn"
                   onclick="deleteFile('${paramMap.title}','${paramMap.type}')">删除</button>
               </shiro:hasPermission>
                 <shiro:hasPermission name="carTransferFile:download">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm download-file"
                       onclick="downloadFile('${paramMap.title}','${paramMap.type}')">打包下载</button>
                </shiro:hasPermission>
                <shiro:hasPermission name="carTransferFile:submit">
                <button type="button" class="btn btn-sm btn-info" onclick="commit(${acceptId},${oneType})">确定提交</button>
            	</shiro:hasPermission>
                <button type="button" class="btn btn-sm btn-danger check-btn" >全选</button>
            </div>
            <input type="hidden" name="type" id="type" value="${type}"/>
                <input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
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

<div class="mod_basic ibox-content car-finance" >
    <div class="item-row">
        <fieldset  >
        <c:if test="${auditList==null || auditList.size() == 0 }">
                <legend>审核信息</legend>
                <div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>
        </c:if>
        <c:forEach items="${auditList}" var="item">
                <legend>审核信息</legend>
                <div class="infor-item m">
                     <div class="box-item row mr-none">
                    <div class="col-xs-2">
                        <div class="item-text">
                            <span>审核类型:</span>
                            <span>
                            	<c:if test="${item.bussinessType==2}">车辆候补</c:if>
		                        <c:if test="${item.bussinessType==4}">候补资料</c:if>
		                        <c:if test="${item.bussinessType==5}">抵押材料</c:if>
		                        <c:if test="${item.bussinessType==7}">过户材料</c:if>
                            </span>
                        </div>
                    </div>
                    <div class="col-xs-2">
                        <div class="item-text">
                            <span>审核状态:</span>
                            <span>
                            	<c:if test="${item.auditStatus==0}">待提交</c:if>
		                        <c:if test="${item.auditStatus==1}">已提交</c:if>
		                        <c:if test="${item.auditStatus==3}">保存</c:if>
		                        <c:if test="${item.auditStatus==-4}">拒绝</c:if>
		                        <c:if test="${item.auditStatus==-2}">退回</c:if>
		                        <c:if test="${item.auditStatus==-3}">作废</c:if>
                            </span>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="item-text">
                            <span>备注:</span>
                            <span> ${item.auditBak}</span>
                        </div>
                    </div>
                    <div class="col-xs-2">
                        <div class="item-text">
                            <span>审核人员:</span>
                            <span>${item.auditRealName}</span>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="item-text">
                            <span>审核时间:</span>
                            <span><fmt:formatDate value="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/></span>
                        </div>
                    </div>
                </div>
            </div>
        </c:forEach>
    	</fieldset>
    </div>
    <div class="item-row" >
       	<fieldset>
        <input type="hidden" id="OrderAcceptId" value="${acceptId}">
        <input type="hidden" id="oneType" value="${oneType}">
        <input type="hidden" id="oneAuditId" value="">
        <input type="hidden" id="data" value="">
                <legend>附件信息</legend>
        		<div id="files" class="files"></div>
        </fieldset>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/file/oldCarFile.js"></script>
<script type="text/template" title="新增" id="fileCreate-dialog">
    <div class="ibox-content">
        <form id="fileCreateForm" class="form-horizontal">
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
