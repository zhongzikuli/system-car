//过户资料审核
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
	var fPath = $("#fPath").val();
	//数据处理对象
	var dataProxy = new HYCarFinance.carProxy();
	//ui对象
	var UI = new HYCarFinance.UI();
	//换审核按钮
	$(".change-btn").on("click", function(){
		var id = $(this).attr("data-id");
		confirmDialog("确认换审核该订单？", function () {
			var params = {
				idArr : id
			};
			$.ajax({
				url		: ctx + "/carInfo/transferChange.action",
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
	var validater = new ValidateWin("#audit-desc-wrap", {
		callback:function(content,event){
			
		}
	});
	//候补资料附件
	if($("#auditContent").length > 0){
		var auditContent = $.parseJSON($("#auditContent").val());  
		if(null != auditContent["list"]){
			var html = "";
			for (var i = 0; i < auditContent["list"].length; i++) {
				html += '<div class="col-sm-2"><div class="contact-box text-center">';
				html += '<img  class="pre-img" src="'+fPath+auditContent["list"][i]["fileGroup"]+'/'+auditContent["list"][i]["filePath"]+'" alt="">';
				html += '</div></div>';	
			}
			$("#audit-file-list").html(html);
		}
		$("#audit-file-list").find(".contact-box").each(function(){
			animationHover(this,"pulse")
		});
	}
	//过户资料附件
	if($("#auditSecondContent").length > 0){
		var auditSecondContent = $.parseJSON($("#auditSecondContent").val());  
		if(null != auditSecondContent["list"]){
			var html = "";
			for (var i = 0; i < auditSecondContent["list"].length; i++) {
				var fileName = auditSecondContent["list"][i]["fileName"];
				var extStart = fileName.lastIndexOf(".");
				var ext = fileName.substring(extStart,fileName.length).toUpperCase();
				
				html += '<div class="col-sm-2"><div class="contact-box text-center mailbox-content">';
				if(ext!= ".BMP" && ext!= ".PNG" && ext!= ".JPG" && ext!= ".JPEG"){
					html += '<img src="'+ctx +"/styles/images/zip.png"+'" alt="" title="'+fileName+'">';
				}else{
					html += '<img class="pre-img" src="'+fPath+auditSecondContent["list"][i]["fileGroup"]+'/'+auditSecondContent["list"][i]["filePath"]+'" alt="">';
				}
				
				html += '</div></div>';	
			}
			$("#audit-second-file-list").html(html);
			
			//展示图片放大
			$("#audit-second-file-list").find(".pre-img").on("click",function(){
				$.openPhotoGallery(this)
			});
		}
		$("#audit-second-file-list").find(".contact-box").each(function(){
			animationHover(this,"pulse")
		});
	}
	
	//拒单、退回、同意审核按钮事件
	$(".back-btn").add(".agree-btn").on("click", function(){
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
		var desc = $("#auditDescription").val();
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
		var isReprot = 0, reportPrice = 0;
		//审核通过时，检查二手车过户资料
		if(type == 2 && $("#second-car-wrap").length > 0){
			if($("#audit-second-file-list").find(".col-sm-2").length <= 0){
				faildMsg("车辆过户资料为空不能通过审核");
				return;
			}
			isReprot = $("#select-report-price").val();
			reportPrice = $("#report-price").val();
		}
		var nodeName = $(this).attr("data-name");
		confirmDialog(tip, function () {
			loadingShow();
			var params = {
				id			: id,
				status		: type,
				isReport	: isReprot,
				reportPrice	: reportPrice,
				desc		: $.trim(desc)
			};
			$.ajax({
				url		: ctx + "/carInfo/transferAudit.action",
				type	: "post",
				data	: params,
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
	$(".download-file-btn").on("click", function(){
		var id = $(this).attr("data-id");
		confirmDialog("确认下载附件？", function () {
			downLoadFile(id);
		});
	});
	
	//审核描述信息提示
	$('#auditDescription').keyup(function(){
		var curLength=$(this).val().trim().length;
		$(this).next("span").find(".input").html(curLength);
		$(this).next("span").find(".can-input").html((1000 - curLength) >= 0 ? (1000 - curLength) : 0);
		if(curLength>1000){
			var num=$(this).val().trim().substr(0,1000);
			$(this).val(num);
		}
	});
	
	//评估报告下拉框
	if($("#select-report-price").length > 0){
		$("#select-report-price").chosen({
			disable_search_threshold: 10,
			no_results_text: '无数据',
			width: "100%"
		}).on("change", function (evt, params) {
			if(params["selected"] == 1){
				$(".report-price-wrap").show();
				$(".report-price-wrap").find("input").attr("reg", "int");
				$(".report-price-wrap").find("input").attr("tip", "请输入正确的评估报告价格");
			}else{
				$(".report-price-wrap").hide();
				$(".report-price-wrap").find("input").removeAttr("reg");
				$(".report-price-wrap").find("input").removeAttr("tip");
			}
		});
	}
	
	//加载数据
	dataProxy.getAuditHistoryByAcceptId(acceptId, true, "#audit-detail-audit-list", function(data){
		//初始化表格
		var html = UI.createAuditHistoryHtml(data)
		$("#audit-detail-list").append(html);
		//初始化查看事件
		initAuditHistoryDetailEvent();
	});
	
	
	//审核详情查看
	function initAuditHistoryDetailEvent(){
		$("#audit-detail-list").find(".detail").on("click", function(){
			var id = $(this).attr("value");
			dataProxy.getAuditDetailById(id, true, function(data){
				var options = {
					width	:800,
					top		:200,
					height	:480,
					overlay	:true,
					dispose	:true,
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
		$('<form action="'+ ctx + '/cfSupplyMaterial/downLoadOldCarFile.action">' +  // action请求路径及推送方法
				'<input type="hidden" name="id" value="'+id+'"/>' +
			'</form>').appendTo('body').submit().remove();
	};
});