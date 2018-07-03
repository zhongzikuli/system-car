<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>预算统计报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="superOrgId" value="${paramMap.superOrgId}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
    </div>
    <form id="pagerForm" action="${ctx}/flowFeeCostStatisticsReport/queryForFlowFeeCostStatisticsReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
        	<div class="col-sm-11  text-left">
                    <div class="form-inline">
	                    <shiro:hasPermission name="financeStatements:exporFlowFeeCostList">
	                		<a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporCostExcel()">导出</a>
	             		</shiro:hasPermission>
	                </div>
                </div>
                <div class="col-sm-1 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">查询日期:</label>
		                          <div class="col-xs-8">
	                                <div class="input-group">
										<input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" /> 
										<span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
									</div>
	                          </div>
	                        </div>
	                    </div>
	                   
	                    <div class="col-sm-5">
	                   	 	 <div class="form-group">
			                       <label class="col-xs-3 control-label">单位名称:</label>
		                      	      <div class="col-xs-8">
				                           <select class="form-control" id="search-superOrgId" name="superOrgId">
				                            <option value="">请选择</option>
		               	  					<c:if test="${userLevel == 1}">
					                            <c:forEach var="allOrgan" items="${allOrgan}" varStatus="dp">
					                                <c:choose>
					                                    <c:when test="${null == paramMap.superOrgId}">
					                                        <option value="${allOrgan.id}">${allOrgan.orgName}</option>
					                                    </c:when>
					                                    <c:when test="${paramMap.superOrgId == allOrgan.id}">
					                                        <option selected="selected" value="${allOrgan.id}">${allOrgan.orgName}</option>
					                                    </c:when>
					                                    <c:otherwise>
					                                        <option value="${allOrgan.id}">${allOrgan.orgName}</option>
					                                    </c:otherwise>
					                                </c:choose>
					                            </c:forEach>
				                            </c:if>
				                        </select>
		                           </div>
		                      </div>
	                         <div class="form-group group-btn">
			                      <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
			                       <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
	                   		</div>
	                    </div>
	                </div>
	           </div>
	         </div>
        </div>
    </form>
</div>
<div class="mod_basic">
   <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                    	<th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:15%;">单位名称</th>
                        <th style="width:10%;">查询日期</th>
                         <th style="width:5%;">订单数</th>
                        <th style="width:8%;">成本订单费用(元)</th>
                        <th style="width:8%;">收入订单费用(元)</th>
                        <th style="width:8%;">同盾策略次数</th>
                        <th style="width:8%;">成本同盾策略费用(元)</th>
                        <th style="width:8%;">收入同盾策略费用(元)</th>
                        <th style="width:8%;">同盾手机在网时长次数</th>
                        <th style="width:8%;">成本同盾手机在网时长费用(元)</th>
                        <th style="width:8%;">收入同盾手机在网时长费用(元)</th>
                        <th style="width:8%;">百融策略次数</th>
                        <th style="width:8%;">成本百融策略费用(元)</th>
                        <th style="width:8%;">收入百融策略费用(元)</th>
                        <th style="width:8%;">百融手机在网时长次数</th>
                        <th style="width:8%;">成本百融手机在网时长费用(元)</th>
                        <th style="width:8%;">收入百融手机在网时长费用(元)</th>
                        <th style="width:8%;">百融手机三要素核验次数</th>
                        <th style="width:8%;">成本百融手机三要素核验费用(元)</th>
                        <th style="width:8%;">收入百融手机三要素核验费用(元)</th>
                        <th style="width:8%;">百融自然人征信查询次数</th>
                        <th style="width:8%;">成本百融自然人征信查询费用(元)</th>
                        <th style="width:8%;">收入百融自然人征信查询费用(元)</th>
                        
                        <th style="width:8%;">身份证网格照查询次数</th>
                        <th style="width:8%;">成本身份证网格照查询费用(元)</th>
                        <th style="width:8%;">收入身份证网格照查询费用(元)</th>
                        
                        <th style="width:8%;">成本费用合计(元)</th>
                        <th style="width:8%;">收入费用合计(元)</th>
                        <th style="width:8%;">净收入费用合计(元)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="30">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		 <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.settleId}"></td>
                             <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                             <td class="cel">${item.orgName}</td>
                             <td class="cel"><sl:format type="date" show="${item.curDate}" pattern="yyyy-MM-dd"/></td>
                             <td class="cel">${item.orderNum}</td>
                             <td class="cel"> <sl:format type="number" show="${item.orderNumOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"> <sl:format type="number" show="${item.orderNumSaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.tongDunStrategyNum}</td>
                             <td class="cel"> <sl:format type="number" show="${item.tongDunStrategyOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"> <sl:format type="number" show="${item.tongDunStrategySaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.tongDunTimeNum}</td>
                             <td class="cel"><sl:format type="number" show="${item.tongDunTimeOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.tongDunTimeSaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.baiRongStrategyNum}</td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongStrategyOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongStrategySaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.baiRongTimeNum}</td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongTimeOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongTimeSaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.baiRongTelThirdNum}</td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongTelThirdOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongTelThirdSaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.baiRongPersonNum}</td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongPersonOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.baiRongPersonSaleFee}" pattern="#,##0.00"/></td>
                             
                             <td class="cel">${item.idCardPhotoNum}</td>
                             <td class="cel"><sl:format type="number" show="${item.idCardPhotoOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.idCardPhotoSaleFee}" pattern="#,##0.00"/></td>
                             
                             <td class="cel"><sl:format type="number" show="${item.sumOriginalFee}" pattern="#,##0.00"/></td>
                             <td class="cel"><sl:format type="number" show="${item.sumSaleFee}" pattern="#,##0.00"/></td>
                             <td class="cel"> <sl:format type="number" show="${item.sumSaleFee-item.sumOriginalFee}" pattern="#,##0.00"/></td>
                        </tr>
                    </c:forEach>
                </table>
    <%-- 分页表单参数 --%>
    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
            <%-- end table-responsive --%>
        </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/flowFeeSettlementStatisticsList.js"></script>
</html>
