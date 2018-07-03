jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    
    getType(".car-box .type")

    $("#carBrandId").on("click", function () {
        $(this).next().find(".item-type").show();
    });
    $(".item-type p").on("click", function () {
        $(".item-series").show().find(".series").empty();
        $(".item-no").hide();
        $(this).addClass("active").siblings().removeClass("active");
        var brandNameMain = $(this).text();
        showSeries(brandNameMain);
    })


    function showSeries(brandNameMain){
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
            		$(".series").empty().append(seriesHtml);
            		clickSeries();
            	}
            }
    	})
    }
    
    function clickSeries(){
    	$(".item-series p").on("click",function(){//车系列点击事件
    		$(".item-no").show().find(".no").empty();
    		$(this).addClass("active").siblings().removeClass("active");
    		var carSerialFirst = $(this).parent().find("h5").text();
    		var carSerialSecond = $(this).text();
    		showNo(carSerialFirst, carSerialSecond)
    	})
    }
    
    function showNo(carSerialFirst, carSerialSecond){
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
                			noHtml += '<p data-type="' + list[j].brandNameType + '" data-id="'+list[j].id+'" title="' +  list[j].brandName  + '">' + list[j].brandName + '</p>';
                		}
                		noHtml +='</div>';
                	}
            		$(".no").empty().append(noHtml);
            		clickNo();
            	}
            }
    	})
    }
    
    function clickNo(){
    	$(".item-no p").on("click",function(){//车辆品牌点击事件，赋值
    		$(this).addClass("active").siblings().removeClass("active");
    		$("#carNoId").val($(this).attr("data-id"));
    		var carNoName = $(this).text();
    		$(".car-box .item").hide();
    		$("#carBrandId").val(carNoName).attr("title",carNoName).removeClass("input_validation-failed");
    		$("#vtip").hide();
    	})
    }
    //select用插件chosen.jquery
    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "100%"
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
            if  (datas =='') {
                change_error_style($("#initRegisterDate"), "add");
            } else {
                change_error_style($("#initRegisterDate"), "remove");
            }
        },
        clear: function () {

        }
    };
    laydate(initRegisterDate);

    //城市组件
    init_city_select($("#province"),2);

    var uploadComp = null;
    uploadComp=new HYUpload({
        auto: true,
        fileNumLimit: 100,
        containerId: '#uploader',
        uploadImg: false,//图片上传标记
        formData: {filetype: 1},
        fileSizeLimit: 1048576*500,
        buttonText: '选择图片',
        server: ctx + '/fdfs/uploadFile.action'
    });
    $(".filelist").css('overflow', 'auto');


    new ValidateWin("#tab-secondCar", {
        callback: function (content, event) {
            var param = {};
            param.carBrandId = $("#carNoId").val();
            param.vin = $("#vin").val();
            param.miles = $("#miles").val();
            param.initRegisterDate = $("#initRegisterDate").val();
            param.loanBankId = $("#loanBankId").val();
            param.province = $("#province").val();
            param.fileList =getPic();
            if(param.fileList){
            }else{
                return
            }
            loadingShow();
            $.ajax({
                url: ctx + "/addSecondCar/createSecondCar.action",
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
        if(fileLength <= 0){
            faildMsg("请上传车辆图片");
            return false
        }else{
            $(".filelist li").each(function () {
                    var file = {};
                    file.fileGroup = $(this).attr("data-group");
                    file.filePath = $(this).attr("data-filepath");
                    file.fileName = $(this).attr("data-filename");
                    file.fileType = 1;
                    fileList.push(file);
            })
            return fileList
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
                    }
                    objArr.sort(compare);
                    for (var i = 0; i < objArr.length; i++) {
                        html += '<li><a href="#' + objArr[i].letter + '">' + objArr[i].letter + '</a></li>';
                    }
                    html += '</ul></div><div class="type-right">';
                    for (var j = 0; j < objArr.length; j++) {
                        list = objArr[j].list;
                        html += '<h5 id="' + objArr[j].letter + '">' + objArr[j].letter + '</h5>';
                        for (var i = 0; i < list.length; i++) {
                            html += '<p data-type="' + list[i].brandNameMainType + '">' + list[i].brandNameMain + '</p>';
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
})

function validInfo(lableId) {
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
        if ($(lableId).val() != null && $(lableId).val() != "") {
            if ($(lableId).attr("id") == "vin" ){
                var vinReg = new RegExp(vin_reg);
                if (!vinReg.test(value)) {
                    $(lableId).attr("tip", "请输入有效的车架号");
                    return "faild";
                }
           }else if ($(lableId).attr("id") == "miles" ){
                if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/).exec(value)) {
                    $(lableId).attr("tip", "行驶公里数只能输入数字且保留小数点后两位");
                    return "faild";
                }
                   if(value>99.99 ){
                       $(lableId).attr("tip", "行驶公里数最大为100");
                       return "faild";
                   }
                if(value<0.01 ){
                    $(lableId).attr("tip", "行驶公里数最小为0.01");
                    return "faild";
                }
            }
        }
        return "success";
    }
}
