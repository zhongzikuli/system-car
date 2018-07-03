<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>浩韵后台管理系统登陆</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/outer_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
    </head>
<body class="gray-bg body-bg" onload="checkForm()">
<div class="sys_alert row animated fadeInDown">
        <div class="col-xs-9">后台系统目前仅支持谷歌浏览器，请先下载最新版本的谷歌浏览器!<span><a href="" class="go_btn">下载</a></span></div>
        <div class="col-xs-3"><img src="${ctx}/styles/images/icon_close.png" alt="" class="close_btn"></div>
</div>
<div class="middle-box text-center loginscreen animated fadeInDown">
    <div class="m-t"><img src="${ctx}/styles/images/logo.png" class="logo"></div>
    <input type="hidden" id="hiddenMessage" name="message" value="${ message }">
    <form class="m-t" id="loginform" role="form" name="loginform" method="post" action="${ctx}/login.action">
        <div class="logining-tips" id="tips">
            <i class="icon-alert"><img src="${ctx}/styles/images/icon-alert.png"></i>
            <p class="error"></p>
        </div>
        <div class="loginBox">
            <div class="row">
                <div class="col-xs-2">
                    <img src="${ctx}/styles/images/login_user.png">
                </div>
                <div class="col-xs-10">
                    <input type="text" autocomplete="off" name="username" class="login-input" id="usercode"
                           placeholder="请输入用户名" required=""
                           value="<%= request.getParameter(" username") == null ? "" : new
                    String(request.getParameter("username").getBytes("ISO-8859-1"),"Utf-8")%>">
                </div>
            </div>

            <div class="row" style="border-bottom: none;">
                <div class="col-xs-2">
                    <img src="${ctx}/styles/images/login_pass.png">
                </div>
                <div class="col-xs-10">
                    <input type="password" autocomplete="off" name="password" id="pwd" class="login-input"
                           placeholder="请输入密码" required=""
                           value="<%= request.getParameter(" password") == null ? "" :
                    request.getParameter("password")%>">
                </div>
            </div>
        </div>
        <div class="validate-code-box row">
            <div class="col-sm-9 padding-l-8">
                <input type="text" id="randomcode" class="form-control" name="randomcode" size="8" placeholder="验证码">
            </div>
            <div class="validate-code col-sm-3 padding-l-8">
                <a href="javascript:randomcode_refresh()">
                    <img id="randomcode_img" src="${ctx}/validatecode.jsp"/>
                </a>
            </div>
        </div>
        <div class="checkBox"><input type="checkbox" value="" onclick="saveInfo()" checked="true" id="save-btn">记住密码
        </div>
        <button type="submit" style="margin-top: 32px;" class="btn btn-primary block full-width m-b"
                id="loginBtn" onclick="userLogin()">登 录
        </button>
    </form>
</div>
<!-- particles.js container -->
<div id="particles"></div>
</body>
<%@include file="/WEB-INF/views/include/outer_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/login/login.js"></script>
</html>
