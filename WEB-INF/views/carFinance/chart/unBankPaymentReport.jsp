<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>未放贷图</title>
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
                <h1>未放贷战报<img src="${ctx}/styles/images/nav_mark.png" class="nav_mark" alt="tip"></h1>
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
		2)状态说明:财务打款后到银行放款日期为空<br>
		3)未放款时间片分为如下:5天未放款(T&le;5),5-10天未放款(5&lt;T&le;10),10-15天未放款(10&lt;T&le;15),15-20天未放款(15&lt;T&le;20),20-25天未放款(20&lt;T&le;25),<br>25-30天未放款(25&lt;T&le;30),超过30天未放款( T&gt;30).T = 当前日期 – 公司垫付日期 (不包含非工作日,节假日)<br>
		4)点击5天未放贷,5-10天未放贷,10-15天未放贷,15-20天未放贷,20-25天未放贷,25-30天未放贷,超过30天未放贷等打开"未放款明细"页面,详细页面表头相同,<br>
但是未放贷天数不同
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/chart/unBankPayment.js"></script>
</html>