<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>流程配置</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/processDefinition/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <shiro:hasPermission name="process:importDefinition">
                    <a class="btn btn-primary btn-sm" onclick="importProcessDefinition()">导入流程定义</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="process:downTemplate">
                    <a class="btn btn-danger btn-sm" target="_blank"
                       href="${ctx}/processDefinition/downTemplate.action">模板下载</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-7">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">名称:</label>
                        <input type="text" class="form-control" name="name" id="search-process-name"
                               value="${paramMap.name}">
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th width="2%">序号</th>
                        <th width="20%">流程名称</th>
                        <th width="10%">版本</th>
                        <th width="12%">流程类型</th>
                        <th width="20%">流程图</th>
                        <th width="5%">创建日期</th>
                        <th width="10%">操作</th>
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
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel" title="${item.remark}">${item.remark}</td>
                            <td class="cel" title="${item.version}">${item.version}</td>
                            <td class="cel" title="${item.typeName}">${item.typeName}</td>
                            <td class="cel gallerys">
                                <c:if test="${not empty  item.filePath}">
                                    <img class="pre-img" width="240px" height="28px" alt="" src="${staticUrl}${item.filePath}">
                                </c:if>
                                <c:if test="${empty  item.filePath}">
                                    --
                                </c:if>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td style="padding:8px;">
                                <shiro:hasPermission name="process:importPicture">
                                    <a class="btn btn-primary btn-sm" onclick="importProcessPicture(${item.id})"><i
                                            class="fa fa-upload"></i>导入流程图</a>
                                </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ajaxFileUpload/ajaxFileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/process/processList.js"></script>
<script type="text/template" title="导入流程定义" id="import-process-dialog">
    <div class="ibox-content" id="deleteRole-dialog">
        <div data-id="title" class="dialog-item">
            <div class="dialog-tips" style="height: 60px;">
                <a href='javascript:void(0);' class="btn btn-success"><i class="fa fa-upload"></i>&nbsp;&nbsp;<span
                        class="bold">请选择流程定义模板</span></a>
                <input id="fileUpload" type="file" name="file" class="file-upload"/>
                <div class="show-name" id="showFileName"></div>
            </div>
            <div class="alert-info">
                流程模板最大5M，格式支持：xml
            </div>
        </div>
        <div class="dialog-manage" id="CreateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="导入流程图" id="import-process-picture-dialog">
    <div class="ibox-content" id="deleteRole-dialog">
        <div data-id="title" class="dialog-item">
            <div class="dialog-tips" style="height: 60px;">
                <input id="processId" type="hidden" name="id"/>
                <a href='javascript:void(0);' class="btn btn-success"><i class="fa fa-upload"></i>&nbsp;&nbsp;<span
                        class="bold">请选择流程图</span></a>
                <input id="fileUpload" type="file" name="file" class="file-upload" style="width:134px;left:134px;"/>
                <div class="show-name" id="showFileName"></div>
            </div>
            <div class="alert-info">
                流程图最大5M，格式支持：png、jpeg、jpg
            </div>
        </div>
        <div class="dialog-manage" id="CreateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
