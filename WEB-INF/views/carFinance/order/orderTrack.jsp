<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
  <div class="mod_header">
      <div id="hiddenForm">
          <input type="hidden" name="acceptId" value="${acceptId}"/>
          <input type="hidden" name="startDate" value="${startDate}"/>
          <input type="hidden" name="endDate" value="${endDate}"/>
      </div>
          <form id="pagerForm" action="${ctx}/cfOrderTrack.action" method="post">
              <input type="hidden" name="acceptId" value="${acceptId}"/>
              <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
              <div class="row">
                  <div class="col-sm-2">
                      <div class="form-group">
                          <h5><strong>查看订单轨迹</strong></h5>
                      </div>
                  </div>
                  <div class="col-sm-10">
                      <div class="form-inline">
                          <div class="form-group" id="date-time">
                              <div class="form-group" id="orderTrack-start-date">
                                  <label class="control-label label">开始时间:</label>
                                  <input type="text" class="form-control" name="startDate" id="sTime" value="${startDate}">
                              </div>
                              <div class="form-group" id="orderTrack-end-date">
                                  <label class="control-label label">结束时间:</label>
                                  <input type="text" class="form-control" name="endDate" id="eTime" value="${endDate}">
                              </div>
                          </div>
                          <div class="form-group">
                              <button type="button" class="btn  btn-sm btn-primary" onclick="searchSubmit()">搜索</button>
                              <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
                                  <a class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
                              </c:if>
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
                              <th style="width:2%;">序号</th>
                              <th style="width:18%;">操作类型</th>
                              <th style="width:28%;">更新时间</th>
                              <th style="width:18%;">操作人</th>
                          </tr>
                      </thead>
                      <tbody>
                          <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                              <tr>
                                  <td class="col-td" colspan="4">暂无数据</td>
                              </tr>
                          </c:if>
                          <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                              <tr>
                              <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                              <td class="cel">${item.operatorType}</td>
                              <td class="cel"><sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.mtime}"/>
                              </td>
                              <td class="cel">${item.operatorPerson}</td>
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
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/orderTrack.js"></script>
</html>
