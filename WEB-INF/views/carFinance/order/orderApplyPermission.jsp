<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>订单修改审核配置</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="<%=request.getContextPath() %>/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body>
<div class="mod_header">
    <code>*该配置项可由单位管理员进行配置</code>
</div>
<div class="mod_basic">
    <div id="auditPermissionWrap" class="ibox-content form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label">基本信息:</label>
            <div class="col-sm-6">
                <c:set var="baseInfoStr" value=""/>
                <c:set var="creditStr" value=""/>
                <c:set var="buyerInfoStr" value=""/>
                <c:set var="partnerInfoStr" value=""/>
                <c:set var="carInfoStr" value=""/>
                <c:set var="oldwolfApplyStr" value=""/>
                <c:set var="sponsorInfoStr" value=""/>
                <c:set var="contactorInfoStr" value=""/>

                <c:set var="baseInfoUserId" value=""/>
                <c:set var="creditUserId" value=""/>
                <c:set var="buyerInfoUserId" value=""/>
                <c:set var="partnerInfoUserId" value=""/>
                <c:set var="carInfoUserId" value=""/>
                <c:set var="oldwolfApplyUserId" value=""/>
                <c:set var="sponsorInfoUserId" value=""/>
                <c:set var="contactorInfoId" value=""/>
                

                <c:forEach items="${modules}" var="item">
                    <c:if test="${item.module == 'baseInfo'}">
                        <c:set var="baseInfoStr" value="${item.userName}"></c:set>
                        <c:set var="baseInfoUserId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'creditInfo'}">
                        <c:set var="creditStr" value="${item.userName}"></c:set>
                        <c:set var="creditUserId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'buyerInfo'}">
                        <c:set var="buyerInfoStr" value="${item.userName}"></c:set>
                        <c:set var="buyerInfoUserId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'partnerInfo'}">
                        <c:set var="partnerInfoStr" value="${item.userName}"></c:set>
                        <c:set var="partnerInfoUserId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'carInfo'}">
                        <c:set var="carInfoStr" value="${item.userName}"></c:set>
                        <c:set var="carInfoUserId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'contactorInfo'}">
                        <c:set var="contactorInfoStr" value="${item.userName}"></c:set>
                        <c:set var="contactorInfoId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'sponsorInfo'}">
                        <c:set var="sponsorInfoStr" value="${item.userName}"></c:set>
                        <c:set var="sponsorInfoUserId" value="${item.userIds}"></c:set>
                    </c:if>
                    <c:if test="${item.module == 'oldwolfApply'}">
                        <c:set var="oldwolfApplyStr" value="${item.userName}"></c:set>
                        <c:set var="oldwolfApplyUserId" value="${item.userIds}"></c:set>
                    </c:if>
                </c:forEach>
                <input class="form-control" type="text" value="${baseInfoStr}" readonly="readonly" name="baseInfo">
            </div>
            <div class="col-sm-2">
                <button name="baseInfo" data-id='${baseInfoUserId}' class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">征信:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${creditStr}" readonly="readonly" name="creditInfo">
            </div>
            <div class="col-sm-2">
                <button name='creditInfo' data-id="${creditUserId}" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">购车人信息:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${buyerInfoStr}" readonly="readonly" name="buyerInfo">
            </div>
            <div class="col-sm-2">
                <button name='buyerInfo' data-id="${buyerInfoUserId}" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>
        
         <div class="form-group">
            <label class="col-sm-2 control-label">紧急联系人信息:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${contactorInfoStr}" readonly="readonly" name="contactorInfo">
            </div>
            <div class="col-sm-2">
                <button name='contactorInfo' data-id="${contactorInfoUserId}" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">配偶信息:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${partnerInfoStr}" readonly="readonly"
                       name="partnerInfo">
            </div>
            <div class="col-sm-2">
                <button name='partnerInfo' data-id="${partnerInfoUserId}" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">担保人:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${sponsorInfoStr}" readonly="readonly"
                       name="partnerInfo">
            </div>
            <div class="col-sm-2">
                <button name='sponsorInfo' data-id="${sponsorInfoUserId }" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">车辆信息:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${carInfoStr}" readonly="readonly" name="carInfo">
            </div>
            <div class="col-sm-2">
                <button name='carInfo' data-id="${carInfoUserId }" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">垫付申请:</label>
            <div class="col-sm-6">
                <input class="form-control" type="text" value="${oldwolfApplyStr}" readonly="readonly"
                       name="oldwolfApply">
            </div>
            <div class="col-sm-2">
                <button name='oldwolfApply' data-id="${oldwolfApplyUserId}" class="btn btn-info config-btn"> 配置</button>
            </div>
        </div>
    </div>
</div>
</body>
<script type="text/template" title="权限配置" id="audit-user-config-dialog">
    <div id="audit-user-configDialog" class="ibox-content">
        <form id="permissionUserConfigForm" class="form-horizontal">
            <input type="hidden" id="moduleDesc" value="">
            <input type="hidden" id="module" value="">
            <div class="form-content">
                <div class="ibox-container">
                    <label class="col-xs-3 control-label">选择用户:</label>
                    <div class="col-xs-9" style="height: 300px; overflow: auto;">
                        <ul id="audit-user-config-tree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>
<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/orderApplyPermission.js"></script>
</html>
