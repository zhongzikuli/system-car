/*
* 会话模块 
*/
YX.fn.session = function () {

}
/**
 * 最近联系人显示
 * @return {void}
 */
YX.fn.buildSessions = function(id) {
    var data = {
        sessions:this.cache.getSessions()
    }
    if(!this.sessions){
        var options = {
            data:data,
            infoprovider:this.infoProvider.bind(this),

        } 
        this.sessions = new NIMUIKit.SessionList(options)
        this.sessions.inject($('#sessions').get(0))
    }else{
        this.sessions.update(data)
    }
}