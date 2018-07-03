$(function () {
    new HYUpload({
        auto: true,
        containerId: '#addOrderUploader',
        uploadImg: false,						//图片上传标记
        dropTip: '',
        buttonText: '选择订单文件',
        fileSizeLimit:80485760,
        fileSingleSizeLimit:80485760,
        server: ctx + '/dataImport/importExcel.action'
    });
    new HYUpload({
        auto: true,
        containerId: '#addOrderDetailUploader',
        uploadImg: false,						//图片上传标记
        dropTip: '',
        buttonText: '选择订单详情文件',
        fileSizeLimit:80485760,
        fileSingleSizeLimit:80485760,
        server: ctx + '/dataImport/orderDetailImportExcel.action'
    });
});