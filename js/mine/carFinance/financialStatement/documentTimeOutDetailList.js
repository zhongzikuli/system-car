$(function(){
	
	//下拉框初始化
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//下拉框初始化
	$("#search-bank").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	
	//下拉框初始化
	$("#search-style").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",	
		allow_single_deselect		: true,
		width: "100%"
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-deparment-name").val("").trigger('chosen:updated');
		$("#search-bank").val("").trigger('chosen:updated');
		$("#departmentTreeId").val("").trigger('chosen:updated');
		$("#search-start-date").val("");
		$("#search-end-date").val("");
		$("#search-keyword").val("")
	});
	initLaydate("search-start-date","search-end-date");
	//搜索时间控件
	  function initLaydate(start,end) {
          var sTime = {
              elem: '#' + start,
              format: 'YYYY-MM-DD',
      		min: '1970-01-01 ', //设定最小日期为当前日期
      		//max: laydate.now(), //最大日期
      		istoday: false, //显示今天
      		issure: true, //确定框
      		istime: false,
      		start: laydate.now() + ' 00:00:00',
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
      		start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
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

	  var zTree
	    var setting = {
	        view: {
	            dblClickExpand: false
	        },
	        data: {
	            simpleData: {
	                enable: true
	            }
	        },
	        callback: {
	            onClick: tjDeparment
	        }
	    };

	    function selectDepartment() {
	        $("#menuContent").css({
	            "background": "#cff",
	            "overflow": "auto",
	            "z-index": 999,
	            "top": 30,
	            "width": "200px"
	        }).slideDown("fast");
	        $("body").bind("mousedown", onBodyDown);
	        var id = $("#departmentTreeId").data("id");
	        $.ajax({
	            url: ctx + "/department/reportDeportmentTree.action",
	            data: {id: id},
	            dataType: "json",
	            success: function (result) {
	                if (result.error == 1) {
	                    var zNodes = result.rows;
	                    $.fn.zTree.init($("#departmentTree"), setting, zNodes);
	                    zTree = $.fn.zTree.getZTreeObj("departmentTree");
	                    zTree.expandAll(true);
	                } else if (data.error == -100) {
	                    faildMsg("会话超时，请重新登陆！");
	                } else {
	                    faildMsg(data.message);
	                }
	            }
	        });
	    }

	    function onBodyDown(event) {
	        if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0 )) {
	            hideMenu();
	        }
	    }

	    function hideMenu() {
	        $("#menuContent").fadeOut("fast");
	    }

	    function tjDeparment(event, treeId, treeNode) {
	        $("#departmentTreeId").val(treeNode.name);
	        $("#pagerForm input[name='departmentId']").val(treeNode.id);
	        $("#pagerForm input[name='departmentParentId']").val(treeNode.parentId);
	        hideMenu();
	    }


	    //部门事件
	    $("#departmentTreeId").on("click", function () {
	        selectDepartment();
	    });


});
//合同装订报表
function exporDocumentTimeOutDetailExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var idArr = new Array();
	$has_checked.each(function () {
		idArr.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/documentTimeOutDetailReport/exportList.action?idArr=" + idArr.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);
		
	});
}
