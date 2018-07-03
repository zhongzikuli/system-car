<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>实时面签详情</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
		<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
		
		<link rel="stylesheet" href="${ctx}/js/third/rangeslider/rangeslider.css">
		<link rel="stylesheet" href="${ctx}/styles/third/yx/base.css"/>
		<link rel="stylesheet" href="${ctx}/styles/third/yx/main.css"/>
	</head>
	<body onbeforeunload="return closeEvent(event)">
		<input type="hidden" value="${id}" name="id" id="acceptId">
		<input type="hidden" value="${error}" name="error" id="error">
		<input type="hidden" value="${token}" name="token" id="token">
		<input type="hidden" value="" name="dynamicKey" id="dynamicKey">
		<input type="hidden" value="${appId}" name="appId" id="appId">
		<input type="hidden" value="${appCertificate}" name="appCertificate" id="appCertificate">
		<input type="hidden" value="${activeUserId}" name="activeUserId" id="activeUserId">
		<input type="hidden" value="${channel}" name="channel" id="channel">
		<input type="hidden" value="${salerId}" name="salerId" id="salerId">
		<div class="mod_header">
		    <div class="row">
		        <div class="col-sm-6">
		            <div class="form-group">
		                <p class="text-left">面签管理</p>
		            </div>
		        </div>
		        <div class="col-sm-6 text-right">
		        	<c:if test="${not empty callback}">
			            <div class="form-group">
			                <a class="btn btn-sm btn-info" href="${callback}">返回列表</a>
			            </div>
		        	</c:if>
		        </div>
		    </div>
		</div>
		<div class="mod_basic ibox-content">
		    <div class="tabs-container interview-detail-wrap">
		        <ul class="nav nav-tabs interview-detail-tab">
		            <li class="<c:if test="${status !=2}">active</c:if>" >
		            	<a data-toggle="tab" href="#tab-1" aria-expanded="true"><i class="fa default_icon icon_u_info"></i>客户信息</a>
		            </li>
		            <li class="<c:if test="${status== 2}">active</c:if>  <c:if test="${status != 2}">unleft</c:if>" >
		            	<a data-toggle="tab" href="#tab-2" aria-expanded="false"><i class="fa default_icon icon_u_interview"></i>实时面签</a>
		             </li>
		            <li class="unleft">
		            	<a id="video-tab" data-toggle="tab" href="#tab-3" aria-expanded="false"><i class="fa default_icon icon_u_vedio"></i>面签视频</a>
		            </li>
		            <li class="unleft">
		            	<a data-toggle="tab" href="#tab-4" aria-expanded="false" onclick="postion()"><i class="fa default_icon icon_u_postion"></i>客户位置</a>
		            </li>
		        </ul>
		        <div class="tab-content interview-detail-content">
		            <div id="tab-1" class="tab-pane <c:if test="${status !=2}">active</c:if>" >
		                <%@include file="/WEB-INF/views/interview/customer.jsp" %>
		            </div>
		            <div id="tab-2" class="tab-pane <c:if test="${status== 2}" >active</c:if>" >
			            <%@include file="/WEB-INF/views/interview/interview.jsp" %>
			        </div>
			        <div id="tab-3" class="tab-pane">
			            <%@include file="/WEB-INF/views/interview/video.jsp" %>
			        </div>
			        <div id="tab-4" class="tab-pane">
			            <%@include file="/WEB-INF/views/interview/postion.jsp" %>
			        </div>
			    </div>
			</div>
		    <%-- end tab-content --%>
		</div>
		<%-- js库引入 --%>
		<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
		<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
		<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/third/rangeslider/rangeslider.min.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/third/agora/js/rtcClient.js"></script>
		<script type="text/javascript" src="${ctx}/js/third/agora/js/vendor-bundle.js"></script>
		<script type="text/javascript" src="${ctx}/js/third/agora/js/utils.js"></script>
		<script type="text/javascript" src="${ctx}/js/third/agora/js/signalingClient.js"></script>
		<script type="text/javascript" src="${ctx}/js/mine/interview/config.js"></script>
		<script type="text/javascript" src="${ctx}/js/mine/interview/video.answer.js"></script>
		<script type="text/javascript" src="${ctx}/js/mine/interview/agora/detail.js"></script>
	</body>
</html>