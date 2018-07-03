(function($){
	var realCreditMap = new Map();
	var realCreditNumber = 0;
	var isInit = false;
	function BlackFilterQuery(id){
		this.nameEl = $(id).find("input[name='realName']");
		this.idCardEl = $(id).find("input[name='cardNo']");
		//init event
		this.initEvent();
		return this;
	}
	//组件初始化
	BlackFilterQuery.prototype.initBeside = function(number){
		var tips = '<div id="beside-query-box" class="beside-query-box animated">'+
						'<div class="heading"><i class="fa fa-database"></i>&nbsp;大数据查询</div>'+
						'<div class="content"><div class="text-center tip-message">暂无数据</div></div>'+
					'</div>'+
					'<div id="beside-query" class="hide">'+
						'<span class="badge badge-warning pull-right">'+number+'</span>'+
						'<a class="open-beside-query">'+
							'<i class="fa fa-database"></i>'+
						'</a>'+
					'</div>';
		$("body").append(tips);
		//收缩按钮
		$(".open-beside-query").click(function(e) {
			if($(".beside-query-box").hasClass("active")){
				hideBesideBox();
			}else{
				showBesideBox();
				hideBesideBtn();
			}
			e.stopPropagation();
		});
		isInit = true;
	}
	
	function hideBesideBox(){
		$(".beside-query-box").removeClass("slideInRight");
		$(".beside-query-box").addClass("slideOutRight");
		setTimeout(function(){
			$(".beside-query-box").removeClass("active");
		}, 1000);
		
		$(parent.document.body).add($(".mod_basic, .mod_header")).unbind("click");
	}
	
	function showBesideBox(){
		$(".beside-query-box").removeClass("slideOutRight");
		$(".beside-query-box").addClass("slideInRight");
		$(".beside-query-box").addClass("active");
		
		//隐藏事件
		$(parent.document.body).add($(".mod_basic, .mod_header")).on("click", function (e) {
			if($(".beside-query-box").hasClass("active")){
				hideBesideBox();
				showBesideBtn();
			}
			e.stopPropagation();
		});
	}
	
	//隐藏收缩按钮
	function hideBesideBtn(){
		$("#beside-query").fadeOut(300);
	}
	
	//展示收缩按钮
	function showBesideBtn(){
		if(isInit){
			$("#beside-query").removeClass("hide").fadeIn(300);
		}
	}
	//初始化事件
	BlackFilterQuery.prototype.initEvent = function(){
		var _this = this;
		var name = this.nameEl;
		var cardNo = this.idCardEl;
		this.nameEl.add(this.idCardEl).on("blur", function(e){
			$(parent.document.body).add($("div[class='mod_basic'], div[class='mod_header']")).unbind("click");
			_this.query(name, cardNo);
			e.stopPropagation();
		});
	}
	//查询筛查（同盾-黑名单）
	BlackFilterQuery.prototype.query = function(name, cardNo){
		var _this = this;
		var _name = $.trim($(name).val());
		var _cardNo = $.trim($(cardNo).val());
		var _type = $(name).attr("data-type");
		if("" != _name && "" != _cardNo){
			if(null != realCreditMap.get(_cardNo + ":" + _type)){
				return;
			}
			$.ajax({
				url		: ctx + "/risk/queryForBlack.action",
				type	: "post",
				data	: {
					type	: _type,
					name	: _name,
					cardNo	: _cardNo
				},
				dataType: "json",
				success	: function (data) {
					_this.deleteItem(_type);
					if (data.error == 1) {
						var blackRows = data["rows"]["black"];
						if(!isInit){
							_this.initBeside(data["rows"]["black"].length);
						}
						var keySet = realCreditMap.keySet();
						for(var i=0;i<keySet.length;i++){
							var key = keySet[i];
							if(key.split(":")[1] == _type){
								realCreditNumber -= realCreditMap.get(key).length;
								realCreditMap.remove(key);				//删除原记录
								$("#category-" + _type).remove();		//删除已经存在的
							}
						}
						//符合规则记录
						realCreditNumber += data["rows"]["black"].length;
						//保存到临时map中
						realCreditMap.put(_cardNo + ":" + _type, blackRows);
						//创建查询类目
						_this.createQueryCategory(_name, _type, blackRows, data["rows"]["person"]);
					} else if (data.error == -100) {
						faildMsg("会话超时，请重新登陆！");
					} else {
						faildMsg(data.message);
					}
				}
			});
		}else{
			this.deleteItem(_type);
		}
	}
	
	//创建查询类目
	BlackFilterQuery.prototype.createQueryCategory = function (name, type, blackRows, personRows){
		var html = '<div class="category" id="category-'+type+'">';
		html += '<div class="title"><span class="name">'+ transType(type) +":"+name+'</span><span class="tip">命中项</span></div>';
		html += '<div class="item">';
		
		html += '<div class="ibox-title">';
		html += '<h5>黑名单信息</h5>';
		html += '</div>';
		html += '<div class="ibox-content">';
		if(blackRows.length > 0){
			for(var i=0; i<blackRows.length; i++){
				html+= "<p>" + (i+1) + "." + blackRows[i] + "</p>";
			}
		}else{
			html+= "<p class='text-center'>暂无命中项</p>";
		}
		html += '</div>';
		html += '</div>';
		
		//自然人信息
		if(typeof(personRows) != "undefined" && type=="buyer" && personRows["finalResult"] != "Accept"){
			html += '<div class="item">';
			
			html += '<div class="ibox-title">';
			html += '<h5>公安信息</h5>';
			html += '</div>';
			
			html += '<div class="ibox-content">';
			html += '<table class="table table-bordered">';
			html += '<thead>';
			html += '<tr>';
				html += '<th class="text-center">是否违法</th>';
				html += '<th class="text-center">违法数量</th>';
				html += '<th class="text-center">案件类别代码</th>';
				
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			html += '<tr>';
				html += '<td class="text-center">'+ (null != personRows["breakLaw"] && "" !=personRows["breakLaw"] ? personRows["breakLaw"] : "--") +'</td>';
				html += '<td class="text-center">'+ (null != personRows["breakLawNum"] && "" !=personRows["breakLawNum"] ? personRows["breakLawNum"] : "--") +'</td>';
				html += '<td class="text-center">'+ (null != personRows["caseCode"] && "" !=personRows["caseCode"] ? personRows["caseCode"] : "--") +'</td>';
			html += '</tr>';
			
			html += '<tr>';
				html += '<th class="text-center">是否在逃</th>';
				html += '<th class="text-center">是否涉毒</th>';
				html += '<th class="text-center">案件类别名</th>';
				
			html += '</tr>';
			
			
			html += '<tr>';
				html += '<td class="text-center">'+ (null != personRows["escapeing"] && "" !=personRows["escapeing"] ? personRows["escapeing"] : "--")+'</td>';
				html += '<td class="text-center">'+ (null != personRows["relateDrug"] && "" !=personRows["relateDrug"] ? personRows["relateDrug"] : "--") +'</td>';
				html += '<td class="text-center">'+ (null != personRows["caseName"] && "" !=personRows["caseName"] ? personRows["caseName"] : "--") +'</td>';
			html += '</tr>';
			
			html += '<tr>';
				html += '<th class="text-center">是否吸毒</th>';
				html += '<th class="text-center">案件发生时间区间</th>';
				html += '<th class="text-center">审核结果</th>';
			html += '</tr>';
			
			html += '<tr>';
				html += '<td class="text-center">'+  (null != personRows["takeDrug"] && "" !=personRows["takeDrug"] ? personRows["takeDrug"] : "--") +'</td>';
				html += '<td class="text-center">'+  (null != personRows["caseDate"] && "" !=personRows["caseDate"] ? personRows["caseDate"] : "--") +'</td>';
				html += '<td class="text-center">'+  (null != personRows["finalDecision"] && "" !=personRows["finalDecision"] ? personRows["finalDecision"] : "--") +'</td>';
			html += '</tr>';
			
			html += '</tbody>';
			html += '</table>';
			
			html += '</div>';
			html += '</div>';
		}
		
		html += '</div>';
		$(".beside-query-box > .content").find(".tip-message").remove();
		$(".beside-query-box > .content").append(html);
		$("#beside-query > .badge-warning").html(realCreditNumber);
		//展示命中项
		showBesideBox();
		hideBesideBtn();
	}
	
	function transType(type){
		if(type.indexOf("buyer") >= 0){
			return "购车人";
		}else if(type.indexOf("shared") >= 0){
			return "配偶";
		}else if(type.indexOf("sponsor") >= 0 || type.indexOf("guaranter") >= 0){
			return "担保人";
		}else{
			return "";
		}
	}
	
	//删除指定命中类型
	BlackFilterQuery.prototype.deleteItem = function(_type){
		var keySet = realCreditMap.keySet();
		for(var i=0;i<keySet.length;i++){
			var key = keySet[i];
			if(key.split(":")[1] == _type){
				realCreditNumber -= realCreditMap.get(key).length;
				realCreditMap.remove(key);				//删除原记录
				$("#category-" + _type).remove();		//删除已经存在的
			}
		}
		$("#beside-query > .badge-warning").html(realCreditNumber);
		//为空时给出提示信息
		if(0 == realCreditNumber && $(".beside-query-box > .content").find(".tip-message").length <= 0){
			$(".beside-query-box > .content").append('<div class="text-center tip-message">暂无数据</div>');
		}
	}
	window.BlackFilterQuery = BlackFilterQuery;
})($);