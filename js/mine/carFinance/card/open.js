$(function(){
	//贷款期限
	var loanPeriodMonthCode = dictData["290000"];
	var optMonth = "";
	var selMonth = $("#loan-period-month-code-select").prev("input[name='loanPeriodMonthCode']").val();
	for (var i = 0; i < loanPeriodMonthCode.length; i++) {
		if(loanPeriodMonthCode[i]["key"] == selMonth){
			optMonth += "<option selected='selected' value='"+loanPeriodMonthCode[i]["key"]+"'>" + loanPeriodMonthCode[i]["value"] + "</option>";
		}else{
			optMonth += "<option value='"+loanPeriodMonthCode[i]["key"]+"'>" + loanPeriodMonthCode[i]["value"] + "</option>";
		}
	}
	$("#loan-period-month-code-select").append(optMonth);
	$("#loan-period-month-code-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//开卡附件
	var openFiles = $.parseJSON($("#open-file-hidden").val());
	var staticUrl = $("#staticUrl").val();
	
	var amountCheckFile = "";		//额度核定申请表附件
	var applyFile = "";				//开卡申请表附件
	for (var i = 0; i < openFiles.length; i++) {
		if(openFiles[i]["fileChildType"]==21){
			amountCheckFile += '<div class="col-sm-3">';
			amountCheckFile += '<div class="m file text-center">';
			amountCheckFile += '<img class="pre-img" data-type="21" data-filename="' + openFiles[i]["fileName"] + '" data-filepath="' + openFiles[i]["filePath"] + '" data-group="' + openFiles[i]["fileGroup"] + '" src="' + staticUrl+openFiles[i]["fileGroup"] + "/" + openFiles[i]["filePath"] + '" alt="专项额度核定申请表">';
			amountCheckFile += '<div class="file-name">专项额度核定申请表</div>';
			amountCheckFile += '</div>';
			amountCheckFile += '</div>';
		}else if(openFiles[i]["fileChildType"]==20){
			applyFile += '<div class="col-sm-3">';
			applyFile += '<div class="m file text-center">';
			applyFile += '<img class="pre-img" data-type="20" data-filename="' + openFiles[i]["fileName"] + '" data-filepath="' + openFiles[i]["filePath"] + '" data-group="' + openFiles[i]["fileGroup"] + '" src="' + staticUrl+openFiles[i]["fileGroup"] + "/" + openFiles[i]["filePath"] + '" alt="开卡申请表">';
			applyFile += '<div class="file-name">开卡申请表</div>';
			applyFile += '</div>';
			applyFile += '</div>';
		}
	}
	
	if("" != amountCheckFile){
		$("#open-card-uploader-1").append(amountCheckFile);
	}else{
		$("#open-card-uploader-1").addClass("pull-left").append('<div class="ibox-content b-n"><p class="text-center tip-message">暂无专项额度核定申请附件</p></div>');
	}
	
	if("" != applyFile){
		$("#open-card-uploader-2").append(applyFile);
	}else{
		$("#open-card-uploader-2").addClass("pull-left").append('<div class="ibox-content b-n"><p class="text-center tip-message">暂无开卡申请表附件</p></div>');
	}
	
	
	//性别
	$("#sex-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//婚姻状况
	var married = dictData["500000"];
	var optMarried = "";
	var selMarried = $("#married-select").prev("input[name='married']").val();
	for (var i = 0; i < married.length; i++) {
		if(married[i]["key"] == selMarried){
			optMarried += "<option selected='selected' value='"+married[i]["key"]+"'>" + married[i]["value"] + "</option>";
		}else{
			optMarried += "<option value='"+married[i]["key"]+"'>" + married[i]["value"] + "</option>";
		}
	}
	$("#married-select").append(optMarried);
	$("#married-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//职业
	var professions = dictData["461000"];
	var optProfession = "";
	var selProfession = $("#profession-select").prev("input[name='profession']").val();
	for (var i = 0; i < professions.length; i++) {
		if(professions[i]["key"] == selProfession){
			optProfession += "<option selected='selected' value='"+professions[i]["key"]+"'>" + professions[i]["value"] + "</option>";
		}else{
			optProfession += "<option value='"+professions[i]["key"]+"'>" + professions[i]["value"] + "</option>";
		}
	}
	$("#profession-select").append(optProfession);
	$("#profession-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//证件截止日期
	if($("#card-valid-date").length > 0){
		laydate({
			elem: '#card-valid-date',
			format: 'YYYYMMDD',
			min: '1970-01-01 ',	//设定最小日期为当前日期
			istoday: false,		//显示今天
			issure: true,		//确定框
			istime: false,
			clear: function () {
				end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
			},
			choose:function(date){
				$("#card-valid-date").removeClass("input_validation-failed");
			}
		});
	}
	//出生日期
	if($("#birthday").length > 0){
		laydate({
			elem: '#birthday',
			format: 'YYYY-MM-DD',
			min: '1970-01-01 ', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			clear: function () {
				end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
			}
		});
	}
	//入住日期
	if($('#check-in-date').length > 0){
		laydate({
			elem: '#check-in-date',
			format: 'YYYY-MM-DD',
			min: '1970-01-01 ', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			clear: function () {
				end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
			},
			choose:function(date){
				$("#check-in-date").removeClass("input_validation-failed");
			}
		});
	}
	//入职日期
	if($('#entry-date').length > 0){
		laydate({
			elem: '#entry-date',
			format: 'YYYY-MM-DD',
			min: '1970-01-01 ', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			clear: function () {
				end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
			},
			choose:function(date){
				$("#entry-date").removeClass("input_validation-failed");
			}
		});
		
	}
	//学历
	var flexKey = dictData["430000"];
	var optFlexKey = "";
	var selFlexKey = $("#flexKey-select").prev("input[name='flexKey']").val();
	for (var i = 0; i < flexKey.length; i++) {
		if(flexKey[i]["key"] == selFlexKey){
			optFlexKey += "<option selected='selected' value='"+flexKey[i]["key"]+"'>" + flexKey[i]["value"] + "</option>";
		}else{
			optFlexKey += "<option value='"+flexKey[i]["key"]+"'>" + flexKey[i]["value"] + "</option>";
		}
	}
	$("#flexKey-select").append(optFlexKey);
	$("#flexKey-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	
	//住宅情况
	var housePropertyCode = dictData["520000"];
	var optHousePropertyCode = "";
	var selHousePropertyCode = $("#flexKey-select").prev("input[name='flexKey']").val();
	for (var i = 0; i < housePropertyCode.length; i++) {
		if(housePropertyCode[i]["key"] == selHousePropertyCode){
			optHousePropertyCode += "<option selected='selected' value='"+housePropertyCode[i]["key"]+"'>" + housePropertyCode[i]["value"] + "</option>";
		}else{
			optHousePropertyCode += "<option value='"+housePropertyCode[i]["key"]+"'>" + housePropertyCode[i]["value"] + "</option>";
		}
	}
	$("#house-property-code-select").append(optHousePropertyCode);
	$("#house-property-code-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//单位性质
	var companyType = dictData["440000"];
	var optCompanyType = "";
	var selCompanyType = $("#company-type-select").prev("input[name='flexKey']").val();
	for (var i = 0; i < companyType.length; i++) {
		if(companyType[i]["key"] == selCompanyType){
			optCompanyType += "<option selected='selected' value='"+companyType[i]["key"]+"'>" + companyType[i]["value"] + "</option>";
		}else{
			optCompanyType += "<option value='"+companyType[i]["key"]+"'>" + companyType[i]["value"] + "</option>";
		}
	}
	$("#company-type-select").append(optCompanyType);
	$("#company-type-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//联系人性别
	$("select[id^='contacter-sex-select-']").each(function(i,n){
		$(n).chosen({
			disable_search_threshold	: 8,
			no_results_text				: "没有找到",
			allow_single_deselect		: true,
			width: "100%"
		});
	});
	//联系人关系
	var relationType = dictData["510000"];
	$("select[id^='contacter-relation-type-code-select-']").each(function(i,n){
		var optConacterRelation = "";
		var conacterRelation = $(n).prev("input[name='contactorRelationType']").val();
		for (var i = 0; i < relationType.length; i++) {
			if(relationType[i]["key"] == conacterRelation){
				optConacterRelation += "<option selected='selected' value='"+relationType[i]["key"]+"'>" + relationType[i]["value"] + "</option>";
			}else{
				optConacterRelation += "<option value='"+relationType[i]["key"]+"'>" + relationType[i]["value"] + "</option>";
			}
		}
		$(n).append(optConacterRelation);
		$(n).chosen({
			disable_search_threshold	: 8,
			no_results_text				: "没有找到",
			allow_single_deselect		: true,
			width: "100%"
		});
	});
	//对帐单寄送方式
	$("#bill-send-way").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//卡片领取
	$("#receive-card-way-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//余额变动短信提醒
	$("#balance-message-tip-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	var validater = new ValidateWin("#open-bank-card-wrap", {
		callback: function (content, event) {}
	});
	
	//提交按钮
	$(".agree-open-card-btn").on("click", function(){
		var isSubmit = validater.mySubmit(validater);
		var picLength = $("#bank-card-upload-file").find(".file").length;
		if (!isSubmit) {
			faildMsg("请先完善开卡资料");
			return false;
		}else if(picLength < 2){
			faildMsg("请先完善开卡附件");
			return false;
		}else{
			var param = {};
			param["orderId"] = $("#order-id").val();
			setCarInfoParam(param);
			setBuyerInfoParam(param);
			setCompanyInfoParam(param);
			setContactorInfoParam(param);
			setPersonalParam(param);
			setPicParam(param);
			confirmDialog("确认对此订单申请开卡？", function () {
				loadingShow(300);
				$.ajax({
					url		: ctx + "/bankCard/open.action",
					type	: "post",
					data	: JSON.stringify(param),
					contentType	: "application/json",
					dataType	: "json",
					success		: function (data) {
						loadingHide(300);
						if (data.error == 1) {
							successMsg("开卡申请成功！", 1000, closeParentCurrentTab);
						} else {
							faildMsg(data.message);
						}
					}
				});
			});
			return false;
		}
	});
	
	//设置紧急联系人信息请求参数
	function setPicParam(param){
		var files = new Array();
		$("#bank-card-upload-file").find(".file > img").each(function(i, n){
			var file = new Object();
			file["fileGroup"] = $(n).attr("data-group");
			file["filePath"] = $(n).attr("data-filepath");
			file["fileName"] = $(n).attr("data-filename");
			file["fileType"] = 2;
			file["fileChildType"] = $(n).attr("data-type");
			files.push(file);
		});
		param["files"] = files;
	}
	
	//设置紧急联系人信息请求参数
	function setPersonalParam(param){
		$("#personal-info").find("input, select").each(function(i, n){
			var name = $(n).attr("name");
			if(typeof(name) != "undefined"){
				param[name] = $.trim($(n).val());
			}
		});
	}
	
	//设置紧急联系人信息请求参数
	function setContactorInfoParam(param){
		var contactors = new Array();
		$("#contactor-info .row").each(function(i, n){
			var contactor = new Object();
			$(n).find("input, select").each(function(j, m){
				var name = $(m).attr("name");
				if(typeof(name) != "undefined"){
					contactor[name] = $.trim($(m).val());
				}
			});
			contactors.push(contactor);
		});
		param["contactors"] = contactors;
	}
	
	//设置基本信息请求参数
	function setCompanyInfoParam(param){
		$("#company-info").find("input, select").each(function(i, n){
			var name = $(n).attr("name");
			if(typeof(name) != "undefined"){
				param[name] = $.trim($(n).val());
			}
		});
	}
	
	//设置基本信息请求参数
	function setBuyerInfoParam(param){
		$("#buyer-info").find("input, select").each(function(i, n){
			var name = $(n).attr("name");
			if(typeof(name) != "undefined"){
				if(name == "yearIncome"){
					param[name] =NumberFormatUtil.rmoney($.trim($(n).val()));
				}else{
					param[name] = $.trim($(n).val());
				}
			}
		});
	}
	
	//设置购车信息请求参数
	function setCarInfoParam(param){
		$("#car-info").find("input, select").each(function(i, n){
			var name = $(n).attr("name");
			if(typeof(name) != "undefined"){
				if(name=="actualLoadMoney" || name=="installmentPayPoundage"  || name=="auditCarPrice" ){
					param[name] =NumberFormatUtil.rmoney($.trim($(n).val()));
				}else{
					param[name] = $.trim($(n).val());
				}
			}
		});
	}
	
	//取消
	$(".back-open-card-btn").on("click", function(){
		closeParentCurrentTab();
	});
	
	//图片自动放大
	$("#bank-card-upload-file").find(".pre-img").on("click", function () {
		$.openPhotoGallery(this);
	});
});

function validFormSelect(labelId) {
    if (undefined != labelId && null != labelId && labelId != "") {
        if ($(labelId).val() == '' || $(labelId).val() == '请选择') {
        	if($(labelId).attr("name") == "buyerSex"){
        		$(labelId).parent().attr('tip', '请选择购车人性别').addClass("input_validation-failed");
        		return "faild";
        	}else if($(labelId).attr("name") == "married"){
        		$(labelId).parent().attr('tip', '请选择购车人婚姻状况').addClass("input_validation-failed");
        		return "faild";
        	}else if($(labelId).attr("name") == "profession"){
        		$(labelId).parent().attr('tip', '请选择购车人职业。').addClass("input_validation-failed");
        		return "faild";
        	}else if($(labelId).attr("name") == "contactorSex"){
        		$(labelId).parent().attr('tip', '请选择联系人性别').addClass("input_validation-failed");
        		return "faild";
        	}else if($(labelId).attr("name") == "companyType"){
        		$(labelId).parent().attr('tip', '请选择单位性质').addClass("input_validation-failed");
        		return "faild";
        	}
        }
        return "success";
    }
}

function validateOpenCardForm(labelId){
	if (undefined != labelId && null != labelId && labelId != "") {
		if($(labelId).val() == null || $.trim($(labelId).val()) == ""){
			if ($(labelId).attr("name") == "buyerName") {
				$(labelId).attr("tip", "请输入客户姓名");
				return "faild";
			}else if($(labelId).attr("name") == "pyName"){
				$(labelId).attr("tip", "请输入姓名拼音");
				return "faild";
			}else if($(labelId).attr("name") == "buyerCardNo"){
				$(labelId).attr("tip", "请输入身份证号码");
				return "faild";
			}else if($(labelId).attr("name") == "birthday"){
				$(labelId).attr("tip", "请输入出生日期");
				return "faild";
			}else if($(labelId).attr("name") == "certifyingAuthority"){
				$(labelId).attr("tip", "请输入发证机关");
				return "faild";
			}else if($(labelId).attr("name") == "cardValidDate"){
				$(labelId).attr("tip", "请输入证件有效期截止日");
				return "faild";
			}else if($(labelId).attr("name") == "tel"){
				$(labelId).attr("tip", "请输入手机号码");
				return "faild";
			}else if($(labelId).attr("name") == "homeZip"){
				$(labelId).attr("tip", "请输入有效的住宅邮编");
				return "faild";
			}else if($(labelId).attr("name") == "checkInDate"){
				$(labelId).attr("tip", "请输入有效的入住日期");
				return "faild";
			}else if($(labelId).attr("name") == "currentAddress"){
				$(labelId).attr("tip", "请输入有效的住宅地址");
				return "faild";
			}else if($(labelId).attr("name") == "currentAddressDetail"){
				$(labelId).attr("tip", "请输入完整的住宅地址详情");
				return "faild";
			}else if($(labelId).attr("name") == "companyName"){
				$(labelId).attr("tip", "请输入单位名称");
				return "faild";
			}else if($(labelId).attr("name") == "contactorName"){
				$(labelId).attr("tip", "请输入联系人姓名");
				return "faild";
			}else if($(labelId).attr("name") == "entryDate"){
				$(labelId).attr("tip", "请输入入职日期");
				return "faild";
			}
		}
		
		if ($(labelId).val() != null && $.trim($(labelId).val()) != "") {
			var value = $.trim($(labelId).val());
			if ($(labelId).attr("name") == "buyerName") {
				if (value.length > 100) {
					$(labelId).attr("tip", "客户名称过长");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "buyerCardNo") {
				var idCardReg = new RegExp(idCard);
				if (!idCardReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的身份证号码");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "tel") {
				var phoneReg = new RegExp(phone11);
				if (!phoneReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的手机号码");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "homeZip") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的住宅邮编");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "homePhone") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的住宅电话");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "yearIncome") {
				var floatReg = new RegExp(float);
				if (!floatReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的年收入");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "companyZone") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的单位电话区号");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "companyTel") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的单位电话");
					return "faild";
				}
			}else if ($(labelId).attr("companyTelPart") == "tel") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的单位电话分机");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "companyZip") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的单位邮政编码");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "contactorName") {
				if (value.length > 100) {
					$(labelId).attr("tip", "联系人名称过长");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "contactorTel") {
				var phoneReg = new RegExp(phone11);
				if (!phoneReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的联系人手机号码");
					return "faild";
				}
			}else if ($(labelId).attr("name") == "contactorPhone") {
				var intReg = new RegExp(int);
				if (!intReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的联系人联系电话");
					return "faild";
				}
			}else if($(labelId).attr("name") == "billEmail"){
				var emailReg = new RegExp(email);
				if (!emailReg.test(value)) {
					$(labelId).attr("tip", "请输入有效的对帐单E-mail");
					return "faild";
				}
			}
		}
	}
	return "success";
}