<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include/outer_css.jsp" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<script type="text/javascript" src="${ctx}/js/appManage/appManage.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/styles/pageStyle/appManage.css"/>
<script>
    parent.widthRefreshFull();
    var message = "${message}";
    var error = "${error}";
    if (null != message && message != "") {
        if (error == 1 || error == "1") {
            successMsg(message, 1000);
        } else {
            faildMsg(message);
        }
    }
</script>
<div class="mod_header">
    <div class="title">
        <h2>应用展示管理</h2>
    </div>
    <div id="hiddenForm">
        <input type="hidden" name="searchAppName" value="<%= request.getParameter(" searchAppName") == null ? "" :
        request.getParameter("searchAppName")%>">
    </div>
    <form id="pagerForm" action="${ctx}/appManage/query.action" method="post">
        <!-- 分页表单参数 -->
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="content">
            <div class="group" style="float:right;">
                <label style="float:left;">应用名称:</label>
                <input type="text" style="width:150;height:30" name="searchAppName" id="searchAppName"
                       value="<%= request.getParameter(" searchAppName") == null ? "" :
                request.getParameter("searchAppName")%>">
                <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
            </div>
        </div>
    </form>
    <div class="group" style="float:left;">
        <shiro:hasPermission name="appManage:create">
            <button class="button button_primary" onclick="appRegister()">登记应用</button>
        </shiro:hasPermission>
    </div>
</div>
<div class="mod_basic">
    <div class="content">
        <div class="sub_content">
            <div class="gri_wrapper">
                <table class="gri_stable">
                    <thead>
                    <tr>
                        <th style="width: 2%">图标</th>
                        <th style="width: 8%">应用名称</th>
                        <th style="width: 10%">平台</th>
                        <th style="width: 12%">今日注册用户数</th>
                        <th style="width: 12%">实时在线用户数</th>
                        <th style="width: 12%">累计注册用户数</th>
                        <th style="width: 12%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="7">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td>
                                <c:choose>
                                    <c:when test="${item.picFileGroup != null && item.picFilePath != null}">
                                        <img class="logo-row"
                                             src="${ctx}/fdfs/viewFdfsFile.action?groupName=${item.picFileGroup}&fileId=${item.picFilePath}">
                                    </c:when>
                                    <c:otherwise>
                                        <img class="logo-row" src="${ctx}/images/common/defaultAppIcon.png">
                                    </c:otherwise>
                                </c:choose>
                            </td>
                            <td>${item.appName}</td>
                            <td>
                                <c:if test="${item.accessIos == 1}">
                                    <img class="icon-row" src="${ctx}/images/iconImage/icon-android-gray.png"><img
                                        class="icon-row" src="${ctx}/images/iconImage/icon-ios-gray.png">
                                </c:if>
                                <c:if test="${item.accessIos == 2}">
                                    <img class="icon-row" src="${ctx}/images/iconImage/icon-android-gray.png">
                                </c:if>
                            </td>
                            <td>${item.todayRegister}</td>
                            <td>${item.onLineUser}</td>
                            <td>${item.allRegister}</td>
                             <td class="btn-cel">
                                <shiro:hasPermission name="appManage:createPush">
                                    <a title="创建推送" class="button button_success button_small"
                                       onclick="createPush('${item.appId}','${item.accessIos}')">创建推送</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="appManage:dataReport">
                                    <a title="数据报表" class="button button_danger button_small"
                                       onclick="dataReport('${item.appId}','${item.accessIos}')">数据报表</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="appManage:appConfig">
                                    <a title="应用配置" class="button button_primary button_small"
                                       onclick="appConfig('${item.appId}','${item.accessIos}')">应用配置</a>
                                </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="sub_content">
            <%@include file="/WEB-INF/views/include/outer_js.jsp" %>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
        </div>
    </div>
