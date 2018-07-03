var type = "month";
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var today = now.getDate();
$(document).ready(function () {
    var config = {
        disable_search_threshold: 8,
        no_results_text: '无数据',
        width: '170px'
    };
    $("#year").chosen(config);
    $("#bankId").chosen(config);

    getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, year + '-' + month, $("#bankId").val());
    initDepartmentRank(type, year + '-' + month, $("#bankId").val());

    showDateType(type);
    $("#year").on('change', function (e, param) {
        getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, param["selected"], $("#bankId").val());
        initDepartmentRank(type, param["selected"], $("#bankId").val());
    });
    $("#bankId").on("change", function (e, param) {
        getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, $("#year").val(), param["selected"]);
        initDepartmentRank(type, $("#year").val(), param["selected"]);
    });

    function showDateType(type) {
        year = new Date().getFullYear();
        month = new Date().getMonth() + 1;
        var timeHtml = ''
        if (type == 'year') {
            for (var i = 0; i < 10; i++) {
                year--
                timeHtml += '<option value="' + (year + 1) + '">' + (year + 1) + '年</option>';
            }
        } else {
            if (month < 12) {
                var resMotnth = 12 - month;
                for (; month > 0; month--) {
                    timeHtml += '<option value="' + year + '-' + month + '">' + year + '年' + month + '月</option>';
                }
                for (var i = 0; i < resMotnth; i++) {
                    timeHtml += '<option value="' + (year - 1) + '-' + (12 - i) + '">' + (year - 1) + '年' + (12 - i) + '月</option>';
                }
            } else {
                for (; month > 0; month--) {
                    timeHtml += '<option value="' + year + '-' + month + '">' + year + '年' + month + '月</option>';
                }
            }
        }
        $("#year").empty().append(timeHtml).trigger('chosen:updated');
    }

    //日期切换事件
    $("#date").bootstrapSwitch({
        onText: '月',
        offText: '年',
        labelText: '年',
        onColor: "info",
        offColor: "info",
        onSwitchChange: function (e, state) {
            if (state == true) {
                type = "month";
                $(".bootstrap-switch-label").text('年');
            } else {
                type = "year";
                $(".bootstrap-switch-label").text('月');
            }
            showDateType(type);
            initDepartmentRank(type, $("#year").val(), $("#bankId").val());
            getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, $("#year").val(), $("#bankId").val());
        }
    });
    //部门排名
    function initDepartmentRank(type, dateTime, bankId) {
        $(".rank-content").empty();
        var title = "本年部门资金周转次数统计(次)";
        var html = '<h3>本年部门资金周转排名</h3>';
        if (type == "month") {
            html = '<h3>本月部门资金周转排名</h3>';
            title = "本月部门资金周转次数统计(次)";
        }
        $.ajax({
            url: ctx + "/chartReport/getDepartmentRank.action",
            type: "post",
            data: {type: type, dateTime: dateTime, bankId: bankId, queryType: "financialRate"},
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var result = data.rows;
                    var x = new Array();
                    var y = new Array();
                    var ranks = [];
                    if (result != null && result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            x.push(result[i].departmentName);
                            y.push(result[i].rateNum);
                            if (ranks.length < 1) {
                                ranks = result[i].departmentRankVOS;
                            }
                        }
                        if (ranks.length > 0) {
                            var resNum = ranks.length > 3 ? 3 : ranks.length;
                            if (ranks.length > 3) {
                                html += '<div class="col-sm-6"><h2 style="color:#ff6969;">资金周转前三名</span></h2>';
                            } else {
                                html += '<div class="col-sm-12"><h2 style="width:25%;color:#ff6969;">资金周转前三名</span></h2>';
                            }
                            html += '<div class="rank-con">';
                            for (var i = 0; i < resNum; i++) {
                                html += '<div class="rank-item rank-item-' + (3 - i) + ' b-1"><p><span class="num">' + (i + 1) + '</span><br><span class="department">' + ranks[i].departmentName + '</span>' +
                                    '<span class="money">资金周转次数:' + ranks[i].rateNum + '次</p></div>';
                            }
                            if (ranks.length > 3) {
                                html += '</div></div><div class="col-sm-6"><h2 style="color:#08e6f5;">资金周转后三名</span></h2>';
                                html += '<div class="rank-con">';
                                resNum = ranks.length - 3 > 3 ? 3 : ranks.length - 3;
                                for (var j = 0; j < resNum; j++) {
                                    html += '<div class="rank-item rank-item-0 b-1"><p><span class="num">' + (j + 1) + '</span><br><span class="department">' + ranks[ranks.length - j - 1].departmentName + '</span>' +
                                        '<span class="money">资金周转次数:' + ranks[ranks.length - j - 1].rateNum + '次</p></div>';
                                }
                            }
                            html += '</div></div>';
                        } else {
                            html += '<p class="text-center">暂无数据</p>';
                        }
                    } else {
                        html += '<p class="text-center">暂无部门信息</p>';
                    }
                    $(".rank-content").append(html);
                    initBarChart(title, x, y);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            },
            error: function () {
                html += '<p class="text-center">暂无数据</p>';
                $(".rank-content").append(html);
            }
        });
    }
});

