(function ($) {
    var isInit = false;
    var acceptId = null;
    var isOver = false;
    var afterShowFunction = null;

    function VideoAnswer(btnId, bizId, afterShow) {
        acceptId = bizId;
        afterShowFunction = afterShow;
        this.initView(btnId);
        return this;
    }

    //组件初始化
    VideoAnswer.prototype.initBeside = function (callback) {
        var tips = '<div id="beside-query-box" class="interview-question beside-query-box expand animated">' +
            '<div class="heading"><i class="fa fa-question-circle"></i>&nbsp;面签问题列表</div>' +
            '<div class="content questions"><div class="text-center tip-message">暂无数据</div></div>' +
            '</div>';
        $("body").append(tips);
        //收缩按钮
        $(".open-beside-query").click(function (e) {
            if ($(".beside-query-box").hasClass("active")) {
                hideBesideBox();
            } else {
                showBesideBox();
            }
            e.stopPropagation();
        });
        isInit = true;
        if (typeof(callback) == "function") {
            callback();
        }
    }

    VideoAnswer.prototype.isOver = function () {
        return isOver;
    }

    function hideBesideBox() {
        $(".beside-query-box").removeClass("slideInRight");
        $(".beside-query-box").addClass("slideOutRight");
        setTimeout(function () {
            $(".beside-query-box").removeClass("active");
        }, 1000);

        $(parent.document.body).add($(".mod_basic, .mod_header")).unbind("click");
    }

    function showBesideBox() {
        $(".beside-query-box").removeClass("slideOutRight");
        $(".beside-query-box").addClass("slideInRight");
        $(".beside-query-box").addClass("active");
        //隐藏事件
        $(parent.document.body).add($(".mod_basic, .mod_header")).on("click", function (e) {
            if (e.target.id == "viewInterviewQuestion" || e.target.className == "fa fa-search-plus") {
                return;
            }
            if ($(".beside-query-box").hasClass("active")) {
                hideBesideBox();
            }
            e.stopPropagation();
        });

        if (null != afterShowFunction) {
            afterShowFunction();
        }
    }

    //初始化事件
    VideoAnswer.prototype.initView = function (btnId) {
        var _this = this;
        $(btnId).on("click", function (e) {
            if (!isInit) {
                _this.query();
            } else {
                showBesideBox();
            }
        });
    }
    //（问题列表查询）
    VideoAnswer.prototype.query = function () {
        var _this = this;
        if ("" != acceptId) {
            $.ajax({
                url: ctx + "/ask/listByOrder.action",
                type: "post",
                dataType: "json",
                data: {
                    "acceptId": acceptId
                },
                success: function (data) {
                    if (data.error == 1) {
                        var rows = data["rows"];
                        if (!isInit) {
                            _this.initBeside(afterShowFunction);
                        }
                        //创建查询类目
                        _this.createQuestionList(rows);
                    } else if (data.error == -100) {
                        faildMsg("会话超时，请重新登陆！");
                    } else {
                        faildMsg(data.message);
                    }
                }
            });
        } else {
            this.deleteItem(_type);
        }
    }

    //创建查询类目
    VideoAnswer.prototype.createQuestionList = function (rows) {
        var html = "";
        if (rows.length > 0) {
            var hasAnswer = false;	//是否已作答
            for (var i = 0; i < rows.length; i++) {
                if (!hasAnswer) {
                    hasAnswer = (rows[i]["answerResult"] == 0 || rows[i]["answerResult"] == 1) ? true : false;
                }
                html += "<div class='clear item' data-id='" + rows[i]["id"] + "' data-name='answer_" + (i + 1) + "'>";
                html += "<p><strong>" + (null != rows[i]['isRequired'] && rows[i]['isRequired'] == 1 ? "<span class='red'>*</span>" : "&nbsp;") + (i + 1) + '、' + rows[i]["content"] + "</strong></p>";
                html += '<p class="answer"><span class="pull-left">回答：</span>';
                html += '<span class="chosen-answer pull-left ' + (null != rows[i]["answerResult"] && rows[i]["answerResult"] == 1 ? "on" : "") + '"><input type="radio" ' + (null != rows[i]["answerResult"] && rows[i]["answerResult"] == 1 ? "checked='checked'" : "") + ( hasAnswer ? "disabled='disabled'" : "") + ' name="answer_' + (i + 1) + '" value="1" class="radioclass"></span><span class="pull-left">正确</span>';
                html += '<span class="chosen-answer pull-left last ' + (null != rows[i]["answerResult"] && rows[i]["answerResult"] == 0 ? "on" : "") + '"><input type="radio" ' + (null != rows[i]["answerResult"] && rows[i]["answerResult"] == 0 ? "checked='checked'" : "") + ( hasAnswer ? "disabled='disabled'" : "") + ' name="answer_' + (i + 1) + '" value="0" class="radioclass"></span><span class="pull-left">错误</span>'
                html += '</p>';
                html += "</div>";
            }
            /*if(!hasAnswer){
             html += "<div class='clear row m-none text-center'>";
             html += '<button type="button" class="m-rl-tb btn btn-w-m btn-primary ask-submit">提交</button>';
             html += "</div>";
             }*/
            isOver = hasAnswer;
        } else {
            html += "<p class='text-center'>暂无数据</p>";
        }
        $(".beside-query-box > .content").empty();
        $(".beside-query-box > .content").find(".tip-message").remove();
        $(".beside-query-box > .content").append(html);
        //展示命中项
        showBesideBox();
        //radio样式
        $(".chosen-answer").on("click", function () {
            $(this).addClass("on").siblings().removeClass("on");
            $(this).find("input[type='radio']").prop("checked", "checked");
        });
    }
    window.VideoAnswer = VideoAnswer;
})($);