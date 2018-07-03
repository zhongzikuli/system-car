var YX = function (accid) {
	this.accid = accid;
	this.cache = new Cache();
	this.mysdk = new SDKBridge(this, this.cache)
	this.myNetcall = new NetcallBridge(this)
	this.firstLoadSysMsg = true
	this.totalUnread = 0
}
YX.fn = YX.prototype;

YX.fn.initModule = function () {
	this.initBase();
	this.session();
}
YX.fn.initBase = function () {
	//登出
	//this.logoutEvt();
	//多端登陆
	//this.multiportEvt();
}
/**********************************
 * 登出
 **********************************/
YX.fn.logoutEvt = function () {
	this.$logout = $('#logout')
	this.$logoutDialog = $('#logoutDialog')
	this.$logout.on('click', this.showLogoutDialog.bind(this))
	this.$logoutDialog.delegate('.j-close', 'click', this.hideLogoutDialog.bind(this))
	this.$logoutDialog.delegate('.j-ok', 'click', this.doLogout.bind(this))
}
YX.fn.doLogout = function () {
    delCookie('uid');
    delCookie('sdktoken');
    window.location.href =  ctx + '/interview/list/page.action';
}

YX.fn.showLogoutDialog = function () {
    this.$logoutDialog.removeClass('hide');
}

YX.fn.hideLogoutDialog = function () {
	this.$logoutDialog.addClass('hide');
}

/**********************************************
 * 多端登录管理      
 ********************************************/
 YX.fn.multiportEvt = function () {
    this.$devices = $("#devices");
    // 踢人 0：移动端 1：pc端
    $("#devices .mobile").on('click', function () {
        this.mysdk.kick(0);
    }.bind(this));
    $("#devices .pc").on('click', function () {
        this.mysdk.kick(1);
    }.bind(this))
    $("#backBtn2").on('click',this.hideDevices.bind(this));
    $(".m-devices").on('click',this.showDevices.bind(this));
 }
 //SDK回调
 YX.fn.loginPorts = function(devices){
    var pc,mobile;
    for (var i = devices.length - 1; i >= 0; i--) {
        if(/iOS|Android|WindowsPhone/i.test(devices[i].type)){
            mobile=devices[i];
        }else if(/PC/i.test(devices[i].type)){
            pc = devices[i];
        }
    }
    if((pc&&pc.online)||(mobile&&mobile.online)){
        if((pc&&pc.online)&&(mobile&&mobile.online)){
            $(".m-devices").html("正在使用云信手机版，电脑版")
            $("#devices .pc").removeClass("hide");
            $("#devices .mobile").removeClass("hide");
            this.mysdk.mobileDeviceId = mobile.deviceId;
            this.mysdk.pcDeviceId = pc.deviceId;
        }else if(pc&&pc.online){
            $(".m-devices").html("正在使用云信电脑版");
            $("#devices .pc").removeClass("hide");
            $("#devices .mobile").addClass("hide");
            this.mysdk.mobileDeviceId = false;
            this.mysdk.pcDeviceId = pc.deviceId;
        }else{
            $(".m-devices").html("正在使用云信手机版");
            $("#devices .mobile").removeClass("hide");
            $("#devices .pc").addClass("hide");
            this.mysdk.mobileDeviceId = mobile.deviceId;
            this.mysdk.pcDeviceId = false;
        }
        $(".m-devices").removeClass("hide");
        $("#left-panel .item").height(463);
        $("#chatVernier").css({marginTop:'41px'});
    }else{
        $(".m-devices").addClass("hide");
        $("#devices").addClass("hide");
        $("#devices .pc").addClass("hide");
        $("#devices .mobile").addClass("hide");
        this.mysdk.mobileDeviceId = false;
        this.mysdk.pcDeviceId = false;
        $("#left-panel .item").height(504);
        $("#chatVernier").css({marginTop:'0'});
    }
},

/**
 * 多端登录面板UI
 */
//YX.fn.showDevices = function(){
//    this.$devices.removeClass("hide");
//}
//YX.fn.hideDevices = function(){
//    this.$devices.addClass("hide");
//}
/**
 * 语音播放
 */
YX.fn.playAudio = function(){
    if(!!window.Audio){
        var node = $(this),
            btn = $(this).children(".j-play")
        node.addClass("play")
        setTimeout(function(){node.removeClass("play");},parseInt(btn.attr("data-dur")))
        new window.Audio(btn.attr("data-src")+"?audioTrans&type=mp3").play()
    }
}