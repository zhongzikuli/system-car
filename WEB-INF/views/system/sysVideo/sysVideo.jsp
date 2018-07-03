<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>APP更新管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="title" value="${paramMap.title}"/>
        <input type="hidden" name="type" value="${paramMap.type}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}"/>
        <input type="hidden" name="endDate" value="${paramMap.endDate}"/>
    </div>
    <form id="pagerForm" action="${ctx}/sysVideo/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="appUpload()">新建</a>
                <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteApp()">删除</a>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">行业视频类型:</label>
                    <sl:select name="type" classValue="form-control creditStatusCode status" classType="650000"
                                       defaultValue="true" id="type" keyWorld="${paramMap.type}"/>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label label">上传时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startDate" 
                                   id="search-app-start-date" value="${paramMap.startDate}"/>
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control" name="endDate"
                                   id="search-app-end-date" value="${paramMap.endDate}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">视频标题:</label>
                        <input type="text" class="form-control" name="title" id="search-app-name"
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
	                        <th style="width:10%;">视频标题</th>
	                        <th style="width:2%;">视频类型</th>
	                        <th style="width:20%;">播放次数</th>
	                        <th style="width:5%;">点赞数量</th>
	                        <th style="width:8%;">收藏数量</th>
	                        <th style="width:5%;">上传时间</th>
	                        <th style="width:5%;">是否推荐</th>
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
                            <td class="cel">${item.title}</td>
                            <td class="cel"><sl:dict classType="650000" keyWorld="${item.type}"/></td>
                            <td class="cel">${item.playNumber}</td>
                            <td class="cel">${item.upvoteNumber}</td>
                            <td class="cel">${item.favoriteNumber}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </td>
                            <c:if test="${item.isRecommand =='1'}">
                                <td class="cel">是</td>
                            </c:if>
                            <c:if test="${item.isRecommand =='0'}">
                                <td class="cel">否</td>
                            </c:if>

                             <td class="btn-cel">
                            	<a title="评估" class="btn btn-primary btn-xs"
                                   onclick="editVideo('${item.id}')">
                                    <i class="fa fa-edit">编辑</i></a>
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
<script type="text/javascript" src="${ctx}/js/mine/system/sysVideo/list.js"></script>
</html>