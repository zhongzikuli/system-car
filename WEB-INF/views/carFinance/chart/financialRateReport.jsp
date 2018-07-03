<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>资金周转率战报</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="${ctx}/js/third/bootstrap/bootstrap-switch.min.css">
    <link rel="stylesheet" href="${ctx}/styles/mine/echarts.css">
	<link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body class="bg-purple scroll-x">
	<div class="echart-content">
		<div class="wrapper wrapper-content">
		    <div class="title">
		        <div class="title-item-4">
		            <h1>资金周转率战报</h1>
		        </div>
		        <div class="title-item-8 text-right">
		            <div class="form-inline">
		                <div class="form-group">
								<input type="text" class="form-control" id="departmentId" readonly="readonly" onclick="selectDepartment(175)" data-id="${sysOrgan.id}" data-grandid="true"
								data-parentid="${sysOrgan.parentId}"  data- value="${sysOrgan.orgName}">
								<div id="menuContent" class="menuContent" style="border:1px solid #08e6f5; display: none;position: absolute;padding: 10px;height:300px;">
									<ul id="departmentTree" class="ztree"></ul>
								</div>
		                </div>
						<div class="form-group">
							<select id="bankId" class="form-control">
								<option value="">请选择..</option>
								<c:forEach items="${bank}" var="bank">
									<option value="${bank.id}">${bank.bankName}</option>
								</c:forEach>
							</select>
						</div>
		                <div class="form-group">
		                    <select id="year" class="form-control"></select>
		                </div>
		                <div class="form-group">
		                    <label class="control-label label">展示类型</label>
		                    <div class="switch inline">
		                        <input type="checkbox" id="date" checked/>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		    <div class="total"></div>
		    <div class="echart">
		        <div class="echart-item-8 b-1">
		            <div id="bight" style="width:100%; height: 400px;">

		            </div>
		        </div>
		        <div class="echart-item-4 b-1">
                    <div id="rate" style="width:100%; height: 400px;">

                    </div>
		        </div>
		    </div>
		    <div class="rank">
		        <div class="rank-content b-1">
		        </div>
		    </div>
		</div>
	</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/chart/financialRateReport.js?v=201805715366"></script>
</html>