<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>报表字段维护</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/cfBusinessOrderAccept.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <a data-toggle="modal" class="btn btn-primary btn-sm btn-add">新增</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm btn-delete">删除</a>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
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
                    <th style="width:2%;"><input type="checkbox" class="checkAll"></th>
                    <th style="width: 10%">字段名</th>
                    <th style="width: 10%">中文名</th>
                    <th style="width: 8%">字段类型</th>
                    <th style="width: 10%">表名</th>
                    <th style="width: 10%">创建时间</th>
                    <th style="width: 8%">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="7">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr target="sid_user" rel="${item.id}">
                        <td><input type="checkbox" class="checkOne" value="${item.id}"></td>
                        <td class="cel">${item.columnName}</td>
                        <td class="cel">${item.nameZh}</td>
                        <td class="cel">${item.columnType}</td>
                        <td class="cel">${item.viewTableName}</td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.ctime}"/></td>
                        <td>
                            <a title="编辑" class="btn btn-primary btn-xs edit-btn" data-id="${item.id}">编辑</a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/field.js"></script>

<script type="text/template" title="新增" id="save-dialog">
    <div class="ibox-content">
        <form id="reportForm" class="form-horizontal">
            <div class="row">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>字段名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="columnName" check="validForm(this)" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>中文名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="nameZh" check="validForm(this)" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>表名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="viewTableName" check="validForm(this)" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>字段类型:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的字段类型">
                                <select id="columnType" name="columnType" class="form-control chosen-select"
                                        tip="请输入正确的字段类型。"
                                        check="validForm(this)">
                                    <option value="">请选择</option>
                                    <option value="string">文本类型</option>
                                    <option value="date">日期类型</option>
                                    <option value="float">浮点类型</option>
                                    <option value="int">整数类型</option>
                                </select>
                            </div>
                        </div>
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