$(function () {
    var sTime = {
        elem: '#sTime',
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
        elem: '#eTime',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
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
    
  //下拉框初始化
	var config ={
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	}
	$("#search-interview-status").chosen(config);
    
    //重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-interview-status").val("").trigger('chosen:updated')
		$("#sTime").val("");
		$("#eTime").val("");
		$("#search-keyword").val("");
	});
	
	//刷新按钮
	$(".refresh-btn").on("click", function(){
		$(".search-btn").trigger("click");
	});
	
	$(".recover-btn").on("click", function(){
		var id = $(this).attr("data-id");
		confirmDialog("确认恢复该视频面签？", function () {
			loadingShow();
			$.ajax({
				url: ctx + "/interview/recover.action",
				type: "post",
				data: {
					id : id
				},
				dataType: "json",
				success: function (data) {
					loadingHide();
					if (data.error == 1) {
						successMsg("操作成功！", 1000, refresh);
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		});
	});
	
	//刷新页面
	function refresh(){
		window.location.reload();
	}
});

