<%@ taglib prefix="slt" uri="/slt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="isreceive" value="${paramMap.isreceive}">
        <input  type="hidden" name="departmentId" value="${paramMap.departmentId}">
        <input  type="hidden" name="receiveStartTime" value="${paramMap.receiveStartTime}">
        <input  type="hidden" name="receiveEndTime" value="${paramMap.receiveEndTime}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">
    </div>
    <form id="pagerForm" action="${ctx}/contractReceive/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
        <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="contractReceive:exportOut">
                <a data-toggle="modal" class="btn btn-primary btn-sm exportOut" >导出</a>
                </shiro:hasPermission>

                <shiro:hasPermission name="contractReceive:exportIn">
                <a data-toggle="modal" class="btn btn-warning btn-sm exportIn" >导入</a>
                </shiro:hasPermission>
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">收到状态:</label>
                        <select class="form-control" id="search-select" name="isreceive" >
                            <option value="" <c:if test="${paramMap.isreceive == ''}">selected</c:if>>未收到</option>
                            <option value="0" <c:if test="${paramMap.isreceive == '0'}">selected</c:if>>全部</option>
                            <option value="1" <c:if test="${paramMap.isreceive == '1'}">selected</c:if>>已收到</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">部门:</label>
                            <select class="form-control" id="departmentId" name="departmentId">
                                <option value="">请选择部门</option>
                                <c:forEach items="${departmentNames}" var="department">
                                    <option value="${department.id}"
                                            <c:if test="${department.id eq paramMap.departmentId}">selected</c:if>
                                    >${department.name}</option>
                                </c:forEach>
                            </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">收到日期:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="receiveStartTime"
                                   id="sTime" value="${paramMap.receiveStartTime}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="receiveEndTime"
                                   id="eTime" value="${paramMap.receiveEndTime}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷查询:</label>
                        <input type="text" name="nameOrId" class="form-control w-200" onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="请输入客户姓名或身份证号或订单编号" id="nameOrId" value="${paramMap.nameOrId}">
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
                    <th style="width:2%;"><input type="checkbox" class="checkAll" ></th>
                    <th style="width: 2%">序号</th>
                    <th style="width: 12%">订单编号</th>
                    <th style="width: 5%">客户名称</th>
                    <th style="width: 5%">信贷专员</th>
                    <th style="width: 12%">部门</th>
                    <th style="width: 10%">贷款银行</th>
                    <th style="width: 12%">贷款金额</th>
                    <th style="width: 8%">状态</th>
                    <th style="width: 8%">单证送交银行日期</th>
                    <th style="width: 5%">收到日期</th>
                    <th style="width: 8%">操作</th>
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
                        <td><input type="checkbox" class="checkOne" name="contractReceive" value="${item.id}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">${item.orderNo}</td>
                        <td class="cel max-120">${item.realName}</td>
                        <td class="cel">${item.creditPerson}</td>
                        <td class="cel">${item.departmentName}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">
                            <slt:OrderStatus showValue="${item.orderStatus}"/></td>
                        <td class="cel">
                            <fmt:formatDate value="${item.teamDeliverContractDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="cel">
                            <fmt:formatDate value="${item.bankReceiveContractDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        <td class="btn-cel" style="min-width:120px;">
                            <shiro:hasPermission name="contractReceive:receiveInfo">
                            <a  data-id="${item.id}"  class="btn btn-primary btn-xs concartReceive"><i class="fa fa-search-plus"></i>收到</a>
                            </shiro:hasPermission>
                            <a  data-id="${item.id}" data-title="${item.realName }" data-href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/contractReceive/contractReceive.js"></script>
<script type="text/template" title="合同收到" id="concartReceive-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="concartReceiveForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>收到日期:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" check="validconcartReceive(this)" name="bankReceiveContractDate" id="bankReceiveContractDate">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注信息:</label>
                <div class="col-xs-8">
                    <textarea type="text" class="form-control" check="validconcartReceive(this)" id="bankReceiveContractRemark" name="bankReceiveContractRemark"
                    ></textarea>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="导入车型" id="import-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="importUploader"></div>
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