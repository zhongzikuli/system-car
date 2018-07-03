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
        $(".type").chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($(".newsType").parent(), "remove");
                $("#vtip").hide();
            } else {
                change_error_style($(".newsType").parent(), "add");
            }
        });
        $(".isRecommand").chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($(".status").parent(), "remove");
                $("#vtip").hide();
            } else {
                change_error_style($(".status").parent(), "add");
            }
        });
        
        new HYUpload({
            auto: true,
            containerId: '#addUploader',
            uploadImg: false,						//图片上传标记
            dropTip: '或将图片拖到这里',
            buttonText: '选择图片',
            formData: {filetype: 1},
            server: ctx + '/fdfs/uploadFile.action'
        });

        //新增公告编辑栏实例化
        var ue = UE.getEditor('addEditor');
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function (action) {
            if (action == 'uploadimage') {
                return ctx + '/notice/uploadFile.action';
            } else {
                return this._bkGetActionUrl.call(this, action);
            }
        };

        new ValidateWin("#productCreate-Form", {
            callback: function (content, event) {
                var param = {};
                var flag = false;
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
                    param.content = ue.getContent();
                    if(param.content.length<1){
                    	faildMsg("产品内容为空，请重新输入内容");
                    	return
                    }
                }
                if ($("#newsCreateForm").valid("newsCreateForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/news/create.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.error == 1) {
                            loadingHide();
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/news/query.action";
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
