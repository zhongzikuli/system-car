$(function(){
   
	var sub = 10;		//获取十年内时间段
	var years = new Array();
	var yearOptions = "";
	var currentYear = DateUtil.getYear(new Date());
	var month = DateUtil.getMonth(new Date()) + 1;
	//当年月
	for(var i=month; i > 0; i--){
		var value = "";
		var text = "";
		if(i < 10){
			value = currentYear + "0" + i;
			text = currentYear + "年0" + i + "月";
		}else{
			value = currentYear + "" + i;
			text = currentYear + "年" + i + "月";
		}
		yearOptions += "<option value='"+value+"' >" + text + "</option>";
	}
	for (var i = 0; i < sub; i++) {
		var year = currentYear - (i+1);
		for (var j = 12; j > 0; j--) {
			var value = "";
			var text = "";
			if(j >= 10){
				value = year + "" + j;
				text = year + "年" + j + "月";
			}else{
				value = year + "0" + j;
				text = year + "年0" + j + "月";
			}
			yearOptions += "<option value='"+value+"' >" + text + "</option>";
		}
	}
	$("#search-month").append(yearOptions);
	$("#search-month").val($("#year-month-hidden").val());
	$("#search-month").find("option[text='"+$("#year-month-hidden").val()+"']").attr("selected","selected");
	
	$("#search-month").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//搜索时间控件
	laydate({
		elem: '#search-month',
		format: 'YYYYMM',
		type:'month',
		issure: true, //确定框
		istime: false
	});
	
	//下拉框初始化
	$("#search-is-over").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//贷款银行
	$("#bank-id").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//电催异常
	$("#search-is-tel-exception").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//是否代偿
	$("#bank-id").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//是否结清
	$("#search-trail-car-status").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//诉讼
	$("#search-is-law").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//首期逾期
	$("#search-is-frist-overdue").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//首期逾期
	$("#search-select").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100px"
	});
	
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#bank-id").val("").trigger('chosen:updated');
		$("#search-month").val("").trigger('chosen:updated');
		$("#search-is-over").val("").trigger('chosen:updated');
		$("#search-is-tel-exception").val("").trigger('chosen:updated');
		$("#search-is-advanced-income").val("").trigger('chosen:updated');
		$("#search-trail-car-status").val("").trigger('chosen:updated');
		$("#search-is-frist-overdue").val("").trigger('chosen:updated');
		$("#search-is-law").val("").trigger('chosen:updated');
		$("#keyword").val("");
	});
	//订单详情查看
	$(".detailForTrailCar").on("click", function(){
		var ck = $("input[name='trailCarInput']:checked");
		 if (ck.length == 0) {
	            alertDialog("请选择要查看的信息。");
	            return
		 }else if(ck.length >1){
			 alertDialog("对不起,只能查看一个详情");
	            return
		 }else{
			var _this = ck;
			var acceptId = $(_this).attr("data-id");
			var dataTitle = $(_this).attr("data-title");
			var dataHref = $(_this).attr("data-href");
			openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
		 }
	});
	//开拖车单设置
	$(".trailCarSet").on("click", function(){
		var ck = $("input[name='trailCarInput']:checked");
		 if (ck.length == 0) {
	            alertDialog("请选择要设置的拖车。");
	            return
		 }else if(ck.length >1){
			 alertDialog("对不起,只能设置一个拖车");
	            return
		 }else{
			var _this = ck;
			var id = $(_this).attr("data-id");
			var userName = $(_this).attr("data-title");
			var businessOrderAcceptId = $(_this).attr("data-businessorderacceptid");
			editInfo(id,userName,businessOrderAcceptId);
		 }
	});
	//拖车管理
	$(".trailCarList").on("click", function(){
		var ck = $("input[name='trailCarInput']:checked");
		if (ck.length == 0) {
			alertDialog("请选择拖车用户。");
			return
		}else if(ck.length >1){
			alertDialog("对不起,只能查看一个拖车管理");
			return
		}else{
			var _this = ck;
			var url = $(_this).attr("data-href-list");
			 window.location.href = url;
			
		}
	});
	
	
    $(".add-btn").on("click",function(){
        var id =$(this).attr("data-id");
        var orderId =$(this).attr("data-orderId");
        createBank(id,orderId);
    })
    $(".resets-btn").on("click",function(){
        $("#search-keyword").val('');
        $(".status").val("");
        $(".status").trigger("chosen:updated");
    })
    $(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });

    function createBank(id,orderId) {
        var config= {
            disable_search_threshold	: 8,
            no_results_text				: "没有找到",
            allow_single_deselect		: true,
            width: "100%"
        }
       if (id==null||id==undefined || id==""){
           var options = {
               width: 500,
               top: 200,
               height: 265,
               overlay: true,
               dispose: true,
               move: true,
               title: '银行管理',
               onBeforeShow: function () {
                   $("#dispatchDate").on("click",function () {
                       laydate({
                           format: 'YYYY-MM-DD ', //日期格式
                           istime: false, //是否开启时间选择
                           isclear: true, //是否显示清空
                           istoday: false, //是否显示今天
                           issure: false, //是否显示确认
                           choose: function (datas) {
                               if (datas == '') {
                                   change_error_style($("#dispatchDate"), "add");
                               } else {
                                   change_error_style($("#dispatchDate"), "remove");
                               }
                           },
                           clear: function () {

                           }
                       });
                   });
               },
               onAfterShow: function () {
                   var config = {
                       disable_search_threshold:10,
                       no_results_text: '无数据',
                       width:"100%"
                   };
                   //下拉框
                   $("#trailCarCompanyId").chosen(config).on('change', function(e, selected) {
                       if("" != selected){
                           $("#vtip").hide()
                           change_error_style($("#trailCarCompanyId").parent(),"remove");

                       }else{
                           change_error_style($("#trailCarCompanyId").parent(), "add");
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
                   var flag = false;
                   var param = {};
                   param.businessOrderAcceptId = orderId;
                   param.dispatchDate = $("#dispatchDate").val();
                   param.trailCarCompanyId = $("#trailCarCompanyId").val();
                   param.trailCarDispatchBak = $("#trailCarDispatchBak").val();
                   if ($("#bankForm").valid("bankForm")) {
                       loadingShow();
                       $.ajax({
                           url: ctx + "/cfTrail/create.action",
                           type: "post",
                           contentType: "application/json",
                           data: JSON.stringify(param),
                           dataType: "json",
                           success: function (data) {
                               loadingHide();
                               if (data.error == 1) {
                                   successMsg("操作成功！", 1000, function () {
                                       window.location.href = ctx + "/cfTrail/query.action";
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
                   }else {
                       return false;
                   }
               }
           };
           creatDlg = new Dialog("#bank-dialog", options);
           creatDlg.show();
       }else{
           var options = {
               width: 500,
               top: 200,
               height: 265,
               overlay: true,
               dispose: true,
               move: true,
               title: '编辑',
               onBeforeShow: function () {
                   $("#dispatchDate").on("click",function () {
                       laydate({
                           format: 'YYYY-MM-DD ', //日期格式
                           istime: false, //是否开启时间选择
                           isclear: true, //是否显示清空
                           istoday: false, //是否显示今天
                           issure: false, //是否显示确认
                           choose: function (datas) {
                               if (datas == '') {
                                   change_error_style($("#dispatchDate"), "add");
                               } else {
                                   change_error_style($("#dispatchDate"), "remove");
                               }
                           },
                           clear: function () {

                           }
                       });
                   })
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
                               $("#dispatchDate").val(trail.strDispatchDate);
                                $("#trailCarCompanyId").val(trail.trailCarCompanyId).trigger('chosen:updated');
                                $("#trailCarDispatchBak").text(trail.trailCarDispatchBak);

                           } else if (data.error == -100) {
                               faildMsg("会话超时，请重新登陆！");
                           } else {
                               faildMsg(data.message);
                           }
                       }
                   });
               },
               onAfterShow: function () {
                   var config = {
                       disable_search_threshold:10,
                       no_results_text: '无数据',
                       width:"100%"
                   };
                   //下拉框
                   $("#trailCarCompanyId").chosen(config).on('change', function(e, selected) {
                       if("" != selected){
                           $("#vtip").hide()
                           change_error_style($("#trailCarCompanyId").parent(),"remove");
                       }else{
                           change_error_style($("#trailCarCompanyId").parent(), "add");
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
                   param.businessOrderAcceptId = orderId;
                   param.id = id;
                   param.dispatchDate = $("#dispatchDate").val();
                   param.trailCarCompanyId = $("#trailCarCompanyId").val();
                   param.trailCarDispatchBak = $("#trailCarDispatchBak").val();
                   if ($("#bankForm").valid("bankForm")) {
                       loadingShow();
                       $.ajax({
                           url: ctx + "/cfTrail/update.action",
                           type: "post",
                           contentType: "application/json",
                           data: JSON.stringify(param),
                           dataType: "json",
                           success: function (data) {
                               loadingHide();
                               if (data.error == 1) {
                                   successMsg("操作成功！", 1000, function () {
                                       window.location.href = ctx + "/cfTrail/query.action";
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
           var creatDlg = new Dialog("#bank-dialog", options);
           creatDlg.show();
       }
    }
//编辑
function editInfo(id,userName,businessOrderAcceptId) {
    var html='';
    var carStopPlaceVal='';
    var trailSuccessDateVal='';
    if (id==null||id==undefined || id==""){
    	 var options = {
    		        width: 500,
    		        top: 200,
    		        height: 265,
    		        overlay: true,
    		        dispose: true,
    		        move: true,
    		        title: '编辑',
    		        onBeforeShow: function () {
    		        	$("#userName").val(userName);
    		           
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
    		            param.remark = $("#remark").val();
    		            param.businessOrderAcceptId = businessOrderAcceptId;
    		            
    		            if ($("#trailForm").valid("trailForm")) {
    		                loadingShow();
    		                $.ajax({
    		                    url: ctx + "/cfTrail/createTrailCar.action",
    		                    type: "post",
    		                    contentType: "application/json",
    		                    data: JSON.stringify(param),
    		                    dataType: "json",
    		                    success: function (data) {
    		                        loadingHide();
    		                        if (data.error == 1) {
    		                            successMsg("操作成功！", 1000, function () {
    		                                window.location.href = ctx + "/cfTrail/query.action";
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
    	
    }else{
    var options = {
        width: 500,
        top: 200,
        height: 265,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        onBeforeShow: function () {
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
                        $("#userName").val(userName);
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
                        }else{
                        	 $(".dialog-container").height(265);
                        }
                        $("#remark").val(trail.remark);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
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
            param.remark = $("#remark").val();
            param.businessOrderAcceptId = businessOrderAcceptId;
            if ($("#trailForm").valid("trailForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/cfTrail/updateTrailCar.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfTrail/query.action";
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
}
});
//表单校验
function bankForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "trailCarCompanyId") {
                $(lableId).parent().attr('tip', '拖车单位不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "dispatchDate") {
                $(lableId).attr('tip', '派单时间不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "trailCarDispatchBak") {
                $(lableId).attr('tip', '拖车单备注不能为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "trailCarStatus") {
                $(lableId).parent().attr('tip', '拖车类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "remark") {
                $(lableId).attr('tip', '拖车备注不能为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "carStopPlace") {
                $(lableId).attr('tip', '停放位置不能为空，请重新输入。');
                return "faild";
            }else if  ($(lableId).attr("id") == "trailSuccessDate") {
                $(lableId).attr('tip', '拖车时间不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
       /* if ($(lableId).val() != null && $(lableId).val() != "") {
            if ($(lableId).attr("id") == "trailCarStatus") {
                var name = $("#trailCarStatus").val();
                if (name=="1") {
                if ($(lableId).attr("id") == "carStopPlace") {
                        $(lableId).attr('tip', '停放位置不能为空，请重新输入。');
                        return "faild";
                }else if  ($(lableId).attr("id") == "trailSuccessDate") {
                        $(lableId).parent().attr('tip', '拖车时间不能为空，请重新输入。').addClass("input_validation-failed");
                        return "faild";
                }
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }*/
        return "success";
    }
}





