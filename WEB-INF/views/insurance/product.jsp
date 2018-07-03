<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <input type="hidden" name="dealerName" value="${paramMap.dealerName}"/>

    <form id="pagerForm" action="${ctx}/insuranceManage/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
            </div>
            <div class="col-sm-10">
	            <div class="form-inline">
	                    <div class="form-group">
	                        <label class="control-label label">保险类型:</label>
	                        <select class="form-control" id="search-select" name="type" data-placeholder="保险类型...">
	                           <option value="">请选择保险类型</option>
                            	<option value="1" <c:if test="${paramMap.insuranceType eq  1  }">selected</c:if>>车险</option>
                            	<option value="2"<c:if test="${paramMap.insuranceType eq  2  }">selected</c:if>>寿险</option>
	                        </select>
	                    </div>
	                    <div class="form-group">
	                        <label class="control-label label">状态:</label>
	                        <select class="form-control" id="search-statu" name="status"   data-placeholder="状态...">
                                <option value="">请选择状态</option>
                                <option value="1"<c:if test="${paramMap.status eq  1  }">selected</c:if> >上架</option>
                                <option value="2"<c:if test="${paramMap.status eq  2  }">selected</c:if>>下架</option>
                       </select>
	                    </div>
	                    <div class="form-group">
	                        <label class="control-label label">保险标题:</label>
	                        <input type="text" onkeyup="value=value.replace(/\s/g,'')" class="form-control" name="title" id="title" value="${paramMap.title}">
                        	<button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
	                    	 <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                        <th style="width:7%;">保险标题</th>
                        <th style="width:8%;">保险类型</th>
                        <th style="width:8%;">状态</th>
                        <th style="width:6%;">缩略图</th>
                        <th style="width:6%;">更新时间</th>
                        <th style="width:6%;">操作</th>
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
                            <td><input type="checkbox" class="checkOne" name="insuranceProduct_input" value="${item.id}"></td>
                            <td class="cel">${item.title}</td>
                            <c:if test="${item.insuranceType == 1}">
                                <td class="cel">车险</td>
                            </c:if>
                            <c:if test="${item.insuranceType == 2}">
                                <td class="cel">寿险</td>
                            </c:if>
                            <c:if test="${item.status == 1}">
                                <td class="cel">上架</td>
                            </c:if>
                            <c:if test="${item.status == 2}">
                                <td class="cel">下架</td>
                            </c:if>
                            <td class="cel">
                                <a href="${url}groupName=${item.fileGroup}&fileId=${item.filePath}"
                                   rel="lightbox-tour" title="FileDescription">
                                    <img width="60px" height="20px" alt=""
                                         src="${url}groupName=${item.fileGroup}&fileId=${item.filePath}">
                                </a>
                            </td>
                            <td class="cel">
                            <fmt:formatDate value="${item.mtime}" pattern="yyyy-MM-dd HH:mm "/>
                            <td>
                                <a data-toggle="modal" class="btn btn-primary btn-xs" onclick="edit(${item.id})"><i class="fa fa-edit"></i>编辑</a>
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
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/insurance/product.js"></script>
</html>
