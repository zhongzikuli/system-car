(function ($) {
    $(function () {
        var Client = function () {
            //construct a meeting client with signal client and rtc client
            function Client(sclient, rclient, localAccount) {
                _classCallCheck(this, Client);

                this.signal = sclient;
                this.rtc = rclient;
                this.localAccount = localAccount;
                
                // 通话时长
                this.netcallDuration = 0;
                // 通话正式开始时间戳
                this.netcallStartTime = 0;
                // 通话时长定时器
                this.netcallDurationTimer = null;

                //ring tones resources
                this.sound_ring = new Howl({
                    src: [ctx + '/js/third/agora/sound/basic_ring.mp3'],
                    loop: true
                });

                this.sound_tones = new Howl({
                    src: [ctx + '/js/third/agora/sound/basic_tones.mp3'],
                    loop: true
                });

                this.signal.onInviteReceived = $.proxy(this.onInviteReceived, this);
                this.signal.onInviteEndByPeer = $.proxy(this.onInviteEndByPeer, this);
                
                this.signal.onInviteRefusedByPeer = $.proxy(this.onInviteRefusedByPeer, this);
                this.signal.onInviteAcceptedByPeer = $.proxy(this.onInviteAcceptedByPeer, this);
                this.signal.onInviteEndByMyself = $.proxy(this.onInviteEndByMyself, this);
                this.signal.onInviteFailed= $.proxy(this.onInviteFailed, this);

                this.subscribeEvents();
            }

            //return a promise resolves a remote account name
            _createClass(Client, [{
                key: 'requestRemoteAccount',
                value: function requestRemoteAccount() {
                    var deferred = $.Deferred();
                    var accountField = $("#salerId").val();
                    var localAccount = this.localAccount;

                    var account = $("#salerId").val();

                    if (!account) {
                    	Message.show("视频面签账号不存在");
                    } else if ('' + account === '' + localAccount) {
                    	Message.show("用户不能对自己进行视频面签");
                    } else {
                        deferred.resolve(account);
                    }
                    return deferred;
                }
                //return a promise resolves a signaling call result
            }, {
                key: 'call',
                value: function call(channelName, account, requirePeerOnline) {
                	var _this = this;
                    var deferred = $.Deferred();
                    var signal = this.signal;
                    if(null == signal.session){
                    	_this.hideWaitWindow();
                    	return;
                    }else{
                    	
                    	//查询频道内人数
                    	signal.session.invoke("io.agora.signal.channel_query_num", {
                    		"name" : channelName
                    	}, function(err, data){
                    		console.log("[Calling Channel People Number ] " + data['num']);
                    	});
                    	
                    	//判断用户是否在线
                    	signal.session.invoke("io.agora.signal.user_query_user_status", {
                    		"account" : account
                    	}, function(err, data){
                    		console.log("[Calling Account Status ] acccount:" + account +",status:" + data["status"]);
                    		if(data["status"] == 0){
                    			_this.hideWaitWindow();
                    			Message.show("用户不在线，暂不能进行视频面签");
                    			return;
                    		}
                    	});
                    	
                    	//展示等待窗口
                    	_this.showWaitWindow();

                    	//开始呼叫
                    	signal.call(channelName, account, requirePeerOnline).done(function (_) {
                    		deferred.resolve();
                    	}).fail($.proxy(function (err) {
                    		Message.show(err.reason);
                    		deferred.reject();
                    	}, this));
                    	return deferred.promise();
                    }
                }
                //end given call object, passive means the call is ended by peer
            }, {
                key: 'endCall',
                value: function endCall(call, passive) {
                	console.log("1---[end call] " + call);
                    var deferred = $.Deferred();
                    var signal = this.signal;
                    var rtc = this.rtc;
                    var btn = $(".toolbar .muteBtn");

                    rtc.muted = true;
                    
                    this.hideWaitWindow();
                    
                    //end rtc
                    rtc.end();
                    //end signal call
                    signal.endCall(call, passive);
                    
                    //end ring
                    this.ringCalling(false);
                    
                    return deferred.promise();
                }

                //ring when calling someone else

            }, {
                key: 'ringCalling',
                value: function ringCalling(play) {
                    if (play) {
                        this.sound_ring.play();
                    } else {
                        this.sound_ring.stop();
                    }
                }
                //ring when being called by someone else

            }, {
                key: 'ringCalled',
                value: function ringCalled(play) {
                    if (play) {
                        this.sound_tones.play();
                    } else {
                        this.sound_tones.stop();
                    }
                }
                //events
            }, {
                key: 'subscribeEvents',
                value: function subscribeEvents() {
                    var _this = this;

                    var signal = this.signal;
                    //toolbar end call btn
                    $(".toolbar .endCallBtn").off("click").on("click", $.proxy(function (e) {
                        _this.ringCalling(false);
                        _this.endCall(signal.call_active || signal.call_holding, false);
                    }, this));

                    //toolbar mute btn
                    $(".toolbar .muteBtn").off("click").on("click", $.proxy(function (e) {
                        var btn = $(e.currentTarget);
                        var rtc = _this.rtc;
                        rtc.toggleMute();
                        if (rtc.muted) {
                        	btn.addClass("icon-disabled");
                        } else {
                        	btn.removeClass("icon-disabled");
                        }
                    }, this));
                    
                    $(".toolbar .voiceBtn").off("click").on("click", $.proxy(function (e) {
                        var btn = $(e.currentTarget);
                        var rtc = _this.signal;
                        var remoteStreams = _this.rtc.remoteStreams;
                        for(var i=0;i<remoteStreams.length;i++){
                        	if (remoteStreams[i]['stream'].audioEnabled && remoteStreams[i]['stream'].videoEnabled) {
                            	btn.addClass("icon-disabled");
                            	remoteStreams[i]['stream'].disableAudio();
                            } else {
                            	btn.removeClass("icon-disabled");
                            	remoteStreams[i]['stream'].enableAudio();
                            }
                        }
                    }, this));
                    
                    $(".toolbar .cameraBtn").off("click").on("click", $.proxy(function (e) {
                        var btn = $(e.currentTarget);
                        var localStream = _this.rtc.localStream;
                        if (localStream.audioEnabled && localStream.videoEnabled) {
                        	btn.addClass("icon-disabled");
                        	localStream.disableVideo();
                        	localStream.disableAudio();
                        } else {
                        	btn.removeClass("icon-disabled");
                        	localStream.enableVideo();
                        	localStream.enableAudio();
                        }
                    }, this));
                    

                    $(".callBtn").off("click").on("click", $.proxy(function (e) {
                    	//判断呼叫按钮状态
                    	var btn = $(e.currentTarget);
                    	if(btn.attr("class").indexOf("disabled") > 0){
                    		return;
                    	}else if(null == this.signal.session){
                    		Message.show("用户登陆失败，请重新打开页面");
                    		return;
                    	}
                    	_this.hasFinish(function(data){
                    		if (data.error == 1) {
                    			//呼叫
            	            	_this.requestRemoteAccount().done($.proxy(function (remoteAccount) {
            	            		//start calling via signal
            	            		if (remoteAccount !== "") {
            	            			_this.ringCalling(true);
            	            			$.when(rtc.init(channelName, false), _this.call(channelName, remoteAccount, true)).done($.proxy(function (stream, _) {
            	            				_this.ringCalling(false);
            	            				_this.rtc.rtc.publish(stream);
            	            			}, _this)).fail($.proxy(function (_) {
            	            				_this.ringCalling(false);
            	            				_this.endCall(signal.call_active || signal.call_holding, true);
            	            			}, _this));
            	            		}
            	            	}, _this));
            	            } else {
            	            	Message.show(data["message"]);
            	            	return;
            	            }
                    	});
                    }, this));
                }
                //delegate callback when receiving call
            }, {
                key: 'onInviteReceived',
                value: function onInviteReceived(call) {
                    var signal = this.signal;
                    var rtc = this.rtc;
                    this.ringCalled(true);
                }
                //delegate callback called when call end by peer
            }, {
                key: 'onInviteEndByPeer',
                value: function onInviteEndByPeer() {
                	console.log("2---[OnInvite End By Peer] " + call);
                    var signal = this.signal;
                    this.ringCalled(false);
                    this.endCall(signal.call_active || signal.call_holding, false);
                    //提示信息
                    Message.show("用户主动断开连接");
                }
            }, {
            	key:"onInviteRefusedByPeer",
            	value : function onInviteRefusedByPeer(extra){
            		console.log("3---[OnInvite Refused By Peer] " + extra);
            		var _this = this;
            		_this.endCall(signal.call_active || signal.call_holding, false);
            		Message.show('对不起，用户拒绝接听');
            	}
            }, {
            	key:"onInviteAcceptedByPeer",
            	value : function onInviteAcceptedByPeer(extra){
            		var _this = this;
            		_this.ringCalling(false);
            		_this.startDurationTimer();
           	 		
           	 		_this.showCallingWindow();
           	 		
           	 		//开启录制进程
           	 		_this.startRecordVideo();
           	 		
            	}
            }, {
            	key:"onInviteEndByMyself",
            	value : function onInviteEndByMyself(extra, call){
            		console.log("4---[OnInvite Refused By Self] " + extra + "," + call);
            	}
            },{
            	key:'onInviteFailed',
            	value:function onInviteFailed(extra){
            		var _this = this;
            		if(JSON.parse(extra).reason == "no ack"){
            			_this.endCall(signal.call_active || signal.call_holding, false);
            			Message.show('对不起，暂无应答');
            		}else{
            			//end ring
            			this.ringCalling(false);
            			//hide window
            			this.hideWaitWindow();
            		}
            		
            	}
            },{
            	key : "hasFinish",
            	value: function hasFinish(callback){
            		$.ajax({
            	        url		: ctx + "/interview/hasFinish.action",
            	        type	: "post",
            	        dataType: "json",
            	        async	: false,
            	        data	: {
            	            "id": $("#acceptId").val()
            	        },
            	        success: function (data) {
            	        	if(typeof callback === "function"){
            	        		callback(data);
            	        	}
            	        }
            	    });
            	}
            },{
            	key		: 'startRecordVideo',
            	value	: function startRecordVideo(){
            		var _this = this;
            		var localStream = _this.rtc.localStream;
            		$.ajax({
                        url	: ctx + '/interview/startRecord.action',
                        type	: "post",
                		 data	: {
                			"channel"	: $("#channel").val(),
                			"id"		: $("#acceptId").val(),
                			"dynamicKey": $("#dynamicKey").val()
                		},
                		dataType: "json",
                		success: function (data) {
	               			if (data.error == 1) {
	               				if("" == data["rows"]){
	               					Message.show("动态密钥获取失败");
	               				}else{
	               					console.log(data);
	               				}
	               			} else if (data.error == -100) {
	               				_this.endCall(signal.call_active || signal.call_holding, false);
	               				Message.show("会话超时，请重新登陆！");
	               			} else {
	               				_this.endCall(signal.call_active || signal.call_holding, false);
	               				Message.show(data.message);
	               			}
                		}
            		});
            	}
            },{
            	key : 'startDurationTimer',
            	value:function startDurationTimer(){
            		this.clearDurationTimer();
                    function timer(){
                        var now = (new Date()).getTime();
                        this.netcallDuration = now - this.netcallStartTime;
                        var timeText = this.getDurationText(this.netcallDuration);
                        $(".netcall-show-audio .tip,.netcall-show-video .tip").text(timeText);
                    }
                    timer = timer.bind(this);
                    this.netcallDuration = 0;
                    this.netcallStartTime = (new Date()).getTime();
                    this.netcallDurationTimer = setInterval(timer, 500);
                    timer();
            	}
            },{
            	key:'clearDurationTimer',
            	value:function clearDurationTimer(){
            		 if (this.netcallDurationTimer) {
        	            clearInterval(this.netcallDurationTimer);
        	            this.netcallDurationTimer = null;
        	        }
            	}
            },{
            	key : 'getDurationText',
            	value:function getDurationText(ms){
            		var allSeconds = parseInt(ms/1000);
        	        var result = "";
        	        var hours,minutes,seconds;
        	        if (allSeconds >= 3600) {
        	            hours = parseInt(allSeconds/3600);
        	            result += ("00" + hours).slice(-2) + " : ";
        	        }
        	        if(allSeconds >= 60) {
        	            minutes = parseInt(allSeconds % 3600 / 60);
        	            result += ("00" + minutes).slice(-2) + " : ";
        	        } else {
        	            result += "00 : ";
        	        }
        	        seconds = parseInt(allSeconds % 3600 %60);
        	        result += ("00" + seconds).slice(-2);
        	        return result;
            	}
            },{
            	key:"showCallingWindow",
            	value:function showCallingWindow(){
            		$(".netcall-box, .netcall-calling-box").addClass("hide");
           	 		$(".netcall-box, .netcall-show-video").removeClass("hide");
           	 		$(".callBtn").addClass("disabled").prop("disabled", true);
            	}
            },{
            	key:'hideWaitWindow',
            	value:function hideWaitWindow(){
            		//呼叫按钮可用
                    $(".callBtn").removeClass("disabled").removeAttr("disabled");
                    //hide div
                    $(".netcall-box, .netcall-calling-box").addClass("hide");
                    //清空呼叫方视频窗口
                    $(".netcall-video-local").empty();
                    //删除按钮不可用样式
                    $(".toolbar .muteBtn, .toolbar .voiceBtn, .toolbar .cameraBtn").removeClass("icon-disabled");
            	}
            },{
            	key:'showWaitWindow',
            	value:function showWaitWindow(){
            		//hide div
                    $(".netcall-box, .netcall-calling-box").removeClass("hide");
                    $(".netcall-show-video").addClass("hide");
                    //呼叫按钮不可用
                    $(".callBtn").addClass("disabled").prop("disabled", true);
            	}
            }]);

            return Client;
        }();

        var appid = $("#appId").val(), appcert = $("#appCertificate").val();
        var localAccount = $("#activeUserId").val();
        var signal = new SignalingClient(appid);
        
        window.signal = signal;
        
        var rtc = new RtcClient(appid);
        var client = new Client(signal, rtc, localAccount);
        var channelName = $("#channel").val();
        //by default call btn is disabled
        signal.login(localAccount).done(function (_) {
            //$(".callBtn").removeClass("disabled").prop("disabled", false);
        });
    });
    
    
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
	
	//客户作废
    $("#cancelNetcallVideoLink").on("click", function () {
        if ($(this).attr("class").indexOf("disabled") > 0) {
            return;
        }
        //更新状态
        confirmDialog("确认作废客户面签？", function () {
            var id = $("#cancelNetcallVideoLink").attr("data-id");
            updateInterviewStatus(id, 4, $.trim($("#description").val()), function () {
    			//结束面签
    			$(".toolbar .endCallBtn").trigger("click");
    			//呼叫按钮不可用
                $(".callBtn").addClass("disabled").prop("disabled", true);
                //(刷新)返回列表页面
                window.location.href = ctx + "/interview/query.action";
            });
        });

    });
    
    //初始化问题列表
    var answer = new VideoAnswer("#viewInterviewQuestion", $("#acceptId").val(), function(){
    	$(".interview-question").width($(".notice-wrap").width());
    });
    
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
        			//结束面签
        			$(".toolbar .endCallBtn").trigger("click");
        			//呼叫按钮不可用
                    $(".callBtn").addClass("disabled").prop("disabled", true);
        			//提示信息
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
    						$(".video-wrap").empty().html('<video style="border: 4px solid #eee;" src="'+data["rows"]["vPath"]+'" width="450" height="340" controls="controls">您的浏览器不支持视频标签</video>');
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
    
})(jQuery);

//关闭浏览器时挂断视频面签
function closeEvent(event){
	event.preventDefault();
	if(typeof(window.signal) != "undefined" && null != window.signal){
		window.signal.endCall(window.signal.call_active || window.signal.call_holding, false);
	}
}

function postion() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=kuUsODLid5YACwpzOsiuxPvjzaBUQA8N&callback=init"; //<-注意 callback回调，同步加载没有&callback
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
                        video += '<div class="videobox"><video id="video_' + i + '" src="' + file.filePath + '" controls="controls">您的浏览器不支持 video 标签。</video></div>';
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