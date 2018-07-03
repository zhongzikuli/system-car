<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>报表列表管理</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">

</div>
<div class="mod_basic full-height">
    <div class="ibox-content full-height no-padding">
        <div class="col-sm-2 no-padding full-height  border-r-3 report-left">
            <div class="table-responsive" id="reportInfo">
                <table class="table table-hover table-height table-striped margin-b-0">
                    <thead>
                    <tr>
                        <th>报表名称</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-sm-10 no-padding animated fadeInRight full-height report-right" id="reportField">
            <div style="padding: 2px 10px;" id="reportNameForm">
                <form id="searchForm">
                    <span class="search-span"></span>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-inline search-from">

                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="border-t-1 full-height">
                <div class="table-responsive full-height" id="reportFieldList">
                    <table class="table table-hover table-height table-striped margin-b-0 table-more">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div id="pagination" class="pagination pagination-right" style="bottom:35px; right:0"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/list.js"></script>
</html>