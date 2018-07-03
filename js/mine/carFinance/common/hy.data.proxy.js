/**
 * @description    浩宇汽车金融业务方法封装
 * @author        陈泳志
 * @date        2017-08-16
 * @message        修改此对象方法时注意更新备注信息
 * @method：
 *        1、auditOrder            业务受理单编号
 *        2、changeAuditUser        订单换审核
 *        3、getCarInfo            根据订单号获取车辆信息
 *        4、getRateByCarInfo        计算分期费率
 *        5、getTelAddress            查询手机号码所属区域
 *        6、getAuditHistoryByAcceptId        根据订单号获取审核历史信息
 *        7、getCreditInfoByAcceptId        根据订单号查询征信信息
 *        8、getBuyerInfoByAcceptId        根据业务受理编号和用户类型查询购车人基本信息
 *        9、getAuditSuggestionByAcceptId    根据订单编号查询审核建议
 *        10、getApplyPayByAcceptId        垫款审核
 *        11、updateGpsSetup                更新车辆gps安装信息
 *        12、supplyCarInfo                车辆信息补录
 *        13、updateConfig                    更新配置对象指定属性值（递归处理buyerTag对象等处理公共方法）
 *        14、getHistoryOrderInfo            根据业务受理单编号查询对应购车人相关的历史订单信息
 *        15、updateCarInfoByAcceptId        通过业务订单号更新车辆信息
 *        16、getAuditDetailById            通过ID查询审核明细
 *        17、deleteOrderFileByAcceptId    根据业务受理单编号山对应的附件
 *        18、loadOrderFileByPage            根据业务编号分页查询订单附件
 *        19、downLoadOrderFile            根据业务受理单编号下载订单附件
 *        20、getFinancialContributionByAcceptId        根据业务受理单编号获取费用打款信息
 *        21、getCarBrandType                根据车辆类型获取车辆品牌信息
 *        22、getFinancialPayInfo          根据手里单号获取财务收支信息
 *        23、addFinancialIncome           增加财务打款信息
 *        24、addMortgageInfo              添加抵押信息
 *        25、updateLendingInfoById        添加修改放贷信息
 *        26、getOperationLogInfo          获取按钮操作日志信息
 *        27、getProcessDetail             获取订单流程详情
 *        28、insertRepaymentPlan          插入还款计划信息
 *        29、updateAdvancePayment         修改垫付申请费用信息
 *        30、getInsurcaceClaimInfo        出险情况
 *        31、getBigDataCreditByAcceptId   查询大数据征信
 *        32、updateCostBack               费用审核退回
 *        33、exportExcelFile              订单excel合同生成
 *        34、getOverdueDesc				  获取订单逾期概况
 *        35、getAutoAuditList			  获取自动化审批
 *        36、getVideoOrderInfo			  获取视频面签信息
 *        37、getOrderAdvancedIncome		  获取代偿信息
 *        38、getAuditFee				  获取审核费用明细
 */
