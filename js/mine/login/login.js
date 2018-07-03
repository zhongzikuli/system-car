$(function () {
    var ua = navigator.userAgent.toLocaleLowerCase();
    var browserType = null;
    if (ua.match(/chrome/) != null) {
        var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");

        if (is360) {
            browserType = '360';
        } else {
            browserType = "chrome";
        }
    }
    if (browserType != "chrome") {
        $(".sys_alert").show();
    }
    $(".go_btn").on("click", function () {
        try {
            var elemIF = document.createElement("iframe");
            elemIF.src = " http://116.62.235.182:8888/group1/M00/00/02/rBAhJVnoXSeANgwmAsUGaEkU18Y871.exe";
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        } catch (e) {

        }
    });
    $(".close_btn").on("click", function () {
        $(".sys_alert").hide();
    });

    if ($.cookie("save-btn") == "true") {
        $("#usercode").val($.cookie("usercode"));
        $("#pwd").val($.cookie("pwd"));

        $("#save-btn").attr('checked', 'true');
    }
    particles();
    if (window.top !== window.self) {
        window.top.location = window.location
    }

});

function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes;
    for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
            return true;
        }
    }
    return false;
}
//保存用户信息   
function saveInfo() {
    var count = 0;
    count = count + 1;
    if (count % 2 == 1) {
        $.cookie("save-btn", "false", {expires: -1});
        $.cookie("usercode", '', {expires: -1});
        $.cookie("pwd", '', {expires: -1});
    } else {
        var usercode = $("#usercode").val();
        var pwd = $("#pwd").val();
        $.cookie("save-btn", "true", {expires: 7}); // 存储一个带7天期限的 cookie   
        $.cookie("usercode", usercode, {expires: 7}); // 存储一个带7天期限的 cookie   
        $.cookie("pwd", pwd, {expires: 7}); // 存储一个带7天期限的 cookie             
    }
}

function checkForm() {
    var flag = true;
    var _tips = $("#tips");
    var _error = _tips.find(".error");
    var message = $("#hiddenMessage").val();
    if (message != "null" && message != "") {
        _error.text(message);
        $("#tips").show();
        flag = false;
    }
    return flag;
}

function randomcode_refresh() {
    var $img = $('#randomcode_img');
    var _src = $img.attr('src').split('?')[0];
    var dateString = new Date().getTime();
    var new_src = _src + '?c=' + dateString;
    $img.attr('src', new_src);
}

function userLogin() {
	var _tips = $("#tips");
    var _error = _tips.find(".error");
    var username = $("#usercode").val();
    var password = $("#pwd").val();
    var randomcode = $("#randomcode").val();
    if (!username) {
        _error.text("账号不能为空");
        $("#tips").show();
        return false;
    }
    if (!password) {
        _error.text("密码不能为空");
        $("#tips").show();
        return false;
    }
    if (!randomcode) {
        _error.text("验证码不能为空");
        $("#tips").show();
        return false;
    }
    return true;
}

function randomcode_refresh() {
    var $img = $('#randomcode_img');
    var _src = $img.attr('src').split('?')[0];
    var dateString = new Date().getTime();
    var new_src = _src + '?c=' + dateString;
    $img.attr('src', new_src);
}


function particles() {
    function a() {
        var a = window.particlesJS;
        a && ((0, window.$)("\x3cdiv\x3e", {
            id: "particles"
        }).appendTo("body"), a("particles", c))
    }

    var b = !!window.HTMLCanvasElement,
        c = {
            particles: {
                number: {
                    value: 20,
                    density: {
                        enable: !0,
                        value_area: 1E3
                    }
                },
                color: {
                    value: "#e1e1e1"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: "img/github.svg",
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: .5,
                    random: !1,
                    anim: {
                        enable: !1,
                        speed: 1,
                        opacity_min: .1,
                        sync: !1
                    }
                },
                size: {
                    value: 15,
                    random: !0,
                    anim: {
                        enable: !1,
                        speed: 180,
                        size_min: .1,
                        sync: !1
                    }
                },
                line_linked: {
                    enable: !0,
                    distance: 650,
                    color: "#cfcfcf",
                    opacity: .26,
                    width: 1
                },
                move: {
                    enable: !0,
                    speed: 2,
                    direction: "none",
                    random: !0,
                    straight: !1,
                    out_mode: "out",
                    bounce: !1,
                    attract: {
                        enable: !1,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: !1,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: !1,
                        mode: "push"
                    },
                    resize: !0
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: .4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: !0
        };
    (0, window.$)(function () {
        b && window.$.ajax({
            url: ctx + "/js/third/particles/particles.min.js",
            dataType: "script",
            cache: !0
        }).then(a)
    })
};
