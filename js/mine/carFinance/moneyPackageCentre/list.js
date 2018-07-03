$(function () {
    //初始化一页数据
    getDataList(1, 0, null);
    $(".search-btn").on("click", searchForm );
    $("#search-keyword").keypress(function (event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            searchForm();
        }
    });
    var sCompanyAdvanceMoneyDate = {
        elem: '#sCompanyAdvanceMoneyDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            eCompanyAdvanceMoneyDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eCompanyAdvanceMoneyDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var eCompanyAdvanceMoneyDate = {
        elem: '#eCompanyAdvanceMoneyDate',
        format	: 'YYYY-MM-DD',
        min		: "1970-01-01",
        max		: laydate.now(),
        istoday	: false,				//显示今天
        issure	: true,					//确认框
        istime	: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose	: function (datas) {
            sCompanyAdvanceMoneyDate.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sCompanyAdvanceMoneyDate.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sCompanyAdvanceMoneyDate.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(sCompanyAdvanceMoneyDate);
    laydate(eCompanyAdvanceMoneyDate);
    var sBankPaymentDate = {
        elem: '#sBankPaymentDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            eBankPaymentDate.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eBankPaymentDate.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var eBankPaymentDate = {
        elem: '#eBankPaymentDate',
        format	: 'YYYY-MM-DD',
        min		: "1970-01-01",
        max		: laydate.now(),
        istoday	: false,				//显示今天
        issure	: true,					//确认框
        istime	: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose	: function (datas) {
            sBankPaymentDate.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sBankPaymentDate.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sBankPaymentDate.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(sBankPaymentDate);
    laydate(eBankPaymentDate);
    var sCancelLendingMoneyTime = {
        elem: '#sCancelLendingMoneyTime',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            eCancelLendingMoneyTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eCancelLendingMoneyTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
        }
    };
    var eCancelLendingMoneyTime = {
        elem: '#eCancelLendingMoneyTime',
        format	: 'YYYY-MM-DD',
        min		: "1970-01-01",
        max		: laydate.now(),
        istoday	: false,				//显示今天
        issure	: true,					//确认框
        istime	: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose	: function (datas) {
            sCancelLendingMoneyTime.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sCancelLendingMoneyTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sCancelLendingMoneyTime.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(sCancelLendingMoneyTime);
    laydate(eCancelLendingMoneyTime);




    $(".refresh-btn").on("click", function(){
        var type = $('.nav-tabs li.active').find("a").data("type");
        getDataList(type, 0, null);
    });

    $(".reset-btn").on("click", function(){
        $("#search-keyword").val('');
        $("#sCompanyAdvanceMoneyDate").val('');
        $("#eCompanyAdvanceMoneyDate").val('');
        $("#sBankPaymentDate").val('');
        $("#eBankPaymentDate").val('');
        $("#sCancelLendingMoneyTime").val('');
        $("#eCancelLendingMoneyTime").val('');
    });
    //导出
    $(".excel-detail").on("click", panyMentDownExcel);
    $('.nav-tabs li').click(function () {
        $("#search-keyword").val('');
        $("#sCompanyAdvanceMoneyDate").val('');
        $("#eCompanyAdvanceMoneyDate").val('');
        $("#sBankPaymentDate").val('');
        $("#eBankPaymentDate").val('');
        $("#sCancelLendingMoneyTime").val('');
        $("#eCancelLendingMoneyTime").val('');
        $(".checkAll").prop("checked", false)
        var type = $(this).find("a").data("type");
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
    			'margin-bottom':60,
    			'border-bottom': 'none'
    		})
    	}else{
    		$(".pagination").removeClass('active');
    	};
    });
    //****************************//
    //*							*//
    //*	AJAX分页全部变量定义	*//
    //*							*//
    //***************************//
    var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
    var initFlag = true;	//是否为初始化第一页标记

    function searchForm() {
        initFlag = true;
        var type = $('.nav-tabs li.active').find("a").data("type");
        getDataList(type, 0, null);
    };

    //ajax分页查询面签数据
    function getDataList(type, currPage, jg) {
        var keyWord = $.trim($("#search-keyword").val());
        var sCompanyAdvanceMoneyDate = $("#sCompanyAdvanceMoneyDate").val();
        var eCompanyAdvanceMoneyDate = $("#eCompanyAdvanceMoneyDate").val();
        var sBankPaymentDate = $("#sBankPaymentDate").val();
        var eBankPaymentDate = $("#eBankPaymentDate").val();
        var sCancelLendingMoneyTime = $("#sCancelLendingMoneyTime").val();
        var eCancelLendingMoneyTime = $("#eCancelLendingMoneyTime").val();
        //显示loading提示
        loadingShow();
        $.ajax({
            url: ctx + "/cfMoneyPackageDetail/list.action",
            type: "post",
            dataType: 'json',
            data: {
                'id': $("#Pid").val(),
                'status': type,
                'pageNum': currPage,
                'numPerPage': pageSize,
                'keyword': keyWord,
                'sCompanyAdvanceMoneyDate': sCompanyAdvanceMoneyDate,
                'eCompanyAdvanceMoneyDate': eCompanyAdvanceMoneyDate,
                'sBankPaymentDate': sBankPaymentDate,
                'eBankPaymentDate': eBankPaymentDate,
                'sCancelLendingMoneyTime': sCancelLendingMoneyTime,
                'eCancelLendingMoneyTime': eCancelLendingMoneyTime
            },
            success: function (data) {
                //关闭loading提示
                loadingHide();
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        if (initFlag) {
                            $("#pagination").pagination(data["rows"]["totalCount"], {
                                items_per_page: pageSize,
                                show_select: true,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getDataList(type, currPage, jg);
                                }//回调函数
                            });
                            initFlag = false;
                        }
                        loadTbody(data,keyWord,sCompanyAdvanceMoneyDate,eCompanyAdvanceMoneyDate,sBankPaymentDate,eBankPaymentDate,sCancelLendingMoneyTime,eCancelLendingMoneyTime)
                    } else {
                        $(".alert-info").html("0");
                        $(".alert-success").html('0');
                        $(".table-more tbody").html("<tr><td class='col-td' colspan='15'>暂无数据</td></tr>");
                        $("#pagination").html("");
                    }
                } else {
                    $(".table-more tbody").html("<tr><td class='col-td' colspan='15'>暂无数据</td></tr>");
                    $(".alert-info").html("0");
                    $(".alert-success").html('0');
                    $("#pagination").html("");
                }
            },
            error: function () {
                $(".alert-info").html("0");
                $(".alert-success").html('0');
                $(".table-more tbody").html("<tr><td class='col-td' colspan='15'>暂无数据</td></tr>");
            }
        });

    }

    function loadTbody(data, keyWord,sCompanyAdvanceMoneyDate,eCompanyAdvanceMoneyDate,sBankPaymentDate,eBankPaymentDate,sCancelLendingMoneyTime,eCancelLendingMoneyTime) {
        $("#search-keyword").val(keyWord);
        $("#sCompanyAdvanceMoneyDate").val(sCompanyAdvanceMoneyDate);
        $("#eCompanyAdvanceMoneyDate").val(eCompanyAdvanceMoneyDate);
        $("#sBankPaymentDate").val(sBankPaymentDate);
        $("#eBankPaymentDate").val(eBankPaymentDate);
        $("#sCancelLendingMoneyTime").val(sCancelLendingMoneyTime);
        $("#eCancelLendingMoneyTime").val(eCancelLendingMoneyTime);
        var tbody = "";
        var result = data.rows;
        var type = $('.nav-tabs li.active').find("a").data("type");
        var typeStr=""
        if(type==1){
            typeStr="生效"
        }else if(type==3){
            typeStr="退单"
        }
        var sum = "0";
        var sumContractPrice="0";
        $(".alert-info").html('');
        $(".alert-success").html('');
        $(".table-more tbody").html('');

        if (result.recordList == null || result.recordList == '' || result.recordList.length == 0) {
            tbody += '<tr><td class="col-td" colspan="15" >暂无数据</td></tr>';
        } else {
           if (type ==3){
            var list = result.recordList;
            for (var j = 0; j < list.length; j++) {
                tbody += '<tr>' +
                    '<td><input type="checkbox" class="checkOne" value="'+list[j].id+'"></td>'+
                    '<td style="width:8%;">' +(j+1) + '</td>' +
                    '<td style="width:8%;">' + list[j].seriaNo + '</td>' +
                    '<td style="width:8%;">' + list[j].packName + '</td>' +
                    '<td style="width:8%;">' + list[j].realName + '</td>' +
                    '<td style="width:5%;">' + list[j].cardNo + '</td>' +
                    '<td style="width:8%;">' + list[j].lastCompanyAdvanceMoneyStr+'</td>' +
                    '<td style="width:8%;">' +list[j].contractPriceStr+'</td>' +
                    '<td style="width:9%;">' + list[j].loanPeriodMonth + '</td>' +
                    '<td style="width:9%;">' + list[j].lastCompanyAdvanceMoneyDateStr + '</td>' +
                    '<td style="width:9%;">' + list[j].bankPaymentDateStr + '</td>'+
                    '<td style="width:9%;">' + list[j].cancelLendingMoneyTimeStr + '</td>'+
                    '<td style="width:9%;">' + typeStr + '</td>'+
                    '<td style="width:12%;"> <a data-id="'+list[j].id+'"data-title="'+list[j].realName+'"class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a></td>';
                sum=list[j].sumLastCompanyAdvanceMoneyStr;
                sumContractPrice=list[j].sumContractPriceStr;
            }
            tbody += '</tr>';
        }else if (type ==2 || type ==4){
               var list = result.recordList;
               if(type ==2){
                   typeStr="放款";
               }else if(type ==4){
                   typeStr="过期";
               }
               for (var j = 0; j < list.length; j++) {
                   tbody += '<tr>' +
                       '<td><input type="checkbox" class="checkOne" value="'+list[j].id+'"></td>'+
                       '<td style="width:8%;">' +(j+1) + '</td>' +
                       '<td style="width:8%;">' + list[j].seriaNo + '</td>' +
                       '<td style="width:8%;">' + list[j].packName + '</td>' +
                       '<td style="width:8%;">' + list[j].realName + '</td>' +
                       '<td style="width:5%;">' + list[j].cardNo + '</td>' +
                       '<td style="width:8%;">' +list[j].companyAdvanceMoneyStr+'</td>' +
                       '<td style="width:8%;">' +list[j].contractPriceStr+'</td>' +
                       '<td style="width:9%;">' + list[j].loanPeriodMonth + '</td>' +
                       '<td style="width:9%;">' + list[j].companyAdvanceMoneyDateStr + '</td>' +
                       '<td style="width:9%;">' + list[j].bankPaymentDateStr + '</td>'+
                       '<td style="width:9%;">' + list[j].lendingMoneyTimeStr + '</td>'+
                       '<td style="width:9%;">' + typeStr + '</td>'+
                       '<td style="width:12%;"> <a data-id="'+list[j].id+'"data-title="'+list[j].realName+'"class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a></td>';
                   sum=list[j].sumCompanyAdvanceMoneyStr;
                   sumContractPrice=list[j].sumContractPriceStr;
               }
               tbody += '</tr>';
           }else{
               var list = result.recordList;
               for (var j = 0; j < list.length; j++) {
                   tbody += '<tr>' +
                       '<td><input type="checkbox" class="checkOne" value="'+list[j].id+'"></td>'+
                       '<td style="width:8%;">' +(j+1) + '</td>' +
                       '<td style="width:8%;">' + list[j].seriaNo + '</td>' +
                       '<td style="width:8%;">' + list[j].packName + '</td>' +
                       '<td style="width:8%;">' + list[j].realName + '</td>' +
                       '<td style="width:5%;">' + list[j].cardNo + '</td>' +
                       '<td style="width:8%;">' +list[j].companyAdvanceMoneyStr+'</td>' +
                       '<td style="width:8%;">' +list[j].contractPriceStr+'</td>' +
                       '<td style="width:9%;">' + list[j].loanPeriodMonth + '</td>' +
                       '<td style="width:9%;">' + list[j].companyAdvanceMoneyDateStr + '</td>' +
                       '<td style="width:9%;">' + list[j].bankPaymentDateStr + '</td>'+
                       '<td style="width:9%;">' + list[j].financePaymentTimeStr + '</td>'+
                       '<td style="width:9%;">' + typeStr + '</td>'+
                       '<td style="width:12%;"> <a data-id="'+list[j].id+'"data-title="'+list[j].realName+'"class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a></td>';
                   sum=list[j].sumCompanyAdvanceMoneyStr;
                   sumContractPrice=list[j].sumContractPriceStr;
               }
               tbody += '</tr>';
           }
        }

        $(".table-more tbody").append(tbody);
        $(".alert-info").append(sum);
        $(".alert-success").append(sumContractPrice);
        $("#selectNum").on("change",function () {
            pageSize =parseInt($(this).val());
            initFlag=true;
            getDataList(type, 0, null);

        })

        $(".detail").on("click", function(){
            var _this = this;
            var acceptId = $(_this).attr("data-id");
            var dataTitle = $(_this).attr("data-title");
            var dataHref = ctx + "/cfBusinessOrderAccept/detail.action?id=" + acceptId;
            openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
        });
    }

    //公司垫款明细
   function panyMentDownExcel() {
        var $has_checked = $(".checkOne:checked");
        var type = $('.nav-tabs li.active').find("a").data("type");
        if ($has_checked.length == undefined || $has_checked.length == 0) {
            alertDialog("请选择要导出的记录。");
            return;
        }
        var ids = new Array();
        $has_checked.each(function () {
            ids.push($(this).val());
        });
        confirmDialog("您确定要导出记录？", function () {
            var frame = $('<iframe>');//定义一个iframe
            frame.attr("src", ctx + "/cfMoneyPackageDetail/newExportList.action?ids=" + ids.toString()+"&type="+type);
            frame.attr("style", "display:none");
            frame.append("</iframe>")
            $("body").append(frame);

        });
    }
});





