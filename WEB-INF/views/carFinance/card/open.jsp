<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>银行开卡</title>
	<%@include file="/WEB-INF/views/include/inner_css.jsp" %>
	<link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
	<div class="mod_header">
		<div class="row">
			<div class="col-sm-12 text-left">
				<h5><strong>银行开卡</strong>
				<code>&lt;订单编号:${order.orderNo}&gt;</code>
				</h5>
			</div>
		</div>
	</div>
	<div class="mod_basic ibox-content car-finance padding-min animated">
		<div id="open-bank-card-wrap">
			<form class="open-bank-card-form">
				<input type="hidden" value="${order.id}" name="orderId" id="order-id">
				<input type="hidden" value="${staticUrl}" id="staticUrl" name="staticUrl"/>
				<c:if test="${not empty order.openCardStatus && order.openCardStatus == 3 }">
					<div class="item-row">
						<fieldset>
							<legend>退回信息</legend>
							<div class="form-horizontal">
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label">退回原因:</label>
									<div class='col-md-7'>
										<textarea class="form-control" rows="4" readonly="readonly" cols="1" >${order.openCardBackDescription}</textarea>
									</div>
									<label class="col-md-1 control-label">退回时间:</label>
									<div class='col-md-3'>
										<input class="form-control" readonly="readonly" type="text"  value='<sl:format type="date" show="${order.openCardBackTime}" pattern="yyyy-MM-dd HH:mm"/>' />
									</div>
								</div>
							</div>
						</fieldset>
					</div>
				</c:if>
				<%-- end 退回信息row --%>
		
				<div id="car-info" class="item-row">
					<fieldset>
						<legend>购车信息</legend>
						<div class="form-horizontal">
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label">申请分期金额(元):</label>
								<div class='col-md-2'>
									<c:if test="${empty carInfo.actualLoadMoney}">
										<input class="form-control" name="actualLoadMoney" type="text" value=""/>
									</c:if>
									<c:if test="${not empty carInfo.actualLoadMoney}">
										<input class="form-control" name="actualLoadMoney" type="text" readonly="readonly"  value='<sl:format type="number" show="${carInfo.actualLoadMoney}" pattern="#,##0.00"/>' />
									</c:if>
								</div>
								<label class="col-md-1 control-label">手续费率(%):</label>
								<div class='col-md-2'>
									<c:if test="${empty carInfo.bankRate}">
										<input class="form-control" name="bankRate" type="text" value=""/>
									</c:if>
									<c:if test="${not empty carInfo.bankRate}">
										<input class="form-control" name="bankRate" type="text" readonly="readonly" value="${carInfo.bankRate}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">手续费(元):</label>
								<div class='col-md-2'>
									<c:if test="${empty carInfo.installmentPayPoundage}">
										<input class="form-control" name="installmentPayPoundage" type="text" value=""/>
									</c:if>
									<c:if test="${not empty carInfo.installmentPayPoundage}">
										<input class="form-control" name="installmentPayPoundage" type="text" readonly="readonly"  value='<sl:format type="number" show="${carInfo.installmentPayPoundage}" pattern="#,##0.00"/>'/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">贷款期限(月):</label>
								<div class='col-md-2'>
									<input type="hidden" name="loanPeriodMonthCode" value="${carInfo.loanPeriodMonthCode}" id="loan-period-month-code">
									<select <c:if test="${not empty carInfo.loanPeriodMonthCode}"> disabled="disabled" </c:if> id="loan-period-month-code-select" name="loanPeriodMonthCode"></select>
								</div>
							</div>
							
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label">车辆价格(元):</label>
								<div class='col-md-2'>
									<c:if test="${empty carInfo.auditCarPrice}">
										<input class="form-control" name="auditCarPrice" type="text" value=""/>
									</c:if>
									<c:if test="${not empty carInfo.auditCarPrice}">
										<input class="form-control" name="auditCarPrice" type="text" readonly="readonly" value='<sl:format type="number" show="${carInfo.auditCarPrice}" pattern="#,##0.00"/>' />
									</c:if>
								</div>
								<label class="col-md-1 control-label">贷款成数(%):</label>
								<div class='col-md-2'>
									<c:if test="${empty carInfo.actualLoanRatio}">
										<input class="form-control" name="actualLoanRatio" type="text" value=""/>
									</c:if>
									<c:if test="${not empty carInfo.actualLoanRatio}">
										<input class="form-control" name="actualLoanRatio" type="text" readonly="readonly" value="${carInfo.actualLoanRatio}"/>
									</c:if>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<%-- end 购车信息 row --%>
			
				<div id="buyer-info" class="item-row">
					<fieldset>
						<legend>基本信息</legend>
						<div class="form-horizontal">
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label"><span class="red">*</span>客户姓名:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.realName}">
										<input class="form-control" name="buyerName" check="validateOpenCardForm(this)" tip="客户姓名不能为空" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.realName}">
										<input class="form-control" name="buyerName" type="text" readonly="readonly" value="${buyerInfo.realName}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>姓名拼音:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.realNamePY}">
										<input class="form-control" type="text" name="pyName" check="validateOpenCardForm(this)" tip="姓名拼音不能为空" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.realNamePY}">
										<input class="form-control" type="text" readonly="readonly" value="${buyerInfo.realNamePY}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>性别:</label>
								<div class='col-md-2'>
									<div obj="" tip="性别不能为空">
										<select  check="validFormSelect(this)" name="buyerSex" id="sex-select" <c:if test="${not empty buyerInfo.sex}"> disabled="disabled" </c:if> >
											<option>请选择</option>
											<option value="MAN" <c:if test="${buyerInfo.sex == 'MAN'}"> selected="selected" </c:if> >男</option>
											<option value="WOMAN" <c:if test="${buyerInfo.sex == 'WOMAN'}"> selected="selected" </c:if> >女</option>
										</select>
									</div>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>身份证号码:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.cardNo}">
										<input name="buyerCardNo" class="form-control" type="text" tip="身份证号码不能为空" check="validateOpenCardForm(this)" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.cardNo}">
										<input class="form-control" name="buyerCardNo" type="text" readonly="readonly" value="${buyerInfo.cardNo}"/>
									</c:if>
								</div>
							</div>
							
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label">出生日期:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.birthday}">
										<input id="birthday" class="form-control" name="birthday" type="text" value="" tip="出生日期不能为空"/>
									</c:if>
									<c:if test="${not empty buyerInfo.birthday}">
										<input class="form-control" name="birthday" type="text" readonly="readonly" value="${buyerInfo.birthday}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>婚姻状况:</label>
								<div class='col-md-2'>
									<div obj="" tip="婚姻状况不能为空">
										<input type="hidden" name="married" value="${buyerInfo.married}">
										<select  check="validFormSelect(this)" <c:if test="${not empty buyerInfo.married}"> disabled="disabled" </c:if> id="married-select" name="married"></select>
									</div>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>发证机关:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.certifyingAuthority}">
										<input class="form-control"  check="validateOpenCardForm(this)" name="certifyingAuthority" tip="发证机关不能为空" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.certifyingAuthority}">
										<input class="form-control" name="certifyingAuthority" type="text" readonly="readonly" value="${buyerInfo.certifyingAuthority}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>证件有效期截止日:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.cardValidDate}">
										<input  id="card-valid-date" name="cardValidDate" check="validateOpenCardForm(this)"  tip="证件有效期截止日不能为空" class="form-control" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.cardValidDate}">
										<input class="form-control" name="cardValidDate" maxLength="100" type="text" readonly="readonly" value='<sl:format type="date" show="${buyerInfo.cardValidDate}" pattern="yyyyMMdd"/>' />
									</c:if>
								</div>
							</div>
							
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label"><span class="red">*</span>手机号码:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.tel}">
										<input class="form-control" name="tel" check="validateOpenCardForm(this)" tip="手机号码不能为空"  type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.tel}">
										<input class="form-control" name="tel" type="text" readonly="readonly" value="${buyerInfo.tel}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">学历:</label>
								<div class='col-md-2'>
									<input type="hidden" name="flexKey" value="${buyerInfo.flexKey}">
									<select <c:if test="${not empty buyerInfo.flexKey}"> disabled="disabled" </c:if> id="flexKey-select" name="educational"></select>
								</div>
								<label class="col-md-1 control-label">住宅状况:</label>
								<div class='col-md-2'>
									<input type="hidden" name="housePropertyCode" value="${buyerInfo.housePropertyCode}">
									<select <c:if test="${not empty buyerInfo.housePropertyCode}"> disabled="disabled" </c:if> id="house-property-code-select" name="housePropertyCode"></select>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>住宅邮编:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.homeZip}">
										<input class="form-control" name="homeZip" type="text" check="validateOpenCardForm(this)" tip="住宅邮编不能为空" maxLength="8" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.homeZip}">
										<input class="form-control" name="homeZip" type="text" readonly="readonly" value="${buyerInfo.homeZip}"/>
									</c:if>
								</div>
							</div>
							
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label">住址电话:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.homePhone}">
										<input class="form-control" check="validateOpenCardForm(this)" name="homePhone" tip="住址电话不能为空" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.homePhone}">
										<input class="form-control" name="homePhone" type="text" readonly="readonly" value="${buyerInfo.homePhone}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">年收入(元):</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.yearIncome}">
										<input class="form-control" name="yearIncome" check="validateOpenCardForm(this)" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.yearIncome}">
										<input class="form-control" name="yearIncome" type="text" readonly="readonly" value='<sl:format type="number" show="${buyerInfo.yearIncome}" pattern="#,##0.00"/>'/>
									</c:if>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>入住日期:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.checkInDate}">
										<input  id="check-in-date" name="checkInDate" check="validateOpenCardForm(this)"  tip="入住日期不能为空" class="form-control" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.checkInDate}">
										<input class="form-control" name="checkInDate" maxLength="100" type="text" readonly="readonly" value='<sl:format type="date" show="${buyerInfo.checkInDate}" pattern="yyyy-MM-dd"/>' />
									</c:if>
								</div>
							</div>
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label"><span class="red">*</span>住宅地址:</label>
								<div class='col-md-11'>
									<div class="form-inline">
										<div class="form-group mr-none">
											<c:if test="${empty buyerInfo.currentAddress}">
												<input class="form-control" name="currentAddress" check="validateOpenCardForm(this)" tip="住址地址不能为空" type="text" value=""/>
											</c:if>
											<c:if test="${not empty buyerInfo.currentAddress}">
												<input class="form-control" name="currentAddress" type="text" readonly="readonly" value="${buyerInfo.currentAddress}"/>
											</c:if>
										</div>
										<div class="form-group mr-none">
											<c:if test="${empty buyerInfo.currentAddressDetail}">
												<input class="form-control" name="currentAddressDetail" check="validateOpenCardForm(this)" tip="住址地址详情不能为空" type="text" value=""/>
											</c:if>
											<c:if test="${not empty buyerInfo.currentAddressDetail}">
												<input class="form-control" name="currentAddressDetail" type="text" readonly="readonly" value="${buyerInfo.currentAddressDetail}"/>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<%-- end 基本信息 row --%>
			
				<div id="company-info" class="item-row">
					<fieldset>
						<legend>单位信息</legend>
						<div class="form-horizontal">
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label"><span class="red">*</span>单位名称:</label>
								<div class='col-md-2'>
									<c:if test="${empty companyInfo.companyName}">
										<input class="form-control" name="companyName" maxLength="100" check="validateOpenCardForm(this)" tip="单位名称不能为空" type="text" value=""/>
									</c:if>
									<c:if test="${not empty companyInfo.companyName}">
										<input class="form-control" name="companyName" maxLength="100" type="text" readonly="readonly" value="${companyInfo.companyName}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">单位电话区号:</label>
								<div class='col-md-2'>
									<c:if test="${empty companyInfo.companyZone}">
										<input class="form-control" name="companyZone" maxLength="100" check="validateOpenCardForm(this)"  type="text" value=""/>
									</c:if>
									<c:if test="${not empty companyInfo.companyZone}">
										<input class="form-control" name="companyZone" maxLength="100" type="text" readonly="readonly" value="${companyInfo.companyZone}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">单位电话:</label>
								<div class='col-md-2'>
									<c:if test="${empty companyInfo.companyTel}">
										<input class="form-control" name="companyTel" maxLength="100" check="validateOpenCardForm(this)"  tip="请输入有效的单位电话" type="text" value=""/>
									</c:if>
									<c:if test="${not empty companyInfo.companyTel}">
										<input class="form-control" name="companyTel" maxLength="100" type="text" readonly="readonly" value="${companyInfo.companyTel}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label">单位电话分机:</label>
								<div class='col-md-2'>
									<c:if test="${empty companyInfo.companyTelPart}">
										<input class="form-control" type="text" maxLength="100" check="validateOpenCardForm(this)"  tip="请输入有效的单位电话分机" name="companyTelPart" value=""/>
									</c:if>
									<c:if test="${not empty companyInfo.companyTelPart}">
										<input class="form-control" name="companyTelPart" maxLength="100" type="text" readonly="readonly" value="${companyInfo.companyTelPart}"/>
									</c:if>
								</div>
							</div>
							
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label">单位邮政编码:</label>
								<div class='col-md-2'>
									<c:if test="${empty companyInfo.companyZip}">
										<input class="form-control" type="text" name="companyZip" check="validateOpenCardForm(this)" tip="请输入有效的单位邮政编码" value=""/>
									</c:if>
									<c:if test="${not empty companyInfo.companyZip}">
										<input class="form-control" name="companyZip" maxLength="100" type="text" readonly="readonly" value="${companyInfo.companyZip}"/>
									</c:if>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>单位性质:</label>
								<div class='col-md-2'>
									<div obj="" tip="单位性质不能为空">
										<input type="hidden" name="companyTypeHidden" value="${companyInfo.companyType}">
										<select name="companyType" check="validFormSelect(this)" <c:if test="${not empty companyInfo.companyType}"> disabled="disabled" </c:if> id="company-type-select" name="companyType"></select>
									</div>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>职业:</label>
								<div class='col-md-2'>
									<div obj="" tip="联系人一性别不能为空">
										<input type="hidden" name="profession" value="${buyerInfo.profession}">
										<select check="validFormSelect(this)" <c:if test="${not empty buyerInfo.profession}"> disabled="disabled" </c:if> id="profession-select" name="profession"></select>
									</div>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>入职日期:</label>
								<div class='col-md-2'>
									<c:if test="${empty buyerInfo.entryDate}">
										<input id="entry-date" name="entryDate" check="validateOpenCardForm(this)" class="form-control" tip="入职日期不能为空" type="text" value=""/>
									</c:if>
									<c:if test="${not empty buyerInfo.entryDate}">
										<input class="form-control" name="entryDate" maxLength="100" type="text" readonly="readonly"  value='<sl:format type="date" show="${buyerInfo.entryDate}" pattern="yyyy-MM-dd"/>' />
									</c:if>
								</div>
							</div>
							
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label"><span class="red">*</span>单位地址:</label>
								<div class='col-md-11'>
									<div class="form-inline">
										<div class="form-group mr-none">
											<c:if test="${empty companyInfo.companyAddress}">
												<input class="form-control" name="companyAddress" check="validateOpenCardForm(this)" tip="单位地址不能为空"  type="text" value=""/>
											</c:if>
											<c:if test="${not empty companyInfo.companyAddress}">
												<input class="form-control" name="companyAddress" type="text" readonly="readonly" value="${companyInfo.companyAddress}"/>
											</c:if>
										</div>
										<div class="form-group mr-none">
											<c:if test="${empty companyInfo.companyAddressDetail}">
												<input class="form-control" name="companyAddressDetail" check="validateOpenCardForm(this)" tip="单位地址详情不能为空"  type="text" value=""/>
											</c:if>
											<c:if test="${not empty companyInfo.companyAddressDetail}">
												<input class="form-control" name="companyAddressDetail" type="text" readonly="readonly" value="${companyInfo.companyAddressDetail}"/>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<%-- end 单位信息 row --%>
			
				<div id="contactor-info" class="item-row">
					<fieldset>
						<legend>紧急联系人信息</legend>
						<div class="form-horizontal">
							<c:if test="${null != contacters && contacters.size() == 0}">
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label"><span class="red">*</span>联系人一姓名:</label>
									<div class='col-md-1'>
										<input class="form-control" name="contactorName" check="validateOpenCardForm(this)" tip="联系人一姓名不能为空" type="text" value=""/>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>性别:</label>
									<div class='col-md-1'>
										<div obj="" tip="联系人一性别不能为空">
											<select check="validFormSelect(this)" name="contactorSex" id="contacter-sex-select-1" >
												<option>请选择</option>
												<option value="MAN">男</option>
												<option value="WOMAN">女</option>
											</select>
										</div>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>关系:</label>
									<div class='col-md-1'>
										<div obj="" tip="联系人一关系不能为空">
											<select check="validFormSelect(this)" name="contactorRelationType" id="contacter-relation-type-code-select-1"></select>
										</div>
									</div>
									<label class="col-md-1 control-label">手机号码:</label>
									<div class='col-md-1'>
										<input class="form-control" check="validateOpenCardForm(this)" name="contactorTel" type="text" value=""/>
									</div>
									<label class="col-md-1 control-label">联系电话:</label>
									<div class='col-md-1'>
										<input class="form-control" check="validateOpenCardForm(this)" name="contactorPhone" type="text" value=""/>
									</div>
								</div>
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label"><span class="red">*</span>联系人二姓名:</label>
									<div class='col-md-1'>
										<input class="form-control" name="contactorName" type="text" check="validateOpenCardForm(this)" tip="联系人姓名不能为空"  value=""/>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>性别:</label>
									<div class='col-md-1'>
										<div obj="" tip="联系人二性别不能为空">
											<select check="validFormSelect(this)" name="contactorSex" id="contacter-sex-select-2">
												<option>请选择</option>
												<option value="MAN" >男</option>
												<option value="WOMAN">女</option>
											</select>
										</div>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>关系:</label>
									<div class='col-md-1'>
										<div obj="" tip="联系人二关系不能为空">
											<select check="validFormSelect(this)" name="contactorRelationType" id="contacter-relation-type-code-select-2"></select>
										</div>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>手机号码:</label>
									<div class='col-md-1'>
										<input class="form-control" check="validateOpenCardForm(this)" tip="联系人二手机号码不能为空" name="contactorTel" type="text" value=""/>
									</div>
									<label class="col-md-1 control-label">联系电话:</label>
									<div class='col-md-1'>
										<input class="form-control" check="validateOpenCardForm(this)" tip="联系人二联系电话不能为空" name="contactorPhone" type="text" value=""/>
									</div>
								</div>
							</c:if>
							<c:if test="${null != contacters && contacters.size() == 1}">
								<c:forEach var="contacter" items="${contacters}" varStatus="st">
									<div class="m-rl-tb m-t-xs row">
										<label class="col-md-1 control-label"><span class="red">*</span>联系人一姓名:</label>
										<div class='col-md-1'>
											<input type="hidden" name="id" value="${contacter.id}" />
											<c:if test="${empty contacter.realName}">
												<input class="form-control" name="contactorName" check="validateOpenCardForm(this)" tip="联系人姓名不能为空"  type="text" value=""/>
											</c:if>
											<c:if test="${not empty contacter.realName}">
												<input class="form-control" name="contactorName" type="text" readonly="readonly" value="${contacter.realName}"/>
											</c:if>
										</div>
										<label class="col-md-1 control-label"><span class="red">*</span>性别:</label>
										<div class='col-md-1'>
											<div obj="" tip="联系人性别不能为空">
												<select check="validFormSelect(this)" name="contactorSex" id="contacter-sex-select-${st.index + 1}" <c:if test="${not empty contacter.sex}"> disabled="disabled" </c:if> >
													<option>请选择</option>
													<option value="MAN" <c:if test="${contacter.sex == 'MAN'}"> selected="selected" </c:if> >男</option>
													<option value="WOMAN" <c:if test="${contacter.sex == 'WOMAN'}"> selected="selected" </c:if> >女</option>
												</select>
											</div>
										</div>
										<label class="col-md-1 control-label"><span class="red">*</span>关系:</label>
										<div class='col-md-1'>
											<div obj="" tip="联系人关系不能为空">
												<input type="hidden" name="contactorRelationType" value="${contacter.relationTypeCode}">
												<select check="validFormSelect(this)" name="contactorRelationType" id="contacter-relation-type-code-select-${st.index + 1}" <c:if test="${not empty contacter.relationTypeCode}"> disabled="disabled" </c:if> ></select>
											</div>
										</div>
										<label class="col-md-1 control-label"><span class="red">*</span>手机号码:</label>
										<div class='col-md-1'>
											<c:if test="${empty contacter.tel}">
												<input class="form-control" name="contactorTel" check="validateOpenCardForm(this)" tip="联系人手机号码不能为空" type="text" value=""/>
											</c:if>
											<c:if test="${not empty contacter.tel}">
												<input class="form-control" name="contactorTel" type="text" readonly="readonly" value="${contacter.tel}"/>
											</c:if>
										</div>
										<label class="col-md-1 control-label">联系电话:</label>
										<div class='col-md-1'>
											<c:if test="${empty contacter.phone}">
												<input class="form-control" name="contactorPhone" check="validateOpenCardForm(this)" tip="联系人联系电话不能为空" type="text" value=""/>
											</c:if>
											<c:if test="${not empty contacter.phone}">
												<input class="form-control" name="contactorPhone" type="text" readonly="readonly" value="${contacter.phone}"/>
											</c:if>
										</div>
									</div>
								</c:forEach>
								<div class="m-rl-tb m-t-xs row">
									<label class="col-md-1 control-label"><span class="red">*</span>联系人二姓名:</label>
									<div class='col-md-1'>
										<input class="form-control" name="contactorName" type="text" check="validateOpenCardForm(this)" tip="联系人姓名不能为空" value=""/>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>性别:</label>
									<div class='col-md-1'>
										<div obj="" tip="联系人性别不能为空">
											<select name="contactorSex" check="validFormSelect(this)"  id="contacter-sex-select-2" <c:if test="${not empty contacter.sex}"> disabled="disabled" </c:if> >
												<option>请选择</option>
												<option value="MAN">男</option>
												<option value="WOMAN">女</option>
											</select>
										</div>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>关系:</label>
									<div class='col-md-1'>
										<div obj="" tip="联系人关系不能为空">
											<select check="validFormSelect(this)"  name="contactorRelationType" id="contacter-relation-type-code-select-2"></select>
										</div>
									</div>
									<label class="col-md-1 control-label"><span class="red">*</span>手机号码:</label>
									<div class='col-md-1'>
										<input class="form-control" name="contactorTel" type="text" check="validateOpenCardForm(this)" tip="联系人手机号码不能为空" value=""/>
									</div>
									<label class="col-md-1 control-label">联系电话:</label>
									<div class='col-md-1'>
										<input class="form-control" name="contactorPhone" type="text" check="validateOpenCardForm(this)" tip="联系人联系系电话不能为空" value=""/>
									</div>
								</div>
							</c:if>
							<c:if test="${null != contacters && contacters.size() == 2}">
								<c:forEach var="contacter" items="${contacters}" varStatus="st">
									<div class="m-rl-tb m-t-xs row">
										<label class="col-md-1 control-label"><span class="red">*</span>联系人<c:if test="${st.index == 0 }">一</c:if><c:if test="${st.index == 1 }">二</c:if>姓名:</label>
										<div class='col-md-1'>
											<input type="hidden" name="id" value="${contacter.id}" />
											<c:if test="${empty contacter.realName}">
												<input class="form-control" name="contactorName" check="validateOpenCardForm(this)" tip="联系人姓名不能为空"  type="text" value=""/>
											</c:if>
											<c:if test="${not empty contacter.realName}">
												<input class="form-control" name="contactorName" type="text" readonly="readonly" value="${contacter.realName}"/>
											</c:if>
										</div>
										<label class="col-md-1 control-label"><span class="red">*</span>性别:</label>
										<div class='col-md-1'>
											<div obj="" tip="联系人性别不能为空">
												<select  check="validFormSelect(this)" name="contactorSex" id="contacter-sex-select-${st.index + 1}" <c:if test="${not empty contacter.sex}"> disabled="disabled" </c:if> >
													<option>请选择</option>
													<option value="MAN" <c:if test="${contacter.sex == 'MAN'}"> selected="selected" </c:if> >男</option>
													<option value="WOMAN" <c:if test="${contacter.sex == 'WOMAN'}"> selected="selected" </c:if> >女</option>
												</select>
											</div>
										</div>
										<label class="col-md-1 control-label"><span class="red">*</span>关系:</label>
										<div class='col-md-1'>
											<div obj="" tip="联系人关系不能为空">
												<input type="hidden" name="contactorRelationType" value="${contacter.relationTypeCode}">
												<select check="validFormSelect(this)" id="contacter-relation-type-code-select-${st.index + 1}" <c:if test="${not empty contacter.relationTypeCode}"> disabled="disabled" </c:if> ></select>
											</div>
										</div>
										<label class="col-md-1 control-label"><span class="red">*</span>手机号码:</label>
										<div class='col-md-1'>
											<c:if test="${empty contacter.tel}">
												<input class="form-control" name="contactorTel" type="text" check="validateOpenCardForm(this)" tip="联系人手机号码不能为空"  value=""/>
											</c:if>
											<c:if test="${not empty contacter.tel}">
												<input class="form-control" name="contactorTel" type="text" readonly="readonly" value="${contacter.tel}"/>
											</c:if>
										</div>
										<label class="col-md-1 control-label">联系电话:</label>
										<div class='col-md-1'>
											<c:if test="${empty contacter.phone}">
												<input class="form-control" name="contactorPhone" type="text" check="validateOpenCardForm(this)" tip="联系人系电话不能为空"  value=""/>
											</c:if>
											<c:if test="${not empty contacter.phone}">
												<input class="form-control" name="contactorPhone" type="text" readonly="readonly" value="${contacter.phone}"/>
											</c:if>
										</div>
									</div>
								</c:forEach>
							</c:if>
						</div>
					</fieldset>
				</div>
				<%-- end 紧急联系人信息 row --%>
			
				<div id="personal-info" class="item-row">
					<fieldset>
						<legend>定制个性服务</legend>
						<div class="form-horizontal">
							<div class="m-rl-tb m-t-xs row">
								<label class="col-md-1 control-label">对帐单E-mail:</label>
								<div class='col-md-2'>
									<input class="form-control" name="billEmail" type="text" tip="请输入有效的Email" check="validateOpenCardForm(this)" value=""/>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>对帐单寄送方式:</label>
								<div class='col-md-2'>
									<div obj="" tip="卡片领取方式不能为空">
										<select id="bill-send-way" check="validateOpenCardForm(this)" name="billSendWay">
											<option value="0">自取</option>
											<option value="1">寄送</option>
											<option value="2">自助打印</option>
											<option value="3">对账簿</option>
											<option value="4">不打印</option>
										</select>
									</div>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>卡片领取:</label>
								<div class='col-md-2'>
									<div obj="" tip="卡片领取方式不能为空">
										<select id="receive-card-way-select" check="validateOpenCardForm(this)" name="receiveCardWay">
											<option value="1">自取</option>
											<option value="2">寄送</option>
										</select>
									</div>
								</div>
								<label class="col-md-1 control-label"><span class="red">*</span>短信提醒:</label>
								<div class='col-md-2'>
									<div obj="" tip="短信提醒不能为空">
										<select id="balance-message-tip-select" check="validateOpenCardForm(this)" name="balanceMessageTip">
											<option value="0">否</option>
											<option value="1">是</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<%-- end 定制个性服务 row --%>
				
				<div class="item-row">
					<fieldset>
						<legend>信用卡申请附件 </legend>
						<div class="form-horizontal">
							<div class="padding-15">
								<input type="hidden" value='${files}' id="open-file-hidden">
								<div class="clear wrapper-content">
									<div id="bank-card-upload-file" class="clear file gallerys">
										<div id="open-card-uploader-1" class="open-card-photo" data-type="21">
									
										</div>
										<div id="open-card-uploader-2" class="open-card-photo" data-type="22">
								
										</div>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<%-- end 定制个性服务 row --%>
				<div class="m-rl-tb row" id="audit-operate-2">
					<div class="col-md-12 text-right">
						<button data-id="${order.id}" class="btn btn-w-m btn-success agree-open-card-btn">提交</button>
						<button data-id="${order.id}" class="btn btn-w-m btn-danger m-r-xs back-open-card-btn">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<sl:dictData type="120000,290000,420000,430000,440000,450000,460000,461000,470000,480000,500000,490000,510000,520000,530000"/>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/card/open.js"></script>
</html>
