$(document).ready(function () {
    getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"));
    initDepartmentRank();

    function getRank(data) {
        var deparmentArr = [];
        for (var i = 0; i < data.length; i++) {
            var deparmentRank = data[i].departmentRankVOS;
            for (var j = 0; j < deparmentRank.length; j++) {
                deparmentArr.push(deparmentRank[j]);
            }
        }
        deparmentArr.sort(function (a, b) {
            return b.num - a.num
        });
        return deparmentArr
    }

    //部门排名
    function initDepartmentRank() {
        $.ajax({
            url: ctx + "/chartReport/getDepartmentDeliverUnMortgageRank.action",
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var result = getRank(data.rows);
                    $("#rate ul").empty();
                    var html = '';
                    if (result != null && result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            if (i < 3) {
                                html += '<li class="departDetail li-' + i + '" data-departid="' + result[i].departmentId + '">' + result[i].departmentName + '<br>(' + result[i].num + '笔)</li>';
                            } else if (i < 10) {
                                html += '<li class="departDetail li-3" data-departid="' + result[i].departmentId + '">' + result[i].departmentName + '<br>(' + result[i].num + '笔)</li>';
                            } else {
                                break
                            }
                        }
                    } else {
                        html += '<p class="text-center">暂无部门信息</p>';
                    }
                    $("#rate ul").append(html);

                    $(".departDetail").on("click",function () {
                        var departId = $(this).data("departid");
                        var url = ctx + "/deliverUnMortgage/departmentDetail.action?departmentId=" + departId;
                        openTabForParent(url, "-deliver-un-mortgage", "已寄出未抵押列表明细");
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
});

function formetMoney(num) {
    if (num == "0") return "0.00";
    return num / 10000;
}

function getRecord(departmentId, grandId, parentId) {
	var month = new Date().getMonth() + 1;
    $.ajax({
        url: ctx + "/chartReport/unMortgagedRateRecord.action",
        type: "post",
        data: {departmentId: departmentId, grandId: grandId, parentId: parentId},
        dataType: "json",
        success: function (data) {
            if (data.error == 1) {
                var r = data.rows;
                var title = "上牌未抵押率";
                var name = "月份";
                var $x_value = new Array();
                //已垫款未抵押率
                var $mortgageUnSuccessRate = new Array();
                //已放款未抵押率
                var $paymentUnSuccessRate = new Array();
                //已寄出未抵押率
                var $deliverUnMortgageNumRate = new Array();
                var $deliverUnMortgageNum = new Array();
                for(var k in r.unMortgagedRateVOS){
                    $x_value.push(k);
                    $mortgageUnSuccessRate.push(r.unMortgagedRateVOS[k].mortgageUnSuccessRate);
                    $deliverUnMortgageNum.push(r.unMortgagedRateVOS[k].deliverUnMortgageNum);
                    $paymentUnSuccessRate.push(r.unMortgagedRateVOS[k].paymentUnSuccessRate);
                    $deliverUnMortgageNumRate.push(r.unMortgagedRateVOS[k].deliverUnMortgageNumRate);
                }
                //曲线图
                initCategoryChart(title, $x_value, $deliverUnMortgageNum, $mortgageUnSuccessRate, $paymentUnSuccessRate, $deliverUnMortgageNumRate, name);

            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

function initCategoryChart(title, x, $deliverUnMortgageNum, $mortgageUnSuccessRate, $paymentUnSuccessRate, $deliverUnMortgageNumRate, name) {
    var bight = echarts.init(document.getElementById('bight'));
    var option = {
        color: ['#08e6f5', '#ff6969', '#ffff00', '#59f8a8'],
        backgroundColor: 'rgba(39,39,70,0.5)',
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
            right: '1%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            data: [{
                name: '已寄出未抵押笔数',
                icon: 'bar',
                textStyle: {
                    color: '#08e6f5'
                }
            }, {
                name: '已寄出未抵押率',
                icon: 'line',
                textStyle: {
                    color: '#ff6969'
                }
            }, {
                name: '已放款未抵押率',
                icon: 'line',
                textStyle: {
                    color: '#ffff00'
                }
            }, {
                name: '已垫款未抵押率',
                icon: 'line',
                textStyle: {
                    color: '#59f8a8'
                }
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
                name: '(单位:%)',
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
            },
            {
                name: '(单位:笔)',
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
            }
        ],
        series: [{
            name: '已寄出未抵押笔数',
            type: 'bar',
            yAxisIndex: 1,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#08e6f5'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#08e6f5'
                }
            },
            barWidth: '60',//柱图宽度
            data: $deliverUnMortgageNum
        }, {
            name: "已寄出未抵押率",
            type: 'line',
            smooth: true,
            symbolSize: 8,//点的大小
            lineStyle: {
                normal: {
                    width: 3,
                    color: '#ff6969',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#ff6969'
                },
                emphasis: {
                    color: '#ff6969'
                }
            },
            data: $deliverUnMortgageNumRate
        }, {
            name: "已放款未抵押率",
            type: 'line',
            smooth: true,
            symbolSize: 8,//点的大小
            lineStyle: {
                normal: {
                    width: 3,
                    color: '#ffff00',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffff00'
                },
                emphasis: {
                    color: '#ffff00'
                }
            },
            data: $paymentUnSuccessRate
        }, {
            name: "已垫款未抵押率",
            type: 'line',
            smooth: true,
            symbolSize: 8,//点的大小
            lineStyle: {
                normal: {
                    width: 3,
                    color: '#59f8a8',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#59f8a8'
                },
                emphasis: {
                    color: '#59f8a8'
                }
            },
            data: $mortgageUnSuccessRate
        }]
    };
    bight.on('click', function (param) {
        if (param.seriesType == 'bar') {
            var month = param.name;
            var departmentId = $("#departmentId").data("id");
            var grandId = $("#departmentId").data("grandid");
            var parentId = $("#departmentId").data("parentid");
            var url = ctx + "/deliverUnMortgage/list.action?month=" + month + "&departmentId=" + departmentId + "&grandId=" + grandId + "&parentId=" + parentId;
            openTabForParent(url, "-deliver-un-mortgage", "已寄出未抵押列表明细");
        }
    });
    bight.setOption(option,true);
    window.addEventListener("resize", function () {
        bight.resize();
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
    getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"));
    hideMenu();
}
function onBodyDown(event) {
    if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0 )) {
        hideMenu();
    }
}
