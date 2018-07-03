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
    <div id="hiddenForm">
        <input  type="hidden" name="isAuto" value="${paramMap.isAuto}">
    </div>
    <form id="pagerForm" action="${ctx}/bank/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp"%>
        <div class="row">
            <div class="col-sm-2">
            <shiro:hasPermission name="bank:add">
                <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="createBank()">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="bank:delete">
                <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteBank()">删除</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <div class="form-group">
                            <label class="control-label label">是否自动对接:</label>
                            <select class="form-control" id="isAuto" name="isAuto"
                                    data-placeholder="是否自动对接...">
                                <option value="">请选择</option>
                                <option value="0" <c:if test="${paramMap.isAuto eq  0  }">selected</c:if>>否</option>
                                <option value="1" <c:if test="${paramMap.isAuto eq  1  }">selected</c:if>>是</option>
                            </select>
                            <button type="button" class="btn btn-sm btn-primary" onclick="searchSubmit()">搜索</button>
                            <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                        </div>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" ></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:8%;">银行名称</th>
                        <th style="width:8%;">银行简称</th>
                        <th style="width:8%;">银行标识</th>
                        <th style="width:8%;">是否自动对接</th>
                        <th style="width:8%;">银行logo</th>
                        <th style="width:3%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="7">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="bank_input" value="${item.id}"></td>
                            <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td >${item.bankName}</td>
                            <td >${item.bankShortName}</td>
                            <td >${item.bankCode}</td>
                            <td >
                                <c:if test="${item.isAuto == '0'}">
                                    否
                                </c:if>
                                <c:if test="${item.isAuto == '1'}">
                                    是
                                </c:if>


                            <td class="gallerys">
                                <img width="60px" height="20px" alt=""
                                     class="pre-img"   src="${url}groupName=${item.pictureFileGroup}&fileId=${item.pictureFilePath}">
                            </td>


                            </td>
                            <td class="btn-cel" style="padding-left: 98px;">
                            <shiro:hasPermission name="bank:toEdit">
                                <a href="#" onclick="editInfo('${item.id}')" class="btn btn-primary btn-xs">
                                	<i class="fa fa-edit"></i>编辑</a>
                                        </shiro:hasPermission>
                                <a href="#"  onclick="detail('${item.bankName}','${item.bankShortName}','${item.bankCode}','${item.isAuto}','${item.videoInterview}','${item.relativeBankOrg}')"  class="btn btn-info btn-xs detail">
                                	<i class="fa fa-search-plus"></i>查看</a>


                                <a href="#"  class="btn btn-primary btn-xs start"  data-id="${item.id}"
                                        <c:if test="${item.forbidden ==0}">
                                            style="display:none;"
                                        </c:if>>
                                    <i class="fa fa-edit"></i>启用</a>
                                <a href="#"  class="btn btn-danger btn-xs stop"  data-id="${item.id}"
                                        <c:if test="${item.forbidden ==1}">
                                            style="display:none;"
                                        </c:if>>
                                    <i class="fa fa-edit"></i>禁用</a>


                                <a href="#"  class="btn btn-primary btn-xs isVideoInterview"  data-id="${item.id}"
                                        <c:if test="${item.videoInterview ==1}">
                                            style="display:none;"
                                        </c:if>>
                                    <i class="fa fa-edit"></i>支持视频面签</a>
                                <a href="#"  class="btn btn-danger btn-xs isNotVideoInterview"  data-id="${item.id}"
                                        <c:if test="${item.videoInterview ==0}">
                                            style="display:none;"
                                        </c:if>>
                                    <i class="fa fa-edit"></i>不支持视频面签</a>
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
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/bank/bank.js?version=2018228323"></script>
<script type="text/template" title="新增" id="bank-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm" class="form-horizontal">
            <div class="col-md-7">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>银行:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankName" id="bankName"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>银行简称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankShortName" id="bankShortName"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>银行标识:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankCode" id="bankCode" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>是否自动对接:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="isAuto_create"
                                 check="bankForm(this)" class="form-control ">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>是否支持做视频面签:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="videoInterview_create"
                                 check="bankForm(this)"    class="form-control ">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="col-xs-3 control-label">关联银行组织:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="relativeBankOrgId_create"
                                  class="form-control ">
                        </select>
                    </div>
                </div>
            </div>
            </div>

            <div class="col-md-5">
                <div class="form-group">
                    <div class="pn-flabel pn-flabel-h">
                        <span class="red">*</span>上传银行logo:
                        <span class="red">注:该图片必须为小于1M的图片</span>
                    </div>
                    <div class="page-container col-sm-12">
                        <div id="addUploader"></div>
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
<script type="text/template" title="编辑" id="bankEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm_edit" class="form-horizontal">
            <div class="col-md-7">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>银行:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankName_edit" id="bankName_edit"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>银行简称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankShortName_edit" id="bankShortName_edit"
                           check="bankForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>银行标识:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankCode_edit" id="bankCode_edit"  readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>是否自动对接:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="isAuto_edit"
                                 check="bankForm(this)" class="form-control ">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>是否支持做视频面签:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="videoInterview_edit"
                                 check="bankForm(this)" class="form-control ">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">关联银行组织:</label>
                <div class="col-xs-8" >
                    <div obj="" >
                        <select  id="relativeBankOrgId_edit"
                              class="form-control ">
                        </select>
                    </div>
                </div>
            </div>
            </div>


            <div class="col-md-5">
                <input id="bank_files"  data-id="${bank.filePath}" data-group="${bank.fileGroup}"
                       data-path="${bank.filePath}" data-name="${bank.fileName}" type="hidden">
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
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="查看" id="bankDetail-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm_detail" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">银行:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankName_detail" id="bankName_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">银行简称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankShortName_detail" id="bankShortName_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">银行标识:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="bankCode_detail" id="bankCode_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">是否自动对接:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"  id="isAuto_detail"
                           readonly>
                </div>
            </div>

            <div class="form-group">
                <label class="col-xs-3 control-label">是否需要做视频面签:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"  id="videoInterview_detail"
                           readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">关联银行组织:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"  id="relativeBankOrgId_detail"
                           readonly>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>
</html>
