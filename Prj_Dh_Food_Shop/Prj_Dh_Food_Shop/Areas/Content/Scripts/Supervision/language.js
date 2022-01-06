var g_currMenu = null;
var g_TimerID = 0;

function GetBrowserWindowSize() {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return { width: myWidth, height: myHeight };
}

function GetElementSize(element) {
    var result = new Object();
    result.width = 0;
    result.height = 0;
    if (element.offsetWidth && element.offsetHeight) {
        result.width = element.offsetWidth;
        result.height = element.offsetHeight;
    }
    else if (element.style && element.style.pixelWidth && element.style.pixelHeight) {
        result.width = element.style.pixelWidth;
        result.height = element.style.pixelHeight;
    }
    return result;
}

function GetPosition(node) {
    var pos = new Array(0, 0);
    if (node.offsetParent) {
        while (node.offsetParent) {
            pos[0] += node.offsetLeft;
            pos[1] += node.offsetTop;
            node = node.offsetParent;
            if (node == document.body) {
                pos[0] -= node.offsetLeft;
                pos[1] -= node.offsetTop;
            }
        }
    }
    return pos;
}

function DoPopup(objid, pnlid) {
    var obj = document.getElementById(objid);
    var popup = document.getElementById(pnlid);
    popup.target = obj;
    obj.className = 'sel';

    var p = GetPosition(obj);

    var br = GetBrowserWindowSize();
    var sz = GetElementSize(popup);

    var left = p[0];
    var top = p[1] + parseInt(obj.offsetHeight);
    if (left + sz.width > br.width) {
        left = br.width - sz.width;
    }

    popup.style.display = 'block';
    popup.style.top = 2 + top + "px";
    /*popup.style.left = -76 + left + "px";*/

    if (g_currMenu != null)
        HidePopup(g_currMenu);

    g_currMenu = pnlid;
}

function KillPopup(pnlid) {
    g_TimerID = setTimeout('HidePopup("' + pnlid + '")', 200);
}

function KillTimer() {
    if (g_TimerID != 0) clearTimeout(g_TimerID);
    g_TimerID = 0;
}

function HidePopup(pnlid) {
    var popup = document.getElementById(pnlid);
    popup.style.display = 'none';
    g_currMenu = null;
    var obj = popup.target;
    obj.className = '';
}