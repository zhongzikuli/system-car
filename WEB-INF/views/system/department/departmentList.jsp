<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>部门管理</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css"/>
</head>
<body>
<div class="mod_basic height-auto">
    <div class="col-sm-2 no-padding border-r-3 min-h-290">
        <div class="sub_content clearfix" style="margin-left:15px;overflow-y:auto;">
            <ul id="organ-manage-tree" class="ztree"></ul>
        </div>
    </div>
    <input type="hidden" id="orgType" value="${orgType}"/>
    <div class="col-sm-10 no-padding animated fadeInRight department-right">
        <div class="process-list none">
            <a class="btn btn-primary btn-sm add-btn m-r-xs">新增</a>
            <a class="btn btn-danger btn-sm delete-btn m-r-xs">删除</a>
            <a class="btn btn-success btn-sm refresh-btn">刷新</a>
        </div>
        <div class="ibox-content full-height no-padding none">
            <div class="table-responsive full-height border-t-1 hidden-x min-h-250">
                <table class="table table-hover table-striped table-more">
                    <thead>
                    <tr>
                        <th style="width:2%;"><input type="checkbox" class="checkAll"/></th>
                        <th style="width: 5%">年份</th>
                        <th style="width: 8%">年计划额(万元)</th>
                        <th style="width: 5%">1月(万元)</th>
                        <th style="width: 5%">2月(万元)</th>
                        <th style="width: 5%">3月(万元)</th>
                        <th style="width: 5%">4月(万元)</th>
                        <th style="width: 5%">5月(万元)</th>
                        <th style="width: 5%">6月(万元)</th>
                        <th style="width: 5%">7月(万元)</th>
                        <th style="width: 5%">8月(万元)</th>
                        <th style="width: 5%">9月(万元)</th>
                        <th style="width: 5%">10月(万元)</th>
                        <th style="width: 5%">11月(万元)</th>
                        <th style="width: 5%">12月(万元)</th>
                        <th style="width: 10%">更新时间</th>
                        <th style="width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class='no-border'>
                        <td class='col-td' colspan='17'>暂无数据</td>
                    </tr>
                    </tbody>
                </table>
                <div id="pagination" class="pagination pagination-right" style="right:-8px;"></div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>

<div id="data_dic_rMenu">
    <ul>
        <shiro:hasPermission name="department:create">
            <li id="data_dic_add" onclick="insertDepartment();">添加</li>
        </shiro:hasPermission>
        <shiro:hasPermission name="department:update">
            <li id="data_dic_update" onclick="updateDepartment();">修改</li>
        </shiro:hasPermission>
        <shiro:hasPermission name="department:delete">
            <li id="data_dic_delete" onclick="deleteDepartment();">删除</li>
        </shiro:hasPermission>
    </ul>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/template" title="新增" id="department-add">
    <div class="ibox-content">
        <form id="department-add-form" class="form-horizontal" autocomplete="off">
            <div class="form-content">
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label"><span class="red">*</span>部门名称:</label>
                        <div class="col-xs-8">
                            <input id="department-add-name" tip="部门名称不能为空" obj="not_null"
                                   type="text" name="departmentName" autocomplete="off"
                                   class="valid-item valid-input required form-control" check="validForm(this)"
                                   url="${ctx}/department/checkDepartment.action"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label"><span class="red">*</span>部门状态:</label>
                        <div class="col-xs-8">
                            <select name="forbidden" class="form-control chosen-select">
                                <option value="0">启用</option>
                                <option value="1">禁用</option>
                            </select>
                        </div>
                    </div>
                </div>
                <c:if test="${orgType !=2}">
                    <div class="form-group">
                        <div class="col-sm-6">
                            <label class="col-xs-3 control-label">部门类型:</label>
                            <div class="col-xs-8">
                                <select name="departmentType" class="form-control chosen-select">
                                    <option value="0">请选择部门类型</option>
                                    <option value="1">渠道</option>
                                    <option value="2">直营</option>
                                    <option value="3">业务</option>
                                    <option value="4">管理</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="col-xs-3 control-label">成立日期:</label>
                            <div class="col-xs-8">
                                <input type="text" id="establishDate" name="establishDate" class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">

                            <div class="form-group" style="margin-bottom: 0">
                                <label class="pull-left control-label" style="width: 66px;margin-left: 26px;margin-right: 4px;">部门地址:</label>
                                <div class="col-xs-10">
                                    <div class="col-xs-5" style="padding: 0">
                                        <input type="text" name="province" obj="not_null" id="create-department-province"
                                               tip="请选择部门地址" class="form-control"/>
                                    </div>
                                    <div class="col-xs-7" style="padding: 0;width: 330px">
                                        <input type="text" name="address" id="create-department-address" class="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <label class="col-xs-3 control-label">大区:</label>
                            <div class="col-xs-8">
                                <div obj="" tip="请输入正确的区域">
                                    <select data-placeholder="区域选择..." id="department-area-code"
                                            class="chosen-select form-control" name="areaCode">
                                        <option value="">请选择</option>
                                        <c:forEach var="area" items="${areaData}" varStatus="st">
                                            <c:if test="${area.parentId != 0}">
                                                <option value="${area.keyWorld}">${area.valueDesc}</option>
                                            </c:if>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:if>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">联系人:</label>
                        <div class="col-xs-8">
                            <input id="contact_person" type="text" name="contactPerson" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">联系电话:</label>
                        <div class="col-xs-8">
                            <input id="contact_tel" type="text" name="contactTel" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">开户银行:</label>
                        <div class="col-xs-8">
                            <input id="bank_name" tip="开户银行不能为空" obj="not_null"
                                   type="text" name="bankName" autocomplete="off"
                                   class="valid-item valid-input required form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">银行账号:</label>
                        <div class="col-xs-8">
                            <input id="bank_account" tip="银行账号不能为空" obj="not_null"
                                   type="text" name="bankAccount" autocomplete="off"
                                   class="valid-item valid-input required form-control"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">收款单位:</label>
                        <div class="col-xs-8">
                            <input id="bank_account_name" tip="收款单位不能为空" obj="not_null"
                                   type="text" name="bankAccountName" autocomplete="off"
                                   class="valid-item valid-input required form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">排序:</label>
                        <div class="col-xs-8">
                            <input id="department-add-sortNo" tip="序号必须为正整数" obj="int" autocomplete="off"
                                   type="text" class="valid-item valid-input required form-control"
                                   check="validForm(this)"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" class="btn dialog-ok btn-primary">确定</a>
                <a href="javascript:void(0);" class="btn dialog-close btn-default">取消</a>
            </div>
        </form>
    </div>
