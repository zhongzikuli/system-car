jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    var pageSize = 18;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;
    loadData($("#type").val(), 0, null, pageSize);
    //新增按钮事件

    $(".add-btn").on("click", function () {
        var type = $(this).attr("data-type");
        createFile(type);
    });
    $(".check-btn").on("click", function () {
        var $that = $(this);
        var ck = $("input[name='fileList_input']:checked").length;
        var length = $(".checkOne").length;
        if (ck != length) {
            $that.html('取消全选')
            $(".mod_basic").find('.checkOne').each(function () {
                $(this).prop("checked", true);
            })
        } else {
            $that.html('全选')
            $(".mod_basic").find('.checkOne').each(function () {
                $(this).prop("checked", false);
            })
        }
    });
    //新增资料
    var uploadComp = null;

    function createFile(type) {
        var flag =false;
        if(type==34){
            flag =true
        }
        var options = {
            width: flag? 400:690,
            top: 200,
            height:flag? 500:500,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onAfterShow: function () {
                uploadComp = new HYUpload({
                    auto: true,
                    fileNumLimit: flag? 1:100,
                    containerId: '#uploader',
                    uploadImg: false,//图片上传标记
                    fileSizeLimit: 1048576 * 500,
                    formData: {filetype: 3},
                    fileSingleSizeLimit: 1048576 * 10,
                    dropTip: '',
                    buttonText: '选择文件',
                    server: ctx + '/fdfs/uploadFile.action'
                });
                $(".filelist").css('overflow', 'auto');
                //下拉框初始化
                var config = {
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "100%"
                };
                //下拉框
                $(".file-type").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($(".file-type").parent(), "remove");
                        if (selected.selected === "4") {
                            $("#hidden-select").show();
                        } else {
                            $("#hidden-select").hide();
                        }
                    } else {
                        change_error_style($(".file-type").parent(), "add");
                    }
                });
                $(".file-childType").chosen(config);
            },
            onAfterHide: function () {
                $("#vtip").hide()
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    file.fileGroup = $(this).data("group");
                    file.filePath = $(this).data("filepath");
                    file.fileName = $(this).data("filename");
                    file.fileChildType = type;
                    fileList.push(file);
                });

                if (fileList < 1) {
                    faildMsg("请选择上传的文件");
                    return flag
                } else if (null != uploadComp && uploadComp.uploader.isInProgress()) {
                    faildMsg("文件正在上传");
                    return flag
                } else {
                    var aid = $("#OrderAcceptId").val();
                    var param = {};
                    if ($("#hidden-select").is(':hidden')) {
                        param.businessOrderAcceptId = $("#OrderAcceptId").val();
                        param.fileType = $("#type").val();
                        param.list = fileList;
                    } else {
                        param.businessOrderAcceptId = $("#OrderAcceptId").val();
                        param.fileType = $("#type").val();
                        param.list = fileList;

                    }
                    param.fileChildType = type;
                    if ($("#fileCreateForm").valid("fileCreateForm")) {
                        loadingShow();
                        $.ajax({
                            url: ctx + "/installmentFile/uploadInstallmentFile.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        window.location.href = ctx + "/installmentFile/preUploadInstallment.action?id=" + aid + "&goBackUrl=" + $("#goBackUrl").val()+'&viewSource=' + $("#viewSource").val();
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
        var creatFileDlg = new Dialog("#fileCreate-dialog", options);
        creatFileDlg.show();
    };


    //ajax分页查询面签数据
    function loadData(type, currPage, jg, pageSize) {
        $("#files").html("");
        //显示loading提示
        loadingShow();
        $.ajax({
            url: ctx + "/cfFileCenter/queryParentFile.action",
            type: "post",
            dataType: 'json',
            data: {
                'pageNum': currPage,
                'numPerPage': pageSize,
                'businessOrderAcceptId': $("#OrderAcceptId").val(),
                'type': type
            },
            success: function (data) {
                //关闭loading提示
                loadingHide();
                if (data.error == 1) {
                    if (data["rows"] != null ) {
                        if (initFlag) {

                            initFlag = false;
                        }
                        loadContent(type, data)
                    } else {
                        $("#files").html('<p class="text-center  no-data">暂无数据</p>');
                        $("#pagination").html("");
                    }
                } else {
                    $("#files").html('<p class="text-center  no-data">暂无数据</p>');
                    $("#pagination").html("");
                }
            },
            error: function () {

            }
        });
    }
    
    function loadPic(itemHtml,item,ext){
    	itemHtml += '<div class="col-sm-2">' +
		        '<div class="file" style="text-align: center; margin: 0;">' +
		        '<input type="checkbox" class="checkOne" name="fileList_input" value="' + item["id"] + '">';
	    if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
	        itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
	    } else {
	        itemHtml += '<img  class="pre-img" src="' + staticUrl + item["fileGroup"] + '/' + item["filePath"] + '" alt="">';
	    }
	    itemHtml += '<div class="file-name">' + item["fileChildTypeStr"]+ item["fileName"] + '</div></div></div>';
	    return itemHtml;
    }
    
    function loadContent(type, data) {
        var item = data["rows"];
        $("#OrderAcceptId").val(item[0]["businessOrderAcceptId"])
        $("#files").html('<p class="text-center  no-data">暂无数据</p>');
        for (var i = 0; i < item.length; i++) {
            var fileName = item[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart, fileName.length).toUpperCase();
            var fileChildType = item[i]["fileChildType"]
            if (fileName != null || fileName != "") {
                if (fileChildType == 31) {
                	 var itemHtml = '';
                 	 itemHtml += loadPic(itemHtml, item[i],ext);
                     $("#files31 .add-btn").before(itemHtml);
                } else if (fileChildType == 32) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files32 .add-btn").before(itemHtml);
                }else if (fileChildType == 33) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files33 .add-btn").before(itemHtml);
                }else if (fileChildType == 34) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files34 .add-btn").before(itemHtml).hide();
                }else if (fileChildType == 35) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files35 .add-btn").before(itemHtml);
                }else if (fileChildType == 36) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files36 .add-btn").before(itemHtml);
                }else if (fileChildType == 37) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files37 .add-btn").before(itemHtml);
                }else if (fileChildType == 38) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files38 .add-btn").before(itemHtml);
                }else if (fileChildType == 39) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files39 .add-btn").before(itemHtml);
                }else if (fileChildType == 45) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files45 .add-btn").before(itemHtml);
                }
                if (fileChildType == "" ||fileChildType==null ) {
                	var itemHtml = '';
                	 itemHtml += loadPic(itemHtml, item[i],ext);
                    $("#files").html(itemHtml);
                }
            }
        }
        $(".file-name").on("click", function () {
            $(this).prev().prev("input").trigger("click");
        });
        $(".checkOne").on("click", function () {
            var ck = $("input[name='fileList_input']:checked").length;
            var length = $(".checkOne").length;
            if (ck != length) {
                $(".check-btn").html('全选')
            } else {
                $(".check-btn").html('取消全选')
            }
        })
        $(".pre-img").on("click", function () {
            $.openPhotoGallery(this)
        })
    }
});
//校验
function validFile(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "file-type") {
                $(lableId).parent().attr('tip', '文件类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if ($("#hidden-select").is(':hidden')) {

            } else {
                if ($(lableId).attr("id") == "file-childType") {
                    $(lableId).parent().attr('tip', '文件类型不能为空，请重新输入。').addClass("input_validation-failed");
                    return "faild";
                }
            }
            return "success";
        }
        return "success";
    }
}

