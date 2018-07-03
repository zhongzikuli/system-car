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
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-2">
            <a data-toggle="modal" class="btn btn-success btn-sm downloadOneFile"} onclick="downloadFile(${hiddenId})">附件下载</a>
        </div>
        <div class="col-sm-10">
            <div class="form-group">
                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
        <input type="hidden" id="hiddenId" value="${hiddenId}" name="id"  />
        <input type="hidden" id="businessOrderAcceptId" value="${businessOrderAcceptId}" name="businessOrderAcceptId" />
    </div>
</div>
<div class="mod_basic height-auto ibox-content car-finance">
    <div class="item-row" id="tab-secondCar">
        <form id="secondCar_edit" class="form-horizontal">
            <fieldset>
                <legend>车辆信息</legend>
                <div id="audit-edit-car-information" class="form-horizontal">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">车型:</label>
                                <div class="col-xs-8">
                                    <input value="${carBrand}" class="form-control" type="text" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">初始登记日期:</label>
                                <div class="col-xs-8">
                                    <input readonly   value="<fmt:formatDate value="${entity.initRegisterDate}" pattern="yyyy-MM-dd "/>" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">车架号:</label>
                                <div class="col-xs-8">
                                    <input   readonly  value="${entity.vin}"  class="form-control" type="text"></div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">地区:</label>
                                <div class="col-xs-8">
                                    <input  readonly value="${entity.province}-${entity.city}" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">行驶公里数(万公里):</label>
                                <div class="col-xs-8">
                                    <input readonly class="form-control" value="${entity.miles}" type="text"></div>
                            </div>
                        </div>
                    </div>
                    <div class="infor-item b-0">
                        <div class="row">
                            <input type="hidden" id="cfSecondCarEvaluateId" value="${id}">
                            <input type="hidden" id="data" value="">
                            <label class="col-xs-1 control-label" style="margin-left:12px;">车辆照片:</label>
                            <div class="col-xs-11 files gallerys" id="files1" style="margin-left:-12px;"></div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        <form id="audit_edit" class="form-horizontal">
            <fieldset>
                <legend>评估信息</legend>
                <div id="initEvaluateTable" style="margin: 10px;"></div>
                <div class="form-horizontal">
                    <div class="row">
                        <label class="col-xs-1 control-label" style="margin-left:-14px;">备注:</label>
                        <div class="col-xs-11">
                            <textarea  readonly="readonly" class="form-control"  name="remark">${entity.remark}</textarea>
                        </div>
                    </div>

                    <div class="infor-item b-0">
                        <div class="row">
                            <label class="col-xs-1 control-label" style="margin-left:12px;">评估附件:</label>
                            <div class="col-xs-11 files" id="files2" style="margin-left:-12px;"></div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/secondCar/detail.js"></script>
</html>