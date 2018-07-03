<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>经销商管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
  <div class="mod_header">
      <div id="hiddenForm">
          <input type="hidden" name="dealerName" value="${paramMap.dealerName}"/>
          <input type="hidden" name="departmentId" value="${paramMap.departmentId}"/>
      </div>

      <form id="pagerForm" action="${ctx}/dealerManage/query.action" method="post" style="margin:0;">
          <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
          <div class="row">
              <div class="col-sm-3">
                      <shiro:hasPermission name="dealerManage:add">
                      <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="createDealerManage()">新增</a>
                      </shiro:hasPermission>
                      <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteDealerManage()">删除</a>
                  <shiro:hasPermission name="dealerManage:exportExcel">
                      <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportExcel()">下载模版</a>
                  </shiro:hasPermission>
                  <shiro:hasPermission name="dealerManage:importExcel">
                      <a data-toggle="modal" class="btn btn-success btn-sm" onclick="importExcel()">导入</a>
                  </shiro:hasPermission>
              </div>
              <div class="col-sm-9">
                  <div class="form-inline">
                      <div class="form-group">
                          <label class="control-label label">所属部门:</label>
                          <select class="form-control" id="search-select" name="departmentId" data-placeholder="部门...">
                              <option value="">请选择部门</option>
                                  <c:forEach items="${departmentNames}" var="names">
                                      <option value="${names.id}"
                                            <c:if test="${names.id eq paramMap.departmentId}">selected</c:if>>${names.name}</option>    
                                      </c:forEach>
                          </select>
                      </div>
                      <div class="form-group">
                          <label class="control-label label">经销商名称:</label>
                          <input type="text" class="form-control" name="dealerName" id="dealerName" value="${paramMap.dealerName}">
                          <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                              <th style="width:2%;"><input type="checkbox" class="checkAll" ></th>
                              <th style="width:7%;">经销商名称</th>
                              <th style="width:8%;">简称</th>
                              <th style="width:8%;">地址</th>
                              <th style="width:6%;">联系电话</th>
                              <th style="width:6%;">传真</th>
                              <th style="width:5%;">银行</th>
                              <th style="width:7%;">银行账户</th>
                              <th style="width:6%;">税号</th>
                              <th style="width:6%;">部门名称</th>
                              <th style="width:6%;">操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                              <tr>
                                  <td class="col-td" colspan="12">暂无数据</td>
                              </tr>
                          </c:if>
                          <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                            <tr>
                              <td><input type="checkbox" class="checkOne" name="carDealer_input" value="${item.id}"></td>
                              <td class="cel">${item.dealerName}</td>
                              <td class="cel">${item.shortName}</td>
                              <td class="cel">${item.address}</td>
                              <td class="cel">${item.tel}</td>
                              <td class="cel">${item.fax}</td>
                              <td class="cel">${item.bankName}</td>
                              <td class="cel">${item.bankAccount}</td>
                              <td class="cel">${item.taxNo}</td>
                              <td class="cel">${item.departmentName}</td>
                               <td class="btn-cel">
                              <shiro:hasPermission name="dealerManage:preUpdate">
                                     <a data-toggle="modal" class="btn btn-primary btn-xs"
                                     onclick="editCarDealer('${item.id}','${paramMap.dealerName}','${paramMap.departmentId}')"><i class="fa fa-edit"></i>编辑</a>
                                     </shiro:hasPermission>
                                
                                  <shiro:hasPermission name="dealerManage:preDetail">
                                     <a data-toggle="modal" class="btn btn-info btn-xs detail"
                                     onclick="detailCarDealer('${item.id}')"><i class="fa fa-search-plus"></i>查看</a>
                                     </shiro:hasPermission>

                                   <a href="#"  class="btn btn-primary btn-xs start"  data-id="${item.id}"
                                        <c:if test="${item.forbidden ==0}">
                                               style="display:none;"
                                        </c:if>>
                                       <i class="fa fa-edit"></i>启用</a>
                                   <a href="#"  class="btn btn-danger btn-xs stop"  data-id="${item.id}"
                                           <c:if test="${item.forbidden ==1}">
                                               style="display:none;"
                                           </c:if>>
                                       <i class="fa fa-edit"></i>禁用</a>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/other/dealerManage/dealerManage.js"></script>
<script type="text/template" title="导入经销商" id="excel-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="addUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>
</html>
