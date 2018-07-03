$(function(){
	//新增按钮
	$(".add-menu").on("click", function(){
		createAppMenu();
	});
	
	//删除按钮
	$(".delete-menu").on("click", function(){
		deleteAppMenu();
	});
	
	//更新按钮
	$(".update-menu").on("click", function(){
		var id = $(this).attr("data-id");
		editAppMenu(id);
	});
	
	//查看按钮
	$(".view-menu").on("click", function(){
		var id = $(this).attr("data-id");
		viewAppMenu(id);
	});
	
	//图片放大
	$(".pre-img").on("click",function(){
		$.openPhotoGallery(this)
	});
	var config = {
		disable_search_threshold: 10,
		no_results_text: '无数据',
		width: "210px"
	};
	
	//查看
	function viewAppMenu(id){
		var picData = new Array();
		var options = {
			width		: 740,
			top			: 200,
			height		: 540,
			overlay		: true,
			dispose		: true,
			move		: true,
			title		: '查看',
			onBeforeShow: function(){
				getMenuById(id, function(data){
					$("#edit-menu-name").attr("url", "");
					$("#edit-menu-name").val(data["name"]).attr("readonly", true);
					$("#edit-menu-skip-url").val(data["skipUrl"]).attr("readonly", true);
					$("#edit-order-no").val(data["orderNo"]).attr("readonly", true);
					$("#edit-menu-group").val(data["groupName"]).attr("readonly", true);
					$("#edit-menu-bak").val(data["remark"]).attr("readonly", true);
					$("#edit-menu-type").find("option[value='"+data["menuType"]+"']")
					$("#edit-menu-type").attr("disabled",true);
					$("#edit-menu-skip-type").find("option[value='"+data["skipType"]+"']");
					$("#edit-menu-skip-type").attr("disabled",true);
					$("#edit-menu-is-login").find("option[value='"+data["isLogin"]+"']");
					$("#edit-menu-is-login").attr("disabled",true);
					$(".menu-select").chosen(config);
					picData.push({
						fileGroup	: data["fileGroup"],
						fileId		: data["id"],
						fileName	: data["fileName"],
						filePath	: data["filePath"]
					});
					uploadComp=  new HYUpload({
						auto		: true,
						containerId	: '#appMenuUpload',
						uploadImg	: true,						//图片上传标记
						dropTip		: '或将图片拖到这里',
						initData	: picData,
						buttonText	: '选择菜单图标',
						server		: ctx + '/fdfs/uploadFile.action'
					});
					$(".statusBar").remove();
					$(".file-panel").remove();
				});
				$(".red").remove();
				$(".dialog-ok").remove();
				$(".dialog-manage").find(".dialog-close").html("关闭");
				$("#appMenuUploadTip").remove();
			}
		};
		var viewDlg = new Dialog("#app-menu-dialog", options);
		viewDlg.show();
	}
	
	//编辑
	function editAppMenu(id){
		var picData = new Array();
		var options = {
			width		: 740,
			top			: 200,
			height		: 600,
			overlay		: true,
			dispose		: true,
			move		: true,
			title		: '编辑',
			onBeforeShow: function(){
				getMenuById(id, function(data){
					$("#edit-menu-name").attr("param", "id=" + data["id"]);
					$("#edit-menu-id").val(data["id"]);
					$("#edit-menu-name").val(data["name"]);
					$("#edit-menu-skip-url").val(data["skipUrl"]);
					$("#edit-order-no").val(data["orderNo"]);
					$("#edit-menu-group").val(data["groupName"]);
					$("#edit-menu-bak").val(data["remark"]);
					$("#edit-menu-type").find("option[value='"+data["menuType"]+"']").attr("selected",true);
					$("#edit-menu-skip-type").find("option[value='"+data["skipType"]+"']").attr("selected",true);
					$("#edit-menu-is-login").find("option[value='"+data["isLogin"]+"']").attr("selected",true);
					$(".menu-select").chosen(config);
					picData.push({
						fileGroup	: data["fileGroup"],
						fileId		: data["id"],
						fileName	: data["fileName"],
						filePath	: data["filePath"]
					});
				});
			},
			onAfterShow: function () {
				uploadComp=  new HYUpload({
					auto		: true,
					containerId	: '#appMenuUpload',
					uploadImg	: true,						//图片上传标记
					dropTip		: '或将图片拖到这里',
					initData	: picData,
					buttonText	: '选择菜单图标',
					server		: ctx + '/fdfs/uploadFile.action'
				});
			},
			callback	: function () {
				if ($("#edit-menu-form").valid("edit-menu-form")) {
					var param = new Object;
					$("#appMenuUpload").find("li").each(function(i,n){
						param["fileGroup"] = $(n).attr("data-group");
						param["filePath"] = $(n).attr("data-filepath");
						param["fileName"] = $(n).attr("data-filename");
						
					});
					if(typeof(param["filePath"]) == "undefined" || null == param["filePath"] || "" == param["filePath"]){
						$("#appMenuUpload").find(".queueList").addClass("wrong");
						return false;
					}else{
						loadingShow();
						$('#edit-menu-form').find("input, select, textarea").each(function (i, n) {		//回写省份、城市
							var name = $(n).attr("name");
							if(typeof(name) != "undefined" && name != "file"){
								param[name] = $.trim($(n).val());
							}
						});
						$.ajax({
							url		: ctx + "/appMenu/update.action",
							type	: "post",
							data	: param,
							dataType: "json",
							success	: function (data) {
								loadingHide();
								if (data.error == 1) {
									successMsg("更新成功！", 1000, function () {
										refresh();
									});
								} else if (data.error == -100) {
									faildMsg("会话超时，请重新登陆！");
								} else {
									faildMsg(data.message);
								}
							}
						});
					}
				} else {
					return false;
				}
			}
		};
		var editDlg = new Dialog("#app-menu-dialog", options);
		//下拉框
		//$(".menu-select").chosen(config);
		editDlg.show();
	}
	
	//根据id查询菜单
	function getMenuById(id, callback){
		$.ajax({
			url		: ctx + "/appMenu/getById.action",
			type	: "post",
			data	: {
				id	: id
			},
			dataType: "json",
			success	: function (data) {
				if (data.error == 1) {
					if(typeof(callback) === "function"){
						callback(data["rows"]);
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	
	//新增
	function createAppMenu() {
		var options = {
			width		: 740,
			top			: 200,
			height		: 600,
			overlay		: true,
			dispose		: true,
			move		: true,
			title		: '新增',
			onAfterShow: function () {
				uploadComp=  new HYUpload({
					auto: true,
					containerId: '#appMenuUpload',
					uploadImg: true,						//图片上传标记
					dropTip: '或将图片拖到这里',
					buttonText: '选择菜单图标',
					server: ctx + '/fdfs/uploadFile.action'
				});
			},
			callback	: function () {
				if ($("#edit-menu-form").valid("edit-menu-form")) {
					var param = new Object;
					$("#appMenuUpload").find("li").each(function(i,n){
						param["fileGroup"] = $(n).attr("data-group");
						param["filePath"] = $(n).attr("data-filepath");
						param["fileName"] = $(n).attr("data-filename");
						
					});
					if(typeof(param["filePath"]) == "undefined" || null == param["filePath"] || "" == param["filePath"]){
						$("#appMenuUpload").find(".queueList").addClass("wrong");
						return false;
					}else{
						loadingShow();
						$('#edit-menu-form').find("input, select, textarea").each(function (i, n) {		//回写省份、城市
							var name = $(n).attr("name");
							if(typeof(name) != "undefined" && name != "file"){
								param[name] = $.trim($(n).val());
							}
						});
						$.ajax({
							url		: ctx + "/appMenu/add.action",
							type	: "post",
							data	: param,
							dataType: "json",
							success	: function (data) {
								loadingHide();
								if (data.error == 1) {
									successMsg("新增成功！", 1000, function () {
										window.location.href = ctx + "/appMenu/query.action";
									});
								} else if (data.error == -100) {
									faildMsg("会话超时，请重新登陆！");
								} else {
									faildMsg(data.message);
								}
							}
						});
					}
				} else {
					return false;
				}
			}
		};
		var createDlg = new Dialog("#app-menu-dialog", options);
		//下拉框
		$(".menu-select").chosen(config);
		createDlg.show();
	}
	
	//删除菜单
	function deleteAppMenu() {
		var ck = $("input[name='menuList_input']:checked");
		if (ck.length == 0) {
			alertDialog("请选择要删除的菜单。");
			return
		} else {
			var idArr = new Array();
			$(ck).each(function () {
				idArr.push($(this).val());
			});
			confirmDialog("确认删除选中的菜单吗？", function () {
				loadingShow();
				var params = {}
				params.ids = idArr.toString();
				$.ajax({
					url		: ctx + "/appMenu/delete.action",
					type	: "post",
					data	: params,
					dataType: "json",
					success	: function (data) {
						loadingHide();
						if (data.error == 1) {
							successMsg("删除成功！", 1000, function () {
								refresh();
							});
						} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}
					}
				});
			});
		}
	}
	
	function refresh() {
		var name = $.trim($("#seach-hidden-menu-name").val());
		window.location.href = ctx + "/appMenu/query.action?name=" + name;
	}
});

//校验
function validateMenuBak(labelId){
	if (undefined != labelId && null != labelId && labelId != "") {
		if ($(labelId).val() == null || $(labelId).val() == "") {
			if ($(labelId).attr("id") == "edit-menu-skip-url") {
				$(labelId).attr('tip', '跳转url为空，请重新输入。');
				return "faild";
			}
		}
		if ($(labelId).val() != null && $(labelId).val() != "") {
			if ($(labelId).attr("id") == "edit-menu-group") {
				var group = $("#edit-menu-group").val();
				if (group.length > 50) {
					$(labelId).attr('tip', '所在组长度不能超过50个字符');
					return "faild";
				}
			}else if ($(labelId).attr("id") == "edit-order-no") {
				var ordeNo = $("#edit-order-no").val();
				var reg = new RegExp("^-?\\d+$");
				if (!reg.test(ordeNo)) {
					$(labelId).attr('tip', '展示顺序只能为数字');
					return "faild";
				}
			}else if ($(labelId).attr("id") == "edit-menu-bak") {
				var name = $("#edit-menu-bak").val();
				if (name.length > 50) {
					$(labelId).attr('tip', '备注长度不能超过50个字符');
					return "faild";
				}
			}
		}
		return "success";
	}
}