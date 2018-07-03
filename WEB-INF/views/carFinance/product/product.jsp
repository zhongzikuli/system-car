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
    <div id="hiddenForm">
        <input type="hidden" name="productName" value="${paramMap.productName}"/>
        <input type="hidden" name="orderNo" value="${paramMap.orderNo}"/>
    </div>

    <form id="pagerForm" action="${ctx}/product/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="product:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="insertProduct()">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="product:delete">
                    <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteProduct()">删除</a>
                    </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">排序:</label>
                        <input type="text" class="form-control" name="orderNo" id="orderNo" value="${paramMap.orderNo}">
                    </div>
                    <div class="form-group">
                        <div class="form-group">
                            <label class="control-label label">产品名称:</label>
                            <input type="text" class="form-control" name="productName" id="productName"
                                   onkeyup="value=value.replace(/\s/g,'')"   value="${paramMap.productName}">
                            <button type="button" class="btn btn-sm btn-primary" onclick="searchSubmit()">搜索</button>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll"></th>
                        <th style="width:16%;">产品名称</th>
                        <th style="width:15%;">创建时间</th>
                        <th style="width:15%;">备注</th>
                        <th style="width:5%;">排序</th>
                        <th style="width:12%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="6">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="product_input" value="${item.id}"></td>
                            <td class="cel">${item.productName}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm "/>
                            </td>
                            <td class="cel">${item.remark}</td>
                            <td class="cel">${item.orderNo}</td>
                            <td class="btn-cel">
                                <shiro:hasPermission name="product:toEdit">
                                <a data-toggle="modal" class="btn btn-primary btn-xs"
                                   onclick="editProduct('${item.id}')"><i class="fa fa-edit"></i>编辑</a>
                                </shiro:hasPermission>

                                <a data-toggle="modal" class="btn btn-info btn-xs detail"
                                   onclick="detailProduct('${item.orderNo}','${item.productName}','${item.remark}')">
                                   <i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/carFinance/product/product.js"></script>
<script type="text/template" title="新增" id="product-dialog">
    <div class="ibox-content">
        <form id="productForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>产品名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="productName" id="product_Name"
                               check="ProductForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序号:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="orderNo" id="order_No"
                               check="ProductForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red"></span>备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="remark"
                              >
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
<script type="text/template" title="编辑" id="productEdit-dialog">
    <div class="ibox-content">
        <form id="productEditForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>产品名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="productNameEdlit" id="productNameEdlit"
                               check="ProductForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
            <div class="col-sm-12">
                <label class="col-xs-3 control-label"><span class="red">*</span>排序号:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="orderNoEdit" id="orderNoEdit"
                           check="ProductForm(this)">
                </div>
            </div>
        </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red"></span>备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remarkEdit" id="remarkEdit"
                               check="ProductForm(this)">
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
<script type="text/template" title="查看" id="productDetail-dialog">
    <div class="ibox-content">
        <form id="productDetailForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">产品名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="productNameEdlit" id="productNameDetail"
                               readonly>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">排序号:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control"  id="orderNoDetail"
                               readonly>
                    </div>
                </div>
            </div>
            <div class="form-group">
            <div class="col-sm-12">
                <label class="col-xs-3 control-label">备注:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"  id="Detailremark"
                           readonly>
                </div>
            </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
