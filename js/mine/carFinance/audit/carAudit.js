jQuery(function ($) {
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
	//业务受理单相关信息
	var acceptId = $("#acceptId").val();
	//数据处理对象
	var dataProxy = new HYCarFinance.carProxy();
	//ui对象
	var UI = new HYCarFinance.UI();
	//换审核按钮
	$(".car-audit-change-btn").on("click", function(){
		var id = $(this).attr("data-id");
		confirmDialog("确认换审核该订单？", function () {
			var params = {
				idArr : id
			};
			$.ajax({
				url		: ctx + "/carInfo/supplyChange.action",
				type	: "post",
				data	: params,
				dataType: "json",
				success	: function (data) {
					if (data.error == 1) {
						successMsg("操作成功！", 700, closeParentCurrentTab);
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		});
	});
	
	//校验对象
	var validater = new ValidateWin("#car-audit-desc-wrap", {
		callback:function(content,event){
			
		}
	});
	
	if($("#carAuditContent").length > 0){
		var auditContent = $.parseJSON($("#carAuditContent").val());
		$("#audit-car-info-wrap").find("input").each(function(i,n){
			var name = $(n).attr("name");
			$(n).val(auditContent[name]);
		});
		var fUrl = $("#fPath").val();
		if(null != auditContent["list"]){
			var html = "";
			for (var i = 0; i < auditContent["list"].length; i++) {
				var fileName = auditContent["list"][i]["fileName"];
				var extStart = fileName.lastIndexOf(".");
				var ext = fileName.substring(extStart,fileName.length).toUpperCase();
				
				html += '<div class="col-sm-2"><div class="contact-box text-center">';
				if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
					html += '<img src="'+ctx +"/styles/images/zip.png"+'" alt="" title="'+fileName+'">';
				}else{
					html += '<img class="pre-img" src="'+fUrl +auditContent["list"][i]["fileGroup"]+'/'+auditContent["list"][i]["filePath"]+'" alt="">';
				}
				html += '</div></div>';	
			}
			$("#car-audit-file-list").html(html);
			
			//展示图片放大
			$("#car-audit-file-list").find(".pre-img").on("click",function(){
				$.openPhotoGallery(this)
			});
		}else{
			$("#car-audit-file-list").html("<div class=ibox-content b-n'><p class='text-center tip-message'>暂无待审附件</p></div>");
		}
		$(".contact-box").each(function(){
			animationHover(this,"pulse")
		});
	}
	
	//拒单、退回、同意审核按钮事件
	$(".car-audit-back-btn").add(".car-audit-agree-btn").on("click", function(){
		var type = $(this).attr("data-type");
		var text = $(this).text();
		var id = $(this).attr("data-id");
		
		var isSubmit = validater.mySubmit(validater);
		if(!isSubmit && type == 2){
			return;
		}
		if(null == id || "" == id){
			faildMsg("申请记录不存在");
			return;
		}
		var desc = $("#carAuditDescription").val();
		if(null == desc || "" == $.trim(desc)){
			faildMsg("审核意见不能为空");
			return;
		}
		var tip = "";
		if(type == -2){
			tip = "确认退回该订单？";
		}else{
			tip = "确认"+text+"该申请？"
		}
		var nodeName = $(this).attr("data-name");
		confirmDialog(tip, function () {
			loadingShow();
			
			var params = {
				id			: id,
				auditStatus	: type,
				remark		: $.trim(desc)
			};
			$("#audit-car-info-wrap").find("input").each(function (i, n) {
				var name = $(n).attr("name");
				if (typeof(name) != "undefined" && "" != $.trim($(n).val())) {
					params[name] = $.trim($(n).val());
				}
			});
			$.ajax({
				url		: ctx + "/carInfo/audit.action",
				type	: "post",
				contentType: "application/json",
				data	: JSON.stringify(params),
				dataType: "json",
				success	: function (data) {
					loadingHide();
					if (data.error == 1) {
						successMsg("订单审核成功！", 1000, closeParentCurrentTab);
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		});
	});
	
	//打包下载
	$("#download-car-audit-file-btn").on("click", function(){
		var id = $(this).attr("data-id");
		confirmDialog("确认下载附件？", function () {
			downLoadFile(id);
		});
	});

	//审核描述信息提示
	$('#carAuditDescription').keyup(function(){
		var curLength=$(this).val().trim().length;
		$(this).next("span").find(".input").html(curLength);
		$(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
		if(curLength>1000){
			var num=$(this).val().trim().substr(0,1000);
			$(this).val(num);
		}
	});
	
	//加载数据
	dataProxy.getAuditHistoryByAcceptId(acceptId, true, "#car-audit-detail-list", function(data){
		//初始化表格
		var html = UI.createAuditHistoryHtml(data)
		$("#car-audit-detail-list").append(html);
		//初始化查看事件
		initAuditHistoryDetailEvent();
	});
	
	
	//审核详情查看
	function initAuditHistoryDetailEvent(){
		$("#car-audit-detail-list").find(".detail").on("click", function(){
			var id = $(this).attr("value");
			dataProxy.getAuditDetailById(id, true, function(data){
				var options = {
					width	: 800,
					top		: 200,
					height	: 480,
					overlay	: true,
					dispose	: true,
					move	: true,
					move	: true,
					url		:'',
					onBeforeShow:function(){
						$("#auditType").val(data["auditTypeName"]);
						$("#auditResult").val(data["auditStatusStr"]);
						$("#auditor").val(data["auditUser"]);
						$("#auditTime").val(data["auditTime"]);
						$("#auditDescriptionView").val(data["auditBak"]);
					},
					callback:function()	{}
				};
				var viewDlg = new Dialog("#view-audit-dialog",options);
				viewDlg.show();
			});
		});
	}
	
	function animationHover(element, animation) {
		element = $(element);
		element.hover(
		function () {
			element.addClass('animated ' + animation);
		},
		function () {
			//wait for animation to finish before removing classes
			window.setTimeout(function () {
				element.removeClass('animated ' + animation);
			}, 2000);
		});
	}
	
	//刷新页面
	function refresh(){
		window.location.reload();
	}
	
	//下载附件
	function downLoadFile(id){
		$('<form action="'+ ctx + '/carInfo/downLoad.action" method="POST">' +  // action请求路径及推送方法
				'<input type="hidden" name="id" value="'+id+'"/>' +
			'</form>').appendTo('body').submit().remove();
	};
});