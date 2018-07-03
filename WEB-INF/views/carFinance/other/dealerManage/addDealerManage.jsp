<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
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
                <h5><strong>新增</strong></h5>
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
    <div class="ibox-content" id="dealerManage-Form">
        <form id="dealerManageForm" class="form-horizontal">
            <div id="dealerAdd" style="width: 98%; margin:10px auto; border-radius: 5px;">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>经销商名称:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_name" check="validDealerManage(this)"
                                       maxlength="50" name="dealerName" value="" tip="经销商名称不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经销商简称:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="dealer_shortname"
                                       name="shortName" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>地址:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="address"
                                       name="address" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">联系电话:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="tel"
                                       name="tel" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>传真:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="fax"
                                       name="fax" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">银行:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="bank"
                                       name="bankName" value="" tip="银行不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">银行开户名:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="bankAccountName"
                                       name="bankAccountName" value=""
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">银行账号:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="bankAccount"
                                       name="bankAccount">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>税号:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="taxNo"
                                       name="taxNo" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>部门名称:</label>
                            <div class="col-sm-9">
                                <div obj="">
                                    <select id="departmentId" class="form-control departmentId"
                                            check="validDealerManage(this)" name="departmentId"
                                            data-placeholder="部门名称...">
                                        <option value="">请选择部门名称</option>
                                        <c:forEach items="${DepartmentNames}" var="names">
                                            <option value="${names.id}">${names.name }</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>联系人:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="contact"
                                       name="contact" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>邮编:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="postCode"
                                       name="postCode" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>Email:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="email"
                                       name="email" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>注册资金:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="register_money"
                                       name="registerMoney" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>法人代表:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="lega_person"
                                       name="legalPerson" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>企业性质:</label>
                            <div class="col-sm-9">
                                <select id="companyNature" class="form-control companyNature" name="companyNature"
                                        data-placeholder="企业性质...">
                                    <option value="">请选择企业性质</option>
                                    <c:forEach items="${companyProperty }" var="companyProperty">
                                        <option value="${companyProperty.keyWorld}">${companyProperty.valueDesc}
                                        </option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>成立时间:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="establishTime" id="establishTime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>从业年限:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="company_age"
                                       name="companyAge" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经营场所性质:</label>
                            <div class="col-sm-9">
                                <select id="placeNature" class="form-control placeNature" name="placeNature"
                                        data-placeholder="经营场所性质...">
                                    <option value="">请选择经营场所性质</option>
                                    <c:forEach items="${placeProperty }" var="placeProperty">
                                        <option value="${placeProperty.keyWorld}">${placeProperty.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>场地租期:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="place_lease"
                                       name="placeLease" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>场地面积:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="place_area"
                                       name="placeArea" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经营类型:</label>
                            <div class="col-sm-9">
                                <select id="business_type" class="form-control business_type" name="businessType"
                                        data-placeholder="经营类型...">
                                    <option value="">请选择经营类型</option>
                                    <c:forEach items="${manageType }" var="manageType">
                                        <option value="${manageType.keyWorld}">${manageType.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>代理品牌:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="prox_brand"
                                       name="proxyBrand" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>代理方式:</label>
                            <div class="col-sm-9">
                                <select id="proxy_method" class="form-control proxy_method" name="proxyMethod"
                                        data-placeholder="代理方式...">
                                    <option value="">请选择代理方式</option>
                                    <c:forEach items="${agencyMode }" var="agencyMode">
                                        <option value="${agencyMode.keyWorld}">${agencyMode.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                    </div>

                    <!-- 右边的填框 -->
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>维修厂:</label>
                            <div class="col-sm-9">
                                <select id="maintenance_factory" class="form-control maintenance_factory"
                                        name="maintenanceFactory" data-placeholder="维修厂...">
                                    <option value="">请选择维修厂</option>
                                    <c:forEach items="${repairFactory }" var="repairFactory">
                                        <option value="${repairFactory.keyWorld}">${repairFactory.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>销售区域:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="sale_area"
                                       name="saleArea" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>年销售量:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="sale_numbery_year"
                                       name="saleNumberYear" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>主销车型:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="main_sale_car_type"
                                       name="mainSaleCarType" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>区域排名:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="region_rank"
                                       name="regionRank" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>合作等级:</label>
                            <div class="col-sm-9">
                                <div obj="">
                                    <select id="dealerLevel" class="form-control dealerLevel"
                                            check="validDealerManage(this)" name="dealerLevel"
                                            data-placeholder="合作等级...">
                                        <option value="">请选择合作等级</option>
                                        <c:forEach items="${teamworkRank }" var="teamworkRank">
                                            <option value="${teamworkRank.keyWorld}">${teamworkRank.valueDesc}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>合作时间:</label>
                            <div class="col-sm-9">
                                <select id="teamworkTime" class="form-control teamworkTime" name="cooperationPeriod"
                                        data-placeholder="合作时间...">
                                    <option value="">请选择合作时间</option>
                                    <c:forEach items="${teamworkTime }" var="teamworkTime">
                                        <option value="${teamworkTime.keyWorld}">${teamworkTime.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>协议签署:</label>
                            <div class="col-sm-9">
                                <select id="protocolSign" class="form-control protocolSign" name="protocolSigned"
                                        data-placeholder="协议签署...">
                                    <option value="">请选择协议签署</option>
                                    <c:forEach items="${protocolSign }" var="protocolSign">
                                        <option value="${protocolSign.keyWorld}">${protocolSign.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>协议时间:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="protocolTime" id="protocolTime"
                                       value="">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>价格政策:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="price_policy"
                                       name="pricePolicy" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>主要信贷专员:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="main_credit_person"
                                       name="mainCreditPerson" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>职级:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="rank"
                                       name="rank" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>专职:</label>
                            <div class="col-sm-9">
                                <select id="full_time" class="form-control full_time" name="fullTime"
                                        data-placeholder="专职...">
                                    <option value="">请选择专职</option>
                                    <c:forEach items="${fulltime }" var="fulltime">
                                        <option value="${fulltime.keyWorld}">${fulltime.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>月均贷款量:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="monthLoanNumber"
                                       name="monthLoanNumber" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red"></span>经销商类别:</label>
                            <div class="col-sm-9">
                                <select id="dealer_type" class="form-control dealer_type" name="dealerType"
                                        data-placeholder="经销商类别...">
                                    <option value="">请选择经销商类别</option>
                                    <c:forEach items="${dealerType }" var="dealerType">
                                        <option value="${dealerType.keyWorld}">${dealerType.valueDesc}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>一年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="one_year_interest_rate" obj="float"
                                       name="oneYearInterestRate" value="" tip="一年期利率不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>两年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="two_year_interest_rate" obj="float"
                                       name="twoYearInterestRate" value="" tip="两年期利率不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>三年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="three_year_interest_rate" obj="float"
                                       name="threeYearInterestRate" value="" tip="三年期利率不能为空">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>四年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="four_year_interest_rate" obj="float"
                                       name="fourYearInterestRate" value="" tip="四年期利率不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>二手车一年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_one_year_interest_rate" obj="float"
                                       name="usedCarOneYearInterestRate" value="" tip="二手车一年期利率不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>二手车两年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_two_year_interest_rate" obj="float"
                                       name="usedCarTwoYearInterestRate" value="" tip="二手车两年期利率不能为空">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>二手车三年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_three_year_interest_rate"
                                       obj="float"
                                       name="usedCarThreeYearInterestRate" value="" tip="二手车三年期利率不能为空">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span class="red">*</span>二手车四年期利率(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="used_Car_four_year_interest_rate"
                                       obj="float"
                                       name="usedCarFourYearInterestRate" tip="二手车四年期利率不能为空">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">新车保证金比例(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="newCarMarginRate" name="newCarMarginRate">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">二手车保证金比例(%):</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="oldCarMarginRate" name="oldCarMarginRate">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <input type="button" class="btn btn-primary submit-button" value="提交"/> &nbsp;
                <input type="reset" value="重置" class="btn btn-default"/>
            </div>
        </form>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript"
        src="<%=request.getContextPath() %>/js/mine/carFinance/other/dealerManage/addUpdate.js?v=20180530102223"></script>
</html>