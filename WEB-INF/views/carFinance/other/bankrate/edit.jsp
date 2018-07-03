<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <h5><strong>编辑</strong></h5>
            </div>
        </div>
        <div class="col-sm-6 text-right">
            <div class="form-group">
                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic height-auto">
    <div class="ibox-content" id="bankRate-form">
        <form id="bankRateEdit" class="form-horizontal">
            <div id="askCreate-dialog">
                <div class="row">
                    <div class="col-sm-6">
                        <input type="hidden" name="id" value="${bankRate.id}">
                        <input type="hidden" name="orgId" value="${bankRate.orgId}">
                         <input type="hidden" id="fileName" name="fileName" value="${bankRate.fileName}">
                         <input type="hidden" id="fileGroup" name="fileGroup" value="${bankRate.fileGroup}">
                          <input type="hidden" id="filePath" name="filePath" value="${bankRate.filePath}">
                        <div class="form-group margin-b-33">
                            <label class="col-xs-4 control-label"><span class="red">*</span>银行:</label>
                            <div class="col-xs-7">
                                <div obj="">
                                    <select name="bankId" id="bank-type" class="form-control chosen-select bank-type"
                                            check="validBankRate(this)" class="form-control product-type"
                                            data-placeholder="银行类型...">
                                        <option value="">请选择</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <option value="${bank.id}"
                                            <c:if test="${bank.id eq bankRate.bankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group margin-b-33">
                            <label class="col-xs-4 control-label"><span class="red">*</span>产品类型:</label>
                            <div class="col-xs-7">
                                <div obj="">
                                    <select name="cfProductId" id="product-type"
                                            class="form-control chosen-select product-type" check="validBankRate(this)"
                                            class="form-control product-type" data-placeholder="银行类型...">
                                        <option value="">请选择</option>
                                        <c:forEach items="${products}" var="product">
                                            <option value="${product.id}"
                                            <c:if test="${product.id eq bankRate.cfProductId}">selected</c:if>
                                            >${product.productName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group margin-b-33">
                            <label class="col-xs-4 control-label"><span class="red">*</span>年限:</label>
                            <div class="col-xs-7">
                                <div obj="">
                                    <select id="years-type" name="yearsCode"
                                            check="validBankRate(this)" class="form-control years-type"
                                            data-placeholder="年限...">
                                        <option value="">请选择年限</option>
                                        <c:forEach items="${years }" var="type">
                                            <option value="${type.keyWorld}"
                                            <c:if test="${type.keyWorld eq bankRate.yearsCode}">selected</c:if>
                                            >${type.valueDesc}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label"><span class="red">*</span>省内新车代码:</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInNewCarCode"
                                       id="bankRate-provinceInNewCarCode"
                                       check="validBankRate(this)" value="${bankRate.provinceInNewCarCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label"><span class="red">*</span>省内二手车车代码:</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInOldCarCode"
                                       id="bankRate-provinceInOldCarCode"
                                       check="validBankRate(this)" value="${bankRate.provinceInOldCarCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label"><span class="red">*</span>省外新车代码:</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceOutNewCarCode"
                                       id="bankRate-provinceOutNewCarCode"
                                       check="validBankRate(this)" value="${bankRate.provinceOutNewCarCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label"><span class="red">*</span>省外二手车代码:</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceOutOldCarCode"
                                       id="bankRate-provinceOutOldCarCode"
                                       check="validBankRate(this)" value="${bankRate.provinceOutOldCarCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">新车实际贷款比例上限,省内(%):</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInNewCarLoanRatioUp"
                                       id="bankRate-provinceInNewCarLoanRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceInNewCarLoanRatioUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">二手车实际贷款比例上限,省内(%):</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInOldCarLoanRatioUp"
                                       id="bankRate-provinceInOldCarLoanRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceInOldCarLoanRatioUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">新车分期分期付款总额上限,省内(%):</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInNewInstalmentTotalUp"
                                       id="bankRate-provinceInNewInstalmentTotalUp"
                                       check="validBankRate(this)" value="${bankRate.provinceInNewInstalmentTotalUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">二手车分期分期付款总额上限省内(%):</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInOldInstalmentTotalUp"
                                       id="bankRate-provinceInOldInstalmentTotalUp"
                                       check="validBankRate(this)" value="${bankRate.provinceInOldInstalmentTotalUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">新车合同价比例上限,省内(%):</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInNewContractRatioUp"
                                       id="bankRate-provinceInNewContractRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceInNewContractRatioUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">二手车合同价比例上限,省内(%):</label>
                            <div class="col-xs-7">
                                <input type="text" class="form-control" name="provinceInOldContractRatioUp"
                                       id="bankRate-provinceInOldContractRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceInOldContractRatioUp}">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><span class="red">*</span>选择银行套打模板:</label>
                            <div class="col-xs-8">
                                <div class="page-container">
                                    <div id="addUploader"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><span class="red">*</span>利率(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceInNewCarRate"
                                       id="bankRate-provinceInNewCarRate"
                                       check="validBankRate(this)" value="${bankRate.provinceInNewCarRate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><span class="red">*</span>利率(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceInOldCarRate"
                                       id="bankRate-provinceInOldCarRate"
                                       check="validBankRate(this)" value="${bankRate.provinceInOldCarRate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><span class="red">*</span>利率(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutNewCarRate"
                                       id="bankRate-provinceOutNewCarRate"
                                       check="validBankRate(this)" value="${bankRate.provinceOutNewCarRate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><span class="red">*</span>利率(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutOldCarRate"
                                       id="bankRate-provinceOutOldCarRate"
                                       check="validBankRate(this)" value="${bankRate.provinceOutOldCarRate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">省外(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutNewCarLoanRatioUp"
                                       id="bankRate-provinceOutNewCarLoanRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceOutNewCarLoanRatioUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">省外(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutOldCarLoanRatioUp"
                                       id="bankRate-provinceOutOldCarLoanRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceOutOldCarLoanRatioUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">省外(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutNewInstalmentTotalUp"
                                       id="bankRate-provinceOutNewInstalmentTotalUp"
                                       check="validBankRate(this)" value="${bankRate.provinceOutNewInstalmentTotalUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">省外(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutOldInstalmentTotalUp"
                                       id="bankRate-provinceOutOldInstalmentTotalUp"
                                       check="validBankRate(this)" value="${bankRate.provinceOutOldInstalmentTotalUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">省外(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutNewContractRatioUp"
                                       id="bankRate-provinceOutNewContractRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceOutNewContractRatioUp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">省外(%):</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="provinceOutOldContractRatioUp"
                                       id="bankRate-provinceOutOldContractRatioUp"
                                       check="validBankRate(this)" value="${bankRate.provinceOutOldContractRatioUp}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage m-b">
            <a type="button" class="btn btn-primary submit-button">提交</a>&nbsp;
            <a class="btn btn-default" href="${ctx}/bankRate/query.action">取消</a>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/other/bankrate/edit.js"></script>
</html>