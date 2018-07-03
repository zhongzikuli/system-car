//刷新页面
function refresh() {
    window.location.href = ctx + "/dealerManage/query.action";
}

//重置按钮
$(".reset-btn").on("click", function(){
    $("#dealerName").val("");
    $("#search-select").val("").trigger('chosen:updated');
});

$(".start").on("click",function(){
    var id=$(this).attr("data-id");
    start(id);
});

$(".stop").on("click",function(){
    var id=$(this).attr("data-id");
    stop(id);
});

function start(id){
    $.ajax({
        url: ctx + "/dealerManage/updateForbidden.action",
        type: "post",
        data:{
            id:id,
            forbiddenId:0
            },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/dealerManage/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function stop(id){
    $.ajax({
        url: ctx + "/dealerManage/updateForbidden.action",
        type: "post",
        data:{
            id:id,
            forbiddenId:1
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                loadingHide();
                successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/dealerManage/query.action?";
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//删除
function deleteDealerManage() {
    var ck = $("input[name='carDealer_input']:checked");
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
        confirmDialog("确认删除选中的经销商信息吗？", function () {
            var params = {}
            params.idArr = idArr.toString();
            loadingShow();
            $.ajax({
                url: ctx + "/dealerManage/delete.action",
                type: "post",
                data: params,
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        loadingHide();
                        successMsg("操作成功！", 1000, function () {
                            window.location.href = ctx + "/dealerManage/query.action?";
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

//导出excel
function exportExcel() {
    var param = "";
    $('#hiddenForm,#pageFormHidden').find("input").each(function (v,n) {
        var name = $(n).attr("name");
        if (name == "pageNum"){
            param += "&"+name+"="+$.trim($(n).val()-1);
        }else {
            param += "&"+name+"="+$.trim($(n).val());
        }
    });
    var frame = $('<iframe>');//定义一个iframe
    frame.attr("src", ctx + "/dealerManage/exportList.action?" + param);
    frame.attr("style", "display:none");
    frame.append("</iframe>")
    $("body").append(frame);
}

//导入excel
function importExcel() {
    var options = {
        width: 400,
        top: 200,
        height: 400,
        overlay: true,
        dispose: true,
        move: true,
        title: '导入经销商',
        onAfterShow: function () {
            new HYUpload({
                auto: true,
                containerId: '#addUploader',
                uploadImg: false,						//图片上传标记
                buttonText: '选择文件',
                server: ctx + '/dealerManage/importExcel.action'
            });
        },
        callback: function () {
            window.location.reload();
        }
    };

    new Dialog("#excel-dialog", options).show();
}

//新增经销商信息
function createDealerManage() {
    window.location.href = ctx + "/dealerManage/preAdd.action";
}

function editCarDealer(id, dealerName, departmentId) {
    window.location.href = ctx + "/dealerManage/preUpdate.action?id=" + id + "&dealerName=" + dealerName + "&departmentId=" + departmentId;
}

function detailCarDealer(id) {
    window.location.href = ctx + "/dealerManage/preDetail.action?id=" + id;
}

//select用插件chosen.jquery
var config = {
    disable_search_threshold: 10,
    no_results_text: '无数据',
    allow_single_deselect: true,
    width: '150px'
};
$("#search-select").chosen(config);
