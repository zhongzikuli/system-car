$(document).ready(function () {

    var sTime = {
        elem: '#audit_time_start',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
            eTime.start = datas //将结束日的初始值设定为开始日
        },
        clear: function () {
            eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            eTime.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    var eTime = {
        elem: '#audit_time_end',
        format: 'YYYY-MM-DD', //日期格式
        max: laydate.now(),
        istime: false, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            sTime.max = datas; //结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            sTime.start = laydate.now(); //将结束日的初始值设定为开始日
        }
    };
    laydate(sTime);
    laydate(eTime);
    //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });
    $(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
    
    $(".edit-btn").on("click", function () {
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        var money = $(this).attr("data-money");
        var result=getData(id);
        editProtocol(id, name,money,result);
    });
    
    $(".reset-btn").on("click", function(){
        $("#audit_time_start").val('');
        $("#audit_time_end").val('');
        $("#nameOrId").val('');
        $("#orderNo").val('');
        $("#search-select").val(1);
        $("#search-select").trigger("chosen:updated");
    });

   
  //获取审核信息
  function getData(id) {
      var result = '';
      $.ajax({
          url: ctx + "/applyPay/findApplyAuditInfo.action",
          type: "post",
          data: {
              'id': id
          },
          async: false,
          dataType: "json",
          success: function (data) {
              if (data.error == 1) {
            	  result = data.rows;
              } else if (data.error == -100) {
                  faildMsg("会话超时，请重新登陆！");
              } else {
                  faildMsg(data.message);
              }
          }
      })
      return result;
  }
  //垫款申请
  function editProtocol(id, name,money,result) {
	  var listLength = null;
	  if(result!=null && result!= undefined && result!= ""){
		  listLength = result['list'].length;
	  }
      var options = {
          width: 750,
          top: 200,
          height: listLength ? 260: 180,
          overlay: true,
          dispose: true,
          move: true,
          title: '修改',
          onAfterShow: function () {
              var itemHtml = '';
              var list = result['list'];
              if (list == null || list.length < 1) {
            	 itemHtml = '<p>暂无审核信息</p>';
            	  $("#audit-info").append(itemHtml);
              } else { 
            	  itemHtml = '<h5>审核信息</h5>'; 
                  for (var i = 0; i < list.length; i++) {
                	  itemHtml += '<div class="infor-item">' +
                          ' <div class="box-item row">' +
                          '<div class="col-xs-2">' +
                          '<div class="item-text">' +
                          '<label for="">审核类型:</label>' +
                          '</div>' +
                          list[i]['bussinessTypeName'] +
                          '</div>' +
                          '<div class="col-xs-2">' +
                          '<div class="item-text">' +
                          '<label for="">审核状态:</label>' +
                          '</div>' +
                          list[i]['auditStatusName'] +
                          '</div>' +
                          '<div class="col-xs-3">' +
                          '<div class="item-text">' +
                          '<label for="">备注:</label>' +
                          '</div>' +
                          list[i]['auditBak'] +
                          '</div>' +
                          '<div class="col-xs-2">' +
                          '<div class="item-text">' +
                          '<label for="">审核人员:</label>' +
                          '</div>' +
                          list[i]['auditRealName'] +
                          '</div>' +
                          '<div class="col-xs-3">' +
                          '<div class="item-text">' +
                          '<label for="">审核时间:</label>' +
                          '</div>' +list[i]['auditTimeStr']+'</div>' +
                          '</div>' +
                          '</div>' +
                          '<div class="hr-line-dashed" style="margin:15px;"></div>';
                  }
                  $("#audit-info").append(itemHtml);
              }
              $("#applyPay-buyer-name").val(name)
              $("#applyPay-money").val(NumberFormatUtil.fmoney(money,2))
              $("#applyPay-id").val(result.id)
          },
          callback: function () {
              var flag = false;
              if ($("#applyPayCreateForm").valid("applyPayCreateForm")) {
                  loadingShow();
                  $.ajax({
                      url: ctx + "/applyPay/applyPrincipal.action",
                      type: "post",
                      data: {
                          "orderId": id,
                          "id": $("#applyPay-id").val()
                      },
                      dataType: "json",
                      success: function (data) {
                          loadingHide();
                          if (data.error == 1) {
                              successMsg("操作成功！", 1000, function () {
                                  window.location.href = ctx + "/applyPay/applyPrincipalList.action";
                              });
                          } else if (data.error == -100) {
                              faildMsg("会话超时，请重新登陆！");
                          } else {
                              faildMsg(data.message);
                          }
                      }
                  });
                  if (flag) {
                      return false;
                  }
              } else {
                  return false;
              }
          }
      };
      var editDlg = new Dialog("#applyPayCreate-dialog", options);
    //垫款申请中的保证金计算
      $("input[name='applyPay-serviceFee']").on("change", function () {
    	  initCalculateCashEvent();
      });
      $("input[name='applyPay-poundage']").on("change", function () {
          initCalculateCashEvent();
      });
      $("input[name='applyPay-agreeEnsureMoney']").on("change", function () {
          initCalculateCashEvent();
      });
      $("input[name='applyPay-channelEnsureMoney']").on("change", function () {
          initCalculateCashEvent();
      });
      $("input[name='applyPay-licensePlateEnsureMoney']").on("change", function () {
          initCalculateCashEvent();
      });
      function initCalculateCashEvent() {
          var poundage = isNaN($("input[name='applyPay-poundage']").val()) || $("input[name='applyPay-poundage']").val() == '' ? 0 : $("input[name='applyPay-poundage']").val();
          var serviceFee = isNaN($("input[name='applyPay-serviceFee']").val()) || $("input[name='applyPay-serviceFee']").val() == '' ? 0 : $("input[name='applyPay-serviceFee']").val();
          var agreeEnsureMoney = isNaN($("input[name='applyPay-agreeEnsureMoney']").val()) || $("input[name='applyPay-agreeEnsureMoney']").val() == '' ? 0 : $("input[name='applyPay-agreeEnsureMoney']").val();
          var channelEnsureMoney = isNaN($("input[name='applyPay-channelEnsureMoney']").val()) || $("input[name='applyPay-channelEnsureMoney']").val() == '' ? 0 : $("input[name='applyPay-channelEnsureMoney']").val();
          var licensePlateEnsureMoney = isNaN($("input[name='applyPay-licensePlateEnsureMoney']").val()) || $("input[name='applyPay-licensePlateEnsureMoney']").val() == '' ? 0 : $("input[name='applyPay-licensePlateEnsureMoney']").val();

          var totalFee = parseFloat(poundage) + parseFloat(serviceFee) + parseFloat(agreeEnsureMoney)
              + parseFloat(channelEnsureMoney) + parseFloat(licensePlateEnsureMoney)
          $("input[name='applyPay-amountMoney']").val(totalFee);
      }
      editDlg.show();
  }

});
//订单详情
function detail(id,title) {
    var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
    openTabForParent(url, "-order-detail-" + id, "订单详情-"+title);
}
 function toOrderTrack(id,goBackUrl) {
	    window.location.href = ctx + "/cfOrderTrack.action?acceptId=" + id+"&goBackUrl="+goBackUrl ;
	}
/**
 * Created by Administrator on 2017/9/27.
 */
