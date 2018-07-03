/*************************************************/
/**                                                **/
/**        汽车金融-垫付申请组件配置项                    **/
/**        使用模块：已审、待审、初审单                            **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                **/
/**                                                **/
/*************************************************/
//垫款申请
var advanceTag = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    },{
        xtype: 'hidden',
        name: 'serviceFee',
        id: 'serviceFee',
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        serial:1,
        title: 'GPS安装数量(个)',
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'gpsInstallNumber',
        name: 'gpsInstallNumber',
        tip: '请输入正确的GPS安装数量',
        isPlugin: true,
        data: [{
            name: "0",
            value: 0
        }, {
            name: "1",
            value: 1
        }, {
            name: "2",
            value: 2
        }, {
            name: "3",
            value: 3
        }, {
            name: "4",
            value: 4
        }],
        required: true,
        checked: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '投保方式',
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        serial:2,
        tip: '请输入正确的投保方式',
        id: 'insuranceMethodCode',
        name: 'insuranceMethodCode',
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        checkFn:"validSelect(this)",
        data: dictData["530000"]
    }, {
        xtype: 'select',
        title: '促销情况',
        serial:3,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'promotion',
        name: 'promotion',
        isPlugin: true,
        data: [{
            name: "有促销",
            value: 1
        }, {
            name: "无促销",
            value: 0
        }],
        tip: '请输入正确的促销情况',
        checked: true,
        required: true,
        serial:4,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '收款单位',
        serial:5,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'collectMoneyCompany',
        name: 'collectMoneyCompany',
        tip: '请输入正确的收款单位',
        checked: true,
        maxlength: 100,
        required: true,
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '发票开具单位',
        serial:6,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'billCompany',
        name: 'billCompany',
        tip: '请输入正确的发票开具单位',
        checked: true,
        required: true,
        maxlength: 100,
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '开户银行',
        serial:7,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'bank',
        name: 'bank',
        tip: '请输入正确的开户银行',
        checked: true,
        required: true,
        maxlength: 100,
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '账号',
        serial:8,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'account',
        name: 'account',
        tip: '请输入正确的账号',
        checked: true,
        required: true,
        maxlength: 50,
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '结算方式',
        serial:9,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'balanceMethod',
        name: 'balanceMethod',
        isPlugin: true,
        data: [{
            name: "现金",
            value: 1
        }, {
            name: "网银",
            value: 0
        },{
            name: "转账",
            value: 2
        }],
        tip: '请输入正确的结算方式',
        checked: true,
        required: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '用款金额(元)',
        serial:10,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'moneyAmount',
        name: 'moneyAmount',
        tip:  '请输入正确的用款金额',
        checked: true,
        required: true,
        readonly: true,
        maxlength:8,
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '高息部分(元)',
        serial:11,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'highInterest',
        name: 'highInterest',
        tip: '请输入正确的高息部分',
        checked: true,
        required: true,
        readonly: true,
        maxlength:8,
        checkObj: 'float'
    }, {
        xtype: 'text',
        title: '按揭手续费(元)',
        serial:12,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'poundage',
        name: 'poundage',
        tip: '请输入正确的按揭手续费',
        checked: true,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }, {
        xtype: 'text',
        title: '履约保证金(元)',
        serial:13,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'agreeEnsureMoney',
        name: 'agreeEnsureMoney',
        tip: '请输入正确的履约保证金',
        checked: true,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '渠道保证金(元)',
        serial:14,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'channelEnsureMoney',
        name: 'channelEnsureMoney',
        tip: '请输入正确的渠道保证金',
        checked: true,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }, {
        xtype: 'text',
        title: '上牌押金(元)',
        serial:15,
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        id: 'licensePlateEnsureMoney',
        name: 'licensePlateEnsureMoney',
        tip: '请输入正确的上牌押金',
        checked: true,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }, {
        xtype: 'text',
        title: '应收合计(元)',
        serial:16,
        id: 'amountMoney',
        name: 'amountMoney',
        labelClass: 'col-md-2',
        textClass: 'col-md-2',
        maxlength:8,
        readonly: true
    }]
}];