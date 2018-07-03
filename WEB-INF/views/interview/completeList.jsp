<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>完成列表报表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
        <input type="hidden" name="status" value="${paramMap.status}"/>
        
    </div>
    <form id="pagerForm" action="${ctx}/completeListReport/queryCompleteListReport.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
         <div class="col-sm-11  text-left">
         	<div class="form-inline">
             	<shiro:hasPermission name="completeListReport:exporCompleteList">
	                 <a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporIncomeExcel()">导出</a>
				</shiro:hasPermission>
            </div>
          </div>
           <div class="col-sm-1 text-right">
	               <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                   	  <div class="col-sm-7">
		                    <div class="form-group" id="date-time">
		                          <label class="col-xs-3 control-label">完成时间:</label>
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
					                        <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
				                        </div>
	                   	 	 </div> 
	                    </div>
	                   
	                    <div class="col-sm-5">
	                     	<div class="form-group">
	                          <label class="col-xs-3 control-label">面签状态:</label>
		                        <div class="col-xs-8">
		                          <select class="form-control" id="search-status" name="status">
		                            <option value="">请选择</option>
		                            <option value="3" <c:if test="${paramMap.status == 3}">	selected="selected" </c:if> > 通过</option>
		                            <option value="4" <c:if test="${paramMap.status == 4}"> selected="selected"</c:if> 	>退回</option>
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
                        <th style="width:8%;">贷款人姓名</th>
                        <th style="width:8%;">贷款人身份证号</th>
                        <th style="width:5%;">贷款人性别</th>
                        <th style="width:8%;">贷款人手机号</th>
                        <th style="width:8%;">配偶姓名</th>
                        <th style="width:8%;">配偶身份证号</th>
                        <th style="width:8%;">客户经理</th>
                        <th style="width:8%;">客户经理手机号</th>
                        <th style="width:8%;">车型</th>
                        <th style="width:8%;">申请分期金额(元)</th>
                        <th style="width:8%;">贷款期限(月)</th>
                        <th style="width:8%;">公司名</th>
                        <th style="width:5%;">审核员</th>
                        <th style="width:8%;">申请时间</th>
                        <th style="width:8%;">准备时间</th>
                        <th style="width:8%;">完成面签时间</th>
                        <th style="width:8%;">面签地点</th>
                        <th style="width:8%;">面签持续时间</th>
                        <th style="width:8%;">面签状态</th>
                        <th style="width:12%;">审核意见</th>
                        <th style="width:5%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="23">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                       		<td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.buyerName}</td>
                            <td class="cel">${item.buyerCardNo}</td>
                            <td class="cel">${item.sex}</td>
                            <td class="cel">${item.buyerTel}</td>
                            <td class="cel">${item.sharedName}</td>
                            <td class="cel">${item.sharedCardNo}</td>
                            <td class="cel">${item.managerName}</td>
                            <td class="cel">${item.managerTel}</td>
                            <td class="cel">${item.newOrOld}</td>
                            <td class="cel"><sl:format type="number" show="${item.installmentPayMoney}" pattern="#,##0.00"/></td>
                            <td class="cel">${item.loanPeriodMonth}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.auditName}</td>
                            <td class="cel"><fmt:formatDate value="${item.createTime}" pattern="yyyy-MM-dd HH:mm"/></td>
                            <td class="cel"><fmt:formatDate value="${item.readyTime}" pattern="yyyy-MM-dd HH:mm"/></td>
                            <td class="cel"><fmt:formatDate value="${item.finishTime}" pattern="yyyy-MM-dd HH:mm"/></td>
                            <td class="cel">${item.gps}</td>
                            <td class="cel">${item.durationStr}</td>
                            <td class="cel">${item.status}</td>
                            <td class="cel">${item.remark}</td>
                            <td class="cel">
	                            <shiro:hasPermission name="interview:view">
	                                    <a data-id="${item.id}"  data-title="${item.buyerName}" data-href="${ctx}/interview/detail.action?id=${item.id}&isInit=0"
	                                       class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
	                            </shiro:hasPermission>
                            </td>
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
<script type="text/javascript" src="${ctx}/js/mine/interview/completeList.js"></script>
</html>
