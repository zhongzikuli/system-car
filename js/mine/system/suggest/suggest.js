   //处理
   function handle(id){
           var options = {
               width: 400,
               top: 200,
               height: 180,
               overlay: true,
               dispose: true,
               move: true,
               title: '处理',
               url: "",
               callback: function () {
                   var flag = false;
                   if ($("#handleForm").valid("handleForm")) {
                       loadingShow();
                       $.ajax({
                           url: ctx + "/suggest/handle.action",
                           type: "post",
                           data: {
                               id:id,
                               handleId:1,
                               handleResult:$("#handleResult").val()
                           },
                           dataType: "json",
                           success: function (data) {
                               loadingHide();
                               if (data.error == 1) {
                                   successMsg("操作成功！", 1000, function () {
                                       window.location.href = ctx + "/suggest/query.action";
                                   });
                               } else if (data.error == -100) {
                                   faildMsg("会话超时，请重新登陆！");
                               } else {
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
           }
           var detailDlg = new Dialog("#handle-dialog_set", options);
           detailDlg.show();
       }

   $(".table-daily").find("td").each(function(){
       $(this).hover(function (e) {
           var content =$(this).html();
           $(this).attr('title',content);
       })
   });

   //刷新按钮
   $(".refresh-btn").on("click", function(){
       window.location.reload();
   });

   //表单校验
   function handleResult(lableId){
       if (undefined != lableId && null != lableId && lableId != "") {
           if ($(lableId).val() == null || $(lableId).val() == "") {
               if ($(lableId).attr("id") == "handleResult" ) {
                   $(lableId).attr('tip', '处理结果不能为空。');
                   return "faild";
               }
               return "success";
           }
           return "success";
       }
   }

