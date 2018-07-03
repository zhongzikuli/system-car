<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm">
        <div class="row">
            <div class="col-sm-6">
                <c:forEach items="${orderList}" var="order">
                    <a data-toggle="modal" class="btn btn-default btn-sm changeOrder" data-bankCardNo="${order.bankCardNo}" data-bankId="${order.bankId}" data-id="${order.id}">订单(${order.orderNo})</a>
                </c:forEach>
            </div>
            <input type="hidden" name="type" id="type" value="${type}"/>
            <div class="col-sm-6 text-right">
                <div class="form-group">
                    <input type="hidden" id="bankCardNo" value="${bankCardNo}">
                    <input type="hidden" id="bankId" value="${bankId}">
                    <input type="hidden" id="urgeWorkcardNo" value="${cardNo}">
                    <input type="hidden" id="name" value="${customerName}">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="mod_basic height-auto ibox-content car-finance padding-min animated">
    <div class="item-row" id="tab-secondCar">
        <form class="form-horizontal">
            <fieldset>
                <legend>逾期情况</legend>
                <div id="" class="form-horizontal">
                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">银行逾期额(元):</label>
                        <div class="col-md-2">
                            <input id="overdueMoney" name="overdueMoney" readonly class="form-control" type="text">
                        </div>
                        <label class="col-md-1 control-label">银行逾期天数:</label>
                        <div class="col-md-2">
                            <input id="overdueDays" name="overdueDays" readonly class="form-control" type="text">
                        </div>
                        <label class="col-md-1 control-label">代偿金额(元):</label>
                        <div class="col-md-2">
                            <input id="advancedMoney" name="advancedMoney" readonly class="form-control" type="text">
                        </div>
                        <label class="col-md-1 control-label">应还金额(元):</label>
                        <div class="col-md-2">
                            <input id="shouldReplayMoney" name="shouldReplayMoney" readonly class="form-control" type="text">
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>基本信息</legend>
                <div id="urge-work-user-information-wrap" class="form-horizontal">
                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">购车人姓名:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="realName"></div>
                        <label class="col-md-1 control-label">性别:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="sex">
                        </div>
                        <label class="col-md-1 control-label">身份证号:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="cardNo"></div>
                        <label class="col-md-1 control-label">手机:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="tel"></div>
                    </div>

                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">单位电话:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="companyTel"></div>
                        <label class="col-md-1 control-label">现住电话:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="phone">
                        </div>
                        <label class="col-md-1 control-label">车型:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="carBrandName"></div>
                        <label class="col-md-1 control-label">车牌号:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="plateNumber"></div>
                    </div>

                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">家庭地址:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="familyAddress"></div>
                        <label class="col-md-1 control-label">单位名称:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="companyName">
                        </div>
                        <label class="col-md-1 control-label">单位地址:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="companyAddress"></div>
                        <label class="col-md-1 control-label">车型构成:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="newOrOld"></div>
                    </div>

                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">发动机号:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="engineNo"></div>
                        <label class="col-md-1 control-label">贷款期限(月):</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="loanPeriodMonthCode">
                        </div>
                        <label class="col-md-1 control-label">月还款额(元):</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="repayAmountMonth"></div>
                        <label class="col-md-1 control-label">银行费率(%):</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="bankRate"></div>
                    </div>

                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">贷款金额(元):</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="actualLoadMoney"></div>
                        <label class="col-md-1 control-label">首期还款日:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="firstRepaymentDate">
                        </div>
                        <label class="col-md-1 control-label">结清:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="closeTypeCode"></div>
                        <label class="col-md-1 control-label">银行放款日期:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="bankPaymentDate"></div>
                    </div>

                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">部门:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="departmentName">
                        </div>
                        <label class="col-md-1 control-label">银行:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="bankName"></div>
                        <label class="col-md-1 control-label">还款账号:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="repaymentBankCard">
                        </div>
                        <label class="col-md-1 control-label">注册抵押:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="mortgageProcessDate">
                        </div>
                    </div>

                    <div class="contact"></div>
                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">备注:</label>
                        <div class="col-md-8">
                            <textarea readonly class="form-control" id="remark"></textarea></div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>配偶信息</legend>
                <div class="form-horizontal">
                    <div class="m-rl-tb row">
                        <label class="col-md-1 control-label">配偶姓名:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="shareName"></div>
                        <label class="col-md-1 control-label">性别:</label>
                        <div class="col-md-2">
                            <input readonly value="" class="form-control" type="text" id="sex3">
                        </div>
                        <label class="col-md-1 control-label">手机:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="tel3"></div>
                        <label class="col-md-1 control-label">单位电话:</label>
                        <div class="col-md-2">
                            <input readonly class="form-control" type="text" id="phone3"></div>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>担保人信息</legend>
                <div class="sponer"></div>
            </fieldset>
            <fieldset>
                <legend>催缴作业</legend>
                <div class="form-horizontal">
                    <shiro:hasPermission name="urgeWork:insertUrgeWork">
                        <a data-toggle="modal" class="btn btn-primary btn-sm addInfo" style="margin-left:10px">新增</a>
                    </shiro:hasPermission>
                    <a data-toggle="modal" class="btn btn-success btn-sm exportInfo">导出</a>
                    <shiro:hasPermission name="urgeWork:delete">
                        <a data-toggle="modal" class="btn btn-danger btn-sm deleteInfo">删除</a>
                    </shiro:hasPermission>
