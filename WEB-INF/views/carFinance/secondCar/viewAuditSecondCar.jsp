<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/advert/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic car-finance height-auto ">
    <div id="tab-secondCar">
        <form id="secondCarForm" class="form-horizontal">
            <div class="ibox-content" id="auditSecondCar">
                <div class="infor-item" style="margin: 20px 18px 0;">
                    <h5>二手车信息</h5>
                    <div class="box-item row">
                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>部门:</span>
                                <span>${secondCar.depName}</span>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>信贷专员:</span>
                                <span>${secondCar.realname}</span>
                            </div>
                        </div>
                    </div>
                    <div class="box-item row">
                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>车型:</span>
                                <span>${secondCar.brandName}</span>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>车架号:</span>
                                <span>${secondCar.vin}</span>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>行驶里数(万公里):</span>
                                <span>${secondCar.miles}</span>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="operationingLoginName" value="${secondCar.operationingLoginName}">
                    <div class="box-item row">
                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>初始登记日期:</span>
                                <span><sl:format type="date" show="${secondCar.initRegisterDate}" pattern="yyyy-MM-dd"/></span>
                            </div>
                        </div>

                        <div class="col-xs-4">
                            <div class="item-text">
                                <span>地区:</span>
                                <span>${secondCar.province}${secondCar.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="infor-item" style="margin: 20px 18px 0;">
                 	<h5>车辆附件</h5>
                    <div class="row" style="margin: 0 10px;">
                        <input type="hidden" id="cfSecondCarEvaluateId" value="${id}">
                        <input type="hidden" id="data" value="">
                        <div class="files gallerys" id="files"></div>
                    </div>
                </div>
                <div class="infor-item form-horizontal" style="margin: 20px 18px 0;padding-top:10px;" >
                <div class="form-group" id="price">
                    <label class="col-xs-1 control-label"><span class="red">*</span>有效截止日期:</label>
                    <div class="col-xs-2">
                        <input type="text" class="form-control" name="validDate"
                               readonly="readonly"      id="validDate"   value="<sl:format type="date" show="${secondCar.validDate}"
                            pattern="yyyy-MM-dd"/>">
                    </div>
                    <div class="col-xs-3">

                    </div>
                    <div class="col-xs-3">

                    </div>
                    <label class="col-xs-1 control-label"></label>
                    <div class="col-xs-2">
                        <a data-toggle="modal" class="btn btn-success btn-sm download-file"
                           onclick="downloadFile('${secondCar.id}')">打包下载</a>
                    </div>
                    <div class="col-sm-12 " style=" margin-top: 10px;" >
                        <label class="col-xs-1 control-label" style="margin-left:-14px;"><span class="red">*</span>备注:</label>
                        <div class="col-xs-11">
                            <textarea id="remark" obj="not_null"  readonly="readonly"  class="form-control" name="remark">${secondCar.remark}</textarea>
                        </div>
                    </div>
                    <div class="col-sm-12 price" style=" margin-top: 10px;">
                        <input type="hidden" value="${size}" id="size">
                        <label class="col-xs-1 control-label">贷款银行:</label>
                        <div class="col-xs-2">
                            <input type="hidden" value="${secondCar.loanBankId}" id="loanBankId">
                            <input type="hidden" value="${secondCar.priceId}" name="id">
                            <label style=" margin-top: 8px;">${secondCar.bankName}</label >
                        </div>
                        <label class="col-xs-1 control-label"><span class="red">*</span>初审评估价格:</label>
                        <div class="col-xs-2">
                            <input type="text" obj="not_null" class="form-control" name="initEvaluatePrice"
                                   readonly="readonly"   id="initEvaluatePrice" value="${secondCar.initEvaluatePrice}">
                        </div>
                        <label class="col-xs-1 control-label">车三百评估价格:</label>
                        <div class="col-xs-2">
                            <input type="text"  class="form-control" name="evaluate300Price"
                                   readonly="readonly"        id="evaluate300Price" value="${secondCar.evaluate300Price}">
                        </div>
                        <div class="col-xs-3">

                        </div>
                    </div>
                    <c:forEach items="${list}" var="item" varStatus="i">
                        <div class="col-sm-12 price" style=" margin-top: 10px;">
                            <label class="col-xs-1 control-label">贷款银行:</label>
                            <input type="hidden" value="${item.id}" name="id">
                            <div class="col-xs-2">
                                <select class="form-control bank"  id="loanBank${i}" name="loanBank"  disabled="disabled" >
                                    <option value="">请贷款选择银行</option>
                                    <c:forEach items="${bankList}" var="bank">
                                        <option value="${bank.id}"
                                                <c:if test="${bank.id eq item.loanBankId}">selected</c:if>
                                        >${bank.bankName}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <label class="col-xs-1 control-label"><span class="red">*</span>初审评估价格:</label>
                            <div class="col-xs-2">
                                <input type="text" obj="not_null" class="form-control" name="initEvaluatePrice"
                                       readonly="readonly"   value="${item.initEvaluatePrice}">
                            </div>
                            <label class="col-xs-1 control-label">车三百评估价格:</label>
                            <div class="col-xs-2">
                                <input type="text"  class="form-control" name="evaluate300Price"
                                       readonly="readonly"        value="${item.evaluate300Price}">
                            </div>
                            <div class="col-xs-3">

                            </div>
                        </div>

                    </c:forEach>
                </div>
            </div>
            </div>
                <div class="infor-item" style="margin: 20px 18px 0;">
                 	<h5>评估附件</h5>
                    <div class="row" style="margin: 0 10px;">
                        <div id="files2" class="files gallerys"></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/secondCar/secondCarFileView.js"></script>
</html>
