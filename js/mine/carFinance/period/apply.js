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
	
	//分期附件
	var baseFiles = $("#apply-period-base-file-hidden").val() != "" ? $.parseJSON($("#apply-period-base-file-hidden").val()) : "";
	var buyerFiles = $("#apply-period-buyer-file-hidden").val() != "" ? $.parseJSON($("#apply-period-buyer-file-hidden").val()) : "";
	var sharedFiles = $("#apply-period-shared-file-hidden").val() != "" ? $.parseJSON($("#apply-period-shared-file-hidden").val()) : "";

	var staticUrl = $("#staticUrl").val();
	var buyerFiles1 = "";					//购车人附件（正面）
	var buyerFiles2 = "";					//购车人附件（反面）
	var buyerFiles3 = "";					//购车人附件（签字照）
	
	var sharedFiles1 = "";					//配偶证附件
	var sharedFiles2 = "";					//配偶证附件
	var sharedFiles3 = "";					//婚姻证附件
	var marriedFiles = "";					//婚姻证明附件
	
	var registFiles = "";					//注册登记附件
	var houseHoldFiles = "";				//户口本附件
	var visitFiles = "";					//上门照附件
	
	var billFiles = "";						//购车发票附件
	var incomeFiles = "";					//收入证明附件
	
	var vedioFiles = "";					//视频资料附件
	var firstPayFiles = "";					//首付款凭证附件
	
	//购车人附件
	var buyerFlag1 = false; var buyerFlag2 = false; var buyerFlag3 = false;		//是否存在附件标记
	for (var i = 0; i < buyerFiles.length; i++) {
		if(buyerFiles[i]["creditFileType"]==1){
			buyerFiles1 += '<div class="col-sm-3">';
			buyerFiles1 += '<div class="m file text-center">';
			buyerFiles1 += '<img class="pre-img" data-type="' + buyerFiles[i]["creditFileType"] + '" data-filename="' + buyerFiles[i]["fileName"] + '" data-filepath="' + buyerFiles[i]["filePath"] + '" data-group="' + buyerFiles[i]["fileGroup"] + '" src="' + staticUrl + buyerFiles[i]["fileGroup"] + "/" + buyerFiles[i]["filePath"] + '" title="'+buyerFiles[i]["fileChildTypeStr"]+'">';
			buyerFiles1 += '<div class="file-name">'+buyerFiles[i]["fileChildTypeStr"]+'</div>';
			buyerFiles1 += '</div>';
			buyerFiles1 += '</div>';
				
			buyerFlag1 = true;
		}else if(buyerFiles[i]["creditFileType"]==2){
			buyerFiles2 += '<div class="col-sm-3">';
			buyerFiles2 += '<div class="m file text-center">';
			buyerFiles2 += '<img class="pre-img" data-type="' + buyerFiles[i]["creditFileType"] + '" data-filename="' + buyerFiles[i]["fileName"] + '" data-filepath="' + buyerFiles[i]["filePath"] + '" data-group="' + buyerFiles[i]["fileGroup"] + '" src="' + staticUrl + buyerFiles[i]["fileGroup"] + "/" + buyerFiles[i]["filePath"] + '" title="'+buyerFiles[i]["fileChildTypeStr"]+'">';
			buyerFiles2 += '<div class="file-name">'+buyerFiles[i]["fileChildTypeStr"]+'</div>';
			buyerFiles2 += '</div>';
			buyerFiles2 += '</div>';
			
			buyerFlag2 = true;
		}else if(buyerFiles[i]["fileChildType"]==45){
			var tmpB = "";
			buyerFiles3 += '<div class="col-sm-3">';
			buyerFiles3 += '<div class="m file text-center">';
			buyerFiles3 += '<img class="pre-img" data-type="' + buyerFiles[i]["fileChildType"] + '" data-filename="' + buyerFiles[i]["fileName"] + '" data-filepath="' + buyerFiles[i]["filePath"] + '" data-group="' + buyerFiles[i]["fileGroup"] + '" src="' + staticUrl + buyerFiles[i]["fileGroup"] + "/" + buyerFiles[i]["filePath"] + '" title="'+buyerFiles[i]["fileChildTypeStr"]+'" />';
			buyerFiles3 += '<div class="file-name">'+buyerFiles[i]["fileChildTypeStr"]+'</div>';
			buyerFiles3 += '</div>';
			buyerFiles3 += '</div>';
			buyerFlag3 = true;
		}
	}

	$(".customer-container").append(buyerFlag1 ? buyerFiles1 : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无身份证正面照</p></div></div>')
							.append(buyerFlag2 ? buyerFiles2 : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无身份证反面照</p></div></div>')
							.append(buyerFlag3 ? buyerFiles3 : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无签字照</p></div></div>');

	//配偶附件
	var sharedFlag1 = false; var sharedFlag2 = false;var sharedFlag3 = false;
	for (var i = 0; i < sharedFiles.length; i++) {
		if(sharedFiles[i]["creditFileType"]==1){
			sharedFiles1 += '<div class="col-sm-3">';
			sharedFiles1 += '<div class="m file text-center">';
			sharedFiles1 += '<img class="pre-img" data-type="' + sharedFiles[i]["creditFileType"] + '" data-filename="' + sharedFiles[i]["fileName"] + '" data-filepath="' + sharedFiles[i]["filePath"] + '" data-group="' + sharedFiles[i]["fileGroup"] + '" src="' + staticUrl + sharedFiles[i]["fileGroup"] + "/" + sharedFiles[i]["filePath"] + '" title="'+sharedFiles[i]["fileChildTypeStr"]+'">';
			sharedFiles1 += '<div class="file-name">'+sharedFiles[i]["fileChildTypeStr"]+'</div>';
			sharedFiles1 += '</div>';
			sharedFiles1 += '</div>';
			
			sharedFlag1 = true;
		}else if(sharedFiles[i]["creditFileType"]==2){
			sharedFiles2 += '<div class="col-sm-3">';
			sharedFiles2 += '<div class="m file text-center">';
			sharedFiles2 += '<img class="pre-img" data-type="' + sharedFiles[i]["creditFileType"] + '" data-filename="' + sharedFiles[i]["fileName"] + '" data-filepath="' + sharedFiles[i]["filePath"] + '" data-group="' + sharedFiles[i]["fileGroup"] + '" src="' + staticUrl + sharedFiles[i]["fileGroup"] + "/" + sharedFiles[i]["filePath"] + '" title="'+sharedFiles[i]["fileChildTypeStr"]+'">';
			sharedFiles2 += '<div class="file-name">'+sharedFiles[i]["fileChildTypeStr"]+'</div>';
			sharedFiles2 += '</div>';
			sharedFiles2 += '</div>';
			
			sharedFlag2 = true;
		}
	}
	if(sharedFiles.length > 0){
		for (var i = 0; i < baseFiles.length; i++) {
			if(baseFiles[i]["fileChildType"] == 24){			//婚姻证明
				sharedFiles3 += '<div class="col-sm-3">';
				sharedFiles3 += '<div class="m file text-center">';
				sharedFiles3 += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
				sharedFiles3 += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
				sharedFiles3 += '</div>';
				sharedFiles3 += '</div>';
				sharedFlag3 = true;
				break;
			}
		}
	}
	
	if(sharedFiles.length > 0 && $(".parter-container").length > 0){
		$(".parter-container").append(sharedFlag1 ? sharedFiles1 : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无身份证正面照附件</p></div></div>')
							.append(sharedFlag2 ? sharedFiles2 : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无身份证反面照附件</p></div></div>')
							.append(sharedFlag3 ? sharedFiles3 : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无婚姻证明附件</p></div></div>');
	}
	
	
	//婚姻证明
	var marriedFlag = false;		//婚姻证明标记
	for (var i = 0; i < baseFiles.length; i++) {
		if(baseFiles[i]["fileChildType"]==24){
			marriedFiles += '<div class="col-sm-3">';
			marriedFiles += '<div class="m file text-center">';
			marriedFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			marriedFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			marriedFiles += '</div>';
			marriedFiles += '</div>';
			
			marriedFlag = true;
			break;
		}
	}
    
    if($(".single-container").length > 0){
    	$(".single-container").append(marriedFlag ? marriedFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无单身证明附件</p></div></div>');
    }else if($(".dividle-container").length > 0){
    	$(".dividle-container").append(marriedFlag ? marriedFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无离婚证明附件</p></div></div>');
    }
    
    //注册登记证
    var registFlag = false;		//注册抵押登记附件标记
    for (var i = 0; i < baseFiles.length; i++) {
		if(baseFiles[i]["fileChildType"]==6){
			registFiles += '<div class="col-sm-3">';
			registFiles += '<div class="m file text-center">';
			registFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			registFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			registFiles += '</div>';
			registFiles += '</div>';
			
			registFlag = true;
		}
	}
	$(".regist-container").append(registFlag ? registFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无注册登记附件</p></div></div>');


    //户口本
    var houseHoldFlag = false;
    for (var i = 0; i < baseFiles.length; i++) {
		if(baseFiles[i]["fileChildType"]==22){
			houseHoldFiles += '<div class="col-sm-3">';
			houseHoldFiles += '<div class="m file text-center">';
			houseHoldFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			houseHoldFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			houseHoldFiles += '</div>';
			houseHoldFiles += '</div>';
			
			houseHoldFlag = true;
		}
    }
    $(".household-container").append(houseHoldFlag ? houseHoldFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无户口本附件</p></div></div>');
    
    //上门照
    var visitFlag= false;			//上门照标记
    for (var i = 0; i < baseFiles.length; i++) {
		if(baseFiles[i]["fileChildType"]==26){
			visitFiles += '<div class="col-sm-3">';
			visitFiles += '<div class="m file text-center">';
			visitFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			visitFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			visitFiles += '</div>';
			visitFiles += '</div>';
			
			visitFlag = true;
		}
    }
    $(".visit-container").append(visitFlag ? visitFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无上门本附件</p></div></div>');
    
    //其它附件
    var billFlag = false;var incomeFlag = false;var videoFlag = false;var firstPayFlag = false;
    for (var i = 0; i < baseFiles.length; i++) {
    	if(baseFiles[i]["fileChildType"]== 5){
    		billFiles += '<div class="col-sm-3">';
    		billFiles += '<div class="m file text-center">';
    		billFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
    		billFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
    		billFiles += '</div>';
    		billFiles += '</div>';
			
    		billFlag = true;
		}else if(baseFiles[i]["fileChildType"]==23){
			incomeFiles += '<div class="col-sm-3">';
			incomeFiles += '<div class="m file text-center">';
			incomeFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			incomeFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			incomeFiles += '</div>';
			incomeFiles += '</div>';
			
			incomeFlag = true;
		}else if(baseFiles[i]["fileChildType"]==55){
			vedioFiles += '<div class="col-sm-3">';
			vedioFiles += '<div class="m file text-center">';
			vedioFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			vedioFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			vedioFiles += '</div>';
			vedioFiles += '</div>';
			
			videoFlag = true;
		}else if(baseFiles[i]["fileChildType"]==34){
			firstPayFiles += '<div class="col-sm-3">';
			firstPayFiles += '<div class="m file text-center">';
			firstPayFiles += '<img class="pre-img" data-type="' + baseFiles[i]["fileChildType"] + '" data-filename="' + baseFiles[i]["fileName"] + '" data-filepath="' + baseFiles[i]["filePath"] + '" data-group="' + baseFiles[i]["fileGroup"] + '" src="' + staticUrl + baseFiles[i]["fileGroup"] + "/" + baseFiles[i]["filePath"] + '" title="'+baseFiles[i]["fileChildTypeStr"]+'">';
			firstPayFiles += '<div class="file-name">'+baseFiles[i]["fileChildTypeStr"]+'</div>';
			firstPayFiles += '</div>';
			firstPayFiles += '</div>';
			
			firstPayFlag = true;
		}
	}
	$(".other-container").append(billFlag ? billFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无购车发票附件</p></div></div>')
						.append(incomeFlag ? incomeFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无收入证明附件</p></div></div>')
						.append(firstPayFlag ? firstPayFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无首付凭证附件</p></div></div>')
						.append(videoFlag ? vedioFiles : '<div class="col-sm-3 apply-period-photo"><div class="ibox-content b-n"><p class="text-center tip-message">暂无面签附件</p></div></div>');
	
	//校验对象
	var validater = new ValidateWin("#apply-period-wrap", {
		callback: function (content, event) {

		}
	});
	
	//提交按钮
	$(".agree-apply-period-btn").on("click", function(){
		var isSubmit = validater.mySubmit(validater);
		if (!isSubmit) {
			$("#apply-period-remark").focus();
			return false;
		}else if(!validBuyerFile()){
			return false;
		}else if(!validParterFile()){
			return false;
		}else if(!validSingleFile()){
			return false;
		}else if(!validDividleFile()){
			return false;
		}else if(!validRegistFile()){
			return false;
		}else if(!validHouseHoldFile()){
			return false;
		}else if(!validVisitFile()){
			return false;
		}else if(!validOtherFile()){
			return false;
		}else{
			var param = {};
			param["orderId"] = $("#order-id").val();
			param["newOrOld"] = $("#new-old").val();
			setCarInfoParam(param);
			setBuyerInfoParam(param);
			setPicParam(param);
			confirmDialog("确认对此订单申请分期？", function () {
				loadingShow(300);
				$.ajax({
					url		: ctx + "/applyPeriod/apply.action",
					type	: "post",
					data	: JSON.stringify(param),
					contentType	: "application/json",
					dataType	: "json",
					success		: function (data) {
						loadingHide(300);
						if (data.error == 1) {
							successMsg("分期申请成功！", 1000, closeParentCurrentTab);
						} else {
							faildMsg(data.message);
						}
					}
				});
			});
			return false;
		}
	});
	
	//校验购车人附件
	function validBuyerFile(){
		var picLength = $(".customer-container").find(".pre-img").length;
		if(!buyerFlag1){
			faildMsg("购车人身份证(正面)附件缺失");
			return false;
		}else if(!buyerFlag2){
			faildMsg("购车人身份证(反面)附件缺失");
			return false;
		}else if(!buyerFlag3){
			faildMsg("购车人签字照附件缺失");
			return false;
		}else if(picLength < 4){
			faildMsg("购车人签字照附件需两张");
			return false;
		}else{
			return true;
		}
	}
	
	//校验配偶附件
	function validParterFile(){
		if($(".parter-container").length > 0){
			var picLength = $(".parter-container").find(".pre-img").length;
			if(!sharedFlag1){
				faildMsg("配偶身份证(正面)附件缺失");
				return false;
			}else if(!sharedFlag2){
				faildMsg("配偶身份证(反面)附件缺失");
				return false;
			}else if(!sharedFlag3){
				faildMsg("婚姻证明附件缺失");
				return false;
			}else{
				return true;
			}
		}
		return true;
	}
	
	//校验单身附件
	function validSingleFile(){
		if($(".single-container").length > 0){
			var picLength = $(".single-container").find(".pre-img").length;
			if(!marriedFlag){
				faildMsg("婚姻证明附件缺失");
				return false;
			}else if(picLength < 1){
				faildMsg("婚姻证明附件缺失");
				return false;
			}
		}
		return true;
	}
	
	//校验离婚附件
	function validDividleFile(){
		if($(".dividle-container").length > 0){
			var picLength = $(".dividle-container").find(".pre-img").length;
			if(!marriedFlag){
				faildMsg("婚姻证明附件缺失");
				return false;
			}else if(picLength < 1){
				faildMsg("婚姻证明附件缺失");
				return false;
			}
		}
		return true;
	}
	
	//校验注册登记附件
	function validRegistFile(){
		var picLength = $(".regist-container").find(".pre-img").length;
		if(!registFlag){
			faildMsg("注册抵押附件缺失");
			return false;
		}else if(picLength < 2){
			faildMsg("注册登记附件至少两张");
			return false;
		}else{
			return true;
		}
	}
	
	//校验户口本附件
	function validHouseHoldFile(){
		var picLength = $(".household-container").find(".pre-img").length;
		if(!houseHoldFlag){
			faildMsg("户口本附件缺失");
			return false;
		}else{
			return true;
		}
	}
	//校验上门照附件
	function validVisitFile(){
		var picLength = $(".visit-container").find(".pre-img").length;
		if(!visitFlag){
			faildMsg("上门照附件缺失");
			return false;
		}else{
			return true;
		}
	}
	
	//校验其它附件
	function validOtherFile(){
		if(!billFlag){
			faildMsg("购车发票附件缺失");
			return false;
		}else if(!incomeFlag){
			faildMsg("收入证明附件缺失");
			return false;
		}else if(!firstPayFlag){
			faildMsg("首付款凭证附件缺失");
			return false;
		}
		return true;
	}
	
	//设置紧急联系人信息请求参数
	function setPicParam(param){
		setBuyerPicParam(param);
		setParterPicParam(param);
		setSinglePicParam(param);
		setDividlePicParam(param);
		setRegistMortgagePicParam(param);
		setHouseHoldPicParam(param);
		setVisitPicParam(param);
		setOtherPicParam(param);
	}
	
	//设置购车人附件参数
	function setBuyerPicParam(param){
		var files = new Array();
		$(".customer-container").find(".pre-img").each(function(i, n){
			var file = new Object();
			file["fileGroup"] = $(n).attr("data-group");
			file["filePath"] = $(n).attr("data-filepath");
			file["fileName"] = $(n).attr("data-filename");
			if(i==0){
				file["creditFileType"] = $(n).attr("data-type");
			}else if(i==1){
				file["creditFileType"] = $(n).attr("data-type");
			}else{
				file["fileType"] = 50;
				file["fileChildType"] = $(n).attr("data-type");
			}
			files.push(file);
		});
		param["buyerFiles"] = files;
	}
	
	//设置注册登记附件参数
	function setRegistMortgagePicParam(param){
		var files = new Array();
		$(".regist-container").find(".pre-img").each(function(i, n){
			var file = new Object();
			file["fileGroup"] = $(n).attr("data-group");
			file["filePath"] = $(n).attr("data-filepath");
			file["fileName"] = $(n).attr("data-filename");
			file["fileChildType"] = $(n).attr("data-type");
			files.push(file);
		});
		param["registMortgageFiles"] = files;
	}
	
	//设置户口本登记附件参数
	function setHouseHoldPicParam(param){
		var files = new Array();
		$(".household-container").find(".pre-img").each(function(i, n){
			var file = new Object();
			file["fileGroup"] = $(n).attr("data-group");
			file["filePath"] = $(n).attr("data-filepath");
			file["fileName"] = $(n).attr("data-filename");
			file["fileChildType"] = $(n).attr("data-type");
			files.push(file);
		});
		param["houseHoldFiles"] = files;
	}
	
	//设置上门照登记附件参数
	function setVisitPicParam(param){
		var files = new Array();
		$(".visit-container").find(".pre-img").each(function(i, n){
			var file = new Object();
			file["fileGroup"] = $(n).attr("data-group");
			file["filePath"] = $(n).attr("data-filepath");
			file["fileName"] = $(n).attr("data-filename");
			file["fileType"] = $(n).attr("data-type");
			files.push(file);
		});
		param["visitFiles"] = files;
	}
	
	//设置配偶附件参数
	function setParterPicParam(param){
		if($(".parter-container").length > 0){
			var files = new Array();
			$(".parter-container").find(".pre-img").each(function(i, n){
				var file = new Object();
				file["fileGroup"] = $(n).attr("data-group");
				file["filePath"] = $(n).attr("data-filepath");
				file["fileName"] = $(n).attr("data-filename");
				if(i == 0){
					file["creditFileType"] = $(n).attr("data-type");
					files.push(file);
				}else if(i == 1){
					file["creditFileType"] = $(n).attr("data-type");
					files.push(file);
				}else if(i == 2){		//结婚证特殊处理
					file["fileChildType"] = $(n).attr("data-type");
					param["marrigedFile"] = file;
				}
			});
			param["parterFiles"] = files;
		}
	}
	
	//设置单身附件参数
	function setSinglePicParam(param){
		if($(".single-container").length > 0){
			var file = new Object();
			file["fileGroup"] = $(".single-container").find(".pre-img").attr("data-group");
			file["filePath"] = $(".single-container").find(".pre-img").attr("data-filepath");
			file["fileName"] = $(".single-container").find(".pre-img").attr("data-filename");
			file["fileChildType"] = $(".single-container").find(".pre-img").attr("data-type");
			param["singleFile"] = file;
		}
	}
	
	
	//设置单身附件参数
	function setOtherPicParam(param){
		if($(".other-container").length > 0){
			var files = new Array();
			$(".other-container").find(".pre-img").each(function(i, n){
				var file = new Object();
				file["fileGroup"] = $(n).attr("data-group");
				file["filePath"] = $(n).attr("data-filepath");
				file["fileName"] = $(n).attr("data-filename");
				file["fileChildType"] = $(n).attr("data-type");
				if(file["fileChildType"] == 6){
					param["billFile"] = file;
				}else if(file["fileChildType"] == 55){
					param["videoFile"] = file;
				}else if(file["fileChildType"] == 34){
					param["firstPayFile"] = file;
				}else if(file["fileChildType"] == 23){
					files.push(file);
				}
			});
			
			if(files.length > 0){
				param["incomeFiles"] = files;
			}
		}
	}
	
	//设置离婚附件参数
	function setDividlePicParam(param){
		if($(".dividle-container").length > 0){
			var file = new Object();
			file["fileGroup"] = $(".dividle-container").find(".pre-img").attr("data-group");
			file["filePath"] = $(".dividle-container").find(".pre-img").attr("data-filepath");
			file["fileName"] = $(".dividle-container").find(".pre-img").attr("data-filename");
			file["fileChildType"] = $(".dividle-container").find(".pre-img").attr("data-type");
			param["dividleFile"] = file;
		}
	}
	
	//设置基本信息请求参数
	function setBuyerInfoParam(param){
		$("#buyer-info").find("input, select, textarea").each(function(i, n){
			var name = $(n).attr("name");
			if(typeof(name) != "undefined"){
				param[name] = $.trim($(n).val());
			}
		});
	}
	
	//设置购车信息请求参数
	function setCarInfoParam(param){
		$("#car-info").find("input, select").each(function(i, n){
			var name = $(n).attr("name");
			if(typeof(name) != "undefined"){
				if(name=="actualLoadMoney" || name=="actualFirstPay"  || name=="auditCarPrice" || name =="initEvaluatePrice"){
					param[name] =NumberFormatUtil.rmoney($.trim($(n).val()));
				}else{
					param[name] = $.trim($(n).val());
				}
			}
		});
	}
	
	//取消
	$(".back-apply-period-btn").on("click", function(){
		closeParentCurrentTab();
	});
	
	//审核描述信息提示
	$('#apply-period-remark').keyup(function(){
		var curLength=$(this).val().trim().length;
		$(this).next("span").find(".input").html(curLength);
		$(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
		if(curLength>1000){
			var num=$(this).val().trim().substr(0,1000);
			$(this).val(num);
		}
	});
	
	//图片自动放大
	$("#apply-period-file-list").find(".pre-img").on("click", function () {
		$.openPhotoGallery(this);
	});
});