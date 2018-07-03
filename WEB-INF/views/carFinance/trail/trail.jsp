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
    <form id="pagerForm" action="${ctx}/bank/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
                <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="createBank()">新增</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteBank()">删除</a>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" ></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:8%;">拖车单位</th>
                        <th style="width:8%;">详细地址</th>
                        <th style="width:15%;">单位电话</th>
                        <th style="width:12%;">操作</th>
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
                            <td><input type="checkbox" class="checkOne" name="bank_input" value="${item.id}"></td>
                            <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td >${item.name}</td>
                            <td >${item.address}</td>
                            <td >${item.tel}</td>
                             <td class="btn-cel" style="padding-left: 98px;">
                                <a href="#" onclick="editInfo('${item.id}')" class="btn btn-primary btn-xs">
                                	<i class="fa fa-edit"></i>编辑</a>
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
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/trailCarComany/trailCarCompany.js"></script>
<script type="text/template" title="新增" id="bank-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>拖车单位:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="name" id="name"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>详细地址:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="address" id="address"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>单位电话:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="tel" id="tel"
                           check="bankForm(this)">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="编辑" id="bankEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm_edit" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>拖车单位:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankName_edit" id="name_edit"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>详细地址:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankShortName_edit" id="address_edit"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>单位电话:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankCode_edit" id="tel_edit"
                           check="bankForm(this)">
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
