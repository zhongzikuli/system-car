<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <title></title>

</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
               <h5><strong>查看</strong></h5>
            </div>
        </div>
        <div class="col-sm-6 text-right">
            <div class="form-group">
                <a class="btn btn-sm btn-info" href="javascript:history.go(-1)">返回列表</a>
            </div>
        </div>
    </div>
</div>
<div class="mod_basic">
    <div class="ibox-content">
        <form id="dealerManageForm" class="form-horizontal">
            <div id="dealerAdd" style="width: 98%; margin:10px auto; border-radius: 5px;">
                <div class="row">
                    <div class="col-sm-6">

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经销商名称:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_name"
                                       readonly="readonly" name="dealerName" value="${CfCarDealerEntity.dealerName}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经销商简称:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${CfCarDealerEntity.shortName}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>地址:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="address"
                                       readonly="readonly" name="address" value="${CfCarDealerEntity.address}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>联系电话:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="tel"
                                       readonly="readonly" name="tel" value="${CfCarDealerEntity.tel}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>传真:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="fax"
                                       readonly="readonly" name="fax" value="${CfCarDealerEntity.fax}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>银行:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="bank"
                                       readonly="readonly" name="bankName" value="${CfCarDealerEntity.bankName}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>银行开户名:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="bank_account_name"
                                       readonly="readonly" name="bankAccountName" value="${CfCarDealerEntity.bankAccountName}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>银行账号:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="bank_account"
                                       readonly="readonly" name="bankAccount" value="${CfCarDealerEntity.bankAccount}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>税号:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="tax_no"
                                       readonly="readonly" name="taxNo" value="${CfCarDealerEntity.taxNo}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>部门名称:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${CfCarDealerEntity.departmentName}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>联系人:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="contact"
                                       readonly="readonly" name="contact" value="${CfCarDealerEntity.contact}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>邮编:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="postCode"
                                       readonly="readonly" name="postCode" value="${CfCarDealerEntity.postCode}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>Email:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="email"
                                       readonly="readonly" name="email" value="${CfCarDealerEntity.email}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>注册资金:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="register_money"
                                       readonly="readonly" name="registerMoney"
                                       value="${CfCarDealerEntity.registerMoney}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>法人代表:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="lega_person"
                                       readonly="readonly" name="legalPerson" value="${CfCarDealerEntity.legalPerson}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>企业性质:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${CompanyNature}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>成立时间:</label>
                            <div class="col-sm-9 control-label">
                                <input readonly="readonly" type="text" class="form-control"
                                       value="${CfCarDealerEntity.establishTime}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>从业年限:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="company_age"
                                       readonly="readonly" name="companyAge" value="${CfCarDealerEntity.companyAge}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经营场所性质:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${PlaceNature}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>场地租期:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="place_lease"
                                       readonly="readonly" name="placeLease" value="${CfCarDealerEntity.placeLease}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>场地面积:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="place_area"
                                       readonly="readonly" name="placeArea" value="${CfCarDealerEntity.placeArea}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经营类型:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${BusinessType}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>代理品牌:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="prox_brand"
                                       readonly="readonly" name="proxyBrand" value="${CfCarDealerEntity.proxyBrand}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>代理方式:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${ProxyMethod}">
                            </div>
                        </div>
                    </div>

                    <!-- 右边的填框 -->
                    <div class="col-sm-6">

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>维修厂:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="maintenanceFactory"
                                       readonly="readonly" name="maintenanceFactory" value="${CfCarDealerEntity.maintenanceFactory}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>销售区域:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="sale_area"
                                       readonly="readonly" name="saleArea" value="${CfCarDealerEntity.saleArea}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>年销售量:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="sale_numbery_year"
                                       readonly="readonly" name="saleNumberYear"
                                       value="${CfCarDealerEntity.saleNumberYear}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>主销车型:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="main_sale_car_type"
                                       readonly="readonly" name="mainSaleCarType"
                                       value="${CfCarDealerEntity.mainSaleCarType}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>区域排名:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="region_rank"
                                       readonly="readonly" name="regionRank" value="${CfCarDealerEntity.regionRank}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>合作等级:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_level"
                                       readonly="readonly" name="dealerLevel" value="${teamworkRank}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>合作时间:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${CooperationPeriod}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>协议签署:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${ProtocolSigned}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>协议时间:</label>
                            <div class="col-sm-9 control-label">
                                <input readonly="readonly" type="text" class="form-control"
                                       value="${CfCarDealerEntity.protocolTime}">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>价格政策:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="price_policy"
                                       readonly="readonly" name="pricePolicy" value="${CfCarDealerEntity.pricePolicy}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>主要信贷专员:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="main_credit_person"
                                       readonly="readonly" name="mainCreditPerson"
                                       value="${CfCarDealerEntity.mainCreditPerson}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>职级:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="rank"
                                       readonly="readonly" name="rank" value="${CfCarDealerEntity.rank}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>专职:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${FullTime}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>月均贷款量:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="monthLoanNumber"
                                       readonly="readonly" name="monthLoanNumber"
                                       value="${CfCarDealerEntity.monthLoanNumber}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经销商类别:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       readonly="readonly" name="shortName" value="${DealerType}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>一年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="one_year_interest_rate"
                                       readonly="readonly" name="oneYearInterestRate"
                                       value="${CfCarDealerEntity.oneYearInterestRate}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>两年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="two_year_interest_rate"
                                       readonly="readonly" name="twoYearInterestRate"
                                       value="${CfCarDealerEntity.twoYearInterestRate}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>三年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="three_year_interest_rate"
                                       readonly="readonly" name="threeYearInterestRate"
                                       value="${CfCarDealerEntity.threeYearInterestRate}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>四年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="four_year_interest_rate"
                                       readonly="readonly" name="fourYearInterestRate"
                                       value="${CfCarDealerEntity.fourYearInterestRate}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>二手车一年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_one_year_interest_rate"
                                       readonly="readonly" name="usedCarOneYearInterestRate"
                                       value="${CfCarDealerEntity.usedCarOneYearInterestRate}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>二手车两年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_two_year_interest_rate"
                                       readonly="readonly" name="usedCarTwoYearInterestRate"
                                       value="${CfCarDealerEntity.usedCarTwoYearInterestRate}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>二手车三年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_three_year_interest_rate"
                                       readonly="readonly" name="usedCarThreeYearInterestRate"
                                       value="${CfCarDealerEntity.usedCarThreeYearInterestRate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>二手车四年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_four_year_interest_rate"
                                       readonly="readonly" name="usedCarfourYearInterestRate"
                                       value="${CfCarDealerEntity.usedCarFourYearInterestRate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">新车保证金利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control"  readonly="readonly"  id="newCarMarginRate"  value="${CfCarDealerEntity.newCarMarginRate}" name="newCarMarginRate" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">二手车保证金利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control"   readonly="readonly" id="oldCarMarginRate" value="${CfCarDealerEntity.oldCarMarginRate}"  name="oldCarMarginRate"  >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/other/dealerManage/addUpdate.js"></script>
</html>