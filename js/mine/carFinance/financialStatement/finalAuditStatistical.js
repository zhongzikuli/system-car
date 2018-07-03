$(function () {
    initLaydate("sTime","eTime");
    function initLaydate(start,end) {
        var sTime = {
            elem: '#' + start,
            format: 'YYYY-MM-DD',
            min: '1970-01-01 ', //设定最小日期为当前日期
            //max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now(),
            choose: function (datas) {
                end.min = datas; //开始日选好后，重置结束日的最小日期
            },
            clear: function () {
                end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            }
        };

        var eTime = {
            elem: '#' + end,
            format: 'YYYY-MM-DD',
            min: '1970-01-01', //设定最小日期为当前日期
            //max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            choose	: function (datas) {
                start.max = datas;			//结束日选好后，重置开始日的最大日期
            },
            clear: function () {
                start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
                start.max = laydate.now();	//将开始日的最大值设定为今天
            }
        };
        laydate(sTime);
        laydate(eTime);
    }

    //刷新按钮
    $(".refresh-btn").on("click", function () {
        $(".search-btn").trigger("click");
    });
});

function searchSubmit() {
    $("#pageNum").val(0);
    $('#pagerForm').submit();
}

