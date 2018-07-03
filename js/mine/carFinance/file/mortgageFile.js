jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    loadData($("#oneType").val());
    //新增按钮事件
    $("#search-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "160px"
    }).on('change', function (e, param) {

        if (param["selected"] == "15") {
            $("#item-16, #item-other").find(".pre-img").hide();
            $("#item-16, #item-other").hide();
            $("#item-15").find(".pre-img").show();
            $("#item-15").find('.checkOne').each(function () {
                $(this).prop("checked", false);
            })
            $(".check-btn").html('全选')
        } else if (param["selected"] == "16") {
            $("#item-15, #item-other").hide();
            $("#item-15, #item-other").find(".pre-img").hide();
            $("#item-16").show();
            $("#item-16").find(".pre-img").show();
            $("#item-16").find('.checkOne').each(function () {
                $(this).prop("checked", false);
            })
            $(".check-btn").html('全选')
        } else {
            $("#item-15, #item-16, #item-other").find(".pre-img").show();
            $("#item-15, #item-16, #item-other").show();
        }
    });
    $(".add-btn").on("click", function () {
        var type = $(this).attr("data-type");
        createFile(type);
    });


    $(".check-btn").on("click", function () {
        if ($("#search-select").val() == 15) {
            var ck = $("#item-15").find("input[name='fileList_input']:checked").length;
            var length = $("#item-15").find(".checkOne").length;
            if (ck != length) {
                $(this).html('取消全选')
                $("#item-15").find('.checkOne').each(function () {
                    $("#item-15").find("input[name='fileList_input']").prop("checked", true);
                })
            } else {
                $(this).html('全选')
                $("#item-15").find('.checkOne').each(function () {
                    $("#item-15").find("input[name='fileList_input']").prop("checked", false);
                })
            }
        } else if ($("#search-select").val() == 16) {
            var ck = $("#item-16").find("input[name='fileList_input']:checked").length;
            var length = $("#item-16").find(".checkOne").length;
            if (ck != length) {
                $(this).html('取消全选')
                $("#item-16").find('.checkOne').each(function () {
                    $("#item-16").find("input[name='fileList_input']").prop("checked", true);
                })
            } else {
                $(this).html('全选')
                $("#item-16").find('.checkOne').each(function () {
                    $("#item-16").find("input[name='fileList_input']").prop("checked", false);
                })
            }
        } else {
            var ck = $("input[name='fileList_input']:checked").length;
            var length = $(".checkOne").length;
            if (ck != length) {
                $(this).html('取消全选')
                $(".mod_basic").find('.checkOne').each(function () {
                    $(this).prop("checked", true);
                })
            } else {
                $(this).html('全选')
                $(".mod_basic").find('.checkOne').each(function () {
                    $(this).prop("checked", false);
                })
            }
        }

    });

    //新增资料
    var uploadComp = null;

    function createFile(type) {
        var options = {
            width: 690,
            top: 200,
            height: 530,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onAfterShow: function () {
                uploadComp = new HYUpload({
                    auto: true,
                    fileNumLimit: 100,
                    containerId: '#uploader',
                    uploadImg: false,//图片上传标记
                    fileSizeLimit: 1048576 * 500,
                    fileSingleSizeLimit: 1048576 * 10,
                    dropTip: '',
                    formData: {filetype: 3},
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
                    if (typeof($(this).data("filepath")) != "undefined") {
                        var file = {};
                        file.fileGroup = $(this).data("group");
                        file.fileChildType = type;
                        file.filePath = $(this).data("filepath");
                        file.fileName = $(this).data("filename");
                        fileList.push(file);
                    }
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
                    param.businessOrderAcceptId = $("#OrderAcceptId").val();
                    param.list = fileList;
                    if ($("#fileCreateForm").valid("fileCreateForm")) {
                        loadingShow();
                        $.ajax({
                            url: ctx + "/cfMortgageRegist/createMortgageFile.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        var btype = $("#bType").val()
                                        window.location.href = ctx + "/cfMortgageRegist/preMortgageFile.action?id=" + aid + "&type=" + $("#oneType").val() + "&goBackUrl=" + $("#goBackUrl").val();
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
    function loadData(type) {
        //$("#files").html("");
        //显示loading提示
        loadingShow();
        $.ajax({
            url: ctx + "/cfFileCenter/queryAuditFile.action",
            type: "get",
            dataType: 'json',
            data: {
                'businessOrderAcceptId': $("#OrderAcceptId").val(),
                'type': type

            },
            success: function (data) {
                //关闭loading提示
                loadingHide();
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["list"].length > 0) {
                        loadContent(type, data)
                        /* } else {
                         $("#files").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');*/
                    }
                }
            },
            error: function () {

            }
        });
    }
    
    function loadPic(itemHtml,item,ext){
    	itemHtml +='<div class="col-sm-2">' +
	        '<div class="file" style="text-align: center; margin: 0;">' +
	        '<input type="checkbox" class="checkOne" name="fileList_input" value="' + item["filePath"] + '">';
	    if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
	        itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
	    } else {
	        itemHtml += '<img  class="pre-img" src="' + staticUrl + item["fileGroup"] + '/' + item["filePath"] + '" alt="">';
	    }
	    itemHtml += '<div class="file-name">' + item["fileName"] + '</div><i class="fa fa-times-circle" data-id="' + item["filePath"] + '"></i></div></div>';
	    return itemHtml;
    }
    
    function loadContent(type, data) {
        $("#oneAuditId").val(data["rows"]["oneAuditId"]);
        var item = data["rows"]["list"];
        $("#files2").html('<p class="text-center  no-data">暂无数据</p>');
        for (var i = 0; i < item.length; i++) {
            var fileName = item[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart, fileName.length).toUpperCase();
            var fileChildType = item[i]["fileChildType"]
            if (fileName != null || fileName != "") {
                if (fileChildType == 15) {
                	var itemHtml = '';
                    itemHtml += loadPic(itemHtml,item[i],ext);
                    $("#files .add-btn").before(itemHtml);
                } else if (fileChildType == 16) {
                	var itemHtml = '';
                    itemHtml += loadPic(itemHtml,item[i],ext);
                    $("#files1 .add-btn").before(itemHtml);
                }
                if (fileChildType == "" ||fileChildType==null ) {
                	var itemHtml = '';
                    itemHtml += loadPic(itemHtml,item[i],ext);
                    $("#files2").html(itemHtml);
                }
            }
        }
        $(".file-name").on("click", function () {
            $(this).prev().prev("input").trigger("click");
        });
        $(".file .fa-times-circle").on("click", function () {
            var id = $(this).attr("data-id")
            var advertTitle = $("#advertTitle").val();
            var advertType = $("#advertType").val();
            deleteOneFile(advertTitle, advertType, id);
        })
        $(".checkOne").on("click", function () {
            if ($("#search-select").val() == 15) {
                var ck = $("#item-15").find("input[name='fileList_input']:checked").length;
                var length = $("#item-15").find(".checkOne").length;
                if (ck != length) {
                    $(".check-btn").html('全选')
                } else {
                    $(".check-btn").html('取消全选')
                }
            } else if ($("#search-select").val() == 16) {
                var ck = $("#item-16").find("input[name='fileList_input']:checked").length;
                var length = $("#item-16").find(".checkOne").length;
                if (ck != length) {
                    $(".check-btn").html('全选')
                } else {
                    $(".check-btn").html('取消全选')
                }
            } else {
                var ck = $("input[name='fileList_input']:checked").length;
                var length = $(".checkOne").length;
                if (ck != length) {
                    $(".check-btn").html('全选')
                } else {
                    $(".check-btn").html('取消全选')
                }
            }
        })
        $(".pre-img").on("click", function () {
            $.openPhotoGallery(this)
        })
    }
});
function deleteOneFile(title, type, id) {
    confirmDialog("确认删除选中的文件吗？", function () {
        var params = {}
        var idArr = new Array();
        idArr.push(id);
        params.idArr = idArr.toString();
        params.acceptId = $("#OrderAcceptId").val()
        loadingShow();
        $.ajax({
            url: ctx + "/cfMortgageRegist/deleteMortgageFile.action",
            type: "post",
            data: params,
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1) {
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfMortgageRegist/preMortgageFile.action?id=" + $("#OrderAcceptId").val() + "&goBackUrl=" + $("#goBackUrl").val();
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
            params.acceptId = $("#OrderAcceptId").val()
            loadingShow();
            $.ajax({
                url: ctx + "/cfMortgageRegist/deleteMortgageFile.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/cfMortgageRegist/preMortgageFile.action?id=" + $("#OrderAcceptId").val() + "&goBackUrl=" + $("#goBackUrl").val();
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
//确定提交
function commit(acceptId, oneType) {
    confirmDialog("确认提交抵押资料吗？", function () {
        var filelength = $("#files input").length;
        var length = $("#files1 input").length;
        if (filelength <= 0 && length <= 0) {
            faildMsg("抵押材料不能为空");
        } else {
            loadingShow();
            $.ajax({
                url: ctx + "/cfMortgageRegist/mortgageileSubmit.action",
                type: "post",
                data: {
                    "orderId": acceptId,
                    "oneType": oneType,
                    'id': $("#oneAuditId").val()
                },
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            if($("#goBackUrl").val()!=null && $("#goBackUrl").val()!='' ){
                                window.location.href = ctx + "/cfMortgageRegist/uploadMortgage.action";
                            }else {
                                closeTabForParent(ctx+"/cfMortgageRegist/preMortgageFile.action?id=" + acceptId);
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

function downloadFile(title, type) {
    var aid = $("#oneAuditId").val();
    if (aid == null || aid == undefined || aid == '') {
        faildMsg("请上传文件后再点击下载按钮");
    } else {
        confirmDialog("确认下载订单相关文件吗？", function () {
            window.location.href = ctx + "/cfMortgageRegist/downLoadeMortgageFile.action?id=" + aid;
        })
    }
}
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