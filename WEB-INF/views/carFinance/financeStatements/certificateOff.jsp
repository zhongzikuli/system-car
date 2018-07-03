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
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/certificateOff/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm certificate-excel">导出</button>
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
                        <label class="control-label label">交接日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" id="search-start-date" value="${startDate}" />
                            <span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${endDate}" />
                        </div>
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
                    <th style="width:5%;">主贷人</th>
                    <th style="width:5%;">抵押人</th>
                    <th style="width:5%;">身份证号</th>
                    <th style="width:5%;">地区</th>
                    <th style="width:5%;">编码</th>
                    <th style="width:5%;">车牌号</th>
                    <th style="width:5%;">抵押日期</th>
                    <th style="width:5%;">交接日期</th>
                    <th style="width:5%;">车辆类型</th>
                    <th style="width:5%;">机动车登记证书原件</th>
                    <th style="width:5%;">机动车登记证书复印件</th>
                    <th style="width:5%;">销售发票</th>
                    <th style="width:5%;">销售发票复印件</th>
                    <th style="width:5%;">商险正本原件</th>
                    <th style="width:5%;">其他</th>
                    <th style="width:5%;">卡号</th>
                    <th style="width:5%;">贷款银行</th>
                    <th style="width:5%;">部门</th>
                    <th style="width:5%;">车架号</th>
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
                    <td class="cel">${item.mortgageProcesser}</td>
                    <td class="cel">${item.cardNo}</td>
                    <td class="cel">${item.carLicenseProvince}${item.carLicenseCity}${item.carLicenseTown}</td>
                    <td class="cel">${item.registerLicenseNo}</td>
                    <td class="cel">${item.plateNumber}</td>
                    <td class="cel"><sl:format type="date" show="${item.mortgageProcessDate}" pattern="yyyy-MM-dd "/></td>
                    <td class="cel"><sl:format type="date" show="${item.mortgageFileSubmitBankDate}" pattern="yyyy-MM-dd HH:mm"/></td>
                    <td class="cel"> <c:if test="${item.newOrOld==1}"><code class="alert-info">新车</code></c:if>
                        <c:if test="${item.newOrOld==0}"><code class="alert-warning">二手车</code></c:if></td>
                    <td class="cel">是</td>
                    <td class="cel">是</td>
                    <td class="cel">是</td>
                    <td class="cel">是</td>
                    <td class="cel">是</td>
                    <td class="cel"></td>
                    <td class="cel">${item.bankCardNo}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel">${item.depName}</td>
                    <td class="cel">${item.vin}</td>
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
