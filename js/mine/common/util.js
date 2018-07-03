/**
 * Created by Administrator on 2017/10/17.
 */
//简单提示框创建
//text:提示文字
//seconds:时间，单位毫秒，多少毫秒之后消失
function alertAutoClose(text, seconds, callback) {
    if (seconds) {
        if (typeof seconds !== 'number') {
            throw new Error('seconds为number类型');
        }
    } else {
        seconds = 1500;
    }
    var func = function () {
    };
    if (typeof callback == 'function') {
        func = callback;
    }
    var sHtml = '';
    var salt = new Date().getTime();
    sHtml += '<script type="text/template" title="" id="dialog-' + salt + '">\
            <div data-id="title" class="dialog-item">\
            	<div class="dialog-tips-nobtn">\
            		<p class="tips">' + text + '</p>\
            	</div>\
			</div>\
            <div class="dialog-manage">';
    sHtml += '</div>\
	</script>';
    $('body').append(sHtml);

    var _defults = {
        width: 300,
        top: 200,
        height: 150,
        overlay: true,
        dispose: true,
        isStick: true,
        move: true,
        title: '提示',
        autoClose: seconds,
        callback: function () {
        },
        onAfterHide: function () {
            $('#dialog-' + salt).remove();
        }
    };

    var editDlg = new Dialog('#dialog-' + salt, _defults);
    editDlg.show();
    setTimeout(function () {
        $('.dialog-overlay-left', parent.document).eq(0).remove();
        $('.dialog-overlay-top', parent.document).eq(0).remove();
        func();
    }, seconds);
}

//text:提示文字
function alertDialog(text) {
    var sHtml = '';
    var salt = new Date().getTime();
    sHtml += '<script type="text/template" title="" id="dialog-' + salt + '">\
            <div data-id="title" class="dialog-item">\
            	<div class="dialog-tips">\
            		<p class="tips">' + text + '</p>\
            	</div>\
			</div>\
            <div class="dialog-manage">\
	            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>\
    </div>\
	</script>';
    $('body').append(sHtml);

    var _defults = {
        width: 300,
        top: 200,
        height: 145,
        overlay: true,
        dispose: true,
        isStick: true,
        move: true,
        title: '提示',
        callback: function () {
        },
        onAfterHide: function () {
            $('#dialog-' + salt).remove();
        }
    };

    var editDlg = new Dialog('#dialog-' + salt, _defults);
    editDlg.show();
}

//简单提示框创建
//text:提示文字
//hasCancel:是否有取消按钮，默认：有；传入参数boolean类型
//option:弹出框配置参数
//func:回调函数
function confirmDialog(text, hasCancel, option, func) {
	var salt = new Date().getTime();
	var  _defults = {
	        width: 300,
	        top: 240,
	        height: 150,
	        overlay: true,
	        dispose: true,
	        move: true,
	        title: '提示',
	        callback: function () {
	            func();
	        },
	        onAfterHide: function () {
	            $('#dialog-' + salt).remove();
	        }
	}
	switch (arguments.length) {
	    case 1:
	        hasCancel = true;
	        option =_defults;
	        func = function () { };
	        break;
	    case 2:
	        var temp1 = arguments[1];
	        if (typeof temp1 != 'boolean') {
	            hasCancel = true;
	            if (typeof temp1 == 'object') {
	          	  option = $.extend({}, _defults, temp1 || {});
	          	  func =  function () { };
	            } else if(typeof temp1 == 'function') {
						option =_defults;
						func = temp1;
	            }else {
	          	  
	            }
	        }
	        break;
	    case 3:
	        var temp1 = arguments[1];
	        var temp2 = arguments[2];
	        if (typeof temp1 != 'boolean') {
	            hasCancel = true;
	            if (typeof temp1 == 'object') {
	            	 option = $.extend({}, _defults, temp1 || {});
	            	 func = temp2;
	            } else {
	//					throw new Error('第二个参数不合法');
	            }
	        }
	        break;
	    case 4:
	        var temp1 = arguments[1];
	        var temp2 = arguments[2];
	        var temp3 = arguments[3];
	        break;
	}
	var sHtml = '';
	sHtml += '<script type="text/template" title="" id="dialog-' + salt + '">\
	        <div data-id="title" class="dialog-item">\
	        	<div class="dialog-tips">\
	        		<p class="tips">' + text + '</p>\
	        	</div>\
				</div>\
	        <div class="dialog-manage">\
		            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a> ';
	if (hasCancel) {
	    sHtml += '<a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>';
	}
	sHtml += '</div>\
		</script>';
	$('body').append(sHtml);
	var editDlg = new Dialog('#dialog-' + salt, option);
	editDlg.show();
}

