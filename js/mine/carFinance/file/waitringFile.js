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
	$(".add-btn").on("click",function () {
		var type = $(this).attr("data-type");
		createFile(type);
    });
	$(".check-btn").on("click", function () {
		var $that = $(this);
		var ck = $("input[name='fileList_input']:checked").length;
		var  length =$(".checkOne").length;
		if(ck!=length){
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
    
	function createFile(type){
	    var options = {
	        width: 690,
	        top: 200,
	        height: 500 ,
	        overlay: true,
	        dispose: true,
	        move: true,
	        title: '新增',
	        onAfterShow: function (){
	        	uploadComp= new HYUpload({
	                auto		: true,
	                fileNumLimit: 100,
	                containerId	: '#uploader',
	                uploadImg	: false,//图片上传标记	
	                fileSizeLimit: 1048576*500,
	                fileSingleSizeLimit: 1048576*10,
	                formData: {filetype: 3},
	                dropTip		:'',
	                buttonText	: '选择文件',
	                server		: ctx + '/fdfs/uploadFile.action'
	            });
	            $(".filelist").css('overflow','auto');
	            //下拉框初始化
	    		var config = {
	    			disable_search_threshold:10,
	    			no_results_text: '无数据',
	    			width:"100%"
	    		};
	    		//下拉框
	    		$(".file-type").chosen(config).on('change', function(e, selected) {
	    			if("" != selected){
	    				change_error_style($(".file-type").parent(),"remove");
	    				if(selected.selected==="4"){
	    					$("#hidden-select").show();
	    				}else{
	    					$("#hidden-select").hide();
	    				}
	    			}else{
	    				change_error_style($(".file-type").parent(), "add");
	    			}
	    		});
	    		$(".file-childType").chosen(config);
	        },
	        onAfterHide: function(){
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
					file.fileType=type;
					file.fileName = $(this).data("filename");
					fileList.push(file);
				});

	            if(fileList <1){
	                faildMsg("请选择上传的文件");
	                return flag
	            }else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
	              	 faildMsg("文件正在上传");
	                 return flag
	           }else{
	            	var aid= $("#OrderAcceptId").val();
	                var param = {};
	                if($("#hidden-select").is(':hidden')){
	                	param.businessOrderAcceptId=$("#OrderAcceptId").val();
	                	param.list=fileList;
	                }else{
	                	param.businessOrderAcceptId=$("#OrderAcceptId").val();
	                	param.list=fileList;
	                }
	                if ($("#fileCreateForm").valid("fileCreateForm")) {
	                	loadingShow();
						$.ajax({
	                    	url: ctx + "/cfSupplyMaterial/createWaitingFile.action",
	        				type: "post",
	        				contentType: "application/json",
	        				data: JSON.stringify(param),
	        				dataType:"json",
	        				success:function (data) {
	        					if (data.error == 1) {
	        						successMsg("操作成功！", 1000, function () {
	        							var btype= $("#bType").val()
	        							window.location.href = ctx + "/cfSupplyMaterial/preWaitingFile.action?id="+aid+"&type="+$("#oneType").val()+"&goBackUrl="+$("#goBackUrl").val();;
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
	function loadData(type){
		//显示loading提示
	    loadingShow();
		$.ajax({
	        url: ctx + "/cfFileCenter/queryAuditFile.action",
	        type: "get",
	        dataType: 'json',
	        data: {
	            'businessOrderAcceptId':$("#OrderAcceptId").val(),
	            'type': type
	            
	        	},
	        success: function (data) {
	        	//关闭loading提示
	            loadingHide();
	            if (data.error == 1) {
	                if (data["rows"] != null && data["rows"]["list"].length>0) {
	                    loadContent(type, data)
	                } else {
	                	$("#files2").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');
	                }
	            }
	        },
	        error: function () {

	        }
	    });
	}
	
	function loadContent(type, data){
		$("#oneAuditId").val(data["rows"]["oneAuditId"])
		viewdata =data["rows"];
		var item =data["rows"]["list"];
		var itemHtml='';
		for(var i= 0 ; i<item.length; i++ ){
			var fileName = item[i]["fileName"];
			var extStart = fileName.lastIndexOf(".");
			var ext = fileName.substring(extStart,fileName.length).toUpperCase();
			var fileChildType = item[i]["fileType"]
			if ((fileName != null || fileName != "" ) ) {
				if (fileChildType == 4) {
					itemHtml = '<div class="col-sm-2">' +
						'<div class="file" style="text-align: center; margin: 0;">' +
						'<input type="checkbox" class="checkOne" name="fileList_input" value="' + item[i]["filePath"] + '">';
					if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
						itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
					} else {
						itemHtml += '<img  class="pre-img" src="' + staticUrl + item[i]["fileGroup"] + '/' + item[i]["filePath"] + '" alt="">';
					}
					itemHtml += '<div class="file-name">' + item[i]["fileName"] + '</div>';
					$("#files .add-btn").before(itemHtml);

				} else if (fileChildType == 7) {

					itemHtml = '<div class="col-sm-2">' +
						'<div class="file" style="text-align: center; margin: 0;">' +
						'<input type="checkbox" class="checkOne" name="fileList_input" value="' + item[i]["filePath"] + '">';
					if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
						itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
					} else {
						itemHtml += '<img  class="pre-img"  src="' + staticUrl + item[i]["fileGroup"] + '/' + item[i]["filePath"] + '" alt="">';
					}
					itemHtml += '<div class="file-name">' + item[i]["fileName"] + '</div></div>';
					$("#files1 .add-btn").before(itemHtml);

				}

				if ((fileChildType == "" || fileChildType == null )) {
					itemHtml = '<div class="col-sm-2">' +
						'<div class="file" style="text-align: center; margin: 0;">' +
						'<input type="checkbox" class="checkOne" name="fileList_input" value="' + item[i]["filePath"] + '">';
					if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
						itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
					} else {
						itemHtml += '<img  class="pre-img" src="' + staticUrl + item[i]["fileGroup"] + '/' + item[i]["filePath"] + '" alt="">';
					}
					itemHtml += '<div class="file-name">' + item[i]["fileName"] + '</div>';
					$("#files2").append(itemHtml);
				}
			}
			else {
				$("#files2").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');
			}
		}
		$(".file-name").on("click", function(){
        	$(this).prev().prev("input").trigger("click");
        });
		$(".checkOne").on("click", function () {
			var ck = $("input[name='fileList_input']:checked").length;
			var  length =$(".checkOne").length;
			if(ck!=length){
				$(".check-btn").html('全选')
			}else{
				$(".check-btn").html('取消全选')
			}
		})
		$(".pre-img").on("click",function(){
			$.openPhotoGallery(this)
		})
	}
});


function deleteFile(title,type) {
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
            params.idArr= idArr.toString();
            params.acceptId =$("#OrderAcceptId").val()
            loadingShow();
            $.ajax({
                url: ctx + "/cfSupplyMaterial/deleteWaitingFile.action",
                type: "post",
                data:  params,
                dataType: "json",
                success: function (data) {
                	loadingHide();
                	if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/cfSupplyMaterial/preWaitingFile.action?id="+$("#OrderAcceptId").val()+"&goBackUrl="+$("#goBackUrl").val();;
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
function commit(acceptId,oneType) {
	confirmDialog("确认提交候补资料吗？", function () {
		var length = $("#files input").length;
		var newOrOld = $("#newOrOld").val();
		var length1 = $("#files1 input").length;
		var data = $("#data").val();
		if (newOrOld == 0) {
			if (length1 <= 0) {
				faildMsg("过户材料不能为空");
			} else if (null == data || undefined == data || '' == data) {
				faildMsg("有审核暂未完成请稍后提交");
			} else if (length <= 0) {
				faildMsg("候补材料不能为空");
			} else {
				loadingShow();
				$.ajax({
					url: ctx + "/cfSupplyMaterial/waitingFileSubmit.action",
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
									window.location.href = ctx + "/cfSupplyMaterial/waitingFile.action";
								}else {
									closeTabForParent(ctx+"/cfSupplyMaterial/preWaitingFile.action?id=" + acceptId);
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
		} else {
			if (null == data || undefined == data || '' == data) {
				faildMsg("有审核暂未完成请稍后提交");
			} else if (length <= 0) {
				faildMsg("候补材料不能为空");
			} else {
				loadingShow();
				$.ajax({
					url: ctx + "/cfSupplyMaterial/waitingFileSubmit.action",
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
								window.location.href = ctx + "/cfSupplyMaterial/waitingFile.action";
							});
						} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}
					}
				});
			}
		}
	})
}

function downloadFile() {
	var aid =$("#oneAuditId").val();
	if(aid==null||aid==undefined||aid==''){
		faildMsg("请上传文件后再点击下载按钮");
	}else{
		confirmDialog("确认下载订单相关文件吗？", function () {
	        window.location.href = ctx + "/cfSupplyMaterial/downLoadeWaitingFile.action?id="+aid;
	    })	
	}
	
}
