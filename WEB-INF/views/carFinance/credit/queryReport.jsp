<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
               <h5><strong>银行征信查询:${bank.bankName}</strong></h5>
            </div>
        </div>
            <div class="col-sm-6 text-right">
                <div class="form-group">
                    <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
                </div>
            </div>
    </div>
</div>
<div class="mod_basic height-auto padding-15 car-finance border-d gallerys" style="border:none;">
    <c:if test="${order.stationaryManName !=null && order.creditQueryTime !=null }">
    <div class="item-row">
        <fieldset>
            <legend>征信查询历史信息</legend>
            <div class="infor-item b-0">
                <div class="box-item row mr-none">
                    <div class="col-xs-6">
                        <div class="item-text">
                            <span style="font-size:18px">征信查询人:</span>
                            <span style="font-size:20px"><code class="alert-danger">${order.stationaryManName}</code></span>
                        </div>
                    </div>
                    <div class="col-xs-6  ">
                        <div class="item-text text-left" >
                            <span style="font-size:18px">征信查询时间:</span>
                            <span style="font-size:20px"><code class="alert-danger"><fmt:formatDate value='${order.creditQueryTime}' pattern='yyyy-MM-dd HH:mm'/></code></span>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
        </c:if>

        <div class="item-row">
        <fieldset>
            <legend>征信查询</legend>
    <div class="ibox-content " id="buyer-form">
        <form class="form-horizontal">
            <div id="add-credit-dialog" style="margin:10px;">
                <input type="hidden" id="size" value="${size} ">
                <input type="hidden" id="businessOrderAcceptId" value="${buyer.businessOrderAcceptId}">
                <div class="buyerForm infor-item">
                	<h5>购车人</h5>
                    <div class="form-group customer" style="margin-right: 0;">
                        <input type="hidden" name="buyerId" value="${buyer.id}">
                        <input type="hidden" name="userType" value="${buyer.userType}">
                        <label class="col-xs-1 control-label">姓名:</label>
                        <div class="col-xs-3"><input type="text" name="realName" class="form-control"
                                                     value="${buyer.realName }" readonly></div>
                        <label class="col-xs-1 control-label">身份证号:</label>
                        <div class="col-xs-3"><input type="text" name="cardNo" class="form-control"
                                                     value="${buyer.cardNo }" readonly/></div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                        <label class="col-xs-1 control-label">信用类别:</label>
                        <div class="col-xs-3">
                            <sl:select name="creditTypeCode" classValue="form-control creditTypeCode" classType="400000"
                                       defaultValue="true" id="creditTypeCode" keyWorld="${buyer.creditTypeCode}"/>
                        </div>
                        <label class="col-xs-1 control-label">信用状态:</label>
                        <div class="col-xs-3">
                            <sl:select name="creditStatusCode" classValue="form-control creditStatusCode" classType="410000"
                                       defaultValue="true" id="creditStatusCode" keyWorld="${buyer.creditStatusCode}"/>
                        </div>
                        <label class="col-xs-1 control-label">结清状态:</label>
                        <div class="col-xs-3">
                            <sl:select name="closeTypeCode" classValue="form-control closeTypeCode" classType="420000"
                                       defaultValue="true" id="closeTypeCode" keyWorld="${buyer.closeTypeCode}"/>
                        </div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                        <label class="col-xs-1 control-label">累计逾期:</label>
                        <div class="col-xs-3"><input type="text" class="form-control" name="addOverdue"
                                                     value="${buyer.addOverdue }"/></div>
                        <label class="col-xs-1 control-label">最高逾期:</label>
                        <div class="col-xs-3"><input type="text" class="form-control" name="highestOverdue"
                                                     value="${buyer.highestOverdue}"/></div>
                        <label class="col-xs-1 control-label">当前逾期:</label>
                        <div class="col-xs-3"><input type="text" class="form-control" name="currentOverdue"
                                                     value="${buyer.currentOverdue }"/></div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
	                    <label class="col-xs-1 control-label">起始日期:</label>
	                    <div class="col-xs-3"><input type="text" id="buyer-sTime" name="sTime" class="form-control"
	                                                 value="<fmt:formatDate value='${buyer.overdueBeginDate}' pattern='yyyy-MM-dd '/>"/>
	                    </div>
                        <label class="col-xs-1 control-label">截止日期:</label>
                        <div class="col-xs-3"><input type="text" id="buyer-eTime" class="form-control" name="eTime"
                                                     value="<sl:format type="date" show="${buyer.overdueEndDate}" pattern="yyyy-MM-dd"/>"/>
                        </div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                        <label class="col-xs-1 control-label"><span class="red">*</span>备注信息:</label>
                        <div class="col-xs-11">
                        <textarea  obj="not_null" class="form-control h-200" name="creditRecord">${buyer.creditRecord}</textarea>
                        </div>
                    </div>

                    <div class="form-group customer">
                        <label class="col-xs-1 control-label">征信附件:</label>
                        <div class="col-xs-9 uploaderErea">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">身份证正面</div>
                                        </div>
                                            <img class="pre-img" src="${staticUrl}${buyer.cardFrontPhotoFilePath}" alt="">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">身份证反面</div>
                                        </div>
                                            <img class="pre-img"src="${staticUrl}${buyer.cardBackPhotoFilePath}" alt="">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">授权书</div>
                                        </div>
                                            <img class="pre-img" src="${staticUrl}${buyer.authorizeLetterPhotoFilePath}" alt="">
                                    </div>
                                </div>
                                
                                <c:if test="${buyer.signaturePhotoFilePath!=null}">
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">签字照片</div>
                                        </div>
                                            <img  class="pre-img" src="${staticUrl}${buyer.signaturePhotoFilePath}" alt="">
                                    </div>
                                </div>
                                </c:if>
                            </div>
                        </div>
                        <div class="col-xs-2" style="margin-top: 30px;">
                            <a data-toggle="modal" class="btn btn-success btn-sm download-file" style="padding:5px 6px;"
                               onclick="downLoad1(${buyer.id})">照片下载(Word)</a>
                            <a data-toggle="modal" class="btn btn-primary btn-sm download-file" style="padding:5px 6px;"
                               onclick="downLoad2(${buyer.id})">照片合成</a>
                        </div>
                    </div>
                </div>
                <c:if test="${shared==null}"><input type="hidden" id="data" value="1"></c:if>
			<c:if test="${shared!=null}">
                <!--配偶  -->
                <div class="buyerForm infor-item">
                	<h5>配偶</h5>
                    <div class="form-group customer" style="margin-right: 0;">
                        <input type="hidden" name="buyerId" value="${shared.id}">
                        <input type="hidden" name="userType" value="${shared.userType}"/>
                        <label class="col-xs-1 control-label">姓名:</label>
                        <div class="col-xs-3"><input type="text" name="realName" class="form-control"
                                                     value="${shared.realName }" readonly></div>
                        <label class="col-xs-1 control-label">身份证号:</label>
                        <div class="col-xs-3"><input type="text" name="cardNo" class="form-control"
                                                     value="${shared.cardNo }" readonly></div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                        <label class="col-xs-1 control-label">信用类别:</label>
                        <div class="col-xs-3">
                            <sl:select name="creditTypeCode" classValue="form-control creditTypeCode" classType="400000"
                                       defaultValue="true" keyWorld="${shared.creditTypeCode}"/>
                        </div>
                        <label class="col-xs-1 control-label">信用状态:</label>
                        <div class="col-xs-3">
                            <sl:select name="creditStatusCode" classValue="form-control creditStatusCode" classType="410000"
                                       defaultValue="true" keyWorld="${shared.creditStatusCode}"/>
                        </div>
                        <label class="col-xs-1 control-label">结清状态:</label>
                        <div class="col-xs-3">
                            <sl:select name="closeTypeCode" classValue="form-control closeTypeCode" classType="420000"
                                       defaultValue="true" keyWorld="${shared.closeTypeCode}"/>
                        </div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                        <label class="col-xs-1 control-label">累计逾期:</label>
                        <div class="col-xs-3"><input type="text" class="form-control" name="addOverdue"
                                                     value="${shared.addOverdue }"/></div>
                        <label class="col-xs-1 control-label">最高逾期:</label>
                        <div class="col-xs-3"><input type="text" class="form-control" name="highestOverdue"
                                                     value="${shared.highestOverdue}"/></div>
                        <label class="col-xs-1 control-label">当前逾期:</label>
                        <div class="col-xs-3"><input type="text" class="form-control" name="currentOverdue"
                                                     value="${shared.currentOverdue }"/></div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                    	<label class="col-xs-1 control-label">起始日期:</label>
                        <div class="col-xs-3"><input type="text" name="sTime" id="shared-sTime" name="sTime"
                                                     value="<fmt:formatDate value='${shared.overdueBeginDate}' pattern='yyyy-MM-dd '/>"
                                                     class="form-control"/></div>
                        <label class="col-xs-1 control-label">截止日期:</label>
                        <div class="col-xs-3"><input type="text" name="eTime" id="shared-eTime" name="eTime"
                                                     value="<fmt:formatDate value='${shared.overdueEndDate}' pattern='yyyy-MM-dd '/>"
                                                     class="form-control"/></div>
                    </div>
                    <div class="form-group customer" style="margin-right: 0;">
                        <label class="col-xs-1 control-label"><span class="red">*</span>备注信息:</label>
                        <div class="col-xs-11">
                        	<textarea class="form-control h-200" obj="not_null" name="creditRecord">${shared.creditRecord}</textarea>
                        </div>
                    </div>

                    <div class="form-group customer">
                        <label class="col-xs-1 control-label">征信附件:</label>
                        <div class="col-xs-9 uploaderErea">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">身份证正面</div>
                                        </div>
                                            <img class="pre-img" src="${staticUrl}${shared.cardFrontPhotoFilePath}" alt="">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">身份证反面</div>
                                        </div>
                                            <img class="pre-img" src="${staticUrl}${shared.cardBackPhotoFilePath}" alt="">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">授权书</div>
                                        </div>
                                            <img class="pre-img" src="${staticUrl}${shared.authorizeLetterPhotoFilePath}" alt="">
                                    </div>
                                </div>
                                 <c:if test="${shared.signaturePhotoFilePath!=null}">
                                <div class="col-sm-3">
                                    <div class="file">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">签字照片</div>
                                        </div>
                                            <img  class="pre-img" src="${staticUrl}${shared.signaturePhotoFilePath}" alt="">
                                    </div>
                                </div>
                                </c:if>
                            </div>
                        </div>
                        <div class="col-xs-2" style="margin-top: 30px;">
                            <a data-toggle="modal" class="btn btn-success btn-sm download-file" style="padding:5px 6px;"
                               onclick="downLoad1(${shared.id})">照片下载(Word)</a>
                            <a data-toggle="modal" class="btn btn-primary btn-sm download-file" style="padding:5px 6px;"
                               onclick="downLoad2(${shared.id})">照片合成</a>
                        </div>
                    </div>
                </div>
			</c:if>
				
                <!--担保人  -->
                <c:forEach items="${sponsors}" var="item" varStatus="status" >
                    <div class="buyerForm infor-item">
	                    <h5>担保人<c:if test="${status.count==1}">一 </c:if>
	                    		<c:if test="${status.count==2}">二</c:if>
	                    		<c:if test="${status.count==3}">三</c:if>
	                    		<c:if test="${status.count==4}">四</c:if>
	                    </h5>
                        <div class="form-group customer" style="margin-right: 0;">
                            <input type="hidden" name="buyerId" value="${item.id}">
                            <input type="hidden" name="userType" value="${item.userType}"/>
                            <label class="col-xs-1 control-label">姓名:</label>
                            <div class="col-xs-3"><input type="text" name="realName" class="form-control"
                                                         value="${item.realName }" readonly></div>
                            <label class="col-xs-1 control-label">身份证号:</label>
                            <div class="col-xs-3"><input type="text" name="cardNo" class="form-control"
                                                         value="${item.cardNo}" readonly></div>
                        </div>
                        <div class="form-group customer" style="margin-right: 0;">
                            <label class="col-xs-1 control-label">信用类别:</label>
                            <div class="col-xs-3">
                                <sl:select name="creditTypeCode" classValue="form-control creditTypeCode" classType="400000"
                                           defaultValue="true" id="creditTypeCode" keyWorld="${item.creditTypeCode}"/>
                            </div>
                            <label class="col-xs-1 control-label">信用状态:</label>
                            <div class="col-xs-3">
                                <sl:select name="creditStatusCode" classValue="form-control creditStatusCode" classType="410000"
                                           defaultValue="true" id="creditStatusCode" keyWorld="${item.creditStatusCode}"/>
                            </div>
                            <label class="col-xs-1 control-label">结清状态:</label>
                            <div class="col-xs-3">
                                <sl:select name="closeTypeCode" classValue="form-control closeTypeCode" classType="420000"
                                           defaultValue="true" id="closeTypeCode" keyWorld="${item.closeTypeCode}"/>
                            </div>
                        </div>
                        <div class="form-group customer" style="margin-right: 0;">
                            <label class="col-xs-1 control-label">累计逾期:</label>
                            <div class="col-xs-3"><input type="text" name="addOverdue" class="form-control"
                                                         value="${item.addOverdue}"/></div>
                            <label class="col-xs-1 control-label">最高逾期:</label>
                            <div class="col-xs-3"><input type="text" name="highestOverdue" class="form-control"
                                                         value="${item.highestOverdue}"/></div>
                            <label class="col-xs-1 control-label">当前逾期:</label>
                            <div class="col-xs-3"><input type="text" name="currentOverdue" class="form-control"
                                                         value="${item.currentOverdue}"/></div>
                        </div>
                        <div class="form-group customer" style="margin-right: 0;">
                            <label class="col-xs-1 control-label">起始日期:</label>
                            <div class="col-xs-3"><input type="text" name="sTime" id="sTime${status.count}"
                                                         value="<fmt:formatDate value='${item.overdueBeginDate}' pattern='yyyy-MM-dd '/>"
                                                         class="form-control"/></div>
                            <label class="col-xs-1 control-label">截止日期:</label>
                            <div class="col-xs-3"><input type="text" name="eTime" id="eTime${status.count}"
                                                         value="<fmt:formatDate value='${item.overdueEndDate}' pattern='yyyy-MM-dd '/>"
                                                         class="form-control"/></div>
                        
                        </div>
                        <div class="form-group customer" style="margin-right: 0;">
                            <label class="col-xs-1 control-label"><span class="red">*</span>备注信息:</label>
                            <div class="col-xs-11">
                        		<textarea class="form-control h-200" obj="not_null"    name="creditRecord">${item.creditRecord}</textarea>
                            </div>
                        </div>

                        <div class="form-group customer">
                            <label class="col-xs-1 control-label">征信附件:</label>
                            <div class="col-xs-9 uploaderErea">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="file">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">身份证正面</div>
                                            </div>
                                                <img class="pre-img" src="${staticUrl}${item.cardFrontPhotoFilePath}" alt="">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="file">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">身份证反面</div>
                                            </div>
                                                <img  class="pre-img" src="${staticUrl}${item.cardBackPhotoFilePath}" alt="">
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-3">
                                        <div class="file">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">授权书</div>
                                            </div>
                                                <img class="pre-img" src="${staticUrl}${item.authorizeLetterPhotoFilePath}" alt="">
                                        </div>
                                    </div>
                                    <c:if test="${item.signaturePhotoFilePath!=null}">
                                    <div class="col-sm-3">
                                        <div class="file">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">签字照片</div>
                                            </div>
                                                <img class="pre-img" src="${staticUrl}${item.signaturePhotoFilePath}" alt="">
                                        </div>
                                    </div>
                                    </c:if>
                                </div>
                            </div>
                            <div class="col-xs-2" style="margin-top: 30px;">
                                <a data-toggle="modal" class="btn btn-success btn-sm download-file" style="padding:5px 6px;"
                                   onclick="downLoad1(${item.id})">照片下载(Word)</a>
                                <a data-toggle="modal" class="btn btn-primary btn-sm download-file" style="padding:5px 6px;"
                                   onclick="downLoad2(${item.id})">照片合成</a>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </form>
        <div class="dialog-manage">
             <a data-toggle="modal" class="btn btn-danger refuse-credit">退回</a>
            <a type="button" class="btn btn-primary save" data-type="1">保存</a>&nbsp;
             <a type="button" class="btn btn-success submit  " data-type="2">提交</a>&nbsp;
            <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
                <a type="button" class="btn btn-default" href="javascript:history.go(-1)">取消</a>
            </c:if>
        </div>
    </div>
        </fieldset>
    </div >
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/credit/bankCreditReport.js"></script>
<script type="text/template" title="备注" id="protocolCreate-dialog">
    <div class="ibox-content">
        <form id="protocolCreateForm" class="form-horizontal">
            <div id="protocolCreateDialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>退回备注:</label>
                    <div class="col-xs-8">
		             	<textarea rows="5" cols="150" type="text" class="form-control" id="credit-content"
                                   name="remark" tip="退回备注" check="validProtocolForm(this)" value=""></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>



</html>