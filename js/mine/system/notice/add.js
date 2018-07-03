jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    // 新增公告编辑栏实例化
    var ue = UE.getEditor('addEditor');
    UE.Editor.prototype._bkGetActionUrl=UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl=function(action){
		if(action == 'uploadimage'){
	        return ctx+'/notice/uploadFile.action';
		}else{
			return this._bkGetActionUrl.call(this,action);
		}
	}
    
    new ValidateWin("#noticeCreate-Form", {
        callback:function(content,event){
        	var addContent = ue.getContent();
            if(addContent.length<1){
            	faildMsg("公告内容为空，请重新输入内容");
            	return
            }
            //addContent = addCode(addContent);
            loadingShow();
            $.ajax({
                url: ctx + "/notice/create.action",
                type: "post",
                data: {
                    title		:$("#notice-title").val(),
                    content	    :addContent
                },
                dataType: "json",
                async	: false,
                success: function (data) {
                	loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/notice/query.action";
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
  // 清空重置
    $('.btn-restet').on('click',function(){
    	$("#notice-title").val('');
    	ue.setContent('');
    })
});
function validFileForm (lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "notice-title") {
            	 $(lableId).attr('tip', '公告标题为空，请重新输入。');
 	            return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
	        if ($(lableId).attr("id") == "notice-title") {
	            if ($(lableId).val().length>50) {
	                $(lableId).attr('tip', '标题字符超过50个字符');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
        }
        return "success";
    }
}
