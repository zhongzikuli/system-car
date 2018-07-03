$(function () {

    $(".bankReport-excel").on("click",function () {
        loanUnsecuredDownExcel();
    });

    //已放款未抵押银行统计表
    function loanUnsecuredDownExcel() {
        confirmDialog("您确定要导出记录？", function () {
            var frame = $('<iframe>');//定义一个iframe
            frame.attr("src", ctx + "/bankMoneyReport/excelReport.action");
            frame.attr("style", "display:none");
            frame.append("</iframe>")
            $("body").append(frame);

        });
    }
});