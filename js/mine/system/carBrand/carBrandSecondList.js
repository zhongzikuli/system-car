jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#carSerialSecond").val("");
    });


    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"150px"
    };

    $(".insert").on("click", function () {
        insertInfo();
    })

    $(".edit").on("click", function () {
    var carSerialSecond=$(this).attr("data-id");
        editInfo(carSerialSecond);
    })


    $(".start").on("click",function(){
        var carSerialFirst=$(this).attr("data-id");
        start(carSerialFirst);
    });

    $(".stop").on("click",function(){
        var carSerialFirst=$(this).attr("data-id");
        stop(carSerialFirst);
    });
    
    $(".mainCar-Administration").on("click",function(){
    	var carSerialSecond=$(this).attr("data-id");
    	mainList(carSerialSecond);
    });
    
    $(".back").on("click",function(){
    	var brandNameMain=$("#brandNameMain").val()
    	back(brandNameMain);
    });
    
    function back(brandNameMain){
    	 window.location.href=ctx+"/cfCarBrand/queryCarSerialBrandName.action?brandNameMain="+brandNameMain;
    }

    function start(carSerialSecond){
    	var brandNameMain=$("#brandNameMain").val();
    	var carSerialFirst=$("#carSerialFirst").val();
        $.ajax({
            url: ctx + "/cfCarBrand/updateForbidden.action",
            type: "post",
            data:{
            	newCarSerialSecond:carSerialSecond,
            	forbidden:0
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfCarBrand/queryCarSerialSecondName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain;
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function stop(carSerialSecond){
    	var brandNameMain=$("#brandNameMain").val();
    	var carSerialFirst=$("#carSerialFirst").val();
        $.ajax({
            url: ctx + "/cfCarBrand/updateForbidden.action",
            type: "post",
            data:{
            	newCarSerialSecond:carSerialSecond,
            	forbidden:1
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfCarBrand/queryCarSerialSecondName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain;
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    function mainList(carSerialSecond){
    	var brandNameMain=$("#brandNameMain").val();
    	var carSerialFirst=$("#carSerialFirst").val();
    	window.location.href = ctx+"/cfCarBrand/queryCarSerialLastName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain+"&&carSerialSecond="+carSerialSecond;
    }
    


    function editInfo(carSerialSecond){
    	var brandNameMain=$("#brandNameMain").val()
    	var carSerialFirst=$("#carSerialFirst").val()
        var options = {
            width: 400,
            top: 200,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            url: "",
            onBeforeShow: function () {
            	$("#carSerialSecond_edit").val(carSerialSecond);
            },
            callback: function () {
                var flag = false;
                if ($("#carBrandForm_edit").valid("carBrandForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/cfCarBrand/update.action",
                        type: "post",
                        data: {
                      	   
                        	newBrandNameMain: brandNameMain,
                        	newCarSerialFirst: carSerialFirst,
                        	newCarSerialSecond:carSerialSecond,
                        	carSerialSecond:$("#carSerialSecond_edit").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfCarBrand/queryCarSerialSecondName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain;
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
	  var brandNameMain=$("#brandNameMain").val();
	  var carSerialFirst=$("#carSerialFirst").val();
       var options = {
           width: 400,
           top: 200,
           height: 150,
           overlay: true,
           dispose: true,
           move: true,
           title: '创建',
           url: "",
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
                    	   carSerialSecond:$("#carSerialSecond_add").val()
                       },
                       dataType: "json",
                       success: function (data) {
                           loadingHide();
                           if (data.error == 1) {
                               flag = false;
                               successMsg("操作成功！", 1000, function () {
                                   window.location.href = ctx + "/cfCarBrand/queryCarSerialSecondName.action?carSerialFirst="+carSerialFirst+"&&brandNameMain="+brandNameMain;
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
             if ($(lableId).attr("id") == "carSerialSecond_add" ||
                $(lableId).attr("id") == "carSerialSecond_edit") {
                $(lableId).attr('tip', '品牌类型不能为空。').addClass("input_validation-failed");
                return "faild";
            } 
            return "success";
        }
        return "success";
    }
}