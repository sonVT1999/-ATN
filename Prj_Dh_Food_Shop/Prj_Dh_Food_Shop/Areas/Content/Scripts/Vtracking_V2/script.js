$(document).ready(function () {
    $(".header__menu__btn").click(function () {
        $(this).toggleClass("active");
        $(".header__menu").toggleClass("active");
        $(".header-bottom").toggleClass("active");
        $("html, body").toggleClass("fix-scroll")
    });
    function e() {
        var e = $(".header-site").innerHeight();
        $(".main-site").css("padding-top", e)
    }
    e();
    $(".main-menu li a").click(function () {
        $("html, body").removeClass("fix-scroll");
        var e = $(".header-site").innerHeight();
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - e
        }, 300);
        return false
    });
    $(window).resize(function () {
        e()
    });
    var i = 992;
    $(".main-menu li a").click(function () {
        $(".header__menu__btn").removeClass("active");
        $(".header__menu").removeClass("active");
        $(".header-bottom").removeClass("active");
        $("html, body").removeClass("active")
    });
    function n() {
        $("header__menu__btn").removeClass("active");
        $(".header__menu").removeClass("active");
        $(".header-bottom").removeClass("active");
        $("html, body").removeClass("active")
    }
    function t() {
        var e = window
          , n = "inner";
        if (!("innerWidth" in window)) {
            n = "client";
            e = document.documentElement || document.body
        }
        if (e[n + "Width"] >= i) {
            return true
        } else {
            return false
        }
    }
    function o() {
        var e = t();
        if (e) {
            n()
        }
    }
    var a, s = $("#myNavbar"), l = 115, r = s.find("a"), d = r.map(function () {
        var e = $($(this).attr("href"));
        if (e.length) {
            return e
        }
    });
    $(window).scroll(function () {
        var e = $(window).scrollTop();
        if (e > 300) {
            $(".cd-top").addClass("cd-top--fade-out");
            //$(".scroll-register").addClass("cd-top--fade-out")
        } else {
            $(".cd-top").removeClass("cd-top--fade-out");
            //$(".scroll-register").removeClass("cd-top--fade-out")
        }
        var i = $(this).scrollTop() + l;
        var n = d.map(function () {
            if ($(this).offset().top < i)
                return this
        });
        n = n[n.length - 1];
        var t = n && n.length ? n[0].id : "";
        if (a !== t) {
            a = t;
            r.parent().removeClass("active-menu").end().filter("[href='#" + t + "']").parent().addClass("active-menu")
        } else if (a == "doi_tuong") {
            $(".counter").each(function () {
                $(this).innerHTML = "0";
                var e = $(this)
                  , i = e.attr("data-count");
                $({
                    countNum: e.text()
                }).animate({
                    countNum: i
                }, {
                    duration: 1500,
                    easing: "linear",
                    step: function () {
                        e.text(Math.floor(this.countNum))
                    },
                    complete: function () {
                        e.text(this.countNum)
                    }
                })
            })
        }
    });
    $(".cd-top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500)
    });
    $(".item-wrap-slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        adaptiveHeight: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4e3,
        fade: true,
        cssEase: "linear"
    });
    (new WOW).init();
    $(".item-login").magnificPopup({
        type: "inline",
        focus: "#txtUser",
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: "auto",
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
        closeOnBgClick: false,
        callbacks: {
            open: function () {
                var e = $("body").innerWidth();
                if (e > 991) {
                    $("body").addClass("overflow-hidden")
                }
            },
            close: function () {
                var e = $("body").innerWidth();
                if (e > 991) {
                    $("body").removeClass("overflow-hidden")
                }
            }
        }
    });
    $(".item-reset").magnificPopup({
        type: "inline",
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: "auto",
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
        closeOnBgClick: false,
        callbacks: {
            open: function () {
                var e = $("body").innerWidth();
                if (e > 991) {
                    $("body").addClass("overflow-hidden")
                }
            },
            close: function () {
                var e = $("body").innerWidth();
                if (e > 991) {
                    $("body").removeClass("overflow-hidden")
                }
            }
        }
    });
    $(".item-forgot").magnificPopup({
        type: "inline",
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: "auto",
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
        closeOnBgClick: false,
        callbacks: {
            open: function () {
                var e = $("body").innerWidth();
                if (e > 991) {
                    $("body").addClass("overflow-hidden")
                }
            },
            close: function () {
                var e = $("body").innerWidth();
                if (e > 991) {
                    $("body").removeClass("overflow-hidden")
                }
            }
        }
    });
    $(".item-register-free").magnificPopup({
        type: "inline",
        focus: "#phoneRegister",
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: "auto",
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
        closeOnBgClick: false,
        callbacks: {
            open: function () {
                $("body").addClass("overflow-hidden")
            },
            close: function () {
                $("body").removeClass("overflow-hidden")
            }
        }
    });
    $(".item-contact").magnificPopup({
        type: "inline",
        focus: "#phoneRegister",
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: "auto",
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
        closeOnBgClick: false,
        callbacks: {
            open: function () {
                var magnificPopup = $.magnificPopup.instance;
                var cur = magnificPopup.st.el;
                var packageName = cur.attr('id');
                if (packageName !== undefined) {
                    $('#contactRegister').val("Tư vấn giúp tôi gói cước " + packageName + " ...");
                } else {
                    $('#contactRegister').val('');
                }
                $("body").addClass("overflow-hidden")
            },
            close: function () {
                $('#contactRegister').val('');
                $("body").removeClass("overflow-hidden")
            }
        }
    });
    $(document).ready(function () {
        $(".popup-youtube").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            closeOnBgClick: false,
            callbacks: {
                open: function () {
                    var e = $("body").innerWidth();
                    if (e > 991) {
                        $("body").addClass("overflow-hidden")
                    }
                },
                close: function () {
                    var e = $("body").innerWidth();
                    if (e > 991) {
                        $("body").removeClass("overflow-hidden")
                    }
                }
            }
        })
    });
    $("#e1").select2({
        minimumResultsForSearch: -1,
        placeholder: "Vui lòng chọn Tỉnh, Thành phố"
    });
    $("#select-forgot").select2({
        minimumResultsForSearch: -1,
        placeholder: "Vui lòng chọn "
    });
    $("#form").validate({
        submitHandler: function (e, i) {
            i.preventDefault();
            var n = $("#name").val();
            var t = $("#password").val();
            var o = $("form").attr("data-message");
            if (n == "") {
                SubmitClick("bạn chưa nhập tên đăng nhập", "warning")
            } else if (t == "") {
                SubmitClick("bạn chưa nhập mật khẩu", "warning")
            } else {
                $(".item-loadding").css("display", "block");
                $("body").addClass("scroll-loadding");
                var a = $.magnificPopup.instance;
                a.close();
                setTimeout(function () {
                    $(".item-loadding").css("display", "none");
                    $("body").removeClass("scroll-loadding");
                    SubmitClick(o, "success")
                }, 3e3)
            }
        }
    })
});
function SubmitClick(e, i) {
    var n = "listMessage fadeInDown animated";
    if (i == "success") {
        n = n + " success"
    } else if (i == "warning") {
        n = n + " warning"
    } else {
        n = n + " error"
    }
    $("#listMessage").append(" <li class='" + n + "'><span>" + e + "</span></li>");
    setTimeout(function () {
        $("#listMessage li:first-child").remove()
    }, 3e3)
}
function onchangeSelect() {
    var e = $("#select_forgot").val();
    if (e == "email") {
        $(".hidden-input-email").addClass("active-input");
        $(".hidden-input-sdt").removeClass("active-input")
    } else {
        $(".hidden-input-sdt").addClass("active-input");
        $(".hidden-input-email").removeClass("active-input")
    }
}
function openCity(e, i) {
    var n, t, o;
    t = document.getElementsByClassName("tabcontent");
    for (n = 0; n < t.length; n++) {
        t[n].style.display = "none"
    }
    o = document.getElementsByClassName("tablinks");
    for (n = 0; n < o.length; n++) {
        o[n].className = o[n].className.replace(" active", "")
    }
    document.getElementById(i).style.display = "block";
    e.currentTarget.className += " active"
}
document.getElementById("defaultOpen").click();
