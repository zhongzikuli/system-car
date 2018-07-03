var SignalingClient = function () {
    function SignalingClient(appid) {
        _classCallCheck(this, SignalingClient);

        this.signal = Signal(appid);
        this.call_holding = null;
        this.call_active = null;
        this.channel = null;
        this.appid = appid;
        this.uid = null;

        this.onInviteReceived = null;
        this.onInviteEndByPeer = null;
        
        //this.onInviteAcceptedByPeer = null;
        this.onInviteRefusedByPeer = null;
        this.onInviteFailed = null;
        this.onInviteEndByMyself = null;
    }

    _createClass(SignalingClient, [{
        key: 'login',
        value: function login(account) {
            var _this = this;
            var deferred = $.Deferred();
            var appid = this.appid;
            Logger.log('Logging in ' + account);
            //starts login
            var session = this.signal.login(account, $("#token").val());

            //if success
            session.onLoginSuccess = $.proxy(function (uid) {
                Logger.log('login success ' + uid);
                _this.uid = uid;
                deferred.resolve();
            }, this);

            //if fail
            session.onLoginFailed = $.proxy(function (ecode) {
                Logger.log('login failed ' + ecode);
                _this.session = null;
                deferred.reject();
                Message.show("登陆失败（"+ ecode + "）");
            }, this);

            session.onInviteReceived = $.proxy(this._onInviteReceived, this);
            this.session = session;
            
            return deferred.promise();
        }
    }, {
        key: 'call',
        value: function call(channelName, peer, require_peer_online) {
            var _this2 = this;

            var deferred = $.Deferred();
            var extra = {};

            if (require_peer_online) {
                extra["_require_peer_online"] = 1;
            }

            var extra_msg = JSON.stringify(extra);

            Logger.log('call ' + peer + ' , channelName : ' + channelName + ', extra : ' + extra_msg);
            
            var call = this.session.channelInviteUser2(channelName, peer, extra_msg);

            //call.onInviteAcceptedByPeer = $.proxy(this._onInviteAcceptedByPeer, this);
            
            call.onInviteAcceptedByPeer = $.proxy(function (extra) {
                _this2.call_active = _this2.call_holding;
                _this2.call_holding = null;
                _this2.join(call.channelName).then(function (_) {
                    Logger.log('call.onInviteAcceptedByPeer ' + extra);
                    deferred.resolve();
                });
                
                this._onInviteAcceptedByPeer();
            }, this);
            
            call.onInviteRefusedByPeer = $.proxy(this._onInviteRefusedByPeer, this);
            call.onInviteFailed =  $.proxy(this._onInviteFailed, this); 
            call.onInviteEndByPeer = $.proxy(this._onInviteEndByPeer, this);
            call.onInviteEndByMyself = $.proxy(this._onInviteEndByMyself, this);

            this.call_holding = call;

            return deferred.promise();
        }
    }, {
        key: 'join',
        value: function join(channelName) {
            var deferred = $.Deferred();
            Logger.log('Joining channel ' + channelName);
            var channel = this.session.channelJoin(channelName);
            channel.onChannelJoined = function (_) {
                Logger.log('channel.onChannelJoined');
                deferred.resolve();
            };
            channel.onChannelJoinFailed = function (ecode) {
                Logger.log('channel.onChannelJoinFailed ' + ecode);
                deferred.reject(ecode);
                Message.show("视频呼叫失败（"+ ecode + "）");
            };
            this.channel = channel;
            return deferred.promise();
        }
    }, {
        key: 'leave',
        value: function leave() {
            var _this3 = this;
            var deferred = $.Deferred();
            var channel = this.channel;
            if (channel === null) {
                return deferred.resolve().promise();
            }
            channel.onChannelLeaved = $.proxy(function (ecode) {
                Logger.log('channel.onChannelLeaved');
                _this3.channel = null;
                
                console.log("client leave");
                
                deferred.resolve();
            }, this);
            channel.channelLeave();
            return deferred;
        }
    }, {
        key: 'acceptCall',
        value: function acceptCall(call) {
            var deferred = $.Deferred();
            this.call_active = this.call_holding;
            this.call_holding = null;

            this.join(call.channelName).done(function (_) {
                call.channelInviteAccept();
                deferred.resolve({
                    peer: call.peer,
                    channelName: call.channelName
                });
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise();
        }
    }, {
        key: 'rejectCall',
        value: function rejectCall(call, status) {
            var deferred = $.Deferred();
            status = status || 0;
            call.channelInviteRefuse(JSON.stringify({ status: status }));
            return deferred.resolve().promise();
        }
    }, {
        key: 'endCall',
        value: function endCall(call, passive) {
            //判断是否为空
        	if(null == call){
        		return;
        	}
            var _this4 = this;

            var deferred = $.Deferred();
            var channel = this.channel;
           call.onInviteEndByMyself = $.proxy(function (extra) {
                Logger.log('call.onInviteEndByMyself ' + extra);
                _this4.call_holding = _this4.call_holding === call ? null : _this4.call_holding;
                _this4.call_active = _this4.call_active === call ? null : _this4.call_active;
            }, this);
           
           //离开频道
           _this4.leave();
           
            if (this.onInviteEndByMyself !== null) {
                this.onInviteEndByMyself(call);
            }
            if (!passive) {
                call.channelInviteEnd();
            } else {
                this.call_active = null;
                this.call_holding = null;
            }
            
            return deferred.promise();
        }
    }, {
        key: 'statusText',
        value: function statusText(status) {
            switch (status) {
                case 0:
                    return "用户拒绝接听.";
                case 1:
                    return "用户正忙.";
            }
        }
        //session events delegate
    }, {
        key: '_onInviteReceived',
        value: function _onInviteReceived(call) {
            Logger.log('recv invite from ' + call.peer + ', ' + call.channelName + ', ' + call.extra);
            //incoming call for accept or refuse
            if (this.call_active !== null) {
                //busy
                this.rejectCall(call, 1);
            } else {
                call.onInviteEndByPeer = $.proxy(this._onInviteEndByPeer, this);
                this.call_holding = call;
                if (this.onInviteReceived !== null) {
                    this.onInviteReceived(call);
                }
            }
        }
        //call events delegate
    }, {
    	 key: '_onInviteRefusedByPeer',
    	 value: function _onInviteRefusedByPeer(extra) {
    		 if (this.onInviteRefusedByPeer !== null) {
 	            this.onInviteRefusedByPeer(extra);
 	        }
    	 }
    }, {
		key: '_onInviteEndByMyself',
		value: function _onInviteEndByMyself(extra) {
			if (this._onInviteEndByMyself !== null) {
				this._onInviteEndByMyself(extra);
			}
		}
    }, {
   	 	key: '_onInviteAcceptedByPeer',
   	 	value: function _onInviteAcceptedByPeer(call) {
	   	 	if (this.onInviteAcceptedByPeer !== null) {
	            this.onInviteAcceptedByPeer();
	        }
		}
    }, {
    	key:'_onInviteFailed',
    	value:function _onInviteFailed(extra){
    		if (this.onInviteFailed !== null) {
                this.onInviteFailed(extra);
            }
    	}
    }, {
        key: '_onInviteEndByPeer',
        value: function _onInviteEndByPeer(extra) {
            Logger.log('call.onInviteEndByPeer ' + extra);
            if (this.onInviteEndByPeer !== null) {
                this.onInviteEndByPeer();
            }
        }
    }]);

    return SignalingClient;
}();