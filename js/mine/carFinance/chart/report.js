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

  getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, year + '-' + month);
  initDepartmentRank(type, year + '-' + month);

  showDateType(type);
  $("#year").on('change', function (e, param) {
    getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, param["selected"]);
    initDepartmentRank(type, param["selected"]);
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
      initDepartmentRank(type, $("#year").val());
      getRecord($("#departmentId").data("id"), $("#departmentId").data("grandid"), $("#departmentId").data("parentid"), type, $("#year").val());
    }
  });

  //部门排名
  function initDepartmentRank(type, dateTime) {
    $(".rank-content").empty();
    var html = '<h3>本年部门排名及贷款额</h3>';
    if (type == "month") {
      html = '<h3>本月部门排名及贷款额</h3>';
    }
    $.ajax({
      url: ctx + "/chartReport/getDepartmentRank.action",
      type: "post",
      data: {type: type, dateTime: dateTime},
      dataType: "json",
      success: function (data) {
        if (data.error == 1) {
          var result = data.rows;
          if (result != null && result.length > 0) {
            html += '<div class="rank-con">';
            for (var i = 0; i < result.length; i++) {
              var ranks = result[i].departmentRankVOS;
              if (result.length <5) {
                html += '<div class="rank-item">';
              } else {
                html += '<div class="col-xs-3">';
              }
              html += '<h2 class="ellipsis" title="' + result[i].departmentName + '(' + NumberFormatUtil.fmoney(formetMoney(result[i].actualLoadMoney), 2) + '万元/' + result[i].num + '笔)">' + result[i].departmentName + '(' + NumberFormatUtil.fmoney(formetMoney(result[i].actualLoadMoney), 2) + '万元/' + result[i].num + '笔)</h2 >';
              if (0 < ranks.length) {
                html += '<ul>';
                for (var k = 0; k < ranks.length; k++) {
                  if (k < 3) {
                    html += '<li class="li-' + k + '"><span class="num">' + (k + 1) + '</span>' +
                      '<span class="department text-left ellipsis" title="' + ranks[k].departmentName + '">' + ranks[k].departmentName + '</span>' +
                      '<span class="money ellipsis" title="贷款额:' + NumberFormatUtil.fmoney(formetMoney(ranks[k].actualLoadMoney), 2) + '万元/' +
                      ranks[k].num + '笔">贷款额:' + NumberFormatUtil.fmoney(formetMoney(ranks[k].actualLoadMoney), 2) + '万元/' + ranks[k].num + '笔</span></li>';
                  } else {
                    break
                  }
                }
                html += '</ul>';
              } else {
                html += '<p class="text-center">暂无数据</p>';
              }
              html += '</div>';
            }
            html += '</div>';
          } else {
            html += '<p class="text-center">暂无部门信息</p>';
          }
          $(".rank-content").append(html);
          if (result.length >= 5) {
        	  $(".rank-con").css("display","block").find("ul").css("padding", "0 0 0 20px")
          }
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

  function initDepartment() {
    $.ajax({
      url: ctx + "/department/getDepartmentAll.action",
      type: "post",
      dataType: "json",
      success: function (data) {
        if (data.error == 1) {
          var result = data.rows;
          var options = "";
          $.each(result, function (k, p) {
            options += "<option value='" + p.id + "' data-grandid='" + p.grandId + "' data-parentid='" + p.parentId + "'>" + p.name + "</option>";
          });
          $("#departmentId").empty();
          $("#departmentId").append(options).trigger('chosen:updated').chosen(config).on("change", function (e, param) {
            var selected = $(this).find("option:selected");
            getRecord(param["selected"], selected.data("grandid"), selected.data("parentid"), type, $("#year").val());
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

function getRecord(departmentId, grandId, parentId, type, dateTime) {
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
    data: {departmentId: departmentId, grandId: grandId, parentId: parentId, type: type, dateTime: dateTime},
    dataType: "json",
    success: function (data) {
      if (data.error == 1) {
        var r = data.rows;
        $(".total").empty();
        $(".total_money").empty();
        var html = '<div class="total-item b-1"><p>今日审核笔数(笔)</p>' +
          '<h2>' + r.dayOrderSubmitNumber + '</h2></div><div class="total-item b-1"><p>今日审核金额(万元)</p>' +
          '<h2>' + NumberFormatUtil.fmoney(formetMoney(r.dayOrderSubmitLoanMoney), 2) + '</h2></div><div class="total-item b-1">' +
          '<p>今日垫款笔数(笔)</p><h2>' + r.dayCompanyAdvanceNumber + '</h2></div><div class="total-item b-1">' +
          '<p>今日垫款金额(万元)</p><h2>' + NumberFormatUtil.fmoney(formetMoney(r.dayCompanyAdvanceMoney), 2) + '</h2></div>';
        $(".total").append(html);
        if (r.chartRateVOMap == null) {
          return;
        }
        var pie_tile = "本年计划达成率(%)";
        var total_tile = "本年累计贷款金额/计划贷款额(万元)";
        var title = "月金额(万元)";
        var name = "月份";
        var $x_value = new Array();
        var $y_point = new Array();
        var $y_value = new Array();
        var money = null;
        var companyAdvanceMoney = null;
        if (type == "month") {
          pie_tile = "本月计划达成率(%)";
          total_tile = "本月累计贷款金额/计划贷款额(万元)";
          title = "日金额(万元)";
          name = "日期";
          var day = getWorkday(selectYear, selectMonth);
          for (var i = 0; i < day.length; i++) {
            $x_value.push(day[i]);
            if (selectYear == year && selectMonth == month) {
              if (day[i] <= today) {
                money = r.chartRateVOMap[day[i]] == undefined ? 0 : r.chartRateVOMap[day[i]].actualLoadMoney;
                companyAdvanceMoney = r.chartRateVOMap[day[i]] == undefined ? null : r.chartRateVOMap[day[i]].rateNum;
              } else {
                money = '-';
                companyAdvanceMoney = null;
              }
            } else {
              money = r.chartRateVOMap[day[i]] == undefined ? 0 : r.chartRateVOMap[day[i]].actualLoadMoney;
              companyAdvanceMoney = r.chartRateVOMap[day[i]] == undefined ? 0 : r.chartRateVOMap[day[i]].rateNum;
            }
            $y_point.push(money);
            $y_value.push(companyAdvanceMoney);
          }
        } else {
          for (var i = 1; i <= 12; i++) {
            $x_value.push(i);
            if (selectYear == year) {
              if (i <= month) {
                money = r.chartRateVOMap[i] == undefined ? 0 : r.chartRateVOMap[i].actualLoadMoney;
                companyAdvanceMoney = r.chartRateVOMap[i] == undefined ? null : r.chartRateVOMap[i].rateNum;
              } else {
                money = '-';
                companyAdvanceMoney = null;
              }
            } else {
              money = r.chartRateVOMap[i] == undefined ? 0 : r.chartRateVOMap[i].actualLoadMoney;
              companyAdvanceMoney = r.chartRateVOMap[i] == undefined ? null : r.chartRateVOMap[i].rateNum;
            }

            $y_point.push(money);
            $y_value.push(companyAdvanceMoney);
          }
        }
        //饼图
        initRateChart(r, pie_tile);
        //曲线图
        initCategoryChart(title, $x_value, $y_point, $y_value, name);
        $(".total_money").append('<p>' + total_tile + '</p>' +
          '<h2>' + NumberFormatUtil.fmoney(formetMoney(r.actualLoadMoney), 2) +
          '<span>/' + NumberFormatUtil.fmoney(formetMoney(r.planMoney), 2) + '</span></h2>');

        $(".total_money").on("click", function () {
          var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
          var dateTime = $("#year").val();
          var url = ctx + "/businessPlan/list.action?type=" + type + "&dateTime=" + dateTime;
          openTabForParent(url, "-bus-plan", "业务计划列表明细");
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
function initCategoryChart(title, x, y, y_value, name) {
  var bight = echarts.init(document.getElementById('bight'));
  var option = {
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
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    legend: {
      data: [{
        name: '贷款额',
        icon: 'line',
        textStyle: {color: 'rgb(138,138,192)'},
      }, {
        name: '垫款额',
        icon: 'bar',
        textStyle: {color: 'rgb(138,138,192)'},
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
        textStyle: {
          color: 'rgb(138,138,192)',
          fontSize: 14
        }
      },
      data: x
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
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
    }],
    series: [{
      name: "贷款额",
      type: 'line',
      smooth: true,
      symbolSize: 8,//点的大小
      /*areaStyle: {
       normal: {
       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
       offset: 0,
       color: 'rgba(137, 189, 27, 0.3)'
       }, {
       offset: 0.8,
       color: 'rgba(137, 189, 27, 0)'
       }], false),
       shadowColor: 'rgba(0, 0, 0, 0.1)',
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
      data: y,
      markPoint: {
        /*symbolSize: 60,
         data: [{
         type: 'max',
         name: '最大值'
         }],*/
        itemStyle: {
          normal: {
            label: {
              color: '#000'
            }
          }
        }
      }
    }, {
      name: '垫款额',
      type: 'bar',
      smooth: true,
      label: {
        normal: {
          show: true,
          position: 'top',
          distance: 25,
          rotate: 70,
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
  bight.setOption(option);
  window.addEventListener("resize", function () {
    bight.resize();
  });
}

//饼图分析
function initRateChart(data, title) {
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
    series: [{
      type: 'pie',
      clockWise: false,
      radius: [70, 75],
      hoverAnimation: false,
      center: ['50%', '50%'],
      data: [{
        value: data.actualLoadMoney,
        label: {
          normal: {
            formatter: '{d}%',
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '35',
              fontWeight: 'normal',
              color: '#ffff00'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#ffff00',
            shadowColor: '#ffff00',
            shadowBlur: 10
          }
        }
      }, {
        value: data.rate,
        name: '未完成',
        itemStyle: {
          normal: {
            color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
          }
        }
      }]
    }]
  }
  ratio.on('click', function (param) {
    var type = $(".bootstrap-switch-label").text() == '年' ? 'month' : 'year';
    var dateTime = $("#year").val();
    var url = ctx + "/businessPlan/list.action?type=" + type + "&dateTime=" + dateTime;
    openTabForParent(url, "-bus-plan", "业务计划列表明细");
  });
  ratio.setOption(option);
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
  if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
    hideMenu();
  }
}
