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
            url: ctx + "/graphicReport/getDocumentsTheGrand.action",
            type: "post",
            data: {
                groupType: type,
                departmentName: departmentName
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var r = data.rows;
                    var yValue = new Array();
                    var dThirtyDay = new Array();
                    var dThirtyDayTitle = new Array();
                    var dFortyFiveDay = new Array();
                    var dFortyFiveDayTitle = new Array();
                    var dSixtyDay = new Array();
                    var dSixtyDayTitle = new Array();
                    var dGreaterSixtyDay = new Array();
                    var dGreaterSixtyDayTitle = new Array();
                    for (var k = 0; k < r.length; k++) {
                        var result = r[k];
                        yValue.push(result.title);
                        if (result.sub.length == 0) {
                            dThirtyDay.push('');
                            dThirtyDayTitle.push('');
                            dFortyFiveDay.push('');
                            dFortyFiveDayTitle.push('');
                            dSixtyDay.push('');
                            dSixtyDayTitle.push('');
                            dGreaterSixtyDay.push('');
                            dGreaterSixtyDayTitle.push('');
                        }
                        for (var i = 0; i < result.sub.length; i++) {
                            var chart = result.sub[i];
                            if (chart.dateType == 'overtime') {
                                dThirtyDay.push(formatRateNum(chart));
                                dThirtyDayTitle.push(chart.title);
                            } else if (chart.dateType == 'unOvertime') {
                                dFortyFiveDay.push(formatRateNum(chart));
                                dFortyFiveDayTitle.push(chart.title);
                            } else if (chart.dateType == 'submitBank') {
                                dSixtyDay.push(formatRateNum(chart));
                                dSixtyDayTitle.push(chart.title);
                            }else if (chart.dateType == 'bankPayment') {
                                dGreaterSixtyDay.push(formatRateNum(chart));
                                dGreaterSixtyDayTitle.push(chart.title);
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
                    initRateChart(yValue, dThirtyDay, dThirtyDayTitle, dFortyFiveDay, dFortyFiveDayTitle, dSixtyDay, dSixtyDayTitle, dGreaterSixtyDay, dGreaterSixtyDayTitle);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function initRateChart(yValue, dThirtyDay, dThirtyDayTitle, dFortyFiveDay, dFortyFiveDayTitle, dSixtyDay, dSixtyDayTitle, dGreaterSixtyDay, dGreaterSixtyDayTitle) {
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
                data: ['资料不齐全且单证超时', '资料不齐全单证未超时', '资料齐全未送行', '资料齐全且送行未放款']
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
                max: 100,
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
                name: '资料不齐全且单证超时',
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
                trueData: dThirtyDayTitle,
                data: dThirtyDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#08E6F5";
                        }
                    }
                }
            }, {
                name: '资料不齐全单证未超时',
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
                trueData: dFortyFiveDayTitle,
                data: dFortyFiveDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#59f8a8";
                        }
                    }
                }
            }, {
                name: '资料齐全未送行',
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
                trueData: dSixtyDayTitle,
                data: dSixtyDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ffff00";
                        }
                    }
                }
            }, {
                name: '资料齐全且送行未放款',
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
                trueData: dGreaterSixtyDayTitle,
                data: dGreaterSixtyDay,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ff6969";
                        }
                    }
                }
            }]
        };
        ratio.on('click', function (param) {
            var type = $(".bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
            if (param.seriesType == 'bar') {
                var url = ctx + "/graphicReport/getDocumentsTheGrandList.action?queryType=" + param.seriesName + "&departmentName=" + departmentName + "&name=" + param.name.substring(0, param.name.indexOf('(')) + "&type=" + type;
                openTabForParent(url, "-register-deliver", param.seriesName + "列表明细");
            } else if ((userlevel == 2 || userlevel == 3) && departmentName == '' && type == 'department') {//公司级别并且是部门切换时才打开
                var name = param.value.substring(0, param.value.indexOf('('));
                var url = ctx + "/graphicReport/documentsTheGrand.action?departmentName=" + name;
                openTabForParent(url, "-register-deliver", name + "单证战报");
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
    
    function formatRateNum(chart) {
        return chart.rateNum == null ? '' : chart.rateNum;
    }
});
