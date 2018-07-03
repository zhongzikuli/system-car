var type = "year";
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
$(document).ready(function () {
    var config = {
        disable_search_threshold: 8,
        no_results_text: '无数据',
        width: '170px'
    };
    $("#year").chosen(config);

    //搜索时间控件
    var start = {
        elem: "#search-start-date",
        format: 'YYYY-MM-DD',
        min: '1970-01-01 ', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now() + ' 00:00:00',
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            if ($("#search-end-date").val() == '') {
                $("#search-end-date").val(laydate.now())
            }
            getRecord(type, $("#year").val(), datas, $("#search-end-date").val());
            initDepartmentRank(type, $("#year").val(), datas, $("#search-end-date").val());
        },
        clear: function () {
            end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
        }
    }
    var end = {
        elem: '#search-end-date',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        choose: function (datas) {
            if ($("#search-start-date").val() != '') {
                getRecord(type, $("#year").val(), $("#search-start-date").val(), datas);
                initDepartmentRank(type, $("#year").val(), $("#search-start-date").val(), datas);
            }
        },
        clear: function () {
            start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            start.max = laydate.now();	//将开始日的最大值设定为今天
        }
    }
    laydate(start);
    laydate(end);

    getRecord(type, year, $("#search-start-date").val(), $("#search-end-date").val());
    initDepartmentRank(type, year, $("#search-start-date").val(), $("#search-end-date").val());

    $("#year").on('change', function (e, param) {
        getRecord(type, param["selected"], $("#search-start-date").val(), $("#search-end-date").val());
        initDepartmentRank(type, param["selected"], $("#search-start-date").val(), $("#search-end-date").val());
    });

    showDateType(type);
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
        onText: '年',
        offText: '月',
        labelText: '月',
        onColor: "info",
        offColor: "info",
        onSwitchChange: function (e, state) {
            if (state == false) {
                type = "month";
                $(".bootstrap-switch-label").text('年');
            } else {
                type = "year";
                $(".bootstrap-switch-label").text('月');
            }
            showDateType(type);
            getRecord(type, $("#year").val(), $("#search-start-date").val(), $("#search-end-date").val());
            initDepartmentRank(type, $("#year").val(), $("#search-start-date").val(), $("#search-end-date").val());
        }
    });

    //部门排名
    function initDepartmentRank(type, dateTime, startDate, endDate) {
        $(".rank-content").empty();
        $.ajax({
            url: ctx + "/fundsDistribution/getFundsDistributionDepartmentRank.action",
            type: "post",
            data: {
                type: type,
                dateTime: dateTime,
                startDate: startDate,
                endDate: endDate
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var result = data.rows;
                    var html = '';
                    if (result != null && result.length > 0) {
                        html += "<ul>";
                        var size = result.length > 10 ? 10 : result.length;
                        for (var i = 0; i < size; i++) {
                            if(i<3){
                            	html += '<li class="li-' + i+ '">';
                            }else{
                            	html += '<li class="li-3">';
                            }
                            html +=' '+ result[i].departmentName + '<br>(' + formetMoney(result[i].actualLoadMoney) + '/' + result[i].num + '笔)</li>';
                        }
                        html += '</ul>';
                    } else {
                        html += '<p class="text-center">暂无数据</p>';
                    }
                    $(".rank-content").append(html);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            },
            error: function () {
                var html = '<p class="text-center">暂无数据</p>';
                $(".rank-content").append(html);
            }
        });
    }

    //图表统计
    function getRecord(type, dateTime, startDate, endDate) {
        $.ajax({
            url: ctx + "/fundsDistribution/getFundsDistributionRecord.action",
            type: "post",
            data: {
                type: type,
                dateTime: dateTime,
                startDate: startDate,
                endDate: endDate
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var r = data.rows;
                    var yValue = new Array();
                    var dTimeOut = new Array();
                    var dTimeOutTitle = new Array();
                    var dLoanContractDate = new Array();
                    var dLoanContractDateTitle = new Array();
                    var dContractSubmitBankDate = new Array();
                    var dContractSubmitBankDateTitle = new Array();
                    var dUnBankPaymentDate = new Array();
                    var dUnBankPaymentDateTitle = new Array();
                    var dBankPaymentDate = new Array();
                    var dBankPaymentDateTitle = new Array();
                    for (var key in r) {
                        var v = r[key];
                        for (var i = 0; i < v.chartRateVOS.length; i++) {
                            var chart = v.chartRateVOS[i];
                            if (chart.typeName == "超时单证") {
                                dTimeOut.push(chart.rateNum);
                                dTimeOutTitle.push(chart.title)
                            } else if (chart.typeName == "已垫款未收齐资料") {
                                dLoanContractDate.push(chart.rateNum);
                                dLoanContractDateTitle.push(chart.title)
                            } else if (chart.typeName == "已收齐资料未送行") {
                                dContractSubmitBankDate.push(chart.rateNum);
                                dContractSubmitBankDateTitle.push(chart.title)
                            } else if (chart.typeName == "已送行未放款") {
                                dUnBankPaymentDate.push(chart.rateNum);
                                dUnBankPaymentDateTitle.push(chart.title)
                            }else if (chart.typeName == "已送行已放款") {
                                dBankPaymentDateTitle.push(chart.title)
                            }
                        }
                        yValue.push(v.title);
                    }
                    initBightText(dBankPaymentDateTitle.reverse());
                    initRateChart(yValue, dTimeOut, dTimeOutTitle, dLoanContractDate, dLoanContractDateTitle,
                        dContractSubmitBankDate, dContractSubmitBankDateTitle, dUnBankPaymentDate, dUnBankPaymentDateTitle);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    function initBightText(dBankPaymentDateTitle){
    	var html = '';
    	var dataLen = dBankPaymentDateTitle.length;
    	
    	for(var i = 0; i < dataLen; i++){
    		var money = formetMoney(dBankPaymentDateTitle[i].split("万")[0].slice(1)*10000);
    		var count = dBankPaymentDateTitle[i].split("/")[1];
    		html +='<div class="bight-bar">已送行已放款<br>('+money+'/'+count+'</div>';
    	}
    	$(".bight-con").empty().append(html);
    	switch (dataLen) {
	        case 2:
	        	$(".bight-con").css({
				    "padding": "205px 0 160px"
				}).find(".bight-bar").css({
				    "margin-bottom": "240px"
	        	})
	            break;
			case 3:
				$(".bight-con").css({
				    "padding": "155px 0 115px"
				}).find(".bight-bar").css({
				    "margin-bottom": "147px"
	        	})         
				break;
			case 4:
				$(".bight-con").css({
				    "padding": "130px 0 90px"
				}).find(".bight-bar").css({
				    "margin-bottom": "100px"
	        	})
			    break;
			case 5:
				$(".bight-con").css({
				    "padding": "115px 0 75px"
				}).find(".bight-bar").css({
				    "margin-bottom": "72px",
				    "height":"44px"
	        	})
			    break;
			case 6:
				$(".bight-con").css({
				    "padding": "105px 0 65px"
	        	}).find(".bight-bar").css({
				    "margin-bottom": "51px"
	        	})
			    break;
			case 7:
				$(".bight-con").css({
				    "padding": "100px 0 60px"
				}).find(".bight-bar").css({
				    "margin-bottom": "37px"
	        	})
			    break;
			case 8:
				$(".bight-con").css({
				    "padding": "95px 0 55px"
				}).find(".bight-bar").css({
				    "margin-bottom": "26px"
	        	})
			    break;
	    }
    }
    
    function initRateChart(yValue, dTimeOut, dTimeOutTitle, dLoanContractDate, dLoanContractDateTitle, dContractSubmitBankDate,
                           dContractSubmitBankDateTitle, dUnBankPaymentDate, dUnBankPaymentDateTitle) {
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
                data: ['超时单证','已垫款未收齐资料','已收齐资料未送行', '已送行未放款' ]
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
                data: yValue
            },
            series: [{
                name: '超时单证',
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
                trueData: dTimeOutTitle,
                data: dTimeOut,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ff0078";
                        }
                    }
                }
            }, {
                name: '已垫款未收齐资料',
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
                trueData: dLoanContractDateTitle,
                data: dLoanContractDate,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#00f0f0";
                        }
                    }
                }
            }, {
                name: '已收齐资料未送行',
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
                trueData: dContractSubmitBankDateTitle,
                data: dContractSubmitBankDate,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#ffff00";
                        }
                    }
                }
            }, {
                name: '已送行未放款',
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
                trueData: dUnBankPaymentDateTitle,
                data: dUnBankPaymentDate,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return "#FF6060";
                        }
                    }
                }
            }]
        };
        ratio.on('click', function (param) {
            if (param.seriesType == 'bar') {
                var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
                var dateTime = $("#year").val();
                var startDate = $("#search-start-date").val();
                var endDate = $("#search-end-date").val();
                var url = ctx + "/fundsDistribution/listFunds.action?queryType=" + param.seriesName + "&bankName=" + param.name.substring(0, param.name.indexOf('(')) + "&type=" + type + "&dateTime=" + dateTime + "&startDate=" + startDate + "&endDate=" + endDate;
                openTabForParent(url, "-funds-distribution", param.seriesName + "资金分布列表明细");
            }
        });
        ratio.setOption(option,true);
        window.addEventListener("resize", function () {
            ratio.resize();
        });
    }

    function formetMoney(num) {
        if (num == 0) {
        	return "0.00元";
        }else if(num >= 100000000){
        	return num / 100000000+"亿元";
        }else{
        	return num / 10000+"万元";
        }
    }

    function getdate(y, m) {
        var tempTime = new Date(y, m, 0);
        var time = new Date();
        var workday = new Array();
        for (var i = 1; i <= tempTime.getDate(); i++) {
            time.setFullYear(y, m - 1, i);
            var day = time.getDay();
            if (day != 6 && day != 0) {
                workday.push(i);
            }
        }
        return workday
    }
});
