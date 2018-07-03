$(document).ready(function () {
	//日期选择
	var sTime = {
	    elem: '#search-vehicle-start-date',
	    format: 'YYYY-MM-DD', //日期格式
	    max: laydate.now(),
	    istime: false, //是否开启时间选择
	    isclear: true, //是否显示清空
	    istoday: false, //是否显示今天
	    issure: false, //是否显示确认
	    choose: function (datas) {
	        end.min = datas; //开始日选好后，重置结束日的最小日期
	        end.start = datas //将结束日的初始值设定为开始日
	    },
	    clear: function () {
	        end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
	        end.start = laydate.now(); //将结束日的初始值设定为开始日
	    }
	};

	var eTime = {
	    elem: '#search-vehicle-end-date',
	    format: 'YYYY-MM-DD', //日期格式
	    max: laydate.now(),
	    istime: false, //是否开启时间选择
	    isclear: true, //是否显示清空
	    istoday: false, //是否显示今天
	    issure: false, //是否显示确认
	    choose: function (datas) {
	        start.max = datas; //结束日选好后，重置开始日的最大日期
	    }
	};
	laydate(sTime);
	laydate(eTime);
});
//查看角色
function vehicleDetailTip(status) {
    if (1 == status) {
        faildMsg('查询中，暂无报告记录');
    } else if (status == -1) {
        faildMsg('鉴定报告获取失败');
    }
}

// 新增鉴定
function createVehicle() {
    var options = {
        width: 400,
        top: 200,
        height: 255,
        overlay: true,
        dispose: true,
        title: '新增鉴定',
        url: '',
        callback: function () {
            if ($("#createVehicleForm").valid("createVehicleForm")) {
                $.ajax({
                    url: ctx + "/vehicle/create.action",
                    type: "post",
                    data: {
                        "vin": $("#create-vehicle-vin").val()
                    },
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("新增成功！", 1000, function () {
                                window.location.href = ctx + "/vehicle/query.action";
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            } else {
                return false;
            }
        }
    };
    var creatDlg = new Dialog("#createVehicle-dialog", options);
    $(".i-checks").iCheck({checkboxClass: "icheckbox_square-green", radioClass: "iradio_square-green"});
    creatDlg.show();
}

function validateVin(self) {
    var vin = $("#create-vehicle-vin").val();
    var vinReg = new RegExp("^(?=.*[0-9].*)(?=.*[A-Z].*).{6,17}$");
    if (!notEmpty(vin)) {
        $(self).attr("tip", "请输入车辆识别码（VIN）");
        return "faild";
    } else {
        if (!vinReg.test(vin)) {
            $(self).attr("tip", "请输入有效的车辆VIN ");
            return "faild";
        } else {
            return "success";
        }
    }
}

// 输入项验证
function notEmpty(value) {
    if (null == value || value == "") {
        return false;
    } else {
        return true;
    }
}
