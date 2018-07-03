<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>订单审核</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="${ctx}/js/third/bootstrap/bootstrap-switch.min.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/radialIndicator/radialIndicator.css">
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="${ctx}/audit/queryForAuditing.action" method="post">
        <input type="hidden" value="${auditUser}" id="auditUser" name="auditUser"/>
        <input type="hidden" value="${acceptOrder.bankId}" id="bankId" name="bankId"/>
        <input type="hidden" value="${auditDate}" id="auditDate" name="auditDate"/>
        <input type="hidden" value="${acceptOrder.id}" id="acceptId" name="acceptId"/>
        <input type="hidden" value="${department}" id="department" name="department"/>
        <input type="hidden" value="${staticUrl}" id="staticUrl" name="staticUrl"/>
        <input type="hidden" value="${acceptOrder.waitingFileInitiator}" id="waitingFileInitiator" name="waitingFileInitiator"/>
        <div class="row">
	        <div class="col-sm-6">
	            <h5><strong>订单审核</strong>
	            <code>&lt;订单编号:${acceptOrder.orderNo}&gt;</code>
	            </h5>
	        </div>
            <div class="col-sm-6 text-right">
             		<div class="form-group">
		                    <label class="control-label label">展示类型:</label>
		                    <div class="switch inline">
		                        <input type="checkbox" id="styleType" data-label-text="标准" checked/>
		                    </div>
		            </div>
                    <c:if test="${not empty goBackUrl}">
	                    <div class="form-group">
	                        	<a class="btn btn-sm btn-info" href="${goBackUrl}">返回列表</a>
	                    </div>
                    </c:if>
            </div>
        </div>
    </form>
</div>
<div class="mod_basic ibox-content car-finance audit-wrapper">
    <div class="item-row">
        <fieldset>
            <legend>基本信息</legend>
            <div id="audit-base-information-list">
                <div class="form-horizontal">
                	<div class="base-con">
                		<div class="base-item">
	                		<label class="col-xs-4 control-label">订单编号:</label>
	                        <div class="col-xs-8">
	                        	<input readonly="readonly" value="${acceptOrder.orderNo}" name="orderNo"
                                                     class="form-control" type="text"></div>
                		</div>
                		<div class="base-item">
	                		<label class="col-xs-4 control-label">部门:</label>
	                        <div class="col-xs-8">
	                        	<input readonly="readonly" value="${acceptOrder.departmentName}"
                                                     name="departName" class="form-control" type="text""></div>
                		</div>
                		<div class="base-item">
	                		<label class="col-xs-4 control-label">经销商:</label>
	                        <div class="col-xs-8">
	                        	<input readonly="readonly" value="${acceptOrder.dealerName}"
                                                     name="dealerName" class="form-control" type="text" title="${acceptOrder.dealerName}"></div>
                		</div>
                		<div class="base-item">
	                		<label class="col-xs-2 control-label">信贷专员:</label>
	                        <div class="col-xs-3">
	                        	<input readonly="readonly" value="${acceptOrder.creditPerson}"
	                                                     name="creditPerson" class="form-control" type="text"></div>
	                        <div class="col-xs-7 text-right">
	                        	<shiro:hasPermission name="orderFile:download">
									<input type="hidden" value="" id ="downloadOrderFile">
								</shiro:hasPermission>
								<shiro:hasPermission name="auditInterviewFile:view">
									<button id="audit-view-interview-file-btn" data-title="" class="pull-left btn btn-sm btn-info"><i class="fa fa-video-camera"></i>&nbsp;面签附件</button>
								</shiro:hasPermission>
	                            <button id="audit-view-order-file-btn" class="pull-left m-l-4  btn btn-sm btn-success"><i class="fa fa-search-plus"></i>&nbsp;订单附件</button>
	                        </div>
                		</div>
                	</div>
                </div>
            </div>
        </fieldset>
    </div>
    <%-- end 基本信息 row --%>

    <div class="item-row">
        <fieldset>
            <legend>审核信息</legend>
            <div id="audit-history-list" class="mod_basic no-bottom"></div>
        </fieldset>
    </div>
    <%-- end 审核信息 row --%>

	<%-- end
    <div class="item-row">
        <fieldset>
            <legend>违法信息</legend>
            <div id="audit-police-history-list"></div>
        </fieldset>
    </div> -- 公安违法犯罪前科查询 row --%>
    
    <%-- end  <div class="item-row">
        <fieldset>
            <legend>学历信息</legend>
            <div id="audit-colleage-history-list"></div>
        </fieldset>
    </div>  -- 学历信息 row --%>
	<%-- end 
    <div class="item-row">
        <fieldset>
            <legend>手机排查</legend>
            <div id="audit-mobile-list"></div>
        </fieldset>
    </div> -- 手机排查 row --%>

    <div class="item-row">
        <fieldset>
            <legend>购车人信息</legend>
            <div id="audit-buyer-information-list"></div>
        </fieldset>
    </div>
    <%-- end 购车人信息 row --%>

    <div class="item-row">
        <fieldset>
            <legend>配偶信息</legend>
            <div id="audit-parter-information-list"></div>
        </fieldset>
    </div>
    <%-- end 配偶信息 row --%>

    <div class="item-row">
        <div id="audit-sponsor-information-list"></div>
    </div>
    <%-- end 担保人信息 row --%>
	<div class="item-row">
        <fieldset>
            <legend>征信信息</legend>
            <div id="audit-credit-list" class="mod_basic no-bottom"></div>
        </fieldset>
    </div>
    <%-- end 征信信息 row --%>

    <div class="item-row">
        <fieldset>
            <legend>大数据征信</legend>
            <div class="clear mod_basic no-bottom b-0">
	            <div class="row mr-none">
	            	<shiro:hasPermission name="audit:queryTDData">
		                <button class="btn btn-primary btn-xs query-credit-btn" type="button">征信查询</button>
	            	</shiro:hasPermission>
	                <button class="btn btn-info btn-xs detail-credit-btn" type="button">详情查看</button>
	             </div>
            </div>
            <div id="audit-big-data-list" class="clear mod_basic no-bottom"></div>
        </fieldset>
    </div>
    
    
    <%--
     <c:if test="${not empty acceptOrder.runAutoAudit && acceptOrder.runAutoAudit eq 1}"></c:if>
     --%>
   	<div class="item-row">
		<fieldset>
			<legend>自动化审批</legend>
			<div class="clear mod_basic no-bottom b-0">
				<div class="row mr-none" id="detail-credit-wrap">
					<button class="btn btn-info btn-xs auto-credit-btn" type="button">详情查看</button>
				</div>
			</div>
			<div id="auto-audit-list" class="mod_basic no-bottom"></div>
		</fieldset>
	</div>
	

	<c:if test="${not empty acceptOrder.specialApplyBak}">
		<div class="item-row">
			<fieldset>
				<legend>通融申请</legend>
				<div class="padding-15">
					<h5>情况说明：</h5>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;${acceptOrder.specialApplyBak}</p>
				</div>
			</fieldset>
		</div>
	</c:if>
	
    <div class="item-row">
        <fieldset>
            <legend>历史订单</legend>
            <div id="audit-history-order-list" class="mod_basic no-bottom"></div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>视频面签</legend>
            <input type="hidden" id="video_url" value=""/>
            <div id="audit-video-order-list" class="mod_basic no-bottom">
            </div>
        </fieldset>
    </div>
    <%-- end 历史订单 row --%>
    <div class="item-row">
        <fieldset>
            <legend>车辆信息</legend>
            <div id="audit-car-information-list"></div>
        </fieldset>
    </div>
    <%-- end 车辆信息 row --%>

    <div class="item-row">
        <fieldset>
            <legend>垫款申请</legend>
            <div id="audit-apply-pay-list"></div>
        </fieldset>
    </div>
    <%-- end 垫款申请 row --%>
    
    <div class="item-row"  id="audit-suggestion-list">
        
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<sl:dictData type="120000,290000,420000,430000,440000,450000,460000,470000,480000,500000,490000,510000,520000,530000"/>
<script type="text/template" title="查看审核详情" id="view-audit-dialog">
    <div class="ibox-content">
        <form id="backCreditForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label">审核类型:</label>
                    <div class="col-sm-4">
                        <input class="form-control" readonly="readonly" type="text" id="auditType">
                    </div>
                    <label class="col-sm-2 control-label">审核结果:</label>
                    <div class="col-sm-4">
                        <input class="form-control" readonly="readonly" type="text" id="auditResult">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label">审核人:</label>
                    <div class="col-sm-4">
                        <input class="form-control" readonly="readonly" type="text" id="auditor">
                    </div>
                    <label class="col-sm-2 control-label">审核时间:</label>
                    <div class="col-sm-4">
                        <input class="form-control" readonly="readonly" type="text" id="auditTime">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label">审核意见:</label>
                    <div class="col-sm-10">
                        <textarea id="auditDescriptionView" readonly="readonly" class="form-control"></textarea>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" id="CreateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>
