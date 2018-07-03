jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    //select用插件chosen.jquery
    var config = {
        disable_search_threshold: 10,
        no_results_text			: '无数据',
        allow_single_deselect	: true,
        width					:'100%'
    };
    /*$("input[name =initEvaluatePrice]").keyup(function (e) {
        var value = e.key;
    })*/

    $(".bank").chosen(config).on('change', function (e, selected){
        if ("" != selected) {
            change_error_style($(".bank").parent(), "remove");
        } else {
            change_error_style($(".bank").parent(), "add");
        }
    });
    var i=$("#size").val();
    $(".add-bank").on("click",function () {
        var html = '<div class="col-sm-12 price" id="bank'+i+'" style=" margin-top: 10px;">' +
            '<label class="col-xs-1 control-label"><span class="red">*</span>贷款银行:</label>' +
            '<div class="col-xs-2">' +
            '<select class="form-control bank"  id="loanBank'+i+'" name="loanBank"  check="validDate(this)" >'
        html = initbank(html);
        html += '</select>' +
            '</div>' +
            '<label class="col-xs-1 control-label"><span class="red">*</span>初审评估价格:</label>' +
            '<div class="col-xs-2">' +
            '<input type="text" obj="not_null" class="form-control" name="initEvaluatePrice"   onkeyup="getMoney(1,this)" onblur="getMoney(2,this)" >' +
            '</div>' +
            '<label class="col-xs-1 control-label">车三百评估价格:</label>' +
            '<div class="col-xs-2">' +
            '<input type="text"  class="form-control" name="evaluate300Price"   onkeyup="getMoney(1,this)" onblur="getMoney(2,this)">' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<button type="button"  class="btn btn-danger btn-sm remove-bank">删除</button>' +
            '</div>' +
            '</div>';
        $("#price").append(html);
        $("#loanBank"+i).chosen(config).on('change', function (e, selected){
            if ("" != selected) {
                change_error_style($(".bank").parent(), "remove");
            } else {
                change_error_style($(".bank").parent(), "add");
            }
        });
        i++;
        $(".remove-bank").on("click",function () {
            $(this).parent().parent().remove();
            i--
        })
    })
    $(".remove-bank").on("click",function () {
        $(this).parent().parent().remove();
        i--
    })


    laydate({
        elem: '#validDate',
        format: 'YYYY-MM-DD', //日期格式
        istime: false, //是否开启时间选择
        min: laydate.now(),
        isclear: true, //是否显示清空
        istoday: false, //是否显示今天
        issure: false, //是否显示确认
        choose: function (datas) {
            if (datas == '') {
                change_error_style($("#validDate"), "add");
            } else {
                change_error_style($("#validDate"), "remove");
            }
        },
        clear: function () {

        }
    });
    var time =$("#validDate").val()
    if(time==null||time==''){
    	var now =new Date();
    	var y=now.getFullYear();
    	var m =now.getMonth();
    	var d =now.getDate();
        var date=now;
        if(m == 11){
            date =(y+1)+'-'+(m-10)+'-'+d;
        }else{
            date =y+'-'+(m+2)+'-'+d;
        }

    	$("#validDate").val(date)
    }
    var type = $("#fileType").val();
    loadData(type);
    loadData2(type,0,null);
    var preData = new Array();

    $(".add-btn").on("click",function () {
        createFile();
    });
    $(".delete-btn").on("click",function () {
        deleteFile();
    });
    //ajax分页查询面签数据
    function loadData2(){
        $("#files2").html("");
        //显示loading提示
        loadingShow();
        $.ajax({
            url: ctx + "/secondCarEvaluate/evaluatefileList.action",
            type: "get",
            dataType: 'json',
            data: {
                'id':$("#cfSecondCarEvaluateId").val()
            },
            success: function (data) {
                //关闭loading提示
                loadingHide();
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"].length> 0) {
                        loadContent2(type, data)
                    } else {
                        $("#files2").html('<p class="no-data">暂无资料</p>');
                    }
                } else {
                    $("#files2").html('<p class="no-data">暂无资料</p>');
                }
            },
            error: function () {

            }
        });
    }
    function loadContent2(type, data){
        var item =data["rows"];
        var itemHtml='';
        for(var i= 0 ; i<item.length; i++ ){
            var fileName = item[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart,fileName.length).toUpperCase();
            itemHtml='<div class="col-sm-2">'+
                '<div class="file" style="text-align: center; margin: 0;">'+
                '<input type="checkbox" class="checkOne" name="fileList_input" value="'+item[i]["id"]+'">';
            if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
                itemHtml+='<img src="'+ctx +"/styles/images/zip.png"+'" alt="">';
            }else{
                itemHtml+='<img class="pre-img" src="'+staticUrl+item[i]["fileGroup"]+'/'+item[i]["filePath"]+'" alt="">'

            }
            itemHtml+='<div class="file-name">'+item[i]["fileName"]+'</div></div></div>';
            $("#files2").append(itemHtml);
        }
        $(".file-name").on("click", function(){
            $(this).prev().prev("input").trigger("click");
        });
        $("#files2").find(".pre-img").on("click",function(){
            $.openPhotoGallery(this)
        })

    }

    //ajax分页查询面签数据
    function loadData(type) {
        $("#files").html("");
        //显示loading提示
        loadingShow();
        $.ajax({
            url: ctx + "/secondCarEvaluate/carfileList.action",
            type: "get",
            dataType: 'json',
            data: {
                'id': $("#cfSecondCarEvaluateId").val()
            },
            success: function (data) {
                //关闭loading提示
                loadingHide();
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"].length > 0) {
                        loadContent(type, data)
                    } else {
                        $("#files").html('<p class="no-data">暂无资料</p>');
                    }
                } else {
                    $("#files").html('<p class="no-data">暂无资料</p>');
                }
            },
            error: function () {

            }
        });
    }

    function loadContent(type, data) {
        var item = data["rows"];
        var itemHtml = '';
        for (var i = 0; i < item.length; i++) {
            var fileName = item[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart, fileName.length).toUpperCase();
            itemHtml = '<div class="col-sm-2">' +
                '<div class="file" style="text-align: center; margin: 0;">' ;
               /** '<input type="checkbox" class="checkOne" name="fileList_input" value="' + item[i]["id"] + '">';**/
            if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
                itemHtml += '<img src="' + ctx + "/styles/images/zip.png" + '" alt="">';
            } else {
                itemHtml += '<img class="pre-img" src="' + staticUrl + item[i]["fileGroup"] + '/' + item[i]["filePath"] + '" alt="">'

            }
            itemHtml += '<div class="file-name">' + item[i]["fileName"] + '</div></div></div>';
            $("#files").append(itemHtml);
        }
        $("#files").find(".pre-img").on("click",function(){
            $.openPhotoGallery(this)
        })
    }

    //新增资料
    var uploadComp=null;
    function createFile() {
        var options = {
            width: 690,
            top: 200,
            height: 500,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onAfterShow: function (){
                uploadComp=  new HYUpload({
                    auto		: true,
                    fileNumLimit: 100,
                    containerId	: '#uploader',
                    uploadImg	: false,//图片上传标记
                    fileSizeLimit: 1048576*500,
                    formData: {filetype: 3},
                    fileSingleSizeLimit: 1048576*50,
                    dropTip		:'',
                    buttonText	: '选择文件',
                    server		: ctx + '/fdfs/uploadFile.action'
                });
                $(".filelist").css('overflow','auto');
            },
            callback: function () {
                var flag = false;
                var fileLength = $(".filelist li").length;
                var fileList = new Array();
                //遍历文件列表
                $(".filelist li").each(function () {
                    var file = {};
                    file.cfSecondCarEvaluateId = $("#cfSecondCarEvaluateId").val();
                    file.fileGroup = $(this).data("group");
                    file.fileType = 2;
                    file.filePath = $(this).data("filepath");
                    file.fileName = $(this).data("filename");
                    fileList.push(file);
                });

                if(fileList <1){
                    faildMsg("请选择上传的文件");
                    return flag
                }else if(null !=uploadComp && uploadComp.uploader.isInProgress()){
                    faildMsg("文件正在上传");
                    return flag
                }else{
                    var param = {};
                    param.list= fileList;
                    if ($("#fileCreateForm").valid("fileCreateForm")) {
                        loadingShow();
                        $.ajax({
                            url: ctx + "/secondCarEvaluate/createFile.action",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(param),
                            dataType:"json",
                            success:function (data) {
                                loadingHide();
                                if (data.error == 1) {
                                    successMsg("操作成功！", 1000, function () {
                                        loadData2();
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
    }

    //拒单、退回、同意审核按钮事件
    $(".back").add(".submit").on("click", function () {
        var type = $(this).attr("data-type");
        if(type=='2'){
        	 $("#validDate").attr('check','');
             $("input[name='initEvaluatePrice']").attr('obj','')

        }

        var isSubmit = validater.mySubmit(validater);
        if (!isSubmit) {
            return;
        }
        var param = getPic();

        if(type=='2'){
            param.priceList=null;
        }
        param.status = type;


        $.ajax({
            url: ctx + "/secondCarEvaluate/createSecondCarEvaluate.action",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(param),
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/secondCarEvaluate/list.action";
                    });
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    });
    //校验对象
    var validater = new ValidateWin("#tab-secondCar", {
        callback: function (content, event) {
            
        }
    });
    function initbank(html){
        $.ajax({
            url: ctx + "/bank/unForbbinList.action",
            type: "post",
            data: {},
            async:false,
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    html += "<option value=''>请选择贷款银行</option>";
                    for (var i = 0; i < data.rows.length; i++) {
                        html += "<option value=" + data.rows[i].id + ">" + data.rows[i].bankName + '</option>'
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
        return html;
    }

    function getPic() {
        var param = {};
        var list = new Array();
        $(".price").each(function () {
            var price = {};
            price.id=$(this).find("input[name='id']").val();
            price.loanBankId=$(this).find("select[name='loanBank']").val();
            price.initEvaluatePrice=$(this).find("input[name='initEvaluatePrice']").val();i
            price.evaluate300Price=$(this).find("input[name='evaluate300Price']").val();
            price.cfSecondCarEvaluateId=$("#cfSecondCarEvaluateId").val();
            list.push(price);
        });
        for (var i = 0; i < list.length; i++) {
            for (var j = 1; j < list.length; j++) {
                if(i==j){
                    break
                }
                if(list[i].loanBankId ==list[j].loanBankId || list[i].loanBankId ==$("#loanBankId").val() || list[j].loanBankId ==$("#loanBankId").val()) {
                    faildMsg("同一贷款银行不能选择多个");
                    return
                }
            }
        }
            param.priceList=list;
            param.id = $("#cfSecondCarEvaluateId").val();
            param.remark = $("#remark").val();
            param.validDate = $("#validDate").val();
            param.operationingLoginName = $("#operationingLoginName").val();
             return param;
        }
    function deleteFile() {

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
                $.ajax({
                    url: ctx + "/secondCarEvaluate/deleteCarFile.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                loadData2();
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

});


//下载文件
function downloadFile(id) {
    var idArr = new Array();
    idArr.push(id)
    confirmDialog("确认下载订单相关文件吗？", function () {
        window.location.href = ctx + "/secondCarEvaluate/downLoad.action?idArr=" + idArr.toString();
    })
}
function inAssessing(id) {

    confirmDialog("确认更换选中的占位人信息吗？", function () {
        var idArr = new Array();
        var params = {}
        idArr.push(id);
        params.idArr = idArr.toString();
        $.ajax({
            url: ctx + "/secondCarEvaluate/inAssessing.action",
            type: "post",
            data: params,
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    successMsg("操作成功！", 1000, function () {
                        window.location.href = ctx + "/secondCarEvaluate/list.action";
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
function  getMoney(flag,obj){
    if(flag==1){
        var objTxt = obj.value.replace(/(,)/g,'');
        var s=obj.value;
        s=s.replace(/[^\d\.]/g,"");
        s=s.replace(/^(\d*\.\d{0,2}).*$/g,"$1");
        while(/\d{4}(\.|,|$)/.test(s))
            s=s.replace(/(\d)(\d{3}(\.|,|$))/,"$1,$2");
        obj.value = s;
    }
    if(flag==2){
        var objTxt = obj.value.replace(/(,)/g,'');
        obj.value=objTxt;
    }
}
//表单校验
function validDate(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "validDate") {
                $(lableId).attr('tip', '有效截止日期，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("class") == "form-control bank") {
                $(lableId).parent().attr('tip', '请输入正确的贷款银行。').addClass("input_validation-failed");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}