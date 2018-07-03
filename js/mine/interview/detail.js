jQuery(function ($) {
	var isInit = $("#isInit").val();
	
	try {
		if(null != isInit && isInit == 1){
			initYXChanel();
		}
	} catch (e) {
		faildMsg("视频面签初始化失败");
	}
	var timer = null;	//视频文件加载定时器
	var acceptId = $("#acceptId").val();
	//tab页卡切换
	$("#video-tab").on("click", function(){
		if(null == timer){
			timer = setInterval(function(){
				getVideoFile();
			}, 2000);
		}
	});
	
	//发起视频聊天
	$("#showNetcallVideoLink").on("click", function () {
		if ($(this).attr("class").indexOf("disabled") > 0) {
			return false;
		}else{
			//判断面签状态，是否允许视频面签
			hasFinish($("#acceptId").val(), "#successNetcallVideoLink", function () {
				try {
					yunXin.myNetcall.onClickNetcallLink(Netcall.NETCALL_TYPE_VIDEO);
				} catch (e) {
					faildMsg("视频呼叫连接失败");
				}
			});
		}
	});

	//返回列表时挂断视频面签
	$("#view-back-list").click(function(){
		if(typeof(window.yunXin) != "undefined" && null != window.yunXin){
			window.yunXin.myNetcall.cancelCalling(false);
		}
		window.location.href= ctx + "/interview/query.action";
	});

    //客户作废
    $("#cancelNetcallVideoLink").on("click", function () {
        if ($(this).attr("class").indexOf("disabled") > 0) {
            return;
        }
        //更新状态
        confirmDialog("确认作废客户面签？", function () {
            var id = $("#cancelNetcallVideoLink").attr("data-id");
            updateInterviewStatus(id, 4, $.trim($("#description").val()), function () {
                //关闭视频窗口
                if (typeof(window.yunXin) != "undefined") {
                    yunXin.myNetcall.cancelCalling(false);
                }
                //(刷新)返回列表页面
                window.location.href = ctx + "/interview/query.action";
            });
        });

    });
    
    //初始化问题列表
    var answer = new VideoAnswer("#viewInterviewQuestion", $("#acceptId").val());
    
    //完成面签
    $("#successNetcallVideoLink").on("click", function () {
        if ($(this).attr("class").indexOf("disabled") > 0) {
            return false;
        }
        if(!answer.isOver()){
        	faildMsg("面签问题未作答不能提交");
        	return false;
        }else{
        	confirmDialog("确认完成客户面签？", function () {
        		var id = $("#successNetcallVideoLink").attr("data-id");
        		updateInterviewStatus(id, 3, $.trim($("#description").val()), function () {
        			//关闭视频窗口
        			if (typeof(window.yunXin) != "undefined") {
        				yunXin.myNetcall.cancelCalling(false);
        			}
        			var tip = '<div class="loading-wrap bounceIn show">视频合成中…<div class="loading-img"><img src="'+ctx+'/styles/images/icon_waiting.gif"></div></div>';
            		$(".video-wrap").find(".tip-message").html(tip);
            		//定时加载视频文件
            		timer = setInterval(function(){
            			getVideoFile();
            		},2000);
        		});
        	});
        }
    });
    //客户详情
    getCustInfo();
    postion()
    
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    
    
    //加载视频文件
    function getVideoFile(){
    	if($(".video-content").length > 0){
    		$.ajax({
    			url: ctx + "/interview/getVideoFile.action",
    			type: "post",
    			dataType: "json",
    			data: {
    				"id": acceptId
    			},
    			success: function (data) {
    				if (data.error == 1) {
    					if(null != data["rows"]["vPath"] && "" != data["rows"]["vPath"]){
    						$(".video-content").remove();
    						$(".video-wrap").empty().html('<video style="border: 4px solid #eee;" src="'+ctx+'/fdfs/downloadFile.action?'+data["rows"]["vPath"]+'&fileName='+data["rows"]["vName"]+'" width="450" height="340" controls="controls">您的浏览器不支持视频标签</video>');
    					}
    				} else if (data.error == -100) {
    					faildMsg("会话超时，请重新登陆！");
    				} else if (data.error == -1) {
    					faildMsg(data.message);
    				}
    			}
    		});
    	}else{
    		if(null != timer){
    			clearInterval(timer);
    		}
    	}
    }
    
});
/**
 * 主要业务逻辑相关
 */
var userUID = readCookie("uid");
//初始化视频通道
function initYXChanel() {
    var yunXin = new YX(userUID)
    window.yunXin = yunXin;
}


//查询问题列表
function hasFinish(id, btnId, callback) {
    $.ajax({
        url: ctx + "/interview/hasFinish.action",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "id": id
        },
        success: function (data) {
            if (data.error == 1) {
                callback();
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else if (data.error == -1) {
                faildMsg(data.message);
            }
        }
    });
}

