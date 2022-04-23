$(document).ready(function () {
    vnTRUST.load_Statistics();
    vnTRUST.goTopStart();
    // SELECT J
    $(".select-j .title").click(function () {
        if (!$(this).parents(".select-j").hasClass("active")) {
            $(this).parents(".select-j").addClass("active");
            $(this).parents(".select-j").find(".content").stop().slideDown();
        }
        else {
            $(this).parents(".select-j").removeClass("active");
            $(this).parents(".select-j").find(".content").stop().slideUp();
        }
    });
    // SELECT P
    $(".div_auto_complete .chosen-value").focus(function (e) {
        $(this).parents(".div_auto_complete").addClass("active");
        $(this).parents(".div_auto_complete").find(".dropdown_select").scrollTop(0);
    });
    $(".div_auto_complete .chosen-value").keyup(function (e) {
        checkval($(this));
    });
    $(".div_auto_complete .chosen-value").blur(function (e) {
        $(this).parents(".div_auto_complete").removeClass("active");
        $(this).parents(".div_auto_complete").find(".dropdown_select li").removeClass("closed");
    });
    $(".div_auto_complete .dropdown_select li").click(function (e) {
        $(this).parents(".div_auto_complete").find(".chosen-value").val($(this).find("> .text").html());
    });
    function checkval(_this) {
        var $text = _this.val();
        if ($text.length > 0) {
            _this.parents(".div_auto_complete").find(".dropdown_select li").each(function (e) {
                var $choose_text = $(this).find("> .text").html();
                if (!($text.substring(0, $text.length).toLowerCase() === $choose_text.substring(0, $text.length).toLowerCase())) {
                    $(this).addClass("closed");
                } else {
                    $(this).removeClass("closed");
                }
            });
            _this.parents(".div_auto_complete").find(".dropdown_select li").each(function (e) {
                if ($(this).find("li").size() != $(this).find("li.closed").size()) {

                    $(this).removeClass("closed");
                }
            });
        } else {
            _this.parents(".div_auto_complete").find(".dropdown_select li").removeClass("closed");
        }
    }
    // SEARCH TOP
    $(".searchTop .icon").click(function () {
        if (!$(this).parents(".searchTop").hasClass("active")) {
            $(this).parents(".searchTop").addClass("active");
        }
        else {
            $(this).parents(".searchTop").removeClass("active");
        }
    });
    // FIXED HEADER
    header_height = $(".mainHeadWrap").offset().top;
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= header_height) {
            $(".mainHead").addClass("fixed");
        }
        else {
            $(".mainHead").removeClass("fixed");
        }
    });
    // LANGUAGE TOP
    $(".languageTop .icon").click(function () {
        if (!$(this).parents(".languageTop").hasClass("active")) {
            $(this).parents(".languageTop").addClass("active");
        }
        else {
            $(this).parents(".languageTop").removeClass("active");
        }
    });
    // BIND
    $(window).bind("click", function (e) {
        var target = e.target;
        if (!$(target).parents(".languageTop").hasClass("active")) {
            $(".languageTop").removeClass("active");
        }
    });
    $(".languageMobile .icon").click(function () {
        if (!$(this).parents(".languageMobile").hasClass("active")) {
            $(this).parents(".languageMobile").addClass("active");
            $(this).parents(".languageMobile").find(".popup").stop().slideDown(200);
            $('html').addClass("openmenu");
        }
        else {
            $(this).parents(".languageMobile").removeClass("active");
            $(this).parents(".languageMobile").find(".popup").stop().slideUp(200, function () {
                $(this).css({ "height": "auto" });
            });
            $('html').removeClass("openmenu");
        }
    });

});

function openPopUp(url, windowName, w, h, scrollbar) {
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scrollbar;
    win = window.open(url, windowName, winprops);
    if (parseInt(navigator.appVersion) >= 4) {
        win.window.focus();
    }
}