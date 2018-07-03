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
        <input  type="hidden" name="creditPerson" value="${paramMap.creditPerson}">
        <input  type="hidden" name="department" value="${paramMap.department}">
        <input  type="hidden" name="isRegular" value="${paramMap.isRegular}">
        <input  type="hidden" name="dumpOut" value="${paramMap.dumpOut}">
        <input  type="hidden" name="joinedStartDate" value="${paramMap.joinedStartDate}">
        <input  type="hidden" name="joinedEndDate" value="${paramMap.joinedEndDate}">
    </div>
    <form id="pagerForm" action="${ctx}/userDumpOutCheck/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
              <shiro:hasPermission name="userDumpOutCheck:exportInfo">
                <a data-toggle="modal" class="btn btn-primary btn-sm exportInfo" >导出</a>
              </shiro:hasPermission>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <a class="btn btn-primary btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">入职时间:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="joinedStartDate" style="width:120px;"
                                               id="joinedStartDate" value="${paramMap.joinedStartDate}"/>
                                        <span class="input-group-addon">到</span>
                                        <input type="text" class="form-control" name="joinedEndDate" style="width:120px;"
                                               id="joinedEndDate" value="${paramMap.joinedEndDate}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">信贷专员:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-select1" name="creditPerson">
                                        <option value="">请选择信贷专员</option>
                                        <c:forEach items="${userInfo}" var="user">
                                            <option value="${user.id}"
                                                    <c:if test="${user.id eq paramMap.creditPerson}">selected</c:if>>${user.userName}
                                            </option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-select2"  name="department" data-placeholder="部门...">
                                        <option value="">请选择部门</option>
                                        <c:forEach items="${departmentNames}" var="names">
                                            <option value="${names.id}"
                                                    <c:if test="${names.id eq paramMap.department}">selected</c:if>>${names.name}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">是否转正:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-select3" name="isRegular">
                                        <option value="">全部</option>
                                        <option value="1" <c:if test="${paramMap.isRegular =='1'}">selected</c:if>>是</option>
                                        <option value="0" <c:if test="${paramMap.isRegular =='0'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">淘汰提醒:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="search-select4" name="dumpOut">
                                        <option value="">全部</option>
                                        <option value="1" <c:if test="${paramMap.dumpOut =='1'}">selected</c:if>>是</option>
                                        <option value="0" <c:if test="${paramMap.dumpOut =='0'}">selected</c:if>>否</option>
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
            <table class="table table-hover table-height table-striped">
                <thead>
                <tr>
                    <th style="width:2%"><input type="checkbox" class="checkAll"></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">信贷专员</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:8%;">入职日期</th>
                    <th style="width:8%;">是否转正</th>
                    <th style="width:5%;">淘汰提醒</th>
                    <th style="width:5%;">起始日期</th>
                    <th style="width:10%;">连续第一个月订单(笔)</th>
                    <th style="width:10%;">连续第一个月贷款额(元)</th>
                    <th style="width:5%;">连续第二个月订单(笔)</th>
                    <th style="width:5%;">连续第二个月贷款额(元)</th>
                    <th style="width:5%;">连续第三个月订单(笔)</th>
                    <th style="width:5%;">连续第三个月贷款额(元)</th>
                    <th style="width:4%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="15">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="userDumpOutCheck" value="${item.userId}"></td>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.userName}</td>
                        <td >${item.departmentName}</td>
                        <td >
                            <fmt:formatDate value="${item.joinedDate}" pattern="yyyy-MM-dd"/></td>
                        <td >
                             <c:if test="${item.isRegular == '0'}">
                                否
                             </c:if>
                            <c:if test="${item.isRegular == '1'}">
                                是
                            </c:if>
                        </td>
                        <td >
                            <c:if test="${item.dumpOut == '0'}">
                                否
                            </c:if>
                            <c:if test="${item.dumpOut == '1'}">
                                是
                            </c:if></td>
                        <td >
                            <fmt:formatDate value="${item.beginDateNewest}" pattern="yyyy-MM-dd"/></td>

                        <td >${item.orderNum1}</td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney1}" pattern="#,##0.00"/></td>
                        <td >${item.orderNum2}</td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney2}" pattern="#,##0.00"/></td>
                        <td >${item.orderNum3}</td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney3}" pattern="#,##0.00"/></td>
                        <td >
                        <shiro:hasPermission name="userDumpOutCheck:detail">
                          <a title="查看" data-id="${item.userId}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                        </shiro:hasPermission>
                        </td >
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/personnelManage/creditPersonList.js"></script>
</html>
