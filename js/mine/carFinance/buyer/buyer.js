jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    
    var uploadConfig = [{
        dropTip: "或将图片拖到这里",
        buttonText: "身份证正面",
    }, {
        dropTip: "或将图片拖到这里",
        buttonText: "身份证反面",
    }, {
        dropTip: "或将图片拖到这里",
        buttonText: "授权书",
    }, {
        dropTip: "或将图片拖到这里",
        buttonText: "签字照片",
    }];

    if ($("div.sharedForm").length > 0) {
        //配偶
        initPartnerUploader();
    }
    if ($("div.sponsorForm").length > 0) {
        //担保人
        initGuarantorUpload1();
    }

    //全局表单验证数组
    var validationArray = new Array();
    var $div = $("#buyer-form").children("div").children("div").children("div");
    $.each($div, function () {
        var $id = $(this).attr("id");
        if ($id != undefined && $id != '') {
            initValidation(validationArray, "#" + $id);
        }
    });

    function initPartnerUploader() {
        for (var i = 0; i < uploadConfig.length; i++) {
            var message = uploadConfig[i];
            new HYUpload({
                auto: true,
                containerId: '#partner-uploader-' + (i + 1),
                uploadImg: true,						//图片上传标记
                dropTip: message['dropTip'],
                buttonText: message['buttonText'],
                server: ctx + '/fdfs/uploadFile.action'
            });
        }
    }

    //担保人全局变量
    var addNumbers = new Array();
    var removeNumbers = new Array();
    var guarantorNumber = 0;//添加担保人数的次数
    if ($("#addGuarantor").length > 0){
        guarantorNumber = parseInt($("#addGuarantor").data("count"));
        addNumbers.push(guarantorNumber);
    }else {
        addNumbers.push(1);
    }

    //添加担保人按钮
    $("#addGuarantor").on("click", function () {
        if (guarantorNumber < 3) {
            guarantorNumber++;
            var $number;
            if (removeNumbers == null || removeNumbers.length == 0) {
                addNumbers.reverse();
                $number = addNumbers[0] + 1;
                addNumbers.push($number);
            } else {
                $number = removeNumbers.shift();
            }
            var html = createGuarantorHtml($number);
            $(this).parent().prev("div").after(html);
            //初始化黑名单查询对象
            var filterQuery = new BlackFilterQuery("#sponsorForm" + $number);
            //初始化删除事件
            initGuarantorRemoveEvent($number,filterQuery);
            //初始化上传组件
            initGuarantorUpload($number);
            //初始化添加担保人校验
            initValidation(validationArray, "#sponsorForm" + $number);
        } else {
            faildMsg("担保人不能超过四位！");
            return
        }
    });

    function initGuarantorUpload1() {
        for (var i = 0; i < uploadConfig.length; i++) {
            var message = uploadConfig[i];
            new HYUpload({
                auto: true,
                containerId: '#guaranter-uploader-' + (i + 1),
                uploadImg: true,						//图片上传标记
                dropTip: message['dropTip'],
                buttonText: message['buttonText'],
                server: ctx + '/fdfs/uploadFile.action'
            });
        }
    }

    function initGuarantorUpload(number) {
        for (var i = 0; i < uploadConfig.length; i++) {
            var message = uploadConfig[i];
            new HYUpload({
                auto: true,
                containerId: '#guaranter-uploader-group-' + (i + 1) + '-' + number,
                uploadImg: true,						//图片上传标记
                dropTip: message['dropTip'],
                buttonText: message['buttonText'],
                server: ctx + '/fdfs/uploadFile.action'
            });
        }
    }

    function initGuarantorRemoveEvent(number,filterQuery) {
        $("#remove-guarantor-" + number).on("click", function () {
            guarantorNumber--;
            $(this).parents(".form-group").next().remove();
            $(this).parents(".form-group").remove();
            removeNumbers.push(number);
            //删除风控命中项
            filterQuery.deleteItem("guaranter-" + number);
        });
    }

    $(".btn-submit").on("click", function () {
        var param = {};
        var photoFlag = true;
        var buyers = new Array();
        param.id = $("input[name='acceptId']").val();
        var userType = $("input[name='userType']").val();
        var $div = $("#buyer-form").children("div").children("div").children("div");
        $.each($div, function () {
            var $id = $(this).attr("id");
            if ($id != undefined && $id != '') {
                initValidation(validationArray, "#" + $id);
                photoFlag = photo(this, photoFlag);
                if (photoFlag) {
                    extracted(this, buyers);
                }
            }
        });
        for (var i = 0; i < validationArray.length; i++) {
            var validation = validationArray[i];
            validation.mySubmit(validation);
            if (!validation.isSubmit || !photoFlag) {
                return;
            }
        }

        param.cfBuyerInformationVOS = buyers;
        loadingShow();
        if (validation.isSubmit && photoFlag) {
            $.ajax({
                url: ctx + "/cfBuyerInfo/addBuyer.action",
                type: "post",
                data: JSON.stringify(param),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("添加成功！", 1000, function () {
                            window.location.href = ctx + "/cfBuyerInfo/list.action?acceptId="+param.id+"&userType="+userType;
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
    $(".dialog-close").on("click", function () {
        parent.$(".dialog-container").hide();
        parent.$(".dialog-overlay").hide();
        parent.parent.$(".dialog-overlay-left").hide();
        parent.parent.$(".dialog-nav-top").hide();
    })


    function initValidation(validationArray, id) {
        var validate = new ValidateWin(id, {});
        validationArray.push(validate);
    }
     
    function createGuarantorHtml(number) {
        var html = '<div id="sponsorForm' + number + '" class="sponsorForm"><form><div class="form-group guaranter' + number + '">' +
            '<label class="col-xs-1 control-label">担保人姓名:</label>' +
            '<input type="hidden" name="userType" value="SPONSOR"/>' +
            '<div class="col-xs-3"><input type="text" data-type="guaranter-' + number + '" name="realName" maxlength="10" class="form-control" obj="not_null" tip="请输入正确的姓名"/></div>' +
            '<label class="col-xs-1 control-label">身份证号:</label>' +
            '<div class="col-xs-3"><input type="text" data-type="guaranter-' + number + '" name="cardNo" maxlength="18" onKeyup="return inputSapceTrim(event,this);" class="form-control"  tip="请输入正确的身份证号" url="' + ctx + '/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>' +
            '<div class="col-xs-3"><a class="btn btn-danger" id="remove-guarantor-' + number + '">删除</a></div>' +
            '</div>' +

            '<div class="form-group guaranter' + number + '">' +
	            '<label class="col-xs-1 control-label">上传证件:</label>' +
	            '<div class="col-xs-11 uploaderErea">' +
		            '<div class="row" style="margin-left: 0; margin-right:0;">' +
			            '<div class="col-xs-3">' +
				            '<div class="page-container">' +
					            '<div id="guaranter-uploader-group-1-' + number + '" class="cardFrontPhoto">' +
					
					            '</div>' +
				            '</div>' +
			            '</div>' +
			            '<div class="col-xs-3">' +
				            '<div class="page-container">' +
					            '<div id="guaranter-uploader-group-2-' + number + '" class="cardBackPhoto">' +
					
					            '</div>' +
				            '</div>' +
			            '</div>' +
			            '<div class="col-xs-3">' +
				            '<div class="page-container">' +
					            '<div id="guaranter-uploader-group-3-' + number + '" class="authorizeLetterPhoto">' +
					
					            '</div>' +
				            '</div>' +
			            '</div>' +
			            '<div class="col-xs-3">' +
				            '<div class="page-container">' +
					            '<div id="guaranter-uploader-group-4-' + number + '" class="signaturePhoto">' +
					
					            '</div>' +
				            '</div>' +
			            '</div>' +
		            '</div>' +
	            '</div>' +
            '</div>' +
            '</form>' +
            '</div>';
        return html;
    }
    
    function photo($this, photoFlag) {
        $($this).children("form").find(".page-container").each(function () {
            var $v = $(this).children("div").children("div").find(".filelist li");
            if ($(this).children("div").hasClass('cardFrontPhoto')) {
                if ($($v).data("filepath") == undefined) {
                    photoFlag = false;
                    $(this).find(".queueList").addClass("wrong");
                } else {
                    $(this).find(".queueList").removeClass("wrong");
                }
            } else if ($(this).children("div").hasClass('cardBackPhoto')) {
                if ($($v).data("filepath") == undefined) {
                    photoFlag = false;
                    $(this).find(".queueList").addClass("wrong");
                } else {
                    $(this).find(".queueList").removeClass("wrong");
                }
            } else if ($(this).children("div").hasClass('authorizeLetterPhoto')) {
                if ($($v).data("filepath") == undefined) {
                    photoFlag = false;
                    $(this).find(".queueList").addClass("wrong");
                } else {
                    $(this).find(".queueList").removeClass("wrong");
                }
            } else if ($(this).children("div").hasClass('signaturePhoto')) {
                if ($($v).data("filepath") == undefined) {
                    photoFlag = false;
                    $(this).find(".queueList").addClass("wrong");
                } else {
                    $(this).find(".queueList").removeClass("wrong");
                }
            } 
        });
        return photoFlag;
    }
    
    function extracted($this, buyers) {
        var partner = {};
        partner.userType = $($this).find("input[name='userType']").val();
        partner.realName = $($this).find("input[name='realName']").val();
        partner.cardNo = $($this).find("input[name='cardNo']").val();
        if(partner.cardNo){
       	 $($this).find("input[name='cardNo']").attr('obj','idCard');
       }
        //上传文件列表
        $($this).children("form").find(".page-container").each(function () {
            var _class = $(this).children("div").attr("class");
            var $v = $(this).children("div").children("div").find(".filelist li");
            if (_class == 'cardFrontPhoto') {
                partner.cardFrontPhotoFileName = $($v).data("filename");
                partner.cardFrontPhotoFileGroup = $($v).data("group");
                partner.cardFrontPhotoFilePath = $($v).data("filepath");
            } else if (_class == 'cardBackPhoto') {
                partner.cardBackPhotoFileName = $($v).data("filename");
                partner.cardBackPhotoFileGroup = $($v).data("group");
                partner.cardBackPhotoFilePath = $($v).data("filepath");
            } else if (_class == 'authorizeLetterPhoto') {
                partner.authorizeLetterPhotoFileName = $($v).data("filename");
                partner.authorizeLetterPhotoFileGroup = $($v).data("group");
                partner.authorizeLetterPhotoFilePath = $($v).data("filepath");
            } else if (_class == 'signaturePhoto') {
                partner.signaturePhotoFileName = $($v).data("filename");
                partner.signaturePhotoFileGroup = $($v).data("group");
                partner.signaturePhotoFilePath = $($v).data("filepath");
            }
        });
        buyers.push(partner);
    }
    //黑名单过滤查询对象（购车人、配偶、担保人1）
    new BlackFilterQuery("#sharedForm");
    new BlackFilterQuery("#sponsorForm1");
});

////补录配偶、担保人弹窗
//function sharedDialog(acceptId, userType, title, result) {
//    var options = {
//        width: 1000,
//        top: 200,
//        height: userType == 'SHARED' ? 410 : 485,
//        overlay: true,
//        dispose: true,
//        move: true,
//        title: title,
//        url: ctx + "/cfBuyerInfo/preAddBuyer.action?acceptId=" + acceptId + "&userType=" + userType,
//        callback: function () {
//
//        }
//    };
//    new Dialog(".add-buyer", options).show();
//}

function inputSapceTrim(e,input){
	input.value = Trim(input.value,"g");
	var keynum;
	if(window.event) {
		keynum = e.keyCode
	}else if(e.which){
		keynum = e.which
    }
    if(keynum == 32){
    	return false;
    }
    return true;
} 

function Trim(str,is_global){
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g,"");
	if(is_global.toLowerCase()=="g"){
		result = result.replace(/\s/g,"");
	}
	return result;
}


