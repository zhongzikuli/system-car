<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>银行利率管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
<div id="hiddenForm">
        <input type="hidden" name="bankId" value="${bankId}"/>
        <input type="hidden" name="cfProductId" value="${cfProductId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/bankRate/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="createBankRate()">新增</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteBankRate()">删除</a>
            </div>
            <div class="col-sm-10">
            <div class="form-inline">
               <div class="form-group">
                    <label class="control-label label">银行:</label>
                        <select name="bankId" id="bank-type"  class="form-control type bankStatus"   data-placeholder="银行类型...">
                            <option value="">请选择</option>
                            <c:forEach items="${banks}" var="bank" >
                                <option value="${bank.id}"
                                <c:if test="${bank.id eq bankId}">selected</c:if>
                                >${bank.bankName}</option>
                            </c:forEach>
                        </select>
                </div>
                <div class="form-group">
                    <label class="control-label label">产品类型:</label>
                        <select name="cfProductId" id="product-type" class="form-control type status"  >
                            <option value="">请选择</option>
                            <c:forEach items="${products}" var="product" >
                                <option value="${product.id}"
                                <c:if test="${product.id eq cfProductId}">selected</c:if>
                                >${product.productName}</option>
                            </c:forEach>
                        </select>
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
                <table class="table table-hover table-height table-striped table-bank">
                    <thead>
	                    <tr>
	                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
	                        <th style="width:2%;">序号</th>
	                        <th style="width:9%;">银行名称</th>
	                        <th style="width:4%;">产品类型</th>
	                        <th style="width:2%;">年限</th>
	                        <th style="width:6%;">省内利率(%)<br>新车二手车</th>
	                        <th style="width:6%;">省外利率(%)<br>新车二手车</th>
	                        <th style="width:7%;">省内省外新车<br>实际贷款比例上限(%)</th>
	                        <th style="width:7%;">省内省外二手车<br>实际贷款比例上限(%)</th>
	                        <th style="width:7%;">省内省外新车<br>分期付款总额比例(%)</th>
	                        <th style="width:7%;">省内省外二手车<br>分期付款总额比例(%)</th>
	                        <th style="width:7%;">省内省外新车<br>合同价比例上限(%)</th>
	                        <th style="width:6%;">省内省外二手车<br>合同价比例上限(%)</th>
	                        <th style="width:6%;">省内银行产品代码<br>新车二手车</th>
	                        <th style="width:7%;">省外银行产品代码<br>新车二手车</th>
	                        <th style="width:10%;"class="min-116">操作</th>
	                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="20">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td>
                                <input type="checkbox" class="checkOne" name="bankList_input" value="${item.id}">
                            </td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel" >
                                <c:forEach items="${banks}" var="bank">
                                    <c:if test="${bank.id eq item.bankId}">
                                        ${bank.bankName}
                                    </c:if>
                                </c:forEach>
                            </td>
                            <td class="cel">
                                <c:forEach items="${products }" var="product">
                                    <c:if test="${product.id eq item.cfProductId}">
                                         ${product.productName}
                                    </c:if>
                                </c:forEach> 
                            </td>
                            <td class="cel">
                                <c:forEach items="${years }" var="type">
                                    <c:if test="${type.keyWorld eq item.yearsCode}">
                                        ${type.valueDesc}
                                    </c:if>
                                </c:forEach>
                            </td>
                            <td class="cel">
                                新车:${item.provinceInNewCarRate}<br>
                                二手车:${item.provinceInOldCarRate}
                            </td>
                            <td class="cel">
                                新车:${item.provinceOutNewCarRate}<br>
                                二手车:${item.provinceOutOldCarRate}
                            </td>
                            <td class="cel">
                                省内:${item.provinceInOldCarLoanRatioUp}<br>
                                省外:${item.provinceOutOldCarLoanRatioUp}
                            </td>
                            <td class="cel">
                                省内:${item.provinceInOldInstalmentTotalUp}<br>
                                省外:${item.provinceOutOldInstalmentTotalUp}
                            </td>
                            <td class="cel">
                                省内:${item.provinceInNewInstalmentTotalUp}<br>
                                省外:${item.provinceOutNewInstalmentTotalUp}<br>
                            </td>
                            <td class="cel">
                                省内:${item.provinceInOldInstalmentTotalUp}<br>
                                省外:${item.provinceOutOldInstalmentTotalUp}
                            </td>
                            <td class="cel">
                                省内:${item.provinceInNewContractRatioUp}<br>
                                省外:${item.provinceOutNewContractRatioUp}
                            </td>
                            <td class="cel">
                                省内:${item.provinceInOldContractRatioUp}<br>
                                省外:${item.provinceOutOldContractRatioUp}
                            </td>
                            <td class="cel">
                                新车:${item.provinceInNewCarCode}<br>
                                二手车:${item.provinceInOldCarCode}
                            </td>
                            <td class="cel">
                                新车:${item.provinceOutNewCarCode}<br>
                                二手车:${item.provinceOutOldCarCode}
                            </td>
                            <td>
                                <c:if test="${item.isvalid != 0}">
                                    <a href="#" onclick="editBankRate('${item.id}')" class="btn btn-primary btn-xs"><i
                                            class="fa fa-edit"></i>编辑</a>
                                    <a href="#" onclick="downloadFile('${item.id}')" class="btn btn-info btn-xs"><i
                                            class="fa fa-cloud-download"></i>下载</a>
                                    <a href="#" onclick="editStop('${item.id}')" class="btn btn-primary btn-xs"
                                       id="start${item.id}"
                                            <c:if test="${item.forbidden ==0}">
                                                style="display:none;"
                                            </c:if>
                                    >启用</a>
                                    <a href="#" onclick="editStart('${item.id}')" class="btn btn-danger btn-xs"
                                       id="stop${item.id}"
                                            <c:if test="${item.forbidden ==1}">
                                                style="display:none;"
                                            </c:if>
                                    >停用</a>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
    <!-- 分页条 -->
    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
            </div>
        </div>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/other/bankrate/list.js"></script>
</html>