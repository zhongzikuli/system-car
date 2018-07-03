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
	<form id="pagerForm" action="${ctx}/advert/query.action" method="post" style="margin:0;">
		<%@include file="/WEB-INF/views/include/pageForm.jsp"%>
		<div class="row">
			<div class="col-sm-6">
				<h5>面签附件</h5>
			</div>
			<input type="hidden" name="type" id="type" value="${type}"/>
			<input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
			<input type="hidden" name="viewSource" id="viewSource" value="${viewSource}"/>
			<c:if test="${not empty goBackUrl}">
			<div class="col-sm-6 text-right">
				<div class="form-group">
					<a type="button" class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
				</div>
			</div>
		</c:if>
		</div>
	</form>
</div>

<div class="mod_basic ibox-content car-finance gallerys" >
    <div class="item-row">
        <fieldset  >
            <legend>审核信息</legend>
            <div id="audit-history-list" class="mod_basic no-bottom">
                <table class="table table-hover no-margin table-striped">
                    <thead>
                    <tr>
                        <th style="width:4%;">审核名称</th>
                        <th style="width:4%;">审核状态</th>
                        <th style="width:30%;">审核备注</th>
                        <th style="width:4%;">审核人员</th>
                        <th style="width:4%;">审核时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${audit == null }">
                        <tr>
                            <td class="col-td" colspan="7">暂无审核信息</td>
                        </tr>
                    </c:if>
                        <c:if test="${audit != null }">
                        <input type="hidden" id="data" class="date-btn" value="${item.id}">
                        <tr style="height: 42px;line-height: 42px;">
                            <td class="cel"><c:if test="${null ==audit.auditTypeName || ''  == audit.auditTypeName|| '初审单录入'  == audit.auditTypeName}">订单审核</c:if>${audit.auditTypeName}</td>
                            <td class="cel">
                                <c:if test="${audit.auditStatus==2}">
                                    <code class="btn-success">通过</code>
                                </c:if>
                                <c:if test="${audit.auditStatus==-4}">
                                    <code class="btn-warning">拒绝</code>
                                </c:if>
                                <c:if test="${audit.auditStatus==-2}">
                                    <code class="btn-danger">退回</code>
                                </c:if>
                                <c:if test="${audit.auditStatus==-3}">
                                    <code class="btn-primary">作废</code>
                                </c:if>
                                <c:if test="${audit.auditStatus==3}">
                                    <code class="btn-info">保存</code>
                                </c:if>

                            </td>
                            <td class="cel" title="${audit.auditBak}">${audit.auditBak}</td>
                            <td class="cel">${audit.auditUser}<code>${audit.roleName}</code></td>
                            <td class="cel"><fmt:formatDate value="${audit.ctime}" pattern="yyyy-MM-dd HH:mm"/></td>
                        </tr>
                        </c:if>
                    </tbody>
                </table>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <input type="hidden" id="OrderAcceptId" value="${acceptId}">
            <legend><span class="red">*</span>开卡申请表</legend>
            <div id="files20" class="files">
               
            </div>
        </fieldset>
    </div>
    <div class="item-row">
          <fieldset>
                <legend><span class="red">*</span>专项额度核定申请表</legend>
                <div id="files21" class="files">
                
                </div>
            </fieldset>
        </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>户口本</legend>
            <div id="files22" class="files">
            
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>收入证明</legend>
            <div id="files23" class="files">
                
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>婚姻证明</legend>
            <div id="files24" class="files">
                
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>资产证明</legend>
            <div id="files25" class="files">
                
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>上门照片</legend>
            <div id="files26" class="files">
                
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>其他</legend>
            <div id="files27" class="files">
                
            </div>
        </fieldset>
    </div>
    <div class="item-row" id="item-other">
        <fieldset>
            <legend>历史附件</legend>
            <div id="files28" class="files">

            </div>
        </fieldset>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/file/viewUploadInterview.js"></script>
</html>
