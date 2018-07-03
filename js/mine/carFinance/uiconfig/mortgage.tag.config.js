/**************************
 *
 * 汽车金融-抵押信息
 * 使用模块：订单详情
 *
 * ************************
 */

//抵押信息
var mortgageTag = [{
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'hidden',
    name: 'id'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    title: '部门',
    id: 'departName',
    name: 'departName',
    readonly: true
  }, {
    xtype: 'text',
    title: '银行',
    id: 'bankName',
    name: 'bankName',
    readonly: true
  }, {
    xtype: 'text',
    title: '产品类型',
    id: 'productName',
    name: 'productName',
    readonly: true
  }, {
    xtype: 'text',
    title: '车型',
    id: 'carBrandName',
    name: 'carBrandName',
    readonly: true
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'receiveBankContractDate',
    dateName: 'receiveBankContractDateStr',
    id: 'receiveBankContractDate',
    title: '收到银行合同日期',
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
    name: 'mortgageFileDeliverDate',
    dateName: 'mortgageFileDeliverDateStr',
    id: 'mortgageFileDeliverDate',
    title: '抵押资料寄网点日期',
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
    title: '银行合同号',
    labelClass: "col-md-1",
    textClass: "col-md-2",
    id: 'bankContractNo',
    name: 'bankContractNo',
    tip: "请输入正确的银行合同号",
    maxlength: 100,
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'registerDate',
    dateName: 'registerDateStr',
    title: '上牌登记日期',
    id: 'registerDate',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'notarialPaperSubmitDate',
    dateName: 'notarialPaperSubmitDateStr',
    title: '公证书送交日期',
    id: 'notarialPaperSubmitDate',
    conTime: false,
    sId: 'notarialPaperSubmitDate',
    eId: 'notarialPaperReceiveDate',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'notarialPaperReceiveDate',
    dateName: 'notarialPaperReceiveDateStr',
    title: '公证书到达日期',
    id: 'notarialPaperReceiveDate',
    conTime: false,
    sId: 'notarialPaperSubmitDate',
    eId: 'notarialPaperReceiveDate',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'select',
    title: '是否办理成功',
    id: 'mortgageSucess',
    name: 'mortgageSucess',
    isPlugin: true,
    data: [{
      name: "成功",
      value: 1
    }, {
      name: "失败",
      value: 2
    }]
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'textarea',
    name: 'mortgageRemark',
    labelClass: 'col-md-1',
    textClass: 'col-md-11',
    title: '备注',
    id: 'mortgageRemark',
    cls: 'height:80px'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'operatorPersonName',
    title: '经办人',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    id: 'creatorName',
    readonly: true
  }, {
    xtype: 'text',
    name: 'operatorDateStr',
    title: '经办日期',
    id: 'ctime',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    readonly: true
  }, {
    xtype: 'buttons',
    textClass: 'col-md-6 text-right',
    buttons: [{
      btnClass: 'btn-primary mortgage-save-button',
      name: 'saveMortgageBtn',
      title: '抵押保存信息 '
    }]
  }]
}];
//抵押车辆
var mortgageCarTag = [{
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    title: '机动车登记证书所有人',
    id: 'mortgageProcesser',
    name: 'mortgageProcesser',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    maxlength: 50
  }, {
    xtype: 'date',
    name: 'mortgageProcessDate',
    dateName: 'mortgageProcessDateStr',
    title: '抵押登记日期',
    id: 'mortgageProcessDate',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'text',
    name: 'plateNumber',
    title: '车牌号',
    labelClass: "col-md-1",
    textClass: "col-md-2",
    id: 'plateNumber',
    tip: '请输入正确的车牌号',
    maxlength: 20
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'registerLicenseNo',
    id: 'registerLicenseNo',
    title: '机动车登记证书号',
    tip: '请输入正确的机动车登记证书号',
    labelClass: "col-md-1",
    textClass: "col-md-2",
    maxlength: 100
  }, {
    xtype: 'date',
    name: 'mortgageFileSubmitBankDate',
    dateName: 'mortgageFileSubmitBankDateStr',
    id: 'mortgageFileSubmitBankDate',
    title: '抵押资料交银行日期',
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
    name: 'noMortgageReason',
    labelClass: 'col-md-1',
    textClass: 'col-md-11',
    title: '未办理抵押原因',
    id: 'noMortgageReason',
    cls: 'height:80px'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'mortgageCarPersonName',
    title: '经办人',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    id: 'creatorName',
    readonly: true
  }, {
    xtype: 'text',
    name: 'mortgageCarDateStr',
    title: '经办日期',
    id: 'ctime',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    readonly: true
  }, {
    xtype: 'buttons',
    textClass: 'col-md-6 text-right',
    buttons: [{
      btnClass: 'btn-primary mortgageCar-save-button',
      name: 'saveMortgageCarBtn',
      title: '抵押登记保存 '
    }]
  }]
}];
//装订信息
var mortgageBindingTag = [{
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'bindingDate',
    dateName: 'bindingDateStr',
    title: '装订日期',
    id: 'bindingDate',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'text',
    title: '合同号',
    id: 'contractNo',
    name: 'contractNo',
    tip: "请输入正确的合同号",
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    readonly: true
  }, {
    xtype: 'text',
    title: '合同箱号',
    id: 'contractBoxNo',
    maxlength: 100,
    name: 'contractBoxNo',
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'firstArchiveDate',
    dateName: 'firstArchiveDateStr',
    id: 'firstArchiveDate',
    conTime: true,
    sId: 'firstArchiveDate',
    eId: 'secondArchiveDate',
    title: '一次归档日期',
    labelClass: "col-md-1",
    textClass: "col-md-2",
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    tip: '一次归档日期不能为空',
    checkObj: 'not_null'
  }, {
    xtype: 'date',
    name: 'secondArchiveDate',
    dateName: 'secondArchiveDateStr',
    id: 'secondArchiveDate',
    conTime: true,
    sId: 'firstArchiveDate',
    eId: 'secondArchiveDate',
    title: '二次归档日期',
    labelClass: "col-md-1",
    textClass: "col-md-2",
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    min: laydate.now(),
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'transferArchiveDate',
    dateName: 'transferArchiveDateStr',
    id: 'transferArchiveDate',
    title: '调档日期',
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
    name: 'transferArchiveRemark',
    id: 'transferArchiveRemark',
    xtype: 'textarea',
    cls: 'height:80px;',
    labelClass: "col-md-1",
    textClass: "col-md-8",
    title: '调档备注'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'bindingOperatorPersonName',
    title: '经办人',
    id: 'bindingOperatorPersonName',
    readonly: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'bindingOperatorDateStr',
    title: '经办日期',
    id: 'bindingOperatorDateStr',
    readonly: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }, {
    xtype: 'buttons',
    textClass: 'col-md-6 text-right',
    buttons: [{
      btnClass: 'btn-primary mortgage-binding-save-button',
      name: 'saveMortgageBindingBtn',
      title: '保存装订信息 '
    }]
  }]
}];
//过户信息
var mortgageTransferTag = [{
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'transferDate',
    dateName: 'transferDateStr',
    title: '过户日期',
    id: 'transferDate',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'text',
    name: 'transferFee',
    title: '过户费用',
    id: 'transferFee',
    maxlength: 10,
    checkObj: 'float'
  }, {
    xtype: 'text',
    name: 'transferOperatorPersonName',
    title: '经办人',
    id: 'transferOperatorPersonName',
    readonly: true
  }, {
    xtype: 'text',
    name: 'transferOperatorDateStr',
    title: '经办日期',
    id: 'transferOperatorDateStr',
    readonly: true
  }]
}, {
  xtype: 'buttons',
  textClass: 'col-md-12 text-right',
  buttons: [{
    btnClass: 'btn-primary mortgage-transfer-save-button',
    name: 'saveTransferBtn',
    title: '保存过户信息 '
  }]
}];
//车资
var carInfoTag = [{
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'registerLicenseExpireDate',
    dateName: 'registerLicenseExpireDateStr',
    title: '登记证书到达日期',
    id: 'registerLicenseExpireDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'billExpireDate',
    dateName: 'billExpireDateStr',
    title: '发票到达日期',
    id: 'billExpireDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'driveExpirtDate',
    dateName: 'driveExpirtDateStr',
    title: '行驶证到达日期',
    id: 'driveExpirtDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'carStockExpireDate',
    dateName: 'carStockExpireDateStr',
    title: '车资到达日期',
    id: 'carStockExpireDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'certificationExpireDate',
    dateName: 'certificationExpireDateStr',
    title: '合格证到达日期',
    id: 'certificationExpireDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'insuranceExpireDate',
    dateName: 'insuranceExpireDateStr',
    title: '保单到达日期',
    id: 'insuranceExpireDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'carPickupImageUploadDate',
    dateName: 'carPickupImageUploadDateStr',
    title: '提车影像上传日期',
    id: 'carPickupImageUploadDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'evaluateFileUploadDate',
    dateName: 'evaluateFileUploadDateStr',
    title: '评估资料上传日期',
    id: 'evaluateFileUploadDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  }, {
    xtype: 'date',
    name: 'mortgageFileUploadDate',
    dateName: 'mortgageFileUploadDateStr',
    title: '抵押资料上传日期',
    id: 'mortgageFileUploadDate',
    isPlugin: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2',
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true
  },{
    xtype: 'buttons',
    textClass: 'col-md-3 text-right',
    buttons: [{
      id: 'mortgage-file-upload-btn',
      btnClass: 'btn-info',
      name: 'uploadFileBtn',
      title: '上传相关附件 '
    }, {
      btnClass: 'btn-primary mortgage-car-stock-save-btn m-l-6',
      name: 'saveCarInfoBtn',
      title: '车资保存 '
    }]
  }]
}];