function formetMoney(num) {
    if (num == "0") return "0.00";
    return num / 10000;
}
function getWorkday(y, m) {
    var tempTime = new Date(y, m, 0);
    var workday = new Array();
    for (var i = 1; i <= tempTime.getDate(); i++) {
        now.setFullYear(y, m - 1, i);
        var day = now.getDay();
        if (day != 6 && day != 0) {
            workday.push(i);
        }
    }
    return workday
}

function getRecord(departmentId, grandId, parentId, type, dateTime, bankId) {
    var selectYear, selectMonth;
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    if (type == 'year') {
        selectYear = dateTime;
        selectMonth = new Date().getMonth() + 1;
    } else {
        var date = dateTime.split('-')
        selectYear = date[0];
        selectMonth = date[1];
    }
    $.ajax({
        url: ctx + "/chartReport/getRecord.action",
        type: "post",
        data: {
            departmentId: departmentId,
            grandId: grandId,
            parentId: parentId,
            type: type,
            dateTime: dateTime,
            chartType: 'financialRate',
            bankId: bankId
        },
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                var r = data.rows;
                $(".total").empty();
                var html = '<div class="total-item b-1 financial-rate"><p>累计垫款贷款额(万元)</p><h2>' + NumberFormatUtil.fmoney(formetMoney(r.dayCompanyAdvanceMoney), 2) + '</h2></div>';
                html += '<div class="total-item b-1 financial-rate"><p>累计放款金额(万元)</p><h2>' + NumberFormatUtil.fmoney(formetMoney(r.dayBankPaymentLoanMoney), 2) + '</h2></div>';
                html += '<div class="total-item b-1 financial-rate"><p>累计财务打款未放款金额(万元)</p><h2>' + NumberFormatUtil.fmoney(formetMoney(r.actualLoadMoney), 2) + '</h2></div>';
                $(".total").append(html);
                var title = "资金周转次数";
                var name = "月份";
                var $x_value = new Array();
                var $y_num = new Array();
                var $y_value = new Array();
                var reteNum = null;
                var actualLoadMoney = null;
                if (type == "month") {
                    total_tile = "本月部门资金周转次数统计(次)";
                    name = "日期";
                    var day = getWorkday(selectYear, selectMonth);
                    for (var i = 0; i < day.length; i++) {
                        $x_value.push(day[i]);
                        if (selectYear == year && selectMonth == month) {
                            if (day[i] <= today) {
                                reteNum = r.chartRateVOMap[day[i]] == undefined ? 0 : r.chartRateVOMap[day[i]].rateNum;
                                actualLoadMoney = r.chartRateVOMap[day[i]] == undefined || r.chartRateVOMap[day[i]].actualLoadMoney == 0 ? null : r.chartRateVOMap[day[i]].actualLoadMoney;
                            } else {
                                reteNum = '-';
                                actualLoadMoney = null;
                            }
                        } else {
                            reteNum = r.chartRateVOMap[day[i]] == undefined ? 0 : r.chartRateVOMap[day[i]].rateNum;
                            actualLoadMoney = r.chartRateVOMap[day[i]] == undefined || r.chartRateVOMap[day[i]].actualLoadMoney == 0 ? null : r.chartRateVOMap[day[i]].actualLoadMoney;
                        }
                        $y_num.push(reteNum);
                        $y_value.push(actualLoadMoney);
                    }
                } else {
                    for (var i = 1; i <= 12; i++) {
                        $x_value.push(i);
                        if (selectYear == year) {
                            if (i <= month) {
                                reteNum = r.chartRateVOMap[i] == undefined ? 0 : r.chartRateVOMap[i].rateNum;
                                actualLoadMoney = r.chartRateVOMap[i] == undefined || r.chartRateVOMap[i].actualLoadMoney == 0 ? null : r.chartRateVOMap[i].actualLoadMoney;
                            } else {
                                reteNum = '-';
                                actualLoadMoney = null;
                            }
                        } else {
                            reteNum = r.chartRateVOMap[i] == undefined ? 0 : r.chartRateVOMap[i].rateNum;
                            actualLoadMoney = r.chartRateVOMap[i] == undefined || r.chartRateVOMap[i].actualLoadMoney == 0 ? null : r.chartRateVOMap[i].actualLoadMoney;
                        }
                        $y_num.push(reteNum);
                        $y_value.push(actualLoadMoney);
                    }
                }
                if (type == "year") {
                    initCategoryChart(title, $x_value, $y_num, $y_value, name);
                } else {
                    initCategoryUnRateChart(title, $x_value, $y_value, name)
                }

                $(".financial-rate").on("click", function () {
                    var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
                    var dateTime = $("#year").val();
                    var bankId = $("#bankId").val();
                    var url = ctx + "/financialRate/list.action?bankId=" + bankId + "&type=" + type + "&dateTime=" + dateTime;
                    openTabForParent(url, "-financial-rate", "资金周转列表明细");
                });
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//曲线分析
function initCategoryUnRateChart(title, x, y_value, name) {
    var bight = echarts.init(document.getElementById('bight'));
    var option = {
        backgroundColor: 'rgba(39,39,70,0.5)',
        color: ['#C0C0C0'],
        title: {
            text: title,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color: 'rgb(138,138,192)'
            },
            left: '1%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        grid: {
            left: '1%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            data: [{
                name: '未放款垫付金额',
                icon: 'bar',
                textStyle: {color: 'rgb(138,138,192)'}
            }]
        },
        xAxis: [{
            type: 'category',
            name: name,//X轴标题
            boundaryGap: true,//false时X轴从0开始
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                textStyle: {
                    color: 'rgb(138,138,192)',
                    fontSize: 14
                }
            },
            data: x
        }],
        yAxis: [
            {
                name: '(万元)',
                type: 'value',
                position: 'right',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(82,82,120,0.5)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                }
            }
        ],
        series: [{
            name: '未放款垫付金额',
            type: 'bar',
            smooth: true,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    distance: 15,
                    rotate: 45,
                    textStyle: {
                        color: '#08e6f5'
                    }
                }
            },
            data: y_value,
            itemStyle: {
                normal: {
                    color: '#08e6f5'
                }
            }
        }]
    };
    bight.on('click', function (param) {
        if (param.seriesType == 'bar') {
            var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
            var dateTime = $("#year").val();
            var bankId = $("#bankId").val();
            var url = ctx + "/financialRate/list.action?bankId=" + bankId + "&type=" + type + "&dateTime=" + dateTime + "-" + param.name + "&source=bar";
            openTabForParent(url, "-financial-rate", "资金周转列表明细");
        }
    });
    bight.setOption(option, true);
    window.addEventListener("resize", function () {
        bight.resize();
    });
}

