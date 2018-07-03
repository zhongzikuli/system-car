jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    $(".pre-img").on("click",function(){
        $.openPhotoGallery(this)
    })
    var s = $("#size").val();
    for (var i = 0; i < s; i++) {
        var id1 = "sTime" + (i + 1);
        var id2 = "eTime" + (i + 1);
        var dateNum ='data'+i;
        window[dateNum] = new initDate(id1, id2)
    }
    function initDate(id1, id2) {
        var sTime = {
            elem: "#" + id1,
            format: 'YYYY-MM-DD', //日期格式
            max: laydate.now(),
            istime: false, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: false, //是否显示今天
            issure: false, //是否显示确认
            choose: function (datas) {
                eTime.min = datas; //开始日选好后，重置结束日的最小日期
                eTime.start = datas //将结束日的初始值设定为开始日
            },
            clear: function () {
                eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
                eTime.start = laydate.now(); //将结束日的初始值设定为开始日
            }
        };
        var eTime = {
            elem: "#" + id2,
            format: 'YYYY-MM-DD', //日期格式
            istime: false, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: false, //是否显示今天
            issure: false, //是否显示确认
            choose: function (datas) {
                sTime.max = datas; //结束日选好后，重置开始日的最大日期
            },
            clear: function () {
                sTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
                sTime.start = laydate.now(); //将结束日的初始值设定为开始日
            }
        };
        laydate(sTime);
        laydate(eTime);
    }
    //初始化下拉框配置
    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "100%"
    };
    $(".creditTypeCode").chosen(config);
    $(".creditStatusCode").chosen(config);
    $(".closeTypeCode").chosen(config);
    //征信退回
    $(".refuse-credit").on("click", function () {
    	refuseCredit();
    });
    //征信购车人资料下载
//    $(".download-file").on("click", function () {
//        downloadFile();
//    });
    var buyerTime = new initDate("buyer-sTime", "buyer-eTime");
    if($("#data").val()!=1){
    	 var sharedTime = new initDate("shared-sTime", "shared-eTime");
    }
    $(".save").add(".submit").on("click", function () {
        var type = $(this).attr("data-type");
        var isSubmit = validater.mySubmit(validater);
        if (!isSubmit) {
            return;
        }

            var param = {};
             param.status=type;
            var buyers = new Array();
            $(".buyerForm").each(function (index) {
                var buyer = {};
                buyer.businessOrderAcceptId = $("#businessOrderAcceptId").val();
                buyer.id = $(this).find("input[name='buyerId']").val();
                buyer.realName = $(this).find("input[name='realName']").val();
                buyer.userType = $(this).find("input[name='userType']").val();
                buyer.id = $(this).find("input[name='buyerId']").val();
                buyer.creditTypeCode = $(this).find("select[name='creditTypeCode']").val();
                buyer.creditStatusCode = $(this).find("select[name='creditStatusCode']").val();
                buyer.closeTypeCode = $(this).find("select[name='closeTypeCode']").val();
                buyer.addOverdue = $(this).find("input[name='addOverdue']").val();
                buyer.highestOverdue = $(this).find("input[name='highestOverdue']").val();
                buyer.currentOverdue = $(this).find("input[name='currentOverdue']").val();
                buyer.overdueBeginDate = $(this).find("input[name='sTime']").val();
                buyer.overdueEndDate = $(this).find("input[name='eTime']").val();
                buyer.creditRecord = $(this).find("textarea[name='creditRecord']").val();
                buyers.push(buyer);
            });
            param.list=buyers;
            loadingShow();
            $.ajax({
                url: ctx + "/bankCreditReport/createBankCreditReport.action",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(param),
                dataType: "json",
                success: function (data) {
                	loadingHide();
                	if (data.error == 1) {
                    	if(type == 1){
                            successMsg("操作成功！", 1000, function () {

                            });
                        }else{
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/bankCreditReport.action";
                            });
                        }

                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        });
    var validater= new ValidateWin("#buyer-form", {
        callback: function (content, event) {


        }
        });

});
//银行征信查询
function bankCreditReport(id) {
    window.location.href = ctx + "/bankCreditReport/bankCreditReport.action?id=" + id;
}
function downLoad1(id) {
    var businessOrderAcceptId = $("#businessOrderAcceptId").val()
    window.location.href = ctx + "/bankCreditReport/download.action?buyerId=" + id + "&businessOrderAcceptId=" + businessOrderAcceptId;
}
function downLoad2(id) {
    var businessOrderAcceptId = $("#businessOrderAcceptId").val()
    window.location.href = ctx + "/bankCreditReport/downLoadpPic.action?buyerId=" + id + "&businessOrderAcceptId=" + businessOrderAcceptId;
}

function onfindPic() {
    var img = event.srcElement;
    img.src = ctx + "/styles/images/errPic.png"
    img.onerror = null;
    img.parentNode.setAttribute("href", ctx + "/styles/images/errPic.png");
}
//征信退回
function refuseCredit() {
    var ids = new Array();
    var id =$("#businessOrderAcceptId").val();
    ids.push(id);
    confirmDialog("您确定要退回征信？", function () {
	var options = {
	   width: 450,
	   top: 200,
	   height: 260,
	   overlay: true,
	   dispose: true,
	   move	: true,
	   title: '新增',
	   callback: function () {
	   var flag = false;
	   if ($("#protocolCreateForm").valid("protocolCreateForm")) {
		   var  remark =$("#credit-content").val()
		   var param = {};
        param.ids = ids.toString();
        param.remark=remark;
        loadingShow();
        $.ajax({
            type: "post",
            url: ctx + "/cfBusinessOrderAccept/refuse.action",
            data: param,
            dataType: "json",
            success: function (result) {
            	loadingHide();
            	successMsg(result.message, function () {
                    window.location.href = ctx + "/bankCreditReport.action";
                });
            }, error: function (result) {
                faildMsg("请求异常：" + result.status + "");
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
	addDlg.show();
});
}
//协议表单校验
function validProtocolForm(lableId) {
	if (undefined != lableId && null != lableId && lableId != "") {
	    if ($(lableId).val() == null || $(lableId).val() == "") {
	        if ($(lableId).attr("id") == "credit-content") {
	            $(lableId).attr('tip', '退回备注为空，请重新输入。');
	            return "faild";
	        }
	        return "success";
	    }
	    if ($(lableId).val() != null && $(lableId).val() != "") {
	        var _this = $(lableId);
	        //新建
	        if ($(lableId).attr("id") == "credit-content") {
	        	var name = $("#credit-content").val ();
	        	if (name.length>200) {
	                $(lableId).attr('tip', '退回备注长度不能超过200个字符');
	                return "faild";
	            } else {
	                return "success";
	            }
	        }
	    }
	    return "success";
	}
}

 