(function ($) {
    //汽车金融业务代理对象
    var carProxy = function () {

    }
    carProxy.fn = carProxy.prototype;

    /**
     * 订单审核
     * @param id        业务受理单编号
     * @param status    审核状态
     * @param pType        审核类型
     * @param desc        审核备注
     * @param isWait    是否资料候补
     * @param callback    回调
     */
    carProxy.fn.auditOrder = function (param, callback) {
        loadingShow();
        $.ajax({
            url: ctx + "/audit/deal.action",
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     *    订单换审核
     *    @param id        业务受理单编号
     *  @param params   格式(多个之间,分割)：params = {
	 *							idArr : id
	 *						}
     *  @param callback    回调
     *
     */
    carProxy.fn.changeAuditUser = function (params, callback) {
        $.ajax({
            url: ctx + "/audit/change.action",
            type: "post",
            data: params,
            dataType: "json",
            success: function (data) {
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     *    根据订单号获取车辆信息
     *  @param id        业务受理单编号
     *  @param isAsync    是否同步
     *  @param isSupply	  是否展示申请记录	1:是，0：否
     *  @param callback    回调
     *
     */
    carProxy.fn.getCarInfo = function (id, isAsync, isSupply, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/carInfo/getCarInfo.action?acceptId=' + id + '&isSupply=' + isSupply,
            type: "post",
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 根据贷款银行id，产品类型id，获取贷款年限
     * @param bankId
     * @param productId
     * @param isAsync
     * @param callback
     */
    carProxy.fn.getCarProductInfo = function (bankId, productId, isAsync, callback) {
        $.ajax({
            url: ctx + "/bankRate/listByProduct.action",
            type: "get",
            data: {bankId: bankId, productId: productId},
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 计算分期费率
     * @param carDealerId
     * @param bankId
     * @param province
     * @param auditCarPrice
     * @param actualLoadMoney
     * @param customerRate
     * @param newOrOld  新车还是二手车
     * @param cfProductId
     * @param loanPeriodMonthCode
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getRateByCarInfo = function (carDealerId, bankId, province, auditCarPrice, actualLoadMoney, customerRate, newOrOld, cfProductId, loanPeriodMonthCode, isAsync, callback) {
        var param = {};
        param.carDealerId = carDealerId;
        param.bankId = bankId;
        param.carLicenseProvince = province;
        param.auditCarPrice = auditCarPrice;
        param.actualLoadMoney = actualLoadMoney;
        param.customerRate = customerRate;
        param.newOrOld = newOrOld;
        param.cfProductId = cfProductId;
        param.loanPeriodMonthCode = loanPeriodMonthCode;
        $.ajax({
            url: ctx + '/carInfo/getRateByCarInfo.action',
            type: "post",
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (data.rows.lowPrice != null && data.rows.lowPrice >= 80) {
                        confirmDialog("请选择低首付产品。", false, function () {
                            //回调
                            if (typeof(callback) === 'function') {
                                callback(data['rows']);
                            }
                        });
                    } else {
                        //回调
                        if (typeof(callback) === 'function') {
                            callback(data['rows']);
                        }
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 查询手机号码所属区域
     */
    carProxy.fn.getTelAddress = function (tel, isAsync, callback) {
        $.ajax({
            url: ctx + '/cfBusinessOrderAccept/getTelAddress.action',
            type: "post",
            data: {tel: tel},
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });

    }

    /**
     *    根据订单号获取审核历史信息
     *    @param acceptId    业务受理单编号
     *  @param isAsync    是否同步
     *  @param containerid 选择组件id 如：#id
     *  @param callback    回调
     *
     */
    carProxy.fn.getAuditHistoryByAcceptId = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/audit/getHistory.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    carProxy.fn.getMortgageLogInfoByAcceptId = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfMortgageRegist/mortgageLog.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }


    /**
     * 根据订单号查询征信信息
     * @param acceptId    业务订单号
     * @param userType    用户类型（担保或配偶等，为空则查询所有）
     * @param isAsync    是否为异步请求
     * @param containerId 是将返回数据append指定元素内
     * @param callback    回调方法
     *
     * 备注（涉及功能点）：订单审核页面
     *
     */
    carProxy.fn.getCreditInfoByAcceptId = function (acceptId, userType, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfBuyerInfo/getBuyerDetail.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId,
                userType: userType,
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 根据业务受理编号和用户类型查询购车人基本信息
     * @param acceptId
     * @param isAsync
     * @param userType
     * @param containerId
     * @param callback
     */
    carProxy.fn.getBuyerInfoByAcceptId = function (acceptId, isAsync, userType, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfBuyerInfo/getBuyer.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId,
                userType: userType,
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }


    /**
     * 根据订单编号查询审核建议
     * @param acceptId    业务订单号
     * @param isAsync    是否为异步请求
     * @param containerId 是将返回数据append指定元素内
     * @param callback    回调方法
     *
     * 备注（涉及功能点）：订单审核页面
     *
     */
    carProxy.fn.getAuditSuggestionByAcceptId = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/audit/getSuggestion.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     *
     * 垫款审核
     * @param acceptId    业务订单号
     * @param isAsync    是否为异步请求
     * @param containerId 是将返回数据append指定元素内
     * @param callback    回调方法
     *
     * 备注（涉及功能点）：订单审核页面
     */
    carProxy.fn.getApplyPayByAcceptId = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/advancePayment/getAdvancePayment.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     *
     * 更新车辆gps安装信息
     * @param id        业务订单号
     * @param setupDate    安装日期
     * @param number    安装序号
     * @param description    备注
     * @param callback    回调方法
     *
     * 备注（涉及功能点）：订单审核页面
     */
    carProxy.fn.updateGpsSetup = function (id, setupDate, number, descriptoin, callback) {
        loadingShow();
        $.ajax({
            url: ctx + "/carInfo/saveGpsSetup.action",
            type: "post",
            data: {
                acceptId: id,
                setupDate: setupDate,
                number: number,
                descriptoin: descriptoin
            },
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    /**
     * 更新卡单信息
     */
    carProxy.fn.saveCardInfo = function (acceptId, preCardSendToBankDate, creditCardApplyNo, insuranceNo,insuranceCompanyCheckNo, cardBak, callback) {
        loadingShow();
        $.ajax({
            url: ctx + "/cfBusinessOrderAccept/saveCardInfo.action",
            type: "post",
            data: {
                "acceptId"					: acceptId,
                "preCardSendToBankDate"		: preCardSendToBankDate,
                "creditCardApplyNo"			: creditCardApplyNo,
                "insuranceNo"				: insuranceNo,
                "insuranceCompanyCheckNo"	: insuranceCompanyCheckNo,
                "cardBak"					: cardBak
            },
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 车辆信息补录
     * @param    id        业务受理单编号
     * @param    param    补录信息参数对象
     * @param    callback    回调
     */
    carProxy.fn.supplyCarInfo = function (id, param, callback) {
        loadingShow();
        param.businessOrderAcceptId = id;
        $.ajax({
            url: ctx + "/carInfo/supplyCarInfo.action",
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 通过业务受理单号更新车辆信息
     * @param    id        业务受理单编号
     * @param    param    补录信息参数对象
     * @param    callback    回调
     */
    carProxy.fn.updateCarInfoByAcceptId = function (acceptId, param, callback) {
        loadingShow();
        param.businessOrderAcceptId = acceptId;
        $.ajax({
            url: ctx + "/carInfo/updateCarInfoByAcceptId.action",
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 更新配置对象指定属性值
     * @param config        配置对象
     * @param callback        回调function
     */
    carProxy.fn.updateConfig = function (config, callback) {
        for (var i = 0; i < config.length; i++) {
            if (typeof(config[i]["items"]) != "undefined" && config[i]["items"].length > 0) {
                carProxy.fn.updateConfig(config[i]["items"], callback);
            } else {
                callback(config[i]);
            }
        }
    }

    /**
     * 根据业务受理单编号查询对应购车人相关的历史订单信息
     * @param    id            业务受理单编号
     * @param    isAsync        是否异步
     * @param    containerId    loading展示dom的id
     * @param    callback    回调方法
     */
    carProxy.fn.getHistoryOrderInfo = function (id, isAsync, containerId, callback) {
        //删除存在
        hideLoading(containerId);
        //展示loading
        showLoading(containerId);
        $.ajax({
            url: ctx + "/cfBuyerInfo/getHistoryOrder.action",
            type: "post",
            data: {
                acceptId: id
            },
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                hideLoading(containerId);
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data['rows']);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 根据id编号查询审核明细
     * @param    id            业务受理单编号
     * @param    isAsync        是否异步
     * @param    callback    回调方法
     */
    carProxy.fn.getAuditDetailById = function (id, isAsync, callback) {
        $.ajax({
            url: ctx + "/audit/getAuditDetailById.action",
            type: "post",
            data: {
                id: id
            },
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data['rows']);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 根据业务受理单编号删除对应附件
     * @param    acceptId            业务受理单编号
     * @param    idArr                附件编号（格式：数组）
     * @param    isAsync        是否异步
     * @param    callback    回调方法
     */
    carProxy.fn.deleteOrderFileByAcceptId = function (acceptId, idArr, isAsync, callback) {
        $.ajax({
            url: ctx + "/cfFileCenter/delete.action",
            type: "post",
            data: {
                idArr: idArr.toString(),
                id: acceptId
            },
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data['rows']);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 分页获取订单附件
     * @param    containerId            展示loading的容器id
     * @param    businessOrderAcceptId            业务受理单编号
     * @param    type                            附件类型（格式：数组）
     * @param    currPage                        当前页
     * @param    pageId                            分页控件Id
     * @param    callback    回调方法
     */
    carProxy.fn.loadOrderFileByPage = function (containerId, businessOrderAcceptId, type, currPage, pageId, callback) {
        this.pageSize = 12;		//每页显示条数初始化，修改显示条数，修改这里即可
        this.initFlag = true;
        getOrderFile(this, containerId, businessOrderAcceptId, type, currPage, pageId, callback);
        return this;
    }

    //分页获取订单附件
    function getOrderFile(_this, containerId, businessOrderAcceptId, type, currPage, pageId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + "/cfFileCenter/query.action",
            type: "get",
            dataType: 'json',
            data: {
                'pageNum': currPage,
                'numPerPage': _this.pageSize,
                'businessOrderAcceptId': businessOrderAcceptId,
                'type': type
            },
            success: function (data) {
                //关闭loading提示
                hideLoading(containerId);
                if (data.error == 1) {
                    if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
                        if (_this.initFlag) {
                            $(pageId).pagination(data["rows"]["totalCount"], {
                                items_per_page: _this.pageSize,
                                num_edge_entries: 1,
                                num_display_entries: 8,
                                callback: function (currPage, jg) {
                                    getOrderFile(_this, containerId, businessOrderAcceptId, type, currPage, pageId, callback);
                                }//回调函数
                            });
                            _this.initFlag = false;
                        }
                        if (typeof(callback) === "function") {
                            callback(data["rows"]);
                        }
                    } else {
                        $(containerId).html('<div class="ibox-content b-n" style="border: 1px solid #eee; border-radius: 5px; height: 100%;line-height: 320px;"><p class="text-center tip-message" style="font-size:14px;">暂无数据</p></div>');
                        $(pageId).html("");
                    }
                } else {
                    $(containerId).html('<div class="ibox-content b-n" style="border: 1px solid #eee; border-radius: 5px; height: 100%;line-height: 320px;"><p class="text-center tip-message" style="font-size:14px;">暂无数据</p></div>');
                    $(pageId).html("");
                }
            },
            error: function () {

            }
        });
    }

    /**
     * 下载订单附件
     * @param url  下载路径
     * @param acceptId    业务受理单编号
     * @param fileType    附件类型
     */
    carProxy.fn.downLoadOrderFile = function (url, acceptId, fileType) {
        $('<form action="' + url + '" method="POST">' +  // action请求路径及推送方法
            '<input type="text" name="aId" value="' + acceptId + '"/>' + // 文件路径
            '<input type="text" name="fileType" value="' + fileType + '"/>' + // 文件名称
            '</form>').appendTo('body').submit().remove();
    };

    /**
     * 订单excel合同生成
     * @param acceptId    订单编号
     * @param bankId    银行编号
     * @param url        提交url
     */
    carProxy.fn.exportExcelFile = function (acceptId, bankId, url) {
        $('<form action="' + url + '" method="POST">' +			// action请求路径及推送方法
            '<input type="text" name="id" value="' + acceptId + '"/>' + // 文件路径
            '<input type="text" name="bankId" value="' + bankId + '"/>' + // 文件名称
            '</form>').appendTo('body').submit().remove();
    };

    /**
     * 根据车辆类型获取车辆品牌类型
     */
    carProxy.fn.getCarBrandType = function (category, forbidden, callback) {
        $.ajax({
            url: ctx + "/cfCarBrand/getList.action",
            type: "get",
            data: {brandType: category, forbidden: forbidden},
            dataType: "json",
            success: function (result) {
                if (result.error == 1) {
                    var data = result.rows;
                    if (typeof(callback) === "function") {
                        callback(data);
                    }
                }
            }
        });
    }

    /**
     * 根据业务受理编号获取费用打款信息
     * @param acceptId
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getFinancialContributionByAcceptId = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/financial/query.action?acceptId=' + acceptId,
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId,
            },
            async: isAsync || false,

            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data)
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 根据业务受理编号获取财务打款信息
     * @param acceptId
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getFinancialPayInfo = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/financial/findFinancialIncome.action?acceptId=' + acceptId,
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId,
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data)
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 获取按钮日志信息
     * @param acceptId
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getOperationLogInfo = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/lendingInfo/lendingLog.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    carProxy.fn.getFinaceOperationLogInfo = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/financial/financeLog.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 新增费用明细支出信息
     * @param acceptId
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.addFinancialIncome = function (acceptId, json, callback) {
        loadingShow();
        $.ajax({
            url: ctx + "/financial/addFinancialIncome.action",
            type: "post",
            data: json,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 费用审核
     * @param acceptId
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.updateAdvancePayment = function (acceptId, json, callback) {
        loadingShow();
        $.ajax({
            url: ctx + "/financial/updateAdvancePayment.action",
            type: "post",
            data: json,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 费用审核退回
     * @param acceptId
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.updateCostBack = function (acceptId, json, callback) {
        loadingShow();
        $.ajax({
            url: ctx + "/financial/updateCostBack.action",
            type: "post",
            data: json,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 新增或修改放贷信息
     * @param id
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.updateLendingInfoById = function (acceptId, lendingState, param, callback) {
        loadingShow();
        param.businessOrderAcceptId = acceptId;
        //卡片信息保存
        if (lendingState == 2) {
            var url = ctx + "/lendingInfo/confirmPlayMoney.action";
        } else if (lendingState == 3) {
            var url = ctx + "/lendingInfo/savePlayMoney.action";
        } else if (lendingState == 4) {
            var url = ctx + "/lendingInfo/dealPlayMoney.action";
        } else if (lendingState == 5) {
            var url = ctx + "/lendingInfo/cardInfoSave.action";
        } else if (lendingState == 6) {
            var url = ctx + "/lendingInfo/saveBillQuitFile.action";
        } else if (lendingState == 7) {
            var url = ctx + "/lendingInfo/saveToDate.action";
        } else if (lendingState == 8) {
            var url = ctx + "/lendingInfo/saveArchivesInfo.action";
        } else if (lendingState == 9) {
            var url = ctx + "/lendingInfo/savePlayOtherInfo.action";
        } else if (lendingState == 10) {
            var url = ctx + "/lendingInfo/saveBankQuitFile.action";
        } else if (lendingState == 11) {
            var url = ctx + "/lendingInfo/saveSettleLoan.action";
        } else if (lendingState == 12) {
            var url = ctx + "/lendingInfo/returnPlayMoney.action";
        } else if (lendingState == 13) {
            var url = ctx + "/lendingInfo/cancelPlayMoney.action";
        } else if (lendingState == 14) {
            var url = ctx + "/lendingInfo/cancelPlayDealing.action";
        } else if (lendingState == 15) {
            var url = ctx + "/lendingInfo/saveArchivesCompleteDate.action";
        } else if (lendingState == 16) {
            var url = ctx + "/lendingInfo/saveArchivesAlternateDate.action";
        } else if (lendingState == 17) {
            var url = ctx + "/lendingInfo/saveScanningDate.action";
        } else if (lendingState == 18) {
            var url = ctx + "/lendingInfo/saveArchivesGetDate.action";
        }else if (lendingState == 19) {
            var url = ctx + "/lendingInfo/saveTeamToDate.action";
        }else if (lendingState == 20) {
            var url = ctx + "/lendingInfo/saveBankToDate.action";
        } else if (lendingState == 33) {
            var url = ctx + "/lendingInfo/confirmPlayPrincipalMoney.action";
        } else {
            url = ctx + "/lendingInfo/updateLendingInfo.action";
        }
        $.ajax({
            url: url,
            type: "post",
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 新增还款计划
     * @param id
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.insertRepaymentPlan = function (acceptId, param, callback) {
        loadingShow();
        param.businessOrderAcceptId = acceptId;
        $.ajax({
            url: ctx + "/repaymentPlan/insertRepaymentPlan.action",
            type: "post",
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 抵押信息
     * @param id
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getMortgageInfo = function (id, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfMortgageRegist/getMortgageInfo.action?acceptId=' + id,
            type: "post",
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                hideLoading(containerId);
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data['rows']);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 放贷信息
     * @param id
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getLoanInfo = function (id, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/lendingInfo/getLendingInfo.action?acceptId=' + id,
            type: "post",
            dataType: "json",
            data: {
                acceptId: id,
            },
            async: isAsync || false,
            success: function (data) {
                hideLoading(containerId);
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data['rows']);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /**
     * 获取资金包
     * @param id
     * @param isAsync
     * @param containerId
     * @param callback
     */
    carProxy.fn.getMoneyPackpageInfo = function (orderStatus, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        if(orderStatus==19){
    	  $.ajax({
              url: ctx + '/moneyUnit/getMoneyPackage.action',
              type: "post",
              dataType: "json",
              async: isAsync || false,
              success: function (data) {
                  hideLoading(containerId);
                  if (data.error == 1 && typeof(callback) === 'function') {
                      callback(data['rows']);
                  } else if (data.error == -100) {
                      faildMsg("会话超时，请重新登陆！");
                  } else {
                      faildMsg(data.message);
                  }
              }
          });
        }else{
        	 $.ajax({
                url: ctx + '/moneyUnit/getAllMoneyPackage.action',
                type: "post",
                dataType: "json",
                async: isAsync || false,
                success: function (data) {
                    hideLoading(containerId);
                    if (data.error == 1 && typeof(callback) === 'function') {
                        callback(data['rows']);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        	
        }
      
    }
    

    /**
     * 保存抵押信息
     * @param acceptId
     * @param param
     * @param callback
     */
    carProxy.fn.addMortgageInfo = function (acceptId, param, callback) {
        loadingShow();
        param.businessOrderAcceptId = acceptId;
        $.ajax({
            url: ctx + "/cfMortgageRegist/save.action",
            type: "post",
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                loadingHide();
                if (data.error == 1 && typeof(callback) === 'function') {
                    callback(data);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 获取订单流程及业务状态详情
     * @param acceptId
     * @param param
     * @param callback
     */
    carProxy.fn.getProcessDetail = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfBusinessOrderAccept/getProcessDetail.action?id=' + acceptId,
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId,
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data)
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 获取订单获取出险情况
     * @param acceptId
     * @param param
     * @param callback
     */
    carProxy.fn.getInsurcaceClaimInfo = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/claim/getCliamInfo.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /**
     * 根据订单编号查询大数据征信
     * @param id 业务受理单编号
     * @param isAsync 是否同步/异步请求
     * @param 元素div
     * @param callback  回调
     *
     */
    carProxy.fn.getBigDataCreditByAcceptId = function (id, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/risk/getBigDataCredit.action?acceptId=' + id,
            type: "post",
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    //获取逾期概况
    carProxy.fn.getOverdueDesc = function (id, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/overdue/getDesc.action?orderId=' + id,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    
    //获取逾期详情列表
    carProxy.fn.listOverdueByOrderId = function (id, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/overdue/listByOrderId.action?orderId=' + id,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    //获取催缴明细
    carProxy.fn.listUrgeDetailByOrderId = function (id, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/urgeWork/listByOrderId.action?orderId=' + id,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    //获取拖车单
    carProxy.fn.listTrailCarExecuteByOrderId = function (id, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfTrail/queryTrailCarListByOrder.action?orderId=' + id,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }


    //获取保全列表
    carProxy.fn.listTrailCarByOrderId = function (id, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfTrail/queryByOrderId.action?orderId=' + id,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    
    
    //获取诉讼列表
    carProxy.fn.listLawDetailByOrderId = function (id, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/cfLaw/listByOrderId.action?orderId=' + id,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    //添加逾期记录
    carProxy.fn.addOverdue = function (param, callback) {
        $.ajax({
            url: ctx + '/overdue/add.action',
            type: "post",
            dataType: "json",
            data	: param,
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    //更新逾期记录
    carProxy.fn.addOverdue = function (param, callback) {
        $.ajax({
            url: ctx + '/overdue/update.action',
            type: "post",
            dataType: "json",
            data	: param,
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    //删除逾期记录
    carProxy.fn.deleteOverdue = function (idArr, callback) {
        $.ajax({
            url: ctx + '/overdue/delete.action',
            type: "post",
            dataType: "json",
            data	: {
            	"idArr" : idArr
            },
            success: function (data) {
                if (data.error == 1) {
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    carProxy.fn.getAutoAuditList = function (id, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/risk/getAutoAuditList.action?acceptId=' + id,
            type: "post",
            dataType: "json",
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows']);
                    }
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }

    /* 根据订单号查询视频面签信息
    * @param acceptId    业务订单号
    * @param isAsync    是否为异步请求
    * @param containerId 是将返回数据append指定元素内
    * @param callback    回调方法
    *
    * 备注（涉及功能点）：订单审核页面
    *
    */
    carProxy.fn.getVideoOrderInfo = function (acceptId, isAsync, containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/interview/getOrderVideoInfo.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId

            },
            async: isAsync || false,
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    /** 根据订单号查询代偿
     * @param acceptId    业务订单号
     * @param isAsync    是否为异步请求
     * @param containerId 是将返回数据append指定元素内
     * @param callback    回调方法
     *
     * 备注（涉及功能点）：订单审核页面
     *
     */
    carProxy.fn.getOrderAdvancedIncome = function (acceptId,containerId, callback) {
        if (null != containerId) {
            //删除存在
            hideLoading(containerId);
            //展示loading
            showLoading(containerId);
        }
        $.ajax({
            url: ctx + '/urgeWork/getOrderAdvancedIncome.action',
            type: "post",
            dataType: "json",
            data: {
                acceptId: acceptId
            },
            success: function (data) {
                if (data.error == 1) {
                    if (null != containerId) {
                        hideLoading(containerId);
                    }
                    //回调
                    if (typeof(callback) === 'function') {
                        callback(data['rows'])
                    }
                    ;
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
    }
    
    
    /**
     * 获取审核费用明细
     * @param acceptId 订单编号
     * @param callback
     */
    carProxy.fn.getAuditFee = function (acceptId, callback) {
		$.ajax({
			url: ctx + "/applyPay/getAuditFee.action",
			type: "post",
			data: {
				acceptId		: $("#acceptId").val()
			},
			dataType: 'json',
			success: function (data) {
				if (data.error == 1) {
					//回调
					if (typeof(callback) === 'function') {
						callback(data['rows'])
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
    
    /**
     * 获取当前用户部门信息
     * @param callback 回调
     */
    carProxy.fn.getCurrentDepartInfo = function(salerId, callback){
    	$.ajax({
			url: ctx + "/department/getCurrentDepartment.action",
			type: "post",
			dataType: 'json',
			data: {
				userId		: salerId
			},
			success: function (data) {
				if (data.error == 1) {
					if (typeof(callback) === 'function') {
						callback(data['rows'])
					}
				} else if (data.error == -100) {
					faildMsg("会话超时，请重新登陆！");
				} else {
					faildMsg(data.message);
				}
			}
		});
	}
	HYCarFinance.carProxy = carProxy;
})($);