$(document).ready(function(){

    var sTime = {
        elem: '#operatorTimeStart',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var eTime = {
        elem: '#operatorTimeEnd',
        format: 'YYYY-MM-DD ',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        choose: function (datas) {
            sTime.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            sTime.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(sTime);
    laydate(eTime);


    $(".reset-btn").on("click", function(){
        $("#orderNo").val("");
        $("#search-select").val("").trigger('chosen:updated');
        $("#operatorTimeStart").val("");
        $("#operatorTimeEnd").val("");
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

    $(".jumpDetail").on("click", function(){
        var id=$(this).attr("data-id");
        window.location.href=ctx+"/cfBusinessOrderAccept/detail.action?id="+id;
    });


})