function initCategoryChart(title, x, y_num, y_value, name) {
    var bight = echarts.init(document.getElementById('bight'));
    var option = {
        backgroundColor: 'rgba(39,39,70,0.5)',
        color: ['#C0C0C0'],
        title: {
            text: title,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color: 'rgb(138,138,192)'
            },
            left: '1%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        grid: {
            left: '1%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            data: [{
                name: '资金周转次数',
                icon: 'line',
                textStyle: {color: 'rgb(138,138,192)'},
            }, {
                name: '未放款垫付金额',
                icon: 'bar',
                textStyle: {color: 'rgb(138,138,192)'},
            }]
        },
        xAxis: [{
            type: 'category',
            name: name,//X轴标题
            boundaryGap: true,//false时X轴从0开始
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                textStyle: {
                    color: 'rgb(138,138,192)',
                    fontSize: 14
                }
            },
            data: x
        }],
        yAxis: [
            {
                name: '(次/月)',
                type: 'value',
                position: 'left',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(82,82,120,0.5)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                }
            },
            {
                name: '(万元)',
                type: 'value',
                position: 'right',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(82,82,120,0.5)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                }
            }
        ],
        series: [{
            name: "资金周转次数",
            type: 'line',
            smooth: true,
            symbolSize: 8,//点的大小
            /*label: {
             normal: {
             show: true,
             position: 'top',
             }
             },
             lineStyle: {
             normal: {
             width: 3,
             color: '#00FF00',
             shadowBlur: 10
             }
             },*/
            itemStyle: {
                normal: {
                    color: '#FFFF00',
                    lineStyle: {
                        color: '#ffff00'
                    }
                },
                emphasis: {
                    color: '#000000'
                }
            },
            data: y_num
            /*markPoint: {
             label: {
             normal: {
             show:true,
             color:'#000000'
             },
             emphasis: {
             show:true,
             color:'#FF00FF'
             }
             },
             data: [{
             type: 'max',
             name: '最大值'
             }]
             }*/
        }, {
            name: '未放款垫付金额',
            type: 'bar',
            smooth: true,
            yAxisIndex: 1,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    distance: 15,
                    rotate: 45,
                    textStyle: {
                        color: '#08e6f5'
                    }
                }
            },
            data: y_value,
            itemStyle: {
                normal: {
                    color: '#08e6f5'
                }
            }
        }]
    };
    bight.on('click', function (param) {
        if (param.seriesType == 'bar') {
            var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
            var dateTime = $("#year").val();
            var bankId = $("#bankId").val();
            var url = ctx + "/financialRate/list.action?bankId=" + bankId + "&type=" + type + "&dateTime=" + dateTime + "-" + param.name + "&source=bar";
            openTabForParent(url, "-financial-rate", "资金周转列表明细");
        }
    });
    bight.setOption(option, true);
    window.addEventListener("resize", function () {
        bight.resize();
    });
}

