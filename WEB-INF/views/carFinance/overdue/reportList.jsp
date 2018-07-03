<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>逾期客户明细报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="keyword" value="${paramMap.keyword}">
        <input type="hidden" name="bankId" value="${paramMap.bankId}">
        <input type="hidden" name="isOver" value="${paramMap.isOver}">
        <input type="hidden" name="month" value="${paramMap.yearMonth}">
        <input type="hidden" name="trailCarStatus" value="${paramMap.trailCarStatus}">
        <input type="hidden" name="isvalid" value="${paramMap.isvalid}">
        <input type="hidden" name="startTime" value="${paramMap.startTime}">
        <input type="hidden" name="endTime" value="${paramMap.endTime}">
    </div>
    <form id="pagerForm" action="${ctx}/overdueReport/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-1">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                <shiro:hasPermission name="OverdueReport:exportExcel">
                    <a data-toggle="modal" class="btn btn-info btn-sm export-excel">导出</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-11">
            	<a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
				<div class="btn-box form-horizontal animated fadeInRight">
					<div class="row m-rl-tb">
						<label class="col-xs-2 control-label">逾期银行:</label>
						<div class="col-xs-4">
							<select name="bankId" class="form-control" id="bank-id">
								<option value="">请选择</option>
								<c:forEach items="${banks}" var="bank">
									<option <c:if test="${paramMap.bankId == bank.id}"> selected="selected"</c:if> value="${bank.id}">${bank.bankName}</option>
								</c:forEach>
							</select>
						</div>
						<label class="col-xs-2 control-label">逾期月份:</label>
						<div class="col-xs-4">
							<input type="hidden" id="year-month-hidden" value="${paramMap.yearMonth}">
							<select name="month" class="form-control" id="search-month">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					
					<div class="row m-rl-tb">
						<label class="col-xs-2 control-label">是否销账:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-is-over" name="isOver">
								<option value="">请选择</option>
								<option value="0" <c:if test="${paramMap.isOver == 0}"> selected="selected"</c:if> >否</option>
								<option value="1" <c:if test="${paramMap.isOver == 1}"> selected="selected"</c:if> >是</option>
							</select>
						</div>
						<label class="col-xs-2 control-label">快捷搜索:</label>
						<div class="col-xs-4">
							<input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名、身份证号、订单编号" name="keyword" value="${paramMap.keyword}">
						</div>
					</div>
					<div class="row m-rl-tb">
						<label class="col-xs-2 control-label">拖车状态:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-trail-car-status" name="trailCarStatus">
								<option value="">请选择</option>
								<option value="1" <c:if test="${paramMap.trailCarStatus == 1}"> selected="selected"</c:if> >已拖车</option>
								<option value="2" <c:if test="${paramMap.trailCarStatus == 2}"> selected="selected"</c:if> >已结清</option>
								<option value="4" <c:if test="${paramMap.trailCarStatus == 4}"> selected="selected"</c:if> >提交报备</option>
								<option value="5" <c:if test="${paramMap.trailCarStatus == 5}"> selected="selected"</c:if> >移交拖车</option>
								<option value="6" <c:if test="${paramMap.trailCarStatus == 6}"> selected="selected"</c:if> >关注还款</option>
								<option value="3" <c:if test="${paramMap.trailCarStatus == 3}"> selected="selected"</c:if> >其它</option>
							</select>
						</div>
						
						
						<label class="col-xs-2 control-label">导入状态:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-is-valid" name="isvalid">
								<option value="">请选择</option>
								<option value="1" <c:if test="${paramMap.isvalid == 1}"> selected="selected"</c:if> >有效</option>
								<option value="0" <c:if test="${paramMap.isvalid == 0}"> selected="selected"</c:if> >非有效</option>
							</select>
						</div>
					</div>
					<div class="row m-rl-tb">
						<label class="col-xs-2 control-label" >更新时间:</label>
						<div class="col-xs-10">
						<div class="input-group">
							<input type="text" class="form-control" name="startTime" id="startTime" value="${paramMap.startTime}">
							<span class="input-group-addon">到</span>
							<input type="text" class="form-control" name="endTime" id="endTime" value="${paramMap.endTime}">
							</div>
						</div>
					</div>
					
					<div class="row m-rl-tb">
						<div class="col-xs-12 text-right">
							<div class="form-group group-btn">
								<button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
								<button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
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
                	<th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                    <th style="width:8%;">订单编号</th>
                    <th style="width:8%;">客户姓名</th>
                    <th style="width:8%;">身份证号</th>
                    <th style="width:8%;">手机号码</th>
                    <th style="width:8%;">婚姻状况</th>
                    <th style="width:8%;">经销商</th>
                    <th style="width:8%;">车辆类型</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:8%;">业务员</th>
                    <th style="width:8%;">审核员</th>
                    <th style="width:8%;">车价(元)</th>
                    <th style="width:8%;">车型</th>
                    <th style="width:8%;">贷款额(元)</th>
                    <th style="width:8%;">期限</th>
                    <th style="width:8%;">放贷日期</th>
                    <th style="width:8%;">逾期月份</th>
                    <th style="width:8%;">逾期金额(元)</th>
                    <th style="width:8%;">月还款(元)</th>
                    <th style="width:8%;">GPS台数</th>
                    <th style="width:8%;">车架号</th>
                    <th style="width:8%;">车辆颜色</th>
                    <th style="width:8%;">车牌号</th>
                    <th style="width:8%;">银行</th>
                    <th style="width:8%;">合同价(元)</th>
                    <th style="width:8%;">垫款日期</th>
                    <th style="width:8%;">产品类型</th>
                    <th style="width:8%;">导入状态</th>
                    <th style="width:8%;">是否销账</th>
                    <th style="width:8%;">拖车状态</th>
                    <th style="width:8%;">更新时间</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
	                <tr>
	                    <td class="col-td" colspan="31">暂无数据</td>
	                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                	<td><input type="checkbox" name="checkbox" class="checkOne" value="${item.id}"></td>
                    <td class="cel">${item.orderNo}</td>
                    <td class="cel">${item.customerName}</td>
                    <td class="cel">${item.cardNo}</td>
                    <td class="cel">${item.tel}</td>
                    <td class="cel"><c:if test="${not empty item.marriedCode}">${item.marriedCode}</c:if><c:if test="${empty item.marriedCode}">--</c:if></td>
                    <td class="cel">${item.dealerName}</td>
                    <td class="cel">${item.newOrOldStr}</td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel">${item.salerName}</td>
                    <td class="cel">${item.auditorName}</td>
                    <td class="cel"><sl:format type="number" show="${item.auditCarPrice}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.brandName}</td>
                    <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.loanPeriodMonthCode}</td>
                    <td class="cel"><sl:format type="date" show="${item.bankPaymentDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel">${item.overdueYear }年 <c:if test="${item.overdueMonth gt 9 }">${item.overdueMonth}月</c:if><c:if test="${item.overdueMonth le 9 }">0${item.overdueMonth}月</c:if></td>
                    <td class="cel"><sl:format type="number" show="${item.overdueMoney}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.repayMonth}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.gpsInstallNumber}</td>
                    <td class="cel">${item.vinNo}</td>
                    <td class="cel"><c:if test="${not empty item.carColor}">${item.carColor}</c:if><c:if test="${empty item.carColor}">--</c:if></td>
                    <td class="cel"><c:if test="${not empty item.plateNumber}">${item.plateNumber}</c:if><c:if test="${empty item.plateNumber}">--</c:if></td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel"><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="date" show="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel">${item.productName}</td>
                    
                    <td class="cel">
                    	<c:if test="${item.isvalid == 0 }">
							<code>${item.remark}</code>
						</c:if>
						<c:if test="${item.isvalid == 1 }">
							<code class="alert-success">有效</code>
						</c:if>
						<c:if test="${item.isvalid == 2 }">
							<code class="alert-warning">无用户</code>
						</c:if>
						<c:if test="${item.isvalid == 3 }">
							<code class="alert-info">贷记卡号为空</code>
						</c:if>
						<c:if test="${item.isvalid == 4 }">
							<code class="alert-info">贷记卡号不一致</code>
						</c:if>
						<c:if test="${item.isvalid == 5 }">
							<code class="alert-info">贷款银行不一致</code>
						</c:if>
						<c:if test="${item.isvalid == 6 }">
							<code class="alert-info">日期不一致</code>
						</c:if>
						<c:if test="${item.isvalid == 7 }">
							<code class="alert-info">无首期还款日</code>
						</c:if>
                    </td>
                    <td class="cel">
                    	<c:if test="${item.isOver == 0 }">
							<code>未销账</code>
						</c:if>
						<c:if test="${item.isOver == 1 }">
							<code class="alert-success">已销账</code>
						</c:if>
						<c:if test="${item.isOver == 2 }">
							<code class="alert-warning">已垫款</code>
						</c:if>
						<c:if test="${empty item.isOver}">
							--
						</c:if>
                    </td>
                    <td class="cel">
                    	<c:if test="${not empty item.trailCarStatusName}">
                    		${item.trailCarStatusName}
                    	</c:if>
                    	<c:if test="${empty item.trailCarStatusName}">
                    		--
                    	</c:if>
                    </td>
                    
                    <td class="cel"><sl:format type="date" show="${item.mtime}" pattern="yyyy-MM-dd HH:mm"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/overdue/reportList.js"></script>
</html>
