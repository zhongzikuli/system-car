<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/webuploader/css/webuploader.css">
    <title></title>
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <h5><strong>新增征信</strong></h5>
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
    <div class="ibox-content" id="buyer-form">
        <div class="form-horizontal">
            <div id="add-credit-dialog" style="margin:10px;">
                <div class="buyerForm" id="buyerForm">
                    <form>
                        <div class="form-group">
                            <label class="col-xs-1 control-label"><span class="red">*</span>贷款银行:</label>
                            <div class="col-xs-3">
                                <div obj="" tip="贷款银行不能为空">
                                    <select name="bankId" class="form-control chosen-select" id="bankId" data-placeholder="贷款银行..." check="validSelect(this)">
                                        <option value="">请选择</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <c:if test="${bank.forbidden==0}" >
                                            <option value="${bank.id}">${bank.bankName}</option>
                                           </c:if>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div id="customer" class="form-group customer">
                            <input type="hidden" name="userType" value="BUYER"/>
                            <label class="col-xs-1 control-label"><span class="red">*</span>客户姓名:</label>
                            <div class="col-xs-3">
                                <input type="text" data-type="buyer" name="realName" id="buyerName" maxlength="10" class="form-control"
                                       tip="请输入正确的姓名" obj="not_null"/>
                            </div>
                            <label class="col-xs-1 control-label"><span class="red">*</span>身份证号:</label>
                            <div class="col-xs-3">
                                <input type="text" data-type="buyer" name="cardNo" class="form-control" tip="请输入正确的身份证号" onKeyup="return inputSapceTrim(event,this);"
                                       maxlength="18" obj="idCard" url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/>
                            </div>
                        </div>

                        <div class="form-group customer">
                            <label class="col-xs-1 control-label"><span class="red">*</span>上传证件:</label>
                            <div class="col-xs-11 uploaderErea">
                                <div class="row" style="margin-left: 0;">
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="customer-uploader-1" class="cardFrontPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="customer-uploader-2" class="cardBackPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="customer-uploader-3" class="authorizeLetterPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="customer-uploader-4" class="signaturePhoto">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="hr-line-dashed"></div>
                <div class="sharedForm" id="sharedForm">
                    <form>
                        <div class="form-group partner">
                            <input type="hidden" name="userType" value="SHARED"/>
                            <label class="col-xs-1 control-label">配偶姓名:</label>
                            <div class="col-xs-3">
                                <input type="text" data-type="shared" id="partnerName" name="realName" maxlength="10" tip="请输入正确的姓名"
                                       class="form-control"/></div>
                            <label class="col-xs-1 control-label">身份证号:</label>
                            <div class="col-xs-3">
                                <input type="text" data-type="shared" name="cardNo" id="partnerCardNo" 
                                       class="form-control" maxlength="18" tip="请输入正确的身份证号" onKeyup="return inputSapceTrim(event,this);"
                                       url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/>
                            </div>
                        </div>

                        <div class="form-group partner">
                            <label class="col-xs-1 control-label">上传证件:</label>
                            <div class="col-xs-11 uploaderErea">
                                <div class="row" style="margin-left: 0;">
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="partner-uploader-1" class="cardFrontPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="partner-uploader-2" class="cardBackPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="partner-uploader-3" class="authorizeLetterPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="partner-uploader-4" class="signaturePhoto">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="hr-line-dashed"></div>
                <div class="sponsorForm" id="sponsorForm">
                    <form>
                        <div id="guaranter1" class="form-group guaranter1">
                            <input type="hidden" name="userType" value="SPONSOR"/>
                            <label class="col-xs-1 control-label">担保人姓名:</label>
                            <div class="col-xs-3">
                                <input type="text" data-type="guaranter-1" id="guaranterName" name="realName" maxlength="10" tip="请输入正确的姓名"
                                       class="form-control"/></div>
                            <label class="col-xs-1 control-label">身份证号:</label>
                            <div class="col-xs-3">
                                <input type="text" data-type="guaranter-1" name="cardNo" class="form-control" tip="请输入正确的身份证号"  onKeyup="return inputSapceTrim(event,this);" 
                                       maxlength="18" url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/>
                            </div>
                        </div>

                        <div class="form-group guaranter1">
                            <label class="col-xs-1 control-label">上传证件:</label>
                            <div class="col-xs-11 uploaderErea">
                                <div class="row" style="margin-left: 0;">
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="guaranter-uploader-1" class="cardFrontPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="guaranter-uploader-2" class="cardBackPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="guaranter-uploader-3" class="authorizeLetterPhoto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="page-container">
                                            <div id="guaranter-uploader-4" class="signaturePhoto">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="form-group text-center">
                    <a class="form-group btn btn-primary" id="addGuarantor"><span>+</span>添加担保人</a>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="dialog-manage">
                    <a type="button" class="btn btn-primary submit-btn">提交</a>&nbsp;
                    <a class="btn btn-default" href="javascript:history.go(-1)">取消</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/slimscroll/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/map.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/common/hy.black.filter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/credit/add.js"></script>
</html>