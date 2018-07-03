/*************************************************/
/**                                                **/
/**        汽车金融-财务打款组件配置                        **/
/**        使用模块：财务打款            **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                **/
/**                                                **/
/*************************************************/
//贷款本金\车价\经销商\产品类别

//协议资料信息
var protocolTag = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        id: 'carTypeform',
        name: 'carTypeform',
        isPlugin:true,
        readonly: true,
        title: '车型构成',
        data: [{
            name: "新车",
            value: 1
        }, {
            name: "二手车",
            value: 0
        }]
    }, {
        xtype: 'text',
        title: '产品类型',
        id: 'productType',
        isPlugin:true,
        readonly: true,
        name: 'productType',
        readonly: true
    }, {
        xtype: 'text',
        title: '车型',
        readonly: true,
        isPlugin:true,
        id: 'carBrandName',
        name: 'carBrandName'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        readonly: true,
        name: 'bank',
        id: 'bank',
        title: '贷款银行'
    }, {
        xtype: 'select',
        id: 'left',
        name: 'loanPeriodMonthCode',
        title: '年限(月)',
        readonly: true,
        isPlugin:true,
        displayField:'value',
        valueField:'key',
        data	: dictData["290000"]
    }, {
        xtype: 'text',
        required: true,
        id: 'customerRate',
        name: 'customerRate',
        title: '客户费率(%)',
        readonly: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'account',
        id: 'account',
        title: '账号',
        readonly: true
    }, {
        xtype: 'text',
        title: '经销商',
        name: 'dealername',
        id: 'dealername',
        readonly: true
    }, {
        xtype: 'select',
        title: '结算方式',
        id: 'balanceMethod',
        name: 'balanceMethod',
        data: [{
            name: "现金",
            value: 1
        }, {
            name: "网银",
            value: 0
        }, {
            name: "转账",
            value: 2
        }],
        isPlugin: true,
        readonly: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '收款单位',
        id: 'collectMoneycompany',
        name: 'collectMoneycompany',
        readonly: true
    }, {
        xtype: 'text',
        title: '开户银行',
        id: 'openingBank',
        name: 'openingBank',
        readonly: true
    }, {
        xtype: 'text',
        id: 'carLicenseAddress',
        name: 'carLicenseAddress',
        title: '上牌地',
        readonly: true
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'driverLicneseowner',
        id: 'driverLicneseowner',
        title: '行驶证车主',
        readonly: true
    }, {
        xtype: 'text',
        title: 'GPS安装数量(个)',
        id: 'gpsInstallnnumber',
        name: 'gpsInstallnnumber',
        readonly: true
    }, {
        xtype: 'text',
        readonly: true,
        id: 'contractPrice',
        name: 'contractPrice',
        title: '合同价'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'principal',
        id: 'principal',
        title: '贷款本金(元)',
        readonly: true
    }, {
        xtype: 'text',
        title: '高息部分(元)',
        id: 'highInterest',
        name: 'highInterest',
        readonly: true
    }, {
        xtype: 'text',
        id: 'price',
        name: 'price',
        readonly: true,
        title: '车价(元)'
    }]
}];