 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>初审单录入</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="orderNo" value="${orderNo}"/>
        <input type="hidden" name="keyword" value="${keyword}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
        <input type="hidden" name="orderStatus" value="${orderStatus}"/>
    </div>
    <form id="pagerForm" action="${ctx}/cfBusinessOrderAccept.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-1">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-11 reset">
                <div class="form-inline">
                    <%--<div class="form-group">
                        <label class="control-label label">订单编号:</label>
                        <input type="text" class="form-control" name="orderNo" id="orderNo"
                               placeholder="请输入订单编号" value="${orderNo}" onkeyup="value=value.replace(/\s/g,'')"/>
                    </div>--%>
                    <div class="form-group">
                        <label class="control-label label">初审单录入:</label>
                        <select class="form-control chosen-select" id="search-select" name="orderStatus">
                            <option value="0" <c:if test="${orderStatus == 0}">selected</c:if>>全部</option>
                            <option value="1" <c:if test="${orderStatus == 1}">selected</c:if>>未录入</option>
                            <option value="3" <c:if test="${orderStatus == 3}">selected</c:if>>已录入</option>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">征信提交时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" id="sTime" value="${startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate" id="eTime" value="${endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">搜索:</label>
                        <input type="text" class="form-control w-200" name="keyword" id="search-keyword"
                              placeholder="请输入客户姓名、身份证号和订单编号" value="${keyword}" onkeyup="value=value.replace(/\s/g,'')"/>
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
                        <th style="width: 10%">订单编号</th>
                        <th style="width: 5%">客户名称</th>
                        <th style="width: 5%">信贷专员</th>
                        <th style="width: 10%">部门</th>
                        <th style="width: 12%">贷款银行</th>
                        <th style="width: 8%">订单状态</th>
                        <th style="width: 12%">征信查询时间</th>
                        <th style="width: 12%">征信提交时间</th>
                        <th style="width: 12%">初审单提交时间</th>
                        <th style="width: 15%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr target="sid_user" rel="${item.id}">
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">${item.buyerName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel"><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                            <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.creditQueryTime}"/></td>
                            <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.ctime}"/></td>
                            <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.orderSubmitTime}"/></td>
                             <td class="btn-cel">
                                <shiro:hasPermission name="order:input">
                                    <c:if test="${item.orderStatus == 1 || item.orderStatus == -1 || item.orderStatus == -2 || item.orderStatus == 0}">
                                        <a title="初审单录入" class="btn btn-primary btn-xs"
                                           onclick="orderApply('${item.id}','${item.buyerName}')">初审单录入</a>
                                    </c:if>
                                </shiro:hasPermission>
                                 <shiro:hasPermission name="credit:refuse">
                                     <c:if test="${item.orderStatus == 0 || item.orderStatus == 1 || item.orderStatus == -2 }">
                                         <a data-toggle="modal" class="btn btn-danger btn-xs refuse-credit" data-id="${item.id}">征信退回</a>
                                     </c:if>
                                 </shiro:hasPermission>
                                <shiro:hasPermission name="order:track">
                                    <a title="订单轨迹" class="btn btn-success btn-xs"
                                       onclick="toOrderTrack('${item.id}','${item.buyerName}')">订单轨迹</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="order:view">
                                    <a title="查看" class="btn btn-info btn-xs detail"
                                       onclick="detail('${item.id}','${item.buyerName}')"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/order.js"></script>
<script type="text/template" title="备注" id="protocolCreate-dialog">
    <div class="ibox-content">
        <form id="protocolCreateForm" class="form-horizontal">
            <div id="protocolCreateDialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>退回备注:</label>
                    <div class="col-xs-8">
		             	<textarea rows="5" cols="150" type="text" class="form-control" id="credit-content"
                                  name="remark" tip="退回备注" check="validProtocolForm(this)" value=""></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>
</html>