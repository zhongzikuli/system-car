<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="mortgageFileSubmitBankDate" value="${paramMap.mortgageFileSubmitBankDate}"/>
        <input type="hidden" name="bankPaymentDateStart" value="${paramMap.bankPaymentDateStart}"/>
        <input type="hidden" name="bankPaymentDateEnd" value="${paramMap.bankPaymentDateEnd}"/>
        <input type="hidden" name="departmentName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="isMortgageFileSubmitBank" value="${paramMap.isMortgageFileSubmitBank}"/>
        <input type="hidden" name="isMortgageFileDeliver" value="${paramMap.isMortgageFileDeliver}"/>
    </div>
    <form id="pagerForm" action="${ctx}/mortgageCondition/queryNew.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-8  text-left">
                  <shiro:hasPermission name="mortgageCondition:exportMortgageCondition">
                    	<a data-toggle="modal" class="btn btn-success  btn-sm exportMortgageCondition" >导出</a>
                  </shiro:hasPermission>
                   <shiro:hasPermission name="mortgageCondition:exportAllMortgageCondition">
                    	<a data-toggle="modal" class="btn btn-info  btn-sm exportAllMortgageCondition" >导出全部</a>
                    	<c:if test="${not empty downLoadPath}">
                    		<a href="${downLoadPath}" data-toggle="modal" class="btn btn-warning  btn-sm" >下载导出(${downLoadTime})</a>
                    	</c:if>
                   </shiro:hasPermission>
                   
                   
                <c:if test="${ not empty countEntity}">
                        <label class="alert-warning">贷款额(万元): </label>
                        <code class="alert-info"><sl:format type="number" show="${countEntity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
                </c:if>
                        <label class="alert-warning">总数: </label>
                        <code class="alert-info">${count}</code>
            </div>

            <div class="col-sm-4 text-right" >
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight gl_query">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group" >
                                <label class="col-xs-2 control-label" >抵押资料交银行日期:</label>
                                <div class="col-xs-4">
                                        <input type="text" name="mortgageFileSubmitBankDate" class="form-control"
                                               id="search-date" value="${paramMap.mortgageFileSubmitBankDate}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">部门:</label>
                                <div class="col-xs-4">
                                    <c:if test="${level>3}">
                                        <select class="form-control" id="search-deparment-name" name="departmentName">
                                            <option value="">请选择部门</option>
                                            <c:forEach items="${departments}" var="department">
                                                <option value="${department.departName}"
                                                        <c:if test="${department.departName eq paramMap.departmentName}">selected</c:if>
                                                >${department.departName}</option>
                                            </c:forEach>
                                        </select>
                                    </c:if>

                                    <c:if test="${level<=3}">
                                        <select class="form-control " id="search-deparment-name" name="departmentName">
                                            <option value="">请选择</option>
                                            <c:forEach items="${departments}" var="department">
                                                <option value="${department.name}"
                                                        <c:if test="${department.name eq paramMap.name}">selected</c:if>
                                                >${department.name}</option>
                                            </c:forEach>
                                        </select>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group" >
                                <label class="col-xs-2 control-label" >银行放款日期:</label>
                                <div class="col-xs-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="bankPaymentDateStart" id="search-start-date" value="${paramMap.bankPaymentDateStart}">
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="bankPaymentDateEnd" id="search-end-date" value="${paramMap.bankPaymentDateEnd}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">抵押资料交银行:</label>
                                <div class="col-xs-4">
                                    <select class="form-control" id="isMortgageFileSubmitBank" name="isMortgageFileSubmitBank">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.isMortgageFileSubmitBank == '1'}">selected</c:if>>是</option>
                                        <option value="2" <c:if test="${paramMap.isMortgageFileSubmitBank == '2'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-2 control-label">抵押资料寄网点日期:</label>
                                <div class="col-xs-4">
                                    <select class="form-control" id="isMortgageFileDeliver" name="isMortgageFileDeliver">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.isMortgageFileDeliver == '1'}">selected</c:if>>是</option>
                                        <option value="2" <c:if test="${paramMap.isMortgageFileDeliver == '2'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">快捷搜索:</label>
                                <div class="col-xs-4">
                                    <input type="text" name="nameOrId" class="form-control " onkeyup="value=value.replace(/\s/g,'')"
                                           placeholder="请输入客户姓名或身份证号或订单编号" id="nameOrId" value="${paramMap.nameOrId}">
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12">
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:2%;"><input type="checkbox" class="checkAll" ></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">订单号</th>
                    <th style="width:4%;">客户姓名</th>
                    <th style="width:8%;">身份证号</th>
                    <th style="width:6%;">产品类型</th>
                    <th style="width:4%;">业务员</th>
                    <th style="width:8%;">上级部门</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:8%;">贷款银行</th>
                    <th style="width:4%;">贷款额(元)</th>
                    <th style="width:4%;">合同价(元)</th>
                    <th style="width:4%;">客户费率</th>
                    <th style="width:4%;">车型</th>
                    <th style="width:8%;">上牌地</th>
                    <th style="width:8%;">车牌号</th>
                    <th style="width:8%;">机动车登记证书号</th>
                    <th style="width:8%;">贷记卡号</th>
                    <th style="width:4%;">车型构成</th>
                    <th style="width:6%;">抵押资料交银行日期</th>
                    <th style="width:6%;">未办理抵押原因</th>
                    <th style="width:6%;">抵押寄网点日期</th>
                    <th style="width:6%;">公司垫付日期</th>
                    <th style="width:6%;">银行放款日期</th>
                    <th style="width:5%;">经销商</th>
                    <th style="width:5%;">订单状态</th>
                    <th style="width:5%;">抵押资料上传日期</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="27">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="mortgageConditionInput" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel">${item.buyerRealName}</td>
                        <td class="cel">${item.buyerCardNo}</td>
                        <td class="cel">${item.productName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.parentDepName}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">${item.customerRate}</td>
                        <td class="cel">${item.brandName}</td>
                        <td class="cel">${item.carLicenseProvince}</td>
                        <td class="cel">${item.plateNumber}</td>
                        <td class="cel">${item.registerLicenseNo}</td>
                        <td class="cel">${item.bankCardNo}</td>
                        <td class="cel">
                                <c:if test="${item.newOrOld==1}">
									新车
                                </c:if>
                                <c:if test="${item.newOrOld==0}">
									二手车
                                </c:if>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageFileSubmitBankDate}" pattern="yyyy-MM-dd HH:mm"/></td>
                        <td title="${item.noMortgageReason}" class="cel">${item.noMortgageReason}</td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageFileDeliverDate}" pattern="yyyy-MM-dd "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd  "/></td>
                        <td class="cel">${item.dealerName}</td>
                        <td class="cel">
                            <sl:OrderStatus showValue="${item.orderStatus}"/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.mortgageSubmitTime}" pattern="yyyy-MM-dd  "/>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/documentStatements/mortgageConditionList.js"></script>
</html>
