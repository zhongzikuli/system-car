<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">

    <form id="pagerForm" action="${ctx}/cfInsuranceCompany/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="sysCfInsuranceCompany:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                </shiro:hasPermission>

                <shiro:hasPermission name="sysCfInsuranceCompany:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
                </shiro:hasPermission>
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
                        <th style="width:2%;">序号</th>
                        <th style="width:12%;">保险公司编号</th>
                        <th style="width:15%;">保险公司名称</th>
                        <th style="width:10%;">保险公司简称</th>
                        <th style="width:12%;">备注</th>
                        <th style="width:5%;">排序</th>
                        <th style="width:5%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="8">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr ondblclick="detailInfo()">
                            <td><input type="checkbox" class="checkOne"
                                       name="sysCfInsuranceCompany_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.serialNo}</td>
                            <td class="cel">${item.insuranceCompanyName}</td>
                            <td class="cel">${item.shortName}</td>
                            <td class="cel">${item.remark}</td>
                            <td class="cel">${item.sortNo}</td>
                             <td class="btn-cel">
                                <shiro:hasPermission name="sysCfInsuranceCompany:preUpdate">
                                    <a data-toggle="modal" class="btn btn-primary btn-xs edit-btn">
                                    <i class="fa fa-edit"></i>编辑</a>
                                </shiro:hasPermission>
                                <a href="#" onclick="detail('${item.serialNo}','${item.insuranceCompanyName}','${item.shortName}','${item.remark}','${item.sortNo}')"
                                   class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
    <!-- 分页条 -->
    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/insurance/cfInsuranceCompany.js"></script>
<script type="text/template" title="新增" id="sysCfInsuranceCompany-dialog">
    <div class="ibox-content">
        <form id="sysCfInsuranceCompanyForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司编号:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="serialNo_create" id="serialNo_create"
                               check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>保险公司名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="insuranceCompanyName_create"
                                   id="insuranceCompanyName_create" check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司简称:</label>
                    <div class="col-xs-8">
                         <input type="text" class="form-control" name="shortName_create" id="shortName_create"
                                   check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="sortNo_create" id="sortNo_create"
                               check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">备注:</label>
                    <div class="col-xs-8">
		             	<textarea rows="3" cols="130" type="text" class="form-control" id="remark_create" 
                               name="remark_create" check="sysCfInsuranceCompanyForm(this)" value=""></textarea>
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
<script type="text/template" title="编辑" id="sysCfInsuranceCompany-dialog_edit">
    <div class="ibox-content">
        <form id="sysCfInsuranceCompanyForm_edit" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司编号:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="serialNo_edit" id="serialNo_edit"
                               check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>保险公司名称:</label>
                    <div class="col-xs-8">
                         <input type="text" class="form-control" name="insuranceCompanyName_edit"
                                   id="insuranceCompanyName_edit" check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司简称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="shortName_edit" id="shortName_edit"
                                   check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="sortNo_edit" id="sortNo_edit"
                               check="sysCfInsuranceCompanyForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">备注:</label>
                    <div class="col-xs-8">
		            	<textarea rows="3" cols="130" type="text" class="form-control" id="remark_edit"
                                name="remark_edit" check="sysCfInsuranceCompanyForm(this)" value=""></textarea>
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
<script type="text/template" title="查看" id="sysCfInsuranceCompany-dialog_detail">
    <div class="ibox-content">
        <form id="sysCfInsuranceCompanyForm_detail" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司编号:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="serialNo_detail" id="serialNo_detail"
                               readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="insuranceCompanyName_detail"
                                   id="insuranceCompanyName_detail" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">保险公司简称:</label>
                    <div class="col-xs-8">
                         <input type="text" class="form-control" name="shortName_detail"
 							id="shortName_detail" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="sortNo_detail" id="sortNo_detail"
                               readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">备注:</label>
                    <div class="col-xs-8">
		            	<textarea rows="3" cols="130" type="text" class="form-control" id="remark_detail"
                          	 readonly="readonly" name="remark_detail" value=""></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
