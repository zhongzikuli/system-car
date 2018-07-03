<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>逾期管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="month" value="${paramMap.yearMonth}">
		<input type="hidden" name="isOver" value="${paramMap.isOver}">
		<input type="hidden" name="bankId" value="${paramMap.bankId}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
		<input type="hidden" name="isTelException" value="${paramMap.isTelException}">
		<input type="hidden" name="closeDebt" value="${paramMap.closeDebt}">
		<input type="hidden" name="isAdvancedIncome" value="${paramMap.isAdvancedIncome}">
		<input type="hidden" name="trailCarStatus" value="${paramMap.trailCarStatus}">
		<input type="hidden" name="isLaw" value="${paramMap.isLaw}">
		<input type="hidden" name="isFirstOverdue" value="${paramMap.isFirstOverdue}">
	</div>
	<form id="pagerForm" action="${ctx}/overdue/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <shiro:hasPermission name="overdue:importExcel">
                    <a class="btn btn-primary btn-sm import-overdue-btn">上传逾期报表</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="overdue:delete">
                    <a class="btn btn-danger btn-sm delete-overdue-btn">删除</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="overdue:refresh">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="overdue:downTemplate">
                    <a class="btn btn-warning btn-sm" target="_blank" href="${ctx}/overdue/downTemplate.action">模板下载</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-7">
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
						<label class="col-xs-2 control-label">电催异常:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-is-tel-exception" name="isTelException">
								<option value="">请选择</option>
								<option value="0" <c:if test="${paramMap.isTelException == 0}"> selected="selected"</c:if> >否</option>
								<option value="1" <c:if test="${paramMap.isTelException == 1}"> selected="selected"</c:if> >是</option>
							</select>
						</div>
						<label class="col-xs-2 control-label">代偿:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-is-advanced-income" name="isAdvancedIncome">
								<option value="">请选择</option>
								<option value="0" <c:if test="${paramMap.isAdvancedIncome == 0}"> selected="selected"</c:if> >否</option>
								<option value="1" <c:if test="${paramMap.isAdvancedIncome == 1}"> selected="selected"</c:if> >是</option>
							</select>
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
								<option value="3" <c:if test="${paramMap.trailCarStatus == 3}"> selected="selected"</c:if> >其他</option>
							</select>
						</div>
						<label class="col-xs-2 control-label">诉讼:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-is-law" name="isLaw">
								<option value="">请选择</option>
								<option value="0" <c:if test="${paramMap.isLaw == 0}"> selected="selected"</c:if> >否</option>
								<option value="1" <c:if test="${paramMap.isLaw == 1}"> selected="selected"</c:if> >是</option>
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
							<input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="keyword" value="${paramMap.keyword}">
						</div>
					</div>
					<div class="row m-rl-tb">
						<label class="col-xs-2 control-label">首期逾期:</label>
						<div class="col-xs-4">
							<select class="form-control" id="search-is-first-overdue" name="isFirstOverdue">
								<option value="">请选择</option>
								<option value="0" <c:if test="${paramMap.isFirstOverdue == 0}"> selected="selected"</c:if> >否</option>
								<option value="1" <c:if test="${paramMap.isFirstOverdue == 1}"> selected="selected"</c:if> >是</option>
							</select>
						</div>
						<div class="col-xs-6">
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
		<div id="overdue-list" class="table-responsive full-height">
			<table class="table table-hover table-height table-striped">
				<thead>
					<tr>
						<th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
						<th style="width:2%;">序号</th>
						<th style="width:3%;">首期逾期</th>
						<th style="width:3%;">电催异常</th>
						<th style="width:3%;">代偿</th>
						<th style="width:3%;">拖车状态</th>
						<th style="width:4%;">诉讼</th>
						<th style="width:4%;">销账</th>
						<th style="width:4%;">客户姓名</th>
						<th style="width:7%;">身份证号</th>
						<th style="width:13%;">银行</th>
						<th style="width:9%;">银行卡号</th>
						<%-- <th style="width:5%;">是否销账</th> --%>
						<th style="width:5%;">银行逾期额(元)</th>
						<th style="width:5%;">累计违约(次)</th>
						<th style="width:5%;">逾期月份</th>
						<th style="width:6%;">更新时间</th>
						<th style="width:3%;">导入状态</th>
						<th style="width:13%;">备注</th>
					</tr>
				</thead>
				<tbody>
					<c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
						<tr>
							<td class="col-td" colspan="18">暂无数据</td>
						</tr>
					</c:if>
					<c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
						<tr>
							<td><input type="checkbox" name="overdueCheckbox" class="checkOne" value="${item.id}"></td>
							<td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
							
							<td class="cel">
								<c:if test="${item.isFirstOverdue == 1}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isFirstOverdue == 0}">
									<code class="alert-success">否</code>
								</c:if>
							</td>
							
							<td class="cel">
								<c:if test="${item.isTelException gt 0}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isTelException == 0}">
									<code class="alert-success">否</code>
								</c:if>
								<c:if test="${empty item.isTelException}">
									--
								</c:if>
							</td>
							
							<td class="cel">
								<c:if test="${item.isAdvancedIncome == 1}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isAdvancedIncome == 0}">
									<code class="alert-success">否</code>
								</c:if>
								<c:if test="${empty item.isAdvancedIncome}">
									--
								</c:if>
							</td>
							
							
							<td class="cel">
								<c:if test="${empty item.trailCarStatusName}">
									--
								</c:if>
								<c:if test="${not empty item.trailCarStatusName}">
									${item.trailCarStatusName}
								</c:if>
							</td>
							
							<td class="cel">
								<c:if test="${item.isLaw == 1}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isLaw == 0}">
									<code class="alert-success">否</code>
								</c:if>
								<c:if test="${empty item.isLaw}">
									--
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
							
							<td class="cel">${item.customerName}</td>
							<td class="cel">${item.cardNo}</td>
							<td class="cel">${item.bankName}</td>
							<td class="cel">${item.bankCardNo}</td>
							<%-- <td class="cel">
								<c:if test="${item.isOver == 0 }">
									<code>未销账</code>
								</c:if>
								<c:if test="${item.isOver == 1 }">
									<code class="alert-success">已销账</code>
								</c:if>
								<c:if test="${item.isOver == 2 }">
									<code class="alert-warning">已垫款</code>
								</c:if>
							</td> --%>
							<td class="cel"><sl:format type="number" show="${item.overdueMoney}" pattern="#,##0.00"/></td>
							<td class="cel">${item.totalNum}</td>
							<td class="cel">${item.overdueYear }年 <c:if test="${item.overdueMonth gt 9 }">${item.overdueMonth}月</c:if><c:if test="${item.overdueMonth le 9 }">0${item.overdueMonth}月</c:if></td>
							<td class="cel">
								<sl:format type="date" show="${item.mtime}" pattern="yyyy-MM-dd HH:mm"/>
							</td>
							<td>
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
							<td class="desc">${item.overdueBak}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
			<%-- 分页表单参数 --%>
			<%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
		</div>
	</div>
