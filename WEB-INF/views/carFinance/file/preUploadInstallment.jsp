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

            <shiro:hasPermission name="uploadInstallment:delete">
                <button type="button" data-toggle="modal" class="btn btn-danger btn-sm delete-btn"
                   onclick="deleteFile('${paramMap.title}','${paramMap.type}')">删除</button>
            </shiro:hasPermission>
            <shiro:hasPermission name="uploadInstallment:download">
                <button type="button" data-toggle="modal" class="btn btn-success btn-sm download-file"
                       onclick="downloadFile('${paramMap.title}','${paramMap.type}')">打包下载</button>
                </shiro:hasPermission> 
                 <shiro:hasPermission name="uploadInstallment:submit">
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
        <fieldset>
            <input type="hidden" id="OrderAcceptId" value="${acceptId}">
            <input type="hidden" id="oneType" value="${oneType}">
            <input type="hidden" id="oneAuditId" value="">
            <legend><span class="red">*</span>分期付款业务申请表</legend>
            <div id="files31" class="files">
                <div class="col-sm-2 add-btn" data-type="31">
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
                <legend><span class="red">*</span>汽车销售合同</legend>
                <div id="files32" class="files">
                    <div class="col-sm-2 add-btn" data-type="32">
                        <div class="file">
                            <img alt="" src="${ctx}/styles/images/nav_add.png">
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>公司担保承诺函</legend>
            <div id="files33" class="files">
                <div class="col-sm-2 add-btn" data-type="33">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>首付款凭证</legend>
            <div id="files34" class="files">
                <div class="col-sm-2 add-btn" data-type="34">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend><span class="red">*</span>签字照</legend>
            <div id="files45" class="files">
                <div class="col-sm-2 add-btn" data-type="45">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>共同还款人承诺函</legend>
            <div id="files35" class="files">
                <div class="col-sm-2 add-btn" data-type="35">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>分期付款合同</legend>
            <div id="files36" class="files">
                <div class="col-sm-2 add-btn" data-type="36">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>银行卡签购单</legend>
            <div id="files37" class="files">
                <div class="col-sm-2 add-btn" data-type="37">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>代领委托授权书</legend>
            <div id="files38" class="files">
                <div class="col-sm-2 add-btn" data-type="38">
                    <div class="file">
                        <img alt="" src="${ctx}/styles/images/nav_add.png">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
    <fieldset>
        <legend>手续费委托代扣授权书</legend>
        <div id="files39" class="files">
            <div class="col-sm-2 add-btn" data-type="39">
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/carFinance/file/uploadInstallment.js"></script>
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
