jQuery(function ($) {
	// 详情固定头部
	$(document).ready(function () {
		$('.mod_header').stickUp({
			itemClass: 'menuItem',
			itemHover: 'active'
		});
	});
	
	// 数据处理对象
	var dataProxy = new HYCarFinance.carProxy();
	// ui对象
	var UI = new HYCarFinance.UI();
	
	var layout = "";
	setLayout ();
	
	// 业务受理单编号
	var acceptId = $("#acceptId").val();
	var department = $("#department").val();
	var bankId = $("#bankId").val();
	
	//获取标签里所有配置项 当为车辆信息和垫款申请时，label大号
	function getAllTag(tag,styleModel){
		var tagArr = [{
			xtype:'fieldcontainer',
			items:[]
		}]
		for(var i = 0; i<tag.length; i++){
			var tagItems = tag[i].items;
			for(var j  = 0; j<tagItems.length; j++){
				if(tagItems[j].name=='companyName' || tagItems[j].name=='carBrandId'){
					tagItems[j].dClass='form-control-expend-right';
					if(tagItems[j].name=='carBrandId'){
						tagItems[j].xtype='text';
					}
				}
				tagItems[j].plain=true;
				tagItems[j].styleModel = styleModel;
				tagArr[0].items.push(tagItems[j]);
			}
		}
		tagArr[0].items.sort(function(a,b){
            return a.serial-b.serial
        });
		return tagArr
	}
	
	function setLayout (){
		layout=localStorage.getItem("layout");
		if(layout){
			if(layout== 'styleNormal'){
				$(".mod_basic").removeClass("audit-wrapper");
				$("#styleType").attr({
			    	"checked":false,
			    	"data-label-text":"平铺"
			    });
			}else{
				$(".mod_basic").addClass("audit-wrapper");
			    $("#styleType").attr({
			    	"checked":true,
			    	"data-label-text":"标准"
			    });
			}
		}else{
			layout ="styleDefault";
			localStorage.setItem("layout",layout);
			$(".mod_basic").addClass("audit-wrapper");
		    $("#styleType").attr("checked",true);
		}
	}
	
	//展示样式切换
	$("#styleType").bootstrapSwitch({
        onText: '平铺',
        offText: '标准',
        onColor: "primary",
        offColor: "primary",
        onSwitchChange: function (e, state) {
            if (state == true) {
            	layout ="styleDefault";
            } else {
            	layout ="styleNormal";
            }
            localStorage.setItem("layout",layout);
            refresh();
        }
	 });
	
	// 1、附件信息
	
	//订单详情查看
	$("#audit-view-interview-file-btn").on("click", function(){
		var _this = this;
		var dataTitle = $(_this).attr("data-title");
		openTabForParent(ctx + "/cfFileCenter/viewUploadInterview.action?id=" + acceptId, "-view-order-interview-file-detail-" + acceptId, "("+dataTitle+")订单面签附件");
	});
	
	$("#audit-view-order-file-btn").on( "click", function () {
		var options = {
			width	: 1200,
			top		: 200,
			height	: 570,
			overlay	: true,
			dispose	: true,
			move	: true,
			onBeforeShow: function () {
				// 订单附件
				$("#audit-detail-select-file-type").chosen({
					disable_search_threshold: 10,
					no_results_text: '无数据',
					width: "100%"
				}).on("change", function (evt, params) {
					$("#refresh-file-btn").trigger("click");
				});
				// 初始化分页加载附件
				dataProxy.loadOrderFileByPage("#file-list", acceptId, null, 0, "#pagination", function (data) {
					$("#file-list").html("");
					var rows = data["recordList"];
					var html = UI.createFileItemHtml(rows, false);
					$("#file-list").append(html);
					$("#file-list").find(".pre-img").on("click",function(){
						$.openPhotoGallery(this)
					})
				});
				// 刷新按钮
				$("#refresh-file-btn").on( "click", function () {
					dataProxy.loadOrderFileByPage("#file-list",acceptId, $("#audit-detail-select-file-type").val(),0, "#pagination", function (data) {
						$("#file-list").html("");
						var rows = data["recordList"];
						var html = UI.createFileItemHtml( rows, false);
						$("#file-list").append(html);
						$("#file-list").find(".pre-img").on("click",function(){
							$.openPhotoGallery(this)
						})
					});
				});
				// 订单附件下载（是否有下载附件权限）
				if ($("#downloadOrderFile").length > 0) {
					$("#download-file-btn").on("click", function () {
						downProgressTip(acceptId, $("#audit-detail-select-file-type").val(),'cfFileCenter/getDownloadCount.action')
					});
				} else {
					$("#download-file-btn").parent("div.col-md-2").remove();
				}
			},
			onAfterHide:function (){
		        parent.parent.$("#J_pg").remove();
			},
			callback: function () {
				
			}
		};
		var viewDlg = new Dialog("#view-order-file-dialog", options);
		viewDlg.show();
	});

	// 2、查询审核历史信息
	dataProxy.getAuditHistoryByAcceptId(acceptId, true, "#audit-history-list", function (data) {
		// 初始化表格
		var html = UI.createAuditHistoryHtml(data)
		$("#audit-history-list").append(html);
		// 初始化查看事件
		initAuditHistoryDetailEvent();
	});
	// 3、查询购车人征信信息
	dataProxy.getCreditInfoByAcceptId(acceptId, null, true, "#audit-credit-list", function (data) {
		var html = UI.createCreditHtml(data);
		$("#audit-credit-list").append(html);
	});

	//4、大数据征信
	dataProxy.getBigDataCreditByAcceptId(acceptId, true, "#audit-big-data-list", function (data) {
		var html = UI.createBigDataCreditHtml(data);
		$("#audit-big-data-list").append(html);
	});
	// 查询征信、征信详情查看按钮
	var isQueryed = false;
	$(".query-credit-btn").on("click", function () {
		if(isQueryed){
			return;
		}else{
			isQueryed = true;
		}
		loadingShow();
		var _this = $(this);
		_this.addClass("disabled").attr("disabled", "disabled");
		$.ajax({
			url		: ctx + '/risk/queryForLoan.action?acceptId=' + acceptId,
			type	: "post",
			dataType: "json",
			async	: false,
			success	: function (data) {
				loadingHide();
				isQueryed = false;
				_this.removeClass("disabled").removeAttr("disabled");
				if (data.error == 1) {
					$("#audit-big-data-list").empty();
					var html = UI.createBigDataCreditHtml(data["rows"]);
					$("#audit-big-data-list").append(html);
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	});
	// 详情查看
	new LoanCreditQuery(".detail-credit-btn", acceptId);
	
	//自动化审批详情
	new AutoAuditCreditQuery(".auto-credit-btn", acceptId);
	
	//5、自动化审核（首先判断是否存在自动化审核）
	if($("#auto-audit-list").length > 0){
		$("#auto-audit-list").empty();			//清空组件
		dataProxy.getAutoAuditList(acceptId, true, "#auto-audit-list", function (data) {
			$("#auto-audit-list").empty();			//清空组件
			var html = UI.createAutoAuditCreditHtml(data);
			$("#auto-audit-list").append(html);
		});
	}
	//视频面签
	dataProxy.getVideoOrderInfo(acceptId, true, "#audit-video-order-list", function (data) {
		var html = UI.createVideoOrderHtml(data);
		$("#audit-video-order-list").append(html);
		$("#audit-video-order-list .detail").click(function () {
			var viewDlg = new Dialog("#btn-showVideo", {
				width: 800,
				top: 200,
				height: 480,
				overlay: true,
				dispose: true,
				move: true,
				move: true,
				onBeforeShow :  function (){
					$("#video source").attr("src",$("#video_url").val());
				},
				callback: function () {

				}
			});
			viewDlg.show();
		});
		var answer = new VideoAnswer("#viewInterviewQuestion", $("#view_id").val())
	});

	// 8、客户历史订单
	dataProxy.getHistoryOrderInfo( acceptId, true, "#audit-history-order-list", function (data) {
		var html = UI.createHistoryOrderHtml(data);
		$("#audit-history-order-list").append(html);
		$("#audit-history-order-list").find(".detail").on( "click", function () {
			var id = $(this).attr("value");
			window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id + "&goBackUrl=" + (ctx + "/audit/queryForAudited.action");
		});
	});

	// 9、获取购车人信息
	dataProxy.getBuyerInfoByAcceptId( acceptId, true, "BUYER", "#audit-buyer-information-list", function (data) {
		var newBuyerTag ="";
		if(layout == "styleNormal"){
			newBuyerTag = buyerTag;
		}else{
			newBuyerTag = getAllTag(buyerTag);
		}
		// 针对购车人配置相关的特殊设置
		dataProxy.updateConfig(newBuyerTag, function (config) {
			UI.setConfigTagReadOnly(config);
		});
		// 初始化购车人信息组件
		
		new HYCarFinance.form({
			id			: '#audit-buyer-information-list',
			items		: newBuyerTag,
			beforeShow	: function () {
				// 设置默认值
				if (null != data) {
					UI.setDefaultValue( "#audit-buyer-information-list", data);
					
					//设置订单视频面签按钮属性值
					$("#audit-view-interview-file-btn").attr("data-title", data["realName"]);
					
					// 格式化货币值
					UI.formatMoney("#audit-buyer-information-list",["monthIncome","currentPrice","loanMoney","repayAmountMonth"]);
					// 紧急联系人信息
					var contact = data.contactPersonEntities;
					if (null != contact) {
						for (var i = 0; i < contact.length; i++) {
							var k = i + 1;
							var v = contact[i];
							$("#contacterId" + k).val(v.id);
							$("#contacterRealName" + k).val(v.realName);
							$("#relationTypeCode" + k).val(v.relationTypeCode);
							$("#contacterTel" + k).val(v.contactTel);
							$("#contacterPhone" + k).val(v.phone);
						}
					}
					$("#currentAddress").val(data["currentAddressProvince"].split("-").join('')+ data["currentAddress"]);
					$("#familyAddress").val(data["familyAddressProvince"].split("-").join('')+ data["familyAddress"]);
					$("#houseAddress").val(data["houseAddressProvince"].split("-").join('')+ data["houseAddress"]);
					$("#companyAddress").val(data["companyProvince"].split("-").join('')+ data["companyAddress"]);
					// 户籍
					$("#audit-buyer-information-list").find("input[name='province']").val(data["province"].split("-").join(''));
					$("#audit-buyer-information-list").find("select").trigger("chosen:updated");
				}
			}
		});
	});

	// 10、配偶信息
	dataProxy.getBuyerInfoByAcceptId(acceptId, true, "SHARED", "#audit-parter-information-list", function (data) {
		if (null == data || data.length == 0) {
			setNoDataTip("#audit-parter-information-list", "暂无配偶");
			return;
		}
		var newSharedTag ="";
		if(layout == "styleNormal"){
			newSharedTag = sharedTag;
		}else{
			newSharedTag = getAllTag(sharedTag);
		}
		// 针对配偶配置相关的特殊设置
		dataProxy.updateConfig(newSharedTag, function (config) {
			UI.setConfigTagReadOnly(config);
		});
		// 初始化购车人信息组件
		new HYCarFinance.form({
			id			: '#audit-parter-information-list',
			items		: newSharedTag,
			beforeShow	: function () {
				// 设置默认值
				if (null != data) {
					UI.setDefaultValue("#audit-parter-information-list", data);
					// 格式化货币值
					UI.formatMoney("#audit-parter-information-list",["monthIncome"]);
					// 地址
					$('#audit-parter-information-list').find("input[name='province']").val(data["province"].split("-").join(''));
					$("#sharedCurrentAddress").val(data["currentAddressProvince"].split("-").join('') + data["currentAddress"]);
					$("#sharedCompanyAddress").val(data["companyProvince"].split("-").join('') + data["companyAddress"]);
					$("#audit-parter-information-list").find("select").trigger("chosen:updated");
				}
			}
		});
	});

	// 11、担保人信息
	dataProxy.getBuyerInfoByAcceptId(acceptId, true, "SPONSOR", "#audit-sponsor-information-list", function (data) {
		if (null == data || data.length <= 0) {
			var html = UI.createFiledSetNoDataTip("担保人","暂无担保人信息");
			$("#audit-sponsor-information-list").append(html);
		} else {
			for (var j = 0; j < data.length; j++) {
				var item = data[j];
				var newSponsorTag ="";
				if(layout == "styleNormal"){
					newSponsorTag = JSON.parse(JSON.stringify(sponsorTag));
				}else{
					newSponsorTag = getAllTag(JSON.parse(JSON.stringify(sponsorTag)));
				}
				// 针对担保人做id、配置相关的特殊设置
				dataProxy.updateConfig(newSponsorTag, function (config) {
					if (typeof (config["id"]) != "undefined" && null != config["id"]) {
						config["id"] = config["id"] + "-" + j;
					} else {
						config["id"] = "sponsor-" + config["name"] + "-" + j;
					}
					UI.setConfigTagReadOnly(config);
				});
				new HYCarFinance.form({
					id		: '#audit-sponsor-information-list',
					title	: '担保人' + UI.getUpperNumber(j + 1),
					xtype	: 'fieldset',
					index	: j,
					items	: newSponsorTag,
					beforeShow: function () {
						// 设置默认值
						if (null != item) {
							UI.setDefaultValue("#fieldset-" + j, item);
							$("#fieldset-" + j).find("select").trigger("chosen:updated");
							// 地址
							$("#province-" + j).val(item["province"].split("-").join(''));
							$("#sponsor-currentAddressProvince-" + j).val(item["currentAddressProvince"].split("-").join('') + item["currentAddress"]);
							$("#sponsor-houseAddressProvince-" + j).val(item["houseAddressProvince"].split("-").join('') + item["houseAddress"]);
							$("#sponsor-companyProvince-" + j).val(item["companyProvince"].split("-").join('') + item["companyAddress"]);
						}
					}
				});
				// 格式化货币值
				UI.formatMoney("#fieldset-" + j, ["monthIncome", "currentPrice", "loanMoney", "repayAmountMonth"]);
			}
		}
	});

	// 12、车辆信息
	dataProxy.getCarInfo(acceptId, true, 0, "#audit-car-information-list", function (data) {
		var newCarTag ="";
		if(layout == "styleNormal"){
			newCarTag = carTag;
		}else{
			newCarTag = getAllTag(carTag,'bigger');
		}
		// 针对车辆信息配置相关的特殊设置
		dataProxy.updateConfig(newCarTag, function (config) {
			if (config["name"] == "cfProductId") {
				config["url"] = ctx + "/product/getList.action?bankId=" + bankId;
			}
			// 设置组件只读
			UI.setConfigTagReadOnly(config);
			// 隐藏配置按钮
			UI.hideConfigTagButton(config);
		});

		new HYCarFinance.form({
			id			: '#audit-car-information-list',
			items		: newCarTag,
			beforeShow	: function () {
				// 设置初始化值
				UI.setDefaultValue("#audit-car-information-list", data);
				// 格式化货币值
				UI.formatMoney("#audit-car-information-list", ["auditCarPrice", "contractCarPrice", "actualFirstPay", "actualLoadMoney", "installmentPayMoney", "installmentPayPoundage", "contractPrice", "repayMonth", "firstRepay"]);
				if (data["newOrOld"] == 0) {
					showOldCar(data);
				}
				
				//货币格式
				initCenRongProduct($("#cfProductId").find("option:selected").text(),data, function () {
					UI.formatMoney("#audit-car-information-list", ["configTaxFee", "insuranceFee", "totalFee"]);
				});
				initProduct(bankId, data["cfProductId"], "#loanPeriodMonthCode", function () {
					$("#loanPeriodMonthCode").val(data["loanPeriodMonthCode"]);
					$("#loanPeriodMonthCode").trigger("chosen:updated");
				});
				carConnect(data["carBrandId"]);
	/*
				selectCarBrand("#carBrandId", $("#carProduceArea").val(), function () {
					$("#carBrandId").val(data["carBrandId"]);
					$("#carBrandId").trigger("chosen:updated");
				});*/
				$("#carLicenseProvince").val(data["carLicenseProvince"].split("-").join(''));
				// 设置年限警示标记
				if (null != data && data["isWarning"] == 1) {
					$('<span class="irs"><span class="irs-from" style="visibility: visible; left: 56px;top:-26px; display: block;">年限:' + data["yearLimit"] + '</span></span>').appendTo($("#newOrOld").parent().prev());
				}
			}
		});
	});

	//参融产品
	function initCenRongProduct(cfProductId,data, callback) {
		var $parentDiv = $('input[name="firstRepay"]').parent();
		if (cfProductId == '' || cfProductId == undefined || cfProductId.indexOf('参融产品') < 0) {
			if(layout == "styleNormal"){
				$parentDiv.nextAll().empty();
			}else{
				$parentDiv.nextUntil(".plain-textarea").remove();
			}
		}
		callback();
	}
//		var insuranceFee = data != null && data["insuranceFee"] != null ? data["insuranceFee"] : '';
//		var configTaxFee = data != null && data["configTaxFee"] != null ? data["configTaxFee"] : '';
//		var totalFee = data != null && data["totalFee"] != null ? data["totalFee"] : '';
//		
//			var html = '<label class="col-md-1 control-label">保险费用:</label>' +
//			'<div class="col-md-2"><input obj="float" maxlength="9" value="' + insuranceFee + '" name="insuranceFee" class="form-control" readonly="readonly" type="text"></div>' +
//			'<label class="col-md-1 control-label">配置税:</label>' +
//			'<div class="col-md-2"><input obj="float" maxlength="9" value="' + configTaxFee + '" name="configTaxFee" class="form-control" readonly="readonly" type="text"></div>' +
//			'<label class="col-md-1 control-label">参融总和:</label>' +
//			'<div class="col-md-2"><input obj="float" maxlength="9" readonly="readonly" value="' + totalFee + '" name="totalFee" class="form-control" readonly="readonly" type="text"></div>';
//		$parentDiv.after(html);
		

	// 产品类型
	function initProduct(bankId, cfProductId, loanPeriodMonthCode, callback) {
		dataProxy.getCarProductInfo(bankId, cfProductId, true, function (data) {
			var options = "<option value=''>请选择</option>";
			$.each(data, function (k, p) {
				options += "<option value='" + p.yearsCode + "'>" + p.yearsCodeName + "</option>";
			});
			$(loanPeriodMonthCode).empty();
			$(loanPeriodMonthCode).append(options);
			callback();
		});
	}
	 function carConnect(res){
		 $.ajax({
             url: ctx + "/cfCarBrand/detail.action",
             type: "post",
             data: {id: res},
             dataType: 'json',
             success: function (result) {
                 if (result.error == 1) {
                     var brandName = result.rows.brandName;
                     $("#carBrandId").val(brandName);
                 }
             }
         })
	 }
	/*// 根据车辆类型加载车辆品牌
	function selectCarBrand(id, category, callback) {
		dataProxy.getCarBrandType(category, null, function (brands) {
			var options = "<option value=''>请选择</option>";
			$.each(brands, function (k, p) {
				options += "<option value='" + p.id + "'>" + p.brandName + "</option>";
			});
			$(id).empty();
			$(id).append(options);
			callback();
		});
	} // end selectCarBrand()
*/
	// 13、垫款申请
	dataProxy.getApplyPayByAcceptId(acceptId, true, "#audit-apply-pay-list", function (data) {
		var newApplyPay ="";
		if(layout == "styleNormal"){
			newApplyPay = advanceTag;
		}else{
			newApplyPay = getAllTag(advanceTag,'bigger');
		}
		// 针对垫款申请配置相关的特殊设置
		dataProxy.updateConfig(newApplyPay, function (config) {
			UI.setConfigTagReadOnly(config);
		});
		// 初始化购车人信息组件
		new HYCarFinance.form({
			id			: '#audit-apply-pay-list',
			items		: newApplyPay,
			beforeShow	: function () {
				// 设置初始化值
				UI.setDefaultValue("#audit-apply-pay-list", data);
				// 格式化货币值
				UI.formatMoney("#audit-apply-pay-list", [
					"moneyAmount", "serviceFee", "poundage",
					"agreeEnsureMoney", "channelEnsureMoney",
					"licensePlateEnsureMoney", "amountMoney"]);
			}
		});
	});

	// 14、查询审核意见
	dataProxy.getAuditSuggestionByAcceptId(acceptId, true, "#audit-suggestion-list", function (data) {
		var isFirst = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i]["configPermission"] == 1 && data[i]['isCurrent'] == 1 && data[i]['isAudit'] == 1) {
				isFirst = isFirst + 1;
				createAuditHtml(i, data[i], isFirst, layout);
				break;
			} else if (data[i]["configPermission"] == 1) {
				isFirst = isFirst + 1;
				if(data[i]['isCurrent'] == 1 && data[i]['isAudit'] == 0 ){
					break;
				}
				createAuditHtml(i, data[i], isFirst, layout);
				if(data[i]['isCurrent'] == 1){
					break;
				}
			}
		}
		// 初始化复选框组件
		$(".audit-checkbox").add(".audit-supply-checkbox").iCheck({
			checkboxClass: "icheckbox_square-green"
		});
		$(".audit-checkbox").on('ifChecked', function (event) {
			var desc = $(this).text();
			var auditTxt = $("#auditDescription").val();
			if ($.trim(auditTxt) == "") {
				auditTxt = "缺少" + auditTxt;
			} else {
				desc = '，' + desc;
			}
			$("#auditDescription").val(auditTxt + desc);
		});
		// 初始化审核表单校验
		var validater = initAuditFormValidate();
		// 初始化按钮事件
		initAuditEvent(validater);
	});

	// 审核详情查看
	function initAuditHistoryDetailEvent() {
		$("#audit-history-list").find(".detail").on("click", function () {
			var id = $(this).attr("value");
			dataProxy.getAuditDetailById(id, true, function (data) {
				var options = {
					width		: 800,
					top			: 200,
					height		: 480,
					overlay		: true,
					dispose		: true,
					move		: true,
					move		: true,
					url			: '',
					onBeforeShow: function () {
						$("#auditType").val(data["auditTypeName"]);
						$("#auditResult").val(data["auditStatusStr"]);
						$("#auditor").val(data["auditUser"]);
						$("#auditTime").val(data["auditTime"]);
						$("#auditDescriptionView").val(data["auditBak"]);
					},
					callback: function () {
					}
				};
				var viewDlg = new Dialog("#view-audit-dialog", options);
				viewDlg.show();
			});
		});
	}

	// 初始化审核表单校验
	function initAuditFormValidate() {
		var auditValidate = null;
		var forms = $(".audit-form");
		for (var i = 0; i < forms.length; i++) {
			var _this = forms[i];
			var isRead = $(_this).find("textarea").attr("readonly");
			if (isRead != "readonly") { // 表单校验
				auditValidate = new ValidateWin("#" + $(_this).parent().attr("id"), {
					callback: function (content, event) {}
				});
				break;
			}
		}
		return auditValidate;
	}

	// 初始化审核按钮相关事件
	function initAuditEvent(validater) {
		// 换审核
		$(".change-audit-btn").on("click", function () {
			// 移除校验样式
			$("#auditDescription").removeClass("input_validation-failed");
			// 提交判断
			var id = $("#acceptId").val();
			var pType = $(this).attr("data-type");
			var nodeName = $(this).attr("data-name");
			if (null == id || "" == id) {
				faildMsg("订单编号不存在");
				return;
			}
			confirmDialog("确认换审核该订单？", function () {
				var params = {
					idArr: id,
					pType: pType,
					nodeName: nodeName
				};
				dataProxy.changeAuditUser(params, function (data) {
					successMsg("操作成功！", 1000, refresh);
				});
			});
		});
		// 拒单
		$(".discard-audit-btn").on( "click", function () {
			var isSubmit = validater.mySubmit(validater);
			if (!isSubmit) {
				return;
			}
			var id = $("#acceptId").val();
			if (null == id || "" == id) {
				faildMsg("订单编号不存在");
				return;
			}
			var desc = $(this).parents(".audit-wrap").find("textarea").val();
			if (null == desc || "" == $.trim(desc)) {
				faildMsg("审核意见不能为空");
				return;
			}
			var pType = $(this).attr("data-type");
			var nodeName = $(this).attr("data-name");
			confirmDialog("确认拒绝该订单？", function () {
				var param = {
					id		: id,
					status	: -4,
					pType	: pType,
					nodeName: nodeName,
					isWait	: 0,
					desc	: $.trim(desc)
				};
				dataProxy.auditOrder(param, function (data) {
					successMsg("订单拒绝成功！", 1000, closeParentCurrentTab);
				});
			});
		});
		// 退回
		$(".back-audit-btn").on("click", function () {
			var isSubmit = validater.mySubmit(validater);
			if (!isSubmit) {
				return;
			}
			var id = $("#acceptId").val();
			if (null == id || "" == id) {
				faildMsg("订单编号不存在");
				return;
			}
			var desc = $(this).parents(".audit-wrap").find("textarea").val();
			if (null == desc || "" == $.trim(desc)) {
				faildMsg("审核意见不能为空");
				return;
			}
			var pType = $(this).attr("data-type");
			var nodeName = $(this).attr("data-name");
			confirmDialog("确认退回该订单？", function () {
				var param = {
					id		: id,
					status	: -2,
					pType	: pType,
					isWait	: 0,
					nodeName: nodeName,
					desc	: $.trim(desc)
				};
				dataProxy.auditOrder(param, function (data) {
					successMsg("订单退回成功！", 1000, closeParentCurrentTab);
				});
			});
		});
		// 保存
		$(".save-audit-btn").on("click", function () {
			var isSubmit = validater.mySubmit(validater);
			if (!isSubmit) {
				return;
			}
			var id = $("#acceptId").val();
			if (null == id || "" == id) {
				faildMsg("订单编号不存在");
				return;
			}
			var desc = $(this).parents(".audit-wrap").find("textarea").val();
			if (null == desc || "" == $.trim(desc)) {
				faildMsg("审核意见不能为空");
				return;
			}
			var pType = $(this).attr("data-type");
			var nodeName = $(this).attr("data-name");
			confirmDialog("确认保存该订单审核信息？", function () {
				vardesc = $.trim(desc).replace(",", "&#44;");
				var param = {
					id: id,
					status: 3,
					pType: pType,
					nodeName: nodeName,
					isWait: $("#audit-wait-file").is(':checked') ? 1 : 0,
					desc: desc
				};
				dataProxy.auditOrder(param, function (data) {
					successMsg("订单保存成功！", 1000, refresh);
				});
			});
		});
		// 同意
		$(".agree-audit-btn").on("click", function () {
			var isSubmit = validater.mySubmit(validater);
			if (!isSubmit) {
				return;
			}
			var id = $("#acceptId").val();
			if (null == id || "" == id) {
				faildMsg("订单编号不存在");
				return;
			}
			var desc = $(this).parents(".audit-wrap").find("textarea").val();
			if (null == desc || "" == $.trim(desc)) {
				faildMsg("审核意见不能为空");
				return;
			}
			var pType = $(this).attr("data-type");
			var nodeName = $(this).attr("data-name");
			confirmDialog("确认同意该订单？", function () {
				var param = {
					id: id,
					status: 2,
					pType: pType,
					nodeName: nodeName,
					isWait: $("#audit-wait-file").is(':checked') ? 1 : 0,
					desc: $.trim(desc)
				};
				dataProxy.auditOrder(param, function (data) {
					successMsg("订单审核成功！", 1000, closeParentCurrentTab);
				});
			});
		});
	
		// 审核描述信息提示
		$('#auditDescription').keyup(function () {
			var curLength = $(this).val().trim().length;
			$(this).next("span").find(".input").html( curLength > 1000 ? 1000 : curLength);
			$(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
			if (curLength > 1000) {
				var num = $(this).val().trim().substr(0, 1000);
				$(this).val(num);
			}
		});
	}

	// 初始化审核信息组件
	function createAuditHtml(index, node, isFirst, layout) {
		var html = "";
		html += '<fieldset>';
		html += '<legend>' + node['auditTypeName'] + '</legend>';
		html += '<div class="audit-wrap" id="audit-wrap-' + index + '">';
		html += '<form class="form-horizontal audit-form">';
		if (isFirst == 1 && node['isCurrent'] == 1 && dictData['120000'].length > 0) {
			html += '<div class="m-rl-tb m-t-xs row">';
			html += '<label class="col-md-1 control-label">客户缺少:</label>';
			html += '<div class="col-md-11">';
			for (var i = 0; i < dictData['120000'].length; i++) {
				html += '<label class="audit-checkbox checkbox-inline"><input type="checkbox" value="' + dictData['120000'][i]["key"] + '" >' + dictData['120000'][i]["value"] + '</label>';
			}
			html += '</div>';
			html += '</div>';
		}
		// 候补资料复选框
		if (node["businessStatus"] >= 4) {
			html += '<div class="m-rl-tb m-t-xs row">';
			html += '<label class="col-md-1 control-label"></label>';
			html += '<div class="col-md-11">';
			if (node["isCurrent"] == 1) {
				html += '<div class="col-md-2 no-padding"><label class="audit-checkbox checkbox-inline"><input ' + (node["isWait"] > 0 ? "checked='checked'" : "") + ' type="checkbox" id="audit-wait-file" >资料候补</label></div>';
			} else {
				if (node["isWait"] > 0) {
					html += '<div class="col-md-2 no-padding"><label class="audit-checkbox checkbox-inline"><input type="checkbox" checked="checked" disabled="disabled" name="waitFile" >资料候补</label></div>';
				} else {
					html += '<div class="col-md-2 no-padding"><label class="audit-checkbox checkbox-inline"><input type="checkbox"  disabled="disabled"  name="waitFile">资料候补</label></div>';
				}
			}
			html += '</div>';
			html += '</div>';
		}
		// 一行
		html += '<div class="m-rl-tb m-t-xs row">';
		html += '<label class="col-md-1 control-label">' + (node['isCurrent'] == 1 ? '<span class="red">*</span>' : "") + '审核意见:</label>';
		var auditBak = node["auditBak"];
		var bakLength = (typeof(auditBak) != "undefined" && "" != auditBak) ? auditBak.length : 0
		html += '<div class="col-md-11"><textarea style="height:120px;" ' + (node['isCurrent'] == 1 ? 'id="auditDescription" tip="审核意见不能为空" reg="not_null"' : 'readonly="readonly"') + '  value="" name="auditRemark" class="form-control">' + auditBak + '</textarea>' + (node['isCurrent'] == 1 ? '<span class="help-block m-b-none"><i class="fa fa-info-circle"></i>您已经填写<code><font class="input">'+bakLength+'</font></code>个字，还可添加<code><font class="can-input">'+(1000-bakLength)+'</font></code>个</span>' : "") + '</div>';
		html += '</div>';
		// 二行
		html += '<div class="m-rl-tb row" id="audit-operate-' + index + '">';
		html += '<label class="col-md-1 control-label">审核人:</label>';
		if(layout== 'styleNormal'){
			html += '<div class="col-md-2"><input readonly="readonly" ' + (node['isCurrent'] == 1 ? 'value="' + $("#auditUser").val() + '"' : 'value="' + node['auditUser'] + '"') + ' name="auditUser" class="form-control"></input></div>';
			html += '<label class="col-md-1 control-label">' + (node['isCurrent'] == 1 ? "审核日期" : "审核时间") + ':</label>';
			html += '<div class="col-md-2"><input readonly="readonly" ' + (node['isCurrent'] == 1 ? 'value="' + $("#auditDate").val() + '"' : 'value="' + node['auditTime'] + '"') + ' name="auditRemark" class="form-control"></input></div>';
		}else{
			html += '<div class="col-md-2 m-t-xs"><input readonly="readonly" ' + (node['isCurrent'] == 1 ? 'value="' + $("#auditUser").val() + '"' : 'value="' + node['auditUser'] + '"') + ' name="auditUser" class="form-control"></input></div>';
			html += '<label class="col-md-1 control-label">' + (node['isCurrent'] == 1 ? "审核日期" : "审核时间") + ':</label>';
			html += '<div class="col-md-2 m-t-xs"><input readonly="readonly" ' + (node['isCurrent'] == 1 ? 'value="' + $("#auditDate").val() + '"' : 'value="' + node['auditTime'] + '"') + ' name="auditRemark" class="form-control"></input></div>';
		}
		/*html += '<div class="col-md-11">';
		html += '<div class="row mr-none">';*/
		if (node['isCurrent'] == 1 && node["isAudit"] == 1) {
			html += '<div class="col-md-6 text-right">';
			html += '<button type="button" data-type="' + node['processDefinitionType'] + '" data-name="' + node['nodeName'] + '" class="btn btn-w-m btn-primary m-r-xs change-audit-btn">换审核</button>';
			html += '<button type="button" data-type="' + node['processDefinitionType'] + '" data-name="' + node['nodeName'] + '" class="btn btn-w-m btn-warning m-r-xs discard-audit-btn">拒单</button>';
			html += '<button type="button" data-type="' + node['processDefinitionType'] + '" data-name="' + node['nodeName'] + '" class="btn btn-w-m btn-danger m-r-xs back-audit-btn">退回</button>';
			html += '<button type="button" data-type="' + node['processDefinitionType'] + '" data-name="' + node['nodeName'] + '" class="btn btn-w-m btn-info m-r-xs  save-audit-btn">保存</button>';
			html += '<button type="button" data-type="' + node['processDefinitionType'] + '" data-name="' + node['nodeName'] + '" class="btn btn-w-m btn-success agree-audit-btn">同意</button>';
			html += '</div>'
		}
		/*html += '</div>';
		html += '</div>';*/
		html += '</div>';
		html += '</form>';
		html += '</div>';
		html += '</fieldset>';
		$("#audit-suggestion-list").append(html);
	}

	// 暂无数据提示
	function setNoDataTip(id, msg) {
		$(id).html('<div class="text-center">' + (null != msg ? msg : "暂无数据") + '</div>');
	}

	// 二手车
	function showOldCar(result) {
		var html ='';
		if(layout == "styleNormal"){
			var $parentDiv = $("#audit-car-information-list select[name='newOrOld']").parents(".m-rl-tb.row");
			html = '<div class="m-rl-tb row oldCar">'
			    + '<label class="col-md-1 control-label">车架号:</label>'
			    + '<div class="col-md-2"><input type="text" value="'+ result["vinNo"] + '" id="vinNo" name="vinNo" class="form-control" readonly></div>'
			    + '<label class="col-md-1 control-label">二手车登记日期:</label>';
			if (result["initRegisterDateStr"] != null && result["initRegisterDateStr"] != '') {
			    html += '<div class="col-md-2"><input type="text" value="'+ result["initRegisterDateStr"] + '" id="initRegisterDate" name="initRegisterDate" class="form-control" readonly></div>';
			} else {
			    html += '<div class="col-md-2"><input type="text" value="" id="initRegisterDate" name="initRegisterDate" class="form-control" readonly></div>';
			}
			html += '<label class="col-md-1 control-label">初始评估价(元):</label>'
			    + '<div class="col-md-2"><input type="text" name="initEvaluatePrice" value=""  class="form-control lightUp" readonly></div>'
			    + '<label class="col-md-1 control-label">车300评估价(元):</label>'
			    + '<div class="col-md-2"><input type="text" name="evaluate300Price" value="" class="form-control" readonly></div>';
		}else{
			var $parentDiv = $("#audit-car-information-list select[name='newOrOld']").parent(".plain-block-bigger");
			html+='<div class="plain-block plain-block-bigger">'
				+'<label class="control-label">车架号:</label><input type="text" value="'+ result["vinNo"] + '" id="vinNo" name="vinNo" class="form-control" readonly></div>'
				+'<div class="plain-block plain-block-bigger">'
				+ '<label class="control-label">二手车登记日期:</label>';
			if (result["initRegisterDateStr"] != null && result["initRegisterDateStr"] != '') {
				html+='<input type="text" value="'+ result["initRegisterDateStr"] + '" id="initRegisterDate" name="initRegisterDate" class="form-control" readonly>';
			}else{
				html+='<input type="text" value="" id="initRegisterDate" name="initRegisterDate" class="form-control" readonly>';
			}
			html+='</div><div class="plain-block plain-block-bigger oldCar">'
				+'<label class="control-label">初始评估价(元):</label><input type="text" name="initEvaluatePrice" value=""  class="form-control lightUp" readonly></div>'
				+'<div class="plain-block plain-block-bigger  oldCar">'
				+'<label class="control-label">车300评估价(元):</label><input type="text" name="evaluate300Price" value="" class="form-control" readonly>';
		}
		html +='</div>';
		
		$parentDiv.after(html);
		// 加载数据
		initOlderCarRegisterData(result["vinNo"]);
	}

	function initOlderCarRegisterData(vinNO) {
		$.ajax({
			url		: ctx + "/cfBusinessOrderAccept/getByVin.action",
			type	: "post",
			data	: {
				vin		: vinNO,
				bankId	: bankId,
				acceptId: acceptId
			},
			dataType: "json",
			success: function (data) {
				if (data.error == 1 && data.rows != null) {
					var d = data.rows;
					$(".oldCar input[name='initEvaluatePrice']").val(NumberFormatUtil.fmoney(d.initEvaluatePrice, 2));
					$(".oldCar input[name='evaluate300Price']").val( NumberFormatUtil.fmoney(d.evaluate300Price, 2));
				} else {
					faildMsg(data.message);
				}
			}
		});
	};
	
	function refresh(){
		window.location.reload();
	}
});