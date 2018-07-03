<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>战报</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body class="grey-bg">
<div class="wrapper wrapper-content" style="background: #f3f3f3;">
    <div class="row" style="padding-bottom: 20px;" id="reportList" data-bankid="${bankId}">
        <div class="col-sm-12">
            <div class="ibox" style="background: #fff;color:#239fe8;">
                <div class="ibox-title">
                        <h5 class="border-b"><span class="nav-icon"></span>我的订单<span class="orderNum">(0)</span>
                    <a class="ibox-tools"
                       href="${ctx}/cfBusinessOrderAccept/console.action">更多&raquo;</a>
                       </h5>
                </div>
                <div class="ibox-content table-responsive">
                    <table class="table table-hover table-striped table-order">
                        <thead>
                        <tr>
                            <th>客户名称</th>
                            <th>身份证号</th>
                            <th>贷款银行</th>
                            <th>订单状态</th>
                            <th>征信提交时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody style="color:#666;"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/bankReport.js"></script>
</html>