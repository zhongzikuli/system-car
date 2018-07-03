<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html>
<head>
		<title>订单详情</title>
		<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
		<link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
		<%@include file="/WEB-INF/views/carFinance/order/permission.jsp" %>
		<div class="mod_header">
			<div class="row">
				<div class="col-sm-3">
					<h5><strong>订单详情</strong>
						--当前状态:<code><slt:OrderStatus showValue="${acceptOrder.orderStatus}"/></code>
					</h5>
				</div>
				<div class="col-sm-9 text-right">
					<div class="form-group">
						<c:if test="${acceptOrder.orderStatus < 20}">
							<shiro:hasPermission name="OrderDetail:updateCreditPerson">
								<button type="button" class="btn btn-sm btn-primary change-credit-person-btn">更换信贷专员</button>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${acceptOrder.fromYuwei ne 1 && acceptOrder.orderStatus ge 3 }">
							<shiro:hasPermission name="OrderDetail:backCredit">
								<button type="button" class="btn btn-w-m btn-success back-credit-btn">退回征信查询</button>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${acceptOrder.fromYuwei ne 1 && (acceptOrder.orderStatus == 0 || acceptOrder.orderStatus == 1 || acceptOrder.orderStatus == -1 || acceptOrder.orderStatus == -2)}">
							<shiro:hasPermission name="OrderDetail:discardOrder">
								<button type="button" class="btn btn-w-m btn-danger discard-order-btn">作废订单</button>
							</shiro:hasPermission>
						</c:if>
						
						<shiro:hasPermission name="OrderDetail:queryCredit">
							<button type="button" class="btn btn-w-m btn-warning query-credit-btn">征信查询</button>
						</shiro:hasPermission>
					</div>
				</div>
			</div>
		</div>	<%-- end header --%>
		
		<div class="mod_basic height-auto">
			<div class="form-group">
				<div class="form-horizontal">
					<div class="m-rl-tb m-t-xs row">
						<label class="col-md-1 control-label">购车人:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="${acceptOrder.buyerName}" id="buyerName" name="buyerName" class="form-control" type="text">
						</div>
						<label class="control-label col-md-1">身份证号:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="${acceptOrder.buyerCardNo}" name="buyerCardNo" class="form-control" type="text"></div>
						<label class="col-md-1 control-label">订单编号:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="${acceptOrder.orderNo}" name="orderNo" class="form-control" type="text">
						</div>
						<label class="col-md-1 control-label">部门:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="${acceptOrder.departmentName}" name="departName" class="form-control" type="text">
						</div>
					</div>
				</div>
			</div>
			
			<div class="form-group">
				<div class="form-horizontal">
					<div class="m-rl-tb m-t-xs row">
						<label class="col-md-1 control-label">贷款银行:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="${acceptOrder.loanBank}" name="bankName" class="form-control" type="text"></div>
						<label class="col-md-1 control-label">信贷专员:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="${acceptOrder.creditPerson}" name="creditPerson" class="form-control" type="text"></div>
						<label class="col-md-1 control-label">经销商:</label>
						<div class="col-md-2">
							<input id="carDealerId" type="hidden" name="carDealerId" value = "${acceptOrder.carDealerId}" >
							<input readonly="readonly" value="${acceptOrder.dealerName}" name="dealerName" class="form-control" type="text"></div>
						<label class="col-md-1 control-label">平台外逾期:</label>
						<div class="col-md-2">
							<input readonly="readonly" value="<c:if test="${acceptOrder.overDue == 1}">是</c:if><c:if test="${acceptOrder.overDue != 1}">否</c:if>" class="form-control" type="text">
						</div>
					</div>
				</div>
			</div>
			
			<div class="hr-line-dashed"></div>
			<div class="form-group">
				<div id="order-process-status-wrap" class="clear order-process-status-wrap">
					<%--
					<div id="order-process-wrap" class="clear order-process"></div>
					 --%>
					<div id="order-status-wrap" class="clear order-status mod_basic"></div>
				</div>
			</div>	<%-- end 流程图 --%>
			<div class="hr-line-dashed"></div>
			
			<div class="ibox-content min-h-250">
				<div class="tabs-container car-finance padding-min order-detail-tab">
					<input type="hidden" value="${acceptOrder.id}" id="acceptId" name="acceptId"/>
					<input type="hidden" value="${acceptOrder.bankId}" id="bankId"/>
					<input type="hidden" value="${acceptOrder.orderStatus}" id="orderStatus" name="orderStatus"/>
					<input type="hidden" value="${auditUser}" id="auditUser" name="auditUser"/>
					<input type="hidden" value="${auditDate}" id="auditDate" name="auditDate"/>
					<input type="hidden" value="${staticUrl}" id="staticUrl" name="staticUrl"/>
					<ul class="nav nav-tabs">
						<shiro:hasPermission name="OrderDetail:buyerInfo">
							<li <c:if test='${active eq "buyerInfo"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-buyer">购车人</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:sharedInfo">
							<li <c:if test='${active eq "sharedInfo"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-shared">配偶信息</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:sponsorInfo">
							<li <c:if test='${active eq "sponsorInfo"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-sponsor">担保信息</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:carInfo">
							<li <c:if test='${active eq "carInfo"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-car">车辆信息</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:auditInfo">
							<li <c:if test='${active eq "auditInfo"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-audit">审核信息</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:playMoney">
							<li <c:if test='${active eq "playMoney"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-loan">放贷信息</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:mortgageRegistTab">
							<li <c:if test='${active eq "mortgageRegist"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-regist">注册抵押</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:insurance">
							<li <c:if test='${active eq "insurance"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-insurcace">保险信息</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:insuranceClaim">
							<li <c:if test='${active eq "insuranceClaim"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-insurcace-claim">出险情况</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:overdue">
							<li <c:if test='${active eq "overdue"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-over-due">逾期情况</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:financialPay">
							<li <c:if test='${active eq "financialPay"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-financial-pay">财务打款</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:financialIncome">
							<li <c:if test='${active eq "financialIncome"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-financial-income">财务收支</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:fileInfo">
							<li <c:if test='${active eq "fileInfo"}'> class="active"</c:if> ><a data-toggle="tab" href="#tab-file-info">订单附件</a></li>
						</shiro:hasPermission>
					</ul>	<%-- end tab title --%>
					<div class="tab-content">
						<shiro:hasPermission name="OrderDetail:buyerInfo">
							<c:set var="selectBuyer" value="tab-pane"/>
							<c:if test='${active eq "buyerInfo"}'>
								<c:set var="selectBuyer" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-buyer" class="${selectBuyer}">
								<div id="audit-detail-buyer-information-list"></div>
							</div>
						</shiro:hasPermission>	<%-- end 购车人信息tab --%>
		
						<shiro:hasPermission name="OrderDetail:sharedInfo">
							<c:set var="selectShared" value="tab-pane"/>
							<c:if test='${active eq "sharedInfo"}'>
								<c:set var="selectShared" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-shared" class="${selectShared}">
								<div id="audit-detail-parter-information-list"></div>
							</div>
						</shiro:hasPermission>	<%-- end 配偶信息tab --%>
		
						<shiro:hasPermission name="OrderDetail:sponsorInfo">
							<c:set var="selectSponsor" value="tab-pane"/>
							<c:if test='${active eq "sponsorInfo"}'>
								<c:set var="selectSponsor" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-sponsor" class="${selectSponsor}">
								<div id="audit-detail-sponsor-information-list"></div>
							</div>
						</shiro:hasPermission>	<%-- end 担保信息tab --%>

						<shiro:hasPermission name="OrderDetail:carInfo">
							<c:set var="selectCarInfo" value="tab-pane"/>
							<c:if test='${active eq "carInfo"}'>
								<c:set var="selectCarInfo" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-car" class="${selectCarInfo } m-b m-t-xs">
								<fieldset>
									<legend>车辆信息</legend>
									<form class="carinfoForm">
										<input type="hidden" value="" id="carNoId" name="carNoId"/>
										<div id="audit-detail-car-information-list"></div>
									</form>
								</fieldset>
								<fieldset>
									<legend>车辆信息补录</legend>
										<div id="audit-detail-car-information-supply" class="form-horizontal">
											<form>
												<div class="m-rl-tb row">
													<label class="col-md-1 control-label">车辆类别:</label>
													<div class="col-md-2">
														<input value="" name="category" class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">发票开具单位:</label>
													<div class="col-md-2">
														<input value="" name="billCompany" class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">发票号:</label>
													<div class="col-md-2">
														<input value="" name="billNo" class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">具体车型:</label>
													<div class="col-md-2">
														<input value="" name="carDetail" class="form-control" type="text">
													</div>
												</div>
											
												<div class="m-rl-tb row">
													<label class="col-md-1 control-label">车架号:</label>
													<div class="col-md-2">
														<input value="" id="supply-car-info-vin-no" check="validForm(this)" name="vinNo" class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">底盘号后六位:</label>
													<div class="col-md-2">
														<input value="" id="supply-car-info-last-six-no" name="underpanLastSixNo" class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">发动机号:</label>
													<div class="col-md-2">
														<input value="" name="engineNo" class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">车辆颜色:</label>
													<div class="col-md-2">
														<input value="" name="carColor" class="form-control" type="text">
													</div>
												</div>
											
												<div class="m-rl-tb row">
													<label class="col-md-1 control-label">初始登记日期:</label>
													<div class="col-md-2">
														<input value="" name="initRegisterDate" id="initRegisterDate"class="form-control" type="text">
													</div>
													<label class="col-md-1 control-label">车辆附加费(元):</label>
													<div class="col-md-2">
														<input value="" name="carExtraFee" id="carExtraFee"class="form-control" check="validForm(this)" type="text">
													</div>
													<div class="col-md-6 text-right">
														<c:if test="${acceptOrder.orderStatus ge 4 }">		<%-- 财务打款后方可操作 --%>
															<shiro:hasPermission name="OrderDetail:exportExcelCarInfo">
																<button id="supply-excel-btn" type="button" class="btn btn-w-m btn-info"> <i class="fa fa-file-excel-o"></i>Excel合同生成</button>
															</shiro:hasPermission>
														</c:if>
														<c:if test="${acceptOrder.orderStatus ge 4 }">		<%--  初审通过后可操作 task:478 --%>
															<shiro:hasPermission name="OrderDetail:saveSupplyCarInfo">
																<button id="supply-save-btn" type="button" class="btn btn-w-m btn-info"><i class="fa fa-paste"></i>补录内容保存</button>
															</shiro:hasPermission>
														</c:if>
													</div>
												</div>
												
												<div class="m-rl-tb row">
													<label class="col-md-1 control-label">备注:</label>
													<div class="col-md-5">
														<textarea maxlength="1000" id="supply-car-info-remark"  onkeyup="checkLen(1000,this)" name="supplyRemark" class="form-control" style="height:80px"></textarea>
														<span class="textarea-tip" style="color: #999;font-size: 10px;"><i class="fa fa-info-circle" style="margin-right: 5px;"></i>您已输入<span class="count red">0</span>个字符,还可以输入<span class="remainCount red">1000</span>个字符</span>
													</div>
												</div>
												
											</form>
										</div>
								</fieldset>
								
								<fieldset>
									<legend>卡单信息</legend>
									<div id="audit-detail-card-information" class="form-horizontal">
										<div class="m-rl-tb row">
											<label class="col-md-1 control-label">提前开卡送行日期:</label>
											<div class="col-md-2">
												<input id="preCardSendToBankDate" value='<sl:format type="date" show="${acceptOrder.preCardSendToBankDate}" pattern="yyyy-MM-dd"/>' name="preCardSendToBankDate" class="form-control" type="text">
											</div>
											<label class="col-md-1 control-label">信用卡申请书编号:</label>
											<div class="col-md-2">
												<input id="creditCardApplyNo" value="${acceptOrder.creditCardApplyNo}" name="creditCardApplyNo" class="form-control" type="text">
											</div>
											<%--
											<label class="col-md-1 control-label">保单号:</label>
											<div class="col-md-2">
												<input id="insuranceNo" value="${acceptOrder.insuranceNo}" name="insuranceNo" class="form-control" type="text">
											</div>
											<label class="col-md-1 control-label">保单公司核对号:</label>
											<div class="col-md-2">
												<input id="insuranceCompanyCheckNo" value="${acceptOrder.insuranceCompanyCheckNo}" name="insuranceCompanyCheckNo" class="form-control" type="text">
											</div>
											 --%>
										</div>
										<div class="m-rl-tb row">
											<label class="col-md-1 control-label">卡单备注:</label>
											<div class="col-md-5">
												<textarea id="cardBak" name="cardBak" class="form-control">${acceptOrder.cardBak}</textarea>
											</div>
										</div>
										<div class="m-rl-tb row">
											<label class="col-md-1 control-label">经办人:</label>
											<div class="col-md-2">
												<input id="cardPersonName" <c:if test="${empty acceptOrder.cardPersonName}"> value="${auditUser}"</c:if> <c:if test="${not empty acceptOrder.cardPersonName}"> value="${acceptOrder.cardPersonName}" </c:if> readonly="readonly" name="cardPersonName" class="form-control" type="text">
											</div>
											<label class="col-md-1 control-label">经办日期:</label>
											<div class="col-md-2">
												<input id="cardDate"  name="cardDate" <c:if test="${empty acceptOrder.cardDate}"> value="${auditDate}"</c:if> <c:if test="${not empty acceptOrder.cardDate}"> value='<sl:format type="date" show="${acceptOrder.cardDate}" pattern="yyyy-MM-dd"/>' </c:if> readonly="readonly" class="form-control" type="text">
											</div>
											<div class="col-md-2 text-right">
												<c:if test="${acceptOrder.orderStatus ge 1}">		<%-- 初审单提交后方可操作 --%>
													<shiro:hasPermission name="OrderDetail:saveCardInfo">
														<button id="save-card-info-btn" type="button" class="btn btn-w-m btn-success">卡单保存</button>
													</shiro:hasPermission>
												</c:if>
											</div>
										</div>
									</div>
								</fieldset>

								<fieldset>
									<legend>GPS信息</legend>
									<div id="audit-detail-car-gps-information" class="form-horizontal">
										<div class="m-rl-tb row">
											<label class="col-md-1 control-label">GPS安装日期:</label>
											<div class="col-md-2">
												<input id="setupDate" value="" name="gpsInstallDate" class="form-control" type="text">
											</div>
											<label class="col-md-1 control-label">GPS序列号:</label>
											<div class="col-md-2">
												<input id="gpsNumber" value="" name="gpsSeriaNo" class="form-control" type="text">
											</div>
										</div>
										<div class="m-rl-tb row">
											<label class="col-md-1 control-label">GPS备注:</label>
											<div class="col-md-5">
												<textarea id="gpsDesc" name="gpsRemark" class="form-control"></textarea>
											</div>
											<div class="col-md-2 text-right">
												<%--<c:if test="${acceptOrder.orderStatus ge 20 }">	</c:if>task:662	财务打款后方可操作 --%>
												<shiro:hasPermission name="OrderDetail:saveGPSCarInfo">
													<button id="gps-save-btn" type="button" class="btn btn-w-m btn-info"><i class="fa fa-paste"></i>GPS信息保存</button>
												</shiro:hasPermission>
											</div>
										</div>
									</div>
								</fieldset>
							</div>
						</shiro:hasPermission>	<%-- end 车辆信息tab --%>
		
						<shiro:hasPermission name="OrderDetail:auditInfo">
							<c:set var="selectAuditInfo" value="tab-pane"/>
							<c:if test='${active eq "auditInfo"}'>
								<c:set var="selectAuditInfo" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-audit" class="${selectAuditInfo }">
								<fieldset>
									<legend>征信信息</legend>
									<div id="audit-detail-credit-list" class="clear mod_basic no-bottom"></div>
								</fieldset>
								
								<c:if test="${not empty acceptOrder.specialApplyBak}">
									<fieldset>
										<legend>通融申请</legend>
										<div class="padding-15">
											<h5>情况说明：</h5>
											<p>&nbsp;&nbsp;&nbsp;&nbsp;${acceptOrder.specialApplyBak}</p>
										</div>
									</fieldset>
								</c:if>
								
								<fieldset>
									<legend>大数据征信</legend>
									<div class="clear mod_basic no-bottom b-0">
										<div class="row mr-none" id="detail-credit-wrap">
											<button class="btn btn-info btn-xs detail-credit-btn" type="button">详情查看</button>
										</div>
									</div>
									<div id="detail-big-data-list" class="clear mod_basic no-bottom"></div>
								</fieldset>
								
								<%--
								<c:if test="${not empty acceptOrder.runAutoAudit && acceptOrder.runAutoAudit eq 1}"></c:if>
								 --%>
								<fieldset>
									<legend>自动化审批</legend>
									<div class="clear mod_basic no-bottom b-0">
										<div class="row mr-none" id="detail-credit-wrap">
											<button class="btn btn-info btn-xs auto-credit-btn" type="button">详情查看</button>
										</div>
									</div>
									<div id="auto-audit-list" class="clear mod_basic no-bottom"></div>
								</fieldset>
								
								<fieldset>
									<legend>历史订单</legend>
									<div id="detail-history-order-list" class="mod_basic no-bottom"></div>
								</fieldset>
								<fieldset>
									<legend>视频面签</legend>
                                    <input type="hidden" id="video_url" value=""/>
									<div id="detail-video-order-list" class="mod_basic no-bottom">

                                    </div>
								</fieldset>
								<fieldset>
									<legend>审核信息</legend>
									<div id="audit-detail-audit-list" class="mod_basic no-bottom"></div>
								</fieldset>
							</div>
						</shiro:hasPermission>	<%-- end 审核信息tab --%>
		
						<shiro:hasPermission name="OrderDetail:playMoney">
							<c:set var="selectPlayMoney" value="tab-pane"/>
							<c:if test='${active eq "playMoney"}'>
								<c:set var="selectPlayMoney" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-loan" class="${selectPlayMoney}">
								<fieldset>
									<legend>放款信息</legend>
									<div id="loan-info" class="form-grou"></div>
									<div class="form-group text-right">
										<shiro:hasPermission name="OrderDetail:confirmPlayMoney">
											<c:if test="${ acceptOrder.orderStatus eq 19}">
													<a class="btn btn-primary financial-confirmPlayMoney">打款确认</a>
											</c:if>
													<input type="hidden" class="btn btn-w-m btn-warning m-r-xs financial-confirmPlayMoney-Jurisdiction">
										</shiro:hasPermission>
										<shiro:hasPermission name="OrderDetail:confirmPlayMoney">
											<c:if test="${ acceptOrder.orderStatus eq 19}">
												<a class="btn btn-success financial-confirmPlayPrincipalMoney">贷款本金打款确认</a>
											</c:if>
											<input type="hidden" class="btn btn-w-m btn-warning m-r-xs financial-confirmPlayMoney-Jurisdiction">
										</shiro:hasPermission>
										<c:if test="${acceptOrder.orderStatus ge 12 }">
											<shiro:hasPermission name="OrderDetail:savePlayMoney">
												<a class="btn btn-w-m btn-info m-r-xs financial-savePlayMoney">放款保存 </a>
											</shiro:hasPermission>
											<shiro:hasPermission name="OrderDetail:dealPlayMoney">
											<c:if test="${acceptOrder.orderStatus eq 20}">
													<a class="btn btn-w-m btn-success financial-dealPlayMoney">放款成交</a>
											</c:if>
											<input type="hidden" class="btn btn-w-m btn-warning m-r-xs financial-dealPlayMoney-Jurisdiction">
											</shiro:hasPermission>
											<shiro:hasPermission name="OrderDetail:cancelPlayMoney">
												<c:if test="${acceptOrder.orderStatus >= 20 && acceptOrder.orderStatus <50 }">
													<a class="btn btn-w-m btn-warning m-r-xs financial-cancelPlayMoney">撤回打款</a>
												</c:if>
												<c:if test="${acceptOrder.orderStatus ge 19}">
													<input type="hidden" class="btn btn-w-m btn-warning m-r-xs financial-cancelPlayMoney-Jurisdiction">
												</c:if>
											</shiro:hasPermission>
											<shiro:hasPermission name="OrderDetail:returnPlayMoney">
												<a class="btn btn-primary financial-comeinPlayMoney">转贷后保存</a>
											</shiro:hasPermission>
										</c:if>
											<shiro:hasPermission name="OrderDetail:cancelPlayDealing">
												<c:if test="${acceptOrder.orderStatus eq 28}">
														<a class="btn btn-w-m btn-danger m-r-xs financial-cancelPlayDealing">撤回成交</a>
												</c:if>
												<input type="hidden" class="btn btn-w-m btn-warning m-r-xs financial-cancelPlayDealing-Jurisdiction">
											</shiro:hasPermission>
									</div>
								</fieldset>
								
								<fieldset>
									<legend>卡片信息</legend>
									<div id="card-info" class="form-group"></div>
									<div class="col-md-11 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 4 }">
											<shiro:hasPermission name="OrderDetail:showRepaymentPlan">
												<a type="button" class="btn btn-w-m btn-info m-r-xs financial-showRepaymentPlan">查看还款计划</a>
											</shiro:hasPermission>
										</c:if>
										<c:if test="${acceptOrder.orderStatus ge 4 }">
											<shiro:hasPermission name="OrderDetail:saveCardInfo">
												<a class="btn btn-primary financial-carinfo">卡片信息保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>

								<fieldset>
									<legend>票据退件</legend>
									<div id="bill-info" class="form-group"></div>
									<div class="col-md-11 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 4 }">
											<shiro:hasPermission name="OrderDetail:saveBillQuitFile">
												<a class="btn btn-primary financial-comebackinfo">退件保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>

								<fieldset>
									<legend>合同资料</legend>
									<div id="contract-info" class="form-group"></div>
								</fieldset>

								<%-- <fieldset>
									<legend>档案信息</legend>
									<div id="archives-info" class="form-group "></div>
									<div class="col-md-9 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 4 }">
											<shiro:hasPermission name="OrderDetail:saveArchivesInfo">
												<a class="btn btn-primary financial-archivesinfo">档案信息保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset> --%>

								<fieldset>
									<legend>其他信息</legend>
									<div id="other-info" class="form-group "></div>
									<div class="col-md-6 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 4}">
											<shiro:hasPermission name="OrderDetail:savePlayOtherInfo">
												<a class="btn btn-primary financial-otherinfo">其他信息保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>

								<fieldset>
									<legend>银行退件</legend>
									<div id="bankback-info" class="form-group "></div>
									<div class="col-md-6 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 4 }">
											<shiro:hasPermission name="OrderDetail:saveBankQuitFile">
												<a class="btn btn-primary financial-bankbackinfo">退件保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>

								<fieldset>
									<legend>结清单提交</legend>
									<div id="account-info" class="form-group "></div>
									<div class="col-md-9 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 20 }">
											<shiro:hasPermission name="OrderDetail:saveSettleLoan">
													<a class="btn btn-primary financial-accountinfo">结清单保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>

								<fieldset>
									<legend>按钮操作日志</legend>
									<div id="operation-info" class="mod_basic no-bottom"></div>
								</fieldset>
								<fieldset>
									<legend>放款信息操作日志</legend>
									<div id="operationctrl-info" class="mod_basic no-bottom"></div>
								</fieldset>
							</div>
						</shiro:hasPermission>	<%-- end 放贷信息tab --%>
		
						<shiro:hasPermission name="OrderDetail:mortgageRegistTab">
							<c:set var="selectMortgageRegist" value="tab-pane"/>
							<c:if test='${active eq "mortgageRegist"}'>
								<c:set var="selectMortgageRegist" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-regist" class="${selectMortgageRegist}">
								<fieldset>
									<legend>抵押信息</legend>
									<div id="audit-detail-mortgage-list" class="m-b"></div>
								</fieldset>
								<fieldset>
									<legend>抵押车辆</legend>
									<div id="audit-detail-mortgage-car" class="m-b"></div>
								</fieldset>
								<fieldset>
									<legend>装订信息</legend>
									<div id="audit-detail-mortgage-binding" class="m-b"></div>
								</fieldset>
								<fieldset>
									<legend>过户信息</legend>
									<div id="audit-detail-mortgage-transfer" class="m-b"></div>
								</fieldset>
								<fieldset>
									<legend>车资</legend>
									<div id="audit-detail-mortgage-car-stock" class="m-b"></div>
								</fieldset>
								<fieldset>
									<legend>操作信息</legend>
									<div id="audit-detail-mortgage-log-list" class="mod_basic no-bottom"></div>
								</fieldset>
							</div>
						</shiro:hasPermission>	<%-- end 注册抵押tab --%>
		
						<shiro:hasPermission name="OrderDetail:insurance">
							<c:set var="selectInsurance" value="tab-pane"/>
							<c:if test='${active eq "insurance"}'>
								<c:set var="selectInsurance" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-insurcace" class="${selectInsurance } m-b m-t-xs insuranceInfoSubmit">
								<form id="insuranceInfo">
									<fieldset>
										<legend>保险信息</legend>
										<div id="audit-detail-car-insurance-information" class="form-horizontal">
											<div class="m-rl-tb row">
												<label class="col-md-1 control-label">年度:</label>
												<div class="col-md-2">
													<div obj="" >
														<select class="form-control" id="years"  data-placeholder="..." name="years" >
															<option value="">请选择年度</option>
															<option value="1" >1</option>
															<option value="2" >2</option>
															<option value="3" >3</option>
															<option value="4" >4</option>
															<option value="5" >5</option>
														</select>
													</div>
												</div>
												<label class="col-md-1 control-label">新保/续保:</label>
												<div class="col-md-2" >
													<div obj="" >
													<select class="form-control" id="newOrOld" data-placeholder="保险类型..." name="newOrOld" >
														<option value="">请选择</option>
														<option value="0">新保</option>
														<option value="1">续保</option>
													</select>
													</div>
												</div>
												<label class="col-md-1 control-label">核定乘客人数:</label>
												<div class="col-md-2">
													<input id="passenger" name="passenger" check="insuranceValid(this)"  class="form-control" type="text">
												</div>
												<label class="col-md-1 control-label">预估报费:</label>
												<div class="col-md-2">
													<input id="estimatedPremium"  name="estimatedPremium" class="form-control" type="text">
												</div>
											</div>
										</div>
									</fieldset>
									
									<fieldset>
										<legend>商业险</legend>
										<div id="audit-detail-car-commercial-insurance" class="form-horizontal">
											<div class="m-rl-tb row">
												<label class="col-md-1 control-label">保险公司:</label>
												<div class="col-md-2">
													<div >
													<select class="form-control"  id="vciInsuranceCompanyId" name="vciInsuranceCompanyId"></select>
												</div>
												</div>
												<label class="col-md-1 control-label">商业险起始日:</label>
												<div class="col-md-2">
													<div obj="" >
														<input id="vciBeginDate"  name="vciBeginDate" class="form-control" type="text">
													</div>
												</div>
												<label class="col-md-1 control-label">商业险到期日:</label>
												<div class="col-md-2">
													<div obj="">
													<input id="vciEndDate"  name="vciEndDate" class="form-control" type="text">
												</div>
												</div>
												<label class="col-md-1 control-label">保单号:</label>
												<div class="col-md-2">
													<input id="vciInsuranceNumber"  name="vciInsuranceNumber" class="form-control" type="text">
												</div>
											</div>
										
											<div class="m-rl-tb row">
												<label class="col-md-1 control-label">商业险保险地:</label>
												<div class="col-md-2">
													<select class="form-control"  id="vciProtectLocal" name="vciProtectLocal">
														<option value="1">是</option>
														<option value="0">否</option>
													</select>
												</div>
												<label class="col-md-1 control-label">商业险退保:</label>
												<div class="col-md-2">
													<select class="form-control" id="vciCancel" name="vciCancel">
														<option value="1">是</option>
														<option value="0">否</option>
													</select>
												</div>
												<label class="col-md-1 control-label">商业险车损价格:</label>
												<div class="col-md-2">
													<input id="carDamagePrice"  name="carDamagePrice" class="form-control" type="text">
												</div>
											</div>
										</div>
									</fieldset>
						
									<fieldset>
										<legend>交强险</legend>
										<div id="audit-detail-car-compulsory-insurance" class="form-horizontal">
											<div class="m-rl-tb row">
												<label class="col-md-1 control-label">保险公司:</label>
												<div class="col-md-2">
													<div obj="" >
													<select class="form-control"   id="tciInsuranceCompanyId" name="tciInsuranceCompanyId"></select>
												</div>
												</div>
												<label class="col-md-1 control-label">交强险起始日:</label>
												<div class="col-md-2">
													<div obj="">
													<input id="tciBeginDate"  name="tciBeginDate" class="form-control" type="text">
												</div>
												</div>
												<label class="col-md-1 control-label">交强险到期日:</label>
												<div class="col-md-2">
													<div obj="" >
													<input id="tciEndDate"  name="tciEndDate" class="form-control" type="text">
												</div>
												</div>
												<label class="col-md-1 control-label">保单号:</label>
												<div class="col-md-2">
													<input id="tciInsuranceNumber"  name="tciInsuranceNumber" class="form-control" type="text">
												</div>
											</div>
										
											<div class="m-rl-tb row">
												<label class="col-md-1 control-label">交强险保险地:</label>
												<div class="col-md-2">
													<select class="form-control"  id="tciProtectLocal" name="tciProtectLocal">
														<option value="1">是</option>
														<option value="0">否</option>
													</select>
												</div>
												<label class="col-md-1 control-label">交强险退保:</label>
												<div class="col-md-2">
													<select class="form-control"  id="tciCancel" name="tciCancel">
														<option value="1">是</option>
														<option value="0">否</option>
													</select>
												</div>
												<div class="col-md-6 text-right">
													<c:if test="${acceptOrder.orderStatus ge 4 }">		<%-- 财务打款后方可操作 --%>
														<input type="hidden"  id="hiddenId" name="id"/>
														<input type="hidden" value="${acceptOrder.id}" id="businessOrderAcceptId" name="businessOrderAcceptId"/>
														<shiro:hasPermission name="OrderDetail:saveInsuranceInfo">
														<button type="button" class="btn btn-w-m btn-primary submit-button">保存</button>
														</shiro:hasPermission>
													</c:if>
												</div>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
						</shiro:hasPermission> <%-- end 保险信息tab --%>
						<%--	 出险信息tab--%>
						<shiro:hasPermission name="OrderDetail:insuranceClaim">
							<c:set var="selectInsuranceClaim" value="tab-pane"/>
							<c:if test='${active eq "insuranceClaim"}'>
								<c:set var="selectInsuranceClaim" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-insurcace-claim" class="${selectInsuranceClaim }">
								<div class="row" style="padding: 5px 20px 0;">
									<c:if test="${acceptOrder.orderStatus >= 4 }">
									<div class="col-sm-2">
										<shiro:hasPermission name="OrderDetail:insertInsuranceClaim">
												<a data-toggle="modal" class="btn btn-primary btn-sm add-insuranceClaim-btn">新增</a>
										</shiro:hasPermission>
										<shiro:hasPermission name="OrderDetail:deleteInsuranceClaim">
												<a data-toggle="modal" class="btn btn-danger btn-sm delete-insuranceClaim-btn">删除</a>
										</shiro:hasPermission>
									</div>
									<div class="col-sm-10 text-right">
										<a data-toggle="modal" class="btn btn-success btn-sm fresh-insuranceClaim-btn">刷新</a>
									</div>
									</c:if>
								</div>
								<div id="audit-claim-table" class="no-bottom mod_basic"></div>
							</div>
						</shiro:hasPermission>
						
						<%--	逾期信息tab--%>
						<shiro:hasPermission name="OrderDetail:overdue">
							<c:set var="selectOverdue" value="tab-pane"/>
							<c:if test='${active eq "overdue"}'>
								<c:set var="selectOverdue" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-over-due" class="${selectOverdue}">
								<div class="row mr-none m-b m-t-xs">
									<div  id="detail-overdue-desc" class="m-t-sm"></div>
								</div>
								<div class="row m-rl-tb m-t-xs">
									<div class="form-inline padding-4 border-d">
										<div class="form-group">
											<h5>逾期记录</h5>
										</div>
										<div class="form-group">
											<shiro:hasPermission name="OrderDetail:addOverdue">
												<button type="button" class="btn btn-primary btn-sm detail-add-overdue">新增</button>
											</shiro:hasPermission>
											<shiro:hasPermission name="OrderDetail:updateOverdue">
												<button type="button" class="btn btn-info btn-sm detail-edit-overdue">编辑</button>
											</shiro:hasPermission>
											<shiro:hasPermission name="OrderDetail:deleteOverdue">
												<button type="button" class="btn btn-danger btn-sm detail-delete-overdue">删除</button>
											</shiro:hasPermission>
										</div>
									</div>
									<div  id="detail-overdue-list"></div>
								</div>
								
								<div class="row mr-none">
									<div class="form-inline padding-4 border-d">
										<div class="form-group">
											<h5>催缴记录</h5>
										</div>
										<div class="form-group">
											<c:if test="${acceptOrder.orderStatus ge 20}">
												<shiro:hasPermission name="OrderDetail:insertUrgeWork">
													<button type="button" class="btn btn-primary btn-sm detail-add-urge">新增</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="OrderDetail:updateUrgeWork">
													<button type="button" class="btn btn-info btn-sm detail-edit-urge">编辑</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="OrderDetail:deleteUrgeWork">
													<button type="button" class="btn btn-danger btn-sm detail-delete-urge">删除</button>
												</shiro:hasPermission>
											</c:if>
										</div>
									</div>
									<div id="detail-urge-list"></div>
								</div>
								<div class="row mr-none">
									<div class="form-inline padding-4 border-d">
										<div class="form-group">
											<h5>代偿记录</h5>
											<input type="hidden" id="adv_view" value=""/>
										</div>
										<div class="form-group" >
											<c:if test="${acceptOrder.orderStatus ge 20}">
												<shiro:hasPermission name="orderDetailAdv:create">
													<button type="button" class="btn btn-primary btn-sm detail-add-adv">新增</button>
													</shiro:hasPermission>
													<shiro:hasPermission name="orderDetailAdv:edit">
													<button type="button" class="btn btn-info btn-sm detail-edit-adv">编辑</button>
													</shiro:hasPermission>
													<shiro:hasPermission name="orderDetailAdv:delete">
													<button type="button" class="btn btn-danger btn-sm detail-delete-adv">删除</button>
													</shiro:hasPermission>
											</c:if>
										</div>
									</div>
									<div id="detail-adv-list"></div>
								</div>
                                <div class="row mr-none">
                                    <div class="form-inline padding-4 border-d">
                                        <div class="form-group">
                                            <h5>保全管理</h5>
											<input type="hidden" id="trail_view" value=""/>
                                        </div>
                                        <div class="form-group" id="trail_button">
                                            <c:if test="${acceptOrder.orderStatus ge 20}">
												<shiro:hasPermission name="orderDetailTrail:create">
                                                <button type="button" class="btn btn-primary btn-sm detail-add-trail">新增</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="orderDetailTrail:edit">
                                                <button type="button" class="btn btn-info btn-sm detail-edit-trail">编辑</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="orderDetailTrail:delete">
                                                <button type="button" class="btn btn-danger btn-sm detail-delete-trail">删除</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="orderDetailTrail:config">
												<button type="button" class="btn btn-primary btn-sm detail-config-trail">拖车单设置</button>
												</shiro:hasPermission>
                                            </c:if>
                                        </div>
                                    </div>
                                    <div id="detail-car-trailExecute-list"></div>
                                </div>
								<div class="row mr-none">
									<div class="form-inline padding-4 border-d">
										<div class="form-group">
											<h5>诉讼管理</h5>
										</div>
										<div class="form-group"  id="law_button">
											<c:if test="${acceptOrder.orderStatus ge 20}">
												<shiro:hasPermission name="orderDetailLaw:create">
												<button type="button" class="btn btn-primary btn-sm detail-add-law">新增</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="orderDetailLaw:edit">
												<button type="button" class="btn btn-info btn-sm detail-edit-law">编辑</button>
												</shiro:hasPermission>
												<shiro:hasPermission name="orderDetailLaw:delete">
												<button type="button" class="btn btn-danger btn-sm detail-delete-law">删除</button>
												</shiro:hasPermission>
											</c:if>
										</div>
									</div>
									<div id="detail-law-list"></div>
								</div>
							</div>
						</shiro:hasPermission>
						<shiro:hasPermission name="OrderDetail:financialPay">
							<c:set var="selectFinancialPay" value="tab-pane"/>
							<c:if test='${active eq "financialPay"}'>
								<c:set var="selectFinancialPay" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-financial-pay" class="${selectFinancialPay }">
								<fieldset>
									<legend>协议资料</legend>
									<div id="protocol-information" class="form-horizontal"></div>
								</fieldset>
								<fieldset>
									<legend>费用明细(收入)</legend>
									<div id="financial-detail-in" class="mod_basic"></div>
									<div class="col-md-12 m-b text-right">
									<c:if test="${acceptOrder.orderStatus eq 12 }">	
										<shiro:hasPermission name="financial:updateCostBack">
											<a class="btn btn-w-m btn-danger m-r-xs financial-back-confirm-btn" style="margin-top:10px;">退回</a>
										</shiro:hasPermission>
									</c:if>
										<c:if test="${acceptOrder.orderStatus ge 12 }">	
												
											<shiro:hasPermission name="financial:updateAdvancePayment">
												<a class="btn btn-primary financial-income-confirm-btn" style="margin-top:10px;margin-right: 18px">费用收入保存</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>
								<fieldset>
									<legend>费用明细(支出)</legend>
									<div id="financial-detail-out" class="no-bottom mod_basic"></div>
									<div class="col-md-12 m-b text-right">
										<c:if test="${acceptOrder.orderStatus ge 20 }">		
											<shiro:hasPermission name="financial:addFinancialIncome">
												<a class="btn btn-success expense_uploader-btn" style="margin-top:10px">支出凭证</a>
											</shiro:hasPermission>
											<shiro:hasPermission name="financial:addFinancialIncome">
												<a class="btn btn-primary financial-pay-confirm-btn" style="margin-top:10px;margin-right: 18px">应付确认</a>
											</shiro:hasPermission>
										</c:if>
									</div>
								</fieldset>
								<fieldset>
									<legend>按钮操作日志</legend>
									<div id="finance-operation-info" class="no-bottom mod_basic"></div>
								</fieldset>
							</div>
						</shiro:hasPermission>	<%-- end 财务打款tab --%>

		
						<shiro:hasPermission name="OrderDetail:financialIncome">
							<c:set var="selectFinancialIncome" value="tab-pane"/>
							<c:if test='${active eq "financialIncome"}'>
								<c:set var="selectFinancialIncome" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-financial-income" class="${selectFinancialIncome }">
								<div class="row" style="padding: 5px 20px 0;">
									<div class="col-sm-2">
										<c:if test="${acceptOrder.orderStatus ge 20 }">		<%-- 财务打款后方可操作 --%>
											<shiro:hasPermission name="OrderDetail:insertFinancialIncome">
												<a data-toggle="modal" class="btn btn-primary btn-sm add-income-btn">新增</a>
											</shiro:hasPermission>
											<shiro:hasPermission name="OrderDetail:deleteFinancialIncome">
												<a data-toggle="modal" class="btn btn-danger btn-sm delete-income-btn">删除</a>
											</shiro:hasPermission>
										</c:if>
									</div>
									<div class="col-sm-10 text-right">
										<a data-toggle="modal"  id="fresh-income-btn" class="btn btn-success btn-sm fresh-income-btn">刷新</a>
									</div>
								</div>
								<div id="financial-income" class="no-bottom mod_basic"></div>
							</div>
						</shiro:hasPermission>	<%-- end 财务收支tab --%>
		
						<shiro:hasPermission name="OrderDetail:fileInfo">
							<c:set var="selectFileInfo" value="tab-pane"/>
							<c:if test='${active eq "fileInfo"}'>
								<c:set var="selectFileInfo" value="tab-pane active"></c:set>
							</c:if>
							<div id="tab-file-info" class="${selectFileInfo}">
								<div id="audit-order-file-information" class="form-horizontal">
									<div class="row m">
										<label class="pull-left control-label">附件类型:</label>
										<div class="col-md-2">
											<select id="audit-detail-select-file-type" class="form-control">
												<option value="">全部</option>
												<option value="1">抵押材料</option>
												<option value="2">面签材料</option>
												<option value="3">候补资料</option>
												<option value="4">提车资料</option>
												<option value="5">征信材料</option>
												<option value="60">回单(垫付凭证)</option>
												<option value="65">本金凭证</option>
												<option value="70">二次打款凭证</option>
												<option value="7">合同材料</option>
												<option value="8">其他附件</option>
												<option value="9">过户资料</option>
												<option value="11">支出凭证</option>
												<option value="50">申请分期资料</option>
												
											</select>
										</div>
										<div class="col-md-3">
											<shiro:hasPermission name="orderFile:download">
												<button id="download-file-btn" type="button" class="btn btn-w-m btn-primary"><i class="fa fa-cloud-download"></i>打包下载 </button>
											</shiro:hasPermission>
											<button id="refresh-file-btn" type="button" class="btn btn-w-m btn-success"><i class="fa fa-refresh"></i>刷新 </button>
										</div>
									</div>
									<div class="m-rl-tb row">
										<div id="file-list" style="height:auto;" class="gallerys"></div>
									</div>
									<div class="m-rl-tb row">
										<div id="pagination" class="pagination" style="margin: 0 12px;padding: 0 15px 0 0; position: relative"></div>
									</div>
								</div>
							</div>
						</shiro:hasPermission>	<%-- end 订单附件tab --%>
					</div>
				</div>
			</div>
		</div>
	</body>
	<%-- js库引入 --%>
	<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
	
	<%-- 页面字典项 --%>
	<slt:dictData type="290000,420000,430000,440000,450000,460000,470000,480000,500000,490000,510000,520000,530000,680000"/>
	
	<script type="text/template" title="退回征信" id="back-credit-dialog">
		<div class="ibox-content">
			<form id="backCreditForm" class="form-horizontal">
				<div class="form-group mr-none">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label"><span class="red">*</span>备注:</label>
						<div class="col-sm-10">
							<textarea id="auditDescription" class="form-control" check="validateLength100Bak(this)"  tip="长度不能超过100个字符" obj="not_null" value=""></textarea>
							<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">100</font></code>个</span>
						</div>
					</div>
				</div>
				<div class="form-group mr-none">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">审核人:</label>
						<div class="col-sm-4">
							<p class="form-control-static text-left">${auditUser}</p>
						</div>
						<label class="col-sm-2 control-label">审核日期:</label>
						<div class="col-sm-4">
							<p class="form-control-static text-left">${auditDate}</p>
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage" id="CreateBtn">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>
	
	<script type="text/template" title="作废订单" id="discard-order-dialog">
		<div class="ibox-content">
			<form id="discardOrderForm" class="form-horizontal">
				<div class="form-group mr-none">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label"><span class="red">*</span>备注:</label>
						<div class="col-sm-10">
							<textarea id="discardDescription" class="form-control" check="validateLength100Bak(this)"  tip="长度不能超过100个字符" obj="not_null" value=""></textarea>
							<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">100</font></code>个</span>
						</div>
					</div>
				</div>
				<div class="form-group mr-none">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">审核人:</label>
						<div class="col-sm-4">
							<p class="form-control-static text-left">${auditUser}</p>
						</div>
						<label class="col-sm-3 control-label">审核日期:</label>
						<div class="col-sm-3">
							<p class="form-control-static text-left">${auditDate}</p>
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage" id="CreateBtn">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>
	
	<script type="text/template" title="查看审核详情" id="view-audit-dialog">
		<div class="ibox-content">
			<form id="backCreditForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">审核类型:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" type="text" id="auditType">
						</div>
						<label class="col-sm-2 control-label">审核结果:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" type="text" id="auditResult">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">审核人:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" type="text" id="auditor">
						</div>
						<label class="col-sm-2 control-label">审核时间:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" type="text" id="auditTime">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">审核意见:</label>
						<div class="col-sm-10">
							<textarea id="auditDescriptionView" readonly="readonly" class="form-control"></textarea>
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage" id="CreateBtn">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
			</div>
		</div>
	</script>
	
	<script type="text/template" title="财务收支新增 " id="add-income-dialog">
		<div class="ibox-content">
			<form id="addIncomeForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label">入账日期:</label>
						<div class="col-xs-8">
							<input type="text" check="validFinanceForm(this)" class="form-control" id="confirmAccountTime" tip="请输入入账时间">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>费用项目:</label>
						<div class="col-xs-8">
							<select id="payMoneyType"  check="validFinanceForm(this)" class="form-control" tip="请输入费用项目">
                                    <option value="">请选择</option>
                                    <option value="1">保证金</option>
                                    <option value="2">上牌押金</option>
                                    <option value="3">按揭服务费-高息部分</option>
                                    <option value="4">渠道保证金</option>
                                    <option value="5">按揭手续费</option>
                                    <option value="6">按揭服务费-现金部分</option>
                                    <option value="7">公证费</option>
                                    <option value="8">评估费</option>
                                    <option value="9">抵押费</option>
                                    <option value="10">GPS费用</option>
                                    <option value="15">营销费用-基础费用</option>
                                    <option value="16">营销费用-产品减少费用</option>
                                    <option value="17">营销费用-银行费用</option>
                                    <option value="18">营销费用-产品增加费用</option>
                                    <option value="19">营销费用-贷款额费用</option>
                                    <option value="20">按揭服务费</option>
                            </select>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>收支方式:</label>
						<div class="col-xs-8">
							<select id="incomeExpensesType"  check="validFinanceForm(this)" class="form-control">
                                    <option value="">请选择</option>
                                    <option value="1">收入</option>
                                    <option value="2">支出</option>
                                    
                            </select>
						</div>

					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>金额(元):</label>
						<div class="col-xs-8">
							<input type="text" class="form-control" check="validFinanceForm(this)" id="actualMoney" tip="请输入金额">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label">备注:</label>
						<div class="col-xs-8">
							<textarea class="form-control" check="validFinanceForm(this)" id="remark" tip="长度不能超过50个字符"></textarea>
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>
	
	<script type="text/template" title="财务收支编辑 " id="edit-income-dialog">
		<div class="ibox-content">
			<form id="editIncomeForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label">入账日期:</label>
						<div class="col-xs-8">
							<input type="text" check="validFinanceForm(this)" class="form-control" id="confirmAccountTime" tip="请输入入账时间">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>费用项目:</label>
						<div class="col-xs-8">
							<div obj="" tip="请输入费用项目">
							<select id="payMoneyType"  check="validFinanceForm(this)" class="form-control" >
                                    <option value="">请选择</option>
                                    <option value="1">保证金</option>
                                    <option value="2">上牌押金</option>
                                    <option value="3">按揭服务费-高息部分</option>
                                    <option value="4">渠道保证金</option>
                                    <option value="5">按揭手续费</option>
                                    <option value="6">按揭服务费-现金部分</option>
                                    <option value="7">公证费</option>
                                    <option value="8">评估费</option>
                                    <option value="9">抵押费</option>
                                    <option value="10">GPS费用</option>
                                    <option value="15">营销费用-基础费用</option>
                                    <option value="16">营销费用-产品减少费用</option>
                                    <option value="17">营销费用-银行费用</option>
                                    <option value="18">营销费用-产品增加费用</option>
                                    <option value="19">营销费用-贷款额费用</option>
                                    <option value="20">按揭服务费</option>
                            </select>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>收支方式:</label>
						<div class="col-xs-8">
							<div obj="" tip="协议类型不能为空">
								<select id="incomeExpensesType"  check="validFinanceForm(this)" class="form-control" data-placeholder="收支方式...">
                                    	<option value="">请选择</option>
                                   		 <option value="1">收入</option>
                                    	<option value="2">支出</option>
                                    
                           		</select>
							</div>
						</div>

					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>金额(元):</label>
						<div class="col-xs-8">
							<input type="text" class="form-control" check="validFinanceForm(this)" id="actualMoney" tip="请输入金额">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label">备注:</label>
						<div class="col-xs-8">
							<textarea class="form-control" check="validFinanceForm(this)" id="remark" tip="长度不能超过50个字符"></textarea>
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
	<script type="text/template" title="财务收支查看 " id="income-detail-dialog">
		<div class="ibox-content">
			<form id="addIncomeForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label">入账日期:</label>
						<div class="col-xs-8">
							<input type="text" check="validFinanceForm(this)" class="form-control" id="confirmAccountTime" tip="请输入入账时间">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>费用项目:</label>
						<div class="col-xs-8">
							<select id="payMoneyType"  check="validFinanceForm(this)" class="form-control" tip="请输入费用项目">
                                    <option value="">请选择</option>
                                    <option value="1">保证金</option>
                                    <option value="2">上牌押金</option>
                                    <option value="3">按揭服务费-高息部分</option>
                                    <option value="4">渠道保证金</option>
                                    <option value="5">按揭手续费</option>
                                    <option value="6">按揭服务费-现金部分</option>
                                    <option value="7">公证费</option>
                                    <option value="8">评估费</option>
                                    <option value="9">抵押费</option>
                                    <option value="10">GPS费用</option>
                                    <option value="15">营销费用-基础费用</option>
                                    <option value="16">营销费用-产品减少费用</option>
                                    <option value="17">营销费用-银行费用</option>
                                    <option value="18">营销费用-产品增加费用</option>
                                    <option value="19">营销费用-贷款额费用</option>
                                    <option value="20">按揭服务费</option>
                            </select>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>收支方式:</label>
						<div class="col-xs-8">
							<select id="incomeExpensesType"  check="validFinanceForm(this)" class="form-control">
                                    <option value="">请选择</option>
                                    <option value="1">收入</option>
                                    <option value="2">支出</option>
                                    
                            </select>
						</div>

					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label"><span class="red">*</span>金额(元):</label>
						<div class="col-xs-8">
							<input type="text" class="form-control" check="validFinanceForm(this)" id="actualMoney" tip="请输入金额">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-xs-3 control-label">备注:</label>
						<div class="col-xs-8">
							<textarea class="form-control" check="validFinanceForm(this)" id="remark" tip="长度不能超过50个字符"></textarea>
						</div>
					</div>
				</div>
			</form>
		</div>
	</script>
	

	<script type="text/template" title="新增理赔记录" id="view-claim-dialog">
		<div class="ibox-content">
			<form id="insuranceClaimForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">客户名称:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" value="${acceptOrder.buyerName}" type="text" id="buyerName">
						</div>
						<label class="col-sm-2 control-label">车牌号:</label>
						<div class="col-sm-4">
							<input class="form-control"   readonly type="text" id="plateNumber">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">临牌号:</label>
						<div class="col-sm-4">
							<input class="form-control"   type="text" id="tempPlateNumber">
						</div>
						<label class="col-sm-2 control-label">汇款账号:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="accountNumber">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">保险公司:</label>
						<div class="col-sm-4">
							<div obj="" tip="保险公司不能为空">
								<select class="form-control"
                               data-placeholder="保险公司选择..." id="cfInsuranceCompanyId"></select>
							</div>
						</div>
						<label class="col-sm-2 control-label">出险日期:</label>
						<div class="col-sm-4">
							<input class="form-control"   type="text" id="insuranceDate">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">受理日:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="acceptanceDate">
						</div>
						<label class="col-sm-2 control-label">送交日:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="submitDate">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">案件性质:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="caseTypeCode">
						</div>
						<label class="col-sm-2 control-label">事故责任:</label>
						<div class="col-sm-4">
							<input class="form-control" type="text" id="trafficResponsibility">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">获取金额(元):</label>
						<div class="col-sm-4">
							<input class="form-control" type="text" id="money">
						</div>
						<label class="col-sm-2 control-label">备注:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="remarkInfo">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">录入人:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  value="${acceptOrder.creditPerson}" type="text" id="inputer">
						</div>
						<label class="col-sm-2 control-label">录入日期:</label>
						<div class="col-sm-4">
							<input class="form-control"   type="text" id="insuranceClaimCtime">
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage" id="createInsuranceClaim">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>

	<script type="text/template" title="编辑理赔记录" id="view-claim-edit-dialog">
		<div class="ibox-content">
			<form id="insuranceClaimEditForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">客户名称:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" value="${acceptOrder.buyerName}" type="text" id="buyerName_edit">
						</div>
						<label class="col-sm-2 control-label">车牌号:</label>
						<div class="col-sm-4">
							<input class="form-control"  readonly  type="text" id="plateNumber_edit">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">临牌号:</label>
						<div class="col-sm-4">
							<input class="form-control"   type="text" id="tempPlateNumber_edit">
						</div>
						<label class="col-sm-2 control-label">汇款账号:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="accountNumber_edit">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">保险公司:</label>
						<div class="col-sm-4">
							<div obj="" tip="保险公司不能为空">
							<select class="form-control"  id="cfInsuranceCompanyId_edit">
							</select>
							</div>
						</div>
						<label class="col-sm-2 control-label">出险日期:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="insuranceDate_edit">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">受理日:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="acceptanceDate_edit">
						</div>
						<label class="col-sm-2 control-label">送交日:</label>
						<div class="col-sm-4">
							<input class="form-control" type="text" id="submitDate_edit">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">案件性质:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="caseTypeCode_edit">
						</div>
						<label class="col-sm-2 control-label">事故责任:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="trafficResponsibility_edit">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">获取金额(元):</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="money_edit">
						</div>
						<label class="col-sm-2 control-label">备注:</label>
						<div class="col-sm-4">
							<input class="form-control"  type="text" id="remark_edit">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">录入人:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" value="${acceptOrder.creditPerson}" type="text" id="inputer_edit">
						</div>
						<label class="col-sm-2 control-label">录入日期:</label>
						<div class="col-sm-4">
							<input class="form-control"   type="text" id="insuranceClaimCtime_edit">
						</div>
					</div>
				</div>
				<div class="dialog-manage" id="createInsuranceClaim_edit">
					<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
					<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
				</div>
			</form>
		</div>
	</script>

	<script type="text/template" title="查看理赔记录" id="view-claim-detail-dialog">
		<div class="ibox-content">
			<form id="insuranceClaimDetailForm" class="form-horizontal">
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">客户名称:</label>
						<div class="col-sm-4">
							<input class="form-control"  readonly="readonly" type="text" id="buyerName_detail">
						</div>
						<label class="col-sm-2 control-label">车牌号:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="plateNumber_detail">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">临牌号:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="tempPlateNumber_detail">
						</div>
						<label class="col-sm-2 control-label">汇款账号:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="accountNumber_detail">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">保险公司:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  id="cfInsuranceCompanyId_detail">
						</div>
						<label class="col-sm-2 control-label">出险日期:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="insuranceDate_detail">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">受理日:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="acceptanceDate_detail">
						</div>
						<label class="col-sm-2 control-label">送交日:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="submitDate_detail">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">案件性质:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="caseTypeCode_detail">
						</div>
						<label class="col-sm-2 control-label">事故责任:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="trafficResponsibility_detail">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">获取金额(元):</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="money_detail">
						</div>
						<label class="col-sm-2 control-label">备注:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="remark_detail">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-2 control-label">录入人:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly" type="text" id="inputer_detail">
						</div>
						<label class="col-sm-2 control-label">录入日期:</label>
						<div class="col-sm-4">
							<input class="form-control" readonly="readonly"  type="text" id="insuranceClaimCtime_detail">
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage" id="createInsuranceClaim_detail">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
			</div>
		</div>
	</script>

	<script type="text/template" title="财务收支删除 " id="add-income-dialog">
		<div class="ibox-content" id="deleteIncome-dialog">
			<div data-id="title" class="dialog-item">
				<div class="dialog-tips">
					<p class="tips">确定删除所选财务收支数据</p>
				</div>
			</div>
			<div class="dialog-manage">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>
	
	<script type="text/template" title="入账时间" id="add-income-time">
		<div class="ibox-content" id="date-time">
			<div data-id="title" class="dialog-item">
				<input type="text" class="form-control" name="income-time" style="background: #fafafa;" readonly="readonly" id="search-start-date" />
			</div>
			<div class="dialog-manage">
				<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>
	
	<script type="text/template" title="上传凭证" id="upload-dialog">
		<div class="ibox-content">
			<form id="uploadForm" class="form-horizontal">
				<div class="row">
					<div class="col-md-12">
						<input id="upload_files" data-id="" data-group="" data-path="" data-name="" type="hidden">
						<div class="form-group style="margin-bottom:0;">
								 <div class="page-container two-line">
                   					 <div id="uploader"></div>
                				</div>
						</div>
					</div>
				</div>
			</form>
			<div class="dialog-manage">
				<a href="#" type="button" class="btn btn-primary dialog-ok">上传</a>
				<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
			</div>
		</div>
	</script>
	<script type="text/template" title="还款计划列表" id="btn-showRePaymentPlanList">
	<div class="ibox-content" id="paymentPlanList">
		 <div class="ibox-content no-padding">
            <div class="table-responsive">
                <table class="table table-hover table-order table-striped">
						<thead>
							<tr>
								<th style="width: 8%;">期数</th>
								<th style="width: 40%;">还款日期</th>
								<th style="width: 15%;">应还金额</th>
								<th style="width: 15%;">剩余金额</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
	</div>
	</script>
	<script type="text/template" title="变更信贷专员" id="view-update-credit-person-dialog">
		<div class="ibox-content">
			<form id="update-credit-person-form" class="form-horizontal">
				<div class="m-rl-tb row">
					<label class="col-sm-2 control-label">原值:</label>
					<div class="col-sm-10">
						<input class="form-control" readonly="readonly" value="${acceptOrder.creditPerson}" type="text" readonly="readonly">
					</div>
				</div>
				<div class="m-rl-tb row">
					<label class="col-sm-2 control-label">新值:</label>
					<div class="col-sm-10">
						<div obj="" tip="请输入选择信贷专员">
							<select  id="credit-person" check="validSelect(this)"></select>
						</div>
					</div>
				</div>
				<div class="dialog-manage" id="createInsuranceClaim_edit">
					<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
					<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
				</div>
			</form>
		</div>
	</script>
	<script type="text/template" id="detail-urge-dialog">
	    <div class="ibox-content" style="margin-bottom:0;">
	        <form id="urge-work-form" class="form-horizontal">
				<input type="hidden" value="" name="id" id="urge-id"/>
	            <div class="form-group" >
	                <div class="col-sm-12">
	                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴时间:</label>
	                    <div class="col-xs-8" obj="">
	                        <input type="text" class="form-control" name="urgeDate" readonly="readonly" check="validSelect(this)" id="urge-date" />
	                    </div>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="col-sm-12">
	                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴方式:</label>
	                    <div class="col-xs-8" >
	                        <div obj="" >
	                            <select data-placeholder="催缴方式..." id="urge-method" check="validSelect(this)" name="urgeMethod" class="form-control urgeMethod">
	                                <option value="">请选择</option>
	                                <option value="1">电话</option>
	                                <option value="2">短信</option>
	                                <option value="3">上门</option>
									<option value="4">微信</option>
									<option value="0">其它</option>
	                            </select>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="col-sm-12">
	                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴状态:</label>
	                    <div class="col-xs-8" >
	                        <div obj="" >
	                            <select data-placeholder="来源..." id="urge-status" check="validSelect(this)" name="urgeStatus"   class="form-control urgeStatus">
	                                <option value="">请选择</option>
	                                <option value="1">已完成</option>
	                                <option value="2">催缴中</option>
	                                <option value="3">承诺还款</option>
									<option value="4">已拖车</option>
	                            </select>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="col-sm-12">
	                    <label class="col-xs-3 control-label"><span class="red">*</span>电催异常:</label>
	                    <div class="col-xs-8" >
	                        <div obj="" >
	                            <select data-placeholder="电催异常..." id="is-tel-exception" check="validSelect(this)" name="isTelException"    class="form-control isTelException">
	                                <option value="">请选择</option>
	                                <option value="1">是</option>
	                                <option value="0">否</option>
	                            </select>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="form-group" >
	                <div class="col-sm-12">
	                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴内容:</label>
	                    <div class="col-xs-8" obj="">
	                     	<textarea id="urge-content" rows="4" class="form-control" check="validSelect(this)" name="urgeContent"></textarea>
							<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
	                    </div>
	                </div>
	            </div>
	        </form>
	        <div class="dialog-manage">
	            <a type="button" class="btn btn-primary dialog-ok">确定</a>
	            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
	        </div>
	    </div>
	</script>
	<script type="text/template" id="detail-overdue-dialog">
		<div class="ibox-content">
			<form id="detail-overdue-form"  class="form-horizontal">
				<input type="hidden" value="" name="id" id="overdue-id"/>
				<div class="row m-rl-tb">
					<label class="col-sm-3 control-label">客户姓名:</label>
					<div class="col-sm-8">
						<p id="detail-overdue-customer-name" class="form-control-static text-left">${acceptOrder.buyerName}</p>
					</div>
				</div>
				<div class="row m-rl-tb">
					<label class="col-sm-3 control-label"><span class="red">*</span>逾期月份:</label>
					<div class="col-sm-8">
						<div obj="" tip="逾期月份不能为空">
							<select name="overdueMonth" class="form-control"  check="validSelect(this)" id="detail-overdue-select-month">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row m-rl-tb">
					<label class="col-sm-3 control-label"><span class="red">*</span>逾期金额(元):</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" name="overdueMoney" obj="float" id="detail-overdue-over-money" />
					</div>
				</div>
				<div class="row m-rl-tb" >
					<label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
					<div class="col-xs-8" obj="">
						<textarea id="detail-overdue-content" rows="4" class="form-control" obj="not_null" name="remark"></textarea>
						<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
					</div>
				</div>
				<div class="dialog-manage" id="CreateBtn">
					<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
					<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
				</div>
			</form>
		</div>
	</script>