//确定提交
function commit(acceptId) {
    confirmDialog("确认提交分期文件吗？", function () {
        var length31 = $("#files31 input").length;
        var length32 = $("#files32 input").length;
        var length33 = $("#files33 input").length;
        var length34 = $("#files34 input").length;
        var length45 = $("#files45 input").length;
        if (length31 <= 0 ||length32 <= 0 ||length33<=0 ||length34<=0 ||length45<=0) {
            faildMsg("分期资料必传项未齐全");
        } else {
            loadingShow();
            $.ajax({
                url: ctx + "/installmentFile/installmentFileSubmit.action",
                type: "post",
                data: {
                    "orderId": acceptId
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {

                            if ($("#goBackUrl").val() != null && $("#goBackUrl").val() != '') {
                                window.location.href = ctx + "/installmentFile/installmentFileList.action";
                            }
                            if ($("#viewSource").val() == 'homepage') {
                                closeParentCurrentTab();
                            } else {
                                closeTabForParent(ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + acceptId);
                            }
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    })
}
function deleteFile(title, type) {
    var ck = $("input[name='fileList_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要删除的文件。");
        return
    } else {
        var idArr = new Array();
        $(ck).each(function () {
            idArr.push($(this).val());
        });
        confirmDialog("确认删除选中的文件吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/installmentFile/deleteInstallmentFile.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/installmentFile/preUploadInstallment.action?id=" + $("#OrderAcceptId").val() + "&goBackUrl=" + $("#goBackUrl").val();
                            ;
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
function downloadFile(title, type) {
    var fileType = $("#type").val();
    var aid = $("#OrderAcceptId").val();
    confirmDialog("确认下载订单相关文件吗？", function () {
        window.location.href = ctx + "/installmentFile/installmentDownload.action?fileType=" + fileType + "&aId=" + aid;
    })
}
