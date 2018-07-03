$(function () {
    var sTime = {
        elem: '#sTime',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var eTime = {
        elem: '#eTime',
        format: 'YYYY-MM-DD',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false,				//显示今天
        issure: true,					//确认框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose: function (datas) {
            sTime.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sTime.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(sTime);
    laydate(eTime);
    var creditSTime = {
        elem: '#creditSTime',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var creditETime = {
        elem: '#creditETime',
        format: 'YYYY-MM-DD',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false,				//显示今天
        issure: true,					//确认框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose: function (datas) {
            sTime.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sTime.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(creditSTime);
    laydate(creditETime);

    //下拉框初始化
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "160px"
    });
    //新增征信
    $(".add-credit").on("click", function () {
        addCredit();
    });
    //征信退回
    $(".refuse-credit").on("click", function () {
        refuseCredit();
    });
    //征信购车人资料下载
    $(".download-file").on("click", function () {
        downloadFile();
    });
    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });
    //重置按钮
    $(".reset-btn").on("click", function () {
        $("#sTime").val('');
        $("#eTime").val('');
        $("#creditSTime").val('');
        $("#creditETime").val('');
        $("#orderNo").val('');
        $("#search-keyword").val('');
        $("#search-select").val(1);
        $("#search-select").trigger("chosen:updated");
    });

});

function downloadFile() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要下载征信购车人。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要下载征信购车人？", function () {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/cfBusinessOrderAccept/download.action?ids=" + ids.toString());
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);

    });
}


function downLoad(id) {
    confirmDialog("您确定要下载购车人的征信信息？", function () {
        var frame = $('<iframe>');//定义一个iframe
        frame.attr("src", ctx + "/cfBusinessOrderAccept/download.action?ids=" + id.toString());
        frame.attr("style", "display:none");
        frame.append("</iframe>")
        $("body").append(frame);
    });
}

//征信退回
function refuseCredit() {
    var $has_checked = $(".checkOne:checked");
    if ($has_checked.length == undefined || $has_checked.length == 0) {
        alertDialog("请选择要退回征信。");
        return;
    }
    var ids = new Array();
    $has_checked.each(function () {
        ids.push($(this).val());
    });
    confirmDialog("您确定要退回征信？", function () {
        var param = {};
        param.ids = ids.toString();
        $.ajax({
            type: "post",
            url: ctx + "/cfBusinessOrderAccept/refuse.action",
            data: param,
            dataType: "json",
            success: function (result) {
                successMsg(result.message, function () {
                    window.location.href = ctx + "/cfBusinessOrderAccept/credit/input.action";
                });
            }, error: function (result) {
                faildMsg("请求异常：" + result.status + "");
            }
        });
    });
}


//新增征信
function addCredit() {
    window.location.href = ctx + "/cfBusinessOrderAccept/toAdd.action";
}
//订单详情
function detail(id,title) {
    // window.location.href = ctx +
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-"+id, "订单详情-"+title);
}
//初审单录入
function orderApply(id, title) {
    // window.location.href = ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + id + "&goBackUrl=" + goBackUrl;
    var url = ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + id;
    openTabForParent(url, "-order-apply-"+id, "初审单录入-"+title);
}

//编辑
function toEdit(id, goBackUrl) {
    window.location.href = ctx + "/cfBusinessOrderAccept/preEdit.action?id=" + id + "&goBackUrl=" + goBackUrl;
}

//补录配偶、补录担保人
function toBuyer(acceptId, userType) {
    window.location.href = ctx + "/cfBuyerInfo/list.action?acceptId=" + acceptId + "&userType=" + userType;
}

//订单轨迹
function toOrderTrack(id, title) {
    // window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id + "&goBackUrl=" + goBackUrl;
    var url = ctx + "/cfOrderTrack.action?acceptId=" + id;
    openTabForParent(url, "-order-track-"+id, "订单轨迹-"+title);
}

