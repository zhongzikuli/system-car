<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>报表结构管理</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm">
        <div class="row">
            <div class="col-sm-3">
                <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增报表</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除报表</a>
            </div>
            <div class="col-sm-9">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" class="form-control">
                        <a class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</a>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
        <div class="col-sm-3 no-padding full-height  border-r-3 report-left">
            <div class="table-responsive" id="reportInfo">
                <table class="table table-hover table-height table-striped margin-b-0">
                    <thead>
                    <tr>
                        <th style="width:1%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:15%;">报表名称</th>
                        <th style="width:8%;">当前状态</th>
                        <th style="width:8%;">创建人</th>
                        <th style="width:10%;">创建时间<span class="m-l-6 fa fa-caret-left"></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-sm-9 no-padding animated fadeInRight report-right" id="reportField">
            <div class="bg-b">
                <div class="row">
                    <div class="col-sm-4">
                        </span><strong>报表基本结构</strong>
                    </div>
                    <div class="col-sm-8 text-right">
                        <a data-toggle="modal" class="btn btn-primary btn-sm save-btn">保存报表</a>
                        <a data-toggle="modal" class="btn btn-warning btn-sm submit-btn">确定发布</a>
                    </div>
                </div>
            </div>
            <div style="padding: 2px 10px;" id="reportNameForm">
                <div class="row">
                    <div class="col-sm-4">
                        <a data-toggle="modal" class="btn btn-primary btn-sm report-field-add-btn">添加行</a>
                        <a data-toggle="modal" class="btn btn-danger btn-sm report-field-delete-btn">删除行</a>
                        <a data-toggle="modal" class="btn btn-primary btn-sm report-info-role-btn">指定权限项</a>
                    </div>
                    <form>
                        <div class="col-sm-8">
                            <div class="form-inline">
                                <div class="form-group">
                                    <label class="control-label label">报表名称:</label>
                                    <input type="text" name="reportName" tip="请输入正确的报表名称" class="form-control"
                                           obj="not_null"/>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <div class="border-t-1">
                <div class="table-responsive" id="reportFieldList">
                    <table class="table table-hover table-height table-striped margin-b-0">
                        <thead>
                        <tr>
                            <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                            <th style="width:2%;">排序</th>
                            <th style="width:8%;">字段名</th>
                            <th style="width:3%;">是否显示</th>
                            <th style="width:6%;">条件类型</th>
                            <th style="width:6%;">选择项</th>
                            <th style="width:6%;">字段类型</th>
                            <th style="width:6%;">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="col-td" colspan="8">暂无数据</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/report/manager.js"></script>
<script type="text/template" title="新增" id="reportInfoForm-dialog">
    <div class="ibox-content">
        <form id="reportInfoForm" class="form-horizontal">
            <div class="row">
                 <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>报表名称:</label>
                        <div class="col-xs-8">
                            <input type="text" name="reportName" check="validForm(this)" class="form-control"/>
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
<%--报表字段编辑--%>
<script type="text/template" title="添加字段" id="reportFieldAddForm-dialog">
    <div class="ibox-content">
        <form id="reportFieldAddForm" class="form-horizontal">
            <input type="hidden" name="reportInfoId"/>
            <div class="row">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>字段名:</label>
                    <div class="col-xs-8">
                        <select name="reportFieldId" check="validForm(this)" class="form-control chosen-select">
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                    <div class="col-xs-8">
                        <input type="text" name="orderNo" value="20" check="validForm(this)" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>是否显示:</label>
                    <div class="col-xs-8">
                        <select name="pageShow" class="form-control chosen-select">
                            <option value="1" selected>显示</option>
                            <option value="0">不显示</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>是否选择项:</label>
                    <div class="col-xs-8">
                        <select name="searchCondition" class="form-control chosen-select">
                            <option value="0" selected>否</option>
                            <option value="1">是</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">条件类型:</label>
                    <div class="col-xs-8">
                        <select name="searchConditionKeyword" class="form-control chosen-select">
                            <option value="CLOSE">关闭</option>
                            <option value="CONTAIN">包含</option>
                            <option value="NOT_CONTAIN">不包含</option>
                            <option value="GREAT">大于</option>
                            <option value="GREAT_EQUAL">大于等于</option>
                            <option value="EQUAL">等于</option>
                            <option value="LESS">小于</option>
                            <option value="LESS_EQUAL">大于等于</option>
                            <option value="BETWEEN">区间</option>
                        </select>
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
<%--权限分配--%>
<script type="text/template" title="" id="fp-dialog">
    <div class="person-fp" id="personFP">
        <div class="v-left">
            <p class="title">未分配</p>
            <div class="person-content">
                <select multiple="multiple" size="12" id="leftValue"></select>
            </div>
        </div>
        <div class="v-center">
            <div class="add-all">
                >>
            </div>
            <div class="add-one">
                >
            </div>
            <div class="remove-one">
                <
            </div>
            <div class="remove-all">
                <<
            </div>
        </div>
        <div class="v-right">
            <p class="title">已分配</p>
            <div class="person-content">
                <select multiple="multiple" size="12" id="rightValue"></select>
            </div>
        </div>
    </div>
    <div class="dialog-manage">
        <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
    </div>
</script>
</html>