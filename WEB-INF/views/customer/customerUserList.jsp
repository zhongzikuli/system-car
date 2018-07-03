<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="tel" value="${paramMap.tel}"/>
    </div>
    <form id="pagerForm" action="${ctx}/customer/listPage.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">手机号码:</label>
                        <input type="text" name="tel" class="form-control"
                               id="tel" value="${paramMap.tel}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">姓名:</label>
                        <input type="text" name="name" class="form-control"
                               id="name" value="${paramMap.name}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">注册日期:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="startDate"
                                       id="customer-user-search-start-date" value="${paramMap.startDate}"/>
                                <span class="input-group-addon">-</span>
                                <input type="text" class="form-control" name="endDate"
                                       id="customer-user-search-end-date" value="${paramMap.endDate}"/>
                            </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:5%;">序号</th>
                    <th style="width:10%;">手机号</th>
                    <th style="width:10%;">名称</th>
                    <th style="width:15%;">身份证号</th>
                    <th style="width:10%;">注册时间</th>
                    <th style="width:15%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="8">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td>${item.tel}</td>
                        <td>${item.name}</td>
                        <td>${item.cardNo}</td>
                        <td>
                            <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                        </td>
                        <td class="btn-cel" style="padding-left: 98px;">
                            <shiro:hasPermission name="customerUser:detail">
                                <a href="#" class="btn btn-info btn-xs detail" data-id="${item.tel}">
                                    <i class="fa fa-search-plus"></i>查看</a>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="customerUser:delete">
                                <a href="#" class="btn btn-danger btn-xs delete" data-id="${item.tel}">
                                    <i class="fa fa-edit"></i>删除</a>
                            </shiro:hasPermission>
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
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/customer/customerUserList.js"></script>
<script type="text/template" title="查看" id="customerUser-dialog-edit">
    <div class="ibox-content">
        <form id="viewCustomerUserForm" class="form-horizontal" autocomplete="off">
            <div id="viewCustomerUser" class="form-content">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">名称:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-name" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">手机号码:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-tel" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">最后一次登录时间:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-lastLoginTime" readonly class="form-control" ／>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">身份证号:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-cardNo" class="form-control" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">设备号:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-devInfo" class="form-control" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">最后一次登录经度:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="view-customerUser-lastLoginLon" readonly="readonly"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">微信公众号openid:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="view-customerUser-wexinPublicOpenid" readonly="readonly"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">微信账号:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-weixinAccount" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">微信昵称:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-weixinName" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">最后一次登录省:</label>
                        <div class="col-xs-8">
                            <input type="password" id="view-customerUser-lastLoginProvince" readonly
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">最后一次登录市:</label>
                        <div class="col-xs-8">
                            <input type="text" name="tel" id="view-customer-lastLoginCity" readonly="readonly"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">最后一次登录详细地址:</label>
                        <div class="col-xs-8">
                            <input type="text" name="contacts" id="view-customerUser-lastLoginPosition"
                                   readonly="readonly"
                                   autocomplete="off" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">最后一次登录维度:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="view-customerUser-lastLoginLat" readonly="readonly"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">微信小程序openid:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="view-customerUser-miniProgramOpenid" readonly="readonly"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">unionId:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-customerUser-unionId" readonly class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-manage" id="ViewBtn" style="position: absolute;top: 450px;left: 47%;">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
