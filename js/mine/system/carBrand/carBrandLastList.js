jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    var config={
			disable_search_threshold : 8,
   			no_results_text : "没有找到",
   			allow_single_deselect : true,
   			width : "100%"
   		}
    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#brandName").val("");
    });


    

    $(".insert").on("click", function () {
        insertInfo();
    })

    $(".edit").on("click", function () {
    var id=$(this).attr("data-id");
        editInfo(id);
    })


    $(".start").on("click",function(){
        var carSerialFirst=$(this).attr("data-id");
        start(carSerialFirst);
    });

    $(".stop").on("click",function(){
        var carSerialFirst=$(this).attr("data-id");
        stop(carSerialFirst);
    });
    


    function start(id){
    	var brandNameMain=$("#brandNameMain").val();
    	var carSerialFirst=$("#carSerialFirst").val();
    	var carSerialSecond=$("#carSerialSecond").val();
        $.ajax({
            url: ctx + "/cfCarBrand/updateForbidden.action",
            type: "post",
            data:{
            	id:id,
            	forbidden:0
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfCarBrand/queryCarSerialLastName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain+"&&carSerialSecond="+carSerialSecond;
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    function setDate(){
		var sub = 10; // 获取十年内时间段
		var years = new Array();
		var yearOptions = "";
		var currentYear = DateUtil.getYear(new Date())+2;
		for (var i = 0; i < sub; i++) {
			var year = currentYear - i;
			var value = "";
			var text = "";
			value = year;
			text = year + "年";
			yearOptions += "<option value='" + value + "' >" + text
					+ "</option>";
		}
		$("#year_add").append(yearOptions);
		
   }
    function setDateForupdate(){
    	var sub = 10; // 获取十年内时间段
    	var years = new Array();
    	var yearOptions = "";
    	var currentYear = DateUtil.getYear(new Date());
    	for (var i = 0; i < sub; i++) {
    		var year = currentYear - i;
    		var value = "";
    		var text = "";
    		value = year;
    		text = year + "年";
    		yearOptions += "<option value='" + value + "' >" + text
    		+ "</option>";
    	}
    	$("#year_edit").append(yearOptions);
    	
    }
    function stop(id){
    	var brandNameMain=$("#brandNameMain").val();
    	var carSerialFirst=$("#carSerialFirst").val();
    	var carSerialSecond=$("#carSerialSecond").val();
        $.ajax({
            url: ctx + "/cfCarBrand/updateForbidden.action",
            type: "post",
            data:{
            	id:id,
            	forbidden:1
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfCarBrand/queryCarSerialLastName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain+"&&carSerialSecond="+carSerialSecond;
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }


    function editInfo(id){
    	var str1='';
		var str2='';
		var str3='';
		var str4='';
		var brandNameMain=$("#brandNameMain").val();
		var carSerialFirst=$("#carSerialFirst").val();
		var carSerialSecond=$("#carSerialSecond").val();
		var brandNameMain=$("#brandNameMain").val();
		var carSerialFirst=$("#carSerialFirst").val();
		var carSerialSecond=$("#carSerialSecond").val();
        var options = {
            width: 500,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            url: "",
            onBeforeShow: function () {
				setDateForupdate();
				$("#year_edit").chosen(config);
				$("#brakeType_edit").chosen(config); 
				$("#brandType_edit").chosen(config);
                $.ajax({
                    url: ctx + "/cfCarBrand/detail.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            var info = data.rows;
                            $("#brandName_edit").val(info.brandName);
                            $("#gear_edit").val(info.gear).trigger('chosen:updated');
                            $("#brakeType_edit").val(info.brakeType).trigger('chosen:updated');
                            $("#brandType_edit").val(info.brandType).trigger('chosen:updated');
                            $("#year_edit").val(info.year).trigger('chosen:updated');
                            $("#standType_edit").val(info.standType);
                            $("#orderNo_edit").val(info.orderNo);
                        	$("#year_add").chosen(config);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                        //下拉框
                        var config1 = {
                            disable_search_threshold:10,
                            no_results_text: '无数据',
                            width:"100%"
                        };
                        $("#brandType_edit").chosen(config1);
                        $("#brandType_edit").on('change', function(e, selected) {
                            if("" != selected){
                                change_error_style($("#brandType_edit").parent(),"remove");
                            }else{
                                change_error_style($("#brandType_edit").parent(), "add");
                            }
                        });
                    }
                });
            },
           
            callback: function () {
            	
                var flag = false;
                if ($("#carBrandForm_edit").valid("carBrandForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/cfCarBrand/update.action",
                        type: "post",
                        data: {
                      	   brandName:$("#brandName_edit").val(),
                      	   brandType:$("#brandType_edit").val(),
                      	   gear:$("#gear_edit").val(),
                      	   year:$("#year_edit").val(),
                      	   brakeType:$("#brakeType_edit").val(),
                      	   standType:$("#standType_edit").val(),
                      	   orderNo:$("#orderNo_edit").val(),
                      	   id:id
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfCarBrand/queryCarSerialLastName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain+"&&carSerialSecond="+carSerialSecond;
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
                } else {
                    return false;
                }
            }
        };
        var editDlg = new Dialog("#carBrand-dialog-edit", options);
        editDlg.show();
    }

   function insertInfo(){
	  var str1='';
	  var str2='';
	  var str3='';
	  var str4='';
	  var brandNameMain=$("#brandNameMain").val();
	  var carSerialFirst=$("#carSerialFirst").val();
	  var carSerialSecond=$("#carSerialSecond").val();
       var options = {
           width: 500,
           top: 200,
           height: 500,
           overlay: true,
           dispose: true,
           move: true,
           title: '创建',
           url: "",
           onAfterShow:function () {
        	   setDate();
        	   $("#year_add").chosen(config).on('change',function(e,p){
        		   str1=p.selected+'款';
		        	
        	   });
        	   str2=carSerialSecond;
        	   $("#gear_add").blur(function(){
        		   str3=$(this).val();
        	   });
        	   $("#brakeType_add").chosen(config).on('change',function(e,p){
        		   str4=p.selected;
        	   }); 
        	   $("#brandType_add").chosen(config);
        	   $("#brandName_add").click(function(){
        		   $("#brandName_add").val(str1+' '+str2+' '+str3+' '+str4)
        	   });
        	   
           },
           callback: function () {
               var flag = false;
               if ($("#carBrandForm").valid("carBrandForm")) {
                   loadingShow();
                   $.ajax({
                       url: ctx + "/cfCarBrand/create.action",
                       type: "post",
                       data: {
                    	   brandNameMain: $("#brandNameMain").val(),
                    	   carSerialFirst: $("#carSerialFirst").val(),
                    	   carSerialSecond:$("#carSerialSecond").val(),
                    	   brandName:$("#brandName_add").val(),
                    	   brandType:$("#brandType_add").val(),
                    	   gear:$("#gear_add").val(),
                    	   year:$("#year_add").val(),
                    	   brakeType:$("#brakeType_add").val(),
                    	   standType:$("#standType_add").val(),
                    	   orderNo:$("#orderNo_add").val()
                    	   
                       },
                       dataType: "json",
                       success: function (data) {
                           loadingHide();
                           if (data.error == 1) {
                               flag = false;
                               successMsg("操作成功！", 1000, function () {
                                   window.location.href = ctx + "/cfCarBrand/queryCarSerialLastName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain+"&&carSerialSecond="+carSerialSecond;
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
       creatDlg = new Dialog("#carBrand-dialog", options);
       var config2 = {
           disable_search_threshold:10,
           no_results_text: '无数据',
           width:"100%"
       };
       $("#brandType_create").chosen(config2);
       creatDlg.show();
   }
})

function cfCarBrandForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
             if ($(lableId).attr("id") == "brandName_add" || $(lableId).attr("id") == "brandName_edit") {
                $(lableId).attr('tip', '品牌名称不能为空。').addClass("input_validation-failed");
                return "faild";
            }  
        	if ($(lableId).attr("id") == "brandType_add" || $(lableId).attr("id") == "brandType_edit") {
                $(lableId).parent().attr('tip', '品牌类型不能为空。').addClass("input_validation-failed");
                return "faild";
            } 
        	if ($(lableId).attr("id") == "year_add" || $(lableId).attr("id") == "year_edit") {
        		$(lableId).parent().attr('tip', '年份不能为空。').addClass("input_validation-failed");
        		return "faild";
        	} 
            return "success";
        }
        return "success";
    }
}