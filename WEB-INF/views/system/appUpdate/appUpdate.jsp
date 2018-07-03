<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>APP更新管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="name" value="${paramMap.name}"/>
        <input type="hidden" name="type" value="${paramMap.type}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}"/>
        <input type="hidden" name="endDate" value="${paramMap.endDate}"/>
        <input type="hidden" name="status" value="${paramMap.status}"/>
    </div>
    <form id="pagerForm" action="${ctx}/appUpdate/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="appUpload()">上传</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteApp()">删除</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">APP类型:</label>
                        <select class="form-control type" id="search-select" name="type" >
                            <option value="">请选择App类型</option>
                            <option value="1"
                            <c:if test="${paramMap.type eq  '1' }">selected</c:if>
                            >IOS</option>
                            <option value="2"
                            <c:if test="${paramMap.type eq  '2'  }">selected</c:if>
                            >安卓</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">状态:</label>
                        <select class="form-control type" id="search-statu" name="status" data-placeholder="状态...">
                            <option value="">请选择状态</option>
                            <option value="1"
                            <c:if test="${paramMap.status eq  1  }">selected</c:if>
                            >启用</option>
                            <option value="0"
                            <c:if test="${paramMap.status eq  0  }">selected</c:if>
                            >停用</option>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">上传时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" 
                                   id="search-app-start-date" value=""/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate"
                                   id="search-app-end-date" value=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">App名称:</label>
                        <input type="text" class="form-control" name="name" id="search-app-name"
                               value="${paramMap.name}"/>
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
	                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
	                        <th style="width:2%;">序号</th>
	                        <th style="width:10%;">APP名称</th>
                            <th style="width:10%;">APP类型</th>
	                        <th style="width:2%;">版本号</th>
	                        <th style="width:20%;">上传文件地址</th>
	                        <th style="width:5%;">备注</th>
	                        <th style="width:8%;">上传时间</th>
	                        <th style="width:5%;">状态</th>
	                        <th style="width:8%;">操作</th>
	                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td>
                                <input type="checkbox" class="checkOne" name="appList_input" value="${item.id}">
                            </td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="cel">${item.name}</td>
                            <td class="cel"> <c:if test="${item.type =='1'}">IOS</c:if><c:if test="${item.type =='2'}">安卓</c:if></td>
                            <td class="cel">${item.version}</td>
                            <td class="cel">${item.url}</td>
                            <td class="cel max-200" title="${item.remark}">${item.remark}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </td>
                            <td class="cel">
                            <c:if test="${item.isvalid =='1'}">
                                有效
                            </c:if>
                            <c:if test="${item.isvalid =='0'}">
                               无效
                            </c:if>
                            </td>
                             <td>
                                <a href="#" onclick="editStop('${item.id}')" class="btn btn-primary btn-xs"
                                   id="start${item.id}"
                                <c:if test="${item.isvalid ==1}">
                                    style="display:none;"
                                </c:if>
                                >启用</a>

                                <a href="#" onclick="editStart('${item.id}')" class="btn btn-danger btn-xs"
                                   id="stop${item.id}"
                                <c:if test="${item.isvalid ==0}">
                                    style="display:none;"
                                </c:if>
                                >停用</a>
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

<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/appUpdate/list.js"></script>
<script type="text/template" title="App上传" id="appCreate-dialog">
    <div class="ibox-content">
        <form id="appForm" class="form-horizontal">
            <div class="row" style="margin: 0;">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>App名称:</label>
                        <div class="col-xs-8">
                            <input type="text" class=" form-control" name="name" id="app-name"
                                   tip="App名称不能为空" check="validAppForm(this)">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>App类型:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="APP类型不能为空">
                                <select class="form-control app-type" id="app-type" name="type"  check="validAppForm(this)">
                                    <option value="">请选择App类型</option>
                                    <option value="1">IOS</option>
                                    <option value="2">安卓</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>版本号:</label>
                        <div class="col-xs-8">
                            <input type="text" class=" form-control" name="version" id="app-version"
                                   tip="App版本号不能为空" check="validAppForm(this)">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                        <div class="col-xs-8">
                            <textarea type="text" class="form-control" name="remark" id="app-remark"
                                   tip="APP备注不能为空" check="validAppForm(this)"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>上传:</label>
                        <div class="col-xs-9">
                            <div class="page-container">
                                <div id="uploader"></div>
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