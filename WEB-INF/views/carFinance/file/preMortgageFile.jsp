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
        <input type="hidden" name="title" id="advertTitle" value="${paramMap.title}"/>
        <input type="hidden" name="type" id="advertType" value="${paramMap.type}"/>
    </div>
    <form id="pagerForm" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-6">
                <%-- <shiro:hasPermission name="uploadMortgage:save">
                    <button type="button" data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</button>
                </shiro:hasPermission> --%>
                <shiro:hasPermission name="uploadMortgage:delete">
                    <button type="button" data-toggle="modal" class="btn btn-danger btn-sm delete-btn"
                            onclick="deleteFile('${paramMap.title}','${paramMap.type}')">删除
                    </button>
                </shiro:hasPermission>
                <shiro:hasPermission name="uploadMortgage:download">
                    <button type="button" data-toggle="modal" class="btn btn-success btn-sm download-file"
                            onclick="downloadFile('${paramMap.title}','${paramMap.type}')">打包下载
                    </button>
                </shiro:hasPermission>
                <shiro:hasPermission name="uploadMortgage:submit">
                    <button type="button" class="btn btn-sm btn-info" onclick="commit(${acceptId},${oneType})">确定提交
                    </button>
                </shiro:hasPermission>
                <button type="button" class="btn btn-sm btn-danger check-btn">全选</button>
            </div>
            <input type="hidden" name="type" id="type" value="${type}"/>
            <input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
            <div class="col-sm-6 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">类别:</label>
                        <select class="form-control status" id="search-select" name="type"
                        <c:if test="${bType !=null}">disabled="disabled"</c:if>
                        data-placeholder="文件类型...">
                        <option value="">请选择文件类型</option>
                        <option value="15">登记证书</option>
                        <option value="16">行驶证书</option>
                        </select>
                    </div>
                    <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
                        <div class="form-group">
							<a type="button" class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
                        </div>
                    </c:if>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic ibox-content car-finance min-1200 scroll-x gallerys">
	<div class="item-row">
		<fieldset  >
			<legend>审核信息</legend>
			<div id="audit-history-list" class="mod_basic no-bottom">
				<table class="table table-hover no-margin table-striped">
					<thead>
					<tr>
						<th style="width:18%;">审核类型</th>
						<th style="width:19%;">审核状态</th>
						<th style="width:19%;">审核备注</th>
						<th style="width:19%;">审核人员</th>
						<th style="width:16%;">审核时间</th>
					</tr>
					</thead>
					<tbody>

					<c:if test="${auditList == null || auditList.size() == 0}">
						<tr>
							<td class="col-td" colspan="7">暂无审核信息</td>
						</tr>
					</c:if>
					<c:forEach var="item" items="${auditList}" >
						<tr style="height: 42px;line-height: 42px;">
							<td class="cel">
								<c:if test="${item.bussinessType==2}">车辆候补</c:if>
								<c:if test="${item.bussinessType==4}">候补资料</c:if>
								<c:if test="${item.bussinessType==5}">抵押材料</c:if>
							</td>
							<td class="cel">
								<c:if test="${item.auditStatus==0}">待提交</c:if>
								<c:if test="${item.auditStatus==1}">已提交</c:if>
								<c:if test="${item.auditStatus==3}">保存</c:if>
								<c:if test="${item.auditStatus==-4}">拒绝</c:if>
								<c:if test="${item.auditStatus==-2}">退回</c:if>
								<c:if test="${item.auditStatus==-3}">作废</c:if>
							</td>
							<td class="cel" title="${item.auditBak}">${item.auditBak}</td>
							<td class="cel">${item.auditRealName}</td>
							<td class="cel"><fmt:formatDate value="${item.auditTime}" pattern="yyyy-MM-dd HH:mm"/></td>
						</tr>
					</c:forEach>
					</tbody>
				</table>
			</div>
		</fieldset>

	  </div>
	  <div class="item-row " id="item-15">
	   	  <fieldset>
	   			<legend>登记证书</legend>
				<input type="hidden" id="OrderAcceptId" value="${acceptId}">
				<input type="hidden" id="oneType" value="${oneType}">
				<input type="hidden" id="oneAuditId" value="">
				<input type="hidden" id="data" value="">
				<div id="files" class="files">
					<div class="col-sm-2 add-btn" data-type="15">
						<div class="file">
							<img alt="" src="${ctx}/styles/images/nav_add.png">
						</div>
	    			</div>		
				</div>
	      </fieldset>
      </div>
     <div class="item-row" id="item-16">
	   	  <fieldset>
	   			<legend>行驶证书信息</legend>
				<div id="files1" class="files">
					<div class="col-sm-2 add-btn" data-type="16">
						<div class="file">
							<img alt="" src="${ctx}/styles/images/nav_add.png">
						</div>
	    			</div>
				</div>
	      </fieldset>
      </div>
      <div class="item-row" id="item-other">
	   	  <fieldset>
	   			<legend>历史附件</legend>
				<div id="files2" class="files ">
					<p class="text-center  no-data">暂无数据</p>
				</div>
	      </fieldset>
      </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/file/mortgageFile.js"></script>
<script type="text/template" title="新增" id="fileCreate-dialog">
    <div class="ibox-content">
        <form id="fileCreateForm" class="form-horizontal">
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
