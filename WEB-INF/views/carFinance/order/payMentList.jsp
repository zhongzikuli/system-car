<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
<div id="hiddenForm">
        <input type="hidden" name="nameOrId" value="${paramMap.nameOrId}"/>
        <input type="hidden" name="auditTimeStart" value="${paramMap.auditTimeStart}"/>
        <input type="hidden" name="auditTimeEnd" value="${paramMap.auditTimeEnd}"/>
        <input type="hidden" name="status" value="${status}"/>
    <input type="hidden" name="orderNo" value="${paramMap.orderNo}"/>
    </div>
    <form id="pagerForm" action="${ctx}/paymentCard/queryList.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
        <div class="col-sm-2">
            <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">还款卡状态:</label>
                        <select class="form-control status" id="search-select" name="status">
                            <option value="1"
                            <c:if test="${status == 1}">selected</c:if>
                            >未收到</option>
                            <option value="2"
                            <c:if test="${status == 2}">selected</c:if>
                            >收到</option>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">还款卡寄出时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="auditTimeStart"
                                   id="audit_time_start" value="${paramMap.startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="auditTimeEnd"
                                   id="audit_time_end" value="${paramMap.endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="keyword" class="form-control w-200"
                               placeholder="请输入客户姓名或身份证号" onkeyup="value=value.replace(/\s/g,'')"  id="nameOrId" value="${paramMap.keyword}">
                        <button type="button" class="btn  btn-primary btn-sm search-btn" onclick="searchSubmit()">查询</button>
                    	 <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                        <th style="width: 2%"><input type="checkbox" class="checkAll"></th>
                        <th style="width: 2%">序号</th>
                        <th style="width: 10%">订单编号</th>
                        <th style="width: 8%">客户名称</th>
                        <th style="width: 5%">信贷专员</th>
                        <th style="width: 10%">部门</th>
                        <th style="width: 10%">贷款银行</th>
                        <th style="width: 10%">经销商</th>
                        <th style="width: 8%">订单状态</th>
                        <th style="width: 5%">贷款金额(元)</th>
                        <th style="width: 8%">还款卡收到时间</th>
                        <th style="width: 8%">还款卡寄出时间</th>
                        <th style="min-width:120px;">操作</th>
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
                            <td><input type="checkbox" class="checkOne" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel">
                                <sl:OrderStatus showValue="${item.orderStatus}"/>
                            </td>
                            <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <fmt:formatDate value="${item.bankCardReceiveDate}" pattern="yyyy-MM-dd  "/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.bankCardExpressDate}" pattern="yyyy-MM-dd  "/>
                            </td>
                             <td class="btn-cel" style="min-width:120px;">
                                <shiro:hasPermission name="payMentCard:save">
                                <c:if test="${status==1}">
                                    <a title="收到还款卡" class="btn btn-primary btn-xs"
                                       onclick="PaymentCard('${item.id}','${item.realName}')">收到还款卡</a>
                                </c:if>
                               </shiro:hasPermission>
                                    <shiro:hasPermission name="order:track">
                                    <a title="订单轨迹" class="btn btn-success btn-xs"
                                       onclick="toOrderTrack('${item.id}','${ctx}/cfFileCenter/fileManage.action')">订单轨迹</a>
                                </shiro:hasPermission>
                                 <shiro:hasPermission name="order:view">
                                     <a title="查看" class="btn btn-info btn-xs detail" onclick="detail('${item.businessOrderAcceptId}','${item.realName }')">
                                         <i class="fa fa-search-plus"></i>查看</a>
                                    </shiro:hasPermission>
                            </td>
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
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/payMent.js"></script>
</html>