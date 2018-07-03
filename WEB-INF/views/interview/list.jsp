<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>实时面签</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm">
        <div class="row">
            <div class="col-sm-3 tabs-container">
                <ul class="nav nav-tabs">
                    <li class="unleft active">
                    	<a data-toggle="tab" href="#" aria-expanded="true" data-type="1">申请面签</a></li>
                    <li class="unleft">
                    	<a data-toggle="tab" href="#" aria-expanded="false" data-type="2">准备面签</a></li>
                    <li class="unleft">
                    	<a data-toggle="tab" href="#" aria-expanded="false" data-type="3">完成面签</a></li>
                </ul>
            </div>
            <div class="col-sm-9">
                <div class="form-inline" style="margin-top: 9px;">
                    <div class="form-group" id="date-time">
                        <label class="control-label label">申请日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" id="sTime" value=""/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate" id="eTime" value=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">搜索:</label>
                        <input type="text" class="form-control w-200" name="keyword" id="search-keyword"
                              placeholder="请输入客户姓名或身份证号" value="">
                        <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSumbit()">搜索</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="mod_basic">
    <div class="row">
        <div class="col-sm-12">
            <div class="table-responsive" id="result">
                <table class="table table-hover table-striped table-more">
                    <thead></thead>
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
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/interview/list.js"></script>
</html>