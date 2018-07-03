<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
 <div id="hiddenForm">
        <input  type="hidden" name="status" value="${paramMap.status}">
        <input  type="hidden" name="startTime" value="${paramMap.startDate}">
        <input  type="hidden" name="endTime" value="${paramMap.endDate}">
        <input  type="hidden" name="keyword" value="${paramMap.keyword}">
        <input  type="hidden" name="loanBank" value="${paramMap.loanBankId}">
        <input  type="hidden" name="carBrand" value="${paramMap.carBrand}">
    </div>
    <form id="pagerForm" action="${ctx}/secondCarEvaluate/list.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <a data-toggle="modal" class="btn btn-primary btn-sm addSecondCar">换评估</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm  deleteSecondCar">打包下载</a>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
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
                                        <option value="0" <c:if test="${'0' eq paramMap.status}">selected</c:if>>评估提交</option>
                                        <option value="1" <c:if test="${'1' eq paramMap.status}">selected</c:if>>评估完成</option>
                                        <option value="2" <c:if test="${'2' eq paramMap.status}">selected</c:if>>评估退回</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">提交评估时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="startTime"
                                               style="width:120px;"
                                               id="startTime" value="${paramMap.startDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="endTime"
                                               style="width:120px;"
                                               id="endTime" value="${paramMap.endDate}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input type="text" name="keyword" class="form-control"
                                           onkeyup="value=value.replace(/\s/g,'')"    placeholder="请输入车架号或里程数" id="keyword"
                                           value="${paramMap.keyword}">
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="loanBank" name="loanBank">
                                        <option value="">请选择银行</option>
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
                                    <input type="text" name="carBrand" class="form-control" placeholder="请输入车辆品牌" id="carBrand"
                                           value="${paramMap.carBrand}">
                                </div>
                            </div> --%>
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
                                <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                <table class="table table-hover table-height table-striped ">
                    <thead>
                    <tr>
                        <th style="width: 2%"><input type="checkbox" class="checkAll"></th>
                        <th style="width: 2%">序号</th>
                        <th style="width: 3%">占位</th>
                        <th style="width: 5%">评估状态</th>
                        <th style="width: 5%">评估员</th>
                        <th style="width: 5%">部门</th>
                        <th style="width: 5%">录单专员</th>
                        <th style="width: 5%">新增二手车专员</th>
                        <th style="width: 3%">客户姓名</th>
                        <th style="width: 6%">订单编号</th>
                        <th style="width: 6%">车型</th>
                        <th style="width: 8%">车架号</th>
                        <th style="width: 5%">行驶里数(万公里)</th>
                        <th style="width: 6%">初始登记日期</th>
                        <th style="width: 8%">贷款银行</th>
                        <th style="width: 6%">地区</th>
                        <th style="width: 5%">初始评估价(元)</th>
                        <th style="width: 5%">车三百评估价(元)</th>
                        <th style="width: 6%">提交评估时间</th>
                        <th style="width: 6%">评估时间</th>
                        <th style="width: 6%">有效截止日期</th>
                        <th style="width: 6%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="24">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="secondCar_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel">${item.operationingLoginName}</td>
                            <td class="cel">
                                <c:if test="${item.status==0}"><code class="alert-info">评估提交</code></c:if>
                                <c:if test="${item.status==1}"><code class="alert-success">评估完成</code></c:if>
                                <c:if test="${item.status==2}"><code class="alert-warning">评估退回</code></c:if>
                            </td>
                            <td class="cel">${item.evaluateUser}</td>
                            <td class="cel">${item.depName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.submitEvaluateUserName}</td>

                            <td class="cel">${item.buyerName}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">${item.brandName}</td>
                            <td class="cel">${item.vin}</td>
                            <td class="cel">${item.miles}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.initRegisterDate}" pattern="yyyy-MM-dd "/>
                            </td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.province}${item.city}</td>

                            <td class="cel"> <sl:format type="number" show="${item.initEvaluatePrice}" pattern="#,##0.00"/></td>
                            <td class="cel"><sl:format type="number" show="${item.evaluate300Price}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                                <fmt:formatDate value="${item.evaluateTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                                <sl:format type="date" show="${item.validDate}" pattern="yyyy-MM-dd"/>
                            </td>
                             <td class="btn-cel">
                            <c:if test="${(item.businessOrderAcceptId ==null ||item.orderStatus< 3 ) &&( item.evaluateUserId eq userId || item.evaluateUserId ==null )&& (item.status!=2) }">
                                <shiro:hasPermission name="secondCarEvaluate:createSecondCarEvaluate">
                                	<a title="评估" class="btn btn-primary btn-xs" onclick="preSecondCarEvaluate('${item.id}')">
                                    	<i class="fa fa-edit">评估</i>
                                    </a>
                                </shiro:hasPermission>
                             </c:if>
                                <a title="评估" class="btn btn-info btn-xs"
                                   onclick="viewSecondCarEvaluate('${item.id}')">
                                    <i class="fa fa-search-plus">查看</i></a>
                                 <c:if test="${item.validDate > now && item.status==1}">
                                     <shiro:hasPermission name="secondCarEvaluate:overdue">
                                 		<a href="#" onclick="overdueSecondCar('${item.id}')" class="btn btn-danger btn-xs" > <i class="fa fa-arrow-down">过期</i></a>
                                     </shiro:hasPermission>
                                 </c:if>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/secondCar/SecondCarList.js"></script>
</html>