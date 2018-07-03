$(function(){
    //新增资讯
    $(".add-btn").on("click",function(){
        window.location.href = ctx + "/news/newsAdd.action";
    });
    //图片查看
	$(".pre-img").on("click",function(){
	$.openPhotoGallery(this)
	});
    
    $(".lightBox").on("click",function(){
		setTimeout(function(){
			$('body', window.parent.document).find("#lightbox").find(".lb-nav").hide()
		},1000);
		
	})
    //删除行业资讯
    $(".delete-btn").on("click",function(){
        deleteNews();
    });
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
  //删除行业资讯
    function deleteNews() {
        var ck = $("input[name='news_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的资讯。");
            return
        } else {
            var idArr = new Array();
            var newsIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    newsIsvalid = false;
                }
            });
            if (!newsIsvalid) {
                alertDialog("所选信息包含无效信息，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的资讯信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/news/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/news/query.action";
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

function editNews(id){
	window.location.href = ctx + "/news/toEdit.action?id="+id;
}
