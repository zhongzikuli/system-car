<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>资金分布图战报</title>
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
		            <h1>资金分布图战报</h1>
		        </div>
		        <div class="title-item-8 text-right">
		            <div class="form-inline">
		                <div class="form-group">
							<div class="input-group">
								<input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" /> 
								<span class="input-group-addon">-</span>
								<input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
							</div>
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
		    <div class="echart">
		        <div class="echart-item-8 b-1">
		            <div id="bight" style="width:92%; height: 700px;">

		            </div>
		            <div class="bight-con">
		            	
		            </div>
		        </div>
		        <div class="echart-item-2 b-1">
					<p class="echart-item-title">超时单证</p>
                    <div class="rank-content" style="width:100%; height: 619px; overflow-y: hidden;">
                    </div>
		        </div>
		    </div>
		</div>
	</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/chart/fundsDistributionReport.js?version=201803121434333"></script>
</html>