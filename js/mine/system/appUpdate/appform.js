//上传APP
function appUpload() {
    var options = {
        width: 400,
        top: 200,
        height: 560,
        overlay: true,
        dispose: true,
        move: true,
        title: '上传',
        //url: ctx + "/appUpdate/appForm.action",
        onAfterShow: function (){
        	new HYUpload({
        		auto		: true,
        		containerId	: '#uploader',
        		uploadImg	: true,						//图片上传标记
        		dropTip		:'或将图片拖到这里',
        		buttonText	: '选择文件',
        		server		: ctx + '/fdfs/uploadFile.action'
        	});
        },
        callback: function () {
            var flag = false;
            if ($("#appForm").valid("appForm")) {
                loadingShow();
                $.ajax({
                    url: ctx + "/appUpdate/create.action",
                    type: "post",
                    data: {
                        name: $("#app-name").val(),
                        type: $("#app-type").val(),
                        version: $("#app-version").val(),
                        fileName: $("#fileName").val(),
                        fileGroup: $("#group").val(),
                        filePath: $("#path").val(),
                        remark: $("#app-remark").val()
                    },
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/appUpdate/query.action";
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
    var editDlg = new Dialog("#appCreate-dialog", options);
    editDlg.show();
}