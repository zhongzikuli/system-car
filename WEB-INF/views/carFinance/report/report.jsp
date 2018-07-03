<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>战报</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body class="grey-bg">
<div class="wrapper wrapper-content" style="background: #f3f3f3;" data-userlevel="${userLevel}">
    <c:if test="${userLevel != 5}">
        <shiro:hasPermission name="auditWaiting:audit">
            <div class="row" style="padding-bottom: 20px;" id="reportList">
                <div class="col-sm-12">
                    <div class="ibox" style="color:#239fe8;">
                        <div class="ibox-title">
                            <h5 class="border-b"><span class="nav-icon"></span>待审中心<span class="orderNum"></span>
                                <a class="ibox-tools order-list">更多&raquo;</a>
                            </h5>
                        </div>
                        <div class="ibox-content">
                            <table class="table table-hover table-striped table-order">
                                <thead>
                                <tr>
                                    <th>客户名称</th>
                                    <th>所属部门</th>
                                    <th>贷款银行</th>
                                    <th>贷款金额(元)</th>
                                    <th>订单状态</th>
                                    <th>候补资料</th>
                                    <th>更新时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody style="color:#666;"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </shiro:hasPermission>
    </c:if>
    <c:if test="${userLevel == 5}">
        <div class="row" style="padding-bottom: 20px;" id="reportList">
            <div class="col-sm-12">
                <div class="ibox" style="color:#239fe8;">
                    <div class="ibox-title">
                        <h5 class="border-b"><span class="nav-icon"></span>我的订单<span class="orderNum"></span>
                            <a class="ibox-tools"
                               href="${ctx}/cfBusinessOrderAccept/console.action">更多&raquo;</a>
                        </h5>
                    </div>
                    <div class="ibox-content">
                        <table class="table table-hover table-striped table-order">
                            <thead>
                            <tr>
                                <th>客户名称</th>
                                <th>所属部门</th>
                                <th>贷款银行</th>
                                <th>贷款金额(元)</th>
                                <th>订单状态</th>
                                <th>候补资料</th>
                                <th>更新时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody style="color:#666;"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </c:if>
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5 class="border-b"><span class="nav-icon"></span>实时战报</h5>
                    <c:if test="${userLevel == 4}">
                        <div class="col-sm-12 text-right no-padding" style="margin-top: -40px;">
                            <div class="form-inline">
	                            <div class="form-group">
	                                <label>部门：</label>
	                                <input type="text" class="form-control" id="departmentId" readonly="readonly" data-id="${department.id}" data-value="${department.name}" value="${department.name}"/>
	                                <div id="menuContent" class="menuContent"
	                                     style="border:1px solid #08e6f5; display: none;position: absolute;padding: 10px;height:300px;right:0;">
	                                    <ul id="departmentTree" class="ztree"></ul>
	                                </div>
	                             </div>
                            </div>
                        </div>
                    </c:if>
                </div>
            </div>
            <div class="ibox-content <c:if test="${isComplex}">ibox-content-4</c:if><c:if test="${!isComplex}">ibox-content-5</c:if> height-auto"
                 style="padding: 10px 13px;" id="record">
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <c:if test="${userLevel != 5}">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5 class="border-b"><span class="nav-icon"></span>
                            <c:if test="${userLevel == 4}">团队成员战报</c:if>
                            <c:if test="${userLevel != 4 && userLevel != 5}">部门战报</c:if>
                        </h5>
                    </div>
                </div>
                <div class="ibox-content" style="padding:10px 13px;">
                    <div class="col-sm-3 no-padding">
                        <c:if test="${userLevel != 4 && userLevel != 5}">
                            <ul class="nav nav-tabs">
                                <li class="active" style="width: 50%;">
                                    <a data-toggle="tab" href="#" aria-expanded="true" data-type="2">直营战报</a></li>
                                <li class="" style="width: 50%;">
                                    <a data-toggle="tab" href="#" aria-expanded="false" data-type="1">渠道战报</a></li>
                            </ul>
                        </c:if>
                    </div>
                    <div class="col-sm-9 text-right no-padding" style="margin-bottom: 5px;">
                        <form id="pagerForm">
                            <div class="form-inline">
                            	<div class="form-group">
	                                <label>部门：</label>
	                                <input type="text" class="form-control" id="rank-departmentId" readonly="readonly" <c:if test="${userLevel == 4}">data-id="${department.id}" data-value="${department.name}" value="${department.name}"</c:if> />&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-primary search"> 搜索</button>
	                                <div id="rank-menuContent" class="menuContent" style="border:1px solid #08e6f5; display: none;position: absolute;padding: 10px;height:300px;right:54px;">
	                                    <ul id="rank-departmentTree" class="ztree"></ul>
	                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-sm-12  no-padding min-h-250">
                        <div class="table-responsive" id="result">
                            <table class="table table-hover table-striped table-order table-more">
                                <thead>
                                <th class="min-42">排名</th>
                                <c:if test="${userLevel == 4}">
                                    <th>姓名</th>
                                    <th>今日贷款额(万元)</th>
                                    <th>今日业务量(笔)</th>
                                    <th>本月贷款额(万元)</th>
                                    <th>本月业务量(笔)</th>
                                    <th>环比增长率(%)</th>
                                    <th>最近成交日期</th>
                                    <th>是否转正</th>
                                    <th>淘汰提醒</th>
                                </c:if>
                                <c:if test="${userLevel != 4 && userLevel != 5}">
                                    <th class="min-116">部门名称</th>
                                    <%--<th>部门所在地</th>--%>
                                    <th class="min-70">部门经理</th>
                                    <th class="min-98">本月贷款额(万元)</th>
                                    <th class="min-98">本月业务量(笔)</th>
                                    <th class="min-98">今日贷款额(万元)</th>
                                    <th class="min-98">今日业务量(笔)</th>
                                    <th class="min-98">今日审核量(笔)</th>
                                    <th class="min-98">今日审核金额(万元)</th>
                                    <th class="min-98">本月审核量(笔)</th>
                                    <th class="min-98">本月审核金额(万元)</th>
                                    <%--<th>人均月业务量(笔)</th>--%>
                                    <%--<th>人均月贷款额(万元)</th>--%>
                                    <th class="min-98">在职业务员数(个)</th>
                                    <th class="min-70">年业务量(笔)</th>
                                    <th class="min-98">年贷款金额(万元)</th>
                                    <%--<th class="min-116">环比增长率(%)</th>--%>
                                </c:if>
                                </thead>
                                <tbody>
                                <tr class='no-border'>
                                    <td class='col-td' colspan='14'>暂无数据</td>
                                </tr>
                                </tbody>
                            </table>
                            <div id="pagination" class="pagination pagination-right m-b"></div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <c:if test="${userLevel != 4 && userLevel != 5 && !isComplex}">
            <div class="row row-iframe">
                <iframe class="creditReport min-h-250" name="creditReport" width="100%" frameborder="0"
                        src="${ctx}/financeReport/creditReport.action">

                </iframe>
            </div>
        </c:if>
    </c:if>
</div>
</body>

<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/report.js?version=20180416011222"></script>

<script type="text/template" title="垫款申请" id="applyPayCreate-dialog">
    <div class="ibox-content">
        <form id="applyPayCreateForm" class="form-horizontal">
            <div class="form-group" id="audit-info" style="margin:0;">
            </div>
            <div class="form-group">
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                    <label class="col-xs-4 control-label">客户姓名:</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" id="buyerName" readonly/>
                    </div>
                </div>
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                    <label class="col-xs-4 control-label">按揭手续费(元):</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" id="poundage" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                    <label class="col-xs-4 control-label">履约保证金(元):</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" id="agreeEnsureMoney" readonly/>
                    </div>
                </div>
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                    <label class="col-xs-4 control-label">渠道保证金(元):</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" id="channelEnsureMoney" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                    <label class="col-xs-4 control-label">上牌押金(元):</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" id="licensePlateEnsureMoney" readonly/>
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