jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    $(".download-file").on("click", function(){
    	var fileType =$("#search-select").val();
    	var aid =$("#OrderAcceptId").val();
    	downProgressTip(aid, fileType, 'cfFileCenter/getDownloadCount.action')
    });
	var check =$(".checkOne").prop("checked");
	if (check){
		$(".mod_basic").find('.checkOne').each(function (){
		var  ck =	$(this).prop("checked");
			if (ck){
				$that.html('全选')
			}
		})
	}


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
  //ajax分页查询面签数据
	var pageSize = 18;		//每页显示条数初始化，修改显示条数，修改这里即可
	var initFlag = true;
	loadData($("#type").val(), 0, null,pageSize);
	//新增按钮事件
	
	$(".add-btn").on("click",function () {
        createFile();
    });
	$(".search-btn").on("click",function () {
		searchSubmit();
    });
	
	function searchSubmit() {
		var type =$("#search-select").val();
		initFlag = true;
		loadData(type, 0, null,pageSize);
	}
	//新增资料
	function createFile() {
	    var options = {
	        width: 690,
	        top: 200,
	        height: 540,
	        overlay: true,
	        dispose: true,
	        move: true,
	        title: '新增',
	        onAfterShow: function (){
	            new HYUpload({
	                auto		: true,
	                fileNumLimit: 100,
	                containerId	: '#uploader',
	                uploadImg	: false,//图片上传标记	
	                fileSizeLimit: 1048576*500,
	                fileSingleSizeLimit: 1048576*10,
	                formData: {filetype: 3},
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
						$("#vtip").hide()
	    				change_error_style($(".file-type").parent(),"remove");
	    				if(selected.selected==="4"){
	    					$("#hidden-select").show();
	    					$(".dialog-container").height(580)
	    				}else{
	    					$("#hidden-select").hide();
	    					$(".dialog-container").height(540)
	    				}
	    			}else{
	    				change_error_style($(".file-type").parent(), "add");
	    			}
	    		});
	    		$(".file-childType").chosen(config);
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
					fileList.push(file);
				});

	            if(fileList <1){
	                faildMsg("请选择上传的文件");
	                return flag
	            }else{
	            	var aid = $("#OrderAcceptId").val();
	            	var mortgageFile = $("#mortgageFile").val();

	                var param = {};
	                if($("#hidden-select").is(':hidden')){
	                	param.businessOrderAcceptId=$("#OrderAcceptId").val();
	                	param.fileType = $("#file-type").val();
	                	param.list=fileList;
	                }else{
	                	param.businessOrderAcceptId=$("#OrderAcceptId").val();
	                	param.fileType = $("#file-type").val();
	                	param.list=fileList;
	                	param.fileChildType = $("#file-childType").val();
	                }
                    param.mortgageFile = mortgageFile;
	                if ($("#fileCreateForm").valid("fileCreateForm")) {
	                	loadingShow();
	                	$.ajax({
	                    	url: ctx + "/cfFileCenter/createrFile.action",
	        				type: "post",
	        				contentType: "application/json",
	        				data: JSON.stringify(param),
	        				dataType:"json",
	        				success:function (data) {
	        					loadingHide();
	        					if (data.error == 1) {
	        						successMsg("操作成功！", 1000, function () {
	        							var btype= $("#bType").val()
	        							window.location.href = ctx + "/cfFileCenter/preFileManage.action?id="+aid+"&bType="+$("#bType").val()+"&goBackUrl="+$("#goBackUrl").val()+"&mortgageFile="+mortgageFile;
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
	function loadData(type, currPage, jg,pageSize){
		$("#files").html("");
		//显示loading提示
	    loadingShow();
		$.ajax({
	        url: ctx + "/cfFileCenter/query.action",
	        type: "post",
	        dataType: 'json',
	        data: {
	        	'pageNum': currPage,
	            'numPerPage': pageSize,
	            'businessOrderAcceptId':$("#OrderAcceptId").val(),
	            'type': type
	        },
	        success: function (data) {
	        	//关闭loading提示
	            loadingHide();
	            if (data.error == 1) {
	                if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
	                    if (initFlag) {
	                    	$("#pagination").pagination(data["rows"]["totalCount"], {
	                            items_per_page: pageSize,
	                            num_edge_entries: 1,
	                            num_display_entries: 8,
	                            callback: function (currPage, jg) {
	                            	loadData(type,currPage, jg,pageSize);
	                            }//回调函数
	                        });
	                        initFlag = false;
	                    }
	                    loadContent(type, data)
	                } else {
	                	$("#files").html('<p class="no-data">暂无资料</p>');
	                    $("#pagination").html("");
	                }
	            } else {
	            	$("#files").html('<p class="no-data">暂无资料</p>');
	                $("#pagination").html("");
	            }
	        },
	        error: function () {

	        }
	    });
	}
	function loadContent(type, data){
		var item =data["rows"]["recordList"];
		$("#OrderAcceptId").val(item[0]["businessOrderAcceptId"])
		var itemHtml='';
		for(var i= 0 ; i<item.length; i++ ){
			var fileName = item[i]["fileName"];
			var extStart = fileName.lastIndexOf(".");
			var ext = fileName.substring(extStart,fileName.length).toUpperCase();
			itemHtml='<div class="col-sm-2">'+
						'<div class="file" style="text-align: center; margin: 0;">'+
							'<input type="checkbox" class="checkOne" name="fileList_input" value="'+item[i]["id"]+'">';
				if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
					itemHtml+='<img src="'+ctx +"/styles/images/zip.png"+'" alt="">';
				}else{
					itemHtml+='<img class="pre-img" src="'+staticUrl+'/'+item[i]["fileGroup"]+'/'+item[i]["filePath"]+'" alt="">'

				}

				itemHtml+='<div class="file-name">'+item[i]["fileChildTypeStr"]+item[i]["fileName"]+'</div></div>'+
					'</div>';	
			$("#files").append(itemHtml);
		}
		$(".file-name").on("click", function(){
			$(this).prev().prev("input").trigger("click");
		});
		$(".pre-img").on("click",function(){
			$.openPhotoGallery(this)
		})
	}
	$(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
});

//校验
function validFile(lableId){
	if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "file-type") {
                $(lableId).parent().attr('tip', '文件类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if($("#hidden-select").is(':hidden')){
            	
            }else{
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
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/cfFileCenter/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                	loadingHide();
                	if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/cfFileCenter/preFileManage.action?id="+$("#OrderAcceptId").val()+"&bType="+$("#search-select").val()+"&goBackUrl="+$("#goBackUrl").val();;
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

