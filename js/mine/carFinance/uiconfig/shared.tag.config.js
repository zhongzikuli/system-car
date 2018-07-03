/*************************************************/
/**                                                **/
/**        汽车金融-配偶信息组件配置项                    **/
/**        使用模块：已审、待审、初审单、订单详情                            **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                **/
/**                                                **/
/*************************************************/
var sharedTag = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'userType',
        defaultValue: 'SHARED'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        serial:1,
        title: '配偶姓名',
        id: 'sharedRealName',
        lightUp: true,
        name: 'realName',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        tip: '请输入正确的配偶姓名',
        readonly: true
    }, {
        xtype: 'text',
        title: '年龄',
        serial:2,
        id: 'sharedAge',
        lightUp: true,
        name: 'age',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        readonly: true,
        tip		: '请输入正确的配偶年龄'
    }, {
        xtype: 'area',
        name: 'province',
        title: '户籍',
        serial:3,
        direction:'right',
        num		:2,
        id: 'shareProvince',
        tip: '请输入正确的户籍',
        labelClass: "col-md-2",
        textClass: "col-md-2",
        showDetail: false,
        isPlugin: true,
        checked: true,
        required: true,
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'cardNo',
        title: '身份证号',
        lightUp: true,
        id: 'cardNo',
        serial:4,
        tip: '请输入正确的身份证号',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        readonly: true
    }, {
        xtype: 'text',
        name: 'cardArea',
        title: '身份证归属地',
        lightUp: true,
        serial:5,
        labelClass: "col-md-2",
        textClass: "col-md-3",
        id: 'sharedCardArea',
        tip: '请输入正确的身份证归属地',
        checked: true,
        required: true,
        maxlength: 100,
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '学历',
        isPlugin: true,
        id: 'sharedSysFlexKeyCode',
        name: 'sysFlexKeyCode',
        labelClass: "col-md-2",
        textClass: "col-md-2",
        displayField: 'value',
        valueField: 'key',
        serial:6,
        data: dictData["430000"],
        tip: '请输入正确的学历',
        checked: true,
        required: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'tel',
        title: '手机号',
        serial:7,
        lightUp: true,
        id: 'sharedTel',
        tip:  '请输入正确的手机号码',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        checked: true,
        required: true,
        maxlength: 11,
        checkObj: 'phone11'
    }, {
        xtype: 'text',
        name: 'telArea',
        title: '手机号码归属地',
        lightUp: true,
        serial:8,
        id: 'sharedTelArea',
        tip: '请输入正确的手机号码归属地',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        checked: true,
        required: true,
        maxlength:50,
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '固话',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        id: 'sharedPhone',
        maxlength: 11,
        serial:9,
        name: 'phone',
        tip: '请输入正确的固话'
    }, {
        xtype: 'area',
        num: 3,
        name: 'currentAddressProvince',
        dName: 'currentAddress',
        title: '现住地址',
        serial:10,
        id: 'sharedCurrentAddress',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        tip: '请输入正确的现住地址',
        dTip: '请输入正确的现住地址详情',
        checked: true,
        maxlength: 100,
        required: true,
        readonly: true,
        iClass: "form-control-expend-left col-xs-5",
        dClass: "form-control-expend-right b-l-0 col-xs-7",
        showDetail: true,
        isPlugin: true,
        checkObj: 'not_null',
        dCheckObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        serial:11,
        name: 'companyName',
        title: '单位名称',
        lightUp: true,
        id: 'sharedCompanyName',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        tip: '请输入正确的单位名称',
        checked: true,
        required: true,
        maxlength: 100,
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '单位类型',
        serial:12,
        id: 'sharedCompanyTypeCode',
        name: 'companyTypeCode',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["440000"],
        tip: '请输入正确的单位类型',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '单位电话',
        serial:13,
        id: 'sharedCompanyTel',
        name: 'companyTel',
        labelClass: "col-md-2",
        maxlength: 11,
        textClass: "col-md-2",
        tip: '请输入正确的单位电话'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        serial:14,
        name: 'jobTypeCode',
        title: '职务类别',
        id: 'sharedJobTypeCode',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["450000"],
        tip: '请输入正确的职务',
        checked: true,
        required: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'area',
        num: 3,
        serial:15,
        name: 'companyProvince',
        dName: 'companyAddress',
        title: '单位地址',
        id: 'sharedCompanyAddress',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        tip: '请输入正确的单位地址',
        dTip: '请输入正确的单位地址详情',
        maxlength: 100,
        checked: true,
        readonly: true,
        iClass: "form-control-expend-left col-xs-5",
        dClass: "form-control-expend-right b-l-0 col-xs-7",
        showDetail: true,
        isPlugin: true,
        required: true,
        checkObj: 'not_null',
        dCheckObj: 'not_null'
    }, {
        xtype: 'select',
        name: 'jobCode',
        title: '职务',
        serial:16,
        id: 'sharedJobCode',
        labelClass: "col-md-2",
        textClass: "col-md-2",
        displayField: 'value',
        isPlugin: true,
        valueField: 'key',
        data: dictData["460000"],
        tip: '请输入正确的职务',
        checked: true,
        required: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        serial:17,
        title: '经营期限',
        id: 'sharedRuningPeriodCode',
        name: 'runingPeriodCode',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["470000"],
        tip: '请输入正确的经营期限',
        checked: true,
        required: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '工龄',
        serial:18,
        id: 'sharedEmployedPeriodCode',
        name: 'employedPeriodCode',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["480000"],
        tip: '请输入正确的工龄',
        checked: true,
        required: true,
        checkFn:"validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        name: 'monthIncome',
        title: '月收入(元)',
        serial:19,
        id: 'sharedMonthIncome',
        labelClass: "col-md-2",
        textClass: "col-md-2",
        tip: '输入正确的月收入',
        checked: true,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'remark',
        serial:20,
        labelClass: 'col-md-1',
        textClass: 'col-md-11',
        checkLen:'checkLen(1000,this)',
        maxlength:1000,
        fTip: '您已输入<span class="count red">0</span>个字符,还可以输入<span class="remainCount red">1000</span>个字符',
        title: '备注',
        id: 'sharedRemark',
        cls: 'height:80px'
    }]
}];