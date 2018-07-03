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
    <input type="hidden" id="hiddenId" value="${hiddenId}"/>
    <input type="hidden" id="acceptId" value="${orderId}"/>
    <div class="row">
        <div class="col-sm-2">
            <a data-toggle="modal" class="btn btn-success btn-sm downloadOneFile"
               href="${ctx}/assessReportManage/downloadOneFile.action?id=${hiddenId}">附件下载</a>
        </div>
        <div class="col-sm-10">
            <div class="form-group">
                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic car-finance height-auto gallerys">
    <div class="ibox-content" id="auditSecondCarCheck">
        <div class="infor-item" style="margin: 20px 18px 0;">
            <h5>基本信息</h5>
            <div class="box-item row">
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>部门:</span>
                        <span>${secondCarEvaluateEntity.depName}</span>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>新增二手车信贷专员:</span>
                        <span>${secondCarEvaluateEntity.realname}</span>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>录单信贷专员:</span>
                        <span>${secondCarEvaluateEntity.creditPerson}</span>
                    </div>
                </div>
            </div>
            <div class="box-item row">
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>车型:</span>
                        <span>${secondCarEvaluateEntity.brandName}</span>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>车架号:</span>
                        <span>${secondCarEvaluateEntity.vin}</span>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>行驶里数(万公里):</span>
                        <span>${secondCarEvaluateEntity.miles}</span>
                    </div>
                </div>
            </div>
            <div class="box-item row">
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>初始登记日期:</span>
                        <span><sl:format type="date" show="${secondCarEvaluateEntity.initRegisterDate}" pattern="yyyy-MM-dd hh:mm"/></span>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>贷款银行:</span>
                        <span>${secondCarEvaluateEntity.bankName}</span>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="item-text">
                        <span>地区:</span>
                        <span>${secondCarEvaluateEntity.province}${secondCarEvaluateEntity.city}</span>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top:20px;">
                <div class="col-xs-1 text-right">
                    <label for="">车辆照片:</label>
                </div>
                <div class="col-xs-11">
                    <div id="files1" class="files gallerys"></div>
                </div>
            </div>
        </div>
        <table id="table" cellpadding="0" cellspacing="0" width="100%"></table>
        <div class="infor-item" style="margin: 20px 18px 0;">
            <h5>评估信息</h5>
            <div class="box-item row">

                <div id="initEvaluateTable"></div>

                <div class="col-xs-3">
                    <div class="item-text">
                    	<span>评估报告价格(元):</span>
                        <span>
                            <sl:format type="number" show="${secondCarEvaluateEntity.evaluateReportPrice}" pattern="#,##0.00"/>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <label class="col-xs-1 control-label text-right">备注:</label>
                <div class="col-xs-10">
                    <textarea  readonly="readonly" class="form-control" name="remark">${secondCarEvaluateEntity.remark}
                    </textarea>
                </div>
            </div>
            <div class="row" style="margin-top:20px;">
                <div class="col-xs-1 text-right">
                    <label for="">评估附件:</label>
                </div>
                <div class="col-xs-11">
                    <div id="files2" class="files gallerys"></div>
                </div>
            </div>
        </div>

        <div class="infor-item" style="margin: 20px 18px 0;">
            <h5>评估报告附件</h5>
            <div class="row">
                <div class="col-xs-1 text-right">
                    <label for="">评估报告附件:</label>
                </div>
                <div class="col-xs-11">
                    <div id="files4" class="files gallerys"></div>
                </div>
            </div>
        </div>

        <div class="infor-item" style="margin: 20px 18px 0;">
            <h5>车辆过户信息</h5>
            <div class="row">
                <div class="col-xs-1 text-right">
                    <label for="">车辆过户附件:</label>
                </div>
                <div class="col-xs-11">
                    <div id="files3" class="files gallerys"></div>
                </div>
            </div>
        </div>
        <div class="infor-item" style="margin: 20px 18px 0;">
            <h5>审核记录</h5>
            <div class="row">
                <div class="col-xs-12">
                    <div  class="mod_basic no-bottom">
                        <table class="table table-hover table-striped ">
                            <thead>
                            <tr>
                                <th style="width: 2%">审核类型</th>
                                <th style="width: 10%">审核结果</th>
                                <th style="width: 8%">审核意见</th>
                                <th style="width: 8%">审核人员</th>
                                <th style="width: 8%">审核时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="cel">候补资料</td>
                                <td class="cel">
                                <c:if test="${auditEntity.auditStatus == -4}">
                                    审核拒绝
                                </c:if>
                                <c:if test="${auditEntity.auditStatus == -3}">
                                    审核作废
                                </c:if>
                                <c:if test="${auditEntity.auditStatus == -2}">
                                    审核退回
                                </c:if>
                                <c:if test="${auditEntity.auditStatus == 0}">
                                    未提交
                                </c:if>
                                <c:if test="${auditEntity.auditStatus == 1}">
                                    已提交
                                </c:if>
                                <c:if test="${auditEntity.auditStatus == 2}">
                                   审核通过
                                </c:if>
                                <c:if test="${auditEntity.auditStatus == 3}">
                                   审核保存
                                </c:if>
                                </td>
                                <td title="${auditEntity.auditBak}" class="cel">${auditEntity.auditBak}</td>
                                <td title="${auditEntity.auditUser}" class="cel">${auditEntity.auditUser}</td>
                                <td class="cel">
                                    <fmt:formatDate value="${auditEntity.auditTime}" pattern="yyyy-MM-dd HH:mm "/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="infor-item" style="margin: 20px 18px 0;">
            <h5>评估记录</h5>
            <div class="row">
                <div class="col-xs-12">
                    <div id="" class="mod_basic no-bottom">
                        <table class="table table-hover table-striped ">
                            <thead>
                            <tr>
                                <th style="width: 2%">评估类型</th>
                                <th style="width: 10%">评估结果</th>
                                <th style="width: 8%">评估意见</th>
                                <th style="width: 8%">评估人员</th>
                                <th style="width: 8%">评估时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="cel">评估报告</td>
                                <td class="cel">
                                <c:if test="${secondCarEvaluateEntity.status == 0}">
                                    评估提交
                                </c:if>
                                <c:if test="${secondCarEvaluateEntity.status == 1}">
                                    评估完成
                                </c:if>
                                <c:if test="${secondCarEvaluateEntity.status == 2}">
                                    评估退回
                                </c:if>
                                </td>
                                <td title="${secondCarEvaluateEntity.remark}" class="cel">${secondCarEvaluateEntity.remark}</td>
                                <td title="${secondCarEvaluateEntity.evaluateUser}" class="cel">${secondCarEvaluateEntity.evaluateUser}</td>
                                <td class="cel"><sl:format type="date" show="${secondCarEvaluateEntity.evaluateTime}"
                                                           pattern="yyyy-MM-dd hh:mm"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/secondCar/assessReportCheck.js"></script>
</html>
