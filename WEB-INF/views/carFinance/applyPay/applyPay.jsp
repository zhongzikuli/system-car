<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="nameOrId" value="${paramMap.nameOrId}"/>
        <input type="hidden" name="auditTimeStart" value="${paramMap.auditDetailStartTime}"/>
        <input type="hidden" name="auditTimeEnd" value="${paramMap.auditDetailEndTime}"/>
        <input type="hidden" name="status" value="${status}"/>
    </div>
    <form id="pagerForm" action="${ctx}/applyPay/applyPrincipalList.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-2">
            <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">垫款本金申请状态:</label>
                        <select class="form-control status" id="search-select" name="status">
                            <option value="0"<c:if test="${'0' eq status}">selected</c:if>>全部</option>
                            <option value="1"
                            <c:if test="${'1' eq status}">selected</c:if>
                            >未提交</option>
                            <option value="2"
                            <c:if test="${'2' eq status}">selected</c:if>
                            >已提交</option>
                        </select>
                    </div>

                    <div class="form-group" id="date-time">
                        <label class="control-label label">费用审核时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="auditTimeStart"
                                   id="audit_time_start" value="${paramMap.auditDetailStartTime}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="auditTimeEnd"
                                   id="audit_time_end" value="${paramMap.auditDetailEndTime}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="nameOrId" class="form-control"
                               placeholder="请输入客户姓名或身份证号" onkeyup="value=value.replace(/\s/g,'')"  id="nameOrId" value="${paramMap.nameOrId}"
                               style="width:200px;">
                        <button type="button" class="btn  btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索</button>
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
                        <th style="width: 12%">订单编号</th>
                        <th style="width: 8%">客户名称</th>
                        <th style="width: 5%">信贷专员</th>
                        <th style="width: 10%">部门</th>
                        <th style="width: 12%">贷款银行</th>
                        <th style="width: 10%">经销商</th>
                        <th style="width: 8%">订单状态</th>
                        <th style="width: 5%">贷款金额(元)</th>
                        <th style="width: 10%">费用审核时间</th>
                        <th style="width: 10%">垫款申请时间</th>
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
                                <fmt:formatDate value="${item.feeConfirmTime}" pattern="yyyy-MM-dd HH:mm "/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.advanceApplySubmitTime}" pattern="yyyy-MM-dd HH:mm "/>
                            </td>
                             <td class="btn-cel" style="min-width:120px;">
                                <shiro:hasPermission name="applyPay:save">
                                <c:if test="${item.orderStatus==13||item.orderStatus==14}">
                                    <a href="#" data-id="${item.id}" data-name="${item.realName}" data-money="${item.actualLoadMoney}"
                                       class="btn btn-primary btn-xs edit-btn">
                                        <i class="fa fa-edit"></i>垫款申请</a>
                                </c:if>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="order:track">
                                    <a title="订单轨迹" class="btn btn-success btn-xs"
                                       onclick="toOrderTrack('${item.id}','${ctx}/applyPay/applyPrincipalList.action')">订单轨迹</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="order:view">
                                    <a title="查看" class="btn btn-info btn-xs detail" onclick="detail('${item.id}','${item.realName}')">
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
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/applyPay/applyPay.js"></script>
<script type="text/template" title="垫款申请" id="applyPayCreate-dialog">
    <div class="ibox-content">
        <form id="applyPayCreateForm" class="form-horizontal">
            <div class="form-group" id="audit-info" style="margin:0;">
            </div>
            <div class="form-group">
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                    <input type="hidden" class="form-control" name="remark" id="applyPay-id">
                    <label class="col-xs-4 control-label">客户姓名:</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" name="remark" id="applyPay-buyer-name"
                          readonly="readonly"     > 
                    </div>
                </div>
                <div class="col-sm-6" style="padding-right: 2px; padding-left: 2px;">
                  <label class="col-xs-4 control-label">贷款本金(元):</label>
                    <div class="col-xs-7">
                        <input type="text" class="form-control" name="applyPay-money" id="applyPay-money"
                           readonly="readonly"      >
                    </div>
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