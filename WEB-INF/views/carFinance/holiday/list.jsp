<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="stTime" value="${stTime}"/>
        <input type="hidden" name="endTime" value="${endTime}"/>
    </div>
    <form id="pagerForm" action="${ctx}/holiday.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-4">
                <shiro:hasPermission name="holiday:add">
                    <a data-toggle="modal" class="btn btn-primary btn-sm init-btn">维护工作日</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-8">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">开始日期:</label>
                        <input type="text" class="form-control" name="stTime" id="stTime" value="${stTime}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">结束日期:</label>
                        <input type="text" class="form-control" name="endTime" id="endTime" value="${endTime}"/>
                    </div>
                    <div class="form-group">
                        <a class="btn btn-primary btn-sm" onclick="searchSubmit()"> &nbsp;&nbsp;&nbsp;&nbsp;搜索</a>
                    </div>
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
                    <th style="width:5%;">日期</th>
                    <th style="width:5%;">日期类型</th>
                    <th style="width:5%;">3天</th>
                    <th style="width:5%;">5天</th>
                    <th style="width:5%;">7天</th>
                    <th style="width:5%;">10天</th>
                    <th style="width:5%;">15天</th>
                    <th style="width:5%;">20天</th>
                    <th style="width:5%;">25天</th>
                    <th style="width:5%;">30天</th>
                    <th style="width:5%;">35天</th>
                    <th style="width:5%;">40天</th>
                    <th style="width:5%;">45天</th>
                    <th style="width:5%;">60天</th>
                    <th style="width:5%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="15">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr target="sid_user" rel="${item.id}">
                        <td>
                        	<code <c:if test="${item.type == 0}">class="alert-warning"</c:if><c:if test="${item.type == 1}">class="alert-info"</c:if> >
                            	<sl:format type="date" pattern="yyyy-MM-dd" show="${item.curDate}"/>
                            </code>
                        </td>
                        <td><c:if test="${item.type == 1}">工作日</c:if><c:if test="${item.type == 0}">非工作日</c:if></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.threeDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.fiveDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.sevenDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.tenDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.fifteenDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.twentyDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.twentyFiveDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.thirtyDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.thirtyFiveDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.fortyDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.fortyFiveDay}"/></td>
                        <td><sl:format type="date" pattern="yyyy-MM-dd" show="${item.sixtyDay}"/></td>
                        <td>
                            <a href="#" class="btn btn-primary btn-xs edit-btn" data-id="${item.id}">
                                <i class="fa fa-edit"></i>编辑</a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>

<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/holiday/holiday.js"></script>
<script type="text/template" title="非工作日维护" id="unworkingday-dialog">
    <div class="ibox-content">
        <form id="unholidayForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>类型:</label>
                    <div class="col-xs-8" obj="">
                        <select data-placeholder="类型选择..." name="type" class="form-control chosen-select" readonly="readonly">
                            <option value="0">非工作日</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>日期:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="curDate" name="curDate" check="validForm(this)">
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

<script type="text/template" title="工作日维护" id="workingday-dialog">
    <div class="ibox-content">
        <form id="holidayForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>开始日期:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="startDate" name="startDate" check="validForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>结束日期:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="endDate" name="endDate" check="validForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>非工作日:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="cuDate0" name="curDate" check="validForm(this)">
                    </div>
                </div>
            </div>
 			<div class="holiday-area">
                
            </div>
			<div class="form-group text-center">
            	<a class="btn btn-primary" id="add-date"><span>+</span>添加非工作日</a>
				<a class="btn btn-danger" id="delete-date">删除</a>
        	</div>
        </form>
        
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="导入非工作日" id="excel-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="addUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>

<script type="text/template" title="编辑" id="holidayEdit-dialog">
    <div class="ibox-content">
        <form id="holidayEdit" class="form-horizontal">
            <input type="hidden" name="id" value=""/>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>类型:</label>
                    <div class="col-xs-8" obj="">
                        <select data-placeholder="类型选择..." id="type" name="type" class="form-control chosen-select">
                            <option value="">请选择</option>
                            <option value="0">非工作日</option>
                            <option value="1">工作日</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>日期:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="curDate" name="curDate" obj="not_null">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">3天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="threeDay" name="threeDay">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">5天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="fiveDay" name="fiveDay">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">7天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="sevenDay" name="sevenDay">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">10天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="tenDay" name="tenDay">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">15天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="fifteenDay" name="fifteenDay">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">20天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="twentyDay" name="twentyDay">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">25天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="twentyFiveDay" name="twentyFiveDay">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">30天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="thirtyDay" name="thirtyDay">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">35天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="thirtyFiveDay" name="thirtyFiveDay">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">40天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="fortyDay" name="fortyDay">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">45天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="fortyFiveDay" name="fortyFiveDay">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">60天:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="sixtyDay" name="sixtyDay">
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