<script type="text/template" title="开拖车单" id="detail-trailExecute-dialog">
	<div class="ibox-content">
		<form id="trailExecuteForm" class="form-horizontal">
			<div class="form-group">
				<label class="col-xs-3 control-label"><span class="red">*</span>派单日期:</label>
				<div class="col-xs-8">
					<input type="text" class="form-control" name="dispatchDate"
						   check="validSelect(this)"  id="dispatchDate"  value="<sl:format type="date" show="${secondCar.validDate}"
                          pattern="yyyy-MM-dd HH:mm:ss"/>" tip="日期不能为空">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label"><span class="red">*</span>拖车单位:</label>
				<div class="col-xs-8">
					<div obj="" class="" is_tip_null="yes">
						<select class="form-control status" id="trailCarCompanyId" name="trailCarCompanyId"  check="validSelect(this)">
							<option value="">请选择拖车单位</option>
							<c:forEach items="${banks}" var="bank">
								<option value="${bank.id}">${bank.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label"><span class="red">*</span>拖车单备注:</label>
				<div class="col-xs-8" obj="">
					<textarea id="trailExecute-content" rows="4" class="form-control" obj="not_null" name="trailExecuteContent"></textarea>
					<span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">0</font></code>个字，还可添加<code><font class="can-input">1000</font></code>个</span>
				</div>
			</div>
		</form>
		<div class="dialog-manage">
			<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
			<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
		</div>
	</div>
</script>
<script type="text/template" title="视频弹窗" id="btn-showVideo">
    <div class="ibox-content"  id="video-show">
        <video style="border: 4px solid #eee;" id="video" width="750" height="410" controls="controls">
		<source src="" type="video/mp4" />
	您的浏览器不支持视频标签</video>
    </div>
</script>
<script type="text/template" title="拖车设置" id="trail-dialog">
	<div class="ibox-content">
		<form id="trailForm" class="form-horizontal">
			<div class="form-group">
				<label class="col-xs-3 control-label">客户姓名:</label>
				<div class="col-xs-8">
					<input type="text" id="trail-userName" class="form-control" readonly="readonly" >
				</div>
			</div>
			<div class="form-group type">
				<label class="col-xs-3 control-label"><span class="red">*</span>拖车状态:</label>
				<div class="col-xs-8">
					<div obj="" class="" is_tip_null="yes">
						<select class="form-control" id="trailCarStatus" name="status" check="bankForm(this)">
							<option value="">请选择拖车类型</option>
							<option value="1" >已拖车</option>
							<option value="2" >已结清</option>
							<option value="6" >关注还款</option>
							<option value="4" >提交报备</option>
							<option value="5" >移交拖车</option>
							<option value="3" >其他</option>
						</select>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
				<div class="col-xs-8">
                    <textarea  class="form-control" id="trailRemark" check="bankForm(this)">

                    </textarea>
				</div>
			</div>
		</form>
		<div class="dialog-manage">
			<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
			<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
		</div>
	</div>
</script>
<script type="text/template" title="代偿收支记录" id="advancedIncome-dialog">
	<div class="ibox-content" style="margin-bottom:0;">
		<div id="initCarInfo"></div>
		<input id="orderId" type="hidden">
		<form id="advancedIncomeForm" class="form-horizontal">
			<div class="form-group">
				<div class="col-sm-6">
					<label class="col-xs-3 control-label">车牌号:</label>
					<div class="col-xs-6">
						<input type="text" class="form-control" name="plateNumber" readonly id="plateNumber"/>
					</div>
				</div>
				<div class="col-sm-6">
					<label class="col-xs-3 control-label">车型构成:</label>
					<div class="col-xs-8">
						<input type="text" class="form-control" name="newOld" readonly id="newOld"/>
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>收/支:</label>
					<div class="col-xs-8">
						<div obj="">
							<select id="inOrOut" check="validSelect(this)" class="form-control inOrOut" name="inOrOut">
								<option value="">请选择</option>
								<option value="1">收</option>
								<option value="2">支</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>来源:</label>
					<div class="col-xs-8">
						<div id="source">
							<input type="text"  class="form-control" name="source-0" id="source-0"/>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>账户性质:</label>
					<div class="col-xs-8">
						<div obj="">
							<select id="accountType" check="validSelect(this)" class="form-control accountType" name="accountType">
								<option value="">请选择</option>
								<option value="1">一般户</option>
								<option value="2">保证金</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>金额(元):</label>
					<div class="col-xs-8" obj="">
						<input type="text" class="form-control" name="money" check="validSelect(this)"
							   id="money" />
					</div>
				</div>
			</div>
			<div class="form-group" id="dutyInfo">
				<div class="col-sm-6">
					<label class="col-xs-3 control-label">责任比例(%):</label>
					<div class="col-xs-6" obj="">
						<input type="text" class="form-control" check="validSelect(this)" id="duty"/>
					</div>
					<div class="col-xs-2">
						<a type="button" data-toggle="modal" class="btn btn-primary btn-sm calculate">计算</a>
					</div>
				</div>
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>代偿保证金:</label>
					<div class="col-xs-8" obj="">
						<input type="text" class="form-control" name="bondMoney" check="validSelect(this)"
							   id="bondMoney"/>
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>交易日期:</label>
					<div class="col-xs-8" obj="">
						<input type="text" class="form-control" name="advancedDate" check="validSelect(this)"
							   id="advancedDate"/>
					</div>
				</div>
				<div class="col-sm-6">
					<label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
					<div class="col-xs-8" obj="">
                        <textarea id="advancedBak" class="form-control" check="validSelect(this)"
								  name="advancedBak"></textarea>
					</div>
				</div>
			</div>
		</form>
		<div class="dialog-manage">
			<a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
			<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
		</div>
	</div>
</script>
	
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/radialIndicator/radialIndicator.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/car.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/buyer.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/shared.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/sponsor.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/protocol.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/mortgage.tag.config.js?version=201802080912211233"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/lendinginfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/cardinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/billinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/contractinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/archivesinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/otherinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/bankbackinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/accountinfo.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/video.answer.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.risk.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.form.js"></script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.credit.query.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.auto.audit.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/detail.js?version=20180502849122232"></script>
</html>