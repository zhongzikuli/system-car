$(function(){
	//回车键提交表单
	$("#pagerForm").find("input").keypress(function(event){
		var keyCode = event.keyCode?event.keyCode:event.which?event.which:event.charCode;
		if(keyCode ==13){
			$("#pageNum").val(0);
			$("#pagerForm").submit();
		}
	});
	//图片放大
	$(".pre-img").on("click",function(){
		$.openPhotoGallery(this)
	});
});

//导入流程定义模板
function importProcessDefinition(){
	var importDlg = null;	//导入窗口
	var options = {
		width	: 400,
		top		: 200,
		height	: 210,
		overlay	: true,
		dispose	: true,
		move	: true,
		title	: '导入流程定义',
		move	: true,
		url		: '',
		onBeforeShow:function(){
			 $(".file-upload").change(function() {
				var arrs=$(this).val().split('\\');
				var filename=arrs[arrs.length-1];
				$(".show-name").html(filename);
			});
		},
		callback:function()	{
			loadingShow();
			$.ajaxFileUpload({
				url				: ctx + "/processDefinition/importTemplate.action",		//用于文件上传的服务器端请求地址
				secureuri		: false ,											//一般设置为false
				fileElementId	: 'fileUpload',										//文件上传控件的id属性  <input type="file" id="upload" name="upload" />
				dataType		: 'json',											//返回值类型 一般设置为json
				success			: function (data){									//服务器成功响应处理函数
					//隐藏loading
					loadingHide(300);
					if(data.error == 1){
						//关闭窗口
						importDlg.hide();
						//提示信息
						successMsg("流程定义导入成功！", 1000, function () {
							window.location.href = ctx + "/processDefinition/query.action";
						});
					}else{
						faildMsg(data.message, 1000);
					}
				},
				error			: function (data, status, e){	//服务器响应失败处理函数
					//隐藏loading
					loadingHide(300);
					//提示信息
					faildMsg(data.message, 1000);
				}
			});
			return false;
		}
	};
	importDlg = new Dialog("#import-process-dialog",options);
	importDlg.show();
}

//导入流程图
function importProcessPicture(processId){
	var importDlg = null;	//导入窗口
	var options = {
		width	: 400,
		top		: 200,
		height	: 210,
		overlay	: true,
		dispose	: true,
		move	: true,
		title	: '导入流程图',
		move	: true,
		url		: '',
		onBeforeShow:function(){
			$(".file-upload").change(function() {
				var arrs=$(this).val().split('\\');
				var filename=arrs[arrs.length-1];
				$(".show-name").html(filename);
			});
		},
		callback:function()	{
			loadingShow();
			console.log(processId);
			$.ajaxFileUpload({
				url				: ctx + "/processDefinition/importPicture.action?id=" + processId,		//用于文件上传的服务器端请求地址
				secureuri		: false ,											//一般设置为false
				fileElementId	: 'fileUpload',										//文件上传控件的id属性  <input type="file" id="upload" name="upload" />
				dataType		: 'json',											//返回值类型 一般设置为json
				success			: function (data){									//服务器成功响应处理函数
					//隐藏loading
					loadingHide(300);
					//结果判断
					if(data.error == 1){
						//关闭窗口
						importDlg.hide();
						//提示信息
						successMsg("流程定义导入成功！", 1000, function () {
							window.location.href = ctx + "/processDefinition/query.action";
						});
					}else{
						faildMsg(data.message, 1000);
					}
				},
				error			: function (data, status, e){	//服务器响应失败处理函数
					//隐藏loading
					loadingHide(300);
					//提示信息
					faildMsg(data.message, 1000);
				}
			});
			return false;
		}
	};
	importDlg = new Dialog("#import-process-picture-dialog", options);
	importDlg.show();
}