$(document).ready(function(){
	
	var sTime = {
	    elem: '#audit_time_start',
	    format: 'YYYY-MM-DD hh:mm:ss',
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
	    elem: '#audit_time_end',
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
	 //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });
	$(".status").chosen({
	        disable_search_threshold	: 8,
	        no_results_text				: "没有找到",
	        allow_single_deselect		: true,
	        width: "160px"
	    });
	 $(".reset-btn").on("click", function(){
	        $("#audit_time_start").val('');
	        $("#audit_time_end").val('');
	        $("#nameOrId").val('');
		 	$("#orderNo").val('');
	        $("#search-select").val(1);
	        $("#search-select").trigger("chosen:updated");
	    });
	
});
//订单详情
function detail(id,title) {
	var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
	openTabForParent(url, "-order-detail-" + id, "订单详情-"+title);
}
function toOrderTrack(id,goBackUrl) {
    window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id +"&goBackUrl="+goBackUrl;
}
//收到還款卡
function PaymentCard(id,realName){
    confirmDialog("您确定已经收到("+realName+")的还款卡?",true,function () {
    	$.ajax({
    		url : ctx + "/paymentCard/payMentCard.action",
    		type : "post",
    		data :{
    			 id      :     id,
    		},
    		dataType : "json",
    		success : function(data) {
    			if (data.error == 1) {
    				successMsg("收到还款卡操作成功！", 1000, function() {
    					window.location.href=ctx+"/paymentCard/queryList.action"
    				});
    			} else if (data.error == -100) {
    				faildMsg("会话超时，请重新登陆！");
    			} else {
    				faildMsg(data.message);
    			}
    		}
    	});
    });
}


