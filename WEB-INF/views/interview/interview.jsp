<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<body onbeforeunload="return closeEvent(event)">
<div class="ibox interview-wrap item mr-none">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>视频区</h5>
    </div>
</div>
<div class="panel-body item mr-none">
    <div class="form-content">
        <div class="col-sm-8">
            <div class="ibox-content form-horizontal">
                <div style="padding:12px 4px;height: 570px;">
                    <div class="col-sm-12 video">
                        <div class="netcall-box hide" id="netcallBox">
                            <div class="netcall-mask hide">
                                <div class="netcallTip"></div>
                            </div>
                            
                            <div class="toolbar netcall-calling-box hide">
                                <img alt="用户头像" class="avatar" src="${ctx}/styles/images/icon_default.png">
                                <div class="nick"></div>
                                <div class="tip">等待对方接听...</div>
                                <div class="op">
                                    <button id="callingHangupButton" class="endCallBtn netcall-button red">挂断</button>
                                </div>
                            </div>
                            
                            <div class="netcall-show-video hide">
                                <div class="netcall-video-left">
                                    <div id="media-container" class="clear netcall-video-remote bigView"></div>
                                </div>
                                <div class="netcall-video-right">
                                    <div id="agora_local" class="netcall-video-local smallView" style="width:200px; height: 200px;">
                                    
                                    </div>
                                    <div class="toolbar operation">
                                        <div class="control">
                                            <div class="microphone control-item">
                                                <span class="muteBtn icon-micro"></span>
                                            </div>
                                            <div class="volume control-item">
                                                <span class="voiceBtn icon-volume"></span>
                                            </div>
                                            <div class="camera control-item">
                                                <span class="cameraBtn icon-camera"></span>
                                            </div>
                                        </div>
                                        <div class="op">
                                            <button class="endCallBtn netcall-button red">挂断</button>
                                        </div>
                                        <div class="tip">00 : 00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="ibox-content" style="border: 1px solid #f2f2f2;">
                        <div class="row mr-none">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label class="pull-left">审核说明:</label>
                                       <c:if test="${status == 1}">
                                           <textarea id="description" readonly="readonly" name="description"
                                                     class="form-control pull-left" style="font-family: initial; height: 70px; width: 79%;"
                                                     aria-required="true">${remark}</textarea>
                                       </c:if>
                                       <c:if test="${status == 2}">
                                           <textarea id="description" name="description" class="form-control pull-left"
                                                     style="font-family: initial; height: 70px; width: 79%;"
                                                     aria-required="true">${remark}</textarea>
                                       </c:if>
                                       <c:if test="${status == 3}">
                                           <textarea id="description" readonly="readonly" name="description"
                                                     class="form-control pull-left" style="font-family: initial; height: 70px; width: 79%;"
                                                     aria-required="true">${remark}</textarea>
                                       </c:if>
                                </div>
                            </div>

                            <div class="col-md-7" style="padding: 24px 0px 20px 0px;">
                                 <c:if test="${status == 1}">
                                     <button class="btn btn-success disabled" id="successNetcallVideoLink" data-id="${id}">面签完成 </button>
                                     <button class="btn btn-danger disabled" id="cancelNetcallVideoLink" data-id="${id}">客户作废</button>
                                     <button class="btn btn-info" id="viewInterviewQuestion" data-id="${id}">查看问题</button>
                                     <button class="btn btn-primary right callBtn disabled" style="margin:0px 10px;"><i class="fa fa-video-camera"></i>&nbsp;呼叫</button>
                                 </c:if>
                                 <c:if test="${status == 2}">
                                     <button class="btn btn-success" id="successNetcallVideoLink" data-id="${id}">面签完成 </button>
                                     <button class="btn btn-danger" id="cancelNetcallVideoLink" data-id="${id}">客户作废</button>
                                     <button class="btn btn-info" id="viewInterviewQuestion" data-id="${id}">查看问题</button>
                                     <button class="btn btn-primary callBtn right" style="margin:0px 10px;"><i class="fa fa-video-camera"></i>&nbsp;呼叫</button>
                                 </c:if>
                                 <c:if test="${status == 3}">
                                     <button class="btn btn-success disabled" id="successNetcallVideoLink" data-id="${id}">面签完成</button>
                                     <button class="btn btn-danger disabled" id="cancelNetcallVideoLink" data-id="${id}">客户作废</button>
                                     <button class="btn btn-info" id="viewInterviewQuestion" data-id="${id}">查看问题</button>
                                     <button class="btn btn-primary callBtn right disabled" style="margin:0px 10px;"><i class="fa fa-video-camera"></i>&nbsp;呼叫</button>
                                 </c:if>
                            </div>
                        </div>
                    </div>
                </div>
                <%-- end content --%>
            </div>
        </div>
        <%-- end col 8 --%>

        <div class="col-sm-4 notice-wrap">
        	 <div class="ibox-content form-horizontal padding-15">
               <div class="row mr-none">
	               	<div class="forum-title">
	                    <h3><code class="alert-info">客户信息确认</code></h3>
	                </div>
               </div>
               <div class="row mr-none">
	               <div class="col-sm-5 text-center">
	               		<c:if test="${not empty cardFrontPic}">
		               		<img class="photo" src="data:image/png;base64,${cardFrontPic}"/>
	               		</c:if>
	               		<c:if test="${empty cardFrontPic}">
	               			<img class="photo" src="${ctx}/styles/images/photo_default_1.png">
	               		</c:if>
	               		
	               </div>
	               <div class="col-sm-2 text-center compare-wrap">
	               		<font <c:if test="${compareScore lt 80}"> class="red" </c:if> <c:if test="${empty compareScore}"> class="data" </c:if> <c:if test="${compareScore ge 80}"> class="green" </c:if> >
	               			<c:if test="${not empty compareScore}">
		               			相似度<code>${compareScore}%</code>
		               		</c:if>
		               		<c:if test="${empty compareScore}">
		               			<code class="alert-warning">相似度(暂无)</code>
		               		</c:if>
	               			
	               		</font>
               			<img src="${ctx}/styles/images/icon_comp.png" />
	               </div>
	               <div class="col-sm-5 text-center">
	               		<c:if test="${not empty takePicPath}">
	               			<img class="photo" src="${takePicPath}">
	               		</c:if>
	               		<c:if test="${empty takePicPath}">
	               			<img class="photo" src="${ctx}/styles/images/photo_default_2.png">
	               		</c:if>
	               </div>
               </div>
                <div class="row mr-none">
	               <div class="col-sm-5 text-center">
	               		公安网纹照片
	               </div>
	               <div class="col-sm-2">
	               		
	               </div>
	               <div class="col-sm-5 text-center">
	               		人物照片
	               </div>
               </div>
            </div>
        
            <div class="ibox-content form-horizontal m-t-xs padding-15">
                <div class="forum-title">
                    <h3><code>注意事项</code></h3>
                </div>
                <div class="forum-sub-title">1、视频面签针对浏览器兼容到 IE8以上版本，推荐使用chrome</div>
                <div class="forum-sub-title">2、面签完成操作前需要回答面签问题，否则无法提交</div>
                <div class="forum-sub-title">3、面签“呼叫”接通后系统开始录制视频</div>
                <div class="forum-sub-title">4、浏览器意外中断(或关闭)则不能录制视频</div>
            </div>
        </div>
        <%-- end col 4 --%>
    </div>
    <%-- end form content --%>
</div>
</body>
</html>
