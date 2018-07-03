$(function(){
	var acceptId = $("#acceptId").val();
   
    $(".lightBox").on("click",function(){
		setTimeout(function(){
			$('body', window.parent.document).find("#lightbox").find(".lb-nav").hide()
		},1000);
		
	})
   
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
  //重置按钮
	$(".reset-btn").on("click", function(){
		$("#keyword").val("");
	});

  //订单详情查看
	$(".detailForLaw").on("click", function(){
		var ck = $("input[name='lawInput']:checked");
		 if (ck.length == 0) {
	            alertDialog("请选择要删除的信息。");
	            return
		 }else if(ck.length >1){
			 alertDialog("对不起,只能查看一个详情");
	            return
		 }else{
			var _this = ck;
			var acceptId = $(_this).attr("data-id");
			var dataTitle = $(_this).attr("data-title");
			var dataHref = $(_this).attr("data-href");
			openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
		 }
	});
	//诉讼管理
	$(".lawList").on("click", function(){
		var ck = $("input[name='lawInput']:checked");
		if (ck.length == 0) {
			alertDialog("请选择诉讼管理用户。");
			return
		}else if(ck.length >1){
			alertDialog("对不起,只能查看一个诉讼管理");
			return
		}else{
			var _this = ck;
			var url = $(_this).attr("data-href-list");
			 window.location.href = url;
			
		}
	});
});

function editLaw(id){
	window.location.href = ctx + "/cfLaw/toEdit.action?id="+id;
}
