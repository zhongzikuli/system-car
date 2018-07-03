$(function(){
	$(".search-btn").on("click", function(){
		var realName = $.trim($("#search-real-name").val());
		var cardNo = $.trim($("#search-card-no").val());
		if("" == realName ){
			faildMsg("真实姓名不能为空");
		}else if("" == cardNo){
			faildMsg("身份证号码不能为空");
		}else{
			loadingShow();
			$.ajax({
				url		: ctx + "/risk/queryForBlack.action",
				type	: "post",
				data	: {
					name	: realName,
					cardNo	: cardNo
				},
				dataType: "json",
				success	: function (data) {
					loadingHide();
					if (data.error == 1) {
						var rows = data["rows"];
						var item = "";
						if(rows.length <=0){
							item = '<tr><td colspan="2">暂无数据</td></tr>';
						}
						for(var i=0; i<rows.length; i++){
							item += '<tr><td>'+ (i+1) +'</td><td>'+rows[i]+'</td></tr>';
						}
						$("#result").empty().html(item);
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		}
	});
});