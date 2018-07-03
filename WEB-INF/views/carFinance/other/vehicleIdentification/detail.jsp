<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>车辆历史报告</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="shortcut icon" href="<%=request.getContextPath() %>/styles/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/styles/mine/main.css">
</head>
<body>
<div id="repairLog" class="main bg_1">
    <div class="center">
        <h1 class="name">${summary.brand}-${summary.style} &nbsp;${summary.displacement}&nbsp;${summary.operateType}&nbsp;${summary.standard}</h1>
        <!--基本信息开始-->
        <div id="jbxx" class="title_red">
            <div class="tit"><em></em>车辆信息</div>
        </div>
        <ul class="jbxx">
            <li class="image">
                <img src="http://chejianding.com//images/brand/${summary.brandCode}.gif">
            </li>
            <li>
                <div class="tit">车辆识别码（VIN）</div>
                <div class="view">
                    <span><span>${summary.vin}</span></span>
                </div>
            </li>
            <li>
                <div class="tit">报告生成时间</div>
                <div class="view">
                    <span><span><fmt:formatDate value="${summary.reportCreateTime}"
                                                pattern="yyyy-MM-dd HH:mm:ss"/></span></span>
                </div>
            </li>
            <li>
                <div class="tit">生产厂商</div>
                <div class="view">
                    <span><span>${summary.manufacturer}</span></span>
                </div>
            </li>
            <li>
                <div class="tit">车型/车款</div>
                <div class="view">
                    <span><span>${summary.brand}-${summary.style}&nbsp;${summary.displacement}&nbsp;${summary.operateType}</span></span>
                </div>
            </li>
        </ul>
        <!--基本信息结束-->
        <div id="tab_nav_body" class="tab_bodys records">
            <div class="mass">此份报告是在
                <fmt:formatDate value="${summary.reportCreateTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                帮您查询到的车辆历史信息，可能存在相关未被记录的事故描述，作为您查询车辆历史记录的重要参考，可帮助您更好的了解车辆历史情况，具体车况请以现场实车为准。
            </div>
            <!--报告概要 开始-->
            <div id="bggy" class="title_red">
                <div class="tit"><em></em>报告概要</div>
                <div class="des">此概要不包含详细历史记录中未记载的信息，内容本身不代表实际车况。</div>
            </div>
            <div class="outPartDes">
                <div class="tit"><em></em>外观部件描述:</div>
                <div class="view">
                    <p></p>
                    <p>1、${summary.appearanceDescription}</p>
                    <!-- 
                    <p>2、前翼子板维修，喷漆</p>
                     -->
                    <p></p>
                </div>
            </div>
            <ul class="tableStyleOne">
                <!-- 重大事故记录 -->
                <li class="li9">
                    <div class="tit">重大事故记录</div>
                    <div class="view">
                        <!--异常的项目添加类名 abnormal-->
                        <c:if test="${summary.accidentHistoryRecord == null || summary.accidentHistoryRecord == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.accidentHistoryRecord != null && summary.accidentHistoryRecord != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.accidentHistoryRecord}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 火烧记录 -->
                <li class="li10">
                    <div class="tit">过火记录</div>
                    <div class="view">
                        <!--异常的项目添加类名 abnormal-->
                        <c:if test="${summary.fireHistoryRecord == null || summary.fireHistoryRecord == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.fireHistoryRecord != null && summary.fireHistoryRecord != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.fireHistoryRecord}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 泡水记录 -->
                <li class="li11">
                    <div class="tit">泡水记录</div>
                    <div class="view">
                        <c:if test="${summary.swampHistoryRecord == null || summary.swampHistoryRecord == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.swampHistoryRecord != null && summary.swampHistoryRecord != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.swampHistoryRecord}条)</div>
                        </c:if>
                        <div class="des">泡水记录是指第三方收集到的记录中包含有疑似相关文字记载，其中包含已知明确为此类现象的问题。请详细阅读下方详细记录，并咨询专业人士或查看车辆现况。</div>
                    </div>
                </li>
                <!-- 结构部件记录 -->
                <li class="li1">
                    <div class="tit">结构部件</div>
                    <div class="view">
                        <!--异常的项目添加类名 abnormal-->
                        <c:if test="${summary.structralUnit ==null || summary.structralUnit == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.structralUnit != null && summary.structralUnit != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.structralUnit}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 安全气囊记录 -->
                <li class="li2">
                    <div class="tit">安全气囊</div>
                    <div class="view">
                        <!--异常的项目添加类名 abnormal-->
                        <c:if test="${summary.airbag == null || summary.airbag == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.airbag != null && summary.airbag != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.airbag}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 发动机记录 -->
                <li class="li3">
                    <div class="tit">发动机</div>
                    <div class="view">
                        <c:if test="${summary.engine == null || summary.engine == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.engine != null && summary.engine != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.engine}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 变速箱记录 -->
                <li class="li4">
                    <div class="tit">变速箱</div>
                    <div class="view">
                        <c:if test="${summary.gearbox ==null || summary.gearbox == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.gearbox !=null && summary.gearbox != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.gearbox}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 里程表记录 -->
                <li class="li5">
                    <div class="tit">里程表</div>
                    <div class="view">
                        <!--无异常记录-->
                        <c:if test="${summary.mileClock == null || summary.mileClock == '0'}">
                            <div class="tit">无异常记录</div>
                        </c:if>
                        <c:if test="${summary.mileClock !=null  && summary.mileClock != '0'}">
                            <div class="tit abnormal">有异常记录(${summary.mileClock}条)</div>
                        </c:if>
                    </div>
                </li>
                <!-- 最大里程 -->
                <li class="li6">
                    <div class="tit">最大里程</div>
                    <div class="view">
                        <div class="tit">最大里程数${summary.maxMileNumber}公里</div>
                        <div class="des">车辆历史记录中所记载的最大里程数，最大公里数并不代表实际行驶里程。</div>
                    </div>
                </li>
                <!-- 记录条数 -->
                <li class="li7">
                    <div class="tit">记录条数</div>
                    <div class="view">
                        <div class="tit">共有${summary.historyRecordNumber}条记录</div>
                    </div>
                </li>
                <!-- 最后记录日期 -->
                <li class="li8">
                    <div class="tit">最后记录日期</div>
                    <div class="view">
                        <div class="tit">
                            ${summary.lastRecordDate}
                        </div>
                        <div class="des">车辆历史记录中所记载的最后一条记录日期。</div>
                    </div>
                </li>
            </ul>
            <!--报告概要 结束-->
            <!--详细报告 开始-->
            <div id="xxbg" class="title_red">
                <div class="tit"><em></em>详细记录</div>
            </div>
            <table class="table_2">
                <thead>
                <tr>
                    <th class="th_1">日期</th>
                    <th class="th_2">公里数(km)</th>
                    <th class="th_3">类型</th>
                    <th class="th_4">维修保养内容</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${summary.reports == null || summary.reports.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="4">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${summary.reports}" varStatus="st">

                    <c:if test="${item.dataFrom != null && item.dataFrom == '1'}">
                        <tr>
                            <td>${item.recordDate}&nbsp;</td>
                            <td>${item.kilometre}&nbsp;</td>
                            <td>${item.type}&nbsp;</td>
                            <td>
                                <p>
                                    项目:
                                    ${item.detail}
                                </p>
                                <p>
                                    材料:${item.material}
                                </p>
                            </td>
                        </tr>
                    </c:if>
                    <c:if test="${item.dataFrom != null && item.dataFrom == '2'}">
                        <tr class="red">
                            <td>${item.recordDate}&nbsp;</td>
                            <td>${item.kilometre}&nbsp;</td>
                            <td>${item.type}&nbsp;</td>
                            <td>
                                <p>
                                    项目:
                                    ${item.detail}
                                </p>
                                <p>
                                    材料:${item.material}
                                </p>
                                <p>
                                    （*此数据来自网络-无材料）
                                </p>
                            </td>
                        </tr>
                    </c:if>
                    <c:if test="${item.dataFrom != null && item.dataFrom == '3'}">
                        <tr class="red">
                            <td>${item.recordDate}&nbsp;</td>
                            <td>${item.kilometre}&nbsp;</td>
                            <td>${item.type}&nbsp;</td>
                            <td>
                                <p>
                                    项目:
                                    ${item.detail}
                                </p>
                                <p>
                                    材料:${item.material}
                                </p>
                                <p>
                                    （*此数据来自网络-有材料）
                                </p>
                            </td>
                        </tr>
                    </c:if>
                </c:forEach>
                </tbody>
            </table>
            <!--详细报告 结束-->
            <!--词汇解释 开始-->
            <div id="chjs" class="title_red">
                <div class="tit"><em></em>词汇解释</div>
            </div>
            <div class="text_js">
                <h5>外观部件异常</h5>
                <p>外观部件异常范围包括:车门、保险杠、翼子板、车顶、机盖和后备箱盖详细记录中出现了更换、钣金、喷漆、调整、修复等相关操作。报告概要会标注异常。建议仔细阅读详细记录或咨询专业人士。</p>
                <h5>重大事故记录</h5>
                <p>重大事故记录是指第三方收集到的记录中包含有疑似相关文字记载，其中包含已知明确为此类现象的问题。请详细阅读下方详细记录，并咨询专业人士或查看车辆现况。</p>
                <h5>过火记录</h5>
                <p>过火记录是指第三方收集到的记录中包含有疑似相关文字记载，其中包含已知明确为此类现象的问题。请详细阅读下方详细记录，并咨询专业人士或查看车辆现况。</p>
                <h5>泡水记录</h5>
                <p>泡水记录是指第三方收集到的记录中包含有疑似相关文字记载，其中包含已知明确为此类现象的问题。请详细阅读下方详细记录，并咨询专业人士或查看车辆现况。</p>
                <h5>结构部件异常</h5>
                <p>即车身结构异常。当车辆主结构或设计用于保障车辆结构完整性的部件受到损坏,被称为结构部件异常。异常的结构部件包括前后梁架和A、B、C柱的调校、
                    复位、拆卸、更换、矫正、焊接等，被称为结构部件异常。报告概要会标注异常。建议仔细阅读详细记录或咨询专业人士。</p>
                <h5>安全气囊异常</h5>
                <p>
                    车辆内部安全气囊在详细记录中出现更换和维修记录，其原因可能是受到外力导致被动触发激活、也可能是汽车召回或其它涉及维修需要拆装安全气囊的情况，报告概要会标注异常。建议仔细阅读详细记录或咨询专业人士。</p>
                <h5>发动机异常</h5>
                <p>详细记录中载明与发动机及相关组件有拆装或更换配件操作等相关内容，报告概要会标注异常。建议仔细阅读详细记录或咨询专业人士。</p>
                <h5>变速箱异常</h5>
                <p>详细记录中载明与变速箱及相关组件有拆装或更换配件操作等相关内容，报告概要会标注异常。建议仔细阅读详细记录或咨询专业人士。</p>
                <h5>里程表异常</h5>
                <p>
                    里程表记录是指车辆进厂时所记录的仪表盘里程表读数，如里程表数读数出现回滚（按照时间顺序，后值小于前值的或未按时间排序的），则里程表记录标记为“异常”，里程表记录出现异常并不一定代表里程表被人为调整，也有可能是记录错误或信息传输问题。在这种情况下，建议仔细阅读详细记录或咨询专业人士。</p>
                <h5>最大里程</h5>
                <p>车辆历史记录中所记载的最大里程数，最大公里数并不代表实际行驶里程。</p>
                <h5>最后记录日期</h5>
                <p>车辆历史记录中所记载的最后一条记录日期。</p>
            </div>
            <!--词汇解释 结束-->
            <!--右侧悬浮切换开始-->
            <div id="m_right_xf_1" class="m_right_xf">
                <a class="a_1"><em></em>基本信息</a>
                <a class="a_2"><em></em>报告概要</a>
                <a class="a_3"><em></em>详细记录</a>
                <a class="a_4 curr"><em></em>词汇解释 </a>
            </div>
            <!--右侧悬浮切换结束-->
        </div>
    </div>
</div>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/third/jquery/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/mine//vehicle/detail.js"></script>
</body>
</html>