<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>
<body>
<div class="mod_header">
    <input type="hidden" name="title" id="advertTitle" value="${paramMap.title}"/>
    <input type="hidden" name="type" id="advertType" value="${paramMap.type}"/>
    <form id="pagerForm" action="${ctx}/advert/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>

        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="advert:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="advert:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
                </shiro:hasPermission>
            </div>

            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">类别:</label>
                        <select class="form-control type" id="search-select" name="type" data-placeholder="广告类型...">
                            <option value="">请选择广告类型</option>
                            <c:forEach items="${Types }" var="type">
                                <option value="${type.keyWorld}"
                                <c:if test="${type.keyWorld eq paramMap.type}">selected</c:if>
                                >${type.valueDesc}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">广告标题:</label>
                        <input type="text" class="form-control" name="title" id="search-advert-name"
                               value="${paramMap.title}"/>
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
                        <th style="width:14%;">广告标题</th>
                        <th style="width:8%;">广告类型</th>
                        <th style="width:5%;">状态</th>
                        <th style="width:5%;">是否有效</th>
                        <th style="width:10%;">备注</th>
                        <th style="width:8%;">广告缩略图</th>
                        <th style="width:10%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="9">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="advertrList_input" value="${item.id}">
                            </td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel">${item.title}</td>
                            <td class="cel">
                                <c:forEach items="${Types }" var="type">
                                    <c:if test="${type.keyWorld eq item.type}">${type.valueDesc}</c:if>
                                </c:forEach>
                            </td>
                            <td class="cel">
                                <c:if test="${item.status =='1'}"><code class="alert-success">上架</code></c:if>
                                <c:if test="${item.status =='2'}"><code>下架</code></c:if>
                            </td>
                            <td class="cel">
                                <c:if test="${item.isvalid =='1'}">有效</c:if>
                                <c:if test="${item.isvalid =='0'}">无效</c:if>
                            </td>
                            <td class="cel max-200" title="${item.remark}">${item.remark}</td>
                            <td class="gallerys">
                                    <img width="60px" height="20px" alt=""
                                      class="pre-img"   src="${url}groupName=${item.fileGroup}&fileId=${item.filePath}">
                            </td>
                            <td>
                            <c:if test="${item.status =='1'}">
                            <a href="#" class="btn btn-danger btn-xs down-btn" data-id="${item.id}" data-status="2"><i class="fa fa-edit"></i>下架</a>
                            </c:if>
                            <c:if test="${item.status =='2'}">
                            <a href="#" class="btn btn-primary btn-xs up-btn" data-id="${item.id}" data-status="1"><i class="fa fa-edit"/></i>上架</a>
                            </c:if>
                                <shiro:hasPermission name="advert:update">
                                    <a href="#" class="btn btn-primary btn-xs edit-btn" data-id="${item.id}"><i class="fa fa-edit"></i>编辑</a>
                                </shiro:hasPermission>
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
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/system/advert/list.js"></script>
<script type="text/template" title="新增广告" id="advCreate-dialog">
    <div class="ibox-content">
        <form id="advCreateForm" class="form-horizontal">
            <div class="row">
                <div class="col-md-7">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>广告标题:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" id="advert-title" autocomplete="off"
                                   name="title" value="" tip="广告标题不能为空" check="validAdv(this)">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>广告类型:</label>
                        <div class="col-xs-8">
							<div obj="" tip="广告类型不能为空">
                            	<select id="advert-type" data-placeholder="广告类型..." class="type-chosen-select form-control"
									name="type" check="validAdv(this)">
                                	<option value="">请选择广告类型</option>
                                	<c:forEach items="${Types }" var="type">
                                    	<option value="${type.keyWorld}">${type.valueDesc}</option>
                                	</c:forEach>
                            	</select>
							</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>跳转类型:</label>
                        <div class="col-xs-8">
							<div obj="" tip="跳转类型不能为空">
                            	<select id="jumpType" data-placeholder="广告跳转类型..." name="jumpType" class="jumpType-chosen-select form-control"
                                    check="validAdv(this)">
                                	<option value="">请选择</option>
									<option value="0">不跳转</option>
                                	<option value="1">跳转到网页</option>
                                	<option value="2">跳转到APP</option>
                            	</select>
							</div>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="col-xs-3 control-label">跳转链接:</label>
                        <div class="col-xs-8">
                           <input type="text" class="form-control" id="advert-url" autocomplete="off"
                                   name="title" value=""  >
                        </div>
                    </div>

                    <div class="form-group">
						<label class="col-xs-3 control-label"><span class="red">*</span>广告备注:</label>
                        <div class="col-xs-8">
							<textarea rows="3" cols="20" type="text" class="form-control" id="advert-text" name="remark"
                                  tip="广告备注不能为空" value="" check="validAdv(this)"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h">
                            <span class="red">*</span>上传广告图片:
                            <span class="red">注:该图片必须为小于1M的图片</span>
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="addUploader"></div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="编辑广告" id="advEdit-dialog">
    <div class="ibox-content">
        <form id="editCreateForm" class="form-horizontal">
            <div class="row">
                <div class="col-md-7">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>广告标题:</label>
                        <div class="col-xs-8">
                            <input type="hidden" name="advert-id" id="advert-id" value=""/>
                            <input type="text" class="form-control" id="advert-title" autocomplete="off"
                                   name="title" tip="广告标题不能为空" check="validAdv(this)"
                                   value="${advert.title }">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>广告类型:</label>
                        <div class="col-xs-8">
							<div obj="" tip="广告类型不能为空">
                            	<select id="advert-type" data-placeholder="广告类型..." class="type-chosen-select form-control" 
									name="type" check="validAdv(this)">
                                	<option value="">请选择广告类型</option>
                                	<c:forEach items="${Types }" var="type">
                                    	<option value="${type.keyWorld}"
                                    	<c:if test="${type.keyWorld eq advert.type}">selected</c:if>
                                    	>${type.valueDesc}</option>
                                	</c:forEach>
                            	</select>
							</div>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="col-xs-3 control-label "><span class="red">*</span>跳转类型:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="跳转类型不能为空">
                            	<select id="jumpType" data-placeholder="广告跳转类型..." name="jumpType" class="jumpType-chosen-select form-control"
                                    check="validAdv(this)">
                                	<option value="">请选择</option>
									<option value="0">不跳转</option>
                                	<option value="1">跳转到网页</option>
                                	<option value="2">跳转到APP</option>
                            	</select>
							</div>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="col-xs-3 control-label">跳转链接:</label>
                        <div class="col-xs-8">
                           <input type="text" class="form-control" id="advert-url" autocomplete="off"
                                   name="title" value=""  >
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>广告备注:</label>
                        <div class="col-xs-8">
                            <textarea rows="3" cols="20" type="text" class="form-control" id="advert-text" check="validAdv(this)"
                                 name="remark" tip="广告备注不能为空">${advert.remark }</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <input id="advert_files" data-id="${advert.filePath}" data-group="${advert.fileGroup}"
                           data-path="${advert.filePath}" data-name="${advert.fileName}" type="hidden">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h">
                             <span class="red">*</span>上传广告图片:
                             <span class="red">注:该图片必须为小于1M的图片</span>
                        </div>
                        <div class="page-container col-sm-12">
                             <div id="editUploader"></div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
