jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    /************************* 公共对象 ***********************/
    var dataProxy = new HYCarFinance.carProxy();
    var UI = new HYCarFinance.UI();
    /*********************** end 公共对象 *********************/

    /********************* 业务受理单相关信息 *******************/
    var acceptId = $("#acceptId").val();
    var auditUser = $("#auditUser").val();
    var auditDate = $("#auditDate").val();
    var staticUrl = $("#staticUrl").val();
    var orderStatus = $("#orderStatus").val();
    var buyerName = $("#buyerName").val();
    /*******************end 业务受理单相关信息 *****************/

    /********************** 业务处理操作 *********************/
    setTabEvent();								//选项卡事件
    getProcessDetail();							//订单流程图
    setDefaultBtnEvent();						//按钮事件
    /********************end 业务处理操作 *******************/

    //设置tab页卡宽度
    var tWidth = parseFloat(100 / $(".order-detail-tab .nav-tabs").find("li").length).toFixed(1);
    $(".order-detail-tab .nav-tabs").find("li").each(function (i, n) {
        if ((i + 1) == $(".order-detail-tab .nav-tabs").find("li").length) {
            tWidth = tWidth - 0.1;
        }
        $(n).css({
            width: tWidth + "%"
        });
    });

    //大数据征信
    new LoanCreditQuery(".detail-credit-btn", acceptId, true);
    
    //自动化审批详情
    new AutoAuditCreditQuery(".auto-credit-btn", acceptId);

    //加载订单流程及业务状态详情
    function getProcessDetail() {
        //清空组件
        $("#order-process-wrap").empty();
        $("#order-status-wrap").empty();
        dataProxy.getProcessDetail(acceptId, true, "#order-process-status-wrap", function (data) {
            /*var processHtml = UI.createOrderProcessPic(data["rows"]["processes"]);
             $("#order-process-wrap").width($("#order-process-status-wrap").width() - 100);
             $("#order-process-wrap").append(processHtml);
             $(window).bind("load resize", function () {
             $("#order-process-wrap").width($("#order-process-status-wrap").width() - 100);
             }); 隐藏流程图 */
            var statusHtml = UI.createOrderStatusGrid(data["rows"]["auditStatus"], data["rows"]["orderStatus"]);
            $("#order-status-wrap").append(statusHtml);
        });
    }

    //获取购车人信息
    function getBuyerInfo() {
        //清空组件
        $("#audit-detail-buyer-information-list").empty();
        //购车人信息
        dataProxy.getBuyerInfoByAcceptId(acceptId, true, "BUYER", "#audit-detail-buyer-information-list", function (data) {
            var newBuyerTag = buyerTag;
            dataProxy.updateConfig(newBuyerTag, function (config) {			//针对购车人配置相关的特殊设置（只读）
                UI.setConfigTagReadOnly(config);
            });
            //初始化购车人信息组件
            new HYCarFinance.form({
                id: '#audit-detail-buyer-information-list',
                items: newBuyerTag,
                beforeShow: function () {
                    if (null != data) {																		//设置默认值
                        UI.setDefaultValue("#audit-detail-buyer-information-list", data);
                        $("#audit-detail-buyer-information-list").find("select").trigger("chosen:updated");
                        $('#audit-detail-buyer-information-list').find("input").each(function (i, n) {		//回写省份、城市
                            var name = $(n).attr("name");
                            initProvince(name, n, data);
                        });
                        clearContacterValue();																//清空联系人组件值
                        var contact = data.contactPersonEntities;
                        for (var i = 0; i < contact.length; i++) {											//重置联系人值
                            var k = i + 1;
                            var v = contact[i];
                            $("#contacterId" + k).val(v.id);
                            $("#contacterRealName" + k).val(v.realName);
                            $("#relationTypeCode" + k).val(v.relationTypeCode);
                            $("#relationTypeCode" + k).trigger("chosen:updated");
                            $("#contacterTel" + k).val(v.contactTel);
                            $("#contacterPhone" + k).val(v.phone);
                        }
                    }
                    var html = '<div class="m-rl-tb row"><label class="control-label col-md-1">附件:</label><div class="col-md-11 user-credit gallerys" style="padding: 0 7px 0 0">';		//遍历附件信息
                    if (null != data && null != data["fileVOS"] && null != data["fileVOS"].length > 0) {
                        for (var i = 0; i < data["fileVOS"].length; i++) {
                            html += createImgTag(staticUrl + data["fileVOS"][i]['fileGroup'] + '/' + data["fileVOS"][i]['filePath'], data["fileVOS"][i]['creditFileTypeName']);
                        }
                    } else {
                        html += createNoFileTip(null);
                    }
                    html += '</div></div>';
                    $("#audit-detail-buyer-information-list").find(".form-horizontal").append(html);
                    $(".pre-img").on("click", function () {
                        $.openPhotoGallery(this)
                    });
                }
            });
        });
    }

    //清空紧急联系人组件值
    function clearContacterValue() {
        $("#contacterId1").val("");
        $("#contacterId2").val("");
        $("#contacterRealName1").val("");
        $("#contacterRealName2").val("");
        $("#relationTypeCode1").val("");
        $("#relationTypeCode2").val("");
        $("#contacterTel1").val("");
        $("#contacterTel2").val("");
        $("#contacterPhone1").val("");
        $("#contacterPhone2").val("");
    }

    //获取配偶信息
    function getSharedInfo() {
        $("#audit-detail-parter-information-list").empty();
        //获取配偶信息
        dataProxy.getBuyerInfoByAcceptId(acceptId, true, "SHARED", "#audit-detail-parter-information-list", function (data) {
            if (null == data || data.length == 0) {
                setNoDataTip("#audit-detail-parter-information-list", "暂无配偶");
                return;
            }

            var newSharedTag = sharedTag;
            dataProxy.updateConfig(newSharedTag, function (config) {		//针对配偶信息配置相关的特殊设置
                UI.setConfigTagReadOnly(config);
            });
            //初始化购车人信息组件
            new HYCarFinance.form({
                id: '#audit-detail-parter-information-list',
                items: newSharedTag,
                beforeShow: function () {
                    if (null != data) {																			//设置默认值
                        UI.setDefaultValue("#audit-detail-parter-information-list", data);
                        $("#audit-detail-parter-information-list").find("select").trigger("chosen:updated");
                        $('#audit-detail-parter-information-list').find("input").each(function (i, n) {			//回写省份、城市
                            var name = $(n).attr("name");
                            initProvince(name, n, data);
                        });
                    }
                    var html = '<div class="m-rl-tb row"><label class="control-label col-md-1">附件:</label><div class="col-md-11 user-credit gallerys" style="padding: 0 7px 0 0">';		//遍历附件信息
                    if (null != data && null != data["fileVOS"] && null != data["fileVOS"].length > 0) {
                        for (var i = 0; i < data["fileVOS"].length; i++) {
                            html += createImgTag(staticUrl + data["fileVOS"][i]['fileGroup'] + '/' + data["fileVOS"][i]['filePath'], data["fileVOS"][i]['creditFileTypeName']);
                        }
                    } else {
                        html += createNoFileTip(null);
                    }
                    html += '</div></div>';
                    $("#audit-detail-parter-information-list").find(".form-horizontal").append(html);
                    //初始化图片控件
                    $(".pre-img").on("click", function () {
                        $.openPhotoGallery(this)
                    });
                }
            });
        });
    }


    //获取担保人
    function getSponsorInfo() {
        $("#audit-detail-sponsor-information-list").empty();																	//清空组件
        dataProxy.getBuyerInfoByAcceptId(acceptId, true, "SPONSOR", "#audit-detail-sponsor-information-list", function (data) {	//加载数据
            if (null == data || data.length == 0) {
                setNoDataTip("#audit-detail-sponsor-information-list", "暂无担保人");
                return;
            }
            var newSponsorTag = sponsorTag;
            for (var j = 0; j < data.length; j++) {
                var item = data[j];
                //针对担保人做id的特殊设置
                dataProxy.updateConfig(newSponsorTag, function (config) {
                    if (typeof(config["id"]) != "undefined" && null != config["id"]) {
                        config["id"] = config["id"] + "-" + j;
                    } else {
                        config["id"] = "sponsor-" + config["name"] + "-" + j;
                    }
                    UI.setConfigTagReadOnly(config);
                });
                new HYCarFinance.form({
                    id: '#audit-detail-sponsor-information-list',
                    title: '担保人' + UI.getUpperNumber(j + 1),
                    xtype: 'fieldset',
                    index: j,
                    items: newSponsorTag,
                    beforeShow: function () {
                        if (null != item) {													//设置默认值
                            UI.setDefaultValue("#fieldset-" + j, item);
                            $("#fieldset-" + j).find("select").trigger("chosen:updated");
                            $("#fieldset-" + j).find("input").each(function (i, n) {		//回写省份、城市
                                var name = $(n).attr("name");
                                initProvince(name, n, item);
                            });
                        }
                        var html = '<div class="m-rl-tb row"><label class="control-label col-md-1">附件:</label><div class="col-md-11 user-credit gallerys" style="padding: 0 7px 0 0">';	//遍历附件信息
                        if (null != item && null != item["fileVOS"] && null != item["fileVOS"].length > 0) {
                            for (var i = 0; i < item["fileVOS"].length; i++) {
                                html += createImgTag(staticUrl + item["fileVOS"][i]['fileGroup'] + '/' + item["fileVOS"][i]['filePath'], item["fileVOS"][i]['creditFileTypeName']);
                            }
                        } else {
                            html += createNoFileTip(null);
                        }
                        html += '</div></div>';
                        $("#fieldset-" + j).append(html);

                        //初始化图片控件
                        $("#fieldset-" + j).find(".pre-img").on("click", function () {
                            $.openPhotoGallery(this)
                        });
                    }
                });
            }
        });
    }

    //获取车辆信息
    var supplyFormValid = new ValidateWin("#audit-detail-car-information-supply", {});
    if($("#supply-car-info-vin-no").attr("readonly") != "readonly"){
    	$("#supply-car-info-vin-no").on("blur", function () {
    		var vinReg = new RegExp(vin_reg);
    		var value = $.trim($(this).val());
    		if ("" != value && vinReg.test(value)) {
    			$("#supply-car-info-last-six-no").val(value.substring(value.length - 6), value.length);
    		} else {
    			$("#supply-car-info-last-six-no").val("");
    		}
    	});
    }
    function getCarInfo() {
        $("#audit-detail-car-information-list").empty();												//清空组件
        dataProxy.getCarInfo(acceptId, true, 1, "#audit-detail-car-information-list", function (data) {	//加载数据
            if (null == data || data.length == 0) {
                setNoDataTip("#audit-detail-car-information-list", "暂无车辆信息");
                return;
            }
            //没有数据时情况，车辆补录与GPS表格信息
            if ($("#supply-save-btn").length <= 0) {
                if (null == data || data.length == 0) {
                    $("#audit-detail-car-information-supply").empty();
                    setNoDataTip("#audit-detail-car-information-supply", "暂无补录车辆信息");
                    return;
                }
            }
            if ($("#gps-save-btn").length <= 0) {
                if (null == data || data.length == 0) {
                    $("#audit-detail-car-gps-information").empty();
                    setNoDataTip("#audit-detail-car-gps-information", "GPS信息");
                    return;
                }
            }
            //针对车辆信息配置相关的特殊设置
            var newCarTag = carTag;
            if ((($(".detail-permission-code-wrap").find("input[name='beforePayment']").length <= 0 || $("#orderStatus").val() >= 20) &&
                ($(".detail-permission-code-wrap").find("input[name='afterFinancialPayment']").length <= 0 &&
                $(".detail-permission-code-wrap").find("input[name='afterPayment']").length <= 0 || $("#orderStatus").val() < 20))
                || $("#orderStatus").val() < 3) {					//存在更新按钮时不设置只读属性
                dataProxy.updateConfig(newCarTag, function (config) {
                    UI.setConfigTagReadOnly(config);
                });
            }

            //车辆类型不允许更新
            dataProxy.updateConfig(newCarTag, function (config) {
                if (config["name"] == "newOrOld") {
                    UI.setConfigTagReadOnly(config);
                }
            });


            if (null != data && null != data["initRegisterDate"] && "" != data["initRegisterDate"]) {
                data["initRegisterDate"] = data["initRegisterDate"].substring(0, data["initRegisterDate"].indexOf(" "));
            }
            var forbidden = null;
            if (($(".detail-permission-code-wrap").find("input[name='beforePayment']").length > 0 && $("#orderStatus").val() < 20) ||
                ($(".detail-permission-code-wrap").find("input[name='afterPayment']").length > 0 && $("#orderStatus").val() >= 20) ||
                ($(".detail-permission-code-wrap").find("input[name='afterFinancialPayment']").length > 0 && $("#orderStatus").val() >= 20)) {
                forbidden = 0;
            }

            var bankId = $('#bankId').val();
            var productId = data["cfProductId"];
            dataProxy.updateConfig(newCarTag, function (config) {
                if (config["name"] == "cfProductId" && forbidden == null) {
                    config["url"] = ctx + "/product/getList.action?bankId=" + bankId;
                } else if (config["name"] == "cfProductId" && forbidden != null) {
                    config["url"] = ctx + "/product/getList.action?forbidden=" + forbidden + "&bankId=" + bankId + "&productId=" + productId;
                }
            });
            //初始化车辆信息组件
            new HYCarFinance.form({
                id: '#audit-detail-car-information-list',
                items: newCarTag,
                beforeShow: function () {
                    UI.setDefaultValue("#audit-detail-car-information-list", data);				//设置初始化值
                    if (data["newOrOld"] == 0) {
                        showOldCar(data, forbidden);
                    }
                    /*initCenRongProduct($("#cfProductId").find("option:selected").text(), data, function () {
                     $("input[name='insuranceFee'],input[name='configTaxFee']").on("change", function () {
                     var insuranceFee = isNaN($("input[name='insuranceFee']").val()) || $("input[name='insuranceFee']").val() == '' ? 0 : $("input[name='insuranceFee']").val();
                     var configTaxFee = isNaN($("input[name='configTaxFee']").val()) || $("input[name='configTaxFee']").val() == '' ? 0 : $("input[name='configTaxFee']").val();
                     var totalFee = parseFloat(insuranceFee) + parseFloat(configTaxFee)
                     $("input[name='totalFee']").val(totalFee);
                     });
                     });*/
                    initProduct($('.carinfoForm input[name="bankId"]').val(), $("#cfProductId").val(), "#loanPeriodMonthCode", data["loanPeriodMonthCode"], function (hasMonth) {
                        //$("#loanPeriodMonthCode").val(data["loanPeriodMonthCode"]);
                        $("#loanPeriodMonthCode").trigger("chosen:updated");
                    });
                    $("#cfProductId").on('change', function (e, param) {						//设置类型选择级联
                        initProduct($('.carinfoForm input[name="bankId"]').val(), param["selected"], "#loanPeriodMonthCode", data["loanPeriodMonthCode"], function (hasMonth) {
                            $("#loanPeriodMonthCode").trigger("chosen:updated");
                            if (!hasMonth) {
                                alertDialog("该产品无贷款年限");
                            }
                        });
                        if ($("#cfProductId").find("option:selected").text().indexOf('参融产品') < 0) {
                            $("input[name='insuranceFee'],input[name='configTaxFee'],input[name='totalFee']").each(function () {
                                $(this).removeClass("input_validation-failed");
                                $(this).removeAttr("obj");
                            });
                        }
                        /*initCenRongProduct($("#cfProductId").find("option:selected").text(), data, function () {
                         $("input[name='insuranceFee'],input[name='configTaxFee']").on("change", function () {
                         var insuranceFee = isNaN($("input[name='insuranceFee']").val()) || $("input[name='insuranceFee']").val() == '' ? 0 : $("input[name='insuranceFee']").val();
                         var configTaxFee = isNaN($("input[name='configTaxFee']").val()) || $("input[name='configTaxFee']").val() == '' ? 0 : $("input[name='configTaxFee']").val();
                         var totalFee = parseFloat(insuranceFee) + parseFloat(configTaxFee)
                         $("input[name='totalFee']").val(totalFee);
                         });
                         });*/
                    });

                    //车辆是否公牌事件
                    car_board_change();
                    carConnect(data.carBrandId)
                    /*selectCarBrand("#carBrandId", $("#carProduceArea").val(), forbidden, function () {
                        $("#carBrandId").val(data["carBrandId"]);
                        $("#carBrandId").trigger("chosen:updated");
                    });
                    $("#carProduceArea").on('change', function (e, param) {						//设置类型选择级联
                        selectCarBrand("#carBrandId", param["selected"], forbidden, function () {
                            $("#carBrandId").trigger("chosen:updated");
                        });
                    });*/
                }
            });
            if ($("#orderStatus").val() < 3) {
                $(".save-car-button").remove();
                $(".calculate-button").remove();
            }
            UI.setDefaultValue("#audit-detail-car-information-supply", data);					//设置车辆补录信息
            UI.setDefaultValue("#audit-detail-car-gps-information", data);						//设置GPS信息
            
            //车辆信息补录按钮事件
            if ($(".detail-permission-code-wrap").find("input[name='saveSupplyCarInfo']").length <= 0) {			//是否有选择设置控件可否编辑
                $("#audit-detail-car-information-supply").find("input, textarea").each(function (i, n) {
                    $(n).attr("readonly", true);
                    $(n).next(".textarea-tip").remove();
                });
            }

            //新加的金额
            $("input[name='insuranceFee'],input[name='configTaxFee']").on("change", function () {
                if (isNaN($("input[name='insuranceFee']").val())) {
                    $("input[name='insuranceFee']").val('');
                }
                if (isNaN($("input[name='configTaxFee']").val())) {
                    $("input[name='configTaxFee']").val('');
                }
                var insuranceFee = isNaN($("input[name='insuranceFee']").val()) || $("input[name='insuranceFee']").val() == '' ? 0 : $("input[name='insuranceFee']").val();
                var configTaxFee = isNaN($("input[name='configTaxFee']").val()) || $("input[name='configTaxFee']").val() == '' ? 0 : $("input[name='configTaxFee']").val();
                var totalFee = parseFloat(insuranceFee) + parseFloat(configTaxFee)
                $("input[name='totalFee']").val(totalFee);
            });

            //打款前、财务打款后、非财务打款后
            if ((($(".detail-permission-code-wrap").find("input[name='beforePayment']").length <= 0 || $("#orderStatus").val() >= 20) &&
                ($(".detail-permission-code-wrap").find("input[name='afterFinancialPayment']").length <= 0 &&
                $(".detail-permission-code-wrap").find("input[name='afterPayment']").length <= 0 || $("#orderStatus").val() < 20))
                || $("#orderStatus").val() < 3) {					//
                if ($("#audit-detail-car-information-list").find("input[name='initEvaluatePrice']").length > 0) {
                    $("input[name='initEvaluatePrice']").attr("readonly", true);
                }
                if ($("#audit-detail-car-information-list").find("input[name='evaluateReportPrice']").length > 0) {
                    $("input[name='evaluateReportPrice']").attr("readonly", true);
                }
            }
            //车辆信息更新按钮事件
            if ($(".detail-permission-code-wrap").find("input[name='beforePayment']").length > 0 && $("#orderStatus").val() < 20 ||
                $(".detail-permission-code-wrap").find("input[name='afterFinancialPayment']").length > 0 && $("#orderStatus").val() >= 20) {					//是否有权限操作按钮控制
                $(".save-car-button").on("click", function () {														//保存车辆信息修改
                    saveCarInfoUpdate();
                });
                $(".calculate-button").on("click", function () {//车贷计数器
                    calculateCarRate();
                });
            } else if ($(".detail-permission-code-wrap").find("input[name='afterPayment']").length > 0 && $("#orderStatus").val() >= 20) {//非财务打款后
                $(".save-car-button").on("click", function () {														//保存车辆信息修改
                    saveCarInfoUpdate();
                });
                $(".calculate-button").remove();

                var filed = ["carLicenseProvince", "loanPeriodMonthCode", "auditCarPrice", "actualLoadMoney", "customerRate", "evaluateReportPrice"];
                for (var f in filed) {
                    $("input[name='" + filed[f] + "']").attr("readonly", true);
                    // $("input[name='" + filed[f] + "']").attr("checked", true);
                    if (filed[f] == 'carLicenseProvince') {
                        $("input[name='" + filed[f] + "']").attr("disabled", "disabled");

                    } else if (filed[f] == 'loanPeriodMonthCode') {
                        $("#" + filed[f]).prop("disabled", true);
                        $("#" + filed[f]).trigger("chosen:updated");
                    }
                }
            } else {
                $(".save-car-button").remove();
                $(".calculate-button").remove();
            }
            //车辆信息补录
            if ($("#supply-save-btn").length > 0 && (data["newOrOld"] == 1 || data["newOrOld"] == 0)) {				//是否有选择设置控件可否编辑
                laydate({
                    elem: '#initRegisterDate',
                    format: 'YYYY-MM-DD',
                    min: "1970-01-01",
                    max: laydate.now(),
                    istoday: false,				//显示今天
                    issure: true,					//确认框
                    istime: false
                });
                $("#audit-detail-car-information-supply").find("input, textarea").each(function (i, n) {
                    $(n).attr("readonly", false);
                });
            } else {
                $("#audit-detail-car-information-supply").find("input, textarea").each(function (i, n) {
                    $(n).attr("readonly", true);
                });
            }
            //GPS信息
            if ($("#gps-save-btn").length > 0) {										//是否有选择设置控件可否编辑
                laydate({
                    elem: '#setupDate',
                    format: 'YYYY-MM-DD',
                    min: "1970-01-01",
                    max: laydate.now(),
                    istoday: false,				//显示今天
                    issure: true,					//确认框
                    istime: false
                });
                $("#audit-detail-car-gps-information").find("input, textarea").each(function (i, n) {
                    $(n).attr("readonly", false);
                });
            } else {
                $("#audit-detail-car-gps-information").find("input, textarea").each(function (i, n) {
                    $(n).attr("readonly", true);
                });
            }
            
            
            /*if (data["newOrOld"] == 0) {	//二手车不允许编辑车架号等信息
                $("#audit-detail-car-information-supply").find("input[name='vinNo']").attr("readonly", true);
                $("#audit-detail-car-information-supply").find("input[name='underpanLastSixNo']").attr("readonly", true);
                $("#audit-detail-car-information-supply").find("input[name='initRegisterDate']").attr("readonly", true);
            }*/
        });
    }			//end getCarInfo()
    
    function carConnect(res){
    	$("#carNoId").val(res)
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

    //获取审核信息
    function getAuditInfo() {
        $("#audit-detail-credit-list").empty();				//清空组件
        $("#audit-detail-audit-list").empty();
        $("#detail-big-data-list").empty();
        $("#detail-history-order-list").empty();
        $("#detail-video-order-list").empty();
        //加载征信数据
        dataProxy.getCreditInfoByAcceptId(acceptId, null, true, "#audit-detail-credit-list", function (data) {
            var html = UI.createCreditHtml(data);
            $("#audit-detail-credit-list").append(html);
        });

        //大数据征信
        dataProxy.getBigDataCreditByAcceptId(acceptId, true,
            "#detail-big-data-list", function (data) {
            var html = UI.createBigDataCreditHtml(data);
            $("#detail-big-data-list").append(html);
        });
        
        //自动化审核
        if($("#auto-audit-list").length > 0){
        	dataProxy.getAutoAuditList(acceptId, true, "#auto-audit-list", function (data) {
        		$("#auto-audit-list").empty();			//清空组件
	            var html = UI.createAutoAuditCreditHtml(data);
	            $("#auto-audit-list").append(html);
	        });
    	}

        //客户历史订单
        dataProxy.getHistoryOrderInfo(acceptId, true, "#detail-history-order-list", function (data) {
            var html = UI.createHistoryOrderHtml(data);
            $("#detail-history-order-list").append(html);
            $("#detail-history-order-list").find(".detail").on("click",
                function () {
                    var id = $(this).attr("value");
                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id + "&goBackUrl=" + (ctx + "/audit/queryForAudited.action");
                });
        });
        //视频面签
        dataProxy.getVideoOrderInfo(acceptId, true, "#detail-video-order-list", function (data) {

            var html = UI.createVideoOrderHtml(data);
            //初始化问题列表
            $("#detail-video-order-list").append(html);
            $("#detail-video-order-list .detail").click(function () {
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
             $("#viewInterviewQuestion").click(function () {
                 var answer = new VideoAnswer("#viewInterviewQuestion", $("#view_id").val())
             })

        /*    $("#detail-video-order-list .detail-view").click(function () {
                var url = ctx + "/interview/detail.action?id=" + $("#view_id").val();
                openTabForParent(url, "-interview-detail-" + acceptId, "视频面签-"+buyerName);
            });*/
        });
        //加载审核数据
        dataProxy.getAuditHistoryByAcceptId(acceptId, true, "#audit-detail-audit-list", function (data) {
            var html = UI.createAuditHistoryHtml(data)		//初始化表格
            $("#audit-detail-audit-list").append(html);
            initAuditHistoryDetailEvent();					//初始化查看事件
        });
    }

    /*放款信息*/
    function getLoanInfo() {
        $("#loan-info, #card-info, #bill-info,#contract-info,#archives-info,#other-info,#bankback-info,#account-info,#operation-info,#operationctrl-info").empty();

        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {	//数据初始化
            getPayLoanInfo(data);				//放款信息
            getCardInfo();					//卡片信息
            getBillInfo();					//票据退件
            getContractInfo();				//合同资料
            getOtherInfo();					//其他信息
            getBankBackInfo();				//银行退件
            getAccountInfo();				//结清单提交
            getOperationLogInfo();			//按钮操作日志
            getOperationCtrlLogInfo();		//放款信息操作日志
            if (null != data) {													//设置默认值
                UI.setDefaultValue("#loan-info", data);
                UI.setDefaultValue("#card-info", data);
                UI.setDefaultValue("#bill-info", data);
                UI.setDefaultValue("#contract-info", data);
                UI.setDefaultValue("#other-info", data);
                UI.setDefaultValue("#bankback-info", data);
                UI.setDefaultValue("#account-info", data);
            }
            if ($("#moneyPackage").val() && orderStatus > 19) {
                var remainingMoneyVal = $("#moneyPackage").find("option:selected").attr('data-remainingMoney');
                if (remainingMoneyVal == "") {
                    $("#loan-info").find("#money").html('');
                } else {
                    $("#loan-info").find("#money").html(remainingMoneyVal);
                }
            } else {
                $("#loan-info").find("#money").html('');
                $("#loan-info").find("#moneyPackage").val('').trigger("chosen:updated");
            }


        });

    }


    //初始化订单附件
    function initOrderFile() {
        initOrderFileBtnEvent();		//初始化按钮事件
        $("#file-list").empty();		//清空组织
        $("#pagination").empty();
        dataProxy.loadOrderFileByPage("#file-list", acceptId, null, 0, "#pagination", function (data) {	//初始化分页加载附件
            $("#file-list").html("");
            var rows = data["recordList"];
            var html = UI.createFileItemHtml(rows, false);
            $("#file-list").append(html);
            //图片轮播事件
            $("#file-list").find(".pre-img").on("click", function () {
                $.openPhotoGallery(this);
            });
        });
    }

    //初始化订单附件tab页面按钮事件
    function initOrderFileBtnEvent() {
        //订单附件
        $("#audit-detail-select-file-type").chosen({
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        }).on("change", function (evt, params) {
            $("#refresh-file-btn").trigger("click");
        });
        //刷新按钮
        $("#refresh-file-btn").on("click", function () {
            dataProxy.loadOrderFileByPage("#file-list", acceptId, $("#audit-detail-select-file-type").val(), 0, "#pagination", function (data) {
                $("#file-list").html("");
                var rows = data["recordList"];
                var html = UI.createFileItemHtml(rows, false);
                $("#file-list").append(html);
                //图片轮播事件
                $("#file-list").find(".pre-img").on("click", function () {
                    $.openPhotoGallery(this);
                });
            });
        });
        //订单附件下载
        $("#download-file-btn").on("click", function () {
            downProgressTip(acceptId, $("#audit-detail-select-file-type").val(), 'cfFileCenter/getDownloadCount.action')
        });
        return true;
    }


    //车辆是否公牌事件
    function car_board_change() {
        $("#audit-detail-car-information-list select[name='board']").on("change", function () {
            var v = $(this).val();
            var realName = $("#audit-detail-buyer-information-list input[name='realName']").val();
            var companyName = $("#audit-detail-buyer-information-list input[name='companyName']").val();
            if (v == 1) {
                $("#audit-detail-car-information-list input[name='driverLicneseOwner']").val(companyName);
            } else {
                $("#audit-detail-car-information-list input[name='driverLicneseOwner']").val(realName);
            }
        });
    }

    //二手车
    function showOldCar(result, forbidden) {
        var $parentDiv = $("#audit-detail-car-information-list select[name='newOrOld']").parents(".m-rl-tb.row");
        var html = '<div class="m-rl-tb row oldCar">' +
            '<label class="col-md-1 control-label">车架号:</label>' +
            '<div class="col-md-2"><input type="text" value="' + result["vinNo"] + '" id="vinNo" name="vinNo" class="form-control" readonly></div>' +
            '<label class="col-md-1 control-label">二手车登记日期:</label>';
        if (result["initRegisterDateStr"] != null && result["initRegisterDateStr"] != '') {
            html += '<div class="col-md-2"><input type="text" value="' + result["initRegisterDateStr"] + '" id="secondInitRegisterDate" name="initRegisterDate" class="form-control" readonly="readonly"></div>';
        } else {
            html += '<div class="col-md-2"><input type="text" value="" id="secondInitRegisterDate" name="initRegisterDate" class="form-control" readonly="readonly"></div>';
        }
        html += '<label class="col-md-1 control-label">初始评估价(元):</label>' +
            '<div class="col-md-2"><input type="text" name="initEvaluatePrice" value="" maxlength="9" tip="请输入正确的初始评估价"  class="form-control" readonly="readonly" obj="float"></div>' +
            '<label class="col-md-1 control-label">评估报告价格(元):</label>' +
            '<div class="col-md-2"><input type="text" name="evaluateReportPrice" value="" maxlength="9" check="validForm(this)" tip="请输入正确的评估报告价格" class="form-control"></div>' +
            '</div>';
        $parentDiv.after(html);
        initOlderCarRegisterEvent(forbidden);
        $("#audit-detail-car-information-list input[name='vinNo']").trigger("change");
    }

    function initOlderCarRegisterEvent(forbidden) {
        $("#audit-detail-car-information-list input[name='vinNo']").on("change", function () {
            var v = $(this).val();
            var bankId = $("#audit-detail-car-information-list input[name='bankId']").val();
            if (v == '' || v == undefined || bankId == undefined || bankId == '' || acceptId == '' || acceptId == undefined) {
                return;
            }
            $.ajax({
                url: ctx + "/cfBusinessOrderAccept/getByVin.action",
                type: "post",
                data: {vin: v, bankId: bankId, acceptId: acceptId},
                dataType: "json",
                success: function (data) {
                    if (data.error == 1 && data.rows != null) {
                        var d = data.rows;
                        $("#audit-detail-car-information-list input[name='initRegisterDate']").val(d.initRegisterDateStr);
                        $("#audit-detail-car-information-list input[name='initEvaluatePrice']").val(d.initEvaluatePrice);
                        $("#audit-detail-car-information-list input[name='evaluateReportPrice']").val(d.evaluateReportPrice);
                    } else {
                        faildMsg(data.message);
                    }
                }
            });

        });
    };

    //参融产品
    function initCenRongProduct(cfProductId, data, callback) {
        var $parentDiv = $('input[name="firstRepay"]').parent();
        if (cfProductId == '' || cfProductId == undefined || cfProductId.indexOf('参融产品') < 0) {
            $parentDiv.nextAll().empty();
            return;
        }
        var insuranceFee = data != null && data["insuranceFee"] != null ? data["insuranceFee"] : '';
        var configTaxFee = data != null && data["configTaxFee"] != null ? data["configTaxFee"] : '';
        var totalFee = data != null && data["totalFee"] != null ? data["totalFee"] : '';
        var html = '<label class="col-md-1 control-label"><span class="red">*</span>费用:</label>' +
            '<div class="col-md-2"><input obj="float" maxlength="9" tip="请输入正确的费用" value="' + insuranceFee + '" name="insuranceFee" class="form-control" type="text"></div>' +
            '<label class="col-md-1 control-label"><span class="red">*</span>配置税:</label>' +
            '<div class="col-md-2"><input obj="float" maxlength="9" tip="请输入正确的配置税" value="' + configTaxFee + '" name="configTaxFee" class="form-control" type="text"></div>' +
            '<label class="col-md-1 control-label"><span class="red">*</span>参融总和:</label>' +
            '<div class="col-md-2"><input obj="float" maxlength="9" readonly="readonly" value="' + totalFee + '" name="totalFee" class="form-control" type="text" is_tip_null="yes"></div>';
        $parentDiv.after(html);
        callback();
    }

    //产品类型
    function initProduct(bankId, cfProductId, loanPeriodMonthCode, month, callback) {
        if (cfProductId == "" || cfProductId == undefined) {
            return;
        }
        dataProxy.getCarProductInfo(bankId, cfProductId, true, function (data) {
            var hasMonth = false;			//是否有产品无贷款年限
            var options = "<option value=''>请选择</option>";
            $.each(data, function (k, p) {
                if (month == p.yearsCode) {
                    hasMonth = true;
                }
                options += "<option " + (month == p.yearsCode ? "selected='selected'" : "") + " value='" + p.yearsCode + "'>" + p.yearsCodeName + "</option>";
            });
            $(loanPeriodMonthCode).empty();
            $(loanPeriodMonthCode).append(options);
            callback(hasMonth);
        });
    }

   /* //根据车辆类型加载车辆品牌
    function selectCarBrand(id, category, forbidden, callback) {
        dataProxy.getCarBrandType(category, forbidden, function (brands) {
            var options = "<option value=''>请选择</option>";
            $.each(brands, function (k, p) {
                options += "<option value='" + p.id + "'>" + p.brandName + "</option>";
            });
            $(id).empty();
            $(id).append(options);
            callback();
        });
    }	*/		//end selectCarBrand()

    var validationArray = new Array();

    function initValidation(validationArray, id) {
        var validate = new ValidateWin(id, {});
        validationArray.push(validate);
    }

    //注册抵押
    function getRegistInfo() {
        $("#audit-detail-mortgage-list,#audit-detail-mortgage-car,#audit-detail-mortgage-binding, #audit-detail-mortgage-transfer, #audit-detail-mortgage-car-stock").empty();
        dataProxy.getMortgageInfo(acceptId, true, "#audit-detail-mortgage-list", function (data) {	//数据初始化
            initMortgageForm();			//抵押信息
            initMortgageCarForm();		//抵押车辆
            initBindingForm();          //装订信息
            initTransferForm();			//过户信息
            initCarFareForm();			//车资信息
            getRegistOperatorInfo();	//操作信息
            if (null != data) {													//设置默认值
                UI.setDefaultValue("#audit-detail-mortgage-list", data);		//抵押信息
                UI.setDefaultValue("#audit-detail-mortgage-car", data);		//抵押车辆
                UI.setDefaultValue("#audit-detail-mortgage-binding", data);	    //装订信息
                UI.setDefaultValue("#audit-detail-mortgage-transfer", data);	//过户信息
                UI.setDefaultValue("#audit-detail-mortgage-car-stock", data);	//车资信息
            }
            /* if ($("#orderStatus").val() < 4) {
             $(".mortgage-save-button").remove();
             $(".mortgage-transfer-save-button").remove();
             $(".mortgage-car-stock-save-btn").remove();
             }*/
        });
    }

    //初始化抵押tab（抵押信息表单）
    function initMortgageForm() {
        var newMortgageTag = mortgageTag;
        if ($(".detail-permission-code-wrap").find("input[name='saveMortgageInfo']").length <= 0) {				//针对输入框做读写权限处理
            dataProxy.updateConfig(newMortgageTag, function (config) {
                if (config["name"] == "saveMortgageBtn") {
                    config["type"] = "hidden";
                }
                UI.setConfigTagReadOnly(config);
            });
        }
        new HYCarFinance.form({
            id: '#audit-detail-mortgage-list',
            xtype: 'fieldcontainer',
            items: newMortgageTag,
            beforeShow: function () {
                if ($("#orderStatus").val() < 4 || $(".detail-permission-code-wrap").find("input[name='saveMortgageInfo']").length <= 0) {
                    $(".mortgage-save-button").remove();
                }
            }
        });

        //保存抵押信息-按钮事件
        if ($(".detail-permission-code-wrap").find("input[name='saveMortgageInfo']").length > 0) {
            $(".mortgage-save-button").on("click", function () {
                var param = {};
                param["operatorType"] = "mortgageSave";
                $isSubmit = false;
                var input = "input[name='receiveBankContractDate'],";
                input += "input[name='mortgageFileDeliverDate'],input[name='bankContractNo'],input[name='notarialPaperSubmitDate'],input[name='notarialPaperReceiveDate'],";
                input += "select[name='mortgageSucess']";
                validInput(input, "audit-detail-mortgage-list");
                if ($isSubmit) {
                    $("#audit-detail-mortgage-list,#audit-detail-mortgage-car,#audit-detail-mortgage-binding,#audit-detail-mortgage-transfer,#audit-detail-mortgage-car-stock").find("input,select,textarea").each(function (i, n) {
                        var name = $(n).attr("name");
                        if (name != undefined && name != '') {
                            if (name == 'registerDate' || name == 'ctime' ||
                                name == 'receiveBankContractDate' ||
                                name == 'mortgageFileSubmitBankDate' ||
                                name == 'mortgageFileDeliverDate' ||
                                name == 'notarialPaperSubmitDate' ||
                                name == 'notarialPaperReceiveDate' ||
                                name == 'bindingDate' || name == 'transferDate' ||
                                name == 'registerLicenseExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'driveExpirtDate' ||
                                name == 'carStockExpireDate' ||
                                name == 'certificationExpireDate' ||
                                name == 'insuranceExpireDate' ||
                                name == 'carPickupImageUploadDate' ||
                                name == 'evaluateFileUploadDate' ||
                                name == 'mortgageFileUploadDate' ||
                                name == 'mortgageProcessDate') {
                                param[name] = new Date($.trim($(n).val()));
                            } else {
                                param[name] = $.trim($(n).val());
                            }
                        }
                    });
                    dataProxy.addMortgageInfo(acceptId, param, function (data) {
                        var d = data.rows;
                        $("#audit-detail-mortgage-list").find("input[name='id']").val(d['id']);
                        $("#audit-detail-mortgage-list").find("input[name='operatorPersonName']").val(d['operatorPersonName']);
                        $("#audit-detail-mortgage-list").find("input[name='operatorDateStr']").val(d['operatorDateStr']);
                        successMsg("抵押信息保存成功");
                    });
                } else {
                    alertDialog("请完善信息。");
                }
            });

        }

    }		//end initMortgageForm
    
    //初始化抵押车辆
    function initMortgageCarForm() {
        var newMortgageCarTag = mortgageCarTag;
        if ($(".detail-permission-code-wrap").find("input[name='saveMortgageCar']").length <= 0) {				//针对输入框做读写权限处理
            dataProxy.updateConfig(newMortgageCarTag, function (config) {
                if (config["name"] == "saveMortgageCarBtn") {
                    config["type"] = "hidden";
                }
                UI.setConfigTagReadOnly(config);
            });
        }
        new HYCarFinance.form({
            id: '#audit-detail-mortgage-car',
            xtype: 'fieldcontainer',
            items: newMortgageCarTag,
            beforeShow: function () {
                if ($("#orderStatus").val() < 4 || $(".detail-permission-code-wrap").find("input[name='saveMortgageCar']").length <= 0) {
                    $(".mortgageCar-save-button").remove();
                }
            }
        });

        //保存抵押车辆-按钮事件
        if ($(".detail-permission-code-wrap").find("input[name='saveMortgageCar']").length > 0) {
            $(".mortgageCar-save-button").on("click", function () {
                var param = {};
                param["operatorType"] = "mortgageCarSave";
                $isSubmit = false;
                var input = "input[name='mortgageProcesser'],input[name='mortgageProcessDate'],input[name='plateNumber'],input[name='registerLicenseNo'],input[name='mortgageFileSubmitBankDate'],";
                input += "input[name='noMortgageReason'],input[name='mortgageCarPersonName'],input[name='mortgageCarDateStr']";
                validInput(input, "audit-detail-mortgage-car");
                if ($isSubmit) {
                    $("#audit-detail-mortgage-list,#audit-detail-mortgage-car,#audit-detail-mortgage-binding,#audit-detail-mortgage-transfer,#audit-detail-mortgage-car-stock").find("input,select,textarea").each(function (i, n) {
                        var name = $(n).attr("name");
                        if (name != undefined && name != '') {
                            if (name == 'registerDate' || name == 'ctime' ||
                                name == 'receiveBankContractDate' ||
                                name == 'mortgageFileSubmitBankDate' ||
                                name == 'mortgageFileDeliverDate' ||
                                name == 'notarialPaperSubmitDate' ||
                                name == 'notarialPaperReceiveDate' ||
                                name == 'bindingDate' || name == 'transferDate' ||
                                name == 'registerLicenseExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'driveExpirtDate' ||
                                name == 'carStockExpireDate' ||
                                name == 'certificationExpireDate' ||
                                name == 'insuranceExpireDate' ||
                                name == 'carPickupImageUploadDate' ||
                                name == 'evaluateFileUploadDate' ||
                                name == 'mortgageFileUploadDate' ||
                                name == 'mortgageProcessDate') {
                                param[name] = new Date($.trim($(n).val()));
                            } else {
                                param[name] = $.trim($(n).val());
                            }
                        }
                    });
                    dataProxy.addMortgageInfo(acceptId, param, function (data) {
                        var d = data.rows;
                        $("#audit-detail-mortgage-list").find("input[name='id']").val(d['id']);
                        $("#audit-detail-mortgage-car").find("input[name='mortgageCarPersonName']").val(d['mortgageCarPersonName']);
                        $("#audit-detail-mortgage-car").find("input[name='mortgageCarDateStr']").val(d['mortgageCarDateStr']);
                        successMsg("抵押车辆保存成功");
                    });
                } else {
                    alertDialog("请完善信息。");
                }
            });

        }

    }		//end initMortgageForm
    var $isSubmit = false;

    function validInput(input, id) {
        $("#" + id).find(input).each(function () {
            var v = $.trim($(this).val());
            var name = $(this).attr("name");
            if (name == 'transferFee' && v != '') {
                var reg = new RegExp("^(-?\\d+)(\\.\\d+)?$");
                if (!reg.test(v)) {
                    $(this).val('');
                    v = $.trim($(this).val());
                }
            }
            if (v != '' && !$isSubmit) {
                $isSubmit = true;
            }
        });
    }

    //初始化装订信息
    function initBindingForm() {
        var newMortgageBindingTag = mortgageBindingTag;
        if ($(".detail-permission-code-wrap").find("input[name='saveMortgageBinding']").length <= 0) {				//针对输入框做读写权限处理
            dataProxy.updateConfig(newMortgageBindingTag, function (config) {
                if (config["name"] == "saveMortgageBindingBtn") {
                    config["type"] = "hidden";
                }
                UI.setConfigTagReadOnly(config);
            });
        }

        new HYCarFinance.form({
            id: '#audit-detail-mortgage-binding',
            xtype: 'fieldcontainer',
            items: newMortgageBindingTag,
            beforeShow: function () {
                if ($("#orderStatus").val() < 4 || $(".detail-permission-code-wrap").find("input[name='saveMortgageBinding']").length <= 0) {
                    $(".mortgage-binding-save-button").remove();
                }
            }
        });

        //
        if ($(".detail-permission-code-wrap").find("input[name='saveMortgageBinding']").length > 0) {
            $(".mortgage-binding-save-button").on("click", function () {
                var param = {};
                param["operatorType"] = "binding";
                $isSubmit = false;
                var input = "input[name='bindingDate'],input[name='contractNo'],input[name='firstArchiveDate'],input[name='secondArchiveDate'],input[name='transferArchiveDate'],input[name='transferArchiveRemark']";
                validInput(input, "audit-detail-mortgage-binding");
                if ($isSubmit) {
                    $("#audit-detail-mortgage-list,#audit-detail-mortgage-car,#audit-detail-mortgage-binding,#audit-detail-mortgage-transfer,#audit-detail-mortgage-car-stock").find("input,select,textarea").each(function (i, n) {
                        var name = $(n).attr("name");
                        if (name != undefined && name != '') {
                            if (name == 'registerDate' || name == 'ctime' ||
                                name == 'receiveBankContractDate' ||
                                name == 'mortgageFileSubmitBankDate' ||
                                name == 'mortgageFileDeliverDate' ||
                                name == 'notarialPaperSubmitDate' ||
                                name == 'notarialPaperReceiveDate' ||
                                name == 'bindingDate' || 
                                name == 'transferDate' ||
                                name == 'registerLicenseExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'driveExpirtDate' ||
                                name == 'carStockExpireDate' ||
                                name == 'certificationExpireDate' ||
                                name == 'insuranceExpireDate' ||
                                name == 'carPickupImageUploadDate' ||
                                name == 'evaluateFileUploadDate' ||
                                name == 'mortgageFileUploadDate' ||
                                name == 'transferArchiveDate' ||
                                name == 'secondArchiveDate' ||
                                name == 'firstArchiveDate' ||
                                name == 'mortgageProcessDate') {
                                param[name] = new Date($.trim($(n).val()));
                            } else {
                                param[name] = $.trim($(n).val());
                            }
                        }
                    });
                    dataProxy.addMortgageInfo(acceptId, param, function (data) {
                        var d = data.rows;
                        $("#audit-detail-mortgage-list").find("input[name='id']").val(d['id']);
                        $("#audit-detail-mortgage-binding").find("input[name='contractNo']").val(d['contractNo']);
                        $("#audit-detail-mortgage-binding").find("input[name='bindingOperatorPersonName']").val(d['bindingOperatorPersonName']);
                        $("#audit-detail-mortgage-binding").find("input[name='bindingOperatorDateStr']").val(d['bindingOperatorDateStr']);
                        successMsg("保存装订信息成功");
                    });
                }else {
                    alertDialog("请完善信息。");
                }
            });
        }

    }

    //初始化抵押tab（过户信息表单）
    function initTransferForm() {
        var newMortgageTransferTag = mortgageTransferTag;
        if ($(".detail-permission-code-wrap").find("input[name='saveTransferInfo']").length <= 0) {				//针对输入框做读写权限处理
            dataProxy.updateConfig(newMortgageTransferTag, function (config) {
                if (config["name"] == "saveTransferBtn") {
                    config["type"] = "hidden";
                }
                UI.setConfigTagReadOnly(config);
            });
        }

        new HYCarFinance.form({
            id: '#audit-detail-mortgage-transfer',
            xtype: 'fieldcontainer',
            items: newMortgageTransferTag,
            beforeShow: function () {
                if ($("#orderStatus").val() < 4 || $(".detail-permission-code-wrap").find("input[name='saveTransferInfo']").length <= 0) {
                    $(".mortgage-transfer-save-button").remove();
                }
            }
        });

        //保存过户信息-按钮事件
        if ($(".detail-permission-code-wrap").find("input[name='saveTransferInfo']").length > 0) {
            $(".mortgage-transfer-save-button").on("click", function () {
                var type = $(this).data("type");
                var param = {};
                param["operatorType"] = "transfer";
                $isSubmit = false;
                var input = "input[name='transferDate'],input[name='transferFee']";
                validInput(input, "audit-detail-mortgage-transfer");
                if ($isSubmit) {
                    $("#audit-detail-mortgage-list,#audit-detail-mortgage-car,#audit-detail-mortgage-binding,#audit-detail-mortgage-transfer,#audit-detail-mortgage-car-stock").find("input,select,textarea").each(function (i, n) {
                        var name = $(n).attr("name");
                        if (name != undefined && name != '') {
                            if (name == 'registerDate' || name == 'ctime' ||
                                name == 'receiveBankContractDate' ||
                                name == 'mortgageFileSubmitBankDate' ||
                                name == 'mortgageFileDeliverDate' ||
                                name == 'notarialPaperSubmitDate' ||
                                name == 'notarialPaperReceiveDate' ||
                                name == 'bindingDate' || name == 'transferDate' ||
                                name == 'registerLicenseExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'driveExpirtDate' ||
                                name == 'carStockExpireDate' ||
                                name == 'certificationExpireDate' ||
                                name == 'insuranceExpireDate' ||
                                name == 'carPickupImageUploadDate' ||
                                name == 'evaluateFileUploadDate' ||
                                name == 'mortgageFileUploadDate' ||
                                name == 'mortgageProcessDate') {
                                param[name] = new Date($.trim($(n).val()));
                            } else {
                                param[name] = $.trim($(n).val());
                            }
                        }
                    });

                    param["id"] = $("#audit-detail-mortgage-list").find("input[name='id']").val();
                    dataProxy.addMortgageInfo(acceptId, param, function (data) {
                        var d = data.rows;
                        $("#audit-detail-mortgage-list").find("input[name='id']").val(d['id']);
                        $("#audit-detail-mortgage-transfer").find("input[name='transferOperatorPersonName']").val(d['transferOperatorPersonName']);
                        $("#audit-detail-mortgage-transfer").find("input[name='transferOperatorDateStr']").val(d['transferOperatorDateStr']);
                        successMsg("保存过户信息成功");
                    });
                } else {
                    alertDialog("请完善信息。");
                }
            });
        }
    }	// end initTransferForm

    //初始化抵押tab（车资信息表单）
    function initCarFareForm() {

        var newCarInfoTag = carInfoTag;
        if ($(".detail-permission-code-wrap").find("input[name='uploadMortgageFile']").length <= 0) {				//针对输入框做读写权限处理
            dataProxy.updateConfig(newCarInfoTag, function (config) {
                if (config["name"] == "uploadFileBtn") {
                    config["type"] = "hidden";
                }
                UI.setConfigTagReadOnly(config);
            });
        }
        if ($(".detail-permission-code-wrap").find("input[name='saveCarMortgageInfo']").length <= 0) {				//针对输入框做读写权限处理
            dataProxy.updateConfig(newCarInfoTag, function (config) {
                if (config["name"] == "saveCarInfoBtn") {
                    config["type"] = "hidden";
                }
                UI.setConfigTagReadOnly(config);
            });
        }

        //设置车资信息
        new HYCarFinance.form({
            id: '#audit-detail-mortgage-car-stock',
            xtype: 'fieldcontainer',
            items: newCarInfoTag,
            beforeShow: function () {
                if ($("#orderStatus").val() < 4 || $(".detail-permission-code-wrap").find("input[name='saveCarMortgageInfo']").length <= 0) {
                    $(".mortgage-car-stock-save-btn").remove();
                    $("#mortgage-file-upload-btn").remove();
                }
            }
        });
        if ($(".detail-permission-code-wrap").find("input[name='saveCarMortgageInfo']").length > 0) {
            //注册抵押上传相关资料-按钮事件
            $("#mortgage-file-upload-btn").on("click", function () {
                window.location.href = ctx + "/cfFileCenter/preFileManage.action?id=" + acceptId + "&mortgageFile=upload&goBackUrl=" + ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=mortgageRegist";
            });

            //保存车资信息-按钮事件
            $(".mortgage-car-stock-save-btn").on("click", function () {
                var type = $(this).data("type");
                var param = {};
                param["operatorType"] = "mortgageCarStockSave";
                $isSubmit = false;
                var input = "input[name='registerLicenseExpireDate'],input[name='billExpireDate'],input[name='driveExpirtDate'],input[name='carStockExpireDate'],";
                input += "input[name='certificationExpireDate'],input[name='insuranceExpireDate'],input[name='carPickupImageUploadDate'],input[name='evaluateFileUploadDate'],input[name='mortgageFileUploadDate']";
                validInput(input, "audit-detail-mortgage-car-stock");
                if ($isSubmit) {
                    $("#audit-detail-mortgage-list,#audit-detail-mortgage-car,#audit-detail-mortgage-binding,#audit-detail-mortgage-transfer,#audit-detail-mortgage-car-stock").find("input,select,textarea").each(function (i, n) {
                        var name = $(n).attr("name");
                        if (name != undefined && name != '') {
                            if (name == 'registerDate' || name == 'ctime' ||
                                name == 'receiveBankContractDate' ||
                                name == 'mortgageFileSubmitBankDate' ||
                                name == 'mortgageFileDeliverDate' ||
                                name == 'notarialPaperSubmitDate' ||
                                name == 'notarialPaperReceiveDate' ||
                                name == 'bindingDate' || name == 'transferDate' ||
                                name == 'registerLicenseExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'billExpireDate' ||
                                name == 'driveExpirtDate' ||
                                name == 'carStockExpireDate' ||
                                name == 'certificationExpireDate' ||
                                name == 'insuranceExpireDate' ||
                                name == 'carPickupImageUploadDate' ||
                                name == 'evaluateFileUploadDate' ||
                                name == 'mortgageFileUploadDate' ||
                                name == 'mortgageProcessDate') {
                                param[name] = new Date($.trim($(n).val()));
                            } else {
                                param[name] = $.trim($(n).val());
                            }
                        }
                    });
                    param["id"] = $("#audit-detail-mortgage-list").find("input[name='id']").val();
                    dataProxy.addMortgageInfo(acceptId, param, function (data) {
                        var d = data.rows;
                        $("#audit-detail-mortgage-list").find("input[name='id']").val(d['id']);
                        successMsg("保存车资信息成功");
                    });
                }else {
                    alertDialog("请完善信息。");
                }
            });
        }
    }	// end initCarFareForm

    //获取注册抵押 操作日志
    function getRegistOperatorInfo() {
        $("#audit-detail-mortgage-log-list").empty();																	//清空组件
        dataProxy.getMortgageLogInfoByAcceptId(acceptId, true, "#audit-detail-mortgage-log-list", function (data) {		//加载数据
            var html = UI.createButtonOperatorLogHtml(data);
            $("#audit-detail-mortgage-log-list").append(html);
        });
    }

    //获取保险信息
    if ($("#orderStatus").val() < 4) {
        $('#years').attr("disabled", true);
        $('#newOrOld').attr("disabled", true);
        $('#passenger').attr("disabled", true);
        $('#estimatedPremium').attr("disabled", true);
        $('#vciInsuranceCompanyId').attr("disabled", true);
        $('#vciBeginDate').attr("disabled", true);
        $('#vciEndDate').attr("disabled", true);
        $('#vciInsuranceNumber').attr("disabled", true);
        $('#vciProtectLocal').attr("disabled", true);
        $('#vciCancel').attr("disabled", true);
        $('#tciInsuranceCompanyId').attr("disabled", true);
        $('#tciBeginDate').attr("disabled", true);
        $('#tciEndDate').attr("disabled", true);
        $('#tciInsuranceNumber').attr("disabled", true);
        $('#tciProtectLocal').attr("disabled", true);
        $('#tciCancel').attr("disabled", true);
        $('#carDamagePrice').attr("disabled", true);
    }

    var isInitInsurcace = false;

    function getInsurcaceInfo() {
        //初始化组件
        if (!isInitInsurcace) {
            //初始化默认值

            initInsurcaseInfoCompoent();
            initInsurcaseInfoValue();
            /*var vciBeginDate =new  initDate("vciBeginDate");
             var vciEndDate =new initDate("vciEndDate");
             var tciBeginDate =new  initDate("tciBeginDate");
             var tciEndDate =new  initDate("tciEndDate");*/
        }

    }

    new ValidateWin("#tab-insurcace", {
        callback: function (content, event) {
            loadingShow();
            $.ajax({
                url: ctx + "/insurance/edit.action",
                type: "post",
                data: $("#insuranceInfo").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        loadingHide();
                        successMsg("操作成功！", 1000);
                    } else if (data.error == -100) {
                        loadingHide();
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        loadingHide();
                        faildMsg(data.message);
                    }
                }
            });
        }
    });

    var vciBeginDate = {
        elem: '#vciBeginDate',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        istoday: true, //显示今天
        issure: true, //确定框
        choose: function (datas) {
            if (null != datas && '' != datas) {
                var date = new Array();
                date = datas.split("-");
                if (date.length > 0) {
                    var year = parseInt(date[0]);
                    var date = (year + 1) + "-" + date[1] + "-" + date[2];
                    $("#vciEndDate").val(date);
                }
            }
        },
        clear: function () {
        }
    };
    var vciEndDate = {
        elem: '#vciEndDate',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        istoday: true, //显示今天
        issure: true,  //确认框
        choose: function (datas) {
        },
        clear: function () {
        }
    };
    laydate(vciBeginDate);
    laydate(vciEndDate);

    var tciBeginDate = {
        elem: '#tciBeginDate',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        istoday: true, //显示今天
        issure: true, //确定框
        choose: function (datas) {
            if (null != datas && '' != datas) {
                var date = new Array();
                date = datas.split("-");
                if (date.length > 0) {
                    var year = parseInt(date[0]);
                    var date = (year + 1) + "-" + date[1] + "-" + date[2];
                    $("#tciEndDate").val(date);
                }
            }
        },
        clear: function () {
        }
    };
    var tciEndDate = {
        elem: '#tciEndDate',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        istoday: true, //显示今天
        issure: true,  //确认框
        choose: function (datas) {
        },
        clear: function () {
        }
    };
    laydate(tciBeginDate);
    laydate(tciEndDate);
    //初始化保险信息组件
    function initInsurcaseInfoCompoent() {

        //加载保险公司
        $.ajax({
            url: ctx + '/cfInsuranceCompany/getAllInsurance.action',
            type: 'post',
            dataType: "json",
            success: function (data) {
                var option = "";
                if (data.error == 1) {
                    option += "<option value=''>请选择保险公司</option>";
                    for (var i = 0; i < data.rows.length; i++) {
                        option += "<option value=" + data.rows[i].id + ">" + data.rows[i].insuranceCompanyName + '</option>'
                    }
                    $("#vciInsuranceCompanyId").find("option").remove();
                    $("#vciInsuranceCompanyId").append(option);
                    $("#tciInsuranceCompanyId").find("option").remove();
                    $("#tciInsuranceCompanyId").append(option);

                    new initSelect("vciInsuranceCompanyId");
                    new initSelect("tciInsuranceCompanyId");
                    new initSelect("years");
                    new initSelect("newOrOld");
                    function initSelect(id) {
                        $("#" + id).chosen({
                            disable_search_threshold: 10,
                            no_results_text: '无数据',
                            width: "100%"
                        }).trigger("chosen:updated");
                    }

                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });

    }


    //初始化保险信息值
    function initInsurcaseInfoValue() {
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        };
        new selectInfo("vciInsuranceCompanyId");
        new selectInfo("tciInsuranceCompanyId");
        new selectInfo("years");
        new selectInfo("newOrOld");
        new selectInfo("vciProtectLocal");
        new selectInfo("vciCancel");
        new selectInfo("tciProtectLocal");
        new selectInfo("tciCancel");
        function selectInfo(id) {
            //下拉框
            $("#" + id).chosen(config).on('change', function (e, selected) {
                if ("" != selected) {
                    change_error_style($("#" + id).parent(), "remove");
                } else {
                    change_error_style($("#" + id).parent(), "add");
                }
            });
        }

        $.ajax({
            url: ctx + '/insurance/toEdit.action',
            type: 'post',
            data: {businessOrderAcceptId: acceptId},
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var info = data.rows;
                    $("#carDamagePrice").val(info.carDamagePrice);
                    $("#newOrOld").val(info.newOrOld).trigger('chosen:updated');
                    $("#years").val(info.years).trigger('chosen:updated');
                    $("#passenger").val(info.passenger);
                    $("#vciInsuranceCompanyId").val(info.vciInsuranceCompanyId).trigger('chosen:updated');
                    $("#vciBeginDate").val(info.vciBeginDate);
                    $("#vciEndDate").val(info.vciEndDate);
                    $("#vciInsuranceNumber").val(info.vciInsuranceNumber);
                    $("#vciProtectLocal").val(info.vciProtectLocal);
                    $("#vciCancel").val(info.vciCancel);
                    $("#tciInsuranceCompanyId").val(info.tciInsuranceCompanyId).trigger('chosen:updated');
                    $("#tciBeginDate").val(info.tciBeginDate);
                    $("#tciEndDate").val(info.tciEndDate);
                    $("#tciInsuranceNumber").val(info.tciInsuranceNumber);
                    $("#tciProtectLocal").val(info.tciProtectLocal);
                    $("#tciCancel").val(info.tciCancel);
                    $("#estimatedPremium").val(info.estimatedPremium);
                    $("#hiddenId").val(info.id);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    //审核详情查看
    function initAuditHistoryDetailEvent() {
        $("#audit-detail-audit-list").find(".detail").on("click", function () {
            var id = $(this).attr("value");
            dataProxy.getAuditDetailById(id, true, function (data) {
                var viewDlg = new Dialog("#view-audit-dialog", {
                    width: 800,
                    top: 200,
                    height: 480,
                    overlay: true,
                    dispose: true,
                    move: true,
                    move: true,
                    url: '',
                    onBeforeShow: function () {
                        $("#auditType").val(data["auditTypeName"]);
                        $("#auditResult").val(data["auditStatusStr"]);
                        $("#auditor").val(data["auditUser"]);
                        $("#auditTime").val(data["auditTime"]);
                        $("#auditDescriptionView").val(data["auditBak"]);
                    },
                    callback: function () {

                    }
                });
                viewDlg.show();

            });
        });
    }

    //财务打款
    function getFinancialPayInfo() {
        $("#protocol-information, #financial-detail-in, #financial-detail-out,#finance-operation-info").empty();							//清空组件

        new HYCarFinance.form({																						//协议资料
            id: '#protocol-information',
            items: protocolTag,
            beforeShow: function () {
                loadingShow();
                $.ajax({
                    url: ctx + '/financial/getFinancialData.action?acceptId=' + acceptId,
                    type: "post",
                    dataType: "json",
                    data: {
                        acceptId: acceptId,
                    },
                    success: function (data) {
                        loadingHide();
                        $("#protocol-information").find(".form-horizontal").find("div").each(function (i, n) {
                            UI.setDefaultValue(n, data["rows"]);
                        });
                    }
                });
            }
        });

        $('#protocol-information').find("select").each(function (i, n) {												//设置协议材料select只读
            $(n).attr("disabled", "disabled");
            $("#" + $(n).attr("id")).chosen({
                disable_search_threshold: 10,
                no_results_text: '无数据',
                width: "100%"
            }).trigger("chosen:updated");
        });

        dataProxy.getFinancialContributionByAcceptId(acceptId, true, "#financial-detail-out", function (data) {		//加载数据
            //费用明细(支出)组件初始化
            var html = UI.createFinancialIncomHtml();
            $("#financial-detail-out").append(html);
            var money = 0;
            for (var i = 0; i < data["rows"]["list"].length; i++) {
                var expenses = data["rows"]["list"][i]['incomeExpensesType'];
                if (expenses == 2) {
                    $(".financial-pay-confirm-btn").hide();
                    var type = data["rows"]["list"][i]["payMoneyType"];
                    $(".type-" + type).find("input").each(function (m, ipt) {
                        var name = $(ipt).attr("name");
                        $(ipt).val(data["rows"]["list"][i][name]);
                    });
                    if (type == 2 || type == 1 || type == 4 || type == 7 || type == 8 || type == 9 || type == 10) {
                        money += data["rows"]["list"][i]['actualMoney'];
                        $("#allMoney").val(money);
                    }

                }
            }
            $("#financial-detail-out input[id='licensePlateEnsureMoney']").on("change", function () {
                initCalculateCashEvent();
            });
            $(" #financial-detail-out input[id='agreeEnsureMoney']").on("change", function () {
                initCalculateCashEvent();
            });
            $("#financial-detail-out input[id='channelEnsureMoney']").on("change", function () {
                initCalculateCashEvent();
            });
            $("#financial-detail-out input[id='notarialFee']").on("change", function () {
                initCalculateCashEvent();
            });
            $("#financial-detail-out input[id='valuationFee']").on("change", function () {
                initCalculateCashEvent();
            });
            $("#financial-detail-out input[id='mortgageFee']").on("change", function () {
                initCalculateCashEvent();
            });
            $("#financial-detail-out input[id='gpsFee']").on("change", function () {
                initCalculateCashEvent();
            });
            function initCalculateCashEvent() {
                var licensePlateEnsureMoney = isNaN($("#financial-detail-out input[id='licensePlateEnsureMoney']").val()) || $("#financial-detail-outinput[id='licensePlateEnsureMoney']").val() == '' ? 0 : $("#financial-detail-out input[id='licensePlateEnsureMoney']").val();
                var agreeEnsureMoney = isNaN($("#financial-detail-out input[id='agreeEnsureMoney']").val()) || $("#financial-detail-out input[id='agreeEnsureMoney']").val() == '' ? 0 : $("#financial-detail-out input[id='agreeEnsureMoney']").val();
                var channelEnsureMoney = isNaN($("#financial-detail-out input[id='channelEnsureMoney']").val()) || $("#financial-detail-out input[id='channelEnsureMoney']").val() == '' ? 0 : $("#financial-detail-out input[id='channelEnsureMoney']").val();
                var notarialFee = isNaN($("#financial-detail-out input[id='notarialFee']").val()) || $("#financial-detail-out input[id='notarialFee']").val() == '' ? 0 : $("#financial-detail-out input[id='notarialFee']").val();
                var valuationFee = isNaN($("#financial-detail-out input[id='valuationFee']").val()) || $("#financial-detail-out input[id='valuationFee']").val() == '' ? 0 : $("#financial-detail-out input[id='valuationFee']").val();
                var mortgageFee = isNaN($("#financial-detail-out input[id='mortgageFee']").val()) || $("#financial-detail-out input[id='mortgageFee']").val() == '' ? 0 : $("#financial-detail-out input[id='mortgageFee']").val();
                var gpsFee = isNaN($("#financial-detail-out input[id='gpsFee']").val()) || $("#financial-detail-out input[id='gpsFee']").val() == '' ? 0 : $("#financial-detail-out input[id='gpsFee']").val();
                var totalFee = parseFloat(licensePlateEnsureMoney) + parseFloat(agreeEnsureMoney) + parseFloat(channelEnsureMoney)
                    + parseFloat(notarialFee) + parseFloat(valuationFee) + parseFloat(mortgageFee) + parseFloat(gpsFee)
                $("input[id='allMoney']").val(totalFee);
            }

            if ($(".financial-pay-confirm-btn").length <= 0) {
                $("#financial-detail-out").find("input").attr("readonly", true);
            }
        });

        dataProxy.getFinancialContributionByAcceptId(acceptId, true, "#financial-detail-in", function (data) {
            var html = UI.createFinancialContributionHtml();
            //费用明细(收入)组件初始化
            $("#financial-detail-in").append(html);
            var money = 0;
            for (var i = 0; i < data["rows"]["list"].length; i++) {
                var expenses = data["rows"]["list"][i]['incomeExpensesType'];
                if (expenses == 1) {
                    var type = data["rows"]["list"][i]["payMoneyType"];
                    $(".types-" + type).find("input").each(function (m, ipt) {
                        var name = $(ipt).attr("name");
                        $(ipt).val(data["rows"]["list"][i][name]);
                    });

                    if (type == 20 || type == 1 || type == 4 || type == 5 || type == 2) {
                        money += data["rows"]["list"][i]['actualMoney'];
                        $("input[name='allMoney2']").val(money);
                    }
                }
            }

            var agreeEnsureMoneyReceiptDate = new initDate("agreeEnsureMoneyReceiptDate");
            var channelEnsureMoneyReceiptDate = new initDate("channelEnsureMoneyReceiptDate");
            $(".type").find("input").each(function (m, ipt) {
                var name = $(ipt).attr("name");
                if (data["rows"]["money"] != null) {
                    $(ipt).val(data["rows"]["money"][name]);
                }
                var agreeEnsureMoney = isNaN(data["rows"]["money"]['agreeEnsureMoney']) || data["rows"]["money"]['agreeEnsureMoney'] == '' ? 0 : data["rows"]["money"]['agreeEnsureMoney'];
                var licensePlateEnsureMoney = isNaN(data["rows"]["money"]['licensePlateEnsureMoney']) || data["rows"]["money"]['licensePlateEnsureMoney'] == '' ? 0 : data["rows"]["money"]['licensePlateEnsureMoney'];
                var channelEnsureMoney = isNaN(data["rows"]["money"]['channelEnsureMoney']) || data["rows"]["money"]['channelEnsureMoney'] == '' ? 0 : data["rows"]["money"]['channelEnsureMoney'];
                var poundage = isNaN(data["rows"]["money"]['poundage']) || data["rows"]["money"]['poundage'] == '' ? 0 : data["rows"]["money"]['poundage'];
                var serviceFee = isNaN(data["rows"]["money"]['serviceFee']) || data["rows"]["money"]['serviceFee'] == '' ? 0 : data["rows"]["money"]['serviceFee'];
                var total = agreeEnsureMoney + licensePlateEnsureMoney + channelEnsureMoney + poundage + serviceFee;

                $("#incomeAll").val(total);
                $("input[name='agreeEnsureMoney']").on("change", function () {
                    initCalculateCashEvent();
                });
                $("input[name='licensePlateEnsureMoney']").on("change", function () {
                    initCalculateCashEvent();
                });
                $("input[name='channelEnsureMoney']").on("change", function () {
                    initCalculateCashEvent();
                });
                $("input[name='poundage']").on("change", function () {
                    initCalculateCashEvent();
                });
                $("input[name='serviceFee']").on("change", function () {
                    initCalculateCashEvent();
                });
                function initCalculateCashEvent() {
                    var agreeEnsureMoney = isNaN($("input[name='agreeEnsureMoney']").val()) || $("input[name='agreeEnsureMoney']").val() == '' ? 0 : $("input[name='agreeEnsureMoney']").val();
                    var licensePlateEnsureMoney = isNaN($("input[name='licensePlateEnsureMoney']").val()) || $("input[name='licensePlateEnsureMoney']").val() == '' ? 0 : $("input[name='licensePlateEnsureMoney']").val();
                    var channelEnsureMoney = isNaN($("input[name='channelEnsureMoney']").val()) || $("input[name='channelEnsureMoney']").val() == '' ? 0 : $("input[name='channelEnsureMoney']").val();
                    var poundage = isNaN($("input[name='poundage']").val()) || $("input[name='poundage']").val() == '' ? 0 : $("input[name='poundage']").val();
                    var serviceFee = isNaN($("input[name='serviceFee']").val()) || $("input[name='serviceFee']").val() == '' ? 0 : $("input[name='serviceFee']").val();

                    var totalFee = parseFloat(agreeEnsureMoney) + parseFloat(licensePlateEnsureMoney) + parseFloat(channelEnsureMoney)
                        + parseFloat(poundage) + parseFloat(serviceFee)
                    $("input[name='incomeAll']").val(totalFee);
                }

            });
            var agreeEnsureMoney = isNaN(data["rows"]["money"]['agreeEnsureMoney']) || data["rows"]["money"]['agreeEnsureMoney'] == '' ? 0 : data["rows"]["money"]['agreeEnsureMoney'];
            var licensePlateEnsureMoney = isNaN(data["rows"]["money"]['licensePlateEnsureMoney']) || data["rows"]["money"]['licensePlateEnsureMoney'] == '' ? 0 : data["rows"]["money"]['licensePlateEnsureMoney'];
            var channelEnsureMoney = isNaN(data["rows"]["money"]['channelEnsureMoney']) || data["rows"]["money"]['channelEnsureMoney'] == '' ? 0 : data["rows"]["money"]['channelEnsureMoney'];
            var poundage = isNaN(data["rows"]["money"]['poundage']) || data["rows"]["money"]['poundage'] == '' ? 0 : data["rows"]["money"]['poundage'];
            var serviceFee = isNaN(data["rows"]["money"]['serviceFee']) || data["rows"]["money"]['serviceFee'] == '' ? 0 : data["rows"]["money"]['serviceFee'];
            var total = agreeEnsureMoney + licensePlateEnsureMoney + channelEnsureMoney + poundage + serviceFee;

            $("#incomeAll").val(total);
            $("input[name='agreeEnsureMoney']").on("change", function () {
                initCalculateCashEvent();
            });
            $("input[name='licensePlateEnsureMoney']").on("change", function () {
                initCalculateCashEvent();
            });
            $("input[name='channelEnsureMoney']").on("change", function () {
                initCalculateCashEvent();
            });
            $("input[name='poundage']").on("change", function () {
                initCalculateCashEvent();
            });
            $("input[name='serviceFee']").on("change", function () {
                initCalculateCashEvent();
            });
            function initCalculateCashEvent() {
                var agreeEnsureMoney = isNaN($("input[name='agreeEnsureMoney']").val()) || $("input[name='agreeEnsureMoney']").val() == '' ? 0 : $("input[name='agreeEnsureMoney']").val();
                var licensePlateEnsureMoney = isNaN($("input[name='licensePlateEnsureMoney']").val()) || $("input[name='licensePlateEnsureMoney']").val() == '' ? 0 : $("input[name='licensePlateEnsureMoney']").val();
                var channelEnsureMoney = isNaN($("input[name='channelEnsureMoney']").val()) || $("input[name='channelEnsureMoney']").val() == '' ? 0 : $("input[name='channelEnsureMoney']").val();
                var poundage = isNaN($("input[name='poundage']").val()) || $("input[name='poundage']").val() == '' ? 0 : $("input[name='poundage']").val();
                var serviceFee = isNaN($("input[name='serviceFee']").val()) || $("input[name='serviceFee']").val() == '' ? 0 : $("input[name='serviceFee']").val();

                var totalFee = parseFloat(agreeEnsureMoney) + parseFloat(licensePlateEnsureMoney) + parseFloat(channelEnsureMoney)
                    + parseFloat(poundage) + parseFloat(serviceFee)
                $("input[name='incomeAll']").val(totalFee);
            }

            if (data["rows"]["audit"] != null) {
                if (data["rows"]["audit"]['auditBak'] != null) {
                    $("#auditRemark").val(data["rows"]["audit"]['auditBak']);
                }

                if (data["rows"]["audit"]['aduitTime'] != null) {
                    $("#date").val(data["rows"]["audit"]['aduitTime']);
                }
                if (data["rows"]["audit"]['auditUser'] != null) {
                    $("#user").val(data["rows"]["audit"]['auditUser']);
                }
            }

            if ($(".financial-income-confirm-btn").length <= 0) {
                $("#financial-detail-in").find("input").attr("readonly", true);
                $("#financial-detail-in").find("textarea").attr("readonly", true);
            }
            getFinanceOperationLogInfo();
        });
    }

    //收支信息
    function getFinancialIncomeInfo() {
        FinancialIncomeInfo();//清空组件
        //费用收入明细
        $("#financial-income").empty();
        dataProxy.getFinancialPayInfo(acceptId, true, "#financial-income", function (data) {
            $("#financial-income").html("");
            var html = UI.createFinancialPaymentsHtml(data);								//费用明细(收入)组件初始化
            $("#financial-income").append(html);
            $("#financial-income").find(".edit-btn").on("click", editFinancicalIncome);

            $("#financial-income").find(".income-detail").on("click", detailFinancicalIncome);

            //表格列表全选 取消全选
            $('.checkAll').click(function () {
                if ($(this).prop("checked")) {
                    $('.checkOne').each(function () {
                        $(this).prop("checked", true);
                    });
                } else {
                    $('.checkOne').each(function () {
                        $(this).prop("checked", false);
                    });
                }
            });

            $('.checkOne').click(function () {
                var len = $('.checkOne').length;
                if ($(".checkOne:checked").length < len) {
                    $('.checkAll').prop('checked', false);
                } else {
                    $('.checkAll').prop('checked', true);
                }
            });
        });


    }

    //初始化按钮事件
    function FinancialIncomeInfo() {
        //刷新按钮
        $("#fresh-income-btn").on("click", function () {
            dataProxy.getFinancialPayInfo(acceptId, true, "#financial-income", function (data) {
                $("#financial-income").html("");
                var html = UI.createFinancialPaymentsHtml(data);								//费用明细(收入)组件初始化
                $("#financial-income").append(html);
                //初始化编辑事件
                //$("#financial-income").find(".edit-btn").on("click", editFinancicalIncome);
                //表格列表全选 取消全选
                /*    $('.checkAll').click(function () {
                 if ($(this).prop("checked")) {
                 $('.checkOne').each(function () {
                 $(this).prop("checked", true);
                 });
                 } else {
                 $('.checkOne').each(function () {
                 $(this).prop("checked", false);
                 });
                 }
                 });

                 $('.checkOne').click(function () {
                 var len = $('.checkOne').length;
                 if ($(".checkOne:checked").length < len) {
                 $('.checkAll').prop('checked', false);
                 } else {
                 $('.checkAll').prop('checked', true);
                 }
                 });*/
            });
        });
        return true;
    }


    //费用确认按钮操作日志
    function getFinanceOperationLogInfo() {
        dataProxy.getFinaceOperationLogInfo(acceptId, true, "#finance-operation-info", function (data) {
            var html = UI.createFinanceOperationLogHtml(data);
            $("#finance-operation-info").append(html);
        });
    }

    //放贷信息按钮操作日志
    function getOperationLogInfo() {
        dataProxy.getOperationLogInfo(acceptId, true, "#operation-info", function (data) {
            var html = UI.createOperationLogHtml(data);
            $("#operation-info").append(html);
        });
    }

    //放贷信息操作日志
    function getOperationCtrlLogInfo() {
        dataProxy.getOperationLogInfo(acceptId, true, "#operationctrl-info", function (data) {
            var html = UI.createOperationCtrlLogHtml(data);
            $("#operationctrl-info").append(html);
        });
    }

    //更新车辆信息
    function saveCarInfoUpdate() {
        var cfProductId = $("#cfProductId").find("option:selected").text();
        if (cfProductId.indexOf("参融产品") >= 0) {
            $("input[name='insuranceFee']").attr("obj", "float");
            $("input[name='configTaxFee']").attr("obj", "float");
            $("input[name='totalFee']").attr("obj", "float");
        }
        initValidation(validationArray, "#tab-car");
        for (var i = 0; i < validationArray.length; i++) {
            var validation = validationArray[i];
            validation.mySubmit(validation);
            if (!validation.isSubmit) {
                faildMsg("请完善车辆信息");
                return;
            } else {
                var param = {};
                var isSubmit = false;
                param["carDealerId"] = $("#carDealerId").val();
                $("#audit-detail-car-information-list").find("input, select, textarea").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name != 'brandId') {
                        if (name == "carLicenseProvince" && "" != $.trim($(n).val())) {
                            param["carLicenseProvince"] = $.trim($(n).val()).split("-")[0];
                            param["carLicenseCity"] = $.trim($(n).val()).split("-")[1];
                        }else if(name == 'carBrandId'){
                        	param.carBrandId =$("#carNoId").val();
                        } else {
                            param[name] = $.trim($(n).val());
                        }
                    }
                });
                dataProxy.updateCarInfoByAcceptId(acceptId, param, function (data) {
                    successMsg("车辆信息更新保存成功");
                });
            }
        }
    }

    //作废订单
    function discardOrderWin() {
        var options = {
            width: 520,
            top: 200,
            height: 240,
            overlay: true,
            dispose: true,
            move: true,
            url: '',
            onBeforeShow: function () {
                $('#discardDescription').keyup(function () {							//审核描述信息提示
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength);
                    $(this).next("span").find(".can-input").html(100 - curLength);
                    if (curLength > 100) {
                        var num = $(this).val().trim().substr(0, 140);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                if ($("#discardOrderForm").valid("discardOrderForm")) {
                    var desc = $.trim($("#discardDescription").val());
                    loadingShow();
                    var params = {
                        idArr: acceptId,
                        remark: $.trim(desc)
                    };
                    $.ajax({
                        url: ctx + "/cfBusinessOrderAccept/discard.action",
                        type: "post",
                        data: params,
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    history.go(-1);
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var discardDlg = new Dialog("#discard-order-dialog", options);
        discardDlg.show();
    }

    //展示退回征信窗口
    function showBackCreditWin() {
        var options = {
            width: 600,
            top: 200,
            height: 320,
            overlay: true,
            dispose: true,
            move: true,
            move: true,
            url: '',
            onBeforeShow: function () {
                $('#auditDescription').keyup(function () {							//审核描述信息提示
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength);
                    $(this).next("span").find(".can-input").html(100 - curLength);
                    if (curLength > 100) {
                        var num = $(this).val().trim().substr(0, 140);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                if ($("#backCreditForm").valid("backCreditForm")) {
                    var desc = $.trim($("#auditDescription").val());
                    loadingShow();
                    var params = {
                        id: acceptId,
                        nodeName: "inputAuditData",
                        isWait: 0,
                        desc: $.trim(desc)
                    };
                    $.ajax({
                        url: ctx + "/cfBusinessOrderAccept/backCredit.action",
                        type: "post",
                        data: params,
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    history.go(-1);
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var backDlg = new Dialog("#back-credit-dialog", options);
        backDlg.show();
    }

    /*区域设置*/
    function initProvince(name, n, result) {
        if (name == 'province' && result["province"] != undefined && result["province"] != '') {
            var $province = result["province"];
            $(n).val($province.split("-").join(''));
        } else if (name == 'currentAddressProvince' && result["currentAddressProvince"] != undefined && result["currentAddressProvince"] != '') {
            var $province = result["currentAddressProvince"];
            $(n).val($province.split("-").join('') + result["currentAddress"]);
        } else if (name == 'familyAddressProvince' && result["familyAddressProvince"] != undefined && result["familyAddressProvince"] != '') {
            var $province = result["familyAddressProvince"];
            $(n).val($province.split("-").join('') + result["familyAddress"]);
        } else if (name == 'houseAddressProvince' && result["houseAddressProvince"] != undefined && result["houseAddressProvince"] != '') {
            var $province = result["houseAddressProvince"];
            $(n).val($province.split("-").join('') + result["houseAddress"]);
        } else if (name == 'companyProvince' && result["companyProvince"] != undefined && result["companyProvince"] != '') {
            var $province = result["companyProvince"];
            $(n).val($province.split("-").join('') + result["companyAddress"]);
        }
    }

    //费用审核
    function confirmFinancialIncome() {
        confirmDialog("您确定费用收入保存？", function () {
            var param = {};
            $("#financial-detail-in").find("input").each(function (i, n) {
                var name = $(n).attr("name");
                if (typeof(name) != "undefined") {
                    param[name] = $.trim($(n).val());
                }
                param.auditRemark = $("#auditRemark").val();
                param.businessOrderAcceptId = acceptId;
                param.orderStatus = orderStatus;

            });
            dataProxy.updateAdvancePayment(acceptId, JSON.stringify(param), function (data) {
                successMsg("审核成功", 1000, function () {
                    window.location.href = ctx + "/financial/queryForExpenseAudit.action";
                });
            });
        });
    }

    //费用退回
    function confirmFinancialBack() {
        confirmDialog("您确定费用退回？", function () {
            var param = {};
            $("#financial-detail-in").find("input").each(function (i, n) {
                var name = $(n).attr("name");
                if (typeof(name) != "undefined") {
                    param[name] = $.trim($(n).val());
                }
                param.auditRemark = $("#auditRemark").val();
                param.businessOrderAcceptId = acceptId;
            });
            dataProxy.updateCostBack(acceptId, JSON.stringify(param), function (data) {
                successMsg("退回成功", 1000, function () {
                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=financialPay";
                });
            });
        });
    }

    //应付确认
    function confirmFinancialPay() {
        confirmDialog("您确定应付确认？", function () {
            var param = new Array();
            $isSubmit = false;
            var input = "input[id='licensePlateEnsureMoney'],input[id='agreeEnsureMoney'],input[id='channelEnsureMoney'],input[id='notarialFee'],input[id='valuationFee'],input[id='mortgageFee'],input[id='gpsFee']";
            validInput(input, "financial-detail-out");
            if ($isSubmit) {
                $("#financial-detail-out").find("th").each(function (i, n) {
                    var type = $(n).attr("class");
                    var obj = new Object();
                    $("#financial-detail-out").find(".table-content").find("td." + type).each(function (i, m) {
                    	var value = $(m).find("input").val();
                    	if(value!=''){
                    	var name = $(m).find("input").attr("name");
                        obj[name] = value;
                        obj["businessOrderAcceptId"] = acceptId;
                        obj["payMoneyType"] = type.charAt(type.length - 1)
                        if (obj["payMoneyType"] == 0) {
                            obj["payMoneyType"] = 10;
                        	}
                    	}
                    });
                    if (obj["payMoneyType"] != null) {
                        param.push(obj);
                    }
                });

                dataProxy.addFinancialIncome(acceptId, JSON.stringify(param), function (data) {
                    successMsg("新增成功", 1000, function () {
                        window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=financialPay";
                    });
                });
            }
        });
    }

    //费用审核-上传凭证
    function expenseUploader() {
        Expenseupload();
    }

    //查看还款计划
    function showRepaymentPlan() {
        var isSubmit = $("#firstRepaymentDate").val();
        if (!isSubmit) {
            alertDialog("请填写首期还款日期");
        } else {
            var addDlg = new Dialog("#btn-showRePaymentPlanList", {
                width: 600,
                top: 200,
                height: 300,
                overlay: true,
                dispose: true,
                move: true,
                onAfterShow: function () {

                    $.ajax({
                        url: ctx + "/repaymentPlan/showRepaymentPlan.action",
                        type: "post",
                        data: {
                            acceptId: acceptId,
                            bankPaymentDate: $("#firstRepaymentDate").val()

                        },
                        dataType: "json",
                        success: function (data) {
                            var tbody = "";
                            $("#paymentPlanList .table tbody").html('');
                            if (data.error == 1) {
                                if (null == data.rows || data.rows.length <= 0) {
                                    tbody += '<tr class="no-border"><td class="col-td" colspan="4">暂无数据</td></tr>';
                                } else {
                                    if (data.rows.length > 6) {
                                        $(".dialog-container").height(500);
                                        $("#paymentPlanList .ibox-content").css({
                                            'height': 430,
                                            'overflow-y': 'scroll'
                                        })
                                    }
                                    for (var i = 0; i < data.rows.length; i++) {
                                        tbody += '<tr><td>' + (i + 1) + '</td>' +
                                            '<td>' + data.rows[i]["repayDays"] + '</td>' +
                                            '<td>' + data.rows[i]["shouldRepayMoney"] + '</td>' +
                                            '<td>' + data.rows[i]["remainMoney"] + '</td></tr>';
                                    }
                                }
                                $("#paymentPlanList .table tbody").html(tbody);
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                },
            });
        }
        addDlg.show();
    }

    //财务收支新增
    function addIncome() {
        var addDlg = new Dialog("#add-income-dialog", {
            width: 400,
            top: 200,
            height: 410,
            overlay: true,
            dispose: true,
            move: true,
            move: true,
            onBeforeShow: function () {
                getFinance("payMoneyType");
                getFinance("incomeExpensesType");
            },
            onAfterShow: function () {
                var confirmAccountTime = new initDate("confirmAccountTime");
                $("body").click(function () {
                    try {
                        laydate.getDefault().close();
                    } catch (e) {
                    }
                });
            },
            callback: function () {
                var flag = false;
                var param = {};
                param.confirmAccountTime = $("#confirmAccountTime").val();
                param.payMoneyType = $("#payMoneyType").val();
                param.incomeExpensesType = $("#incomeExpensesType").val();
                param.actualMoney = $("#actualMoney").val();
                param.remark = $("#remark").val();
                param.businessOrderAcceptId = acceptId;
                if ($("#addIncomeForm").valid("addIncomeForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/financial/addFinancial.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("新增收支成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=financialIncome";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        });
        addDlg.show();
    }

    function getFinance(id) {
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        };
        // 下拉框
        $("#" + id).chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($("#" + id).parent(), "remove");
            } else {
                change_error_style($("#" + id).parent(), "add");
            }
        });
    }

    // 查看财务收支
    function detailFinancicalIncome() {
        var id = $(this).attr("data-id");
        var addDlg = new Dialog("#income-detail-dialog", {
            width: 400,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            onBeforeShow: function () {
                getFinance("payMoneyType");
                getFinance("incomeExpensesType");
            },
            onAfterShow: function () {
                var confirmAccountTime = new initDate("confirmAccountTime");
                $("body").click(function () {
                    try {
                        laydate.getDefault().close();
                    } catch (e) {
                    }
                });
                $.ajax({
                    url: ctx + "/financial/getFinancialById.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var entity = data.rows;
                            $("#confirmAccountTime").val(entity.confirmAccountTime.split(" ")[0]);
                            $("#payMoneyType").val(entity.payMoneyType).trigger('chosen:updated');
                            $("#incomeExpensesType").val(entity.incomeExpensesType).trigger('chosen:updated');
                            $("#actualMoney").val(entity.actualMoney);
                            $("#remark").val(entity.remark);
                            $("#addIncomeForm").val(entity.addIncomeForm);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });

            },

        });
        addDlg.show();
    }

    // 编辑财务收支
    function editFinancicalIncome() {
        var id = $(this).attr("data-id");
        var addDlg = new Dialog("#edit-income-dialog", {
            width: 400,
            top: 200,
            height: 410,
            overlay: true,
            dispose: true,
            move: true,
            onBeforeShow: function () {
                getFinance("payMoneyType");
                getFinance("incomeExpensesType");
            },
            onAfterShow: function () {
                var confirmAccountTime = new initDate("confirmAccountTime");
                /* $("body").click(function () {
                 try {
                 laydate.getDefault().close();
                 } catch (e) {
                 }
                 });*/
                $.ajax({
                    url: ctx + "/financial/getFinancialById.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var entity = data.rows;
                            $("#confirmAccountTime").val(entity.confirmAccountTime);
                            $("#payMoneyType").val(entity.payMoneyType).trigger('chosen:updated');
                            $("#incomeExpensesType").val(entity.incomeExpensesType).trigger('chosen:updated');
                            $("#actualMoney").val(entity.actualMoney);
                            $("#remark").val(entity.remark);
                            $("#addIncomeForm").val(entity.addIncomeForm);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });

            },

            callback: function () {
                var flag = false;
                var param = {};
                param.confirmAccountTime = $("#confirmAccountTime").val();
                param.payMoneyType = $("#payMoneyType").val();
                param.incomeExpensesType = $("#incomeExpensesType").val();
                param.actualMoney = $("#actualMoney").val();
                param.remark = $("#remark").val();
                param.businessOrderAcceptId = acceptId;
                param.id = id;
                if ($("#editIncomeForm").valid("editIncomeForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/financial/editFinancialIncome.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("修改收支成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=financialIncome";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        });
        addDlg.show();
    }

    //财务收支删除
    function deleteIncome() {
        var ck = $("input[name='checkedOne']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的财务收支数据。");
            return
        } else {
            var idArr = new Array();
            var noticeIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    noticeIsvalid = false;
                }
            });
            if (!noticeIsvalid) {
                alertDialog("所选信息包含无效信息，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的财务收支数据吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/financial/toDelete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=financialIncome";
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            })
        }
    }

    //新增理赔信息
    function addInsuranceClaim() {
        var options = {
            width: 700,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '理赔记录',
            url: "",
            onBeforeShow: function () {
                getOption("cfInsuranceCompanyId");
            },
            onAfterShow: function () {
                var insuranceDate = new initDate("insuranceDate");
                var acceptanceDate = new initDate("acceptanceDate");
                var submitDate = new initDate("submitDate");
                var insuranceClaimCtime = new initDate("insuranceClaimCtime");
                $("body").click(function () {
                    try {
                        laydate.getDefault().close();
                    } catch (e) {
                    }
                });
                $.ajax({
                    url: ctx + "/claim/getPlateNumber.action",
                    type: "post",
                    data: {acceptId: acceptId},
                    dataType: "json",
                    success: function (data) {
                        $("#plateNumber").val(data.rows)
                    }
                });
            },
            callback: function () {
                var flag = false;
                var param = {};
                param.businessOrderAcceptId = acceptId;
                param.buyerName = $("#buyerName").val();
                param.plateNumber = $("#plateNumber").val();
                param.plateNumber = $("#plateNumber").val();
                param.tempPlateNumber = $("#tempPlateNumber").val();
                param.accountNumber = $("#accountNumber").val();
                param.cfInsuranceCompanyId = $("#cfInsuranceCompanyId").val();
                param.insuranceDate = $("#insuranceDate").val();
                param.acceptanceDate = $("#acceptanceDate").val();
                param.submitDate = $("#submitDate").val();
                param.caseTypeCode = $("#caseTypeCode").val();
                param.trafficResponsibility = $("#trafficResponsibility").val();
                param.money = $("#money").val();
                param.remark = $("#remarkInfo").val();
                param.insuranceClaimCtime = $("#insuranceClaimCtime").val();
                if ($("#insuranceClaimForm").valid("insuranceClaimForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/claim/insertClaim.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=insuranceClaim";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#view-claim-dialog", options);
        creatDlg.show();
    }

    function getOption(id) {
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        };

        $.ajax({
            url: ctx + "/claim/getInsuranceCompany.action",
            type: "post",
            dataType: "json",
            success: function (data) {
                var option = "";
                option += "<option value=''>请选择</option>";
                for (var i = 0; i < data.rows.length; i++) {
                    option += "<option value='" + data.rows[i].id + "'>" + data.rows[i].insuranceCompanyName + "</option>";
                    $("#" + id).find("option").remove();
                    $("#" + id).append(option);
                }
                $("#" + id).trigger("chosen:updated");

                //下拉框
                $("#" + id).chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#" + id).parent(), "remove");
                    } else {
                        change_error_style($("#" + id).parent(), "add");
                    }
                });
            }
        });
    }

    //编辑理赔信息
    function editInsuranceClaim(dataId) {
        var options = {
            width: 700,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '理赔记录',
            onBeforeShow: function () {
                getOption("cfInsuranceCompanyId_edit");
            },
            onAfterShow: function () {
                var insuranceDate = new initDate("insuranceDate_edit");
                var acceptanceDate = new initDate("acceptanceDate_edit");
                var submitDate = new initDate("submitDate_edit");
                var insuranceClaimCtime = new initDate("insuranceClaimCtime_edit");
                $("body").click(function () {
                    try {
                        laydate.getDefault().close();
                    } catch (e) {

                    }
                });
                $.ajax({
                    url: ctx + "/claim/getPlateNumber.action",
                    type: "post",
                    data: {acceptId: acceptId},
                    dataType: "json",
                    success: function (data) {
                        $("#plateNumber_edit").val(data.rows)
                    }
                });

                $.ajax({
                    url: ctx + "/claim/toEdit.action",
                    type: "post",
                    data: {
                        id: dataId
                    },
                    dataType: "json",
                    success: function (data) {

                        if (data.error == 1) {
                            var info = data.rows;
                            $("#plateNumber_edit").val(info.plateNumber);
                            $("#tempPlateNumber_edit").val(info.tempPlateNumber);
                            $("#accountNumber_edit").val(info.accountNumber);
                            $("#cfInsuranceCompanyId_edit").val(info.cfInsuranceCompanyId).trigger('chosen:updated');
                            $("#insuranceDate_edit").val(info.insuranceDate);
                            $("#caseTypeCode_edit").val(info.caseTypeCode);
                            $("#acceptanceDate_edit").val(info.acceptanceDate);
                            $("#submitDate_edit").val(info.submitDate);
                            $("#trafficResponsibility_edit").val(info.trafficResponsibility);
                            $("#money_edit").val(info.money);
                            $("#remark_edit").val(info.remark);
                            $("#insuranceClaimCtime_edit").val(info.ctime);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            callback: function () {
                var flag = false;
                var param = {};
                param.id = $(".editInsuranceClaim").attr("data-id");
                param.businessOrderAcceptId = acceptId;
                param.plateNumber = $("#plateNumber_edit").val();
                param.tempPlateNumber = $("#tempPlateNumber_edit").val();
                param.accountNumber = $("#accountNumber_edit").val();
                param.cfInsuranceCompanyId = $("#cfInsuranceCompanyId_edit").val();
                param.insuranceDate = $("#insuranceDate_edit").val();
                param.acceptanceDate = $("#acceptanceDate_edit").val();
                param.submitDate = $("#submitDate_edit").val();
                param.caseTypeCode = $("#caseTypeCode_edit").val();
                param.trafficResponsibility = $("#trafficResponsibility_edit").val();
                param.money = $("#money_edit").val();
                param.remark = $("#remark_edit").val();
                param.insuranceClaimCtime = $("#insuranceClaimCtime_edit").val();
                if ($("#insuranceClaimEditForm").valid("insuranceClaimEditForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/claim/editInsuranceClaim.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=insuranceClaim";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#view-claim-edit-dialog", options);
        creatDlg.show();
    }

    //查看理赔信息
    function detailInsuranceClaim(dataId) {
        var options = {
            width: 700,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '理赔记录',
            url: "",
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/claim/getBuyerName.action",
                    type: "post",
                    data: {acceptId: acceptId},
                    dataType: "json",
                    success: function (data) {
                        $("#buyerName_detail").val(data.rows)
                    }
                });
                $.ajax({
                    url: ctx + "/claim/getRealName.action",
                    type: "post",
                    data: {acceptId: acceptId},
                    dataType: "json",
                    success: function (data) {
                        $("#inputer_detail").val(data.rows)
                    }
                });
                $.ajax({
                    url: ctx + "/claim/toEdit.action",
                    type: "post",
                    data: {
                        id: dataId
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var info = data.rows;
                            $("#plateNumber_detail").val(info.plateNumber);
                            $("#tempPlateNumber_detail").val(info.tempPlateNumber);
                            $("#accountNumber_detail").val(info.accountNumber);
                            $("#cfInsuranceCompanyId_detail").val(info.cfInsuranceCompany);
                            $("#insuranceDate_detail").val(info.insuranceDate);
                            $("#acceptanceDate_detail").val(info.acceptanceDate);
                            $("#submitDate_detail").val(info.submitDate);
                            $("#trafficResponsibility_detail").val(info.trafficResponsibility);
                            $("#money_detail").val(info.money);
                            $("#caseTypeCode_detail").val(info.caseTypeCode);
                            $("#remark_detail").val(info.remark);
                            $("#insuranceClaimCtime_detail").val(info.ctime);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            callback: function () {

            }
        };
        var detailDlg = new Dialog("#view-claim-detail-dialog", options);
        detailDlg.show();
    }

    //删除理赔信息
    function deleteInsuranceClaim() {
        var ck = $("input[name='claimCheckbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的理赔信息。");
            return
        } else {
            var idArr = new Array();
            var noticeIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    noticeIsvalid = false;
                }
            });
            if (!noticeIsvalid) {
                alertDialog("所选信息包含无效信息，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的理赔信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/claim/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=insuranceClaim";
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            });
        }
    }

    function freshInsuranceClaim() {
        window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=insuranceClaim";
    }

    //放款信息
    function getPayLoanInfo(date) {
        var newLendingInfo = lendingInfo;
        dataProxy.updateConfig(newLendingInfo, function (config) {
            if (orderStatus >= 20) {
                if (config['name'] == 'companyAdvanceMoney') {
                    UI.setConfigTagReadOnly(config);
                }
                if (config['name'] == 'advancedPrincipalMoney') {
                    UI.setConfigTagReadOnly(config);
                }

            }

            if (orderStatus < 20 || orderStatus == 50) {
                if (config['name'] == 'certificateFilePath') {
                    config['xtype'] = 'hidden';
                }
            }
            if (orderStatus < 20 || orderStatus == 50) {
                if (config['name'] == 'principalCertificateFilePath') {
                    config['xtype'] = 'hidden';
                }
            }

            if (orderStatus < 38 || orderStatus == 50) {
                if (config['name'] == 'secondCertificateFilePath') {
                    config['xtype'] = 'hidden';
                }
            }


            if (orderStatus >= 28) {
                if (config['name'] == 'bankPaymentMoney') {
                    UI.setConfigTagReadOnly(config);
                }
            }
        });


        new HYCarFinance.form({
            id: '#loan-info',
            items: newLendingInfo,
            xtype: 'fieldcontainer',
            beforeShow: function () {

                //上传垫款凭证
                if ($(".detail-permission-code-wrap").find("input[name='uploadLendProof']").length > 0) {					//是否有权限操作按钮控制
                    $(".uploader-btn").on("click", function () {
                        upload();
                    });
                } else {
                    $(".uploader-btn").remove();
                }
                //本金垫款凭证
                if ($(".detail-permission-code-wrap").find("input[name='principalUploadLendProof']").length > 0) {					//是否有权限操作按钮控制
                    $(".principal-uploader-btn").on("click", function () {
                        principalUpload();
                    });
                } else {
                    $(".principal-uploader-btn").remove();
                }

                //二次打款上传凭证
                if ($(".detail-permission-code-wrap").find("input[name='secondUploadLendProof']").length > 0) {					//是否有权限操作按钮控制
                    $(".second-uploader-btn").on("click", function () {
                        secondUpload();
                    });
                } else {
                    $(".second-uploader-btn").remove();
                }

            }
        });

        dataProxy.getMoneyPackpageInfo(orderStatus, false, "#loan-info", function (res) {
            var config = {
                disable_search_threshold: 10,
                no_results_text: '无数据',
                width: "100%"
            };//数据初始化
            if (null != res) {
                var optionHtml = '';
                for (var i = 0; i < res.length; i++) {
                    optionHtml += "<option value='" + res[i]["id"] + "' data-remainingMoney='" + res[i]["remainingMoney"] + "'>" + res[i]["name"] + "</option>";
                }
                $("#moneyPackage").append(optionHtml).chosen(config).on('change', function (e, param) {
                    var remainingMoneyVal = $("#moneyPackage").find("option:selected").attr('data-remainingMoney');
                    if (remainingMoneyVal == "") {
                        $("#loan-info").find("#money").html('');
                    } else {
                        $("#loan-info").find("#money").html(remainingMoneyVal);
                    }
                });
            }
        });
        if (orderStatus != 19) {
            $("#moneyPackage").attr('disabled', 'true');
        }
    }

    //卡片信息
    function getCardInfo() {
        var newCardInfo = cardInfo;
        dataProxy.updateConfig(newCardInfo, function (config) {
            //UI.setConfigTagReadOnly(config);
        });
        new HYCarFinance.form({
            id: '#card-info',
            items: newCardInfo,
            beforeShow: function () {
                if ($(".financial-carinfo").length <= 0) {
                    $("#card-info").find("input").attr("disabled", true);
                    $("#card-info").find("textarea").attr("disabled", true);
                }

            }
        });
    }

    //票据退件信息
    function getBillInfo() {
        var newBillInfo = billInfo;
        dataProxy.updateConfig(newBillInfo, function (config) {
            //UI.setConfigTagReadOnly(config);
        });

        new HYCarFinance.form({
            id: '#bill-info',
            items: newBillInfo,
            beforeShow: function () {
                if ($(".financial-comebackinfo").length <= 0) {
                    $("#bill-info").find("input").attr("disabled", true);
                    $("#bill-info").find("textarea").attr("disabled", true);
                }
            }
        });
    }

    //合同信息 
    function getContractInfo() {
        var newContractInfo = contractInfo;

        new HYCarFinance.form({
            id: '#contract-info',
            items: newContractInfo,
            xtype: 'fieldcontainer',
            beforeShow: function () {
                if ($(".detail-permission-code-wrap").find("input[name='saveArchivesTeamToDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".teamToDateSave-btn").on("click", function () {														//业务保存送交日期
                        saveArchivesTeamToDate();
                    });
                }
                if ($(".detail-permission-code-wrap").find("input[name='saveArchivesBankToDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".bankToDateSave-btn").on("click", function () {														//银行保存送交日期
                        saveArchivesBankToDate();
                    });
                }
                if ($(".detail-permission-code-wrap").find("input[name='saveArchivesToDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".toDateSave-btn").on("click", function () {														//保存送交日期
                        saveArchivesToDate();
                    });
                }
                if ($(".detail-permission-code-wrap").find("input[name='saveArchivesGetDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".saveArchivesGetDate-btn").on("click", function () {														//保存获取日期
                        saveArchivesGetDate();
                    });
                }
               /* if ($(".detail-permission-code-wrap").find("input[name='saveArchivesCompleteDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".saveArchivesCompleteDate-btn").on("click", function () {														//保存齐全日期
                        saveArchivesCompleteDate();
                    });
                }*/
                if ($(".detail-permission-code-wrap").find("input[name='saveArchivesAlternateDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".saveArchivesAlternateDate-btn").on("click", function () {														//保存候补日期
                        saveArchivesAlternateDate();
                    });
                }
                if ($(".detail-permission-code-wrap").find("input[name='saveScanningDate']").length > 0) {					//是否有权限操作按钮控制
                    $(".saveScanningDate-btn").on("click", function () {														//保存扫描日期
                        saveScanningDate();
                    });
                }
            }
        });
        if ($(".detail-permission-code-wrap").find("input[name='saveArchivesTeamToDate']").length <= 0 || $("#orderStatus").val() < 4) {
            $("#contract-info").find("input[name='teamDeliverContractDate']").attr("disabled", true);
            $("#contract-info").find("input[name='teamDeliverContractRemark']").attr("readonly", true);
            $("#contract-info").find(".teamToDateSave-btn").hide();
        }
        if ($(".detail-permission-code-wrap").find("input[name='saveArchivesBankToDate']").length <= 0 || $("#orderStatus").val() < 4) {
            $("#contract-info").find("input[name='bankReceiveContractDate']").attr("disabled", true);
            $("#contract-info").find("input[name='bankReceiveContractRemark']").attr("readonly", true);
            $("#contract-info").find(".bankToDateSave-btn").hide();
        }
        if ($(".detail-permission-code-wrap").find("input[name='saveArchivesToDate']").length <= 0 || $("#orderStatus").val() < 4) {
            $("#contract-info").find("input[name='contractSubmitBankDate']").attr("disabled", true);
            $("#contract-info").find("input[name='loanContractAllDate']").attr("disabled", true);
            $("#contract-info").find("select[name='askTypeCode']").attr("disabled", true);
            $("#contract-info").find("input[name='contractSubmitBankRemark']").attr("readonly", true);
            $("#contract-info").find(".toDateSave-btn").hide();
        }
        if ($(".detail-permission-code-wrap").find("input[name='saveArchivesGetDate']").length <= 0 || $("#orderStatus").val() < 4) {
            $("#contract-info").find("input[name='loanContractReceiveDate']").attr("disabled", true);
            $("#contract-info").find("input[name='lastFileNoticeDate']").attr("disabled", true);
            $("#contract-info").find("input[name='loanContractReceiveRemark']").attr("readonly", true);
            $("#contract-info").find(".saveArchivesGetDate-btn").hide();
        }
       /* if ($(".detail-permission-code-wrap").find("input[name='saveArchivesCompleteDate']").length <= 0 || $("#orderStatus").val() < 4) {
            $("#contract-info").find("input[name='loanContractAllDate']").attr("disabled", true);
            $("#contract-info").find("input[name='loanContractAllRemark']").attr("readonly", true);
            $("#contract-info").find(".saveArchivesCompleteDate-btn").hide();
        }*/
        if ($(".detail-permission-code-wrap").find("input[name='saveArchivesAlternateDate']").length <= 0 || $("#orderStatus").val() < 4) {
           
            $("#contract-info").find("input[name='lastFileReceiveDate']").attr("disabled", true);
            $("#contract-info").find("input[name='lastFileRemark']").attr("readonly", true);
            $("#contract-info").find(".saveArchivesAlternateDate-btn").hide();
        }
        if ($(".detail-permission-code-wrap").find("input[name='saveScanningDate']").length <= 0 || $("#orderStatus").val() < 4) {
        	   $("#contract-info").find("input[name='contractFileAddRemark']").attr("readonly", true);
            $("#contract-info").find(".saveScanningDate-btn").hide();
        }
    }

    //档案信息
   /* function getArchivesInfo() {
        var newArchivesInfo = archivesInfo;
        dataProxy.updateConfig(newArchivesInfo, function (config) {
            //UI.setConfigTagReadOnly(config);
        });
        new HYCarFinance.form({
            id: '#archives-info',
            items: newArchivesInfo,
            beforeShow: function () {
                if ($(".financial-archivesinfo").length <= 0) {
                    $("#archives-info").find("input").attr("disabled", true);
                    $("#archives-info").find("textarea").attr("disabled", true);
                }
            }
        });
    }*/

    //其他信息
    function getOtherInfo() {
        var newOtherInfo = otherInfo;
        dataProxy.updateConfig(newOtherInfo, function (config) {
        });
        new HYCarFinance.form({
            id: '#other-info',
            items: newOtherInfo,
            beforeShow: function () {
                if ($(".financial-otherinfo").length <= 0) {
                    $("#other-info").find("input").attr("disabled", true);
                    $("#other-info").find("textarea").attr("disabled", true);
                }
            }
        });
    }

    //银行退件信息
    function getBankBackInfo() {
        var newBankBackInfo = bankBackInfo;
        dataProxy.updateConfig(newBankBackInfo, function (config) {
        });
        new HYCarFinance.form({
            id: '#bankback-info',
            items: newBankBackInfo,
            beforeShow: function () {
                if ($(".financial-bankbackinfo").length <= 0) {
                    $("#bankback-info").find("input").attr("disabled", true);
                    $("#bankback-info").find("textarea").attr("disabled", true);
                }
            }
        });
    }

    //结清单提交信息
    function getAccountInfo() {
        var newAccountInfo = accountInfo;
        dataProxy.updateConfig(newAccountInfo, function (config) {

        });
        new HYCarFinance.form({
            id: '#account-info',
            items: newAccountInfo,
            beforeShow: function () {
                if ($(".financial-accountinfo").length <= 0) {
                    $("#account-info").find("input").attr("disabled", true);
                    $("#account-info").find("textarea").attr("disabled", true);
                }
            }

        });
    }

    //获取逾期情况
    function getOverdueInfo() {
        //逾期情况
        dataProxy.getOverdueDesc(acceptId, "#detail-overdue-desc", function (data) {
            $("#detail-overdue-desc").empty().html(UI.createOverdueDescHtml(data));
        });
        //逾期记录
        dataProxy.listOverdueByOrderId(acceptId, "#detail-overdue-list", function (data) {
            $("#detail-overdue-list").empty().html(UI.createOverdueListHtml(data));
            setTableCheck("#detail-overdue-list");
        });
        //催缴记录
        dataProxy.listUrgeDetailByOrderId(acceptId, "#detail-urge-list", function (data) {
            $("#detail-urge-list").empty().html(UI.createUrgeListHtml(data));
            setTableCheck("#detail-urge-list");
            getButtonShow();
        });
          //代偿记录
        dataProxy.getOrderAdvancedIncome(acceptId, "#detail-adv-list", function (data) {
            $("#detail-adv-list").empty().html(UI.createAdvListHtml(data));
            setTableCheck("#detail-adv-list");
            getButtonShow();
        });
          //拖车单记录
         dataProxy.listTrailCarExecuteByOrderId(acceptId, "#detail-car-trailExecute-list", function (data) {
         $("#detail-car-trailExecute-list").empty().html(UI.createTrailCarExecuteListHtml(data));
         });

        //保全记录
        dataProxy.listTrailCarByOrderId(acceptId, "#detail-car-trail-list", function (data) {
            $("#detail-car-trail-list").empty().html(UI.createTrailCarListHtml(data));
        });
        //诉讼情况
        dataProxy.listLawDetailByOrderId(acceptId, "#detail-law-list", function (data) {
            $("#detail-law-list").empty().html(UI.createLawListHtml(data));
        });


    }
    function getButtonShow() {

        if($("#trail_view").val()=="1"){
            $("#trail_button").show()
        }else{
            $("#trail_button").hide()
        }
        if($("#adv_view").val()=="1"){
            $("#law_button").show()
        }else{
            $("#law_button").hide()
        }

    }
    //出险信息
    function getInsurcaceClaimInfo() {
        $("#audit-claim-table").empty();
        dataProxy.getInsurcaceClaimInfo(acceptId, true, "#audit-claim-table", function (data) {
            var html = UI.createInsurcaceClaimHtml(data);								//出险情况组件初始化
            $("#audit-claim-table").append(html);
            //根据权限判断编辑按钮
            if ($(".detail-permission-code-wrap").find("input[name='editInsuranceClaim']").length <= 0) {
                $("a[id^='editInsuranceClaim']").remove();
            }

            if ($(".detail-permission-code-wrap").find("input[name='editInsuranceClaim']").length <= 0 || $("#orderStatus").val() < 13) {
                $(".editInsuranceClaim").find(".editInsuranceClaim").hide();
            }
            //修改理赔信息
            if ($(".editInsuranceClaim").length > 0) {

                $(".editInsuranceClaim").on("click", function () {
                    var dataId = $(this).attr("data-id");
                    editInsuranceClaim(dataId)
                });
            }
            //查看理赔信息
            if ($(".detailInsuranceClaim").length > 0) {
                $(".detailInsuranceClaim").on("click", function () {
                    var dataId = $(this).attr("data-id");
                    detailInsuranceClaim(dataId)
                });
            }
            //表格列表全选 取消全选
            $('.checkAll').click(function () {
                if ($(this).prop("checked")) {
                    $('.checkOne').each(function () {
                        $(this).prop("checked", true);
                    });
                } else {
                    $('.checkOne').each(function () {
                        $(this).prop("checked", false);
                    });
                }
            });

            $('.checkOne').click(function () {
                var len = $('.checkOne').length;
                if ($(".checkOne:checked").length < len) {
                    $('.checkAll').prop('checked', false);
                } else {
                    $('.checkAll').prop('checked', true);
                }
            });
            //表格列表行选
            $("td.cel").click(function () {
                var _this = $(this).parent().find(".checkOne");
                if (_this.length > 0 && _this.is(':checked')) {
                    _this.prop('checked', false);
                } else if (_this.length > 0) {
                    _this.prop('checked', true);
                }
                var len = $('.checkOne').length;
                if ($('.checkOne:checked').length < len) {
                    $('.checkAll').prop('checked', false);
                } else if (len != 0) {
                    $('.checkAll').prop('checked', true);
                }
            });
        })
    }

    //卡片信息保存
    function saveCardInfo() {
        confirmDialog("您确定要保存卡片信息？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='bankCardNo'],input[name='bankCardExpressDate'],input[name='expressAddress'],input[name='trackingNo'],input[name='bankCardReceiveDate'],input[name='firstRepaymentDate'],input[name='cardAddRemark']";
            validInput(input, "card-info");
            if($("#cardAddRemark").val()!=""){
             	 $isSubmit =true;
             }
            if ($isSubmit) {
                $("#card-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 5;
                    param.cardAddRemark = $("#cardAddRemark").val();
                });
                dataProxy.updateLendingInfoById(acceptId, 5, param, function (data) {
                    dataProxy.insertRepaymentPlan(acceptId, param, function (data) {
                    });
                    successMsg("卡片信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#card-info", data);
                            }

                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //票据退件信息保存
    function saveBillQuitFile() {
        confirmDialog("您确定要保存票据退件信息？", function () {

            var param = {};
            $isSubmit = false;
            var input = "input[name='billRefundReason'],input[name='billRefundDate'],input[name='billRefundMoney'],input[name='billRefundLossMoney'],input[name='billRefundRepaymentDate'],input[name='billRefundRepaymentMoney'],input[name='receiptRebackAddRemark']";
            validInput(input, "bill-info");
            if($("#receiptRebackAddRemark").val()!=""){
              	 $isSubmit =true;
              }
            if ($isSubmit) {
                $("#bill-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 6;
                    param.receiptRebackAddRemark = $("#receiptRebackAddRemark").val();
                });
                dataProxy.updateLendingInfoById(acceptId, 6, param, function (data) {
                    successMsg("票据退件信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#bill-info", data);
                            }

                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //业务寄出日期保存
    function saveArchivesTeamToDate() {
        confirmDialog("您确定要保存业务寄出日期？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='teamDeliverContractDate'],input[name='teamDeliverContractRemark'],input[name='teamDeliverContractHandlePersonName']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'teamDeliverContractDate' || name == 'teamDeliverContractRemark' || name == 'id') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 19;
                });
                dataProxy.updateLendingInfoById(acceptId, 19, param, function (data) {
                    successMsg("合同资料信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //银行收到日期保存
    function saveArchivesBankToDate() {
        confirmDialog("您确定要保存银行收到日期？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='bankReceiveContractDate'],input[name='bankReceiveContractRemark'],input[name='dzBankReceiveContractPersonName']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'bankReceiveContractDate' || name == 'bankReceiveContractRemark' || name == 'id') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 20;
                });
                dataProxy.updateLendingInfoById(acceptId, 20, param, function (data) {
                    successMsg("合同资料信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //合同资送交日期保存
    function saveArchivesToDate() {
        confirmDialog("您确定要保存合同资送交日期？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='contractSubmitBankDate'],input[name='contractSubmitBankRemark'],input[name='loanContractAllDate'],input[name='dzSendContractToBankPersonName']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'contractSubmitBankDate' || name == 'contractSubmitBankRemark' || name == 'id'|| name == 'loanContractAllDate') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 7;
                    param.askTypeCode = $("#askTypeCode").val();
                });
                dataProxy.updateLendingInfoById(acceptId, 7, param, function (data) {
                    successMsg("合同资料信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //单证收到贷款合同保存
    function saveArchivesGetDate() {
        confirmDialog("您确定要保存单证收到贷款合同日期？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='loanContractReceiveDate'],input[name='loanContractReceiveRemark'],input[name='lastFileNoticeDate'],input[name='dzReceiveContractPersonName']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'loanContractReceiveDate' || name == 'loanContractReceiveRemark' || name == 'id'|| name == 'lastFileNoticeDate') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 18;
                });
                dataProxy.updateLendingInfoById(acceptId, 18, param, function (data) {
                    successMsg("单证收到贷款合同保存更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }

                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //齐全日期保存
    function saveArchivesCompleteDate() {
        confirmDialog("您确定要保存齐全日期？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='loanContractAllDate'],input[name='loanContractAllRemark']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'loanContractAllDate' || name == 'loanContractAllRemark' || name == 'id') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 15;
                });
                dataProxy.updateLendingInfoById(acceptId, 15, param, function (data) {
                    successMsg("收到日期更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //后补日期保存
    function saveArchivesAlternateDate() {
        confirmDialog("您确定要保存后补日期？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='lastFileNoticeDate'],input[name='lastFileReceiveDate'],input[name='lastFileRemark'],input[name='dzReceiveWaitingFilePersonName']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'lastFileNoticeDate' || name == 'lastFileReceiveDate' || name == 'lastFileRemark' || name == 'id') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 16;
                });
                dataProxy.updateLendingInfoById(acceptId, 16, param, function (data) {
                    successMsg("收到日期更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //扫描日期保存
    function saveScanningDate() {
        confirmDialog("您确定要保存合同备注？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='contractFileAddRemark'],input[name='contractRemakSaveUserName']";
            validInput(input, "contract-info");
            if ($isSubmit) {
                $("#contract-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined" && name == 'id'|| name == 'contractFileAddRemark') {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 17;
                });
                dataProxy.updateLendingInfoById(acceptId, 17, param, function (data) {
                    successMsg("合同备注更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#contract-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }


    //档案信息保存
  /*  function saveArchivesInfo() {
        confirmDialog("您确定要保存档案信息？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='firstArchiveDate'],input[name='secondArchiveDate'],input[name='transferArchiveDate'],input[name='transferArchiveRemark']";
            validInput(input, "archives-info");
            if ($isSubmit) {
                $("#archives-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.transferArchiveRemark = $("#transferArchiveRemark").val();
                    param.lendingState = 8;
                });
                dataProxy.updateLendingInfoById(acceptId, 8, param, function (data) {
                    successMsg("档案信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#archives-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
        });
    }*/

    //其他信息
    function savePlayOtherInfo() {
        confirmDialog("您确定要保存其他信息？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='loanFileFirstSubmitBank'],input[name='loanFileLastSubmitBank'],input[name='receiptSign'],input[name='backDate']";
            validInput(input, "other-info");
            if($("#otherAddRemark").val()!=""){
           	 $isSubmit =true;
           }
            if ($isSubmit) {
                $("#other-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.lendingState = 9;
                    param.otherAddRemark = $("#otherAddRemark").val();
                });
                dataProxy.updateLendingInfoById(acceptId, 9, param, function (data) {
                    successMsg("其他信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#other-info", data);
                            }

                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //银行退件
    function saveBankQuitFile() {
        confirmDialog("您确定要银行退件？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='statementSubmitDate'],input[name='preStatementDate'],input[name='normalStatementDate'],input[name='statementRemark']";
            validInput(input, "account-info");
            if($("#bankBounceReason").val()!=""){
            	 $isSubmit =true;
            }
            if ($isSubmit) {
                $("#bankback-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.bankBounceReason = $("#bankBounceReason").val();
                    param.lendingState = 10;
                });
                dataProxy.updateLendingInfoById(acceptId, 10, param, function (data) {
                    successMsg("银行退件信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#bankback-info", data);
                            }
                        });
                        getProcessDetail();
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //结清单提交
    function saveSettleLoan() {
        confirmDialog("您确定要结清单提交？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='statementSubmitDate'],input[name='preStatementDate'],input[name='normalStatementDate'],input[name='statementRemark']";
            validInput(input, "account-info");
            if($("#statementRemark").val()!=""){
            	 $isSubmit =true;
            }
            if ($isSubmit) {
                $("#account-info").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.statementRemark = $("#statementRemark").val();
                    param.lendingState = 11;
                });
                dataProxy.updateLendingInfoById(acceptId, 11, param, function (data) {
                    successMsg("结清单信息更新成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#account-info", data);
                            }
                        });
                        getProcessDetail();
                        $(".mod_header").find("h5").html('<strong>订单详情</strong>--当前状态:<code>已结清</code>');
                    });
                });
            }
            else {
                alertDialog("请完善信息。");
            }
        });
    }

    //打款确认
    function confirmPlayMoney() {
        var param = {};
        $isSubmit = true;
        var input = "input[name='companyAdvanceMoneyDate']";
        if ($("#companyAdvanceMoneyDate").val() == '') {
            faildMsg("请选择公司垫付日期");
            return flag
        } else {
            if ($("#moneyPackage").val() == '') {
                faildMsg("请选择资金包");
                return flag
            } else {
                confirmDialog("您确定要财务打款？", function () {
                    if ($isSubmit) {
                        $("#loan-info").find("input").each(function (i, n) {
                            param.companyAdvanceMoneyDate = $("#companyAdvanceMoneyDate").val();
                            param.companyAdvanceMoney = $("#companyAdvanceMoney").val();
                            param.moneyPackage = $("#moneyPackage").val();
                            param.id = $("#id").val();
                            param.lendingState = 2;
                            param.orderStatus = orderStatus;
                        });
                        dataProxy.updateLendingInfoById(acceptId, 2, param, function (data) {
                            successMsg("打款确认成功", 1000, function () {
                                window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";

                            });
                        });
                    }
                });
            }
        }
    }
    //贷款本金打款确认
    function confirmPlayPrincipalMoney() {
        var param = {};
        $isSubmit = true;
        var input = "input[name='advancedPrincipalMoneyDate']";
        if ($("#advancedPrincipalMoneyDate").val() == '') {
            faildMsg("请选择贷款本金打款日期");
            return flag
        } else {
            if ($("#moneyPackage").val() == '') {
                faildMsg("请选择资金包");
                return flag
            } else {
                confirmDialog("您确定要贷款本金打款？", function () {
                    if ($isSubmit) {
                        $("#loan-info").find("input").each(function (i, n) {
                            param.advancedPrincipalMoneyDate = $("#advancedPrincipalMoneyDate").val();
                            param.advancedPrincipalMoney = $("#advancedPrincipalMoney").val();
                            param.moneyPackage = $("#moneyPackage").val();
                            param.id = $("#id").val();
                            param.lendingState = 33;
                            param.orderStatus = orderStatus;
                        });
                        dataProxy.updateLendingInfoById(acceptId, 33, param, function (data) {
                            successMsg("贷款本金打款确认成功", 1000, function () {
                                window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";

                            });
                        });
                    }
                });
            }
        }
    }

    //转贷后保存
    function returnPlayMoney() {
        confirmDialog("您确定要转贷后保存？", function () {
            var param = {};
                $("#loan-info").find("input").each(function (i, n) {
                    param.transferLoanAfterDate = $("#transferLoanAfterDate").val();
                    param.id = $("#id").val();
                    param.lendingState = 12;
                });
                dataProxy.updateLendingInfoById(acceptId, 12, param, function (data) {
                    successMsg("转贷后保存成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#loan-info", data);
                            }
                        });
                    });
                });
        });
    }

    //放款保存
    function savePlayMoney() {
        confirmDialog("您确定要放款保存？", function () {
            var param = {};
            $isSubmit = false;
            var input = "input[name='bankPaymentDate'],input[name='bankMoneyArriveDate'],input[name='bankPaymentMoney'],input[name='bankPaymentRemark']";
            validInput(input, "loan-info");
            if ($isSubmit) {
                $("#loan-info").find("input").each(function (i, n) {
                    param.bankPaymentDate = $("#bankPaymentDate").val();
                    param.bankMoneyArriveDate = $("#bankMoneyArriveDate").val();
                    param.bankPaymentMoney = $("#bankPaymentMoney").val();
                    param.bankPaymentRemark = $("#bankPaymentRemark").val();
                    param.id = $("#id").val();
                    param.lendingState = 3;
                });
                dataProxy.updateLendingInfoById(acceptId, 3, param, function (data) {
                    successMsg("放款保存成功", 1000, function () {
                        dataProxy.getLoanInfo(acceptId, true, "#loan-info", function (data) {
                            if (null != data) {													//设置默认值
                                UI.setDefaultValue("#loan-info", data);
                            }
                        });
                    });
                });
            }
        });
    }

    //放款成交
    function dealPlayMoney() {
        var param = {};
        $isSubmit = false;
        var input = "input[name='bankPaymentDate'],input[name='bankMoneyArriveDate'],input[name='bankPaymentMoney'],input[name='bankPaymentRemark']";
        if ($("#bankPaymentDate").val() == '') {
            faildMsg("请选择银行放款日期");
            return flag
        } else {
            confirmDialog("您确定要放款成交？", function () {
                validInput(input, "loan-info");
                if ($isSubmit) {
                    $("#loan-info").find("input").each(function (i, n) {
                        param.bankPaymentDate = $("#bankPaymentDate").val();
                        param.bankMoneyArriveDate = $("#bankMoneyArriveDate").val();
                        param.bankPaymentMoney = $("#bankPaymentMoney").val();
                        param.bankPaymentRemark = $("#bankPaymentRemark").val();
                        param.moneyPackage = $("#moneyPackage").val();
                        param.companyAdvanceMoney = $("#companyAdvanceMoney").val();
                        param.id = $("#id").val();
                        param.lendingState = 4;
                        param.orderStatus = orderStatus;
                    });
                    dataProxy.updateLendingInfoById(acceptId, 4, param, function (data) {
                        successMsg("放款成交成功", 1000, function () {
                            window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";
                        });
                    });
                }
            });
        }
    }

    //撤回打款
    function cancelPlayMoney() {
        confirmDialog("您确定要撤回打款？", function () {
            debugger;
            if($("#secondLendingMoney").val()!=''||orderStatus>=38){
                faildMsg("请先撤销二次打款，然后再撤销本金打款，谢谢！");
                return ;
            }
            var param = {};
            var isSubmit = false;
            $("#loan-info").find("input").each(function (i, n) {
                param.id = $("#id").val();
                param.lendingState = 13;
                param.orderStatus = orderStatus;
                param.moneyPackage = $("#moneyPackage").val();
                param.companyAdvanceMoney = $("#companyAdvanceMoney").val();
            });
            dataProxy.updateLendingInfoById(acceptId, 13, param, function (data) {
                successMsg("撤回打款成功", 1000, function () {
                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";
                });
            });
        });
    }
    
    //查询征信
    function queryCredit(){
    	loadingShow();
        $.ajax({
            url: ctx + "/cfBusinessOrderAccept/queryCredit.action",
            type: "post",
            data: {
                "orderId": acceptId
            },
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1) {
                    successMsg("查询成功");
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    //撤回成交
    function cancelPlayDealing() {
        confirmDialog("您确定要撤回成交？", function () {
            var param = {};
            var isSubmit = false;
            $("#loan-info").find("input").each(function (i, n) {
                param.id = $("#id").val();
                param.lendingState = 14;
                param.orderStatus = orderStatus;
                param.moneyPackage = $("#moneyPackage").val();
                param.companyAdvanceMoney = $("#companyAdvanceMoney").val();
            });
            dataProxy.updateLendingInfoById(acceptId, 14, param, function (data) {
                successMsg("撤回成交成功", 1000, function () {
                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";

                });
            });
        });
    }

    //放贷信息-垫款凭证
    function upload() {
        var preData = new Array();
        var uploadComp = null;
        var options = {
            width: 670,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '上传凭证',
            onBeforeShow: function () {
                loadingShow();
                $.ajax({
                    url: ctx + "/lendingInfo/toupload.action",
                    type: "post",
                    data: {
                        acceptId: acceptId,
                        type:6
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            for (var i = 0; i < data.rows.length; i++) {
                                var temp = {
                                    "fileGroup": data.rows[i]["fileGroup"],
                                    "filePath": data.rows[i]["filePath"],
                                    "fileName": data.rows[i]["fileName"],
                                    "fileId": i
                                };
                                preData.push(temp);
                            }
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            onAfterShow: function () {
                uploadComp = new HYUpload({
                    fileNumLimit: 1000,
                    auto: true,
                    containerId: '#uploader',
                    uploadImg: true,						//图片上传标记
                    dropTip: '或将图片拖到这里',
                    buttonText: '选择文件',
                    initData: preData.length > 0 ? preData : null,
                    fileSizeLimit: 1048576 * 500,
                    server: ctx + '/fdfs/uploadFile.action',
                    thumbWidth: 150,						//缩略图宽度
                    thumbHeight: 80,
                });
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    file.fileGroup = $(this).data("group");
                    file.filePath = $(this).data("filepath");
                    file.fileName = $(this).data("filename");
                    fileList.push(file);
                });
                if (fileLength < 1) {
                    faildMsg("请选择上传的图片");
                    return flag
                } else if (null != uploadComp && uploadComp.uploader.isInProgress()) {
                    faildMsg("图片正在上传");
                    return flag
                } else {
                    var param = {};
                    param.businessOrderAcceptId = acceptId
                    param.fileType = 6;
                    /*垫款凭证*/
                    param.list = fileList;
                    $.ajax({
                        url: ctx + "/financial/uploadAdvancesFile.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                }
            }
        };
        var upload = new Dialog("#upload-dialog", options);
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "309px"
        };
        upload.show();
    }

    //本金上传凭证
    function principalUpload() {
        var preData = new Array();
        var uploadComp = null;
        var options = {
            width: 670,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '贷款本金上传凭证',
            onBeforeShow: function () {
                loadingShow();
                $.ajax({
                    url: ctx + "/lendingInfo/toupload.action",
                    type: "post",
                    data: {
                        acceptId: acceptId,
                        type:65

                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            for (var i = 0; i < data.rows.length; i++) {
                                var temp = {
                                    "fileGroup": data.rows[i]["fileGroup"],
                                    "filePath": data.rows[i]["filePath"],
                                    "fileName": data.rows[i]["fileName"],
                                    "fileId": i
                                };
                                preData.push(temp);
                            }
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            onAfterShow: function () {
                uploadComp = new HYUpload({
                    fileNumLimit: 1000,
                    auto: true,
                    containerId: '#uploader',
                    uploadImg: true,						//图片上传标记
                    dropTip: '或将图片拖到这里',
                    buttonText: '选择文件',
                    initData: preData.length > 0 ? preData : null,
                    fileSizeLimit: 1048576 * 500,
                    server: ctx + '/fdfs/uploadFile.action',
                    thumbWidth: 150,						//缩略图宽度
                    thumbHeight: 80,
                });
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    file.fileGroup = $(this).data("group");
                    file.filePath = $(this).data("filepath");
                    file.fileName = $(this).data("filename");
                    fileList.push(file);
                });
                if (fileLength < 1) {
                    faildMsg("请选择上传的图片");
                    return flag
                } else if (null != uploadComp && uploadComp.uploader.isInProgress()) {
                    faildMsg("图片正在上传");
                    return flag
                } else {
                    var param = {};
                    param.businessOrderAcceptId = acceptId
                    param.fileType = 65;
                    /*本金垫款凭证*/
                    param.list = fileList;
                    $.ajax({
                        url: ctx + "/financial/uploadAdvancesFile.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                }
            }
        };
        var upload = new Dialog("#upload-dialog", options);
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "309px"
        };
        upload.show();
    }
    //二次打款上传凭证
    function secondUpload() {
        var preData = new Array();
        var uploadComp = null;
        var options = {
            width: 670,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '二次打款上传凭证',
            onBeforeShow: function () {
                loadingShow();
                $.ajax({
                    url: ctx + "/lendingInfo/toupload.action",
                    type: "post",
                    data: {
                        acceptId: acceptId,
                        type:70

                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            for (var i = 0; i < data.rows.length; i++) {
                                var temp = {
                                    "fileGroup": data.rows[i]["fileGroup"],
                                    "filePath": data.rows[i]["filePath"],
                                    "fileName": data.rows[i]["fileName"],
                                    "fileId": i
                                };
                                preData.push(temp);
                            }
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },
            onAfterShow: function () {
                uploadComp = new HYUpload({
                    fileNumLimit: 1000,
                    auto: true,
                    containerId: '#uploader',
                    uploadImg: true,						//图片上传标记
                    dropTip: '或将图片拖到这里',
                    buttonText: '选择文件',
                    initData: preData.length > 0 ? preData : null,
                    fileSizeLimit: 1048576 * 500,
                    server: ctx + '/fdfs/uploadFile.action',
                    thumbWidth: 150,						//缩略图宽度
                    thumbHeight: 80,
                });
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    file.fileGroup = $(this).data("group");
                    file.filePath = $(this).data("filepath");
                    file.fileName = $(this).data("filename");
                    fileList.push(file);
                });
                if (fileLength < 1) {
                    faildMsg("请选择上传的图片");
                    return flag
                } else if (null != uploadComp && uploadComp.uploader.isInProgress()) {
                    faildMsg("图片正在上传");
                    return flag
                } else {
                    var param = {};
                    param.businessOrderAcceptId = acceptId
                    param.fileType = 70;
                    /*本金垫款凭证*/
                    param.list = fileList;
                    $.ajax({
                        url: ctx + "/financial/uploadAdvancesFile.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=playMoney";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                }
            }
        };
        var upload = new Dialog("#upload-dialog", options);
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "309px"
        };
        upload.show();
    }
    //费用审核-支出凭证
    function Expenseupload() {
        var uploadComp = null;
        var preData = new Array();
        var options = {
            width: 670,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '上传凭证',
            onBeforeShow: function () {
                loadingShow();
                $.ajax({
                    url: ctx + "/lendingInfo/upload.action",
                    type: "post",
                    data: {
                        acceptId: acceptId
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            for (var i = 0; i < data.rows.length; i++) {
                                var temp = {
                                    "fileGroup": data.rows[i]["fileGroup"],
                                    "filePath": data.rows[i]["filePath"],
                                    "fileName": data.rows[i]["fileName"],
                                    "fileId": i
                                };
                                preData.push(temp);
                            }
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            },

            onAfterShow: function () {

                uploadComp = new HYUpload({
                    fileNumLimit: 1000,
                    auto: true,
                    containerId: '#uploader',
                    uploadImg: true,						//图片上传标记
                    dropTip: '或将图片拖到这里',
                    buttonText: '选择文件',
                    initData: preData.length > 0 ? preData : null,
                    fileSizeLimit: 1048576 * 500,
                    server: ctx + '/fdfs/uploadFile.action',
                    thumbWidth: 150,						//缩略图宽度
                    thumbHeight: 80,
                });
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    file.fileGroup = $(this).data("group");
                    file.filePath = $(this).data("filepath");
                    file.fileName = $(this).data("filename");
                    fileList.push(file);
                });
                if (fileLength < 1) {
                    faildMsg("请选择上传的图片");
                    return flag
                } else if (null != uploadComp && uploadComp.uploader.isInProgress()) {
                    faildMsg("图片正在上传");
                    return flag
                } else {
                    var param = {};
                    param.businessOrderAcceptId = acceptId
                    param.fileType = 11;
                    /*支出凭证*/
                    param.list = fileList;
                    $.ajax({
                        url: ctx + "/financial/uploadPayFile.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("上传凭证成功！", 1000, function () {
                                    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId + "&active=financialPay";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                }
            }
        };
        var upload = new Dialog("#upload-dialog", options);
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "309px"
        };
        upload.show();
    }

    //暂无数据提示
    function setNoDataTip(id, msg) {
        $(id).html('<div class="no-data">' + (null != msg ? msg : "暂无数据") + '</div>');
    }

    //创建没有图片提示信息
    function createNoFileTip(text) {
        var html = '<div class="item" style="width: 100%;">' +
            '<div class="text text-center" style="height: 100%;line-height: 140px;font-size: 14px;color: #999;">' + (null != text ? text : "暂无附件信息") + '</div>' +
            '</div>';
        return html;
    }

    //创建图片标签
    function createImgTag(imgUrl, type) {
        var extStart = imgUrl.lastIndexOf(".");
        var ext = imgUrl.substring(extStart, imgUrl.length).toUpperCase();
        var html = '<div class="item">';
        html += '<div class="contact-box">';
        html += '<div class="text">';
        if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
            if (ext == ".DOC") {
                html += '<img class="img-responsive" src="' + ctx + "/styles/images/doc.png" + '" alt="">';
            } else if (ext == ".ZIP") {
                html += '<img class="img-responsive" src="' + ctx + "/styles/images/zip.png" + '" alt="">';
            }
        } else {
            html += '<img alt="' + type + '" class="img-responsive pre-img" src="' + imgUrl + '">';
        }
        html += '</div>';
        html += '<div class="row mr-none"><h4 class="text-center">' + type + '</h4></div> ';
        html += '</div>';
        html += '</div>';
        return html;
    }

    //设置选项卡事件
    function setTabEvent() {
        $(".nav-tabs").find("li").on("click", function (e) {
            if ($(this).find("a").attr("href") == "#tab-buyer") {
                getBuyerInfo();
            } else if ($(this).find("a").attr("href") == "#tab-shared") {
                getSharedInfo();
            } else if ($(this).find("a").attr("href") == "#tab-sponsor") {
                getSponsorInfo();
            } else if ($(this).find("a").attr("href") == "#tab-car") {
                getCarInfo();
            } else if ($(this).find("a").attr("href") == "#tab-audit") {
                getAuditInfo();
            } else if ($(this).find("a").attr("href") == "#tab-loan") {
                getLoanInfo();
            } else if ($(this).find("a").attr("href") == "#tab-regist") {
                getRegistInfo();
            } else if ($(this).find("a").attr("href") == "#tab-insurcace") {
                getInsurcaceInfo();
            } else if ($(this).find("a").attr("href") == "#tab-over-due") {
                getOverdueInfo();

            } else if ($(this).find("a").attr("href") == "#tab-insurcace-claim") {
                getInsurcaceClaimInfo();
            } else if ($(this).find("a").attr("href") == "#tab-financial-pay") {
                getFinancialPayInfo();
            } else if ($(this).find("a").attr("href") == "#tab-financial-income") {
                getFinancialIncomeInfo();
            } else if ($(this).find("a").attr("href") == "#tab-file-info") {
                initOrderFile();
            }
        });
        //默认加载第一个tab页卡,否则加载选中页卡
        if ($(".nav-tabs").find("li.active").length <= 0) {
            $(".nav-tabs").find("li:first").addClass("active")
            $(".tab-content").find("div:first").addClass("active");
            $(".nav-tabs").find("li:first").trigger("click");
        } else {
            $(".nav-tabs").find("li.active").trigger("click");
        }
    }	//end 设置选项卡事件

    function setTableCheck(id) {
        //表格列表全选 取消全选
        $(id + ' .checkAll').click(function () {
            if ($(this).prop("checked")) {
                $(this).parents(".table").find('.checkOne').each(function () {
                    $(this).prop("checked", true);
                });
            } else {
                $(this).parents(".table").find('.checkOne').each(function () {
                    $(this).prop("checked", false);
                });
            }
        });

        $(id + ' .checkOne').click(function () {
            var len = $(id + ' .checkOne').length;
            if ($(id + " .checkOne:checked").length < len) {
                $(id + ' .checkAll').prop('checked', false);
            } else {
                $(id + ' .checkAll').prop('checked', true);
            }
        });
        //表格列表行选
        $(id + " td.cel").click(function () {
            var _this = $(this).parent().find(".checkOne");
            if (_this.length > 0 && _this.is(':checked')) {
                _this.prop('checked', false);
            } else if (_this.length > 0) {
                _this.prop('checked', true);
            }
            var len = $(id + ' .checkOne').length;
            if ($(id + ' .checkOne:checked').length < len) {
                $(id + ' .checkAll').prop('checked', false);
            } else if (len != 0) {
                $(id + ' .checkAll').prop('checked', true);
            }
        });
    }

    //设置按钮默认事件
    function setDefaultBtnEvent() {
        //变更信贷专员
        if ($(".change-credit-person-btn").length > 0) {
            $(".change-credit-person-btn").on("click", updateCreditPerson);
        }
        //生成excel合同
        $("#supply-excel-btn").on("click", function () {
            var bankId = $("#audit-detail-car-information-list").find("input[name='bankId']").val();
            confirmDialog("您确定要生成合同？", function () {
                dataProxy.exportExcelFile(acceptId, bankId, ctx + "/cfBusinessOrderAccept/detailDownloadExcel.action");
            });
        });
        
        //
        if($(".query-credit-btn").length > 0){
        	$(".query-credit-btn").on("click", queryCredit);
        }
        
        //车辆信息补录按钮事件
        if ($("#supply-save-btn").length > 0) {			//是否有选择设置控件可否编辑
            $("#supply-save-btn").on("click", function () {
                supplyFormValid.mySubmit(supplyFormValid);
                if (!supplyFormValid.isSubmit) {
                    return;
                }
                var param = {};
                var isSubmit = false;
                $("#audit-detail-car-information-supply").find("input, textarea").each(function (i, n) {
                    var name = $(n).attr("name");
                    if ("" != $.trim($(n).val())) {
                        isSubmit = true;
                        param[name] = $.trim($(n).val());
                    }
                });
                if (!isSubmit) {
                    faildMsg("车辆补录信息不能为空");
                } else {
                    dataProxy.supplyCarInfo(acceptId, param, function (data) {
                        successMsg("车辆信息补录保存成功");
                    });
                }
            });
        }
        
        //卡单信息（保存按钮事件）
        if ($("#save-card-info-btn").length > 0) {
        	
        	//初始化日期控件
        	initDate("preCardSendToBankDate");
        	
            $("#save-card-info-btn").on("click", function () {
                var preCardSendToBankDate = $("#preCardSendToBankDate").val();
                var creditCardApplyNo = $.trim($("#creditCardApplyNo").val());
                /*var insuranceNo = $.trim($("#insuranceNo").val());
                var insuranceCompanyCheckNo = $.trim($("#insuranceCompanyCheckNo").val());*/
                var insuranceNo = "";
                var insuranceCompanyCheckNo = "";
                var cardBak = $.trim($("#cardBak").val());
                if("" == preCardSendToBankDate && "" == creditCardApplyNo  && "" == cardBak) {
                    faildMsg("卡单信息不能为空");
                } else {
                    dataProxy.saveCardInfo(acceptId, preCardSendToBankDate, creditCardApplyNo, insuranceNo,insuranceCompanyCheckNo, cardBak, function (data) {
                        successMsg("卡单信息保存成功");
                    });
                }
            });
        }else{
        	$("#preCardSendToBankDate").attr("readonly","readonly");
        	$("#creditCardApplyNo").attr("readonly","readonly");
        	$("#insuranceNo").attr("readonly","readonly");
        	$("#insuranceCompanyCheckNo").attr("readonly","readonly");
        	$("#cardBak").attr("readonly","readonly");
        	
        	$("#cardPersonName").val("");
        	$("#cardDate").val("");
        }

        
        //GPS信息（保存按钮事件）
        if ($("#gps-save-btn").length > 0) {
            $("#gps-save-btn").on("click", function () {
                var setupDate = $("#setupDate").val();
                var number = $("#gpsNumber").val();
                var descriptoin = $("#gpsDesc").val();
                if ("" == $.trim(setupDate) && "" == $.trim(number) && "" == $.trim(descriptoin)) {
                    faildMsg("GPS安装信息不能为空");
                } else {
                    dataProxy.updateGpsSetup(acceptId, setupDate, $.trim(number), $.trim(descriptoin), function (data) {
                        successMsg("GPS信息保存成功");
                    });
                }
            });
        }

        //退回征信
        if ($(".back-credit-btn").length > 0) {
            $(".back-credit-btn").on("click", showBackCreditWin);
        }
        //作废订单按钮
        if ($(".discard-order-btn").length > 0) {
            $(".discard-order-btn").on("click", discardOrderWin);
        }
        //费用审核
        if ($(".financial-income-confirm-btn").length > 0) {
            $(".financial-income-confirm-btn").on("click", confirmFinancialIncome);
        }
        //费用退回
        if ($(".financial-back-confirm-btn").length > 0) {
            $(".financial-back-confirm-btn").on("click", confirmFinancialBack);
        }
        //应付确认
        if ($(".financial-pay-confirm-btn").length > 0) {
            $(".financial-pay-confirm-btn").on("click", confirmFinancialPay);
        }
        //费用审核_上传凭证
        if ($(".expense_uploader-btn").length > 0) {
            $(".expense_uploader-btn").on("click", Expenseupload);
        }
        //新增理赔信息
        if ($(".add-insuranceClaim-btn").length > 0) {
            $(".add-insuranceClaim-btn").on("click", addInsuranceClaim);
        }
        //删除理赔信息
        if ($(".delete-insuranceClaim-btn").length > 0) {
            $(".delete-insuranceClaim-btn").on("click", deleteInsuranceClaim);
        }
        //刷新理赔信息
        if ($(".fresh-insuranceClaim-btn").length > 0) {
            $(".fresh-insuranceClaim-btn").on("click", freshInsuranceClaim);
        }
        //查看计划
        if ($(".financial-showRepaymentPlan").length > 0) {
            $(".financial-showRepaymentPlan").on("click", showRepaymentPlan);
        }
        //财务收支新增
        if ($(".add-income-btn").length > 0) {
            $(".add-income-btn").on("click", addIncome);
        }
        //财务收支删除
        if ($(".delete-income-btn").length > 0) {
            $(".delete-income-btn").on("click", deleteIncome);
        }
        //卡片信息
        if ($(".financial-carinfo").length > 0) {
            $(".financial-carinfo").on("click", saveCardInfo);
        }
        //票据退件
        if ($(".financial-comebackinfo").length > 0) {
            $(".financial-comebackinfo").on("click", saveBillQuitFile);
        }
        //合同资料
        /* if ($(".financial-contractinfo").length > 0) {
         $(".financial-contractinfo").on("click", saveContractInfo);
         }*/

        //档案信息
       /* if ($(".financial-archivesinfo").length > 0) {
            $(".financial-archivesinfo").on("click", saveArchivesInfo);
        }*/
        //其他信息
        if ($(".financial-otherinfo").length > 0) {
            $(".financial-otherinfo").on("click", savePlayOtherInfo);
        }
        //银行退件
        if ($(".financial-bankbackinfo").length > 0) {
            $(".financial-bankbackinfo").on("click", saveBankQuitFile);
        }
        //结清单提交
        if ($(".financial-accountinfo").length > 0) {
            $(".financial-accountinfo").on("click", saveSettleLoan);
        }
        //打款确认
        if ($(".financial-confirmPlayMoney").length > 0) {
            $(".financial-confirmPlayMoney").on("click", confirmPlayMoney);
        }
        //贷款本金打款确认
        if ($(".financial-confirmPlayPrincipalMoney").length > 0) {
            $(".financial-confirmPlayPrincipalMoney").on("click", confirmPlayPrincipalMoney);
        }
        //放款保存
        if ($(".financial-savePlayMoney").length > 0) {
            $(".financial-savePlayMoney").on("click", savePlayMoney);
        }
        //放款成交
        if ($(".financial-dealPlayMoney").length > 0) {
            $(".financial-dealPlayMoney").on("click", dealPlayMoney);
        }

        //撤回打款
        if ($(".financial-cancelPlayMoney").length > 0) {
            $(".financial-cancelPlayMoney").on("click", cancelPlayMoney);
        }
        //撤回成交
        if ($(".financial-cancelPlayDealing").length > 0) {
            $(".financial-cancelPlayDealing").on("click", cancelPlayDealing);
        }
        //回收确认
        if ($(".financial-comeinPlayMoney").length > 0) {
            $(".financial-comeinPlayMoney").on("click", returnPlayMoney);
        }

        //新增逾期
        if ($(".detail-add-overdue").length > 0) {
            $(".detail-add-overdue").on("click", addOverdueDialog);
        }
        //编辑逾期
        if ($(".detail-edit-overdue").length > 0) {
            $(".detail-edit-overdue").on("click", editOverdueDialog);
        }
        //删除逾期
        if ($(".detail-delete-overdue").length > 0) {
            $(".detail-delete-overdue").on("click", deleteOverdueDialog);
        }

        //新增催缴
        if ($(".detail-add-urge").length > 0) {
            $(".detail-add-urge").on("click", addUrgeDialog);
        }
        //编辑催缴
        if ($(".detail-edit-urge").length > 0) {
            $(".detail-edit-urge").on("click", editUrgeDialog);
        }
        //删除催缴
        if ($(".detail-delete-urge").length > 0) {
            $(".detail-delete-urge").on("click", deleteUrgeDialog);
        }
        //拖车设置
        if ($(".detail-add-trail").length > 0) {
            $(".detail-add-trail").on("click", addTrailDialog);
        }
       //拖车单新增
        if ($(".detail-edit-trail").length > 0) {
            $(".detail-edit-trail").on("click", editTrailDialog);
        }
        //拖车单删除
       if ($(".detail-delete-trail").length > 0) {
            $(".detail-delete-trail").on("click", deleteTrailDialog);
        }
       //拖车单设置
        if ($(".detail-config-trail").length > 0) {
            $(".detail-config-trail").on("click", editTrail);
        }
        //新增诉讼
        if ($(".detail-add-law").length > 0) {
            $(".detail-add-law").on("click", addLaw);
        }
       //编辑诉讼
        if ($(".detail-edit-law").length > 0) {
            $(".detail-edit-law").on("click", editLaw);
        }
        //删除诉讼
       if ($(".detail-delete-law").length > 0) {
            $(".detail-delete-law").on("click", deleteLaw);
        }
        //新增诉讼
        if ($(".detail-add-adv").length > 0) {
            $(".detail-add-adv").on("click", insertAdv);
        }
       //编辑代偿
        if ($(".detail-edit-adv").length > 0) {
            $(".detail-edit-adv").on("click", editAdv);
        }
       //删除代偿
        if ($(".detail-delete-adv").length > 0) {
            $(".detail-delete-adv").on("click", deleteAdv);
        }

    }	//	end setDefaultBtnEvent
    //变更信贷专员
    function updateCreditPerson() {
        var options = {
            width: 400,
            top: 200,
            height: 200,
            overlay: true,
            dispose: true,
            move: true,
            title: '变更信贷专员',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/cfBusinessOrderAccept/queryUserForDepartByOrderId.action",
                    type: "post",
                    dataType: "json",
                    data: {
                        "orderId": acceptId
                    },
                    success: function (data) {
                        var rows = data["rows"];
                        var opt = "<option>请选择</option>";
                        for (var i = 0; i < rows.length; i++) {
                            opt += "<option value='" + rows[i]["id"] + "'>" + rows[i]["realName"] + "</option>";
                        }
                        $("#credit-person").html(opt);
                        $("#credit-person").chosen({
                            disable_search_threshold: 8,
                            no_results_text: "没有找到",
                            allow_single_deselect: true,
                            width: "100%"
                        });
                    }
                });
            },
            callback: function () {
                if ($("#update-credit-person-form").valid("update-credit-person-form")) {
                    var param = {
                        "orderId": acceptId,
                        "salerId": $("#credit-person").val(),
                        "salerName": $("#credit-person").find("option:selected").text()
                    };
                    loadingShow();
                    $.ajax({
                        url: ctx + "/cfBusinessOrderAccept/updateCreditPerson.action",
                        type: "post",
                        data: param,
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                $("input[name='creditPerson']").val(param["salerName"]);
                                successMsg("操作成功！", 1000);
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                                return false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        var updateDlg = new Dialog("#view-update-credit-person-dialog", options);
        updateDlg.show();
    }

    //初始化日期控件
    function initDate(id) {
        $("#" + id).on("click", function () {
            laydate({
                format: 'YYYY-MM-DD', //日期格式
                istime: false, //是否开启时间选择
                isclear: true, //是否显示清空
                max: laydate.now(),
                istoday: false, //是否显示今天
                issure: false, //是否显示确认
                choose: function (datas) {
                    if (datas == '') {
                        change_error_style($("#" + id), "add");
                    } else {
                        change_error_style($("#" + id), "remove");
                    }
                },
                clear: function () {

                }
            });
        });
    }

    //计算车辆费
    function calculateCarRate() {
        var $isSubmit = true;
        var form = $("#carinfoForm").find("form").get(0);
        var input = "select[name='newOrOld'],select[name='cfProductId'],select[name='loanPeriodMonthCode'],input[name='carLicenseProvince'],input[name='auditCarPrice'],input[name='actualLoadMoney'],input[name='customerRate']";
        $(form).find(input).each(function () {
            if (($(this).attr("obj") != undefined && $(this).attr("obj") != '') || ($(this).attr("reg") != undefined && $(this).attr("reg") != '')) {
                if (!validate($(this))) {
                    if ($isSubmit) {
                        $isSubmit = false;
                    }
                } else {
                    return $isSubmit = true;
                }
            } else if ($(this).attr("check") != undefined && $(this).attr("check") != '' && $(this).attr("check") != 'undefined') {
                var checkState = eval($(this).attr("check"));
                if (checkState != "success") {
                    change_error_style($(this), "add");
                    if ($isSubmit) {
                        $isSubmit = false;
                    }
                } else {
                    change_error_style($(this), "remove");
                    return $isSubmit = true;
                }
            }
        });
        if ($isSubmit) {
            var carDealerId = $("#carDealerId").val();//经销商
            var bankId = $('.carinfoForm input[name="bankId"]').val();//贷款银行
            var province = $(".carinfoForm input[name='carLicenseProvince']").val();//上牌地，判断省内还省外
            var auditCarPrice = $(".carinfoForm input[name='auditCarPrice']").val();//审核车价
            var actualLoadMoney = $(".carinfoForm input[name='actualLoadMoney']").val();//实际贷款额
            var customerRate = $(".carinfoForm input[name='customerRate']").val();//客户费率
            var newOrOld = $(".carinfoForm select[name='newOrOld']").val();//是否新车
            var cfProductId = $(".carinfoForm select[name='cfProductId']").val();//产品类型
            var loanPeriodMonthCode = $(".carinfoForm select[name='loanPeriodMonthCode']").val();//年限

            //
            var actualFirstPay = $(".carinfoForm input[name='actualFirstPay']");
            var actualFirstPayRatio = $(".carinfoForm input[name='actualFirstPayRatio']");
            var actualLoanRatio = $(".carinfoForm input[name='actualLoanRatio']");
            var installmentPayMoney = $(".carinfoForm input[name='installmentPayMoney']");
            var installmentPayRatio = $(".carinfoForm input[name='installmentPayRatio']");
            var installmentPayPoundage = $(".carinfoForm input[name='installmentPayPoundage']");
            var bankRate = $(".carinfoForm input[name='bankRate']");
            var contractPrice = $(".carinfoForm input[name='contractPrice']");
            var contractPriceRatio = $(".carinfoForm input[name='contractPriceRatio']");
            var repayMonth = $(".carinfoForm input[name='repayMonth']");
            var firstRepay = $(".carinfoForm input[name='firstRepay']");
            var contractCarPrice = $(".carinfoForm input[name='contractCarPrice']");

            dataProxy.getRateByCarInfo(carDealerId, bankId, province, auditCarPrice, actualLoadMoney, customerRate, newOrOld, cfProductId, loanPeriodMonthCode, true, function (data) {
                actualFirstPay.val(data.actualFirstPay);
                actualFirstPayRatio.val(data.actualFirstPayRatio);
                actualLoanRatio.val(data.actualLoanRatio);
                installmentPayMoney.val(data.installmentPayMoney);
                installmentPayRatio.val(data.installmentPayRatio);
                installmentPayPoundage.val(data.installmentPayPoundage);
                bankRate.val(data.bankRate);
                contractPrice.val(data.contractPrice);
                contractPriceRatio.val(data.contractPriceRatio);
                repayMonth.val(data.repayMonth);
                firstRepay.val(data.firstRepay);
                contractCarPrice.val(data.contractCarPrice);
                if ($("#audit-detail-car-information-list").find("input[name='serviceFee']").length > 0) {
                    $("input[name='serviceFee']").val(data.serviceFee);
                } else {
                    $("#audit-detail-car-information-list").append('<input value="' + data.serviceFee + '" name="serviceFee" class="form-control" type="hidden"/>');
                }
                if ($("#audit-detail-car-information-list").find("input[name='highInterest']").length > 0) {
                    $("input[name='highInterest']").val(data.heightRatio);
                } else {
                    $("#audit-detail-car-information-list").append('<input value="' + data.heightRatio + '" name="highInterest" class="form-control" type="hidden"/>');
                }
                if ($("#audit-detail-car-information-list").find("input[name='channelEnsureMoney']").length > 0) {
                    $("input[name='channelEnsureMoney']").val(data.channelEnsureMoney);
                } else {
                    $("#audit-detail-car-information-list").append('<input value="' + data.channelEnsureMoney + '" name="channelEnsureMoney" class="form-control" type="hidden"/>');
                }
            });
        }
    }

    //新增逾期
    function addOverdueDialog() {
        var creatDlg = null;
        var options = {
            width: 500,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增逾期',
            onAfterShow: function () {
                var sub = 5;		//获取十年内时间段
                var years = new Array();
                var yearOptions = "";
                var currentYear = DateUtil.getYear(new Date());
                var month = DateUtil.getMonth(new Date()) + 1;
                //当年月
                for (var i = month; i > 0; i--) {
                    var value = "";
                    var text = "";
                    if (i < 10) {
                        value = currentYear + "0" + i;
                        text = currentYear + "年0" + i + "月";
                    } else {
                        value = currentYear + "" + i;
                        text = currentYear + "年" + i + "月";
                    }
                    yearOptions += "<option value='" + value + "' >" + text + "</option>";
                }
                for (var i = 0; i < sub; i++) {
                    var year = currentYear - (i + 1);
                    for (var j = 12; j > 0; j--) {
                        var value = "";
                        var text = "";
                        if (j >= 10) {
                            value = year + "" + j;
                            text = year + "年" + j + "月";
                        } else {
                            value = year + "0" + j;
                            text = year + "年0" + j + "月";
                        }
                        yearOptions += "<option value='" + value + "' >" + text + "</option>";
                    }
                }
                $("#detail-overdue-select-month").append(yearOptions);
                $("#detail-overdue-select-month").chosen({
                    disable_search_threshold: 8,
                    no_results_text: "没有找到",
                    allow_single_deselect: true,
                    width: "100%"
                }).on("change", function (evt, params) {
                    if ("" != params["selected"]) {
                        $("#detail-overdue-select-month").parent("div").removeClass("input_validation-failed");
                    }
                });

                //描述信息提示
                $('#detail-overdue-content').keyup(function () {
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength > 1000 ? 1000 : curLength);
                    $(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
                    if (curLength > 1000) {
                        var num = $(this).val().trim().substr(0, 1000);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                if ($("#detail-overdue-form").valid("detail-overdue-form")) {
                    var yearMonth = $("#detail-overdue-select-month").val();
                    var year = yearMonth.substring(0, 4);
                    var month = yearMonth.substring(4, 6);
                    loadingShow();
                    $.ajax({
                        url: ctx + "/overdue/add.action",
                        type: "post",
                        data: {
                            businessOrderAcceptId: acceptId,
                            overdueYear: year,
                            overdueMonth: parseInt(month),
                            overdueMoney: $("#detail-overdue-over-money").val(),
                            overdueBak: $.trim($("#detail-overdue-content").val())
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                creatDlg.hide();
                                successMsg("新增成功！", 1000, function () {
                                    dataProxy.getOverdueDesc(acceptId, "#detail-overdue-desc", function (data) {
                                        $("#detail-overdue-desc").empty().html(UI.createOverdueDescHtml(data));
                                    });
                                    dataProxy.listOverdueByOrderId(acceptId, "#detail-urge-list", function (data) {
                                        $("#detail-overdue-list").empty().html(UI.createOverdueListHtml(data));
                                        setTableCheck("#detail-overdue-list");
                                    });
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });

                }
                return false;
            }
        };
        creatDlg = new Dialog("#detail-overdue-dialog", options);
        creatDlg.show();
    }

    //新增催缴记录
    function addUrgeDialog() {
        var options = {
            width: 500,
            top: 200,
            height: 440,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增催缴作业',
            onAfterShow: function () {
                laydate({
                    elem: '#urge-date',
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    max: laydate.now(),
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: true, //是否显示确认
                    choose: function (datas) {
                        if (datas == '') {
                            change_error_style($("#urge-date"), "add");
                        } else {
                            change_error_style($("#urge-date"), "remove");
                        }
                    }
                });
                //下拉框初始化
                var config = {
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "100%"
                };
                //下拉框
                $(".urgeMethod").chosen(config);
                $(".urgeStatus").chosen(config);
                $(".isTrailer").chosen(config);
                $(".urgeMethod").add(".urgeStatus").add(".isTelException").on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($(this).parent(), "remove");
                    } else {
                        change_error_style($(this).parent(), "add");
                    }
                });
                //描述信息提示
                $('#urge-content').keyup(function () {
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength > 1000 ? 1000 : curLength);
                    $(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
                    if (curLength > 1000) {
                        var num = $(this).val().trim().substr(0, 1000);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#urge-work-form").valid("urge-work-form")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/urgeWork/insertUrgeWork.action",
                        type: "post",
                        data: {
                            orderId: acceptId,
                            urgeDate: $("#urge-date").val(),
                            urgeMethod: $("#urge-method").val(),
                            urgeStatus: $("#urge-status").val(),
                            isTelException: $("#is-tel-exception").val(),
                            urgeContent: $.trim($("#urge-content").val())
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("新增成功！", 1000, function () {
                                    dataProxy.listUrgeDetailByOrderId(acceptId, "#detail-urge-list", function (data) {
                                        $("#detail-urge-list").empty().html(UI.createUrgeListHtml(data));
                                        setTableCheck("#detail-urge-list");
                                    });
                                    getButtonShow();
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#detail-urge-dialog", options);
        creatDlg.show();
    }

    //编辑逾期记录
    function editOverdueDialog(_this) {
        var ck = $("#detail-overdue-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要编辑的记录。");
            return
        } else if (ck.length > 1) {
            alertDialog("请选择一条记录。");
            return
        } else {
            var editDlg = null;
            var id = $(ck[0]).val();
            var yearMonth = $("#" + id + "_overdue_year_month").attr("data");
            var overdueamount = $("#" + id + "_overdue_amount").attr("data");
            var overdueContent = $("#" + id + "_overdue_content").attr("data");
            var options = {
                width: 500,
                top: 200,
                height: 410,
                overlay: true,
                dispose: true,
                move: true,
                title: '编辑逾期记录',
                onAfterShow: function () {
                },
                onBeforeShow: function () {
                    var sub = 5;		//获取十年内时间段
                    var years = new Array();
                    var yearOptions = "";
                    var currentYear = DateUtil.getYear(new Date());
                    var month = DateUtil.getMonth(new Date()) + 1;
                    //当年月
                    for (var i = month; i > 0; i--) {
                        var value = "";
                        var text = "";
                        if (i < 10) {
                            value = currentYear + "0" + i;
                            text = currentYear + "年0" + i + "月";
                        } else {
                            value = currentYear + "" + i;
                            text = currentYear + "年" + i + "月";
                        }
                        yearOptions += "<option value='" + value + "' >" + text + "</option>";
                    }
                    for (var i = 0; i < sub; i++) {
                        var year = currentYear - (i + 1);
                        for (var j = 12; j > 0; j--) {
                            var value = "";
                            var text = "";
                            if (j >= 10) {
                                value = year + "" + j;
                                text = year + "年" + j + "月";
                            } else {
                                value = year + "0" + j;
                                text = year + "年0" + j + "月";
                            }
                            yearOptions += "<option value='" + value + "' >" + text + "</option>";
                        }
                    }
                    $("#detail-overdue-select-month").append(yearOptions);

                    $("#overdue-id").val(id);
                    $("#detail-overdue-select-month").val(yearMonth);
                    $("#detail-overdue-over-money").val(overdueamount);
                    $("#detail-overdue-content").val(overdueContent);

                    $("#detail-overdue-select-month").chosen({
                        disable_search_threshold: 8,
                        no_results_text: "没有找到",
                        allow_single_deselect: true,
                        width: "100%"
                    }).on("change", function (evt, params) {
                        if ("" != params["selected"]) {
                            $("#detail-overdue-select-month").parent("div").removeClass("input_validation-failed");
                        }
                    });

                    //描述信息提示
                    $('#detail-overdue-content').keyup(function () {
                        var curLength = $(this).val().trim().length;
                        $(this).next("span").find(".input").html(curLength > 1000 ? 1000 : curLength);
                        $(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
                        if (curLength > 1000) {
                            var num = $(this).val().trim().substr(0, 1000);
                            $(this).val(num);
                        }
                    });
                },
                callback: function () {
                    var flag = false;
                    if ($("#detail-overdue-form").valid("detail-overdue-form")) {
                        loadingShow();
                        var yMonth = $("#detail-overdue-select-month").val();
                        var year = yMonth.substring(0, 4);
                        var month = yMonth.substring(4, 6);
                        $.ajax({
                            url: ctx + "/overdue/update.action",
                            type: "post",
                            data: {
                                id: $("#overdue-id").val(),
                                businessOrderAcceptId: acceptId,
                                overdueYear: year,
                                overdueMonth: parseInt(month),
                                overdueMoney: $("#detail-overdue-over-money").val(),
                                overdueBak: $.trim($("#detail-overdue-content").val())
                            },
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    editDlg.hide();
                                    successMsg("编辑成功！", 1000, function () {
                                        dataProxy.getOverdueDesc(acceptId, "#detail-overdue-desc", function (data) {
                                            $("#detail-overdue-desc").empty().html(UI.createOverdueDescHtml(data));
                                        });
                                        dataProxy.listOverdueByOrderId(acceptId, "#detail-urge-list", function (data) {
                                            $("#detail-overdue-list").empty().html(UI.createOverdueListHtml(data));
                                            setTableCheck("#detail-overdue-list");
                                        });
                                    });
                                } else if (data.error == -100) {
                                    faildMsg("会话超时，请重新登陆！");
                                } else {
                                    faildMsg(data.message);
                                }
                            }
                        });
                        return false;
                    } else {
                        return false;
                    }
                }
            };
            editDlg = new Dialog("#detail-overdue-dialog", options);
            editDlg.show();
        }
    }

    //编辑催缴记录
    function editUrgeDialog(_this) {
        var ck = $("#detail-urge-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要编辑的记录。");
            return
        } else if (ck.length > 1) {
            alertDialog("请选择一条记录。");
            return
        } else {
            var id = $(ck[0]).val();
            var urgeStatus = $("#" + id + "_urge_status").attr("data");
            var urgeDate = $("#" + id + "_urge_date").attr("data");
            var urgeContent = $("#" + id + "_urge_content").attr("data");
            var urgeMethod = $("#" + id + "_urge_method").attr("data");
            var isException = $("#" + id + "_tel_exception").attr("data");
            var options = {
                width: 500,
                top: 200,
                height: 440,
                overlay: true,
                dispose: true,
                move: true,
                title: '编辑催缴作业',
                onAfterShow: function () {
                    laydate({
                        elem: '#urge-date',
                        format: 'YYYY-MM-DD', //日期格式
                        istime: false, //是否开启时间选择
                        max: laydate.now(),
                        isclear: true, //是否显示清空
                        istoday: false, //是否显示今天
                        issure: true, //是否显示确认
                        choose: function (datas) {
                            if (datas == '') {
                                change_error_style($("#urge-date"), "add");
                            } else {
                                change_error_style($("#urge-date"), "remove");
                            }
                        }
                    });
                },
                onBeforeShow: function () {
                    $("#urge-id").val(id);
                    $("#urge-date").val(urgeDate.substring(0, 11));
                    $("#urge-status").val(urgeStatus);
                    $("#urge-method").val(urgeMethod);
                    $("#is-tel-exception").val(isException);
                    $("#urge-content").val(urgeContent);
                    //下拉框初始化
                    var config = {
                        disable_search_threshold: 10,
                        no_results_text: '无数据',
                        width: "100%"
                    };
                    //下拉框
                    $(".urgeMethod").chosen(config);
                    $(".urgeStatus").chosen(config);
                    $(".isTrailer").chosen(config);
                    $(".urgeMethod").add(".urgeStatus").add(".isTelException").on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($(this).parent(), "remove");
                        } else {
                            change_error_style($(this).parent(), "add");
                        }
                    });
                    //描述信息提示
                    $('#urge-content').keyup(function () {
                        var curLength = $(this).val().trim().length;
                        $(this).next("span").find(".input").html(curLength > 1000 ? 1000 : curLength);
                        $(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
                        if (curLength > 1000) {
                            var num = $(this).val().trim().substr(0, 1000);
                            $(this).val(num);
                        }
                    });
                },
                callback: function () {
                    var flag = false;
                    if ($("#urge-work-form").valid("urge-work-form")) {
                        loadingShow();
                        $.ajax({
                            url: ctx + "/urgeWork/updatetUrgeWork.action",
                            type: "post",
                            data: {
                                id: $("#urge-id").val(),
                                orderId: acceptId,
                                urgeDate: $("#urge-date").val(),
                                urgeMethod: $("#urge-method").val(),
                                urgeStatus: $("#urge-status").val(),
                                isTelException: $("#is-tel-exception").val(),
                                urgeContent: $.trim($("#urge-content").val())
                            },
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("更新成功！", 1000, function () {
                                        dataProxy.listUrgeDetailByOrderId(acceptId, "#detail-urge-list", function (data) {
                                            $("#detail-urge-list").empty().html(UI.createUrgeListHtml(data));
                                            setTableCheck("#detail-urge-list");
                                        });
                                        getButtonShow();
                                    });
                                } else if (data.error == -100) {
                                    faildMsg("会话超时，请重新登陆！");
                                } else {
                                    faildMsg(data.message);
                                }
                            }
                        });
                    } else {
                        return false;
                    }
                }
            };
            var editDlg = new Dialog("#detail-urge-dialog", options);
            editDlg.show();
        }
    }

    //删除逾期
    function deleteOverdueDialog() {
        var ck = $("#detail-overdue-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的逾期记录。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的逾期记录？", function () {
                loadingShow();
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/overdue/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("删除成功！", 600, function () {
                                dataProxy.listOverdueByOrderId(acceptId, "#detail-overdue-list", function (data) {
                                    $("#detail-overdue-list").empty().html(UI.createOverdueListHtml(data));
                                    setTableCheck("#detail-urge-list");
                                });
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            });
        }
    }

    function deleteUrgeDialog() {
        var ck = $("#detail-urge-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的催缴记录。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的催缴记录？", function () {
                loadingShow();
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/urgeWork/deleteUrgeWork.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("删除成功！", 600, function () {
                                dataProxy.listUrgeDetailByOrderId(acceptId, "#detail-urge-list", function (data) {
                                    $("#detail-urge-list").empty().html(UI.createUrgeListHtml(data));
                                    setTableCheck("#detail-urge-list");
                                });
                                getButtonShow();
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            });
        }
    }

    $("img").each(function () {
        $(this).bind("error", function () {
            this.src = ctx + "/styles/images/errPic.png";
        });
    });
   //开拖车单
    function addTrailDialog() {
        var options = {
            width: 500,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '开拖车单',
            onAfterShow: function () {
                laydate({
                    elem: '#dispatchDate',
                    format: 'YYYY-MM-DD', //日期格式
                    istime: true, //是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: true, //是否显示确认
                    choose: function (datas) {
                        if (datas == '') {
                            change_error_style($("#dispatchDate"), "add");
                        } else {
                            change_error_style($("#dispatchDate"), "remove");
                        }
                    }
                });
                //下拉框初始化
                //加载拖车单位
                initTrailCarCompany();

                //描述信息提示
                $('#trailExecute-content').keyup(function () {
                    var curLength = $(this).val().trim().length;
                    $(this).next("span").find(".input").html(curLength > 1000 ? 1000 : curLength);
                    $(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
                    if (curLength > 1000) {
                        var num = $(this).val().trim().substr(0, 1000);
                        $(this).val(num);
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#trailExecuteForm").valid("trailExecuteForm")) {
                    loadingShow();
                    var param = {};
                    param.businessOrderAcceptId = acceptId;
                    param.dispatchDate = $("#dispatchDate").val();
                    param.trailCarCompanyId = $("#trailCarCompanyId").val();
                    param.trailCarBak = $.trim($("#trailExecute-content").val());
                    $.ajax({
                        url: ctx + "/cfTrail/create.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("新增成功！", 1000, function () {
                                    dataProxy.listTrailCarExecuteByOrderId(acceptId, "#detail-car-trailExecute-list", function (data) {
                                            $("#detail-car-trailExecute-list").empty().html(UI.createTrailCarExecuteListHtml(data));
                                        setTableCheck("#detail-car-trailExecute-list");
                                    });
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#detail-trailExecute-dialog", options);
        creatDlg.show();
    }
    //编辑拖车单
    function editTrailDialog() {
        var ck = $("#detail-car-trailExecute-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要编辑的记录。");
            return
        } else if (ck.length > 1) {
            alertDialog("请选择一条记录。");
            return
        } else {
            var id = $(ck[0]).val();
            var dispatchDate = $("#" + id + "dispatchDateStr").attr("data");
            var trailCarCompanyId = $("#"+id+"trailCarCompanyId").attr("data");
            var trailCarDispatchBak = $("#"+id+"trailCarDispatchBak").attr("data");
            var options = {
                width: 500,
                top: 200,
                height: 440,
                overlay: true,
                dispose: true,
                move: true,
                title: '编辑拖车单',
                onAfterShow: function () {
                    laydate({
                        elem: '#dispatchDate',
                        format: 'YYYY-MM-DD', //日期格式
                        istime: false, //是否开启时间选择
                        isclear: true, //是否显示清空
                        istoday: false, //是否显示今天
                        issure: true, //是否显示确认
                        choose: function (datas) {
                            if (datas == '') {
                                change_error_style($("#dispatchDate"), "add");
                            } else {
                                change_error_style($("#dispatchDate"), "remove");
                            }
                        }
                    });
                },
                onBeforeShow: function () {
                    $("#id").val(id);
                    $("#dispatchDate").val(dispatchDate);
                    $("#trailExecute-content").val(trailCarDispatchBak);
                    initTrailCarCompany(trailCarCompanyId);
                    //描述信息提示
                    $('#trailExecute-content').keyup(function () {
                        var curLength = $(this).val().trim().length;
                        $(this).next("span").find(".input").html(curLength > 1000 ? 1000 : curLength);
                        $(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
                        if (curLength > 1000) {
                            var num = $(this).val().trim().substr(0, 1000);
                            $(this).val(num);
                        }
                    });
                },
                callback: function () {
                    var flag = false;
                    if ($("#trailExecuteForm").valid("trailExecuteForm")) {
                        loadingShow();
                        var param = {};
                        param.id =id;
                        param.dispatchDate = $("#dispatchDate").val();
                        param.trailCarCompanyId = $("#trailCarCompanyId").val();
                        param.trailCarBak = $("#trailExecute-content").val();
                        $.ajax({
                            url: ctx + "/cfTrail/update.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("更新成功！", 1000, function () {
                                        dataProxy.listTrailCarExecuteByOrderId(acceptId, "#detail-car-trailExecute-list", function (data) {
                                            $("#detail-car-trailExecute-list").empty().html(UI.createTrailCarExecuteListHtml(data));
                                            setTableCheck("#detail-car-trailExecute-list");
                                        });
                                    });
                                } else if (data.error == -100) {
                                    faildMsg("会话超时，请重新登陆！");
                                } else {
                                    faildMsg(data.message);
                                }
                            }
                        });
                    } else {
                        return false;
                    }
                }
            };
            var editDlg = new Dialog("#detail-trailExecute-dialog", options);
            editDlg.show();
        }
    }

    function deleteTrailDialog() {
        var ck = $("#detail-car-trailExecute-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的拖车单记录？", function () {
                loadingShow();
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/cfTrail/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("删除成功！", 1000, function () {
                                dataProxy.listTrailCarExecuteByOrderId(acceptId, "#detail-car-trailExecute-list", function (data) {
                                    $("#detail-car-trailExecute-list").empty().html(UI.createTrailCarExecuteListHtml(data));
                                    setTableCheck("#detail-car-trailExecute-list");
                                });
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            });
        }
    }

    function initTrailCarCompany(trailCarCompanyId) {
        //加载拖车单位
        $.ajax({
            url: ctx + '/cfTrail/findTrailCarCompany.action',
            type: 'post',
            dataType: "json",
            success: function (data) {
                $("#trailCarCompanyId").empty();
                var option = "";
                if (data.error == 1) {
                    option += "<option value=''>请选择拖车单位</option>";
                    for (var i = 0; i < data.rows.length; i++) {
                        option += "<option value=" + data.rows[i].id + ">" + data.rows[i].name + '</option>'
                    }
                    $("#trailCarCompanyId").append(option);
                    var config = {
                        disable_search_threshold: 10,
                        no_results_text: '无数据',
                        width: "100%"
                    };
                    //下拉框

                    $("#trailCarCompanyId").chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($(this).parent(), "remove");
                        } else {
                            change_error_style($(this).parent(), "add");
                        }
                    });
                    if(trailCarCompanyId!=null && trailCarCompanyId!=''){
                        $("#trailCarCompanyId").val(trailCarCompanyId).trigger("chosen:updated");
                    }
                    /*new initSelect("trailCarCompanyId");
                    function initSelect(id) {
                        $("#" + id).chosen({
                            disable_search_threshold: 10,
                            no_results_text: '无数据',
                            width: "100%"
                        }).trigger("chosen:updated");
                    }*/

                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function initTrailStustCompany(trailCarCompanyId) {
        //加载拖车单位
        $.ajax({
            url: ctx + '/cfTrail/findTrailCarCompany.action',
            type: 'post',
            dataType: "json",
            success: function (data) {
                $("#trailCarCompanyId").empty();
                var option = "";
                if (data.error == 1) {
                    option += "<option value=''>请选择拖车单位</option>";
                    for (var i = 0; i < data.rows.length; i++) {
                        option += "<option value=" + data.rows[i].id + ">" + data.rows[i].name + '</option>'
                    }
                    $("#trailCarCompanyId").append(option);
                    var config = {
                        disable_search_threshold: 10,
                        no_results_text: '无数据',
                        width: "100%"
                    };
                    //下拉框

                    $("#trailCarCompanyId").chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($(this).parent(), "remove");
                        } else {
                            change_error_style($(this).parent(), "add");
                        }
                    });
                    if(trailCarCompanyId!=null && trailCarCompanyId!=''){
                        $("#trailCarCompanyId").val(trailCarCompanyId).trigger("chosen:updated");
                    }
                    /*new initSelect("trailCarCompanyId");
                     function initSelect(id) {
                     $("#" + id).chosen({
                     disable_search_threshold: 10,
                     no_results_text: '无数据',
                     width: "100%"
                     }).trigger("chosen:updated");
                     }*/

                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

//拖车单设置
 function editTrail() {
        var html='';
        var carStopPlaceVal='';
        var trailSuccessDateVal='';
     var id =getTrail();
     var  flag =true;
            var options = {
                width: 500,
                top: 200,
                height: 265,
                overlay: true,
                dispose: true,
                move: true,
                title: '编辑',
                onBeforeShow: function () {
                    $("#trail-userName").val(buyerName);
                    if(id!=null && id!=undefined && id!=""){
                        flag=false;
                    $.ajax({
                        url: ctx + "/cfTrail/getById.action",
                        type: "post",
                        data: {
                            id: id
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                var trail = data.rows;
                                if(trail!=null){
                                $("#trailCarStatus").val(trail.trailCarStatus).trigger('chosen:updated');
                                carStopPlaceVal = trail.carStopPlace;
                                trailSuccessDateVal = trail.strTrailSuccessDate;
                                if (trail.trailCarStatus=="1"){
                                    html='<div class="form-group" id="carStopPlace-hidden" >'+
                                        '<label class="col-xs-3 control-label"><span class="red">*</span>停放位置：</label>'+
                                        '<div class="col-xs-8">'+
                                        '<input type="text" class="form-control" id="carStopPlace" value="'+carStopPlaceVal+'" check="bankForm(this)">'+
                                        '</div>'+
                                        '</div>'+
                                        '<div class="form-group" id="trailSuccessDate-hidden" >'+
                                        '<label class="col-xs-3 control-label"><span class="red">*</span>拖车时间：</label>'+
                                        '<div class="col-xs-8" obj=""  is_tip_null="yes">'+
                                        '<input type="text" class="form-control"  value="'+trailSuccessDateVal+'"  name="validDate"check="bankForm(this)" id="trailSuccessDate" tip="日期不能为空">'+
                                        '</div>'+
                                        '</div>';
                                    $(html).insertAfter($(".type"));
                                    $(".dialog-container").height(365);
                                    $("#trailSuccessDate").on("click",function () {
                                        laydate({
                                            format: 'YYYY-MM-DD ', //日期格式
                                            istime: false, //是否开启时间选择
                                            isclear: true, //是否显示清空
                                            istoday: false, //是否显示今天
                                            issure: false, //是否显示确认
                                            choose: function (datas) {
                                                if ("" != datas) {
                                                    change_error_style($("#trailSuccessDate"), "remove");
                                                } else {
                                                    change_error_style($("#trailSuccessDate"), "add");
                                                }
                                            },
                                            clear: function () {

                                            }
                                        });
                                    })
                                }
                                }else{
                                    $(".dialog-container").height(265);
                                }
                                $("#trailRemark").val(trail.remark);
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        },
                        error: function (data) {

                        }
                    });
                    }
                },
                onAfterShow: function () {
                    var config = {
                        disable_search_threshold:10,
                        no_results_text: '无数据',
                        width:"100%"
                    };
                    //下拉框
                    $("#trailCarStatus").chosen(config).on('change', function(e, selected) {
                        if("" != selected){
                            $("#vtip").hide()
                            change_error_style($("#trailCarStatus").parent(),"remove");
                            if(selected.selected==="1"){
                                html='<div class="form-group" id="carStopPlace-hidden" >'+
                                    '<label class="col-xs-3 control-label"><span class="red">*</span>停放位置：</label>'+
                                    '<div class="col-xs-8">'+
                                    '<input type="text" class="form-control" id="carStopPlace" value="'+carStopPlaceVal+'" check="bankForm(this)">'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="form-group" id="trailSuccessDate-hidden" >'+
                                    '<label class="col-xs-3 control-label"><span class="red">*</span>拖车时间：</label>'+
                                    '<div class="col-xs-8" obj=""  is_tip_null="yes">'+
                                    '<input type="text" class="form-control"  value="'+trailSuccessDateVal+'"  name="validDate"check="bankForm(this)" id="trailSuccessDate" tip="日期不能为空">'+
                                    '</div>'+
                                    '</div>';
                                $(html).insertAfter($(".type"));
                                $(".dialog-container").height(365);
                                $("#trailSuccessDate").on("click",function () {
                                    laydate({
                                        format: 'YYYY-MM-DD ', //日期格式
                                        istime: false, //是否开启时间选择
                                        isclear: true, //是否显示清空
                                        istoday: false, //是否显示今天
                                        issure: false, //是否显示确认
                                        choose: function (datas) {
                                            if ("" != datas) {
                                                change_error_style($("#trailSuccessDate"), "remove");
                                            } else {
                                                change_error_style($("#trailSuccessDate"), "add");
                                            }
                                        },
                                        clear: function () {

                                        }
                                    });
                                })
                            }else{
                                $("#carStopPlace-hidden, #trailSuccessDate-hidden").remove();
                                $(".dialog-container").height(265);
                            }
                        }else{
                            change_error_style($("#trailCarStatus").parent(), "add");
                        }
                    });
                    $("body").click(function(){
                        try {
                            laydate.getDefault().close();
                        } catch (e) {

                        }
                    });
                },
                onAfterHide: function () {
                    $(".laydate_box").hide()
                },
                callback: function () {
                    var param = {};
                    param.id = id;

                    param.trailCarStatus = $("#trailCarStatus").val();
                    param.carStopPlace = $("#carStopPlace").val();
                    param.trailSuccessDate = $("#trailSuccessDate").val();
                    param.remark = $("#trailRemark").val();
                    param.businessOrderAcceptId = acceptId;
                    if ($("#trailForm").valid("trailForm")) {
                        loadingShow();
                        $.ajax({
                            url: flag? ctx + "/cfTrail/createTrailCar.action" :ctx + "/cfTrail/updateTrailCar.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        //逾期情况
                                        dataProxy.getOverdueDesc(acceptId, "#detail-overdue-desc", function (data) {
                                            $("#detail-overdue-desc").empty().html(UI.createOverdueDescHtml(data));
                                        });
                                    });
                                } else if (data.error == -100) {
                                    faildMsg("会话超时，请重新登陆！");
                                } else {
                                    faildMsg(data.message);
                                }
                            }
                        });
                    } else {
                        return false;
                    }
                }
            };
            var editAdvDlg = new Dialog("#trail-dialog", options);
            editAdvDlg.show();
        }



    function addLaw() {
        var url = ctx + "/cfLaw/lawAdd.action?acceptId=" + acceptId;
        openTabForParent(url, "-law-add-" + acceptId, "订单详情-"+buyerName);
    }
    function editLaw() {
        var ck = $("#detail-law-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要编辑的记录。");
            return
        } else if (ck.length > 1) {
            alertDialog("请选择一条记录。");
            return
        }
        var id = $(ck[0]).val();
        var url = ctx + "/cfLaw/toEdit.action?id=" + id;
        openTabForParent(url, "-law-toEdit-" + acceptId, "订单详情-"+buyerName);
    }

    function deleteLaw() {
        var ck = $("#detail-law-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的诉讼记录？", function () {
                loadingShow();
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/cfLaw/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("删除成功！", 1000, function () {
                                dataProxy.listLawDetailByOrderId(acceptId, "#detail-law-list", function (data) {
                                    $("#detail-law-list").empty().html(UI.createLawListHtml(data));
                                    setTableCheck("#detail-law-list");
                                });
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            });
        }
    }
    function insertAdv(name,cardNo,bankId){
        var config = {
            disable_search_threshold:10,
            no_results_text: '无数据',
            width:"100%"
        };
        var type ="";
        var options = {
            width: 650,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onBeforeShow: function(){
                type=    setType('#initCarInfo',options);
            },
            onAfterShow: function () {
                if(type=="2"){
                    $("#dutyInfo").hide();
                    $(".dialog-container").height(330);
                }else{
                    $(".dialog-container").height(380);
                    $(".calculate").on("click",function(){
                        var money=$("#money").val();
                        var duty=$("#duty").val();
                        if(null==money || null==duty ||undefined==money || undefined==duty || ''==money || ''==duty){
                            faildMsg("责任比例为空，无法计算");
                            return false;
                        }
                        var bondMoney=money*duty/100;
                        $("#bondMoney").val(bondMoney);
                    });
                }
                laydate( {
                    elem: '#advancedDate',
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    max:laydate.now(),
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if  (datas =='') {
                            change_error_style($("#advancedDate"), "add");
                        } else {
                            change_error_style($("#advancedDate"), "remove");
                        }
                    }
                });
                $("#inOrOut").chosen(config).on("change",function(e, param){
                    if("" != param.selected){
                        change_error_style($("#inOrOut").parent(),"remove");
                        if(param.selected == "1"){
                            showRource(config,"#source",['渠道','客户','公司']);
                        }else {
                            showRource(config,"#source",['一般账户','保证金账户']);
                        }
                    }else{
                        $("#source").empty().removeAttr("obj").append("<input type='text' obj='' class='form-control' name='source-0' readonly id='source-0'/>")
                    }
                });
                $(".accountType").chosen(config).on('change', function(e, param) {
                    if("" != param.selected){
                        change_error_style($(".accountType").parent(),"remove");
                    }else{
                        change_error_style($(".accountType").parent(),"add");
                    }
                });
                $("#sourceSelect").chosen(config).on('change', function(e, param) {
                    if("" != param.selected){
                        change_error_style($("#sourceSelect").parent(),"remove");
                    }else{
                        change_error_style($("#sourceSelect").parent(),"add");
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#advancedIncomeForm").valid("advancedIncomeForm")) {
                    if(!$("#bondMoney").val() && type==1){
                        faildMsg("代偿保证金不允许为空");
                        return false;
                    }
                    $.ajax({
                        url: ctx + "/urgeWork/insert.action",
                        type: "post",
                        data: {
                            inOrOut:$("#inOrOut").val(),
                            source:$("#sourceSelect").val(),
                            accountType:$("#accountType").val(),
                            money:$("#money").val(),
                            advancedDate:$("#advancedDate").val(),
                            advancedBak:$("#advancedBak").val(),
                            bondMoney:$("#bondMoney").val(),
                            businessOrderAcceptId:acceptId,
                            customerName:buyerName
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    dataProxy.getOrderAdvancedIncome(acceptId, "#detail-adv-list", function (data) {
                                        $("#detail-adv-list").empty().html(UI.createAdvListHtml(data));
                                        setTableCheck("#detail-adv-list");
                                    });
                                    getButtonShow();
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        var creatDlg_1 = new Dialog("#advancedIncome-dialog", options);
        creatDlg_1.show();
    }
    function editAdv(name,cardNo,bankId){
        var ck = $("#detail-adv-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要编辑的记录。");
            return
        } else if (ck.length > 1) {
            alertDialog("请选择一条记录。");
            return
        }

        var config = {
            disable_search_threshold:10,
            no_results_text: '无数据',
            width:"100%"
        };
        var id = $(ck[0]).val();
        var type ="";
        var inOrOut = $("#"+id+"inOrOut").attr("data");
        var source = $("#"+id+"source").attr("data");
        var money = $("#"+id+"money").attr("data");
        var bondMoney = $("#"+id+"bondMoney").attr("data");
        var accountType = $("#"+id+"accountType").attr("data");
        var advancedBak = $("#"+id+"advancedBak").attr("data");
        var advancedDateStr = $("#"+id+"advancedDate").attr("data");
        var options = {
            width: 650,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onBeforeShow: function(){
                type=   setType('#initCarInfo',options);
                var inOrOut = $("#"+id+"inOrOut").attr("data");
                var source = $("#"+id+"source").attr("data");
                var money = $("#"+id+"money").attr("data");
                var bondMoney = $("#"+id+"bondMoney").attr("data");
                var accountType = $("#"+id+"accountType").attr("data");
                    $("#inOrOut").val(inOrOut).trigger("chosen:updated")
                if(inOrOut == "1"){
                    showRource(config,"#source",['渠道','客户','公司']);
                }else {
                    showRource(config,"#source",['一般账户','保证金账户']);
                }
                   $("#sourceSelect").val(source).trigger("chosen:updated")
                   $("#accountType").val(accountType).trigger("chosen:updated")
                    $("#money").val(money)
                    $("#advancedDate").val(advancedDateStr)
                   $("#advancedBak").val(advancedBak)
                    $("#bondMoney").val(bondMoney)
            },
            onAfterShow: function () {
                if(type==2){
                    $("#dutyInfo").hide();
                    $(".dialog-container").height(330);
                }else{

                    $(".dialog-container").height(380);
                    $(".calculate").on("click",function(){
                        var money=$("#money").val();
                        var duty=$("#duty").val();
                        if(null==money || null==duty ||undefined==money || undefined==duty || ''==money || ''==duty){
                            faildMsg("责任比例为空，无法计算");
                            return false;
                        }
                        var bondMoney=money*duty/100;
                        $("#bondMoney").val(bondMoney);
                    });
                }
                laydate( {
                    elem: '#advancedDate',
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    max:laydate.now(),
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if  (datas =='') {
                            change_error_style($("#advancedDate"), "add");
                        } else {
                            change_error_style($("#advancedDate"), "remove");
                        }
                    }
                });
                $("#inOrOut").chosen(config).on("change",function(e, param){
                    if("" != param.selected){
                        change_error_style($("#inOrOut").parent(),"remove");
                        if(param.selected == "1"){
                            showRource(config,"#source",['渠道','客户','公司']);
                        }else {
                            showRource(config,"#source",['一般账户','保证金账户']);
                        }
                    }else{
                        $("#source").empty().removeAttr("obj").append("<input type='text' obj='' class='form-control' name='source-0' readonly id='source-0'/>")
                    }
                });
                $(".accountType").chosen(config).on('change', function(e, param) {
                    if("" != param.selected){
                        change_error_style($(".accountType").parent(),"remove");
                    }else{
                        change_error_style($(".accountType").parent(),"add");
                    }
                });
                $("#sourceSelect").chosen(config).on('change', function(e, param) {
                    if("" != param.selected){
                        change_error_style($("#sourceSelect").parent(),"remove");
                    }else{
                        change_error_style($("#sourceSelect").parent(),"add");
                    }
                });
            },

            callback: function () {
                var flag = false;
                if ($("#advancedIncomeForm").valid("advancedIncomeForm")) {
                    if(!$("#bondMoney").val() && type==1){
                        faildMsg("代偿保证金不允许为空");
                        return false;
                    }
                    $.ajax({
                        url: ctx +"/urgeWork/update.action",
                        type: "post",
                        data: {
                            id: id,
                            inOrOut:$("#inOrOut").val(),
                            source:$("#sourceSelect").val(),
                            accountType:$("#accountType").val(),
                            money:$("#money").val(),
                            advancedDate:$("#advancedDate").val(),
                            advancedBak:$("#advancedBak").val(),
                            bondMoney:$("#bondMoney").val() == "null" ? 0 :$("#bondMoney").val(),
                            businessOrderAcceptId:acceptId
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    dataProxy.getOrderAdvancedIncome(acceptId, "#detail-adv-list", function (data) {
                                        $("#detail-adv-list").empty().html(UI.createAdvListHtml(data));
                                        setTableCheck("#detail-adv-list");
                                });
                                    getButtonShow();
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        var editDlg_1 = new Dialog("#advancedIncome-dialog", options);
        editDlg_1.show();
    }
    function deleteAdv() {
        var ck = $("#detail-adv-list").find("input[name='checkbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的代偿记录？", function () {
                loadingShow();
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/urgeWork/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("删除成功！", 1000, function () {
                                dataProxy.getOrderAdvancedIncome(acceptId, "#detail-adv-list", function (data) {
                                    $("#detail-adv-list").empty().html(UI.createAdvListHtml(data));
                                    setTableCheck("#detail-adv-list");
                                });
                                getButtonShow();
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            });
        }
    }

    function setType(dom,self){
        var type="";
        $.ajax({
            url: ctx + "/urgeWork/getOrderInfo.action",
            type: "post",
            data: {
                "acceptId":acceptId
            },
            dataType: "json",
            async:false,
            success: function (data) {
                if (data.error == 1) {
                 var entity= data.rows;
                   $("#plateNumber").val(entity['plateNumber']);
                   $("#newOld").val(entity['newOld'] ==1? "新车" :"二手车");
                    type=entity['departmentType'];
                }
            }
        });
        return type;
    }
    function showRource(config,dom,valArr) {
        var html = "";
        html +="<select check='validSelect(this)' class='form-control' id='sourceSelect'>"+
            "<option value=''>请选择</option>";
        if(valArr.length ==3){
            for(var i=0;i<valArr.length;i++){
                html +="<option value='"+(i+1)+"'>"+valArr[i]+"</option>";
            }
        }else{
            for(var i=0;i<valArr.length;i++){
                html +="<option value='"+(i+4)+"'>"+valArr[i]+"</option>";
            }
        }
        html += "</select>";
        $(dom).empty().append(html).find("#sourceSelect").chosen(config);
    }
    function getTrail() {
        var  id ="";
        $.ajax({
            url: ctx + "/cfTrail/getTrail.action",
            type: "post",
            data: {
                "acceptId":acceptId
            },
            dataType: "json",
            async:false,
            success: function (data) {
                var trail=data.rows;
                if(trail!=null){
                    id=trail["id"];
                }
            }
        });
        return id;
    }


});









// end jquery



function insuranceValid(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "passenger") {
                var name = $("#passenger").val();
                if (name > 127 || !(/^[0-9]*$/).exec(name)) {
                    $(lableId).attr('tip', '乘客人数超数且只能输入数字');
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }
        return "success";
    }
}

function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() != null && $.trim($(lableId).val()) != "") {
            var value = $.trim($(lableId).val());
            if ($(lableId).attr("id") == "supply-car-info-vin-no") {
                var vinReg = new RegExp(vin_reg);
                if (!vinReg.test(value)) {
                    $(lableId).attr("tip", "请输入有效的车架号");
                    return "faild";
                }
            } else if ($(lableId).attr("name") == "evaluateReportPrice") {
                var floatReg = new RegExp(float);
                if (!floatReg.test(value)) {
                    $(lableId).attr("tip", "请输入正确的评估报告价格");
                    return "faild";
                }
            } else if ($(lableId).attr("name") == "carExtraFee") {
                var floatReg = new RegExp(float);
                if (!floatReg.test(value)) {
                    $(lableId).attr("tip", "请输入正确的车辆附加费");
                    return "faild";
                }
            }
        }
        return "success";
    }
    return "success";
}

function validFinanceForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            /* if ($(lableId).attr("id") == "confirmAccountTime") {
             $(lableId).attr('tip', '入账时间为空，请重新输入。');
             return "faild";
             }
             else */
            if ($(lableId).attr("id") == "payMoneyType") {
                $(lableId).parent().attr('tip', '费用项目为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            else if ($(lableId).attr("id") == "incomeExpensesType") {
                $(lableId).parent().attr('tip', '收支方式不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            else if ($(lableId).attr("id") == "actualMoney") {
                $(lableId).attr('tip', '金额为空，请重新输入。');
                return "faild";
            }
        }
        return "success";
    }
}
function checkLen(maxLen,obj)  { 
    if ($(obj).val().length > maxLen) {
    	return
    }else{
    	$(obj).next(".textarea-tip").find(".count").html($(obj).val().length);
    	$(obj).next(".textarea-tip").find(".remainCount").html(maxLen-$(obj).val().length)
    }
}
//表单校验
function validSelect(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $.trim($(lableId).val()) == "" || $(lableId).val() == "请选择") {
            if ($(lableId).attr("id") == "carDealer") {
                $(lableId).parent().attr('tip', '请输入正确的经销商。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "sex") {
                $(lableId).parent().attr('tip', '请输入正确的购车人性别。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "marriedCode") {
                $(lableId).parent().attr('tip', '请输入正确的婚姻状态。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "sysFlexKeyCode" || $(lableId).attr("id") == "sharedSysFlexKeyCode") {
                $(lableId).parent().attr('tip', '请输入正确的学历。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "companyTypeCode" || $(lableId).attr("id") == "sharedCompanyTypeCode") {
                $(lableId).parent().attr('tip', '请输入正确的单位类型。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "jobTypeCode" || $(lableId).attr("id") == "sharedJobTypeCode") {
                $(lableId).parent().attr('tip', '请输入正确的职务类别。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "jobCode" || $(lableId).attr("id") == "sharedJobCode") {
                $(lableId).parent().attr('tip', '请输入正确的职务。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "runingPeriodCode" || $(lableId).attr("id") == "sharedRuningPeriodCode") {
                $(lableId).parent().attr('tip', '请输入正确的经营期限。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "employedPeriodCode" || $(lableId).attr("id") == "sharedEmployedPeriodCode") {
                $(lableId).parent().attr('tip', '请输入正确的工龄。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "relationBuyerCode") {
                $(lableId).parent().attr('tip', '请输入正确的与购车人关系。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "housePropertyCode") {
                $(lableId).parent().attr('tip', '请输入正确的房屋性质。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "relationTypeCode1" || $(lableId).attr("id") == "relationTypeCode2") {
                $(lableId).parent().attr('tip', '请输入正确的关系。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "carProduceArea") {
                $(lableId).parent().attr('tip', '请输入正确的车辆类型。').addClass("input_validation-failed");
                return "faild";
           /* } else if ($(lableId).attr("id") == "carBrandId") {
                $(lableId).parent().attr('tip', '请输入正确的车型。').addClass("input_validation-failed");
                return "faild";*/
            } else if ($(lableId).attr("id") == "newOrOld") {
                $(lableId).parent().attr('tip', '请输入正确的车型构成。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "board") {
                $(lableId).parent().attr('tip', '请输入正确的公牌。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "loanPeriodMonthCode") {
                $(lableId).parent().attr('tip', '请输入正确的年限(月)。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "cfProductId") {
                $(lableId).parent().attr('tip', '请输入正确的产品类型。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "gpsInstallNumber") {
                $(lableId).parent().attr('tip', '请输入正确的GPS安装数量。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "insuranceMethodCode") {
                $(lableId).parent().attr('tip', '请输入正确的投保方式。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "promotion") {
                $(lableId).parent().attr('tip', '请输入正确的促销情况。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "balanceMethod") {
                $(lableId).parent().attr('tip', '请输入正确的结算方式。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "credit-person") {
                $(lableId).parent().attr('tip', '请选择新的信贷专员').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "urgeDate") {
                $(lableId).attr('tip', '催缴日期为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("name") == "urgeMethod") {
                $(lableId).parent().attr('tip', '催缴方式不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "urgeStatus") {
                $(lableId).parent().attr('tip', '催缴状态不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "isTelException") {
                $(lableId).parent().attr('tip', '是否电催异常不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "urgeContent") {
                $(lableId).attr('tip', '催缴内容不能为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("name") == "overdueMonth") {
                $(lableId).parent().attr('tip', '逾期月份不能为空，请选择。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "dispatchDate") {
                $(lableId).attr('tip', '派单日期为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("name") == "trailCarCompanyId") {
                $(lableId).parent().attr('tip', '拖车单位不能为空，请选择。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "trailExecuteContent") {
                $(lableId).parent().attr('tip', '拖车备注不能为空，请选择。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "accountType") {
                $(lableId).parent().attr('tip', '账户类型为空，请选择。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "money") {
                $(lableId).parent().attr('tip', '金额不能为空，请输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "advancedDate") {
                $(lableId).parent().attr('tip', '交易日期为空，请输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "advancedBak") {
                $(lableId).parent().attr('tip', '代偿备注为空，请输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("name") == "inOrOut") {
                $(lableId).parent().attr('tip', '收支为空，请输入。').addClass("input_validation-failed");
                return "faild";
            }

            return "success";
        }
        return "success";
    }

}
