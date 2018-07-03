/*************************************************/
/**                                                **/
/**        汽车金融-放贷信息                            **/
/**        使用模块：初审单状态要求：垫付审核通过            **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                **/
/**                                                **/
/*************************************************/
//放款信息
var lendingInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id',
        id: 'id'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        name: 'companyAdvanceMoneyDate',
        id: 'companyAdvanceMoneyDate',
        title: '公司垫付日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        checked: true,
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true,
        tip: '公司垫付日期不能为空',
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        name: 'companyAdvanceMoney',
        id: 'companyAdvanceMoney',
        title: '垫付金额(元)'
    }, {
        xtype: 'button',
        btnClass: 'btn btn-w-m btn-success uploader-btn',
        name: 'certificateFilePath',
        id: 'certificateFilePath',
        title: '<i class="fa fa-cloud-upload"></i>上传凭证'
    }, {
        xtype: 'select',
        btnClass: 'btn btn-w-m btn-success moneyPackage-btn',
        name: 'moneyPackage',
        id: 'moneyPackage',
        title: '资金包'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        name: 'advancedPrincipalMoneyDate',
        id: 'advancedPrincipalMoneyDate',
        title: '贷款本金打款日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        checked: true,
        isPlugin: true,
        formatDate: 'YYYY-MM-DD hh:mm:ss',
        istime: true,
        isclear: true,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
        min: "1970-01-01",
        max: laydate.now(),
        tip: '贷款本金打款日期不能为空',
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        name: 'advancedPrincipalMoney',
        id: 'advancedPrincipalMoney',
        title: '贷款金额(元)'
    }, {
        xtype: 'button',
        btnClass: 'btn btn-w-m btn-success principal-uploader-btn',
        name: 'principalCertificateFilePath',
        id: 'principalCertificateFilePath',
        title: '<i class="fa fa-cloud-upload"></i>贷款本金上传凭证'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        formatDate: 'YYYY-MM-DD',
        title: '二次打款时间',
        id: 'secondLendingMoneyDate',
        name: 'secondLendingMoneyDate',
        readonly: true
    }, {
        xtype: 'text',
        title: '二次打款金额(元)',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        id: 'secondLendingMoney',
        name: 'secondLendingMoney',
        readonly: true
    }, {
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        title: '高息(元)',
        id: 'highInterest',
        name: 'highInterest',
        readonly: true
    }, {
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        title: '费用明细合计(元)',
        id: 'expensesSum',
        name: 'expensesSum',
        readonly: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        title: '贷款本金收款单位',
        id: 'commonBankAccountName',
        name: 'commonBankAccountName',
        readonly: true
    }, {
        xtype: 'text',
        title: '贷款本金收款账号',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        id: 'commonBankAccount',
        name: 'commonBankAccount',
        readonly: true
    }, {
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        title: '贷款本金开户银行',
        id: 'commonBankName',
        name: 'commonBankName',
        readonly: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        title: '二次打款开户银行',
        id: 'depBankName',
        name: 'depBankName',
        readonly: true
    }, {
        xtype: 'text',
        title: '二次打款收款单位',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        id: 'depBankAccountName',
        name: 'depBankAccountName',
        readonly: true
    }, {
        xtype: 'text',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        title: '二次打款收款账号',
        id: 'depBankAccount',
        name: 'depBankAccount',
        readonly: true
    }, {
        xtype: 'button',
        btnClass: 'btn btn-w-m btn-success second-uploader-btn',
        name: 'secondCertificateFilePath',
        id: 'secondCertificateFilePath',
        title: '<i class="fa fa-cloud-upload"></i>二次打款上传凭证'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        name: 'bankPaymentDate',
        id: 'bankPaymentDate',
        title: '银行放款日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    }, {
        xtype: 'text',
        name: 'bankPaymentMoney',
        id: 'bankPaymentMoney',
        title: '银行到账金额'
    }, {
        xtype: 'date',
        name: 'transferLoanAfterDate',
        id: 'transferLoanAfterDate',
        title: '转贷后日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        max: laydate.now(),
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    }, {
        xtype: 'label',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        spanClass: 'alert-success',
        title: '资产余额(元)',
        id: 'money',
        name: 'money',
        readonly: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'bankPaymentRemark',
        id: 'bankPaymentRemark',
        title: '银行放款备注',
        labelClass: "col-md-1",
        textClass: "col-md-11"
    }]
}];