<script type="text/template" title="查看订单附件" id="view-order-file-dialog">
    <div class="ibox-content form-horizontal">
        <div class="row m">
            <label class="col-md-2 control-label">附件类型:</label>
            <div class="col-md-6">
                <select id="audit-detail-select-file-type" class="form-control">
                    <option value="">全部</option>
                    <option value="1">抵押材料</option>
                    <option value="2">面签材料</option>
                    <option value="3">候补资料</option>
                    <option value="4">车辆信息补录</option>
                    <option value="5">征信材料</option>
                    <option value="6">垫款凭证</option>
                    <option value="7">合同材料</option>
                    <option value="8">其他附件</option>
					<option value="9">过户资料</option>
					<option value="11">支出凭证</option>
                </select>
            </div>
            <div class="col-md-2">
                <button id="download-file-btn" type="button" class="btn btn-w-m btn-primary">
					<i class="fa fa-cloud-download"></i>打包下载
                </button>
            </div>
            <div class="col-md-2 text-right">
                <button id="refresh-file-btn" type="button" class="btn-w-m btn btn-success">
					<i class="fa fa-refresh"></i>刷新
                </button>
            </div>
        </div>
        <div class="m-rl-tb row">
            <div id="file-list" class="clear gallerys"></div>
        </div>
        <div class="m-rl-tb row">
            <div id="pagination" class="pagination" style="position: relative; margin:0; padding:5px 0 0;"></div>
        </div>
        <div class="dialog-manage" id="CreateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>
<script type="text/template" title="视频弹窗" id="btn-showVideo">
    <div class="ibox-content"  id="video-show">
        <video style="border: 4px solid #eee;" id="video" width="750" height="410" controls="controls">
        <source src="" type="video/mp4" />
    您的浏览器不支持视频标签</video>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/jquery/jquery.cookie.js"></script>
<script type="text/javascript" src="${ctx}/js/third/radialIndicator/radialIndicator.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery-photo-gallery/jquery.photo.gallery.js"></script>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/map.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/NumberFormatUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/buyer.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/shared.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/pay.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/car.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/uiconfig/sponsor.tag.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/base.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/video.answer.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.data.proxy.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.risk.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.form.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.ui.common.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.credit.query.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/common/hy.auto.audit.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/audit/auditing.js"></script>
</html>

