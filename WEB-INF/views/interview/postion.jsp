<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body>
<div class="ibox interview-wrap item">
    <div class="ibox-title interview-title">
        <p class="split"></p>
        <h5>面签位置</h5>
    </div>
</div>
<div class="ibox">
    <div class="col-sm-9" style="padding:0px;" id="map">
        <div id="allmap"></div>
    </div>
    <div class="col-sm-3">
        <div class="ibox-content">
            <div class="form-group">
                <label class="control-label">定位时间:</label>
                <span><fmt:formatDate value="${readyTime}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
            </div>
            <div class="form-group">
                <label class="control-label">GPS信息:</label>
                <input type="hidden" id="lat" value="${lat}">
                <input type="hidden" id="lon" value="${lon}">
                <span class="form-control-static accept-localtion-gps" id="gps" style="padding-top: 0;"> ${gps} </span>

            </div>
            <div class="form-group">
                <label class="control-label">地址信息:</label>
                <span class="form-control-static  accept-localtion-address" style="padding:0px;"
                      id="address">${address}</span>
            </div>
        </div>
    </div>
</div>
</body>
</html>