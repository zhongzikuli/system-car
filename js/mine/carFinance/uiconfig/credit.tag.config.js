/*************************************************/
/**												**/
/**		汽车金融-征信组件配置项						**/
/**												**/
/**		备注：《所有修改人要添加使用模块》					**/
/**												**/
/*************************************************/
var creditTag = [{
    xtype	: 'fieldcontainer',
    items   : [{
        xtype : 'hidden',
        name  : 'id'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'select',
        name    : 'loanBank',
        id      : 'loanBank',
        title	: '贷款银行',
        textClass:'col-md-2',
        labelClass:'col-md-1',
        isPlugin:true,
        url     : ctx + "/bank/unForbbinList.action",
        tip: '请输入正确的贷款银行'
    }]
}];