<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>到账确认</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="bankId" value="${paramMap.bankId}">
        <input type="hidden" name="depId" value="${paramMap.departmentId}"/>
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="secondLendingStatus" value="${paramMap.secondLendingStatus}"/>
        <input type="hidden" name="orderNumber" value="${paramMap.orderNumber}"/>
    </div>
    <div id="arrivalTime">
    <form id="pagerForm" action="${ctx}/newFinancial/secondLending.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
			<div class="row">
				<div class="col-sm-10 text-left padding-l-6">
	            <div class="form-inline">
	                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
					<div class="form-group">
						<label class="control-label label">总数:</label>
						<input id="number" type="text" class="form-control" name="number">
					</div>
					<div class="form-group">
						<label class="control-label label">应打款合计(元):</label>
						<input id="receivables" type="text" class="form-control" name="receivables">
					</div>
					<a data-toggle="modal" id="statistics" class="btn btn-primary btn-sm ">统计</a>
					<div class="form-group">
                        <label class="control-label label">二次打款日期:</label>
                            <input type="text" class="form-control" name="getDate" id="get-date" check="validDate(this)" tip="二次打款日期不能为空" >
                    </div>
                    	<c:if test="${paramMap.secondLendingStatus ==28}">
			                  <shiro:hasPermission name="secondLending:twoPaymentConfirmation">
		                       <a data-toggle="modal" id="payconfirm" class="btn btn-primary btn-sm ">二次打款</a>
			               	 </shiro:hasPermission>
		               	 </c:if>
		               	 <c:if test="${paramMap.secondLendingStatus ==38}">
			                  <shiro:hasPermission name="secondLending:secondLendingComeBack">
		                       <a data-toggle="modal" id="paymentComeback" class="btn btn-danger btn-sm ">撤销二次打款</a>
			               	 </shiro:hasPermission>
	               	   </c:if>
				</div>
            </div>

				<div class="col-sm-2 text-right padding-r-6">
					<a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
					<div class="btn-box animated fadeInRight">
						<div class="row">
							<div class="col-sm-7">
								<div class="form-group">
									<label class="col-xs-3 control-label">二次打款日期:</label>
									<div class="col-xs-8">
										<div class="input-group">
											<input type="text" class="form-control" name="startDate"
												id="search-start-date" value="${paramMap.startDate}" /> <span
												class="input-group-addon">到</span> <input type="text"
												class="form-control" name="endDate" id="search-end-date"
												value="${paramMap.endDate}" />
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-3 control-label">贷款银行:</label>
									<div class="col-xs-8">
										<select class="form-control" id="search-bank" name="bankId">
											<option value="">请选择</option>
											<c:forEach var="bankentity" items="${bankentity}"
												varStatus="dp">
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

								<div class="form-group">
									<label class="col-xs-3 control-label">快捷搜索:</label>
									<div class="col-xs-8">
										<input id="keyword" type="text" class="form-control"
											placeholder="请输入客户姓名或身份证号或订单编号" name="keyword"
											value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
									</div>
								</div>
							</div>

							<div class="col-sm-5">
								<div class="form-group">
									<label class="col-xs-3 control-label">部门:</label>
									<div class="col-xs-8">
										<select class="form-control" id="search-deparment-name"
											name="depId">
											<option value="">请选择</option>
											<c:forEach var="department" items="${departments}"
												varStatus="dp">
												<c:choose>
													<c:when test="${null == paramMap.departmentId}">
														<option value="${department.id}">${department.name}</option>
													</c:when>
													<c:when test="${paramMap.departmentId == department.id}">
														<option selected="selected" value="${department.id}">${department.name}</option>
													</c:when>
													<c:otherwise>
														<option value="${department.id}">${department.name}</option>
													</c:otherwise>
												</c:choose>
											</c:forEach>
										</select>
									</div>
								</div>
								<div class="form-group">
								  <label class="col-xs-3 control-label">状态:</label>
								   <div class="col-xs-8">
									 <select class="form-control" id="search-style" name="secondLendingStatus">
										<option value="-1" <c:if test="${paramMap.secondLendingStatus == -1}">selected</c:if>>全部</option>
			                            <option value="28" <c:if test="${paramMap.secondLendingStatus == 28}">selected</c:if>>未确认</option>
			                            <option value="38" <c:if test="${paramMap.secondLendingStatus == 38}">selected</c:if>>已确认</option>
									</select>
								 </div>
								</div>
								<div class="form-group group-btn">
									<button type="button"class="btn btn-primary  btn-sm search-btn"
										onclick="searchSubmit()">搜索</button>
									 <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
								</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
</div>
</div>
<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                    	<th style="width: 4%;"><input type="checkbox"class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:12%;">订单编号</th>
                        <th style="width:8%;">客户名称</th>
                        <th style="width:5%;">信贷专员</th>
                        <th style="width:10%;">部门</th>
                        <th style="width:13%;">贷款银行</th>
                        <th style="width:13%;">经销商</th>
                        <th style="width:8%;">贷款金额(元)</th>
                        <th style="width:8%;">二次打款金额(元)</th>
                        <th style="width:8%;">高息(元)</th>
                        <th style="width:8%;">费用明细合计(元)</th>
                        <th style="width:7%;">订单状态</th>
                        <th style="width:7%;">二次打款申请时间</th>
                        <th style="width:7%;">二次打款日期日期</th>
                        <th style="width:8%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="15">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       	 	<td><input type="checkbox" class="checkOne" data-actualLoadMoney="${item.actualLoadMoney}" data-secondLendingMoney="${item.secondLendingMoneySum}" name="payment_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel">
                                <fmt:formatNumber value="${item.actualLoadMoney}" pattern="#,#00.0#"/>
                            </td>
                            <td class="cel">
                                <fmt:formatNumber value="${item.secondLendingMoney}" pattern="#,#00.0#"/>
                            </td>
                            <td class="cel">
                                <fmt:formatNumber value="${item.highInterest}" pattern="#,#00.0#"/>
                            </td>
                            <td class="cel">
                                <fmt:formatNumber value="${item.expensesSum}" pattern="#,#00.0#"/>
                            </td>
                            <td class="cel">${item.orderStatusName}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.secondLendingApplyTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.secondLendingMoneyDate}" pattern="yyyy-MM-dd"/>
                            </td>
                             <td class="btn-cel">
								<shiro:hasPermission name="order:view">
									<a data-id="${item.id}" data-title="${item.realName}" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}&active=financialPay"
									   class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
								</shiro:hasPermission>

                            </td>
                        </tr>
                    </c:forEach>
                </table>
    <%-- 分页表单参数 --%>
    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newFinance/secondLending.js"></script>
</html>
