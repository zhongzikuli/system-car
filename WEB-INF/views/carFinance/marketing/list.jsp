<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/marketCost/query.action" method="post" style="margin-bottom: 0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>

        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="marketCost:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="marketCost:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
                </shiro:hasPermission>
            </div>

            <div class="col-sm-10">
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
                        <label class="control-label label">所属银行:</label>
                        <select class="form-control" id="search-style" name="bankId" data-placeholder="银行...">
                            <option value="">请选择银行</option>
                            <c:forEach items="${bankentity}" var="names">
                                <option value="${names.id}"
                                <c:if test="${names.id eq paramMap.bankId}">selected</c:if>>${names.bankName}</option>
                            </c:forEach>
                        </select>
                    	<button type="button" class="btn  btn-sm btn-primary" onclick="searchSubmit()">搜索</button>
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
                        <th style="width: 2%;"><input type="checkbox"
                                                      class="checkAll" name="checkedAll"></th>
                        <th style="width: 2%;">序号</th>
                        <th style="width: 12%;">部门</th>
                        <th style="width: 12%;">备注</th>
                        <th style="width: 15%;">银行</th>
                        <th style="width: 15%;">产品类型</th>
                        <th style="width: 15%;">贷款金额(元)</th>
                        <th style="width: 15%;">营销类型</th>
                        <th style="width: 15%;">浮动利率</th>
                        <th style="width: 15%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if
                            test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}"
                               varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne"
                                       name="market" value="${item.id}"></td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel">${item.department}</td>
                            <td class="cel">${item.remark}</td>
                            <td class="cel">${item.bank}</td>
                            <td class="cel">${item.product}</td>
                            <td class="cel">${item.money}</td>
                            <c:if test="${item.type =='1'}">
                                <td class="cel">产品</td>
                            </c:if>
                            <c:if test="${item.type =='2'}">
                                <td class="cel">银行</td>
                            </c:if>
                            <c:if test="${item.type =='3'}">
                                <td class="cel">贷款金额</td>
                            </c:if>
                            <td class="cel">${item.interestRate}</td>
                             <td><c:if
                                    test="${item.isvalid != 0}">
                                <shiro:hasPermission name="morket:morketUpdate">
                                    <a href="#"   data-id=${item.id}
                                       class="btn btn-primary market-btn"><i class="fa fa-edit"></i>编辑</a>
                                </shiro:hasPermission>
                            </c:if></td>
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
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/marketing/list.js"></script>
<script type="text/template" title="新增营销利率信息" id="marketCreate-dialog">
    <div class="ibox-content">
        <form id="appForm" class="form-horizontal">
            <div class="row" style="margin: 0;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>部门:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="部门不能为空">
                            <select class="form-control" id="department" name="departmentId"   data-placeholder="部门...">
                                <option value="">请选择部门</option>
                                <c:forEach items="${departmentNames}" var="names">
                                    <option value="${names.id}">${names.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>营销类型:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="营销类型不能为空">
                            <select class="form-control" id="market" name="market" data-placeholder="营销类型..." >
                                <option value="">请选择营销类型</option>
                                <option value="1">产品类型</option>
                                <option value="2">贷款银行</option>
                                <option value="3">贷款金额</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="banks" style="display:none">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="银行不能为空">
                            <select class="form-control" id="bank" name="bank" data-placeholder="银行...">
                                <option value="">请选择银行</option>
                                <c:forEach items="${bankentity}" var="names">
                                    <option value="${names.id}">${names.bankName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="prooducts" style="display:none">
                    <label class="col-xs-3 control-label"><span class="red">*</span>产品种类:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="产品种类不能为空">
                            <select class="form-control" id="prooduct" name="prooduct" data-placeholder="产品种类...">
                                <option value="">请选择产品类型</option>
                                <c:forEach items="${prooduct}" var="names">
                                    <option value="${names.id}">${names.productName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="moneys" style="display:none">
                    <label class="col-xs-3 control-label"><span class="red">*</span>贷款金额:</label>
                    <div class="col-xs-8">
                        <input type="text" class=" form-control" name="money" id="money"
                               tip="贷款金额不能为空" >
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>浮动利率(%):</label>
                    <div class="col-xs-8">
                        <input type="text" class=" form-control" name="interest" id="interest"
                               tip="浮动利率不能为空" value="">
                    </div>
                </div>

            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="修改营销利率信息" id="marketUpdate-dialog">
    <div class="ibox-content">
        <form id="marketForm" class="form-horizontal">
            <div class="row" style="margin: 0;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>营销类型:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="营销类型不能为空">
                            <select class="form-control" id="market" name="market" data-placeholder="营销类型..." >
                                <option value="">请选择营销类型</option>
                                <option value="1">产品类型</option>
                                <option value="2">贷款银行</option>
                                <option value="3">贷款金额</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="banks" style="display:none">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="银行不能为空">
                            <select class="form-control" id="bank" name="bank" data-placeholder="银行...">
                                <c:forEach items="${bankentity}" var="names">
                                    <option value="${names.id}"
                                    <c:if test="${names.id eq marketCost.bankId}">selected</c:if>>${names.bankName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="prooducts" style="display:none">
                    <label class="col-xs-3 control-label"><span class="red">*</span>产品种类:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="产品种类不能为空">
                            <select class="form-control" id="prooduct" name="prooduct" data-placeholder="产品种类...">
                                <c:forEach items="${prooduct}" var="names">
                                    <option value="${names.id}"
                                    <c:if test="${names.id eq marketCost.productId}">selected</c:if>>${names.productName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="moneys" style="display:none">
                    <label class="col-xs-3 control-label"><span class="red">*</span>贷款金额:</label>
                    <div class="col-xs-8">
                        <input type="text" class=" form-control" name="money" id="money"
                               tip="贷款金额不能为空" >
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>浮动利率(%):</label>
                    <div class="col-xs-8">
                        <input type="text" class=" form-control" name="interest" id="interest"
                               tip="浮动利率不能为空" value="">
                    </div>
                </div>

            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>