</script>

<script type="text/template" title="修改" id="department-update">
    <div class="ibox-content">
        <form id="department-update-form" class="form-horizontal" autocomplete="off">
            <div class="form-content">
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">上级部门:</label>
                        <div class="col-xs-8">
                            <input id="parent-department" type="text" name="parentId" class="form-control" readonly
                                   onclick="showDepartmentMenu(240)"/>
                            <div id="menuContent" class="menuContent"
                                 style="box-shadow:0px 0px 10px rgba(0, 0, 0, 0.2);display: none; border:1px solid #3c9adc; border-radius: 2px;position: absolute;width: 229px;padding: 10px;height:300px;">
                                <ul id="departmentTree" class="ztree"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">部门名称:</label>
                        <div class="col-xs-8">
                            <input id="department-update-name" tip="部门名称不能为空" obj="not_null"
                                   type="text" name="departmentName" class="valid-item valid-input form-control"
                                   check="validForm(this)"
                                   url="${ctx}/department/checkDepartment.action" param=""/>
                        </div>
                    </div>
                </div>
                <c:if test="${orgType !=2}">
                    <div class="form-group">
                        <div class="col-sm-6">
                            <label class="col-xs-3 control-label">部门类型:</label>
                            <div class="col-xs-8">
                                <select name="departmentType" class="form-control chosen-select">
                                    <option value="0">请选择部门类型</option>
                                    <option value="1">渠道</option>
                                    <option value="2">直营</option>
                                    <option value="3">业务</option>
                                    <option value="4">管理</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="col-xs-3 control-label">成立日期:</label>
                            <div class="col-xs-8">
                                <input type="text" id="establishDate" name="establishDate" class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="form-group" style="margin-bottom: 0">
                                <label class="pull-left control-label" style="width: 66px;margin-left: 26px;margin-right: 4px;">部门地址:</label>
                                <div class="col-xs-10">
                                    <div class="col-xs-5" style="padding: 0">
                                        <input type="text" name="province" obj="not_null" id="department-update-province"
                                               tip="请选择部门地址" class="form-control"/>
                                    </div>
                                    <div class="col-xs-7" style="padding: 0;width: 330px">
                                        <input type="text" name="address" id="department-update-address" class="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <label class="col-xs-3 control-label">大区:</label>
                            <div class="col-xs-8">
                                <div obj="" tip="请输入正确的区域">
                                    <select data-placeholder="区域选择..." id="department-update-area-code"
                                            class="chosen-select form-control" name="areaCode">
                                        <option value="">请选择</option>
                                        <c:forEach var="area" items="${areaData}" varStatus="st">
                                            <c:if test="${area.parentId != 0}">
                                                <option value="${area.keyWorld}">${area.valueDesc}</option>
                                            </c:if>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:if>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">联系人:</label>
                        <div class="col-xs-8">
                            <input id="contact_person" type="text" name="contactPerson" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">联系电话:</label>
                        <div class="col-xs-8">
                            <input id="contact_tel" type="text" name="contactTel" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">开户银行:</label>
                        <div class="col-xs-8">
                            <input id="bank_name" tip="开户银行不能为空" obj="not_null"
                                   type="text" name="bankName" autocomplete="off"
                                   class="valid-item valid-input required form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">银行账号:</label>
                        <div class="col-xs-8">
                            <input id="bank_account" tip="银行账号不能为空" obj="not_null"
                                   type="text" name="bankAccount" autocomplete="off"
                                   class="valid-item valid-input required form-control"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">收款单位:</label>
                        <div class="col-xs-8">
                            <input id="bank_account_name" tip="收款单位不能为空" obj="not_null"
                                   type="text" name="bankAccountName" autocomplete="off"
                                   class="valid-item valid-input required form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">部门状态:</label>
                        <div class="col-xs-8">
                            <select name="forbidden" class="form-control chosen-select">
                                <option value="0">启用</option>
                                <option value="1">禁用</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">排序:</label>
                        <div class="col-xs-8">
                            <input id="department-update-sortNo" tip="序号必须为正整数" obj="int"
                                   type="text" class="valid-item valid-input required form-control"
                                   check="validForm(this)"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn dialog-ok btn-primary">确定</a>
                <a href="javascript:void(0);" type="button" class="btn dialog-close btn-default">取消</a>
            </div>
        </form>
    </div>
