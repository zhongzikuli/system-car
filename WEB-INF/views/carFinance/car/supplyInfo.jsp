<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" id="carInfoBackTrack" value="提车资料上传"/>
        <input type="hidden" id="auditId" value="${auditId}"/>
        <input type="hidden" id="idInfo" value="${idInfo}"/>
        <input type="hidden" id="secondCarEvaluateEntity" value="${secondCarEvaluateEntity}"/>
    </div>
    <form id="pagerForm" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-6">
                <shiro:hasPermission name="carInfoFile:deleteFile">
                    <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn   deleteFiles">删除</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="carInfoFile:download">
                    <a data-toggle="modal" class="btn btn-success btn-sm download-files" >打包下载</a>
                </shiro:hasPermission>
                <a class="btn btn-sm btn-danger check-btn" style="margin-left:72px;">全选</a>
            </div>
            <input type="hidden" name="type" id="type" value="${type}"/>
            <div class="col-sm-6 text-right">
                <div class="form-group">
                    <label class="control-label label">照片类型:</label>
                    <select class="form-control" id="search-select" name="photoType" >
                        <option value="0" <c:if test="${orderStatus == '0'}">selected</c:if>>全部</option>
                        <option value="1" <c:if test="${orderStatus == '1'}">selected</c:if>>合格证</option>
                        <option value="2" <c:if test="${orderStatus == '2'}">selected</c:if>>提车影像</option>
                        <option value="3" <c:if test="${orderStatus == '3'}">selected</c:if>>保单</option>
                        <option value="4" <c:if test="${orderStatus == '4'}">selected</c:if>>行驶证</option>
                        <option value="5" <c:if test="${orderStatus == '5'}">selected</c:if>>发票</option>
                        <option value="6" <c:if test="${orderStatus == '6'}">selected</c:if>>登记证</option>
                    </select>
                    <input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
                    <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
                            <a type="button" class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
                    </c:if>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic height-auto ibox-content car-finance gallerys ">
    <c:forEach items="${auditList}" var="item">
        <c:if test="${item.auditStatus ==-2  || item.auditStatus ==0 }">
            <div class="item-row">
                <fieldset>
                    <legend>审核信息</legend>
                    <div class="infor-item b-0" style="margin: 0 18px;">
                        <div class="box-item row">
                            <div class="col-xs-3">
                                <div class="item-text">
                                    <span>审核类型:</span>
                                    <span>提车资料</span>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="item-text">
                                    <span>备注:</span>
                                    <span>${item.auditBak}</span>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="item-text">
                                    <span>审核人员:</span>
                                    <span>${item.auditRealName}</span>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="item-text">
                                    <span>审核时间:</span>
                                    <span>
                                        <fmt:formatDate value="${item.auditTime}" pattern="yyyy-MM-dd HH:mm "/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </c:if>
    </c:forEach>

    <div class="item-row " id="tab-getCar">
        <fieldset>
            <legend>提车文本信息</legend>
            <form id="getCarForm" class="form-horizontal">
                <div id="audit-detail-car-information" class="form-horizontal" autocomplete="off">
                    <div class="item-row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>车辆类别:</label>
                                <div class="col-xs-8">
                                    <input id="category" obj="not_null" name="category" onkeyup="value=value.replace(/\s/g,'')"  value="${vo.category}" class="form-control" tip="车辆类别不能为空" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>具体车型:</label>
                                <div class="col-xs-8">
                                    <input id="carDetail" obj="not_null" name="carDetail" onkeyup="value=value.replace(/\s/g,'')"   value="${vo.carDetail}" class="form-control" tip="具体车型不能为空" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>发动机号:</label>
                                <div class="col-xs-8">
                                        <input id="engineNo" obj="not_null" name="engineNo" onkeyup="value=value.replace(/\s/g,'')"  value="${vo.engineNo}" class="form-control" tip="发动机号不能为空" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>发票开具单位:</label>
                                <div class="col-xs-8">
                                    <input id="billCompany" obj="not_null" name="billCompany" onkeyup="value=value.replace(/\s/g,'')" value="${vo.billCompany}" class="form-control" tip="发票开具单位不能为空" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>车架号:</label>
                                <div class="col-xs-8">
                                    <c:if test="${not empty vo}">
                                        <input tip="车架号不能为空" value="${vo.vinNo}" <c:if test="${cfCarInfoEntity.newOrOld == 0}"> readonly  </c:if>  onkeyup="value=value.replace(/\s/g,'')" style="text-transform:uppercase;" check="validGetCarInfo(this)"  id="vinNo"  name="vinNo" class="form-control" type="text">
                                    </c:if>
                                    <c:if test="${null ==vo}">
                                        <input tip="车架号不能为空" check="validGetCarInfo(this)" <c:if test="${cfCarInfoEntity.newOrOld == 0}"> readonly  </c:if>  style="text-transform:uppercase;" onkeyup="value=value.replace(/\s/g,'')" value="${cfCarInfoEntity.vinNo}"  id="vinNo"  name="vinNo" class="form-control" type="text">
                                    </c:if>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>车辆颜色:</label>
                                <div class="col-xs-8">
                                    <input id="carColor" obj="not_null" name="carColor" onkeyup="value=value.replace(/\s/g,'')"   value="${vo.carColor}" class="form-control" tip="车辆颜色不能为空"  type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>发票号:</label>
                                <div class="col-xs-8"><input id="billNo"  name="billNo" onkeyup="value=value.replace(/\s/g,'')"
                                  check="validGetCarInfo(this)"  value="${vo.billNo}" class="form-control" tip="发票号不能为空" obj="not_null"         type="text"></div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>底盘号后六位:</label>
                                <div class="col-xs-8">
                                    <c:if test="${not empty vo}">
                                        <input tip="底盘号后六位不能为空" maxlength="6" onkeyup="value=value.replace(/\s/g,'')" value="${vo.underpanLastSixNo}"  id="underpanLastSixNo"   name="underpanLastSixNo" class="form-control" type="text">
                                    </c:if>
                                   <c:if test="${null ==vo}">
                                    <input tip="底盘号后六位不能为空" maxlength="6"      <c:if test="${cfCarInfoEntity.newOrOld == 0}"> readonly  </c:if> onkeyup="value=value.replace(/\s/g,'')" value="${cfCarInfoEntity.underpanLastSixNo}"   id="underpanLastSixNo"  name="underpanLastSixNo" class="form-control" type="text">
                                   </c:if>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"><span class="red">*</span>初始登记日期:</label>
                                <div class="col-xs-8">
                                    <c:if test="${not empty vo}">
                                        <input id="initRegisterDate" readonly="readonly" onkeyup="value=value.replace(/\s/g,'')"  value='${vo.initRegisterDate}'   check="validGetCarInfo(this)" name="initRegisterDate" class="form-control" tip="初始登记日期不能为空" type="text">
                                    </c:if>
                                   <c:if test="${empty vo}">
                                       <input id="initRegisterDate" readonly="readonly" onkeyup="value=value.replace(/\s/g,'')"  value='<sl:format type="date" show="${cfCarInfoEntity.initRegisterDate}" pattern="yyyy-MM-dd "/>'   check="validGetCarInfo(this)" name="initRegisterDate" class="form-control" tip="初始登记日期不能为空" type="text">
                                   </c:if>
                                </div>
                                <input type="hidden" name="businessOrderAcceptId" id="OrderAcceptId"  value="${businessOrderAcceptId}"/>
                                <input type="hidden" name="cfOneAuditApplyId" id="cfOneAuditApplyId"/>
                                <input type="hidden" name="newOrOld" id="newOrOld" value="${cfCarInfoEntity.newOrOld}"/>
                                <shiro:hasPermission name="carInfoFile:submitGetCar">
                                    <a class="btn btn-sm btn-info submit-button"  style="position: fixed; top: 8px; z-index: 9999; left: 143px;">确定提交</a>
                                </shiro:hasPermission>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </fieldset>
    </div>


    <div class="item-row" id="item-1">
        <fieldset>
            <legend>合格证</legend>
            <div id="files1" class="files">
                <div class="col-sm-2 add-btn" data-type="1">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-2">
        <fieldset>
            <legend>提车影像</legend>
            <div id="files2" class="files">
                <div class="col-sm-2 add-btn" data-type="2">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-3">
        <fieldset>
            <legend>保单</legend>
            <div id="files3" class="files">
                <div class="col-sm-2 add-btn" data-type="3">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-4">
        <fieldset>
            <legend>行驶证</legend>
            <div id="files4" class="files">
                <div class="col-sm-2 add-btn" data-type="4">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-5">
        <fieldset>
            <legend><a  style="color:red">*</a>发票(必填且只能上传一张)</legend>
            <div id="files5" class="files">
                <div class="col-sm-2 add-btn" data-type="5">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-6">
        <fieldset>
            <legend>登记证</legend>
            <div id="files6" class="files">
                <div class="col-sm-2 add-btn" data-type="6">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-other">
        <fieldset>
            <legend>历史附件</legend>
            <div id="files7" class="files">

            </div>
        </fieldset>
    </div>
</div>

</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/car/supplyInfo.js"></script>
<script type="text/template" title="上传提车材料" id="fileCreate-dialog">
    <div class="ibox-content">
        <form id="fileCreateForm" class="form-horizontal">
            <div class="form-group" style="margin:0;">
            <div class="page-container two-line">
                <div id="uploader"></div>
            </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
