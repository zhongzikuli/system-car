(function ($) {
    var carForm = function (option, callback) {
        //初始化组件
        initComponent(option);
        return this;
    };

    function initChosen(it) {
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "undefined" != typeof(it.width) ? it.width : "100%"
        };
        //console.log(JSON.stringify(it));

        try {
//	            //下拉框
            if (it.checked) {
                $("#" + it.id).chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#" + it.id).parent(), "remove");
                        $("#vtip").hide();
                    } else {
                        change_error_style($("#" + it.id).parent(), "add");
                    }
                })
            } else {
                $("#" + it.id).chosen(config);
            }
        } catch (e) {
//	            // TODO: handle exception
        }
    }

    function initLaydate(it) {
        if (it.conTime) {
            var sTime = {
                elem: '#' + it.sId,
                format: it.formatDate ? it.formatDate : 'YYYY-MM-DD',
                min: it.min ? it.min : '',
                max: it.max ? it.max : '',
                istoday: it.istoday ? it.istoday : false, //是否显示今天
                issure: it.issure ? it.issure : false, //是否显示确认
                istime: it.istime ? it.istime : false, //是否开启时间选择
                choose: function (datas) {
                    eTime.min = datas; //开始日选好后，重置结束日的最小日期
                },
                clear: function () {
                    eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
                }
            };

            var eTime = {
                elem: '#' + it.eId,
                format: it.formatDate ? it.formatDate : 'YYYY-MM-DD',
                min: it.min ? it.min : '',
                max: it.max ? it.max : '',
                istoday: it.istoday ? it.istoday : false, //是否显示今天
                issure: it.issure ? it.issure : false, //是否显示确认
                istime: it.istime ? it.istime : false, //是否开启时间选择
                choose: function (datas) {
                    sTime.max = datas;			//结束日选好后，重置开始日的最大日期
                },
                clear: function () {
                    sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
                    sTime.max = laydate.now();	//将开始日的最大值设定为今天
                }
            };
            laydate(sTime);
            laydate(eTime);
        } else {
            $("#" + it.id).on("click", function () {
                laydate({
                    format: it.formatDate ? it.formatDate : 'YYYY-MM-DD',
                    min: it.min ? it.min : "1970-01-01",
                    max: it.max ? it.max : laydate.now(),
                    istime: it.istime ? it.istime : false, //是否开启时间选择
                    isclear: it.isclear ? it.isclear : true, //是否显示清空
                    istoday: it.istoday ? it.istoday : false, //是否显示今天
                    issure: it.issure ? it.issure : false, //是否显示确认
                    start: it.start ? it.start : laydate.now(),
                    choose: function (datas) {

                    }
                });
            })
        }
    }

    function initArea(it) {
        // 当为户籍，上牌地，手机号时特别处理，为省市2级
        if (it.name == "carLicenseProvince" || it.name == "province" || it.name == "telArea") {
            init_city_select($("#" + it.id), 2, it.direction);
        } else {
            init_city_select($("#" + it.id), it.num, it.direction);
        }
    }

    function initComponent(option) {
        //需要初始化控件对象
        var plugins = new Array();
        if (option.items) {
            if (option.tagStyle == 'form') {
                var html = '<form class="form-horizontal">';
            } else {
                var html = '<div class="form-horizontal">';
            }
            if (option.xtype == 'fieldset') {
                html += initFieldSetContainer(option, plugins);
            } else {
                for (var i = 0; i < option.items.length; i++) {
                    var item = option.items[i];
                    if (item.xtype == 'fieldcontainer') {
                        html += initFieldContainer(i, item, plugins, option);
                    } else {
                        html += initDefaultContainer(i, item, plugins, option)
                    }
                    if (item.readonly) {
                        readOnly(item)
                    }
                }
            }
            if (option.tagStyle == 'form') {
                html += '</form>';
            } else {
                html += '</div>';
            }
            $(option.id).append(html);
        }
        //初始化插件
        initPlugin(plugins);
        //事件
        if (typeof(option.beforeShow) == "function") {
            option.beforeShow();
        }
        ;
    }

    //初始化fieldset布局xtype = fieldcontainer
    function initFieldSetContainer(option, plugins) {
        var title = "";
        if (typeof(option.title) != 'undefined') {
            title = option.title;
        }
        var index = 0;
        if (typeof(option.index) != 'undefined') {
            index = option.index;
        }
        var html = "";
        html += '<fieldset id="fieldset-' + index + '"><legend>' + title + '</legend>';
        if (option.isForm) {
            html += '<form id="form-' + option["name"] + "-" + index + '">'
        }
        var items = option["items"];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.xtype == 'fieldcontainer') {
                html += initFieldContainer(i, item, plugins, option);
            } else {
                html += initDefaultContainer(i, item, plugins, option)
            }
        }
        //html += '<div id="audit-buyer-information-list"></div>';
        if (option.isForm) {
            html += '</form>';
        }
        html += '</fieldset>';
        return html;
    }

    //初始化默认组件布局xtype = fieldcontainer
    function initDefaultContainer(i, item, plugins, option) {
        var html = "";
        if (i == 0) {
            html += '<div class="mr-none form-group">';
        } else {
            html += '<div class="mr-none form-group">';
        }
        var tHtml = "";
        if (option.data) {
            for (var name in option.data) {
                if (item.name == name) {
                    item.defaultValue = option.data[name];
                }
            }
        }
        var lWidth = 2, tWidth = 2;
        if (item.xtype == 'text') {
            tHtml = prepareText(item, lWidth, tWidth)
        } else if (item.xtype == 'hidden') {
            tHtml = prepareHidden(item, lWidth, tWidth);
        } else if (item.xtype == 'checkbox') {
            tHtml = prepareCheckBox(item, lWidth, tWidth);
        } else if (item.xtype == 'radio') {
            tHtml = prepareRadio(item, lWidth, tWidth);
        } else if (item.xtype == "select") {
            tHtml = prepareSelect(item, lWidth, tWidth);
        } else if (item.xtype == 'button') {
            tHtml = prepareButton(item, lWidth, tWidth);
        } else if (item.xtype == 'buttons') {
            tHtml = prepareButtons(item, lWidth, tWidth);
        } else if (item.xtype == 'textarea') {
            tHtml = prepareTextarea(item, lWidth, tWidth);
        } else if (item.xtype == 'label') {
            tHtml = prepareLabel(item, lWidth, tWidth);
        } else if (item.xtype == 'date') {
            tHtml = prepareDate(item, lWidth, tWidth);
        } else if (item.xtype == 'area') {
            tHtml = prepareArea(item, lWidth, tWidth);
        } else if (item.xtype == 'checkInput') {
            tHtml = prepareCheckInput(item, lWidth, tWidth);
        } else if (item.xtype == 'checkSelect') {
            tHtml = prepareCheckSelect(item, lWidth, tWidth);
        } else if (item.xtype == 'checkDate') {
            tHtml = prepareCheckDate(item, lWidth, tWidth);
        } else if (item.xtype == 'checkArea') {
            tHtml = prepareCheckArea(item, lWidth, tWidth);
        } else if (item.xtype == 'connection') {
            tHtml = prepareConnection(item, lWidth, tWidth);
        }
        if (item.isPlugin) {
            plugins.push(item);
        }
        html += tHtml + '</div>';
        return html;
    }

    //xtype = fieldcontainer
    function initFieldContainer(i, item, plugins, option) {
        var html = "";
        if (i == 0) {
            if (item.items[0].plain) {
                html += '<div class="m-rl-tb m-t-xs plain-area' + (item.className ? item.className : "") + '">';
            } else {
                html += '<div class="m-rl-tb m-t-xs row ' + (item.className ? item.className : "") + '">';
            }
        } else {
            html += '<div class="m-rl-tb row ' + (item.className ? item.className : "") + '">';
        }
        var lWidth = 2, tWidth = 2;
        var num = parseInt(12 / item.items.length) % 2;
        if (num > 0) {
            lWidth = parseInt(parseInt(12 / item.items.length) / 2);
            tWidth = 12 / item.items.length - lWidth;
        } else {
            lWidth = parseInt(12 / item.items.length) / 2 - 1;
            tWidth = parseInt(12 / item.items.length) / 2 + 1;
        }
        for (var j = 0; j < item.items.length; j++) {
            var tHtml = "";
            var it = item.items[j];
            if (null != option && null != option.data) {
                for (var name in option.data) {
                    if (it.name == name) {
                        it.defaultValue = option.data[name];
                    }
                }
            }
            if (it.xtype == 'text') {
                tHtml = prepareText(it, lWidth, tWidth)
            } else if (it.xtype == 'hidden') {
                tHtml = prepareHidden(it, lWidth, tWidth);
            } else if (it.xtype == 'checkbox') {
                tHtml = prepareCheckBox(it, lWidth, tWidth);
            } else if (it.xtype == 'radio') {
                tHtml = prepareRadio(it, lWidth, tWidth);
            } else if (it.xtype == "select") {
                tHtml = prepareSelect(it, lWidth, tWidth);
            } else if (it.xtype == 'button') {
                tHtml = prepareButton(it, lWidth, tWidth);
            } else if (it.xtype == 'buttons') {
                tHtml = prepareButtons(it, lWidth, tWidth);
            } else if (it.xtype == 'textarea') {
                tHtml = prepareTextarea(it, lWidth, tWidth);
            } else if (it.xtype == 'label') {
                tHtml = prepareLabel(it, lWidth, tWidth);
            } else if (it.xtype == 'date') {
                tHtml = prepareDate(it, lWidth, tWidth);
            } else if (it.xtype == 'area') {
                tHtml = prepareArea(it, lWidth, tWidth);
            } else if (it.xtype == 'checkInput') {
                tHtml = prepareCheckInput(it, lWidth, tWidth);
            } else if (it.xtype == 'checkSelect') {
                tHtml = prepareCheckSelect(it, lWidth, tWidth);
            } else if (it.xtype == 'checkDate') {
                tHtml = prepareCheckDate(it, lWidth, tWidth);
            } else if (it.xtype == 'checkArea') {
                tHtml = prepareCheckArea(it, lWidth, tWidth);
            } else if (it.xtype == 'connection') {
                tHtml = prepareConnection(it, lWidth, tWidth);
            }
            html += tHtml;

            if (it.isPlugin) {
                plugins.push(it);
            }
        }
        html += '</div>';
        return html;
    }

    function getHtml(html, data) {
        for (var i = 0; i < date.length; i++) {
            html += '<p datatype="">' + date[i] + '</p>'
        }
        return html
    }

    //初始化插件
    function initPlugin(plugins) {
        for (var i = 0; i < plugins.length; i++) {
            var item = plugins[i];
            if (item.xtype == "select" || item.xtype == "checkSelect") {
                initChosen(item);
            } else if (item.xtype == "date" || item.xtype == "checkDate") {
                initLaydate(item);
            } else if (item.xtype == "area" || item.xtype == "checkArea") {
                initArea(item);
            }
        }
    }

    function prepareText(it, lWidth, tWidth) {
        var html = "";
        //label
        if (it.plain) {
            if (it.dClass) {
                html += '<div class="plain-block plain-block-area">';
            } else {
                html += '<div  ' + (it.styleModel ? ' class="plain-block plain-block-' + it.styleModel + '" ' : 'class="plain-block"') + ' >';
            }
            html += '<label class="control-label">';
        } else {
            html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
            if (it.required) {
                html += '<span class="red">*</span>';
            }
        }
        html += it.title + ':</label>';
        //text
        if (it.plain) {
            html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + (it.lightUp ? ' class="form-control lightUp "' : 'class="form-control"') + ' type="text">';
        } else {
            html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
            if (it.checked) {
                html += '<input ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                    + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '')
                    + (it.tip ? 'tip="' + it.tip + '"' : '') + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
                    + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.lightUp ? ' class="form-control lightUp "' : 'class="form-control"') + ' type="text">';
            } else {
                html += '<input ' + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '') + (it.readonly ? ' readonly="readonly"' : '')
                    + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                    + (it.name ? ' name="' + it.name + '"' : '') + (it.lightUp ? ' class="form-control lightUp "' : 'class="form-control"') + ' type="text">';
            }
            if (it.fTip) {
                html += '<span style="color: #999;font-size: 10px;"><i class="fa fa-info-circle" style="margin-right: 5px;"></i>' + it.fTip + '</span>';
            }
        }
        html += '</div>';
        return html;
    }

    function prepareHidden(it, lWidth, tWidth) {
        var html = "";
        html += '<input  ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
            + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + 'class="form-control" type="hidden">';
        return html;
    }

    function prepareSelect(it, lWidth, tWidth) {
        var html = "";
        if (it.plain) {

            if (it.dClass) {
                html += '<div class="plain-block plain-block-area plain-block-select">';
            } else {
                html += '<div  ' + (it.styleModel ? ' class="plain-block plain-block-' + it.styleModel + '" ' : 'class="plain-block"') + ' >';
            }
            html += '<label class="control-label">';
        } else {
            html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
            if (it.required) {
                html += '<span class="red">*</span>';
            }
        }
        html += it.title + ':</label>';
        if (it.plain) {
            html += '<select data-placeholder="选择..." ' + (it.lightUp ? ' class="form-control lightUp "' : 'class="form-control"')
                + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.disabled ? ' disabled="' + it.disabled + '"' : '') + ' >'
        } else {
            //text
            html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
            if (it.checked) {
                html += ' <div  obj=""  tip="' + it.tip + '"><select check="' + it.checkFn + '"'
                    + 'data-placeholder="选择..." class="form-control"  ' + (it.width ? ' style="width:' + it.width + 'px;"' : ' style="width:100%;"')
                    + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.disabled ? ' disabled="' + it.disabled + '"' : '') + ' >';
            } else {
                html += '<select data-placeholder="选择..." class="form-control" ' + (it.width ? ' style="width:' + it.width + 'px;"' : ' style="width:100%;"')
                    + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.disabled ? ' disabled="' + it.disabled + '"' : '') + ' >';
            }
        }

        //设置“请选择”下拉值
        html += '<option value="" >请选择</option>';

        if (it.data) {
            for (var m = 0; m < it.data.length; m++) {
                if (it.displayField && it.valueField) {
                    if (it.defaultValue == it.data[m][it.valueField]) {
                        html += '<option value="' + it.data[m][it.valueField] + '" selected = "selected" name="' + it.data[m][it.displayField] + '">' + it.data[m][it.displayField] + '</option>';
                    } else {
                        html += '<option value="' + it.data[m][it.valueField] + '" name="' + it.data[m][it.displayField] + '">' + it.data[m][it.displayField] + '</option>';
                    }
                } else {
                    if (it.defaultValue == it.data[m]['value']) {
                        html += '<option value="' + it.data[m]['value'] + '" selected = "selected" name="' + it.data[m]['name'] + '">' + it.data[m]['name'] + '</option>';
                    } else {
                        html += '<option value="' + it.data[m]['value'] + '" name="' + it.data[m]['name'] + '">' + it.data[m]['name'] + '</option>';
                    }
                }
            }
        } else if (it.url) {
            $.ajax({
                url: it.url,
                type: "post",
                dataType: "json",
                async: it.async,
                success: function (result) {
                    if (result.error == 1) {
                        var record = result["rows"];
                        for (var n = 0; n < record.length; n++) {
                            if (it.displayField && it.valueField) {
                                if (it.defaultValue == record[n][it.valueField]) {
                                    html += '<option value="' + record[n][it.valueField] + '" selected = "selected" >' + record[n][it.displayField] + '</option>';
                                } else {
                                    html += '<option value="' + record[n][it.valueField] + '" >' + record[n][it.displayField] + '</option>';
                                }
                            } else {
                                if (it.defaultValue == record[n]['value']) {
                                    html += '<option value="' + record[n]['value'] + '" selected = "selected">' + record[n]['name'] + '</option>';
                                } else {
                                    html += '<option value="' + record[n]['value'] + '" >' + record[n]['name'] + '</option>';
                                }
                            }
                        }
                    }
                }
            });
        }
        if (it.checked) {
            html += '</select></div>';
        } else {
            html += '</select>';
        }
        html += '</div>';
        return html;
    }

    function prepareCheckBox(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        //text
        html += '<div class="checkbox">';
        html += '<input type="checkbox" ' + (it.disabled ? ' disabled="disabled"' : '') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        html += '</div>';
        return html;
    }

    function prepareRadio(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        html += '<input type="radio" ' + (it.disabled ? ' disabled="disabled"' : '') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        html += '</div>';
        return html;
    }

    function prepareButton(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' ></label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        html += '<button type="button" ' + (it.btnClass ? 'class="btn btn-w-m ' + it.btnClass + '"' : 'class="btn btn-w-m btn-default"') + '>' + it.title + '</button>';
        html += '</div>';
        return html;
    }

    function prepareButtons(it, lWidth, tWidth) {
        var html = "";
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        for (var i = 0; i < it["buttons"].length; i++) {
            var bt = it["buttons"][i];
            html += '<button type="button" ' + (bt.id ? 'id="' + bt.id + '"' : '') + (bt.btnClass ? 'class="btn btn-w-m ' + bt.btnClass + '"' : 'class="btn btn-w-m btn-default"') + '>'
                + bt.title + '</button>';
        }
        html += '</div>';
        return html;
    }

    function prepareTextarea(it, lWidth, tWidth) {
        var html = "";
        //label
        if (it.plain) {
            html += '<div  ' + (it.styleModel ? ' class="plain-block plain-textarea plain-block-' + it.styleModel + '" ' : 'class="plain-block plain-textarea"') + ' ><label class="control-label">';
        } else {
            html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
            if (it.required) {
                html += '<span class="red">*</span>';
            }
        }
        html += it.title + ':</label>';
        //text
        if (it.plain) {
            html += '<textarea class="form-control" ' + (it.id ? ' id="' + it.id + '"' : '') + (it.readonly ? ' readonly="' + it.readonly + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + '></textarea>';
        } else {
            html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
            if (it.checked) {
                html += '<textarea ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                    + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '')
                    + 'tip="' + it.tip + '"' + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.readonly ? ' readonly="' + it.readonly + '"' : '')
                    + 'class="form-control" ' + (it.cls ? "style=" + it.cls : "") + '></textarea>';
            } else {
                html += '<textarea ' + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '') + (it.id ? ' id="' + it.id + '"' : '') + (it.readonly ? ' readonly="' + it.readonly + '"' : '')
                    + (it.checkLen ? ' onkeyup="' + it.checkLen + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control" ' + (it.cls ? "style=" + it.cls : "") + '></textarea>';
            }
            if (it.fTip) {
                html += '<span class="textarea-tip" style="color: #999;font-size: 10px;"><i class="fa fa-info-circle" style="margin-right: 5px;"></i>' + it.fTip + '</span>';
            }
        }
        html += '</div>';
        return html;
    }

    function prepareLabel(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>' +
            '<span  ' + (it.spanClass ? 'class="' + it.spanClass + ' form-text "' : 'class="form-text"') + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + '>' + it.defaultValue + '</span></div>';
        return html;
    }

    function prepareDate(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<input ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + ' tip="' + it.tip + '" ' + (it.readonly ? ' readonly="readonly"' : '')
                + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + (it.dateName ? ' dateName="' + it.dateName + '"' : '') + 'class="form-control">';
        } else {
            html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
                + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.dateName ? ' dateName="' + it.dateName + '"' : '') + ' class="form-control">';
        }
        html += '</div>';
        return html;
    }

    function prepareArea(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<input ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + 'tip="' + it.tip + '" ' + (it.readonly ? ' readonly="readonly"' : '')
                + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '')
                + (it.iClass ? ' class="' + it.iClass + '"' : 'class="form-control"') + (it.cls ? "style=" + it.cls : "") + ' type="text">';
        } else {
            html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + (it.iClass ? ' class="' + it.iClass + '"' : 'class="form-control"') + (it.cls ? "style=" + it.cls : "") + '>';
        }
        if (it.showDetail) {
            html += '<input placeholder="地址详情"' + ((it.dCheckUrl || it.dCheckReg || it.dCheckObj) ? '' : 'check="validForm(this)"') + (it.dCheckUrl ? 'url="' + it.dCheckUrl + '"' : '')
                + (it.dCheckObj ? 'obj="' + it.dCheckObj + '"' : '') + (it.dCheckReg ? 'reg="' + it.dCheckReg + '"' : '') + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '')
                + ' tip="' + it.dTip + '" ' + (it.dReadonly ? ' readonly="readonly"' : '') + (it.dDefaultValue ? ' value="' + it.dDefaultValue + '"' : 'value=""')
                + (it.dId ? ' id="' + it.dId + '"' : '') + (it.dName ? ' name="' + it.dName + '"' : '') + (it.dClass ? ' class="' + it.dClass + '"' : 'class="form-control"')
                + (it.dCls ? "style=" + it.dCls : "style=" + it.cls) + '>';
        }
        html += '</div>';
        return html;
    }

    function prepareCheckInput(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':<input type="checkbox" value=""></label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<input ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '')
                + 'tip="' + it.tip + '" ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
                + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        } else {
            html += '<input ' + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '') + (it.readonly ? ' readonly="readonly"' : '')
                + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        }
        ;
        html += '</div>';
        return html;
    }

    function prepareCheckSelect(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':<input type="checkbox" value=""></label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<select ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + ' tip="' + it.tip + '"'
                + 'data-placeholder="选择..." class="chosen-select form-control"  ' + (it.width ? ' style="width:' + it.width + 'px;"' : ' style="width:100%;"')
                + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.disabled ? ' disabled="' + it.disabled + '"' : '') + ' >';
        } else {
            html += '<select data-placeholder="选择..." class="chosen-select"  ' + (it.width ? ' style="width:' + it.width + 'px;"' : ' style="width:100%;"')
                + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.disabled ? ' disabled="' + it.disabled + '"' : '') + ' >'
        }

        //设置“请选择”下拉值
        html += '<option value="" >请选择</option>';

        if (it.data) {
            for (var m = 0; m < it.data.length; m++) {
                if (it.displayField && it.valueField) {
                    if (it.defaultValue == it.data[m][it.valueField]) {
                        html += '<option value="' + it.data[m][it.valueField] + '" selected = "selected" >' + it.data[m][it.displayField] + '</option>';
                    } else {
                        html += '<option value="' + it.data[m][it.valueField] + '" >' + it.data[m][it.displayField] + '</option>';
                    }
                } else {
                    if (it.defaultValue == it.data[m]['value']) {
                        html += '<option value="' + it.data[m]['value'] + '" selected = "selected">' + it.data[m]['name'] + '</option>';
                    } else {
                        html += '<option value="' + it.data[m]['value'] + '" >' + it.data[m]['name'] + '</option>';
                    }
                }
            }
        } else if (it.url) {
            $.ajax({
                url: it.url,
                type: "post",
                dataType: "json",
                async: it.async,
                success: function (result) {
                    if (result.error == 1) {
                        var record = result["rows"];
                        for (var n = 0; n < record.length; n++) {
                            if (it.displayField && it.valueField) {
                                if (it.defaultValue == record[n][it.valueField]) {
                                    html += '<option value="' + record[n][it.valueField] + '" selected = "selected" >' + record[n][it.displayField] + '</option>';
                                } else {
                                    html += '<option value="' + record[n][it.valueField] + '" >' + record[n][it.displayField] + '</option>';
                                }
                            } else {
                                if (it.defaultValue == record[n]['value']) {
                                    html += '<option value="' + record[n]['value'] + '" selected = "selected">' + record[n]['name'] + '</option>';
                                } else {
                                    html += '<option value="' + record[n]['value'] + '" >' + record[n]['name'] + '</option>';
                                }
                            }
                        }
                    }
                }
            });
        }
        html += '</select>';
        html += '</div>';
        return html;
    }

    function prepareCheckDate(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span style="color:red">*</span>';
        }
        html += it.title + ':<input type="checkbox" value=""></label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<input ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + ' tip="' + it.tip + '" '
                + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        } else {
            html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
                + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        }
        ;
        html += '</div>';
        return html;
    }

    function prepareCheckArea(it, lWidth, tWidth) {
        var html = "";
        //label
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span style="color:red">*</span>';
        }
        html += it.title + ':<input type="checkbox" value=""></label>';
        //text
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<input ' + ((it.checkUrl || it.checkReg || it.checkObj) ? '' : 'check="validForm(this)"') + (it.checkUrl ? 'url="' + it.checkUrl + '"' : '')
                + (it.checkObj ? 'obj="' + it.checkObj + '"' : '') + (it.checkReg ? 'reg="' + it.checkReg + '"' : '') + ' tip="' + it.tip + '" ' + (it.readonly ? ' readonly="readonly"' : '')
                + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '')
                + (it.iClass ? ' class="' + it.iClass + '"' : 'class="form-control"') + (it.cls ? "style=" + it.cls : "") + ' type="text">';
        } else {
            html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + (it.iClass ? ' class="' + it.iClass + '"' : 'class="form-control"') + (it.cls ? "style=" + it.cls : "") + '>';
        }
        ;
        if (it.showDetail) {
            html += '<input placeholder="地址详情"' + ((it.dCheckUrl || it.dCheckReg || it.dCheckObj) ? '' : 'check="validForm(this)"') + (it.dCheckObj ? 'obj="' + it.dCheckObj + '"' : '')
                + (it.dCheckReg ? 'reg="' + it.dCheckReg + '"' : '') + (it.maxlength ? ' maxlength="' + it.maxlength + '"' : '') + ' tip="' + it.dTip + '" '
                + (it.dReadonly ? ' readonly="readonly"' : '') + (it.dDefaultValue ? ' value="' + it.dDefaultValue + '"' : 'value=""') + (it.dId ? ' id="' + it.dId + '"' : '')
                + (it.dName ? ' name="' + it.dName + '"' : '') + (it.dClass ? ' class="' + it.dClass + '"' : 'class="form-control"')
                + (it.dCls ? "style=" + it.dCls : "style=" + it.cls) + '>';
        }
        html += '</div>';
        return html;
    }

    function prepareConnection(it, lWidth, tWidth) {
        var html = "";
        html += '<label for="' + it.id + '" ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-md-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-md-' + tWidth + '"') + '>';
        if (it.checked) {
            html += '<input readonly="readonly"  class="form-control car" id="' + it.id + '"  name="' + it.name + '" obj="not_null"  type="text">';
        } else {
            html += '<div class="form-control car" id="' + it.id + '" name="' + it.name + '"></div>';
        }
        if (it.name == 'carBrandId') {
            html += '<div class="car-box"><div class="item item-type"><h4>请选择品牌</h4><div class="type">';
        } else {
            html += '<div class="city-box"><div class="item item-type"><h4>--省份</h4>';
        }

        $.ajax({
            url: it.url,
            type: "post",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.error == 1) {
                    if (it.name == 'carBrandId') {
                        var letter, list, obj;
                        var objArr = [];
                        html += '<div class="type-left"><ul class="">';
                        for (var i = 0; i < result.rows.length; i++) {
                            letter = result.rows[i].letter;
                            if (letter && letter.length == 1) {
                                obj = result.rows[i];
                                objArr.push(obj);
                            }
                        }
                        objArr.sort(compare);
                        for (var i = 0; i < objArr.length; i++) {
                            html += '<li><a href="#' + objArr[i].letter + '">' + objArr[i].letter + '</a></li>';
                        }
                        html += '</ul></div><div class="type-right">';
                        for (var j = 0; j < objArr.length; j++) {
                            list = objArr[j].list;
                            html += '<h5 id="' + objArr[j].letter + '">' + objArr[j].letter + '</h5>';
                            for (var i = 0; i < list.length; i++) {
                                html += '<p data-type="' + list[i].brandNameMainType + '">' + list[i].brandNameMain + '</p>';
                            }
                        }
                        html += '</div></div>';
                    } else {
                        for (var i = 0; i < result.rows.length; i++) {
                            html += '<p data-type="' + result.rows[i].id + '">' + result.rows[i].name + '</p>';
                        }
                    }
                }
            }
        });
        html += '</div><div class="item item-series">';
        if (it.name == 'carBrandId') {
            html += '<h4>请选择车系</h4>';
        } else {
            html += '<h4>--城市</h4>';
        }

        html += '<div class="series"></div></div>';
        if (it.name == 'carBrandId') {
            html += '<div class="item item-no"><h4>请选择车型</h4><div class="no"></div></div>';
        }
        html += '</div></div>';

        return html;
    }

    function compare(obj1, obj2) {
        var letter1 = obj1.letter;
        var letter2 = obj2.letter;
        if (letter1 < letter2) {
            return -1;
        } else {
            return 1;
        }
    }

    HYCarFinance.form = carForm;
})($);