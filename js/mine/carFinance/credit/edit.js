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
    var guarantorNumber = parseInt($("#addGuarantor").data("count"));
    if (guarantorNumber == 0) {
        guarantorNumber++;
    }
    addNumbers.push(guarantorNumber);

    //添加担保人按钮
    $("#addGuarantor").on("click", function () {
        if (guarantorNumber < 4) {
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
            initGuarantorRemoveEvent($number, filterQuery);
            //初始化上传组件
            initGuarantorUpload($number);
            //初始化添加担保人校验
            initValidation(validationArray, "#sponsorForm" + $number);
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
                var preData = new Array();
                var temp = {};
                var $id = '#guaranter-uploader-group-' + (i + 1) + '-' + k;
                temp.fileId = $.trim($($id).data("id"));
                temp.fileName = $.trim($($id).data("name"));
                temp.fileGroup = $.trim($($id).data("group"));
                temp.filePath = $.trim($($id).data("path"));
                if (temp.filePath != '' && temp.fileGroup != '' && temp.fileName != '') {
                    preData.push(temp);
                }
                new HYUpload({
                    auto: true,
                    containerId: '#guaranter-uploader-group-' + (i + 1) + '-' + k,
                    uploadImg: true,						//图片上传标记
                    dropTip: message['dropTip'],
                    buttonText: message['buttonText'],
                    initData: preData,
                    server: ctx + '/fdfs/uploadFile.action'
                });
            }
        });
    }


    function initPartnerUploader() {
        for (var i = 0; i < uploadConfig.length; i++) {
            var message = uploadConfig[i];
            var preData = new Array();
            var temp = {};
            var $id = '#partner-uploader-' + (i + 1);
            temp.fileId = $.trim($($id).data("id"));
            temp.fileName = $.trim($($id).data("name"));
            temp.fileGroup = $.trim($($id).data("group"));
            temp.filePath = $.trim($($id).data("path"));
            if (temp.filePath != '' && temp.fileGroup != '' && temp.fileName != '') {
                preData.push(temp);
            }
            new HYUpload({
                auto: true,
                containerId: '#partner-uploader-' + (i + 1),
                uploadImg: true,						//图片上传标记
                dropTip: message['dropTip'],
                buttonText: message['buttonText'],
                initData: preData,
                server: ctx + '/fdfs/uploadFile.action'
            });
        }
    }

    function initCustomerUploader() {
        for (var i = 0; i < uploadConfig.length; i++) {
            var preData = new Array();
            var temp = {};
            var message = uploadConfig[i];
            var $id = '#customer-uploader-' + (i + 1);
            temp.fileId = $.trim($($id).data("id"));
            temp.fileName = $.trim($($id).data("name"));
            temp.fileGroup = $.trim($($id).data("group"));
            temp.filePath = $.trim($($id).data("path"));
            if (temp.filePath != '' && temp.fileGroup != '' && temp.fileName != '') {
                preData.push(temp);
            }
            new HYUpload({
                auto: true,
                containerId: $id,
                uploadImg: true,						//图片上传标记
                dropTip: message['dropTip'],
                buttonText: message['buttonText'],
                initData: preData,
                server: ctx + '/fdfs/uploadFile.action'
            });
        }
    }


    //删除
    function initGuarantorRemoveEvent(number, filterQuery) {
        $("#remove-guarantor-" + number).on("click", function () {
            $(this).parent().parent().parent().remove()
            $(this).parents(".form-group").next().remove();
            $(this).parents(".form-group").remove();
            guarantorNumber--;
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
        var html = '<div id="sponsorForm' + number + '" class="sponsorForm"><form><div class="form-group guaranter' + number + '">' +
            '<label class="col-xs-1 control-label">担保人姓名:</label>' +
            '<input type="hidden" name="userType" value="SPONSOR"/>' +
            '<div class="col-xs-3"><input type="text" data-type="guaranter-' + number + '" name="realName" class="form-control" maxlength="10" tip="请输入正确的姓名"/></div>' +
            '<label class="col-xs-1 control-label">身份证号:</label>' +
            '<div class="col-xs-3"><input type="text" data-type="guaranter-' + number + '" name="cardNo"  class="form-control" maxlength="18" tip="请输入正确的身份证号" onKeyup="return inputSapceTrim(event,this);" url="' + ctx + '/cfBusinessOrderAccept/checkCardNoIsExist.action"/></div>' +
            '<div class="col-xs-4"><a class="btn btn-danger btn-md" id="remove-guarantor-' + number + '">删除</a></div>' +
            '</div>' +

            '<div class="form-group guaranter' + number + '">' +
            '<label class="col-xs-1 control-label">上传证件:</label>' +
            '<div class="col-xs-11 uploaderErea">' +
            '<div class="row">' +
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


    $(".btn-submit").on("click", function () {
        var param = {};
        var photoFlag = true;
        var buyers = new Array();
        param.id = $("input[name='acceptId']").val();
        param.bankId = $("select[name='bankId']").val();
        var $div = $("#buyer-form").children("div").children("div").children("div");
        $.each($div, function () {
            var $id = $(this).attr("id");
            if ($id != undefined && $id != '') {
                initValidation(validationArray, "#" + $id);
                if ($id != "bankForm") {
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

        param.cfBuyerInformationVOS = buyers;
        loadingShow();
        $.ajax({
            url: ctx + "/cfBusinessOrderAccept/edit.action",
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
            }, error: function (data) {
                faildMsg(data.message);
            }
        });
    });
    
    function extracted($this, buyers) {
        var userType = $($this).find("input[name='userType']").val();
        var realName = $($this).find("input[name='realName']").val();
        var cardNo = $($this).find("input[name='cardNo']").val();
        if(cardNo){
        	 $($this).find("input[name='cardNo']").attr('obj','idCard');
        }
        if (userType == '' || realName == '' || cardNo == '') {
            return;
        }
        var partner = {};
        partner.id = $($this).find("input[name='id']").val();
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
                }else if ($(this).children("div").hasClass('signaturePhoto')) {
                    if ($($v).data("filepath") == undefined) {
                        photoFlag = false;
                        $(this).find(".queueList").addClass("wrong");
                    } else {
                        $(this).find(".queueList").removeClass("wrong");
                    }
                }
            });
        }
        return photoFlag;
    }

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

