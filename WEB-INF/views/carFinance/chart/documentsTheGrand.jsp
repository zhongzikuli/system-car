<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <title>单证战报</title>
    <link rel="stylesheet" href="${ctx}/js/third/bootstrap/bootstrap-switch.min.css">
    <link rel="stylesheet" href="${ctx}/styles/mine/echarts.css">
</head>
<body class="bg-purple scroll-x">
<div class="echart-content">
    <div class="wrapper wrapper-content">
        <div class="title">
            <div class="title-item-4">
                <h1>单证战报<img src="${ctx}/styles/images/nav_mark.png" class="nav_mark" alt="tip"></h1>
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
        2)已垫款且资料不齐全且单证超时:财务打款且贷款合同齐全日期为空.当前日期 > 垫付日期 + 3(不包含非工作日,节假日)<br>
        3)已垫款且资料不齐全单证未超时:财务打款且贷款合同齐全日期为空.当前日期 <= 垫付日期+ 3(不包含非工作日,节假日)<br>
        4)已垫款且资料齐全未送行:财务打款且贷款合同齐全日期不为空且合同送交银行日期为空且未放款<br>
        5)已垫款且资料齐全且送行未放款:财务打款且贷款合同齐全日期不为空且合同送交银行日期为空<br>
        6)资料不齐全单证超时明细 超时天数:当前日期 – 公司垫付日期<br>
        7)资料不齐全单证未超时明细 间隔天数:当前日期 – 公司垫付日期
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/chart/documentsTheGrand.js"></script>
</html>