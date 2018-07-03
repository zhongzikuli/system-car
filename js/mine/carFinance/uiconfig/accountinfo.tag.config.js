/*************************************************/
/**                                                **/
/**        汽车金融-放贷信息-结清单信息                    **/
/**        使用模块：初审单状态要求：垫付审核通过                **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                    **/
/**                                                **/
/*************************************************/

//结清单信息
var accountInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        name: 'statementSubmitDate',
        id: 'statementSubmitDate',
        title: '提交日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        max:laydate.now(),
        istime: false,
        isclear: true,
        istoday: true,
        issure: true,
        tip		: '提交日期不能为空',
        checkObj:'not_null'
    }, {
        xtype: 'date',
        name: 'preStatementDate',
        id: 'preStatementDate',
        title: '提前结清日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true,
        tip		: '提前结清日期不能为空',
        checkObj:'not_null'
    }, {
        xtype: 'date',
        name: 'normalStatementDate',
        id: 'normalStatementDate',
        title: '正常结清日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        max:false,
        issure: true,
        tip		: '正常结清日期不能为空',
        checkObj:'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'statementRemark',
        id: 'statementRemark',
        cls: 'height:80px;',
        labelClass: "col-md-1",
        textClass: "col-md-8",
        title: '结清备注'
    }]
},{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'statementSavePerson',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        id: 'statementSavePerson',
        title: '保存人',
        readonly:true
    }, {
        xtype: 'text',
        name: 'statementSaveDate',
        id: 'statementSaveDate',
        title: '保存日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        readonly:true
    }]
}];
