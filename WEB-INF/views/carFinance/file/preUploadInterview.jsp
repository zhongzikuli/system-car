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
    <form id="pagerForm" action="${ctx}/advert/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>

        <div class="row">
            <div class="col-sm-6">
                <shiro:hasPermission name="uploadInterview:delete">
                    <button type="button" data-toggle="modal" class="btn btn-danger btn-sm delete-btn"
                            onclick="deleteFile('${paramMap.title}','${paramMap.type}')">删除</button>
                </shiro:hasPermission>
                <shiro:hasPermission name="uploadInterview:download">
                    <button type="button" data-toggle="modal" class="btn btn-success btn-sm download-file"
                            onclick="downloadFile('${paramMap.title}','${paramMap.type}')">打包下载</button>
                </shiro:hasPermission>
                <shiro:hasPermission name="uploadInterview:submit">
                    <button type="button" class="btn btn-sm btn-info" onclick="commit(${acceptId})" data>确定提交</button>
                </shiro:hasPermission>
                <button type="button" class="btn btn-sm btn-danger check-btn" >全选</button>
            </div>
            <input type="hidden" name="type" id="type" value="${type}"/>
            <input type="hidden" name="goBackUrl" id="goBackUrl" value="${goBackUrl}"/>
            <input type="hidden" name="viewSource" id="viewSource" value="${viewSource}"/>
            <c:if test="${goBackUrl ne '' && goBackUrl ne null}">
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
                        <th style="width:18%;">审核名称</th>
                        <th style="width:18%;">审核状态</th>
                        <th style="width:19%;">审核备注</th>
                        <th style="width:19%;">审核人员</th>
                        <th style="width:16%;">审核时间</th>
                    </tr>
                    </thead>
                    <tbodaudity>
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
                    </tbodaudity>
                </table>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <input type="hidden" id="OrderAcceptId" value="${acceptId}">
            <input type="hidden" id="oneType" value="${oneType}">
            <input type="hidden" id="oneAuditId" value="">
            <legend><span class="red">*</span>开卡申请表</legend>
            <div id="files20" class="files">
                <div class="col-sm-2 add-btn" data-type="20">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <input type="hidden" id="newOrOld" value="${newOrOld}">
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>专项额度核定申请表</legend>
            <div id="files21" class="files">
                <div class="col-sm-2 add-btn" data-type="21">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>户口本</legend>
            <div id="files22" class="files">
                <div class="col-sm-2 add-btn" data-type="22">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>收入证明</legend>
            <div id="files23" class="files">
                <div class="col-sm-2 add-btn" data-type="23">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>婚姻证明</legend>
            <div id="files24" class="files">
                <div class="col-sm-2 add-btn" data-type="24">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>资产证明</legend>
            <div id="files25" class="files">
                <div class="col-sm-2 add-btn" data-type="25">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>上门照片</legend>
            <div id="files26" class="files">
                <div class="col-sm-2 add-btn" data-type="26">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>其他</legend>
            <div id="files27" class="files">
                <div class="col-sm-2 add-btn" data-type="27">
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
            <div id="files" class="files ">
				<p class="text-center  no-data">暂无数据</p>
            </div>
        </fieldset>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<%-- <script type="text/javascript" src="<%=request.getContextPath() %>/js/third/pagination/jquery.pagination.js"></script> --%>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/file/uploadInterview.js"></script>
<script type="text/template" title="新增" id="fileCreate-dialog">
    <div class="ibox-content">
        <form id="fileCreateForm" class="form-horizontal" method="post" enctype="multipart/form-data">
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
