$(function(){
	//初始化对象
	var hy = new HYCarFinance();
	//配置按钮事件
	$(".config-btn").on("click", function(){
		var userId = $(this).attr("data-id");
		var module = $(this).attr("name");
		var moduleDesc = HYCarFinance.config.getModuleDesc(module);
		var options = {
			width		:400,
			top			: 200,
			height		: 410,
			overlay		: true,
			dispose		: true,
			move		: true,
			onBeforeShow:function(){
				//初始化树
				var setting = {
					check: {
						enable: true,
						chkboxType: {"Y":"", "N":""}
					},
					view: {
						dblClickExpand: false
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						onCheck: onCheck
					}
				};
				$.ajax({
					url			: ctx + "/orderApplyModifyPermission/preLoadUser.action",
					type		: "post",
					dataType	: 'json',
					data		: {
						module : module,
					},
					async		: false,
					success: function (data) {
						if (data.error == 1) {
							$.fn.zTree.init($("#audit-user-config-tree"), setting, data.rows);
						} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}
					}
				});
				//模块值
				$("#module").val(module);
				$("#moduleDesc").val(moduleDesc);
			},
			callback:function()	{
				//显示遮罩
				loadingShow();
				var nodes = $.fn.zTree.getZTreeObj("audit-user-config-tree").getCheckedNodes(true);
				var uId = "";
				for(var i = 0; i < nodes.length; i++){
					uId += nodes[i].id + ",";
				}
				if (uId.length > 0 ){
					uId = uId.substring(0, uId.length-1);
				}
				var module = $("#module").val();
				$.ajax({
					url		: ctx + "/orderApplyModifyPermission/updateConfig.action",
					type	: "post",
					data	: {
						module		: module,
						moduleDesc	: moduleDesc,
						userIds		: uId
					},
					dataType: 'json',
					success	: function (data) {
						//隐藏遮罩
						loadingHide(100);
						
						if (data.error == 1) {
							//给出提示信息
							successMsg("权限配置成功！",1000, function(){
								//刷新
								refresh()
							});
						} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}
					}
				});
			}
		};
		var editDlg = new Dialog("#audit-user-config-dialog",options);
		editDlg.show();
	});
	
	//节点选择
	function onCheck(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj(treeId),
			nodes = zTree.getCheckedNodes(true),
			uId = "",
			uName = "";
		for (var i=0, l=nodes.length; i<l; i++) {
			uName += nodes[i].name + "，";
			uId += nodes[i].id + ",";
		}
		if (uId.length > 0 ){
			uId = uId.substring(0, uId.length-1);
		}
		if (uName.length > 0 ){
			uName = uName.substring(0, uName.length-1);
		}
		var module = $("#module").val();
		if("" != uName){
			$("#auditPermissionWrap").find('input[name="'+module+'"]').val(uName);
		}else{
			$("#auditPermissionWrap").find('input[name="'+module+'"]').val("");
		}
	}
	
	function refresh(){
		window.location.href = ctx + "/orderApplyModifyPermission/query.action";
	}
});