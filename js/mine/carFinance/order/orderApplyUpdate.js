jQuery(function ($) {
    var buyerId = $("#buyerId").val();//购车人编号
    var orderId = $("#orderId").val(); //订单编号
    var haveShared = $("#haveShared").val();  //是否有配偶
    var bankId = $("#bankNameId").val();//征信下面的贷款银行id
    var productId = $("#productId").val();//车辆信息下的产品类型id
    //var category =$("#newOrOldId").val();//车辆信息下的车辆类型id
    var carProductAreaId =$("#carProductAreaId").val() //车辆信息下的车辆类型id
    var flag = true;
    var sharedTypeFlag=true;
    var init = true;
    var initFlag = true;
    var modules = HYCarFinance.config.getAllModel();

    //查询订单修改获取担保人配置项
    function getSpecialModules() {
    	var moduleValue='';
        $.ajax({
            url: ctx + "/cfOrderApplyModify/getSpecialModule.action",
            type: "post",
            data: {
                orderId: orderId,
                buyerId: buyerId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var option = "";
                    var items = data["rows"];
                    var sponsorsModule = items["sponsors"];
                    var contactorsModule = items["contactors"];
                    for (var i = 0; i < sponsorsModule.length; i++) {
                        if (sponsorsModule[i]["name"]) {
                            option += "<option value='sponsorInfo' name='担保人(" + sponsorsModule[i]["name"] + ")' data-id='" + sponsorsModule[i]["id"] + "'>担保人(" + sponsorsModule[i]["name"] + ")</option>"
                        }
                    }
                    $("#module").append(option).trigger('chosen:updated').chosen({
                        disable_search_threshold: 10,
                        no_results_text: '无数据',
                        width: '100%'
                    }).on('change', function (e, param) {
                        moduleValue= param["selected"];
                        emptyNewinput();
                        setDefaultSelectItem (moduleValue,contactorsModule);
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    //申请修改
    $(".request-update-btn").on("click", function () {
    	var sponsorId='';
    	var bussinessId='';
    	var moduleValue='';
    	var options = {
            width: 500,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增修改内容',
            onBeforeShow: function () {
                //展示固定配置项
                setDefaultModule(haveShared);
                //获取版块特殊配置项
                getSpecialModules();
            },
            onAfterShow: function () {
            	$("#project-select").chosen().on('change', function (e, param) {
            		moduleValue = $("#module").find("option:selected").val();
            		bussinessId =  $("#module").find("option:selected").data("id");
            		var  tagConfig ='';
            		sponsorId = $("#project-select").find("option:selected").data("id");
            		if(bussinessId){//如果选中为担保人版块，传担保人id
            			setDefaultValue(moduleValue, param["selected"], bussinessId);
            		}else if(sponsorId){//如果选中为购车人版块且紧急联系人项目，传紧急联系人id
            			setDefaultValue(moduleValue, param["selected"], sponsorId);
            		}else{
            			setDefaultValue(moduleValue, param["selected"], null);
            		}
                    //初始化新值组件
                    tagConfig = getModelConfig(moduleValue, param["selected"]);
                    if (tagConfig != '' && tagConfig != null && tagConfig != undefined) {
                        setNewValModel(tagConfig);
                    } else {
                        return
                    }
                });
                $(".dialog-container").bind("click", function () {
                    $(".laydate_box").hide();
                });
            },
            onAfterHide: function () {
                $(".provinceCityAll").hide()
            },
            callback: function () {
                var newValLength = $("#newVal").find('.col-xs-9').children('input').length;
                var townAddress = $("#newVal").find('.col-xs-9').children('input').eq(0).val();
                var detailAddress = $("#newVal").find('.col-xs-9').children('input').eq(1).val();
                var address = townAddress + '-' + detailAddress;
                var newValue ='';
                if(newValLength > 1){
                	newValue = address
                }else{
                	if($("#carBrandId").length > 0){
                		newValue = $("#carNoId").val();
                	}else{
                		newValue = $("#newVal").find('.col-xs-9').find(".form-control").val()
                	}
                }
                if ($("#orderApplyUpdateForm").valid("orderApplyUpdateForm")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/cfOrderApplyModify/create.action",
                        type: "post",
                        data: {
                        	module: moduleValue,//所属版块
                            moduleDesc: $("#module").find("option:selected").attr('name'),//所属版块描述
                            bussinessId: bussinessId,//担保人id
                            sponsorId:sponsorId,//紧急联系人id
                            item: $("#project-select").find("option:selected").val(),//所属项目
                            itemDesc: $("#project-select").find("option:selected").attr('name'),//所属项目描述
                            oldValue: $("#oldVal").val(),//原值
                            newValue: newValue,//新值
                            newValueDesc: $("#newVal").find('.col-xs-9').find("option:selected").attr('name') || $("#newVal").find('.col-xs-9').find(".form-control").val() || address ,//新值描述
                            modifyReason: $("#modifyReason").val(),//修改原因
                            bussinessOrderId: orderId //订单id
                        },
                        dataType: 'json',
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("新增成功！", 1000, function () {
                                    window.location.href = ctx + "/cfOrderApplyModify/orderApplyAlter.action?id=" + orderId + "&buyerId=" + buyerId;
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
    	var creatDlg = new Dialog("#orderApply-dialog", options);
    	creatDlg.show();
    });
  //清空新值框
    function emptyNewinput(){
    	 var html = '<label class="col-xs-2 control-label"><span class="red">*</span>新值:</label>' +
         '<div class="col-xs-9">' +
         '<input type="text" class="form-control" obj="not_null" tip="新值不能为空">' +
         '</div>';
     $("#newVal").html(html);
    }
    //设置默认项目配置
    function setDefaultModule(haveShared) {
        if (!haveShared) {
        	if (initFlag) {
        		modules.splice(3, 1);
        		initFlag=false;
        	}
        }
        var option = '<option value="">请选择</option>';
        for (var i = 0; i < modules.length; i++) {
        	if(modules[i].display==true){
        		option += "<option name='" + modules[i]["des"] + "' value='" + modules[i]["name"] + "'>" + modules[i]["des"] + "</option>";
        	}
        }
        $("#module").empty().html(option).val('').trigger('chosen:updated');
    }

    //根据选择版块加载项目
    function setDefaultSelectItem(moduleValue, data) {
    	 var items = null;
    	 var option = '';
        //构造项目组件数据
        if (moduleValue == "sponsorInfo") {
            items = HYCarFinance.config.getItemObject("buyerInfo");
            if(sharedTypeFlag){
                items.splice(2,   0,{
                    name:"sharedType",
                    desc:"共还人类别"
                })
                sharedTypeFlag = false;
            }
        } else {
            items = HYCarFinance.config.getItemObject(moduleValue);
        }
        if (moduleValue == "carInfo") {
            if (flag) {
            	items.splice(0, 1);
                items.splice(7, 1);
            	items.splice(10, 12);
                flag = false;
            }
        }
       if (moduleValue == "oldwolfApply") {
            if (init) {
                items.splice(8, 1);
            	init = false;
            }
        }
        option = '<option value="">请选择</option>';
        for (var i = 0; i < items.length; i++) {
            option += "<option value='" + items[i]["name"] + "' name='" + items[i]["desc"] + "'>" + items[i]["desc"] + "</option>";
        }
        if(moduleValue == "buyerInfo"){
            for (var i = 0; i < data.length; i++) {
  	          if (data[i]["name"]) {
  	              option += "<option value='realName' name='紧急联系人(" + data[i]["name"] + ")姓名' data-id='" + data[i]["id"] + "'>紧急联系人(" + data[i]["name"] + ")姓名</option>"+
  	              				   "<option value='tel' name='紧急联系人(" + data[i]["name"] + ")手机' data-id='" + data[i]["id"] + "'>紧急联系人(" + data[i]["name"] + ")手机</option>"+
  	              				   "<option value='phone' name='紧急联系人(" + data[i]["name"] + ")电话' data-id='" + data[i]["id"] + "'>紧急联系人(" + data[i]["name"] + ")电话</option>"+
  	              				   "<option value='relationTypeCode' name='与紧急联系人(" + data[i]["name"] + ")关系' data-id='" + data[i]["id"] + "'>与紧急联系人(" + data[i]["name"] + ")关系</option>";
  	          }
  	      }
        }
        //清空（项目、原值、新值、修改原因）
        $("#oldVal, #modifyReason").val('');
        $("#project-select").html(option).val('').trigger('chosen:updated');
    }

    //设置原值
    function setDefaultValue(moduleValue, item, dataId) {
        //清空（项目、原值、新值、修改原因）
    	emptyNewinput();
        $("#oldVal, #modifyReason").val('');
        //获取原值（新值组件初始化）
        $.ajax({
            url: ctx + "/cfOrderApplyModify/getOldValue.action",
            type: "post",
            async: false,
            data: {
                bussinessOrderId: orderId,
                buyerId: buyerId,
                bussinessId: dataId,
                module: moduleValue,
                item: item
            },
            dataType: 'json',
            success: function (data) {
                if (data.error == 1) {
                    $("#oldVal").val(data.rows).attr("title",data.rows);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function setNewValModel(tagConfig) {
        $("#newVal").empty();
        tagConfig["title"] = "新值";
        tagConfig["required"] = true;
        tagConfig["checked"] = true;
        tagConfig["readonly"] = false;
        tagConfig["textClass"] = 'col-xs-9';
        tagConfig["labelClass"] = 'col-xs-2';
        if (tagConfig["xtype"] == 'textarea') {
            tagConfig["xtype"] = 'text';
            tagConfig["fTip"] = '';
            tagConfig["checkLen"] = ''
        }
        if (tagConfig["xtype"] == 'select') {
        	tagConfig["checkObj"] = "";
            tagConfig["checkFn"] = 'validSelect(this)';
            if (tagConfig.name != 'loanBank' && tagConfig.name != 'dealerName') {
                tagConfig["name"] = "selectChosen";
            }else if(tagConfig.id == 'loanBank' || tagConfig.id == 'dealerName' && tagConfig.url){
            	setNewItem(tagConfig);
            }
        } else if (tagConfig["xtype"] == 'text') {
        	if(tagConfig.id=='cardNo'){
        		 tagConfig["checkObj"] = 'idCard';
        		 tagConfig['maxlength'] =18;
            }
            if (!tagConfig["checkObj"] && !tagConfig["checkReg"]) {
                tagConfig["checkObj"] = "not_null";
            }
        }
        if(!tagConfig['id']){
        	tagConfig['id']='newItem';
        }
            $("#newVal").empty();
            new HYCarFinance.form({//新值
                id: '#newVal',
                items: [tagConfig]
            });
            if(tagConfig["xtype"] == 'select'){
              var options = "<option value=''>请选择</option>";
              if (tagConfig.id == 'loanPeriodMonthCode') { //选中为车辆信息下的 年限时，需根据征信下的贷款银行和车辆信息下的产品类型进行获取数据
                  initProduct(bankId, productId, function (data) {
                      for (var i = 0; i < data.length; i++) {
                          options += "<option value='" + data[i].yearsCodeName + "' name='" + data[i].yearsCode + "'>" + data[i].yearsCodeName + "</option>";
                      }
                      $("#loanPeriodMonthCode").empty().append(options).trigger('chosen:updated');
                  })
              }
              if (tagConfig.id == 'cfProductId') { //选中为车辆信息下的 产品类型时，需根据银行利率下的贷款银行进行获取数据
                    initProductType(bankId,function (data) {
                        for (var i = 0; i < data.length; i++) {
                            options += "<option value='" + data[i].id + "' name='" + data[i].productName + "'>" + data[i].productName + "</option>";
                        }
                        $("#cfProductId").empty().append(options).trigger('chosen:updated');
                    })
                }
              $("#"+tagConfig.id).trigger('chosen:updated');
            }
            if(tagConfig["xtype"] == 'connection'){
            	if (tagConfig.id == 'carBrandId') {
            		$("#carBrandId").on("click",function(){
            			$(this).next().find(".item-type").show();
            		});
            		$(".car-box .item-type p").on("click",function(){
                    	$(".car-box .item-series").show().find(".series").empty();
                    	$(".item-no").hide();
                    	$(this).addClass("active").siblings().removeClass("active");
                    	var brandNameMain = $(this).text();
                    	showSeries(brandNameMain);
                    })
            	}else if(tagConfig.id == 'carLicenseProvince'){
            		$("#carLicenseProvince").on("click",function(){
                        $(this).next().find(".item-type").children().removeClass("active");
            			$(this).next().find(".item-type").show();
            		});
            		$(".city-box .item-type p").on("click", function () {
                    	$(this).addClass("active").siblings().removeClass("active");
                    	$(".city-box .item-series").show().find(".series").empty();
                    	var provinceId = $(this).attr("data-type");
                    	var provinceName = $(this).text();
                    	showCity(provinceId,provinceName)
                    })
            	}
            }
            
            tagConfig={};
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
    
    function showSeries(brandNameMain){
    	loadingShow();
    	$.ajax({
    		url: ctx + "/cfCarBrand/getcarSerialBrandName.action",
            type: "post",
            data: {brandNameMain: brandNameMain },
            dataType: 'json',
            success: function (result) {
            	loadingHide();
            	var seriesHtml ='';
            	if (result.error == 1) {
            		for (var i = 0; i < result.rows.length; i++) {
                		var brandArr = result.rows[i].categoryStyle;
                		seriesHtml +='<div>'
                		seriesHtml += '<h5 id="' + result.rows[i].brandFirstNameType + '">' + result.rows[i].brandFirstName + '</h5>';
                		for (var j = 0; j < brandArr.length; j++) {
                			seriesHtml += '<p data-type="' + brandArr[j].carSerialSecondNameType + '">' + brandArr[j].carSerialSecondName + '</p>';
                		}
                		seriesHtml +='</div>'
                	}
            		$(".series").empty().append(seriesHtml);
            		clickSeries();
            	}
            }
    	})
    }
    
    function clickSeries(){
    	$(".item-series p").on("click",function(){//车系列点击事件
    		$(".item-no").show().find(".no").empty();
    		$(this).addClass("active").siblings().removeClass("active");
    		var carSerialFirst = $(this).parent().find("h5").text();
    		var carSerialSecond = $(this).text();
    		showNo(carSerialFirst, carSerialSecond)
    	})
    }
    
    function showNo(carSerialFirst, carSerialSecond){
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
            	var noHtml ='';
            	if (result.error == 1) {
            		for (var i = 0; i < result.rows.length; i++) {
            			var list = result.rows[i].list;
                		noHtml +='<div>'
                		noHtml += '<h5 id="' + result.rows[i].year + '">' + result.rows[i].year + '</h5>';
                		for (var j = 0; j < list.length; j++) {
                			noHtml += '<p data-type="' + list[j].brandNameType + '" data-id="'+list[j].id+'" title="' + list[j].brandName + '">' + list[j].brandName + '</p>';
                		}
                		noHtml +='</div>';
                	}
            		$(".no").empty().append(noHtml);
            		clickNo();
            	}
            }
    	})
    }
    
    function clickNo(){
    	$(".item-no p").on("click",function(){//车辆品牌点击事件，赋值
    		$(this).addClass("active").siblings().removeClass("active");
    		$("#carNoId").val($(this).attr("data-id"));
    		var carNoName = $(this).text();
    		$(".car-box .item").hide();
    		$("#carBrandId").val(carNoName).attr("title",carNoName).removeClass("input_validation-failed");
    	})
    }
    
    //根据贷款银行和产品类型加载年限
    function initProduct(bankId, cfProductId,callback) {
        if (cfProductId == "" || cfProductId == undefined) {
            return;
        }
        $.ajax({
            url: ctx + "/bankRate/listByProduct.action",
            type: "get",
            data: {bankId: bankId, productId: productId},
            dataType: "json",
            async:false,
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function initProductType(bankId,callback) {
        if (initProductType == "" || initProductType == undefined) {
            return;
        }
        $.ajax({
            url: ctx + "/bankRate/listByProductType.action",
            type: "get",
            data: {bankId: bankId},
            dataType: "json",
            async:false,
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    //根据车辆类型加载车辆品牌
    /*function initCarBrand(carProductAreaId, callback) {
    	if(carProductAreaId == "" || carProductAreaId == undefined){
    		return;
    	}
    	$.ajax({
            url: ctx + "/cfCarBrand/unForbbinBrandList.action",
            type: "get",
            async:false,
            data: {brandType: carProductAreaId},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    if (typeof(callback) === "function") {
                        callback(data);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }*/
    
    function setNewItem(tagConfig) {
        $("#newVal").empty();
        var html = "";
        html += '<label class="col-xs-2 control-label"><span style="color:red">*</span>新值:</label>';
        html += '<div class="col-xs-9"><div obj="" tip="新值不能为空">';

        html += '<select data-placeholder="选择..." class="chosen-select form-control" id="' + tagConfig.id + '"name="' + tagConfig.name + '" ' + tagConfig.readonly + ' check="validSelect(this)">'
        //设置“请选择”下拉值
        html += '<option value="" >请选择</option>';
        if (tagConfig.url) {
            $.ajax({
                url: tagConfig.url,
                type: "post",
                dataType: "json",
                success: function (result) {
                    if (result.error == 1) {
                        var record = result["rows"];
                        for (var n = 0; n < record.length; n++) {
                            if (tagConfig['id'] === 'dealerName') {
                                html += '<option value="' + record[n]['dealerName'] + '" >' + record[n]['dealerName'] + '</option>';
                            } else if (tagConfig['id'] === 'loanBank') {
                                html += '<option value="' + record[n]['bankName'] + '" name="' + record[n]['bankCode'] + '">' + record[n]['bankName'] + '</option>';
                            }
                        }
                        html += '</select></div></div>';
                        $("#newVal").html(html);
                        var config = {
                            disable_search_threshold: 10,
                            no_results_text: '无数据',
                            width: '100%'
                        }
                    }
                    $("#" + tagConfig.id).chosen(config);
                }
            });
        }
    }

    //根据模块与项目名称获取对应的配置对象
    function getModelConfig(modelVal, name) {
        if (modelVal == "baseInfo") {
            return getItemConfig(baseTag, name);
        } else if (modelVal == "creditInfo") {
            return getItemConfig(creditTag, name, 1);
        } else if (modelVal == "buyerInfo") {
            return getItemConfig(buyerTag, name);
        } else if (modelVal == "partnerInfo") {
            return getItemConfig(sharedTag, name);
        } else if (modelVal == "sponsorInfo") {
            return getItemConfig(sponsorTag, name);
        } else if (modelVal == "oldwolfApply") {
            return getItemConfig(advanceTag, name);
        } else if (modelVal == "carInfo") {
            return getItemConfig(carTag, name);
        }
    }

    var node = '';
    function getItemConfig(configArr, name, num) {
        for (var i = 0; i < configArr.length; i++) {//1.第一层 root 深度遍历整个configArr
            if (node['name'] == name && num==1) {
                break;
            }
            var obj = configArr[i];
            if (obj['name'] == name || obj['dName'] == name) {//有节点就开始找，一直递归下去
                node = obj;
                return;
            } else {
                if (obj['items']) {//如果有子节点就开始找
                    getItemConfig(obj['items'], name);//递归往下找
                } else {
                    continue;//跳出当前递归，返回上层递归
                }
            }
        }
        return node
    }

    // 作废按钮事件
    var bussinessOrderId = $("input[name='order_input']:checked").val();
    $(".discard-btn").on("click", function () {
        revocation(bussinessOrderId);
    });	// end 作废按钮

    // 撤销作废
    function revocation(bussinessOrderId) {
        var ck = $("input[name='order_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要撤销的记录。");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户，不允许作废");
                return false;
            }
            confirmDialog("确认作废选中的信息么？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/cfOrderApplyModify/revocation.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfOrderApplyModify/orderApplyAlter.action?id=" + orderId;
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
})
//表单校验
function validSelect(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "module") {
                $(lableId).parent().attr('tip', '所属版块不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "project-select") {
                $(lableId).parent().attr('tip', '所属项目为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("name") == "selectChosen" || $(lableId).attr("name") == "loanBank" || $(lableId).attr("name") == "dealerName") {
                $(lableId).parent().attr('tip', '新值不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "modifyReason") {
                $(lableId).attr('tip', '修改原因不能为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            if ($(lableId).attr("id") == "modifyReason") {
                var name = $("#modifyReason").val();
                if (name.length > 50) {
                    $(lableId).attr('tip', '长度不能超过50个字符');
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