//成功提示
//text:提示文字   必填
//sec：（停留时间），单位：毫秒，默认：1500毫秒  可不填 
//callback：回调函数
function successMsg(text, sec, callback) {
    var loadingText = '';
    var seconds = 1500;
    var func = function () {
    };
    switch (arguments.length) {
        case 1:
            var temp = text;
            if (typeof temp == 'string') {
                loadingText = text;
            } else {
                throw new Error('参数不合法');
            }
            break;
        case 2:
            var temp1 = text;
            var temp2 = sec;
            if (typeof temp1 == 'string') {
                loadingText = text;
            } else {
                throw new Error('参数text不合法');
            }

            if (typeof temp2 == 'number') {
                seconds = sec;
            } else if (typeof temp2 == 'function') {
                func = sec;
            } else {
                throw new Error('参数sec不合法');
            }
            break;
        case 3:
            var temp1 = text;
            var temp2 = sec;
            var temp3 = callback;
            if (typeof temp1 == 'string') {
                loadingText = text;
            } else {
                throw new Error('参数text不合法');
            }

            if (typeof temp2 == 'number') {
                seconds = sec;
            } else {
                throw new Error('参数sec不合法');
            }

            if (typeof temp3 == 'function') {
                func = callback;
            } else {
                throw new Error('参数callback不合法');
            }
            break;
    }


    var sHtml = '';
    sHtml += '<div class="loading-overlay"></div>\
		<div class="success-msg">\
			<div class="msg-text">\
				<p title="' + loadingText + '">' + loadingText + '</p>\
			</div>\
		</div>';
    if (window.location.href.indexOf('file://') > -1) {
        $('body').append(sHtml);
    } else {
        $('body', parent.document).append(sHtml);
    }

    var $overlay = null;
    var $container = null;
    if (window.location.href.indexOf('file://') > -1) {
        $overlay = $('.loading-overlay');
        $container = $('.success-msg');
    } else {
        $overlay = $('.loading-overlay', parent.document);
        $container = $('.success-msg', parent.document);
    }

    var _w = $container.width();
    $overlay.fadeIn(600);
    $container.css('margin-left', -_w / 2).fadeIn(600);

    setTimeout(function () {
        $overlay.fadeOut(700, function () {
            $(this).remove()
        });
        $container.css('margin-left', -_w / 2).fadeOut(700, function () {
            $(this).remove()
        });
        setTimeout(function () {
            func();
        }, 800);
    }, seconds);
}


