/*************************************************/
/**                                                **/
/**        汽车金融-d担保人组件配置项                    **/
/**        使用模块：已审、待审                            **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                **/
/**                                                **/
/*************************************************/
var sponsorTag = [{
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
        defaultValue: 'SPONSOR'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        title: '担保人姓名',
        serial:1,
        name: 'realName',
        readonly: true,
        lightUp: true,
        tip		: '担保人姓名不能为空',
        checkObj:'not_null'
    }, {
        xtype: 'select',
        title: '性别',
        serial:2,
        name: 'sex',
        lightUp: true,
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["490000"],
        checked: true,
        required: true,
        tip: '请输入正确的性别',
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '年龄',
        serial:3,
        name: 'age',
        readonly: true,
        lightUp: true,
        tip: '请输入正确的担保人年龄',
        checkObj:'not_null'
    }, {
        xtype: 'select',
        title: '共还人类别',
        id: 'sharedType',
        name: 'sharedType',
        isPlugin: true,
        serial:4,
        tip: '请输入正确的共还人类别',
        checked: true,
        required: true,
        data: [{
            name: "内部担保人",
            value: 1
        }, {
            name: "送行共还人",
            value: 2
        }],
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'cardNo',
        id:'cardNo',
        title: '身份证号',
        serial:5,
        lightUp: true,
        labelClass: "col-md-1",
        textClass: "col-md-2",
        readonly: true,
        tip: '请输入正确的身份证号',
        checkObj: 'idCard'
    }, {
        xtype: 'text',
        name: 'cardArea',
        serial:6,
        title: '身份证归属地',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        lightUp: true,
        tip: '请输入正确的身份证归属地',
        checked: true,
        required: true,
        showDetail: true,
        maxlength: 100,
        checkObj: 'not_null'
    }, {
        xtype: 'area',
        name: 'province',
        id:'sponsorProvince',
        title: '户籍',
        serial:7,
        direction:'right',
        num		:2,
        tip: '请输入正确的户籍',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        showDetail: false,
        isPlugin: true,
        checked: true,
        required: true,
        checkObj: 'not_null'
    },{
        xtype: 'select',
        title: '婚否',
        name: 'marriedCode',
        isPlugin: true,
        serial:4,
        displayField: 'value',
        valueField: 'key',
        data: dictData["500000"],
        checked: true,
        required: true,
        tip: '请输入正确的婚姻状态',
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'tel',
        title: '手机号',
        serial:8,
        lightUp: true,
        labelClass: "col-md-1",
        textClass: "col-md-2",
        tip: '请输入正确的手机号码',
        checked: true,
        required: true,
        maxlength: 11,
        checkObj: 'phone11'
    }, {
        xtype: 'text',
        name: 'telArea',
        title: '手机号码归属地',
        serial:9,
        lightUp: true,
        labelClass: "col-md-1",
        textClass: "col-md-2",
        tip: '请输入正确的手机号码归属地',
        checked: true,
        required: true,
        maxlength:50,
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '学历',
        serial:10,
        isPlugin: true,
        labelClass: "col-md-1",
        textClass: "col-md-2",
        name: 'sysFlexKeyCode',
        displayField: 'value',
        valueField: 'key',
        data: dictData["430000"],
        tip: '请输入正确的学历',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'area',
        num: 3,
        name: 'currentAddressProvince',
        dName: 'currentAddress',
        title: '现住地址',
        serial:11,
        labelClass: "col-md-1",
        textClass: "col-md-2",
        iClass: "form-control-expend-left col-xs-5",
        dClass: "form-control-expend-right b-l-0 col-xs-7",
        tip: '请输入正确的现住地址',
        dTip: '请输入正确的现住地址详情',
        maxlength: 100,
        showDetail: true,
        isPlugin: true,
        checked: true,
        readonly: true,
        required: true,
        checkObj: 'not_null',
        dCheckObj: 'not_null'
    }, {
        xtype: 'area',
        num: 3,
        title: '房产地址',
        serial:12,
        name: 'houseAddressProvince',
        dName: 'houseAddress',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        tip: '请输入正确的房产地址',
        dTip: '请输入正确的房产地址详情',
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
        xtype: 'text',
        title: '固话',
        serial:13,
        labelClass: "col-md-2",
        textClass: "col-md-2",
        id: 'sponsorPhone',
        maxlength: 11,
        name: 'phone',
        tip: '请输入正确的固话'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'companyName',
        title: '单位名称',
        lightUp: true,
        serial:14,
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
        name: 'companyTypeCode',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        isPlugin: true,
        serial:15,
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
        name: 'companyTel',
        labelClass: "col-md-2",
        maxlength: 11,
        serial:16,
        textClass: "col-md-2",
         tip: '请输入正确的单位电话'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        name: 'jobTypeCode',
        title: '职务类别',
        serial:17,
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["450000"],
        tip: '请输入正确的职务',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'area',
        num: 3,
        serial:18,
        name: 'companyProvince',
        dName: 'companyAddress',
        title: '单位地址',
        labelClass: "col-md-2",
        textClass: "col-md-3",
        tip: '请输入正确的单位地址',
        dTip: '请输入正确的单位地址详情',
        maxlength: 100,
        readonly: true,
        iClass: "form-control-expend-left col-xs-5",
        dClass: "form-control-expend-right b-l-0 col-xs-7",
        showDetail: true,
        isPlugin: true,
        checked: true,
        required: true,
        checkObj: 'not_null',
        dCheckObj: 'not_null'
    }, {
        xtype: 'select',
        name: 'jobCode',
        title: '职务',
        serial:19,
        labelClass: "col-md-2",
        textClass: "col-md-2",
        displayField: 'value',
        isPlugin: true,
        valueField: 'key',
        data: dictData["460000"],
        tip: '请输入正确的职务',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        title: '经营期限',
        serial:20,
        name: 'runingPeriodCode',
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["470000"],
        tip: '请输入正确的经营期限',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        title: '工龄',
        name: 'employedPeriodCode',
        isPlugin: true,
        serial:21,
        displayField: 'value',
        valueField: 'key',
        data: dictData["480000"],
        tip: '请输入正确的工龄',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        name: 'stockRatio',
        title: '所占股份',
        serial:22,
        tip: '请输入正确的所占股份',
        checked: true,
        required: true,
        maxlength:10,
        checkObj: 'float'
    }, {
        xtype: 'text',
        name: 'monthIncome',
        title: '月收入(元)',
        tip: '请输入正确的月收入',
        checked: true,
        serial:23,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'houseOwner',
        title: '房产所有权人',
        tip: '请输入正确的房产所有权人',
        checked: true,
        serial:24,
        required: true,
        maxlength: 50,
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        name: 'relationBuyerCode',
        title: '与购车人关系',
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        serial:25,
        data: dictData["510000"],
        tip: '请输入正确的与购车人关系',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        name: 'housePropertyCode',
        title: '房屋性质',
        serial:26,
        isPlugin: true,
        displayField: 'value',
        valueField: 'key',
        data: dictData["520000"],
        tip: '请输入正确的房屋性质',
        checked: true,
        required: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '房屋面积(㎡)',
        name: 'houseSpace',
        tip: '请输入正确的房屋面积',
        checked: true,
        serial:27,
        required: true,
        maxlength: 50,
        checkObj: 'not_null'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'currentPrice',
        title: '目前市价(万元)',
        tip: '请输入正确的目前市价',
        checked: true,
        serial:28,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }, {
        xtype: 'text',
        name: 'loanMoney',
        title: '房贷金额(万元)',
        tip: '请输入正确的房贷金额',
        checked: true,
        required: true,
        serial:29,
        maxlength:8,
        checkObj: 'float'
    }, {
        xtype: 'text',
        name: 'loanPeriodMonthCode',
        title: '房贷年限(月)',
        tip: '请输入正确的房贷年限',
        checked: true,
        serial:30,
        maxlength: 50,
        required: true,
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        title: '月还款额(元)',
        name: 'repayAmountMonth',
        tip: '请输入正确的月还款额',
        checked: true,
        serial:31,
        required: true,
        maxlength:8,
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'remark',
        title: '备注',
        serial:32,
        checkLen:'checkLen(1000,this)',
        maxlength:1000,
        fTip: '您已输入<span class="count red">0</span>个字符,还可以输入<span class="remainCount red">1000</span>个字符',
        labelClass: 'col-md-1',
        textClass: 'col-md-11',
        cls: 'height:80px'
    }]
}];
