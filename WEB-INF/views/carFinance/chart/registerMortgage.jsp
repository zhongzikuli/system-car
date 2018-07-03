<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>抵押资料战报展示</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="${ctx}/js/third/bootstrap/bootstrap-switch.min.css">
    <link rel="stylesheet" href="${ctx}/styles/mine/echarts.css">
</head>
<body class="bg-purple scroll-x">
<div class="echart-content">
    <div class="wrapper wrapper-content">
        <div class="title">
            <div class="title-item-4">
                <h1>抵押资料战报<img src="${ctx}/styles/images/nav_mark.png" class="nav_mark" alt="tip"></h1>
            </div>
            <div class="title-item-8 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">展示类型</label>
                        <div class="switch inline">
                            <input type="checkbox" id="searchType" checked/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="echart">
            <div class="echart-item b-1">
                <div id="bight" style="width:100%; height: 700px;" data-userlevel="${userLevel}"
                     data-departmentname="${departmentName}">

                </div>
            </div>
        </div>
    </div>
    <div class="tip-box">
        1)默认为银行.支持银行和部门切换,点击一级部门名称时,打开该一级部门下各子部门的数据<br>
        2)抵押资料已寄出未超时:抵押资料寄网点日期不为空且抵押资料交银行日期为空且银行放款日期到现在小于等于30天(自然日)<br>
        3)抵押资料已寄出已超时:抵押资料寄网点日期不为空且抵押资料交银行日期为空且银行放款日期到现在超过30天(自然日)<br>
        4)抵押资料未寄出未超时:抵押资料寄网点日期为空且银行放款日期不为空且抵押资料交银行日期为空且银行放款日期到现在小于等于7天(自然日)<br>
        5)抵押资料未寄出超时:抵押资料寄网点日期为空且银行放款日期不为空且抵押资料交银行日期为空且银行放款日期到现在超过7天(自然日)<br>
        6)抵押资料未寄出超时:抵押资料寄网点日期为空且银行放款日期不为空且抵押资料交银行日期为空且银行放款日期到现在超过7天(自然日)
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/chart/registerMortgage.js"></script>
</html>