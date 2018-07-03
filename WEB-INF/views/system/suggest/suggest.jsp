<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/suggest/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                <div class="form-inline">
                    <div class="form-group">
                        <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
        <div class="table-responsive full-height">
            <table class="table table-hover table-height table-striped table-daily">
                <thead>
                <tr>
                    <th style="width:5%;">序号</th>
                    <th style="width:5%;">处理用户</th>
                    <th style="max-width:150px;">建议标题</th>
                    <th style="max-width:150px;">建议内容</th>
                    <th style="width:8%;">建议人联系手机号</th>
                    <th style="width:8%;">是否已处理</th>
                    <th style="width:15%;">处理结果</th>
                    <th style="width:12%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="9">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.handleUser}</td>
                        <td title="${item.title}">${item.title}</td>
                        <td title="${item.content}">${item.content}</td>
                        <td >${item.tel}</td>
                        <td >
                             <c:if test="${item.isHandle == 1}">
                                  已处理
                             </c:if>
                            <c:if test="${item.isHandle == 0}">
                                  未处理
                            </c:if>
                        </td>
                        <td >${item.handleResult}</td>
                        <td>
                            <shiro:hasPermission name="suggest:handle">
                            <a title="处理" href="#" class="btn btn-primary btn-xs handle"  onclick="handle('${item.id}')"
                                    <c:if test="${item.isHandle == 1}">
                                        style="display:none;"
                                    </c:if>><i class="fa fa-edit"></i>处理</a>
                            </shiro:hasPermission>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/mine/system/suggest/suggest.js"></script>
<script type="text/template" title="处理" id="handle-dialog_set">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="handleForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>处理结果:</label>
                <div class="col-xs-8">
                    <textarea type="text" class="form-control" id="handleResult" name="handleResult"
                              check="handleResult(this)"></textarea>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
