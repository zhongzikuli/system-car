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
    
    getFiles(id,"/addSecondCar/getFiles.action","#files1");//获取基本信息的照片
    getFiles(id,"/assessReportManage/getEvaluateFiles.action","#files2"); //获取评估附件
    getFiles(id,"/assessReportManage/getCartransferFiles.action","#files3");//获取过户附件
    getFiles(acceptId, "/assessReportManage/getAccessReportFile.action", "#files4");
    getFiles(id, "/assessReportManage/getInitEvaluateTable.action", "#initEvaluateTable");//表格
    
    function getFiles(id,url,dom){
    	$.ajax({
            url: ctx + url,
            type: "post",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                	var res = data["rows"];
                	if(dom=="#initEvaluateTable" && res.length>0){
                		loadTable(res, dom);
                	}else if(dom=="#files4"){
                		if(res.length>0){
                			loadPic(res,dom)
                		}else{
                			$(dom).html('<p class="no-data">暂无资料</p>');
                		}
                	}else{
                		var record = res["recordList"];
                        if (res != null && record.length > 0) {
                            loadPic(record, dom);
                        } else {
                        	$(dom).html('<p class="no-data">暂无资料</p>');
                        }
                	}
                } else {
                	$(dom).html('<p class="no-data">暂无资料</p>');
                }
            }
        });
    }
    
    function loadPic(data, dom){
        var itemHtml='';
        itemHtml+='<div class="row">';
        for(var i= 0 ; i<data.length; i++ ){
            var fileName = data[i]["fileName"];
            var extStart = fileName.lastIndexOf(".");
            var ext = fileName.substring(extStart,fileName.length).toUpperCase();
            itemHtml+='<div class="col-sm-2">'+
                '<div class="file" style="text-align: center; margin: 0;">';
                /**'<input type="checkbox" class="checkOne" name="fileList_input" value="'+item[i]["id"]+'">';**/
            if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
                itemHtml+='<img src="'+ctx +"/styles/images/zip.png"+'" alt="">';
            }else{
                itemHtml+= '<img class="pre-img" src="'+staticUrl+data[i]["fileGroup"]+'/'+data[i]["filePath"]+'" alt="">';
            }
            itemHtml+='<div class="file-name">'+data[i]["fileName"]+'</div></div></div>';
        }
        itemHtml+='</div>';
        $(dom).append(itemHtml).find(".pre-img").on("click",function(){
            $.openPhotoGallery(this)
        })
    }
    
    function loadTable(data,dom){
        var html = '';
        html += '<table class="table table-hover table-striped no-margin" style="border:1px solid #bbbbbb">';
        html += '<thead><tr>' +
            '<th style="width:2%;">贷款银行</th>' +
            '<th style="width:2%;">初始评估价(元)</th>' +
            '<th style="width:2%;">车300评估价(元)</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        if (null == data || data.length <= 0) {
            html += '<td class="col-td" colspan="3">暂无信息</td>';
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
        $(dom).append(html);
    }
});