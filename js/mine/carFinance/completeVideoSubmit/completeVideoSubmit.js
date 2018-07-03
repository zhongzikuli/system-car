$(document).ready(function(){

    //订单详情查看
    $(".detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#nameOrId").val("");
        $("#search-select").val("").trigger('chosen:updated');
    });

    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"150px"
    };
    $("#search-select").chosen(config);

   //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

    $(".completeSure").on("click",function(){
        var id=$(this).attr("data-id");
        var realName=$(this).attr("data-realName");
        var cardNo=$(this).attr("data-cardNo");
        completeSure(id,realName,cardNo);
    });

    function completeSure(id,realName,cardNo){
    	var option ={height:165,width:315}
        confirmDialog("您确认"+realName+'('+cardNo+')'+"视频齐全吗?",option, function () {
            loadingShow();
            $.ajax({
                url: ctx + "/cfVideoSubmit/confirmVideoComplete.action",
                type: "post",
                data: {id:id},
                dataType: "json",
                success: function (data) {
                    loadingHide();
                    if (data.error == 1) {
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/cfVideoSubmit/query.action?";
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
})

//订单轨迹
function toOrderTrack(id) {
    window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id ;
}

