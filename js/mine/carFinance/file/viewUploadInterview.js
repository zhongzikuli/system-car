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
    
    function loadPic(item,ext,num){
    	var itemHtml = '';
    	itemHtml += '<div class="col-sm-2">' +
		        '<div class="file" style="text-align: center; margin: 0;">' ;
		       /* '<input type="checkbox" class="checkOne" name="fileList_input" value="' + item["id"] + '">';*/
	    if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
	        itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
	    } else {
	        itemHtml += '<img  class="pre-img" src="' + staticUrl + item["fileGroup"] + '/' + item["filePath"] + '" alt="">';
	    }
	    itemHtml += '<div class="file-name">' + item["fileChildTypeStr"]+ item["fileName"] + '</div></div></div>';
	    $("#files"+num).append(itemHtml).find("p.no-data").remove();
    }
    
    function loadContent(type, data) {
    	var arr=[20,21,22,23,24,25,26,27,28];
    	arr.forEach(function(i){
    		$("#files"+i).html('<p class="text-center  no-data">暂无数据</p>');
    	})
        var item = data["rows"];
        $("#OrderAcceptId").val(item[0]["businessOrderAcceptId"])
        for (var i = 0; i < item.length; i++) {
            var fileName = item[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart, fileName.length).toUpperCase();
            var fileChildType = item[i]["fileChildType"];
            if (fileName != null || fileName != "") {
                if (fileChildType == 20) {
                	loadPic(item[i],ext,20)
                }else if(fileChildType == 21) {
                	loadPic(item[i],ext,21)
                }else if(fileChildType == 22) {
                	loadPic(item[i],ext,22)
                }else if(fileChildType == 23) {
                	loadPic(item[i],ext,23)
                }else if(fileChildType == 24) {
                	loadPic(item[i],ext,24)
                }else if(fileChildType == 25) {
                	loadPic(item[i],ext,25)
                }else if(fileChildType == 26) {
                	loadPic(item[i],ext,26)
                }else if(fileChildType == 27) {
                	loadPic(item[i],ext,27)
                }else {
                	loadPic(item[i],ext,28)
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


