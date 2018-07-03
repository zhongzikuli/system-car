$(function(){
    //新增公告跳转
    $(".add-btn").on("click",function(){
        window.location.href = ctx + "/notice/noticeAdd.action";
    });
    //删除公告
    $(".delete-btn").on("click",function(){
        deleteNotice();
    });
  //删除公告
    function deleteNotice() {
        var ck = $("input[name='notice_input']:checked");
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
            confirmDialog("确认删除选中的公告信息吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                $.ajax({
                    url: ctx + "/notice/toDelete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/notice/query.action";
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

//修改公告
function editNotice(id) {
    window.location.href = ctx + "/notice/noticeUpdate.action?id=" + id;
}

