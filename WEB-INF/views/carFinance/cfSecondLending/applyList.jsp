<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>二次打款申请</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankPaymentDateStart" value="${paramMap.bankPaymentDateStart}"/>
        <input type="hidden" name="bankPaymentDateEnd" value="${paramMap.bankPaymentDateEnd}"/>
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="fastSearch" value="${param.fastSearch}"/>
        <input type="hidden" name="secondLendingStatus" value="${param.secondLendingStatus}"/>
    </div>
    <form id="pagerForm" action="${ctx}/cfSecondLending/applyList.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="cfSecondLending:apply">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-btn"
                       id="secondLendingApply">二次打款申请</a>
                </shiro:hasPermission>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10 text-right">
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="control-label col-xs-4">银行放款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="bankPaymentDateStart"
                                               id="secondLending-bankPaymentDateStart"
                                               value="${paramMap.bankPaymentDateStart}"/>
                                        <span class="input-group-addon">-</span>
                                        <input type="text" class="form-control" name="bankPaymentDateEnd"
                                               id="secondLending-bankPaymentDateEnd"
                                               value="${paramMap.bankPaymentDateEnd}"/>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-xs-4">贷款银行:</label>
                                <div class="col-xs-8">
                                    <select id="bankId" name="bankId"
                                            class="form-control chosen-select">
                                        <option value="">全部</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <option value="${bank.id}"
                                                    <c:if test="${bank.id eq paramMap.bankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="control-label col-xs-4">申请状态:</label>
                                <div class="col-xs-8">
                                    <select id="secondLendingStatus" name="secondLendingStatus"
                                            class="form-control chosen-select">
                                        <option value="">全部</option>
                                        <option value="0" <c:if
                                                test="${paramMap.secondLendingStatus == 0}"> selected="selected"</c:if>>
                                            未申请
                                        </option>
                                        <option value="1" <c:if
                                                test="${paramMap.secondLendingStatus == 1}"> selected="selected"</c:if>>
                                            已申请
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-4">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="fastSearch" class="form-control"
                                           id="fastSearch" value="${paramMap.fastSearch}"
                                           placeholder="客户名、客户身份证号、订单编号"/>
                                </div>
                            </div>

                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary btn-sm search-btn"
                                        onclick="searchSubmit()">
                                    搜索
                                </button>
                                <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                    <th style="width: 2%"><input type="checkbox" class="checkAll"></th>
                    <th style="width: 4%">序号</th>
                    <th style="width: 10%">订单编号</th>
                    <th style="width: 5%">客户名称</th>
                    <th style="width: 5%">信贷专员</th>
                    <th style="width: 10%">部门</th>
                    <th style="width: 10%">贷款银行</th>
                    <th style="width: 10%">经销商</th>
                    <th style="width: 10%">贷款金额(元)</th>
                    <th style="width: 10%">二次打款金额(元)</th>
                    <th style="width: 10%">高息(元)</th>
                    <th style="width: 10%">费用明细合计(元)</th>
                    <th style="width: 10%">收款单位</th>
                    <th style="width: 10%">收款账号</th>
                    <th style="width: 10%">开户银行</th>
                    <th style="width: 6%">订单状态</th>
                    <th style="width: 10%">银行放款日期</th>
                    <th style="width: 10%">二次打款申请时间</th>
                    <th style="width: 5%">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="19">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" value="${item.id}" name="secondLendingInput"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.realName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.dealerName}</td>
                        <td class="cel">
                            <fmt:formatNumber type="number" value="${item.actualLoadMoney}"
                                              pattern="#,##0.00"/>
                        </td>


                        <td class="cel">
                            <fmt:formatNumber type="number"
                                              value="${item.highInterest - (item.serviceFee + item.poundage + item.licensePlateEnsureMoney + item.agreeEnsureMoney + item.channelEnsureMoney)}"
                                              pattern="#,##0.00"/>
                        </td>


                        <td class="cel">
                            <fmt:formatNumber type="number" value="${item.highInterest}"
                                              pattern="#,##0.00"/>
                        </td>


                        <td class="cel">

                            <fmt:formatNumber type="number"
                                              value="${item.serviceFee + item.poundage + item.licensePlateEnsureMoney + item.agreeEnsureMoney + item.channelEnsureMoney}"
                                              pattern="#,##0.00"/>
                        </td>


                        <td class="cel">${item.receiveBankAccountName}</td>
                        <td class="cel">${item.receiveBankAccount}</td>
                        <td class="cel">${item.receiveBankName}</td>
                        <td class="cel"><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm"
                                                   show="${item.bankPaymentDate}"/></td>
                        <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm"
                                                   show="${item.secondLendingApplyTime}"/></td>
                        <td class="btn-cel">
                            <shiro:hasPermission name="cfSecondLending:orderDetail">
                                <a title="查看" class="btn btn-info btn-xs detail"
                                   onclick="cfSecondLendingDetail('${item.id}','${item.realName}')"><i
                                        class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/cfSecondLending/applyList.js"></script>