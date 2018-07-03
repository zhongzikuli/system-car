/*************************************************/
/**                                             **/
/**        汽车金融-放贷信息-银行退件信息              **/
/**        使用模块：初审单状态要求：垫付审核通过         **/
/**                                             **/
/**        备注：《所有修改人要添加使用模块》            **/
/**                                             **/
/*************************************************/

//银行退件信息
var bankBackInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        name: 'bankBounceCompleteDate',
        id: 'bankBounceCompleteDate',
        title: '退件日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    }, {
        xtype: 'date',
        name: 'bankBounceDate',
        id: 'bankBounceDate',
        title: '处理完成日期',
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
        name: 'bankBounceReason',
        id: 'bankBounceReason',
        cls: 'height:80px',
        labelClass: "col-md-1",
        textClass: "col-md-5",
        title: '退件原因'
    }]
}];
