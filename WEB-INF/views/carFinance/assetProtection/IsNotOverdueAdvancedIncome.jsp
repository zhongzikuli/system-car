<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="repayAmountMonth" value="${paramMap.repayAmountMonth}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
    </div>
    <form id="pagerForm" action="${ctx}/isNotOverdueAdvancedIncome/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="urgeWork:toAdvancedIncomeIsNotOverDue">
                  <a title="垫款收支" class="btn btn-info  btn-sm advancedIncome">代偿管理</a>
                    </shiro:hasPermission >
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">月还款额大于:</label>
                        <input type="text" style="width:120px;" class="form-control" name="repayAmountMonth" onkeyup="value=value.replace(/\s/g,'')"
                               onkeyup="value=value.replace(/\s/g,'')"    id="repayAmountMonth" value="${paramMap.repayAmountMonth}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="nameOrId" class="form-control w-200" onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="请输入客户姓名或身份证号" id="nameOrId" value="${paramMap.nameOrId}">
                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:2%;"></th>
                    <th style="width: 2%">序号</th>
                    <th style="width: 2%">电催异常</th>
                    <th style="width: 3%">代偿</th>
                    <th style="width: 3%">拖车状态</th>
                    <th style="width: 6%">诉讼</th>
                    <th style="width: 7%">催缴状态</th>
                    <th style="width: 6%">客户姓名</th>
                    <th style="width: 8%">身份证号</th>
                    <th style="width: 5%">手机号码</th>
                    <th style="width: 7%">银行卡号</th>
                    <th style="width: 3%">银行</th>
                    <th style="width: 3%">月还款额(元)</th>
                    <th style="width: 3%">催缴时间</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="14">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="radio" class="checkOne" name="urgeWorkInput" value="${item.id}" bankCardNo="${item.bankCardNo}" cardNo="${item.cardNo}" bankId="${item.bankId}" customerName="${item.customerName}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
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
                            <c:if test="${item.trailCarStatus eq 1}">
                                <code class="alert-success">已拖车</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus eq  2}">
                                <code class="alert-success">已结清</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus eq 3}">
                                <code class="alert-success">其它</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus eq  4}">
                                <code class="alert-success">提交报备</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus eq 5}">
                                <code class="alert-success">移交拖车</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus eq  6}">
                                <code class="alert-success">关注还款</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus eq null}">
                                <code >--</code>
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${!empty item.isLaw }">
                                <code>是</code>
                            </c:if>
                            <c:if test="${empty item.isLaw}">
                                <code class="alert-success">否</code>
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${ empty item.urgeStatus }">--</c:if>
                            <c:if test="${item.urgeStatus == 1}">催进</c:if>
                            <c:if test="${item.urgeStatus == 2}">未催进</c:if>
                            <c:if test="${item.urgeStatus == 3}">承诺还款</c:if>
                            <c:if test="${item.urgeStatus == 4}">已拖车</c:if>
                        </td>
                        <td class="cel">${item.customerName}</td>
                        <td class="cel">${item.cardNo}</td>
                        <td class="cel">${item.tel}</td>
                        <td class="cel">${item.bankCardNo}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.repayMonth}" pattern="#,##0.00"/>
                        </td>
                        <td>
                            <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm "/>
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
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/assetProtection/IsNotOverdueAdvancedIncome.js"></script>
</html>