function initBarChart(title, x, y) {
    var ratio = echarts.init(document.getElementById('rate'));
    var option = {
        backgroundColor: 'rgba(39,39,70,0.5)',
        title: {
            text: title,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color: 'rgb(138,138,192)'
            },
            left: '30%',
            top: '20px'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [
            {
                type: 'category',
                data: x,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate:40,
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(82,82,120,0.5)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                }
            }
        ],
        series: [{
            name: '资金周转次数',
            smooth: true,
            barWidth: '20%',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: y,
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            "#ff6969", "#ffff00", "#00FFFF", "#59f8a8", "#C0C0C0",
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }]
    }
    ratio.on('click', function (param) {
        if (param.seriesType == 'bar') {
            var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
            var dateTime = $("#year").val();
            var bankId = $("#bankId").val();
            var departName = param.name;
            var url = ctx + "/financialRate/listDepart.action?bankId=" + bankId + "&type=" + type + "&dateTime=" + dateTime + "&departName=" + departName;
            openTabForParent(url, "-depart-financial-rate", "部门资金周转列表明细");
        }
    });
    ratio.setOption(option, true);
    window.addEventListener("resize", function () {
        ratio.resize();
    });
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
        onClick: showDeparment
    }
};
function selectDepartment(width) {
    $("#menuContent").css({
        "background": "#1c1c38",
        "overflow": "auto",
        "z-index": 999,
        "top": "40px",
        "width": "179px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    var id = $(this).data("id");
    $.ajax({
        url: ctx + "/department/departmentTree.action",
        data: {ids: id},
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

function hideMenu() {
    $("#menuContent").fadeOut("fast");
}

function showDeparment(event, treeId, treeNode) {
    $("#departmentId").data("id", treeNode.id);
    $("#departmentId").data("grandid", treeNode.grandId);
    $("#departmentId").data("parentid", treeNode.parentId);
    $("#departmentId").val(treeNode.name);
    getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, $("#year").val());
    hideMenu();
}

function onBodyDown(event) {
    if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0 )) {
        hideMenu();
    }
}


