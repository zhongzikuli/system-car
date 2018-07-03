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
        <input type="hidden" name="depName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="paymentDatestartDate" value="${paramMap.paymentDatestartDate}">
        <input type="hidden" name="paymentDatesendDate" value="${paramMap.paymentDatesendDate}">
        
    </div>
    <form id="pagerForm" action="${ctx}/contractBindingReport/queryForContractBindingReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-11  text-left">
	       	  <div class="form-inline">
              		 <shiro:hasPermission name="financeStatements:exporContractBindingList">
						<a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporContractBindingExcel()">导出</a>
					</shiro:hasPermission>
	            </div>
           </div>
            <div class="col-sm-1 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">装订日期:</label>
		                          <div class="col-xs-8">
	                                <div class="input-group">
										<input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" /> 
										<span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
									</div>
	                         	 </div>
	                        </div>
	                        <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">经办日期:</label>
			                          <div class="col-xs-8">
										<div class="input-group">
											<input type="text" class="form-control" name="paymentDatestartDate" id="search-start-paymentDatestartDate" value="${paramMap.paymentDatestartDate}" /> 
											<span class="input-group-addon">到</span> <input type="text" class="form-control" name="paymentDatesendDate" id="search-end-paymentDatesendDate" value="${paramMap.paymentDatesendDate}" />
										</div>
									</div>
		                    </div>
		                    <div class="form-group">
			                       <label class="col-xs-3 control-label">贷款银行:</label>
		                      	      <div class="col-xs-8">
				                           <select class="form-control" id="search-bank" name="bankId">
				                            <option value="">请选择</option>
				                            <c:forEach var="bankentity" items="${bankentity}" varStatus="dp">
				                                <c:choose>
				                                    <c:when test="${null == paramMap.bankId}">
				                                        <option value="${bankentity.id}">${bankentity.bankName}</option>
				                                    </c:when>
				                                    <c:when test="${paramMap.bankId == bankentity.id}">
				                                        <option selected="selected" value="${bankentity.id}">${bankentity.bankName}</option>
				                                    </c:when>
				                                    <c:otherwise>
				                                        <option value="${bankentity.id}">${bankentity.bankName}</option>
				                                    </c:otherwise>
				                                </c:choose>
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
                        <th style="width:5%;">一级部门</th>
                        <th style="width:8%;">部门</th>
                        <th style="width:8%;">信贷专员</th>
                        <th style="width:8%;">银行</th>
                        <th style="width:8%;">车型</th>
                        <th style="width:8%;">合同号</th>
                        <th style="width:8%;">箱号</th>
                        <th style="width:8%;">操作人</th>
                        <th style="width:8%;">保存日期</th>
                        <th style="width:8%;">垫款日期</th>
                        <th style="width:8%;">送行日期</th>
                        <th style="width:8%;">放款日期</th>
                      
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="17">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		 <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel">${item.parentDepName}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel">${item.contractNo}</td>
                            <td class="cel">${item.contractBoxNo}</td>
                            <td class="cel">${item.bindingOperatorPersonName}</td>
                            <td class="cel"><fmt:formatDate value="${item.bindingOperatorDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/contractBindingList.js"></script>
</html>
