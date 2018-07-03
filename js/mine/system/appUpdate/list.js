$(document).ready(function () {
    var start = {
        elem: '#search-app-start-date',
        format: 'YYYY-MM-DD ',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            end.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#search-app-end-date',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            start.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(start);
    laydate(end);
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });

});

//删除app
function deleteApp() {
    var ck = $("input[name='appList_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要删除的信息。");
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
            alertDialog("所选信息包含无效信息，不允许删除");
            return false;
        }
        confirmDialog("确认删除选中的App信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/appUpdate/toDelete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/appUpdate/query.action";
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

//上传APP
var uploadComp = null;
function appUpload() {
    var options = {
        width: 600,
        top: 200,
        height: 380,
        overlay: true,
        dispose: true,
        move: true,
        title: '上传',
        onAfterShow: function (){
        	uploadComp=new HYUpload({
        		auto		: true,
        		containerId	: '#uploader',
        		uploadImg	: false,						//图片上传标记
        		dropTip		:'',
        		buttonText	: '选择APK',
        		formData: {filetype: 2},
        		chunked: false,
        		fileSizeLimit: 1048576*30,				//设置文件总大小
        	    fileSingleSizeLimit: 1048576*30,			//设置单个文件大小
        		server		: ctx + '/fdfs/uploadFile.action'
        	});
        },
        callback: function () {
            var flag = false;
            var filesrc = $(".filelist li").length;
            if(filesrc<1){
				 faildMsg("请选择上传的文件")
				 return flag
			}else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
             	 faildMsg("文件正在上传");
                 return flag
           }else if($(".filelist li").data("filepath")==''||$(".filelist li").data("filepath")==undefined){
				faildMsg("请选择上传的文件")
				 return flag
			}else{
            var param = {};
			param.name = $("#app-name").val();
			param.type = $("#app-type").val();
			param.version = $("#app-version").val();
			param.remark = $("#app-remark").val();
			param.fileGroup = $(".filelist li").data("group");
			param.filePath = $(".filelist li").data("filepath");
			param.fileName = $(".filelist li").data("filename");
            if ($("#appForm").valid("appForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/appUpdate/create.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/appUpdate/query.action";
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
    var uploadDlg = new Dialog("#appCreate-dialog", options);
    
  //下拉框初始化
	var config = {
		disable_search_threshold:10,
		no_results_text: '无数据',
		width:"100%"
	};
	//下拉框
	$(".app-type").chosen(config);
	$(".app-type").on('change', function(e, selected) {
		if("" != selected){
			change_error_style($(".app-type").parent(),"remove");
		}else{
			change_error_style($(".app-type").parent(), "add");
		}
	});
	
    uploadDlg.show();
}
//APP上传表单校验
function validAppForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "app-name") {
                $(lableId).attr('tip', 'App名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "app-version") {
                $(lableId).attr('tip', 'App的版本号为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "app-remark") {
                $(lableId).attr('tip', 'App备注为空，请重新输入。');
                return "faild";
            }else if ($(lableId).attr("id") == "app-type") {
            	 $(lableId).parent().attr('tip', 'App类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            //新建
            if ($(lableId).attr("id") == "app-version") {
                if (!(/^\d[\d\.]+\d$/).exec(_this.val())) {
                    $(lableId).attr('tip', '请输入格式正确的版本号信息');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "app-name") {
                var name = $("#app-name").val();
                if (name.length > 50) {
                    $(lableId).attr('tip', 'app名称不能超过50个字符');
                    return "faild";
                } else {
                    return "success";
                }
            }
            if ($(lableId).attr("id") == "app-remark") {
                var name = $("#app-remark").val();
                if (name.length > 500) {
                    $(lableId).attr('tip', 'APP相关备注不能超过500个字符');
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
function editStop(id) {
    $("#start" + id).hide();
    $("#stop" + id).show();
    loadingShow();
    $.ajax({
        url: ctx + "/appUpdate/updateStatus.action",
        type: "post",
        data: {
            "id": id,
            "isValid": 1
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/appUpdate/query.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function editStart(id) {
    $("#start" + id).show();
    $("#stop" + id).hide();
    loadingShow();
    $.ajax({
        url: ctx + "/appUpdate/updateStatus.action",
        type: "post",
        data: {
            "id": id,
            "isValid": 0
        },
        dataType: "json",
        success: function (data) {
            loadingHide();
            if (data.error == 1) {
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/appUpdate/query.action";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}
//function validate(_this) {
//    if (_this.attr("id") == "level-chosen") {
//        if ("" == _this.find("select").val()) {
//            return false;
//        } else {
//            return true;
//        }
//    } else {
//        if ("" == _this.find("input").val()) {
//            return false;
//        } else {
//            return true;
//        }
//    }
//}
