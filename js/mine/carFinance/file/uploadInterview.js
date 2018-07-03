jQuery(function ($) {
  //详情固定头部
  $(document).ready(function () {
    $('.mod_header').stickUp({
      itemClass: 'menuItem',
      itemHover: 'active'
    });
  });

  var config = {
    disable_search_threshold: 10,
    no_results_text: '无数据',
    width: "100%"
  };

  var interview = $("#type").val();//面签类型
  var orderId = $("#OrderAcceptId").val();//订单编号

  loadData(interview, orderId, null, false);//初始化所有面签数据

  $(".add-btn").on("click", function () { //新增按钮事件
    var fileType = $(this).attr("data-type");
    createFile(fileType, orderId, interview, config);
  });

  $(".check-btn").on("click", function () {
    var $that = $(this);
    var ck = $("input[name='fileList_input']:checked").length;
    var length = $(".checkOne").length;
    if (ck != length) {
      $that.html('取消全选')
      $(".mod_basic").find('.checkOne').each(function () {
        $(this).prop("checked", true);
      })
    } else {
      $that.html('全选')
      $(".mod_basic").find('.checkOne').each(function () {
        $(this).prop("checked", false);
      })
    }
  });

  var uploadComp = null;

  function createFile(fileType, orderId, interview, config) { //新增资料
    var flag = false;
    if (fileType == 20 || fileType == 21 || fileType == 24) {
      flag = true
    }
    var options = {
      width: flag ? 400 : 690,
      top: 200,
      height: flag ? 370 : 500,
      overlay: true,
      dispose: true,
      move: true,
      title: '新增',
      onAfterShow: function () {
        if (flag) {
          $(".page-container").removeClass("two-line").addClass("one-line");
        }
        uploadComp = new HYUpload({
          auto: true,
          fileNumLimit: flag ? 1 : 100,
          containerId: '#uploader',
          uploadImg: false,//图片上传标记
          fileSizeLimit: 1048576 * 500,
          formData: {filetype: 3},
          fileSingleSizeLimit: 1048576 * 10,
          dropTip: '',
          buttonText: '选择文件',
          server: ctx + '/fdfs/uploadFile.action'
        });
        $(".filelist").css('overflow', 'auto');

        $(".file-type").chosen(config).on('change', function (e, selected) {
          if ("" != selected) {
            change_error_style($(".file-type").parent(), "remove");
            if (selected.selected === "4") {
              $("#hidden-select").show();
            } else {
              $("#hidden-select").hide();
            }
          } else {
            change_error_style($(".file-type").parent(), "add");
          }
        });
        $(".file-childType").chosen(config);
      },
      onAfterHide: function () {
        $("#vtip").hide()
      },
      callback: function () {
        var flag = false;
        var fileList = new Array();
        $(".filelist li").each(function () { //遍历文件列表
          var file = {};
          file.fileGroup = $(this).data("group");
          file.filePath = $(this).data("filepath");
          file.fileName = $(this).data("filename");
          //file.fileChildType = fileType;
          fileList.push(file);
        });
        if (fileList < 1) {
          faildMsg("请选择上传的文件");
          return flag
        } else if (null != uploadComp && uploadComp.uploader.isInProgress()) {
          faildMsg("文件正在上传");
          return flag
        } else {
          var param = {};
          param.businessOrderAcceptId = orderId;
          param.fileType = interview;
          param.list = fileList;
          param.fileChildType = fileType;
          if ($("#fileCreateForm").valid("fileCreateForm")) {
            loadingShow();
            $.ajax({
              url: ctx + "/cfFileCenter/uploadInterviewFile.action",
              type: "post",
              contentType: "application/json",
              data: JSON.stringify(param),
              dataType: "json",
              success: function (data) {
                loadingHide();
                if (data.error == 1) {
                  successMsg("操作成功！", 1000, function () {
                	  loadData(interview, orderId, fileType, true);
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
      }
    };
    var creatFileDlg = new Dialog("#fileCreate-dialog", options);
    creatFileDlg.show();
  };

  function loadData(interview, orderId, fileType, init) {
    loadingShow(); //显示loading提示
    $.ajax({
      url: ctx + "/cfFileCenter/queryParentFile.action",
      type: "post",
      dataType: 'json',
      data: {
        'businessOrderAcceptId': orderId,
        'type': interview,
        'fileChildType':fileType
      },
      success: function (data) {
        loadingHide();  //关闭loading提示
        if (data.error == 1) {
          if (data["rows"]!=""&&data["rows"]!=null) {
            loadContent(data["rows"], init)
          } else {
            $("#files").html('<p class="text-center  no-data">暂无数据</p>');
          }
        } else {
          $("#files").html('<p class="text-center  no-data">暂无数据</p>');
        }
      },
      error: function () {

      }
    });
  }

  function loadPic(itemHtml, item, ext) {
    itemHtml += '<div class="col-sm-2">' +
      '<div class="file" style="text-align: center; margin: 0;">' +
      '<input type="checkbox" class="checkOne" name="fileList_input" value="' + item["id"] + '">';
    if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
      itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
    } else {
      itemHtml += '<img  class="pre-img" src="' + staticUrl + item["fileGroup"] + '/' + item["filePath"] + '" alt="">';
    }
    itemHtml += '<div class="file-name">' + item["fileChildTypeStr"] + item["fileName"] + '</div></div></div>';
    return itemHtml;
  }

  function loadContent(item, init) {
	var flag=init?true:false
    for (var i = 0; i < item.length; i++) {
      var fileName = item[i]["fileName"];
      var extStart = fileName.lastIndexOf(".");
      var ext = fileName.substring(extStart, fileName.length).toUpperCase();
      var fileChildType = item[i]["fileChildType"]
      if (fileName != null || fileName != "") {
        if (fileChildType == 20) {
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files20").html(itemHtml);
        } else if (fileChildType == 21) {
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files21").html(itemHtml);
        } else if (fileChildType == 22) {
          if(flag){
        		flag=false;
        		$("#files22 .add-btn").siblings().remove();
          }
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files22 .add-btn").before(itemHtml);
          
        } else if (fileChildType == 23) {
          if(flag){
        		flag=false;
        		$("#files23 .add-btn").siblings().remove();
          }
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files23 .add-btn").before(itemHtml);
        } else if (fileChildType == 24) {
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files24").html(itemHtml);
        } else if (fileChildType == 25) {
          if(flag){
          		flag=false;
          		$("#files25 .add-btn").siblings().remove();
          }
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files25 .add-btn").before(itemHtml);
        } else if (fileChildType == 26) {
           if(flag){
          		flag=false;
          		$("#files26 .add-btn").siblings().remove();
           }
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files26 .add-btn").before(itemHtml);
        } else if (fileChildType == 27) {
        	if(flag){
          		flag=false;
          		$("#files27 .add-btn").siblings().remove();
           }
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files27 .add-btn").before(itemHtml);
        }
        if (fileChildType == "" || fileChildType == null) {
          var itemHtml = '';
          itemHtml += loadPic(itemHtml, item[i], ext);
          $("#files").append(itemHtml);
        }
      } else {
        $("#files").html('<p class="text-center  no-data">暂无数据</p>');
      }
    }
    $(".file-name").on("click", function () {
      $(this).prev().prev("input").trigger("click");
    });
    $(".checkOne").on("click", function () {
      var ck = $("input[name='fileList_input']:checked").length;
      var length = $(".checkOne").length;
      if (ck != length) {
        $(".check-btn").html('全选')
      } else {
        $(".check-btn").html('取消全选')
      }
    })
    $(".pre-img").on("click", function () {
      $.openPhotoGallery(this)
    })
  }
});

//校验
function validFile(lableId) {
  if (undefined != lableId && null != lableId && lableId != "") {
    if ($(lableId).val() == null || $(lableId).val() == "") {
      if ($(lableId).attr("id") == "file-type") {
        $(lableId).parent().attr('tip', '文件类型不能为空，请重新输入。').addClass("input_validation-failed");
        return "faild";
      }
      if ($("#hidden-select").is(':hidden')) {

      } else {
        if ($(lableId).attr("id") == "file-childType") {
          $(lableId).parent().attr('tip', '文件类型不能为空，请重新输入。').addClass("input_validation-failed");
          return "faild";
        }
      }
      return "success";
    }
    return "success";
  }
}

//确定提交
function commit(acceptId) {
  confirmDialog("确认提交面签文件吗？", function () {
    var length20 = $("#files20 input").length;
    var length21 = $("#files21 input").length;
    var length22 = $("#files22 input").length;
    var length23 = $("#files23 input").length;
    var length24 = $("#files24 input").length;
    var length25 = $("#files25 input").length;
    var length26 = $("#files26 input").length;
    if (length20 <= 0 || length21 <= 0 || length22 <= 0 || length23 <= 0 || length24 <= 0 || length25 <= 0 || length26 <= 0) {
      faildMsg("面签资料上传未齐全");
    } else {
      loadingShow();
      $.ajax({
        url: ctx + "/cfFileCenter/interviewFileSubmit.action",
        type: "post",
        data: {
          "orderId": acceptId
        },
        dataType: "json",
        success: function (data) {
          loadingHide();
          if (data.error == 1) {
            successMsg("操作成功！", 1000, function () {
              if ($("#goBackUrl").val() != null && $("#goBackUrl").val() != '') {
                window.location.href = ctx + "/cfFileCenter/uploadInterview.action";
              }
              if ($("#viewSource").val() == 'homepage') {
                closeParentCurrentTab();
              } else {
                closeTabForParent(ctx + "/cfBusinessOrderAccept/preOrderApply.action?id=" + acceptId);
              }
            });
          } else if (data.error == -100) {
            faildMsg("会话超时，请重新登陆！");
          } else {
            faildMsg(data.message);
          }
        }
      });
    }
  })
}

function deleteFile(title, type) {
  var ck = $("input[name='fileList_input']:checked");
  if (ck.length == 0) {
    alertDialog("请选择要删除的文件。");
    return
  } else {
    var idArr = new Array();
    $(ck).each(function () {
      idArr.push($(this).val());
    });
    confirmDialog("确认删除选中的文件吗？", function () {
      var params = {}
      params.idArr = idArr.toString();
      loadingShow();
      $.ajax({
        url: ctx + "/cfFileCenter/deleteInterviewFile.action",
        type: "post",
        data: params,
        dataType: "json",
        success: function (data) {
          loadingHide();
          if (data.error == 1) {
            successMsg("操作成功！", 1000, function () {
              window.location.href = ctx + "/cfFileCenter/preUploadInterview.action?id=" + $("#OrderAcceptId").val() + "&goBackUrl=" + $("#goBackUrl").val();
            });
          } else if (data.error == -100) {
            faildMsg("会话超时，请重新登陆！");
          } else {
            faildMsg(data.message);
          }
        }
      });
    })
  }
}

function downloadFile(title, type) {
  var fileType = $("#type").val();
  var aid = $("#OrderAcceptId").val();
  confirmDialog("确认下载订单相关文件吗？", function () {
    window.location.href = ctx + "/cfFileCenter/interViewDownload.action?fileType=" + fileType + "&aId=" + aid;
  })
}