</div>
</body>
<script type="text/template" title="上传逾期记录" id="import-overdue-dialog">
	<div class="ibox-content form-horizontal">
		<form id="upload-overdue-form" enctype="multipart/form-data" method="post" action="${ctx}/overdue/upload.action">
			<div class="row m-rl-tb">
				<label class="col-sm-3 control-label"><span class="red">*</span>逾期银行:</label>
				<div class="col-sm-8"  obj="" tip="逾期银行不能为空">
					<select name="bankId" class="form-control chosen-select"  check="validImportForm(this)" id="select-bank-id" data-placeholder="贷款银行...">
						<option value="">请选择</option>
						<c:forEach items="${banks}" var="bank">
							<option value="${bank.id}">${bank.bankName}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div class="row m-rl-tb">
				<label class="col-sm-3 control-label"><span class="red">*</span>逾期月份:</label>
				<div class="col-sm-8"  obj="" tip="逾期月份不能为空">
					<select name="month" class="form-control"  check="validImportForm(this)" id="select-month">
						<option value="">请选择</option>
					</select>
				</div>
			</div>
			<div class="row m-rl-tb">
				<label class="col-sm-3 control-label"><span class="red">*</span>选择附件:</label>
				<div class="col-sm-8">
					<button class="form-control btn btn-success" type="button" ><i class="fa fa-upload"></i>&nbsp;点击选择逾期报表</button>
					<input id="fileUpload" type="file" name="file" check="validImportForm(this)" class="file-upload" style="z-index:999; width: 90%;left: 14px;top: -2px;"/>
					<div class="show-name" id="showFileName"></div>
				</div>
			</div>
			<div class="row m-t-xs m-rl-tb">
				<input type="hidden" id="fileName" />
			</div>
			<div class="dialog-manage" id="CreateBtn">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</form>
	</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/assetProtection/overdueList.js"></script>
</html>

