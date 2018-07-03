<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <a class="btn btn-sm btn-danger deleteInfo" >删除</a>
            </div>
        </div>
        <div class="col-sm-6 text-right">
            <div class="form-group">
                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic height-auto ibox-content car-finance padding-min">
    <div id="tab-secondCar" class="item-row">
        <form id="secondCar_edit" class="form-horizontal">
            <fieldset>
                <legend>车辆信息</legend>
                <div id="audit-edit-car-information" class="form-horizontal">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                 <label class="col-xs-3 control-label"><span class="red">*</span>车型:</label>
                                <div class="col-xs-8">
                                	<input readonly="readonly" class="form-control car" id="carBrandId" name="brandName" data-carBrand="${carBrand}" obj="not_null" type="text" tip="车型不能为空，请重新输入">
                                	<div class="car-box">
	                                	<div class="item item-type"><h4>请选择品牌</h4><div class="type"></div></div>
	                                	<div class="item item-series"><h4>请选择车系</h4><div class="series"></div></div>
	                                	<div class="item item-no"><h4>请选择车型</h4><div class="no"></div></div>
                                	</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">初始登记日期:</label>
                                <div class="col-xs-8">
                                    <input id="initRegisterDate" name="initRegisterDate" readonly
                                           check="validAddSecondCarInfo(this)" value="<fmt:formatDate value="${vo.initRegisterDate}" pattern="yyyy-MM-dd "/>" 
                                           class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">车架号:</label>
                                <div class="col-xs-8">
                                    <input type="hidden" id="hiddenId" value="${hiddenId}" name="id"/>
                                    <input id="vin" obj="not_null" name="vin" value="${vo.vin}" tip="车架号不能为空"  onkeyup="value=value.replace(/\s/g,'')"
                                           style="text-transform:uppercase;"    url="<%=request.getContextPath() %>/addSecondCar/checkVin.action" class="form-control" type="text"></div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">贷款银行:</label>
                                <div class="col-xs-8">
                                    <div obj="" tip="贷款银行不能为空">
                                        <select class="form-control" id="loanBankId" name="bankName"
                                                check="validAddSecondCarInfo(this)">
                                            <option value="">请选择贷款银行</option>
                                            <c:forEach items="${bankList}" var="bank">
                                                <option value="${bank.id}"
                                                <c:if test="${bank.id eq vo.loanBankId}">selected</c:if>
                                                >${bank.bankName}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">行驶公里数(万公里):</label>
                                <div class="col-xs-8">
                                    <input id="miles"  name="miles" class="form-control"   check="validAddSecondCarInfo(this)"
                                           onkeyup="value=value.replace(/\s/g,'')"     tip="行驶公里数不能为空" value="${vo.miles}" type="text"></div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">地区:</label>
                                <div class="col-xs-8">
                                    <input id="province" obj="not_null" value="${vo.province}-${vo.city}"
                                           name="province"
                                           tip="地区不能为空" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-xs-1 control-label">车辆照片:</label>
                        <div class="col-xs-8">
                            <div class="page-container two-line">
                                <div id="uploader"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin: 30px auto;">
                        <input type="hidden" id="businessOrderAcceptId" value="${businessOrderAcceptId}"
                               name="businessOrderAcceptId"/>
                        <div id="files" class="files gallerys"></div>
                    </div>
                </div>
            </fieldset>
        </form>
        <div class="dialog-manage" style="text-align: center;margin-bottom: 10px;">
            <input type="button" class="btn btn-primary submit-button" value="提交">
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/secondCar/edit.js"></script>
</html>

