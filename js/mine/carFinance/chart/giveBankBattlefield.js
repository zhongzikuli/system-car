var type = "month";
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var today = now.getDate();
$(document).ready(function () {
    $(".nav_mark").hover(function (e) {
        var top = $(this).offset().top;
        var left = $(this).offset().left;
        $(".tip-box").css({
            'display': 'block',
            'position': 'absolute',
            'top': top - 10,
            'left': left + 50,
        })
    }, function (e) {
        $(".tip-box").css({
            'display': 'none'
        })
    })
    
    var groupType=null;
    var departmentName = $("#bight").data("departmentname");
    if(departmentName){
    	 groupType = "department";
		 initType("department", "bank", "group", "部门", "银行", departmentName)
	 }else{
		 groupType = "bank";
		 initType("bank", "department", "group", "银行", "部门", departmentName)
	 }
    
    var dateTime = $("#bight").data("datetime");
    if (dateTime != '' && dateTime != undefined) {
        getRecord(type, dateTime, groupType, departmentName);
    } else {
        getRecord(type, year + '-' + month, groupType, departmentName);
    }
    var userlevel = $("#bight").data("userlevel");
    
    var config = {
        disable_search_threshold: 8,
        no_results_text: '无数据',
        width: '170px'
    };
    $("#month").chosen(config).on('change', function (e, param) {
        groupType = $(".bootstrap-switch-id-group .bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
        getRecord(type, param["selected"], groupType, departmentName);
    });
    
    //部门银行切换事件
	 function initType(groupType1, groupType2, dom, onText,offText, departmentName){
		 $("#"+dom).bootstrapSwitch({
		        onText: onText,
		        offText:offText,
		        labelText:offText,
		        onColor: "info",
		        offColor: "info",
		        onSwitchChange: function (e, state) {
		            if (state == true) {
		            	groupType = groupType1;
		            	$(".bootstrap-switch-id-"+dom).find(".bootstrap-switch-label").text(offText);
		            } else {
		            	groupType = groupType2;
		            	$(".bootstrap-switch-id-"+dom).find(".bootstrap-switch-label").text(onText);
		            }
		            if (type == 'month') {
		                getRecord(type, $("#month").val(), groupType, departmentName);
		            } else {
		                getRecord(type, $("#day").val(), groupType, departmentName);
		            }
		        }
		   });
	 }
	 
    $("#day").on("click", function () {
        laydate({
            format: 'YYYY-MM-DD',
            min: '1970-01-01', //设定最小日期为当前日期
            max: laydate.now(), //最大日期
            istoday: false, //显示今天
            issure: true, //确定框
            isclear: false,
            istime: false,
            start: laydate.now(),
            choose: function (datas) {
                if (datas != '') {
                    groupType = $(".bootstrap-switch-id-group .bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
                    getRecord(type, datas, groupType, departmentName);
                }
            },
        });
    });

    function showDateType(type, date) {
        if (type == 'day') {
        	$("#month_chosen").hide();
            $("#day").show().val(date);
        } else {
            var timeHtml = '';
            year = new Date().getFullYear();
            month = new Date().getMonth() + 1;
            $("#day").hide();
            $("#month_chosen").show();
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
            $("#month").empty().append(timeHtml).val(date).trigger('chosen:updated');
        }       
    }   

    $("#date").bootstrapSwitch({
        onText: '月',
        offText: '日',
        labelText: '日',
        onColor: "info",
        offColor: "info",
        onSwitchChange: function (e, state) {
            if (state == true) {
                type = "month";
                $(".bootstrap-switch-id-date .bootstrap-switch-label").text('日');
                groupType = $(".bootstrap-switch-id-group .bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
                getRecord(type, $("#month").val(), groupType, departmentName);             
            } else {
                type = "day";
                month = new Date().getMonth();
                $(".bootstrap-switch-id-date .bootstrap-switch-label").text('月');
                var now = year + '-' + (month + 1) + '-' + today;
                $("#day").val(now);
                groupType = $(".bootstrap-switch-id-group .bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
                getRecord(type, now, groupType, departmentName);
            }
        }
    });

    function getRecord(type, dateTime, groupType, departmentName) {    	
        showDateType(type, dateTime);
        $.ajax({
            url: ctx + "/graphicReport/getGiveBank.action",
            type: "post",
            data: {type: type, dateTime: dateTime, groupType: groupType, departmentName: departmentName},
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var r = data.rows;
                    var title = "笔数";
                    var name = "银行";
                    var $x_value = new Array(); // 表头
                    var $y_point = new Array();//放款笔数
                    var $y_value = new Array(); //送交合同笔数
                    var $a_value = new Array(); //放款金额
                    var $b_value = new Array();//送交合同金额
                    if (groupType == "bank") {
                        for (var i = 0; i < r.length; i++) {
                            $x_value.push(r[i].departmentName);
                            $y_value.push(r[i].giveBankNum);
                            $b_value.push(r[i].giveBankMoney);
                            $y_point.push(r[i].bankPaymentNum);
                            $a_value.push(r[i].bankPaymentMoney);
                        }
                    } else {
                        name = "部门";
                        for (var i = 0; i < r.length; i++) {
                            $x_value.push(r[i].departmentName);
                            $y_value.push(r[i].giveBankNum);
                            $b_value.push(r[i].giveBankMoney);
                            $y_point.push(r[i].bankPaymentNum);
                            $a_value.push(r[i].bankPaymentMoney);
                        }
                    }
                    var w = 50;
                    if ($x_value.length < 5) {
                        w = 50
                    } else if ($x_value.length < 5 && r.length >= 8) {
                        w = 25
                    } else if ($x_value.length < 8 && r.length >= 10) {
                        w = 15
                    } else if ($x_value.length < 10 && r.length >= 12) {
                        w = 8
                    } else if ($x_value.length >= 12) {
                        w = 5
                    }
                    //曲线图
                    initCategoryChart(title, $x_value, $y_point, $y_value, $a_value, $b_value, name, w, dateTime);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    //曲线分析
    function initCategoryChart(title, x, y, y_value, a, b, name, w, dateTime) {
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
                    name: '放款金额',
                    icon: 'bar',
                    textStyle: {
                        color: '#08e6f5'
                    }
                }, {
                    name: '送交合同金额',
                    icon: 'bar',
                    textStyle: {
                        color: '#ff6969'
                    }
                }, {
                    name: '放款笔数',
                    icon: 'line',
                    textStyle: {
                        color: '#ffff00'
                    }
                }, {
                    name: '送交合同笔数',
                    icon: 'line',
                    textStyle: {
                        color: '#59f8a8'
                    }
                }]
            },
            xAxis: [{
                type: 'category',
                name: name,
                boundaryGap: true,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate: -45,
                    textStyle: {
                        color: 'rgb(138,138,192)',
                        fontSize: 14
                    }
                },
                triggerEvent: true,
                data: x,
                splitLine: {show: false},

            }],
            yAxis: [
                {
                    type: 'value',
                    name: '金额',
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
                    //offset: 80,
                    axisLabel: {
                        margin: 5,
                        formatter: '{value}万元',
                        textStyle: {
                            color: 'rgb(138,138,192)',
                            fontSize: 14
                        }
                    }
                }, {
                    type: 'value',
                    name: '笔数',
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 5,
                        formatter: '{value}',
                        textStyle: {
                            color: 'rgb(138,138,192)',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(82,82,120,0.5)'
                        }
                    }
                }
            ],
            series: [{
                name: '放款金额',
                type: 'bar',

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
                barWidth: w,//柱图宽度
                data: a
            }, {
                name: '送交合同金额',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#ff6969',
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ff6969',
                    }
                },
                barWidth: w,//柱图宽度
                data: b
            }, {
                name: "放款笔数",
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
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
                data: y
            }, {
                name: '送交合同笔数',
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
                symbolSize: 8,//点的大小
                lineStyle: {
                    normal: {
                        width: 3,
                        color: '#59f8a8',
                        shadowBlur: 10
                    }
                },
                data: y_value,
                itemStyle: {
                    normal: {
                        color: '#59f8a8'
                    },
                    emphasis: {
                        color: '#59f8a8'
                    }
                }
            }]
        };
        bight.on('click', function (param) {
            var groupType = $(".bootstrap-switch-id-group .bootstrap-switch-label").text() == '部门' ? 'bank' : 'department';
            var type = $(".bootstrap-switch-id-date .bootstrap-switch-label").text() == '月' ? 'day' : 'month';
            var dateTime;
            if (type == 'day') {
                dateTime = $("#day").val();
            } else {
                dateTime = $("#month").val();
            }

            if (param.seriesType == 'bar') {
                var url = ctx + "/graphicReport/giveBankList.action?queryType=" + param.seriesName + "&departmentName=" + departmentName + "&name=" + param.name + "&type=" + groupType
                    + "&groupType=" + type + "&dateTime=" + dateTime;
                openTabForParent(url, "-register-deliver", param.seriesName + "列表明细");
            }
            if(param.componentType == 'xAxis') {
                if ((userlevel == 2 || userlevel == 3) && departmentName == '' && groupType == 'department') {//公司级别并且是部门切换时才打开
                    var name = param.value;
                    var url = ctx + "/graphicReport/giveBankBattlefield.action?departmentName=" + name + "&type=" + groupType
                        + "&groupType=" + type + "&dateTime=" + dateTime;
                    openTabForParent(url, "-register-deliver", name + "每日每月送行");
                }
            }
        });
        bight.setOption(option, true);
        ratioResize();

        function ratioResize() {
            bight.resize();
        }

        window.addEventListener("resize", function () {
            bight.resize();
        });
    }
});
