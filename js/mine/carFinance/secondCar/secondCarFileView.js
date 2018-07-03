jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
  
    var orderId = $("#cfSecondCarEvaluateId").val();
    loadData('/secondCarEvaluate/carfileList.action','files',orderId);
    loadData('/secondCarEvaluate/evaluatefileList.action','files2',orderId);

    function loadData(url,ele,orderId){
    	$("#"+ele).html("");
        //显示loading提示
        loadingShow();
        $.ajax({
        	url: ctx + url,
            type: "get",
            dataType: 'json',
            data: {
                'id':orderId
            },
            success: function (data) {
                //关闭loading提示
                loadingHide();
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"].length > 0) {
                    	 getData(ele, data["rows"])
                    } else {
                    	$("#"+ele).html('<p class="no-data">暂无资料</p>');
                    }
                } else {
                	$("#"+ele).html('<p class="no-data">暂无资料</p>');
                }
            },
            error: function () {

            }
        });
    }
    
    function getData(ele, item){
	   	 var itemHtml='';
	   	 for(var i= 0 ; i<item.length; i++ ){
	            var fileName = item[i]["fileName"];
	            var extStart = fileName.lastIndexOf(".");
	            var ext = fileName.substring(extStart,fileName.length).toUpperCase();
	            itemHtml+='<div class="col-sm-2">'+
	                '<div class="file" style="text-align: center; margin: 0;">';
	             if(ele=='files2'){
	            		 itemHtml+= '<input type="checkbox" class="checkOne" name="fileList_input" value="'+item[i]["id"]+'">';
	            }
	            if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
	            		 itemHtml+='<img src="'+ctx +"/styles/images/zip.png"+'" alt="">';
	            }else{
	            		 itemHtml+='<img class="pre-img" src="'+staticUrl+item[i]["fileGroup"]+'/'+item[i]["filePath"]+'" alt="">'
	            }
	            itemHtml+='<div class="file-name">'+item[i]["fileName"]+'</div></div></div>';
	        }
	   	 $("#"+ele).append(itemHtml);
	   	 if(ele=='files2'){
	   		 $(".file-name").on("click", function(){
	   	          $(this).prev().prev("input").trigger("click");
	   	     });
	   	 }
	   	 $("#"+ele).find(".pre-img").on("click",function(){
	   	        $.openPhotoGallery(this)
	   	 })
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

