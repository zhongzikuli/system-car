<%@ taglib prefix="slt" uri="/slt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>初审单录入</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
</head>
<body>
<div class="mod_header">
    <div class="row">
        <div class="col-sm-4">
            <div class="form-group">
                <h5><strong>初审单录入</strong><i class="fa nav_icon nav_sign"></i></h5>                       
            </div>
        </div>
        <div class="col-sm-8">
            <c:if test="${orderAccept.orderStatus == 0 || orderAccept.orderStatus == 1|| orderAccept.orderStatus == -1 || orderAccept.orderStatus == -2}">
                <shiro:hasPermission name="sponsor:change">
                    <c:if test="${hasSponsor eq 'true'}"><a class="btn btn-danger btn-sm"
                                                            onclick="changeBuyerAndSponsor(${orderAccept.id})">互换购车人与担保人</a></c:if>
                </shiro:hasPermission>
                <shiro:hasPermission name="sponsor:change">
                    <c:if test="${hasSponsor eq 'true' && hasShared eq 'true'}"><a class="btn btn-danger btn-sm"
                                                                                   onclick="changeSharedAndSponsor(${orderAccept.id})">互换配偶与担保人</a></c:if>
                </shiro:hasPermission>
                <shiro:hasPermission name="shared:save">
                    <a class="btn btn-primary btn-sm" onclick="toBuyer('${orderAccept.id}','SHARED')">补录配偶</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="sponsor:save">
                    <a class="btn btn-primary btn-sm btn-sponsor"
                       onclick="toBuyer('${orderAccept.id}','SPONSOR')">补录担保人</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="shared:change">
                    <c:if test="${hasShared eq 'true'}"><a class="btn btn-danger btn-sm"
                                                           onclick="changeBuyer(${orderAccept.id})">互换配偶</a></c:if>
                </shiro:hasPermission>
                <shiro:hasPermission name="uploadInterview:save">
                    <a class="btn btn-info btn-sm"
                       onclick="uploadInterview(${orderAccept.id},'${ctx}/cfBusinessOrderAccept.action')">上传面签资料</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="uploadOther:save">
                    <a class="btn btn-info btn-sm"
                       onclick="uploadOther(${orderAccept.id},'${ctx}/cfBusinessOrderAccept.action')">上传其它资料</a>
                </shiro:hasPermission>
                <c:if test="${orderAccept.orderStatus != 0 && orderAccept.orderStatus != -1}">
                    <shiro:hasPermission name="order:submit">
                        <a class="btn btn-warning btn-sm btn-submit">提交初审</a>
                    </shiro:hasPermission>
                </c:if>
                <shiro:hasPermission name="order:save">
                    <a class="btn btn-success btn-sm btn-save">保存</a>
                </shiro:hasPermission>
            </c:if>
            <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
                <a class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
            </c:if>
        </div>
    </div>
    <div class="tip-box">
		<span class="red">浙江绍兴瑞丰农村商业银行股份有限公司</span>录入实时面签 输入必填项:<br>
		贷款银行、业务类型、贷款期限、车型、贷款人姓名<br>
		贷款人身份证号、贷款人手机号、贷款人性别、现住地址<br>
	</div>
