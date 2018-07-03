<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>打款复核</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="feeCheckStatus" value="${paramMap.feeCheckStatus}"/>
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="depId" value="${paramMap.departmentId}"/>
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="orderNumber" value="${paramMap.orderNumber}"/>
    </div>
    <form id="pagerForm" action="${ctx}/newFinancial/queryForCasCheck.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <%-- <c:if test="${paramMap.feeCheckStatus == 0}">
                    <shiro:hasPermission name="financial:casCheckSeat">
                        <a class="btn btn-primary btn-sm change-audit-btn">换审核</a>
                    </shiro:hasPermission>
                </c:if> --%>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10 text-right padding-r-6">
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-bank" name="bankId">
                                        <option value="">请选择</option>
                                        <c:forEach var="bankentity" items="${bankentity}" varStatus="dp">
                                            <c:choose>
                                                <c:when test="${null == paramMap.bankId}">
                                                    <option value="${bankentity.id}">${bankentity.bankName}</option>
                                                </c:when>
                                                <c:when test="${paramMap.bankId == bankentity.id}">
                                                    <option selected="selected" value="${bankentity.id}">${bankentity.bankName}</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="${bankentity.id}">${bankentity.bankName}</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <%-- <div class="form-group">
                              <label class="col-xs-3 control-label">订单编号:</label>
                                  <div class="col-xs-8">
                                      <input id="search-orderNumber" type="text" class="form-control" placeholder="请输入订单号" name="orderNumber" value="${paramMap.orderNumber}" onkeyup="value=value.replace(/\s/g,'')">
                                  </div>
                             </div>  --%>

                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">复核状态:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-style" name="feeCheckStatus">
                                        <option value="-1" <c:if test="${paramMap.feeCheckStatus == -1}">selected</c:if>>全部</option>
                                        <option value="0" <c:if test="${paramMap.feeCheckStatus == 0}">selected</c:if>>未复核</option>
                                        <option value="1" <c:if test="${paramMap.feeCheckStatus == 1}">selected</c:if>>已复核</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-deparment-name" name="depId">
                                        <option value="">请选择</option>
                                        <c:forEach var="department" items="${departments}" varStatus="dp">
                                            <c:choose>
                                                <c:when test="${null == paramMap.departmentId}">
                                                    <option value="${department.id}">${department.name}</option>
                                                </c:when>
                                                <c:when test="${paramMap.departmentId == department.id}">
                                                    <option selected="selected" value="${department.id}">${department.name}</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="${department.id}">${department.name}</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <!-- <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th> -->
                    <th style="width:2%;">序号</th>
                    <%-- <c:if test="${paramMap.feeCheckStatus == 0}">
                    <th style="width:3%;">占位</th>
                    </c:if> --%>
                    <th style="width:12%;">订单编号</th>
                    <th style="width:8%;">客户名称</th>
                    <th style="width:5%;">信贷专员</th>
                    <th style="width:10%;">部门</th>
                    <th style="width:13%;">贷款银行</th>
                    <th style="width:7%;">订单状态</th>
                    <th style="width:8%;">贷款金额(元)</th>
                    <th style="width:7%;">公司垫款日期</th>
                    <th style="width:7%;">打款复核时间</th>
                    <th style="width:8%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                <tr>
                    <td class="col-td" colspan="11">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                        <%-- <td><input type="checkbox" name="auditCheckbox" class="checkOne" value="${item.id}"></td> --%>
                    <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <%-- <c:if test="${paramMap.feeCheckStatus == 0}">
                        <td class="cel used">
                            <c:if test="${not empty item.operationingLoginName}">
                                <code>${item.operationingLoginName}</code>
                            </c:if>
                        </td>
                        </c:if> --%>
                    <td class="cel">${item.orderNo}</td>
                    <td class="cel max-120">${item.realName}</td>
                    <td class="cel">${item.creditPerson}</td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel">${item.orderStatusName}</td>
                    <td class="cel">
                        <fmt:formatNumber value="${item.actualLoadMoney}" pattern="#,#00.0#"/>
                    </td>
                    <td class="cel">
                        <fmt:formatDate value="${item.advanceMoneyDate}" pattern="yyyy-MM-dd"/>
                    </td>
                    <td class="cel">
                        <fmt:formatDate value="${item.advanceTime}" pattern="yyyy-MM-dd HH:mm"/>
                    </td>
                    <td class="btn-cel">
                        <c:if test="${item.feeCheckStatus<1}">
                            <shiro:hasPermission name="review:payment">
                                <a data-id="${item.id}" data-title="${item.realName}" data-from="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}&active=playMoney"
                                   class="btn btn-success btn-xs casCheck-detail"><i class="fa fa-search-plus"></i>打款复核</a>
                            </shiro:hasPermission>
                        </c:if>
                        <shiro:hasPermission name="order:view">
                            <a data-id="${item.id}" data-title="${item.realName}" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}&active=playMoney"
                               class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                        </shiro:hasPermission>

                    </td>
                </tr>
                </c:forEach>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
        <%-- end table-responsive --%>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newFinance/principalCasCheckList.js"></script>
</html>