//失败提示
//text:提示文字   必填
//sec：（停留时间），单位：毫秒，默认：1500毫秒  可不填 
//callback 回调函数
function faildMsg(text, sec, callback) {

    var loadingText = '';
    var seconds = 1500;
    var func = function () {
    };
    switch (arguments.length) {
        case 1:
            var temp = text;
            if (typeof temp == 'string') {
                loadingText = text;
            } else {
                throw new Error('参数不合法');
            }
            break;
        case 2:
            var temp1 = text;
            var temp2 = sec;
            if (typeof temp1 == 'string') {
                loadingText = text;
            } else {
                throw new Error('参数text不合法');
            }

            if (typeof temp2 == 'number') {
                seconds = sec;
            } else if (typeof temp2 == 'function') {
                func = sec;
            } else {
                throw new Error('参数sec不合法');
            }
            break;
        case 3:
            var temp1 = text;
            var temp2 = sec;
            var temp3 = callback;
            if (typeof temp1 == 'string') {
                loadingText = text;
            } else {
                throw new Error('参数text不合法');
            }

            if (typeof temp2 == 'number') {
                seconds = sec;
            } else {
                throw new Error('参数sec不合法');
            }

            if (typeof temp3 == 'function') {
                func = callback;
            } else {
                throw new Error('参数callback不合法');
            }
            break;
    }


    var sHtml = '';
    sHtml += '<div class="loading-overlay"></div>\
		<div class="faild-msg">\
			<div class="msg-text">\
				<p title="' + loadingText + '">' + loadingText + '</p>\
			</div>\
		</div>';
    if (window.location.href.indexOf('file://') > -1) {
        $('body').append(sHtml);
    } else {
        $('body', parent.document).append(sHtml);
    }

    var $overlay = null;
    var $container = null;
    if (window.location.href.indexOf('file://') > -1) {
        $overlay = $('.loading-overlay');
        $container = $('.faild-msg');
    } else {
        $overlay = $('.loading-overlay', parent.document);
        $container = $('.faild-msg', parent.document);
    }

    var _w = $container.width();
    $overlay.fadeIn(600);
    $container.css('margin-left', -_w / 2).fadeIn(600);

    setTimeout(function () {
        $overlay.fadeOut(800, function () {
            $(this).remove()
        });
        $container.css('margin-left', -_w / 2).fadeOut(800, function () {
            $(this).remove()
        });
        setTimeout(function () {
            func();
        }, 800);
    }, seconds);
}
function getKeywords(id, callback, len) {
    var timeGap;  //输入关键词的时间间隔
    var len = arguments[2] ? arguments[2] : 1;  //开始搜索联想的关键词长度限制
    var $keywords = $('#' + id);  //获取搜索框
    $keywords.attr('autocomplete', 'off'); //去除搜索框自动填充
    $keywords.keyup(function (event) {  //每次键位操作
        if ($keywords.val() == "" || $keywords.val() == " ") {  //没有输入关键字或者输入空格则隐藏并返回
            $keywords.next().hide();
            return;
        }
        if (event.which != 39 && event.which != 40 && event.which != 37 && event.which != 38 && event.which != 13) {    //每一个输入操作时执行
            if ($keywords.val().length >= len) {  //当输入内容大于等于定义的限制长度时
                clearTimeout(timeGap);
                timeGap = setTimeout(function () {
                    callback();  //ajax获取搜索框内容$keywords.val()并输出结果数据results  
                }, 200);
            }
        }
    });
}
//联想结果输出
function showResults(id, results) {
    results = textHighLight(id, results);
    var len = results.length;   //results长度
    var $keywords = $('#' + id);  //获取搜索框
    var $results = $keywords.next();  //获取结果框
    if (len == 0) {	//如果没有返回结果数据则隐藏结果框
        $results.hide();
    } else {
        $results.show();
    }
    var spans = '';	//结果数据拼接
    for (var i = 0; i < len; i++) {
        spans += "<span>" + results[i] + "</span>";
    }
    $results.html(spans);  //输出所有结果数据
    $results.children().click(function () {  //单击选中
        $keywords.val($(this).text());
        $keywords.focus();  //输入框获取焦点
        $results.hide();  //结果框收缩隐藏
    });
    $('body').click(function () { //单击任何位置隐藏结果框
        $('.results').hide();
    });
    var numspan = 0;
    $keywords.keydown(function (event) {
        //回车键
        if (event.which == 13) {
            $results.hide();  //结果框收缩隐藏
        }
        //下键
        if (event.which == 40) {
            if (numspan == len) {
                numspan = 0;
            }
            for (var i = 0; i < len; i++) {  //选择项高亮
                if (numspan == i) {
                    $results.children().eq(i).css("background-color", "#e6eff9");
                } else {
                    $results.children().eq(i).css("background-color", "#fff");
                }
            }
            $keywords.val($results.children().eq(numspan).text());
            numspan++;
        }
        //上键
        if (event.which == 38) {
            numspan--;
            if (numspan == -1) {
                numspan = len - 1;
            }
            for (var i = 0; i < len; i++) {  //选择项高亮
                if (numspan == i) {
                    $results.children().eq(i).css("background-color", "#e6eff9");
                } else {
                    $results.children().eq(i).css("background-color", "#fff");
                }
            }
            $keywords.val($results.children().eq(numspan).text());
        }
    });
    //鼠标指针悬浮高亮
    $results.children().mouseover(function () {
        numspan = $(this).index();
        for (var i = 0; i < len; i++) {
            if (numspan == i) {
                $results.children().eq(i).css("background", "#e6eff9");
            } else {
                $results.children().eq(i).css("background", "#fff");
            }
        }
    });
}
//关键词高亮
function textHighLight(id, data) {
    var $keyword = $('#' + id);
    var keyVal = $keyword.val();
    var results = [];
    var re = new RegExp(keyVal, 'i');
    for (var i = 0; i < data.length; i++) {
        var matchs = data[i].match(re);
        var str = data[i].replace(re, '<font style="color:#f0ad4e">' + matchs[0] + '</font>');
        results.push(str);
    }
    return results;
}

