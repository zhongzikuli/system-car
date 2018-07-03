jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width:'100%'
    };
    //下拉框
    $(".chosen-select").chosen(config);
    $("#bankId").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
        	$("#vtip").hide()
            change_error_style($("#bankId").parent(), "remove");
        } else {
            change_error_style($("#bankId").parent(), "add");
        }
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
    //购车人
    initCustomerUploader();
    //配偶
    initPartnerUploader();
    //担保人
    initGuarantorUpload1();

    //全局表单验证数组
    var validationArray = new Array();
    var $div = $("#buyer-form").children("div").children("div").children("div");
    $.each($div, function () {
        var $id = $(this).attr("id");
        if ($id != undefined && $id != '') {
            initValidation(validationArray, "#" + $id);
        }
    });

    //担保人全局变量
    var addNumbers = new Array();
    var removeNumbers = new Array();
    addNumbers.push(1);
    var guarantorNumber = 0;//添加担保人数的次数
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
            var filterQuery = new BlackFilterQuery("#guaranter" + $number);
            //初始化删除事件
            initGuarantorRemoveEvent($number, filterQuery);
            //初始化上传组件
            initGuarantorUpload($number);
            //初始化添加担保人校验
            initValidation(validationArray, "#sponsor" + $number);
        } else {
            faildMsg("担保人不能超过四位！");
            return
        }
    });

    function initValidation(validationArray, id) {
        var validate = new ValidateWin(id, {});
        validationArray.push(validate);
    }

    function initGuarantorUpload1() {
        $(".sponsorForm").each(function (index) {
            var k = index + 1;
            $("#addGuarantor").data("count", k);
            if (k != 1) {
                initGuarantorRemoveEvent(k);
            }
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
                //$('#guaranter-uploader-' + (i + 1)).children('.queueList').addClass('others')
            }
        })
    }

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
            //$('#partner-uploader-' + (i + 1)).children('.queueList').addClass('others');
        }
    }

    function initCustomerUploader() {
        for (var i = 0; i < uploadConfig.length; i++) {
            var message = uploadConfig[i];
            new HYUpload({
                auto: true,
                containerId: '#customer-uploader-' + (i + 1),
                uploadImg: true,						//图片上传标记
                dropTip: message['dropTip'],
                buttonText: message['buttonText'],
                server: ctx + '/fdfs/uploadFile.action'
            });
        }
    }

    function initGuarantorRemoveEvent(number, filterQuery) {
        $("#remove-guarantor-" + number).on("click", function () {
            guarantorNumber--;
            $(this).parent().parent().parent().remove();
            $(this).parents(".form-group").next().remove();
            $(this).parents(".form-group").remove();
            removeNumbers.push(number);
            //删除风控命中项
            filterQuery.deleteItem("guaranter-" + number);
        });
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
    
    function createGuarantorHtml(number) {
        var html = '<div class="sponsorForm"  id="sponsor' + number + '"> <form><div id="guaranter' + number + '" class="form-group guaranter' + number + '">' +
            '<label class="col-xs-1 control-label">担保人姓名:</label>' +
            '<input type="hidden" name="userType" value="SPONSOR"/>' +
            '<div class="col-xs-3"><input type="text"  data-type="guaranter-' + number + '" id="guaranterName" name="realName" maxlength="10" class="form-control"></div>' +
            '<label class="col-xs-1 control-label">身份证号:</label>' +
            '<div class="col-xs-3"><input type="text" data-type="guaranter-' + number + '" name="cardNo" onKeyup="return inputSapceTrim(event,this)"  maxlength="18" class="form-control others" url= "' + ctx + '/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>' +
            '<div class="col-xs-4"><a class="btn btn-danger btn-md" id="remove-guarantor-' + number + '">删除</a></div>' +
            '</div>' +

            '<div class="form-group guaranter' + number + '">' +
            '<label class="col-xs-1 control-label">上传证件:</label>' +
            '<div class="col-xs-11 uploaderErea">' +
            '<div class="row" style="margin-left: 0;">' +
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
            ' </form></div>';

        return html;
    }

    function photo($this, photoFlag) {
        var has_no_blank = false;
        $($this).children("form").find("input[name='realName'],input[name='cardNo']").each(function () {
            var v = $(this).val();
            if (v != '') {
                has_no_blank = true;
            }
        });
        $($this).find(".page-container").each(function () {
            var $v = $(this).children("div").children("div").find(".filelist li");
            if($v.length>0){
            	has_no_blank = true;
            }
        })
        if (has_no_blank) {
            $($this).children("form").find("input[name='realName'],input[name='cardNo']").each(function () {
                var v = $(this).val();
                if (v == '') {
                    photoFlag = false;
                    $(this).addClass("input_validation-failed");
                } else {
                    $(this).removeClass("input_validation-failed");
                }
            });
            $($this).find(".page-container").each(function () {
                var $v = $(this).children("div").children("div").find(".filelist li");
                if ($(this).children("div").hasClass('cardFrontPhoto')) {
                    if ($($v).data("filepath") == undefined) {
                        photoFlag = false;
                        $(this).find(".queueList").addClass("wrong");
                    } 
                } else if ($(this).children("div").hasClass('cardBackPhoto')) {
                    if ($($v).data("filepath") == undefined) {
                        photoFlag = false;
                        $(this).find(".queueList").addClass("wrong");
                    } 
                } else if ($(this).children("div").hasClass('authorizeLetterPhoto')) {
                    if ($($v).data("filepath") == undefined) {
                        photoFlag = false;
                        $(this).find(".queueList").addClass("wrong");
                    }
                } else if ($(this).children("div").hasClass('signaturePhoto')) {
                    if ($($v).data("filepath") == undefined) {
                        photoFlag = false;
                        $(this).find(".queueList").addClass("wrong");
                    }
                }
            });
        }

        return photoFlag;
    }

    function extracted($this, buyers) {
        var typeInput = $($this).find("input[name='userType']");
        var nameInput = $($this).find("input[name='realName']");
        var cardInput = $($this).find("input[name='cardNo']");
        var userType = typeInput.val();
        var realName = nameInput.val();
        var cardNo = cardInput.val();
        if(cardNo){
        	cardInput.attr('obj','idCard');
        }
        if (userType == '' || realName == '' || cardNo == '') {
            return;
        }
        var partner = {};
        partner.userType = userType;
        partner.realName = realName;
        partner.cardNo = cardNo;
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

    $(".submit-btn").on("click", function () {
        var param = {};
        param.bankId = $("select[name='bankId']").val();
        var buyers = new Array();
        var $div = $("#buyer-form").children("div").children("div").children("div");
        var photoFlag = true;
        $.each($div, function () {
            var $id = $(this).attr("id");
            if ($id != undefined && $id != '') {
                initValidation(validationArray, "#" + $id);
                if(photoFlag){
                	photoFlag = photo(this, photoFlag);
                    if (photoFlag) {
                        extracted(this, buyers);
                    }
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
        for(var i = 0; i<buyers.length; i++){
        	if(buyers[i].userType == undefined){
        		buyers.splice(i,1);
        		i = i-1;
        	}
        }
        param.cfBuyerInformationVOS = buyers;
        loadingShow();
        $.ajax({
            url: ctx + "/cfBusinessOrderAccept/create.action",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(param),
            dataType: "json",
            success: function (data) {
            	loadingHide();
                if (data.error == 1) {
                	successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/cfBusinessOrderAccept/credit/input.action";
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    });

    //黑名单过滤查询对象（购车人、配偶、担保人1）
    new BlackFilterQuery("#buyerForm");
    new BlackFilterQuery("#sharedForm");
    new BlackFilterQuery("#sponsorForm");
});

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
//表单校验
function validSelect(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "bankId") {
                $(lableId).parent().attr('tip', '请输入正确的贷款银行。').addClass("input_validation-failed");
                return "faild";
            }
        }
        return "success";
    }
}
