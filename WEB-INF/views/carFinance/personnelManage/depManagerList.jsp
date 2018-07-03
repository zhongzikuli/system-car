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
        <input  type="hidden" name="depManager" value="${paramMap.depManager}">
        <input  type="hidden" name="department" value="${paramMap.department}">
        <input  type="hidden" name="dumpOut" value="${paramMap.dumpOut}">
    </div>
    <form id="pagerForm" action="${ctx}/departmentDumpOutCheck/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
              <shiro:hasPermission name="departmentDumpOutCheck:exportInfo">
                <a data-toggle="modal" class="btn btn-primary btn-sm exportInfo" >导出</a>
              </shiro:hasPermission>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>

            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">部门经理:</label>
                        <select class="form-control" id="search-select1" name="depManager" data-placeholder="部门经理...">
                            <option value="">请选择部门经理</option>
                            <c:forEach items="${userInfo}" var="user">
                                <option value="${user.id}"
                                        <c:if test="${user.id eq paramMap.depManager}">selected</c:if>>${user.userName}
                                </option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">部门:</label>
                        <select class="form-control" id="search-select2" name="department" data-placeholder="部门...">
                            <option value="">请选择部门</option>
                            <c:forEach items="${departmentNames}" var="names">
                                <option value="${names.id}"
                                        <c:if test="${names.id eq paramMap.department}">selected</c:if>>${names.name}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label" >淘汰提醒:</label>
                        <select class="form-control" id="search-select3" name="dumpOut">
                            <option value="">全部</option>
                            <option value="1" <c:if test="${paramMap.dumpOut =='1'}">selected</c:if>>是</option>
                            <option value="0" <c:if test="${paramMap.dumpOut =='0'}">selected</c:if>>否</option>
                        </select>
                    </div>
                    <div class="form-group">
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
                    <th style="width:2%"><input type="checkbox" class="checkAll"></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">部门经理</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:8%;">部门成立月份</th>
                    <th style="width:8%;">部门经理日期</th>
                    <th style="width:5%;">淘汰提醒</th>
                    <th style="width:5%;">起始日期</th>
                    <th style="width:10%;">连续第一个月部门贷款额</th>
                    <th style="width:10%;">连续第一个月业务员数</th>
                    <th style="width:10%;">连续第一个月人均贷款额(元)</th>
                    <th style="width:5%;">连续第二个月部门贷款额</th>
                    <th style="width:5%;">连续第二个月业务员数</th>
                    <th style="width:10%;">连续第二个月人均贷款额(元)</th>
                    <th style="width:5%;">连续第三个月部门贷款额</th>
                    <th style="width:5%;">连续第三个月业务员数</th>
                    <th style="width:10%;">连续第三个月人均贷款额(元)</th>
                    <th style="width:10%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="18">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="departmentDumpOutCheck" value="${item.departmentManagerId}"></td>
                        <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td >${item.realname}</td>
                        <td >${item.depName}</td>
                        <td >
                            <fmt:formatDate value="${item.establishDate}" pattern="yyyy-MM-dd"/></td>
                        <td >
                            <fmt:formatDate value="${item.departmentManagerBeginDate}" pattern="yyyy-MM-dd"/></td>
                        <td >
                             <c:if test="${item.dumpOut ==1}">
                                  是
                             </c:if>
                            <c:if test="${item.dumpOut ==0}">
                                  否
                            </c:if>
                        </td>
                        <td >
                            <fmt:formatDate value="${item.beginDate}" pattern="yyyy-MM-dd"/></td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney1}" pattern="#,##0.00"/></td>
                        <td >${item.saleNum1}</td>
                        <td >
                            <sl:format type="number" show="${item.moneyAvg1}" pattern="#,##0.00"/></td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney2}" pattern="#,##0.00"/></td>
                        <td >${item.saleNum2}</td>
                        <td >
                            <sl:format type="number" show="${item.moneyAvg2}" pattern="#,##0.00"/></td>
                        <td >
                            <sl:format type="number" show="${item.orderMoney3}" pattern="#,##0.00"/></td>
                        <td >${item.saleNum3}</td>
                        <td >
                            <sl:format type="number" show="${item.moneyAvg3}" pattern="#,##0.00"/></td>
                        <td>
                            <shiro:hasPermission name="departmentDumpOutCheck:detail">
                            <a href="#" data-id="${item.departmentManagerId}" data-dep="${item.depName}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                            </shiro:hasPermission>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/personnelManage/depManagerList.js"></script>
</html>
