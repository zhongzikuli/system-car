/*************************************************/
/**												**/
/**		汽车金融-基本信息组件配置项						**/
/**												**/
/**		备注：《所有修改人要添加使用模块》					**/
/**												**/
/*************************************************/
var baseTag = [{
    xtype	: 'fieldcontainer',
    items   : [{
        xtype : 'hidden',
        name  : 'id'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
    	xtype	: 'select',
        required:true,
        name    :'dealerName',
        id      :'dealerName',
        title	: '经销商',
        tip		: '经销商不能为空',
        checked	: true,
        isPlugin:true,
        url     : ctx + "/dealerManage/list.action",
        async	: false,
        checkObj:'not_null'
    }]
}];