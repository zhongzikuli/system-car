<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>送行卡表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}">
        
    </div>
    <form id="pagerForm" action="${ctx}/sendBankCardReport/queryForSendBankCardReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-1  text-left">
         	<div class="form-inline">
	                 <a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporSendBankCardExcel()">导出</a>
            </div>
        </div>
           <div class="col-sm-11 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-4 control-label">提前开卡送行日期:</label>
		                          <div class="col-xs-7">
	                                <div class="input-group">
										<input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" /> 
										<span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
									</div>
	                          </div>
	                        </div>
		                	<div class="form-group">
			                        <label class="col-xs-4 control-label">快捷搜索:</label>
				                        <div class="col-xs-7">
					                        <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
				                        </div>
	                   	 	 </div> 
	                    </div>
	                   
	                    <div class="col-sm-5">
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
                        <th style="width:8%;">姓名</th>
                        <th style="width:15%;">身份证</th>
                        <th style="width:15%;">经销商名称</th>
                        <th style="width:5%;">年收入</th>
                        <th style="width:8%;">本金(元)</th>
                        <th style="width:8%;">手续费(元)</th>
                        <th style="width:5%;">期限(月)</th>
                        <th style="width:8%;">押品金额(元)</th>
                        <th style="width:8%;">申请调整帐户额度(元)</th>
                        <th style="width:8%;">贷款成数</th>
                        <th style="width:8%;">提前开卡送行日期</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="16">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		 <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel">浙江浩驰资产管理有限公司</td>
                            <td class="cel">90</td>
                            <td class="cel"><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.installmentPayPoundage}" pattern="#,##0.00"/></td>
                            <td class="cel">${item.month}</td>
                            <td class="cel"><sl:format type="number" show="${item.auditCarPrice}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.installmentPayMoney}" pattern="#,##0.00"/></td>
                             <td class="cel">${item.loanNumber}</td>
                            <td class="cel"><fmt:formatDate value="${item.preCardSendToBankDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/sendBankCardList.js"></script>
</html>
