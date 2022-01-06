function loadJsAsync(src, callback) {
    var s = document.createElement('script');
    s.type = "text/javascript";
    s.src = src;
    s.addEventListener('load', function (e) {
        callback(null, e);
    }, false);
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(s);
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPod|iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//minhnt45 them ham xac dinh mobile hay pc 13/10/16
function isMobileAgent() {
    if (navigator.userAgent.match(/Android/i))
        return true;
    if (navigator.userAgent.match(/iPhone|iPod|iPad/i))
        return true;
    if (navigator.userAgent.match(/Windows Phone/i))
        return true;
    return false;
}

function hasViewPort() {
    var childNodes = document.head.childNodes;
    var node = null;
    if (childNodes != null) {
        for (var i = 0; i < childNodes.length; i++) {
            node = childNodes[i];
            if (node.name != undefined && node.name == 'viewport') {
                return true;
            }
        }
    }
    return false;
}

function embedIpccChat(data) {
    var iframe = document.createElement('iframe');
    try {
        iframe.id = 'ipcc_chat_iframe';
        iframe.style.border = 'none';
        iframe.style.width = '0%';
        iframe.style.height = '0%';
        iframe.style.position = 'fixed';
        iframe.style.bottom = '0';
        iframe.style.right = '0';
        iframe.style.zIndex = 9999;
        iframe.style.border = '15px';

        //        var src = 'http://localhost:8929/?key=';
        var src = 'https://econtact.viettel.vn:8909/?key=';
        //HCC
        //        var src = 'https://econtact.viettel.vn:8907/?key=';
        //CSKH
        //        var src = 'https://econtact.viettel.vn:8909/?key=';

        //var src = 'http://203.190.170.130:8909/?key=';
        //var src = 'http://203.190.170.131:8909/?key=';
        if (data.internal == "1") {
            //            src = 'http://localhost:8929/?key=';
            var src = 'https://econtact.viettel.vn:8909/?key=';
            //HCC
            //            var src = 'https://econtact.viettel.vn:8907/?key=';
            //CSKH
            //            var src = 'https://econtact.viettel.vn:8909/?key=';
        }
        var color = data.color == undefined ? "" : data.color;
        var queryString = "?domain=" + data.domain + "&username=" + data.username
            + "&color=" + color + "&internal=" + data.internal + "&close_box=" + data.close_box + "&mobile_app=" + data.mobile_app;
        iframe.src = src + encodeURIComponent(btoa(queryString));
        document.body.appendChild(iframe);

        // Create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from child window
        eventer(messageEvent, function (e) {
            var key = e.message ? "message" : "data";
            var data = e[key];
            var iframe = document.getElementById('ipcc_chat_iframe');
            var arr = data.split('#');

            if (arr.length > 1) {
                data = arr[0];
            }

            if (data == "openChatBox" || data == "openSurveyQA" || data == "openLeaveMessage") {
                if (isMobileAgent()) {
                    document.body.setAttribute('style', 'position:fixed');
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.right = '0px';
                    iframe.style.bottom = '0px';
                    iframe.style.zoom = '100%';
                } else {
                    iframe.style.border = '1px';
                    iframe.style.width = '325px';
                    if (arr.length > 1 && arr[1] == 1) {
                        iframe.style.height = '100%';
                    }
                    else {
                        iframe.style.height = '420px';
                    }

                    iframe.style.bottom = '0px';
                    iframe.style.right = '10px';
                    //                    iframe.style.cssText += ";border-top-left-radius: 6px; border-top-right-radius: 6px";
                    iframe.style.cssText += ";border-left: 1px solid #c9d0da; border-right: 1px solid #c9d0da";
                }
            } else if (data == "closeChatBox" || data == "closeSurveyQA" || data == "closeLeaveMessage") {
                if (isMobileAgent()) {
                    document.body.setAttribute('style', 'position:static');
                }
                iframe.style.border = '0px';
                iframe.style.width = '190px';
                iframe.style.height = '35px';
                //iframe.style.height = '90%';
                iframe.style.bottom = '20px';
                iframe.style.right = '25px';
            } else if (data == "openSurveyBox") {
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.right = '0px';
            } else if (data == "closeSurveyBox") {
                iframe.style.width = '0%';
                iframe.style.height = '0%';
                iframe.style.right = '0px';
            } else if (data == "ban") {
                iframe.parentNode.removeChild(iframe);
            }
        }, false);
    } catch (e) {
        iframe.parentNode.removeChild(iframe);
    }
}

function closeChatBoxIPCC() {
    try {
        var iframe = document.getElementById('ipcc_chat_iframe');
        var innerDoc = (iframe.contentWindow || iframe.contentDocument);
        innerDoc.postMessage('close_chat_from_parent', '*');
    } catch (e) {
        log(e);
    }
}

function openChatBoxIPCC() {
    try {
        var iframe = document.getElementById('ipcc_chat_iframe');
        var innerDoc = (iframe.contentWindow || iframe.contentDocument);
        innerDoc.postMessage('open_chat_from_parent', '*');
    } catch (e) {
        log(e);
    }
}