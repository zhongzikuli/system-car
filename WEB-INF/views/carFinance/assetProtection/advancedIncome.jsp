<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-6">
                <shiro:hasPermission name="urgeWork:insert">
                    <a data-toggle="modal" class="btn btn-primary btn-sm request-update-btn insertInfo">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="urgeWork:insertUrgeWork">
                    <a data-toggle="modal" class="btn btn-danger btn-sm discard-btn deleteInfo">删除</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-6 text-right">
                <div class="form-inline">
                    <input type="hidden" id="bankCardNo" value="${bankCardNo}">
                    <input type="hidden" id="cardNo" value="${cardNo}">
                    <input type="hidden" id="bankId" value="${bankId}">
                    <input type="hidden" id="name" value="${customerName}">
                    <a class="btn btn-sm btn-info" onclick="history.back(-1);">返回列表</a>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
        <div class="table-responsive full-height">
            <table class="table table-hover table-height table-striped">
                <thead>
                <tr>
                    <th style="width:2%;"><input type="checkbox" class="checkAll"></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">交易日期</th>
                    <th style="width:4%;">收/支</th>
                    <th style="width:8%;">来源</th>
                    <th style="width:8%;">车型构成</th>
                    <th style="width:8%;">车牌号</th>
                    <th style="width:8%;">代偿金额</th>
                    <th style="width:8%;">部门类型</th>
                    <th style="width:8%;">代偿保证金</th>
                    <th style="max-width:150px;">备注</th>
                    <th style="width:3%;">负责人</th>
                    <th style="width:6%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="13">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="checkbox" class="checkOne" name="advanced_input" value="${item.id}"></td>
                        <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td>
                            <fmt:formatDate value="${item.advancedDate}" pattern="yyyy-MM-dd "/>
                        </td>
                        </td>
                        <td>
                            <c:if test="${item.inOrOut == 1}">收</c:if>
                            <c:if test="${item.inOrOut == 2}">支</c:if>
                        </td>
                        <td>
                            <c:if test="${item.source == 1}">渠道</c:if>
                            <c:if test="${item.source == 2}">客户</c:if>
                            <c:if test="${item.source == 3}">公司</c:if>
                            <c:if test="${item.source == 4}">一般账户</c:if>
                            <c:if test="${item.source == 5}">保证金账户</c:if>
                        </td>
                        <td>
                            <c:if test="${item.newOld == 1}">新车</c:if>
                            <c:if test="${item.newOld == 0}">二手车</c:if>
                        </td>
                        <td>${item.plateNumber}</td>
                        <td>
                            <sl:format type="number" show="${item.money}" pattern="#,##0.00"/>
                        </td>
                        <td>
                            <c:if test="${item.departmentType == 2}">直营</c:if>
                            <c:if test="${item.departmentType == 1}">渠道</c:if>
                        </td>
                        <td>
                            <sl:format type="number" show="${item.bondMoney}" pattern="#,##0.00"/>
                        </td>
                        <td title="${item.advancedBak}">${item.advancedBak}</td>
                        <td>${item.realname}</td>
                        <td class="btn-cel" >
                            <shiro:hasPermission name="urgeWork:update">
                                <a href="#" class="btn btn-primary btn-xs editInfo"data-orderId="${item.businessOrderAcceptId}" data-id="${item.id}">
                                    <i class="fa fa-edit"></i>编辑</a>
                            </shiro:hasPermission>
                            <input type="hidden" id="advancedIncomeId" value="${item.id}">
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp"%>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/assetProtection/advancedIncome.js"></script>
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
                    <div class="col-xs-2 text-right">
                        <a type="button" data-toggle="modal" class="btn btn-primary btn-sm detail">查看</a>
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
                    <label class="col-xs-3 control-label">收/支:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select id="inOrOut" check="advancedIncomeForm(this)" class="form-control inOrOut">
                                <option value="">请选择</option>
                                <option value="1">收</option>
                                <option value="2">支</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">来源:</label>
                    <div class="col-xs-8">
                        <div id="source">
                            <input type="text" obj="not_null" class="form-control" name="source-0" id="source-0"/>
                            <%--<select id="source-1" check="advancedIncomeForm(this)" class="form-control source-1" style="display: none;">--%>
                                <%--<option value=''>请选择</option>--%>
                                <%--<option value='1'>渠道</option>--%>
                                <%--<option value='2'>客户</option>--%>
                                <%--<option value='3'>公司</option>--%>
                            <%--</select>--%>
                            <%--<select id="source-2" check="advancedIncomeForm(this)" class="form-control source-2"  style="display: none;">--%>
                                <%--<option value=''>请选择</option>--%>
                                <%--<option value='1'>一般账户</option>--%>
                                <%--<option value='2'>保证金账户</option>--%>
                            <%--</select>--%>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>账户性质:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select id="accountType" check="advancedIncomeForm(this)" class="form-control accountType">
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
                        <input type="text" class="form-control" name="money" check="advancedIncomeForm(this)"
                               id="money"/>
                    </div>
                </div>
            </div>
            <div class="form-group" id="dutyInfo">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">责任比例(%):</label>
                    <div class="col-xs-6" obj="">
                        <input type="text" class="form-control" check="advancedIncomeForm(this)" id="duty"/>
                    </div>
                    <div class="col-xs-2">
                        <a type="button" data-toggle="modal" class="btn btn-primary btn-sm calculate">计算</a>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>代偿保证金:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="bondMoney" check="advancedIncomeForm(this)"
                               id="bondMoney"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>交易日期:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="advancedDate" check="advancedIncomeForm(this)"
                               id="advancedDate"/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-xs-8" obj="">
                        <textarea id="advancedBak" class="form-control" check="advancedIncomeForm(this)"
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
<script type="text/template" title="代偿收支记录" id="advancedIncomeEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <div id="initCarInfo_edit" style="margin-bottom: 10px;">
        </div>
        <input id="orderId_edit" type="hidden">
        <form id="advancedIncomeEditForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">车牌号:</label>
                    <div class="col-xs-6">
                        <input type="text" class="form-control" name="plateNumber" readonly id="plateNumber_edit"/>
                    </div>
                    <div class="col-xs-2 text-right">
                        <a type="button" data-toggle="modal" class="btn btn-primary btn-sm detail">查看</a>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">车型构成:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="newOld" readonly id="newOld_edit"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">收/支:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select id="inOrOut_edit" check="advancedIncomeForm(this)" class="form-control inOrOut_edit">
                                <option value="">请选择</option>
                                <option value="1">收</option>
                                <option value="2">支</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">来源:</label>
                    <div class="col-xs-8">
                        <div id="source1">
                            <input type="text" obj="not_null" class="form-control" name="source-0" id="source-1"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>账户性质:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select id="accountType_edit" check="advancedIncomeForm(this)" class="form-control accountType_edit">
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
                        <input type="text" class="form-control" name="money" check="advancedIncomeForm(this)"
                               id="money_edit"/>
                    </div>
                </div>
            </div>
            <div class="form-group" id="duty_editInfo">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">责任比例(%):</label>
                    <div class="col-xs-6" obj="">
                        <input type="text" class="form-control" check="advancedIncomeForm(this)" id="duty_edit"/>
                    </div>
                    <div class="col-xs-2">
                        <a type="button" data-toggle="modal" class="btn btn-primary btn-sm calculate_edit">计算</a>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>代偿保证金:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="bondMoney" check="advancedIncomeForm(this)"
                               id="bondMoney_edit"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>交易日期:</label>
                    <div class="col-xs-8" obj="">
                        <input type="text" class="form-control" name="advancedDate" check="advancedIncomeForm(this)"
                               id="advancedDate_edit"/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-xs-8" obj="">
                        <textarea id="remark_edit" class="form-control" check="advancedIncomeForm(this)"
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
</html>
