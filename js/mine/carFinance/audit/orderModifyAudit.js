//候补资料审核
$(function(){
	//业务受理单相关信息
	var acceptId = $("#acceptId").val();
	//换审核按钮
	$(".change-btn").on("click", function(){
		var id = $(this).attr("data-id");
		confirmDialog("确认换审核该订单？", function () {
			var params = {
				idArr : id
			};
			$.ajax({
				url		: ctx + "/cfSupplyMaterial/change.action",
				type	: "post",
				data	: params,
				dataType: "json",
				success	: function (data) {
					if (data.error == 1) {
						successMsg("操作成功！", 1000, refresh);
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		});
	});
	
	//审核按钮事件
	$(".order-modify-audit-btn").on("click", function(){
		var ck = $("input[name='auditCheckbox']:checked");
		if (ck.length == 0) {
			alertDialog("请选择要审核的记录。");
			return
		}
		var type = $(this).attr("data-type");
		var text = $(this).text();
		var idArr = new Array();
		$(ck).each(function (i, n) {
			idArr.push($(n).val());
		});
		
		var confirmDlg = new Dialog("#order-modify-audit-dialog",{
			width	: 600,
			top		: 200,
			height	: 320,
			overlay	: true,
			dispose	: true,
			move	: true,
			move	: true,
			onBeforeShow:function(){
				$(".dialog-ok").html(text);
				//审核描述信息提示
				$('#auditDescriptionTexarea').keyup(function(){
					var curLength=$(this).val().trim().length;
					$(this).next("span").find(".input").html(curLength);
					$(this).next("span").find(".can-input").html((100 - curLength) >= 0 ? (100 - curLength) : 0);
					if(curLength>100){
						var num=$(this).val().trim().substr(0,100);
						$(this).val(num);
					}
				});
			},
			callback:function()	{
				if ($("#modifyAuditForm").valid("modifyAuditForm")){
					var params = {
							ids		: idArr.toString(),
							orderId	: acceptId,
							status	: type,
							desc	: $.trim($('#auditDescriptionTexarea').val())
					};
					loadingShow();
					$.ajax({
						url		: ctx + "/cfOrderApplyModify/audit.action",
						type	: "post",
						data	: params,
						dataType: "json",
						success	: function (data) {
							loadingHide();
							if (data.error == 1) {
								successMsg("订单修改审核成功！", 1000, refresh);
							} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
							} else {
								faildMsg(data.message);
							}
						}
					});
				}else{
					return false;
				}
			}
		});
		confirmDlg.show();
	});
	//刷新
	$(".refresh-btn").on("click", refresh);
	
	//刷新页面
	function refresh(){
		window.location.href = ctx + "/cfOrderApplyModify/preAudit.action?isAudit=0&orderId=" + acceptId;
	}
});