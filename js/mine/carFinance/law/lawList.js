$(function(){
	var acceptId = $("#acceptId").val();
    //新增诉讼信息
    $(".add-btn").on("click",function(){
        window.location.href = ctx + "/cfLaw/lawAdd.action?acceptId="+acceptId;
    });
    
    $(".lightBox").on("click",function(){
		setTimeout(function(){
			$('body', window.parent.document).find("#lightbox").find(".lb-nav").hide()
		},1000);
		
	});
	//重置按钮
	$(".resets-btn").on("click", function(){
		$("#search-is-lawerFee").val("").trigger('chosen:updated');
	});
    //删除诉讼信息
    $(".delete-btn").on("click",function(){
        deleteLaw();
    });
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
  //下拉框初始化
	$("#search-is-lawerFee").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "160px"
	});
  //删除诉讼信息
    function deleteLaw() {
        var ck = $("input[name='law_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的诉讼信息。");
            return
        } else {
            var idArr = new Array();
            var lawIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    lawIsvalid = false;
                }
            });
            if (!lawIsvalid) {
                alertDialog("所选信息包含无效信息，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的诉讼信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/cfLaw/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                    	loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfLaw/queryLaw.action?businessOrderAcceptId="+acceptId;
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
});

function editLaw(id){
	window.location.href = ctx + "/cfLaw/toEdit.action?id="+id;
}
