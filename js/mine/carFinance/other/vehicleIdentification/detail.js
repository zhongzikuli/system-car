$(function(){
	//右侧实时切换
	$(window).on('scroll',function(){
		right_ssqh();
	});
	function right_ssqh(){
		if(!($(document).scrollTop() - $("#chjs").offset().top<0)){
			$("#m_right_xf_1 a.a_4").addClass("curr").siblings().removeClass("curr");//添加样式
		}else if(!($(document).scrollTop() - $("#xxbg").offset().top<0)){
			$("#m_right_xf_1 a.a_3").addClass("curr").siblings().removeClass("curr");//添加样式
		}else if(!($(document).scrollTop() - $("#bggy").offset().top<0)){
			$("#m_right_xf_1 a.a_2").addClass("curr").siblings().removeClass("curr");//添加样式
		}else if(!($(document).scrollTop() - $("#jbxx").offset().top<0)){
			$("#m_right_xf_1 a.a_1").addClass("curr").siblings().removeClass("curr");//添加样式
		}
	}
	
	//维修保养记录
	$("#m_right_xf_1 a").click(function(){
		$(this).addClass("curr").siblings().removeClass("curr");//添加样式
		if($(this).hasClass("a_1")){//基本信息
			$("html,body").animate({scrollTop: $("#jbxx").offset().top}, 300);
		}else if($(this).hasClass("a_2")){//报告概要
			$("html,body").animate({scrollTop: $("#bggy").offset().top}, 300);
		}else if($(this).hasClass("a_3")){//详细记录
			$("html,body").animate({scrollTop: $("#xxbg").offset().top}, 300);
		}else if($(this).hasClass("a_4")){//词汇解释
			$("html,body").animate({scrollTop: $("#chjs").offset().top}, 300);
		}
	});
})