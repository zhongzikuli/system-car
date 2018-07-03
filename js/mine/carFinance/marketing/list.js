$(function(){
    //新增营销利率跳转
    $(".add-btn").on("click",function(){
    	addMarket();
    });
    //修改营销利率
    $(".market-btn").on("click",function(){
    	var id = $(this).attr("data-id");
    	editMarket(id);
    });
    //删除营销利率
    $(".delete-btn").on("click",function(){
        deleteMarket();
    });
    
  //删除营销利率
    function deleteMarket() {
        var ck = $("input[name='market']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的信息。");
            return
        } else {
            var idArr = new Array();
            var noticeIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    noticeIsvalid = false;
                }
            });
            if (!noticeIsvalid) {
                alertDialog("所选信息包含无效信息，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的营销利率信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/marketCost/toDelete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/marketCost/query.action";
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

//新增营销利率
function addMarket() {
	var options = {
            width: 420,
            top: 200,
            height: 250,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onAfterShow:function(){
            	var config = {
                        disable_search_threshold: 10,
                        no_results_text: '无数据',
                        width: '100%'
                    }
                    $('.chosen-select').chosen(config);

                    $('.chosen-select').trigger("liszt:updated");
            	 $("#market").chosen({
                     disable_search_threshold:10,
                     no_results_text	: '无数据',
                     width			: '100%'
                 }).change(function(){
                    var modelVal = $(this).find("option:selected").val();
                    if(modelVal=='2'){
                    	$("#banks").show();
                    }else{
                    	$("#banks").hide();
                    }
                    if(modelVal=='1'){
                    	$("#prooducts").show();
                    }else{
                    	$("#prooducts").hide();
                    }
                    if(modelVal=='3'){
                    	$("#moneys").show();
                    }else{
                    	$("#moneys").hide();
                    }
                 })
            },
            callback: function () {
                var param = {};
    			param.departmentId = $("#department").val();
    			param.type = $("#market").val();
    			param.bankId =$("#bank").val();
    			param.productId = $("#prooduct").val();
    			param.money = $("#money").val();
    			param.interestRate = $("#interest").val();
                /*if ($("#appForm").valid("appForm")) {*/
                    $.ajax({
                        url: ctx + "/marketCost/create.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/marketCost/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
               /* } else {
                    return false;
                }*/
            }
	
	}
	
	var editDlg = new Dialog("#marketCreate-dialog", options);
	
    editDlg.show();
    
}
//协议修改
function editMarket(id) {
	
	var options = {
            width: 420,
            top: 200,
            height: 250,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onAfterShow:function(){
            	$.ajax({
    				url: ctx + "/marketCost/edit.action",
    				type: "post",
    				data: {
    					id: id
    				},
    				dataType: "json",
    				success: function (data) {
    					if (data.error == 1) {
    						var market = data.rows;
    						$("#market").val(market.type);
    						$("#bank").val(market.bank).trigger('chosen:updated');
    						$("#prooduct").val(market.product).trigger('chosen:updated');
    						$("#money").val(market.money)
    						$("#interest").val(market.interestRate);
    					} else if (data.error == -100) {
    							faildMsg("会话超时，请重新登陆！");
    					} else {
    						faildMsg(data.message);
    					}			
    				}
    			});
            	 $("#market").chosen({
                     disable_search_threshold:10,
                     no_results_text	: '无数据',
                     width			: '100%'
                 }).change(function(){
                    var modelVal = $(this).find("option:selected").val();
                    if(modelVal=='2'){
                    	$("#banks").show();
                    }else{
                    	$("#banks").hide();
                    }
                    if(modelVal=='1'){
                    	$("#prooducts").show();
                    }else{
                    	$("#prooducts").hide();
                    }
                    if(modelVal=='3'){
                    	$("#moneys").show();
                    }else{
                    	$("#moneys").hide();
                    }
                 })
            },
            callback: function () {
                var param = {};
    			param.type = $("#market").val();
    			param.bankId =$("#bank").val();
    			param.productId = $("#prooduct").val();
    			param.money = $("#money").val();
    			param.interestRate = $("#interest").val();
                /*if ($("#appForm").valid("appForm")) {*/
                    $.ajax({
                        url: ctx + "/marketCost/toUpdate.action",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            if (data.error == 1) {
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/marketCost/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
               /* } else {
                    return false;
                }*/
            }
	
	}
	
	var editDlg = new Dialog("#marketUpdate-dialog", options);
	
    editDlg.show();
    
	
}

