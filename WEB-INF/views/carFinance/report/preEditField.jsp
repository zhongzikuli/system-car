<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>报表结构管理</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
    <div class="ibox-content" style="width:400px;">
        <form id="reportFieldEditForm" class="form-horizontal">
            <input type="hidden" name="id" value="${reportField.reportFieldRelationId}"/>
            <div class="row">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">字段名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="columnName" value="${reportField.columnName}" class="form-control" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                        <div class="col-xs-8">
                            <input type="text" name="orderNo" value="${reportField.orderNo}" obj="int" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">是否显示:</label>
                        <div class="col-xs-8">
                            <select name="pageShow" class="form-control chosen-select">
                                <option value="1" <c:if test="${reportField.isShow eq '1'}">selected</c:if>>显示</option>
                                <option value="0" <c:if test="${reportField.isShow eq '0'}">selected</c:if>>不显示</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">是否选择项:</label>
                        <div class="col-xs-8">
                            <select name="searchCondition" class="form-control chosen-select">
                                <option value="1" <c:if test="${reportField.searchCondition eq '1'}">selected</c:if>>是</option>
                                <option value="0" <c:if test="${reportField.searchCondition eq '0'}">selected</c:if>>否</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">条件类型:</label>
                        <div class="col-xs-8">
                            <select name="searchConditionKeyword" class="form-control chosen-select">
                                <option value="CLOSE">关闭</option>
                                <option value="CONTAIN" <c:if test="${reportField.searchConditionKeyword eq 'CONTAIN'}">selected</c:if>>包含</option>
                                <option value="NOT_CONTAIN" <c:if test="${reportField.searchConditionKeyword eq 'NOT_CONTAIN'}">selected</c:if>>不包含</option>
                                <option value="GREAT" <c:if test="${reportField.searchConditionKeyword eq 'GREAT'}">selected</c:if>>大于</option>
                                <option value="GREAT_EQUAL" <c:if test="${reportField.searchConditionKeyword eq 'GREAT_EQUAL'}">selected</c:if>>大于等于</option>
                                <option value="EQUAL" <c:if test="${reportField.searchConditionKeyword eq 'EQUAL'}">selected</c:if>>等于</option>
                                <option value="LESS" <c:if test="${reportField.searchConditionKeyword eq 'LESS'}">selected</c:if>>小于</option>
                                <option value="LESS_EQUAL" <c:if test="${reportField.searchConditionKeyword eq 'LESS_EQUAL'}">selected</c:if>>大于等于</option>
                                <option value="BETWEEN" <c:if test="${reportField.searchConditionKeyword eq 'BETWEEN'}">selected</c:if>>区间</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">字段类型:</label>
                        <div class="col-xs-8">
                            <input type="text" value="${reportField.columnType}" class="form-control" readonly/>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/manager.js"></script>
</html>