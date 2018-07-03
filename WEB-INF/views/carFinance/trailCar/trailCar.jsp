<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="month" value="${paramMap.yearMonth}">
		<input type="hidden" name="isOver" value="${paramMap.isOver}">
		<input type="hidden" name="bankId" value="${paramMap.bankId}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
		<input type="hidden" name="isTelException" value="${paramMap.isTelException}">
		<input type="hidden" name="trailCarStatus" value="${paramMap.trailCarStatus}">
		<input type="hidden" name="isAdvancedIncome" value="${paramMap.isAdvancedIncome}">
		<input type="hidden" name="isFirstOverdue" value="${paramMap.isFirstOverdue}">
		<input type="hidden" name="isLaw" value="${paramMap.isLaw}">
	</div>

    <form id="pagerForm" action="${ctx}/cfTrail/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-3">
            	<a data-toggle="modal" class="btn btn-primary btn-sm trailCarList">拖车管理</a>
            	 <shiro:hasPermission name="cfTrail:update">
				<a data-toggle="modal" class="btn btn-primary btn-sm trailCarSet">拖车设置</a>
				</shiro:hasPermission>
				<a data-toggle="modal"  class="btn btn-primary btn-sm detailForTrailCar"><i class="fa fa-search-plus"></i>查看</a>
            </div>
            <div class="col-sm-9">
             	<div class="form-inline">
	            	<div class="form-group">
	                	<label class="control-label label">拖车状态:</label>
		                <select class="form-control status" name="status" id="search-select">
		                    <option value="">全部</option>
		                    <option value="1"
		                            <c:if test="${'1' eq status}">selected</c:if>
		                    >已拖车
		                    </option>
		                    <option value="2"
		                            <c:if test="${'2' eq status}">selected</c:if>
		                    >已结清
		                    </option>
		                    <option value="3"
		                            <c:if test="${'3' eq status}">selected</c:if>
		                    >其他
		                    </option>
		                    <option value="4"
		                            <c:if test="${'4' eq status}">selected</c:if>
		                    >提交报备
		                    </option>
		                    <option value="5"
		                            <c:if test="${'5' eq status}">selected</c:if>
		                    >移交拖车
		                    </option>
		                    <option value="6"
		                            <c:if test="${'6' eq status}">selected</c:if>
		                    >关注还款
		                    </option>
		                </select>
		            </div>
		            <div class="form-group">
		                <label class="control-label label">搜索:</label>
		                <input type="text" class="form-control" name="keywords" id="search-keyword"
		                       placeholder="请输入客户姓名或身份证号" onkeyup="value=value.replace(/\s/g,'')" value="${keywords}" style="width:200px;">
		                <button type="button" class="btn  btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索</button>
		                <a type="button" class="btn btn-info  btn-sm resets-btn">重置</a>
		                <a class="btn btn-primary btn-sm btn-search">高级查询&nbsp;<i class="fa fa-caret-up"></i></a>
		            </div>
		        </div>
		        <div class="btn-box animated fadeInRight">
							<div class="row">
								<div class="col-sm-7">
									<div class="form-group">
										<label class="col-xs-3 control-label">逾期银行:</label>
										<div class="col-xs-8">
											<select name="bankId" class="form-control" id="bank-id">
												<option value="">请选择</option>
												<c:forEach items="${banks}" var="bank">
													<option <c:if test="${paramMap.bankId == bank.id}"> selected="selected"</c:if> value="${bank.id}">${bank.bankName}</option>
												</c:forEach>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">逾期月份:</label>
										<div class="col-xs-8">
											<input type="hidden" id="year-month-hidden" value="${paramMap.yearMonth}">
											<select name="month" class="form-control" id="search-month">
												<option value="">请选择</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">电催异常:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-tel-exception" name="isTelException">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isTelException == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isTelException == 1}"> selected="selected"</c:if> >是</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">首期逾期:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-frist-overdue" name="isFirstOverdue">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isFirstOverdue == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isFirstOverdue == 1}"> selected="selected"</c:if> >是</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-sm-5">
									<div class="form-group">
										<label class="col-xs-3 control-label">拖车状态:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-trail-car-status" name="trailCarStatus">
												<option value="">请选择</option>
												<option value="1" <c:if test="${paramMap.trailCarStatus == 1}">selected</c:if>>已拖车</option>
					                            <option value="2" <c:if test="${paramMap.trailCarStatus == 2}">selected</c:if>>已结清</option>
					                            <option value="3" <c:if test="${paramMap.trailCarStatus == 3}">selected</c:if>>其他</option>
					                            <option value="4" <c:if test="${paramMap.trailCarStatus == 4}">selected</c:if>>提交报备</option>
					                            <option value="5" <c:if test="${paramMap.trailCarStatus == 5}">selected</c:if>>移交拖车</option>
					                            <option value="6" <c:if test="${paramMap.trailCarStatus == 6}">selected</c:if>>关注还款</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">诉讼:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-law" name="isLaw">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isLaw == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isLaw == 1}"> selected="selected"</c:if> >是</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-xs-3 control-label">是否销账:</label>
										<div class="col-xs-8">
											<select class="form-control" id="search-is-over" name="isOver">
												<option value="">请选择</option>
												<option value="0" <c:if test="${paramMap.isOver == 0}"> selected="selected"</c:if> >否</option>
												<option value="1" <c:if test="${paramMap.isOver == 1}"> selected="selected"</c:if> >是</option>
											</select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-3 control-label">快捷搜索:</label>
									<div class="col-xs-8">
										<input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="keyword" value="${paramMap.keyword}">
									</div>
								</div>
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
                    	<th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:3%;">首期逾期</th>
						<th style="width:3%;">电催异常</th>
						<th style="width:3%;">代偿</th>
                        <th style="width:3%;">拖车状态</th>
						<th style="width:3%;">诉讼</th>
						<th style="width:3%;">销账</th>
                        <th style="width:5%;">订单编号</th>
                        <th style="width:5%;">客户名称</th>
                        <th style="width:8%;">身份证号</th>
                        <th style="width:5%;">车型</th>
                        <th style="width:5%;">车架号</th>
                        <th style="width:5%;">车牌号</th>
                        <th style="width:5%;">催缴时间</th>
                        <th style="width:5%;">逾期金额</th>
                        <th style="width:5%;">累计逾期次数</th>
                        <th style="width:5%;">月还款额</th>
                        <th style="width:5%;">贷款额</th>
                        <th style="width:5%;">拖车备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="23">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                        	<td><input type="checkbox"  name="trailCarInput"class="checkOne" data-businessOrderAcceptId="${item.businessOrderAcceptId}"  data-id="${item.id}" data-title="${item.userName}"  data-href-list="${ctx}/cfTrail/queryTrailCarList.action?businessOrderAcceptId=${item.businessOrderAcceptId}"  data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}&active=buyerInfo" name="law_input" value="${item.businessOrderAcceptId}"></td>
                            <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
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
								<c:if test="${item.isAdvancedIncome > 0}">
									<code>是</code>
								</c:if>
								<c:if test="${item.isAdvancedIncome == 0}">
									<code class="alert-success">否</code>
								</c:if>
								<c:if test="${empty item.isAdvancedIncome}">
									--
								</c:if>
							</td>
							
							 <td >
                                <c:if test="${'1' eq item.trailCarStatus}"><code class="alert-default">已拖车</code></c:if>
                                <c:if test="${'2' eq item.trailCarStatus}"><code class="alert-success">已结清</code></c:if>
                                <c:if test="${'3' eq item.trailCarStatus}"><code class="alert-warning">其他</code></c:if>
                                <c:if test="${'4' eq item.trailCarStatus}"><code class="alert-warning">提交报备</code></c:if>
                                <c:if test="${'5' eq item.trailCarStatus}"><code class="alert-warning">移交拖车</code></c:if>
                                <c:if test="${'6' eq item.trailCarStatus}"><code class="alert-warning">关注还款</code></c:if>
                            </td>
							
							<td class="cel">
								<c:if test="${item.isLaw== 1}">
									<code >是</code>
								</c:if>
								<c:if test="${item.isLaw== 0}">
									<code class="alert-success">否</code>
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
							
                            <td >${item.orderNO}</td>
                            <td >${item.userName}</td>
                            <td >${item.cardNo}</td>
                            <td >${item.brandName}</td>
                            <td >${item.vinNO}</td>
                            <td >${item.plateNumber}</td>
                            <td >
                                <fmt:formatDate value="${item.urgeDate}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td ><sl:format type="number" show="${item.overdueMoney}" pattern="#,##0.00"/></td>
                            <td >${item.totalNum}</td>
                            <td ><sl:format type="number" show="${item.repayAmountMonth}" pattern="#,##0.00"/></td>
                            <td ><sl:format type="number" show="${item.loanMoney}" pattern="#,##0.00"/></td>
                           
                            <td title="${item.remark}" style="max-width:100px">${item.remark}</td>  
                             <%-- <td >
                                 <button type="button"  href="#" class="btn btn-primary btn-xs add-btn" data-id="${item.id}" data-orderId="${item.businessOrderAcceptId}" >开拖车单</button>
                                <c:if test="${item.businessOrderAcceptId !=null}">
                                 <a href="#" onclick="editInfo('${item.id}','${item.userName}')" class="btn btn-success btn-xs">
                                	<i class="fa fa-edit"></i>开拖车单设置</a>
                                </c:if>
                            </td> --%>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
		    <!-- 分页条 -->
		    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
            </div>
      </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/trailCar/trailCar.js"></script>

<script type="text/template" title="拖车设置" id="trail-dialog">
    <div class="ibox-content">
        <form id="trailForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">客户姓名:</label>
                <div class="col-xs-8">
                    <input type="text" id="userName" class="form-control" readonly="readonly" >
                </div>
            </div>
            <div class="form-group type">
                <label class="col-xs-3 control-label"><span class="red">*</span>拖车状态:</label>
                <div class="col-xs-8">
                	<div obj="" class="" is_tip_null="yes">
                    	<select class="form-control" id="trailCarStatus" name="status" check="bankForm(this)">
                        	<option value="">请选择拖车类型</option>
                        	<option value="1" >已拖车</option>
                        	<option value="2" >已结清</option>
                        	<option value="6" >关注还款</option>
                        	<option value="4" >提交报备</option>
                        	<option value="5" >移交拖车</option>
                        	<option value="3" >其他</option>
                    	</select>
                	</div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                <div class="col-xs-8">
                    <textarea  class="form-control" id="remark" check="bankForm(this)">

                    </textarea>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
