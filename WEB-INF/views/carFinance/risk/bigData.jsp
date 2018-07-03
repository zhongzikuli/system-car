<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>黑名单查询</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>

<body>
<div class="mod_header">
    <div class="row">
    	<div class="form-inline">
             <div class="form-group">
                 <label class="control-label label">真实姓名:</label>
                 <input type="text" class="form-control" name="realName" id="search-real-name"/>
             </div>
             <div class="form-group">
                 <label class="control-label label">身份证号码:</label>
                 <input type="text" class="form-control" name="cardNo" id="search-card-no"/>
             </div>
             <div class="form-group">
                 <button type="button" class="btn btn-primary btn-sm search-btn">查询</button>
             </div>
         </div>
    </div>
</div>
<div class="mod_basic">
	<div class="ibox-content full-height">
		<div class="ibox-content">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th width="5%">序号</th>
						<th width="95%">命中项</th>
					</tr>
				</thead>
				<tbody id="result"></tbody>
			</table>
		</div>
	</div>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/risk/bigData.js"></script>
</html>