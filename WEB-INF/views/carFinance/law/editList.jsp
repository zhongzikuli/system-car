<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>

<div class="mod_header">
		<div id="hiddenForm">
			<input type="hidden" value="${acceptId}" id="acceptId" name="acceptId" />
			<input id="id" type="hidden" value="${entity.id}"/>
			<input id="courtDates" type="hidden" value="${entity.courtDate}"/>
		</div>	
		<div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <h5><strong>编辑</strong></h5>
            </div>
        </div>
        <div class="col-sm-6 text-right">
            <div class="form-group">
            	<a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic height-auto">
    <div class="ibox-content" id="lawEdit-Form">
        <div class="tabs-container car-finance padding-min">
        	<form id="lawCreateForm" class="form-horizontal">
				<fieldset>
					<legend>客户信息</legend>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">客户姓名:</label>
							<div class="col-xs-8">
								<input type="text" class="form-control"  value="${cfLawEntity.customerName}" readonly="readonly">
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">身份证号:</label>
							<div class="col-xs-8">
								<input type="text" class="form-control"  value="${cfLawEntity.cardNo}" readonly="readonly">
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">车型:</label>
							<div class="col-xs-8">
								<input type="text" class="form-control"  value="${cfLawEntity.carBrandName}" readonly="readonly">
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">拖车状态:</label>
							<div class="col-xs-8">
								<select class="form-control" id="search-style" readonly="readonly"  disabled="disabled">
										<option value="1" <c:if test="${cfLawEntity.carStatus == 1}">selected</c:if>>已拖车</option>
			                            <option value="2" <c:if test="${cfLawEntity.carStatus == 2}">selected</c:if>>已结清</option>
			                            <option value="3" <c:if test="${cfLawEntity.carStatus == 3}">selected</c:if>>其他</option>
									</select>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>立案</legend>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">案号:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="caseNo" id="caseNo" value="${entity.caseNo}">
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">诉讼金额(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="lawMoney" id="lawMoney"  value="${entity.lawMoney}">
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">诉讼费(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="lawFee" id="lawFee" value="${entity.lawFee}">
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">诉讼退费(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="lawFee" id="lawRefundFee" value="${entity.lawRefundFee}">
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">律师费(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="lawerFee" id="lawerFee"  value="${entity.lawerFee}">
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">保全费(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="assureCompleteFee" id="assureCompleteFee"  value="${entity.assureCompleteFee}" >
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">公告费(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="noticeFee" id="noticeFee"  value="${entity.noticeFee}">
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">执行费(元):</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="executeFee" id="executeFee"   value="${entity.executeFee}" >
								</div>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">立案日期:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control caseDate" name="caseDate" id="caseDate"   value="<fmt:formatDate value="${entity.caseDate}" pattern="yyyy-MM-dd"/>">
								</div>
							</div>
						</div>
				</fieldset>
				<fieldset>
					<legend>开庭</legend>
					<div class="col-sm-3">
							<div class="form-group">
								<label class="col-xs-3 control-label">法官姓名:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="openJudgeName" id="openJudgeName" value="${entity.openJudgeName}">
								</div>
							</div>
					</div>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">法官电话:</label>
							<div class="col-xs-8">
								<input type="text" class="form-control" name="openJudgeTel" id="openJudgeTel" value="${entity.openJudgeTel}">
							</div>
						</div>
					</div>
					<div class="col-sm-3 start">
							<div class="form-group">
								<label class="col-xs-3 control-label">开庭日期:</label>
								<div class="col-xs-7">
									<input type="text" class="form-control courtDate" name="courtDate" id="courtDate">
								</div>
								<div class="col-xs-2">
									<a href="javascript:void(0)" class="btn btn-primary" id="add-input" >增加</a>
								</div>
							</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>执行</legend>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="col-xs-3 control-label">执行案号:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="executeCaseNo" id="executeCaseNo" value="${entity.executeCaseNo}">
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="col-xs-3 control-label">执行申请日期:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control applyExecuteDate" name="applyExecuteDate" id="applyExecuteDate"   value="<fmt:formatDate value="${entity.applyExecuteDate}" pattern="yyyy-MM-dd"/>">
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="col-xs-3 control-label">失信人员:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="executeCustomerName" id="executeCustomerName" value="${entity.executeCustomerName}">
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="col-xs-3 control-label">法官姓名:</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" name="executeJudgeName" id="executeJudgeName" value="${entity.executeJudgeName}">
								</div>
							</div>
						</div>
						<div class="col-sm-4">
								<div class="form-group">
									<label class="col-xs-3 control-label">法官电话:</label>
									<div class="col-xs-8">
										<input type="text" class="form-control" name="executeJudgeTel" id="executeJudgeTel" value="${entity.executeJudgeTel}">
									</div>
								</div>
						</div>
					</fieldset>
					<fieldset>
					<legend>案件</legend>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">案件状态:</label>
							<div class="col-xs-8">
								<select class="form-control"  name="caseStatus" id="caseStatus">
										<option value=""></option>
										<option value="1" <c:if test="${entity.caseStatus == 1}">selected</c:if>>等待开庭</option>
			                            <option value="2" <c:if test="${entity.caseStatus == 2}">selected</c:if>>已开庭待判决</option>
			                            <option value="3" <c:if test="${entity.caseStatus == 3}">selected</c:if>>已判决待执行</option>
			                            <option value="4" <c:if test="${entity.caseStatus ==4}">selected</c:if>>执行中，终结/终本</option>
								</select>
							</div>
						</div>
					</div>
					
				</fieldset>
					
				<fieldset>
					<legend>回款</legend>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">回款金额:</label>
							<div class="col-xs-8">
								<input type="text" class="form-control" name="receiveMoney" id="receiveMoney" value="${entity.receiveMoney}">
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="form-group">
							<label class="col-xs-3 control-label">回款时间:</label>
							<div class="col-xs-8">
								<input type="text" class="form-control receiveMoneyTime" name="receiveMoneyTime" id="receiveMoneyTime"  value="<fmt:formatDate value="${entity.receiveMoneyTime}" pattern="yyyy-MM-dd HH:mm"/>">
							</div>
						</div>
					</div>
					
				</fieldset>
				<fieldset>
					<legend>其他</legend>
						<div class="col-sm-9">
							<div class="form-group">
								<label class="col-xs-2 control-label"><span class="red">*</span>备注:</label>
								<div class="col-xs-10">
									<textarea id="caseBak" class="form-control" check="validLaw(this)" style="resize: none;height:120px;" >${entity.caseBak}</textarea>
								</div>
							</div>
						</div>
			</fieldset>
			</form>
			<div class="dialog-manage" style="padding-right: 50px;">
            <input type="button" class="btn btn-primary submit-button" value="提交"/> &nbsp;
            <a class="btn  btn-default" href="javascript:history.go(-1)" >取消</a>
        </div>
		</div>
    </div>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/law/editList.js"></script>
</html>