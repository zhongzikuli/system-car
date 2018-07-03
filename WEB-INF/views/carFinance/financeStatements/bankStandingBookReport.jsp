<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>银行台账表表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        
    </div>
    <form id="pagerForm" action="${ctx}/bankStandingBookReport/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-11  text-left">
	       	  <div class="form-inline">
		              	<a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporBankStandingBookReportExcel()">导出</a>
	            </div>
           </div>
            <div class="col-sm-1 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">送行日期:</label>
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
		                     <%-- <div class="form-group">
			                        <label class="col-xs-3 control-label">快捷搜索:</label>
				                        <div class="col-xs-8">
					                        <input id="search-keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
				                        </div>
	                   	   	</div> --%>
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
                        <th style="width:8%;">客户姓名</th>
                        <th style="width:8%;">证件号码</th>
                        <th style="width:8%;">新车/二手车</th>
                        <th style="width:5%;">手机号</th>
                        <th style="width:5%;">现住地址</th>
                        <th style="width:5%;">现住固话</th>
                        <th style="width:5%;">工作单位</th>
                        <th style="width:5%;">单位电话</th>
                        <th style="width:8%;">配偶姓名</th>
                        <th style="width:8%;">配偶身份证</th>
                        <th style="width:8%;">联系电话</th>
                        <th style="width:10%;">送行担保人</th>
                        <th style="width:12%;">担保人身份证</th>
                        <th style="width:10%;">送行担保人电话</th>
                        <th style="width:8%;">关系</th>
                        <th style="width:5%;">汽车品牌</th>
                        <th style="width:5%;">汽车型号</th>
                        <th style="width:5%;">车架号</th>
                        <th style="width:8%;">附加费(元)</th>
                        <th style="width:8%;">净车价(元)</th>
                        <th style="width:8%;">担保机构</th>
                        <th style="width:8%;">汽车经销商</th>
                        <th style="width:8%;">申请金额(元)</th>
                        <th style="width:8%;">期数</th>
                        <th style="width:8%;">申请日期</th>
                        <th style="width:8%;">交易日期</th>
                        <th style="width:8%;">客户所在省份</th>
                        <th style="width:8%;">发票号码</th>
                        <th style="width:8%;">保单号</th>
                        <th style="width:8%;">保险公司</th>
                        <th style="width:8%;">保险公司核对号码</th>
                        <th style="width:8%;">担保服务费(元)</th>
                        <th style="width:8%;">送行日期</th>
                        <th style="width:14%;">银行</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="36">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		 <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel">${item.newOrOld}</td>
                            <td class="cel">${item.tel}</td>
                            <td class="cel">${item.currentAddress}</td>
                            <td class="cel">${item.phone}</td>
                            <td class="cel">${item.companyName}</td>
                            <td class="cel">${item.companyTel}</td>
                            <td class="cel">${item.sharedRealName}</td>
                            <td class="cel">${item.sharedCardNo}</td>
                            <td class="cel">${item.sharedTel}</td>
                            <td class="cel">${item.sponsorNames}</td>
                            <td class="cel">${item.sponsorCardNos}</td>
                            <td class="cel">${item.sponsorTels}</td>
                            <td class="cel">${item.sporelations}</td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel">${item.carDetail}</td>
                            <td class="cel">${item.vinNo}</td>
                            <td class="cel"><sl:format type="number" show="${item.carExtraFee}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.netCarPrice}" pattern="#,##0.00"/></td>
                            <td class="cel">${item.orgName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel"><sl:format type="number" show="${item.contractCarPrice}" pattern="#,##0.00"/></td>
                            <td class="cel">${item.loanMonth}</td>
                            <td class="cel"><fmt:formatDate value="${item.applyTime}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel"><fmt:formatDate value="${item.tradeTime}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel">${item.currentAddressProvince}</td>
                            <td class="cel">${item.billNo}</td>
                            <td class="cel">${item.vciInsuranceNumber}</td>
                            <td class="cel">${item.insuranceCompanyName}</td>
                            <td class="cel">${item.insuranceCompanyCheckNumber}</td>
                            <td class="cel">${item.assureFee}</td>
                            <td class="cel"><fmt:formatDate value="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd"/></td>
                            <td class="cel">${item.bankName}</td>
                          <%--  <td class="cel"><sl:format type="number" show="${item.contracPriceForStages}" pattern="#,##0.00"/></td>--%>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/bankStandingBookReport.js"></script>
</html>
