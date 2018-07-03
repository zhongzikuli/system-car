<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>视频资料审核</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>

</head>
<body>
<div class="mod_header">
	<div id="hiddenForm">
		<input type="hidden" name="auditFlag" value="${paramMap.auditFlag}">
		<input type="hidden" name="depId" value="${paramMap.departmentId}">
		<input type="hidden" name="keyword" value="${paramMap.keyword}">
	</div>
    <form id="pagerForm" action="${ctx}/cfVideoSubmit/queryForAudit.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-5">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-7">
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                	<div class="row">
            			<div class="col-sm-6">
            				<div class="form-group">
		                        <label class="col-xs-4 control-label">审核状态:</label>
		                        <div class="col-xs-8">
			                        <select class="form-control" id="search-audit-status" name="auditFlag">
			                            <option value="">全部</option>
			                            <option value="0"
			                            <c:if test="${paramMap.auditFlag == 0}"> selected="selected"</c:if>
			                            >未审核</option>
			                            <option value="1"
			                            <c:if test="${paramMap.auditFlag == 1}"> selected="selected"</c:if>
			                            >已审核</option>
			                        </select>
			                    </div>
		                    </div>
		                    
		                     <%-- 只有公司级与单位管理员可以进行部门搜索 --%>
		                    <c:if test="${userLevel == 2 or userLevel == 3}">
		                        <div class="form-group">
		                            <label class="col-xs-4 control-label">部门:</label>
		                            <div class="col-xs-8">
										<select class="form-control" id="search-select-department" name="depId">
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
		                    </c:if>
            				
            			</div>
            			<div class="col-sm-6">
            				<div class="form-group">
		                        <label class="col-xs-3 control-label">快捷搜索:</label>
		                        <div class="col-xs-8">
		                        	<input id="keyword" type="text" class="form-control" placeholder="支持客户姓名、身份证号、订单编号" name="keyword" value="${paramMap.keyword}">
		                        </div>		 
		                    </div>
		                     <div class="form-group group-btn">
		                        <button type="button" class="btn  btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索</button>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:7%;">订单编号</th>
                        <th style="width:7%;">客户名称</th>
                        <th style="width:7%;">信贷专员</th>
                        <th style="width:7%;">部门</th>
                        <th style="width:7%;">贷款银行</th>
                        <th style="width:7%;">经销商</th>
                        <th style="width:7%;">贷款金额(元)</th>
                        <th style="width:7%;">车型</th>
                        <th style="width:7%;">车辆年限</th>
                        <th style="width:7%;">订单状态</th>
                        <th style="width:7%;">候补资料</th>
                        <th style="width:7%;">齐全审核</th>
                        <th style="width:7%;">齐全视频提交时间</th>
                        <th style="width:7%;">齐全视频审核时间</th>
                        <th style="width:7%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="17">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" name="auditCheckbox" class="checkOne" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.realName}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departmentName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel">
                                <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                            </td>
                            <td class="cel">
                            	<c:if test="${item.newOrOld eq 1}">
                            		新车
                            	</c:if>
                            	<c:if test="${item.newOrOld eq 0}">
                            		二手车
                            	</c:if>
                            </td>
                            <td class="cel">
								<c:if test="${item.newOrOld eq 1}">
                            		--
                            	</c:if>
								<c:if test="${item.newOrOld eq 0}">
                            		${item.yearLimit}
                            	</c:if>
							</td>
                            <td class="cel">${item.orderStatuName}</td>
                            <td class="cel">
                            	<c:if test="${item.isWaitingFile eq 1}">
                            		<code class="alert-success">是</code>
                            	</c:if>
                            	<c:if test="${item.isWaitingFile eq 0}">
                            		否
                            	</c:if>
							</td>
                            <td class="cel">
                                <c:if test='${item.auditStatusName.trim() eq "默认" }'>
                                	<code class="alert-info">审核中</code>
                                </c:if>
                                <c:if test='${item.auditStatusName.trim() eq "退回" }'>
                                    <code class="alert-warning">${item.auditStatusName}</code></c:if>
                                <c:if test='${item.auditStatusName.trim() eq "通过" }'>
                                	<code class="alert-success">${item.auditStatusName}</code>
                                </c:if>
                                <c:if test='${item.auditStatusName.trim() != "默认" && item.auditStatusName.trim() != "退回" && item.auditStatusName.trim() != "通过" }'>
                                	<code class="alert-default">${item.auditStatusName }</code>
                                </c:if>
                            </td>
                            <td class="cel">
                                <sl:format type="date" show="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                            	<c:if test="${empty item.auditTime}">--</c:if>
                            	<c:if test="${not empty item.auditTime}">
	                                <sl:format type="date" show="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/>
                            	</c:if>
                            </td>
                            <td>
                                <c:if test="${item.auditStatus==1 }">
                                    <shiro:hasPermission name="videoComplete:audit">
                                        <a data-id="${item.id}" data-order="${item.businessOrderAcceptId}" data-title="${item.realName }" type="button" class="btn btn-w-m btn-xs btn-success audit-btn">审核</a>
                                    </shiro:hasPermission>
                                </c:if>
                                <shiro:hasPermission name="order:view">
                                    <a  data-id="${item.businessOrderAcceptId}" data-title="${item.realName }" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/template" title="审核信息" id="video-audit-dialog">
<div class="ibox-content">
	<form id="videoAuditForm" class="form-horizontal">
		<div class="form-group mr-none">
			<div class="col-sm-12">
				<label class="col-sm-3 control-label"><span class="red">*</span>审核意见:</label>
				<div class="col-sm-9">
					<textarea id="auditDescription" rows="6" class="form-control" check="validateLength100Bak(this)"  tip="长度不能超过100个字符" obj="not_null" value=""></textarea>
					<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">100</font></code>个</span>
				</div>
			</div>
		</div>
		<div class="form-group mr-none">
			<div class="col-sm-12">
				<label class="col-sm-3 control-label">审核人:</label>
				<div class="col-sm-3">
					<p class="form-control-static text-left">${auditUser}</p>
				</div>
				<label class="col-sm-3 control-label">审核日期:</label>
				<div class="col-sm-3">
					<p class="form-control-static text-left">${auditDate}</p>
				</div>
			</div>
		</div>
	</form>
	<div class="dialog-manage" id="CreateBtn">
		<a href="javascript:void(0);" type="button" data-index="2" class="btn btn-primary dialog-ok">确定</a>
		<a href="javascript:void(0);" type="button" data-index="-2" class="btn btn-danger dialog-back">退回</a>
		<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
	</div>
</div>
</script>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/videoList.js"></script>
</html>
