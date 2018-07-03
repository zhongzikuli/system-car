<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>订单权限码控制</title>
	</head>
	<body>
		<div class="detail-permission-code-wrap">
			<%-- 车辆信息 --%>
			<shiro:hasPermission name="OrderDetail:updateCarInfo">
				<input type="hidden" name="updateCarInfo">
			</shiro:hasPermission>
			<%--
			<shiro:hasPermission name="OrderDetail:exportExcelCarInfo">
				<input type="hidden" name="exportExcelCarInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveSupplyCarInfo">
				<input type="hidden" name="saveSupplyCarInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveGPSCarInfo">
				<input type="hidden" name="saveGPSCarInfo">
			</shiro:hasPermission>
			 --%>
				<%--打款前--%>
				<shiro:hasPermission name="OrderDetail:beforePayment">
					<input type="hidden" name="beforePayment">
				</shiro:hasPermission>
				<%--打款后--%>
				<shiro:hasPermission name="OrderDetail:afterPayment">
					<input type="hidden" name="afterPayment">
				</shiro:hasPermission>
				<%--财务打款后--%>
				<shiro:hasPermission name="OrderDetail:afterFinancialPayment">
					<input type="hidden" name="afterFinancialPayment">
				</shiro:hasPermission>
			<%-- end 车辆信息 --%>

			<%-- 放贷信息 打款上传凭证 --%>
			<shiro:hasPermission name="OrderDetail:uploadLendProof">
				<input type="hidden" name="uploadLendProof">
			</shiro:hasPermission>


				<shiro:hasPermission name="OrderDetail:principalUploadLendProof">
					<input type="hidden" name="principalUploadLendProof">
				</shiro:hasPermission>

				<shiro:hasPermission name="OrderDetail:secondUploadLendProof">
					<input type="hidden" name="secondUploadLendProof">
				</shiro:hasPermission>

			<shiro:hasPermission name="OrderDetail:financialPayLoanOperate">
				<input type="hidden" name="financialPayLoanOperate">
			</shiro:hasPermission>

			<%--	财务放贷操作，涉及不同操作共用一个方法，所以权限码相同
			<shiro:hasPermission name="OrderDetail:confirmPlayMoney">
				<input type="hidden" name="confirmPlayMoney">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:savePlayMoney">
				<input type="hidden" name="savePlayMoney">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:dealPlayMoney">
				<input type="hidden" name="dealPlayMoney">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:cancelPlayMoney">
				<input type="hidden" name="cancelPlayMoney">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:cancelPlayDealing">
				<input type="hidden" name="cancelPlayDealing">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveCardInfo">
				<input type="hidden" name="saveCardInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveBillQuitFile">
				<input type="hidden" name="saveBillQuitFile">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveContractInfo">
				<input type="hidden" name="saveContractInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveArchivesInfo">
				<input type="hidden" name="saveArchivesInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:savePlayOtherInfo">
				<input type="hidden" name="savePlayOtherInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveBankQuitFile">
				<input type="hidden" name="saveBankQuitFile">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveSettleLoan">
				<input type="hidden" name="saveSettleLoan">
			</shiro:hasPermission>

			 --%>
			<shiro:hasPermission name="OrderDetail:saveArchivesTeamToDate">
				<input type="hidden" name="saveArchivesTeamToDate">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveArchivesBankToDate">
				<input type="hidden" name="saveArchivesBankToDate">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveArchivesToDate">
				<input type="hidden" name="saveArchivesToDate">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveArchivesGetDate">
				<input type="hidden" name="saveArchivesGetDate">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveArchivesCompleteDate">
				<input type="hidden" name="saveArchivesCompleteDate">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveArchivesAlternateDate">
				<input type="hidden" name="saveArchivesAlternateDate">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveScanningDate">
				<input type="hidden" name="saveScanningDate">
			</shiro:hasPermission>
			<%-- end 放贷信息 --%>

			<%-- 注册抵押 --%>
			<shiro:hasPermission name="OrderDetail:saveTransferInfo">
				<input type="hidden" name="saveTransferInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveMortgageCar">
				<input type="hidden" name="saveMortgageCar">
			</shiro:hasPermission>
			
			<shiro:hasPermission name="OrderDetail:saveMortgageInfo">
				<input type="hidden" name="saveMortgageInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:uploadMortgageFile">
				<input type="hidden" name="uploadMortgageFile">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveCarMortgageInfo">
				<input type="hidden" name="saveCarMortgageInfo">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveMortgageBinding">
				<input type="hidden" name="saveMortgageBinding">
			</shiro:hasPermission>
			<%-- end 注册抵押 --%>

			<%-- 保险信息 --%>
			<shiro:hasPermission name="OrderDetail:saveInsuranceInfo">
				<input type="hidden" name="saveInsuranceInfo">
			</shiro:hasPermission>
			<%-- end 保险信息 --%>

			<%-- 出险情况 --%>
			<shiro:hasPermission name="OrderDetail:editInsuranceClaim">
				<input type="hidden" name="editInsuranceClaim">
			</shiro:hasPermission>
			<%-- end 出险情况 --%>

			<%-- 逾期情况 --%>
			<shiro:hasPermission name="OrderDetail:insertOverdue">
				<input type="hidden" name="insertOverdue">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:deleteOverdue">
				<input type="hidden" name="deleteOverdue">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:callRepay">
				<input type="hidden" name="callRepay">
			</shiro:hasPermission>
			<%-- end 逾期情况 --%>


			<%-- 财务打款 --%>
			<shiro:hasPermission name="OrderDetail:confirmFinancialIncome">
				<input type="hidden" name="confirmFinancialIncome">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:confirmFinancialPay">
				<input type="hidden" name="confirmFinancialPay">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:saveFinancialPlayMoney">
				<input type="hidden" name="saveFinancialPlayMoney">
			</shiro:hasPermission>
			<%-- end 财务打款 --%>


			<%-- 财务收支 --%>
			<shiro:hasPermission name="OrderDetail:insertFinancialIncome">
				<input type="hidden" name="insertFinancialIncome">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:editFinancialIncome">
				<input type="hidden" name="editFinancialIncome">
			</shiro:hasPermission>
			<shiro:hasPermission name="OrderDetail:deleteFinancialIncome">
				<input type="hidden" name="deleteFinancialIncome">
			</shiro:hasPermission>
			<%-- end 财务收支 --%>

			<%-- 订单附件 --%>
			<shiro:hasPermission name="OrderDetail:downloadFile">
				<input type="hidden" name="downloadFile">
			</shiro:hasPermission>
			<%-- end 订单附件 --%>
		</div>
		<script type="text/javascript">
			function hasPermission(name){
				var data = $(".detail-permission-code-wrap").find("input[name='"+name+"']");
				if(typeof(data) != "undefined" && data.length > 0){
					return true;
				}else{
					return false;
				}
			}
		</script>
	</body>
</html>