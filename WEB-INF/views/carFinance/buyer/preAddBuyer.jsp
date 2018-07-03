<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>补录购车人信息</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css"
          href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-2">
            <div class="form-group">
                <h5><strong><c:if test="${userType eq 'SHARED'}">补录配偶</c:if><c:if test="${userType eq 'SPONSOR'}">补录担保人</c:if></strong></h5>
            </div>
        </div>
        <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
            <div class="col-sm-10">
                <a class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
            </div>
        </c:if>
    </div>
</div>
<div class="mod_basic height-auto">
    <div class="ibox-content" id="buyer-form">
        <div class="form-horizontal">
            <div>
                <input type="hidden" name="acceptId" value="${acceptId}"/>
                <c:if test="${userType eq 'SHARED'}">
                    <div id="sharedForm" class="sharedForm">
                        <form>
                            <div class="form-group partner">
                                <input type="hidden" name="userType" value="SHARED"/>
                                <label class="col-xs-1 control-label">配偶姓名:</label>
                                <div class="col-xs-3"><input type="text" data-type="shared" name="realName" maxlength="10" class="form-control" tip="请输入正确的姓名"
                                                             obj="not_null"/></div>
                                <label class="col-xs-1 control-label">身份证号:</label>
                                <div class="col-xs-3"><input type="text" data-type="shared" name="cardNo" maxlength="18" class="form-control" tip="请输入正确的身份证号" obj="idCard"
                                onkeyup="value=value.replace(/\s/g,'')" url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>
                            </div>

                            <div class="form-group partner">
                                <label class="col-xs-1 control-label">上传证件:</label>
                                <div class="col-xs-11 uploaderErea">
                                    <div class="row" style="margin-left: 0; margin-right:0;">
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
                </c:if>
                <c:if test="${userType eq 'SPONSOR'}">
                    <div id="sponsorForm1" class="sponsorForm">
                        <form>
                            <div class="form-group guaranter1">
                                <input type="hidden" name="userType" value="SPONSOR"/>
                                <label class="col-xs-1 control-label">担保人姓名:</label>
                                <div class="col-xs-3">
                                	<input type="text" data-type="guaranter-1" name="realName" maxlength="10" class="form-control" tip="请输入正确的姓名" obj="not_null"/></div>
                                <label class="col-xs-1 control-label">身份证号:</label>
                                <div class="col-xs-3"><input type="text" data-type="guaranter-1" name="cardNo" maxlength="18" class="form-control" tip="请输入正确的身份证号" obj="idCard"
                                onkeyup="value=value.replace(/\s/g,'')"  url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>
                            </div>

                            <div class="form-group guaranter1">
                                <label class="col-xs-1 control-label">上传证件:</label>
                                <div class="col-xs-11 uploaderErea">
                                    <div class="row" style="margin-left: 0; margin-right:0;">
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
                    <div class="form-group" style="text-align: center;padding-top: 30px;">
                        <a class="form-group btn btn-primary" id="addGuarantor" data-count="${userNum}"><span>+</span>添加担保人</a>
                    </div>
                </c:if>
                <div class="dialog-manage" style="margin-bottom: 10px;">
                    <a href="javascript:void(0);" type="button" class="btn btn-primary btn-submit">提交</a>&nbsp;
                    <a href="javascript:void(0);" type="button" class="btn btn-default" onclick="history.go(-1)">取消</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/map.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.black.filter.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/buyer/buyer.js"></script>
</html>