<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>财务数据表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="orderNumber" value="${paramMap.orderNumber}"/>
        <input type="hidden" name="depName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="paymentDatestartDate" value="${paramMap.paymentDatestartDate}">
        <input type="hidden" name="moneyPackageState" value="${paramMap.moneyPackageState}">
        <input type="hidden" name="moneyPackage" value="${paramMap.moneyPackage}">
        
    </div>
    <form id="pagerForm" action="${ctx}/financialDataStatisticalReport/queryForDataStatisticsReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-11  text-left">
       	  <div class="form-inline">
			<shiro:hasPermission name="financeStatements:exporDataStatisticsList">
              		 <a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporDateDetailsExcel()">导出</a>
			</shiro:hasPermission>
			<c:if test="${ not empty entity}">
                <div class="form-group">
                       <label class="alert-warning">总按揭服务费(万元): </label>
                       <code class="alert-info"><sl:format type="number" show="${entity.serviceFee/10000}" pattern="#,##0.00"/></code>
                   </div>
                  
                <div class="form-group">
	                <label class="alert-warning">总贷款本金(万元): </label>
	                <code class="alert-info"><sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                   </div>
                 
                <div class="form-group">
	               <label class="alert-warning">总合同价(万元): </label>
	               <code class="alert-info"><sl:format type="number" show="${entity.contractPrice/10000}" pattern="#,##0.00"/></code>
                </div>
                 <div class="form-group">
				                <label class="alert-warning">总数(条): </label>
				                <code class="alert-info">${count}</code>
                </div>
		                   
               </c:if>
               </div>
            </div>
            <div class="col-sm-1 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">垫款日期:</label>
		                          <div class="col-xs-8">
	                                <div class="input-group">
										<input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" /> 
										<span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
									</div>
	                          </div>
	                        </div>
	                        <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">放款日期:</label>
			                          <div class="col-xs-8">
										<div class="input-group">
											<input type="text" class="form-control" name="paymentDatestartDate" id="search-start-paymentDatestartDate" value="${paramMap.paymentDatestartDate}" /> 
											<span class="input-group-addon">到</span> <input type="text" class="form-control" name="paymentDatesendDate" id="search-end-paymentDatesendDate" value="${paramMap.paymentDatesendDate}" />
										</div>
									</div>
		                     </div>
	                       
		                   
	                   	    <div class="form-group">
		                          <label class="col-xs-3 control-label">资产包名称:</label>
			                          <div class="col-xs-8">
										 <select class="form-control" id="search-moneyPackage-Id" name="moneyPackage">
				                            <option value="">请选择</option>
				                            <c:forEach items="${moneyPackageEntity}" var="mp">
                                                <option value="${mp.id}"<c:if test="${mp.id eq paramMap.moneyPackage}">selected</c:if>>${mp.name}</option>
                                            </c:forEach>
		                       		 </select>
									</div>
		                     </div>
		                	
	                    </div>
	                    <div class="col-sm-5">
	                     	<div class="form-group">
	                          <label class="col-xs-3 control-label">部门:</label>
		                        <div class="col-xs-8">
		                          <select class="form-control" id="search-deparment-name" name="depName">
		                            <option value="">请选择</option>
		                            <c:forEach var="department" items="${departments}" varStatus="dp">
		                                <c:choose>
		                                    <c:when test="${null == paramMap.departmentName}">
		                                        <option value="${department.name}">${department.name}</option>
		                                    </c:when>
		                                    <c:when test="${paramMap.departmentName == department.name}">
		                                        <option selected="selected" value="${department.name}">${department.name}</option>
		                                    </c:when>
		                                    <c:otherwise>
		                                        <option value="${department.name}">${department.name}</option>
		                                    </c:otherwise>
		                                </c:choose>
		                            </c:forEach>
		                        </select>
		                        </div>
		                    </div>
		                      <div class="form-group">
			                        <label class="col-xs-3 control-label">快捷搜索:</label>
				                        <div class="col-xs-8">
					                        <input id="search-keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
				                        </div>
	                   	   	</div> 
			                 <div class="form-group">
		                          <label class="col-xs-3 control-label">资金包状态:</label>
			                        <div class="col-xs-8">
				                        <select class="form-control" id="search-moneyPackageState" name="moneyPackageState">
				                        	 <option value="">请选择</option>
				                             <option value="1" <c:if test="${paramMap.moneyPackageState == 1}">selected</c:if>>生效</option>
		                           			<option value="2" <c:if test="${paramMap.moneyPackageState == 2}">selected</c:if>>放款</option>
		                            		<option value="3" <c:if test="${paramMap.moneyPackageState == 3}">selected</c:if>>过期</option>
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
                        <th style="width:8%;">订单号</th>
                        <th style="width:8%;">客户名</th>
                        <th style="width:8%;">身份证号码</th>
                        <th style="width:5%;">产品类型</th>
                        <th style="width:8%;">垫款日期</th>
                        <th style="width:8%;">放款日期</th>
                        <th style="width:8%;">送行日期</th>
                        <th style="width:8%;">部门</th>
                        <th style="width:8%;">省份</th>
                        <th style="width:5%;">信贷专员</th>
                        <th style="width:8%;">贷款银行</th>
                        <th style="width:5%;">车型</th>
                        <th style="width:5%;">车牌号</th>
                        <th style="width:5%;">车型构成</th>
                        <th style="width:5%;">资产包名称</th>
                        <th style="width:5%;">资产包状态</th>
                        <th style="width:5%;">垫付金额(元)</th>
                        <th style="width:5%;">贷款额(元)</th>
                        <th style="width:5%;">合同价(元)</th>
                        <th style="width:5%;">按揭服务费(元)</th>
                        <th style="width:5%;">按揭手续费(元)</th>
                        <th style="width:5%;">履约保证金(元)</th>
                        <th style="width:5%;">渠道保证金(元)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="25">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		 <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel">${item.productName}</td>
                            <td class="cel"><fmt:formatDate value="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.province}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel">${item.plateNumber}</td>
                            <td class="cel">
                               <c:if test="${item.newOrOld == 1 }"> <code class="alert-success">新车</code> </c:if>
                               <c:if test="${item.newOrOld == 0 }"> <code class="alert-warning">二手车</code></c:if>
                            </td>
                            <td class="cel">${item.moneyPackageName}</td>
                            <td class="cel">${item.moneyPackageState}</td>
                            <td class="cel"><sl:format type="number" show="${item.companyAdvanceMoney}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.serviceFee}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.poundage}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.agreeEnsureMoney}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.channelEnsureMoney}" pattern="#,##0.00"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/dataStatisticsList.js"></script>
</html>
