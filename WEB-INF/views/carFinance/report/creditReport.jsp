<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>征信战报</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body class="grey-bg">
<div class="wrapper wrapper-content" style="background: #f3f3f3;">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5 class="border-b"><span class="nav-icon"></span>
                        征信战报
                    </h5>
                </div>
            </div>
            <div class="ibox-content" style="padding:10px 13px;">
                <div class="col-sm-12  no-padding min-h-250">
                    <div class="table-responsive" id="result">
                        <table class="table table-hover table-striped table-order table-more">
                            <thead>
                            <th>银行名称</th>
                            <th>今日查询量</th>
                            <th>月查询量</th>
                            </thead>
                            <tbody>
                            <tr class='no-border'>
                                <td class='col-td' colspan='3'>暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                        <div id="pagination" class="pagination pagination-right"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</div>
</body>

<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/creditReport.js"></script>
</html>