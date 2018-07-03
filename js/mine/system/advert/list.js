$(document).ready(function(){
	$(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
	$(".pre-img").on("click",function(){
		$.openPhotoGallery(this)
	})

	//新增
	$(".add-btn").on("click",function(){
		createAdvert();
	})
	//编辑
	$(".edit-btn").on("click",function(){
		var id =$(this).attr("data-id");
		editAdvert(id);
	})
	//删除
	$(".delete-btn").on("click",function(){
		deleteAdvert()
	})
	var config = {
	        disable_search_threshold: 10,
	        no_results_text: '无数据',
	        width:100+'%'
	};
	$(".up-btn").on("click",function(){
		var id =$(this).attr("data-id");
		var status =$(this).attr("data-status");
		updateStatus(id,status);
	})
	
	$(".down-btn").on("click",function(){
		var id =$(this).attr("data-id");
		var status =$(this).attr("data-status");
		updateStatus(id,status);
	})
	//更新上下架
	function updateStatus(id,status) {
        loadingShow();
	    $.ajax({
	        url: ctx + "/advert/updateStatus.action",
	        type: "post",
	        data: {
	            "id": id,
	            "status": status
	        },
	        dataType: "json",
	        success: function (data) {
                loadingHide();
	            if (data.error == 1) {
	                successMsg("操作成功！", 1000, function () {
	                    window.location.href = ctx + "/advert/query.action";
	                });
	            } else if (data.error == -100) {
	                faildMsg("会话超时，请重新登陆！");
	            } else {
	                faildMsg(data.message);
	            }
	        }
	    });
	}
	//新增
	function createAdvert() {
		var uploadComp=null;
		var preData = new Array();
	    var fileId = $("#advert_files").attr("data-id");
	    var fileGroup = $("#advert_files").attr("data-group");
	    var filePath = $("#advert_files").attr("data-path");
	    var fileName = $("#advert_files").attr("data-name");
	    var temp = {
	        "fileId": fileId,
	        "fileGroup": fileGroup,
	        "filePath": filePath,
	        "fileName": fileName
	    };
	    preData.push(temp);
	    var options = {
	        width: 700,
	        top: 200,
	        height: 400,
	        overlay: true,
	        dispose: true,
	        move: true,
	        title: '新增',
	        onAfterShow: function () {
	        	uploadComp=  new HYUpload({
	                auto: true,
	                containerId: '#addUploader',
	                uploadImg: false,						//图片上传标记
	                dropTip: '或将图片拖到这里',
	                buttonText: '选择图片',
	                server: ctx + '/fdfs/uploadFile.action'
	            });
	        },
	        callback: function () {
	            var flag = false;
	            var fileLength = $(".filelist li").length;

	            if (fileLength < 1) {
	                faildMsg("请选择上传的图片");
	                return flag
	            } else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
	              	 faildMsg("文件正在上传");
	                 return flag
	           }else {
	                var param = {};
	                param.title = $("#advert-title").val();
	                param.type = $("#advert-type").val();
	                param.jumpType = $("#jumpType").val();
	                param.linkUrl = $("#advert-url").val();
	                param.remark = $("#advert-text").val();
	                param.fileGroup = $(".filelist li").data("group");
	                param.filePath = $(".filelist li").data("filepath");
	                param.fileName = $(".filelist li").data("filename");

	                if ($("#advCreateForm").valid("advCreateForm")) {
	                	loadingShow();
	                    $.ajax({
	                        url: ctx + "/advert/saveAdvert.action",
	                        type: "post",
	                        contentType: "application/json",
	                        data: JSON.stringify(param),
	                        dataType: "json",
	                        success: function (data) {
	                            if (data.error == 1) {
	                            	loadingHide();
	                                successMsg("操作成功！", 1000, function () {
	                                    window.location.href = ctx + "/advert/query.action";
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
	        }
	    };
	    var creatAdvDlg = new Dialog("#advCreate-dialog", options);

	    //下拉框
	    $(".type-chosen-select").chosen(config).on('change', function (e, selected) {
	        if ("" != selected) {
	            change_error_style($(".type-chosen-select").parent(), "remove");
	        } else {
	            change_error_style($(".type-chosen-select").parent(), "add");
	        }
	    });

	    $(".jumpType-chosen-select").chosen(config);
	    $(".jumpType-chosen-select").on('change', function (e, selected) {
	        if ("" != selected) {
	            change_error_style($(".jumpType-chosen-select").parent(), "remove");
	        } else {
	            change_error_style($(".jumpType-chosen-select").parent(), "add");
	        }
	    });
	    creatAdvDlg.show();
	}
	
	//删除广告
	function deleteAdvert() {
	    var ck = $("input[name='advertrList_input']:checked");
	    if (ck.length == 0) {
	        alertDialog("请选择要删除的广告。");
	        return
	    } else {
	        var idArr = new Array();
	        $(ck).each(function () {
	            idArr.push($(this).val());
	        });
	        confirmDialog("确认删除选中的广告吗？", function () {
	        	var type =$("#search-select").val();
	        	var title=$("#search-advert-name").val();
	            var params = {}
	            params.idArr = idArr.toString();
                loadingShow();
	            $.ajax({
	                url: ctx + "/advert/delete.action",
	                type: "post",
	                data: params,
	                dataType: "json",
	                success: function (data) {
                        loadingHide();
	                    if (data.error == 1) {
	                        successMsg("操作成功！", 1000, function () {
	                            window.location.href = ctx + "/advert/query.action?title=" + title + "&type=" + type;
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
	//广告编辑
	function editAdvert(id) {
		var uploadComp = null;
		var options = {
	        width: 700,
	        top: 200,
	        height: 400,
	        overlay: true,
	        dispose: true,
	        move: true,
	        title: '编辑',
	        onBeforeShow: function () {
	            $.ajax({
	                url: ctx + "/advert/toedit.action",
	                type: "post",
	                data: {
	                    id: id
	                },
	                dataType: "json",
	                success: function (data) {
	                    if (data.error == 1) {
	                        var advert = data.rows;
	                        $("#advert-id").val(advert.id);
	                        $("#advert-title").val(advert.title);
	                        $("#advert-type").val(advert.type).trigger('chosen:updated');
	                        $("#jumpType").val(advert.jumpType).trigger('chosen:updated');
	                        $("#advert-url").val(advert.linkUrl);
	                        $("#advert-text").val(advert.remark);
	                        $("#advert_files").attr({
	                            "data-id": advert.id,
	                            "data-path": advert.filePath,
	                            "data-group": advert.fileGroup,
	                            "data-name": advert.fileName
	                        });
	                    } else if (data.error == -100) {
	                        faildMsg("会话超时，请重新登陆！");
	                    } else {
	                        faildMsg(data.message);
	                    }
	                }
	            });
	        },
	        onAfterShow: function () {
	            var preData = new Array();
	            var fileId = $("#advert_files").attr("data-id");
	            var fileGroup = $("#advert_files").attr("data-group");
	            var filePath = $("#advert_files").attr("data-path");
	            var fileName = $("#advert_files").attr("data-name");
	            var temp = {
	                "fileId": fileId,
	                "fileGroup": fileGroup,
	                "filePath": filePath,
	                "fileName": fileName
	            };
	            preData.push(temp);
	            uploadComp= new HYUpload({
	                auto: true,
	                containerId: '#editUploader',
	                uploadImg: true,						//图片上传标记
	                dropTip: '或将图片拖到这里',
	                buttonText: '选择图片',
	                initData: preData,
	                server: ctx + '/fdfs/uploadFile.action'
	            });
	        },
	        callback: function () {
	            var flag = false;
	            var fileLength = $(".filelist li").length;

	            if (fileLength < 1) {
	                faildMsg("请选择上传的图片");
	                return flag
	            } else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
	            	 faildMsg("文件正在上传");
	                 return flag
	           }else {
	                var param = {};

	                param.id = $("#advert-id").val();
	                param.title = $("#advert-title").val();
	                param.type = $("#advert-type").val();
	                param.jumpType = $("#jumpType").val();
	                param.linkUrl = $("#advert-url").val();
	                param.remark = $("#advert-text").val();
	                param.fileGroup = $(".filelist li").data("group");
	                param.filePath = $(".filelist li").data("filepath");
	                param.fileName = $(".filelist li").data("filename");

	                if ($("#editCreateForm").valid("editCreateForm")) {
	                	loadingShow();
	                    $.ajax({
	                        url: ctx + "/advert/update.action",
	                        type: "post",
	                        contentType: "application/json",
	                        data: JSON.stringify(param),
	                        dataType: "json",
	                        success: function (data) {
	                        	loadingHide();
	                            if (data.error == 1) {
	                                successMsg("操作成功！", 1000, function () {
	                                    window.location.href = ctx + "/advert/query.action";
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
	        }
	    };
	    var editAdvDlg = new Dialog("#advEdit-dialog", options);
	    //下拉框
	    $(".type-chosen-select").chosen(config).on('change', function (e, selected) {
	        if ("" != selected) {
	            change_error_style($(".type-chosen-select").parent(), "remove");
	        } else {
	            change_error_style($(".type-chosen-select").parent(), "add");
	        }
	    });

	    $(".jumpType-chosen-select").chosen(config).on('change', function (e, selected) {
	        if ("" != selected) {
	            change_error_style($(".jumpType-chosen-select").parent(), "remove");
	        } else {
	            change_error_style($(".jumpType-chosen-select").parent(), "add");
	        }
	    });
	    
	    editAdvDlg.show();
	}
})

//表单校验
function validAdv(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "advert-title") {
                $(lableId).attr('tip', '广告标题为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "advert-text") {
                $(lableId).attr('tip', '广告备注为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "advert-type") {
                $(lableId).parent().attr('tip', '广告类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "jumpType") {
                $(lableId).parent().attr('tip', '广告跳转类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            if ($(lableId).attr("id") == "advert-title") {
                var name = $("#advert-title").val();
                if (name.length > 50) {
                    $(lableId).attr('tip', '广告标题不能超过50个字符');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "advert-text") {
                var name = $("#advert-text").val();
                if (name.length > 200) {
                    $(lableId).attr('tip', '广告备注不能超过200个字符');
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
