<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>银行车购台账报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="depName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="paymentDatestartDate" value="${paramMap.paymentDatestartDate}">
        <input type="hidden" name="paymentDatesendDate" value="${paramMap.paymentDatesendDate}">
    </div>
    <form id="pagerForm" action="${ctx}/bankCarPurchaseLedgerReport/queryForBankCarPurchaseLedgerReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
        	<div class="col-sm-11  text-left">
                    <div class="form-inline">
	                    <shiro:hasPermission name="financeStatements:bankCarPurchaseLedgerList">
	                		<a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporbankCarPurchaseLedgerExcel()">导出</a>
	             		</shiro:hasPermission>
	                  <%--  <c:if test="${ not empty entity}">
		                    <div class="form-group">
		                        <label class="alert-warning">总按揭服务费(万元): </label>
		                        <code class="alert-info"><sl:format type="number" show="${entity.serviceFee/10000}" pattern="#,##0.00"/></code>
		                    </div>
		                    <div class="form-group">
			                	<label class="alert-warning">总按揭手续费(万元): </label>
			                	<code class="alert-info"><sl:format type="number" show="${entity.poundage/10000}" pattern="#,##0.00"/></code>
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
				                <label class="alert-warning">总代偿额(万元): </label>
				                <code class="alert-info"><sl:format type="number" show="${entity.money/10000}" pattern="#,##0.00"/></code>
		                    </div>
		                    <div class="form-group">
				                <label class="alert-warning">总数(条): </label>
				                <code class="alert-info">${count}</code>
		                    </div>
	                    </c:if> --%>
	                </div>
                </div>
                <div class="col-sm-1 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">合同送行日期:</label>
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
			                        <label class="col-xs-3 control-label">快捷搜索:</label>
				                        <div class="col-xs-8">
					                        <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
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
                        <th style="width:8%;">合同编号</th>
                        <th style="width:5%;">交易状态</th>
                        <th style="width:5%;">经办支行</th>
                        <th style="width:5%;">借款人</th>
                        <th style="width:8%;">进行日期</th>
                        <th style="width:10%;">卡号</th>
                        <th style="width:5%;">正式查询打印</th>
                        <th style="width:10%;">身份证</th>
                        <th style="width:5%;">电话核实状态</th>
                        <th style="width:10%;">申请单编号</th>
                        <th style="width:10%;">车型</th>
                        <th style="width:10%;">车架号</th>
                        <th style="width:10%;">发动机号</th>
                        <th style="width:10%;">购车价(元)</th>
                        <th style="width:10%;">首付款(元)</th>
                        <th style="width:10%;">首付比例</th>
                        <th style="width:10%;">贷款金额(元)</th>
                        <th style="width:10%;">担保服务费(元)</th>
                        <th style="width:10%;">分期总额(加担保费的)(元)</th>
                        <th style="width:10%;">分期期数</th>
                        <th style="width:10%;">授信总额(加手续费)(元)</th>
                        <th style="width:10%;">月均还款(元)</th>
                        <th style="width:10%;">一调</th>
                        <th style="width:10%;">二调</th>
                        <th style="width:10%;">主管经理</th>
                        <th style="width:10%;">支行签批人</th>
                        <th style="width:10%;">复核完成时间</th>
                        <th style="width:10%;">调查开始</th>
                        <th style="width:10%;">调查完成</th>
                        <th style="width:10%;">审批开始</th>
                        <th style="width:10%;">审批结束</th>
                        <th style="width:10%;">发卡日期</th>
                        <th style="width:10%;">调查审批时间</th>
                        <th style="width:10%;">放款日期</th>
                        <th style="width:10%;">结清日</th>
                        <th style="width:10%;">保险日期</th>
                        <th style="width:10%;">保险金额(元)</th>
                        <th style="width:10%;">抵押日期</th>
                        <th style="width:10%;">抵押登记证编号</th>
                        <th style="width:10%;">档案移交日期</th>
                        <th style="width:10%;">配偶姓名</th>
                        <th style="width:10%;">配偶身份证号</th>
                        <th style="width:10%;">共同还款人</th>
                        <th style="width:10%;">身份证号</th>
                        <th style="width:10%;">收入情况</th>
                        <th style="width:10%;">住房情况</th>
                        <th style="width:10%;">受教育情况</th>
                        <th style="width:10%;">工作单位</th>
                        <th style="width:10%;">通讯地址</th>
                        <th style="width:10%;">联系电话</th>
                        <th style="width:10%;">其他备注</th>
                       
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="52">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		 <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel">${item.realName}</td>
                             <td class="cel"><fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel">${item.vinNo}</td>
                            <td class="cel">${item.engineNo}</td>
                            <td class="cel">
                            <sl:format type="number" show="${item.auditCarPrice}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                            <sl:format type="number" show="${item.actualFirstPay}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                            <sl:format type="number" show="${item.actualFirstPayRatio}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                            <sl:format type="number" show="${item.contractPrice-item.actualLoadMoney}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                            <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">${item.loanPeriodMonth}</td>
                            <td class="cel"></td>
                            <td class="cel">
                            <sl:format type="number" show="${item.repayMonth}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"><fmt:formatDate value="${item.vciBeginDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel">
                            <sl:format type="number" show="${item.carDamagePrice}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel">${item.spouseName}</td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                            <td class="cel"></td>
                           
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/bankCarPurchaseLedgerList.js"></script>
</html>