//显示加载提示
//text:提示文字，默认："加载中..."   可不填
//sec：（淡入），单位：毫秒，默认：300毫秒  可不填 
function loadingShow(sec) {
    //var loadingText = '加载中';
    var seconds = 300;
    switch (arguments.length) {
        case 1:
            var temp = sec;
            if (typeof temp == 'number') {
                seconds = sec;
            } else {
                throw new Error('参数不合法');
            }
            break;
//		case 2:
//			var temp1 = text;
//			var temp2 = sec;
//			if(typeof temp1 == 'string'){
//				loadingText = text;
//			}else{
//				throw new Error('参数text不合法');
//			}
//
//			if(typeof temp2 == 'number'){
//				seconds = sec;
//			}else{
//				throw new Error('参数sec不合法');
//			}
//			break;
//	}
    }
    var sHtml = '';
    sHtml += '<div class="loading-overlay"></div>\
		<div class="loading-container">\
			<div class="loading-img"><img src="styles/images/loading.gif"></div>\
		</div>';
    $('body', parent.document).append(sHtml);
    $('.loading-overlay', parent.document).fadeIn(seconds);
    $('.loading-container', parent.document).fadeIn(seconds);
}

//关闭加载提示
//sec：（淡出），单位：毫秒，默认：300毫秒  可不填 
function loadingHide(sec) {
    var seconds = 300;
    if (sec) {
        if (typeof sec == 'number') {
            seconds = sec;
        } else {
            throw new Error('参数sec不合法');
        }
    }
    try {
    	var $overlay = $('.loading-overlay', parent.document);
    	var $container = $('.loading-container', parent.document);
    	$overlay.fadeOut(seconds);
    	$container.fadeOut(seconds);
    	setTimeout(function () {
    		$overlay.remove();
    		$container.remove();
    	}, seconds);
	} catch (e) {
		console.log(e);
	}
}

//页面局部刷新显示loading
function showLoading(containerId){
	var sHtml = '<div class="loading-wrap bounceIn show">'+
					'<div class="loading-img"><img src="'+ctx +'/styles/images/loading.gif"></div>'+
				'</div>';
	$(containerId).append(sHtml);
}

//隐藏loading
function hideLoading(containerId){
	$(containerId).find(".loading-wrap").remove();
}
//bankCreditReport.action,/bankCreditReport.action?id=123
//function quickOpenUrl(url, targetUrl) {
//    var $menuItem = parent.$(".J_menuItem");
//    //查询一级菜单url
//    for (var i = 0; i < $menuItem.length; i++) {
//        var menuItem = $menuItem[i];
//        var href = $(menuItem).attr("href");
//        var menuName = null;
//        var dataIndex = null;
//        if (url == href) {
//            menuName = $(menuItem).find("span.nav-label").html();
//            dataIndex = $(menuItem).attr("data-index");
//            openTabForParent(targetUrl, dataIndex, menuName);
//        }
//    }
//}

