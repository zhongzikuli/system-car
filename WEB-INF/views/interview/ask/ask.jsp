<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>问题管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/ask/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <shiro:hasPermission name="ask:create">
                    <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="askCreate()">新增</a>
                </shiro:hasPermission>
            </div>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">类别:</label>
                        <select class="form-control type" id="search-select" name="type">
                            <option value="1"<c:if test="${'1' eq type}">selected</c:if>>启用</option>
                            <option value="0"<c:if test="${'0' eq type}">selected</c:if>>禁用</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
             <div class="table-responsive full-height" id="question-list">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:25%;">内容</th>
                        <th style="width:4%;">排序</th>
                        <th style="width:5%;">更新时间</th>
                        <th style="width:4%;">是否有效</th>
                        <th style="width:4%;">是否必答</th>
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
                                <input type="checkbox" class="checkOne" name="askList_input" value="${item.id}">
                            </td>
                            <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td class="desc">${item.content}</td>
                            <td class="cel">${item.sortno}</td>
                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="cel">
                                <c:if test="${item.isvalid =='1'}">有效</c:if>
                                <c:if test="${item.isvalid =='0'}">无效</c:if>
                            </td>
                            <td class="cel">
                                <c:if test="${item.isRequired =='1'}">必答</c:if>
                                <c:if test="${item.isRequired =='0'}">选答</c:if>
                            </td>
                            <td>
                            	<shiro:hasPermission name="ask:update">
                                        <a href="#"
                                           onclick="editAsk('${item.id}','${pageBean.currentPage}','${pageBean.numPerPage} ')"
                                           class="btn btn-primary btn-xs"><i class="fa fa-edit"></i>编辑</a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="ask:view">
                                        <a href="#" onclick="detailAsk('${item.id}')"
                                           class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                                    </shiro:hasPermission>
                                    <c:if test="${item.isvalid =='1'}">
                                        <a href="#" class="btn btn-danger btn-xs down-btn" data-id="${item.id}" data-status="0"><i class="fa fa-edit"></i>禁用</a>
                                    </c:if>
                                    <c:if test="${item.isvalid =='0'}">
                                        <a href="#" class="btn btn-primary btn-xs up-btn" data-id="${item.id}" data-status="1"><i class="fa fa-edit"/></i>启用</a>
                                    </c:if>
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
<script type="text/javascript" src="${ctx}/js/mine/interview/ask/list.js"></script>
<script type="text/template" title="新增" id="askCreate-dialog">
    <div class="ibox-content">
        <form id="askCreateForm" class="form-horizontal">
            <div class="row">
                <div class="col-md-7">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>问题内容:</label>
                    <div class="col-xs-8">
		             <textarea rows="3" cols="20" type="text" class="form-control" id="ask-content"
                               name="remark" tip="问题内容不能为空" check="validAskForm(this)" value=""></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>是否必答:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="问题类型不能为空">
                            <select id="ask-type"  class="type-chosen-select form-control"
                                    name="type" check="validAskForm(this)">
                                <option value="">请选择</option>
                                <option value="1">必答</option>
                                <option value="0">选答</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="ask-sortno" tip="问题排序不能为空"
                               check="validAskForm(this)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="ask-remark" tip="问题备注不能为空"
                               check="validAskForm(this)">
                    </div>
                </div>
            </div>
                <div class="col-md-5 text-left">
                    <span class="red " >关键字匹配说明:</span>
                    <br>
                    1 .: 姓名<span class="red">&#35{customerName}</span>对应贷款人姓名
                    <br>
                    2.:主品牌名称<span class="red">&#35{brandName}</span>对应车型的主品牌
                    <br>
                    3.:生日<span class="red">&#35{birthday}</span>根据购车人身份证号计算
                    <br>
                    4.:身份证后六位<span class="red">&#35{lastSix}</span>根据购车人身份证后六位
                    <br>
                    5.:贷款期限<span class="red">&#35{loanTimeLimit}</span>去具体的车贷贷款期限
                    <br>
                    6.:现住地址<span class="red">&#35{address}</span>取现住省市区详细地址
                    <br>
                    7.:银行<span class="red">&#35{bankName}</span>对应组织单位名称
                    <br>
                    8.:总车价<span class="red">&#35{auditCarPrice}</span>对应审核车价
                    <br>
                    9.:分期金额<span class="red">&#35{installmentPayMoney}</span>对应分期金额
                    <br>
                    10.:公司账户<span class="red">&#35{orgName}</span>对应初审单的组织单位名称
                    <br>
                    11.:工作单位<span class="red">&#35{companyName}</span>对应购车人的单位地址
                    <br>
                    12.:交易总价<span class="red">&#35{auditCarPrice}</span>对应初审单的审核车价
                    <br>
                    13.:首付款<span class="red">&#35{actualFirstPay}</span>对应初审单的实际首付款(含高息)
                    <br>
                    14.:首付款<span class="red">&#35{actualFirstPayExcludeInterest}</span>对应初审单的实际首付款(不含高息)
                    <br>
                    15.:申请透支金额<span class="red">&#35{actualLoadMoney}</span>对应初审单的实际贷款额
                    <br>
                    16.:合计透支金额<span class="red">&#35{contractCarPrice}</span>对应初审单的合同车价
                    <br>
                    17.:月还款额<span class="red">&#35{repayMonth}</span>对应初审单的月还款额
                    <br>
                    18.:合同价<span class="red">&#35{contractPrice}</span>对应初审单的合同价
                    <br>
                    19.:身份证号<span class="red">&#35{cardNo}</span>对应购车人身份证号
                    <br>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>

        </form>
    </div>
