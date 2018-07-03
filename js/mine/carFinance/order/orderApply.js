function inputSapceTrim(e, input) {
    input.value = Trim(input.value, "g");
    var keynum;
    if (window.event) {
        keynum = e.keyCode
    } else if (e.which) {
        keynum = e.which
    }
    if (keynum == 32) {
        return false;
    }
    return true;
}

function Trim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}

jQuery(function ($) {
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    $('.mod_header .nav_sign').hover(function (e) {
        var top = $(this).prop("offsetTop");
        var left = $(this).offset().left;
        $(".tip-box").css({
            'display': 'block',
            'position': 'absolute',
            'top': top,
            'left': left + 50,
        })
    }, function (e) {
        $(".tip-box").css({
            'display': 'none'
        })
    })

    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: '100%'
    };

    //下拉框
    $("#carDealer").chosen(config);
    //全局表单验证数组
    var validationArray = new Array();

    //购车人信息初始化
    var acceptId = $("input[name='acceptId']").val();
    //数据处理对象
    var dataProxy = new HYCarFinance.carProxy();
    var ui = new HYCarFinance.UI();
    showBuyerInfo();
    showBuyer();
    showShared();
    showSponsor();
    showCar();
    showAdvance();

    function initCarDealer() {
        var id = $("select[name='carDealerId']").val();
        if (id === '' || id == undefined) {
            return;
        }
        var bank = $("input[name='bank']").val();
        var account = $("input[name='account']").val();
        if (bank == '' || account == '') {
            $.ajax({
                type: "post",
                url: ctx + "/dealerManage/getDealer.action",
                data: {id: id},
                dataType: "json",
                success: function (result) {
                    if (result.error == 1) {
                        var data = result.rows;
                        if (bank == '') {
                            $("input[name='bank']").val(data.bankName);
                        }
                        if (account == '') {
                            $("input[name='account']").val(data.bankAccount);
                        }
                    }
                }, error: function (result) {
                    faildMsg("请求异常：" + result.status + "");
                }
            });
        }
    }

    //经销商选择事件
    $("select[name='carDealerId']").on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($("select[name='carDealerId']").parent(), "remove");
        } else {
            change_error_style($("select[name='carDealerId']").parent(), "add");
        }
    });

    function validOldCar($isSubmit) {
        var form = $("#carinfoForm").find("form").get(0);
        var input2 = "select[name='newOrOld'],select[name='cfProductId'],select[name='loanPeriodMonthCode'],input[name='carLicenseProvince'],input[name='auditCarPrice'],input[name='actualLoadMoney'],input[name='customerRate'],input[name='initRegisterDate'],input[name='initEvaluatePrice'],input[name='vinNo']";
        $(form).find(input2).each(function () {
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
    }

    //提交初审单
    $(".btn-submit").on("click", function () {
        //基本信息
        initValidation(validationArray, "#acceptInfo");
        var cfProductId = $("#cfProductId").find("option:selected").text();
        if (cfProductId.indexOf("参融产品") >= 0) {
            $("input[name='insuranceFee']").attr("obj", "float");
            $("input[name='configTaxFee']").attr("obj", "float");
            $("input[name='totalFee']").attr("obj", "float");
            initValidation(validationArray, "#carinfoForm");
        }

        validationArray.sort(function (x, y) {
            if (x.el < y.el) {
                return -1;
            }
            if (x.el > y.el) {
                return 1;
            }
            return 0;
        });
        for (var i = 0; i < validationArray.length; i++) {
            var validation = validationArray[i];
            validation.mySubmit(validation);
            //二手车项等校验
            var firstRed = $(".ibox-content").find(".input_validation-failed").get(0);
            if (firstRed) {
                var top = $(firstRed).offset().top - 80;
                $(document).scrollTop(top);
            }

            if (!validation.isSubmit) {
                return;
            }
        }
        orderSaveOrSubmit("/cfBusinessOrderAccept/orderInputSubmit.action", "submit");
    });


    //初审单保存
    $(".btn-save").on("click", function () {
        orderSaveOrSubmit("/cfBusinessOrderAccept/orderInputSave.action", "save");
    });

    function initValidation(validationArray, id) {
        var validate = new ValidateWin(id, {});
        validationArray.push(validate);
    }

    //2、查询审核历史信息
    dataProxy.getAuditHistoryByAcceptId(acceptId, true, "#audit-history-list", function (data) {
        //初始化表格
        var html = ui.createAuditHistoryHtml(data)
        $("#audit-history-list").append(html);
        //初始化查看事件
        initAuditHistoryDetailEvent();
    });

    //审核详情查看
    function initAuditHistoryDetailEvent() {
        $("#audit-history-list").find(".detail").on("click", function () {
            var id = $(this).attr("value");
            dataProxy.getAuditDetailById(id, true, function (data) {
                var options = {
                    width: 800,
                    top: 200,
                    height: 480,
                    overlay: true,
                    dispose: true,
                    move: true,
                    move: true,
                    onBeforeShow: function () {
                        $("#auditType").val(data["auditTypeName"]);
                        $("#auditResult").val(data["auditStatusStr"]);
                        $("#auditor").val(data["auditUser"]);
                        $("#auditTime").val(data["auditTime"]);
                        $("#auditDescriptionView").val(data["auditBak"]);
                    }
                };
                var viewDlg = new Dialog("#view-audit-dialog", options);
                viewDlg.show();
            });
        });
    }

    //购车人征信信息
    function showBuyerInfo() {
        dataProxy.getCreditInfoByAcceptId(acceptId, null, true, "#buyerInfo", function (data) {
            var html = ui.createCreditHtml(data);
            $("#buyerInfo").append(html);
        });
    }

    //大数据征信
    dataProxy.getBigDataCreditByAcceptId(acceptId, true, "#audit-big-data-list", function (data) {
        var html = ui.createBigDataCreditHtml(data);
        $("#audit-big-data-list").append(html);
    });
    //查询征信、征信详情查看按钮
    $(".query-credit-btn").on("click", function () {
        var _this = $(this);
        _this.addClass("disabled").attr("disabled", "disabled");
        $.ajax({
            url: ctx + '/risk/queryForLoan.action?acceptId=' + acceptId,
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.error == 1) {
                    $("#audit-big-data-list").empty();
                    var html = ui.createBigDataCreditHtml(data["rows"]);
                    $("#audit-big-data-list").append(html);
                } else if (data.error == -100) {
                    _this.removeClass("disabled").removeAttr("disabled");
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    _this.removeClass("disabled").removeAttr("disabled");
                    faildMsg(data.message);
                }
            }
        });
    });
    //详情查看
    new LoanCreditQuery(".detail-credit-btn", acceptId);

    function showBuyer() {
        dataProxy.getBuyerInfoByAcceptId(acceptId, true, "BUYER", "#buyerDiv", function (result) {
            if (result == null) {
                return;
            }
            new HYCarFinance.form({
                id: '#buyerDiv',
                items: buyerTag,
                beforeShow: function () {
                    ui.setDefaultValue('#buyerDiv', result);
                    //回写省份、城市
                    $('#buyerDiv').find("input").each(function (i, n) {
                        var name = $(n).attr("name");
                        initProvince(name, n, result);
                    });

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
                    var contact = result.contactPersonEntities;
                    for (var i = 0; i < contact.length; i++) {
                        var k = i + 1;
                        var v = contact[i];
                        $("#contacterId" + k).val(v.id);
                        $("#contacterRealName" + k).val(v.realName);
                        $("#relationTypeCode" + k).val(v.relationTypeCode);
                        $("#relationTypeCode" + k).trigger("chosen:updated");
                        $("#contacterTel" + k).val(v.contactTel);
                        $("#contacterPhone" + k).val(v.phone);
                    }
                    initTelAreaEvent('#buyerDiv');
                    initValidation(validationArray, "#buyerForm");
                }
            });
        });
    }

    function initProvince(name, n, result) {
        if (name === 'province' && result["province"] != undefined && result["province"] != '') {
            var $province = result["province"];
            $(n).val($province);
        } else if (name === 'currentAddressProvince' && result["currentAddressProvince"] != undefined && result["currentAddressProvince"] != '') {
            var $province = result["currentAddressProvince"];
            $(n).val($province);
        } else if (name == 'familyAddressProvince' && result["familyAddressProvince"] != undefined && result["familyAddressProvince"] != '') {
            var $province = result["familyAddressProvince"];
            $(n).val($province);
        } else if (name === 'houseAddressProvince' && result["houseAddressProvince"] != undefined && result["houseAddressProvince"] != '') {
            var $province = result["houseAddressProvince"];
            $(n).val($province);
        } else if (name === 'companyProvince' && result["companyProvince"] != undefined && result["companyProvince"] != '') {
            var $province = result["companyProvince"];
            $(n).val($province);
        }
    }


    function showShared() {
        dataProxy.getBuyerInfoByAcceptId(acceptId, true, "SHARED", "#sharedDiv", function (result) {
            if (result == null) {
                return;
            }
            new HYCarFinance.form({
                id: '#sharedDiv',
                title: '配偶信息',
                xtype: 'fieldset',
                index: 'shared',
                isForm: true,
                name: 'shared',
                items: sharedTag,
                beforeShow: function () {
                    ui.setDefaultValue('#sharedDiv', result);
                    //回写省份、城市
                    $('#sharedDiv').find("input").each(function (i, n) {
                        var name = $(n).attr("name");
                        initProvince(name, n, result);
                    });
                    initTelAreaEvent('#sharedDiv');
                    initValidation(validationArray, "#sharedForm");
                }
            });
        });
    }

    //11、担保人信息
    function showSponsor() {
        dataProxy.getBuyerInfoByAcceptId(acceptId, true, "SPONSOR", "#sponsorDiv", function (data) {
            for (var j = 0; j < data.length; j++) {
                var item = data[j];
                var newSponsorTag = sponsorTag;
                //针对担保人做id的特殊设置
                dataProxy.updateConfig(newSponsorTag, function (config) {
                    if (typeof(config["id"]) != "undefined" && null != config["id"]) {
                        config["id"] = config["id"] + "-" + j;
                    } else {
                        config["id"] = "sponsor-" + config["name"] + "-" + j;
                    }
                });
                new HYCarFinance.form({
                    id: '#sponsorDiv',
                    title: '担保人' + ui.getUpperNumber(j + 1),
                    xtype: 'fieldset',
                    index: j,
                    isForm: true,
                    name: 'sponsor',
                    items: sponsorTag,
                    beforeShow: function () {
                        //设置默认值
                        if (null != item) {
                            ui.setDefaultValue("#fieldset-" + j, item);
                            $("#fieldset-" + j).find("input").each(function (i, n) {
                                var name = $(n).attr("name");
                                initProvince(name, n, item);
                            });
                        }
                        initTelAreaEvent('#fieldset-' + j);
                        initValidation(validationArray, "#fieldset-" + j);
                    }
                });
            }
        });
    }

    function showCar() {
        dataProxy.getCarInfo(acceptId, true, 0, "#carInfoDiv", function (result) {
            var newCarInfoTag = carTag;
            var bankId = $('#bankId').val();
            dataProxy.updateConfig(newCarInfoTag, function (config) {
                if (config["name"] == "cfProductId") {
                    config["url"] = ctx + "/product/getList.action?forbidden=0&bankId=" + bankId;
                }
            });

            new HYCarFinance.form({
                id: '#carInfoDiv',
                items: newCarInfoTag,
                isValidate: true,
                beforeShow: function () {
                    ui.setDefaultValue('#carInfoDiv', result);
                    if (result != null) {
                        if (result["newOrOld"] == 0) {
                            showOldCar(result);
                        }
                        //车型级联
                        carConnect(result["carBrandId"]);
                        //init_car_area();
                        //上牌地二级级联
                        cityConnect(result["carLicenseProvince"]);
                    }
                    initProduct(bankId, $("#cfProductId").val(), "#loanPeriodMonthCode", function () {
                        $("#loanPeriodMonthCode").val(result["loanPeriodMonthCode"]);
                        $("#loanPeriodMonthCode").trigger("chosen:updated");
                    });
                    //参融产品
                    /*initCenRongProduct($("#cfProductId").find("option:selected").text(), result, function () {
                     $("input[name='insuranceFee'],input[name='configTaxFee']").on("change", function () {
                     var insuranceFee = isNaN($("input[name='insuranceFee']").val()) || $("input[name='insuranceFee']").val() == '' ? 0 : $("input[name='insuranceFee']").val();
                     var configTaxFee = isNaN($("input[name='configTaxFee']").val()) || $("input[name='configTaxFee']").val() == '' ? 0 : $("input[name='configTaxFee']").val();
                     var totalFee = parseFloat(insuranceFee) + parseFloat(configTaxFee)
                     $("input[name='totalFee']").val(totalFee);
                     });
                     });*/
                    $("#cfProductId").on('change', function (e, param) {						//设置类型选择级联
                        initProduct(bankId, param["selected"], "#loanPeriodMonthCode", function () {
                            $("#loanPeriodMonthCode").trigger("chosen:updated");
                        });
                        if ($("#cfProductId").find("option:selected").text().indexOf("参融产品") < 0) {
                            $("input[name='insuranceFee'],input[name='configTaxFee'],input[name='totalFee']").each(function () {
                                $(this).removeClass("input_validation-failed");
                                $(this).removeAttr("obj");
                            });
                        }
                    });

                    //是否公牌
                    car_board_change();
                    $(".calculate-button").on("click", function () {
                        calculateCarRate();
                    });

                    //删除保存车辆信息按钮
                    $(".save-car-button").remove();

                    //垫款申请用款金额，根据车辆信息中的实际贷款金额
                    $("input[name='actualLoadMoney']").on("change", function () {
                        var dom = $("input[name='moneyAmount']");
                        if (dom != undefined) {
                            dom.val($(this).val());
                        }
                    });
                    //
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
                    changeNewOROld();
                    initValidation(validationArray, "#carinfoForm");
                }
            });
        });

        function cityConnect(res) {
            $("#carLicenseProvince").val(res);
           
            //上牌地点击事件
            $("#carLicenseProvince").on("click", function () {
                	 $(this).next().find(".item-type").show();
            })
            $(".city-box .item-type p").on("click", function () {
            	$(this).addClass("active").siblings().removeClass("active");
            	$(".city-box .item-series").show().find(".series").empty();
            	var provinceId = $(this).attr("data-type");
            	var provinceName = $(this).text();
            	showCity(provinceId,provinceName)
            })
        }
        
		function showCity(provinceId,provinceName){
			 loadingShow();
			 $.ajax({
                 url: ctx + "/city/getCityListSecond.action",
                 type: "post",
                 data: {id: provinceId},
                 dataType: 'json',
                 success: function (result) {
                     loadingHide();
                     if (result.error == 1) {
                    	 var seriesHtml ='';
                    	 for (var i = 0; i < result.rows.length; i++) {
                    		 seriesHtml += '<p data-type="' + result.rows[i].id + '">' + result.rows[i].name + '</p>';
                        }
                    	 $(".city-box .series").html(seriesHtml);
                    	 $(".city-box .series p").on("click", function () {
                    		 $(this).addClass("active").siblings().removeClass("active");
                             var cityName = $(this).text();
                             $(".city-box .item").hide();
                             $("#carLicenseProvince").val(provinceName+'-'+cityName).removeClass("input_validation-failed");
                    	 })
                     }
                 }
             })
		}
		
        function carConnect(res) {
            $("#carNoId").val(res);
            var oldBrandNameMain, newBrandNameMain, carSerialFirst, carSerialSecond, brandName;
            if (res) {//有值回写
                $.ajax({
                    url: ctx + "/cfCarBrand/detail.action",
                    type: "post",
                    data: {id: res},
                    dataType: 'json',
                    success: function (result) {
                        if (result.error == 1) {
                            oldBrandNameMain = newBrandNameMain = result.rows.brandNameMain;
                            carSerialFirst = result.rows.carSerialFirst;
                            carSerialSecond = result.rows.carSerialSecond;
                            brandName = result.rows.brandName;
                            $("#carBrandId").val(brandName);
                        }
                    }
                })
            }
            //车型点击事件
            $("#carBrandId").on("click", function () {
                if (res) {
                    $(this).next().find(".item").show();
                    $(".type-right p").each(function (i, n) {
                        if ($(this).text() == oldBrandNameMain) {
                            $(this).addClass("active").siblings().removeClass("active");
                        }
                    })
                    showSeries(oldBrandNameMain, carSerialFirst, carSerialSecond);
                    showNo(carSerialFirst, carSerialSecond, brandName);
                } else {
                    $(this).next().find(".item-type").show();
                }
            });
            $(".car-box .item-type p").on("click", function () {
                $(".car-box .item-series").show().find(".series").empty();
                $(".car-box .item-no").hide();
                $(this).addClass("active").siblings().removeClass("active");
                newBrandNameMain = $(this).text();
                showSeries(newBrandNameMain);
            })
        }

        function showSeries(brandNameMain, carSerialFirst, carSerialSecond) {
            if (brandNameMain) {
                loadingShow();
                $.ajax({
                    url: ctx + "/cfCarBrand/getcarSerialBrandName.action",
                    type: "post",
                    data: {brandNameMain: brandNameMain},
                    dataType: 'json',
                    success: function (result) {
                        loadingHide();
                        var seriesHtml = '';
                        if (result.error == 1) {
                            for (var i = 0; i < result.rows.length; i++) {
                                var brandArr = result.rows[i].categoryStyle;
                                seriesHtml += '<div>'
                                seriesHtml += '<h5 id="' + result.rows[i].brandFirstNameType + '">' + result.rows[i].brandFirstName + '</h5>';
                                for (var j = 0; j < brandArr.length; j++) {
                                    seriesHtml += '<p data-type="' + brandArr[j].carSerialSecondNameType + '">' + brandArr[j].carSerialSecondName + '</p>';
                                }
                                seriesHtml += '</div>'
                            }
                            $(".car-box .series").append(seriesHtml);
                            if (carSerialFirst && carSerialSecond) {
                                $(".car-box .series p").each(function (i, n) {
                                    if ($(this).text() == carSerialSecond) {
                                        $(this).addClass("active")
                                    }
                                })
                            }
                            clickSeries(carSerialFirst, carSerialSecond);
                        }
                    }
                })
            }
        }

        function clickSeries(carSerialFirst, carSerialSecond) {
            $(".car-box .item-series p").on("click", function () {//车系列点击事件
                $(".item-no").show().find(".no").empty();
                $(this).addClass("active").siblings().removeClass("active");
                carSerialFirst = $(this).parent().find("h5").text();
                carSerialSecond = $(this).text();
                showNo(carSerialFirst, carSerialSecond)
            })
        }

        function showNo(carSerialFirst, carSerialSecond, brandName) {
            loadingShow();
            $.ajax({
                url: ctx + "/cfCarBrand/getAllBrandName.action",
                type: "post",
                data: {
                    carSerialFirstName: carSerialFirst,
                    carSerialSecondName: carSerialSecond
                },
                dataType: 'json',
                success: function (result) {
                    loadingHide();
                    var noHtml = '';
                    if (result.error == 1) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var list = result.rows[i].list;
                            noHtml += '<div>'
                            noHtml += '<h5 id="' + result.rows[i].year + '">' + result.rows[i].year + '</h5>';
                            for (var j = 0; j < list.length; j++) {
                                noHtml += '<p data-type="' + list[j].brandNameType + '" data-id="' + list[j].id + '" title="' + list[j].brandName + '">' + list[j].brandName + '</p>';
                            }
                            noHtml += '</div>';
                        }
                        $(".no").empty().append(noHtml);
                        if (brandName) {
                            brandName = brandName.split('(')[0];
                            $(".no p").each(function (i, n) {
                                if ($(this).text() == brandName) {
                                    $(this).addClass("active")
                                }
                            })
                        }
                        clickNo();
                    }
                }
            })
        }

        function clickNo() {
            $(".item-no p").on("click", function () {//车辆品牌点击事件，赋值
                $(this).addClass("active").siblings().removeClass("active");
                $("#carNoId").val($(this).attr("data-id"));
                var carNoName = $(this).text();
                $(".car-box .item").hide();
                $("#carBrandId").val(carNoName).attr("title", carNoName).removeClass("input_validation-failed");
            })
        }


        //参融产品
        function initCenRongProduct(cfProductId, result, callback) {
            var $parentDiv = $('input[name="firstRepay"]').parent();
            $parentDiv.nextAll().empty();
            /*if (cfProductId == '' || cfProductId == undefined || cfProductId != '参融产品') {
             $parentDiv.nextAll().empty();
             return;
             }*/
            var insuranceFee = result != null && result["insuranceFee"] != null ? result["insuranceFee"] : '';
            var configTaxFee = result != null && result["configTaxFee"] != null ? result["configTaxFee"] : '';
            var totalFee = result != null && result["totalFee"] != null ? result["totalFee"] : '';
            var html = '<label class="col-md-1 control-label"><span class="red">*</span>保险费用:</label>' +
                '<div class="col-md-2"><input obj="float" maxlength="9" tip="请输入正确的保险费用" value="' + insuranceFee + '" name="insuranceFee" class="form-control" type="text"></div>' +
                '<label class="col-md-1 control-label"><span class="red">*</span>配置税:</label>' +
                '<div class="col-md-2"><input obj="float" maxlength="9" tip="请输入正确的配置税" value="' + configTaxFee + '" name="configTaxFee" class="form-control" type="text"></div>' +
                '<label class="col-md-1 control-label"><span class="red">*</span>参融总和:</label>' +
                '<div class="col-md-2"><input obj="float" maxlength="9" readonly="readonly" value="' + totalFee + '" name="totalFee" class="form-control" type="text" is_tip_null="yes"></div>';
            $parentDiv.after(html);
            callback();
        }

        //产品类型
        function initProduct(bankId, cfProductId, loanPeriodMonthCode, callback) {
            if (cfProductId == '' || cfProductId == undefined) {
                return;
            }
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

        //车辆是否公牌事件
        function car_board_change() {
            $(".carinfoForm select[name='board']").on("change", function () {
                var v = $(this).val();
                var realName = $("#buyerDiv input[name='realName']").val();
                var companyName = $("#buyerDiv input[name='companyName']").val();
                if (v == 1) {
                    $(".carinfoForm input[name='driverLicneseOwner']").val(companyName);
                } else {
                    $(".carinfoForm input[name='driverLicneseOwner']").val(realName);
                }
            });
        }

        //车辆类型切换
        /* function car_area_change() {
             $(".carinfoForm select[name='carProduceArea']").on("change", function () {
                 var v = $(this).val();
                 var carBrand = $(".carinfoForm select[name='carBrandId']");
                 carBrand.children().each(function (index) {
                     if (index != 0) {
                         $(this).remove();
                     }
                 });
                 if (v == '' || v == undefined || v == 'undefined') {
                     return;
                 }

                 $.ajax({
                     url: ctx + "/cfCarBrand/getList.action",
                     type: "get",
                     data: {brandType: v, forbidden: 0},
                     dataType: "json",
                     success: function (result) {
                         if (result.error == 1) {
                             var data = result.rows;
                             $.each(data, function (k, p) {
                                 var option = "<option value='" + p.id + "'>" + p.brandName + "</option>";
                                 $(carBrand).append(option);
                             });
                             carBrand.trigger("chosen:updated");
                         } else {
                             faildMsg(result.message);
                         }
                     }
                 });
             });
         }*/

        //计算车辆费
        function calculateCarRate(isSubmit) {
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
                var carDealerId = $("#acceptInfo").find("select[name='carDealerId']").val();//经销商
                var bankId = $('.carinfoForm input[name="bankId"]').val();//贷款银行
                var province = $(".carinfoForm input[name='carLicenseProvince']").val();//上牌地，判断省内还省外
                var auditCarPrice = $(".carinfoForm input[name='auditCarPrice']").val();//审核车价
                var actualLoadMoney = $(".carinfoForm input[name='actualLoadMoney']").val();//实际贷款额
                var customerRate = $(".carinfoForm input[name='customerRate']").val();//客户费率
                var newOrOld = $(".carinfoForm select[name='newOrOld']").val();//是否新车
                var cfProductId = $(".carinfoForm select[name='cfProductId']").val();//产品类型
                var loanPeriodMonthCode = $(".carinfoForm select[name='loanPeriodMonthCode']").val();//年限

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
                    //垫款申请按揭服务费
                    if ($("input[name='serviceFee']") != undefined) {
                        $("input[name='serviceFee']").val(data.serviceFee);
                    }
                    //垫款申请高息部分
                    if ($("input[name='highInterest']") != undefined) {
                        $("input[name='highInterest']").val(data.heightRatio);
                    }
                    //垫款申请渠道保证金
                    if ($("input[name='channelEnsureMoney']") != undefined) {
                        $("input[name='channelEnsureMoney']").val(data.channelEnsureMoney);
                    }
                });
            }
        }
    }

    //垫款申请
    function showAdvance() {
        dataProxy.getApplyPayByAcceptId(acceptId, true, "#advanceDiv", function (data) {
            //初始化购车人信息组件
            new HYCarFinance.form({
                id: '#advanceDiv',
                items: advanceTag,
                beforeShow: function () {
                    ui.setDefaultValue('#advanceDiv', data);
                    initValidation(validationArray, "#carinfoForm");
                    initValidation(validationArray, "#advanceForm");

                    //经销商事件
                    initCarDealer();

                    //垫款申请中的保证金计算
                    $("input[name='gpsFee']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='poundage']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='notarialFee']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='mortgageFee']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='serviceFee']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='highInterest']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='valuationFee']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='agreeEnsureMoney']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='channelEnsureMoney']").on("change", function () {
                        initCalculateCashEvent();
                    });
                    $("input[name='licensePlateEnsureMoney']").on("change", function () {
                        initCalculateCashEvent();
                    });
                }
            });
        });
    }

    function initCalculateCashEvent() {
        var poundage = isNaN($("input[name='poundage']").val()) || $("input[name='poundage']").val() == '' ? 0 : $("input[name='poundage']").val();
        var serviceFee = isNaN($("input[name='serviceFee']").val()) || $("input[name='serviceFee']").val() == '' ? 0 : $("input[name='serviceFee']").val();
        var highInterest = isNaN($("input[name='highInterest']").val()) || $("input[name='highInterest']").val() == '' ? 0 : $("input[name='highInterest']").val();
        var agreeEnsureMoney = isNaN($("input[name='agreeEnsureMoney']").val()) || $("input[name='agreeEnsureMoney']").val() == '' ? 0 : $("input[name='agreeEnsureMoney']").val();
        var channelEnsureMoney = isNaN($("input[name='channelEnsureMoney']").val()) || $("input[name='channelEnsureMoney']").val() == '' ? 0 : $("input[name='channelEnsureMoney']").val();
        var licensePlateEnsureMoney = isNaN($("input[name='licensePlateEnsureMoney']").val()) || $("input[name='licensePlateEnsureMoney']").val() == '' ? 0 : $("input[name='licensePlateEnsureMoney']").val();

        var totalFee = parseFloat(poundage) + parseFloat(highInterest) + parseFloat(agreeEnsureMoney)
            + parseFloat(channelEnsureMoney) + parseFloat(licensePlateEnsureMoney)
        $("input[name='amountMoney']").val(totalFee);
    }

    function orderSaveOrSubmit(url, type) {
        var param = {};
        param.id = $('input[name="acceptId"]').val();
        param.orderNo = $('input[name="orderNo"]').val();
        param.carDealerId = $('select[name="carDealerId"]').val();
        var buyers = new Array();

        //担保人最多有四个
        $(".buyerDiv").find("div.form-horizontal").each(function () {
            var sponsor = {};
            sponsor.id = $(this).find("input[name='id']").val();
            sponsor.userType = $(this).find("input[name='userType']").val();
            sponsor.sex = $(this).find("select[name='sex']").val();
            sponsor.sharedType = $(this).find("select[name='sharedType']").val();
            sponsor.sysFlexKeyCode = $(this).find("select[name='sysFlexKeyCode']").val();
            sponsor.cardNo = $(this).find("input[name='cardNo']").val();
            sponsor.cardArea = $(this).find("input[name='cardArea']").val();
            sponsor.province = $(this).find("input[name='province']").val();
            sponsor.tel = $(this).find("input[name='tel']").val();
            sponsor.telArea = $(this).find("input[name='telArea']").val();
            sponsor.marriedCode = $(this).find("select[name='marriedCode']").val();
            //现住地址
            sponsor.currentAddressProvince = $(this).find("input[name='currentAddressProvince']").val();
            sponsor.currentAddress = $(this).find("input[name='currentAddress']").val();
            sponsor.phone = $(this).find("input[name='phone']").val();
            sponsor.familyAddressProvince = $(this).find("input[name='familyAddressProvince']").val();
            sponsor.familyAddress = $(this).find("input[name='familyAddress']").val();
            //家庭地址
            sponsor.houseAddressProvince = $(this).find("input[name='houseAddressProvince']").val();
            sponsor.houseAddress = $(this).find("input[name='houseAddress']").val();
            sponsor.houseOwner = $(this).find("input[name='houseOwner']").val();
            sponsor.relationBuyerCode = $(this).find("select[name='relationBuyerCode']").val();
            sponsor.housePropertyCode = $(this).find("select[name='housePropertyCode']").val();
            sponsor.houseSpace = $(this).find("input[name='houseSpace']").val();
            sponsor.currentPrice = $(this).find("input[name='currentPrice']").val();
            sponsor.loanMoney = $(this).find("input[name='loanMoney']").val();
            sponsor.loanPeriodMonthCode = $(this).find("input[name='loanPeriodMonthCode']").val();
            sponsor.repayAmountMonth = $(this).find("input[name='repayAmountMonth']").val();
            sponsor.companyName = $(this).find("input[name='companyName']").val();
            sponsor.companyProvince = $(this).find("input[name='companyProvince']").val();
            sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
            sponsor.jobTypeCode = $(this).find("select[name='jobTypeCode']").val();
            sponsor.jobCode = $(this).find("select[name='jobCode']").val();
            sponsor.runingPeriodCode = $(this).find("select[name='runingPeriodCode']").val();
            sponsor.monthIncome = $(this).find("input[name='monthIncome']").val();
            sponsor.companyTypeCode = $(this).find("select[name='companyTypeCode']").val();
            sponsor.employedPeriodCode = $(this).find("select[name='employedPeriodCode']").val();
            sponsor.stockRatio = $(this).find("input[name='stockRatio']").val();
            sponsor.companyTel = $(this).find("input[name='companyTel']").val();
            sponsor.remark = $.trim($(this).find("textarea[name='remark']").val());

            //紧急联系人
            var contacts = new Array();
            var $contactForm = $(this).find('div.contracter');
            $($contactForm).each(function () {
                var contact = {};
                contact.id = $(this).find("input[name='id']").val();
                contact.realName = $(this).find("input[name='realName']").val();
                contact.phone = $(this).find("input[name='phone']").val();
                contact.contactTel = $(this).find("input[name='contactTel']").val();
                contact.relationTypeCode = $(this).find("select[name='relationTypeCode']").val();
                contacts.push(contact);
            });
            sponsor.contactPersonEntities = contacts;
            buyers.push(sponsor);
        });

        param.cfBuyerInformationVOS = buyers;

        var carInfo = {};

        var id = $(".carinfoForm input[name='id']").val();
        var bankId = $(".carinfoForm input[name='bankId']").val();
        var province = $(".carinfoForm input[name='carLicenseProvince']").val();//上牌地，判断省内还省外
        var auditCarPrice = $(".carinfoForm input[name='auditCarPrice']").val();//审核车价
        var actualLoadMoney = $(".carinfoForm input[name='actualLoadMoney']").val();//实际贷款额
        var customerRate = $(".carinfoForm input[name='customerRate']").val();//客户费率
        var newOrOld = $(".carinfoForm select[name='newOrOld']").val();//是否新车
        var cfProductId = $(".carinfoForm select[name='cfProductId']").val();//产品id
        var loanPeriodMonthCode = $(".carinfoForm select[name='loanPeriodMonthCode']").val();//年限

        var actualFirstPay = $(".carinfoForm input[name='actualFirstPay']").val();
        var actualFirstPayRatio = $(".carinfoForm input[name='actualFirstPayRatio']").val();
        var actualLoanRatio = $(".carinfoForm input[name='actualLoanRatio']").val();
        var installmentPayMoney = $(".carinfoForm input[name='installmentPayMoney']").val();
        var installmentPayRatio = $(".carinfoForm input[name='installmentPayRatio']").val();
        var installmentPayPoundage = $(".carinfoForm input[name='installmentPayPoundage']").val();
        var bankRate = $(".carinfoForm input[name='bankRate']").val();
        var contractPrice = $(".carinfoForm input[name='contractPrice']").val();
        var contractPriceRatio = $(".carinfoForm input[name='contractPriceRatio']").val();
        var repayMonth = $(".carinfoForm input[name='repayMonth']").val();
        var firstRepay = $(".carinfoForm input[name='firstRepay']").val();
        var contractCarPrice = $(".carinfoForm input[name='contractCarPrice']").val();
        var insuranceFee = $(".carinfoForm input[name='insuranceFee']").val();
        var configTaxFee = $(".carinfoForm input[name='configTaxFee']").val();
        var totalFee = $(".carinfoForm input[name='totalFee']").val();

        //var carProduceArea = $(".carinfoForm select[name='carProduceArea']").val();
        var carBrandId = $("#carNoId").val();
        var seats = $(".carinfoForm input[name='seats']").val();
        var initRegisterDate = $(".carinfoForm input[name='initRegisterDate']").val();
        var vinNo = $(".carinfoForm input[name='vinNo']").val();
        var olderCarEvaluation = $(".carinfoForm input[name='olderCarEvaluation']").val();
        var driverLicneseOwner = $(".carinfoForm input[name='driverLicneseOwner']").val();
        var board = $(".carinfoForm select[name='board']").val();
        var remark = $(".carinfoForm textarea[name='remark']").val();

        carInfo.id = id;
        carInfo.bankId = bankId;
        carInfo.carLicenseProvince = province;
        carInfo.auditCarPrice = auditCarPrice;
        carInfo.actualLoadMoney = actualLoadMoney;
        carInfo.customerRate = customerRate;
        carInfo.newOrOld = newOrOld;
        carInfo.cfProductId = cfProductId;
        carInfo.loanPeriodMonthCode = loanPeriodMonthCode;
        carInfo.actualFirstPay = actualFirstPay;
        carInfo.actualFirstPayRatio = actualFirstPayRatio;
        carInfo.actualLoanRatio = actualLoanRatio;
        carInfo.installmentPayMoney = installmentPayMoney;
        carInfo.installmentPayRatio = installmentPayRatio;
        carInfo.installmentPayPoundage = installmentPayPoundage;
        carInfo.bankRate = bankRate;
        carInfo.contractPrice = contractPrice;
        carInfo.insuranceFee = insuranceFee;
        carInfo.configTaxFee = configTaxFee;
        carInfo.totalFee = totalFee;
        carInfo.contractPriceRatio = contractPriceRatio;
        carInfo.repayMonth = repayMonth;
        carInfo.firstRepay = firstRepay;
        carInfo.contractCarPrice = contractCarPrice;
        //carInfo.carProduceArea = carProduceArea;
        carInfo.carBrandId = carBrandId;
        carInfo.seats = seats;
        carInfo.vinNo = vinNo;
        carInfo.initRegisterDate = new Date(initRegisterDate);
        carInfo.olderCarEvaluation = olderCarEvaluation;
        carInfo.driverLicneseOwner = driverLicneseOwner;
        carInfo.board = board;
        carInfo.remark = remark;
        param.carInfo = carInfo;
        var cfAdvancePayment = {};
        cfAdvancePayment.id = $(".advanceForm input[name='id']").val();
        cfAdvancePayment.homeVisit = $(".advanceForm select[name='homeVisit']").val();
        cfAdvancePayment.gpsInstallNumber = $(".advanceForm select[name='gpsInstallNumber']").val();
        cfAdvancePayment.insuranceMethodCode = $(".advanceForm select[name='insuranceMethodCode']").val();
        cfAdvancePayment.promotion = $(".advanceForm select[name='promotion']").val();
        cfAdvancePayment.collectMoneyCompany = $(".advanceForm input[name='collectMoneyCompany']").val();
        cfAdvancePayment.billCompany = $(".advanceForm input[name='billCompany']").val();
        cfAdvancePayment.bank = $(".advanceForm input[name='bank']").val();
        cfAdvancePayment.account = $(".advanceForm input[name='account']").val();
        cfAdvancePayment.balanceMethod = $(".advanceForm select[name='balanceMethod']").val();
        cfAdvancePayment.moneyAmount = $(".advanceForm input[name='moneyAmount']").val();
        cfAdvancePayment.highInterest = $(".advanceForm input[name='highInterest']").val();
        cfAdvancePayment.agreeEnsureMoney = $(".advanceForm input[name='agreeEnsureMoney']").val();
        cfAdvancePayment.channelEnsureMoney = $(".advanceForm input[name='channelEnsureMoney']").val();
        cfAdvancePayment.licensePlateEnsureMoney = $(".advanceForm input[name='licensePlateEnsureMoney']").val();
        cfAdvancePayment.poundage = $(".advanceForm input[name='poundage']").val();
        cfAdvancePayment.amountMoney = $(".advanceForm input[name='amountMoney']").val();
        cfAdvancePayment.serviceFee = $(".advanceForm input[name='serviceFee']").val();

        param.cfAdvancePayment = cfAdvancePayment;
        loadingShow();
        $.ajax({
            url: ctx + url,
            type: "post",
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json",
            success: function (reslut) {
                loadingHide();
                if (reslut.error == 1) {
                    successMsg(reslut.message, function () {
                        if (type == 'submit') {
                            closeTabForParent(ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + acceptId);
                        } else {
                            window.location.reload();
                        }
                    });
                    return
                } else {
                    faildMsg(reslut.message);
                }
            }, error: function (result) {
                faildMsg(result);
            }
        });
    }

    function showOldCar(result) {
        var $parentDiv = $(".carinfoForm select[name='newOrOld']").parent().parent().parent();
        var html = '<div class="m-rl-tb row oldCar">' +
            '<label class="col-md-1 control-label"><span style="color:red">*</span>车架号:</label>' +
            '<div class="col-md-2"><input type="text" value="' + result["vinNo"] + '" id="vinNo" name="vinNo" class="form-control" tip="请输入正确的车架号" obj="not_null" onKeyup="return inputSapceTrim(event,this);"></div>' +
            '<label class="col-md-1 control-label"><span style="color:red">*</span>二手车登记日期:</label>';
        if (result["initRegisterDateStr"] != null && result["initRegisterDateStr"] != '') {
            html += '<div class="col-md-2"><input type="text" value="' + result["initRegisterDateStr"] + '" id="initRegisterDate" name="initRegisterDate" class="form-control" tip="请输入正确的二手车登记日期" obj="not_null" readonly></div>';
        } else {
            html += '<div class="col-md-2"><input type="text" value="" id="initRegisterDate" name="initRegisterDate" class="form-control" tip="请输入正确的二手车登记日期" obj="not_null" readonly></div>';
        }
        html += '<label class="col-md-1 control-label">初始评估价(元):</label>' +
            '<div class="col-md-2"><input type="text" name="initEvaluatePrice" value=""  class="form-control" tip="请输入正确的初始评估价" obj="not_null" readonly></div>' +
            '<label class="col-md-1 control-label">车300评估价(元):</label>' +
            '<div class="col-md-2"><input type="text" name="evaluate300Price" value="" class="form-control" tip="请输入正确的车300评估价" readonly></div>' +
            '</div>';
        $parentDiv.after(html);
        initOlderCarRegisterEvent();
        $(".carinfoForm input[name='vinNo']").trigger("change");
    }

    function changeNewOROld() {
        //车辆类型切换：二手车时添加一条
        $(".carinfoForm select[name='newOrOld']").on("change", function () {
            var v = $(this).val();
            if (v == '') {
                return;
            }
            var $parentDiv = $(this).parent().parent().parent();
            var html = '<div class="m-rl-tb row oldCar">' +
                '<label class="col-md-1 control-label"><span style="color:red">*</span>车架号:</label>' +
                '<div class="col-md-2"><input type="text" value="" id="vinNo" name="vinNo" class="form-control" tip="请输入正确的车架号" obj="not_null" onKeyup="return inputSapceTrim(event,this);"></div>' +
                '<label class="col-md-1 control-label"><span style="color:red">*</span>二手车登记日期:</label>' +
                '<div class="col-md-2"><input type="text" value="" id="initRegisterDate" name="initRegisterDate" class="form-control" tip="请输入正确的二手车登记日期" obj="not_null" readonly></div>' +
                '<label class="col-md-1 control-label">初始评估价(元):</label>' +
                '<div class="col-md-2"><input type="text" name="initEvaluatePrice" value=""  class="form-control" tip="请输入正确的初始评估价" obj="not_null" readonly></div>' +
                '<label class="col-md-1 control-label">车300评估价(元):</label>' +
                '<div class="col-md-2"><input type="text" name="evaluate300Price" value="" class="form-control" tip="请输入正确的车300评估价" readonly></div>' +
                '</div>';
            if (v == 0) {
                if ($(".carinfoForm .oldCar").length == 0) {
                    $parentDiv.after(html);

                    initOlderCarRegisterEvent();
                }
            } else {
                $(".carinfoForm .oldCar").remove();
            }
        });
    }

    function initOlderCarRegisterEvent() {
        $(".carinfoForm input[name='vinNo']").on("change", function () {
            var v = $(this).val();
            var bankId = $(".carinfoForm input[name='bankId']").val();
            if (v == '' || v == undefined || bankId == undefined || bankId == '' || acceptId == '' || acceptId == undefined) {
                return;
            }
            $.ajax({
                url: ctx + "/cfBusinessOrderAccept/getByVin.action",
                type: "post",
                data: {vin: v, bankId: bankId, acceptId: acceptId, forbidden: 0},
                dataType: "json",
                success: function (data) {
                    if (data.error == 1 && data.rows != null) {
                        var d = data.rows;
                        $(".carinfoForm input[name='initRegisterDate']").val(d.initRegisterDateStr);
                        $(".carinfoForm input[name='initEvaluatePrice']").val(d.initEvaluatePrice);
                        $(".carinfoForm input[name='evaluate300Price']").val(d.evaluate300Price);
                    } else {
                        $(".carinfoForm input[name='initRegisterDate']").val('');
                        $(".carinfoForm input[name='initEvaluatePrice']").val('');
                        $(".carinfoForm input[name='evaluate300Price']").val('');
                        faildMsg(data.message);
                    }
                }
            });

        });
    };


    function initTelAreaEvent(containerId) {
        //手机号归属地获取
        $(containerId).find("input[name='tel']").on("change", function () {
            var tel = $.trim($(this).val());
            if (tel == '') {
                return;
            }
            dataProxy.getTelAddress(tel, true, function (data) {
                $(containerId).find("input[name='telArea']").val(data);
            });
        });
    }

    //经销商点击事件
    $("select[name='carDealerId']").on("change", function () {
        var id = $(this).val();
        if (id === '' || id == undefined) {
            return;
        }
        $.ajax({
            type: "post",
            url: ctx + "/dealerManage/getDealer.action",
            data: {id: id},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    $("input[name='bank']").val(data.bankName);
                    $("input[name='account']").val(data.bankAccount);
                } else {
                    faildMsg(result.message);
                }
            }
        });

    });
});


function validForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == "" || $(lableId).val() == null) {
            $(lableId).parent().attr('tip', '请输入正确的担保人。').addClass("input_validation-failed");
            return "faild";
        }
        return "success";
    }
}

function checkLen(maxLen, obj) {
    if ($(obj).val().length > maxLen) {
        return
    } else {
        $(obj).next(".textarea-tip").find(".count").html($(obj).val().length);
        $(obj).next(".textarea-tip").find(".remainCount").html(maxLen - $(obj).val().length)
    }
}

//表单校验
function validSelect(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "carDealer") {
                $(lableId).parent().attr('tip', '请输入正确的经销商。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "sex") {
                $(lableId).parent().attr('tip', '请输入正确的购车人性别。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "sharedType") {
                $(lableId).parent().attr('tip', '请输入正确的共还人类别。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "marriedCode") {
                $(lableId).parent().attr('tip', '请输入正确的婚姻状态。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "sysFlexKeyCode") {
                $(lableId).parent().attr('tip', '请输入正确的学历。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "companyTypeCode") {
                $(lableId).parent().attr('tip', '请输入正确的单位类型。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "jobTypeCode") {
                $(lableId).parent().attr('tip', '请输入正确的职务类别。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "jobCode") {
                $(lableId).parent().attr('tip', '请输入正确的职务。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "runingPeriodCode") {
                $(lableId).parent().attr('tip', '请输入正确的经营期限。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "employedPeriodCode") {
                $(lableId).parent().attr('tip', '请输入正确的工龄。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "relationBuyerCode") {
                $(lableId).parent().attr('tip', '请输入正确的与购车人关系。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "housePropertyCode") {
                $(lableId).parent().attr('tip', '请输入正确的房屋性质。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "relationTypeCode1" || $(lableId).attr("id") == "relationTypeCode2") {
                $(lableId).parent().attr('tip', '请输入正确的关系。').addClass("input_validation-failed");
                return "faild";
                /*}else if ($(lableId).attr("id") == "carProduceArea") {
                    $(lableId).parent().attr('tip', '请输入正确的车辆类型。').addClass("input_validation-failed");
                    return "faild";
                } else if ($(lableId).attr("id") == "carBrandId") {
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
            }
            return "success";
        }
        return "success";
    }
}

//补录配偶、补录担保人
function toBuyer(acceptId, userType) {
    window.location.href = ctx + "/cfBuyerInfo/list.action?acceptId=" + acceptId + "&userType=" + userType;
}

//互换购车人与担保人
function changeBuyerAndSponsor(acceptId) {
    confirmDialog("您确定要互换购车人与担保人信息？", function () {
        var options = {
            width: 350,
            top: 200,
            height: 145,
            overlay: true,
            dispose: true,
            move: true,
            title: "互换购车人与担保人",
            onBeforeShow: function () {
                $(".chosen-select").chosen({
                    disable_search_threshold: 8,
                    no_results_text: "没有找到",
                    allow_single_deselect: true,
                    width: "100%"
                });
            },
            callback: function () {
                if ($("#changForm").valid("changForm")) {
                    var param = {};
                    param.id = $('input[name="acceptId"]').val();
                    param.sponsorId = $('select[name="buyerId"]').val();
                    param.source = "buyerAndSponsor";
                    var buyers = new Array();
                    $(".buyerDiv").find("div.form-horizontal").each(function () {
                        var sponsor = {};
                        sponsor.id = $(this).find("input[name='id']").val();
                        sponsor.userType = $(this).find("input[name='userType']").val();
                        sponsor.sex = $(this).find("select[name='sex']").val();
                        sponsor.sysFlexKeyCode = $(this).find("select[name='sysFlexKeyCode']").val();
                        sponsor.cardNo = $(this).find("input[name='cardNo']").val();
                        sponsor.cardArea = $(this).find("input[name='cardArea']").val();
                        sponsor.province = $(this).find("input[name='province']").val();
                        sponsor.tel = $(this).find("input[name='tel']").val();
                        sponsor.telArea = $(this).find("input[name='telArea']").val();
                        sponsor.married = $(this).find("select[name='married']").val();
                        sponsor.currentAddress = $(this).find("input[name='currentAddress']").val();
                        sponsor.phone = $(this).find("input[name='phone']").val();
                        sponsor.familyAddress = $(this).find("input[name='familyAddress']").val();
                        sponsor.houseAddress = $(this).find("input[name='houseAddress']").val();
                        sponsor.houseOwner = $(this).find("input[name='houseOwner']").val();
                        sponsor.relationBuyerCode = $(this).find("select[name='relationBuyerCode']").val();
                        sponsor.housePropertyCode = $(this).find("select[name='housePropertyCode']").val();
                        sponsor.houseSpace = $(this).find("input[name='houseSpace']").val();
                        sponsor.currentPrice = $(this).find("input[name='currentPrice']").val();
                        sponsor.loanMoney = $(this).find("input[name='loanMoney']").val();
                        sponsor.loanPeriodMonthCode = $(this).find("input[name='loanPeriodMonthCode']").val();
                        sponsor.repayAmountMonth = $(this).find("input[name='repayAmountMonth']").val();
                        sponsor.companyName = $(this).find("input[name='companyName']").val();
                        sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
                        sponsor.jobTypeCode = $(this).find("select[name='jobTypeCode']").val();
                        sponsor.jobCode = $(this).find("select[name='jobCode']").val();
                        sponsor.runingPeriodCode = $(this).find("select[name='runingPeriodCode']").val();
                        sponsor.monthIncome = $(this).find("input[name='monthIncome']").val();
                        sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
                        sponsor.companyTypeCode = $(this).find("select[name='companyTypeCode']").val();
                        sponsor.employedPeriodCode = $(this).find("select[name='employedPeriodCode']").val();
                        sponsor.stockRatio = $(this).find("input[name='stockRatio']").val();
                        sponsor.companyTel = $(this).find("input[name='companyTel']").val();
                        sponsor.remark = $.trim($(this).find("textarea[name='remark']").val());

                        //紧急联系人
                        var contacts = new Array();
                        var $contactForm = $(this).find('div.contracter');
                        $($contactForm).each(function () {
                            var contact = {};
                            contact.id = $(this).find("input[name='id']").val();
                            contact.realName = $(this).find("input[name='realName']").val();
                            contact.phone = $(this).find("input[name='phone']").val();
                            contact.tel = $(this).find("input[name='tel']").val();
                            contact.relationTypeCode = $(this).find("select[name='relationTypeCode']").val();
                            contacts.push(contact);
                        });
                        sponsor.contactPersonEntities = contacts;
                        buyers.push(sponsor);
                    });
                    param.cfBuyerInformationVOS = buyers;
                    $.ajax({
                        type: "post",
                        url: ctx + "/cfBuyerInfo/changeBuyer.action",
                        data: JSON.stringify(param),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (result) {
                            loadingHide();
                            if (result.error == 1) {
                                successMsg(result.message, function () {
                                    window.location.reload();
                                });
                            } else {
                                faildMsg(result.message);
                            }
                        }, error: function (result) {
                            faildMsg("请求异常：" + result.status + "");
                        }
                    });
                } else {
                    return false;
                }
            }
        };

        new Dialog("#form-chang-dialog", options).show();

    });
}

//互换配偶与担保人
function changeSharedAndSponsor(acceptId) {
    confirmDialog("您确定要互换配偶与担保人信息？", function () {
        var options = {
            width: 350,
            top: 200,
            height: 145,
            overlay: true,
            dispose: true,
            move: true,
            title: "互换配偶与担保人",
            onBeforeShow: function () {
                $(".chosen-select").chosen({
                    disable_search_threshold: 8,
                    no_results_text: "没有找到",
                    allow_single_deselect: true,
                    width: "100%"
                });
            },
            callback: function () {
                if ($("#changForm").valid("changForm")) {
                    var param = {};
                    param.id = $('input[name="acceptId"]').val();
                    param.sponsorId = $('select[name="buyerId"]').val();
                    param.source = "sharedAndSponsor";
                    var buyers = new Array();
                    $(".buyerDiv").find("div.form-horizontal").each(function () {
                        var sponsor = {};
                        sponsor.id = $(this).find("input[name='id']").val();
                        sponsor.userType = $(this).find("input[name='userType']").val();
                        sponsor.sex = $(this).find("select[name='sex']").val();
                        sponsor.sysFlexKeyCode = $(this).find("select[name='sysFlexKeyCode']").val();
                        sponsor.cardNo = $(this).find("input[name='cardNo']").val();
                        sponsor.cardArea = $(this).find("input[name='cardArea']").val();
                        sponsor.province = $(this).find("input[name='province']").val();
                        sponsor.tel = $(this).find("input[name='tel']").val();
                        sponsor.telArea = $(this).find("input[name='telArea']").val();
                        sponsor.married = $(this).find("select[name='married']").val();
                        sponsor.currentAddress = $(this).find("input[name='currentAddress']").val();
                        sponsor.phone = $(this).find("input[name='phone']").val();
                        sponsor.familyAddress = $(this).find("input[name='familyAddress']").val();
                        sponsor.houseAddress = $(this).find("input[name='houseAddress']").val();
                        sponsor.houseOwner = $(this).find("input[name='houseOwner']").val();
                        sponsor.relationBuyerCode = $(this).find("select[name='relationBuyerCode']").val();
                        sponsor.housePropertyCode = $(this).find("select[name='housePropertyCode']").val();
                        sponsor.houseSpace = $(this).find("input[name='houseSpace']").val();
                        sponsor.currentPrice = $(this).find("input[name='currentPrice']").val();
                        sponsor.loanMoney = $(this).find("input[name='loanMoney']").val();
                        sponsor.loanPeriodMonthCode = $(this).find("input[name='loanPeriodMonthCode']").val();
                        sponsor.repayAmountMonth = $(this).find("input[name='repayAmountMonth']").val();
                        sponsor.companyName = $(this).find("input[name='companyName']").val();
                        sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
                        sponsor.jobTypeCode = $(this).find("select[name='jobTypeCode']").val();
                        sponsor.jobCode = $(this).find("select[name='jobCode']").val();
                        sponsor.runingPeriodCode = $(this).find("select[name='runingPeriodCode']").val();
                        sponsor.monthIncome = $(this).find("input[name='monthIncome']").val();
                        sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
                        sponsor.companyTypeCode = $(this).find("select[name='companyTypeCode']").val();
                        sponsor.employedPeriodCode = $(this).find("select[name='employedPeriodCode']").val();
                        sponsor.stockRatio = $(this).find("input[name='stockRatio']").val();
                        sponsor.companyTel = $(this).find("input[name='companyTel']").val();
                        sponsor.remark = $.trim($(this).find("textarea[name='remark']").val());

                        //紧急联系人
                        var contacts = new Array();
                        var $contactForm = $(this).find('div.contracter');
                        $($contactForm).each(function () {
                            var contact = {};
                            contact.id = $(this).find("input[name='id']").val();
                            contact.realName = $(this).find("input[name='realName']").val();
                            contact.phone = $(this).find("input[name='phone']").val();
                            contact.tel = $(this).find("input[name='tel']").val();
                            contact.relationTypeCode = $(this).find("select[name='relationTypeCode']").val();
                            contacts.push(contact);
                        });
                        sponsor.contactPersonEntities = contacts;
                        buyers.push(sponsor);
                    });
                    param.cfBuyerInformationVOS = buyers;
                    $.ajax({
                        type: "post",
                        url: ctx + "/cfBuyerInfo/changeBuyer.action",
                        data: JSON.stringify(param),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (result) {
                            loadingHide();
                            if (result.error == 1) {
                                successMsg(result.message, function () {
                                    window.location.reload();
                                });
                            } else {
                                faildMsg(result.message);
                            }
                        }, error: function (result) {
                            faildMsg("请求异常：" + result.status + "");
                        }
                    });
                } else {
                    return false;
                }
            }
        };

        new Dialog("#form-chang-dialog", options).show();

    });
}

//互换配偶
function changeBuyer(acceptId) {
    confirmDialog("您确定要互换配偶信息？", function () {
        var param = {};
        param.id = $('input[name="acceptId"]').val();
        var buyers = new Array();

        $(".buyerDiv").find("div.form-horizontal").each(function () {
            if ($(this).find("input[name='userType']").val() != 'BUYER' && $(this).find("input[name='userType']").val() != 'SHARED') {
                return;
            }
            var sponsor = {};
            sponsor.id = $(this).find("input[name='id']").val();
            sponsor.userType = $(this).find("input[name='userType']").val();
            sponsor.sex = $(this).find("select[name='sex']").val();
            sponsor.sysFlexKeyCode = $(this).find("select[name='sysFlexKeyCode']").val();
            sponsor.cardNo = $(this).find("input[name='cardNo']").val();
            sponsor.cardArea = $(this).find("input[name='cardArea']").val();
            sponsor.province = $(this).find("input[name='province']").val();
            sponsor.tel = $(this).find("input[name='tel']").val();
            sponsor.telArea = $(this).find("input[name='telArea']").val();
            sponsor.married = $(this).find("select[name='married']").val();
            sponsor.currentAddress = $(this).find("input[name='currentAddress']").val();
            sponsor.phone = $(this).find("input[name='phone']").val();
            sponsor.familyAddress = $(this).find("input[name='familyAddress']").val();
            sponsor.houseAddress = $(this).find("input[name='houseAddress']").val();
            sponsor.houseOwner = $(this).find("input[name='houseOwner']").val();
            sponsor.relationBuyerCode = $(this).find("select[name='relationBuyerCode']").val();
            sponsor.housePropertyCode = $(this).find("select[name='housePropertyCode']").val();
            sponsor.houseSpace = $(this).find("input[name='houseSpace']").val();
            sponsor.currentPrice = $(this).find("input[name='currentPrice']").val();
            sponsor.loanMoney = $(this).find("input[name='loanMoney']").val();
            sponsor.loanPeriodMonthCode = $(this).find("input[name='loanPeriodMonthCode']").val();
            sponsor.repayAmountMonth = $(this).find("input[name='repayAmountMonth']").val();
            sponsor.companyName = $(this).find("input[name='companyName']").val();
            sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
            sponsor.jobTypeCode = $(this).find("select[name='jobTypeCode']").val();
            sponsor.jobCode = $(this).find("select[name='jobCode']").val();
            sponsor.runingPeriodCode = $(this).find("select[name='runingPeriodCode']").val();
            sponsor.monthIncome = $(this).find("input[name='monthIncome']").val();
            sponsor.companyAddress = $(this).find("input[name='companyAddress']").val();
            sponsor.companyTypeCode = $(this).find("select[name='companyTypeCode']").val();
            sponsor.employedPeriodCode = $(this).find("select[name='employedPeriodCode']").val();
            sponsor.stockRatio = $(this).find("input[name='stockRatio']").val();
            sponsor.companyTel = $(this).find("input[name='companyTel']").val();
            sponsor.remark = $.trim($(this).find("textarea[name='remark']").val());

            //紧急联系人
            var contacts = new Array();
            var $contactForm = $(this).find('div.contracter');
            $($contactForm).each(function () {
                var contact = {};
                contact.id = $(this).find("input[name='id']").val();
                contact.realName = $(this).find("input[name='realName']").val();
                contact.phone = $(this).find("input[name='phone']").val();
                contact.tel = $(this).find("input[name='tel']").val();
                contact.relationTypeCode = $(this).find("select[name='relationTypeCode']").val();
                contacts.push(contact);
            });
            sponsor.contactPersonEntities = contacts;
            buyers.push(sponsor);
        });

        param.cfBuyerInformationVOS = buyers;
        loadingShow();
        $.ajax({
            type: "post",
            url: ctx + "/cfBuyerInfo/changeBuyer.action",
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                loadingHide();
                if (result.error == 1) {
                    successMsg(result.message, function () {
                        window.location.reload();
                    });
                } else {
                    faildMsg(result.message);
                }
            }, error: function (result) {
                faildMsg("请求异常：" + result.status + "");
            }
        });
    });
}
