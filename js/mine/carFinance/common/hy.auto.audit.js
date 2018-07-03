(function($){
	var realCreditMap = new Map();
	var realCreditNumber = 0;
	var isInit = false;
	function AutoAuditCreditQuery(btnId, acceptId){
		this.initEvent(btnId, acceptId);
		return this;
	}
	//组件初始化
	AutoAuditCreditQuery.prototype.initBeside = function(){
		if($("#beside-query-box").length > 0){
			$("#beside-query-box").remove();
		}
		
		var tips = '<div id="beside-query-box" class="beside-query-box expand animated">'+
						'<div class="heading"><i class="fa fa-database"></i>&nbsp;自动化审批详情</div>'+
						'<div class="content"><div class="text-center tip-message">暂无数据</div></div>'+
					'</div>';
		$("body").append(tips);
		//收缩按钮
		$(".open-beside-query").click(function(e) {
			if($(".beside-query-box").hasClass("active")){
				hideBesideBox();
			}else{
				showBesideBox();
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
			}
			e.stopPropagation();
		});
	}
	//初始化事件
	AutoAuditCreditQuery.prototype.initEvent = function(btnId, acceptId){
		var _this = this;
		$(btnId).on("click", function(e){
			_this.query(acceptId);
			e.stopPropagation();
		});
	}
	//（自动化审批详情）
	AutoAuditCreditQuery.prototype.query = function(acceptId){
		var _this = this;
		if("" != acceptId){
			$.ajax({
				url		: ctx + "/risk/queryAutoAuditDetail.action",
				type	: "post",
				data	: {
					acceptId	: acceptId
				},
				dataType: "json",
				success	: function (data) {
					if (data.error == 1) {
						var rows = data["rows"];
						if(!isInit) {
							_this.initBeside();
						}else{
							$("#beside-query-box").find(".heading").html('<i class="fa fa-database"></i>&nbsp;自动化审批详情');
						}
						//创建查询类目
						_this.createQueryCategory(rows);
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
	AutoAuditCreditQuery.prototype.createQueryCategory = function (rows){
		var html = "";
		if(rows.length > 0){
			for(var i=0; i<rows.length; i++){
				html += '<div class="category" id="auto-audit-category-'+rows[i]["userType"]+'">';
				html += '<div class="title"><span class="name">'+ rows[i]["userTypeName"] +":"+rows[i]["customerName"]+'</span> '+ (rows[i]["isBlack"] > 0 ? '<span class="pull-right badge badge-danger">已拉黑</span>' : "") +'</div>';
				var policyType = "--";
				if(null != rows[i]["finalDecision"] && "" != rows[i]["finalDecision"] && rows[i]["finalDecision"].indexOf("通过") > 0){
					policyType = '<code class="alert-success">'+rows[i]["finalDecision"]+'</code>';
				}else if(null != rows[i]["finalDecision"] && "" != rows[i]["finalDecision"] && rows[i]["finalDecision"].indexOf("拒绝") > 0){
					policyType = '<code class="alert-danger">'+rows[i]["finalDecision"]+'</code>';
				}else if(null != rows[i]["finalDecision"] && "" != rows[i]["finalDecision"] && rows[i]["finalDecision"].indexOf("审核") > 0){
					policyType = '<code class="alert-info">'+rows[i]["finalDecision"]+'</code>';
				}
				//风险参数
				html += '<div class="clear item score">';
					html += '<div class="col-sm-2 no-padding"><div class="text-center" id="auto-audit-indicatorScoreContainer-' + i + '" data-score="'+ (null != rows[i]["ruleScore"] ? rows[i]["ruleScore"] : 0 )+'"><span class="score-label">风险分</span></div></div>';
					html += '<div class="col-sm-4 no-right">';
						html += "<div class='risk'>身份证:"+ rows[i]["cardNo"] +"</div>"
						html += "<div class='risk'>手&nbsp;&nbsp;&nbsp;机:"+ rows[i]["tel"] +"</div>"
						html += "<div class='risk'>风险结果:"+ policyType +"</div>"
					html += '</div>';
					html += '<div class="col-sm-4 no-right">';
						html += "<div class='risk'>手机在网:"+ (null != rows[i]["phoneOnlineTime"] && "" != rows[i]["phoneOnlineTime"] ? rows[i]["phoneOnlineTime"] : "--") +"</div>"
						html += "<div class='risk'>手机实名:"+ (null != rows[i]["phoneThreeElements"] && "" != rows[i]["phoneThreeElements"] ? rows[i]["phoneThreeElements"] : "--") +"</div>"
						html += "<div class='risk'>生成时间:"+ rows[i]['ctimeStr'] +"</div>"
					html += '</div>';
				html += '</div>';
				//命中项
				html +=  '<div class="clear item"><h6><span class="btn btn-outline btn-xs btn-default">命中项</span></h6></div>';
				html += '<div class="clear item">';
				
				var hasPolicy = false;			//是否存在命中项
				for(var map in rows[i]["itemVOMap"]){
					var results = rows[i]["itemVOMap"][map];
					html += createHeadGrid(map, results.length);
					for (var j = 0; j < results.length; j++) {
						hasPolicy = true;
						html += createBodyGrid(results[j]["ruleItemName"], results[j]["courtVOS"], results[j]["itemDetailVOS"]);
					}
				}
				if(!hasPolicy){
					html+= "<div>暂无数据</div>";
				}
				html += '</div>';
				html += '</div>';
			}
		}else{
			html+= "<p class='text-center'>暂无数据</p>";
		}
		$(".beside-query-box > .content").empty();
		$(".beside-query-box > .content").find(".tip-message").remove();
		$(".beside-query-box > .content").append(html);
		
		//动态展示风险分
		$("div[id^='auto-audit-indicatorScoreContainer']").each(function(i, n){
			var score = $(n).attr("data-score");
			$(n).radialIndicator({
				barColor: {
					0	: '#33CC33',
					33	: '#33CC33',
					60	: '#33CC33',
					80	: '#FF0000'
				},
				barWidth	: 5,
				radius		: 35,
				initValue	: 0,
				minValue	: 0,
				maxValue	: 100,
				roundCorner : true,
				percentage: false
			});
			var radialObj = $(n).data('radialIndicator');
			radialObj.animate(score);
		});
		//展示命中项
		showBesideBox();
	}
	
	function createHeadGrid(title, number){
		var html = "";
        html += '<table class="table table-bordered table-striped">';
        html += '<thead>';
        html += '<tr>';
        html += '<th colspan="2" class="gray-bg">'+title + '(命中个数：'+ number + ')' + '</th>';
		html += '</tr>';
        html += '</thead>';
        return html;
	}
	
	function createBodyGrid(ruleName, courts, items){
		var html = "";
		html += '<tbody>';
		html += '<tr><td width="30%">命中项</td><td width="70%">明细</td></tr>';
		
		if ((null == courts && null == items) || (courts.length <= 0 && courts.items <= 0)) {
			html += '<tr><td class="col-td" colspan="2">暂无相关信息</td></trd>';
		} else {
			var tmp = "";
			html += '<tr><td style="vertical-align: middle;"><strong>'+ruleName+'</strong></td>';
			for(var i=0; i<courts.length; i++){
				tmp += '<p>' + (i+1) + '、';
				tmp += '<strong>执行法院:</strong>' + ("" != courts[i]["court"] ? courts[i]["court"] : "--");
				tmp += '，<strong>执行案号：</strong>' + ("" != courts[i]["casenum"] ? courts[i]["casenum"] : "--");
				tmp += '，<strong>执行标的：</strong>' + ("" != courts[i]["money"] ? courts[i]["money"] : "--");
				tmp += '，<strong>案件状态：</strong>' + ("" != courts[i]["statute"] ? courts[i]["statute"] : "--");
				tmp += '，<strong>执行依据：</strong>' + ("" != courts[i]["basic"] ? courts[i]["basic"] : "--");
				tmp += '，<strong>执行依据文号：</strong>' + ("" != courts[i]["base"] ? courts[i]["base"] : "--");
				tmp += '，<strong>做出执行依据单位：</strong>' + ("" != courts[i]["basecompany"] ? courts[i]["basecompany"] : "--");
				tmp += '，<strong>立案时间：</strong>' + ( "" != courts[i]["time"] ? courts[i]["time"] : "--");
				tmp += '<p>';
			}
			for(var j=0; j<items.length; j++){
				tmp += (j+1) + '、'+items[j]["ruleName"]+'(<font class="red">'+( "" != items[j]["ruleVale"] && null != items[j]["ruleVale"] ? items[j]["ruleVale"] : "--") + "</font>)</br>";
			}
			
			html += '<td>'+tmp+'</td></tr>';
		}
		return html;
	}

	function getValue(value){
		if(typeof(value) != "undefined" && null != value && "" != value){
			return value;
		}else{
			return "--";
		}
	}
	window.AutoAuditCreditQuery = AutoAuditCreditQuery;
})($);