jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });

    var sub = 10;		//获取十年内时间段
    var years = new Array();
    var yearOptions = "";
    var currentYear = DateUtil.getYear(new Date());
    var month = DateUtil.getMonth(new Date()) + 1;
    //当年月
    for(var i=month; i > 0; i--){
        var value = "";
        var text = "";
        if(i < 10){
            value = currentYear + "0" + i;
            text = currentYear + "年0" + i + "月";
        }else{
            value = currentYear + "" + i;
            text = currentYear + "年" + i + "月";
        }
        yearOptions += "<option value='"+value+"' >" + text + "</option>";
    }
    for (var i = 0; i < sub; i++) {
        var year = currentYear - (i+1);
        for (var j = 12; j > 0; j--) {
            var value = "";
            var text = "";
            if(j >= 10){
                value = year + "" + j;
                text = year + "年" + j + "月";
            }else{
                value = year + "0" + j;
                text = year + "年0" + j + "月";
            }
            yearOptions += "<option value='"+value+"' >" + text + "</option>";
        }
    }
    $("#search-month").append(yearOptions);

    $("#search-month").val($("#year-month-hidden").val());
    $("#search-month").find("option[text='"+$("#year-month-hidden").val()+"']").attr("selected","selected");

    $("#search-month").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });


    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#overdueMoney").val("");
        $("#repayAmountMonth").val("");
        $("#continueNum").val("");
        $("#nameOrId").val("");
        $("#totalNum").val("");
        $("#search-select").val("").trigger('chosen:updated');
    });

    $(".reset-btn1").on("click", function(){
        $("#nameOrId1").val("");
        $("#overdueMoney1").val("");
        $("#isSettle").val("").trigger('chosen:updated');
        $("#firstOverDue1").val("").trigger('chosen:updated');
        $("#totalNum1").val("");
        $("#isOver").val("").trigger('chosen:updated');
        $("#isAdvancedIncome").val("").trigger('chosen:updated');
        $("#search-month").val("").trigger('chosen:updated');
        $("#repayAmountMonth1").val("");
        $("#isLaw").val("").trigger('chosen:updated');
        $("#isTelException").val("").trigger('chosen:updated');
        $("#overDueBank").val("").trigger('chosen:updated');

        $("#overdueMoney").val("");
        $("#repayAmountMonth").val("");
        $("#continueNum").val("");
        $("#nameOrId").val("");
        $("#totalNum").val("");
        $("#search-select").val("").trigger('chosen:updated');
    });


    var config = {
        disable_search_threshold: 10,
        no_results_text			: '无数据',
        allow_single_deselect	: true,
        width					:'100px'
    };
    $("#search-select").chosen(config);

    var config = {
        disable_search_threshold: 10,
        no_results_text			: '无数据',
        allow_single_deselect	: true,
        width					:'100%'
    };
    $("#overDueBank").chosen(config);
    $("#isTelException").chosen(config);
    $("#isLaw").chosen(config);
    $("#overDueMonth").chosen(config);
    $("#isAdvancedIncome").chosen(config);
    $("#isOver").chosen(config);
    $("#firstOverDue").chosen(config);
    $("#isSettle").chosen(config);
    $("#firstOverDue1").chosen(config);
});

$(".urgeWork").on("click",function(){
    urgeWork();
});
function urgeWork(){
    var ck = $("input[name='urgeWorkInput']:checked");
    if (ck.length == 0) {
        alertDialog("请选择一条数据。");
        return
    }if(ck.length >1){
        alertDialog("每次只能选择一条数据。");
        return
    } else {
        var bankCardNo=$("input[name='urgeWorkInput']:checked").attr("bankCardNo");
        var cardNo=$("input[name='urgeWorkInput']:checked").attr("cardNo");
        var bankId=$("input[name='urgeWorkInput']:checked").attr("bankId");
        var customerName=$("input[name='urgeWorkInput']:checked").attr("customerName");
        var url =ctx+"/urgeWork/toUrgeWork.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId+"&customerName="+customerName;
        openTabForParent(url, "-add-urge-" , customerName+"-新增催交作业" );
    }
}

$(".advancedIncome").on("click",function(){
    advancedIncome();
});
function advancedIncome(){
    var ck = $("input[name='urgeWorkInput']:checked");
    if (ck.length == 0) {
        alertDialog("请选择一条数据。");
        return
    }if(ck.length >1){
        alertDialog("每次只能选择一条数据。");
        return
    } else {
        var bankCardNo=$("input[name='urgeWorkInput']:checked").attr("bankCardNo");
        var cardNo=$("input[name='urgeWorkInput']:checked").attr("cardNo");
        var bankId=$("input[name='urgeWorkInput']:checked").attr("bankId");
        var customerName=$("input[name='urgeWorkInput']:checked").attr("customerName");
            window.location.href=ctx+"/urgeWork/toAdvancedIncome.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId+"&customerName="+customerName;
    }
}

/*
//催缴作业
function urgeWork(bankCardNo,cardNo,bankId){
    window.location.href=ctx+"/urgeWork/toUrgeWork.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId;
}

//垫付收支
function advancedIncome(bankCardNo,cardNo,bankId){
    window.location.href=ctx+"/urgeWork/toAdvancedIncome.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId;
}*/
