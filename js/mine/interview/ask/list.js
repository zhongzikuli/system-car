$(document).ready(function(){


})
var config = {
	disable_search_threshold: 10,
	no_results_text: '无数据',
	width:100+'%'
};
$("#search-select").chosen({
	disable_search_threshold	: 8,
	no_results_text				: "没有找到",
	allow_single_deselect		: true,
	width: "160px"
});
$(".up-btn").on("click",function(){
	var id =$(this).attr("data-id");
	var status =$(this).attr("data-status");
	updateStatus(id,status);
})
$(".down-btn").on("click",function(){
	var id =$(this).attr("data-id");
	var status =$(this).attr("data-status");
	updateStatus(id,status);
})

//更新上下架
function updateStatus(id,isvalid) {
	loadingShow();
	$.ajax({
		url: ctx + "/ask/updateStatus.action",
		type: "post",
		data: {
			"id": id,
			"isvalid": isvalid
		},
		dataType: "json",
		success: function (data) {
			loadingHide();
			if (data.error == 1) {
				successMsg("操作成功！", 1000, function () {
					window.location.href = ctx + "/ask/query.action";
				});
			} else if (data.error == -100) {
				faildMsg("会话超时，请重新登陆！");
			} else {
				faildMsg(data.message);
			}
		}
	});
}

function detailAsk(id) {
	var options = {
			width: 400,
			top: 200,
			height: 360,
			overlay: true,
			dispose: true,
			move	: true,
			title: '详情',
			url: "",
			onBeforeShow: function () {
				$.ajax({
					url: ctx + "/ask/edit.action",
					type: "post",
					data: {
						id: id
					},
					dataType: "json",
					success: function (data) {
						if (data.error == 1) {
							var ask = data.rows;
							$("#ask-view-content").val(ask.content);
							$("#ask-view-sortno").val(ask.sortno);
							$("#ask-view-remark").val(ask.remark);
							$("#ask-view-type").val(ask.isRequired).trigger('chosen:updated');
						} else if (data.error == -100) {
								faildMsg("会话超时，请重新登陆！");
						} else {
							faildMsg(data.message);
						}			
					}
				});
			}
			}
	var detailDlg = new Dialog("#askView-dialog", options);

	detailDlg.show();
	
}

