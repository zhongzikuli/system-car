$(document).ready(function () {
    //隐藏父页面操作菜单
	$(document).on("click", function (e) {
    	e = window.event || e; // 兼容IE7
		obj = $(e.srcElement || e.target);
		if($(".btn-box").css("display") == 'block'){
			if (!obj.parents().is('.laydate_box, .laydate_box*, .btn-box,.btn-box*')) {
				$(".btn-box").hide();
				$(".btn-search").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
			}
		}else{
			if ($(obj).is(".btn-search") || $(obj).is(".fa-caret-up")) {
				$(".btn-box").show();
				$(".btn-search").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
			}
		}
		if($(".car-box .item").css("display") == 'block'){
			if (!obj.parents().is('.car-box, .car-box*') &&  !obj.is('#carBrandId')) {
				$(".car-box .item").hide();
			}
		}
		if($(".city-box .item").css("display") == 'block'){
			if (!obj.parents().is('.city-box, .city-box*') &&  !obj.is('#carLicenseProvince')) {
				$(".city-box .item").hide();
			}
		}
        parent.$(".dropdown").removeClass("open");
        parent.$(".roll-nav").removeClass("open");
    });
    //监听屏幕缩小放大  隐藏时间查询条件和分页样式为固定定位
    $(window).bind("load resize", function () {
        if ($(this).width() < 1200) {
            $("#date-time").hide();
        } else {
            $("#date-time").css('display', 'inline-block');
        }
        
        var _width = $('.slimScrollDiv', parent.document).outerWidth(true);
        var _height = $('.slimScrollDiv', parent.document).outerHeight(true);
        $('.dialog-overlay-left', parent.document).css({
            height: _height,
            width: _width,
            position: 'fixed',
            top: '90px'
        });
        
        var tableHeight = $(".table-responsive .table-height").height();  //表格高度
    	var modHeight = $(window).height()-110;  //当前窗口高度
    	
    	var tableWidth = $(".table-responsive .table-height").width(); 
    	var modWidth = $(".mod_basic").width(); 
    	if( tableWidth>0 && modWidth>0){
    		if(tableWidth > modWidth){
        		$(".paging-container").css('bottom',38+'px');
        	}else{
        		$(".paging-container").css('bottom',32+'px');
        	}
    	}
    	if( tableHeight>0 && modHeight>0){
    		if(tableHeight > modHeight){
        		$(".paging-container").addClass('active').css('bottom',0);
        		$(".mod_header, .mod_head").css('position','fixed');
        		//$(".pagination").addClass('active');
        		$(".mod_basic").css({
        			'margin-top':56+'px',
        		})
        		//$(".table-responsive .table-bank").css('margin-bottom',0);
        	}else{
        		//$(".pagination").removeClass('active');
        		$(".mod_header, .mod_head").css('position','relative');
        		$(".mod_basic").css({
        			'margin-top':10+'px',
        		})
        		$(".paging-container").removeClass('active');
        		//$(".table-responsive .table-bank").find('tbody tr:last-child td').css('border-bottom','1px solid #ddd');
        	};
    	}
    });

    //回车键提交表单
    $("#pagerForm").find("input").keypress(function (event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            $("#pageNum").val(0);
            $("#pagerForm").submit();
        }
    });

    //表格列表全选 取消全选	
    $('.checkAll').click(function () {
        if ($(this).prop("checked")) {
        	$(this).parents(".table").find('.checkOne').each(function () {
                $(this).prop("checked", true);
            });
        } else {
        	$(this).parents(".table").find('.checkOne').each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $('.checkOne').click(function () {
        var len = $('.checkOne').length;
        if ($(".checkOne:checked").length < len) {
            $('.checkAll').prop('checked', false);
        } else {
            $('.checkAll').prop('checked', true);
        }
    });
    //表格列表行选
    $("td.cel").click(function () {
        var _this = $(this).parent().find(".checkOne");
        if (_this.length > 0 && _this.is(':checked')) {
            _this.prop('checked', false);
        } else if (_this.length > 0) {
            _this.prop('checked', true);
        }
        var len = $('.checkOne').length;
        if ($('.checkOne:checked').length < len) {
            $('.checkAll').prop('checked', false);
        } else if (len != 0) {
            $('.checkAll').prop('checked', true);
        }
    });

    //表格列表双击事件
    $(".table-striped tr").dblclick(function () {
        $(this).find("td .detail").trigger("click");
    });
    
    $("img").each( function () {
    	$(this).bind("error",function(){
    		this.src= ctx + "/styles/images/errPic.png";
    	})
    });
});

function setTime(time){
	setTimeout(function(){
		parent.$(".cover").hide();
	},time)
}
//打包下载等待压缩过程
//orderId:订单Id；
//fileType:文件类型，可为空
//url:获取图片数量url
function downProgressTip(orderId, fileType, url){
	if(url==''||url==undefined|| orderId ==''||orderId==undefined){
		return
	}
	$.ajax({
	        url: ctx + '/'+url,
	        type: 'post',
	        data: {
	        	aId: orderId,
	        	fileType: fileType
	        },
	        async: true,
	        dataType: "json",
	        success: function (data) {
	        	parent.$(".cover").show();
	            if (data.error == 1) {
	            	if(data.rows<10){
	            		setTime(1000)
	            	}else if(10<=data.rows&&data.rows<30){
	            		setTime(4000)
	            	}else if(30<=data.rows&&data.rows<40){
	            		setTime(5000)
	            	}else if(40<=data.rows&&data.rows<60){
	            		setTime(8000)
	            	}else{
	            		setTime(20000)
	            	}
	            	window.location.href =ctx + "/cfFileCenter/download.action?aId="+orderId+"&fileType="+fileType ;
	                //window.location.href =ctx + "/cfFileCenter/download.action?aId="+orderId+"&fileType="+fileType ;
	            } else if (data.error == -100) {
	                faildMsg("会话超时，请重新登陆！");
	            } else {
	                faildMsg(data.message);
	            }
	        }
	   });
}