//查询客户信息
function getCustInfo() {
    var id = $("#acceptId").val();
    $.ajax({
        url: ctx + "/interview/customer-detail.action",
        type: "post",
        data: {id: id},
        dataType: "json",
        success: function (result) {
            if (result.error == 1) {
                var data = result.rows;
                $(".accept-type").text(data.type);
                $(".accept-num").text(data.serialNumber);
                $(".interview-title").find("span").text(data.statusName);
                $(".accept-loanBank").text(data.loanBank);
                $(".accept-loanAmount").text(data.loanAmount);
                $(".accept-loanTimeLimit").text(data.loanTimeLimit);
                $(".remark").text(data.remark);
                $(".accept-car-type").text(null != data.carBrandName && "" != data.carBrandName ? data.carBrandName : "--");
                var lenders = data.videoInterviewLenders;
                var count = 1;
                for (var i = 0; i < lenders.length; i++) {
                    var lender = lenders[i];
                    if (lender.type === 'BUYER') {
                        $(".accept-localtion-name").text(lender.lender);
                        $(".accept-lender-name").text(lender.lender);
                        $(".accept-lender-cardNo").text(lender.cardNo);
                        $(".accept-lender-sex").text(lender.sex);
                        $(".accept-lender-tel").text(lender.tel);
                        $(".accept-lender-address").text(lender.currentProvince + lender.currentCity + lender.currentTown + lender.currentAddress);
                    }
                    if (lender.type === 'SHARED') {
                        $(".accept-coLender").text(lender.lender);
                        $(".accept-coCardNo").text(lender.cardNo);
                        $(".accept-coSex").text(lender.sex);
                        $(".accept-coTel").text(lender.tel);
                    }
                    if (lender.type === 'SPONSOR') {
                        if (count == 1) {
                            $(".oneGuarantor").text(lender.lender);
                            $(".oneGuarantorCardNo").text(lender.cardNo);
                            $(".oneGuarantorSex").text(lender.sex);
                            $(".oneGuarantorTel").text(lender.tel);
                        }
                        if (count == 2) {
                            $(".twoGuarantor").text(lender.lender);
                            $(".twoGuarantorCardNo").text(lender.cardNo);
                            $(".twoGuarantorSex").text(lender.sex);
                            $(".twoGuarantorTel").text(lender.tel);
                            $(".twoGuarantor-lender").removeClass("hide");
                        }
                        if (count == 3) {
                            $(".threeGuarantor").text(lender.lender);
                            $(".threeGuarantorCardNo").text(lender.cardNo);
                            $(".threeGuarantorSex").text(lender.sex);
                            $(".threeGuarantorTel").text(lender.tel);
                            $(".threeGuarantor-lender").removeClass("hide");
                        }
                        if (count == 4) {
                            $(".fourGuarantor").text(lender.lender);
                            $(".fourGuarantorCardNo").text(lender.cardNo);
                            $(".fourGuarantorSex").text(lender.sex);
                            $(".fourGuarantorTel").text(lender.tel);
                            $(".fourGuarantor-lender").removeClass("hide");
                        }
                        count++;
                    }
                }

                var lenderFiles = data.videoInterviewLenders;
                var files = data.videoInterviewFiles;
                var html = '';
                var video = '';

                for (var i = 0; i < lenderFiles.length; i++) {
                    var file = lenderFiles[i];
                    if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.cardFrontPhotoFileName)) {
                        html += '<img class="pre-img" alt="" src="' + file.cardFrontPhotoFilePath + '">';
                    }
                    if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.cardBackPhotoFileName)) {
                        html += '<img class="pre-img" alt="" src="' + file.cardBackPhotoFilePath + '">';
                    }
                }
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.fileName)) {
                        html += '<img class="pre-img" alt="" src="' + file.filePath + '" />';
                    }
                    if (/\.(mp4|avi|3gp|rmvb|wmv|mkv|mpg|mpeg|vob|mov|flv)$/.test(file.fileName)) {
                        video += '<div class="videobox"><video id="video_' + i + '" controls="controls"><source src="' + file.filePath + '" type="video/mp4" >您的浏览器不支持 video 标签。</video></div>';
                    }
                }
                if (html != '') {
                    $(".file-image").append(html);
                    //图片放大事件
                    $(".file-image").find(".pre-img").on("click",function(){
                    	$.openPhotoGallery(this)
                    });
                } else {
                    $(".file-image").css({'margin-bottom':'15px','margin-top':'15px','margin-left': '0'}).append('暂无数据');
                }
                if (video != '') {
                    $(".file-video").append(video);
                } else {
                    $(".file-video").css({'margin-bottom':'15px','margin-top':'15px','margin-left': '0'}).append('暂无数据');
                }
            }
        }
    });
}
//完成面签
function updateInterviewStatus(id, status, description, callback) {
	loadingShow();
    $.ajax({
        url: ctx + "/interview/updateStatus.action",
        type: "post",
        dataType: "json",
        data: {
            "id"			: id,
            "status"		: status,
            "description"	: description
        },
        success: function (data) {
        	loadingHide();
            if (data.error == 1) {
                if (status == 3) {
                    successMsg("面签完成", 1000);
                } else {
                    successMsg(data.message, 1000);
                }
                if (typeof(callback) == "function") {
                    setTimeout(function () {
                        callback();
                    }, 2000);
                }
                $("#showNetcallVideoLink").addClass("disabled").unbind('click');
                $("#cancelNetcallVideoLink").addClass("disabled").unbind('click');
                $("#successNetcallVideoLink").addClass("disabled").unbind('click');
                $("#description").attr("readonly", true);
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
};


function postion() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.map.baidu.com/api?v=2.0&ak=kuUsODLid5YACwpzOsiuxPvjzaBUQA8N&s=1&callback=init"; //<-注意 callback回调，同步加载没有&callback
    document.body.appendChild(script);
}
function init() {
    //地图初始化
    var lon = $("#lon").val();
    var lat = $("#lat").val();
    var icon = new BMap.Icon(ctx + '/styles/images/icon_postion_1.png', new BMap.Size(20, 32), {
        anchor: new BMap.Size(10, 15)
    });
    if ((lon == "") || (lat == "")) {
        var bm = new BMap.Map("allmap", {enableMapClick: false});
        bm.centerAndZoom(new BMap.Point(116.404, 39.915), 15);  // 初始化地图,设置中心点坐标和地图级别
        bm.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
        bm.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        bm.addControl(new BMap.NavigationControl());
        var address = $("#address").html();
        var opts = {
            width: 200,			// 信息窗口宽度
            height: 50,				// 信息窗口高度
            title: "客户位置信息",	// 信息窗口标题
        }
        bm.disableDragging();
        var infoWindow = new BMap.InfoWindow("客户未准备面签,或面签GPS信息出错");
        bm.addEventListener("tilesloaded", function () {
            bm.clearOverlays();
            var new_point = new BMap.Point(116.403532, 39.915232);
            var marker = new BMap.Marker(new_point, {
                icon: icon
            });  // 创建标注
            bm.addOverlay(marker);
            bm.panTo(new_point);
            bm.openInfoWindow(infoWindow, new_point);
        });
        bm.addEventListener("click", function () {
            bm.clearOverlays();
            var new_point = new BMap.Point(116.403532, 39.915232, {enableMapClick: false});
            var marker = new BMap.Marker(new_point, {
                icon: icon
            });  // 创建标注
            bm.addOverlay(marker);
            bm.panTo(new_point);
            bm.openInfoWindow(infoWindow, new_point);

        });
    } else {
        var bm = new BMap.Map("allmap", {enableMapClick: false});
        bm.centerAndZoom(new BMap.Point(116.404, 39.915), 15);  // 初始化地图,设置中心点坐标和地图级别
        bm.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
        bm.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        bm.addControl(new BMap.NavigationControl());
        var address = $("#address").html();
        var opts = {
            width: 200,			// 信息窗口宽度
            height: 50,				// 信息窗口高度
            title: "客户位置信息",	// 信息窗口标题
        };

        bm.disableDragging();
        var infoWindow = new BMap.InfoWindow("地址:" + address, opts);
        bm.addEventListener("tilesloaded", function () {
            bm.clearOverlays();
            var new_point = new BMap.Point(Number($("#lon").val()), Number($("#lat").val()));
            var marker = new BMap.Marker(new_point, {
                icon: icon
            });  // 创建标注
            bm.addOverlay(marker);
            bm.panTo(new_point);
            bm.openInfoWindow(infoWindow, new_point);

        });
        bm.addEventListener("click", function () {
            bm.clearOverlays();
            var new_point = new BMap.Point(Number($("#lon").val()), Number($("#lat").val()));
            var marker = new BMap.Marker(new_point, {
                icon: icon
            });  // 创建标注
            bm.addOverlay(marker);
            bm.panTo(new_point);
            bm.openInfoWindow(infoWindow, new_point);

        });
    }
};
//更新面签业务视频通道编号
function updateVedioChannel(channelId) {
    $.ajax({
        url: ctx + "/interview/updateChannel.action",
        type: "post",
        dataType: "json",
        data: {
            "id": $("#acceptId").val(),
            "channelId": channelId
        },
        success: function (data) {
            if (data.error == 1) {
                console.log("update video channel success");
            } else if (data.error == -100) {
                faildMsg("会话超时，请重新登陆！");
            } else {
                faildMsg(data.message);
            }
        }
    });
}

//视频没有找到
function onfindVid() {
	loadingShow(3);
}

//关闭浏览器时挂断视频面签
function closeEvent(event){
	event.preventDefault();
	if(typeof(window.yunXin) != "undefined" && null != window.yunXin){
		window.yunXin.myNetcall.cancelCalling(false);
	}
}