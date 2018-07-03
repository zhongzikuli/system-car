<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>送行邮件</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${loanBankId}"/>
        <input type="hidden" name="departmentId" value="${departmentName}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
        <input type="hidden" name="keyword" value="${keyword}"/>
    </div>
    <form id="pagerForm" action="${ctx}/creditCardEmail/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
                <div class="col-sm-11  text-left">
                    <button type="button" data-toggle="modal" class="btn btn-success btn-sm panyment-excel">导出</button>
                </div>
                <div class="col-sm-1 text-right">
	                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                        <div class="col-sm-7">
		                        <div class="form-group" id="date-time">
	                                <label class="col-xs-4 control-label">进件系统审批日期:</label>
	                                <div class="col-xs-7">
	                                    <div class="input-group  ">
	                                        <input type="text" class="form-control" name="startDate" id="search-start-date" value="${startDate}" />
			                            <span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${endDate}" />
	                                    </div>
	                                </div>
	                            </div>
			                    <div class="form-group">
			                        <label class="col-xs-4  control-label">贷款银行:</label>
			                        <div class="col-xs-7">
				                        <select name="bankId" id="search-bank" class="form-control chosen-select status" >
				                            <option value="">请选择</option>
				                            <c:forEach items="${banks}" var="bank">
				                                <option value="${bank.id}"
				                                        <c:if test="${bank.id eq loanBankId}">selected</c:if>
				                                >${bank.bankName}</option>
				                            </c:forEach>
				                        </select>
				                     </div>
			                    </div>
	                        </div>
	                        <div class="col-sm-5">
	                            <div class="form-group">
			                        <label class="col-xs-3 control-label">部门:</label>
			                        <div class="col-xs-8">
				                        <select class="form-control chosen-select status" id="search-deparment-name" name="departmentId">
				                            <option value="">请选择</option>
				                            <c:forEach items="${departments}" var="department">
				                                <option value="${department.id}"
				                                        <c:if test="${department.name eq departmentId}">selected</c:if>
				                                >${department.name}</option>
				                            </c:forEach>
				                        </select>
				                    </div>
			                    </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">搜索:</label>
                                    <div class="col-xs-8">
                                        <input type="text" class="form-control" name="keyword" id="search-keyword"
                                               placeholder="请输入客户姓名、身份证号和订单编号" onkeyup="value=value.replace(/\s/g,'')"  value="${keyword}">
                                    </div>
                                </div>
	                            <div class="form-group group-btn">
	                                <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:5%;">进件系统审批日期</th>
                    <th style="width:5%;">部门</th>
                    <th style="width:5%;">贷款银行</th>
                    <th style="width:5%;">客户姓名</th>
                    <th style="width:5%;">身份证号码</th>
                    <th style="width:5%;">信用卡申请书编号</th>
                    <th style="width:5%;">所属担保公司</th>
                    <th style="width:5%;">手机号码</th>
                    <th style="width:5%;">车价</th>
                    <th style="width:5%;">分期额</th>
                    <th style="width:5%;">期数</th>
                    <th style="width:5%;">对接人</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                <tr>
                    <td class="col-td" colspan="30">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                    <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.id}"></td>
                    <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                    <td class="cel"><sl:format type="date" show="${item.preCardSendToBankDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel">${item.buyerName}</td>
                    <td class="cel">${item.cardNo}</td>
                    <td class="cel">${item.creditCardApplyNo}</td>
                    <td class="cel">${item.orgName}</td>
                    <td class="cel">${item.tel}</td>
                    <td class="cel"> <sl:format type="number" show="${item.auditCarPrice}" pattern="#,##0.00"/></td>
                    <td class="cel"> <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.moneyMonth}</td>
                    <td class="cel">${item.cardPersonName}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newStatementStructure/creditCardEmail.js"></script>
</html>
