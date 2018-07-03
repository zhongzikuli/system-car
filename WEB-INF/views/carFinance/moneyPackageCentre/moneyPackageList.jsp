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
    <form id="pagerForm" action="${ctx}/moneyPackage/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
              <shiro:hasPermission name="moneyPackage:addInfo">
                <a data-toggle="modal" class="btn btn-primary btn-sm addInfo" >新增</a>
              </shiro:hasPermission>
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
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">资产编号</th>
                    <th style="width:8%;">资方编号</th>
                    <th style="width:8%;">资金方名称</th>
                    <th style="width:8%;">资产包名称</th>
                    <th style="width:5%;">资产包金额(元)</th>
                    <th style="width:5%;">资产余额(元)</th>
                    <th style="width:10%;">开始日期</th>
                    <th style="width:10%;">结束日期</th>
                    <th style="width:5%;">累计使用资产(元)</th>
                    <th style="width:5%;">是否过期</th>
                    <th style="width:10%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="12">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.seriaNo}</td>
                        <td >${item.moneyNo}</td>
                        <td >${item.cfMoneyUnit}</td>
                        <td >${item.name}</td>
                        <td >
                            <sl:format type="number" show="${item.initMoney}" pattern="#,##0.00"/></td></td>
                        <td >
                            <sl:format type="number" show="${item.remainingMoney}" pattern="#,##0.00"/></td></td>
                        <td >
                            <fmt:formatDate value="${item.beginDate}" pattern="yyyy-MM-dd"/></td>
                        <td >
                            <fmt:formatDate value="${item.endDate}" pattern="yyyy-MM-dd"/></td>
                        <td >${item.totalUseMoney}</td>
                        <td >${item.overDue}</td>
                        <td>
                            <shiro:hasPermission name="moneyPackage:detail">
                            <a href="#" data-id="${item.id}" class="btn btn-primary btn-xs detail"><i class="fa fa-edit"></i>明细</a>
                            </shiro:hasPermission>

                            <shiro:hasPermission name="moneyPackage:toEdit">
                            <a href="#" data-id="${item.id}" class="btn btn-primary btn-xs editInfo"><i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>

                            <shiro:hasPermission name="cfMoneyPackageDetail:detailList">
                            <a href="#" data-id="${item.id}" class="btn btn-info btn-xs detailInfo"><i class="fa fa-edit"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/moneyPackageCentre/moneyPackageList.js"></script>
<script type="text/template" title="新增" id="moneyPackageCreate-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="moneyPackageForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">资方编号:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="moneyNo" id="moneyNo"
                           url="<%=request.getContextPath() %>/moneyPackage/moneyNoRepetition.action">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>资产包名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="name" id="name"
                            url="<%=request.getContextPath() %>/moneyPackage/isRepetition.action">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>资产包金额(元):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="initMoney" id="initMoney"
                           check="moneyPackageValid(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>资金方名称:</label>
                <div class="col-xs-8">
                    <div obj="">
                    <select  id="cfMoneyUnitId" name="cfMoneyUnitId" check="moneyPackageValid(this)" class="form-control ">
                    </select>
                </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>开始时间:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="beginDate" id="sTime_create"
                           check="moneyPackageValid(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>结束时间:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="endDate" id="eTime_create"
                           check="moneyPackageValid(this)">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="编辑" id="moneyPackageEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="moneyPackage_edit" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">资方编号:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="moneyNo" id="moneyNo_edit"
                           url="<%=request.getContextPath() %>/moneyPackage/moneyNoRepetition.action" autocomplete="off" >
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>资产包名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="name" id="name_edit"
                        url="<%=request.getContextPath() %>/moneyPackage/isRepetition.action" autocomplete="off">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>资产包金额(元):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="initMoney_edit" id="initMoney_edit"
                           check="moneyPackageValid(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>资金方名称:</label>
                <div class="col-xs-8">
                    <div obj="">
                        <select id="cfMoneyUnitId_edit" name="cfMoneyUnitId_edit" check="moneyPackageValid(this)" class="form-control">
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>开始时间:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="beginDate" id="sTime_edit"
                           check="moneyPackageValid(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>结束时间:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="endDate" id="eTime_edit"
                           check="moneyPackageValid(this)">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="查看" id="moneyPackageDetail-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="moneyPackage_detail" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">银行:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankName_detail" id="bankName_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">银行简称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankShortName_detail" id="bankShortName_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">银行标识:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankCode_detail" id="bankCode_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">是否自动对接:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"  id="isAuto_detail"
                           readonly>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>
</html>
