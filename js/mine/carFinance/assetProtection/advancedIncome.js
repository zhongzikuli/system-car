jQuery(function ($) {
    var type =null
    //详情固定头部
    $(document).ready(function () {
        $('.mod_header').stickUp({
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
    //银行卡号
    var bankCardNo=$("#bankCardNo").val();
    //身份证号
    var cardNo=$("#cardNo").val();
    //银行id
    var bankId=$("#bankId").val();
    //姓名
    var name=$("#name").val();

    $(".deleteInfo").on("click",function(){
        deleteInfo();
    });

    $(".insertInfo").on("click",function(){
        insertInfo(name,cardNo,bankId);
    });

    $(".editInfo").on("click",function(){
        var id=$(this).attr("data-id");
        var orderId=$(this).attr("data-orderId");
        editInfo(name,id,cardNo,orderId);
    });
    
	function getEditData(id,config){
		$.ajax({
            url: ctx + "/urgeWork/toEdit.action",
            type: "post",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                if (data.error == 1) {
                    var advancedIncome = data.rows;
                    $("#inOrOut_edit").val(advancedIncome.inOrOut).trigger('chosen:updated');
                    if(advancedIncome.inOrOut == "1"){
                        showRource(config,"#source1",['渠道','客户','公司']);
                    }else {
                        showRource(config,"#source1",['一般账户','保证金账户']);
                    }
                    $("#sourceSelect").val(advancedIncome.source).trigger('chosen:updated');
                    $("#accountType_edit").val(advancedIncome.accountType).trigger('chosen:updated');
                    $("#money_edit").val(advancedIncome.money);
                    $("#advancedDate_edit").val(advancedIncome.advancedDate);
                    $("#remark_edit").val(advancedIncome.advancedBak);
                    $("#bondMoney_edit").val(advancedIncome.bondMoney);
                } else if (data.error == -100) {
                    faildMsg("会话超时，请重新登陆！");
                } else {
                    faildMsg(data.message);
                }
            }
        });
	}
	
    function editInfo(name,id,cardNo,orderId){
        var config = {
            disable_search_threshold:10,
            no_results_text: '无数据',
            width:"100%"
        };
        var options = {
            width: 650,
            top: 200,
            height: 400,
            overlay: true,
            dispose: true,
            move: true,
            title: '编辑',
            url: "",
            onBeforeShow: function () {
                setType('#initCarInfo_edit', orderId);
                getEditData(id,config);
            },
            onAfterShow: function () {
            	var type = $(".detail").attr("data-type");
                if(type==2){
                    $("#duty_editInfo").hide();
                    $(".dialog-container").height(350);
                }else{
                	 $(".dialog-container").height(420);
                	 $(".calculate_edit").on("click",function(){
                         var money=$("#money_edit").val();
                         var duty=$("#duty_edit").val();
                         if(null==money || null==duty ||undefined==money || undefined==duty || ''==money || ''==duty){
                             faildMsg("责任比例为空，无法计算");
                             return false;
                         }
                         var bondMoney=money*duty/100;
                         $("#bondMoney_edit").val(bondMoney);
                     });
                }
                
                laydate( {
                    elem: '#advancedDate_edit',
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    max:laydate.now(),
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if  (datas =='') {
                            change_error_style($("#advancedDate"), "add");
                        } else {
                            change_error_style($("#advancedDate"), "remove");
                        }
                    }
                });

                var self= this;
                changeOrder(self, "#newOld_edit", "#plateNumber_edit","#duty_editInfo");
                
                //部门状态是否隐藏
                $(".detail").on("click",function(){
                    var id=$('#orderId_edit').val();
                    self.hide(true)
                    detailInfo(id,name);
                });
               
                $("#sourceSelect").chosen(config).on('change', function(e, selected) {
                    if("" != selected){
                        change_error_style($("#sourceSelect").parent(),"remove");
                    }else{
                    	change_error_style($("#sourceSelect").parent(),"add");
                    }
                });
                
                $("#inOrOut_edit").chosen(config).on("change",function(e, param){
                    if("" != param.selected){
                        change_error_style($("#inOrOut_edit").parent(),"remove");
                        if(param.selected == "1"){
                            showRource(config,"#source1",['渠道','客户','公司']);
                        }else {
                            showRource(config,"#source1",['一般账户','保证金账户']);
                        }
                    }else{
                        $("#source1").empty().removeAttr("obj").append("<input type='text' obj='' class='form-control' name='source-1' readonly id='source-1'/>")
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#advancedIncomeEditForm").valid("advancedIncomeEditForm")) {
                    if(!$("#bondMoney").val() && type==1){
                        faildMsg("代偿保证金不允许为空");
                        return false;
                    }
                    $.ajax({
                        url: ctx + "/urgeWork/update.action",
                        type: "post",
                        data: {
                            id: id,
                            inOrOut:$("#inOrOut_edit").val(),
                            source:$("#sourceSelect").val(),
                            accountType:$("#accountType_edit").val(),
                            money:$("#money_edit").val(),
                            advancedDate:$("#advancedDate_edit").val(),
                            advancedBak:$("#remark_edit").val(),
                            bondMoney:$("#bondMoney_edit").val(),
                            businessOrderAcceptId:$("#orderId").attr("orderId")
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href=ctx+"/urgeWork/toAdvancedIncome.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId+"&customerName="+name;
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        editDlg = new Dialog("#advancedIncomeEdit-dialog", options);

        $("#accountType_edit").chosen(config).on('change', function(e, param) {
            if("" != param.selected){
                change_error_style($("#accountType_edit").parent(),"remove");
            }else{
                change_error_style($("#accountType_edit").parent(),"add");
            }
        });

        editDlg.show();
    }

    function deleteInfo(){
        var ck = $("input[name='advanced_input']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要删除的记录。");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户，不允许删除");
                return false;
            }
            confirmDialog("确认删除选中的垫付收支记录吗？", function () {
                var params = {}
                params.idArr = idArr.toString();
                loadingShow();
                $.ajax({
                    url: ctx + "/urgeWork/delete.action",
                    type: "post",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        loadingHide();
                        if (data.error == 1) {
                            successMsg("操作成功！", 1000, function () {
                                window.location.href=ctx+"/urgeWork/toAdvancedIncome.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId+"&customerName="+name;
                            });
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            })
        }
    }

    function setType(dom, orderIdInfo){
        $.ajax({
            url: ctx + "/urgeWork/getInitInfo.action",
            type: "post",
            data: {cardNo:cardNo},
            dataType: "json",
            async:false,
            success: function (data) {
                if (data.error == 1) {
                    var list = data.rows;
                    if(list.length==1){
                        $(dom).hide();
                    }else {
                    	 var initHtml='';
                    	 initHtml +="<div class='col-xs-12 text-left' style='margin-bottom: 10px;'>";
                    	 for(var i=0;i<list.length;i++){
 	                       var newOrOld=list[i].newOrOld;
 	                       if(list[i].id==orderIdInfo){
	                            $("#plateNumber_edit").val(list[i].plateNumber);
	                            $("#newOld_edit").val(newOrOldStr(newOrOld));
	                        }
 	                      initHtml+='<a data-toggle="modal" class="btn btn-default btn-sm detail-btn m-r-xs" '+(list[i].plateNumber ? 'plateNumber="'+list[i].plateNumber+'"':'')
 	                      				+' newOld='+newOrOld+' newOrOldStr='+newOrOldStr(newOrOld)+' data-id='+list[i].id+' dep-type='+list[i].departmentType+'>'+list[i].orderNo+'</a>';
                    	 }
                    	 initHtml +="</div>";
                    	 $(dom).append(initHtml);
                    }
                    $(".detail").attr({
                    	"data-id":list[list.length-1].id,
                    	"data-type":list[list.length-1].departmentType
                    });
               	 	$("#orderId, #orderId_edit").val(list[list.length-1].id);
               	 	$("#newOld,#newOld_edit").val(newOrOldStr(list[list.length-1].newOrOld));
               	 	$("#plateNumber,#plateNumber_edit").val(list[list.length-1].plateNumber);
               	 	$('.detail-btn:last').removeClass('btn-default').addClass("btn-primary");
                }
            }
        });
    }
    
    function newOrOldStr(str){
    	 if(str==1){
              return '新车'
          }else{
        	  return '二手车'
          }
    }
    
    function detailInfo(id,name){
        var url = ctx + "/cfBusinessOrderAccept/detail.action?id=" + id;
        openTabForParent(url, "-order-detail-" + id,"订单详情-" + name);
    }

    function insertInfo(name,cardNo,bankId){
        var config = {
            disable_search_threshold:10,
            no_results_text: '无数据',
            width:"100%"
        };
        var options = {
            width: 650,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '新增',
            onBeforeShow: function(){
               setType('#initCarInfo');
            },
            onAfterShow: function () {
            	var type = $(".detail").attr("data-type");
            	if(type==2){
                    $("#dutyInfo").hide();
                    $(".dialog-container").height(350);
                }else{
                	 $(".dialog-container").height(420);
                	 $(".calculate").on("click",function(){
                         var money=$("#money").val();
                         var duty=$("#duty").val();
                         if(null==money || null==duty ||undefined==money || undefined==duty || ''==money || ''==duty){
                             faildMsg("责任比例为空，无法计算");
                             return false;
                         }
                         var bondMoney=money*duty/100;
                         $("#bondMoney").val(bondMoney);
                     });
                }
                laydate( {
                    elem: '#advancedDate',
                    format: 'YYYY-MM-DD', //日期格式
                    istime: false, //是否开启时间选择
                    max:laydate.now(),
                    isclear: true, //是否显示清空
                    istoday: false, //是否显示今天
                    issure: false, //是否显示确认
                    choose: function (datas) {
                        if  (datas =='') {
                            change_error_style($("#advancedDate"), "add");
                        } else {
                            change_error_style($("#advancedDate"), "remove");
                        }
                    }
                });

                //部门状态是否隐藏
                var self= this;
                changeOrder(self, "#newOld", "#plateNumber","#dutyInfo");
                
                $(".detail").on("click",function(){
                    var id=$("#orderId").val();
                    self.hide(true)
                    detailInfo(id,name);
                });
                
                $("#inOrOut").chosen(config).on("change",function(e, param){
                    if("" != param.selected){
                        change_error_style($("#inOrOut").parent(),"remove");
                        if(param.selected == "1"){
                            showRource(config,"#source",['渠道','客户','公司']);
                        }else {
                            showRource(config,"#source",['一般账户','保证金账户']);
                        }
                    }else{
                        $("#source").empty().removeAttr("obj").append("<input type='text' obj='' class='form-control' name='source-0' readonly id='source-0'/>")
                    }
                });
                $(".accountType").chosen(config).on('change', function(e, param) {
                	 if("" != param.selected){
                        change_error_style($(".accountType").parent(),"remove");
                    }else{
                    	change_error_style($(".accountType").parent(),"add");
                    }
                });
                $("#sourceSelect").chosen(config).on('change', function(e, param) {
                	 if("" != param.selected){
                        change_error_style($("#sourceSelect").parent(),"remove");
                    }else{
                    	change_error_style($("#sourceSelect").parent(),"add");
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#advancedIncomeForm").valid("advancedIncomeForm")) {
                    if(!$("#bondMoney").val() && type==1){
                        faildMsg("代偿保证金不允许为空");
                        return false;
                    }
                    $.ajax({
                        url: ctx + "/urgeWork/insert.action",
                        type: "post",
                        data: {
                            bankCardNo:bankCardNo,
                            cardNo:cardNo,
                            bankId:bankId,
                            inOrOut:$("#inOrOut").val(),
                            source:$("#sourceSelect").val(),
                            accountType:$("#accountType").val(),
                            money:$("#money").val(),
                            advancedDate:$("#advancedDate").val(),
                            advancedBak:$("#advancedBak").val(),
                            bondMoney:$("#bondMoney").val(),
                            businessOrderAcceptId:$("#orderId").val(),
                            customerName:name
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href=ctx+"/urgeWork/toAdvancedIncome.action?bankCardNo="+bankCardNo+"&cardNo="+cardNo+"&bankId="+bankId+"&customerName="+name;
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#advancedIncome-dialog", options);
        creatDlg.show();
    }
    
    function changeOrder(self,dom1, dom2, dom3){
    	$(".detail-btn").on("click",function(){
            $(this).removeClass('btn-default').addClass("btn-primary");
            $(this).siblings().removeClass('btn-primary').addClass('btn-default');
            var type=$(this).attr("dep-type");
            var orderId=$(this).attr("data-id");
            $("#orderId").val(orderId);
            var newOrOldStr=$(this).attr("newOrOldStr");
            var plateNumber=$(this).attr("plateNumber");
            if(null==plateNumber || ''==plateNumber || plateNumber==undefined){
                plateNumber='';
            }
            if(null==newOrOldStr || ''==newOrOldStr || newOrOldStr==undefined){
                newOrOldStr='';
            }
            $(dom1).val(newOrOldStr);
            $(dom2).val(plateNumber);
            if(type==2){
            	$(dom3).hide();
                self.options.height= 420;
            }else if(type==1){
            	$(dom3).show();
                self.options.height= 470;
            }
        });
    }
    
    function showRource(config,dom,valArr) {
        var html = "";
        html +="<select check='advancedIncomeForm(this)' class='form-control' id='sourceSelect'>"+
                    "<option value=''>请选择</option>";
        if(valArr.length ==3){
            for(var i=0;i<valArr.length;i++){
                html +="<option value='"+(i+1)+"'>"+valArr[i]+"</option>";
            }
        }else{
            for(var i=0;i<valArr.length;i++){
                html +="<option value='"+(i+4)+"'>"+valArr[i]+"</option>";
            }
        }
        html += "</select>";
        $(dom).empty().append(html).find("#sourceSelect").chosen(config);
    }
});


function advancedIncomeForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "advancedBak" ||
                $(lableId).attr("id") == "remark_edit") {
                $(lableId).attr('tip', '备注为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "inOrOut" ||
                $(lableId).attr("id") == "inOrOut_edit") {
                $(lableId).parent().attr('tip', '收支不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("id") == "sourceSelect" ||
                $(lableId).attr("id") == "source_edit") {
                $(lableId).parent().attr('tip', '来源不能为空，请重新选择。').addClass("input_validation-failed");
                return "faild";
            }
            else if ($(lableId).attr("id") == "accountType" ||
                $(lableId).attr("id") == "accountType_edit") {
                $(lableId).parent().attr('tip', '账户类型不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }else if ($(lableId).attr("id") == "money" ||
                $(lableId).attr("id") == "money_edit") {
                $(lableId).attr('tip', '钱不能为空。');
                return "faild";
            } else if ($(lableId).attr("id") == "advancedDate" ||
                $(lableId).attr("id") == "advancedDate_edit") {
                $(lableId).attr('tip', '交易日期不能为空。');
                return "faild";
            }
            else if ($(lableId).attr("id") == "money" ||
                $(lableId).attr("id") == "advancedDate_edit") {
                $(lableId).attr('tip', '金额不能为空。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}

