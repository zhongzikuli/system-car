<%@ taglib prefix="slt" uri="/slt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="isSendOff" value="${paramMap.isSendOff}">
        <input  type="hidden" name="loanBankId" value="${paramMap.loanBankId}">
        <input  type="hidden" name="sendStartTime" value="${paramMap.sendStartTime}">
        <input  type="hidden" name="sendEndTime" value="${paramMap.sendEndTime}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
    </div>
    <form id="pagerForm" action="${ctx}/contractSendOff/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">寄出状态:</label>
                        <select class="form-control" id="search-select" name="isSendOff" >
                            <option value="" <c:if test="${paramMap.isSendOff == ''}">selected</c:if>>未寄出</option>
                            <option value="0" <c:if test="${paramMap.isSendOff == '0'}">selected</c:if>>全部</option>
                            <option value="1" <c:if test="${paramMap.isSendOff == '1'}">selected</c:if>>已寄出</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">贷款银行:</label>
                            <select class="form-control" id="loanBankId" name="loanBankId">
                                <option value="">请选择贷款银行</option>
                                <c:forEach items="${bankList}" var="bank">
                                    <option value="${bank.id}"
                                            <c:if test="${bank.id eq paramMap.loanBankId}">selected</c:if>
                                    >${bank.bankName}</option>
                                </c:forEach>
                            </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">寄出日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="sendStartTime"
                                   id="sTime" value="${paramMap.sendStartTime}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="sendEndTime"
                                   id="eTime" value="${paramMap.sendEndTime}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷查询:</label>
                        <input type="text" name="nameOrId" class="form-control w-200" onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="请输入客户姓名或身份证号或订单编号" id="nameOrId" value="${paramMap.nameOrId}">
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
                    <th style="width: 2%">序号</th>
                    <th style="width: 12%">订单编号</th>
                    <th style="width: 5%">客户名称</th>
                    <th style="width: 5%">信贷专员</th>
                    <th style="width: 12%">部门</th>
                    <th style="width: 10%">贷款银行</th>
                    <th style="width: 12%">贷款金额</th>
                    <th style="width: 8%">状态</th>
                    <th style="width: 8%">征信提交时间</th>
                    <th style="width: 5%">寄出日期</th>
                    <th style="width: 8%">操作</th>
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
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel max-120">${item.realName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <slt:OrderStatus showValue="${item.orderStatus}"/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.creditSubmitTime}" pattern="yyyy-MM-dd HH:mm "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.teamDeliverContractDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="btn-cel" style="min-width:120px;">
                            <shiro:hasPermission name="contractSendOff:sendOff">
                            <a  data-id="${item.id}"  class="btn btn-primary btn-xs sendOff"><i class="fa fa-search-plus"></i>寄出</a>
                            </shiro:hasPermission>
                            <a  data-id="${item.id}" data-title="${item.realName }" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/contractSend/contractSendOff.js"></script>
<script type="text/template" title="合同寄出" id="concartSend-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="concartSendForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>寄出日期:</label>
                <div class="col-xs-8">
                    <input type="text" check="validconcartSendOff(this)" class="form-control" name="teamDeliverContractDate" id="teamDeliverContractDate">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注信息:</label>
                <div class="col-xs-8">
                    <textarea type="text" check="validconcartSendOff(this)" class="form-control" id="teamDeliverContractRemark" name="teamDeliverContractRemark"
                    ></textarea>
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