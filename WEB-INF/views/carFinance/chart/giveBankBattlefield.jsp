<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<title>每日每月送行</title>
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
                <h1>每日每月送行战报<img src="${ctx}/styles/images/nav_mark.png" class="nav_mark" alt="tip"></h1>
            </div>
            <div class="title-item-8 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">时间选择</label>
                        <select id="month" class="form-control"></select>
                        <input type="text" class="form-control" name="day" id="day" value="" />
                    </div>
                    <div class="form-group">
                        <label class="control-label label">展示类型</label>
                        <div class="switch inline">
                            <input type="checkbox" id="date" checked/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">展示类型</label>
                        <div class="switch inline">
                            <input type="checkbox" id="group" class="group" checked/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="echart">
            <div class="echart-item b-1">
                <div id="bight" style="width:100%; height: 700px;" data-userlevel="${userLevel}" data-departmentname="${departmentName}"
                     data-datetime="${dateTime}" data-grouptype="${groupType}" data-type="${type}">

                </div>
            </div>
        </div>
    </div>
    <div class="tip-box">
        1)默认为银行.支持银行和部门切换,点击一级部门名称时,打开该一级部门下各子部门的数据<br>
        2)状态说明:<br>
        送行:财务打款且合同送交银行日期不为空;<br>
        放款:财务打款且银行放款日期不为空<br>
        3)点击送行金额,放款金额柱状图时,打开相应的"每日每月送行明细","每日每月放款明细"页面
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/chart/giveBankBattlefield.js"></script>
</html>
