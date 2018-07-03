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
    
    //初始化表格头数据
    loadThead(1);

    //初始化一页数据
    getDataList(1, 0, null);

    $("#pagerForm").find("input").keypress(function (event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            $("#pageNum").val(0);
            searchSumbit();
        }
    });

    $('.nav-tabs li').click(function () {
        $("#search-keyword").val('');
        $("#sTime").val('');
        $("#eTime").val('');
        var type = $(this).find("a").data("type");
        if (type == 1) { //申请面签
            $("#interview-search-date").find(".control-label").html("申请日期");
        }
        if (type == 2) { //准备面签
            $("#interview-search-date").find(".control-label").html("准备日期");
        }
        if (type == 3) { //完成面签
            $("#interview-search-date").find(".control-label").html("完成日期");
        }
        initFlag = true;
        getDataList(type, 0, null);
    });
    
    $(window).bind("load resize", function () {
        var modHeight = $(".table-responsive").height();  //表格高度
    	var winHeight = $(window).height()-100; //当前窗口高度
    	if(modHeight > winHeight){
    		$(".pagination").addClass('active');
    		$(".mod_basic").css({
    			'height':'auto',
    			'margin-bottom':60
    		})
    	}else{
    		$(".pagination").removeClass('active');
    	};
    });
    
});

var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
var initFlag = true;	//是否为初始化第一页标记

function searchSumbit() {
    initFlag = true;
    var type = $('.nav-tabs li.active').find("a").data("type");
    getDataList(type, 0, null);
};

//ajax分页查询面签数据
function getDataList(type, currPage, jg) {
	var keyWord = $.trim($("#search-keyword").val());
	var sTime = $("#sTime").val();
	var eTime = $("#eTime").val();
	//显示loading提示
	loadingShow();
	loadThead(type);	
	$.ajax({
		url: ctx + "/interview/list/page.action",
		type: "get",
		dataType: 'json',
		data: {
			'status': type,
			'pageNum': currPage,
			'numPerPage': pageSize,
			'keyword': keyWord,
			'startDate': sTime,
			'endDate': eTime
		},
		success: function (data) {
			//关闭loading提示
			loadingHide();
			if (data.error == 1) {
				if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
					if (initFlag) {
						$("#pagination").pagination(data["rows"]["totalCount"], {
							items_per_page: pageSize,
							num_edge_entries: 1,
							num_display_entries: 8,
							callback: function (currPage, jg) {
								getDataList(type, currPage, jg);
							}//回调函数
						});
						initFlag = false;
					}
					loadTbody(data, type, keyWord, sTime, eTime)
				} else {
					$(".table-more tbody").html("<tr><td class='col-td' colspan='15'>暂无数据</td></tr>");
					$("#pagination").html("");
				}
			} else {
				$(".table-more tbody").html("<tr><td class='col-td' colspan='15'>暂无数据</td></tr>");
				$("#pagination").html("");
			}
		},
		error: function () {
			$(".table-more tbody").html("<tr><td class='col-td' colspan='15'>暂无数据</td></tr>");
		}
	});
}

function loadThead(type) {
	$(".table-more thead").html('');
	var title = ["贷款人姓名", "身份证号", "性别", "手机号", "客户经理", "公司名", "申请时间", "操作"];
	if (type == 1) {
		title
	} else if (type == 2) {
		title.splice(7, 0, "准备时间");
	} else {
		title.splice(7, 0, "准备时间", "完成时间", "审核员");
	}
	
	var thead = '';
	thead = '<tr>';
	for (var i = 0; i < title.length; i++) {
		thead += '<th>' + title[i] + '</th>';
	}
	thead += '</tr>';
	$(".table-more thead").append(thead);
}

function loadTbody(data, type, keyWord, sTime, eTime) {
	$("#search-keyword").val(keyWord);
	$("#sTime").val(sTime);
	$("#eTime").val(eTime);
	var tbody = "";
	var result = data.rows;
	$(".table-more tbody").html('');
	if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
		tbody += '<tr><td class="col-td" colspan="15" >暂无数据</td></tr>';
	} else {
		var list = result.recordList;
		for (var j = 0; j < list.length; j++) {
			tbody += '<tr><td style="width:8%;">' + list[j].lender + '</td>' +
			'<td style="width:8%;">' + list[j].cardNo + '</td>' +
			'<td style="width:5%;">' + list[j].sex + '</td>' +
			'<td style="width:8%;">' + list[j].tel + '</td>' +
			'<td style="width:9%;">' + list[j].userName + '</td>' +
			'<td style="width:9%;">' + list[j].orgName + '</td>' +
			'<td style="width:9%;">' + list[j].ctimeStr + '</td>';
			if (type == 2) {
				tbody += '<td style="width:9%;">' + list[j].readyTimeStr + '</td>';
				tbody += '<td style="width:12%;">';
				tbody += '<a href="#" onclick="showDetail(' + list[j].id + ', 1)" class="btn btn-info btn-xs"><i class="fa fa-search-plus"></i>视频面签</a>';
				tbody += '<a href="#" onclick="deleteItem(' + list[j].id + ')" class="m-l-6 btn btn-danger btn-xs">删除</a>';
				tbody += '</td>';
			} else if (type == 3) {
				tbody += '<td style="width:9%;">' + list[j].readyTimeStr + '</td>';
				tbody += '<td style="width:9%;">' + list[j].finishTimeStr + '</td>';
				tbody += '<td style="width:14%;">' + list[j].auditor + '</td>';
				tbody += '<td style="width:12%;">';
				tbody += '<a href="#" onclick="showDetail(' + list[j].id + ', 0)" class="btn btn-info btn-xs"><i class="fa fa-search-plus"></i>查看详情</a>';
				tbody += '<a href="#" onclick="deleteItem(' + list[j].id + ')" class="m-l-6 btn btn-danger btn-xs">删除</a>';
				tbody += '</td>';
			} else {
				tbody += '<td style="width:12%;">';
				tbody += '<a href="#" onclick="showDetail(' + list[j].id + ', 0)" class="btn btn-info btn-xs"><i class="fa fa-search-plus"></i>查看详情</a>';
				tbody += '<a href="#" onclick="deleteItem(' + list[j].id + ')" class="m-l-6 btn btn-danger btn-xs">删除</a>';
				tbody += '</td>';
			}
		}
		tbody += '</tr>';
	}
	$(".table-more tbody").append(tbody);
}
//展示详情
function showDetail(id, isInit) {
	window.location.href = ctx + '/interview/detail.action?id=' + id + "&isInit="+isInit+"&callback=" + ctx + "/interview/query.action";
}
//删除记录
function deleteItem(id){
	confirmDialog("确认删除该视频面签？", function () {
		var params = {}
		loadingShow();
		$.ajax({
			url: ctx + "/interview/delete.action",
			type: "post",
			data: {
				id : id
			},
			dataType: "json",
			success: function (data) {
				loadingHide();
				if (data.error == 1) {
					successMsg("操作成功！", 1000, function () {
						$('.nav-tabs li.active').trigger("click");
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