</div>
<div class="mod_basic ibox-content car-finance padding-min animated apply-wrapper">
	<div style=" text-align: center;width: 100%;top: 58px;font-size:12px;">
    		<span class="red">中国工商银行股份有限公司杭州朝晖支行</span>录入实时面签 输入必填项:
					贷款银行、审核车价、分期金额、组织单位名称、业务类型、
					贷款期限、车型、贷款人姓名、贷款人身份证号、
					贷款人手机号、贷款人性别、现住地址。<span class="red">以上信息录入完成后，请保存或提交，即可实时面签</span>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>附件信息</legend>
            <shiro:hasPermission name="orderFile:download">
                <div class="clear mod_basic no-bottom b-0">
                    <div class="form-group"><a class="btn btn-primary btn-sm"
                                               onclick="fileManage(${orderAccept.id},'${ctx}/cfBusinessOrderAccept.action')">查看订单附件</a>
                    </div>
                </div>
            </shiro:hasPermission>
        </fieldset>
    </div>
    <%-- end 附件信息 row --%>
    <div class="item-row">
        <fieldset>
            <legend>审核信息</legend>
            <div id="audit-history-list" class="mod_basic no-bottom"></div>
        </fieldset>
    </div>
    <%-- end 审核信息 row --%>

    <div class="item-row">
        <fieldset>
            <legend>征信信息</legend>
            <div id="buyerInfo" class="no-bottom"></div>
        </fieldset>
    </div>

    <div class="item-row">
        <fieldset>
            <legend>大数据征信</legend>
            <div class="clear mod_basic no-bottom b-0">
                <div class="row mr-none">
                    <c:if test="${orderAccept.creditQueryTongdun != 1}">
                        <button class="btn btn-primary btn-xs query-credit-btn" type="button">征信查询</button>
                    </c:if>
                    <button class="btn btn-info btn-xs detail-credit-btn" type="button">详情查看</button>
                </div>
            </div>
            <div id="audit-big-data-list" class="clear mod_basic no-bottom"></div>
        </fieldset>
    </div>
    <%-- end 大数据征信 row --%>

    <div class="item-row">
        <fieldset>
            <legend>基本信息</legend>
            <div id="acceptInfo">
                <form>
                    <div class="form-horizontal">
                        <div class="m-rl-tb m-t-xs row">
                            <input type="hidden" name="acceptId" value="${orderAccept.id}"/>
                            <input type="hidden" id="bankId" value="${orderAccept.bankId}"/>
                            <label class="col-md-1 control-label">订单编号:</label>
                            <div class="col-md-2"><input readonly="readonly" value="${orderAccept.orderNo}"
                                                         name="orderNo"
                                                         class="form-control" type="text"></div>
                            <label class="col-md-1 control-label">信贷专员:</label>
                            <div class="col-md-2"><input readonly="readonly" value="${orderAccept.creditPerson}"
                                                         name="creditPerson" class="form-control" type="text"></div>
                            <label class="col-md-1 control-label">部门:</label>
                            <div class="col-md-2"><input readonly="readonly" value="${orderAccept.departName}"
                                                         name="departName" class="form-control" type="text"></div>
                            <label class="col-md-1 control-label">经销商:</label>
                            <div class="col-md-2">
                                <select name="carDealerId" id="carDealer" check="validSelect(this)">
                                    <option value="">请选择经销商:</option>
                                    <c:forEach items="${carDealer}" var="carDealer">
                                        <c:choose>
                                            <c:when test="${carDealer.id == orderAccept.carDealerId}">
                                                <option value="${carDealer.id}"
                                                        selected>${carDealer.dealerName}</option>
                                            </c:when>
                                            <c:otherwise>
                                                <option value="${carDealer.id}">${carDealer.dealerName}</option>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </fieldset>
    </div>
    <%--购车人信息--%>
    <div class="item-row" id="buyerForm">
        <fieldset>
            <legend>购车人信息</legend>
            <form class="buyerForm">
                <div id="buyerDiv" class="buyerDiv"></div>
            </form>

        </fieldset>
    </div>
    <%--配偶信息--%>
    <div class="item-row" id="sharedForm">
        <div id="sharedDiv" class="buyerDiv">
        </div>
    </div>

    <%--担保人信息--%>
    <div class="item-row">
        <div id="sponsorDiv" class="buyerDiv"></div>
    </div>

    <%--车辆信息--%>
    <div class="item-row" id="carinfoForm">
        <fieldset>
            <legend>车辆信息</legend>
            <form class="carinfoForm">
            	<input type="hidden" id ="carNoId" value=""/>
                <div id="carInfoDiv"></div>
            </form>
        </fieldset>
    </div>


    <%--垫款申请--%>
    <div class="item-row" id="advanceForm">
        <fieldset>
            <legend>垫款申请</legend>
            <form class="advanceForm" style="padding-bottom: 20px;">
                <div id="advanceDiv"></div>
            </form>
        </fieldset>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<slt:dictData type="290000,420000,430000,440000,450000,460000,470000,480000,500000,490000,510000,520000,530000"/>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/third/radialIndicator/radialIndicator.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/pay.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/buyer.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/shared.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/sponsor.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/car.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/map.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.form.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.risk.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.credit.query.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/orderApply.js?version=20184233233"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/orderOther.js"></script>
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
                    <label class="col-sm-2 control-label">审核日期:</label>
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

<script type="text/template" title="互换" id="form-chang-dialog">
    <div class="ibox-content">
        <form id="changForm" class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>担保人:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的担保人">
                                <select id="buyerId" name="buyerId" class="form-control chosen-select"
                                        check="validForm(this)">
                                    <option value="">请选择</option>
                                    <c:forEach items="${sponsor}" var="buyer">
                                        <option value="${buyer.id}">${buyer.realName}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
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
</html>