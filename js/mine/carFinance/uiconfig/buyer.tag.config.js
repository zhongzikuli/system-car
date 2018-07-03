/*************************************************/
/**												**/
/**		汽车金融-购车人组件配置项						**/
/**		使用模块：已审、待审、初审单、订单详情			**/
/**												**/
/**		备注：《所有修改人要添加使用模块》				**/
/**												**/
/*************************************************/
//购车人信息
var buyerTag = [{
    xtype : 'fieldcontainer',
    items : [{
        xtype : 'hidden',
        name : 'id'
    }]
},{
    xtype : 'fieldcontainer',
    items : [{
        xtype : 'hidden',
        name : 'userType',
        defaultValue : 'BUYER'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        title	: '购车人姓名',
        id		: 'realName',
        lightUp: true,
        serial:1,
        name	: 'realName',
        labelClass:"col-md-1",
        textClass:"col-md-2",
        maxlength:50,
        readonly:true,
        tip		: '请输入正确的购车人姓名',
    },{
        xtype	: 'select',
        title	: '性别',
        id		: 'sex',
        name	: 'sex',
        lightUp: true,
        serial:2,
        isPlugin:true,
        displayField:'value',
        valueField:'key',
        labelClass:"col-md-2",
        textClass:"col-md-3",
        data	: dictData["490000"],
        tip		: '请输入正确的购车人性别',
        checked	: true,
        required:true,
        checkFn: "validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'text',
        title	: '年龄',
        id		: 'age',
        lightUp: true,
        serial:3,
        labelClass:"col-md-2",
        textClass:"col-md-2",
        name	: 'age',
        readonly:true,
        tip		: '请输入正确的购车人年龄',
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name	: 'cardNo',
        title	: '身份证号',
        id		: 'cardNo',
        lightUp: true,
        serial:4,
        tip		: '请输入正确的身份证号',
        labelClass:"col-md-1",
        textClass:"col-md-2",
        readonly:true
    },{
        xtype	: 'text',
        name	: 'cardArea',
        title	: '身份证归属地',
        lightUp: true,
        serial:5,
        labelClass:"col-md-2",
        textClass:"col-md-3",
        id		: 'cardArea',
        tip		: '请输入正确的身份证归属地',
        checked	: true,
        required:true,
        maxlength:100,
        checkObj:'not_null'
    },{
        xtype	: 'select',
        name	: 'marriedCode',
        title	: '婚否',
        id		: 'marriedCode',
        isPlugin:true,
        serial:6,
        displayField:'value',
        valueField:'key',
        data	: dictData["500000"],
        tip		: '请输入正确的婚姻状态',
        labelClass:"col-md-2",
        textClass:"col-md-2",
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name	: 'tel',
        title	: '手机号',
        id		: 'tel',
        lightUp: true,
        tip		: '请输入正确的手机号码',
        labelClass:"col-md-1",
        textClass:"col-md-2",
        maxlength:11,
        checked	: true,
        required:true,
        serial:7,
        checkObj:'phone11'
    },{
        xtype	: 'area',
        num: 3,
        name	: 'currentAddressProvince',
        dName	: 'currentAddress',
        title	: '现住地址',
        id		: 'currentAddress',
        labelClass:"col-md-2",
        textClass:"col-md-3",
        tip		: '请输入正确的现住地址',
        dTip	: '请输入正确的现住地址详情',
        readonly:true,
        serial:10,
        iClass:"form-control-expend-left col-xs-5",
        dClass:"form-control-expend-right b-l-0 col-xs-7",
        showDetail:true,
        isPlugin:true,
        checked	: true,
        required:true,
        maxlength: 100,
        checkObj:'not_null',
        dCheckObj:'not_null'
    },{
        xtype	: 'area',
        name	: 'province',
        title	: '户籍',
        direction:'right',
        num		:2,
        serial:9,
        id		: 'province',
        tip		: '请输入正确的户籍',
        labelClass:"col-md-2",
        textClass:"col-md-2",
        showDetail:false,
        isPlugin:true,
        checked	: true,
        required:true,
        checkObj:'not_null'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name	: 'telArea',
        title	: '手机号码归属地',
        id		: 'telArea',
        lightUp: true,
        serial:8,
        tip		: '请输入正确的手机号码归属地',
        labelClass:"col-md-1",
        textClass:"col-md-2",
        checked	: true,
        required:true,
        maxlength:50,
        checkObj:'not_null'
    },{
        xtype	: 'area',
        num: 3,
        serial:11,
        name	: 'familyAddressProvince',
        dName	: 'familyAddress',
        title	: '家庭住址',
        id		: 'familyAddress',
        labelClass:"col-md-2",
        textClass:"col-md-3",
        tip		: '请输入正确的家庭住址',
        dTip	: '请输入正确的家庭住址详情',
        readonly:true,
        iClass:"form-control-expend-left col-xs-5",
        dClass:"form-control-expend-right b-l-0 col-xs-7",
        showDetail:true,
        isPlugin:true,
        checked	: true,
        required:true,
        maxlength: 100,
        checkObj:'not_null',
        dCheckObj:'not_null'
    },{
        xtype	: 'select',
        title	: '学历',
        isPlugin:true,
        serial:12,
        id		: 'sysFlexKeyCode',
        name	: 'sysFlexKeyCode',
        labelClass:"col-md-2",
        textClass:"col-md-2",
        displayField:'value',
        valueField:'key',
        data	: dictData["430000"],
        tip		: '请输入正确的购车人学历',
        checked	: true,
        required:true,
        checkFn: "validSelect(this)",
        checkObj:'not_null'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        title	: '固话',
        labelClass:"col-md-1",
        textClass:"col-md-2",
        id		: 'phone',
        serial:13,
        maxlength: 11,
        name	: 'phone',
        tip		: '请输入正确的固话'
    },{
        xtype	: 'area',
        num: 3,
        title	: '房产地址',
        id		: 'houseAddress',
        name	: 'houseAddressProvince',
        dName	: 'houseAddress',
        tip		: '请输入正确的房产地址',
        dTip	: '请输入正确的房产地址详情',
        labelClass:"col-md-2",
        textClass:"col-md-3",
        iClass:"form-control-expend-left col-xs-5",
        dClass:"form-control-expend-right b-l-0 col-xs-7",
        checked	: true,
        readonly:true,
        serial:14,
        showDetail:true,
        isPlugin:true,
        required:true,
        maxlength: 100,
        checkObj:'not_null',
        dCheckObj:'not_null'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name	: 'companyName',
        title	: '单位名称',
        id		: 'companyName',
        lightUp: true,
        serial:15,
        labelClass:"col-md-1",
        textClass:"col-md-2",
        tip		: '请输入正确的单位名称',
        checked	: true,
        required:true,
        maxlength: 100,
        checkObj:'not_null'
    },{
        xtype	: 'select',
        title	: '单位类型',
        id		: 'companyTypeCode',
        name	: 'companyTypeCode',
        labelClass:"col-md-2",
        textClass:"col-md-3",
        isPlugin:true,
        serial:16,
        displayField:'value',
        valueField:'key',
        data	: dictData["440000"],
        tip		: '请输入正确的单位类型',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'text',
        title	: '单位电话',
        id		: 'companyTel',
        name	: 'companyTel',
        labelClass:"col-md-2",
        maxlength: 11,
        serial:17,
        textClass:"col-md-2",
        tip		: '请输入正确的单位电话',
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'select',
        name	: 'jobTypeCode',
        title	: '职务类别',
        id		: 'jobTypeCode',
        labelClass:"col-md-1",
        textClass:"col-md-2",
        isPlugin:true,
        serial:18,
        displayField:'value',
        valueField:'key',
        data	: dictData["450000"],
        tip		: '请输入正确的职务',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'area',
        num: 3,
        name	: 'companyProvince',
        dName	: 'companyAddress',
        title	: '单位地址',
        serial:19,
        id		: 'companyAddress',
        labelClass:"col-md-2",
        textClass:"col-md-3",
        readonly:true,
        iClass:"form-control-expend-left col-xs-5",
        dClass:"form-control-expend-right b-l-0 col-xs-7",
        showDetail:true,
        isPlugin:true,
        tip		: '请输入正确的单位地址',
        dTip	: '请输入正确的单位地址详情',
        maxlength: 100,
        checked	: true,
        required:true,
        checkObj:'not_null',
        dCheckObj:'not_null'
    },{
        xtype	: 'select',
        name	: 'jobCode',
        title	: '职务',
        serial:20,
        id		: 'jobCode',
        labelClass:"col-md-2",
        textClass:"col-md-2",
        displayField:'value',
        isPlugin:true,
        valueField:'key',
        data	: dictData["460000"],
        tip		: '请输入正确的职务',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'select',
        title	: '经营期限',
        serial:21,
        id		: 'runingPeriodCode',
        name	: 'runingPeriodCode',
        isPlugin:true,
        displayField:'value',
        valueField:'key',
        data	: dictData["470000"],
        tip		: '请输入正确的经营期限',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'select',
        title	: '工龄',
        serial:22,
        id		: 'employedPeriodCode',
        name	: 'employedPeriodCode',
        isPlugin:true,
        displayField:'value',
        valueField:'key',
        data	: dictData["480000"],
        tip		: '请输入正确的工龄',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'text',
        name	: 'stockRatio',
        title	: '所占股份',
        serial:23,
        id		: 'stockRatio',
        tip		: '请输入正确的所占股份',
        checked	: true,
        required:true,
        maxlength:10,
        checkObj:'float'
    },{
        xtype	: 'text',
        name	: 'monthIncome',
        title	: '月收入(元)',
        id		: 'monthIncome',
        tip		: '请输入正确的月收入',
        checked	: true,
        serial:24,
        required:true,
        maxlength:8,
        checkObj:'float'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name	: 'houseOwner',
        title	: '房产所有权人',
        id		: 'houseOwner',
        serial:25,
        tip		: '请输入正确的房产所有权人',
        checked	: true,
        required:true,
        maxlength: 50,
        checkObj:'not_null'
    },{
        xtype	: 'select',
        name	: 'relationBuyerCode',
        title	: '与购车人关系',
        id		: 'relationBuyerCode',
        isPlugin:true,
        serial:26,
        displayField:'value',
        valueField:'key',
        data	: dictData["510000"],
        tip		: '请输入正确的与购车人关系',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'select',
        name	: 'housePropertyCode',
        title	: '房屋性质',
        id		: 'housePropertyCode',
        isPlugin:true,
        serial:27,
        displayField:'value',
        valueField:'key',
        data	: dictData["520000"],
        tip		: '请输入正确的房屋性质',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'text',
        title	: '房屋面积(㎡)',
        id		: 'houseSpace',
        name	: 'houseSpace',
        serial:28,
        tip		: '请输入正确的房屋面积',
        checked	: true,
        required:true,
        maxlength: 50,
        checkObj:'not_null'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'text',
        name	: 'currentPrice',
        title	: '目前市价(万元)',
        id		: 'currentPrice',
        serial:29,
        tip		: '请输入正确的目前市价',
        checked	: true,
        required:true,
        maxlength:8,
        checkObj:'float'
    },{
        xtype	: 'text',
        name	: 'loanMoney',
        title	: '房贷金额(万元)',
        id		: 'loanMoney',
        serial:30,
        tip		: '请输入正确的房贷金额',
        checked	: true,
        required:true,
        maxlength:8,
        checkObj:'float'
    },{
        xtype	: 'text',
        name	: 'loanPeriodMonthCode',
        title	: '房贷年限(月)',
        tip		: '请输入正确的房贷年限',
        checked	: true,
        serial:31,
        required:true,
        maxlength: 50,
        checkObj:'not_null'
    },{
        xtype	: 'text',
        title	: '月还款额(元)',
        id		: 'repayAmountMonth',
        name	: 'repayAmountMonth',
        tip		: '请输入正确的月还款额',
        checked	: true,
        serial:32,
        required:true,
        maxlength:8,
        checkObj:'float'
    }]
},{
    xtype	: 'fieldcontainer',
    className	: 'contracter',
    items	: [{
        xtype	: 'hidden',
        name	: 'id',
        id	    : 'contacterId1'
    },{
        xtype	: 'text',
        name	: 'realName',
        title	: '紧急联系人一',
        id		: 'contacterRealName1',
        tip		: '紧急联系人只能为中文和英文',
        labelClass:'col-md-1',
        checked	: true,
        serial:33,
        required:true,
        maxlength: 50,
        checkObj:'china_english'
    },{
        xtype	: 'select',
        name	: 'relationTypeCode',
        title	: '关系',
        id		: 'relationTypeCode1',
        isPlugin:true,
        serial:34,
        displayField:'value',
        valueField:'key',
        data	: dictData["510000"],
        tip		: '请输入正确的关系',
        labelClass:'col-md-1',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'text',
        title	: '手机',
        id		: 'contacterTel1',
        name	: 'contactTel',
        serial:35,
        labelClass:'col-md-1',
        tip		:  '请输入正确的手机号码',
        checked	: true,
        required:true,
        maxlength: 11,
        checkObj:'phone11'
    },{
        xtype	: 'text',
        title	: '电话',
        serial:36,
        id		: 'contacterPhone1',
        labelClass:'col-md-1',
        maxlength: 11,
        name	: 'phone'
    }]
},{
    xtype	: 'fieldcontainer',
    className	: 'contracter',
    items	: [{
        xtype	: 'hidden',
        name	: 'id',
        id	    : 'contacterId2'
    },{
        xtype	: 'text',
        name	: 'realName',
        title	: '紧急联系人二',
        serial:37,
        id		: 'contacterRealName2',
        labelClass:'col-md-1',
        tip		: '紧急联系人只能为中文和英文',
        checked	: true,
        required:true,
        maxlength: 50,
        checkObj:'china_english'
    },{
        xtype	: 'select',
        name	: 'relationTypeCode',
        title	: '关系',
        serial:38,
        id		: 'relationTypeCode2',
        labelClass:'col-md-1',
        isPlugin:true,
        displayField:'value',
        valueField:'key',
        data	: dictData["510000"],
        tip		: '请输入正确的关系',
        checked	: true,
        required:true,
        checkFn:"validSelect(this)",
        checkObj:'not_null'
    },{
        xtype	: 'text',
        title	: '手机',
        serial:39,
        id		: 'contacterTel2',
        labelClass:'col-md-1',
        name	: 'contactTel',
        tip		: '请输入正确的手机号码',
        checked	: true,
        required:true,
        maxlength: 11,
        checkObj:'phone11'
    },{
        xtype	: 'text',
        title	: '电话',
        id		: 'contacterPhone2',
        labelClass:'col-md-1',
        maxlength: 11,
        serial:40,
        name	: 'phone'
    }]
},{
    xtype	: 'fieldcontainer',
    items	: [{
        xtype	: 'textarea',
        name	: 'remark',
        labelClass:'col-md-1',
        textClass:'col-md-11',
        checkLen:'checkLen(1000,this)',
        maxlength:1000,
        title	: '备注',
        serial:41,
        id		: 'remark',
        fTip: '您已输入<span class="count red">0</span>个字符,还可以输入<span class="remainCount red">1000</span>个字符',
        cls	: 'height:80px;'
    }]
}];