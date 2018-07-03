<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>报表字段编辑</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="ibox-content" style="width:400px;">
    <form id="reportFieldEditForm" class="form-horizontal">
        <input type="hidden" name="id" value="${reportField.id}"/>
        <div class="row">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>字段名:</label>
                <div class="col-xs-8">
                    <input type="text" name="columnName" value="${reportField.columnName}" tip="请输入正确的字段名"
                           class="form-control" obj="not_null"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>中文名:</label>
                <div class="col-xs-8">
                    <input type="text" name="nameZh" value="${reportField.nameZh}" tip="请输入正确的中文名"
                           check="validForm(this)" class="form-control"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>字段类型:</label>
                <div class="col-xs-8">
                    <select name="columnType" class="form-control chosen-select" tip="请输入正确的字段类型" check="validForm(this)">
                        <option value="">请选择</option>
                        <option value="string" <c:if test="${reportField.columnType eq 'string'}">selected</c:if>>文本类型</option>
                        <option value="date" <c:if test="${reportField.columnType eq 'date'}">selected</c:if>>日期类型</option>
                        <option value="float" <c:if test="${reportField.columnType eq 'float'}">selected</c:if>>浮点类型</option>
                        <option value="int" <c:if test="${reportField.columnType eq 'int'}">selected</c:if>>整数类型</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>表名:</label>
                <div class="col-xs-8">
                    <input type="text" name="viewTableName" value="${reportField.viewTableName}" tip="请输入正确的表名"
                           obj="not_null" class="form-control"/>
                </div>
            </div>
        </div>
    </form>
    <div class="dialog-manage">
        <a href="javascript:void(0);" type="button" class="btn btn-primary btn-submit">确定</a>
        <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/field.js"></script>
</html>