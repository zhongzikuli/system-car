$(function () {
    new HYUpload({
        auto: true,
        containerId: '#addAllUploader',
        uploadImg: false,						//图片上传标记
        dropTip: '',
        buttonText: '选择文件',
        fileSizeLimit:80485760,
        fileSingleSizeLimit:80485760,
        server: ctx + '/dataImport/orderDetailImportExcel.action'
    });

});