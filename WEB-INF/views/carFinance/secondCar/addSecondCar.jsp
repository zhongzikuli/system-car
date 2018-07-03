<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="status" value="${paramMap.status}">
        <input type="hidden" name="startTime" value="${paramMap.submitEvaluateStartTime}">
        <input type="hidden" name="endTime" value="${paramMap.submitEvaluateEndTime}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}">
        <input type="hidden" name="loanBankId" value="${paramMap.loanBankId}">
        <%-- <input type="hidden" name="carBrand" value="${paramMap.carBrand}"> --%>
    </div>
    <form id="pagerForm" action="${ctx}/addSecondCar/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <shiro:hasPermission name="addSecondCar:insert">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                </shiro:hasPermission>
                <a data-toggle="modal" class="btn btn-success btn-sm refresh-btn">刷新</a>
                <shiro:hasPermission name="addSecondCar:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
                </shiro:hasPermission>
            </div>

            <div class="col-sm-7">
                <a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">评估状态:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="status" name="status">
                                        <option value="">请选择评估状态</option>
                                        <option value="0"
                                        <c:if test="${paramMap.status==0}">selected</c:if>
                                        >评估提交</option>
                                        <option value="1"
                                        <c:if test="${paramMap.status==1}">selected</c:if>
                                        >评估完成</option>
                                        <option value="2"
                                        <c:if test="${paramMap.status==2}">selected</c:if>
                                        >评估退回</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">提交评估时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="submitEvaluateStartTime"
                                               style="width:120px;"
                                               id="startTime" value="${paramMap.submitEvaluateStartTime}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="submitEvaluateEndTime"
                                               style="width:120px;"
                                               id="endTime" value="${paramMap.submitEvaluateEndTime}"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="loanBankId" name="loanBankId">
                                        <option value="">请选择贷款银行</option>
                                        <c:forEach items="${bankList}" var="bank">
                                            <option value="${bank.id}"
                                            <c:if test="${bank.id eq paramMap.loanBankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <%-- <div class="form-group">
                                <label class="col-xs-3 control-label">车型:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="carBrand" class="form-control" 
                                           placeholder="请输入车型" id="carBrand" value="${paramMap.carBrand}">
                                </div>
                            </div> --%>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="keyword" class="form-control"
                                           onkeyup="value=value.replace(/\s/g,'')"
                                           placeholder="请输入车架号或里程数" id="keyword" value="${paramMap.keyword}">
                                </div>
                            </div>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary btn-sm search-btn"
                                        onclick="searchSubmit()">搜索
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
                    <th style="width: 2%">序号</th>
                    <th style="width: 5%">录单专员</th>
                    <th style="width: 5%">新增二手车专员</th>
                    <th style="width: 3%">客户姓名</th>
                    <th style="width: 2%">订单编号</th>
                    <th style="width: 2%">评估员</th>
                    <th style="width: 10%">车型</th>
                    <th style="width: 8%">车架号</th>
                    <th style="width: 5%">行驶里数(万公里)</th>
                    <th style="width: 10%">初始登记日期</th>
                    <th style="width: 10%">贷款银行</th>
                    <th style="width: 10%">地区</th>
                    <th style="width: 5%">评估状态</th>
                    <th style="width: 5%">初始评估价(元)</th>
                    <th style="width: 10%">提交评估时间</th>
                    <th style="width: 10%">评估时间</th>
                    <th style="width: 10%">截止日期</th>
                    <th style="width: 8%">操作</th>
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
                        <td><input type="checkbox" class="checkOne" name="secondCar_input" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.submitEvaluateUserName}</td>
                        <td class="cel">${item.buyerName}</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.evaluateUser}</td>
                        <td class="cel">${item.brandName}</td>
                        <td class="cel">${item.vin}</td>
                        <td class="cel">${item.miles}</td>
                        <td class="cel">
                            <sl:format type="date" show="${item.initRegisterDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">${item.province}</td>
                        <td class="cel">
                            <c:if test="${item.status == '0'}">评估提交</c:if>
                            <c:if test="${item.status == '1'}">评估完成</c:if>
                            <c:if test="${item.status == '2'}">评估退回</c:if>
                        </td>
                        <td class="cel">
                            <sl:format type="number" show="${item.initEvaluatePrice}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.evaluateTime}" pattern="yyyy-MM-dd HH:mm "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.validDate}" pattern="yyyy-MM-dd  "/>
                        </td>
                        <td data-itemId ="${item.id}">
                            <shiro:hasPermission name="addSecondCar:toEdit">
                                <a title="编辑" class="btn btn-primary btn-xs edit-btn"
                                	<c:if test="${item.status != '2' }">style="display:none;"</c:if>
                                ><i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="addSecondCar:toDetail">
                                <a title="查看" class="btn btn-info btn-xs detail-btn"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/secondCar/addSecondCar.js"></script>
</html>