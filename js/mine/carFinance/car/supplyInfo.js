jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    //新增按钮事件
    var aid= $("#OrderAcceptId").val();
    var secondCarEvaluateEntity= $("#secondCarEvaluateEntity").val();
    loadData(aid);

	var config = {
        disable_search_threshold:10,
        no_results_text: '无数据',
        width:"150px"
    };
    $("#search-select").chosen(config).on('change', function (e, param) {
		$(".check-btn").html('全选')
	    $(".mod_basic").find('.checkOne').each(function () {
	        $(this).prop("checked", false);
	    })
	    if(param["selected"]==0){
	        $("#item-1, #item-2, #item-3, #item-4, #item-5, #item-6, #item-other").show();
            $("#item-1, #item-2, #item-3, #item-4, #item-5, #item-6, #item-other").find(".pre-img").show();
	    }
	    if(param["selected"]==1){
	        $("#item-1").show();
            $("#item-2, #item-3, #item-4, #item-5, #item-6, #item-other").find(".pre-img").hide();
	        $("#item-2, #item-3, #item-4, #item-5, #item-6, #item-other").hide();
            $("#item-1").find(".pre-img").show();
	    }
	    if(param["selected"]==2){
	    	$("#item-2").show();
            $("#item-1, #item-3, #item-4, #item-5, #item-6, #item-other").find(".pre-img").hide();
	        $("#item-1, #item-3, #item-4, #item-5, #item-6, #item-other").hide();
            $("#item-2").find(".pre-img").show();
	    }
	    if(param["selected"]==3){
	    	$("#item-3").show();
            $("#item-1, #item-2, #item-4, #item-5, #item-6, #item-other").find(".pre-img").hide();
	        $("#item-1, #item-2, #item-4, #item-5, #item-6, #item-other").hide();
            $("#item-3").find(".pre-img").show();
	    }
	    if(param["selected"]==4){
	        $("#item-4").show();
            $("#item-1, #item-2, #item-3, #item-5, #item-6, #item-other").find(".pre-img").hide();
	        $("#item-1, #item-2, #item-3, #item-5, #item-6, #item-other").hide();
            $("#item-4").find(".pre-img").show();
	    }
	    if(param["selected"]==5){
	        $("#item-5").show();
            $("#item-1, #item-2, #item-3, #item-4, #item-6, #item-other").find(".pre-img").hide();
	        $("#item-1, #item-2, #item-3, #item-4, #item-6, #item-other").hide();
            $("#item-5").find(".pre-img").show();
	    }
	    if(param["selected"]==6){
	        $("#item-6").show();
            $("#item-1, #item-2, #item-3, #item-4, #item-5, #item-other").find(".pre-img").hide();
	        $("#item-1, #item-2, #item-3, #item-4, #item-5, #item-other").hide();
            $("#item-6").find(".pre-img").show();
	    }
	});
      var newOROld = $("#newOrOld").val();

