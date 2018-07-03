jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
        //初始化下拉框
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "100%"
        };
        $(".insuranceType_edit").chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($(".insuranceType_edit").parent(), "remove");
                $("#vtip").hide();
            } else {
                change_error_style($(".insuranceType_edit").parent(), "add");
            }
        });
        $(".status_edit").chosen(config).on('change', function (e, selected) {
            if ("" != selected) {
                change_error_style($(".status_edit").parent(), "remove");
                $("#vtip").hide();
            } else {
                change_error_style($(".status_edit").parent(), "add");
            }
        });
        
        var preData = new Array();
        var fileId = $("#insuranceFile").attr("data-id");
        var fileGroup = $("#insuranceFile").attr("data-group");
        var filePath = $("#insuranceFile").attr("data-path");
        var fileName = $("#insuranceFile").attr("data-name");
        var temp = {
            "fileId": fileId,
            "fileGroup": fileGroup,
            "filePath": filePath,
            "fileName": fileName
        };
        preData.push(temp);

    var uploadComp = null;
    uploadComp=new HYUpload({
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
//	        return this._bkGetActionUrl.call(this,action);
                return ctx + '/insuranceManage/uploadFile.action';
            } else {
                return this._bkGetActionUrl.call(this, action);
            }
        };

        new ValidateWin("#productEdit-Form", {
            callback: function (content, event) {
                var param = getPic();
                loadingShow();
                $.ajax({
                    url: ctx + "/insuranceManage/edit.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(getPic()),
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.error == 1) {
                            loadingHide();
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/insuranceManage/query.action";
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
            }
        });

        function getPic() {
            var param = {};
            var fileLength = $(".filelist li").length;
            if (fileLength < 1) {
                faildMsg("请选择上传的图片");
                return false;
            } else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
                faildMsg("图片正在上传");
                return flag
            } else {
                param.fileGroup = $(".filelist li").data("group");
                param.filePath = $(".filelist li").data("filepath");
                param.fileName = $(".filelist li").data("filename");
                param.title = $("#title_edit").val();
                param.insuranceType = $("#insuranceType_edit").val();
                param.status = $("#status_edit").val();
                param.id = $("#insuranceId").val();
                param.content = ue.getContent();
                if(param.content.length<1){
                	faildMsg("产品内容为空，请重新输入内容");
                	return
                }
            }
            return param
        }
    }
);

function validProduce(lableId){
	if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "insuranceType_edit") {
                $(lableId).parent().attr('tip', '保险类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "status_edit") {
                $(lableId).parent().attr('tip', '保险状态不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}