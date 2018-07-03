<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="insuranceStatus" value="${insuranceStatus}">
        <input type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
        <input type="hidden" name="orderNo" value="${paramMap.orderNo}">
        <input type="hidden" name="firstAuditStartTime" value="${paramMap.firstAuditStartTime}">
        <input type="hidden" name="firstAuditEndTime" value="${paramMap.firstAuditEndTime}">
    </div>
    <form id="pagerForm" action="${ctx}/insurance/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">

            <div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">保险:</label>
                        <select class="form-control" id="insuranceStatus" name="insuranceStatus">
                            <option value="2" <c:if test="${insuranceStatus == '2'}">selected</c:if>>全部</option>
                            <option value="" <c:if test="${insuranceStatus == ''}">selected</c:if>>未录入</option>
                            <option value="1" <c:if test="${insuranceStatus == '1'}">selected</c:if>>已录入</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class=" control-label">部门:</label>
                        <select class="form-control" id="departmentId" name="departmentId">
                            <option value="">请选择部门</option>
                            <c:forEach items="${departmentNames}" var="department">
                                <option value="${department.id}"
                                        <c:if test="${department.id eq paramMap.departmentId}">selected</c:if>
                                >${department.name}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">终审提交时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="firstAuditStartTime"
                                   id="companyAdvanceMoneyStartDate" value="${paramMap.firstAuditStartTime}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="firstAuditEndTime"
                                   id="companyAdvanceMoneyEndDate" value="${paramMap.firstAuditEndTime}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="nameOrId" class="form-control"  onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="请输入客户姓名或身份证号或订单编号" id="nameOrId" value="${paramMap.nameOrId}"
                               style="width:200px;">
                        <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width: 2%">序号</th>
                    <th style="width: 12%">订单编号</th>
                    <th style="width: 5%">客户名称</th>
                    <th style="width: 5%">信贷专员</th>
                    <th style="width: 12%">部门</th>
                    <th style="width: 10%">贷款银行</th>
                    <th style="width: 12%">经销商</th>
                    <th style="width: 8%">订单状态</th>
                    <th style="width: 5%">贷款金额(元)</th>
                    <th style="width: 7%">终审提交时间</th>
                    <th style="width: 7%">录入时间</th>
                    <th style="width: 8%">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="13">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel max-120">${item.realName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.dealerName}</td>
                        <td class="cel">
                        <c:if test="${item.orderStatus == 13}">
                            财务费用确认
                        </c:if>
                        <c:if test="${item.orderStatus == 14}">
                            垫款申请退回
                        </c:if>
                        <c:if test="${item.orderStatus == 16}">
                            垫款申请递交
                        </c:if>
                        <c:if test="${item.orderStatus == 18}">
                            垫款申请审核通过
                        </c:if>
                        <c:if test="${item.orderStatus == 20}">
                            财务打款
                        </c:if>
                        <c:if test="${item.orderStatus == 28}">
                            已成交
                        </c:if>
                        <c:if test="${item.orderStatus == 30}">
                            已结清
                        </c:if>
                        </td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.firstAuditTime}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.insuranceTime}" pattern="yyyy-MM-dd HH:mm "/>

                        </td>
                        <td class="btn-cel" style="min-width:120px;">
                            <div align="center">
                                    <a title="保险录入" class="btn btn-primary btn-xs"
                                       <c:if test="${insuranceStatus == '1'}">style="display: none"</c:if>
                                       href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}&active=insurance&goBackUrl=${ctx}/insurance/query.action">
                                        <i class="fa fa-search-plus"></i>保险录入</a>
                                <shiro:hasPermission name="order:view">
                                    <a  data-id="${item.id}" data-title="${item.realName }" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>
                            </div>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/insuranceInfo/insurance.js"></script>
</html>