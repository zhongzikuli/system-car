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
        $("#brandNameMain").val("");
        $("#firstLetter").val("");
    });


    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"150px"
    };
    $("#brandType").chosen(config);

    $(".delete").on("click", function () {
        deleteInfo();
    })

    $(".insert").on("click", function () {
        insertInfo();
    })

    $(".edit").on("click", function () {
    var brandNameMain=$(this).attr("data-id");
        editInfo(brandNameMain);
    })

    $(".detail").on("click", function () {
        var id=$(this).attr("data-id");
        detailInfo(id);
    })

    $(".start").on("click",function(){
        var brandNameMain=$(this).attr("data-id");
        start(brandNameMain);
    });

    $(".stop").on("click",function(){
        var brandNameMain=$(this).attr("data-id");
        stop(brandNameMain);
    });
    
    $(".mainCar-Administration").on("click",function(){
    	var brandNameMain=$(this).attr("data-id");
    	mainList(brandNameMain);
    });
    
    $(".importExcel").on("click",function(){
        importExcel();
    });

    function importExcel() {
        var options = {
            width: 400,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            title: '导入车型',
            onAfterShow: function () {
                new HYUpload({
                    auto: true,
                    containerId: '#importExcelUploader',
                    uploadImg: false,						//图片上传标记
                    dropTip: '',
                    buttonText: '选择文件',
                    server: ctx + '/cfCarBrand/importExcel.action'
                });
            },
            callback: function () {
            	if($(".filelist li").length==1){
            		successMsg("导入车辆品牌成功！", 1000, function () {
               		 window.location.reload();
                    });
            	}else{
            		 faildMsg("文件不能为空,请重新上传");
            		 return false;
            	}
            	 
               
            }
        };

        new Dialog("#importCarBrand-dialog", options).show();
    }

    function start(brandNameMain){
        $.ajax({
            url: ctx + "/cfCarBrand/updateForbidden.action",
            type: "post",
            data:{
            	newBrandNameMain: brandNameMain,
            	forbidden:0
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfCarBrand/query.action?";
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function stop(brandNameMain){
        $.ajax({
            url: ctx + "/cfCarBrand/updateForbidden.action",
            type: "post",
            data:{
            	newBrandNameMain: brandNameMain,
            	forbidden:1
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    loadingHide();
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfCarBrand/query.action?";
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    function mainList(brandNameMain){
    	 window.location.href=ctx+"/cfCarBrand/queryCarSerialBrandName.action?brandNameMain="+brandNameMain;
    }
    

    function detailInfo(id){
        var options = {
            width: 300,
            top: 100,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            url: "",
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/cfCarBrand/detail.action",
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: "json",
                    success: function (data) {
                        function change(brandType){
                            if(brandType==1){
                                return '国产车'
                            }
                            if(brandType==2){
                                return '进口车'
                            }
                        }
                        if (data.error == 1) {
                            var info = data.rows;
                            $("#bankName_detail").val(info.brandName);
                            $("#bankShortName_detail").val(info.brandShortName);
                            $("#bankCode_detail").val(change(info.brandType));
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            }
        };
        var editDlg = new Dialog("#carBrandDetail-dialog", options);
        editDlg.show();
    }

    function editInfo(brandNameMain){
        var options = {
            width: 400,
            top: 200,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            url: "",
            onBeforeShow: function () {
            	$("#brandName_edit").val(brandNameMain);
            },
            callback: function () {
                var flag = false;
                if ($("#carBrandForm_edit").valid("carBrandForm_edit")) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/cfCarBrand/update.action",
                        type: "post",
                        data: {
                        	brandNameMain: $("#brandName_edit").val(),
                            newBrandNameMain: brandNameMain
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/cfCarBrand/query.action?";
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
                    	   brandNameMain: $("#brandNameMains").val()
                       },
                       dataType: "json",
                       success: function (data) {
                           loadingHide();
                           if (data.error == 1) {
                               flag = false;
                               successMsg("操作成功！", 1000, function () {
                                   window.location.href = ctx + "/cfCarBrand/query.action";
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

   function deleteInfo(){
       var ck = $("input[name='carBrand_input']:checked");
       if (ck.length == 0) {
           alertDialog("请选择要删除的记录。");
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
               alertDialog("所选信息包含无效账户，不允许删除");
               return false;
           }
           confirmDialog("确认删除选中的车辆品牌信息吗？", function () {
               var params = {}
               params.idArr = idArr.toString();
               loadingShow();
               $.ajax({
                   url: ctx + "/cfCarBrand/delete.action",
                   type: "post",
                   data: params,
                   dataType: "json",
                   success: function (data) {
                       loadingHide();
                       if (data.error == 1) {
                           successMsg("操作成功！", 1000, function () {
                               window.location.href = ctx + "/cfCarBrand/query.action?";
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
//导出excel
    function exportExcel() {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/cfCarBrand/exportList.action");
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
    }
function cfCarBrandForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
             if ($(lableId).attr("id") == "brandNameMains" ||
                $(lableId).attr("id") == "brandName_edit") {
                $(lableId).attr('tip', '品牌类型不能为空。').addClass("input_validation-failed");
                return "faild";
            } 
            return "success";
        }
        return "success";
    }
}