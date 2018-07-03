<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/chosen/chosen.css">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/webuploader/css/webuploader.css">
    <title></title>
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <h5><strong>编辑征信</strong></h5>
            </div>
        </div>
        <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
            <div class="col-sm-6 text-right">
                <div class="form-group">
                    <a class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
                </div>
            </div>
        </c:if>
    </div>
</div>
<div class="mod_basic height-auto padding-15 car-finance border-d">
    <c:if test="${accept.creditRefuseReason ne '' && accept.orderStatus == -1}">
        <div class="item-row">
            <fieldset>
                <legend>审核信息</legend>
                <div class="infor-item b-0">
                    <div class="box-item row mr-none">
                        <div class="col-xs-2">
                            <div class="item-text">
                                <span>审核状态:</span>
                                <span>征信退回</span>
                            </div>
                        </div>
                        <div class="col-xs-5 bg-color-d ">
                            <div class="item-text text-left" >
                                <span>审核意见:</span>
                                <span >${accept.creditRefuseReason}</span>
                            </div>
                        </div>
                        <div class="col-xs-2">
                            <div class="item-text">
                                <span>审核人员:<span>
                                <span>${accept.stationaryMan}</span>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="item-text">
                                <span>审核时间:</span>
                                <span>
                                <sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${accept.creditQueryTime}"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </c:if>
    <div class="item-row">
        <fieldset>
            <legend>编辑</legend>
            <div class="ibox-content" id="buyer-form">
                <div class="form-horizontal">
                    <div style="margin:10px;">
                        <input type="hidden" id="acceptId" name="acceptId" value="${accept.id}"/>
                        <div class="form-group" id="bankForm">
                            <form>
                                <label class="col-xs-1 control-label"><span class="red">*</span>贷款银行:</label>
                                <div class="col-xs-3" obj="" tip="请输入正确的贷款银行">
                                    <select id="bankId" name="bankId" class="form-control chosen-select"
                                            check="validSelect(this)">
                                        <option value="">请选择</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <c:if test="${bank.forbidden==0}" >
                                                <c:choose>
                                                    <c:when test="${bank.id == accept.bankId}">
                                                        <option value="${bank.id}" selected>${bank.bankName}</option>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <option value="${bank.id}">${bank.bankName}</option>
                                                    </c:otherwise>
                                                </c:choose>
                                            </c:if>
                                        </c:forEach>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <%--计算担保人一、二、三--%>
                        <c:set var="count" value="0"/>
                        <%--判断是否存在担保人--%>
                        <c:set var="hasSponsor" value="false"></c:set>
                        <c:if test="${hasShared eq 'true'}">
                            <c:forEach items="${accept.cfBuyerInformationVOS}" var="buyer">
                                <c:if test="${buyer.userType eq 'BUYER'}">
                                    <div id="buyerForm" class="buyerForm">
                                        <form>
                                            <div class="form-group customer">
                                                <input type="hidden" name="id" value="${buyer.id}"/>
                                                <input type="hidden" name="userType" value="BUYER"/>
                                                <label class="col-xs-1 control-label"><span class="red">*</span>客户姓名:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="buyer" name="realName" value="${buyer.realName}" tip="请输入正确的姓名"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>       class="form-control" maxlength="10" obj="not_null"/>
                                                </div>
                                                <label class="col-xs-1 control-label"><span class="red">*</span>身份证号:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="buyer" name="cardNo" value="${buyer.cardNo}"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>        maxlength="18" tip="请输入正确的身份证号" class="form-control" obj="idCard" onKeyup="return inputSapceTrim(event,this);"
                                                           url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action?acceptId=${accept.id}"/>
                                                </div>
                                            </div>

                                            <div class="form-group customer">
                                                <label class="col-xs-1 control-label"><span class="red">*</span>上传证件:</label>
                                                <div class="col-xs-11 uploaderErea">
                                                    <div class="row" style="margin-left: 0;">
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-1" class="cardFrontPhoto"
                                                                     data-id="${buyer.cardFrontPhotoFileId}"
                                                                     data-path="${buyer.cardFrontPhotoFilePath}"
                                                                     data-group="${buyer.cardFrontPhotoFileGroup}"
                                                                     data-name="${buyer.cardFrontPhotoFileName}">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-2" class="cardBackPhoto"
                                                                     data-id="${buyer.cardBackPhotoFileId}"
                                                                     data-path="${buyer.cardBackPhotoFilePath}"
                                                                     data-group="${buyer.cardBackPhotoFileGroup}"
                                                                     data-name="${buyer.cardBackPhotoFileName}">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-3" class="authorizeLetterPhoto"
                                                                     data-id="${buyer.authorizeLetterPhotoFileId}"
                                                                     data-path="${buyer.authorizeLetterPhotoFilePath}"
                                                                     data-group="${buyer.authorizeLetterPhotoFileGroup}"
                                                                     data-name="${buyer.authorizeLetterPhotoFileName}">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-4" class="signaturePhoto"
                                                                     data-id="${buyer.signaturePhotoFileId}"
                                                                     data-path="${buyer.signaturePhotoFilePath}"
                                                                     data-group="${buyer.signaturePhotoFileGroup}"
                                                                     data-name="${buyer.signaturePhotoFileName}">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </c:if>
                                <c:if test="${buyer.userType eq 'SHARED'}">
                                    <div class="hr-line-dashed"></div>
                                    <div id="sharedForm" class="sharedForm">
                                        <form>
                                            <div class="form-group partner">
                                                <input type="hidden" name="id" value="${buyer.id}"/>
                                                <input type="hidden" name="userType" value="SHARED"/>
                                                <label class="col-xs-1 control-label">配偶姓名:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="shared" name="realName"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>         value="${buyer.realName}" maxlength="10" tip="请输入正确的姓名"
                                                           class="form-control"/></div>
                                                <label class="col-xs-1 control-label">身份证号:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="shared" name="cardNo" value="${buyer.cardNo}"
                                                            <c:if test="${ null !=buyer.creditRecord}"> readonly="readonly" </c:if>           maxlength="18" tip="请输入正确的身份证号" class="form-control"  onKeyup="return inputSapceTrim(event,this);"
                                                           url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action?acceptId=${accept.id}"/>
                                                </div>
                                            </div>

                                            <div class="form-group partner">
                                                <label class="col-xs-1 control-label">上传证件:</label>
                                                <div class="col-xs-11 uploaderErea">
                                                    <div class="row" style="margin-left: 0;">
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="partner-uploader-1" class="cardFrontPhoto"
                                                                     data-id="${buyer.cardFrontPhotoFileId}"
                                                                     data-path="${buyer.cardFrontPhotoFilePath}"
                                                                     data-group="${buyer.cardFrontPhotoFileGroup}"
                                                                     data-name="${buyer.cardFrontPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="partner-uploader-2" class="cardBackPhoto"
                                                                     data-id="${buyer.cardBackPhotoFileId}"
                                                                     data-path="${buyer.cardBackPhotoFilePath}"
                                                                     data-group="${buyer.cardBackPhotoFileGroup}"
                                                                     data-name="${buyer.cardBackPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="partner-uploader-3" class="authorizeLetterPhoto"
                                                                     data-id="${buyer.authorizeLetterPhotoFileId}"
                                                                     data-path="${buyer.authorizeLetterPhotoFilePath}"
                                                                     data-group="${buyer.authorizeLetterPhotoFileGroup}"
                                                                     data-name="${buyer.authorizeLetterPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="partner-uploader-4" class="signaturePhoto"
                                                                     data-id="${buyer.signaturePhotoFileId}"
                                                                     data-path="${buyer.signaturePhotoFilePath}"
                                                                     data-group="${buyer.signaturePhotoFileGroup}"
                                                                     data-name="${buyer.signaturePhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </c:if>
                                <c:if test="${buyer.userType eq 'SPONSOR'}">
                                    <c:set var="count" value="${count+1}"/>

                                    <c:set var="hasSponsor" value="true"/>
                                    <div class="hr-line-dashed"></div>
                                    <div id="sponsorForm" class="sponsorForm">
                                        <form>
                                            <div class="form-group guaranter${count}">
                                                <input type="hidden" name="id" value="${buyer.id}"/>
                                                <input type="hidden" name="userType" value="SPONSOR"/>
                                                <label class="col-xs-1 control-label">担保人姓名:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="guaranter-1" name="realName"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>        value="${buyer.realName}" maxlength="10" tip="请输入正确的姓名"
                                                           class="form-control"/></div>
                                                <label class="col-xs-1 control-label">身份证号:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="guaranter-1" name="cardNo" value="${buyer.cardNo}" maxlength="18" tip="请输入正确的身份证号"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>        class="form-control"  onKeyup="return inputSapceTrim(event,this);"
                                                           url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action?acceptId=${accept.id}"/>
                                                </div>
                                                <div class="col-xs-4">
                                                    <c:if test="${count != 1}"><a class="btn btn-danger btn-md"
                                                                                  id="remove-guarantor-${count}">删除</a></c:if>
                                                </div>
                                            </div>

                                            <div class="form-group guaranter${count}">
                                                <label class="col-xs-1 control-label">上传证件:</label>
                                                <div class="col-xs-11 uploaderErea">
                                                    <div class="row" style="margin-left: 0;">
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-1-${count}"
                                                                     class="cardFrontPhoto"
                                                                     data-id="${buyer.cardFrontPhotoFileId}"
                                                                     data-path="${buyer.cardFrontPhotoFilePath}"
                                                                     data-group="${buyer.cardFrontPhotoFileGroup}"
                                                                     data-name="${buyer.cardFrontPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-2-${count}"
                                                                     class="cardBackPhoto"
                                                                     data-id="${buyer.cardBackPhotoFileId}"
                                                                     data-path="${buyer.cardBackPhotoFilePath}"
                                                                     data-group="${buyer.cardBackPhotoFileGroup}"
                                                                     data-name="${buyer.cardBackPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-3-${count}"
                                                                     class="authorizeLetterPhoto"
                                                                     data-id="${buyer.authorizeLetterPhotoFileId}"
                                                                     data-path="${buyer.authorizeLetterPhotoFilePath}"
                                                                     data-group="${buyer.authorizeLetterPhotoFileGroup}"
                                                                     data-name="${buyer.authorizeLetterPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-4-${count}"
                                                                     class="signaturePhoto"
                                                                     data-id="${buyer.signaturePhotoFileId}"
                                                                     data-path="${buyer.signaturePhotoFilePath}"
                                                                     data-group="${buyer.signaturePhotoFileGroup}"
                                                                     data-name="${buyer.signaturePhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </c:if>
                            </c:forEach>
                        </c:if>

                        <c:if test="${hasShared ne 'true'}">
                            <c:forEach items="${accept.cfBuyerInformationVOS}" var="buyer">
                                <c:if test="${buyer.userType eq 'BUYER'}">
                                    <div id="buyerForm" class="buyerForm">
                                        <form>
                                            <div class="form-group customer">
                                                <input type="hidden" name="id" value="${buyer.id}"/>
                                                <input type="hidden" name="userType" value="BUYER"/>
                                                <label class="col-xs-1 control-label"><span class="red">*</span>客户姓名:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="buyer" name="realName"
                                                            <c:if test="${ null !=buyer.creditRecord}"> readonly="readonly" </c:if> value="${buyer.realName}" maxlength="10" tip="请输入正确的姓名"
                                                           class="form-control" obj="not_null"/>
                                                </div>
                                                <label class="col-xs-1 control-label"><span class="red">*</span>身份证号:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="buyer" name="cardNo" value="${buyer.cardNo}"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>      maxlength="18" tip="请输入正确的身份证号" class="form-control" obj="idCard"
                                                           url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action?acceptId=${accept.id}"/>
                                                </div>
                                            </div>

                                            <div class="form-group customer">
                                                <label class="col-xs-1 control-label"><span class="red">*</span>上传证件:</label>
                                                <div class="col-xs-11 uploaderErea">
                                                    <div class="row" style="margin-left: 0;">
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-1" class="cardFrontPhoto"
                                                                     data-id="${buyer.cardFrontPhotoFileId}"
                                                                     data-path="${buyer.cardFrontPhotoFilePath}"
                                                                     data-group="${buyer.cardFrontPhotoFileGroup}"
                                                                     data-name="${buyer.cardFrontPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-2" class="cardBackPhoto"
                                                                     data-id="${buyer.cardBackPhotoFileId}"
                                                                     data-path="${buyer.cardBackPhotoFilePath}"
                                                                     data-group="${buyer.cardBackPhotoFileGroup}"
                                                                     data-name="${buyer.cardBackPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-3" class="authorizeLetterPhoto"
                                                                     data-id="${buyer.authorizeLetterPhotoFileId}"
                                                                     data-path="${buyer.authorizeLetterPhotoFilePath}"
                                                                     data-group="${buyer.authorizeLetterPhotoFileGroup}"
                                                                     data-name="${buyer.authorizeLetterPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="customer-uploader-4" class="signaturePhoto"
                                                                     data-id="${buyer.signaturePhotoFileId}"
                                                                     data-path="${buyer.signaturePhotoFilePath}"
                                                                     data-group="${buyer.signaturePhotoFileGroup}"
                                                                     data-name="${buyer.signaturePhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </c:if>
                            </c:forEach>
                            <div class="hr-line-dashed"></div>
                            <div id="sharedForm" class="sharedForm">
                                <form>
                                    <div class="form-group partner">
                                        <input type="hidden" name="userType" value="SHARED"/>
                                        <label class="col-xs-1 control-label">配偶姓名:</label>
                                        <div class="col-xs-3">
                                            <input type="text" data-type="shared" name="realName" maxlength="10" tip="请输入正确的姓名"
                                                    <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>             class="form-control"/></div>
                                        <label class="col-xs-1 control-label">身份证号:</label>
                                        <div class="col-xs-3">
                                            <input type="text" data-type="shared" name="cardNo" maxlength="18" tip="请输入正确的身份证号"
                                                    <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>         class="form-control"  onKeyup="return inputSapceTrim(event,this);"
                                                   url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>
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
                            <c:forEach items="${accept.cfBuyerInformationVOS}" var="buyer">
                                <c:if test="${buyer.userType eq 'SPONSOR'}">
                                    <c:set var="count" value="${count+1}"/>
                                    <c:set var="hasSponsor" value="true"/>
                                    <div class="hr-line-dashed"></div>
                                    <div id="sponsorForm${count}" class="sponsorForm">
                                        <form>
                                            <div class="form-group guaranter${count}">
                                                <input type="hidden" name="id" value="${buyer.id}"/>
                                                <input type="hidden" name="userType" value="SPONSOR"/>
                                                <label class="col-xs-1 control-label">担保人姓名:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="guaranter-${count}" name="realName"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>               value="${buyer.realName}" maxlength="10" tip="请输入正确的姓名"
                                                           class="form-control" obj="not_null"/></div>
                                                <label class="col-xs-1 control-label">身份证号:</label>
                                                <div class="col-xs-3">
                                                    <input type="text" data-type="guaranter-${count}" name="cardNo"
                                                           value="${buyer.cardNo}" maxlength="18" tip="请输入正确的身份证号"
                                                            <c:if test="${ null !=buyer.creditRecord }"> readonly="readonly" </c:if>         class="form-control"   onKeyup="return inputSapceTrim(event,this);"
                                                           url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action?acceptId=${accept.id}"/>
                                                </div>
                                                <div class="col-xs-4">
                                                    <c:if test="${count != 1}">
                                                        <a class="btn btn-danger btn-md"
                                                           id="remove-guarantor-${count}">删除</a></c:if>
                                                </div>
                                            </div>

                                            <div class="form-group guaranter${count}">
                                                <label class="col-xs-1 control-label">上传证件:</label>
                                                <div class="col-xs-11 uploaderErea">
                                                    <div class="row" style="margin-left: 0;">
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-1-${count}"
                                                                     class="cardFrontPhoto"
                                                                     data-id="${buyer.cardFrontPhotoFileId}"
                                                                     data-path="${buyer.cardFrontPhotoFilePath}"
                                                                     data-group="${buyer.cardFrontPhotoFileGroup}"
                                                                     data-name="${buyer.cardFrontPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-2-${count}"
                                                                     class="cardBackPhoto"
                                                                     data-id="${buyer.cardBackPhotoFileId}"
                                                                     data-path="${buyer.cardBackPhotoFilePath}"
                                                                     data-group="${buyer.cardBackPhotoFileGroup}"
                                                                     data-name="${buyer.cardBackPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-3-${count}"
                                                                     class="authorizeLetterPhoto"
                                                                     data-id="${buyer.authorizeLetterPhotoFileId}"
                                                                     data-path="${buyer.authorizeLetterPhotoFilePath}"
                                                                     data-group="${buyer.authorizeLetterPhotoFileGroup}"
                                                                     data-name="${buyer.authorizeLetterPhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="page-container">
                                                                <div id="guaranter-uploader-group-4-${count}"
                                                                     class="signaturePhoto"
                                                                     data-id="${buyer.signaturePhotoFileId}"
                                                                     data-path="${buyer.signaturePhotoFilePath}"
                                                                     data-group="${buyer.signaturePhotoFileGroup}"
                                                                     data-name="${buyer.signaturePhotoFileName}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </c:if>
                            </c:forEach>
                        </c:if>
                        <c:if test="${hasSponsor eq 'false'}">
                            <div class="hr-line-dashed"></div>
                            <div id="sponsorForm" class="sponsorForm">
                                <form>
                                    <div class="form-group guaranter1">
                                        <input type="hidden" name="userType" value="SPONSOR"/>
                                        <label class="col-xs-1 control-label">担保人姓名:</label>
                                        <div class="col-xs-3">
                                            <input type="text" data-type="guaranter-1" name="realName" maxlength="10"
                                                   tip="请输入正确的姓名" class="form-control"/></div>
                                        <label class="col-xs-1 control-label">身份证号:</label>
                                        <div class="col-xs-3">
                                            <input type="text" data-type="guaranter-1" name="cardNo" maxlength="18"
                                                   tip="请输入正确的身份证号" class="form-control"  onKeyup="return inputSapceTrim(event,this);"
                                                   url="${ctx}/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>
                                    </div>

                                    <div class="form-group guaranter1">
                                        <label class="col-xs-1 control-label">上传证件:</label>
                                        <div class="col-xs-11 uploaderErea">
                                            <div class="row" style="margin-left: 0;">
                                                <div class="col-xs-3">
                                                    <div class="page-container">
                                                        <div id="guaranter-uploader-group-1-1" class="cardFrontPhoto">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3">
                                                    <div class="page-container">
                                                        <div id="guaranter-uploader-group-2-1" class="cardBackPhoto">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3">
                                                    <div class="page-container">
                                                        <div id="guaranter-uploader-group-3-1" class="authorizeLetterPhoto">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3">
                                                    <div class="page-container">
                                                        <div id="guaranter-uploader-group-4-1" class="signaturePhoto">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </c:if>
                        <div class="form-group text-center">
                            <a class="form-group btn btn-primary" id="addGuarantor"
                               data-count="${count}"><span>+</span>添加担保人</a>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="dialog-manage">
                            <a type="button" class="btn btn-primary btn-submit">提交</a>&nbsp;
                            <a class="btn btn-default" onclick="history.go(-1)">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div >

</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/map.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/common/hy.black.filter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/credit/edit.js"></script>
</html>