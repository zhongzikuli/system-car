<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="completeVideo" value="${paramMap.completeVideo}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
    </div>
    <form id="pagerForm" action="${ctx}/cfVideoSubmit/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">齐全视频:</label>
                        <select class="form-control" id="search-select" name="completeVideo" >
                            <option value="" <c:if test="${completeVideo == ''}">selected</c:if>>未齐全</option>
                            <option value="0" <c:if test="${completeVideo == '0'}">selected</c:if>>全部</option>
                            <option value="1" <c:if test="${completeVideo == '1'}">selected</c:if>>已齐全</option>
                        </select>
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
                    <th style="width: 8%">贷款金额</th>
                    <th style="width: 8%">订单状态</th>
                    <th style="width: 8%">齐全确认时间</th>
                    <th style="width: 5%">初审单提交时间</th>
                    <th style="width: 8%">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="12">暂无数据</td>
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
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <sl:OrderStatus showValue="${item.orderStatus}"/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.applyTime}" pattern="yyyy-MM-dd HH:mm "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.orderSubmitTime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>
                        <td class="btn-cel" style="min-width:120px;">

                            <shiro:hasPermission name="cfVideoSubmit:confirmVideoComplete">
                            <a title="齐全确认" data-id="${item.id}" data-realName="${item.realName}" data-cardNo="${item.buyerCardNo}" class="btn btn-primary btn-xs completeSure"
                               <c:if test="${item.videoFileComplete >=1}">style="display:none;"</c:if>>齐全确认</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/completeVideoSubmit/completeVideoSubmit.js"></script>
</html>