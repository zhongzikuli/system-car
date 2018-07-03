<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input  type="hidden" name="overdueMoney" value="${paramMap.overdueMoney}">
        <input  type="hidden" name="repayAmountMonth" value="${paramMap.repayAmountMonth}">
        <input  type="hidden" name="totalNum" value="${paramMap.totalNum}">
        <input  type="hidden" name="firstOverDue" value="${paramMap.firstOverDue}">
        <input  type="hidden" name="nameOrId" value="${paramMap.nameOrId}">

        <input  type="hidden" name="repayAmountMonth1" value="${paramMap.repayAmountMonth1}">
        <input  type="hidden" name="overDueBank" value="${paramMap.overDueBank}">
        <input  type="hidden" name="isTelException" value="${paramMap.isTelException}">
        <input  type="hidden" name="isLaw" value="${paramMap.isLaw}">
        <input  type="hidden" name="overDueMonth" value="${paramMap.overDueMonth}">
        <input  type="hidden" name="isAdvancedIncome" value="${paramMap.isAdvancedIncome}">
        <input  type="hidden" name="isOver" value="${paramMap.isOver}">
        <input  type="hidden" name="trailCarStatus" value="${paramMap.trailCarStatus}">
        <input  type="hidden" name="totalNum1" value="${paramMap.totalNum1}">
        <input  type="hidden" name="overdueMoney1" value="${paramMap.overdueMoney1}">
        <input  type="hidden" name="nameOrId1" value="${paramMap.nameOrId1}">
        <input  type="hidden" name="firstOverDue1" value="${paramMap.firstOverDue1}">

    </div>
    <form id="pagerForm" action="${ctx}/urgeWork/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="urgeWork:toUrgeWork">
                    <a title="催缴作业" class="btn btn-primary  btn-sm urgeWork">
                        催缴作业</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="urgeWork:toAdvancedIncome">
                    <a title="代偿管理" class="btn btn-info  btn-sm advancedIncome">
                        代偿管理</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">逾期金额大于:</label>
                        <input type="text" style="width:120px;" class="form-control" name="overdueMoney" onkeyup="value=value.replace(/\s/g,'')"
                               onkeyup="value=value.replace(/\s/g,'')"    id="overdueMoney" value="${paramMap.overdueMoney}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">月还款额大于:</label>
                        <input type="text" style="width:120px;" class="form-control" name="repayAmountMonth" onkeyup="value=value.replace(/\s/g,'')"
                               onkeyup="value=value.replace(/\s/g,'')"    id="repayAmountMonth" value="${paramMap.repayAmountMonth}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">累计逾期次数大于:</label>
                        <input type="text" style="width:100px;" class="form-control" name="totalNum" onkeyup="value=value.replace(/\s/g,'')"
                               onkeyup="value=value.replace(/\s/g,'')"     id="totalNum" value="${paramMap.totalNum}"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">首期逾期:</label>
                        <select class="form-control" id="search-select" name="firstOverDue" >
                            <option value="">请选择</option>
                            <option value="1" <c:if test="${paramMap.firstOverDue == '1'}">selected</c:if>>是</option>
                            <option value="0" <c:if test="${paramMap.firstOverDue == '0'}">selected</c:if>>否</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input type="text" name="nameOrId" class="form-control w-200" onkeyup="value=value.replace(/\s/g,'')"
                               placeholder="请输入客户姓名或身份证号" id="nameOrId" value="${paramMap.nameOrId}">
                        <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
                        <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                        <a class="btn btn-primary btn-sm btn-search">高级查询&nbsp;<i class="fa fa-caret-up"></i></a>
                    </div>
                </div>

                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">逾期银行:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="overDueBank" name="overDueBank">
                                        <option value="">请选择</option>
                                        <c:forEach items="${bankList}" var="bank">
                                            <option value="${bank.id}"
                                                    <c:if test="${bank.id eq paramMap.overDueBank}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">电催异常:</label>
                                <div class="col-xs-8">
                                    <select name="isTelException" class="form-control" id="isTelException">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.isTelException == '1'}">selected</c:if>>是</option>
                                        <option value="0" <c:if test="${paramMap.isTelException == '0'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">诉讼:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="isLaw" name="isLaw">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.isLaw == '1'}">selected</c:if>>是</option>
                                        <option value="0" <c:if test="${paramMap.isLaw == '0'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">月还款额大于:</label>
                                <div class="col-xs-8">
                                    <input type="text" class="form-control" name="repayAmountMonth1"
                                     onkeyup="value=value.replace(/\s/g,'')"    value="${paramMap.repayAmountMonth1}"  id="repayAmountMonth1" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">逾期月份:</label>
                                <div class="col-xs-8">
                                    <input type="hidden" id="year-month-hidden" value="${paramMap.overDueMonth}">
                                    <select name="overDueMonth" class="form-control" id="search-month">
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">代偿:</label>
                                <div class="col-xs-8">
                                    <select name="isAdvancedIncome" class="form-control" id="isAdvancedIncome" name="isAdvancedIncome">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.isAdvancedIncome == '1'}">selected</c:if>>是</option>
                                        <option value="2" <c:if test="${paramMap.isAdvancedIncome == '2'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">销账:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="isOver" name="isOver">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.isOver == '1'}">selected</c:if>>是</option>
                                        <option value="0" <c:if test="${paramMap.isOver == '0'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">累计逾期:</label>
                                <div class="col-xs-8">
                                    <input type="text" class="form-control" name="totalNum1"
                                           onkeyup="value=value.replace(/\s/g,'')"      value="${paramMap.totalNum1}"   id="totalNum1" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">首期逾期:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="firstOverDue1" name="firstOverDue1">
                                        <option value="">请选择</option>
                                        <option value="1" <c:if test="${paramMap.firstOverDue1 == '1'}">selected</c:if>>是</option>
                                        <option value="0" <c:if test="${paramMap.firstOverDue1 == '0'}">selected</c:if>>否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">拖车状态:</label>
                                <div class="col-xs-8">
                                    <select class="form-control" id="isSettle" name="trailCarStatus">
                                            <option value="">请选择</option>
                                            <option value="1" <c:if test="${paramMap.trailCarStatus == 1}"> selected="selected"</c:if> >拖车</option>
                                            <option value="2" <c:if test="${paramMap.trailCarStatus == 2}"> selected="selected"</c:if> >已结清</option>
                                            <option value="3" <c:if test="${paramMap.trailCarStatus == 3}"> selected="selected"</c:if> >其他</option>
                                            <option value="4" <c:if test="${paramMap.trailCarStatus == 4}"> selected="selected"</c:if> >提交报备</option>
                                            <option value="5" <c:if test="${paramMap.trailCarStatus == 5}"> selected="selected"</c:if> >移交拖车</option>
                                            <option value="6" <c:if test="${paramMap.trailCarStatus == 6}"> selected="selected"</c:if> >关注还款</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">逾期金额大于:</label>
                                <div class="col-xs-8">
                                    <input type="text" class="form-control" name="overdueMoney1"
                                           onkeyup="value=value.replace(/\s/g,'')"      value="${paramMap.overdueMoney1}"    id="overdueMoney1" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input id="nameOrId1" onkeyup="value=value.replace(/\s/g,'')"   type="text" class="form-control" placeholder="请输入客户姓名或身份证号" name="nameOrId1" value="${paramMap.nameOrId1}">
                                </div>
                            </div>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">搜索</button>
                                <button type="button" class="btn btn-info  btn-sm reset-btn1">重置</button>
                            </div>
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
                    <th style="width:2%;"></th>
                    <th style="width: 2%">序号</th>
                    <th style="width: 2%">首期逾期</th>
                    <th style="width: 2%">电催异常</th>
                    <th style="width: 3%">代偿</th>
                    <th style="width: 3%">拖车状态</th>
                    <th style="width: 6%">诉讼</th>
                    <th style="width: 6%">销账</th>
                    <th style="width: 7%">催缴状态</th>
                    <th style="width: 3%">催缴时间</th>
                    <th style="width: 6%">客户姓名</th>
                    <th style="width: 8%">身份证号</th>
                    <th style="width: 5%">手机号码</th>
                    <th style="width: 7%">银行卡号</th>
                    <th style="width: 3%">银行</th>
                    <th style="width: 3%">月还款额(元)</th>
                    <th style="width: 3%">逾期月份</th>
                    <th style="width: 3%">逾期金额(元)</th>
                    <th style="width: 3%">累计逾期次数</th>
                    <th style="width: 3%">上传逾期时间</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="20">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td><input type="radio" class="checkOne" name="urgeWorkInput" value="${item.id}" bankCardNo="${item.bankCardNo}" cardNo="${item.cardNo}" bankId="${item.bankId}" customerName="${item.customerName}"></td>
                        <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                        <td class="cel">
                            <c:if test="${item.isFirstOverdue == 1}">
                                <code>是</code>
                            </c:if>
                            <c:if test="${item.isFirstOverdue != 1}">
                                <code class="alert-success">否</code>
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${item.isTelException gt 0}">
                                <code>是</code>
                            </c:if>
                            <c:if test="${item.isTelException == 0}">
                                <code class="alert-success">否</code>
                            </c:if>
                            <c:if test="${empty item.isTelException}">
                                --
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${item.isAdvancedIncome > 0}">
                                <code>是</code>
                            </c:if>
                            <c:if test="${item.isAdvancedIncome <= 0}">
                                <code class="alert-success">否</code>
                            </c:if>
                            <c:if test="${empty item.isAdvancedIncome}">
                                --
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${item.trailCarStatus ==1}">
                                <code class="alert-success">已拖车</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus == 2}">
                                <code class="alert-success">已结清</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus == 3}">
                                <code class="alert-success">其他</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus == 4}">
                                <code class="alert-success">提交报备</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus == 5}">
                                <code class="alert-success">移交拖车</code>
                            </c:if>
                            <c:if test="${item.trailCarStatus == 6}">
                                <code class="alert-success">关注还款</code>
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${item.isLaw >0}">
                                <code>是</code>
                            </c:if>
                            <c:if test="${ item.isLaw <=0}">
                                <code class="alert-success">否</code>
                            </c:if>
                            <c:if test="${empty item.isLaw}">
                                --
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${item.isOver == 0 }">
                                <code>未销账</code>
                            </c:if>
                            <c:if test="${item.isOver == 1 }">
                                <code class="alert-success">已销账</code>
                            </c:if>
                            <c:if test="${empty item.isOver}">
                                --
                            </c:if>
                        </td>
                        <td class="cel">
                            <c:if test="${ empty item.urgeStatus }">--</c:if>
                            <c:if test="${item.urgeStatus == 1}">已完成</c:if>
                            <c:if test="${item.urgeStatus == 2}">催缴中</c:if>
                            <c:if test="${item.urgeStatus == 3}">承诺还款</c:if>
                             <c:if test="${item.urgeStatus == 4}">已拖车</c:if>
                        </td>
                        <td>
                            <fmt:formatDate value="${item.urgeDate}" pattern="yyyy-MM-dd HH:mm "/>
                        </td>
                        <td class="cel">${item.customerName}</td>
                        <td class="cel">${item.cardNo}</td>
                        <td class="cel">${item.tel}</td>
                        <td class="cel">${item.bankCardNo}</td>
                        <td class="cel">${item.bankName}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.repayMonth}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">${item.overdueMonth}</td>
                        <td class="cel">
                            <sl:format type="number" show="${item.overdueMoney}" pattern="#,##0.00"/>
                        </td>
                        <td class="cel">${item.totalNum}</td>
                        <td>
                            <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm "/>
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
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/DateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/assetProtection/urgeWorkList.js"></script>
</html>