<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" method="post" style="margin: 0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <input value="${bussinessOrderId}" id="orderId" type="hidden">
            <input value="${buyerId}" id="buyerId" type="hidden">
            <input value="${haveShared}" id="haveShared" type="hidden">
            <input value="${bankNameId}" id="bankNameId" type="hidden">
            <input value="${productId}" id="productId" type="hidden">
            <input value="${newOrOldId}" id="newOrOldId" type="hidden">
            <input value="${carProductAreaId}" id="carProductAreaId" type="hidden">
            <div class="col-sm-6">
                <shiro:hasPermission name="orderApplyModify:save">
                    <a data-toggle="modal" class="btn btn-primary btn-sm request-update-btn">申请修改订单</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="orderApplyModify:revocation">
                    <a data-toggle="modal" class="btn btn-danger btn-sm discard-btn">撤销(作废)</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-6 text-right">
                <div class="form-inline">
                    <a class="btn btn-sm btn-info" onclick="history.back(-1);">返回列表</a>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height" id="update-order">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th style="width: 2%;"><input type="checkbox" class="checkAll"></th>
                        <th style="width: 2%;">序号</th>
                        <th style="width: 4%;">所属板块</th>
                        <th style="width: 4%;">所属项目</th>
                        <th style="width: 20%;">原值</th>
                        <th style="width: 20%;">新值</th>
                        <th style="width: 12%;">修改原因</th>
                        <th style="width: 4%;">审核状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if
                            test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="8">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}"
                               varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne"
                                       name="order_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.moduleDesc}</td>
                            <td class="cel">${item.itemDesc}</td>
                            <td class="desc">${item.oldValue}</td>
                            <td class="desc">${item.newValueDesc}</td>
                            <td class="cel">${item.modifyReason}</td>
                            <c:if test="${item.auditStatus == -4}">
                                <td class="cel">审核拒绝</td>
                            </c:if>
                            <c:if test="${item.auditStatus == -3}">
                                <td class="cel">审核作废</td>
                            </c:if>
                            <c:if test="${item.auditStatus == -2}">
                                <td class="cel">审核退回</td>
                            </c:if>
                            <c:if test="${item.auditStatus == 0}">
                                <td class="cel">未提交</td>
                            </c:if>
                            <c:if test="${item.auditStatus == 1}">
                                <td class="cel">已提交</td>
                            </c:if>
                            <c:if test="${item.auditStatus == 2}">
                                <td class="cel">审核通过</td>
                            </c:if>
                            <c:if test="${item.auditStatus == 3}">
                                <td class="cel">审核保存</td>
                            </c:if>
                            <c:if test="${item.auditStatus == ''}">
                                <td class="cel"></td>
                            </c:if>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
                <!-- 分页条 -->
                <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
<slt:dictData type="290000,420000,430000,440000,450000,460000,470000,480000,500000,490000,510000,520000,530000"/>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>

<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/pay.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/buyer.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/shared.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/sponsor.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/car.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/base.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/credit.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.form.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/orderApplyUpdate.js"></script>
<script type="text/template" title="新增修改内容" id="orderApply-dialog">
    <div class="ibox-content">
        <form id="orderApplyUpdateForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-2 control-label"><span class="red">*</span>所属版块:</label>
                    <div class="col-xs-9">
                        <div obj="" tip="所属版块不能为空">
                            <select data-placeholder="请选择" id="module" class="form-control" name="module"
                                    check="validSelect(this)">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-2 control-label"><span class="red">*</span>所属项目:</label>
                    <div class="col-xs-9">
                        <div obj="" tip="所属项目不能为空">
                            <select data-placeholder="请选择" id="project-select" class="form-control" name="item"
                                     check="validSelect(this)">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-2 control-label">原值:</label>
                    <div class="col-xs-9">
                        <input type="text" id="oldVal" class="form-control" readonly>
                    </div>
                </div>
            </div>
            <div class="form-group">
				<input type="hidden" id ="carNoId" value=""/>
                <div  id="newVal" class="col-sm-12">
                    <label class="col-xs-2 control-label"><span class="red">*</span>新值:</label>
                    <div class="col-xs-9">
                        <input type="text" class="form-control" obj="not_null" tip="新值不能为空">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-2 control-label"><span class="red">*</span>修改原因:</label>
                    <div class="col-xs-9">
                        <input type="text" class="form-control" name="modifyReason" id="modifyReason"
                               check="validSelect(this)" tip="修改原因不能为空">
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
