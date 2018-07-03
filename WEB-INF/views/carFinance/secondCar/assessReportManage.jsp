<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="departmentId" value="${paramMap.departmentId}">
        <input  type="hidden" name="loanBankId" value="${paramMap.loanBankId}">
        <input  type="hidden" name="assessReportkeyWord" value="${paramMap.assessReportkeyWord}">
        <input  type="hidden" name="repstatus" value="${repstatus}">
        <input  type="hidden" name="evaluateUserId" value="${paramMap.evaluateUserId}">
        <input  type="hidden" name="orderNo" value="${paramMap.orderNo}">
        <input  type="hidden" name="evaluateStartTime" value="${paramMap.evaluateStartTime}">
        <input  type="hidden" name="evaluateEndTime" value="${paramMap.evaluateEndTime}">
    </div>
    <form id="pagerForm" action="${ctx}/assessReportManage/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <shiro:hasPermission name="assessReportManage:downloadFiles">
                    <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="downloadFiles()">附件下载</a>
                </shiro:hasPermission>
                <a data-toggle="modal" class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>

            <div class="col-sm-7">
                <a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="departmentId" name="departmentId">
                                        <option value="">请选择部门</option>
                                        <c:forEach items="${departmentNames}" var="department">
                                            <option value="${department.id}"
                                            <c:if test="${department.id eq paramMap.departmentId}">selected</c:if>
                                            >${department.name}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="loanBankId" name="loanBankId"
                                            value="${paramMap.loanBankId}">
                                        <option value="">请选择贷款银行</option>
                                        <c:forEach items="${bankList}" var="bank">
                                            <option value="${bank.id}"
                                            <c:if test="${bank.id eq paramMap.loanBankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">评估时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="evaluateStartTime"
                                               id="startTime" value="${paramMap.evaluateStartTime}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="evaluateEndTime"
                                               id="endTime" value="${paramMap.evaluateEndTime}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="assessReportkeyWord" class="form-control" onkeyup="value=value.replace(/\s/g,'')"
                                           placeholder="请输入信贷专员姓名或客户姓名或订单编号" id="assessReportkeyWord"
                                           value="${paramMap.assessReportkeyWord}"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">报告状态:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="repstatus" name="repstatus">
                                        <option value="2" <c:if test="${repstatus == '2'}">selected</c:if>>全部</option>
                                        <option value=""  <c:if test="${repstatus == ''}">selected</c:if>>未完成</option>
                                        <option value="1" <c:if test="${repstatus == '1'}">selected</c:if>>已完成</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">评估员:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="evaluateUserId" name="evaluateUserId">
                                        <option value="">请选择评估员</option>
                                        <c:forEach items="${userList}" var="user">
                                            <option value="${user.id}"
                                            <c:if test="${user.id eq paramMap.evaluateUserId}">selected</c:if>
                                            >${user.userName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary search-btn btn-sm" onclick="searchSubmit()">搜索
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
                        <th style="width: 5%">部门</th>
                        <th style="width: 5%">新增二手车信贷专员</th>
                        <th style="width: 5%">录单信贷专员</th>
                        <th style="width: 3%">客户姓名</th>
                        <th style="width: 6%">评估员</th>
                        <th style="width: 6%">订单编号</th>
                        <th style="width: 6%">车型</th>
                        <th style="width: 8%">车架号</th>
                        <th style="width: 5%">行驶里数(万公里)</th>
                        <th style="width: 6%">初始登记日期</th>
                        <th style="width: 8%">贷款银行</th>
                        <th style="width: 6%">评估报告价格(元)</th>
                        <th style="width: 5%">初始评估价(元)</th>
                        <th style="width: 5%">车300评估价(元)</th>
                        <th style="width: 6%">报告状态</th>
                        <th style="width: 6%">评估时间</th>
                        <th style="width: 6%">报告完成时间</th>
                        <th style="width: 8%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="20">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="assessReportManage_input"
                                       value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel">${item.depName}</td>
                            <td class="cel">${item.submitEvaluateUserName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.buyerName}</td>
                            <td class="cel">${item.evaluateUser}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel">${item.vin}</td>
                            <td class="cel">${item.miles}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.initRegisterDate}" pattern="yyyy-MM-dd "/>
                            </td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">
                                <sl:format type="number" show="${item.evaluateReportPrice}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <sl:format type="number" show="${item.initEvaluatePrice}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <sl:format type="number" show="${item.evaluate300Price}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <c:if test="${item.paperEvaluateReportPrintStatus ==0}">未完成</c:if>
                                <c:if test="${item.paperEvaluateReportPrintStatus ==1}">已完成</c:if>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.evaluateTime}" pattern="yyyy-MM-dd HH:mm "/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.evaluateCompleteTime}" pattern="yyyy-MM-dd HH:mm "/>
                            </td>
                             <td class="btn-cel">
                                <shiro:hasPermission name="assessReportManage:toLookFor">
                                    <a title="查看" class="btn btn-info btn-xs detail" data-id="${item.id}">
                                        <i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="assessReportManage:finishStatus">
                                    <a title="报告状态" class="btn btn-success btn-xs"
                                    <c:if test="${item.paperEvaluateReportPrintStatus ==1}">style="display:none;"</c:if>
                                    onclick="unFinishInfo('${item.id}')">
                                    <i class="fa fa-edit">已完成</i></a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="assessReportManage:finishStatus">
                                    <a title="报告状态" class="btn btn-success btn-xs"
                                    <c:if test="${item.paperEvaluateReportPrintStatus ==0}">style="display:none;"</c:if>
                                    onclick="finishInfo('${item.id}')">
                                    <i class="fa fa-edit">未完成</i></a>
                                </shiro:hasPermission>

                                <input type="hidden" id="businessOrderAcceptId" value="${item.businessOrderAcceptId}">
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
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/secondCar/assessReportManage.js"></script>
</html>