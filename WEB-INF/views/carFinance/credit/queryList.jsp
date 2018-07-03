<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>征信查询</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="keyword" value="${keyword}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
        <input type="hidden" name="status" value="${status}"/>

    </div>
    <form id="pagerForm" action="${ctx}/bankCreditReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-4">
                <a data-toggle="modal" class="btn btn-danger btn-sm refuse-credit">退回</a>
                <a data-toggle="modal" class="btn btn-success btn-sm download-file">照片下载</a>
                <a data-toggle="modal" class="btn btn-primary btn-sm download-pic">图片合成</a>
                <a data-toggle="modal" class="btn btn-info btn-sm download-excel">导出</a>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-8">
            	<a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
            	<div class="btn-box animated fadeInRight">
            		<div class="row">
            			<div class="col-sm-7">
            				<div class="form-group">
		                        <label class="col-xs-3 control-label">征信提交时间:</label>
		                        <div class="col-xs-8">
			                        <div class="input-group">
			                            <input type="text" class="form-control" name="startDate" id="sTime" value="${startDate}"/>
			                            <span class="input-group-addon">到</span>
			                            <input type="text" class="form-control" name="endDate" id="eTime" value="${endDate}"/>
			                        </div>
		                        </div>
		                    </div>
		                    <div class="form-group">
            					<label class="col-xs-3 control-label">关键字:</label>
            					<div class="col-xs-8">
									<input type="text" class="form-control" name="keyword" id="search-keyword" placeholder="请输入客户姓名或身份证号"  onkeyup="value=value.replace(/\s/g,'')"  value="${keyword}">
            					</div>
            				</div>
            			</div>
            			<div class="col-sm-5">

            				<div class="form-group">
		                        <label class="col-xs-3 control-label">征信状态:</label>
		                        <div class="col-xs-8">
			                        <select class="form-control status" name="status" id="search-select">
			                           <option value="0"<c:if test="${'0' eq status}">selected</c:if>>全部</option>
			                           <option value="1" <c:if test="${'1' eq status}">selected</c:if> >未查询</option>
			                           <option value="2" <c:if test="${'2' eq status}">selected</c:if> >已查询 </option>
			                        </select>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <button type="button" class="btn  btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索</button>
		                    	<button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
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
                        <th style="width: 12%">订单编号</th>
                        <th style="width: 8%">客户名称</th>
                        <th style="width: 5%">信贷专员</th>
                        <th style="width: 12%">部门</th>
                        <th style="width: 10%">贷款银行</th>
                        <th style="width: 6%">订单状态</th>
                        <th style="width: 7%">征信查询时间</th>
                        <th style="width: 7%">征信提交时间</th>
                        <th style="width: 4%">查询方式</th>
                        <th style="width: 4%">查询状态</th>
                        <th style="width: 12%">操作</th>
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
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.buyerName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">
                                <sl:OrderStatus showValue="${item.orderStatus}"/>
                            </td>
                            <td class="cel">
                                <sl:format type="date" show="${item.creditQueryTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                                <sl:format type="date" show="${item.creditSubmitTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            
                            <td class="cel">
                            	<c:if test="${empty item.creditQueryType }">--</c:if>
                            	<c:if test="${item.creditQueryType == 1}">自动</c:if>
                            	<c:if test="${item.creditQueryType == 0}">人工</c:if>
                            </td>
                            <td class="cel">
                            	<c:if test="${empty item.creditQueryStatus }">--</c:if>
                                <c:if test="${item.creditQueryStatus == 1}"><code class="alert-info">查询中</code></c:if>
                            	<c:if test="${item.creditQueryStatus == 2}"><code class="alert-success">查询完成</code></c:if>
                            	<c:if test="${item.creditQueryStatus == 3}"><code class="alert-warning">查询失败</code></c:if>
                            </td>
                            <td>
                                <c:if test="${item.orderStatus == 0 || item.orderStatus==1 }">
                                	<a title="银行征信查询" class="btn btn-primary btn-xs" onclick="bankCreditReport('${item.id}')"><i class="fa fa-search-plus"></i>银行征信查询</a>
                                	<shiro:hasPermission name="bankCreditReport:autoQuery">
                                		<a title="自动查询" class="btn btn-warning btn-xs auto-query-credit-btn" data-id= "${item.id}"><i class="fa fa-search-plus"></i>自动查询</a>
                                	</shiro:hasPermission>
                            	</c:if>
                            	<shiro:hasPermission name="bankCreditReport:view">
                                     <a title="查看" class="btn btn-info btn-xs detail" onclick="detail('${item.id}','${item.buyerName }')"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/laydate/laydate.js"></script>
<script type="text/javascript"
        src="<%=request.getContextPath() %>/js/mine/carFinance/credit/list.js"></script>
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