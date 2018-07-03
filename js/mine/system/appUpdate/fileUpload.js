$(function () {
    var fileMd5;
    //监听分块上传过程中的三个时间点
    WebUploader.Uploader.register({
        "before-send-file": "beforeSendFile",
        "before-send": "beforeSend",
        "after-send-file": "afterSendFile",
    }, {
        //时间点1：所有分块进行上传之前调用此函数
        beforeSendFile: function (file) {
            var deferred = WebUploader.Deferred();
            //1、计算文件的唯一标记，用于断点续传
            (new WebUploader.Uploader()).md5File(file, 0, chunkSize)
                .progress(function (percentage) {
                    // $('.statusBar').find(".info").text("正在读取文件信息...");
                })
                .then(function (val) {
                    fileMd5 = val;
                    // $('.statusBar').find(".info").text("成功获取文件信息...");
                    //获取文件信息后进入下一步
                    deferred.resolve();
                });
            return deferred.promise();
        },
        //时间点2：如果有分块上传，则每个分块上传之前调用此函数
        beforeSend: function (block) {
            var deferred = WebUploader.Deferred();

            $.ajax({
                type: "POST",
                url: ctx + "/fdfs/checkChunk.action",
                data: {
                    //文件唯一标记
                    fileMd5: fileMd5,
                    //当前分块下标
                    chunk: block.chunk,
                    //当前分块大小
                    chunkSize: block.end - block.start
                },
                dataType: "json",
                success: function (result) {
                    if (result.error == 1) {
                        //分块存在，跳过
                        deferred.reject();
                    } else {
                        //分块不存在或不完整，重新发送该分块内容
                        deferred.resolve();
                    }
                }
            });

            this.owner.options.formData.fileMd5 = fileMd5;
            deferred.resolve();
            return deferred.promise();
        },
        //时间点3：所有分块上传成功后调用此函数
        afterSendFile: function (file) {
            //如果分块上传成功，则通知后台合并分块
            $.ajax({
                type: "POST",
                url: ctx + "/fdfs/mergeChunks.action",
                data: {
                    fileMd5: fileMd5
                },
                dataType: "json",
                success: function (result) {
                    if (result.error == 1) {
                        var $file = $("#" + file.id);
                        var v = result.rows.split(",");
                        $file.data("group", v[0]);
                        $file.data("filepath", v[1]);
                        $file.data("filename", v[2]);
                        successMsg(result.message);
                    } else {
                        faildMsg(result.message);
                    }
                }, error: function (result) {
                    faildMsg(result.message);
                }
            });
        }
    });


    $(".filelist li").on("mouseenter", function () {
        $(this).find(".file-panel").stop().animate({height: 30});
    });
    $(".filelist li").on("mouseleave", function () {
        $(this).find(".file-panel").stop().animate({height: 0});
    });
    $(".filelist li").find(".file-panel").on("click", "span", function () {
        var $li = $(this).parent().parent();
        //移除文件
        $li.remove();
        fileCount--;
        $li_count = $(".filelist li").length;
        removePlaceClass($li_count);
    });
    //从fasdfs服务器删除文件
    function deleteFileFromFASDFS(group, filePath) {
        $.ajax({
            url: ctx + "/fdfs/deleteFdfsFile.action",
            type: "post",
            data: {groupName: group, fileId: filePath},
            dataType: "json",
            success: function (data) {
                if (data.error == -1) {
                    faildMsg(data.message);
                }
            }, error: function (data) {
                faildMsg(data.message);
            }
        });
    }

    //添加文件，并展示缩略图
    function addFile(file) {
        var $li = $('<li id="' + file.id + '"><p class="title">' + file.name + '</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),
            $btns = $('<div class="file-panel"><span class="cancel">删除</span><span class="rotateRight">向右旋转</span><span class="rotateLeft">向左旋转</span></div>').appendTo($li),
            progress = $li.find("p.progress span"),
            $img = $li.find("p.imgWrap"),
            $error = $('<p class="error"></p>'),
            showError = function (e) {
                switch (e) {
                    case"exceed_size":
                        text = "文件大小超出";
                        break;
                    case"interrupt":
                        text = "上传暂停";
                        break;
                    default:
                        text = "上传失败，请重试"
                }
                $error.text(text).appendTo($li);
            };
        if ("invalid" === file.getStatus()) {
            showError(file.statusText);
        } else {
            $img.text("预览中");
        }
        //生成缩略图，此过程为异步，所以需要传入callback。 通常情况在图片加入队里后调用此方法来生成预览图以增强交互效果。
        uploader.makeThumb(file, function (error, ret) {
            if (error) {
                $img.text("非图片类型不能预览");
            } else {
                $img.empty().append('<img src="' + ret + '" />');
            }
        }, thumbnailWidth, thumbnailHeight);

        percentages[file.id] = [file.size, 0];
        file.rotation = 0;
        file.on('statuschange', function (cur, prev) {
            // 成功
            if (cur === 'error' || cur === 'invalid') {
                console.log(file.statusText);
                showError(file.statusText);
                percentages[file.id][1] = 1;
            } else if (cur === 'interrupt') {
                showError('interrupt');
            } else if (cur === 'queued') {
                $error.remove();
                progress.css('display', 'block');
                percentages[file.id][1] = 0;
            } else if (cur === 'progress') {
                $error.remove();
                progress.css('display', 'block');
            } else if (cur === 'complete') {
                progress.hide().width(0);
                $li.append('<span class="success"></span>');
            }

            $li.removeClass('state-' + prev).addClass('state-' + cur);
        });
        //当鼠标移动到缩略图片触发事件
        $li.on("mouseenter", function () {
            $btns.stop().animate({height: 30});
        });
        $li.on("mouseleave", function () {
            $btns.stop().animate({height: 0});
        });

        $btns.on("click", "span", function () {
            var deg, s = $(this).index();
            switch (s) {
                case 0:
                    //移除文件
                    if ("complete" === file.getStatus()) {
                        var group = $("#" + file.id).data("group");
                        var filePath = $("#" + file.id).data("filepath");
                        deleteFileFromFASDFS(group, filePath);
                    }
                    return uploader.removeFile(file);
                case 1:
                    file.rotation += 90;
                    break;
                case 2:
                    file.rotation -= 90;
            }
            if (supportTransition) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $img.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $img.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
            }
        });
        $li.appendTo($queueList);
    }

    function removePlaceClass($li_count) {
        if (fileCount == 0 && $li_count == 0) {
            $placeholder.removeClass("element-invisible");
        }
    }

    function removeFile(file) {
        var $li = $("#" + file.id);
        delete percentages[file.id];
        updateTotalProgress();
        $li.off().find(".file-panel").off().end().remove();
    }

    function updateTotalProgress() {
        var percent, loaded = 0, total = 0, $span = $progress.children();
        $.each(percentages, function (e, i) {
            total += i[0];
            loaded += i[0] * i[1];
        });
        percent = total ? loaded / total : 0;
        $span.eq(0).text(Math.round(100 * percent) + "%");
        $span.eq(1).css("width", Math.round(100 * percent) + "%");
        $progress.show();
    }

    var $queueList = $("#uploader").find(".queueList").find(".filelist"),
        //存放文件大小和进度条的div
        $statusBar = $("#uploader").find(".statusBar"),
        //存放文件大小的描述信息的div
        $info = $statusBar.find(".info"),
        //上传文件的进度条
        $progress = $statusBar.find(".progress").hide(),
        $placeholder = $("#uploader").find(".placeholder"),

        //设置添加文件的总数
        fileTotalCount = 1,
        //设置文件类型
        fileTypes = "zip",
        //文件类型
        mimeTypes = "application/zip",
        //设置文件总大小
        fileSizeLimit = 3221225472,
        //设置单个文件大小
        fileSingleSizeLimit = 2147483648,
        //设置分片大小
        chunkSize = 5242880,

        //添加的文件数
        fileCount = $(".filelist li").length,
        //添加的文件总大小
        fileTotalSize = 0,
        //优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 110 * ratio,
        supportTransition = (function () {
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
            s = null;
            return r;
        })(),
        //所有文件的进度信息，key为file id
        percentages = {};

    if (!WebUploader.Uploader.support()) {
        alertDialog("Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器");
        return;
    }
    var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: "#filePicker",
        //指定拖拽的容器,默认值：undefined
        dnd: "#uploader .queueList",
        //指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为document.body,默认值：undefined
        paste: document.body,
        accept: {title: "Images", extensions: fileTypes, mimeTypes: mimeTypes},
        swf: ctx + '/js/third/webuploader/Uploader.swf',
        //是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。默认值：false
        disableGlobalDnd: false,
        // 开起分片上传。
        chunked: true,
        //如果要分片，分多大一片？ 默认大小为5M
        chunkSize: chunkSize,
        //如果某个分片由于网络问题出错，允许自动重传多少次？
        chunkRetry: 2,
        server: ctx + '/fdfs/uploadChunks.action',
        //文件上传方式，POST或者GET,默认：POST
        method: 'POST',
        //设置文件上传域的name,默认：'file'
        fileVal: 'file',
        //文件上传请求的参数，每次发送都会发送此参数
        formData: {
            filetype: 1
        },
        //配置生成缩略图的选项
        thumb: {
            width: 110,
            height: 110,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: true,
            // 是否允许裁剪。
            crop: true,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        },
        //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key,默认值：undefined
        duplicate: true,
        // 上传本分片时预处理下一分片
        prepareNextFile: true,
        //验证文件总数量, 超出则不允许加入队列
        fileNumLimit: fileTotalCount,
        //验证文件总大小是否超出限制, 超出则不允许加入队列
        fileSizeLimit: fileSizeLimit,
        //验证单个文件大小是否超出限制, 超出则不允许加入队列
        fileSingleSizeLimit: fileSingleSizeLimit
    });
    //上传过程中触发，携带上传进度
    uploader.onUploadProgress = function (file, percentage) {
        var $file = $("#" + file.id),
            $span = $file.find(".progress span");
        $span.css("width", 100 * percentage + "%");
        percentages[file.id][1] = percentage;
        updateTotalProgress();
    };
    //文件加入队列前触发
    uploader.onBeforeFileQueued = function (file) {
        if (fileCount >= fileTotalCount) {
            alertDialog("文件数量超出限定值：" + fileTotalCount);
            return false;
        }
    }
    //文件加入队列后删除时触发
    uploader.onFileQueued = function (file) {
        fileCount++;
        fileTotalSize += file.size;
        $placeholder.addClass("element-invisible");
        $statusBar.show();
        addFile(file);
        updateTotalProgress();

    };
    //文件从队列后删除时触发
    uploader.onFileDequeued = function (file) {
        fileCount--;
        fileTotalSize -= file.size;
        removeFile(file);
        updateTotalProgress();
        $li_count = $(".filelist li").length;
        removePlaceClass($li_count);
    };
    //文件上传成功后触发
    uploader.onUploadSuccess = function (file, response) {
        var $file = $("#" + file.id);
        var v = response._raw.split(",");
        $file.data("group", v[0]);
        $file.data("filepath", v[1]);
        $file.data("filename", v[2]);
    };
    //文件上传失败后触发
    uploader.onUploadError = function (file, reason) {
        console.log(reason);
    }
    //当文件上传出错时触发
    uploader.onError = function (reason) {
        if ("Q_EXCEED_NUM_LIMIT" === reason) {
            alertDialog("文件数量超出限定值：" + fileTotalCount);
        }
        if ("Q_TYPE_DENIED" === reason) {
            alertDialog("文件类型不符合限定值：" + fileTypes);
        }
        if ("Q_EXCEED_SIZE_LIMIT" === reason) {
            alertDialog("文件总大小超出限定值：" + fileSizeLimit / (1024 * 1024) + "M");
        }
        if ("F_EXCEED_SIZE" === reason) {
            alertDialog("单个文件大小超出限定值：" + fileSingleSizeLimit / (1024 * 1024) + "M");
        }
    };

    uploader.onUploadComplete = function (file) {
        console.log(file);
    }

    uploader.onUploadFinished = function (file) {
        console.log(file);
    }


    //重试上传，重试指定文件，或者从出错的文件开始重新上传
    $placeholder.on("click", ".retry", function () {
        uploader.retry();
    });


    //编辑时，添加缩略图宽和高
    $(".filelist li").each(function () {
        var img = $(this).find("p.imgWrap").find("img")[0];
        $(img).attr("width", thumbnailWidth);
        $(img).attr("height", thumbnailHeight);
    });
});