if(newOROld ==1){
    laydate( {
        elem: '#initRegisterDate',
        format: 'YYYY-MM-DD', //日期格式
        istime: false, //是否开启时间选择
        max:laydate.now(),
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            if  (datas =='') {
                change_error_style($("#initRegisterDate"), "add");
            } else {
                change_error_style($("#initRegisterDate"), "remove");
            }
        },
        clear: function () {

        }
    });
}


    $("#vinNo").blur(function(){
        var vinNo=$(this).val();
        if(null!=vinNo){
            var underpanLastSixNo=vinNo.substr(vinNo.length-6);
            $("#underpanLastSixNo").val(underpanLastSixNo);
        }
    });

    $(".add-btn").on("click",function () {
        var fileChildType=$(this).attr("data-type");
        createFile(fileChildType);
    });
    //新增资料
    var param = {};
    var uploadComp = null;
    function createFile(fileChildType){
        var flag =false;
        if(fileChildType==5 ){
            flag =true;
        }
        var options = {
            width: flag? 500:690,
            top: 200,
            height:flag? 400:500,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onAfterShow: function (){
                uploadComp=new HYUpload({
                    auto		: true,
                    fileNumLimit: flag? 1:100,
                    containerId	: '#uploader',
                    uploadImg	: false,//图片上传标记
                    fileSizeLimit: 1048576*500,
                    formData    : {filetype: 6},
                    dropTip		:'',
                    buttonText	: '选择文件',
                    server		: ctx + '/fdfs/uploadFile.action'
                });
                if(flag ){
                    $(".page-container").removeClass(" two-line").addClass("one-line");
                }
                $(".filelist").css('overflow','auto');
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    if(null!=$(this).data("group") && null!=$(this).data("filepath") && null!=$(this).data("filename")){
                        file.fileChildType=fileChildType;
                        file.fileGroup = $(this).data("group");
                        file.filePath = $(this).data("filepath");
                        file.fileName = $(this).data("filename");
                        fileList.push(file);
                    }
                });
                if(fileList <1){
                    faildMsg("请选择上传的图片");
                    return flag
                }else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
                    faildMsg("图片正在上传");
                    return flag
                }else{
                    param.list = fileList;
                    param.businessOrderAcceptId = aid;
                    param.category = $("#category").val();
                    param.carDetail = $("#carDetail").val();
                    param.engineNo = $("#engineNo").val();
                    param.billCompany = $("#billCompany").val();
                    param.vinNo = $("#vinNo").val();
                    param.carColor = $("#carColor").val();
                    param.billNo = $("#billNo").val();
                    param.underpanLastSixNo = $("#underpanLastSixNo").val();
                    param.initRegisterDate = $("#initRegisterDate").val();
                    if ($("#fileCreateForm").valid("fileCreateForm")) {
                        loadingShow();
                        $.ajax({
                            url: ctx + "/carInfo/fileToString.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType:"json",
                            success:function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        loadData(aid,fileChildType);
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

    function checkShow(itemId) {
   	 	var ck = $(itemId).find("input[name='fileList_input']:checked").length;
        var  length =$(itemId).find(".checkOne").length;
        if(ck!=length){
       	 $(".check-btn").html('取消全选')
            $(itemId).find('.checkOne').each(function () {
           	 $(this).prop("checked", true);
            })
        } else {
       	 $(".check-btn").html('全选')
            $(itemId).find('.checkOne').each(function () {
           	 $(this).prop("checked", false);
            })
        }
    }
    
   $(".check-btn").on("click", function () {
       if($("#search-select").val()==1){
       	checkShow("#item-1");
       }else if($("#search-select").val()==2){
       	checkShow("#item-2");
       }else if($("#search-select").val()==3){
       	checkShow("#item-3");
       }else if($("#search-select").val()==4){
       	checkShow("#item-4");
       }else if($("#search-select").val()==5){
       	checkShow("#item-5");
       }else if($("#search-select").val()==6){
       	checkShow("#item-6");
       }else {
       	checkShow(".mod_basic");
       }
   });

    new ValidateWin("#tab-getCar", {
        callback: function (content, event) {
            var length5 = $("#files5 input").length;
            if (  length5 <= 0  ) {
                faildMsg("提车资料发票未上传");
                return
            }
            var filelength = $(".file input").length;
            if (filelength <= 0 ) {
                faildMsg("提车资料不能为空");
            }else{
                param.id=$("#idInfo").val();
                param.businessOrderAcceptId = aid;
                param.category = $("#category").val();
                param.carDetail = $("#carDetail").val();
                param.engineNo = $("#engineNo").val();
                param.billCompany = $("#billCompany").val();
                param.vinNo = $("#vinNo").val();
                param.carColor = $("#carColor").val();
                param.billNo = $("#billNo").val();
                param.underpanLastSixNo = $("#underpanLastSixNo").val();
                param.initRegisterDate = $("#initRegisterDate").val();
                var a=param;
                loadingShow();
                $.ajax({
                    url: ctx + "/carInfo/submitGetCar.action",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    dataType:"json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                if($("#goBackUrl").val()!=null && $("#goBackUrl").val()!='' ){
                                    window.location.href = ctx + "/carInfo/supplyQuery.action";
                                }else {
                                    closeTabForParent(ctx+"/carInfo/carInformationBackEnter.action?id=" + aid);
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
        }
    });

    function loadData(aid,fileChildType){
        $(".check-btn").html("全选");
        $.ajax({
            url: ctx + "/carInfo/carInfoFilequery.action",
            type: "get",
            dataType: 'json',
            data: {
                'businessOrderAcceptId': aid,
                'fileChildType': fileChildType
            },
            success: function (data) {
                if (data.error == 1) {
                    var id=data.rows.id;
                    $("#auditId").val(id);
                    loadContent(fileChildType, data)
                }else if(data.error == -1){
                    $("#files7").html('<p  class="text-center">暂无信息</p>');
                }
            }
        });
    }

    function showFile(itemList,ext){
    	var html='';
    	html += '<div class="col-sm-2"><div class="file" style="text-align: center; margin: 0;">' +
    		'<input type="checkbox" class="checkOne" name="fileList_input" value="' + itemList["filePath"] + '">';
	     if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
	    	 html += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
	     } else {
	    	 html += '<img class="pre-img" src="' + staticUrl + itemList["fileGroup"] + '/' + itemList["filePath"] + '" alt="">';
	     }
	     html += '<div class="file-name">' +itemList["fileName"] + '</div><i class="fa fa-times-circle"  data-id="' + itemList["filePath"] + '"></i></div></div>';
	     return html
    }
    
    function loadContent(type, data) {
        $(".files .add-btn").siblings().remove();
        var item = data["rows"]["list"];
        if(item.length>0){
            for(var i=0;i<item.length;i++){
                var itemList =item[i];
                var fileName=itemList["fileName"];
                var extStart =fileName.lastIndexOf(".");
                var ext =fileName.substring(extStart, fileName.length).toUpperCase();
                var fileChildType = item[i]["fileChildType"];
                if(fileName != null || fileName != ""){
                    var itemHtml =showFile(itemList,ext);
                    if ( fileChildType==1) {
                        $("#files1 .add-btn").before(itemHtml);
                    }else if(fileChildType==2){
                        $("#files2 .add-btn").before(itemHtml);
                    }else if(fileChildType==3){
                        $("#files3 .add-btn").before(itemHtml);
                    }else if(fileChildType==4){
                        $("#files4 .add-btn").before(itemHtml);
                    }else if(fileChildType==5){
                        $("#files5 .add-btn").before(itemHtml);
                        $("#files5 .add-btn").hide();
                    }else if(fileChildType==6){
                        $("#files6 .add-btn").before(itemHtml);
                    }else if(fileChildType=="" ||fileChildType==null){
                        $("#files7").find("p").remove().append(itemHtml);
                    }
                }
            }
        }else{
            $("#files5 .add-btn").show();
        }
        $(".file-name").on("click", function () {
            $(this).prev().prev("input").trigger("click");
        });
        
        $(".file .fa-times-circle").on("click", function () {
            var id = $(this).attr("data-id")
	       	 $(this).siblings(".checkOne").prop('checked', true);
	       	 deleteOneFile(id);
        })
        $(".pre-img").on("click",function(){
            $.openPhotoGallery(this)
        })
    }
    
    function deleteOneFile(id) {
            confirmDialog("确认删除选中的图片吗？", function () {
                var params = {}
                var idArr = new Array();
                idArr.push(id);
                params.idArr = idArr.toString();
                params.acceptId =$("#OrderAcceptId").val()
                $.ajax({
                    url: ctx + "/carInfo/deleteFile.action",
                    type: "post",
                    data:  params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000 , function(){
                                loadData(aid);
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


    $(".deleteFiles").on("click",function(){
        deleteFile();
    });

    function deleteFile() {
        var ck = $("input[name='fileList_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的图片。");
            return
        } else {
            confirmDialog("确认删除选中的图片吗？", function () {
                var params = {}
                var idArr = new Array();
                $(ck).each(function () {
                    idArr.push($(this).val());
                });
                params.idArr = idArr.toString();
                params.acceptId =$("#OrderAcceptId").val()
                loadingShow();
                $.ajax({
                    url: ctx + "/carInfo/deleteFile.action",
                    type: "post",
                    data:  params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000 , function(){
                                loadData(aid);
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

    $(".download-files").on("click",function(){
        var auditId= $("#auditId").val();
        if(auditId==null||auditId==undefined||auditId==''){
            faildMsg("请上传图片后再点击下载按钮");
        }else {
            confirmDialog("确认下载相关图片吗？", function () {
                window.location.href = ctx + "/carInfo/downLoad.action?id=" + auditId;
            })
        }
    });
});


//表单校验
function validGetCarInfo(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "initRegisterDate" ) {
                $(lableId).attr('tip', '日期为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "vinNo" ) {
                $(lableId).attr('tip', '车架号为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "search-select2") {
                $(lableId).parent().attr('tip', '图片类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "underpanLastSixNo") {
                var name = $("#underpanLastSixNo").val();
                if (name.length !=6) {
                    $(lableId).attr('tip', '底盘号后六位只能输入6个数字');
                    return "faild";
                }
            }
            var value = $.trim($(lableId).val());
            if($(lableId).attr("id") == "vinNo"){
                var vinReg = new RegExp(vin_reg);
                if (!vinReg.test(value)) {
                    $(lableId).attr("tip", "请输入有效的车架号");
                    return "faild";
                }
            }
            return "success";
        }
        return "success";
    }
}
