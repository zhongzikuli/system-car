//刪除
function deleteBank() {
    var ck = $("input[name='bank_input']:checked");
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
        confirmDialog("确认删除选中的银行信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/bank/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/bank/query.action?";
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

var config1 = {
    disable_search_threshold:10,
    no_results_text: '无数据',
    width:"150px"
};
$("#isAuto").chosen(config1);

var config = {
    disable_search_threshold:10,
    no_results_text: '无数据',
    width:"100%"
};

$(".pre-img").on("click",function(){
    $.openPhotoGallery(this)
})

//重置按钮
$(".reset-btn").on("click", function(){
    $("#isAuto").val("").trigger('chosen:updated');
});

//新增
function createBank() {
    var options = {
        width: 850,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '银行管理',
        onAfterShow: function () {
            uploadComp=  new HYUpload({
                auto: true,
                containerId: '#addUploader',
                uploadImg: false,						//图片上传标记
                dropTip: '或将图片拖到这里',
                buttonText: '选择图片',
                server: ctx + '/fdfs/uploadFile.action'
            });

            $.ajax({
                url: ctx + "/bank/getAllBankOrgans.action",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    var option = "";
                    option += "<option value=''>请选择</option>";
                    for (var i = 0; i < data.rows.length; i++) {
                        option += "<option value='" + data.rows[i].id + "'>" + data.rows[i].orgName + "</option>";
                    }
                    $("#relativeBankOrgId_create").empty().append(option).chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($("#relativeBankOrgId_create").parent(), "remove");
                        } else {
                            change_error_style($("#relativeBankOrgId_create").parent(), "add");
                        }
                    });
                }
            });
        },
        callback: function () {
            var flag = false;
            var connected = true;
            var fileLength = $(".filelist li").length;
            if (fileLength < 1) {
                faildMsg("请选择上传的图片");
                return flag
            } else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
                faildMsg("文件正在上传");
                return flag
            }

            $.ajax({
                url: ctx + "/bank/checkBankOrgan.action",
                type: "post",
                data: {
                    relativeBankOrgId : $("#relativeBankOrgId_create").val()
                },
                dataType: "json",
                async:false,
                success: function (data) {
                    if (data.error == -1) {
                        faildMsg("此银行组织已经关联");
                        connected = false;
                    }else if(data.error == 1){
                        faildMsg("银行组织不能为空");
                        connected = false;
                    }
                }
            });
            if ($("#bankForm").valid("bankForm") && connected) {
                loadingShow();
                $.ajax({
                    url: ctx + "/bank/add.action",
                    type: "post",
                    data: {
                        bankName : $("#bankName").val(),
                        bankShortName : $("#bankShortName").val(),
                        bankCode  : $("#bankCode").val(),
                        isAuto : $("#isAuto_create").val(),
                        videoInterview : $("#videoInterview_create").val(),
                        relativeBankOrgId  :$("#relativeBankOrgId_create").val(),
                        pictureFileGroup : $(".filelist li").data("group"),
                        pictureFilePath :$(".filelist li").data("filepath"),
                        pictureFileName : $(".filelist li").data("filename")
                    },
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/bank/query.action";
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

    //转拼音
    $("#bankShortName").blur(function(){
        var bankShortName=$("#bankShortName").val();
        if(null!=bankShortName){
            $.ajax({
                url: ctx + "/bank/changeToPinyin.action",
                type: "post",
                data: {
                    bankShortName:bankShortName
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        $("#bankCode").val(data.rows);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    });
    $("#isAuto_create").chosen(config);
    $("#videoInterview_create").chosen(config);
    creatDlg.show();
}

$(".start").on("click",function(){
    var id=$(this).attr("data-id");
    start(id);
});

$(".stop").on("click",function(){
    var id=$(this).attr("data-id");
    stop(id);
});

$(".isAuto").on("click",function(){
    var id=$(this).attr("data-id");
    isAuto(id);
});

$(".isNotAuto").on("click",function(){
    var id=$(this).attr("data-id");
    isNotAuto(id);
});

$(".isVideoInterview").on("click",function(){
    var id=$(this).attr("data-id");
    isVideoInterview(id);
});

$(".isNotVideoInterview").on("click",function(){
    var id=$(this).attr("data-id");
    isNotVideoInterview(id);
});

function isVideoInterview(id){
    $.ajax({
        url: ctx + "/bank/updateVideoInterview.action",
        type: "post",
        data:{
            id:id,
            videoInterview:1
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bank/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function isNotVideoInterview(id){
    $.ajax({
        url: ctx + "/bank/updateVideoInterview.action",
        type: "post",
        data:{
            id:id,
            videoInterview:0
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bank/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}


function isAuto(id){
    $.ajax({
        url: ctx + "/bank/updateIsAuto.action",
        type: "post",
        data:{
            id:id,
            isAuto:1
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bank/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function isNotAuto(id){
    $.ajax({
        url: ctx + "/bank/updateIsAuto.action",
        type: "post",
        data:{
            id:id,
            isAuto:0
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bank/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}


function start(id){
    $.ajax({
        url: ctx + "/bank/updateForbidden.action",
        type: "post",
        data:{
            id:id,
            forbiddenId:0
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bank/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function stop(id){
    $.ajax({
        url: ctx + "/bank/updateForbidden.action",
        type: "post",
        data:{
            id:id,
            forbiddenId:1
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/bank/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//编辑
function editInfo(id) {
    var options = {
        width: 850,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        onBeforeShow: function () {
            $.ajax({
                url: ctx + "/bank/getAllBankOrgans.action",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    var option = "";
                    var id="relativeBankOrgId_edit";
                    option += "<option value=''>请选择</option>";
                    for (var i = 0; i < data.rows.length; i++) {
                        option += "<option value='" + data.rows[i].id + "'>" + data.rows[i].orgName + "</option>";
                        $("#" + id).find("option").remove();
                        $("#" + id).append(option);
                    }
                    $("#" + id).trigger("chosen:updated");

                    //下拉框
                    $("#" + id).chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($("#" + id).parent(), "remove");
                        } else {
                            change_error_style($("#" + id).parent(), "add");
                        }
                    });
                }
            });
            $.ajax({
                url: ctx + "/bank/toEdit.action",
                type: "post",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        var bank = data.rows;
                        $("#id").val(id);
                        $("#bankName_edit").val(bank.bankName);
                        $("#bankShortName_edit").val(bank.bankShortName);
                        $("#bankCode_edit").val(bank.bankCode);
                        $("#isAuto_edit").val(bank.isAuto);
                        $("#videoInterview_edit").val(bank.videoInterview);
                        $("#relativeBankOrgId_edit").val(bank.relativeBankOrgId).trigger('chosen:updated');
                        $("#bank_files").attr({
                            "data-id": bank.id,
                            "data-path": bank.pictureFilePath,
                            "data-group": bank.pictureFileGroup,
                            "data-name": bank.pictureFileName
                        });
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
                    $("#isAuto_edit").chosen(config1);
                    $("#isAuto_edit").on('change', function(e, selected) {
                        if("" != selected){
                            change_error_style($("#isAuto_edit").parent(),"remove");
                        }else{
                            change_error_style($("#isAuto_edit").parent(), "add");
                        }
                    });
                    $("#videoInterview_edit").chosen(config1);
                    $("#videoInterview_edit").on('change', function(e, selected) {
                        if("" != selected){
                            change_error_style($("#videoInterview_edit").parent(),"remove");
                        }else{
                            change_error_style($("#videoInterview_edit").parent(), "add");
                        }
                    });
                }
            });
        },
        onAfterShow: function () {
            var preData = new Array();
            var fileId = $("#bank_files").attr("data-id");
            var fileGroup = $("#bank_files").attr("data-group");
            var filePath = $("#bank_files").attr("data-path");
            var fileName = $("#bank_files").attr("data-name");
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
            var connected = true;
            var fileLength = $(".filelist li").length;

            if (fileLength < 1) {
                faildMsg("请选择上传的图片");
                return flag
            } else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
                faildMsg("文件正在上传");
                return flag
            }

                var param = {};
                param.id = id;
                param.bankName = $("#bankName_edit").val();
                param.bankShortName = $("#bankShortName_edit").val();
                param.bankCode = $("#bankCode_edit").val();
                param.isAuto = $("#isAuto_edit").val();
                param.videoInterview = $("#videoInterview_edit").val();
                param.relativeBankOrgId = $("#relativeBankOrgId_edit").val();
                param.pictureFileGroup = $(".filelist li").data("group");
                param.pictureFilePath = $(".filelist li").data("filepath");
                param.pictureFileName = $(".filelist li").data("filename");
                $.ajax({
                    url: ctx + "/bank/checkBankOrgan.action",
                    type: "post",
                    data: {
                        id:id,
                        relativeBankOrgId : $("#relativeBankOrgId_edit").val()
                    },
                    dataType: "json",
                    async:false,
                    success: function (data) {
                        if (data.error == -1) {
                            faildMsg("此银行组织已经关联");
                            connected = false;
                        }else if(data.error == 1){
                            faildMsg("银行组织不能为空");
                            connected = false;
                        }
                    }
                });

                if ($("#bankForm_edit").valid("bankForm_edit")&& connected) {
                    loadingShow();
                    $.ajax({
                        url: ctx + "/bank/update.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                            success: function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        window.location.href = ctx + "/bank/query.action";
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
    var editAdvDlg = new Dialog("#bankEdit-dialog", options);

    $("#bankShortName_edit").blur(function(){
        var bankShortName_edit=$("#bankShortName_edit").val();
        if(null!=bankShortName_edit){
            $.ajax({
                url: ctx + "/bank/changeToPinyin.action",
                type: "post",
                data: {
                    bankShortName:bankShortName_edit
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        $("#bankCode_edit").val(data.rows);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    });
    editAdvDlg.show();
}


function detail(bankName,bankShortName,bankCode,isAuto,videoInterview,relativeBankOrg) {
    var options = {
        width: 500,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '查看',
        onBeforeShow: function () {
            function change(isAuto){
                if(isAuto==0){
                    return '否'
                }
                if(isAuto==1){
                    return '是'
                }
            }
            $("#bankName_detail").val(bankName);
            $("#bankShortName_detail").val(bankShortName);
            $("#bankCode_detail").val(bankCode);
            $("#isAuto_detail").val(change(isAuto));
            $("#videoInterview_detail").val(change(videoInterview));
            $("#relativeBankOrgId_detail").val(relativeBankOrg);
        }
    };
    creatDlg = new Dialog("#bankDetail-dialog", options);
    creatDlg.show();
}

//表单校验
function bankForm(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "bankName") {
                $(lableId).attr('tip', '银行名称为空，请重新输入。');
                return "faild";
            }else if  ($(lableId).attr("id") == "bankCode") {
                $(lableId).attr('tip', '银行标识为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "bankName_edit") {
                $(lableId).attr('tip', '银行名称为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "bankCode_edit") {
                $(lableId).attr('tip', '银行标识为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "bankShortName") {
                $(lableId).attr('tip', '银行简称为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "bankShortName_edit") {
                $(lableId).attr('tip', '银行简称为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "isAuto_create" ||
                $(lableId).attr("id") == "isAuto_edit") {
                $(lableId).parent().attr('tip', '是否自动对接不能为空。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "relativeBankOrgId_create" ||
                $(lableId).attr("id") == "relativeBankOrgId_edit") {
                $(lableId).parent().attr('tip', '关联银行组织不能为空。').addClass("input_validation-failed");
                return "faild";
            } else if ($(lableId).attr("id") == "videoInterview_create" ||
                $(lableId).attr("id") == "videoInterview_edit") {
                $(lableId).parent().attr('tip', '是否需要做视频面签不能为空。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}




