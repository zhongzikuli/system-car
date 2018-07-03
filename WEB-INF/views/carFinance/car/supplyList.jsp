<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="orderStatus" value="${orderStatus}">
        <input  type="hidden" name="finalAuditStartTime" value="${paramMap.finalAuditStartTime}">
        <input  type="hidden" name="finalAuditEndTime" value="${paramMap.finalAuditEndTime}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
        <input  type="hidden" name="orderNo" value="${paramMap.orderNo}">
    </div>
    <form id="pagerForm" action="${ctx}/carInfo/supplyQuery.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
        	<div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">提车资料:</label>
                        <select class="form-control" id="search-select" name="orderStatus" >
                              <option value="2" <c:if test="${orderStatus == '2'}">selected</c:if>>全部</option>
                              <option value="" <c:if test="${orderStatus == ''}">selected</c:if>>未上传</option>
                              <option value="1" <c:if test="${orderStatus == '1'}">selected</c:if>>已上传</option>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">终审通过时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="finalAuditStartTime"
                                   id="audit_time_start" value="${paramMap.finalAuditStartTime}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="finalAuditEndTime"
                                   id="audit_time_end" value="${paramMap.finalAuditEndTime}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
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
                        <th style="width: 12%">经销商</th>
                        <th style="width: 8%">订单状态</th>
                        <th style="width: 8%">提车资料状态</th>
                        <th style="width: 5%">贷款金额(元)</th>
                        <th style="width: 7%">提车资料上传时间</th>
                        <th style="width: 7%">终审通过时间</th>
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
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel">
                                <sl:OrderStatus showValue="${item.orderStatus}"/>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.carInfoFileStatus == -4}">审核拒绝</c:if>
                            	<c:if test="${item.carInfoFileStatus == -3}"><code class="alert-warning">审核作废</code> </c:if>
                            	<c:if test="${item.carInfoFileStatus == -2}"><code class="alert-error">审核退回</code> </c:if>
                            	<c:if test="${item.carInfoFileStatus == 0}">未提交</c:if>
                            	<c:if test="${item.carInfoFileStatus == 1}"><code class="alert-info">已提交</code> </c:if>
                            	<c:if test="${item.carInfoFileStatus == 2}"><code class="alert-success">审核通过</code> </c:if>
                            <td class="cel">
                                <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <fmt:formatDate value="${item.pickUpCarFileSubmitTime}" pattern="yyyy-MM-dd HH:mm "/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.finalAuditTime}" pattern="yyyy-MM-dd "/>
                            </td>
                             <td class="btn-cel" style="min-width:120px;">
                                <shiro:hasPermission name="carInfoFile:carInformationBackEnter">
                                <a title="提车资料上传" class="btn btn-primary btn-xs"
                                   <c:if test="${item.carInfoFileStatus ==1 || item.carInfoFileStatus ==2 ||
                                    item.carInfoFileStatus ==3 || item.carInfoFileStatus ==-3 || item.carInfoFileStatus ==-4}">style="display:none;"</c:if>
                                   onclick="carInformationBackEnter('${item.id}','${ctx}/carInfo/supplyQuery.action')">提车资料上传</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="order:track">
                                <a title="订单轨迹" class="btn btn-success btn-xs" onclick="toOrderTrack('${item.id}')">订单轨迹</a>
                                </shiro:hasPermission>
                                 <shiro:hasPermission name="order:view">
                                     <a  data-id="${item.id}" data-title="${item.realName }" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/car/supplyList.js"></script>
</html>