</script>

<%--部门计划新增--%>
<script type="text/template" title="部门计划新增" id="department-plan-add">
    <div class="ibox-content">
        <form id="department-plan-add-form" class="form-horizontal" autocomplete="off">
            <input type="hidden" name="departmentId"/>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年份:</label>
                    <div class="col-xs-8 text-left m-l-4">
                        <input type="text" id="year" name="year" class="form-control" obj="not_null"/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年计划额:</label>
                    <div class="col-xs-8">
                        <input type="number" name="yearMoney" class="form-control" obj="float" maxlength="9"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">1月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">2月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">3月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">4月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">5月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">6月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">7月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">8月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">9月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">10月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">11月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">12月计划额:</label>
                    <div class="col-xs-8">
                        <input name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" class="btn dialog-ok btn-primary">确定</a>
                <a href="javascript:void(0);" class="btn dialog-close btn-default">取消</a>
            </div>
        </form>
    </div>
</script>

<%--部门计划编辑--%>
<script type="text/template" title="部门计划编辑" id="department-plan-edit">
    <div class="ibox-content">
        <form id="department-plan-edit-form" class="form-horizontal" autocomplete="off">
            <input type="hidden" id="departmentId" name="departmentId"/>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年份:</label>
                    <div class="col-xs-8 text-left m-l-4">
                        <input type="text" id="year" name="year" class="form-control" obj="not_null" readonly/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年计划额:</label>
                    <div class="col-xs-8">
                        <input type="number" id="yearMoney" name="yearMoney" class="form-control" obj="float"
                               maxlength="9"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">1月计划额:</label>
                    <div class="col-xs-8">
                        <input id="oneMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">2月计划额:</label>
                    <div class="col-xs-8">
                        <input id="twoMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">3月计划额:</label>
                    <div class="col-xs-8">
                        <input id="threeMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">4月计划额:</label>
                    <div class="col-xs-8">
                        <input id="fourMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">5月计划额:</label>
                    <div class="col-xs-8">
                        <input id="fiveMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">6月计划额:</label>
                    <div class="col-xs-8">
                        <input id="sixMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">7月计划额:</label>
                    <div class="col-xs-8">
                        <input id="sevenMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">8月计划额:</label>
                    <div class="col-xs-8">
                        <input id="eightMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">9月计划额:</label>
                    <div class="col-xs-8">
                        <input id="nineMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">10月计划额:</label>
                    <div class="col-xs-8">
                        <input id="tenMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">11月计划额:</label>
                    <div class="col-xs-8">
                        <input id="elevenMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">12月计划额:</label>
                    <div class="col-xs-8">
                        <input id="twelveMonthMoney" name="money" class="form-control" type="number"/>(万元)
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" class="btn dialog-ok btn-primary">确定</a>
                <a href="javascript:void(0);" class="btn dialog-close btn-default">取消</a>
            </div>
        </form>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/department/departmentTree.js?v=201806260330121"></script>
</html>




