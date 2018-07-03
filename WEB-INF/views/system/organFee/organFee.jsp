<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
        <input type="hidden" id="orgId" value="${orgId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/sysOrganFee/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
        <div class="table-responsive full-height">
            <table class="table table-hover table-height table-striped">
                <thead>
                <tr>
                    <th style="width:5%;">序号</th>
                    <th style="width:30%;">费用类型</th>
                    <th style="width:20%;">成本价(元/笔)</th>
                    <th style="width:20%;">收费价元/笔</th>
                    <th style="width:10%;">操作</th>
                </tr>
                </thead>
                <tbody>

                  <tr>
                      <td>1</td>
                      <td>订单</td>
                      <td>${order.originalFee}</td>
                      <td>${order.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs order" data-feeType="1"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>

                  <tr>
                      <td>2</td>
                      <td>同盾策略</td>
                      <td>${tongdunStrategy.originalFee}</td>
                      <td>${tongdunStrategy.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs tongdunStrategy" data-feeType="2"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>

                  <tr>
                      <td>3</td>
                      <td>同盾手机在网时长</td>
                      <td>${tongdunNetTime.originalFee}</td>
                      <td>${tongdunNetTime.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs tongdunNetTime" data-feeType="3"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>

                  <tr>
                      <td>4</td>
                      <td>百融策略</td>
                      <td>${bairongStatery.originalFee}</td>
                      <td>${bairongStatery.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs bairongStatery"   data-feeType="4"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>

                  <tr>
                      <td>5</td>
                      <td>百融手机在网时长</td>
                      <td>${bairongNetTime.originalFee}</td>
                      <td>${bairongNetTime.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs bairongNetTime"  data-feeType="5"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>

                  <tr>
                      <td>6</td>
                      <td>百融手机三要素核验</td>
                      <td>${bairongTelThird.originalFee}</td>
                      <td>${bairongTelThird.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs bairongTelThird"  data-feeType="6"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>

                  <tr>
                      <td>7</td>
                      <td>百融自然人征信查询</td>
                      <td>${bairongPerson.originalFee}</td>
                      <td>${bairongPerson.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs bairongPerson"  data-feeType="7"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>
				   <tr>
                      <td>8</td>
                      <td>身份证网格照</td>
                      <td>${idCardPhoto.originalFee}</td>
                      <td>${idCardPhoto.saleFee}</td>
                      <td>
                          <a href="#"  class="btn btn-primary btn-xs idCardPhoto"  data-feeType="8"  >
                              <i class="fa fa-edit"></i>设置</a>
                      </td>
                  </tr>
                  
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/system/organFee/organFee.js"></script>
<script type="text/template" title="设置" id="organFee-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="organFeeForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>成本价(元):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"   reg="float" name="originalFee" id="originalFee">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>收费价(元):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control"  reg="float"  name="saleFee" id="saleFee">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>




