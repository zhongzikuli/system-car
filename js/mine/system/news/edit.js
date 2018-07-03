jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
	  	//图片查看
		$(".pre-img").on("click",function(){
		$.openPhotoGallery(this)
		});
        //初始化下拉框
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        };
        $(".type_edit").chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($(".type_edit").parent(), "remove");
                $("#vtip").hide();
            } else {
                change_error_style($(".type_edit").parent(), "add");
            }
        });
        $(".isRecommand_edit").chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($(".isRecommand_edit").parent(), "remove");
                $("#vtip").hide();
            } else {
                change_error_style($(".isRecommand_edit").parent(), "add");
            }
        });
        
        var preData = new Array();
        var fileId = $("#newsFile").attr("data-id");
        var fileGroup = $("#newsFile").attr("data-group");
        var filePath = $("#newsFile").attr("data-path");
        var fileName = $("#newsFile").attr("data-name");
        var temp = {
            "fileId": fileId,
            "fileGroup": fileGroup,
            "filePath": filePath,
            "fileName": fileName
        };
        preData.push(temp);
        new HYUpload({
            auto: true,
            containerId: '#editUploader',
            uploadImg: false,						//图片上传标记
            dropTip: '或将图片拖到这里',
            buttonText: '选择图片',
            formData: {filetype: 1},
            initData: preData,
            server: ctx + '/fdfs/uploadFile.action'
        });

        //编辑公告编辑栏实例化
        var ue = UE.getEditor('content');
        ue.ready(function () {
            var temp = ue.setContent($("#temp").val());
        });
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function (action) {
            if (action == 'uploadimage') {
                return ctx + '/notice/uploadFile.action';
            } else {
                return this._bkGetActionUrl.call(this, action);
            }
        };

        new ValidateWin("#productEdit-Form", {
            callback: function (content, event) {
            	var flag = false;
            	var param = {};
                var fileLength = $(".filelist li").length;
                if (fileLength < 1) {
                    faildMsg("请选择上传的图片");
                    return false;
                } else {
                	param.fileGroup = $(".filelist li").data("group");
                    param.filePath = $(".filelist li").data("filepath");
                    param.fileName = $(".filelist li").data("filename");
                    param.title = $("#title").val();
                    param.type = $("#type").val();
                    param.isRecommand = $("#isRecommand").val();
                    param.id=$("#id").val();
                    param.content = ue.getContent();
                    if(param.content.length<1){
                    	faildMsg("产品内容为空，请重新输入内容");
                    	return
                    }
                }
                if ($("#newsEditForm").valid("newsEditForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/news/edit.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    dataType: "json",
                    async: false,
                    success: function (data) {
                    	loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/news/query.action";
                            });
                        } else if (data.error == -100) {
                            loadingHide();
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            loadingHide();
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
    }
);

function validProduce(lableId){
	if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "type") {
                $(lableId).parent().attr('tip', '资讯类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "isRecommand") {
                $(lableId).parent().attr('tip', '推荐内容不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}
