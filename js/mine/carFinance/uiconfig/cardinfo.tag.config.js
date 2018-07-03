/*************************************************/
/**												**/
/**		汽车金融-放贷信息-卡片信息						**/
/**		使用模块：初审单状态要求：垫付审核通过				**/
/**												**/
/**		备注：《所有修改人要添加使用模块》					**/
/**												**/
/*************************************************/

//卡片信息
var cardInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        id		: 'bankCardNo',
        name	: 'bankCardNo',
        title	: '贷记卡号'
    },{
        xtype	: 'date',
        name: 'bankCardExpressDate',
        title: '还款卡片寄出日期',
        id: 'bankCardExpressDate',
        conTime:true,
        sId:'bankCardExpressDate',
        eId:'bankCardReceiveDate',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    },{
        xtype	: 'text',
        title	: '卡片寄送地址',
        id	: 'expressAddress',
        name	: 'expressAddress'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name    :'trackingNo',
        id		:'trackingNo',
        title	: '快递单号'
    },{
        xtype	: 'date',
        name: 'bankCardReceiveDate',
        title: '还款卡片收到日期',
        id: 'bankCardReceiveDate',
        conTime:true,
        sId:'bankCardExpressDate',
        eId:'bankCardReceiveDate',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    },{
        xtype	: 'date',
        name: 'firstRepaymentDate',
        title: '首期还款日',
        id: 'firstRepaymentDate',
        labelClass: "col-md-1",
        textClass: "col-md-3",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'cardAddRemark',
        id: 'cardAddRemark',
        cls: 'height:80px;',
        labelClass: "col-md-1",
        textClass: "col-md-10",
        title: '备注'
    }]
}];