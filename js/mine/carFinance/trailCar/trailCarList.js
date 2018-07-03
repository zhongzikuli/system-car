$(function(){
	var acceptId = $("#acceptId").val();
    //新增拖车单信息
	 $(".add-btn").on("click",function(){
		 var acceptId = $("#acceptId").val();
	        createBank(acceptId);
	    })
    
    $(".lightBox").on("click",function(){
		setTimeout(function(){
			$('body', window.parent.document).find("#lightbox").find(".lb-nav").hide()
		},1000);
		
	})
    //删除拖车单信息
    $(".delete-btn").on("click",function(){
    	deleteTrailCar();
    });
	 //修改拖车单信息
	 $(".edit-btn").on("click",function(){
		 var acceptId = $("#acceptId").val();
	        var ck = $("input[name='trailCar_input']:checked");
			if (ck.length == 0) {
				alertDialog("请选择用户。");
				return
			}else if(ck.length >1){
				alertDialog("对不起,只能编辑一个拖车");
				return
			}else{
				var _this = ck;
				var id = $(_this).attr("executeid");
				editTrailCar(id,acceptId);
			}
	 });
	 
	 
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
    //修改拖车单
    function editTrailCar(id,orderId) {
        var config= {
            disable_search_threshold	: 8,
            no_results_text				: "没有找到",
            allow_single_deselect		: true,
            width: "100%"
        }
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
                       url: ctx + "/cfTrail/getTrailCarById.action",
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
                                $("#trailCarDispatchBak").text(trail.trailCarBak);
                               

                           } else if (data.error == -100) {
                               faildMsg("会话超时，请重新登陆！");
                           } else {
                               faildMsg(data.message);
                           }
                       }
                   });
               },
               onAfterShow: function () {
                   	var endDate = {
                               elem: "#dispatchDate",
                               format: 'YYYY-MM-DD', //日期格式
                               istime: false, //是否开启时间选择
                               isclear: true, //是否显示清空
                               istoday: false, //是否显示今天
                               issure: false, //是否显示确认
                               choose: function (datas) {
                                   if (datas == '') {
                                	   creatDlg.isSubmit = false;
                                       change_error_style($("#dispatchDate"), "add");
                                   } else {
                                	   creatDlg.isSubmit = true;
                                       change_error_style($("#dispatchDate"), "remove");
                                   }
                               },
                               clear: function () {
                               }
                           };
                           laydate(endDate);
                   
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
                   param.trailCarBak = $("#trailCarDispatchBak").val();
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
                                       window.location.href = ctx + "/cfTrail/queryTrailCarList.action?businessOrderAcceptId="+acceptId;
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
    //新增拖车单
    function createBank(orderId) {
        var config= {
            disable_search_threshold	: 8,
            no_results_text				: "没有找到",
            allow_single_deselect		: true,
            width: "100%"
        }
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
                   param.trailCarBak = $("#trailCarDispatchBak").val();
                   param.cfTrailCarId = $("#trailCarExecute").val();
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
                                       window.location.href = ctx + "/cfTrail/queryTrailCarList.action?businessOrderAcceptId="+acceptId;
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
    }
  //删除拖车信息
    function deleteTrailCar() {
        var ck = $("input[name='trailCar_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的拖车信息。");
            return
        } else {
            var idArr = new Array();
            var lawIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).attr("executeId"));
                if ($(this).attr("isvalid") == "0") {
                    lawIsvalid = false;
                }
            });
            if (!lawIsvalid) {
                alertDialog("所选信息包含无效信息，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的拖车信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/cfTrail/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                    	loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href =  ctx + "/cfTrail/queryTrailCarList.action?businessOrderAcceptId="+acceptId;
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
});

function editLaw(id){
	window.location.href = ctx + "/cfLaw/toEdit.action?id="+id;
}
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
        return "success";
    }
}
