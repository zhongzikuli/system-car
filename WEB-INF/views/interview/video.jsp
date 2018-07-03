<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<body>
<div class="ibox interview-wrap item">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>视频影像</h5>
    </div>
</div>
<div class="video-wrap">
    <c:if test="${not empty vPath}">
        <video style="border: 4px solid #eee;" src="${vPath}" width="450" height="340" controls="controls">您的浏览器不支持视频标签</video>
    </c:if>
    <c:if test="${empty vPath}">
        <div class="video-content ibox-content b-n">
            <p class="text-center tip-message">
                <c:if test="${status == 1}">
                    <code class="alert-info">未完成的面签</code>
                </c:if>
                <c:if test="${status == 2}">
                    <code class="alert-warning">未完成的面签</code>
                </c:if>
                <c:if test="${status == 3}">
                	<div class="loading-wrap bounceIn show">
						视频合成中…
						<div class="loading-img"><img src="${ctx}/styles/images/icon_waiting.gif"></div>
					</div>
                </c:if>
            </p>
        </div>
    </c:if>
</div>
</body>
</html>