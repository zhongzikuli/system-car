<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>流程配置</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/ztree/css/zTreeStyle/zTreeStyle.css">
</head>
<body>
<div class="mod_header">
    <div class="row">
        <code>*单位管理员可对贷款流程的用户权限、金额进行配置</code>
    </div>
</div>
<div class="process-wrap ibox-content" style="padding:0px;">
    <div class="row full-height process-list">
        <div class="col-sm-2 process-type-wrap">
            <div class="ibox float-e-margins">
                <div class="ibox-content b-n">
                    <h5><i class="fa fa-gear"></i>&nbsp;流程类型</h5>
                    <ul class="folder-list m-b-md" style="padding: 0">
                        <c:forEach var="item" items="${definitions}" varStatus="st">
                            <li><a href="javascript:void(0)" data-ref="${item.id}" data-type="${item.type}"
                                   class="process-type-node"><i class="fa fa-circle text-danger"></i>
                                ${item.typeName}</a></li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-10 animated fadeInRight">
            <input id="processDefinitionId" type="hidden" value="" name="processDefinitionId"/>
            <input id="staticUrl"	type="hidden" value="${staticUrl}" name="staticUrl">
            <div class="row mr-none">
                <div class="process-version-wrap">
                    <div class="form-group">
                        <label class="pull-left control-label">流程版本:</label>
                        <div class="pull-left process-version">
                            <code class="alert-info">请先选择类型</code>
                        </div>
                    </div>
                </div>
            </div>
            <%-- end version row --%>


            <div class="row mr-none">
                <div class="process-img-wrap"></div>
            </div>
            <%-- end process img row --%>
            <%-- end process-variable-wrap row --%>
            <div class="form-horizontal process-config-wrap"></div>
            <%-- end config row --%>
        </div>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/process/processConfig.js"></script>
<script type="text/template" title="节点配置" id="process-user-config-dialog">
    <div id="process-user-configDialog" class="ibox-content">
        <form id="processUserConfigForm" class="form-horizontal">
            <input type="hidden" id="user-id" value="">
            <input type="hidden" id="process-definition-id" value="">
            <input type="hidden" id="node-id" value="">
            <div class="form-content">
                <div class="ibox-container">
                    <label class="col-xs-3 control-label">选择用户:</label>
                    <div class="col-xs-9" style="height: 300px; overflow: auto;">
                        <ul id="process-user-config-tree" class="ztree"></ul>
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
</html>
