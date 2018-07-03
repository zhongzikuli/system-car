<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>车鉴定管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="startDate" value="${paramMap.startDate}"/>
        <input type="hidden" name="endDate" value="${paramMap.endDate}"/>
        <input type="hidden" name="vin" value="${paramMap.vin}">
    </div>
    <form id="pagerForm" action="${ctx}/vehicle/query.action" method="post">
        <div id="hiddenForm">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        </div>

        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="vehicle:create">
                    <a data-toggle="modal" class="btn btn-sm btn-primary" onclick="createVehicle()">新增</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group" id="date-time">
                        <label class="control-label label">提交日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate"
                                   id="search-vehicle-start-date" value="${paramMap.startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate"
                                   id="search-vehicle-end-date" value="${paramMap.endDate}"/>
                        </div>
                    </div>
					<div class="form-group">
                        <label class="control-label label">VIN:</label>
                        <input type="text" class="form-control" name="vin" id="search-vehicle-vin"
                               value="${paramMap.vin}">
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:20%;">VIN</th>
                        <th style="width:20%;">状态</th>
                        <th style="width:20%;">提交时间</th>
                        <th style="width:20%;">返回时间</th>
                        <th style="width:10%;">操作</th>
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
                            <td><input type="checkbox" class="checkOne" name="vehicleList_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel"><span title="${item.vin}">${item.vin}</span></td>
                            <td class="cel">
                                <c:if test="${item.status == 1}">
                                    <span class="label label-info">查询中…</span>
                                </c:if>
                                <c:if test="${item.status == 2}">
                                    <span class="label label-success">查询结束</span>
                                </c:if>
                                <c:if test="${item.status == -1}">
                                    <span class="label label-danger">查询失败</span>
                                </c:if>
                            </td>
                            <td class="cel">${item.submitDateTime}</td>
                            <td class="cel">${null != item.reportDateTime ? item.reportDateTime : '--'}</td>
                             <td class="btn-cel">
                                <shiro:hasPermission name="vehicle:detail">
                                    <c:if test="${item.status == 1}">
                                        <button title="查看" onclick="vehicleDetailTip(${item.status})"
                                                class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看
                                        </button>
                                    </c:if>
                                    <c:if test="${item.status == -1}">
                                        <button title="查看" onclick="vehicleDetailTip(${item.status})"
                                                class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看
                                        </button>
                                    </c:if>
                                    <c:if test="${item.status == 2}">
                                        <a title="查看" href="${ctx}/vehicle/detail?id=${item.id}" target="_blank"
                                           class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                                    </c:if>
                                </shiro:hasPermission>
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
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/other/vehicleIdentification/list.js"></script>
<script type="text/template" title="新增鉴定" id="createVehicle-dialog">
    <div id="createVehicle-dialog" class="ibox-content">
        <form id="createVehicleForm" class="form-horizontal">
            <div id="createVehicle" style="padding: 13px 10px 8px;">
                <div class="form-group mr-none">
                    <input type="text" class="form-control" name="vin" id="create-vehicle-vin"
                           placeholder="请输入车辆识别码（VIN）" tip="请输入车辆识别码（VIN）" check="validateVin(this)" value="">
                </div>
                <div class="form-group mr-none">
                    <p style="font-size:16px; text-align: left;">支付金额:<span class="text-danger">28￥</span></p>
                </div>
                <div class="form-group mr-none">
                    <a href="javascript:void(0);" class="btn btn-primary block full-width m-b dialog-ok">确定</a>
                </div>
                <div class="form-group mr-none" style="text-align: left;">
                    <div class="checkbox m-l m-r-xs">
                        <label class="i-checks">
                            <div class="icheckbox_square-green" style="position: relative;"><input type="checkbox"
                                                                                                   style="position: absolute; opacity: 0;">
                                <ins class="iCheck-helper"
                                     style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>
                            </div>
                            <i></i>我已阅读并同意</label>
                        <a href="${ctx}/vehicle/protocol.action" target="_blank"><span
                                class="font_red">&lt;&lt;鉴定服务协议&gt;&gt;</span></a>
                    </div>
                </div>
                <div class="form-group mr-none" style="text-align:right;">
                    <a href="${ctx}/static/vin.html" target="_blank">什么是VIN?</a>
                </div>
            </div>
        </form>
    </div>
</script>
</html>