</div>
<script type="text/template" title="" id="appRegister-dialog">
    <div id="appRegister-dialog">
        <form id="appCreateForm" action="${ctx}/appManage/create.action" method="POST" enctype="multipart/form-data">
            <div class="appRegister-left">
                <div class="form-row">
                    <label class="label-title"><span class="red-mark">* </span>应用名称:</label>
                    <div class="form-control" style="position:relative;">
                        <input class="app-name" type="text" id="appName" name="appName" tip="应用名称不能为空"
                               check="validAppForm(this)">
                        <span class="app-name-len">0/30</span>
                    </div>
                </div>
                <div class="form-row">
                    <label class="label-title"><span class="red-mark">* </span>应用类型:</label>
                    <div class="form-control">
                        <slt:select id="flexvalue" name="appType" classType="YYLX" defaultValue="false"/>
                    </div>
                </div>
                <div class="form-row" style="height:62px;">
                    <label class="label-title"><span class="red-mark">* </span>应用平台:</label>
                    <div class="panel-select">
                        <i class="iconfont" title="android"></i>
                        <span>Android</span>
                        <input class="plat-check" id="config-appRegister-android" type="checkbox"
                               name="config-appRegister-android" checked disabled>
                    </div>
                </div>
                <div class="form-row">
                    <label class="label-title"><span class="red-mark">* </span>应用标识:</label>
                    <div class="form-control" style="position:relative;">
                        <input type="text" id="appMark" name="appMark" tip="应用标识不能为空" check="validAppForm(this)">
                        <a class="help-msg">?</a>
                        <div class="help-point">
                            <p>如何获取应用标识（Package Name）:</p>
                            <span><b>方法1:</b></span>
                            <p>下载并安装应用标识检测工具，即可获得应用标识（Package Name）。</p>
                            <span><b>方法2:</b></span>
                            <p>1.在手机上打开你的应用;</p>
                            <p>2.进入设置 - 应用程序 - 管理应该程序 - 正在运行;</p>
                            <p>3.在你的应用的进程中，可以找到应用标识（Package Name），通常以com开头。</p>
                            <div class="help-arrow"></div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="panel-select">
                        <i class="iconfont" title="ios"></i>
                        <span>IOS</span>
                        <input class="plat-check" id="config-appRegister-ios" type="checkbox"
                               name="config-appRegister-ios">
                        <input type="text" id="accessIos" name="accessIos" class="input-hidden">
                    </div>
                </div>
                <div class="wripper-app-certificate">
                    <div class="form-row">
                        <label class="label-title optional">应用证书:</label>
                        <div class="form-control">
                            <input type="text" id="appCertificateShow" style="width:70%;float:left;" readonly="readonly"
                                   tip="应用证书不能为空" check="validAppForm(this)">
                            <button type="button" class="button button_default upload-app-certificate"
                                    style="float:right;">上传应用证书
                            </button>
                            <input type="file" class="appCertificateUpload input-hidden" id="appCertificate"
                                   name="certFile" accept=".p12">
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="label-title optional">证书密码:</label>
                        <div class="form-control">
                            <input class="input-hidden" type="text">
                            <input type="password" id="appPassword" name="certPassword" tip="证书密码不能为空"
                                   check="validAppForm(this)">
                        </div>
                    </div>
                    <div class="form-row">
                        <span class="ios-tip">注意:如果证书为开发环境证书，每日仅能推送1000条消息</span>
                    </div>
                </div>
            </div>
            <div class="appRegister-right">
                <img class="preview-img" src="${ctx}/images/common/defaultLogo.png">
                <p class="help-tip">图标大小25K以内<br>格式为jpg、png、bmp</p>
                <button type="button" class="button button_default upload-app-icon">上传应用图标</button>
                <input type="file" id="uploadAppIcon" name="picFile" class="input-hidden"
                       accept="image/jpg,image/png,image/jpeg,image/bmp">
            </div>
        </form>
        <div class="form-row" style="margin-bottom:20px;">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">登记</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>