<%--
                    <input type="hidden"  id="creater" >
--%>
                    <div class="mod_basic m-b" style="border-bottom:none">
                        <table class="table table-hover table-striped no-margin">
                            <thead>
                            <tr>
                                <th style="width:2%;"><input type="checkbox" class="checkAll"></th>
                                <th style="width:2%;">序号</th>
                                <th style="width:3%;">客户姓名</th>
                                <th style="width:3%;">催缴状态</th>
                                <th style="width:6%;">催缴时间</th>
                                <th style="width:4%;">催缴方式</th>
                                <th style="width:4%;">电催异常</th>
                                <th style="width:25%;">催缴内容</th>
                                <th style="width:4%;">操作人</th>
                                <th style="width:5%;">操作</th>
                            </tr>
                            </thead>
                            <tbody id="res-tbody"></tbody>
                        </table>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/assetProtection/addUrgeWork.js"></script>
<script type="text/template" title="新增" id="addUrgeWork-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="addUrgeWorkForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴时间:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="urgeDate" check="addUrgeWorkFormValid(this)"
                               id="urgeDate"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴方式:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select data-placeholder="催缴方式..." id="urgeMethod" check="addUrgeWorkFormValid(this)"
                                    name="urgeMethod" class="form-control urgeMethod">
                                <option value="">请选择</option>
                                <option value="0">其他</option>
                                <option value="1">电话</option>
                                <option value="2">短信</option>
                                <option value="3">上门</option>
                                <option value="4">微信</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴状态:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select data-placeholder="来源..." id="urgeStatus" check="addUrgeWorkFormValid(this)"
                                    name="urgeStatus" class="form-control urgeStatus">
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
                    <div class="col-xs-8">
                        <div obj="">
                            <select data-placeholder="账户性质..." id="isTelException" check="addUrgeWorkFormValid(this)"
                                    name="isTelException" class="form-control isTelException">
                                <option value="">请选择</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴内容:</label>
                    <div class="col-xs-8" obj="">
                   <textarea id="urgeContent" class="form-control" check="addUrgeWorkFormValid(this)"
                             name="urgeContent"></textarea>
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
<script type="text/template" title="编辑" id="addUrgeWork_edit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="addUrgeWorkEditForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴时间:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="urgeDateEdit" check="addUrgeWorkFormValid(this)"
                               id="urgeDateEdit"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴方式:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select data-placeholder="催缴方式..." id="urgeMethodEdit" check="addUrgeWorkFormValid(this)"
                                    name="urgeMethodEdit" class="form-control urgeMethodEdit">
                                <option value="">请选择</option>
                                <option value="0">其他</option>
                                <option value="1">电话</option>
                                <option value="2">短信</option>
                                <option value="3">上门</option>
                                <option value="4">微信</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴状态:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select data-placeholder="催缴状态..." id="urgeStatusEdit" check="addUrgeWorkFormValid(this)"
                                    class="form-control urgeStatusEdit">
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
                    <div class="col-xs-8">
                        <div obj="">
                            <select data-placeholder="拖车..." id="isTelExceptionEdit" check="addUrgeWorkFormValid(this)"
                                    class="form-control isTelExceptionEdit">
                                <option value="">请选择</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>催缴内容:</label>
                    <div class="col-xs-8" obj="">
                   <textarea id="urgeContentEdit" class="form-control" check="addUrgeWorkFormValid(this)"
                             name="urgeContentEdit"></textarea>
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
</html>
