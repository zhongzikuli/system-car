$(function () {
	//select用插件chosen.jquery
	 var config = {
	            disable_search_threshold: 10,
	            no_results_text: '无数据',
	            width: "120px"
	 };
	$("#search-select").chosen(config);
	$("#search-statu").chosen(config);

    //删除
    $(".delete-btn").on("click",function(){
        deleteInsuranceProduct();
    })
    //新增
    $(".add-btn").on("click",function(){
        createInsuranceProduct();
    })
    
    //删除
    function deleteInsuranceProduct() {
        var ck = $("input[name='insuranceProduct_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
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
                alertDialog("所选信息包含无效账户，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的保险产品信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/insuranceManage/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            loadingHide();
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/insuranceManage/query.action";
                            });
                        } else if (data.error == -100) {
                            loadingHide();
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            loadingHide();
                            faildMsg(data.message);
                        }
                    }
                });
            })
        }
    }
    //新增
    function createInsuranceProduct(){
         window.location.href=ctx + "/insuranceManage/toAdd.action";
    }
});
//编辑
function edit(id){
	window.location.href=ctx + "/insuranceManage/toEdit.action?id="+id;
}


