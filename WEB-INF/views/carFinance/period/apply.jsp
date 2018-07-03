<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>分期申请</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	<link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
	<div class="mod_header">
		<div class="row">
			<div class="col-sm-12 text-left">
				<h5><strong>申请分期</strong>
				<code>&lt;订单编号:${order.orderNo}&gt;</code>
				</h5>
			</div>
		</div>
	</div>
	<div class="mod_basic car-finance padding-min animated">
		<div id="apply-period-wrap" class=" ibox-content">
			<div class="form-horizontal">
				<form class="apply-period-form">
					<input type="hidden" value="${order.id}" name="orderId" id="order-id">
					<input type="hidden" value="${carInfo.newOrOld}" name="newOrOld" id="new-old">
					<input type="hidden" value="${staticUrl}" id="staticUrl" name="staticUrl"/>
					<input type="hidden" value='${baseFiles}' id="apply-period-base-file-hidden">
					<input type="hidden" value='${buyerFiles}' id="apply-period-buyer-file-hidden">
					<input type="hidden" value='${sharedFiles}' id="apply-period-shared-file-hidden">
					<c:if test="${not empty order.periodApplyStatus && order.periodApplyStatus == 3 }">
						<div class="item-row">
							<fieldset>
								<legend>退回信息</legend>
								<div class="form-horizontal">
									<div class="m-rl-tb m-t-xs row">
										<label class="col-md-1 control-label">退回原因:</label>
										<div class='col-md-7'>
											<textarea class="form-control" rows="4" readonly="readonly" cols="1" >${order.periodApplyBackDescription}</textarea>
										</div>
										<label class="col-md-1 control-label">退回时间:</label>
										<div class='col-md-3'>
											<input class="form-control" readonly="readonly" type="text"  value='<sl:format type="date" show="${order.periodApplyBackTime}" pattern="yyyy-MM-dd HH:mm"/>' />
										</div>
									</div>
								</div>
							</fieldset>
						</div>
					</c:if>
					<%-- end 退回信息row --%>
			
					<div id="buyer-info" class="item-row">
						<fieldset>
							<legend>基本信息</legend>
							<div class="form-horizontal">
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label">客户姓名:</label>
									<div class='col-md-2'>
										<c:if test="${empty buyerInfo.realName}">
											<input class="form-control" name="buyerName" type="text" value=""/>
										</c:if>
										<c:if test="${not empty buyerInfo.realName}">
											<input class="form-control" name="buyerName" type="text" readonly="readonly" value="${buyerInfo.realName}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">身份证号码:</label>
									<div class='col-md-2'>
										<c:if test="${empty buyerInfo.cardNo}">
											<input name="buyerCardNo" class="form-control" type="text" value=""/>
										</c:if>
										<c:if test="${not empty buyerInfo.cardNo}">
											<input class="form-control" name="buyerCardNo" type="text" readonly="readonly" value="${buyerInfo.cardNo}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">手机号码:</label>
									<div class='col-md-2'>
										<c:if test="${empty buyerInfo.tel}">
											<input class="form-control" name="tel" type="text" value=""/>
										</c:if>
										<c:if test="${not empty buyerInfo.tel}">
											<input class="form-control" name="tel" type="text" readonly="readonly" value="${buyerInfo.tel}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">单位名称:</label>
									<div class='col-md-2'>
										<c:if test="${empty companyInfo.companyName}">
											<input class="form-control" name="companyName" type="text" value=""/>
										</c:if>
										<c:if test="${not empty companyInfo.companyName}">
											<input class="form-control" name="companyName" type="text" readonly="readonly" value="${companyInfo.companyName}"/>
										</c:if>
									</div>
								</div>
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label">家庭地址:</label>
									<div class='col-md-5'>
										<div class="form-inline">
											<div class="form-group mr-none">
												<c:if test="${empty buyerInfo.currentAddress}">
													<input class="form-control" name="currentAddress" type="text" value=""/>
												</c:if>
												<c:if test="${not empty buyerInfo.currentAddress}">
													<input class="form-control" name="currentAddress" type="text" readonly="readonly" value="${buyerInfo.currentAddress}"/>
												</c:if>
											</div>
											<div class="form-group mr-none">
												<c:if test="${empty buyerInfo.currentAddressDetail}">
													<input class="form-control" name="currentAddressDetail" type="text" value=""/>
												</c:if>
												<c:if test="${not empty buyerInfo.currentAddressDetail}">
													<input class="form-control" name="currentAddressDetail" type="text" readonly="readonly" value="${buyerInfo.currentAddressDetail}"/>
												</c:if>
											</div>
										</div>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>申请备注:</label>
									<div class='col-md-5'>
										<textarea id="apply-period-remark" tip="申请备注不能为空" reg="not_null" class="form-control" name="remark" rows="3" cols="1">${order.periodApplyDescription}</textarea>
										<span class="help-block m-b-none"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
									</div>
								</div>
							</div>
						</fieldset>
					</div>
					<%-- end 基本信息 row --%>
					
					<div id="car-info" class="item-row">
						<fieldset>
							<legend>车辆信息 </legend>
							<div class="form-horizontal">
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label">车辆型号:</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.brandName}">
											<input class="form-control" name="brandName" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.brandName}">
											<input class="form-control" name="brandName" type="text" readonly="readonly" value="${carInfo.brandName}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">车辆价格(元):</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.auditCarPrice}">
											<input class="form-control" name="auditCarPrice" type="text"/>
										</c:if>
										<c:if test="${not empty carInfo.auditCarPrice}">
											<input class="form-control" name="auditCarPrice" type="text" readonly="readonly"  value='<sl:format type="number" show="${carInfo.auditCarPrice}" pattern="#,##0.00"/>' />
										</c:if>
									</div>
									<label class="col-md-1 control-label">车架号:</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.vinNo}">
											<input class="form-control" name="vinNo" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.vinNo}">
											<input class="form-control" name="vinNo" type="text" readonly="readonly" value="${carInfo.vinNo}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">登记证书编号:</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.registerLicenseNo}">
											<input id="certificate-regist-license" name="certificateRegistLicense" class="form-control" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.registerLicenseNo}">
											<input id="certificate-regist-license" name="certificateRegistLicense" readonly="readonly" class="form-control" type="text" value="${carInfo.registerLicenseNo}"/>
										</c:if>
									</div>
								</div>
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label">经销商:</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.dealerName}">
											<input class="form-control" name="dealerName" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.dealerName}">
											<input class="form-control" name="dealerName" type="text" readonly="readonly" value="${carInfo.dealerName}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">车牌号:</label>
									<div class='col-md-2'>
									
										<c:if test="${empty carInfo.plateNumber}">
											<input class="form-control" name="plateNumber" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.plateNumber}">
											<input class="form-control" name="plateNumber" type="text" readonly="readonly" value="${carInfo.plateNumber}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">首付金额(元):</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.actualFirstPay}">
											<input class="form-control" name="actualFirstPay" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.actualFirstPay}">
											<input class="form-control" name="actualFirstPay" type="text" readonly="readonly"  value='<sl:format type="number" show="${carInfo.actualFirstPay}" pattern="#,##0.00"/>' />
										</c:if>
									</div>
									<label class="col-md-1 control-label">分期金额(元):</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.actualLoadMoney}">
											<input class="form-control" name="actualLoadMoney" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.actualLoadMoney}">
											<input class="form-control" name="actualLoadMoney" type="text" readonly="readonly"  value='<sl:format type="number" show="${carInfo.actualLoadMoney}" pattern="#,##0.00"/>' />
										</c:if>
									</div>
								</div>
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label">分期期数(月):</label>
									<div class='col-md-2'>
										<input type="hidden" name="loanPeriodMonthCode" value="${carInfo.loanPeriodMonthCode}" id="loan-period-month-code">
										<select <c:if test="${not empty carInfo.loanPeriodMonthCode}"> disabled="disabled" </c:if> id="loan-period-month-code-select" name="loanPeriodMonthCode"></select>
									</div>
									<label class="col-md-1 control-label">分期手续费率:</label>
									<div class='col-md-2'>
										<c:if test="${empty carInfo.bankRate}">
											<input class="form-control" name="bankRate" type="text" value=""/>
										</c:if>
										<c:if test="${not empty carInfo.bankRate}">
											<input class="form-control" name="bankRate" type="text" readonly="readonly" value="${carInfo.bankRate}"/>
										</c:if>
									</div>
									<label class="col-md-1 control-label">贷记卡号:</label>
									<div class='col-md-2'>
										<c:if test="${empty lendInfo.cardNo}">
											<input id="loan-repay-card-number" name="repayCardNumber" class="form-control" type="text" value=""/>
										</c:if>
										<c:if test="${not empty lendInfo.cardNo}">
											<input id="loan-repay-card-number" name="repayCardNumber" class="form-control" type="text" readonly="readonly" value="${lendInfo.cardNo}"/>
										</c:if>
									</div>
									<c:if test="${carInfo.newOrOld == 0}">
										<label class="col-md-1 control-label">车辆评估价格(元):</label>
										<div class='col-md-2'>
											<input type="hidden" name="yearLimit" value="${carInfo.yearLimit}">
											<input id="init-evaluate-price" name="initEvaluatePrice" class="form-control" readonly="readonly" type="text" value='<sl:format type="number" show="${carInfo.initEvaluatePrice}" pattern="#,##0.00"/>'/>
										</div>
									</c:if>
								</div>
								<c:if test="${carInfo.newOrOld == 0}">
									<div class="m-rl-tb m-t-xs row">
										<label class="col-md-1 control-label">评估员:</label>
										<div class='col-md-2'>
											<input id="evaluate-user-name" name="evaluateUserName" class="form-control" value="${carInfo.evaluateUserName}" type="text" readonly="readonly" />
										</div>
									</div>
								</c:if>
							</div>
						</fieldset>
					</div>
					<%-- end 车辆信息 row --%>
				
					<div id="apply-period-file-list" class="item-row gallerys">
						<fieldset>
							<legend>申请附件 </legend>
								<div class="form-group">
									<label class="col-xs-1 control-label"><span class="red">*</span>购车人附件:</label>
									<div class="col-xs-11 uploaderErea">
										<div class="row customer-container mr-none"></div>
									</div>
								</div>
								<c:if test="${buyerInfo.marriedCode == '500001' }">
									<div class="form-group">
										<label class="col-xs-1 control-label"><span class="red">*</span>配偶附件:</label>
										<div class="col-xs-11">
											<div class="m-rl-tb m-t-xs row parter-container"></div>
										</div>
									</div>
								</c:if>
								
								<c:if test="${buyerInfo.marriedCode == '500002' or buyerInfo.marriedCode == '500004'}">
									<div class="form-group">
										<label class="col-xs-1 control-label"><span class="red">*</span>单身证附件:</label>
										<div class="col-xs-11 uploaderErea">
											<div class="row single-container  mr-none"></div>
										</div>
									</div>
								</c:if>
								<c:if test="${buyerInfo.marriedCode == '500003'}">
									<div class="form-group">
										<label class="col-xs-1 control-label"><span class="red">*</span>离婚证附件:</label>
										<div class="col-xs-11 uploaderErea">
											<div class="dividle-container row mr-none"></div>
										</div>
									</div>
								</c:if>
								
								<div class="form-group">
									<label class="col-xs-1 control-label"><span class="red">*</span>注册登记附件:</label>
									<div class="col-xs-11 uploaderErea">
										<div class="row regist-container mr-none"></div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-xs-1 control-label"><span class="red">*</span>户口本附件:</label>
									<div class="col-xs-11 uploaderErea">
										<div class="row household-container mr-none">
											
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-xs-1 control-label"><span class="red">*</span>上门照附件:</label>
									<div class="col-xs-11 uploaderErea">
										<div class="row visit-container mr-none"></div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-xs-1 control-label"><span class="red">*</span>其它附件:</label>
									<div class="col-xs-11 uploaderErea">
										<div class="row other-container mr-none">
											 
										</div>
									</div>
								</div>
						</fieldset>
					</div>
					<%-- end 上传附件 row --%>
					<div class="m-rl-tb row" id="audit-operate-2">
						<div class="col-md-12 text-right">
							<button data-id="${order.id}" class="btn btn-w-m btn-success agree-apply-period-btn">提交</button>
							<button data-id="${order.id}" class="btn btn-w-m btn-danger m-r-xs back-apply-period-btn">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<sl:dictData type="120000,290000,420000,430000,440000,450000,460000,470000,480000,500000,490000,510000,520000,530000"/>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/period/apply.js"></script>
</html>

