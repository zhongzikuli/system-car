<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>征信录入</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="keyword" value="${keyword}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/cfBusinessOrderAccept/credit/input.action" method="post" style="margin: 0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="credit:save">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-credit">新增征信</a>
                </shiro:hasPermission>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">征信查询时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="creditStartDate"
                                   id="creditSTime" value="${creditStartDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="creditEndDate"
                                   id="creditETime" value="${creditEndDate}"/>
                        </div>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">征信提交时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate"
                                   id="sTime" value="${startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate"
                                   id="eTime" value="${endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">搜索:</label>
                        <input type="text" class="form-control w-200" name="keyword" id="search-keyword"
                               placeholder="请输入客户姓名、身份证号和订单编号" onkeyup="value=value.replace(/\s/g,'')"  value="${keyword}">
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
                        <th style="width: 12%">订单编号</th>
                        <th style="width: 8%">客户名称</th>
                        <th style="width: 5%">信贷专员</th>
                        <th style="width: 10%">部门</th>
                        <th style="width: 12%">贷款银行</th>
                        <th style="width: 8%">订单状态</th>
                        <th style="width: 10%">征信查询时间</th>
                        <th style="width: 10%">征信提交时间</th>
                        <th style="width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="9">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.buyerName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel"><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                            <td class="cel">
                                <sl:format type="date" show="${item.creditQueryTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                              <td class="cel">
                                <sl:format type="date" show="${item.creditSubmitTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td>
                                <shiro:hasPermission name="credit:update">
                                    <c:if test="${item.orderStatus == -1 }">
                                        <a title="编辑" class="btn btn-primary btn-xs"
                                           onclick="toEdit('${item.id}','${ctx}/cfBusinessOrderAccept/credit/input.action')"><i class="fa fa-edit"></i>编辑</a>
                                    </c:if>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="order:view">
                                    <a title="查看" class="btn btn-info btn-xs detail" onclick="detail('${item.id}','${item.buyerName }')">
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
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/credit/inputList.js"></script>
</html>