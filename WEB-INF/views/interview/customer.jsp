<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="row">
    <div class="col-sm-12">
        <div class="ibox interview-wrap item">
            <div class="ibox-title interview-title">
                <p class="split"></p>
                <h5>面签状态:<span style="font-size:14px;color:#666;"></span></h5>
                <shiro:hasPermission name="interview:download">
                    <div class="ibox-tools">
                        <a class="btn btn-w-m btn-info" href="${ctx}/interview/download.action?id=${id}">一键下载</a>
                    </div>
                </shiro:hasPermission>
            </div>
        </div>
    </div>
</div>
<div class="ibox interview-wrap item mr-none">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>贷款信息</h5>
    </div>
</div>
<div class="panel-body item mr-none">
    <div class="form-content">
        <div class="form-horizontal clear">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-xs-3 control-label">业务类型:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-type"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-xs-3 control-label">贷款银行:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-loanBank"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-xs-3 control-label">申请分期金额(元):</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-loanAmount"></span>元
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-xs-3 control-label">贷款期限(月):</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-loanTimeLimit"></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-horizontal clear">
        	<div class="col-sm-3">
                <div class="form-group">
                    <label class="col-xs-3 control-label">车型:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-car-type"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%-- end 贷款信息 --%>

<div class="ibox interview-wrap item mb-none">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>基本信息</h5>
    </div>
</div>
<div class="panel-body item mt-none">
    <div class="row form-content">
        <div class="form-horizontal clear">
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">贷款人姓名:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-lender-name"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">贷款人身份证号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-lender-cardNo"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">贷款人性别:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-lender-sex"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">贷款人手机号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-lender-tel"></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-horizontal clear">
        	<div class="form-group">
                 <label class="col-xs-3 control-label">贷款人居住地:</label>
                 <div class="col-xs-9">
                     <span class="form-control-static accept-lender-address"></span>
                 </div>
             </div>
        </div>

        <div class="form-horizontal clear">
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">共同贷款人姓名:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-coLender"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">共同贷款人身份证号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-coCardNo"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">共同贷款人性别:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-coSex"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">共同贷款人手机号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static accept-coTel"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-horizontal clear">
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人一姓名:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static oneGuarantor"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人一身份证号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static oneGuarantorCardNo"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人一性别:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static oneGuarantorSex"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人一手机号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static oneGuarantorTel"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-horizontal hide twoGuarantor-lender  clear">
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人二姓名:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static twoGuarantor"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人二身份证号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static twoGuarantorCardNo"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人二性别:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static twoGuarantorSex"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人二手机号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static twoGuarantorTel"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-horizontal hide threeGuarantor-lender  clear">
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人三姓名:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static threeGuarantor"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人三身份证号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static threeGuarantorCardNo"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人三性别:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static threeGuarantorSex"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人三手机号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static threeGuarantorTel"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-horizontal hide fourGuarantor-lender clear">
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人四姓名:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static fourGuarantor"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人四身份证号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static fourGuarantorCardNo"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人四性别:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static fourGuarantorSex"></span>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="col-xs-3 control-label">担保人四手机号码:</label>
                    <div class="col-xs-9">
                        <span class="form-control-static fourGuarantorTel"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%-- end 基本信息 --%>
<div class="ibox interview-wrap item mb-none">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>审核信息</h5>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <div class="form-group" style="margin: 15px;">
            <label class="control-label">审核说明:</label>
            <span class="remark"></span>
        </div>
    </div>
</div>

<div class="ibox interview-wrap item mr-none">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>照片资料</h5>
    </div>
</div>

<div class="col-sm-12">
    <div class="float-e-margins"></div>
    <div class="file-image row gallerys"></div>
</div>

<div class="ibox interview-wrap item mr-none">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>视频资料</h5>
    </div>
</div>

<div class="col-sm-12">
    <div class="float-e-margins"></div>
    <div class="file-video row"></div>
</div>
</body>
</html>