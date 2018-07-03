/*************************************************/
/**                                                **/
/**        汽车金融-放贷信息-合同信息                        **/
/**        使用模块：初审单状态要求：垫付审核通过                **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                    **/
/**                                                **/
/*************************************************/

//合同信息
var contractInfo = [{
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'hidden',
    name: 'id'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'teamDeliverContractDate',
    id: 'teamDeliverContractDate',
    title: '业务团队寄出贷款合同日期',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'teamDeliverContractHandlePersonName',
    id: 'teamDeliverContractHandlePersonName',
    title: '经办人',
    readonly: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'teamDeliverContractHandleDateStr',
    id: 'teamDeliverContractHandleDateStr',
    title: '经办日期',
    readonly: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'teamDeliverContractRemark',
    id: 'teamDeliverContractRemark',
    title: '业务寄出合同备注',
    labelClass: 'col-md-1',
    textClass: 'col-md-8'
  }, {
    xtype: 'button',
    btnClass: 'btn-primary teamToDateSave-btn',
    name: 'teamToDateSave',
    id: 'teamToDateSave',
    textClass: 'col-md-2 text-right',
    labelClass: 'col-md-1',
    title: '业务寄出日期保存'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'loanContractReceiveDate',
    id: 'loanContractReceiveDate',
    title: '单证收到贷款合同日期',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'dzReceiveContractPersonName',
    id: 'dzReceiveContractPersonName',
    title: '经办人',
    readonly: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'dzReceiveContractDateStr',
    id: 'dzReceiveContractDateStr',
    title: '经办日期',
    readonly: true,
    labelClass: 'col-md-1',
    textClass: 'col-md-2'
  },{
	  xtype: 'date',
	  name: 'lastFileNoticeDate',
	  id: 'lastFileNoticeDate',
	  title: '单证候补资料通知日期',
	  isPlugin: true,
	  formatDate: 'YYYY-MM-DD',
	  istime: false,
	  isclear: true,
	  istoday: true,
	  issure: true,
	  labelClass: 'col-md-1',
	  textClass: 'col-md-2'
  }]    	  
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'loanContractReceiveRemark',
    id: 'loanContractReceiveRemark',
    title: '单证收到贷款合同备注',
    labelClass: 'col-md-1',
    textClass: 'col-md-8'
  }, {
    xtype: 'button',
    btnClass: 'btn-primary saveArchivesGetDate-btn',
    name: 'saveArchivesGetDate',
    id: 'saveArchivesGetDate',
    textClass: 'col-md-2 text-right',
    labelClass: 'col-md-1',
    title: '单证收到贷款合同保存'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'lastFileReceiveDate',
    id: 'lastFileReceiveDate',
    title: '单证收到后补资料日期',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    labelClass: 'col-md-1',
	textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'dzReceiveWaitingFilePersonName',
    id: 'dzReceiveWaitingFilePersonName',
    title: '经办人',
    readonly: true,
    labelClass: 'col-md-1',
	textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'dzReceiveWaitingFileDateStr',
    id: 'dzReceiveWaitingFileDateStr',
    title: '经办日期',
    readonly: true,
    labelClass: 'col-md-1',
	textClass: 'col-md-2'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'lastFileRemark',
    id: 'lastFileRemark',
    title: '单证收到后补资料备注',
    labelClass: 'col-md-1',
    textClass: 'col-md-8'
  }, {
    xtype: 'button',
    btnClass: 'btn-primary saveArchivesAlternateDate-btn',
    name: 'saveArchivesAlternateDate',
    id: 'saveArchivesAlternateDate',
    textClass: 'col-md-2 text-right',
    labelClass: 'col-md-1',
    title: '单证收到候补资料保存'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'contractSubmitBankDate',
    id: 'contractSubmitBankDate',
    title: '单证送交贷款合同银行日期',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    labelClass: 'col-md-1',
	textClass: 'col-md-2'
  }, {
    xtype: 'date',
    name: 'loanContractAllDate',
    id: 'loanContractAllDate',
    title: '单证收到贷款合同齐全日期',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    labelClass: 'col-md-1',
	  textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'contractSubmitBankRemark',
    id: 'contractSubmitBankRemark',
    title: '单证送交贷款合同银行备注',
    labelClass: 'col-md-1',
    textClass: 'col-md-5'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
	  xtype: 'select',
      title: '问题类型',
      id: 'askTypeCode',
      name: 'askTypeCode',
      isPlugin: true,
      displayField: 'value',
      valueField: 'key',
      checkFn:"validSelect(this)",
      data: dictData["680000"]
  },{
    xtype: 'text',
    name: 'dzSendContractToBankPersonName',
    id: 'dzSendContractToBankPersonName',
    title: '经办人',
    readonly: true
  }, {
    xtype: 'text',
    name: 'dzSendContractToBankDateStr',
    id: 'dzSendContractToBankDateStr',
    title: '经办日期',
    readonly: true
  }, {
    xtype: 'button',
    btnClass: 'btn-primary toDateSave-btn',
    name: 'toDateSave',
    id: 'toDateSave',
    textClass: 'col-md-3 text-right',
    title: '单证送贷款合同保存'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'date',
    name: 'bankReceiveContractDate',
    id: 'bankReceiveContractDate',
    title: '银行收到贷款合同日期',
    isPlugin: true,
    formatDate: 'YYYY-MM-DD',
    istime: false,
    isclear: true,
    istoday: true,
    issure: true,
    labelClass: 'col-md-1',
	  textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'dzBankReceiveContractPersonName',
    id: 'dzBankReceiveContractPersonName',
    title: '经办人',
    readonly: true,
    labelClass: 'col-md-1',
	  textClass: 'col-md-2'
  }, {
    xtype: 'text',
    name: 'dzBankReceiveContractDateStr',
    id: 'dzBankReceiveContractDateStr',
    title: '经办日期',
    readonly: true,
    labelClass: 'col-md-1',
	  textClass: 'col-md-2'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
    xtype: 'text',
    name: 'bankReceiveContractRemark',
    id: 'bankReceiveContractRemark',
    title: '银行收到合同备注',
    labelClass: 'col-md-1',
    textClass: 'col-md-8'
  }, {
    xtype: 'button',
    btnClass: 'btn-primary bankToDateSave-btn',
    name: 'bankToDateSave',
    id: 'bankToDateSave',
    labelClass: 'col-md-1',
    textClass: 'col-md-2 text-right',
    title: '银行收到合同日期保存'
  }]
}, {
  xtype: 'fieldcontainer',
  items: [{
	  xtype: 'text',
      name: 'contractFileAddRemark',
      id: 'contractFileAddRemark',
      labelClass: "col-md-1",
      textClass: "col-md-8",
      title: '备注'
  }]		     
}, {
	  xtype: 'fieldcontainer',
	  items: [{
	    xtype: 'text',
	    name: 'contractRemakSaveUserName',
	    id: 'contractRemakSaveUserName',
	    title: '经办人',
	    readonly: true,
	    labelClass: 'col-md-1',
	    textClass: 'col-md-2'
	  }, {
	    xtype: 'text',
	    name: 'contractRemakSaveDateStr',
	    id: 'contractRemakSaveDateStr',
	    title: '经办日期',
	    readonly: true,
	    labelClass: 'col-md-1',
	    textClass: 'col-md-2'
	  },{
	    xtype: 'button',
	    btnClass: 'btn-primary saveScanningDate-btn',
	    name: 'saveScanningDate',
	    id: 'saveScanningDate',
	    labelClass: 'col-md-1',
	    textClass: 'col-md-5 text-right',
	    title: '合同备注保存'
	  }]
	}];
