jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#repayAmountMonth").val("");
        $("#nameOrId").val("");

    });

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



})