</script>
<script type="text/template" title="查看" id="askView-dialog">
    <div class="ibox-content">
        <form id="askViewForm" class="form-horizontal">
            <div  style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label">问题内容:</label>
                    <div class="col-xs-8">
                       <textarea rows="3" cols="20" type="text" class="form-control" id="ask-view-content"
                                  name="remark" readonly value=""></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>是否必答:</label>
                    <div class="col-xs-8">
                        <div obj="" >
                            <select id="ask-view-type" class="type-chosen-select form-control"
                                disabled="disabled"  name="type" check="validAskForm(this)">
                                <option value="">请选择</option>
                                <option value="1">必答</option>
                                <option value="0">选答</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" readonly name="remark" id="ask-view-sortno">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" readonly name="remark" id="ask-view-remark">
                    </div>
                </div>

            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
<script type="text/template" title="编辑" id="askEdit-dialog">
    <div class="ibox-content">
        <form id="askEditForm" class="form-horizontal">
            <div class="row">
                <div class="col-md-7">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>问题内容:</label>
                    <div class="col-xs-8">
							<textarea rows="3" cols="20" type="text" class="form-control" name="remark" 
                                      id="ask-edit-content" check="validAskEditForm(this)"  value=""></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>是否必答:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="问题类型不能为空">
                            <select  id="ask-edit-type" class="type-chosen-select form-control"
                                     name="type" check="validAskEditForm(this)">
                                <option value="">请选择</option>
                                <option value="1">必答</option>
                                <option value="0">选答</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="ask-edit-sortno"
                               check="validAskEditForm(this)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="remark" id="ask-edit-remark"
                               check="validAskEditForm(this)">
                    </div>
                </div>
                </div>
                <div class="col-md-5 text-left">
                    <span class="red " >关键字匹配说明:</span>
                    <br>
                    1 .: 姓名<span class="red">&#35{customerName}</span>对应贷款人姓名
                    <br>
                    2.:主品牌名称<span class="red">&#35{brandName}</span>对应车型的主品牌
                    <br>
                    3.:生日<span class="red">&#35{birthday}</span>根据购车人身份证号计算
                    <br>
                    4.:身份证后六位<span class="red">&#35{lastSix}</span>根据购车人身份证后六位
                    <br>
                    5.:贷款期限<span class="red">&#35{loanTimeLimit}</span>去具体的车贷贷款期限
                    <br>
                    6.:现住地址<span class="red">&#35{address}</span>取现住省市区详细地址
                    <br>
                    7.:银行<span class="red">&#35{bankName}</span>对应组织单位名称
                    <br>
                    8.:总车价<span class="red">&#35{auditCarPrice}</span>对应审核车价
                    <br>
                    9.:分期金额<span class="red">&#35{installmentPayMoney}</span>对应分期金额
                    <br>
                    10.:公司账户<span class="red">&#35{orgName}</span>对应初审单的组织单位名称
                    <br>
                    11.:工作单位<span class="red">&#35{companyName}</span>对应购车人的单位地址
                    <br>
                    12.:交易总价<span class="red">&#35{auditCarPrice}</span>对应初审单的审核车价
                    <br>
                    13.:首付款<span class="red">&#35{actualFirstPay}</span>对应初审单的实际首付款(含高息)
                    <br>
                    14.:首付款<span class="red">&#35{actualFirstPayExcludeInterest}</span>对应初审单的实际首付款(不含高息)
                    <br>
                    15.:申请透支金额<span class="red">&#35{actualLoadMoney}</span>对应初审单的实际贷款额
                    <br>
                    16.:合计透支金额<span class="red">&#35{contractCarPrice}</span>对应初审单的合同车价
                    <br>
                    17.:月还款额<span class="red">&#35{repayMonth}</span>对应初审单的月还款额
                    <br>
                    18.:合同价<span class="red">&#35{contractPrice}</span>对应初审单的合同价
                    <br>
                    19.:身份证号<span class="red">&#35{cardNo}</span>对应购车人身份证号
                    <br>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>
</html>