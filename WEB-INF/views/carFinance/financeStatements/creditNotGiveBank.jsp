<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>征信送行</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${loanBankId}"/>
        <input type="hidden" name="keyword" value="${keyword}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/creditNotGiveBank/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm creditNot-excel">导出</button>
                <button type="button" data-toggle="modal" class="btn btn-info btn-sm creditNot-all-excel">导出全部</button>
                    <label class="alert-warning">总数(条): </label>
                    <code class="alert-info">${pageBean.totalCount}</code>
            </div>

            <div class="col-sm-10">
                <div class="form-inline">

                    <div class="form-group">
                        <label class="control-label label">贷款银行:</label>
                        <select name="bankId" id="search-bank" class="form-control chosen-select status" >
                            <option value="">请选择</option>
                            <c:forEach items="${banks}" var="bank">
                                <option value="${bank.id}"
                                        <c:if test="${bank.id eq loanBankId}">selected</c:if>
                                >${bank.bankName}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">合同送行日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" id="search-start-date" value="${startDate}" />
                            <span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${endDate}" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">搜索:</label>
                        <input type="text" class="form-control w-200" name="keyword" id="search-keyword" placeholder="请输入客户姓名或身份证号" value="${keyword}">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
                        <button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
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
                    <th style="width:5%;">借款人</th>
                    <th style="width:5%;">卡号</th>
                    <th style="width:5%;">征信正式查询打印日期</th>
                    <th style="width:5%;">身份证号</th>
                    <th style="width:5%;">车型</th>
                    <th style="width:5%;">车架号</th>
                    <th style="width:5%;">发动机号</th>
                    <th style="width:5%;">购车价(元)</th>
                    <th style="width:5%;">首付款(元)</th>
                    <th style="width:5%;">首付比例</th>
                    <th style="width:5%;">贷款金额(元)</th>
                    <th style="width:5%;">担保服务费(元)</th>
                    <th style="width:5%;">分期总额(元)</th>
                    <th style="width:5%;">分期期数</th>
                    <th style="width:5%;">授信总额(元)</th>
                    <th style="width:5%;">配偶姓名</th>
                    <th style="width:5%;">配偶身份证</th>
                    <th style="width:5%;">收入情况(元)</th>
                    <th style="width:5%;">住房情况</th>
                    <th style="width:5%;">受教育情况</th>
                    <th style="width:5%;">工作单位</th>
                    <th style="width:5%;">购通讯地址</th>
                    <th style="width:5%;">手机号</th>
                    <th style="width:5%;">车型构成</th>
                    <th style="width:5%;">其他备注</th>
                    <th style="width:5%;">贷款银行</th>
                    <th style="width:5%;">送交银行日期</th>
                    <th style="width:5%;">订单号</th>
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
                    <td class="cel">${item.buyerName}</td>
                    <td class="cel">${item.bankCardNo}</td>
                    <td class="cel"><sl:format type="date" show="${item.creditQueryTime}" pattern="yyyy-MM-dd "/></td>
                    <td class="cel">${item.buyerCardNo}</td>
                    <td class="cel">${item.brandName}</td>
                    <td class="cel">${item.vinNo}</td>
                    <td class="cel">${item.engineNo}</td>
                    <td class="cel"><sl:format type="number" show="${item.auditCarPrice}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.actualFirstPay}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.actualFirstPayRatio}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.highInterest}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.loanPeriodMonth}</td>
                    <td class="cel"></td>
                    <td class="cel">${item.sharedName}</td>
                    <td class="cel">${item.sharedCardNo}</td>
                    <td class="cel"><sl:format type="number" show="${item.monthIncome}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.relationBuyerStr}</td>
                    <td class="cel">${item.buyerFlexStr}</td>
                    <td class="cel">${item.companyName}</td>
                    <td class="cel">${item.currentAddressProvince}${item.currentAddressCity}${item.currentAddressTown}${item.currentAddress}</td>
                    <td class="cel">${item.buyerTel}</td>
                    <td class="cel"> <c:if test="${item.newOrOld==1}"><code class="alert-info">新车</code></c:if>
                        <c:if test="${item.newOrOld==0}"><code class="alert-warning">二手车</code></c:if></td>
                    <td class="cel max-200">${item.remark}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel"><sl:format type="date" show="${item.contractSubmitBankDate}" pattern="yyyy-MM-dd "/></td>
                    <td class="cel">${item.orderNo}</td>
                    <td class="cel">
                        <shiro:hasPermission name="order:view">
                            <a title="查看" class="btn btn-info btn-xs detail"  data-id="${item.id}" data-type="${ctx}/creditNotGiveBank/query.action">
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newStatementStructure/loanStatisticsList.js"></script>
</html>
