jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    
	$(".changeOrder").eq(0).addClass("btn-primary").removeClass("btn-default");
    var acceptId = $(".changeOrder").eq(0).attr("data-id");
    debugger;
    //银行卡号
    var bankCardNo=$("#bankCardNo").val();
    //银行id
    var bankId = $("#bankId").val();
    //身份证号
    var cardNo=$("#urgeWorkcardNo").val();

    var name=$("#name").val();

     if(null!=acceptId && acceptId!=undefined && ''!=acceptId){
         getBuyerInfo(acceptId);
         getShareInfo(acceptId);
         getEmergencyInfo(acceptId);
         getCarInfo(acceptId);
         getLendingInfo(acceptId);
         getRegisterMortgageInfo(acceptId);
         getsponerInfo(acceptId);
     }
     if(null==acceptId || acceptId==undefined || ''==acceptId){
         getsponer1();
     }

    //逾期概况
    getOverDueInfos(bankId,bankCardNo,cardNo);
    //初始化table
    tableInfo(bankId,bankCardNo,cardNo);

    $(".changeOrder").on("click",function(){
    	$(this).addClass("btn-primary").removeClass("btn-default").siblings().addClass("btn-default").removeClass("btn-primary");
        acceptId = $(this).attr("data-id");
        bankCardNo = $(this).attr("data-bankCardNo");
        bankId = $(this).attr("data-bankId");
        if(null!=acceptId && undefined!=acceptId && ''!=acceptId){
            getBuyerInfo(acceptId);
            getShareInfo(acceptId);
            getsponerInfo(acceptId);
            getEmergencyInfo(acceptId);
            getCarInfo(acceptId);
            getLendingInfo(acceptId);
            getRegisterMortgageInfo(acceptId);
            tableInfo(bankId,bankCardNo,cardNo);
        }
    });

    function getOverDueInfos(bankId,bankCardNo,cardNo){
        $.ajax({
            url: ctx + "/urgeWork/getOverDueInfo.action",
            type: "post",
            data: {
                bankId:bankId,
                bankCardNo:bankCardNo,
                cardNo:cardNo
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    $("#overdueMoney").val(data.rows.overdueMoney);
                    if(null!=data.rows.overdueDays && data.rows.overdueDays!=''){
                        var days=Math.abs(data.rows.overdueDays);
                        $("#overdueDays").val(days);
                    }
                    $("#advancedMoney").val(data.rows.newLawMoney);
                    $("#indemnityMoney").val(data.rows.indemnityMoney);
                    if(null!=data.rows.shouldReplayMoney && data.rows.shouldReplayMoney>0){
                        $("#shouldReplayMoney").val(data.rows.shouldReplayMoney);
                    }else{
                        $("#shouldReplayMoney").val(0);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getBuyerInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getBuyerInfos.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    $("#realName").val(data.rows.realName);
                    $("#sex").val(data.rows.sexStr);
                    $("#cardNo").val(data.rows.cardNo);
                    $("#tel").val(data.rows.tel);
                    $("#companyTel").val(data.rows.companyTel);
                    $("#phone").val(data.rows.phone);
                    $("#engineNo").val(data.rows.engineNo);
                    $("#closeTypeCode").val(data.rows.closeType);
                    $("#remark").val(data.rows.remark);
                    $("#departmentName").val(data.rows.departmentName);
                    $("#familyAddress").val(data.rows.familyAddressProvince+""+data.rows.familyAddressCity+""+data.rows.familyAddressTown+""+data.rows.familyAddress);
                    $("#companyAddress").val(data.rows.companyProvince+""+data.rows.companyCity+""+data.rows.companyTown+""+data.rows.companyAddress);
                    $("#companyName").val(data.rows.companyName);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getShareInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getShareInfo.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    $("#shareName").val(data.rows.realName);
                    $("#sex3").val(data.rows.sexStr);
                    $("#tel3").val(data.rows.tel);
                    $("#phone3").val(data.rows.companyTel);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getsponerInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getsponerInfo.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    getsponer(data.rows);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getsponer(res) {
        var html='';
        if(res && res.length>0){
            for(var i=0;i<res.length;i++){
                html+='<div class="m-rl-tb row ">'+
                    '<label class="col-md-1 control-label  ">担保人姓名:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].realName+'"></div>'+
                    '<label class="col-md-1 control-label ">性别:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].sexStr+'"></div>'+
                    '<label class="col-md-1 control-label ">手机:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].tel+'"></div>'+
                    '<label class="col-md-1 control-label ">单位电话:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].companyTel+'"></div>'+
                    '</div>'+
                    '<div class="m-rl-tb row ">'+
                    '<label class="col-md-1 control-label ">现住电话:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].phone+'"></div>'+
                    '<label class="col-md-1 control-label ">与购车人关系:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly  class="form-control" type="text" value="'+res[i].relationType+'"></div>'+
                    '</div>'+
                    '</div>'
            }
        }else{
            html+='<div class="m-rl-tb row ">'+
                '<label class="col-md-1 control-label">担保人姓名:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="col-md-1 control-label">性别:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="col-md-1 control-label">手机:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="col-md-1 control-label">单位电话:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '</div>'+
                '<div class="m-rl-tb row ">'+
                '<label class="col-md-1 control-label">现住电话:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="col-md-1 control-label">与购车人关系:</label>'+
                '<div class="col-md-2">'+
                '<input readonly value="" class="form-control" type="text"></div>'+
                '</div>'+
                '</div>'
        }
        $(".sponer").html(html)
    }

    function getsponer1() {
        var html='';
            html+='<div class="m-rl-tb row ">'+
                '<label class="control-label col-md-1">担保人姓名:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="control-label col-md-1">性别:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="control-label col-md-1">手机:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="control-label col-md-1">单位电话:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '</div>'+
                '<div class="m-rl-tb row ">'+
                '<label class="control-label col-md-1">现住电话:</label>'+
                '<div class="col-md-2">'+
                '<input readonly class="form-control" type="text" ></div>'+
                '<label class="control-label col-md-1">与购车人关系:</label>'+
                '<div class="col-md-2">'+
                '<input readonly value="" class="form-control" type="text"></div>'+
                '</div>'+
                '</div>'
        $(".sponer").html(html)
    }

    function getCarInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getCarInfo.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    $("#carBrandName").val(data.rows.carBrand);
                    $("#engineNo").val(data.rows.engineNo);
                    $("#bankRate").val(data.rows.bankRate);
                    $("#actualLoadMoney").val(data.rows.actualLoadMoney);
                    $("#bankName").val(data.rows.loanBank);
                    $("#loanPeriodMonthCode").val(data.rows.loanPeriodMonth);
                    $("#repayAmountMonth").val(data.rows.repayMonth);
                    if(data.rows.newOrOld==1){
                        $("#newOrOld").val("新车");
                    }else if(data.rows.newOrOld==0){
                        $("#newOrOld").val("二手车");
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getEmergencyInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getEmergencyInfo.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    getEmergency(data.rows)
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getEmergency(res) {
        var html='';
        if(res && res.length>0){
            for(var i=0;i<res.length;i++){
                html+='<div class="m-rl-tb row ">'+
                    '<label class="col-md-1 control-label ">紧急联系人:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].realName+'"></div>'+
                    '<label class="col-md-1 control-label ">关系:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly  class="form-control" type="text" value="'+res[i].relationType+'"></div>'+
                    '<label class="col-md-1 control-label ">手机:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].tel+'"></div>'+
                    '<label class="col-md-1 control-label ">电话:</label>'+
                '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" value="'+res[i].phone+'"></div>'+
                    '</div>'
            }
        }else{
                html+='<div class="m-rl-tb row ">'+
                    '<label class="col-md-1 control-label ">紧急联系人:</label>'+
                    '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text" ></div>'+
                    '<label class="col-md-1 control-label ">关系:</label>'+
                    '<div class="col-md-2">'+
                    '<input readonly  class="form-control" type="text"></div>'+
                    '<label class="col-md-1 control-label ">手机:</label>'+
                    '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text"></div>'+
                    '<label class="col-md-1 control-label ">电话:</label>'+
                    '<div class="col-md-2">'+
                    '<input readonly class="form-control" type="text"></div>'+
                    '</div>'
        }
        $(".contact").html(html)
    }

    function getLendingInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getLendingInfo.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if(null == data.rows){
                        $("#firstRepaymentDate").val();
                        $("#repaymentBankCard").val();
                    }else{
                        $("#firstRepaymentDate").val(data.rows.repaymentDate);
                        $("#repaymentBankCard").val(data.rows.bankCardNo);
                        $("#bankPaymentDate").val(data.rows.bankPaymentDateStr);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function getRegisterMortgageInfo(acceptId){
        $.ajax({
            url: ctx + "/urgeWork/getRegisterMortgageInfo.action",
            type: "post",
            data: {
                acceptId:acceptId
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    $("#plateNumber").val(data.rows.plateNumber);
                    var date =data.rows.mortgageFileSubmitBankDate;
                    if(null==date || ''==date || undefined==date){
                        $("#mortgageProcessDate").val("否");
                    }else{
                        $("#mortgageProcessDate").val("是");
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }


    $(".addInfo").on("click",function(){
        addInfo();
    });

    $(".deleteInfo").on("click",function(){
        deleteInfo();
    });

    function addInfo(){
    	//银行卡号
        bankCardNo=$(".mod_header .btn-primary").attr("data-bankCardNo");
        //银行id
        bankId = $(".mod_header .btn-primary").attr("data-bankId");
        var options = {
            width: 500,
            top: 200,
            height: 410,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            url: "",
            onAfterShow: function () {
                laydate( {
                    elem: '#urgeDate',
                    format: 'YYYY-MM-DD hh:mm:ss', //日期格式
                    istime: true, //是否开启时间选择
                    max:laydate.now(),
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
                    choose: function (datas) {
                        if  (datas =='') {
                            change_error_style($("#urgeDate"), "add");
                        } else {
                            change_error_style($("#urgeDate"), "remove");
                        }
                    },
                    clear: function () {
                    }
                });
            },
            onAfterHide: function () {
                $("body").find("#laydate_box").hide();
            },
            callback: function () {
                var flag = false;
                if ($("#addUrgeWorkForm").valid("addUrgeWorkForm")) {
                    $.ajax({
                        url: ctx + "/urgeWork/insertUrgeWork.action",
                        type: "post",
                        data: {
                            bankId:bankId,
                            bankCardNo:bankCardNo,
                            cardNo:cardNo,
                            urgeDate:$("#urgeDate").val(),
                            urgeMethod:$("#urgeMethod").val(),
                            urgeStatus:$("#urgeStatus").val(),
                            isTelException:$("#isTelException").val(),
                            urgeContent:$("#urgeContent").val(),
                            customerName:name
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    tableInfo(bankId,bankCardNo,cardNo)
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#addUrgeWork-dialog", options);

        //下拉框初始化
        var config = {
            disable_search_threshold:10,
            no_results_text: '无数据',
            width:"100%"
        };
        //下拉框
        $(".urgeMethod").chosen(config);
        $(".urgeMethod").on('change', function(e, selected) {
            if("" != selected){
                change_error_style($(".urgeMethod").parent(),"remove");
            }else{
                change_error_style($(".urgeMethod").parent(), "add");
            }
        });
        $(".urgeStatus").chosen(config);
        $(".urgeStatus").on('change', function(e, selected) {
            if("" != selected){
                change_error_style($(".urgeStatus").parent(),"remove");
            }else{
                change_error_style($(".urgeStatus").parent(), "add");
            }
        });
        $(".isTelException").chosen(config);
        $(".isTelException").on('change', function(e, selected) {
            if("" != selected){
                change_error_style($(".isTelException").parent(),"remove");
            }else{
                change_error_style($(".isTelException").parent(), "add");
            }
        });

        creatDlg.show();
    }

    function deleteInfo(){
    	//银行卡号
        bankCardNo=$(".mod_header .btn-primary").attr("data-bankCardNo");
        //银行id
        bankId = $(".mod_header .btn-primary").attr("data-bankId");
        var ck = $("input[name='urgeWorkCheckbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的催缴作业记录吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/urgeWork/deleteUrgeWork.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                tableInfo(bankId,bankCardNo,cardNo)
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            })
        }
    }

    $(".exportInfo").on("click",function(){
        exportInfo();
    });

    function exportInfo(){
        var ck = $("input[name='urgeWorkCheckbox']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的数据");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户");
                return false;
            }
            confirmDialog("确认导出选中的数据吗？", function () {
                window.location.href=ctx+"/urgeWork/exportInfo.action?idArr="+idArr.toString();
            })
        }
    }
    function tableInfo(bankId,bankCardNo,cardNo){
        $.ajax({
            url: ctx + "/urgeWork/getUrgeWork.action",
            type: "post",
            data: {
                bankId:bankId,
                bankCardNo:bankCardNo,
                cardNo:cardNo
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    initTable(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

});


function initTable(data){
    $("#res-tbody").html("");
    /*if($("#res-tbody").length )*/
    var html = '';
    if (null == data || data.rows.length <= 0 || data==undefined) {
        html += '<tr><td class="col-td" colspan="10">暂无催缴信息</td></tr>';
    } else {
        for (var i = 0; i < data.rows.length; i++) {
            var res =data.rows;
            var urgeStatus = "";
            if (res[i]['urgeStatus'] == 1) {
                urgeStatus = "已完成"
            } else if (res[i]['urgeStatus'] == 2) {
                urgeStatus = "催缴中"
            } else if (res[i]['urgeStatus'] == 3) {
                urgeStatus = "承诺还款"
            }else if (res[i]['urgeStatus'] == 4) {
                urgeStatus = "已拖车"
            }
            var urgeMethod = "";
            if (res[i]['urgeMethod'] == 1) {
                urgeMethod = "电话"
            } else if (res[i]['urgeMethod'] == 2) {
                urgeMethod = "短信"
            } else if (res[i]['urgeMethod'] == 3) {
                urgeMethod = "上门"
            }else if (res[i]['urgeMethod'] == 4) {
                urgeMethod = "微信"
            }else if (res[i]['urgeMethod'] == 0) {
                urgeMethod = "其他"
            }

            var isTelException = "";
            if (res[i]['isTelException'] == 0) {
                isTelException = "否"
            } else if (res[i]['isTelException'] == 1) {
                isTelException = "是"
            }
            html += '<tr><td><input type="checkbox" name="urgeWorkCheckbox" class="checkOne" value="' + res[i]['id'] + '"></td>' +
                '<td class="cel">' + (i + 1) + '</td>' +
                '<td class="cel">' + res[i]['customerName'] + '</td>' +
                '<td class="cel">' + urgeStatus + '</td>' +
                '<td class="cel">' + res[i]['urgeDate'] + '</td>' +
                '<td class="cel">' + urgeMethod + '</td>' +
                '<td class="cel">' + isTelException + '</td>' +
                '<td class="cel" title="' + res[i]['urgeContent'] + '">' + res[i]['urgeContent'] + '</td>' +
                '<td class="cel">' + res[i]['realname'] + '</td>' +
                '<td><a class="btn btn-success btn-xs editurgeWork" id="editInsuranceClaim' + i + '"  onclick="editurgeWork(' + res[i]["id"] + ')"  data-id="' + res[i]['id'] + '">' +
                '<i class="fa fa-edit"></i>编辑</a></td>';
            html += '</tr>';
        }
    }
    $("#res-tbody").append(html);
}

function editurgeWork(id){
	//银行卡号
    bankCardNo=$(".mod_header .btn-primary").attr("data-bankCardNo");
    //银行id
    bankId = $(".mod_header .btn-primary").attr("data-bankId");
    var options = {
        width: 500,
        top: 200,
        height: 410,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        url: "",
        onAfterShow: function () {
            laydate( {
                elem: '#urgeDateEdit',
                format: 'YYYY-MM-DD hh:mm:ss', //日期格式
                istime: true, //是否开启时间选择
                max:laydate.now(),
                isclear: true, //是否显示清空
                istoday: false, //是否显示今天
                issure: false, //是否显示确认
                start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
                choose: function (datas) {
                    if  (datas =='') {
                        change_error_style($("#urgeDateEdit"), "add");
                    } else {
                        change_error_style($("#urgeDateEdit"), "remove");
                    }
                },
                clear: function () {
                }
            });

            $.ajax({
                url: ctx + "/urgeWork/toUrgeWorkEdit.action",
                type: "post",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (data) {
                    if (data.error == 1) {
                        var info = data.rows;
                        $("#urgeDateEdit").val(info.urgeDate);
                        $("#urgeMethodEdit").val(info.urgeMethod).trigger('chosen:updated');
                        $("#urgeStatusEdit").val(info.urgeStatus).trigger('chosen:updated');
                        $("#isTelExceptionEdit").val(info.isTelException).trigger('chosen:updated');
                        $("#urgeContentEdit").val(info.urgeContent);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        },
        onAfterHide: function () {
            $("body").find("#laydate_box").hide();
        },
        callback: function () {
            var flag = false;
            if ($("#addUrgeWorkEditForm").valid("addUrgeWorkEditForm")) {
                $.ajax({
                    url: ctx + "/urgeWork/updatetUrgeWork.action",
                    type: "post",
                    data: {
                        id:id,
                        urgeDate:$("#urgeDateEdit").val(),
                        urgeMethod:$("#urgeMethodEdit").val(),
                        urgeStatus:$("#urgeStatusEdit").val(),
                        isTelException:$("#isTelExceptionEdit").val(),
                        urgeContent:$("#urgeContentEdit").val()
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            flag = false;
                            successMsg("操作成功！", 1000, function () {
                                tableInfo(bankId,bankCardNo,cardNo)
                            });
                        } else if (data.error == -100) {
                            flag = true;
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            flag = true;
                            faildMsg(data.message);
                        }
                    }
                });
                if (flag) {
                    return false;
                }
            } else {
                return false;
            }
        }
    };
    creatDlg = new Dialog("#addUrgeWork_edit-dialog", options);

    //下拉框初始化
    var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"100%"
    };
    //下拉框
    $(".urgeMethodEdit").chosen(config);
    $(".urgeMethodEdit").on('change', function(e, selected) {
        if("" != selected){
            change_error_style($(".urgeMethodEdit").parent(),"remove");
        }else{
            change_error_style($(".urgeMethodEdit").parent(), "add");
        }
    });
    $(".urgeStatusEdit, .urgeMethodEdit").chosen(config);
    $(".urgeStatusEdit").on('change', function(e, selected) {
        if("" != selected){
            change_error_style($(".urgeStatusEdit").parent(),"remove");
        }else{
            change_error_style($(".urgeStatusEdit").parent(), "add");
        }
    });
    $(".isTelExceptionEdit").chosen(config);
    $(".isTelExceptionEdit").on('change', function(e, selected) {
        if("" != selected){
            change_error_style($(".isTelExceptionEdit").parent(),"remove");
        }else{
            change_error_style($(".isTelExceptionEdit").parent(), "add");
        }
    });
    creatDlg.show();
}

function addUrgeWorkFormValid(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "urgeDate" ||
                $(lableId).attr("id") == "urgeDateEdit") {
                $(lableId).attr('tip', '催缴日期为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "urgeMethod" ||
                $(lableId).attr("id") == "urgeMethodEdit") {
                $(lableId).parent().attr('tip', '催缴方式不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            else if ($(lableId).attr("id") == "urgeStatus" ||
                $(lableId).attr("id") == "urgeStatusEdit") {
                $(lableId).parent().attr('tip', '催缴状态不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            else if ($(lableId).attr("id") == "isTelException" ||
                $(lableId).attr("id") == "isTelExceptionEdit") {
                $(lableId).parent().attr('tip', '是否拖车不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("id") == "urgeContent" ||
                $(lableId).attr("id") == "urgeContentEdit") {
                $(lableId).attr('tip', '催缴内容不能为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}