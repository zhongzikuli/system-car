$(function () {
		            //iframe高度随内容自动调整  
	$(window.parent.document).find(".creditReport").load(function(){
		var main = $(window.parent.document).find(".creditReport");
		var thisheight = $(document).height()+105;
		main.height(thisheight);
	})
//****************************//
//*							*//
//*	AJAX分页全部变量定义		*//
//*							*//
//***************************//
    var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;	//是否为初始化第一页标记

    getCreditDataList(0,null);

    function getCreditDataList(currPage, jg){
        $(".table-more tbody").html('');
        showLoading("#result");
        $.ajax({
            url: ctx + "/financeReport/listCreditReport.action",
            type: "post",
            data: {
                'pageNum': currPage,
                'numPerPage': pageSize
            },
            dataType: "json",
            success: function (data) {
                hideLoading("#result");
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        if (initFlag) {
                            $("#pagination").pagination(data["rows"]["totalCount"], {
                                items_per_page: pageSize,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getCreditDataList(currPage, jg);
                                }//回调函数
                            });
                            initFlag = false;
                        }
                        loadDataTbody(data, currPage);
                    } else {
                        $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='3'>暂无数据</td></tr>");
                        $("#pagination").html("");
                    }
                } else {
                    $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='3'>暂无数据</td></tr>");
                    $("#pagination").html("");
                }
            },
            error: function () {
                $(".table-more tbody").html("<tr><td class='col-td text-center' colspan='3'>暂无数据</td></tr>");
            }
        });
    }


    function loadDataTbody(data, currPage) {
        var tbody = "";
        var result = data.rows;
        $(".table-more tbody").html('');
        if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
            tbody += '<tr><td class="col-td" colspan="3">暂无数据</td></tr>';
        } else {
            var list = result.recordList;
            for (var j = 0; j < list.length; j++) {
                var num = Number(currPage * pageSize) + parseInt(j) + 1;
                tbody += '<tr><td style="width:8%;">' + list[j].bankName + '</td>';
                if (list[j].dayNum == 0) {
                    tbody += '<td style="width:8%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].dayNum + '</td>';
                }
                if (list[j].monthNum == 0) {
                    tbody += '<td style="width:8%;">--</td>';
                } else {
                    tbody += '<td style="width:8%;">' + list[j].monthNum + '</td>';
                }
                tbody += '</tr>';
            }
        }
        $(".table-more tbody").append(tbody);
    }
});
