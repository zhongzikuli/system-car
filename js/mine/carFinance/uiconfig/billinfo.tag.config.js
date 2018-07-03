/*************************************************/
/**												**/
/**		汽车金融-放贷信息-票据退件信息						**/
/**		使用模块：初审单状态要求：垫付审核通过				**/
/**												**/
/**		备注：《所有修改人要添加使用模块》					**/
/**												**/
/*************************************************/

//票据信息
var billInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name: 'billRefundReason',
        id: 'billRefundReason',
        title: '退件原因'
    },{
        xtype	: 'date',
        name: 'billRefundDate',
        title: '退件日期',
        id: 'billRefundDate',
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
        name: 'billRefundMoney',
        id: 'billRefundMoney',
        title: '退件金额(元)'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name    :'billRefundLossMoney',
        id		:'billRefundLossMoney',
        title	: '损失金额'
    },{
        xtype	: 'date',
        name: 'billRefundRepaymentDate',
        id: 'billRefundRepaymentDate',
        title: '重新付款日期',
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
        name: 'billRefundRepaymentMoney',
        id: 'billRefundRepaymentMoney',
        title: '付款金额'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'receiptRebackAddRemark',
        id: 'receiptRebackAddRemark',
        cls: 'height:80px;',
        labelClass: "col-md-1",
        textClass: "col-md-10",
        title: '备注'
    }]
}];