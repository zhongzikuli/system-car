$(document).ready(function () {
    
    var start = {
        elem: '#search-conume-start-date',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: false, //确定框
        istime: true,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
        }
    };
    var end = {
        elem: '#search-conume-end-date',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: "1970-01-01",
        max: laydate.now(),
        istoday: false, //显示今天
        issure: false,  //确认框
        istime: true,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            start.min = '1970-01-01 '; //结束日清空后，重置开始日的最小日期
            start.max = laydate.now(); //将开始日的最大值设定为今天
        }
    };
    laydate(start);
    laydate(end);
    $(".type").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });

});

//监听屏幕宽度
