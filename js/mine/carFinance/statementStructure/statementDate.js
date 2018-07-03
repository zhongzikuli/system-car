$(function(){
    laydate( {
        elem: '#search-date',
        format: 'YYYY-MM-DD', //日期格式
        istime: false, //是否开启时间选择
        max:laydate.now(),
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            if  (datas =='') {
                change_error_style($("#initRegisterDate"), "add");
            } else {
                change_error_style($("#initRegisterDate"), "remove");
            }
        },
        clear: function () {

        }
    });

});