function closeTabForParent(dataUrl) {
	if (dataUrl == undefined || $.trim(dataUrl).length == 0){
    	return false;
    }
	$('.J_menuTab', parent.document).each(function () {
        //var Index = target.attr("name").replace(/[^0-9]/ig, "");
        if ($(this).data('id') == dataUrl) {
        	 var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]', parent.document);
             var width = $(this).width();
             
        	if($(this).hasClass("active")){
        		 if ($(this).next(".J_menuTab").size()) {
        			 var nextDataId = $(this).next(".J_menuTab:eq(0)").data("id");
                     $(this).next(".J_menuTab:eq(0)").addClass("active");
                     $(".J_mainContent .J_iframe",parent.document).each(function() {
                         if ($(this).data("id") == nextDataId) {
                             $(this).show().siblings(".J_iframe").hide();
                             return false
                         }
                     });
                     var marginLeft = parseInt($(".page-tabs-content",parent.document).css("margin-left"));
                     if (marginLeft < 0) {
                         $(".page-tabs-content",parent.document).animate({
                             marginLeft: (marginLeft + width) + "px"
                         }, "fast")
                     }
                     $(this).remove();
                     $(".J_mainContent .J_iframe",parent.document).each(function() {
                         if ($(this).data("id") == dataUrl) {
                             $(this).remove();
                             return false
                         }
                     })
                     return
        		 }
        		 if ($(this).prev(".J_menuTab").size()) {
                     var preDataId = $(this).prev(".J_menuTab:last").data("id");
                     $(this).prev(".J_menuTab:last").addClass("active").find("i").attr("class","fa fa-times-circle-active");
                     $(".J_mainContent .J_iframe",parent.document).each(function() {
                         if ($(this).data("id") == preDataId) {
                             $(this).show().siblings(".J_iframe").hide();
                             return false
                         }
                     });
                     $(this).remove();
                     $(".J_mainContent .J_iframe",parent.document).each(function() {
                         if ($(this).data("id") == dataUrl) {
                             $(this).remove();
                             return false
                         }
                     })
                 }
        	}else {
                $(this).remove();
                $(".J_mainContent .J_iframe",parent.document).each(function() {
                    if ($(this).data("id") == dataUrl) {
                        $(this).remove();
                        return false
                    }
                });
                scrollToTabForParent($('.J_menuTab.active', parent.document));
            }
        	return false
        }
    });
}

function openTabForParent(dataUrl, dataIndex, menuName) {
    // 获取标识数据
    var flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0){
    	return false;
    }
    // 选项卡菜单已存在
    $('.J_menuTab', parent.document).each(function () {
        var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]', parent.document);
        var Index = target.attr("name").replace(/[^0-9]/ig, "");
        if ($(this).data('id') == dataUrl || Index == dataIndex) {
            loadingShow();
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                $(this).find("i").attr("class","fa fa-times-circle-active");
                scrollToTabForParent(this);
                // 显示tab对应的内容区
                $('.J_mainContent .J_iframe', parent.document).each(function () {
                    var Index = $(this).attr("name").replace(/[^0-9]/ig, "");
                    if ($(this).data('id') == dataUrl || Index === dataIndex) {
                        $(this).show().siblings('.J_iframe').hide();
                        loadingHide();
                        return false;
                    }
                });
            } else {
                loadingHide();
            }
            flag = false;
            return flag;
        }
    });

    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle-active"></i></a>';
        var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + ' " frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
        $('.J_menuTab', parent.document).removeClass('active').find("i").attr("class","fa fa-times-circle");

        // 添加选项卡对应的iframe
        $('.J_mainContent', parent.document).find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
        $('.J_menuTabs .page-tabs-content', parent.document).append(str);
        //显示loading提示
        loadingShow();

        scrollToTabForParent($('.J_menuTab.active', parent.document));
        $('.J_mainContent iframe:visible', parent.document).load(function () {
            //iframe加载完成后隐藏loading提示
            loadingHide();
        });
    }
    return false;
}

//滚动到指定选项卡
function scrollToTabForParent(element) {
    var marginLeftVal = calSumWidthForParent($(element).prevAll()),
        marginRightVal = calSumWidthForParent($(element).nextAll());
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidthForParent($(".content-tabs", parent.document).children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs", parent.document).outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if ($(".page-tabs-content", parent.document).outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content", parent.document).outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    $('.page-tabs-content', parent.document).animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
}

//计算元素集合的总宽度
function calSumWidthForParent(elements) {
    var width = 0;
    $(elements).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
}

//判断返回的结果为空
function innerTip(message, id) {
    var stt = '<div class="ibox-content b-n">' +
        '<p class="text-center tip-message">' + message + '</p>' +
        '</div>';
    $(id).append(stt);
}

//关闭当前tab页
function closeParentCurrentTab(){
	$(".active.J_menuTab", window.parent.document).find("i").trigger("click");
}

