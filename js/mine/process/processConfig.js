$(function(){
	
	//静态图片服务路径
	var staticUrl = $("#staticUrl").val();
	
	//点击类型，加载对应流程节点
	$(".process-type-node").click(function(){
		//选中样式
		$(".process-type-node").removeClass("active");
		$(this).addClass("active");
		
		//获取属性值
		var dataId = $(this).attr("data-ref");
		var dataType = $(this).attr("data-type");
		
		//清空组件
		clearProcessHtml();
		
		//加载版本
		var data = findVersion(dataType);
		
		//初始化组件
		prepareVersionHtml(data);
		
		//初始化组件事件
		preVersionEvent();
		
		//设置默认版本
		setDefaultVersion(dataType);
	});
	
	//设置默认流程版本
	function setDefaultVersion(type){
		$.ajax({
			url		: ctx + "/processDefinition/getDefaultVersion.action",
			type	: "post",
			data	: {
				type		: type
			},
			dataType: "json",
			async	: false,
			success	: function (data) {
				if (data.error == 1) {
					if(null != data["rows"] && null != data["rows"]['processDefinitionId']){
						var processDefinitionId = record = data["rows"]['processDefinitionId'];
						$("#"+ processDefinitionId).iCheck('toggle');
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	
	//根据流程类型查询对应版本
	function findVersion(type){
		var record = null;
		$.ajax({
			url		: ctx + "/processDefinition/findVersion.action",
			type	: "post",
			data	: {
				type		: type
			},
			dataType: "json",
			async	: false,
			success	: function (data) {
				if (data.error == 1) {
					record = data["rows"];
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
		return record;
	}
	
	//根据流程编号查询对应流程节点
	function findNode(processId){
		var record = null;
		$.ajax({
			url		: ctx + "/processDefinition/findNode.action",
			type	: "post",
			data	: {
				processId		: processId
			},
			dataType: "json",
			async	: false,
			success	: function (data) {
				if (data.error == 1) {
					record = data["rows"];
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
		return record;
	}
	
	//显示版本radio
	function prepareVersionHtml(data){
		var html ="";
			for(var i=0; i<data.length; i++){
				html += '<div class="checkbox-inline radio i-checks" data-id="'+data[i]['id']+'" data-type="'+data[i]['type']+'" data-ref="'+data[i]['filePath']+'">' +
							'<label><input id="'+data[i]['id']+'" type="radio" value="option1" name="type">'+data[i]['version']+'</label>'+
						'</div>';
			}
		$(".process-version").html(html);
	}
	
	//初始化流程变量值
	function loadProcessVariable(){
		var processDefinitionId = $("#processDefinitionId").val();
		$.ajax({
			url			: ctx + "/processDefinition/preProcessVariable.action",
			type		: "post",
			dataType	: 'json',
			data		: {
				processDefinitionId	:	processDefinitionId
			},
			success: function (data) {
				if (data.error == 1) {
					if(null != data.rows){
						for(var i=0;i<data.rows.length;i++){
							var name = data["rows"][i]["name"];
							name = name.substring(1,name.length);
							$("#variable-" + name).val(NumberFormatUtil.fmoney(data["rows"][i]["value"], 2));
						}
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	
	//版本radio组件事件初始化
	function preVersionEvent(){
		$(".i-checks").on('ifChecked', function(event){
			var dataId = $(this).attr("data-id");
			var dataRef = $(this).attr("data-ref");
			var dataType = $(this).attr("data-type");
			//使用中
			$(".process-version .used").remove();
			$(this).append("<code class='used'>使用中</code>");
			
			//设置隐藏域流程定义值
			$("#processDefinitionId").val(dataId);
			//切换流程
			changeCurrentProcessDefinition(dataId, dataType);
			//清空节点组件
			clearProcessHtml();
			//加载流程节点
			var data = findNode(dataId);
			//加载流程图
			prepareProcessImg(dataRef, dataType);
			//加载流程节点
			prepareNodeHtml(data);
			//初始化节点事件
			preNodeEvent();
			//初始化节点默认值
			preNodeValue(dataId);
		}).iCheck({
			checkboxClass	: "icheckbox_square-green",
			radioClass		: "iradio_square-green"
		});
	}
	
	//切换当前流程定义
	function changeCurrentProcessDefinition(processDefinitionId, type){
		$.ajax({
			url		: ctx + "/processDefinition/updateProcessDefinition.action",
			type	: "post",
			data	: {
				processDefinitionId	: processDefinitionId,
				type				: type
			},
			dataType: 'json',
			success	: function (data) {
				if (data.error == 1) {
					console.log("update process definition success.");
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	
	//初始化节点值
	function preNodeValue(processDefinitionId){
		$.ajax({
			url		: ctx + "/processDefinition/getSelectedUser.action",
			type	: "post",
			data	: {
				processDefinitionId	: processDefinitionId,
				nodeId				: null
			},
			dataType: 'json',
			success	: function (data) {
				if (data.error == 1) {
					var users = data.rows;
					for (var i=0, l=users.length; i<l; i++) {
						//增加默认值
						var uName = "";
						if($("#user-selected-" + users[i]['processNodeId']).val() != ""){
							uName =  $("#user-selected-" + users[i]['processNodeId']).val() + "，" + users[i]['userName'];
						}else{
							uName =  users[i]['userName'];
						}
						$("#user-selected-" + users[i]['processNodeId']).val(uName);
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	
	
	//初始化节点事件
	function preNodeEvent(){
		$(".config-user-btn").on("click", function(){
			var dataId = $(this).attr("data-id");
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
					var zNodes;
					$.ajax({
						url			: ctx + "/processDefinition/preLoadUser.action",
						type		: "post",
						dataType	: 'json',
						async		: false,
						data		: {
							nodeId	:	dataId
						},
						success: function (data) {
							if (data.error == 1) {
								$(document).ready(function(){
									$.fn.zTree.init($("#process-user-config-tree"), setting, data.rows);
									$.fn.zTree.getZTreeObj("process-user-config-tree").expandAll(true);
								});
							} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
							} else {
								faildMsg(data.message);
							}
						}
					});
					//节点值
					$("#node-id").val(dataId);
					$("#process-definition-id").val($("#processDefinitionId").val());
				},
				callback:function()	{
					//显示遮罩
					loadingShow();
					var nodes = $.fn.zTree.getZTreeObj("process-user-config-tree").getCheckedNodes(true);
					var uId = "";
					for(var i = 0; i < nodes.length; i++){
						uId += nodes[i].id + ",";
					}
					if (uId.length > 0 ){
						uId = uId.substring(0, uId.length-1);
					}
					var processDefinitionId = $("#process-definition-id").val();
					$.ajax({
						url		: ctx + "/processDefinition/saveNodeConfig.action",
						type	: "post",
						data	: {
							nodeId				: dataId,
							processDefinitionId : processDefinitionId,
							userIds				: uId
						},
						dataType: 'json',
						success	: function (data) {
							//隐藏遮罩
							loadingHide(100);
							
							if (data.error == 1) {
								//给出提示信息
								successMsg("节点权限配置成功！",1000);
								//刷新节点
								refreshNodeConfig(processDefinitionId, dataId);
								
							} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
							} else {
								faildMsg(data.message);
							}
						}
					});
				},
				onAfterHide : function(){
					refreshNodeConfig($("#processDefinitionId").val(), dataId);
				}
			};
			var editDlg = new Dialog("#process-user-config-dialog",options);
			editDlg.show();
		});
	}
	
	//刷新节点配置
	function refreshNodeConfig(processDefinitionId, nodeId){
		$.ajax({
			url		: ctx + "/processDefinition/getSelectedUser.action",
			type	: "post",
			data	: {
				processDefinitionId	: processDefinitionId,
				nodeId				: nodeId
			},
			dataType: 'json',
			success	: function (data) {
				if (data.error == 1) {
					var users = data.rows;
					var uName ="";
					for (var i=0, l=users.length; i<l; i++) {
						uName += users[i].userName + "，";
					}
					if (uName.length > 0 ){
						uName = uName.substring(0, uName.length-1);
					}
					if("" != uName){
						$("#user-selected-" + nodeId).val(uName);
					}else{
						$("#user-selected-" + nodeId).val("");
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	
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
		if("" != uName){
			$("#user-selected-" + $("#node-id").val()).val(uName);
		}else{
			$("#user-selected-" + $("#node-id").val()).val("");
		}
		$("#user-id").val(uId);
	}
	
	//初始化流程图
	function prepareProcessImg(imgPath, dataType){
		//删除分割线
		$(".hr-line-dashed").remove();
		//初始化流程区域
		if(null !=imgPath && "" != imgPath){
			$(".process-img-wrap").html('<div class="form-group"><label class="pull-left control-label">流程图:</label><div class="pull-left"><img alt="流程图" title="点击查看原图" src="'+ staticUrl + imgPath+'"></div></div>');
			//图片放大事件
			$(".process-img-wrap").find(".pre-img").on("click",function(){
				$.openPhotoGallery(this)
			});
		}else{
			$(".process-img-wrap").html('<div class="form-group"><label class="pull-left control-label">流程图:</label><div class="pull-left"><div class="ibox-content b-n"><p class="text-center tip-message">流程图暂未导入</p></div></div></div>');
		}
		//分割线
		$(".process-img-wrap").parent().after('<div class="hr-line-dashed"></div>');
		//根据流程类型是否展示流程变量定义
		prepareProcessVariable(dataType);
	}
	
	//根据流程类型是否展示流程变量定义
	function prepareProcessVariable(dataType){
		//先清空
		$(".process-variable-wrap").remove();
		//添加变量组件
		if(null != dataType && 4 == dataType){
			var variableHtml =	'<div class="form-horizontal process-variable-wrap row  mr-none">'+
									'<div class="form-group mr-none">'+
										'<label class="pull-left control-label" style="text-align:left;">变量定义:</label>'+
										'<div class="pull-left" style="width: 90%;">'+
											'<div class="row  mr-none">'+
												'<div class="col-md-1 text-right" >'+
													'<label class="control-label">x=</label>'+
												'</div>'+
												'<div class="col-md-2">'+
													'<input id="variable-x" class="form-control" type="text">'+
												'</div>'+
												'<div class="col-md-1 text-right">'+
													'<label class="control-label">y=</label>'+
												'</div>'+
												'<div class="col-md-2">'+
													'<input id="variable-y" class="form-control" type="text">'+
												'</div>'+
												'<div class="col-md-1 text-right">'+
													'<label class="control-label">z=</label>'+
												'</div>'+
												'<div class="col-md-2">'+
													'<input id="variable-z" class="form-control" type="text">'+
												'</div>'+
												'<div class="col-md-1">'+
													'<button type="button" class="btn btn-primary submit-button">保存</button>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>';
			$(".process-img-wrap").parent().next("div").after(variableHtml);
			//事件初始化
			prepareProcessVariableEvent();
			//分割线
			$(".process-variable-wrap").after('<div class="hr-line-dashed"></div>');
		}else{
			$(".process-img-wrap").parent().next(".process-variable-wrap").remove();
		}
	}
	
	function prepareProcessVariableEvent(){
		//组件事件初始化
		$(".process-variable-wrap  .submit-button").on("click", function(){
			loadingShow();
			var xnum = NumberFormatUtil.rmoney($("#variable-x").val());
			var ynum = NumberFormatUtil.rmoney($("#variable-y").val());
			var znum = NumberFormatUtil.rmoney($("#variable-z").val());
			$.ajax({
				url		: ctx + "/processDefinition/saveVariable.action",
				type	: "post",
				data	: {
					processDefinitionId	: $("#processDefinitionId").val(),
					x	: xnum,
					y	: ynum,
					z	: znum
				},
				dataType: "json",
				success	: function (data) {
					loadingHide(100);
					if (data.error == 1) {
						$("#variable-x").val(NumberFormatUtil.fmoney(xnum, 2));
						$("#variable-y").val(NumberFormatUtil.fmoney(ynum, 2));
						$("#variable-z").val(NumberFormatUtil.fmoney(znum, 2));
						successMsg("保存成功");
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		});
		//设置流程变量值
		loadProcessVariable();
	}
	
	//初始化节点组件
	function prepareNodeHtml(data){
		var nodeHtml = "";
		if(null == data || data.length == 0){
			nodeHtml = '<div class="ibox-content b-n"><p class="text-center tip-message">流程模板定义无节点</p></div>';
		}else{
			nodeHtml += '<div class="ibox-content"> <form method="get" class="form-horizontal">';
			for(var i=0; i<data.length; i++){
				if(data[i]['configPermission']  == 1){
					nodeHtml += '<div class="form-group mr-none" style="margin: 8px 0px;">';
					nodeHtml += '<label class="pull-left  control-label text-left">'+data[i]['remark']+':</label>';
					nodeHtml += '<div class="pull-left control-text"><input readonly="readonly" id="user-selected-'+data[i]['id']+'" class="form-control config-text" type="text"></div>';
					nodeHtml += '<div class="pull-left">&nbsp;&nbsp;<a href="#" data-id='+data[i]['id']+' class="btn btn-info config-user-btn"> 配置</a></div>';
					nodeHtml += '</div>';
				}
			}
			
			nodeHtml +=  '</div></form>';
		}
		$(".process-config-wrap").html(nodeHtml);
	}
	
	function clearProcessHtml(){
		$(".process-img-wrap").empty();
		$(".process-img-wrap").parent().next(".hr-line-dashed").remove();
		$(".process-config-wrap").empty();
		$(".hr-line-dashed").remove();
		$(".process-variable-wrap").remove();
	}
});