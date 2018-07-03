<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
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
    <div id="hiddenForm">
        
    </div>
    <form id="pagerForm" action="${ctx}/advert/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-5">
           		<shiro:hasPermission name="orderFile:save">
                <button type="button" data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</button>
                </shiro:hasPermission>
                <shiro:hasPermission name="orderFile:delete">
                <button type="button" data-toggle="modal" class="btn btn-danger btn-sm delete-btn"
                   onclick="deleteFile('${paramMap.title}','${paramMap.type}')">删除</button>
                 </shiro:hasPermission>
                 <shiro:hasPermission name="orderFile:download">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm download-file">打包下载</button>
            	</shiro:hasPermission>
                <button type="button" class="btn btn-sm btn-danger check-btn" >全选</button>
            </div>
            <input type="hidden" name="type" id="bType" value="${bType}"/>
            <input type="hidden" name="type" id="mortgageFile" value="${mortgageFile}"/>
            <div class="col-sm-7 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">类别:</label>
                        <select class="form-control status" id="search-select" name="type"
                        <c:if test="${bType !=null}">disabled="disabled"</c:if>
                        data-placeholder="文件类型...">
                        <option value="">请选择文件类型</option>
                        <option value="1"
                        <c:if test="${bType == 1}">selected</c:if>
                        >抵押材料</option>
                        <option value="2"
                        <c:if test="${bType == 2}">selected</c:if>
                        >面签材料</option>
                        <option value="3"
                        <c:if test="${bType == 3}">selected</c:if>
                        >候补资料</option>
                        <option value="4"
                        <c:if test="${bType == 4}">selected</c:if>
                        >提车资料</option>
                        <option value="5"
                        <c:if test="${bType == 5}">selected</c:if>
                        >征信材料</option>
                        <option value="6"
                        <c:if test="${bType == 6}">selected</c:if>
                        >垫款凭证</option>
                        <option value="7"
                        <c:if test="${bType == 7}">selected</c:if>
                        >合同材料</option>
                        <option value="8"
                        <c:if test="${bType == 8}">selected</c:if>
                        >其他附件</option>
                        <option value="9"
                        <c:if test="${bType == 9}">selected</c:if>
                        >过户资料</option>
                        <option value="11"
                        <c:if test="${bType == 11}">selected</c:if>
                        >支出凭证</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-primary search-btn">搜索</button>
                      <input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
                      <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
						<a type="button" class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
					 </c:if>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic height-auto">
    <div class="row">
        <c:if test="${view== 1}">
            <c:if test="${auditList==null || auditList.size() == 0 }">
                <div class="infor-item" style="margin: 20px 18px 0;">
                    <h5>审核信息</h5>
                    <div class="col-td" style="text-align: center; padding-bottom: 10px;">暂无数据</div>
                </div>
            </c:if>
            <c:forEach items="${auditList}" var="item">
                <div class="infor-item" style="margin: 20px 18px 0;">
                    <h5>审核信息</h5>
                    <div class="box-item row">
                        <input type="hidden" name="acceptId" value="14">
                        <div class="col-xs-2">
                            <div class="item-text">
                                <span>审核类型:</span>
                                <span>
	                                <c:if test="${item.bussinessType==2}">车辆候补</c:if>
	                            	<c:if test="${item.bussinessType==4}">候补资料</c:if>
	                            	<c:if test="${item.bussinessType==5}">抵押材料</c:if>
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-2">
                            <div class="item-text">
                                <span>审核类型:</span>
                                <span>
                                	<c:if test="${item.auditStatus==0}">已提交</c:if>
		                            <c:if test="${item.auditStatus==1}">通过</c:if>
		                            <c:if test="${item.auditStatus==2}">拒绝</c:if>
		                            <c:if test="${item.auditStatus==3}">退单</c:if>
		                            <c:if test="${item.auditStatus==4}">作废</c:if>
		                            <c:if test="${item.auditStatus==5}">保存</c:if>
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="item-text">
                            	<span>备注:</span>
                            	<span>${item.remark}</span>
                            </div>
                        </div>
                        <div class="col-xs-2">
                            <div class="item-text">
                            	<span>审核人员:</span>
                            	<span>${item.auditRealName}</span>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="item-text">
                            	<span>审核时间:</span>
                                <span>
                                	<fmt:formatDate value="${item.auditTime}" pattern="yyyy-MM-dd HH:mm:ss "/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </c:if>
    </div>
    <div class="row" style="margin: 30px auto;">
        <input type="hidden" id="OrderAcceptId" value="${acceptId}">
        <div id="files" class="files gallerys"></div>
        <div id="pagination" class="pagination pagination-right"></div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/file/list.js?v=1223131"></script>
<script type="text/template" title="新增" id="fileCreate-dialog">
    <div class="ibox-content">
        <form id="fileCreateForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>文件类型:</label>
                <div class="col-xs-8">
                    <div obj="" tip="文件类型不能为空">
                        <select class="form-control file-type" id="file-type" name="type"
                        <c:if test="${bType !=null}">disabled="disabled"</c:if>
                        data-placeholder="文件类型..." check="validFile(this)">
                        <option value="">请选择文件类型</option>
                        <option value="1"
                        <c:if test="${bType == 1}">selected</c:if>
                        >抵押材料</option>
                        <option value="2"
                        <c:if test="${bType == 2}">selected</c:if>
                        >面签材料</option>
                        <option value="3"
                        <c:if test="${bType == 3}">selected</c:if>
                        >候补资料</option>
                        <option value="4"
                        <c:if test="${bType == 4}">selected</c:if>
                        >车辆信息补录</option>
                        <option value="10"
                        <c:if test="${bType == 10}">selected</c:if>
                        >垫款凭证</option>
                        <option value="7"
                        <c:if test="${bType == 7}">selected</c:if>
                        >合同材料</option>
                        <option value="8"
                        <c:if test="${bType == 8}">selected</c:if>
                        >其他附件</option>
						<option value="9"
                        <c:if test="${bType == 7}">selected</c:if>
                        >过户资料</option>
						<option value="11"
                        <c:if test="${bType == 11}">selected</c:if>
                        >支出凭证</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group" id ="hidden-select" style="margin-bottom:0;display: none;">
                <label class="col-xs-3 control-label"><span class="red">*</span>文件类型:</label>
                <div class="col-xs-8">
                    <div obj="" tip="类别不能为空">
                        <select class="form-control file-childType" id="file-childType" name="type"
                                data-placeholder="文件类型..." check="validFile(this)">
                            <option value="">请选择文件类型</option>
                            <option value="1">合格证</option>
                            <option value="2">停车影像</option>
                            <option value="3">保单</option>
                            <option value="4">车资</option>
                            <option value="5">行驶证</option>
                            <option value="6">发票</option>
                            <option value="7">登记证书</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group" style="margin:0;">
                <div class="page-container two-line">
                    <div id="uploader"></div>
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
