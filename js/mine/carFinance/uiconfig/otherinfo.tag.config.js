/*************************************************/
/**												**/
/**		汽车金融-放贷信息-其他信息						**/
/**		使用模块：初审单状态要求：垫付审核通过				**/
/**												**/
/**		备注：《所有修改人要添加使用模块》					**/
/**												**/
/*************************************************/

//其他信息
var otherInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'date',
        name: 'loanFileFirstSubmitBank',
        id: 'loanFileFirstSubmitBank',
        conTime:true,
        sId:'loanFileFirstSubmitBank',
        eId:'loanFileLastSubmitBank',
        max:laydate.now(),
        title: '贷款资料第一次交银行',
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
        name: 'loanFileLastSubmitBank',
        id: 'loanFileLastSubmitBank',
        conTime:true,
        sId:'loanFileFirstSubmitBank',
        eId:'loanFileLastSubmitBank',
        max:laydate.now(),
        title: '最后一次交银行',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'date',
        name: 'backDate',
        id: 'backDate',
        title: '退贷日期',
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
        name: 'receiptSign',
        id: 'receiptSign',
        title: '回单联签收',
        labelClass: "col-md-1",
        textClass: "col-md-2",
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
        name: 'otherAddRemark',
        id: 'otherAddRemark',
        cls: 'height:80px;',
        labelClass: "col-md-1",
        textClass: "col-md-5",
        title: '备注'
    }]
}];