//问题修改
function editAsk(id,currentPage,numperPage) {

	var options = {
		width: 800,
		top: 200,
		height: 450,
		overlay: true,
		dispose: true,
		move	: true,
		title: '修改',
		url: "",
		onBeforeShow: function () {
			$.ajax({
				url: ctx + "/ask/edit.action",
				type: "post",
				data: {
					id: id
				},
				dataType: "json",
				success: function (data) {
					if (data.error == 1) {
						var ask = data.rows;
						$("#ask-edit-content").val(ask.content);
						$("#ask-edit-sortno").val(ask.sortno);
						$("#ask-edit-remark").val(ask.remark);
						$("#ask-edit-type").val(ask.isRequired).trigger('chosen:updated')
					} else if (data.error == -100) {
							faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}			
				}
			});
		},
		onAfterShow:function(){
			$(".type-chosen-select").chosen(config).on('change', function (e, selected) {
				if ("" != selected) {
					change_error_style($(".type-chosen-select").parent(), "remove");
				} else {
					change_error_style($(".type-chosen-select").parent(), "add");
				}
			});
		},
		callback: function () {
			var flag = false;
			if ($("#askEditForm").valid("askEditForm")) {
				$.ajax({
					url: ctx + "/ask/toUpdate.action",
					type: "post",
					data: {
						"id": id,
						"content": $.trim($("#ask-edit-content").val()),
						"sortno": $.trim($("#ask-edit-sortno").val()),
						"remark": $.trim($("#ask-edit-remark").val()),
						"isRequired": $("#ask-edit-type").val()
					},
					dataType: "json",
					success: function (data) {
						if (data.error == 1) {
							successMsg("操作成功！", 1000, function () {
								window.location.href = ctx + "/ask/query.action";
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

			}else {
				return false;
			}
		}
	};
	var editDlg = new Dialog("#askEdit-dialog", options);
	$(".type-chosen-select").chosen(config).on('change', function (e, selected) {
		if ("" != selected) {
			change_error_style($(".type-chosen-select").parent(), "remove");
		} else {
			change_error_style($(".type-chosen-select").parent(), "add");
		}
	});
	editDlg.show();
}
//新增问题
function askCreate() {
	var options = {
            width: 800,
            top: 200,
            height: 450,
            overlay: true,
            dispose: true,
            move	: true,
            title: '新增',
            url: "",
            callback: function () {
            	var flag = false;
                if ($("#askCreateForm").valid("askCreateForm")) {
                    $.ajax({
                        url: ctx + "/ask/create.action",
                        type: "post",
                        data: {
                        	content		:$("#ask-content").val(),
                        	sortno	: $("#ask-sortno").val(),
                        	remark	: $("#ask-remark").val(),
							isRequired	: $("#ask-type").val()
                        },
                        dataType: "json",
                        async	: false,
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/ask/query.action";
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
	var editDlg = new Dialog("#askCreate-dialog", options);
	$(".type-chosen-select").chosen(config).on('change', function (e, selected) {
		if ("" != selected) {
			change_error_style($(".type-chosen-select").parent(), "remove");
		} else {
			change_error_style($(".type-chosen-select").parent(), "add");
		}
	});
	editDlg.show();
}
//问题表单校验
function validAskForm(lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {

	    if ($(lableId).val() == null || $(lableId).val() == "") {
	        if ($(lableId).attr("id") == "ask-content") {
	            $(lableId).attr('tip', '问题信息为空，请重新输入。');
	            return "faild";
	        } else if ($(lableId).attr("id") == "ask-sortno") {
	            $(lableId).attr('tip', '问题排序为空，请重新输入。');
	            return "faild";
	        }else if ($(lableId).attr("id") == "ask-remark") {
	            $(lableId).attr('tip', '问题备注为空，请重新输入。');
	            return "faild";
	        } else if ($(lableId).attr("id") == "ask-type") {
				$(lableId).parent().attr('tip', '问题类型不能为空，请重新输入。').addClass("input_validation-failed");
				return "faild";
			}
	        return "success";
	    }
	    if ($(lableId).val() != null && $(lableId).val() != "") {
	        var _this = $(lableId);
	        //新建
	        if ($(lableId).attr("id") == "ask-sortno") {
	            if (!(/(^[1-9]([0-9]+)?(\[0-9])?$)|(^[0-9]\[0-9]([0-9])?$)/).exec(_this.val())) {
	                $(lableId).attr('tip', '排序只能为正整数');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
	        if ($(lableId).attr("id") == "ask-content") {
	        	var name = $("#ask-content").val ();
	        	if (name.length>1000) {
	                $(lableId).attr('tip', '问题内容长度不能超过200个字符');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
	        if ($(lableId).attr("id") == "ask-remark") {
	        	var name = $("#ask-remark").val();
	        	if (name.length>50) {
	                $(lableId).attr('tip', '问题内容备注不能超过50个字符');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
	        
	        return "success";
	    }
	    return "success";
	}
}

//修改问题表单校验
function validAskEditForm(lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {
	    if ($(lableId).val() == null || $(lableId).val() == "") {
	        if ($(lableId).attr("id") == "ask-edit-content") {
	            $(lableId).attr('tip', '问题信息为空，请重新输入。');
	            return "faild";
	        } else if ($(lableId).attr("id") == "ask-edit-sortno") {
	            $(lableId).attr('tip', '问题排序为空，请重新输入。');
	            return "faild";
	        }else if ($(lableId).attr("id") == "ask-edit-type") {
				$(lableId).parent().attr('tip', '问题类型不能为空，请重新输入。').addClass("input_validation-failed");
				return "faild";
			}else if ($(lableId).attr("id") == "ask-edit-remark") {
	            $(lableId).attr('tip', '问题备注为空，请重新输入。');
	            return "faild";
	        }
	        return "success";
	    }
	    if ($(lableId).val() != null && $(lableId).val() != "") {
	        var _this = $(lableId);
	        //新建
	        if ($(lableId).attr("id") == "ask-edit-sortno") {
	            if (!(/(^[1-9]([0-9]+)?(\[0-9])?$)|(^[0-9]\[0-9]([0-9])?$)/).exec(_this.val())) {
	                $(lableId).attr('tip', '排序只能为正整数');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
	        if ($(lableId).attr("id") == "ask-edit-content") {
	        	var name = $("#ask-edit-content").val();
	        	if (name.length>1000) {
	                $(lableId).attr('tip', '问题内容长度不能超过200个字符');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
	        if ($(lableId).attr("id") == "ask-edit-remark") {
	        	var name = $("#ask-edit-remark").val();
	        	if (name.length>50) {
	                $(lableId).attr('tip', '问题内容备注不能超过50个字符');
	                return "faild";
	            }  else {
	                return "success";
	            }
	        }
	       
	        
	        return "success";
	    }
	    return "success";
	}
}

