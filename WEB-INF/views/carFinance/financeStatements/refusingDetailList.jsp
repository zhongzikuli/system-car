<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>拒单统计报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="depName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}">
        
    </div>
    <form id="pagerForm" action="${ctx}/refusingDetailReport/queryForRefusingDetailReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-11 text-left">
          	<div class="form-inline">
	               <shiro:hasPermission name="financeStatements:exporRefusingDetailList">
	              		 <a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exportRefusingExcel()">导出</a>
				</shiro:hasPermission>
			
            </div>
          </div>
            <div class="col-sm-1 text-right">
               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                   	  <div class="col-sm-7">
	                    <div class="form-group" >
	                          <label class="col-xs-3 control-label">审核时间:</label>
	                          <div class="col-xs-8">
                                <div class="input-group">
									<input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" /> 
									<span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
								</div>
                          </div>
                        </div>
	                    <div class="form-group">
		                        <label class="col-xs-3 control-label">快捷搜索:</label>
			                        <div class="col-xs-8">
				                        <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
			                        </div>
                   	 	 </div> 
	                      
                    </div>
                   
                    <div class="col-sm-5">
                     	<div class="form-group">
                          <label class="col-xs-3 control-label">部门:</label>
	                        <div class="col-xs-8">
	                          <select class="form-control" id="search-deparment-name" name="depName">
	                            <option value="">请选择</option>
	                            <c:forEach var="department" items="${departments}" varStatus="dp">
	                                <c:choose>
	                                    <c:when test="${null == paramMap.departmentName}">
	                                        <option value="${department.name}">${department.name}</option>
	                                    </c:when>
	                                    <c:when test="${paramMap.departmentName == department.name}">
	                                        <option selected="selected" value="${department.name}">${department.name}</option>
	                                    </c:when>
	                                    <c:otherwise>
	                                        <option value="${department.name}">${department.name}</option>
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
                   		<th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:10%;">订单编号</th>
                        <th style="width:8%;">贷款人姓名</th>
                        <th style="width:8%;">贷款人身份证号</th>
                        <th style="width:8%;">信贷专员</th>
                        <th style="width:5%;">省份</th>
                        <th style="width:5%;">市</th>
                        <th style="width:5%;">部门名称</th>
                        <th style="width:5%;">贷款额(元)</th>
                        <th style="width:5%;">合同价(元)</th>
                        <th style="width:5%;">审核人</th>
                        <th style="width:12%;">审核备注</th>
                        <th style="width:10%;">审核时间</th>
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
                        	<td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel">${item.realName}</td>
                            <td class="cel">${item.cardNo}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.province}</td>
                            <td class="cel">${item.city}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel"> <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                            <td class="cel"> <sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                            <td class="cel">${item.auditName}</td>
                            <td title="${item.auditRemark}" style="max-width:100px">${item.auditRemark}</td>
                            <td class="cel"><fmt:formatDate value="${item.auditTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/refusingDetailList.js"></script>
</html>
