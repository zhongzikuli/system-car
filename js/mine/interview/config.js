//****************************//
//*							*//
//*	视频面签基础配置			*//
//*							*//
//***************************//
(function() {
    // 配置
    var envir = 'online';
    var configMap = {
        test: {
            appkey: $("#appKey").val(),
            url:'https://apptest.netease.im'
        },
        pre:{
    		appkey: $("#appKey").val(),
    		url:'http://preapp.netease.im:8184'
        },
        online: {
           appkey: $("#appKey").val(),
           url:'https://app.netease.im'
        }
    };
    window.CONFIG = configMap[envir];
    // 是否开启订阅服务
    window.CONFIG.openSubscription = false
}());