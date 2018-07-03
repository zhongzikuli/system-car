<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>控制台</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${bankId}"/>
        <input type="hidden" name="orderNo" value="${orderNo}"/>
        <input type="hidden" name="keyword" value="${keyword}"/>
        <input type="hidden" name="orderStatus" value="${orderStatus}"/>
        <input type="hidden" name="glOrderStatus" value="${glOrderStatus}"/>
        <input type="hidden" name="departmentId" value="${departmentId}"/>
        <input type="hidden" name="departmentParentId" value="${departmentParentId}"/>
        <input type="hidden" name="cStartDate" value="${cStartDate}"/>
        <input type="hidden" name="cEndDate" value="${cEndDate}"/>
        <input type="hidden" name="creditQuery" value="${creditQuery}"/>
        <input type="hidden" name="orderInput" value="${orderInput}"/>
        <input type="hidden" name="lastInput" value="${lastInput}"/>
        <input type="hidden" name="lastPass" value="${lastPass}"/>
        <input type="hidden" name="advanceQuery" value="${advanceQuery}"/>
        <input type="hidden" name="contractQuery" value="${contractQuery}"/>
        <input type="hidden" name="bankQuery" value="${bankQuery}"/>
        <input type="hidden" name="bankPayQuery" value="${bankPayQuery}"/>
        <input type="hidden" name="bankRefundQuery" value="${bankRefundQuery}"/>
        <input type="hidden" name="mortgageQuery" value="${mortgageQuery}"/>
        <input type="hidden" name="insuranceQuery" value="${insuranceQuery}"/>
        <input type="hidden" name="plateNumber" value="${plateNumber}"/>
        <input type="hidden" name="startTime" value="${startTime}"/>
        <input type="hidden" name="endTime" value="${endTime}"/>
        <input type="hidden" name="buyerName" value="${buyerName}"/>
        <input type="hidden" name="cardNo" value="${cardNo}"/>
        <input type="hidden" name="contractNo" value="${contractNo}"/>
        <input type="hidden" name="departmentName" value="${departmentName}"/>
        <input type="hidden" name="creditPerson" value="${creditPerson}"/>
        <input type="hidden" name="driverLicneseOwner" value="${driverLicneseOwner}"/>
        <input type="hidden" name="realName" value="${realName}"/>
        <input type="hidden" name="tel" value="${tel}"/>
        <input type="hidden" name="creditSource" value="${creditSource}"/>
        <input type="hidden" name="orderSource" value="${orderSource}"/>
    </div>

    <form id="pagerForm" action="${ctx}/cfBusinessOrderAccept/console.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-1">
                <a class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-11">
                <div class="form-inline simple_query">
                    <input type="hidden" name="departmentId" value="${departmentId}"/>
                    <input type="hidden" name="departmentParentId" value="${departmentParentId}"/>
                    <div class="form-group">
                        <label class="control-label label">订单状态:</label>
                        <select class="form-control" id="orderStatus" name="orderStatus">
                            <option value="">请选择</option>
                            <option value="0" <c:if test="${orderStatus eq '0'}">selected</c:if>>征信提交</option>
                            <option value="1" <c:if test="${orderStatus eq '1'}">selected</c:if>>征信查询</option>
                            <option value="3" <c:if test="${orderStatus eq '3'}">selected</c:if>>初审单提交</option>
                            <option value="4" <c:if test="${orderStatus eq '4'}">selected</c:if>>终审提交</option>
                            <option value="7" <c:if test="${orderStatus eq '7'}">selected</c:if>>终审预通过</option>
                            <option value="12" <c:if test="${orderStatus eq '12'}">selected</c:if>>终审通过</option>
                            <option value="20" <c:if test="${orderStatus eq '20'}">selected</c:if>>财务打款</option>
                            <option value="28" <c:if test="${orderStatus eq '28'}">selected</c:if>>已成交</option>
                            <option value="30" <c:if test="${orderStatus eq '30'}">selected</c:if>>已结清</option>
                            <option value="-2" <c:if test="${orderStatus eq '-2'}">selected</c:if>>退单</option>
                            <option value="-3" <c:if test="${orderStatus eq '-3'}">selected</c:if>>作废</option>
                            <option value="-4" <c:if test="${orderStatus eq '-4'}">selected</c:if>>拒单</option>
                            <option value="w|0" <c:if test="${orderStatus eq 'w|0'}">selected</c:if>>候补资料-未提交</option>
                            <option value="w|1" <c:if test="${orderStatus eq 'w|1'}">selected</c:if>>候补资料-已提交</option>
                            <option value="w|2" <c:if test="${orderStatus eq 'w|2'}">selected</c:if>>候补资料-审核通过</option>
                            <option value="w|3" <c:if test="${orderStatus eq 'w|3'}">selected</c:if>>候补资料-审核保存</option>
                            <option value="w|-2" <c:if test="${orderStatus eq 'w|-2'}">selected</c:if>>候补资料-审核退回</option>
                            <option value="w|-3" <c:if test="${orderStatus eq 'w|-3'}">selected</c:if>>候补资料-审核作废</option>
                            <option value="w|-4" <c:if test="${orderStatus eq 'w|-4'}">selected</c:if>>候补资料-审核拒绝</option>
                            <option value="c|0" <c:if test="${orderStatus eq 'c|0'}">selected</c:if>>提车资料-未提交</option>
                            <option value="c|1" <c:if test="${orderStatus eq 'c|1'}">selected</c:if>>提车资料-已提交</option>
                            <option value="c|2" <c:if test="${orderStatus eq 'c|2'}">selected</c:if>>提车资料-审核通过</option>
                            <option value="c|3" <c:if test="${orderStatus eq 'c|3'}">selected</c:if>>提车资料-审核保存</option>
                            <option value="c|-2" <c:if test="${orderStatus eq 'c|-2'}">selected</c:if>>提车资料-审核退回</option>
                            <option value="c|-3" <c:if test="${orderStatus eq 'c|-3'}">selected</c:if>>提车资料-审核作废</option>
                            <option value="c|-4" <c:if test="${orderStatus eq 'c|-4'}">selected</c:if>>提车资料-审核拒绝</option>
                            <option value="m|0" <c:if test="${orderStatus eq 'm|0'}">selected</c:if>>抵押资料-未提交</option>
                            <option value="m|1" <c:if test="${orderStatus eq 'm|1'}">selected</c:if>>抵押资料-已提交</option>
                            <option value="m|2" <c:if test="${orderStatus eq 'm|2'}">selected</c:if>>抵押资料-审核通过</option>
                            <option value="m|3" <c:if test="${orderStatus eq 'm|3'}">selected</c:if>>抵押资料-审核保存</option>
                            <option value="m|-2" <c:if test="${orderStatus eq 'm|-2'}">selected</c:if>>抵押资料-审核退回</option>
                            <option value="m|-3" <c:if test="${orderStatus eq 'm|-3'}">selected</c:if>>抵押资料-审核作废</option>
                            <option value="m|-4" <c:if test="${orderStatus eq 'm|-4'}">selected</c:if>>抵押资料-审核拒绝</option>
                        </select>
                    </div>
                    <div class="form-group relative">
                        <label class="control-label label">部门:</label>
                        <input type="text" class="form-control" id="departmentTreeId" readonly="readonly" data-id="${departmentId}" data-parnetid="${departmentParentId}" value="${departName}"/>
                        <div id="menuContent" class="menuContent" style="border:1px solid #08e6f5; display: none;position: absolute;padding: 10px;height:300px;">
                            <ul id="departmentTree" class="ztree"></ul>
                        </div>
                   </div>
                    <div class="form-group">
                        <label class="control-label label">搜索:</label>
                        <input type="text" class="form-control" name="keyword"
                               placeholder="请输入客户姓名、身份证号和订单编号" value="${keyword}" onkeyup="value=value.replace(/\s/g,'')" style="width:200px;"/>
                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="simpleQuery()">搜索
                        </button>
                         <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                        <a type="button" class="btn btn-primary btn-sm btn-search">高级查询&nbsp;<i
                                class="fa fa-caret-up"></i></a>
                    </div>
                </div>
                <div class="btn-box animated fadeInRight gl_query">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">征信查询:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="creditQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${creditQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${creditQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">初审提交:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="orderInput">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${orderInput eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${orderInput eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">终审提交:</label>
                               <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="lastInput">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${lastInput eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${lastInput eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">终审通过:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="lastPass">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${lastPass eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${lastPass eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">公司垫款:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="advanceQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${advanceQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${advanceQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">合同收到:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="contractQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${contractQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${contractQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">送交银行:</label>
                               <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="bankQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${bankQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${bankQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">银行放贷:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="bankPayQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${bankPayQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${bankPayQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">银行退单:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="bankRefundQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${bankRefundQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${bankRefundQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">抵押登记:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="mortgageQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${mortgageQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${mortgageQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">首年保险:</label>
                               <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="insuranceQuery">
                                        <option value="">请选择</option>
                                        <option value="1"
                                        <c:if test="${insuranceQuery eq '1'}">selected</c:if>
                                        >是</option>
                                        <option value="0"
                                        <c:if test="${insuranceQuery eq '0'}">selected</c:if>
                                        >否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">初审单来源:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="orderSource">
                                        <option value="">请选择</option>
                                        <option value="0"
                                        <c:if test="${orderSource eq '0'}">selected</c:if>
                                        >PC</option>
                                        <option value="1"
                                        <c:if test="${orderSource eq '1'}">selected</c:if>
                                        >IOS</option>
                                        <option value="2"
                                        <c:if test="${orderSource eq '2'}">selected</c:if>
                                        >Android</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">征信来源:</label>
                               <div class="col-xs-3">
                                    <select class="form-control chosen-select" name="creditSource">
                                        <option value="">请选择</option>
                                        <option value="0"
                                        <c:if test="${creditSource eq '0'}">selected</c:if>
                                        >PC</option>
                                        <option value="1"
                                        <c:if test="${creditSource eq '1'}">selected</c:if>
                                        >IOS</option>
                                        <option value="2"
                                        <c:if test="${creditSource eq '2'}">selected</c:if>
                                        >Android</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">身份证号:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="cardNo" name="cardNo" class="form-control"
                                           value="${cardNo}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">合同号:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="contractNo" name="contractNo" class="form-control"
                                           value="${contractNo}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">创建日期:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="startTime" name="startTime" value="${startTime}"
                                           class="form-control" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">结束日期:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="endTime" name="endTime" value="${endTime}"
                                           class="form-control" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">客户名称:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="buyerName" name="buyerName" class="form-control"
                                           value="${buyerName}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">部门:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="departmentName" name="departmentName"
                                           class="form-control" value="${departmentName}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">信贷专员:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="creditPerson" name="creditPerson" class="form-control"
                                           value="${creditPerson}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">行驶证车主:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="driver_licnese_owner" name="driverLicneseOwner"
                                           class="form-control"
                                           value="${driverLicneseOwner}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">担保人/配偶:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="realName" name="realName" class="form-control"
                                           value="${realName}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">手机号:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="tel" name="tel" class="form-control" value="${tel}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-1 control-label">车牌号:</label>
                                <div class="col-xs-3">
                                    <input type="text" id="plateNumber" name="plateNumber" class="form-control"
                                           value="${plateNumber}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-xs-1 control-label">银行:</label>
                                <div class="col-xs-3">
                                    <select class="form-control chosen-select" id="bankId" name="bankId">
                                        <option value="">请选择</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <option value="${bank.id}" <c:if test="${bank.id eq bankId}">selected</c:if>>
                                                ${bank.bankName}
                                            </option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-1">订单状态:</label>
                                <div class="col-xs-3">
                                <select class="form-control chosen-select"  name="glOrderStatus">
                                    <option value="">请选择</option>
                                    <option value="0" <c:if test="${glOrderStatus eq '0'}">selected</c:if>>征信提交</option>
                                    <option value="1" <c:if test="${glOrderStatus eq '1'}">selected</c:if>>征信查询</option>
                                    <option value="3" <c:if test="${glOrderStatus eq '3'}">selected</c:if>>初审单提交</option>
                                    <option value="4" <c:if test="${glOrderStatus eq '4'}">selected</c:if>>终审提交</option>
                                    <option value="7" <c:if test="${glOrderStatus eq '7'}">selected</c:if>>终审预通过</option>
                                    <option value="12" <c:if test="${glOrderStatus eq '12'}">selected</c:if>>终审通过</option>
                                    <option value="20" <c:if test="${glOrderStatus eq '20'}">selected</c:if>>财务打款</option>
                                    <option value="28" <c:if test="${glOrderStatus eq '28'}">selected</c:if>>已成交</option>
                                    <option value="30" <c:if test="${glOrderStatus eq '30'}">selected</c:if>>已结清</option>
                                    <option value="-2" <c:if test="${glOrderStatus eq '-2'}">selected</c:if>>退单</option>
                                    <option value="-3" <c:if test="${glOrderStatus eq '-3'}">selected</c:if>>作废</option>
                                    <option value="-4" <c:if test="${glOrderStatus eq '-4'}">selected</c:if>>拒单</option>
                                    <option value="w|0" <c:if test="${glOrderStatus eq 'w|0'}">selected</c:if>>候补资料-未提交</option>
                                    <option value="w|1" <c:if test="${glOrderStatus eq 'w|1'}">selected</c:if>>候补资料-已提交</option>
                                    <option value="w|2" <c:if test="${glOrderStatus eq 'w|2'}">selected</c:if>>候补资料-审核通过</option>
                                    <option value="w|3" <c:if test="${glOrderStatus eq 'w|3'}">selected</c:if>>候补资料-审核保存</option>
                                    <option value="w|-2" <c:if test="${glOrderStatus eq 'w|-2'}">selected</c:if>>候补资料-审核退回</option>
                                    <option value="w|-3" <c:if test="${glOrderStatus eq 'w|-3'}">selected</c:if>>候补资料-审核作废</option>
                                    <option value="w|-4" <c:if test="${glOrderStatus eq 'w|-4'}">selected</c:if>>候补资料-审核拒绝</option>
                                    <option value="c|0" <c:if test="${glOrderStatus eq 'c|0'}">selected</c:if>>提车资料-未提交</option>
                                    <option value="c|1" <c:if test="${glOrderStatus eq 'c|1'}">selected</c:if>>提车资料-已提交</option>
                                    <option value="c|2" <c:if test="${glOrderStatus eq 'c|2'}">selected</c:if>>提车资料-审核通过</option>
                                    <option value="c|3" <c:if test="${glOrderStatus eq 'c|3'}">selected</c:if>>提车资料-审核保存</option>
                                    <option value="c|-2" <c:if test="${glOrderStatus eq 'c|-2'}">selected</c:if>>提车资料-审核退回</option>
                                    <option value="c|-3" <c:if test="${glOrderStatus eq 'c|-3'}">selected</c:if>>提车资料-审核作废</option>
                                    <option value="c|-4" <c:if test="${glOrderStatus eq 'c|-4'}">selected</c:if>>提车资料-审核拒绝</option>
                                    <option value="m|0" <c:if test="${glOrderStatus eq 'm|0'}">selected</c:if>>抵押资料-未提交</option>
                                    <option value="m|1" <c:if test="${glOrderStatus eq 'm|1'}">selected</c:if>>抵押资料-已提交</option>
                                    <option value="m|2" <c:if test="${glOrderStatus eq 'm|2'}">selected</c:if>>抵押资料-审核通过</option>
                                    <option value="m|3" <c:if test="${glOrderStatus eq 'm|3'}">selected</c:if>>抵押资料-审核保存</option>
                                    <option value="m|-2" <c:if test="${glOrderStatus eq 'm|-2'}">selected</c:if>>抵押资料-审核退回</option>
                                    <option value="m|-3" <c:if test="${glOrderStatus eq 'm|-3'}">selected</c:if>>抵押资料-审核作废</option>
                                    <option value="m|-4" <c:if test="${glOrderStatus eq 'm|-4'}">selected</c:if>>抵押资料-审核拒绝</option>
                                </select>
                                </div>
                            </div>
                            <%--<div class="form-group">
                                <label class="control-label col-xs-1">订单编号:</label>
                                <div class="col-xs-3">
                                    <input type="text" class="form-control" name="orderNo"
                                           placeholder="请输入订单编号" value="${orderNo}" onkeyup="value=value.replace(/\s/g,'')"/>
                                </div>
                            </div>--%>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group group-btn" style="margin-bottom:10px;">
                                <button type="button" class="btn btn-primary btn-sm search-btn" onclick="query()">查询</button>
                                <button type="button" class="btn btn-info  btn-sm reset-btn2">重置</button>
                                <button type="button" class="btn btn-default btn-sm cancel">取消</button>
                            </div>
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
                        <th style="width: 10%">订单编号</th>
                        <th style="width: 5%">占位人</th>
                        <th style="width: 5%">客户名称</th>
                        <th style="width: 5%">身份证号</th>
                        <th style="width: 5%">信贷专员</th>
                        <th style="width: 10%">部门</th>
                        <th style="width: 10%">贷款银行</th>
                        <th style="width: 10%">经销商</th>
                        <th style="width: 5%">贷款金额(元)</th>
                        <th style="width: 7%">订单状态</th>
                        <th style="width: 6%">候补资料</th>
                        <th style="width: 6%">提车资料</th>
                        <th style="width: 6%">抵押资料</th>
                        <th style="width: 8%">公司垫付日期</th>
                        <th style="width: 8%">财务复核日期</th>
                        <th style="width: 8%">征信提交时间</th>
                        <th style="width: 15%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="17">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr target="sid_user" rel="${item.id}">
                            <td class="cel">${item.orderNo}</td>
                            <td class="cel max-120">${item.operationingLoginName}</td>
                            <td class="cel max-120">${item.buyerName}</td>
                            <td class="cel max-120">${item.buyerCardNo}</td>
                            <td class="cel">${item.creditPerson}</td>
                            <td class="cel">${item.departName}</td>
                            <td class="cel">${item.bankName}</td>
                            <td class="cel">${item.dealerName}</td>
                            <td class="cel"><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                            <td class="cel">
                                <sl:OrderStatus showValue="${item.orderStatus}"/>
                            </td>
                            <td class="cel">
                                <c:if test="${item.isWaitingFile == 0}">--</c:if>
                                <c:if test="${item.isWaitingFile != 0}">${item.waitingFileStatusName}</c:if>
                            </td>
                            <td class="cel">
                                ${item.carInfoFileStatusName}
                            </td>
                            <td class="cel">
                                ${item.mortgageFileStatusName}
                            </td>
                            <td class="cel">
                                <sl:format type="date" pattern="yyyy-MM-dd" show="${item.advanceMoneyDate}"/>
                            </td>
                            <td class="cel">
                                <sl:format type="date" pattern="yyyy-MM-dd" show="${item.advanceTime}"/>
                            </td>
                            <td class="cel">
                                <sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.ctime}"/>
                            </td>
                            <td class="btn-cel" style="text-align: center;">
                                <shiro:hasPermission name="order:track">
                                    <a title="订单轨迹" class="btn btn-success btn-xs"
                                       onclick="toOrderTrack('${item.id}','${item.buyerName}')">订单轨迹</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="order:view">
                                    <a title="查看" class="btn btn-info btn-xs detail"
                                       onclick="detail('${item.id}','${item.buyerName}')"><i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
    <%-- 分页表单参数 --%>
    <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp"%>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/order/console.js"></script>
</html>