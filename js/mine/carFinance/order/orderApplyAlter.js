$(document).ready(function(){
    var audit_time_start = {
        elem: '#audit_time_start',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            audit_time_end.min = datas; //开始日选好后，重置结束日的最小日期
            audit_time_end.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            audit_time_end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            audit_time_end.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var audit_time_end = {
        elem: '#audit_time_end',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            audit_time_start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            audit_time_start.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            audit_time_start.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    laydate(audit_time_start);
    laydate(audit_time_end);

    //订单详情查看
    $(".detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });
});

//订单申请修改
function orderApplyAlter(id,buyerId){
    window.location.href=ctx+"/cfOrderApplyModify/orderApplyAlter.action?id="+id+'&buyerId='+buyerId;
}

//订单轨迹
function toOrderTrack(id) {
    window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id ;
}

//订单详情
function detail(id) {
    window.location.href = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
}

var config = {
    disable_search_threshold:10,
    no_results_text: '无数据',
    width:"150px"
};
$("#search-select").chosen(config);

//重置按钮
$(".reset-btn").on("click", function(){
    $("#nameOrId").val("");
    $("#orderNo").val("");
    $("#audit_time_start").val("");
    $("#audit_time_end").val("");
    $("#search-select").val("").trigger('chosen:updated');
});

//刷新按钮
$(".refresh-btn").on("click", function(){
    $(".search-btn").trigger("click");
});

