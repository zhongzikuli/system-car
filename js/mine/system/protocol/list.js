$(document).ready(function(){
	var config = {
	    disable_search_threshold:10,
	    no_results_text: '无数据',
	    width:"294px"
	};
	$(".add-btn").on("click",function(){
		protocolCreate();
	});
	
	$(".detail").on("click",function(){
		var id = $(this).attr("data-id");
		detailProtocol(id);
	});
	
	$(".edit-btn").on("click",function(){
		var id = $(this).siblings().attr("data-id");
		var type =$(this).attr("data-type");
		editProtocol(id, type);
	});
	$(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
	//新增协议
	function protocolCreate() {
		var options = {
	            width: 450,
	            top: 200,
	            height: 330,
	            overlay: true,
	            dispose: true,
	            move	: true,
	            title: '新增',
	            callback: function () {
	            	var flag = false;
	                if ($("#protocolCreateForm").valid("protocolCreateForm")) {
                        loadingShow();
	                    $.ajax({
	                        url: ctx + "/protocol/create.action",
	                        type: "post",
	                        data: {
	                        	content		: $("#protocol-add-content").val(),
	                        	type		: $("#protocol-add-type").val(),
	                        	remark		: $("#protocol-add-remark").val()
	                        },
	                        dataType: "json",
	                        async	: false,
	                        success: function (data) {
                                loadingHide();
	                            if (data.error == 1) {
	                                successMsg("操作成功！", 1000, function () {
	                                    window.location.href = ctx + "/protocol/query.action";
	                                });
	                            } else if (data.error == -100) {
	                                faildMsg("会话超时，请重新登陆！");
	                            } else {
	                                faildMsg(data.message);
	                            }
	                        }
	                    });
	                	if (flag) {
	    					return false;
	    				}
	    			} else {
	    				return false;
	    			}
	    		}
	    	};
		var addDlg = new Dialog("#protocolCreate-dialog", options);
		
		//下拉框
		$(".type-chosen-select").chosen(config);
		$(".type-chosen-select").on('change', function(e, selected) {
			if("" != selected){
				change_error_style($(".type-chosen-select").parent(),"remove");
			}else{
				change_error_style($(".type-chosen-select").parent(), "add");
			}
		});
		
		addDlg.show();
	}
	
	//查看
	function detailProtocol(id) {
		var options = {
				width: 450,
				top: 200,
				height: 330,
				overlay: true,
				dispose: true,
				move	: true,
				title: '查看',
				url: "",
				onBeforeShow: function () {
                    loadingShow();
					$.ajax({
						url: ctx + "/protocol/edit.action",
						type: "post",
						data: {
							id: id
						},
						dataType: "json",
						success: function (data) {
                            loadingHide();
							if (data.error == 1) {
								var protocol = data.rows;
								$("#protocol-view-content").val(protocol.content);
								$("#protocol-view-type").val(protocol.typeName);
								$("#protocol-view-type").attr("disabled","disabled");
								$("#protocol-view-remark").val(protocol.remark);
							} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
							} else {
								faildMsg(data.message);
							}			
						}
					});
				}
			}
		var detailDlg = new Dialog("#protocolView-dialog", options);
		detailDlg.show();
	}
	
	//协议修改
	function editProtocol(id,type) {
		var options = {
			width: 450,
			top: 200,
			height: 330,
			overlay: true,
			dispose: true,
			move	: true,
			title: '修改',
			onBeforeShow: function () {
				$.ajax({
					url: ctx + "/protocol/edit.action",
					type: "post",
					data: {
						id: id
					},
					dataType: "json",
					success: function (data) {
						if (data.error == 1) {
							var protocol = data.rows;
							$("#protocol-edit-content").val(protocol.content);
							$("#protocol-edit-type").val(protocol.type).trigger('chosen:updated');
							$("#protocol-edit-remark").val(protocol.remark);
						} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}			
					}
				});
			},
			callback: function () {
				var flag = false;
				 if ($("#protocolEditForm").valid("protocolEditForm")) {
                     loadingShow();
					$.ajax({
						url: ctx + "/protocol/toUpdate.action",
						type: "post",
						data: {
							"id": id,
							"content"	: $.trim($("#protocol-edit-content").val()),
		                	"type"		: $.trim($("#protocol-edit-type").val()),
		                	"remark"	: $.trim($("#protocol-edit-remark").val())
						},
						dataType: "json",
						success: function (data) {
                            loadingHide();
							if (data.error == 1) {
								successMsg("操作成功！", 1000, function () {
									 window.location.href = ctx + "/protocol/query.action?type="+type;
								});
							} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
							} else {
								faildMsg(data.message);
							}
						}
					});
					if (flag) {
    					return false;
    				}
    			} else {
    				return false;
				}
			}
		};
		var editDlg = new Dialog("#protocolEdit-dialog", options);
		
		  //下拉框
		$("#protocol-edit-type").chosen(config);
		$("#protocol-edit-type").on('change', function(e, selected) {
			if("" != selected){
				change_error_style($("#protocol-edit-type").parent(),"remove");
			}else{
				change_error_style($("#protocol-edit-type").parent(), "add");
			}
		});
		
		editDlg.show();
	}

})
//删除
function deleteProtocol(type) {
    var ck = $("input[name='protocolList_input']:checked");
    if (ck.length == 0) {
        alertDialog("请选择要删除的信息。");
        return
    } else {
        var idArr = new Array();
        var userIsvalid = true;
        $(ck).each(function () {
            idArr.push($(this).val());
            if ($(this).attr("isvalid") == "0") {
                userIsvalid = false;
            }
        });
        if (!userIsvalid) {
            alertDialog("所选信息包含无效信息，不允许删除");
            return false;
        }
        confirmDialog("确认删除选中的协议信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/protocol/toDelete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/protocol/query.action?type="+type;
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

//协议表单校验
function validProtocolForm(lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {
	    if ($(lableId).val() == null || $(lableId).val() == "") {
	        if ($(lableId).attr("id") == "protocol-add-content"||
	        	$(lableId).attr("id") == "protocol-edit-content") {
	            $(lableId).attr('tip', '协议内容为空，请重新输入。');
	            return "faild";
	        }else if ($(lableId).attr("id") == "protocol-add-remark"||
	        	$(lableId).attr("id") == "protocol-edit-remark") {
	            $(lableId).attr('tip', '协议备注为空，请重新输入。');
	            return "faild";
	        }else if ($(lableId).attr("id") == "protocol-add-type"||
	        	$(lableId).attr("id") == "protocol-edit-type") {
                $(lableId).parent().attr('tip', '协议类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
	        }
	        return "success";
	    }
	    if ($(lableId).val() != null && $(lableId).val() != "") {
	        var _this = $(lableId);
	        //新建
	        if ($(lableId).attr("id") == "protocol-add-content"||
	        		$(lableId).attr("id") == "protocol-edit-content") {
	        	var name = $("#protocol-add-content").val ()||$("#protocol-edit-content").val ();
	        	if (name.length>200) {
	                $(lableId).attr('tip', '协议内容长度不能超过200个字符');
	                return "faild";
	            } else {
	                return "success";
	            }
	        }
	        if ($(lableId).attr("id") == "protocol-add-remark"||
	        		$(lableId).attr("id") == "protocol-edit-remark") {
	        	var name = $("#protocol-add-remark").val()||$("#protocol-edit-remark").val();
	        	if (name.length>50) {
	                $(lableId).attr('tip', '协议内容备注不能超过50个字符');
	                return "faild";
	            } else {
	                return "success";
	            }
	        }
	        return "success";
	    }
	    return "success";
	}
}
