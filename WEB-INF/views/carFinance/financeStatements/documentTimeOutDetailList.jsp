<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>单证超时明细表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="depName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="departmentId" value="${departmentId}"/>
        <input type="hidden" name="departmentParentId" value="${departmentParentId}"/>
        
    </div>
    <form id="pagerForm" action="${ctx}/documentTimeOutDetailReport/queryForDocumentTimeOutDetailReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-11  text-left">
	       	  <div class="form-inline">
	       	  			<shiro:hasPermission name="financeStatements:exporDocumentTimeOutDetailList">
		              		 <a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporDocumentTimeOutDetailExcel()">导出</a>
              		 	</shiro:hasPermission>
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
	                     	<input type="hidden" name="departmentId" value="${departmentId}"/>
                   			<input type="hidden" name="departmentParentId" value="${departmentParentId}"/>
	                          <label class="col-xs-3 control-label">部门:</label>
		                        <div class="col-xs-8 form-group relative">
			                        <input type="text" class="form-control" id="departmentTreeId" readonly="readonly" data-id="${departmentId}" data-parnetid="${departmentParentId}" value="${departName}"/>
			                        <div id="menuContent" class="menuContent" style="border:1px solid #08e6f5; display: none;position: absolute;padding: 10px;height:300px;">
			                            <ul id="departmentTree" class="ztree"></ul>
			                        </div>
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
                        <th style="width:5%;">车型构成</th>
                        <th style="width:5%;">上级部门</th>
                        <th style="width:5%;">部门</th>
                        <th style="width:5%;">信贷专员</th>
                        <th style="width:5%;">客户姓名</th>
                        <th style="width:5%;">身份证号</th>
                        <th style="width:5%;">车辆型号</th>
                        <th style="width:5%;">价格(元)</th>
                        <th style="width:5%;">贷款额(元)</th>
                        <th style="width:5%;">合同价(元)</th>
                        <th style="width:8%;">垫款日期</th>
                        <th style="width:8%;">贷款合同齐全日期</th>
                        <th style="width:8%;">送银行日期</th>
                        <th style="width:8%;">银行放款日期</th>
                        <th style="width:10%;">银行</th>
                        <th style="width:5%;">按揭期限(月)</th>
                        <th style="width:5%;">资料对接人</th>
                        <th style="width:5%;">超时天数</th>
                        <th style="width:10%;">单证送银行备注</th>
                        <th style="width:5%;">问题类型</th>
                        <th style="width:8%;">合同收到日期</th>
                        <th style="width:8%;">合同号</th>
                        <th style="width:5%;">合同箱号</th>
                        <th style="width:8%;">订单号</th>
                      
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
                            <td class="cel">${item.newOrOld}</td>
                            <td class="cel">${item.parentDepName}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel"><sl:format type="number" show="${item.contractCarPrice}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.contracPrice}" pattern="#,##0.00"/></td>
                            <td class="cel"><fmt:formatDate value="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.loanContractAllDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.loanMonth}</td>
                            <td class="cel">${item.operationingLoginNameContractPrint}</td>
                            <td class="cel">${item.overDate}</td>
                            <td title="${item.contractSubmitBankRemark}" style="max-width:100px">${item.contractSubmitBankRemark}</td>
                            <td class="cel">${item.askType}</td>
                            <td class="cel"><fmt:formatDate value="${item.loanContractReceiveDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel">${item.contractNo}</td>
                            <td class="cel">${item.contractBoxNo}</td>
                            <td class="cel">${item.orderNo}</td>
                            
                            
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
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/documentTimeOutDetailList.js"></script>
</html>
