<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>征信时效</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${loanBankId}"/>
        <input type="hidden" name="departmentId" value="${departmentName}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
        <input type="hidden" name="creditStartDate" value="${creditStartDate}"/>
        <input type="hidden" name="creditEndDate" value="${creditEndDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/creditLimitation/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm credit-excel">导出</button>
                <button type="button" data-toggle="modal" class="btn btn-info btn-sm credit-all-excel">导出全部</button>
            </div>
            <div class="col-sm-10">
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group" id="date-time">
                                <label class="col-xs-3 control-label">征信查询日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group  ">
                                        <input type="text" class="form-control" name="creditStartDate" id="credit-start-date" value="${creditStartDate}" />
                                        <span class="input-group-addon">到</span> <input type="text" class="form-control" name="creditEndDate" id="credit-end-date" value="${creditEndDate}" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-xs-3 control-label">征信提交日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group ">
                                        <input type="text" class="form-control" name="startDate" id="search-start-date" value="${startDate}" />
                                        <span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${endDate}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行:</label>
                                <div class="col-xs-8">
                                    <select name="bankId" id="search-bank"  class="form-control">
                                        <option value="">请选择</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <option value="${bank.id}"
                                                    <c:if test="${bank.id eq loanBankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-deparment-name" name="departmentId">
                                        <option value="">请选择</option>
                                        <c:forEach items="${departments}" var="department">
                                            <option value="${department.name}"
                                                    <c:if test="${department.name eq departmentName}">selected</c:if>
                                            >${department.name}</option>
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
                    <th style="width:5%;">订单号</th>
                    <th style="width:5%;">业务员</th>
                    <th style="width:5%;">客户姓名</th>
                    <th style="width:5%;">身份证号</th>
                    <th style="width:5%;">客户征信备注</th>
                    <th style="width:5%;">配偶姓名</th>
                    <th style="width:5%;">配偶身份证</th>
                    <th style="width:5%;">配偶征信备注</th>
                    <th style="width:5%;">担保人一姓名</th>
                    <th style="width:5%;">担保人一身份证</th>
                    <th style="width:5%;">担保人一征信备注</th>
                    <th style="width:5%;">担保人二姓名</th>
                    <th style="width:5%;">担保人二身份证</th>
                    <th style="width:5%;">担保人二征信备注</th>
                    <th style="width:5%;">担保人三姓名</th>
                    <th style="width:5%;">担保人三身份证</th>
                    <th style="width:5%;">担保人三征信备注</th>
                    <th style="width:5%;">担保人四姓名</th>
                    <th style="width:5%;">担保人四身份证</th>
                    <th style="width:5%;">担保人四征信备注</th>
                    <th style="width:5%;">征信提交时间</th>
                    <th style="width:5%;">征信查询时间</th>
                    <th style="width:5%;">部门</th>
                    <th style="width:5%;">贷款银行</th>
                    <th style="width:5%;">订单状态</th>
                    <th style="width:5%;">征信查询人</th>
                    <th style="width:5%;">操作</th>
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
                    <td class="cel">${item.creditPerson}</td>
                    <td class="cel">${item.buyerRealName}</td>
                    <td class="cel">${item.buyerCardNo}</td>
                    <td class="cel max-200" title="${item.buyerCreditRecord}">${item.buyerCreditRecord}</td>
                    <td class="cel">${item.sharedRealName}</td>
                    <td class="cel">${item.sharedCardNo}</td>
                    <td class="cel max-200" title="${item.shardCreditRecord}">${item.shardCreditRecord}</td>
                    <td class="cel">${item.sponsor1RealName} </td>
                    <td class="cel">${item.sponsor1CardNo} </td>
                    <td class="cel max-200" title="${item.sponsor1CreditRecord}">${item.sponsor1CreditRecord} </td>
                    <td class="cel">${item.sponsor2RealName} </td>
                    <td class="cel">${item.sponsor2CardNo} </td>
                    <td class="cel max-200" title="${item.sponsor2CreditRecord}">${item.sponsor2CreditRecord} </td>
                    <td class="cel">${item.sponsor3RealName} </td>
                    <td class="cel">${item.sponsor3CardNo} </td>
                    <td class="cel max-200" title="${item.sponsor3CreditRecord}">${item.sponsor3CreditRecord} </td>
                    <td class="cel">${item.sponsor4RealName} </td>
                    <td class="cel">${item.sponsor4CardNo} </td>
                    <td class="cel   max-200" title="${item.sponsor4CreditRecord}">${item.sponsor4CreditRecord} </td>
                    <td class="cel"><sl:format type="date" show="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/></td>
                    <td class="cel"><sl:format type="date" show="${item.creditQueryTime}" pattern="yyyy-MM-dd HH:mm"/></td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel"> <sl:OrderStatus showValue="${item.orderStatus}"/></td>
                    <td class="cel">${item.stationaryManName}</td>
                    <td class="cel">
                        <shiro:hasPermission name="order:view">
                            <a title="查看" class="btn btn-info btn-xs detail"  data-id="${item.id}">
                                <i class="fa fa-search-plus"></i>查看</a>
                        </shiro:hasPermission>
                    </td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newStatementStructure/creditLimitation.js"></script>
</html>
