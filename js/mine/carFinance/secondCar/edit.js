jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    //select用插件chosen.jquery
    var config = {
        disable_search_threshold: 10,
        no_results_text			: '无数据',
        allow_single_deselect	: true,
        width					:'100%'
    };
    
    $("#loanBankId").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($(".loanBankId").parent(), "remove");
            $("#vtip").hide();
        } else {
            change_error_style($(".loanBankId").parent(), "add");
        }
    });

    var initRegisterDate = {
        elem: '#initRegisterDate',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {

        },
        clear: function () {

        }
    };
    laydate(initRegisterDate);

    //城市组件
    init_city_select($("#province"),2);
    
    getType(".car-box .type");
    
    var carBrandId =$("#carBrandId").attr("data-carBrand");
    carConnect(carBrandId);
    
    function carConnect(res){
    	var oldBrandNameMain, newBrandNameMain, carSerialFirst, carSerialSecond, brandName;
    	$.ajax({
    		url: ctx + "/cfCarBrand/detail.action",
            type: "post",
            data: {id: res},
            dataType: 'json',
            success: function (result) {
            	if (result.error == 1) {
            		oldBrandNameMain = newBrandNameMain = result.rows.brandNameMain;
            		carSerialFirst = result.rows.carSerialFirst;
            		carSerialSecond = result.rows.carSerialSecond;
            		brandName = result.rows.brandName;
            		$("#carBrandId").val(brandName);
            	}
            }
		})
		
    	//车型点击事件
    	$("#carBrandId").on("click",function(){
    		$(this).next().find(".item").show();
			$(".type-right p").each(function(i,n){
				if($(this).text() == oldBrandNameMain){
					$(this).addClass("active").siblings().removeClass("active");
				}
			})
			showSeries(oldBrandNameMain, carSerialFirst, carSerialSecond);
			showNo(carSerialFirst, carSerialSecond, brandName);
        });
    	
    	$(".car-box .item-type p").on("click",function(){
        	$(".car-box .item-series").show().find(".series").empty();
        	$(".car-box .item-no").hide();
        	$(this).addClass("active").siblings().removeClass("active");
        	newBrandNameMain = $(this).text();
        	showSeries(newBrandNameMain);
        })
    }
    
    function showSeries(brandNameMain, carSerialFirst, carSerialSecond){
    	loadingShow();
    	$.ajax({
    		url: ctx + "/cfCarBrand/getcarSerialBrandName.action",
            type: "post",
            data: {brandNameMain: brandNameMain },
            dataType: 'json',
            success: function (result) {
            	loadingHide();
            	var seriesHtml ='';
            	if (result.error == 1) {
            		for (var i = 0; i < result.rows.length; i++) {
                		var brandArr = result.rows[i].categoryStyle;
                		seriesHtml +='<div>'
                		seriesHtml += '<h5 id="' + result.rows[i].brandFirstNameType + '">' + result.rows[i].brandFirstName + '</h5>';
                		for (var j = 0; j < brandArr.length; j++) {
                			seriesHtml += '<p data-type="' + brandArr[j].carSerialSecondNameType + '">' + brandArr[j].carSerialSecondName + '</p>';
                		}
                		seriesHtml +='</div>'
                	}
            		$(".car-box .series").empty().append(seriesHtml);
            		//getActive(".series p",carSerialSecond);
            		clickSeries();
            	}
            }
    	})
    }
    
    function clickSeries(){
    	$(".car-box .item-series p").on("click",function(){//车系列点击事件
    		$(".item-no").show().find(".no").empty();
    		$(this).addClass("active").siblings().removeClass("active");
    		var carSerialFirst = $(this).parent().find("h5").text();
    		var carSerialSecond = $(this).text();
    		showNo(carSerialFirst, carSerialSecond)
    	})
    }
    
    function showNo(carSerialFirst, carSerialSecond, brandName){
    	loadingShow();
    	$.ajax({
    		url: ctx + "/cfCarBrand/getAllBrandName.action",
            type: "post",
            data: {
            	carSerialFirstName: carSerialFirst,
            	carSerialSecondName: carSerialSecond
            },
            dataType: 'json',
            success: function (result) {
            	loadingHide();
            	var noHtml ='';
            	if (result.error == 1) {
            		for (var i = 0; i < result.rows.length; i++) {
            			var list = result.rows[i].list;
                		noHtml +='<div>'
                		noHtml += '<h5 id="' + result.rows[i].year + '">' + result.rows[i].year + '</h5>';
                		for (var j = 0; j < list.length; j++) {
                			noHtml += '<p data-type="' + list[j].brandNameType + '" data-id="'+list[j].id+'" title="' + list[j].brandName + '">' + list[j].brandName + '</p>';
                		}
                		noHtml +='</div>';
                	}
            		$(".no").empty().append(noHtml);
            		if(brandName){
            			brandName = brandName.split('(')[0];
            			$(".no p").each(function(i,n){
            				if($(this).text() == brandName){
            					$(this).addClass("active")
            				}
            			})
            		}
            		clickNo();
            	}
            }
    	})
    }
    
    function clickNo(){
    	$(".item-no p").on("click",function(){//车辆品牌点击事件，赋值
    		$(this).addClass("active").siblings().removeClass("active");
    		var carNoName = $(this).text();
    		$(".car-box .item").hide();
    		$("#carBrandId").val(carNoName).attr({
    			"title":carNoName,
    			"data-carBrand":$(this).attr("data-id")
    		}).removeClass("input_validation-failed");
    	})
    }
    
    var id = $("#hiddenId").val();
    $("#vin").attr("param","id="+id);
    getDataList(id);

    function getDataList( id) {
        $.ajax({
            url: ctx + "/addSecondCar/getFiles.action",
            type: "post",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (data) {
            	if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        loadPicList(data.rows)
                    } else {
                        $("#files").html('<p class="no-data">暂无资料</p>');
                    }
                } else {
                    $("#files").html('<p class="no-data">暂无资料</p>');
                }
            }
        });
    }

    function loadPicList(data){
        $("#files").html('');
        var item =data["recordList"];
        var itemHtml='';
        if (item == null || item == '' || item.length == 0) {
            $("#files").html('<p class="no-data">暂无资料</p>');
        }else{
            itemHtml += '<div class="row">'
            for(var i= 0 ; i<item.length; i++ ){
                var fileName = item[i]["fileName"];
                var extStart = fileName.lastIndexOf(".");
                var ext = fileName.substring(extStart,fileName.length).toUpperCase();
                itemHtml+='<div class="col-sm-2">'+
                    '<div class="file" style="text-align: center; margin: 0;">'+
                    '<input type="checkbox" class="checkOne" name="fileList_input" value="'+item[i]["id"]+'">';
                if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
                    itemHtml+='<img src="'+ctx +"/styles/images/zip.png"+'" alt="">';
                }else{
                    itemHtml+= '<img class="pre-img" src="'+staticUrl+item[i]["fileGroup"]+'/'+item[i]["filePath"]+'" alt="">';
                }
                itemHtml+='<div class="file-name">'+item[i]["fileName"]+'</div></div>'+
                    '</div>';
            }
            $(".gallerys").append(itemHtml);
            $(".pre-img").on("click",function(){
                $.openPhotoGallery(this)
            })
        }
    }

    var uploadComp = null;
    uploadComp=new HYUpload({
        auto: true,
        fileNumLimit: 100,
        containerId: '#uploader',
        uploadImg: false,//图片上传标记
        formData: {filetype: 1},
        buttonText: '选择图片',
        server: ctx + '/fdfs/uploadFile.action'
    });
    $(".filelist").css('overflow', 'auto');

    new ValidateWin("#tab-secondCar", {
        callback: function (content, event) {
            var param = getPic();
            loadingShow();
            $.ajax({
                url: ctx + "/addSecondCar/updateSecondCar.action",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(param),
                dataType: "json",
                async: false,
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/addSecondCar/query.action";
                        });
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        }
    });

    function getPic() {
        var fileLength = $(".filelist li").length;
        var fileList = new Array();
        //遍历文件列表
        $(".filelist li").each(function () {
            if (fileLength < 1) {
                faildMsg("请选择上传的图片");
                return false;
            }else {
                var file = {};
                file.fileGroup = $(this).data("group");
                file.filePath = $(this).data("filepath");
                file.fileName = $(this).data("filename");
                file.fileType = 1;
                fileList.push(file);
            }
            return fileList
        })
        var param = {};
        param.carBrandId = $("#carBrandId").attr("data-carBrand");
        param.vin = $("#vin").val();
        param.miles = $("#miles").val();
        param.initRegisterDate = $("#initRegisterDate").val();
        param.loanBankId = $("#loanBankId").val();
        param.province = $("#province").val();
        param.id = $("#hiddenId").val();
        param.businessOrderAcceptId = $("#businessOrderAcceptId").val();
        param.fileList = fileList;
        return param;
    }


    $(".deleteInfo").on("click",function(){
        deleteFile();
    });

    function deleteFile() {
        var ck = $("input[name='fileList_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的图片。");
            return
        } else {
            var idArr = new Array();
            $(ck).each(function () {
                idArr.push($(this).val());
            });
            confirmDialog("确认删除选中的图片吗？", function () {
                var params = {}
                params.idArr= idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/cfSecondCarFile/deleteFiles.action",
                    type: "post",
                    data:  params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            loadingHide();
                            successMsg("操作成功！", 1000, function () {
                                getDataList(id);
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
            })
        }
    }
    
    function getType(dom) {
        $.ajax({
            url: ctx + '/cfCarBrand/carBrand.action',
            type: "post",
            dataType: "json",
            async: false,
            success: function (result) {
                var html = '';
                if (result.error == 1) {
                    var letter, list, obj;
                    var objArr = [];
                    html += '<div class="type-left"><ul class="">';
                    for (var i = 0; i < result.rows.length; i++) {
                        letter = result.rows[i].letter;
                        if (letter && letter.length == 1) {
                            obj = result.rows[i];
                            objArr.push(obj);
                        }
                    };
                    objArr.sort(compare);
                    for (var i = 0; i < objArr.length; i++) {
                        html += '<li><a href="#' + objArr[i].letter + '">' + objArr[i].letter + '</a></li>';
                    }
                    html += '</ul></div><div class="type-right">';
                    for (var j = 0; j < objArr.length; j++) {
                        list = objArr[j].list;
                        html += '<h5 id="' + objArr[j].letter + '">' + objArr[j].letter + '</h5>';
                        for (var i = 0; i < list.length; i++) {
                            html += '<p data-type="' + list[i].brandNameMainType + '" title="' + list[i].brandNameMain + '">' + list[i].brandNameMain + '</p>';
                        }
                    }
                    html += '</div>';
                }
                $(dom).append(html);
            }
        });
    }

    function compare(obj1, obj2) {
        var letter1 = obj1.letter;
        var letter2 = obj2.letter;
        if (letter1 < letter2) {
            return -1;
        } else {
            return 1;
        }
    }
});

function validAddSecondCarInfo(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "initRegisterDate" ) {
                $(lableId).attr('tip', '日期为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "carBrandId") {
                $(lableId).parent().attr('tip', '车型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("id") == "loanBankId") {
                $(lableId).parent().attr('tip', '贷款银行不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        var value = $.trim($(lableId).val());
        if ($(lableId).attr("id") == "vin" ){
            if (!(/^(?=.*[0-9].*)(?=.*[A-Z].*).{6,17}$/).exec(_this.val())) {
                $(lableId).attr('tip', '车架号限制为17位 数字+字母组合');
                return "faild";
            } else {
                return "success";
            }
        } else if ($(lableId).attr("id") == "miles" ){
            if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/).exec(value)) {
                $(lableId).attr("tip", "行驶公里数只能输入数字且保留小数点后两位");
                return "faild";
            }
            if(value>99.99){
                $(lableId).attr("tip", "行驶公里数最大为100");
                return "faild";
            }
            if(value<0.01 ){
                $(lableId).attr("tip", "行驶公里数最小为0.01");
                return "faild";
            }
        }
        return "success";
    }
}