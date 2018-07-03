jQuery(function ($) {
    initDate(".caseDate");
    initDate(".courtDate");
    initDate(".applyExecuteDate");
    initsDate(".receiveMoneyTime");
    var acceptId = $("#acceptId").val();
	var acceptId = $("#acceptId").val();
	 //下拉框初始化
	$("#caseStatus").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
  
    var courtDates=$("#courtDates").val().split(',');
    for(var i=0;i<courtDates.length;i++){
    	var courtDate =courtDates[i];
    	var html=''
    	if(i==0||courtDates.length<=1){
    		$("#courtDate").val(courtDate);
    	}else{
    		html += createInputHtml(courtDate);
    	}
        $('.start').after(html);
        initDate(".courtDate");
        initInputRemoveEvent();
        
    }
    new ValidateWin("#lawEdit-Form", {
	        callback: function () {
                var param = {};
                $("#lawEdit-Form").find("input").each(function (i, n) {
                    var name = $(n).attr("name");
                    if (typeof(name) != "undefined") {
                        param[name] = $.trim($(n).val());
                    }
                    param.caseBak = $("#caseBak").val();
                    param.businessOrderAcceptId = acceptId;
                    param.id=$("#id").val();
                    param.caseStatus = $("#caseStatus").val();
                });
                var courtDate="";
                $("#lawEdit-Form").find("input[id='courtDate']").each(function (i, n) {
                	var name = $(n).attr("name");
                	if (typeof(name) != "undefined") {
                		if(courtDate==""){
                		courtDate = $.trim($(n).val());
                		}else{
                			courtDate = courtDate+','+$.trim($(n).val());
                		}
                	}
                	param.courtDate=courtDate;
                });
                loadingShow();
                $.ajax({
                    url: ctx + "/cfLaw/edit.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    dataType: "json",
                    async: false,
                    success: function (data) {
                    	loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href = ctx + "/cfLaw/queryLaw.action?businessOrderAcceptId="+acceptId;
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
        }
    });
});
//时间控件
function initDate(classTag){
	$(classTag).on("click", function () {
        laydate({
        	format: 'YYYY-MM-DD',
    		min: '1970-01-01 ', //设定最小日期为当前日期
    		//max: laydate.now(), //最大日期
    		istoday: false, //显示今天
    		issure: true, //确定框
    		istime: false,
    		start: laydate.now() + ' 00:00:00',
            choose: function (datas) {
            	
            },
            clear: function () {
                    	
            }
        })
    })
}
function initsDate(classTag){
	$(classTag).on("click", function () {
		laydate({
			format: 'YYYY-MM-DD hh:mm',
			min: '1970-01-01', //设定最小日期为当前日期
			max: laydate.now(), //最大日期
			istoday: false, //显示今天
			issure: true, //确定框
			istime: false,
			start: laydate.now(0, 'YYYY年MM月DD日 hh:mm'),
			choose	: function (datas) {
				start.max = datas;			//结束日选好后，重置开始日的最大日期
			},
			clear: function () {
				
			}
		})
	})
}


//添加开庭日期按钮
$("#add-input").on("click", function () {
	    var courtDate='';
        var html = createInputHtml(courtDate);
        $(this).parents('.start').after(html);
        initDate(".courtDate")
        initInputRemoveEvent();
        
});

function initInputRemoveEvent() {
    $(".btn-danger" ).on("click", function () {
        $(this).parents(".col-sm-3").remove();
    });
}

function createInputHtml(courtDate) {
    var html = '<div class="col-sm-3"><div class="form-group"><label class="col-xs-3 control-label">开庭日期:</label>'+
    		'<div class="col-xs-7">'+'<input type="text" class="form-control courtDate" name="courtDate" id="courtDate" value='+ courtDate +'></div>'+
    		'<div class="col-xs-2"><a href="javascript:void(0)" class="btn btn-danger">删除</a></div>';
    return html;
}
function validLaw(lableId){
	if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "caseBak") {
                $(lableId).attr('tip', '诉讼备注不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            } 
            return "success";
        }
        return "success";
    }
}
