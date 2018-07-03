<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>公司垫款明细</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${loanBankId}"/>
        <input type="hidden" name="departmentId" value="${departmentName}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
        <input type="hidden" name="status" value="${status}"/>
    </div>
    <form id="pagerForm" action="${ctx}/unAdvanceMoney/unAdvanceMoneyList.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
                <div class="col-sm-11  text-left">
                    <div class="form-inline">
                    <button type="button" data-toggle="modal" class="btn btn-success btn-sm panyment-excel">导出</button>
                        <c:if test="${ not empty entity}">
                            <div class="form-group">
                                <label class="alert-warning">贷款金额合计(万元): </label>
                                <code class="alert-info"><sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                                <!-- <input class="form-control" readOnly  value="${entity.actualLoadMoney}"/> -->
                            </div>
                            <div class="form-group">
                                <label class="alert-warning">合同价合计(万元): </label>
                                <code class="alert-info"><sl:format type="number" show="${entity.contractPrice/10000}" pattern="#,##0.00"/></code>
                                <!--<input class="form-control" readOnly  value="${entity.contractPrice}"/> -->
                            </div>
                        </c:if>
                    </div>
                    </div>
                <div class="col-sm-1 text-right">
                    <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                    <div class="btn-box animated fadeInRight">
                        <div class="row">
                            <div class="col-sm-7">
                                <div class="form-group" id="date-time">
                                    <label class="col-xs-3 control-label">终审通过日期:</label>
                                    <div class="col-xs-8">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="startDate" id="search-start-date" value="${startDate}" />
                                            <span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${endDate}" />
                                        </div>
                                    </div>
                                </div>

                        <div class="form-group">
                            <label class="col-xs-3 control-label ">订单状态:</label>
                            <div class="col-xs-8">
                            <select name="status" id="search-user" class="form-control chosen-select status" >
                                <option value="">请选择</option>
                                    <option value="12"<c:if test="${status == 12}">selected</c:if>>终审通过</option>
                                    <option value="13"<c:if test="${status == 13}">selected</c:if>>财务费用确认</option>
                                    <option value="14"<c:if test="${status == 14}">selected</c:if>>垫款申请退回</option>
                                    <option value="16"<c:if test="${status == 16}">selected</c:if>>垫款申请递交</option>
                                    <option value="18"<c:if test="${status == 18}">selected</c:if>>垫款申请审核通过</option>
                            </select>
                            </div>
                        </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">快捷搜索:</label>
                                    <div class="col-xs-8">

                                            <input type="text" class="form-control" name="keyWord" id="keyWord" value="${keyWord}" placeholder="请输入客户姓名或身份证号或订单编号"
                                                   onkeyup="value=value.replace(/\s/g,'')"
                                            />

                                    </div>
                                </div>
                        </div>
                            <div class="col-sm-5">
	                    <div class="form-group">
	                        <label class="col-xs-3 control-label ">部门:</label>
                            <div class="col-xs-8">
                                    <select class="form-control chosen-select status" id="search-deparment-name" name="departmentId">
                                     <option value="">请选择</option>
                                    <c:forEach items="${departments}" var="department">
                                     <option value="${department.name}"
                                    <c:if test="${department.name eq departmentName}">selected</c:if>
                                        >${department.name}</option>
                                        </c:forEach>
                                        </select>
                            </div>
	                    </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label ">贷款银行:</label>
                                    <div class="col-xs-8">
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
                    <th style="width:2%;">订单编号</th>
                    <th style="width:2%;">客户姓名</th>
                    <th style="width:2%;">身份证号</th>
                    <th style="width:2%;">终审通过日期</th>
                    <th style="width:2%;">部门名称</th>
                    <th style="width:2%;">贷款本金(元)</th>
                    <th style="width:2%;">合同价(元)</th>
                    <th style="width:2%;">订单状态</th>
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
                    <td class="cel">${item.orderNo}</td>
                    <td class="cel">${item.userName}</td>
                    <td class="cel">${item.cardNo}</td>
                    <td class="cel"> <sl:format type="date" show="${item.finalAuditTime}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel"> <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                    <td class="cel"> <sl:OrderStatus showValue="${item.orderStatus}"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newStatementStructure/unAdvanceMoney.js"></script>
</html>
