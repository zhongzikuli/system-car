$(document).ready(function () {
	$(".nav_mark").hover(function (e) {
		var top  = $(this).offset().top;
		var left = $(this).offset().left;
		$(".tip-box").css({
			 'display':'block',
			 'position': 'absolute',
			 'top': top -10,
             'left': left +50,
		})
	},function(e){
		$(".tip-box").css({
			 'display':'none'
		})
	})
	
	 var type=null;
	 var departmentName = $("#bight").data("departmentname");
	 if(departmentName){
		 type = "department";
		 initType("department", "bank", "#searchType", "部门", "银行", departmentName)
	 }else{
		 type = "bank";
		 initType("bank", "department", "#searchType", "银行", "部门", departmentName)
	 }
	 
	//部门银行切换事件
	 function initType(type1, type2, dom, onText,offText, departmentName){
		 $(dom).bootstrapSwitch({
		        onText: onText,
		        offText:offText,
		        labelText:offText,
		        onColor: "info",
		        offColor: "info",
		        onSwitchChange: function (e, state) {
		            if (state == true) {
		                type = type1;
		                $(".bootstrap-switch-label").text(offText);
		            } else {
		                type = type2;
		                $(".bootstrap-switch-label").text(onText);
		            }
		            getRecord(type, departmentName);
		        }
		   });
	 }
	 
    var userlevel = $("#bight").data("userlevel");
   
    getRecord(type, departmentName);
    
    function getRecord(type, departmentName) {
        $.ajax({
            url: ctx + "/graphicReport/unBankPaymentRecord.action",
            type: "post",
            data: {
                type: type,
                departmentName: departmentName
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var r = data.rows;
                    var yValue = new Array();
                    var dFiveDay = new Array();
                    var dFiveDayTitle = new Array();
                    var dTenDay = new Array();
                    var dTenDayTitle = new Array();
                    var dFifteenDay = new Array();
                    var dFifteenDayTitle = new Array();
                    var dTwentyDay = new Array();
                    var dTwentyDayTitle = new Array();
                    var dTwentyFiveDay = new Array();
                    var dTwentyFiveDayTitle = new Array();
                    var dThirtyDay = new Array();
                    var dThirtyDayTitle = new Array();
                    var dGreaterThirtyDay = new Array();
                    var dGreaterThirtyDayTitle = new Array();

                    for (var k = 0; k < r.length; k++) {
                        var result = r[k];
                        yValue.push(result.title);
                        if (result.sub.length == 0) {
                            dFiveDay.push('');
                            dFiveDayTitle.push('');
                            dTenDay.push('');
                            dTenDayTitle.push('');
                            dFifteenDay.push('');
                            dFifteenDayTitle.push('');
                            dTwentyDay.push('');
                            dTwentyDayTitle.push('');
                            dTwentyFiveDay.push('');
                            dTwentyFiveDayTitle.push('');
                            dThirtyDay.push('');
                            dThirtyDayTitle.push('');
                            dGreaterThirtyDay.push('');
                            dGreaterThirtyDayTitle.push('');
                        }
                        for (var i = 0; i < result.sub.length; i++) {
                            var chart = result.sub[i];
                            if (chart.dateType == 'fiveDay') {
                                dFiveDay.push(formatRateNum(chart));
                                dFiveDayTitle.push(chart.title);
                            } else if (chart.dateType == 'tenDay') {
                                dTenDay.push(formatRateNum(chart));
                                dTenDayTitle.push(chart.title);
                            } else if (chart.dateType == 'fifteenDay') {
                                dFifteenDay.push(formatRateNum(chart));
                                dFifteenDayTitle.push(chart.title);
                            } else if (chart.dateType == 'twentyDay') {
                                dTwentyDay.push(formatRateNum(chart));
                                dTwentyDayTitle.push(chart.title);
                            } else if (chart.dateType == 'twentyFiveDay') {
                                dTwentyFiveDay.push(formatRateNum(chart));
                                dTwentyFiveDayTitle.push(chart.title);
                            } else if (chart.dateType == 'thirtyDay') {
                                dThirtyDay.push(formatRateNum(chart));
                                dThirtyDayTitle.push(chart.title);
                            } else if (chart.dateType == 'greaterThirtyDay') {
                                dGreaterThirtyDay.push(formatRateNum(chart));
                                dGreaterThirtyDayTitle.push(chart.title);
                            }
                        }
                    }
                    if (yValue.length < 10) {
                        $("#bight").height(700)
                    } else if (yValue.length < 15 && yValue.length >= 10) {
                        $("#bight").height(1000)
                    } else if (yValue.length < 20 && yValue.length >= 15) {
                        $("#bight").height(1200)
                    } else if (yValue.length < 25 && yValue.length >= 20) {
                        $("#bight").height(1400)
                    } else if (yValue.length < 30 && yValue.length >= 25) {
                        $("#bight").height(1600)
                    }else if (yValue.length < 35 && yValue.length >= 30) {
                        $("#bight").height(1800)
                    }else if (yValue.length < 40 && yValue.length >= 35) {
                        $("#bight").height(2000)
                    }else if (yValue.length < 45&& yValue.length >= 40 ) {
                        $("#bight").height(2200)
                    }else if (yValue.length < 50 && yValue.length >= 45) {
                        $("#bight").height(2400)
                    }
                    initRateChart(yValue, dFiveDay, dFiveDayTitle, dTenDay, dTenDayTitle,
                        dFifteenDay, dFifteenDayTitle, dTwentyDay, dTwentyDayTitle,
                        dTwentyFiveDay, dTwentyFiveDayTitle, dThirtyDay, dThirtyDayTitle, dGreaterThirtyDay, dGreaterThirtyDayTitle);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function initRateChart(yValue, dFiveDay, dFiveDayTitle, dTenDay, dTenDayTitle,
                           dFifteenDay, dFifteenDayTitle, dTwentyDay, dTwentyDayTitle,
                           dTwentyFiveDay, dTwentyFiveDayTitle, dThirtyDay, dThirtyDayTitle, dGreaterThirtyDay, dGreaterThirtyDayTitle) {
        var ratio = echarts.init(document.getElementById('bight'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                formatter: function (params) {
                    var res = '<p>' + params[0].name + '</p>';
                    for (var i = 0; i < params.length; i++) {
                        res += '<p>' + params[i].seriesName + ':' + option.series[i].trueData[params[i].dataIndex] + '</p>';
                    }
                    return res;
                }
            },
            grid: {
                left: '0',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                itemHeight: 14,
                itemWidth: 14,
                selectedMode: false,
                textStyle: {color: 'rgb(138,138,192)'},
                data: ['5天未放贷', '5-10天未放贷', '10-15天未放贷', '15-20天未放贷', '20-25天未放贷', '25-30天未放贷', '超过30天未放贷']
            },
            xAxis: [{
                show: false,
                type: 'value'
            }, {
                type: 'value',
                axisLabel: {
                    color: 'rgb(138,138,192)',
                    formatter: '{value} %'
                },
                min: 0,
                interval: 10,
                max: 100
            }],
            yAxis: {
                type: 'category',
                axisTick: {
                    show: false //隐藏Y轴刻度
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                },
                data: yValue,
                triggerEvent: true
            },
            series: [{
                name: '5天未放贷',
                type: 'bar',
                barWidth: 40,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dFiveDayTitle,
                data: dFiveDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#08E6F5";
                        }
                    }
                }
            }, {
                name: '5-10天未放贷',
                type: 'bar',
                barWidth: 45,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dTenDayTitle,
                data: dTenDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ffff00";
                        }
                    }
                }
            }, {
                name: '10-15天未放贷',
                type: 'bar',
                barWidth: 45,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dFifteenDayTitle,
                data: dFifteenDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ff6969";
                        }
                    }
                }
            }, {
                name: '15-20天未放贷',
                type: 'bar',
                barWidth: 45,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dTwentyDayTitle,
                data: dTwentyDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#59f8a8";
                        }
                    }
                }
            }, {
                name: '20-25天未放贷',
                type: 'bar',
                barWidth: 45,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dTwentyFiveDayTitle,
                data: dTwentyFiveDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ffc26b";
                        }
                    }
                }
            }, {
                name: '25-30天未放贷',
                type: 'bar',
                barWidth: 45,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dThirtyDayTitle,
                data: dThirtyDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#7c6eff";
                        }
                    }
                }
            }, {
                name: '超过30天未放贷',
                type: 'bar',
                barWidth: 45,
                stack: '1',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: function (p) {
                            var title = option.series[p.seriesIndex].trueData[p.dataIndex];
                            if (title.length > p.data) {
                                return title.substring(0, p.data);
                            }
                            return title;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                trueData: dGreaterThirtyDayTitle,
                data: dGreaterThirtyDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ff86e1";
                        }
                    }
                }
            }]
        };
        ratio.on('click', function (param) {
            var type = $(".bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
            if (param.seriesType == 'bar') {
                var url = ctx + "/graphicReport/unBankPaymentList.action?queryType=" + param.seriesName + "&departmentName=" + departmentName + "&name=" + param.name.substring(0, param.name.indexOf('(')) + "&type=" + type;
                openTabForParent(url, "-un-bank-payment", param.seriesName + "列表明细");
            } else if ((userlevel == 2 || userlevel == 3) && departmentName == '' && type == 'department') {//公司级别并且是部门切换时才打开
                var name = param.value.substring(0, param.value.indexOf('('));
                var url = ctx + "/graphicReport/unBankPayment.action?departmentName=" + name;
                openTabForParent(url, "-un-bank-payment", name + "战报");
            }
        });
        ratio.setOption(option, true);
        ratioResize();
        function ratioResize() {
            ratio.resize();
        }

        window.addEventListener("resize", function () {
            ratio.resize();
        });
    }
});

function formatRateNum(chart) {
    return chart.rateNum == null ? '' : chart.rateNum;
}