$(function () {
    /*我的订单*/
    function getPersonnelOrders(bankid) {
        $.ajax({
            url: ctx + "/cfBusinessOrderAccept/getMine.action",
            type: "post",
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    loadDataToList(data, bankid);
                } else if (result.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(result.message);
                }
            },
            error: function () {
                $(".table-order tbody").html('<tr><td class="col-td text-center" colspan="6" >暂无数据</td></tr>');
            }
        });
    }

    function loadDataToList(data, bankid) {
        var tbody = "";
        $(".table-order tbody").html('');
        if (data == null) {
            tbody += '<tr><td class="col-td text-center" colspan="6" >暂无数据</td></tr>';
        } else {
            var $list = data.recordList;
            if ($list == null || $list == '' || $list.length == 0) {
                tbody += '<tr><td class="col-td text-center" colspan="6" >暂无数据</td></tr>';
            } else {
                $(".orderNum").text('(' + data.totalCount + ')');
                for (var j = 0; j < $list.length; j++) {
                    tbody += '<tr><td style="width:5%;">' + $list[j].realName + '</td>' +
                        '<td style="width:10%;">' + $list[j].buyerCardNo + '</td>' +
                        '<td style="width:10%;">' + $list[j].bankName + '</td>' +
                        '<td style="width:5%;">' + $list[j].orderStatusName + '</td>';
                    tbody += '<td style="width:6%;">' + $list[j].submitTime + '</td><td class="btn-cel" style="width:14%;text-align: center;">';
                    if (bankid > 0 && $list[j].orderStatus == 0) {
                        tbody += '<a title="银行征信查询" class="btn btn-primary btn-xs" onclick="bankCreditReport(' + $list[j].id + ')" style="margin-right:5px;"><i class="fa fa-search-plus"></i>银行征信查询</a>';
                    }
                    tbody += '<a title="查看" class="btn btn-info btn-xs detail" onclick="detail(' + $list[j].id + ')" ><i class="fa fa-search-plus" style="margin-right:5px;"></i>查看</a></td></tr>';
                }
            }
        }

        $(".table-order tbody").append(tbody);

    }

    //****************************//
    //*							*//
    //*	AJAX分页全部变量定义		*//
    //*							*//
    //***************************//
    var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;	//是否为初始化第一页标记
    var bankid = $("#reportList").data("bankid");
    getPersonnelOrders(bankid);
});
//订单详情
function detail(id) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情");
}
//银行征信查询
function bankCreditReport(id) {
    var url = ctx + "/bankCreditReport/bankCreditReport.action?id=" + id;
    var time = new Date();
    var index = time.getTime();
    openTabForParent(url, -index, "银行征信查询");
}