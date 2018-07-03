jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
	//下拉框初始化
	var config = {
		disable_search_threshold:10,
		no_results_text: '无数据',
		width:"100%"
	};
	//显示下拉框
	$(".bank-type").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($(".bank-type").parent(), "remove");
        } else {
            change_error_style($(".bank-type").parent(), "add");
        }
    });
	$(".product-type").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($(".years-type").parent(), "remove");
        } else {
            change_error_style($(".years-type").parent(), "add");
        }
    });;
	$(".years-type").chosen(config).on('change', function (e, selected) {
        if ("" != selected) {
            change_error_style($(".years-type").parent(), "remove");
        } else {
            change_error_style($(".years-type").parent(), "add");
        }
    });
	 var preData = new Array();
     var fileId = 1
     var fileGroup = $("#fileGroup").val();
     var filePath = $("#filePath").val();
     var fileName = $("#fileName").val();
     var temp = {
         "fileId": fileId,
         "fileGroup": fileGroup,
         "filePath": filePath,
         "fileName": fileName
     };
     preData.push(temp);
     var uploadComp = null;
     uploadComp=new HYUpload({
        auto: true,
        containerId: '#addUploader',
        uploadImg: false,						//图片上传标记
        buttonText: '上传文件',
        formData: {filetype: 4},
        initData: preData,
        server: ctx + '/fdfs/uploadFile.action'
    });
	new ValidateWin("#bankRate-form", {
		callback:function(content,event){
			getPic();
			$.ajax({
	            url: ctx + "/bankRate/update.action",
	            type: "post",
	            data: $("#bankRateEdit").serialize(),
	            dataType:"json",
	            success:function (data) {
		            if (data.error == 1) {
		                successMsg("操作成功！", 1000, function () {
		                    window.location.href = ctx + "/bankRate/query.action";
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
        //遍历文件列表
        var file={};
            file.fileGroup = $(".filelist li").attr("data-group");
            file.filePath = $(".filelist li").attr("data-filepath");
            file.fileName = $(".filelist li").attr("data-filename");
           $("#fileGroup").val(file.fileGroup) 
           $("#filePath").val(file.filePath) 
           $("#fileName").val(file.fileName)
	 if(null !=uploadComp && uploadComp.uploader.isInProgress()){
			faildMsg("文件正在上传");
			return flag
		}else if(fileLength <1){
            faildMsg("请选择上传的文件");
            return flag
        }else if($("#filePath").val()==''||$("#filePath").val()== null||undefined == $("#filePath").val()){
        	  faildMsg("请选择上传的文件");
              return flag
         }
    }
});
function validBankRate(lableId){
	 if (undefined != lableId && null != lableId && lableId != "") {
	        if ($(lableId).val() == null || $(lableId).val() == "") {
	             if ($(lableId).attr("id") == "bank-type" ) {
	            	 $(lableId).parent().addClass("input_validation-failed");
	                return "faild";
		        }else if ($(lableId).attr("id") == "product-type") {
		        	$(lableId).parent().addClass("input_validation-failed");
	                return "faild";
		        }else if ($(lableId).attr("id") == "years-type") {
		        	 $(lableId).parent().addClass("input_validation-failed");
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceInNewCarCode") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceInNewCarRate") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceInOldCarCode") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceInOldCarRate") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceOutNewCarCode") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceOutNewCarRate") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceOutOldCarCode") {
		               return "faild";
		        }else if ($(lableId).attr("id") == "bankRate-provinceOutOldCarRate") {
		               return "faild";
		        }
	            return "success";
	        }
	        if ($(lableId).val() != null && $(lableId).val() != "") {
		        var _this = $(lableId);
		        //新建
		        if ($(lableId).attr("id") == "bankRate-provinceInNewCarCode") {
		        	var name = $("#bankRate-provinceInNewCarCode").val ();
		        	if (name.length>50) {
		                $(lableId).attr('tip', '省内新车代码不能超过50个字符');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInOldCarCode") {
		        	var name = $("#bankRate-provinceInOldCarCode").val();
		        	if (name.length>50) {
		                $(lableId).attr('tip', '省内二手车代码不能超过50个字符');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutNewCarCode") {
		        	var name = $("#bankRate-provinceOutNewCarCode").val();
		        	if (name.length>50) {
		                $(lableId).attr('tip', '省外新车代码不能超过50个字符');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutOldCarCode") {
		        	var name = $("#bankRate-provinceOutOldCarCode").val();
		        	if (name.length>50) {
		                $(lableId).attr('tip', '省外 二手车代码不能超过50个字符');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInNewCarRate") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInOldCarRate") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutNewCarRate") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutOldCarRate") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInNewCarLoanRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutNewCarLoanRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInOldCarLoanRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutOldCarLoanRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInNewInstalmentTotalUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutNewInstalmentTotalUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInOldInstalmentTotalUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutOldInstalmentTotalUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInNewContractRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutNewContractRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceInOldContractRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        if ($(lableId).attr("id") == "bankRate-provinceOutOldContractRatioUp") {
		            if (!(/^(100|[1-9]?\d(\.\d\d\d?\d?)?)$|0$/).exec(_this.val())) {
		                $(lableId).attr('tip', '请输入正确的百分数');
		                return "faild";
		            }  else {
		                return "success";
		            }
		        }
		        
		        return "success";
		    }
	        return "success";
	    }
	}