function sortTable(table, idx) {
    var otable = document.getElementById(table),
        otody = otable.tBodies[0],
        otr = otody.rows,
        tarr = [];
    for (var i = 0; i < otr.length; i++) {
        tarr[i] = otr[i];
    }

    // console.log(tarr);
    if (otody.sortCol == idx) {
        tarr.reverse();
    } else {
        tarr.sort(function (tr1, tr2) {
            var value1 = tr1.cells[idx].innerHTML;
            var value2 = tr2.cells[idx].innerHTML;
            if (!isNaN(value1) && !isNaN(value2)) {
                return value1 - value2;
            } else {
                return value1.localeCompare(value2);
            }
        })
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < tarr.length; i++) {
        fragment.appendChild(tarr[i]);
    }

    otody.appendChild(fragment);
    otody.sortCol = idx;
}
function makeArr(obj){
	return Array.prototype.slice.call(obj,0);
}
//拖动
function Drag(table, thNum) {
    var ochek = document.getElementsByClassName("table-responsive")[0],
		    otable = document.getElementById(table),
		    otody = otable.tBodies[0],
		    oth = otable.getElementsByTagName("th"),
		    otd = otody.getElementsByTagName("td"),
		    box = document.createElement("div"),
		    arrn = [];
    box.setAttribute('id','box');
    ochek.appendChild(box);
    for (var i = 0; i < otd.length; i++) {
        otd[i].onmousedown = function (e) {
        	var ntable = document.getElementById("newTable");
            var e = e || window.event,
                target = e.target || e.srcElement,
                thW = target.offsetWidth,
                maxl = ochek.offsetWidth - thW;
            if(ntable){
            	var cell,
                rows = new Array;
            	cell = makeArr(ntable.rows);
            	for(var j = 0; j < cell.length;j++){
                	rows.push(cell[j]);
                }
            	cell = makeArr(otable.rows);
                for(var j = 1; j < cell.length;j++){
                	rows.push(cell[j]);
                }
        	}else{
        		var rows = otable.rows;
        	}
            
           var ckL = ochek.offsetLeft,
                disX = target.offsetLeft,
                _this = this,
                cdisX = e.clientX - ckL - disX;
            for (var i = 0; i < rows.length; i++) {
                if(thNum[i] ==this.cellIndex){
                    return
                }else{
                    var op = document.createElement("p");
                    op.innerHTML = rows[i].cells[this.cellIndex].innerHTML;
                    box.appendChild(op);
                }
            }

            for (var i = 0; i < oth.length; i++) {
                    arrn.push(oth[i].offsetLeft);
            }

            box.style.display = "block";
            box.style.width = thW + "px";
            box.style.left = disX + "px";

            //未完成 还有事件没写。
            document.onmousemove = function (e) {
                var e = e || window.event,
                    target = e.target || e.srcElement,
                    thW = target.offsetWidth;
                box.style.top = 0;
                box.style.left = e.clientX - ckL - cdisX + "px";
                if (box.offsetLeft > maxl) {
                    box.style.left = maxl + "px";
                } else if (box.offsetLeft < 0) {
                    box.style.left = 0;
                }
                document.onselectstart = function () {
                    return false
                };
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
            };
            document.onmouseup = function (e) {
                var index;
                var e = e || window.event,
                    opr = box.getElementsByTagName("p"),
                    oboxl = box.offsetLeft + cdisX;
                for (var i = 0; i < arrn.length; i++) {
                    if (arrn[i] < oboxl) {
                        index = i;
                    }
                }
                for (var i = 0; i < thNum.length; i++) {
                    if(index == thNum[i]){
                        return
                    }
                }
                for (var i = 0; i < rows.length; i++) {
                    rows[i].cells[_this.cellIndex].innerHTML = "";
                    rows[i].cells[_this.cellIndex].innerHTML = rows[i].cells[index].innerHTML;
                    rows[i].cells[index].innerHTML = "";
                    rows[i].cells[index].innerHTML = opr[i].innerHTML;
                }

                box.innerHTML = "";
                arrn.splice(0, arrn.length);
                box.style.display = "none";
                document.onmousemove = null;
                document.onmouseup = null;
                document.onselectstart = function () {
                    return false
                };
            }
        }
    }
}
