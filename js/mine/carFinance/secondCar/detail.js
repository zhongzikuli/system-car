jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });

    var acceptId = $("#acceptId").val();
    var id = $("#hiddenId").val();
    getBasicPic(id);
    getAttachment(id);
    getInitEvaluateTable(id);

    function getInitEvaluateTable(id){
        $.ajax({
            url: ctx + "/assessReportManage/getInitEvaluateTable.action",
            type: "post",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var dataLength = data.rows;
                    if (null!=dataLength) {
                        new loadBasicTable(data.rows, "initEvaluateTable");
                    } else {
                        $("#initEvaluateTable").html('<p class="no-data">暂无资料</p>');
                    }
                } else {
                    $("#files1").html('<p class="no-data">暂无资料</p>');
                }
            }
        });
    }

    function loadBasicTable(data,containerClass){
        var html = '';
        html += '<table class="table table-hover table-striped no-margin" style="border:1px solid #bbbbbb">';
        html += '<thead><tr>' +
            '<th style="width:2%;">贷款银行</th>' +
            '<th style="width:2%;">初始评估价(元)</th>' +
            '<th style="width:2%;">车300评估价(元)</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="' + ("3") + '">暂无信息</td>';
        } else {
            for (var i = 0; i < data.length; i++) {
                var initEvaluatePrice = data[i]['initEvaluatePrice']==null?0:data[i]['initEvaluatePrice'];
                var evaluate300Price = data[i]['evaluate300Price']==null?0:data[i]['evaluate300Price'];
                html += '<tr>'+
                    '<td class="cel">' + data[i]['bankName'] + '</td>' +
                    '<td class="cel">' + initEvaluatePrice + '</td>' +
                    '<td class="cel">' + evaluate300Price + '</td>' ;
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        $("#"+containerClass).append(html);
    }


    function getBasicPic(id) {
        $.ajax({
            url: ctx + "/addSecondCar/getFiles.action",
            type: "post",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var dataLength = data["rows"]["totalCount"];
                    if (data["rows"] != null && dataLength > 0) {
                        var loadbasciPic = new loadBasicPic(data.rows, "files1");
                    } else {
                        $("#files1").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');
                    }
                } else {
                    $("#files1").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');
            }}
        });
    }

    //获取评估附件
    function getAttachment(id) {
        $.ajax({
            url: ctx + "/assessReportManage/getEvaluateFiles.action",
            type: "post",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var dataLength = data["rows"]["totalCount"];
                    if (data["rows"] != null && dataLength > 0) {
                        var loadAttachment = new loadBasicPic(data.rows, "files2")
                    } else {
                        $("#files2").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');
                    }
                } else {
                    $("#files2").html('<div class="ibox-content b-n"><p class="text-center  no-data">暂无数据</p></div>');
                }
            }
        });
    }


    function loadBasicPic(data, containerClass){
        var item =data["recordList"];
        var itemHtml='';
        if (item == null || item == '' || item.length == 0) {
            $("#"+containerClass).html('<p class="no-data">暂无资料</p>');
        }else{
            itemHtml += '<div class="row">'
            for(var i= 0 ; i<item.length; i++ ){
                var fileName = item[i]["fileName"];
                var extStart = fileName.lastIndexOf(".");
                var ext = fileName.substring(extStart,fileName.length).toUpperCase();
                itemHtml='<div class="col-sm-2">'+
                    '<div class="file" style="text-align: center; margin: 0;">';
                if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
                    itemHtml+='<img src="'+ctx +"/styles/images/zip.png"+'" alt="">';
                }else{
                    itemHtml+= '<img src="'+staticUrl+item[i]["fileGroup"]+'/'+item[i]["filePath"]+'" class="pre-img" alt="">';
                }
                itemHtml+='<div class="file-name">'+item[i]["fileName"]+'</div></div></div>';
                $(".gallerys").append(itemHtml);
            }
            $(".pre-img").on("click",function(){
                $.openPhotoGallery(this)
            })
        }
    }
});
//下载文件
function downloadFile(id) {
    var idArr = new Array();
    idArr.push(id)
    confirmDialog("确认下载订单相关文件吗？", function () {
        window.location.href = ctx + "/secondCarEvaluate/downLoad.action?idArr="+idArr.toString();
    })
}