/*************************************************/
/**                                             **/
/**        汽车金融-放贷信息-档案信息                 **/
/**        使用模块：初审单状态要求：垫付审核通过        **/
/**                                             **/
/**        备注：《所有修改人要添加使用模块》            **/
/**                                             **/
/*************************************************/

//档案信息
var archivesInfo = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'date',
        name: 'firstArchiveDate',
        id: 'firstArchiveDate',
        conTime:true,
        sId:'firstArchiveDate',
        eId:'secondArchiveDate',
        max:laydate.now(),
        title: '一次归档日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        istime: false,
        isclear: true,
        istoday: true,
        issure: true,
        tip		: '一次归档日期不能为空',
        checkObj:'not_null'
        
    }, {
        xtype: 'date',
        name: 'secondArchiveDate',
        id: 'secondArchiveDate',
        conTime:true,
        sId:'firstArchiveDate',
        eId:'secondArchiveDate',
        max:laydate.now(),
        title: '二次归档日期',
        labelClass: "col-md-1",
        textClass: "col-md-2",
        isPlugin: true,
        formatDate: 'YYYY-MM-DD',
        max:laydate.now(),
        istime: false,
        isclear: true,
        istoday: true,
        issure: true
    },{
        xtype: 'date',
        name: 'transferArchiveDate',
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
}];
