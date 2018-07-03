<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>资金包明细</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-3 tabs-container">
            <ul class="nav nav-tabs">
                <li class="unleft active">
                    <a data-toggle="tab" href="#" aria-expanded="true" data-type="1">生效</a></li>
                <li class="unleft">
                    <a data-toggle="tab" href="#" aria-expanded="false" data-type="4">过期</a></li>
                <li class="unleft">
                    <a data-toggle="tab" href="#" aria-expanded="false" data-type="2">放款</a></li>
                <li class="unleft">
                    <a data-toggle="tab" href="#" aria-expanded="false" data-type="3">退单</a></li>
            </ul>
        </div>

        <div class="col-sm-2 text-left" style="padding-top: 5px;">
            <div class="form-group">
                <button class="btn btn-success btn-sm excel-detail">导出</button>
                <button class="btn btn-info btn-sm refresh-btn">刷新</button>
            </div>
        </div>
        <div class="col-sm-6  text-left" style="padding-top: 20px;">
            <div class="form-inline">
                    <div class="form-group">
                        <label class="alert-warning">总垫款金额(元): </label>
                        <code class="alert-info"><%--<sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/>--%></code>
                    </div>
                <div class="form-group">
                    <label class="alert-warning">总合同价(元): </label>
                    <code class="alert-success"><%--<sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/>--%></code>
                </div>
            </div>
        </div>
        <div class="col-sm-1 text-right">
            <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
            <div class="btn-box animated fadeInRight">
                <div class="row">
                    <div class="col-sm-6">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">垫款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="sCompanyAdvanceMoneyDate" id="sCompanyAdvanceMoneyDate" value="${sCompanyAdvanceMoneyDate}" />
                                        <span class="input-group-addon">到</span> <input type="text" class="form-control" name="eCompanyAdvanceMoneyDate" id="eCompanyAdvanceMoneyDate" value="${eCompanyAdvanceMoneyDate}" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">放款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="sBankPaymentDate" id="sBankPaymentDate" value="${sBankPaymentDate}" />
                                        <span class="input-group-addon">到</span> <input type="text" class="form-control" name="eBankPaymentDate" id="eBankPaymentDate" value="${eBankPaymentDate}" />
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-sm-6">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">操作日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="sCancelLendingMoneyTime" id="sCancelLendingMoneyTime" value="${sCancelLendingMoneyTime}" />
                                        <span class="input-group-addon">到</span> <input type="text" class="form-control" name="eCancelLendingMoneyTime" id="eCancelLendingMoneyTime" value="${eCancelLendingMoneyTime}" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">搜索:</label>
                                <div class="col-xs-8">
                                <input type="text" class="form-control" name="keyword" id="search-keyword"
                                       placeholder="请输入客户姓名或身份证号" value="">
                                </div>
                            </div>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
                                <button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic">
    <div class="row">
        <div class="col-sm-12">
            <div class="table-responsive" id="result">
                <table class="table table-hover table-striped table-more">
                    <thead>
                    <tr>
                        <input type="hidden" id="Pid" value="${id}">
                        <th style="width: 2%"><input type="checkbox" class="checkAll"></th>
                        <th style="width: 2%">序号</th>
                        <th style="width: 12%">资产编号</th>
                        <th style="width: 12%">资产包名称</th>
                        <th style="width: 8%">客户名称</th>
                        <th style="width: 5%">身份证号</th>
                        <th style="width: 10%">垫付金额</th>
                        <th style="width: 10%">合同价</th>
                        <th style="width: 12%">贷款期限(月)</th>
                        <th style="width: 10%">公司垫付日期</th>
                        <th style="width: 8%">银行放贷日期</th>
                        <th style="width: 5%">操作日期</th>
                        <th style="width: 10%">状态</th>
                        <th style="width: 8%">操作</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div id="pagination" class="pagination"></div>
            </div>
        </div>
    </div>
</div>
</body>
<%-- js库引入--%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/moneyPackageCentre/list.js"></script>
</html>