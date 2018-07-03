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
	});
	
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
            url: ctx + "/graphicReport/registerDeliverTimeOutRecord.action",
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
                    var dThirtyDayDeliver = new Array();//30天已寄出已超时
                    var dThirtyDayDeliverTitle = new Array();
                    var dThirtyDayUnDeliver = new Array();//30天未寄出已超时
                    var dThirtyDayUnDeliverTitle = new Array();
                    var dFortyFiveDayDeliver = new Array();
                    var dFortyFiveDayDeliverTitle = new Array();
                    var dFortyFiveDayUnDeliver = new Array();
                    var dFortyFiveDayUnDeliverTitle = new Array();

                    var dSixtyDayDeliver = new Array();
                    var dSixtyDayDeliverTitle = new Array();
                    var dSixtyDayUnDeliver = new Array();
                    var dSixtyDayUnDeliverTitle = new Array();

                    var dGreaterSixtyDayDeliver = new Array();
                    var dGreaterSixtyDayDeliverTitle = new Array();
                    var dGreaterSixtyDayUnDeliver = new Array();
                    var dGreaterSixtyDayUnDeliverTitle = new Array();

                    for (var k = 0; k < r.length; k++) {
                        var result = r[k];
                        yValue.push(result.title);
                        if (result.sub.length == 0) {
                            dThirtyDayDeliver.push('');
                            dThirtyDayDeliverTitle.push('');
                            dThirtyDayUnDeliver.push('');
                            dThirtyDayUnDeliverTitle.push('');
                            dFortyFiveDayDeliver.push('');
                            dFortyFiveDayDeliverTitle.push('');
                            dFortyFiveDayUnDeliver.push('');
                            dFortyFiveDayUnDeliverTitle.push('');
                            dSixtyDayDeliver.push('');
                            dSixtyDayDeliverTitle.push('');
                            dSixtyDayUnDeliver.push('');
                            dSixtyDayUnDeliverTitle.push('');
                            dGreaterSixtyDayDeliver.push('');
                            dGreaterSixtyDayDeliverTitle.push('');
                            dGreaterSixtyDayUnDeliver.push('');
                            dGreaterSixtyDayUnDeliverTitle.push('');
                        }  else {
                            for (var i = 0; i < result.sub.length; i++) {
                                var chart = result.sub[i];
                                if (chart.dateType == 'thirtyDay' && chart.timeOutDays == 30) {
                                    dThirtyDayDeliver.push(formatRateNum(chart));
                                    dThirtyDayDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'thirtyDay' && chart.timeOutDays == 7) {
                                    dThirtyDayUnDeliver.push(formatRateNum(chart));
                                    dThirtyDayUnDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'fortyFiveDay' && chart.timeOutDays == 30) {
                                    dFortyFiveDayDeliver.push(formatRateNum(chart));
                                    dFortyFiveDayDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'fortyFiveDay' && chart.timeOutDays == 7) {
                                    dFortyFiveDayUnDeliver.push(formatRateNum(chart));
                                    dFortyFiveDayUnDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'sixtyDay' && chart.timeOutDays == 30) {
                                    dSixtyDayDeliver.push(formatRateNum(chart));
                                    dSixtyDayDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'sixtyDay' && chart.timeOutDays == 7) {
                                    dSixtyDayUnDeliver.push(formatRateNum(chart));
                                    dSixtyDayUnDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'greaterSixtyDay' && chart.timeOutDays == 30) {
                                    dGreaterSixtyDayDeliver.push(formatRateNum(chart));
                                    dGreaterSixtyDayDeliverTitle.push(chart.title);
                                } else if (chart.dateType == 'greaterSixtyDay' && chart.timeOutDays == 7) {
                                    dGreaterSixtyDayUnDeliver.push(formatRateNum(chart));
                                    dGreaterSixtyDayUnDeliverTitle.push(chart.title);
                                }
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
                    initRateChart(yValue, dThirtyDayDeliver, dThirtyDayDeliverTitle, dThirtyDayUnDeliver, dThirtyDayUnDeliverTitle,
                        dFortyFiveDayDeliver, dFortyFiveDayDeliverTitle, dFortyFiveDayUnDeliver, dFortyFiveDayUnDeliverTitle,
                        dSixtyDayDeliver, dSixtyDayDeliverTitle, dSixtyDayUnDeliver, dSixtyDayUnDeliverTitle,
                        dGreaterSixtyDayDeliver, dGreaterSixtyDayDeliverTitle, dGreaterSixtyDayUnDeliver, dGreaterSixtyDayUnDeliverTitle);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    function initRateChart(yValue, dThirtyDayDeliver, dThirtyDayDeliverTitle, dThirtyDayUnDeliver, dThirtyDayUnDeliverTitle,
                           dFortyFiveDayDeliver, dFortyFiveDayDeliverTitle, dFortyFiveDayUnDeliver, dFortyFiveDayUnDeliverTitle,
                           dSixtyDayDeliver, dSixtyDayDeliverTitle, dSixtyDayUnDeliver, dSixtyDayUnDeliverTitle,
                           dGreaterSixtyDayDeliver, dGreaterSixtyDayDeliverTitle, dGreaterSixtyDayUnDeliver, dGreaterSixtyDayUnDeliverTitle) {
        var ratio = echarts.init(document.getElementById('bight'));
        option = {
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                formatter: function (params) {
                    var res = '<p>' + params.seriesName + ':' + option.series[params.seriesIndex].trueData[params.dataIndex] + '</p>';
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
                data: ['30天未抵押', '30-45天未抵押', '45-60天未抵押', '超过60天未抵押', '已寄出已超时', '未寄出已超时']
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
                name: '已寄出已超时',
                type: 'bar',
                stack: '1',
                itemStyle: {
                    normal: {
                        color: '#918BF5'
                    }
                },
                tooltip: {
                    show: false
                },
                data: ['']
            }, {
                name: '未寄出已超时',
                type: 'bar',
                stack: '1',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#ff86e1'
                    }
                },
                data: ['']
            }, {
                name: '30天未抵押',
                type: 'bar',
                stack: '1',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#08E6F5'
                    }
                },
                data: ['']
            }, {
                name: '30-45天未抵押',
                type: 'bar',
                stack: '1',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#ffff00'
                    }
                },
                data: ['']
            }, {
                name: '45-60天未抵押',
                type: 'bar',
                stack: '1',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#ff6969'
                    }
                },
                data: ['']
            }, {
                name: '超过60天未抵押',
                type: 'bar',
                stack: '1',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#59f8a8'
                    }
                },
                data: ['']
            }, {
                name: '30天未抵押已寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dThirtyDayDeliverTitle,
                data: dThirtyDayDeliver,
                itemStyle: {
                    normal: {
                        color: "#918BF5",
                        borderColor: '#08E6F5',
                        borderWidth: 3
                    }
                }
            }, {
                name: '30天未抵押未寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dThirtyDayUnDeliverTitle,
                data: dThirtyDayUnDeliver,
                itemStyle: {
                    normal: {
                        color: "#ff86e1",
                        borderColor: '#08E6F5',
                        borderWidth: 3
                    }
                }
            }, {
                name: '30-45天未抵押已寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dFortyFiveDayDeliverTitle,
                data: dFortyFiveDayDeliver,
                itemStyle: {
                    normal: {
                        color: "#918BF5",
                        borderColor: '#ffff00',
                        borderWidth: 3
                    }
                }
            }, {
                name: '30-45天未抵押未寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dFortyFiveDayUnDeliverTitle,
                data: dFortyFiveDayUnDeliver,
                itemStyle: {
                    normal: {
                        color: "#ff86e1",
                        borderColor: '#ffff00',
                        borderWidth: 3
                    }
                }
            }, {
                name: '45-60天未抵押已寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dSixtyDayDeliverTitle,
                data: dSixtyDayDeliver,
                itemStyle: {
                    normal: {
                        color: "#918BF5",
                        borderColor: '#ff6969',
                        borderWidth: 3
                    }
                }
            }, {
                name: '45-60天未抵押未寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dSixtyDayUnDeliverTitle,
                data: dSixtyDayUnDeliver,
                itemStyle: {
                    normal: {
                        color: "#ff86e1",
                        borderColor: '#ff6969',
                        borderWidth: 3
                    }
                }
            }, {
                name: '超过60天未抵押已寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dGreaterSixtyDayDeliverTitle,
                data: dGreaterSixtyDayDeliver,
                itemStyle: {
                    normal: {
                        color: "#918BF5",
                        borderColor: '#59f8a8',
                        borderWidth: 3
                    }
                }
            }, {
                name: '超过60天未抵押未寄出已超时',
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
                            color: '#fafafa'
                        }
                    }
                },
                trueData: dGreaterSixtyDayUnDeliverTitle,
                data: dGreaterSixtyDayUnDeliver,
                itemStyle: {
                    normal: {
                        color: "#ff86e1",
                        borderColor: '#59f8a8',
                        borderWidth: 3
                    }
                }
            }]
        };
        ratio.on('click', function (param) {
            var type = $(".bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
            if (param.seriesType == 'bar') {
                var url = ctx + "/graphicReport/registerDeliverTimeOutList.action?queryType=" + param.seriesName + "&departmentName=" + departmentName + "&name=" + param.name.substring(0, param.name.indexOf('(')) + "&type=" + type;
                openTabForParent(url, "-register-deliver-timeout", param.seriesName + "列表明细");
            } else if ((userlevel == 2 || userlevel == 3) && departmentName == '' && type == 'department') {//公司级别并且是部门切换时才打开
                var name = param.value.substring(0, param.value.indexOf('('));
                var url = ctx + "/graphicReport/registerDeliverTimeOut.action?departmentName=" + name;
                openTabForParent(url, "-register-deliver-timeout", name + "抵押资料超时");
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

